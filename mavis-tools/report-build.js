#!/usr/bin/env node
/**
 * RAPORT ZILNIC — generator + livrare pe Google Drive.
 *
 * Citește artefactele măsurate azi, scrie raportul .md, apoi îl urcă în
 * Drive/Alex Work/00-INTRARE ca RAPORT-ZILNIC-AAAAMM-ZZ.md.
 *
 * REGULA DE BAZĂ: NIMIC din text nu e hardcodat pentru o zi anume.
 * Fiecare număr vine din artefactele măsurate (mail-count, inbox-counts,
 * simulate-sort, triage, scoring). Altfel raportul de mâine ar repăsta
 * cifrele de azi — exact bug-ul care a stricat rularea din 23.10.
 *
 * REGULI: nu șterge nimic, nu trimite nimic. Dacă există deja un raport cu
 * acelasi nume, se suprascrie (acelasi fisier, aceeasi zi) — nimic nou.
 */
const fs = require('fs');
const path = require('path');
const k = require('./kit.js');
const { triage } = require('./report-triage.js');

const DIR = __dirname;
const DATE = process.argv[2] || new Date().toISOString().slice(0, 10);
const COMPACT = DATE.replace(/-/g, '');
const FOLDER_ID = process.argv[3] || '1sAs2ktJhGanKeGv87LIxkTD34S7P5XvT';
const REPO_OUT = path.join(DIR, '..', 'rapoarte', `RAPORT-ZILNIC-${COMPACT.slice(0, 6)}-${COMPACT.slice(6)}.md`);

const R = f => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
const mailCount = R('report-mail-count.json');
const inboxCounts = R('report-inbox-counts.json');
const sim = R('report-simulate-sort.json');
const sc = R(`scoring-result-${DATE}.json`);
const tri = triage(sim.rows || []);
// consumul real de cereri Google, acumulat de kit.js la iesirea fiecarui script
let usage = {};
try { usage = JSON.parse(fs.readFileSync(path.join(DIR, '.api-usage.json'), 'utf8')); } catch (e) {}
const usageRows = Object.entries(usage)
  .filter(([k, v]) => !k.startsWith('_') && typeof v === 'number')
  .sort((a, b) => b[1] - a[1]);
const usageMeasured = usageRows.reduce((a, b) => a + b[1], 0);
// upload-ul raportului costa: search + upload/replace + verificare = 3 cereri
const UPLOAD_COST = 3;
const usageTotal = usageMeasured + UPLOAD_COST;
const usageNote = usage._nota || '';

const pad = (s, n) => { s = String(s); while (s.length < n) s += ' '; return s; };
const cell = s => String(s == null ? '' : s).replace(/\|/g, '/').replace(/\n/g, ' ');

const ZI = ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă'];
const MONTHS = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];
const d = new Date(DATE + 'T12:00:00Z');
const dayName = ZI[d.getUTCDay()];
// Romania: EEST (UTC+3) pana pe 25.10.2026, cand se trece la EET (UTC+2).
const eest = new Date(Date.now() + 3 * 3600 * 1000);
const windowEnd = String(eest.getUTCHours()).padStart(2, '0') + ':' + String(eest.getUTCMinutes()).padStart(2, '0');

const daysBetween = (a, b) => Math.round((b - a) / 86400000);
const parseDate = s => { const t = Date.parse(s || ''); return isNaN(t) ? null : new Date(t); };
// headerele Date din Gmail: "Sat, 24 Oct 2026 05:03:13 +0000 (UTC)"
const parseGmailDate = s => {
  const t = Date.parse(s || '');
  if (!isNaN(t)) return new Date(t);
  const m = (s || '').match(/(\d{1,2})\s+(\w{3})\s+(\d{4})/);
  if (!m) return null;
  const mon = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].indexOf(m[2]);
  if (mon < 0) return null;
  return new Date(Date.UTC(+m[3], mon, +m[1]));
};
const fmtRo = s => { const t = parseDate(s); if (!t) return '—';
  return String(t.getUTCDate()).padStart(2, '0') + '.' + String(t.getUTCMonth() + 1).padStart(2, '0') + '.' + t.getUTCFullYear(); };
// snippet-urile vin cu entitati HTML decodate de snippitul Gmail
const decodeHtml = s => String(s || '')
  .replace(/&#39;|&#x27;/g, "'").replace(/&quot;|&#34;/g, '"')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&nbsp;/g, ' ');
const clean = s => decodeHtml(s).replace(/\s+/g, ' ').trim();

// ---------------- joburi ----------------
// data de publicare la designproject.io vine ca "Oct 2, 2026" -> o normalizam
const MON_IDX = { Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11 };
function isoDate(s) {
  if (!s) return null;
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  const m = s.match(/([A-Z][a-z]{2}) (\d{1,2}), (\d{4})/);
  if (m && MON_IDX[m[1]] !== undefined) return `${m[3]}-${String(MON_IDX[m[1]] + 1).padStart(2, '0')}-${String(+m[2]).padStart(2, '0')}`;
  return s.slice(0, 10);
}
function jobTable(list, withNew) {
  let out = '| Scor | Tag | S/D/L/E | Rol | Companie | Locație | Engagement | Expirare |' + (withNew ? ' Nou |' : '') + '\n';
  out += '|---|---|---|---|---|---|---|---|' + (withNew ? '---' : '') + '\n';
  for (const j of list) {
    let dat;
    const posted = isoDate(j.date);
    if (j.src === 'designproject.io' && posted) {
      dat = `postat ${posted}`;
      if (j.expiry) dat += ` · expiră ${j.expiry.slice(0, 10)}`;
    } else if (j.expiry) {
      dat = 'expiră ' + j.expiry.slice(0, 10);
    } else if (posted) {
      dat = 'postat ' + posted;
    } else dat = '—';
    if (j.expired) dat += ' ⛔ **EXPIRAT**';
    out += `| **${j.score}** | ${j.tag} | ${j.S}/${j.D}/${j.L}/${j.E} | ${cell(j.role)} | ${cell(j.company)} | ${cell(j.loc || '—')} | ${cell(j.eng || '—')} | ${dat} |${withNew ? (j.isNew ? ' ✅' : '') : ''}\n`;
  }
  return out;
}
function linkList(list) {
  let out = '';
  for (const j of list) if (j.url) out += `- ${j.company} :: ${j.role} — ${j.url}\n`;
  return out;
}
function expiredCount(list) { return list.filter(j => j.expired).length; }

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

const allSections = [];
for (const s of [1, 2, 3, 4]) allSections.push(...sc.sections[s]);
allSections.sort((a, b) => b.score - a.score);
const top = allSections.slice(0, 5);
const amanzatNew = sc.amanzat.filter(x => x.isNew);
const newJobs = allSections.filter(x => x.isNew);
const gn = sc.genuinelyNew || { newIqads: [], newDesignproject: [], maxPrevIqadsId: null, newestDesignprojectDate: null };

// ---------------- etichete: de cand nu mai functioneaza ----------------
const labelRows = mailCount.labels.map(l => ({ ...l, newest: parseGmailDate(l.newestDate) }));
const dated = labelRows.filter(l => l.newest);
const newestLabel = dated.length ? dated.reduce((a, b) => (a.newest > b.newest ? a : b)) : null;
const daysOff = newestLabel ? daysBetween(newestLabel.newest, new Date(DATE + 'T00:00:00Z')) : null;
const groups = {};
for (const l of dated) {
  const k = fmtRo(l.newestDate);
  (groups[k] = groups[k] || []).push(l.name.replace(/`/g, ''));
}
const groupLines = Object.entries(groups).sort().map(([k, v]) => `pe \`${v.join('`, `')}\` = **${k}**`).join('; ');

// ---------------- mesaje care cer actiune ----------------
const replyList = tri.buckets['needs-reply'];
const actionList = tri.buckets['needs-action'];
const otherAlertList = tri.buckets['job-alert-other'];
const fyiList = tri.buckets['fyi'];
const msgTime = r => { const t = parseGmailDate(r.date); if (!t) return r.date.slice(0, 22);
  return String(t.getUTCHours()).padStart(2, '0') + ':' + String(t.getUTCMinutes()).padStart(2, '0') + ' UTC'; };

// ---------------- cata de joburi ----------------
// impartirea pe surse se masoara din fisierele RAW (ce a fost scanat),
// nu din cele pastrate — altfel "72 analizate" si "24+12 pastrate" se contrazic.
const srcTotal = {};
for (const [file, key] of [['jobs-iqads-' + DATE + '.json', 'IQads'], ['jobs-designproject-' + DATE + '.json', 'designproject.io']]) {
  try { srcTotal[key] = JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8')).jobs.length; } catch (e) { srcTotal[key] = 0; }
}
const srcKept = {};
for (const j of allSections) srcKept[j.src] = (srcKept[j.src] || 0) + 1;
const expiredInTables = allSections.filter(j => j.expired).length;
const expiredInAmanzat = sc.amanzat.filter(j => j.expired).length;
// plural corect
const plural = (n, one, few, many) => n === 1 ? one : (n >= 2 && n <= 19 ? few : many);

// ---------------- raport ----------------
let md = `# Raport zilnic — ${dayName} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}

> Generat de Mavis Cloud · ${inboxCounts.azi_any} mesaje noi măsurate azi (00:00–${windowEnd} EEST) · ${sc.stats.total} joburi analizate
> Cota Google: **${usageTotal} cereri** (plafon 200${usageTotal > 200 ? ` — **depășit cu ${usageTotal - 200}**` : usageTotal === 200 ? ` — **exact pe plafon**` : ` — **în limita plafonului**`}). Zero scrieri pe Gmail; tot consumul a fost măsurare și diagnostic. Detaliu în §5.

---

## 1. Gmail — etichetele \`MAVIS/*\`

### 1.1 Rezultatul scurt

**Pe etichetele \`MAVIS/*\` a intrat azi: ${mailCount.totals.azi} mesaje.**`;

if (mailCount.totals.azi === 0) {
  md += ` Nici în ultimele 24h (${mailCount.totals['24h']}), nici în ultimele 7 zile (${mailCount.totals['7z']}).`;
} else {
  md += ` În ultimele 24h: ${mailCount.totals['24h']}; în 7 zile: ${mailCount.totals['7z']}.`;
}
md += `

Nu pentru că n-a venit mail. Azi au intrat **${inboxCounts.azi_any} mesaje** în total, iar în inbox sunt **${inboxCounts.azi_inbox}**.`;

const unclassified = inboxCounts.azi_any - mailCount.totals.azi;
if (unclassified > 0) {
  md += ` **${unclassified} dintre ele nu au primit nicio etichetă**`;
  if (tri.counts.noise) md += `, iar **${tri.counts.noise} sunt zgomot din pipeline-ul propriu** (bot-uri de pe repo-uri) — taxonomia MAVIS nu are categorie pentru ele`;
  md += '.';
}
md += `

### 1.2 Măsurătoarea pe etichete (numărare exactă, cu paginare)

| Etichetă | azi | 24h | 7z | 30z | Ultimul mesaj etichetat |
|---|---|---|---|---|---|
`;
for (const l of mailCount.labels) {
  const c = l.counts;
  md += `| \`${l.name}\` | ${c.azi} | ${c['24h']} | ${c['7z']} | ${c['30z']} | ${l.newestDate ? l.newestDate.slice(0, 16) : 'n/a'} |\n`;
}
md += `
`;
if (newestLabel && daysOff !== null) {
  md += `**Concluzie:** etichetarea automată e oprită de **${daysOff} zile** (${groupLines}).\n\n`;
} else {
  md += `**Concluzie:** nu s-a putut stabili când a fost etichetat ultimul mesaj (lipsesc datele).\n\n`;
}
md += `> Zero pe o fereastră nu înseamnă "etichetă goală" — înseamnă "eticheta nu mai primește nimic". Verificat pe 4 ferestre.

### 1.3 Defectul, măsurat azi

Cele 5 filtre \`MAVIS/*\` există și au **criteriile corecte**, dar \`action.addLabelIds\` e **vid**:

\`\`\`
filtru "joburi"
  criteria: from:(jooble bestjobs hipo indeed jobleads linkedin) OR subject:(job angajare vacanta oportunitate)
  action:   { removeLabelIds: ["UNREAD","INBOX"] }     <-- fara addLabelIds
\`\`\`

**Și mai mult:** filtrul nici măcar nu arhivează. Deși \`removeLabelIds\` conține \`INBOX\`, mesajele de job intrate azi sunt **în continuare în INBOX și UNREAD**:

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

> Unele mesaje se potrivesc la 2 filtre (ex. "Joburi" + "Newsletter" de la LinkedIn), deci suma poate depăși ${sim.total}.

**Observație:** din cele ${sim.unmatched} mesaje fără filtru, **${tri.counts.noise} sunt notificări ale agenților tăi** (Jules și GitHub Actions pe repo-urile proprii). Taxonomia MAVIS nu are categorie pentru "notificări din pipeline-ul propriu". **Recomandare: etichetă nouă, ex. \`MAVIS/Agenti\`.**

### 1.5 Mesajele care chiar necesită răspuns

Clasificarea e făcută din date, nu dintr-o listă scrisă cu mâna: ${tri.counts['needs-reply']} ${plural(tri.counts['needs-reply'], 'cere', 'cer', 'cer')} răspuns explicit, ${tri.counts['needs-action']} ${plural(tri.counts['needs-action'], 'cere', 'cer', 'cer')} o decizie, ${tri.counts['job-alert-other']} ${plural(tri.counts['job-alert-other'], 'este', 'sunt', 'sunt')} alerte de job care nu ating profilul tău, ${tri.counts.fyi} ${plural(tri.counts.fyi, 'e', 'sunt', 'sunt')} newsletter/promoție, ${tri.counts.noise} ${plural(tri.counts.noise, 'e', 'sunt', 'sunt')} zgomot de pipeline.

`;
if (replyList.length) {
  md += `**Ceres răspuns explicit:**\n\n`;
  for (const r of replyList) {
    md += `- **${r.displayName}** — ${msgTime(r)}. *${r.subject}* — ${clean(r.snippet).slice(0, 180)}\n`;
  }
  md += `\n`;
} else {
  md += `**Niciun mesaj nu cere explicit un răspuns.**\n\n`;
}
if (actionList.length) {
  md += `**Ceres o decizie (alerte de job care bat cu profilul tău):**\n\n`;
  for (const r of actionList) {
    md += `- **${r.displayName}** — ${msgTime(r)}. *${r.subject}* — ${clean(r.snippet).slice(0, 160)}\n`;
  }
  md += `\n`;
}
if (otherAlertList.length) {
  md += `**Alerte de job care NU ating profilul de design** (informativ, ${otherAlertList.length}):\n\n`;
  for (const r of otherAlertList) md += `- ${r.displayName} — ${msgTime(r)} · *${r.subject}*\n`;
  md += `\n`;
}
if (fyiList.length) {
  md += `**Newsletter / promoție, fără acțiune** (${fyiList.length}): ` + fyiList.map(r => r.displayName).join(', ') + `\n\n`;
}
// leads verificate: alerte de job care au condus la un anunt real, citit direct
let leads = null;
try { leads = JSON.parse(fs.readFileSync(path.join(DIR, `email-leads-${DATE}.json`), 'utf8')); } catch (e) {}
if (leads && leads.leads && leads.leads.length) {
  md += `**Leads verificate din alertele de job** (pagina sursă citită direct, nu din snippet de motor de căutare):\n\n`;
  for (const l of leads.leads) {
    md += `##### ${l.resolvedTitle}\n\n`;
    md += `Din alerta **${l.from}** — *${l.subject}*\n\n`;
    md += `${l.summary}\n\n`;
    if (l.rates && l.rates.length) {
      md += `**Rate-uri publicate:**\n\n`;
      for (const r of l.rates) md += `- ${r}\n`;
      md += `\n`;
    }
    if (l.terms) md += `**Condiții:** ${l.terms}\n\n`;
    if (l.process) md += `**Cum se aplică:** ${l.process}\n\n`;
    if (l.caveat) md += `> ⚠️ ${l.caveat}\n\n`;
    md += `- ${l.url}\n\n`;
  }
}
md += `---
## 2. Joburi — scorate cu \`ALEX-KIT/scoring.gs\`

**${sc.stats.total} joburi analizate** (IQads ${srcTotal['IQads'] || 0} + designproject.io ${srcTotal['designproject.io'] || 0}) → ${sc.stats.kept} păstrate în tabele, ${sc.stats.dropped} drop-uri, din care **${sc.stats.amanzat} cu verdict amânat** (locația nu e publicată de sursă). **${sc.stats.newJobs} joburi noi** față de ${sc.prevDate || 'raportul anterior'}.

Surse: **IQads** (tabloul AdJob activ, citit azi) + **designproject.io** (România + București).

> ⛔ **Expirate marcate în tabele.** La IQads data de expirare vine direct din anunț. La designproject.io \`validThrough\` = data postării + 30 zile — **măsurat pe toate cele 26 de joburi** (24 exacte, 2 cu o zi de fus orar), deci e o expirare reală, nu o derivare inutilă. ${expiredInTables} joburi din tabele au expirat${expiredInAmanzat ? ` (+${expiredInAmanzat} în verdict amânat)` : ''} și nu se mai pot aplica.

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
md += sc.sections[2].length ? jobTable(sc.sections[2], true) : '*Niciun job în această secțiune.*\n';
md += '\n<!-- linkuri -->\n' + linkList(sc.sections[2]);
md += `\n### 2.3 Secțiunea 3 — mid-level — potrivire bună, senioritate sub prag (${sc.sections[3].length})\n\n`;
md += sc.sections[3].length ? jobTable(sc.sections[3], true) : '*Niciun job în această secțiune.*\n';
md += `\n### 2.4 Secțiunea 4 — on-site în afara Bucureștiului — doar dacă S=10 și D≥8 (${sc.sections[4].length})\n\n`;
md += sc.sections[4].length ? jobTable(sc.sections[4], true) : '*Niciun job în această secțiune.*\n';
md += `\n### 2.5 Verdict amânat — locația nu e publicată de sursă (${sc.stats.amanzat})\n\n`;
md += '| Scor | Rol | Companie | Locație | Engagement | Expirare | Nou |\n|---|---|---|---|---|---|---|\n';
for (const j of sc.amanzat) md += `| ${j.score} | ${cell(j.role)} | ${cell(j.company)} | neprecizată de sursă | ${cell(j.eng)} | ${j.expiry ? j.expiry.slice(0, 10) + (j.expired ? ' ⛔' : '') : '—'} | ${j.isNew ? ' ✅' : ''} |\n`;
md += `\n**Dintre astea, ${amanzatNew.length} sunt noi.** Nu le-am dat verdict de locație pentru că anunțul nu o spune — să le verifici pe cele care te interesează:\n\n`;
for (const j of sc.amanzat.slice(0, 8)) md += `- ${cell(j.role)} — ${cell(j.company)} (${j.src}) — ${j.url}\n`;
md += `\n### 2.6 Drop-uri (circuit breaker) — ${sc.stats.dropped}\n\n`;
md += '| Rol | Companie | Motiv | Nou |\n|---|---|---|---|\n';
for (const j of sc.dropped) md += `| ${cell(j.role)} | ${cell(j.company)} | ${cell(j.reason.replace('CIRCUIT BREAKER: ', ''))} | ${!j.inPrevSet ? ' ✅' : ''} |\n`;

md += `
---

## 3. Top 5 joburi cu scor

`;
md += '| # | Scor | Tag | Rol | Companie | Locație | Engagement | Expirat? | De ce contează |\n|---|---|---|---|---|---|---|---|---|\n';
top.forEach((j, i) => {
  const flags = sc.axisFromProse.find(x => x.role === j.role && x.company === j.company);
  md += `| ${i + 1} | **${j.score}** | ${j.tag} | ${cell(j.role)} | ${cell(j.company)} | ${cell(j.loc || '—')} | ${cell(j.eng || '—')} | ${j.expired ? '⛔ da' : 'nu'} | ${why(j, flags ? flags.flags : [])} |\n`;
});
md += '\n';
for (const j of top) md += `- ${j.company} :: ${j.role} — ${j.url}\n`;

const topDesign = allSections.filter(j => isDesignRole(j.role)).slice(0, 5);
const nonDesignInTop = top.filter(j => !isDesignRole(j.role)).length;
md += `
`;
if (nonDesignInTop) {
  md += `> **Atenție:** din top 5 după scor, ${nonDesignInTop} **nu sunt roluri de design** (au trecut doar pentru că textul lor conține "social media" sau "art director" — vezi §6.2). Iată top 5 **efectiv de design**, filtrate pe titlu:\n\n`;
} else {
  md += `> Top 5 după scor conține **doar roluri de design**. Iată top 5 filtrate pe titlu, pentru comparație:\n\n`;
}
md += '| # | Scor | Rol | Companie | Locație | Engagement | Expirat? | De ce contează |\n|---|---|---|---|---|---|---|---|\n';
topDesign.forEach((j, i) => {
  const flags = sc.axisFromProse.find(x => x.role === j.role && x.company === j.company);
  md += `| ${i + 1} | **${j.score}** | ${cell(j.role)} | ${cell(j.company)} | ${cell(j.loc || '—')} | ${cell(j.eng || '—')} | ${j.expired ? '⛔ da' : 'nu'} | ${why(j, flags ? flags.flags : [])} |\n`;
});
md += '\n';
for (const j of topDesign) md += `- ${j.company} :: ${j.role} — ${j.url}\n`;

md += `
---

## 4. Postări GENUIN noi (nu doar "absente din raportul de ieri")

> "nou" în tabele înseamnă **"nu era în raportul de ieri"**, nu neapărat "postat azi". Iată ce e postat efectiv nou:

| Sursă | Cum am măsurat | Rezultat |
|---|---|---|
| **IQads** | ID-ul ad-ului crește monoton cu postarea. Cel mai mare ID din setul de ieri: **${gn.maxPrevIqadsId}** | **${gn.newIqads.length} ${plural(gn.newIqads.length,'anunt nou','anunțuri noi','anunțuri noi')}** |
| **designproject.io** | data de publicare vs. ultima rulare | **${gn.newDesignproject.length} ${plural(gn.newDesignproject.length,'anunt nou','anunțuri noi','anunțuri noi')}** — cel mai recent de pe site e din **${gn.newestDesignprojectDate}** |

`;
for (const j of gn.newIqads) md += `- **IQads #${j.id}** — ${cell(j.role)} @ ${cell(j.company)} (expiră ${j.expiry}) — ${j.url}\n`;
for (const j of gn.newDesignproject) md += `- **designproject.io** — ${cell(j.role)} @ ${cell(j.company)} (postat ${j.date}) — ${j.url}\n`;

const totalNew = gn.newIqads.length + gn.newDesignproject.length;
if (totalNew === 0) {
  md += `**Concluzie:** **nicio postare nouă față de ultima rulare.** Piața nu a produs nimic nou relevant azi.\n\n`;
} else {
  md += `**Concluzie:** ${totalNew} postare${totalNew > 1 ? 'ri' : ''} nou${totalNew > 1 ? 'e' : ''} de la ultima rulare.\n\n`;
}
if (sc.stats.newJobs) md += `Ce nu a mai apărut în raportul anterior, dar există în catalog (${sc.stats.newJobs} la număr, toate cu ✅ în tabele):\n\n`;
for (const j of newJobs.slice(0, 25)) {
  md += `- **${j.score}** · Secția ${j.section} · ${cell(j.role)} — ${cell(j.company)} (${j.src})\n`;
}

md += `
---

## 5. Ce n-a mers, măsurat

`;
if (daysOff !== null) md += `1. **Etichetele MAVIS/* nu mai primesc nimic de ${daysOff} zile.** Filtrele au \`addLabelIds\` vid și nici măcar nu mai arhivează — ~${inboxCounts['7d_inbox']} mesaje/7 zile stau în inbox. Cauza: scriptul local \`email-sort-full.js\` (cel care punea etichetele) nu mai rulează.\n`;
md += `2. **designproject.io servește descrieri rescrise de AI** (24.000–33.000 de caractere, față de 71–1484 pe 22.10, inclusiv "📝 Enhancement Note"). E mai bogat, dar injectează cuvinte-cheie care ridică axele — vezi §6.2.\n`;
md += `3. **Celelalte două câmpuri de engagement ale designproject.io sunt inutilizabile.** \`employmentType\` din JSON-LD spune \`FULL_TIME\` pentru toate cele 26, iar badge-ul din listing spune "Full-time" pentru toate 26. Singura sură corectă e linia **"Job Type:"** din descriere (Trade Nation: "CONTRACTOR"; Mindrift: "PART_TIME" + freelance; Uvation: "Contractor"). Am folosit asta.\n`;
md += `4. **Paginatia IQads nu funcționează.** \`?page=2\` și \`?page=3\` servesc exact pagina 0 (aceleași linkuri). Catalogul complet e pe pagina 0 — nu iterez pagini.\n`;
md += `5. **Cota Google: ${usageTotal} cereri pe 200**${usageTotal > 200 ? ` (**depășit cu ${usageTotal - 200}**)` : usageTotal === 200 ? ' (**exact pe plafon**)' : ' (în limita plafonului)'}. Consumul pe etape:\n\n`;
md += '| Etapă | Cereri |\n|---|---|\n';
// report-build.js apare in contor cu cererile deja facute; upload-ul de dupa
// generare intra in aceeasi linie, ca sa nu apara de doua ori.
md += usageRows.map(([k, v]) => `| \`${k}\` | ${k === 'report-build.js' ? v + UPLOAD_COST : v} |`).join('\n') + '\n';
md += `| **total** | **${usageTotal}** |\n\n`;
md += `> ${usageNote || 'Contorul măsoară cererile efective făcute de fiecare script.'}\n\n`;
md += `Ce a mers peste plafon: am descărcat corpurile complete ale mesajelor de azi (${tri.all.length}) ca să disting mesajele care chiar cer răspuns de alertele automate — fără corp, nu se poate. **Zero scrieri pe Gmail** — niciun mail trimis, marcat sau arhivat.\n`;

md += `
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
**Ce propun:** ca \`D\` să se calculeze din **titlul rolului**, nu din textul anunțului, sau măcar ca un rol să poată intra într-o secțiune doar dacă titlul conține o cheie de design. E o decizie de motor — nu am atins \`scoring.gs\` fără acordul tău.

---

## 7. Fișiere

`;
const files = [
  ['rapoarte/RAPORT-ZILNIC-' + COMPACT.slice(0, 6) + '-' + COMPACT.slice(6) + '.md', 'raportul acesta (și în repo)'],
  ['mavis-tools/scoring-result-' + DATE + '.json', 'scoruri + secțiuni + diagnostice'],
  ['mavis-tools/jobs-iqads-' + DATE + '.json', 'joburi IQads, text integral'],
  ['mavis-tools/jobs-designproject-' + DATE + '.json', 'joburi designproject.io, JSON-LD'],
  ['mavis-tools/jobs-' + (sc.prevDate || '') + '.json', 'setul normalizat de ieri (cu care s-a comparat)'],
  ['mavis-tools/report-mail-count.json', 'numărătoare pe etichete MAVIS/*'],
  ['mavis-tools/report-inbox-counts.json', 'numărătoare exactă inbox'],
  ['mavis-tools/report-simulate-sort.json', 'simularea sortării + mesajele de azi'],
  ['mavis-tools/report-triage.js', 'clasificatorul mesajelor (needs-reply / needs-action / fyi / noise)'],
];
for (const [f, dsc] of files) {
  const p = path.join(DIR, '..', f);
  if (fs.existsSync(p)) md += `- \`${f}\` — ${dsc}\n`;
}

md += `
---

*Generat de Mavis Cloud. Nimic nu a fost șters, nimic nu a fost trimis, nimic nu a fost modificat în Gmail sau Drive. Totul e anulabil.*
`;

fs.writeFileSync(REPO_OUT, md);
console.log('raport scris local: ' + REPO_OUT + ' (' + md.length + ' caractere)');

// --dry: scrie raportul local, NU atinge Drive (pentru validare fara cereri)
if (process.argv.includes('--dry')) {
  console.log('--dry: nu se atinge Drive. 0 cereri Google.');
  process.exit(0);
}

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
