#!/usr/bin/env node
/**
 * SIMULARE: cum ar fi fost sortate mesajele de azi, daca filtrele ar functiona.
 * Aplica EXACT criteriile celor 5 filtre MAVIS (masurate live, filtrul "joburi"
 * are query-ul de mai jos; restul vin din email-sort-full.js, care le oglindeste).
 *
 * Nu scrie NIMIC. Doar calculeaza.
 */
const k = require('./kit.js');
const fs = require('fs');

// data pentru fereastra "azi" (format Gmail: AAAA/LL/ZZ). Implicit: azi.
const TODAY = process.argv[2] || new Date().toISOString().slice(0, 10).replace(/-/g, '/');
const TODAY_ISO = TODAY.replace(/\//g, '-');

const CATS = [
  ['MAVIS/Joburi',    { from: /jooble|bestjobs|hipo|indeed|jobleads|recruit|linkedin|iqads|designproject/i, subject: /job|angajare|vacanta|oportunitate/i }],
  ['MAVIS/AI si comunitati', { from: /substack|goatacademy|aiautomationsociety|sadhguru|beehiiv|twine|comfy|deepmind|openai|anthropic/i, subject: /\bAI\b|artificial intelligence/i }],
  ['MAVIS/Social',    { from: /skool|facebook|instagram|tiktok|pinterest|polibrawl|youtube/i, subject: null }],
  ['MAVIS/Newsletter',{ from: /noreply|no-reply|newsletter|digest|promotions|offers|deals|notificari|notificări/i, subject: null }],
  ['MAVIS/Finante',   { from: /kraken|tradingview|bitunix|coinbase|binance/i, subject: /factura|investitie/i }],
];

(async () => {
  // toate mesajele de azi (in orice stare, nu doar inbox)
  let page = null; const ms = [];
  do {
    const url = 'https://gmail.googleapis.com/gmail/v1/users/me/messages?q='
      + encodeURIComponent(`in:anywhere after:${TODAY}`) + '&maxResults=500' + (page ? '&pageToken=' + encodeURIComponent(page) : '');
    const r = await k.req('GET', url);
    for (const m of r.messages || []) ms.push(m.id);
    page = r.nextPageToken || null;
    if (page) await new Promise(res => setTimeout(res, 200));
  } while (page);

  const rows = [];
  for (const id of ms) {
    // format=full (nu metadata) => vine si snippet, necesar ca sa judec
    // care mesaje chiar cer raspuns. Costul e tot 1 cerere/mesaj.
    const m = await k.req('GET', 'https://gmail.googleapis.com/gmail/v1/users/me/messages/' + id + '?format=full');
    const h = n => (m.payload && m.payload.headers || []).find(x => x.name === n)?.value || '';
    rows.push({ id, from: h('From'), subject: h('Subject'), date: h('Date'), labels: m.labelIds || [], snippet: (m.snippet || '').slice(0, 400) });
  }
  rows.sort((a, b) => new Date(b.date) - new Date(a.date));

  const buckets = {}; CATS.forEach(c => buckets[c[0]] = []);
  const unmatched = [];
  for (const r of rows) {
    let hit = false;
    for (const [name, c] of CATS) {
      const okF = c.from ? c.from.test(r.from) : false;
      const okS = c.subject ? c.subject.test(r.subject) : false;
      if (c.from && c.subject) { if (okF || okS) { buckets[name].push(r); hit = true; } }
      else if (okF) { buckets[name].push(r); hit = true; }
    }
    if (!hit) unmatched.push(r);
  }

  console.log('mesaje azi (orice stare): ' + rows.length + '\n');
  for (const [name] of CATS) {
    console.log(`${name.padEnd(24)} ${String(buckets[name].length).padStart(3)}`);
    buckets[name].slice(0, 12).forEach(r => console.log('      ' + r.date.slice(5, 22) + ' | ' + r.from.replace(/<[^>]*>/g, '').slice(0, 32).padEnd(32) + ' | ' + r.subject.slice(0, 52)));
  }
  console.log(`\n${'fara niciun filtru'.padEnd(24)} ${String(unmatched.length).padStart(3)}`);
  unmatched.forEach(r => console.log('      ' + r.date.slice(5, 22) + ' | ' + r.from.replace(/<[^>]*>/g, '').slice(0, 32).padEnd(32) + ' | ' + r.subject.slice(0, 52)));

  fs.writeFileSync('/workspace/Mavis/mavis-tools/report-simulate-sort.json',
    JSON.stringify({ date: TODAY_ISO, total: rows.length, counts: Object.fromEntries(CATS.map(c => [c[0], buckets[c[0]].length])), unmatched: unmatched.length, rows, buckets }, null, 2));
  console.log('\ncereri: ' + k.CALL_STATE.calls);
})();
