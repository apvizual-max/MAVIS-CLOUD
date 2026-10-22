/**
 * Repara filtrele MAVIS/*: cele 5 filtre server-side au CRITERIA, dar actiunea goala
 * (addLabelIds vid) -> de aceea nu mai eticheteaza nimic de la 2026-10-11.
 *
 * SIGURANTA:
 *  - inainte de orice PATCH, starea curenta a celor 5 filtre se salveaza in
 *    mavis-tools/filters-state-before-repair.json -> rollback exact.
 *  - nu se atinge niciun alt filtru (13 filtre ramase in functiune, neatinse).
 *  - PATCH pe actiune: se adauga eticheta MAVIS/* corespunzatoare, se elimina
 *    categoria automata sau 'INBOX' (altfel mailul s-ar intoarce in inbox).
 *  - NICIO stergere, NICIO trimitere, etichetele se pot reface in orice clipa.
 */
const k = require('/workspace/mavis-cloud/mavis-tools/kit.js');
const fs = require('fs');

const MAVIS = {
  'ANe1Bmg1Fp1gbOOwpbMP0GYRtHr2q4oCoz90_slWYtidpg': { label: 'Label_27', name: 'MAVIS/Joburi', q: 'joburi' },
  'ANe1BmgxeOQZnhS7PuIpbDL2KG-KhW7EziLSCnfX14ZLjQ': { label: 'Label_28', name: 'MAVIS/AI si comunitati', q: 'ai' },
  'ANe1BmgzA59DVN8xmb64FSv7pOAFhVMCMoMpstsgrBKSBQ': { label: 'Label_29', name: 'MAVIS/Social', q: 'social' },
  'ANe1Bmixbpuav9nBZ5L7iBdSSWT9NWRsH6Ft7qleiTwQrw': { label: 'Label_30', name: 'MAVIS/Newsletter', q: 'newsletter' },
  'ANe1Bmhp4knu_xnQ3Pvf2URK-MKc-lKsgJiqGW-KY-ZPTA': { label: 'Label_31', name: 'MAVIS/Finante', q: 'finante' },
};
const REMOVE = ['UNREAD', 'INBOX']; // comportamentul actual al filtrelor: arhiveaza + marcheaza citit
const DRY = process.argv.includes('--dry-run');

(async () => {
  const f = await k.req('GET', 'https://gmail.googleapis.com/gmail/v1/users/me/settings/filters');
  const list = f.filter || [];
  const target = list.filter((x) => MAVIS[x.id]);
  console.log(`Filtre MAVIS gasite: ${target.length} / ${Object.keys(MAVIS).length}`);

  // 1) salveaza starea exacta de dinainte
  const before = target.map((x) => ({ id: x.id, name: MAVIS[x.id].name, criteria: x.criteria, action: x.action }));
  const path = '/workspace/mavis-cloud/mavis-tools/filters-state-before-repair.json';
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({ savedAt: new Date().toISOString(), filters: before }, null, 2));
    console.log(`Starea de dinainte salvata -> ${path}`);
  } else {
    console.log('Starea de dinainte exista deja, nu o suprascriu.');
  }

  for (const x of target) {
    const m = MAVIS[x.id];
    // REPARATIE MINIMA, ADITIVA: pastram removeLabelIds cum erau (arhiveaza + citit)
    // si adaugam doar eticheta MAVIS/* care lipsea. Nimic altceva nu se schimba.
    const action = {
      addLabelIds: [m.label],
      removeLabelIds: (x.action && x.action.removeLabelIds) ? x.action.removeLabelIds : REMOVE,
    };
    if (DRY) {
      console.log(`  [DRY] ${m.name.padEnd(24)} add=${m.label} remove=${JSON.stringify(action.removeLabelIds)} | actiune curenta: ${JSON.stringify(x.action)}`);
      continue;
    }
    const r = await k.req('PATCH', `https://gmail.googleapis.com/gmail/v1/users/me/settings/filters/${x.id}`, action);
    console.log(`  PATCH ${m.name.padEnd(24)} -> add=${m.label} remove=${JSON.stringify(action.removeLabelIds)} | id=${r.id}`);
  }

  if (!DRY) {
    const v = await k.req('GET', 'https://gmail.googleapis.com/gmail/v1/users/me/settings/filters');
    console.log('\n=== VERIFICARE ===');
    for (const x of (v.filter || []).filter((y) => MAVIS[y.id])) {
      console.log(`  ${MAVIS[x.id].name.padEnd(24)} addLabelIds=${JSON.stringify(x.action?.addLabelIds)} removeLabelIds=${JSON.stringify(x.action?.removeLabelIds)}`);
    }
    const others = (v.filter || []).filter((y) => !MAVIS[y.id]);
    console.log(`  celelalte ${others.length} filtre: neatinse`);
  }
})().catch((e) => { console.error('ERR:', e.message); process.exit(1); });
