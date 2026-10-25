#!/usr/bin/env node
/**
 * RAPORT ZILNIC — starea filtrelor Gmail MAVIS/*, măsurată AZI.
 *
 * Nu copiem filtrul de ieri: îl citim live din Gmail și îl TESTĂM.
 *
 * MĂSURĂTOARE CHEIE (descoperită 2026-10-25): în căutarea Gmail, parantezele
 * `()` = ȘI, iar acoladele `{}` = SAU. Cele 5 filtre MAVIS/* folosesc
 * `from:(jooble bestjobs ...)`, deci cer un expeditor care să conțină TOATE
 * cuvintele simultan — deci nu pot lovi niciodată. Testăm asta, nu presupunem.
 *
 * READ-ONLY: nu creează, nu modifică, nu șterge niciun filtru.
 *
 * Ieșire: report-filter-state.json
 */
const fs = require('fs');
const path = require('path');
const k = require('./kit.js');

const OUT = path.join(__dirname, 'report-filter-state.json');

/** Cele 5 criterii MAVIS/*, cum sunt scrise în Gmail (măsurate, nu ghicite). */
const MAVIS_CRITERIA = [
  'from:(jooble bestjobs hipo indeed jobleads linkedin) OR subject:(job angajare vacanta oportunitate)',
  'from:(substack goatacademy aiautomationsociety sadhguru beehiiv twine) OR subject:(AI artificial intelligence)',
  'from:(skool facebook instagram pinterest tiktok polibrawl) OR subject:()',
  'from:(noreply no-reply newsletter digest mail@ info@ news@ updates@) OR subject:()',
  'from:(kraken tradingview bitunix coinbase binance) OR subject:(factura investitie trading)',
];

const listCount = async (q) => {
  let page = null, total = 0;
  do {
    const url = 'https://gmail.googleapis.com/gmail/v1/users/me/messages?q='
      + encodeURIComponent(q) + '&maxResults=500' + (page ? '&pageToken=' + encodeURIComponent(page) : '');
    const r = await k.req('GET', url);
    total += (r.messages || []).length;
    page = r.nextPageToken || null;
  } while (page);
  return total;
};

/** Aceeasi criterii, cu `()` -> `{}` (paranteze = SI, acolade = SAU in Gmail). */
function toOrGroups(query) {
  return query.replace(/\(([^()]*)\)/g, (m, inner) => {
    const parts = inner.trim().split(/\s+/).filter(Boolean);
    return parts.length ? '{' + parts.join(' ') + '}' : '';
  });
}

(async () => {
  const fl = await k.req('GET', 'https://gmail.googleapis.com/gmail/v1/users/me/settings/filters');
  const labs = await k.gmail.labels();
  const id2name = {};
  (labs.labels || []).forEach(l => { id2name[l.id] = l.name; });
  const nm = id => (id2name[id] || id);

  const all = fl.filter || [];
  // Filtrele MAVIS sunt cele 5 cu criteriu de interogare (fara from: fix).
  // Filtrele MAVIS sunt cele 5 cu criteriu de interogare. Excludem filtrele
  // de tip lista (`list:...` = lista de abonare Mailchimp): nu sunt categorii MAVIS.
  const mavis = all.filter(f => (f.criteria && f.criteria.query) && !f.criteria.from
    && !/^list:/i.test(f.criteria.query));

  const rows = mavis.map(f => {
    const a = f.action || {};
    return {
      id: f.id,
      query: f.criteria.query,
      addLabelIds: (a.addLabelIds || []).map(nm),
      removeLabelIds: (a.removeLabelIds || []).map(nm),
    };
  });

  // TEST: cate mesaje (din ultimele 30 zile) loveste filtrul cum e scris acum,
  // si cate ar lovi daca parantezele ar fi acolade.
  const probeWindow = 'newer_than:30d';
  const tests = [];
  for (const r of rows) {
    const asIs = await listCount(r.query + ' ' + probeWindow);
    const fixed = await listCount(toOrGroups(r.query) + ' ' + probeWindow);
    tests.push({
      id: r.id,
      query: r.query,
      fixedQuery: toOrGroups(r.query),
      matchesAsIs: asIs,
      matchesFixed: fixed,
    });
  }

  const out = {
    totalFilters: all.length,
    mavisFilters: rows.length,
    withAddLabelIds: rows.filter(r => r.addLabelIds.length).length,
    withMavisAdd: rows.filter(r => r.addLabelIds.some(x => x.startsWith('MAVIS/'))).length,
    withRemoveInbox: rows.filter(r => r.removeLabelIds.includes('INBOX')).length,
    rows,
    tests,
    verdict: {
      parenthesisIsAnd: tests.length > 0 && tests.every(t => t.matchesAsIs === 0 && t.matchesFixed > 0),
      note: 'Gmail: () = SI, {} = SAU. Filtrele cu from:(...) nu pot lovi niciun mesaj.',
    },
  };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
  console.log('filtre totale: ' + out.totalFilters + ' | filtre cu criteriu: ' + out.mavisFilters);
  console.log('cu addLabelIds: ' + out.withAddLabelIds + ' | care ating etichete MAVIS/*: ' + out.withMavisAdd);
  console.log('\nTEST 30 zile — cum e scris acum  vs  cum ar trebui scris:');
  for (const t of tests) console.log(`  acum=${String(t.matchesAsIs).padStart(3)} | cu acolade=${String(t.matchesFixed).padStart(3)} | ${t.query.slice(0, 72)}`);
  console.log('\nverdict: ' + JSON.stringify(out.verdict));
  console.log('\n-> ' + OUT);
  console.log('cereri: ' + k.CALL_STATE.calls);
})();
