#!/usr/bin/env node
/**
 * RAPORT ZILNIC — SONDA: etichete MAVIS/* necunoscute pentru taxonomie.
 *
 * `report-mail-count.js` raportează (pe stderr) etichetele `MAVIS/*` pe care
 * taxonomia nu le cunoaște, dar NU salvă id-urile lor și nu verifică dacă
 * poartă mesaje. Astfel, o etichetă nouă ar putea lua mesaje pe care nicio
 * categorie din raport nu le numără ⇒ cifre mascate.
 *
 * SONDA: pentru fiecare etichetă MAVIS/* necunoscută:
 *   - câte mesaje are azi / 7 zile;
 *   - câte mesaje de azi o poartă FĂRĂ nicio etichetă de categorie rezolvată
 *     (⇒ mesaje pe care raportul nu le numără în nicio categorie).
 *
 * READ-ONLY. Cost: ~3 cereri Google.
 */
const k = require('./kit.js');
const fs = require('fs');
const TAX = require('./taxonomy.js');

const TODAY = process.argv[2] || new Date().toISOString().slice(0, 10).replace(/-/g, '/');
const OUT = process.argv[3] || '/workspace/Mavis/mavis-tools/report-label-stray.json';

async function countExact(query) {
  let page = null; const ids = [];
  do {
    const url = 'https://gmail.googleapis.com/gmail/v1/users/me/messages?q='
      + encodeURIComponent(query) + '&maxResults=500' + (page ? '&pageToken=' + encodeURIComponent(page) : '');
    const r = await k.req('GET', url);
    for (const m of (r.messages || [])) ids.push(m.id);
    page = r.nextPageToken || null;
    if (page) await new Promise(res => setTimeout(res, 220));
  } while (page);
  return ids;
}

(async () => {
  const l = await k.gmail.labels();
  const { resolved, missing } = TAX.resolve(l.labels || []);
  const resolvedIds = new Set(resolved.map(r => r.id));
  const stray = (l.labels || []).filter(x => x.name.startsWith('MAVIS/') && !resolved.some(r => r.name === x.name));

  const out = { date: TODAY, missing, stray: [], orphanToday: 0, orphanSamples: [] };

  for (const s of stray) {
    const azi = await countExact(`label:${JSON.stringify(s.name)} after:${TODAY}`);
    const s7 = await countExact(`label:${JSON.stringify(s.name)} newer_than:7d`);
    // mesaje de azi care poartă eticheta străină: verificăm dacă au și vreo
    // etichetă de categorie rezolvată (altfel, mesajul nu intră în nicio
    // categorie din raport).
    let orphan = 0; const samples = [];
    if (azi.length) {
      const got = await k.req('GET', 'https://gmail.googleapis.com/gmail/v1/users/me/messages?ids=' + azi.join(','));
      for (const m of (got.messages || [])) {
        const hasCat = (m.labelIds || []).some(x => resolvedIds.has(x));
        if (!hasCat) { orphan++; if (samples.length < 5) samples.push({ id: m.id, subject: (m.snippet || '').slice(0, 80) }); }
      }
    }
    out.stray.push({ name: s.name, id: s.id, azi: azi.length, s7: s7.length, aziFaraCategorie: orphan });
    out.orphanToday += orphan;
    out.orphanSamples.push(...samples);
    console.log(`${s.name}: azi=${azi.length} 7z=${s7.length} azi_fara_categorie=${orphan}`);
  }

  fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
  console.log('missing (eticheta nu exista in Gmail): ' + missing.map(m => m.title).join(' | '));
  console.log('mesaje de azi pe etichete necunoscute, fara categorie: ' + out.orphanToday);
  console.log('-> ' + OUT);
})();
