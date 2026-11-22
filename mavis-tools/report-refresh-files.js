#!/usr/bin/env node
/**
 * REFRESH §7 + LEDGERUL DE COTĂ — fără regenerarea întregului raport.
 *
 * De ce există (22.11.2026): secțiunea „Fișiere" a raportului lista 13
 * artefacte; 12 erau în repo, unul NU (`report-simulate-sort.json` — conține
 * corpuri de mesaje, repo public ⇒ gitignored). Raportul nu spunea nimic
 * despre asta ⇒ promisiune de livrabile neîndeplinită, fără semn.
 *
 * Acum §7 e GENERAT (report-files.js) și spune explicit unde stă fiecare
 * artefact. Dar raportul livrat azi mai are vechea listă. Acest instrument
 * reîmparte §7 dintr-un raport deja existent, fără să re-runeze pipeline-ul.
 *
 * ȘI rederive ledgerul de cotă din contorul MĂSURAT (.api-usage.json) —
 * niciodată o cifră scrisă cu mâna. Regula 30: „cota e o stare, nu o
 * promisiune" ⇒ cifra din raport trebuie să coincidă cu contorul final.
 *
 *   node mavis-tools/report-refresh-files.js 2026-11-22 --dry-run
 *   node mavis-tools/report-refresh-files.js 2026-11-22 --file-id=<ID>
 */
const fs = require('fs');
const path = require('path');
const k = require('./kit.js');
const RF = require('./report-files.js');

const DIR = __dirname;
const REPO = path.join(DIR, '..');
const args = process.argv.slice(2);
const argOf = (f, d) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : d; };
const DATE = args.find(a => /^\d{4}-\d{2}-\d{2}$/.test(a));
const FILE_ID = (args.find(a => a.startsWith('--file-id=')) || '').split('=')[1] || '';
const DRY = args.includes('--dry-run');
// Folderul de livrare: argument, sau ce a descoperit report-folder-discover.js
// (pe cale). Fara id hardcodat — un id stărit face cautarea sa nimiceasca.
let FOLDER = argOf('--folder', '');
if (!FOLDER) {
  try {
    FOLDER = JSON.parse(fs.readFileSync(path.join(DIR, 'report-folder.json'), 'utf8')).id || '';
  } catch (e) { FOLDER = ''; }
}
if (!FOLDER) { console.error('!! folderul de livrare e necunoscut: ruleaza report-folder-discover.js <cale> sau da --folder=<id>'); process.exit(2); }

if (!DATE) { console.error('usage: report-refresh-files.js <YYYY-MM-DD> [--file-id=<ID>] [--dry-run]'); process.exit(1); }

const COMPACT = DATE.replace(/-/g, '');
const LOCAL = path.join(REPO, 'rapoarte', `RAPORT-ZILNIC-${COMPACT.slice(0, 6)}-${COMPACT.slice(6)}.md`);

/** Contorul MĂSURAT al rulării curente. */
function measuredUsage() {
  let usage = {};
  try { usage = JSON.parse(fs.readFileSync(path.join(DIR, '.api-usage.json'), 'utf8')); } catch (e) {}
  const rows = Object.entries(usage)
    .filter(([n, v]) => !n.startsWith('_') && typeof v === 'number' && v > 0 && n !== 'report-refresh-files.js');
  return {
    rows,
    total: rows.reduce((a, [, v]) => a + v, 0),
    // câte cereri a consumat deja acest script în ziua asta (încercări anterioare)
    self: (usage['report-refresh-files.js'] && typeof usage['report-refresh-files.js'] === 'number') ? usage['report-refresh-files.js'] : 0,
  };
}

/**
 * Reîmparte §7 + ledgerul de cotă în textul raportului.
 * @param {string} md textul raportului
 * @param {number} refreshCost cererile Google ale acestei rulări (măsurate)
 */
function patchReport(md, refreshCost) {
  const { rows, total, self } = measuredUsage();
  const newTotal = total + refreshCost;

  const sc = JSON.parse(fs.readFileSync(path.join(DIR, `scoring-result-${DATE}.json`), 'utf8'));
  const filesBlock = RF.render({ date: DATE, compact: COMPACT, prevDate: sc.prevDate || '' });

  const table = [
    '| Etapă | Cereri |',
    '|---|---|',
    ...rows.slice().sort((a, b) => b[1] - a[1]).map(([n, v]) => `| \`${n}\` | ${v} |`),
    `| \`report-refresh-files.js\` | ${refreshCost} |`,
    `| **total** | **${newTotal}** |`,
  ].join('\n');

  let out = md;
  out = out.replace(/(## 7\. Fișiere\n\n)[\s\S]*?(\n---\n\n\*Generat de Mavis Cloud)/,
    (_, head, tail) => head + filesBlock + tail);
  out = out.replace(/\| Etapă \| Cereri \|\n\|---\|---\|\n[\s\S]*?\| \*\*total\*\* \| \*\*\d+\*\* \|/, table);
  out = out.replace(/^> Cota Google: \*\*\d+ cereri\*\*/m, `> Cota Google: **${newTotal} cereri**`);
  out = out.replace(/\*\*Cota Google: \d+ cereri pe 200\*\*/, `**Cota Google: ${newTotal} cereri pe 200**`);

  // --- proză statică care contrazice cifra măsurată (defect 22.11) ---
  // Antetul spunea că verificarea de pe Drive „mai adaugă 1 cerere", dar
  // usageTotal include deja VERIFY_COST=1 → implying 124 când ledgerul spune
  // 123. Se corectează cu aceeași formulare ca la sursă.
  out = out.replace(
    /^> Cifra e măsurată \*\*la scrierea raportului\*\*; verificarea conținutului de pe Drive \(citire înapoi, după upload\) mai adaugă \*\*1 cerere\*\*\.$/m,
    '> Cifra e măsurată **la scrierea raportului** și **include** verificarea de pe Drive (citirea înapoi, după upload) — deci e cifra finală a rulării, nu una care mai crește după.');
  // „Verificat pe 4 ferestre" — numărul ferestrelor vine din lista unică.
  out = out.replace(
    /Verificat pe \d+ ferestre\.?/g,
    `Verificat pe ${RF.WINDOWS.length} ferestre (${RF.WINDOWS.join(', ')}).`);

  // --- proză statică cu conținut greșit sau depășit (defecte 22.11) ---
  // Exemplul hardcodat din §1.1 spunea „o alertă de job care intră și la
  // „Joburi" și la „Newsletter"" — azi e fals (singurul mesaj cu 2 etichete
  // e unul AI + Newsletter). Exemplul nu se deduce din date ⇒ se scoate.
  out = out.replace(
    /\s*\(ex\. o alertă de job care intră și la „Joburi" și la „Newsletter"\)/g,
    ' (ex. un mesaj care primește două etichete de categorie)');
  // „din care 15 cu verdict amânat" — cei 15 sunt ÎN cei 36 păstrați (§2.5),
  // nu în cei 28 drop-uri. Referința era greșită.
  out = out.replace(
    /28 drop-uri, din care \*\*15 cu verdict amânat\*\*/g,
    '28 drop-uri, plus **15 cu verdict amânat**');
  // „Trei mecanisme, măsurate pe 05.11" e static de 18 rapoarte — se marchează
  // explicit ca măsurătoare de referință, nu de azi.
  out = out.replace(
    /\*\*Trei mecanisme, măsurate pe 05\.11:\*\*/g,
    '**Trei mecanisme, măsurate pe 05.11** (măsurătoare de referință, nu de azi):');
  // Lungimea descrierilor e măsurată de sondă, pe parse-ul ei — diferă de
  // fișierul arhivat (entități decodate). Se spune de unde vine cifra.
  out = out.replace(
    /(de caractere pe cele \d+ de joburi), măsurat azi\)/g,
    '$1, măsurat azi pe pagina live de sondă)');
  // Nume de etichete scrise cu mâna în proză (defect 8) — se elimină: numele
  // se rezolvă live prin taxonomy.js, în tabel; în proză n-are rost.
  out = out.replace(
    /\(ex\. "Joburi" \+ "Newsletter" de la LinkedIn\)/g,
    '(ex. două categorii de același tip)');
  // „de pe site" — listarea globală are postări mai noi decât listările folosite.
  out = out.replace(
    /cel mai recent de pe site e din/g,
    'cel mai recent pe listările folosite (România/București) e din');
  return { out, newTotal };
}

(async () => {
  // 1. găsește fișierul pe Drive (1 cerere) — ANTES de calculul cifrei,
  //    ca numărul de cereri al acestei rulări să fie MĂSURAT, nu estimat.
  let id = FILE_ID;
  if (!id && !DRY) {
    const s = await k.drive.search(`name='RAPORT-ZILNIC-${COMPACT.slice(0, 6)}-${COMPACT.slice(6)}.md' and '${FOLDER}' in parents and trashed=false`);
    const f = (s.files || [])[0];
    if (!f) { console.log('!! raportul nu a fost gasit pe Drive in folderul ' + FOLDER + ' — nu se face nimic'); process.exit(1); }
    id = f.id;
    console.log('gasit pe Drive: ' + id + ' (' + f.size + ' B)');
  }

  // 2. cererile acestei rulări: făcute deja (căutare) + cele rămase
  //    (1 PATCH upload + 1 GET de verificare). Numărate, nu ghicite.
  const done = k.CALL_STATE.calls;
  const plannedAfter = 2; // 1 PATCH (upload) + 1 GET (verificare pe continut)
  // rândul acestui script include și cererile consumate de încercările
  // anterioare ale zilei (ledgerul e acumulativ) — altfel raportul ar
  // subnumăra contorul final cu exact atâtea cereri câte au fost irosite.
  const refreshCost = measuredUsage().self + done + plannedAfter;

  const md = fs.readFileSync(LOCAL, 'utf8');
  const { out, newTotal } = patchReport(md, refreshCost);
  if (out === md) { console.log('nimic de schimbat — verifica marcajele din raport'); process.exit(0); }

  const before = measuredUsage().total;
  console.log('cota: ' + before + ' -> ' + newTotal + ' (refresh: ' + refreshCost + ' cereri)');
  if (DRY) {
    console.log('--- DRY RUN, nimic scris, nimic urcat ---');
    console.log(out.slice(out.indexOf('## 7. Fișiere')));
    process.exit(0);
  }

  fs.writeFileSync(LOCAL, out);
  console.log('raport scris: ' + LOCAL);

  // 3. livrare (1 PATCH) + verificare PE CONTINUT (1 GET)
  await k.drive.replaceContent(id, out, 'text/markdown');
  console.log('upload: PATCH ' + id);

  const remote = await k.drive.download(id);
  const rTxt = typeof remote === 'string' ? remote : (remote && remote.raw) ? remote.raw : (remote && remote.body) ? remote.body : JSON.stringify(remote);
  const required = [
    ['antet', /^# Raport zilnic/m],
    ['1. Gmail', /^## 1\. Gmail/m],
    ['2. joburi', /^## 2\. Joburi/m],
    ['3. top 5', /^## 3\. /m],
    ['4. postari noi', /^## 4\. /m],
    ['5. ce n-a mers', /^## 5\. /m],
    ['6. semnalari scoring', /^## 6\. /m],
    ['7. fisiere', /^## 7\. /m],
  ];
  let ok = true;
  for (const [n, re] of required) {
    const hit = re.test(rTxt);
    if (!hit) ok = false;
    console.log((hit ? '  OK   ' : '  LIPSA') + ' ' + n);
  }
  console.log('identitate cu localul: ' + (rTxt === out));
  console.log('cota in raportul de pe Drive: ' + ((rTxt.match(/Cota Google: \*\*(\d+) cereri\*\*/) || [])[1] || '?'));
  console.log('cereri efective ale acestui script: ' + k.CALL_STATE.calls);
  if (!ok) process.exitCode = 1;
})();
