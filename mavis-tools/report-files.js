#!/usr/bin/env node
/**
 * ARTEFACTELE RAPORTULUI ZILNIC — lista generată, cu PROVENIENȚĂ explicită.
 *
 * De ce există (măsurat 22.11.2026): raportul de azi lista 13 fișiere. 12 erau
 * în repo. Unul NU: `report-simulate-sort.json` — pentru că conține CORPURI DE
 * MESAJE, iar repo-ul e PUBLIC (`.gitignore` → „DATE PERSONALE — dumpuri de
 * mail cu corpuri complete. Se citesc in timpul raportului, dar nu se
 * versioneaza."). Raportul nu o spunea.
 *
 * ⇒ cine citea raportul căuta un fișier care nu exista acolo. E aceeași clasă
 * de defect ca secțiunea de leads dispărută din raportul din 28.10: o
 * promisiune de livrabile, neîndeplinită, fără niciun semn.
 *
 * REGULA: orice fișier listat în raport spune EXPLICIT unde stă:
 *   - implicit            → „în repo" (se descarcă, se verifică, e reprodusibil)
 *   - `local: true`       → „local, necomitat în repo" — conține date
 *                           personale; trăiește în workspace-ul cloud și NU
 *                           ajunge în repo. Deliberat, nu din uitare.
 *
 * NOTĂ: `report-simulate-sort.json` e listat NECONDȚIONAT. Nu e o scuză: e
 * input MANDATORIU al lui `report-build.js` (`const sim = R('report-simulate-sort.json')`),
 * deci dacă build-ul rulează, fișierul există. Dacă n-ar exista, build-ul ar
 * arunca. Deci lista nu poate minți.
 */

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');

// Fereastra de măsurare a etichetelor — SINGURA sursă. Declared aici, ca
// numărul de ferestre să fie calculat în ambele locuri unde apare (tabelul
// §1.2 și proza de sub el). 22.11.2026: proza spunea „Verificat pe 4 ferestre"
// cu cifra scrisă de mână, iar tabelul avea 4 coloane — azi e adevărat, dar
// numai cât timp cineva nu schimbă ferestrele fără să schimbe și proza.
const WINDOWS = ['azi', '24h', '7z', '30z'];

/**
 * @param {object} o
 * @param {string} o.date      data rulării (YYYY-MM-DD)
 * @param {string} o.compact   data fără liniuții (YYYYMMDD)
 * @param {string} o.prevDate  data setului de ieri (pentru comparație)
 * @returns {{p:string,d:string,local?:boolean}[]}
 */
function artifacts({ date, compact, prevDate }) {
  return [
    { p: `rapoarte/RAPORT-ZILNIC-${compact.slice(0, 6)}-${compact.slice(6)}.md`, d: 'raportul acesta (și în repo)' },
    { p: `mavis-tools/scoring-result-${date}.json`, d: 'scoruri + secțiuni + diagnostice' },
    { p: `mavis-tools/jobs-iqads-${date}.json`, d: 'joburi IQads, text integral' },
    { p: `mavis-tools/jobs-designproject-${date}.json`, d: 'joburi designproject.io, JSON-LD' },
    { p: `mavis-tools/jobs-${prevDate || ''}.json`, d: 'setul normalizat de ieri (cu care s-a comparat)' },
    { p: 'mavis-tools/report-mail-count.json', d: 'numărătoare pe etichetele de categorie' },
    { p: 'mavis-tools/report-inbox-counts.json', d: 'numărătoare exactă inbox' },
    { p: 'mavis-tools/report-simulate-sort-clasificare.json', d: 'clasificarea mesajelor de azi, fără corpuri (cifre verificabile din repo)' },
    { p: 'mavis-tools/report-simulate-sort.json', d: 'simularea sortării + mesajele de azi', local: true },
    { p: 'mavis-tools/report-source-probe.json', d: 'sonda de surse (comportamentul iqads.ro / designproject.io, măsurat azi)' },
    { p: 'mavis-tools/report-filter-state.json', d: 'starea filtrelor Gmail + testul paranteze-vs-acolade (măsurat azi)' },
    { p: 'mavis-tools/report-label-stray.json', d: 'etichetele `MAVIS/*` necunoscute pentru taxonomie + mesajele rămase necategorizate (măsurat azi)' },
    { p: 'mavis-tools/report-triage.js', d: 'clasificatorul mesajelor (needs-reply / needs-action / fyi / noise)' },
    { p: 'mavis-tools/taxonomy.js', d: 'sursa unică pentru numele etichetelor de categorie (rezolvate live, nu hardcodate)' },
  ];
}

/**
 * Randarea secțiunii „Fișiere" a raportului.
 * @returns {string} linii markdown gata de inserat
 */
function render(opts) {
  const lines = [];
  for (const a of artifacts(opts)) {
    if (a.local) {
      lines.push(`- \`${a.p}\` — ${a.d} — **local, necomitat în repo** (conține corpuri de mesaje; stă în workspace-ul cloud)`);
      continue;
    }
    // Un artefact care nu există NU se listează: o listă de fișiere promise
    // care nu sunt pe disc e exact defectul pe care îl reparăm.
    if (!fs.existsSync(path.join(REPO, a.p))) continue;
    lines.push(`- \`${a.p}\` — ${a.d}`);
  }
  return lines.join('\n');
}

module.exports = { artifacts, render, REPO, WINDOWS };

if (require.main === module) {
  const date = process.argv[2] || new Date().toISOString().slice(0, 10);
  console.log(render({
    date,
    compact: date.replace(/-/g, ''),
    prevDate: process.argv[3] || '',
  }));
}
