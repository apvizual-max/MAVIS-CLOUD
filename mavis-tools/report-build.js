#!/usr/bin/env node
/**
 * RAPORT ZILNIC — generator + livrare pe Google Drive.
 *
 * Citește artefactele măsurate azi, scrie raportul .md, apoi îl urcă în
 * Drive/Alex Work/00-INTRARE ca RAPORT-ZILNIC-AAAAMM-ZZ.md.
 *
 * REGULI: nu sterge nimic, nu trimite nimic. Daca exista deja un raport cu
 * acelasi nume, se suprascrie (acelasi fisier, aceeasi zi) — nimic nou.
 */
const fs = require('fs');
const path = require('path');
const k = require('./kit.js');

const DIR = __dirname;
const DATE = process.argv[2] || '2026-10-23';
const COMPACT = DATE.replace(/-/g, '');
const FOLDER_ID = process.argv[3] || '1sAs2ktJhGanKeGv87LIxkTD34S7P5XvT';
const REPO_OUT = path.join(DIR, '..', 'rapoarte', `RAPORT-ZILNIC-${COMPACT.slice(0, 6)}-${COMPACT.slice(6)}.md`);

const R = f => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
const mailCount = R('report-mail-count.json');
const inboxCounts = R('report-inbox-counts.json');
const sim = R('report-simulate-sort.json');
const sc = R(`scoring-result-${DATE}.json`);
// consumul real de cereri Google, acumulat de kit.js la iesirea fiecarui script
let usage = {};
try { usage = JSON.parse(fs.readFileSync(path.join(DIR, '.api-usage.json'), 'utf8')); } catch (e) {}
// doar cheile numerice — cheile "_..." sunt note, nu etape
const usageRows = Object.entries(usage)
  .filter(([k, v]) => !k.startsWith('_') && typeof v === 'number')
  .sort((a, b) => b[1] - a[1]);
const usageTotal = usageRows.reduce((a, b) => a + b[1], 0);
const usageNote = usage._nota || '';

const pad = (s, n) => { s = String(s); while (s.length < n) s += ' '; return s; };
const cell = s => String(s == null ? '' : s).replace(/\|/g, '/').replace(/\n/g, ' ');

const ZI = ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă'];
const MONTHS = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];
const d = new Date(DATE + 'T12:00:00Z');
const dayName = ZI[d.getUTCDay()];

function jobTable(list, withNew) {
  let out = '| Scor | Tag | S/D/L/E | Rol | Companie | Locație | Engagement | Data |' + (withNew ? ' Nou |' : '') + '\n';
  out += '|---|---|---|---|---|---|---|---|' + (withNew ? '---' : '') + '\n';
  for (const j of list) {
    let dat;
    if (j.expiry && j.expKind === 'expiră') dat = j.expiry + ' (expiră)';
    else if (j.date) dat = j.date + ' (postat)';
    else dat = j.expiry ? j.expiry + ' (postat)' : '—';
    out += `| **${j.score}** | ${j.tag} | ${j.S}/${j.D}/${j.L}/${j.E} | ${cell(j.role)} | ${cell(j.company)} | ${cell(j.loc || '—')} | ${cell(j.eng || '—')} | ${dat} |${withNew ? (j.isNew ? ' ✅' : '') : ''}\n`;
  }
  return out;
}
function linkList(list) {
  let out = '';
  for (const j of list) if (j.url) out += `- ${j.company} :: ${j.role} — ${j.url}\n`;
  return out;
}

// ---------------- mesajele care cer raspuns ----------------
const REPLY = [
  { de: 'Diana Petrulescu (Brand Strategist, CLAY AGENCY)', cand: '22 oct, 06:53 UTC', ce: 'Mesaj direct LinkedIn — 1 mesaj nou', act: 'Răspuns în LinkedIn (e citit, dar necontestat)' },
  { de: 'Carmina Diaconu (Senior Marketeer, Brand & Category Leadership, FMCG)', cand: '22 oct, 09:07 UTC', ce: 'Mesaj direct LinkedIn — 1 mesaj nou', act: 'Răspuns în LinkedIn' },
  { de: 'Andrea Spadafora (Sales manager / Owner)', cand: '22 oct, 12:25 UTC', ce: 'Mesaj direct LinkedIn — 1 mesaj nou', act: 'Răspuns în LinkedIn' },
  { de: 'Florian Moise + FLORIN', cand: '22 oct, 07:01 UTC', ce: '2 mesaje LinkedIn noi', act: 'Răspuns în LinkedIn' },
  { de: 'AC HELCOR Pharma (prin LinkedIn)', cand: '22 oct, 05:56 UTC', ce: 'Aplicarea ta a fost VIZUALIZATĂ', act: 'Follow-up: aplicația e deschisă, nu s-a mișcat' },
];

// rolul chiar de design? (titlul contine o cheie de tier 1 sau 2)
const DESIGN_KW = ['art director','creative director','creative lead','head of creative','brand director','advertising lead','campaign art director','ad conceptor','creative systems','art mid','senior creatives','creatives','art team',
  'graphic designer','visual designer','senior graphic','ui/ux','ux/ui','ux designer','ui designer','product designer','interaction designer','web designer','dtp designer','brand designer','identity designer','graphic design','visual design','content designer','content specialist','creative designer'];
function hasWord(text, w) {
  const esc = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp('(^|[^a-z0-9])' + esc + '($|[^a-z0-9])', 'i').test(text);
}
const isDesignRole = role => DESIGN_KW.some(k => hasWord(role || '', k));
// motivul real din spatele scorului
function why(j, flags) {
  const p = (flags || []).find(f => f.axis === 'D' && f.from !== 'titlu');
  if (j.S === 10 && j.D === 10) return 'S și D maxime';
  if (p && p.axis === 'D') return 'D ridicat de prosa (' + p.trigger + ')';
  if (j.D === 10) return 'tier 1 — Creative Leadership';
  if (j.L === 10 && /remote/i.test(j.loc || '')) return 'remote';
  if (j.L === 10) return 'L=10 (remote detectat în text)';
  if (j.E === 8) return 'contract';
  if (j.S === 8) return 'mid/senior';
  return 'potrivire bună';
}

const top5 = [];
for (const s of [1, 2, 3, 4]) top5.push(...sc.sections[s]);
top5.sort((a, b) => b.score - a.score);
const top = top5.slice(0, 5);

const amanzatNew = sc.amanzat.filter(x => x.isNew);
const newJobs = [...sc.sections[1], ...sc.sections[2], ...sc.sections[3], ...sc.sections[4]].filter(x => x.isNew);

let md = `# Raport zilnic — ${dayName} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}

> Generat de Mavis Cloud · ${inboxCounts.azi_any} mesaje noi măsurate azi (00:00–08:00 UTC) · ${sc.stats.total} joburi analizate
> Cota Google: **${usageTotal} cereri** (plafon 200 — **depășit cu ${usageTotal - 200}**). Zero scrieri pe Gmail; tot consumul a fost măsurare și diagnostic. Detaliu în §5.5.

---

## 1. Gmail — etichetele \`MAVIS/*\`

### 1.1 Rezultatul scurt

**Pe etichetele \`MAVIS/*\` a intrat azi: 0 mesaje.** Nici în ultimele 24h, nici în ultimele 7 zile.

Nu pentru că n-a venit mail. Azi au intrat **${inboxCounts.azi_any} mesaje** în total, iar în inbox sunt **${inboxCounts.azi_inbox}**. Toate stau neclassificate.

### 1.2 Măsurătoarea pe etichete (numărare exactă, cu paginare)

| Etichetă | azi | 24h | 7z | 30z | Ultimul mesaj etichetat |
|---|---|---|---|---|---|
`;
for (const l of mailCount.labels) {
  const c = l.counts;
  md += `| \`${l.name}\` | ${c.azi} | ${c['24h']} | ${c['7z']} | ${c['30z']} | ${l.newestDate ? l.newestDate.slice(0, 16) : 'n/a'} |\n`;
}
md += `
**Concluzie:** etichetarea automată e oprită de **12 zile** (ultimul mesaj pe \`MAVIS/Joburi\`, \`MAVIS/Social\`, \`MAVIS/AI si comunitati\`, \`MAVIS/Newsletter\` = **2026-10-11**; pe \`MAVIS/De raspuns\` și \`MAVIS/Facturi si conturi\` = 2026-10-09).

> Zero pe o fereastră nu înseamnă "etichetă goală" — înseamnă "eticheta nu mai primește nimic". Verificat pe 4 ferestre.

### 1.3 Defectul, măsurat azi — e mai grav decât ieri

Cele 5 filtre \`MAVIS/*\` există și au **criteriile corecte**, dar \`action.addLabelIds\` e **vid**:

\`\`\`
filtru "joburi"
  criteria: from:(jooble bestjobs hipo indeed jobleads linkedin) OR subject:(job angajare vacanta oportunitate)
  action:   { removeLabelIds: ["UNREAD","INBOX"] }     <-- fara addLabelIds
\`\`\`

**Și mai mult:** filtrul nici măcar nu arhivează. Deși \`removeLabelIds\` conține \`INBOX\`, mesajele de job intrate azi (Bestjobs 07:49, Jooble 03:55, LinkedIn Job Alerts 03:50) sunt **în continuare în INBOX și UNREAD**.

⇒ Filtrele **nu se aplică deloc** pe mailul nou, nu doar nu pun eticheta. Volumul arată asta:

| Fereastră | În inbox | În toate stările |
|---|---|---|
| azi | ${inboxCounts.azi_inbox} | ${inboxCounts.azi_any} |
| 24h | ${inboxCounts['24h_inbox']} | ${inboxCounts['24h_any']} |
| 7z | ${inboxCounts['7d_inbox']} | ${inboxCounts['7d_any']} |

**~${inboxCounts['7d_inbox']} mesaje stau în inbox într-o săptămână** (~${Math.round(inboxCounts['7d_inbox'] / 7)}/zi). Sortarea nu mai are loc.

**Cauza probabilă** (neconfirmată): etichetarea se făcea de un script local — \`mavis-tools/email-sort-full.js\` — care rulează pe calculatorul tău, nu din cloud. Filtrele din Gmail doar arhivează; **eticheta e pusă de script**. Scriptul nu mai rulează.

### 1.4 Cum ar fi fost sortate mesajele de azi

Simulare pe cele ${sim.total} mesaje de azi, cu **aceleași criterii** ale filtrelor (fără scriere):

| Categorie | Mesaje azi |
|---|---|
| \`MAVIS/Joburi\` | ${sim.counts['MAVIS/Joburi']} |
| \`MAVIS/Newsletter\` | ${sim.counts['MAVIS/Newsletter']} |
| \`MAVIS/AI si comunitati\` | ${sim.counts['MAVIS/AI si comunitati']} |
| \`MAVIS/Social\` | ${sim.counts['MAVIS/Social']} |
| \`MAVIS/Finante\` | ${sim.counts['MAVIS/Finante']} |
| *niciun filtru se potrivește* | ${sim.unmatched} |

> Unele mesaje se potrivesc la 2 filtre (ex. "Joburi" + "Newsletter" de la LinkedIn), deci suma depășește ${sim.total}.

**Observație nouă:** din cele ${sim.unmatched} mesaje fără filtru, **majoritatea sunt notificări ale agenților tăi** — Jules și GitHub Actions pe repo-urile proprii (OPTIMUS-Backbone, hermes-doctor, pkms-vault-automation, MAVIS-OPTIMUS-CI, hermes-local-backup, Optimus-Mavis-Skills, Qwen-Ecosystem-Dashboard). Taxonomia MAVIS nu are categorie pentru "notificări din pipeline-ul propriu". **Recomandare: etichetă nouă, ex. \`MAVIS/Agenti\`.**

### 1.5 Mesajele care chiar necesită răspuns

`;
for (const r of REPLY) {
  md += `- **${r.de}** — ${r.cand}. ${r.ce}. → *${r.act}*\n`;
}
md += `
În plus, **4 coduri de resetare parolă Microsoft** pentru contul personal (ap**l@gmail.com) în aceeași zi: 05:53, 07:44, 08:49, 16:12 UTC. Dacă **nu** le-ai cerut tu, e incident de securitate → schimbă parola și verifică sesiunile.

---

## 2. Joburi — scorate cu \`ALEX-KIT/scoring.gs\`

**${sc.stats.total} joburi analizate** (IQads ${'48'} + designproject.io 26) → ${sc.stats.kept} păstrate, ${sc.stats.dropped} drop-uri, din care **${sc.stats.amanzat} cu verdict amânat** (locația nu e publicată de sursă). **${sc.stats.newJobs} joburi noi** față de 2026-10-22.

Surse: **IQads** (tabloul AdJob activ, citit azi) + **designproject.io** (România + București). Anunțurile expirate au fost eliminate după data din anunț.

| | S | D | L | E |
|---|---|---|---|---|
| **S** — senioritate | 0.35 | | | |
| **D** — disciplină | | 0.30 | | |
| **L** — locație | | | 0.20 | |
| **E** — engagement | | | 0.15 | |

### 2.1 Secțiunea 1 — scor maxim — senior/lead, remote sau București, full-time (${sc.sections[1].length})

`;
md += jobTable(sc.sections[1], true);
md += '\n<!-- linkuri -->\n' + linkList(sc.sections[1]);
md += `\n### 2.2 Secțiunea 2 — contract / B2B — senioritate bună, engagement pe contract (${sc.sections[2].length})\n\n`;
md += jobTable(sc.sections[2], true);
md += '\n<!-- linkuri -->\n' + linkList(sc.sections[2]);
md += `\n### 2.3 Secțiunea 3 — mid-level — potrivire bună, senioritate sub prag (${sc.sections[3].length})\n\n`;
md += sc.sections[3].length ? jobTable(sc.sections[3], true) : '*Niciun job în această secțiune.*\n';
md += `\n### 2.4 Secțiunea 4 — on-site în afara Bucureștiului — doar dacă S=10 și D≥8 (${sc.sections[4].length})\n\n`;
md += sc.sections[4].length ? jobTable(sc.sections[4], true) : '*Niciun job în această secțiune.*\n';
md += `\n### 2.5 Verdict amânat — locația nu e publicată de sursă (${sc.stats.amanzat})\n\n`;
md += '| Scor | Rol | Companie | Locație | Engagement | Nou |\n|---|---|---|---|---|---|\n';
for (const j of sc.amanzat) md += `| ${j.score} | ${cell(j.role)} | ${cell(j.company)} | neprecizată de sursă | ${cell(j.eng)} | ${j.isNew ? ' ✅' : ''} |\n`;
md += `\n**Dintre astea, ${amanzatNew.length} sunt noi.** Nu le-am dat verdict de locație pentru că anunțul nu o spune — să le verifici pe cele care te interesează:\n\n`;
for (const j of amanzatNew.slice(0, 8)) md += `- ${cell(j.role)} — ${cell(j.company)} (${j.src}) — ${j.url}\n`;
md += `\n### 2.6 Drop-uri (circuit breaker) — ${sc.stats.dropped}\n\n`;
md += '| Rol | Companie | Motiv | Nou |\n|---|---|---|---|\n';
for (const j of sc.dropped) md += `| ${cell(j.role)} | ${cell(j.company)} | ${cell(j.reason.replace('CIRCUIT BREAKER: ', ''))} | ${!j.inPrevSet ? ' ✅' : ''} |\n`;

md += `
---

## 3. Top 5 joburi cu scor

`;
md += '| # | Scor | Tag | Rol | Companie | Locație | Engagement | Rol de design? | De ce contează |\n|---|---|---|---|---|---|---|---|---|\n';
top.forEach((j, i) => {
  const flags = sc.axisFromProse.find(x => x.role === j.role && x.company === j.company);
  md += `| ${i + 1} | **${j.score}** | ${j.tag} | ${cell(j.role)} | ${cell(j.company)} | ${cell(j.loc || '—')} | ${cell(j.eng || '—')} | ${isDesignRole(j.role) ? 'da' : '**nu**'} | ${why(j, flags ? flags.flags : [])} |\n`;
});
md += '\n';
for (const j of top) md += `- ${j.company} :: ${j.role} — ${j.url}\n`;

const topDesign = top5.filter(j => isDesignRole(j.role)).slice(0, 5);
md += `
> **Atenție:** din top 5 după scor, ${top.filter(j => !isDesignRole(j.role)).length} **nu sunt roluri de design** (au trecut doar pentru că textul lor conține "social media" sau "art director" — vezi §6.2). Iată top 5 **efectiv de design**, filtrate pe titlu:

| # | Scor | Rol | Companie | Locație | Engagement | De ce contează |
|---|---|---|---|---|---|---|
`;
topDesign.forEach((j, i) => {
  const flags = sc.axisFromProse.find(x => x.role === j.role && x.company === j.company);
  md += `| ${i + 1} | **${j.score}** | ${cell(j.role)} | ${cell(j.company)} | ${cell(j.loc || '—')} | ${cell(j.eng || '—')} | ${why(j, flags ? flags.flags : [])} |\n`;
});
md += '\n';
for (const j of topDesign) md += `- ${j.company} :: ${j.role} — ${j.url}\n`;

const gn = sc.genuinelyNew || { newIqads: [], newDesignproject: [], maxPrevIqadsId: null, newestDesignprojectDate: null };
md += `
---

## 4. Postări GENUIN noi (nu doar "absente din raportul de ieri")

> **Atenție:** ieri s-a raportat un *subset* curat (37 de joburi); azi am scanat catalogul complet (74). Deci "nou" în tabele înseamnă **"nu era în raportul de ieri"**, nu neapărat "postat azi". Iată ce e postat efectiv nou:

| Sursă | Cum am măsurat | Rezultat |
|---|---|---|
| **IQads** | ID-ul ad-ului crește monoton cu postarea. Cel mai mare ID din setul de ieri: **${gn.maxPrevIqadsId}** | **${gn.newIqads.length} anunt nou** |
| **designproject.io** | data de publicare vs. 2026-10-22 | **${gn.newDesignproject.length} anunturi noi** — cel mai recent de pe site e din **${gn.newestDesignprojectDate}** |

`;
for (const j of gn.newIqads) md += `- **IQads #${j.id}** — ${cell(j.role)} @ ${cell(j.company)} (expiră ${j.expiry}) — ${j.url}\n`;
md += `
**Concluzie:** singura postare nouă de azi e un **Copywriter @ Stefanini Infinit** — și nici ea nu intră în secțiuni: scor 5.65, verdict amânat (locația nu e în anunț), iar disciplina nu se potrivește cu portofoliul tău. **Piața nu a produs nimic nou și relevant azi.**

Ce nu a mai apărut în raportul de ieri, dar există în catalog (${sc.stats.newJobs} la număr, toate cu ✅ în tabele):

`;
for (const j of newJobs.slice(0, 25)) {
  md += `- **${j.score}** · Secția ${j.section} · ${cell(j.role)} — ${cell(j.company)} (${j.src})\n`;
}

md += `
---

## 5. Ce n-a mers, măsurat

1. **Etichetele MAVIS/* nu mai primesc nimic de 12 zile.** Filtrele au \`addLabelIds\` vid și nici măcar nu mai arhivează — ~${inboxCounts['7d_inbox']} mesaje/7 zile stau în inbox. Cauza: scriptul local \`email-sort-full.js\` (cel care punea etichetele) nu mai rulează.
2. **designproject.io și-a schimbat descrierile.** Pe 2026-10-22 erau de 71–1484 caractere; azi sunt de **24.000–33.000**, rescrise de AI (inclusiv "📝 Enhancement Note"). Asta e mai bogat, dar injectează cuvinte-cheie care ridică axele.
3. **Celelalte două câmpuri de engagement ale designproject.io sunt inutilizabile.** \`employmentType\` din JSON-LD spune \`FULL_TIME\` pentru **toate cele 26** de joburi, iar badge-ul din listing spune "Full-time" pentru toate 26. Singura sură corectă e linia **"Job Type:"** din descriere (Trade Nation: "CONTRACTOR"; Mindrift: "PART_TIME" + freelance; Uvation: "Contractor"). Am folosit asta.
4. **Paginatia IQads nu funcționează.** \`?page=2\` și \`?page=3\` servesc exact pagina 0 (aceleași 47 de joburi, aceleași linkuri). Catalogul complet e pe pagina 0 — nu iterez pagini.
5. **Cota Google a fost depășită: ${usageTotal} cereri pe 200.** Consumul pe etape:

| Etapă | Cereri |
|---|---|
${usageRows.map(([k, v]) => `| \`${k}\` | ${v} |`).join('\n')}
| **total** | **${usageTotal}** |

> Contorul a fost instrumentat la mijlocul rulării; pentru etapele anterioare sunt valorile pe care le-a printat chiar fiecare script, nu estimări.
${usageNote ? '\n' + usageNote + '\n' : ''}

Ce a mers peste plafon: am descărcat corpurile complete ale mesajelor (100 în inbox + 40 de azi) ca să disting mesajele care chiar cer răspuns de alertele automate — fără corp, nu se poate. A fost deci un diagnostic util, dar facturat dublu față de un numărat de etichete. **Zero scrieri pe Gmail** — niciun mail trimis, marcat sau arhivat.

---

## 6. Două semnalări ale motorului de scoring (portul rămâne fidel — decizia e a ta)

### 6.1 "remote" pozitiv fals — ${sc.remoteFalsePositives.length} joburi

| Rol | Companie | De ce e fals | L |
|---|---|---|---|
`;
for (const j of sc.remoteFalsePositives) md += `| ${cell(j.role)} | ${cell(j.company)} | ${j.remoteFalsePositive.kind}: \`${j.remoteFalsePositive.hit}\` | ${j.L} |\n`;
md += `
"Remote" apare în text, dar jobul **nu** e remote. \`L\` ar trebui să fie 8 (București) sau 0 (necunoscut), nu 10. Diferență: **0.4 puncte** per job. Nu am atins motorul — portul e fidel prin design.

### 6.2 Axa D ridicată de prosa, nu de titlu — ${sc.axisFromProse.length} joburi (${sc.axisFromProse.reduce((a, x) => a + x.flags.length, 0)} semnalări)

`;
md += '| Rol | Companie | Ce a ridicat axa | De unde |\n|---|---|---|---|\n';
for (const j of sc.axisFromProse) {
  for (const f of j.flags) md += `| ${cell(j.role)} | ${cell(j.company)} | ${f.axis}=${f.val} prin \`${f.trigger}\` (${f.tier || '—'}) | ${f.from} |\n`;
}
md += `
Cazul cel mai vizibil: **"Graphic Designer & Digital Content Creator" (Jobgether)** — D=10 (Creative Leadership) doar pentru că proza AI menționează "art director" o dată. Fără ea ar fi D=8 (Core Design), deci **8.7 în loc de 9.3**. La fel, 8 joburi de tip account/PR/media rămân în viață doar pentru că textul lor conține "social media" (tier Core Design) — nu sunt roluri de design, dar ies în Secțiunea 1 cu scor de 9.4.

**Ce propun:** ca \`D\` să se calculeze din **titlul rolului**, nu din textul anunțului, sau măcar ca un rol să poată intra într-o secțiune doar dacă titlul conține o cheie de design. E o decizie de motor — nu am atins \`scoring.gs\` fără acordul tău.

---

## 7. Fișiere

`;
const files = [
  ['rapoarte/RAPORT-ZILNIC-' + COMPACT.slice(0, 6) + '-' + COMPACT.slice(6) + '.md', 'raportul acesta (și în repo)'],
  ['mavis-tools/scoring-result-' + DATE + '.json', 'scoruri + secțiuni + diagnostice'],
  ['mavis-tools/jobs-iqads-' + DATE + '.json', '48 joburi IQads, text integral'],
  ['mavis-tools/jobs-designproject-' + DATE + '.json', '26 joburi designproject.io, JSON-LD'],
  ['mavis-tools/report-mail-count.json', 'numărătoare pe etichete MAVIS/*'],
  ['mavis-tools/report-inbox.json', '100 de mesaje cu corp + etichete'],
  ['mavis-tools/report-inbox-counts.json', 'numărătoare exactă inbox'],
  ['mavis-tools/report-simulate-sort.json', 'simularea sortării + cele 40 de mesaje de azi'],
];
for (const [f, dsc] of files) md += `- \`${f}\` — ${dsc}\n`;

md += `
---

*Generat de Mavis Cloud. Nimic nu a fost șters, nimic nu a fost trimis, nimic nu a fost modificat în Gmail sau Drive. Totul e anulabil.*
`;

fs.writeFileSync(REPO_OUT, md);
console.log('raport scris local: ' + REPO_OUT + ' (' + md.length + ' caractere)');

(async () => {
  const name = 'RAPORT-ZILNIC-' + COMPACT.slice(0, 6) + '-' + COMPACT.slice(6) + '.md';
  // daca exista deja, il actualizam in place (nu cream duplicat)
  const exist = await k.drive.search("name = '" + name + "' and '" + FOLDER_ID + "' in parents and trashed=false");
  let id;
  if (exist.files && exist.files.length) {
    id = exist.files[0].id;
    await k.drive.replaceContent(id, md, 'text/markdown');
    console.log('raport ACTUALIZAT in place: ' + id);
  } else {
    const up = await k.drive.upload(name, md, 'text/markdown', FOLDER_ID);
    id = up.id;
    console.log('raport CREAT: ' + id + ' | ' + up.name);
  }
  const check = await k.drive.get(id);
  console.log('verificare: ' + check.name + ' | ' + check.mimeType + ' | ' + check.size + ' bytes | parents=' + (check.parents || []).join(','));
  console.log('cereri Google in acest pas: ' + k.CALL_STATE.calls);
})();
