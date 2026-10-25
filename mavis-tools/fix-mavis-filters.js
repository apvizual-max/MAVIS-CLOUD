#!/usr/bin/env node
/**
 * REPARATIA FILTRELOR Gmail MAVIS/* — pregătită 2026-10-25, neaplicată din cloud.
 *
 * DE CE NU S-A APLICAT DIN CLOUD: tokenul din cloud are `gmail.modify`, dar NU
 * `gmail.settings.basic`. Fara acest scope, `filters PATCH` raspunde 403
 * "insufficient scopes". Deci se ruleaza de pe masina lui Alex, unde scope-ul exista.
 *
 * CE REPARA (doua defecte, masurate la 2026-10-25):
 *   1) CRITERII: in cautarea Gmail, `()` = SI, `{}` = SAU. Cele 5 filtre scriau
 *      `from:(jooble bestjobs hipo indeed jobleads linkedin)`, deci cereau un
 *      expeditor cu TOATE cuvintele simultan -> 0 mesaje lovite in 30 de zile.
 *      Cu `{}` ar fi prins 2967 mesaje in 30 de zile.
 *   2) ACTIUNE: `addLabelIds` era vid -> chiar daca filtrul ar fi lovit ceva,
 *      nu ar fi pus eticheta MAVIS/*.
 *
 * SIGURANTA:
 *   - starea curenta a celor 5 filtre se salveaza in
 *     `mavis-tools/filters-state-before-repair.json` -> rollback exact.
 *   - se atinge DOAR cele 5 filtre MAVIS/*; celelalte 13 raman neatinse.
 *   - NICIO stergere, NICIO trimitere. Orice PATCH se poate anula cu
 *     `--rollback`.
 *   - etichetele MAVIS/* se pot reface pe orice mesaj, oricand.
 *
 * UTILIZARE:
 *   node fix-mavis-filters.js --dry-run     # arata ce ar face, nu scrie nimic
 *   node fix-mavis-filters.js               # aplica reparatia
 *   node fix-mavis-filters.js --rollback    # readuce starea salvata
 */
const fs = require('fs');
const path = require('path');
const k = require('./kit.js');

const DIR = __dirname;
const STATE_FILE = path.join(DIR, 'filters-state-before-repair.json');
const DRY = process.argv.includes('--dry-run');
const ROLLBACK = process.argv.includes('--rollback');

/** Criteriile celor 5 filtre, cum sunt scrise acum in Gmail (masurate live, nu ghicite). */
const MAVIS_CRITERIA = [
  'from:(jooble bestjobs hipo indeed jobleads linkedin) OR subject:(job angajare vacanta oportunitate)',
  'from:(substack goatacademy aiautomationsociety sadhguru beehiiv twine) OR subject:(AI artificial intelligence)',
  'from:(skool facebook instagram pinterest tiktok polibrawl)',
  'from:(noreply no-reply newsletter digest mail@ info@ news@ updates@)',
  'from:(kraken tradingview bitunix coinbase binance) OR subject:(factura investitie trading)',
];

/** Categoria MAVIS/* pe care o eticheteaza fiecare filtru (nume, rezolvat la runtime). */
const CATEGORY_LABEL = {
  'from:(jooble bestjobs hipo indeed jobleads linkedin) OR subject:(job angajare vacanta oportunitate)': 'MAVIS/Joburi',
  'from:(substack goatacademy aiautomationsociety sadhguru beehiiv twine) OR subject:(AI artificial intelligence)': 'MAVIS/AI si comunitati',
  'from:(skool facebook instagram pinterest tiktok polibrawl)': 'MAVIS/Social',
  'from:(noreply no-reply newsletter digest mail@ info@ news@ updates@)': 'MAVIS/Newsletter',
  'from:(kraken tradingview bitunix coinbase binance) OR subject:(factura investitie trading)': 'MAVIS/Finante',
};

/**
 * `from:(a b c)` -> `from:{a b c}`.
 * In cautarea Gmail: parantezele = SI, acoladele = SAU.
 * Grupele vide se elimina, ca sa nu lase un criteriu gol.
 */
function toOrGroups(query) {
  return query.replace(/\(([^()]*)\)/g, (m, inner) => {
    const parts = inner.trim().split(/\s+/).filter(Boolean);
    return parts.length ? '{' + parts.join(' ') + '}' : '';
  });
}

async function loadFilters() {
  const fl = await k.req('GET', 'https://gmail.googleapis.com/gmail/v1/users/me/settings/filters');
  return fl.filter || [];
}

(async () => {
  const labels = await k.gmail.labels();
  const name2id = {};
  (labels.labels || []).forEach(l => { name2id[l.name] = l.id; });

  // ---- ROLLBACK ----
  if (ROLLBACK) {
    if (!fs.existsSync(STATE_FILE)) {
      console.log('Nu exista ' + STATE_FILE + ' — nu am ce readuce.');
      process.exit(1);
    }
    const saved = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    for (const f of saved.filters) {
      const r = await k.req('PATCH', `https://gmail.googleapis.com/gmail/v1/users/me/settings/filters/${f.id}`, f.action);
      console.log(`  rollback ${f.name}: add=${JSON.stringify(r.action?.addLabelIds || [])} remove=${JSON.stringify(r.action?.removeLabelIds || [])}`);
    }
    console.log('Starea de dinainte a fost readusa. Filtrele celelalte nu au fost atinse.');
    return;
  }

  const all = await loadFilters();
  const byQuery = {};
  for (const f of all) if (f.criteria && f.criteria.query) byQuery[f.criteria.query] = f;

  const targets = MAVIS_CRITERIA
    .map(q => ({ q, f: byQuery[q] }))
    .filter(x => x.f);

  console.log('Filtre MAVIS gasite: ' + targets.length + ' / ' + MAVIS_CRITERIA.length);
  if (targets.length < MAVIS_CRITERIA.length) {
    console.log('ATENTIE: un criteriu nu mai exista in Gmail — filtrul a fost modificat manual sau sters.');
    MAVIS_CRITERIA.filter(q => !byQuery[q]).forEach(q => console.log('  lipseste: ' + q));
  }

  // ---- salveaza starea de dinainte (o singura data) ----
  const before = targets.map(x => ({
    id: x.f.id, name: CATEGORY_LABEL[x.q] || 'necunoscut',
    criteria: x.f.criteria, action: x.f.action,
  }));
  if (!fs.existsSync(STATE_FILE)) {
    fs.writeFileSync(STATE_FILE, JSON.stringify({ savedAt: new Date().toISOString(), note: 'starea filtrelor MAVIS/* inainte de reparatie — pentru rollback', filters: before }, null, 2));
    console.log('Starea de dinainte salvata -> ' + STATE_FILE);
  } else {
    console.log('Starea de dinainte exista deja, nu o suprascriu.');
  }

  for (const x of targets) {
    const labelName = CATEGORY_LABEL[x.q];
    const labelId = name2id[labelName];
    if (!labelId) { console.log('  !! eticheta "' + labelName + '" nu exista — sarit'); continue; }
    const fixedQuery = toOrGroups(x.q);
    const action = {
      addLabelIds: [labelId],
      removeLabelIds: (x.f.action && x.f.action.removeLabelIds) ? x.f.action.removeLabelIds : ['UNREAD', 'INBOX'],
    };
    if (DRY) {
      console.log(`  [DRY] ${labelName.padEnd(24)} criteriu: ${x.q}`);
      console.log(`        ->             criteriu: ${fixedQuery}`);
      console.log(`        actiune acum: ${JSON.stringify(x.f.action)}`);
      console.log(`        actiune noua: ${JSON.stringify({ addLabelIds: [labelId], removeLabelIds: action.removeLabelIds })}`);
      continue;
    }
    const r = await k.req('PATCH', `https://gmail.googleapis.com/gmail/v1/users/me/settings/filters/${x.f.id}`, {
      criteria: { query: fixedQuery },
      action,
    });
    console.log(`  PATCH ${labelName.padEnd(24)} id=${x.f.id} | criteriu nou: ${r.criteria?.query} | add=${JSON.stringify(r.action?.addLabelIds || [])}`);
  }

  if (!DRY) {
    const v = await loadFilters();
    console.log('\n=== VERIFICARE ===');
    for (const x of targets) {
      const y = (v || []).find(z => z.id === x.f.id);
      console.log(`  ${(CATEGORY_LABEL[x.q] || '').padEnd(24)} criteriu=${y?.criteria?.query} add=${JSON.stringify(y?.action?.addLabelIds || [])} remove=${JSON.stringify(y?.action?.removeLabelIds || [])}`);
    }
    console.log(`  celelalte ${(v || []).filter(z => !targets.some(t => t.f.id === z.id)).length} filtre: neatinse`);
  }
})().catch((e) => { console.error('ERR:', e.message); process.exit(1); });
