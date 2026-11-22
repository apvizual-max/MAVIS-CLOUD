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
const FOLDER = argOf('--folder', '1sAs2ktJhGanKeGv87LIxkTD34S7P5XvT');

if (!DATE) { console.error('usage: report-refresh-files.js <YYYY-MM-DD> [--file-id=<ID>] [--dry-run]'); process.exit(1); }

const COMPACT = DATE.replace(/-/g, '');
const LOCAL = path.join(REPO, 'rapoarte', `RAPORT-ZILNIC-${COMPACT.slice(0, 6)}-${COMPACT.slice(6)}.md`);

/** Contorul MĂSURAT al rulării curente. */
function measuredUsage() {
  let usage = {};
  try { usage = JSON.parse(fs.readFileSync(path.join(DIR, '.api-usage.json'), 'utf8')); } catch (e) {}
  const rows = Object.entries(usage)
    .filter(([n, v]) => !n.startsWith('_') && typeof v === 'number' && v > 0 && n !== 'report-refresh-files.js');
  return { rows, total: rows.reduce((a, [, v]) => a + v, 0) };
}

/**
 * Reîmparte §7 + ledgerul de cotă în textul raportului.
 * @param {string} md textul raportului
 * @param {number} refreshCost cererile Google ale acestei rulări (măsurate)
 */
function patchReport(md, refreshCost) {
  const { rows, total } = measuredUsage();
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
  const plannedAfter = 2;
  const refreshCost = done + plannedAfter;

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
