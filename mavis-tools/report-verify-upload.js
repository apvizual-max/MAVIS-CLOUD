#!/usr/bin/env node
/**
 * VERIFICARE DE LIVRARE — citește fișierul de pe Drive și îl compară cu localul.
 *
 * REGULA (28.10.2026): metadata-ul poate fi perfect și conținutul să lipsească.
 * Un raport uitat fără secțiunea de leads a fost încărcat „cu succes" și
 * nimeni nu a observat. Deci verificăm CONȚINUTUL, secțiune cu secțiune.
 *
 * Cost: 1 cerere Google (drive.files.get alt=media).
 */
const fs = require('fs');
const path = require('path');
const k = require('./kit.js');

const FILE_ID = process.argv[2];
const LOCAL = process.argv[3];

(async () => {
  const remote = await k.drive.download(FILE_ID);
  // kit.js intoarce {raw: <text>} cand corpul nu e JSON (fisier markdown).
  const rTxt = typeof remote === 'string' ? remote
    : (remote && typeof remote.raw === 'string') ? remote.raw
    : (remote && typeof remote.body === 'string') ? remote.body
    : JSON.stringify(remote);
  const lTxt = fs.readFileSync(LOCAL, 'utf8');

  console.log('remote bytes : ' + Buffer.byteLength(rTxt, 'utf8'));
  console.log('local  bytes : ' + Buffer.byteLength(lTxt, 'utf8'));
  console.log('identice     : ' + (rTxt === lTxt));

  // sectiunile promise, verificate explicit in continutul de pe Drive
  const required = [
    ['antet', /^# Raport zilnic/m],
    ['1. Gmail', /^## 1\. Gmail/m],
    ['1.2 masuratoare pe etichete', /^### 1\.2 /m],
    ['1.3 filtre', /^### 1\.3 /m],
    ['1.4 simulare', /^### 1\.4 /m],
    ['1.5 mesaje care necesita raspuns', /^### 1\.5 /m],
    ['2. joburi', /^## 2\. Joburi/m],
    ['2.1 sectiunea 1', /^### 2\.1 /m],
    ['2.2 sectiunea 2', /^### 2\.2 /m],
    ['2.3 sectiunea 3', /^### 2\.3 /m],
    ['2.4 sectiunea 4', /^### 2\.4 /m],
    ['2.5 verdict amanat', /^### 2\.5 /m],
    ['3. top 5', /^## 3\. /m],
    ['4. postari noi', /^## 4\. /m],
    ['5. ce n-a mers', /^## 5\. /m],
    ['6. semnalari scoring', /^## 6\. /m],
    ['7. fisiere', /^## 7\. /m],
  ];
  let ok = true;
  for (const [name, re] of required) {
    const hit = re.test(rTxt);
    if (!hit) ok = false;
    console.log((hit ? '  OK   ' : '  LIPSA') + ' ' + name);
  }
  // cifrele-cheie, citite din continutul de pe Drive (nu din memorie)
  const checks = [
    ['mesaje azi', /Azi au intrat \*\*(\d+) mesaje\*\*/],
    ['etichete azi', /Pe etichetele de categorie a intrat azi: (\d+) (?:mesaje|etichete)/],
    ['joburi analizate', /\*\*(\d+) joburi analizate\*\*/],
    ['cota', /Cota Google: \*\*(\d+) cereri\*\*/],
  ];
  console.log('\ncifrele-cheie, extrase din continutul de pe Drive:');
  for (const [name, re] of checks) {
    const m = rTxt.match(re);
    console.log('  ' + name.padEnd(18) + (m ? m[1] : 'NU SE GASESTE'));
  }
  console.log('\nVERDICT: ' + (ok && rTxt === lTxt ? 'OK — continutul de pe Drive e identic cu localul si are toate sectiunile'
    : ok ? 'SECTIUNI OK, dar diferenta de continut fata de local' : 'LIPSA SECTIUNI'));
  console.log('cereri: ' + k.CALL_STATE.calls);
})();
