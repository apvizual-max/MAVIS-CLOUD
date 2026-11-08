#!/usr/bin/env node
/**
 * IQADS SCRAPER — extrage setul complet de joburi din AdJob + textul integral.
 *
 * Măsurat 2026-10-23: https://www.iqads.ro/p/adjob e REACHABLE din cloud (HTTP 200,
 * ~73 KB) și conține toate joburile. PAGINAREA NU FUNC�IONEAZĂ: ?page=2 și ?page=3
 * servesc exact același set ca pagina 0 (verificat: aceleași 47 linkuri).
 * ⇒ nu iterez pagini, iau catalogul complet de pe pagina 0.
 *
 * Parser: headerul e mereu
 *   <p class="muted">Anunt valabil pana la data de <span>DATE</span><br/>
 *   Companie: <a>X</a><br/>Specializare: <a>..</a>, <a>..</a><br/>
 *   Tip job: <a>..</a>, <a>..</a><br/>Nivel: <a>..</a></p>
 * urmat de paragrafele descrierii.
 *
 * Ieșire: jobs-iqads-<data>.json
 */
const fs = require('fs');
const https = require('https');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const BASE = 'https://www.iqads.ro';
const OUT = process.argv[2] || '/workspace/Mavis/mavis-tools/jobs-iqads-2026-10-23.json';

function get(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname, path: u.pathname + u.search, method: 'GET',
      headers: { 'User-Agent': UA, 'Accept-Language': 'ro-RO,ro;q=0.9,en;q=0.8' },
      rejectUnauthorized: false,
    }, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => resolve({ status: r.statusCode, body: d }));
    });
    req.on('error', reject);
    req.setTimeout(25000, () => req.destroy(new Error('timeout ' + url)));
    req.end();
  });
}

const strip = s => s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&rsquo;/g, "'").replace(/&ldquo;|&rdquo;/g, '"')
  .replace(/&middot;/g, '·').replace(/&euro;/g, 'EUR').replace(/&#(\d+);/g, (m, d) => String.fromCharCode(d))
  .replace(/\s+/g, ' ').trim();

// MĂSURAT 2026-11-08: compania venea ca „Cohn &amp; Jansen" (entitate HTML
// nedecodată). Asta strica atât slug-ul paginii companiei („cohn-amp-jansen"
// in loc de „cohn-jansen"), cât și potrivirea numelui cu pagina. ⇒ decodăm
// entitățile la extragere, ca datele din JSON să fie curate.
const decodeEntities = s => String(s || '')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'").replace(/&rsquo;/g, "'").replace(/&ldquo;|&rdquo;/g, '"')
  .replace(/&middot;/g, '·').replace(/&euro;/g, 'EUR')
  .replace(/&#(\d+);/g, (m, d) => String.fromCharCode(d))
  .replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16)))
  .trim();

function parseJob(html) {
  const out = { expiry: null, company: null, specialization: [], jobType: [], level: null, jd: '', title: null };
  const h = html.match(/<p class="muted">([\s\S]*?)<\/p>/);
  if (h) {
    const hdr = h[1];
    const ex = hdr.match(/Anunt valabil pana la data de\s*<span>([^<]+)<\/span>/);
    if (ex) out.expiry = ex[1].trim();
    const co = hdr.match(/Companie:\s*<a[^>]*>([^<]+)<\/a>/);
    if (co) out.company = decodeEntities(co[1]);
    const sp = hdr.match(/Specializare:\s*([\s\S]*?)<br\/>/);
    if (sp) out.specialization = [...sp[1].matchAll(/<a[^>]*>([^<]+)<\/a>/g)].map(m => m[1].trim());
    const jt = hdr.match(/Tip job:\s*([\s\S]*?)<br\/>/);
    if (jt) out.jobType = [...jt[1].matchAll(/<a[^>]*>([^<]+)<\/a>/g)].map(m => m[1].trim());
    // MĂSURAT 2026-10-29: unele anunturi au NIVEL MULTI ("Nivel: Middle, Senior"
    // la Cohn & Jansen #24000). Regex-ul cu un singur <a> lua doar primul si
    // pierdea semnalul de senioritate. Acelasi tratament ca Tip job /
    // Specializare: toate etichetele, unite.
    const lvSeg = hdr.match(/Nivel:([\s\S]*?)(?:<\/p>|$)/);
    if (lvSeg) {
      const lvAll = [...lvSeg[1].matchAll(/<a[^>]*>([^<]+)<\/a>/g)].map(m => m[1].trim()).filter(Boolean);
      if (lvAll.length) out.level = lvAll.join(', ');
    }
  }
  // corpul: de la primul <p> DUPA header pana la sectiunea de aplicare
  const start = h ? html.indexOf('</p>', h.index) + 4 : 0;
  let body = html.slice(start);
  body = body.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const cut = body.search(/Aplica la|Aplicați la|Trimite CV|post-solicit|\/aplica"|class="btn/i);
  if (cut > 200) body = body.slice(0, cut);
  // IMPORTANT: IQads pune cerintele in <ul><li>, nu in <p>. Daca citesc doar <p>,
  // tai jumatate din anunt. Deci transform blocurile in newline si apoi curat etichetele.
  body = body.replace(/<\/(p|li|h[1-6]|div|ul|ol|tr|blockquote)>/gi, '\n')
             .replace(/<br\s*\/?>/gi, '\n')
             .replace(/<[^>]+>/g, ' ');
  const paras = body.split(/\n+/)
    .map(t => strip(t))
    .filter(t => t.length > 2);
  out.jd = paras.join('\n');
  const t = html.match(/<title>([^<]*?)\s*@\s*([^<]*)<\/title>/);
  if (t) { out.title = decodeEntities(t[1]); }
  return out;
}

(async () => {
  // Doua surse: catalogul AdJob + paginile de tag /relevant/<rol> (joburi deschise)
  const sources = [BASE + '/p/adjob'];
  for (const t of ['art-director', 'creative-director', 'graphic-designer', 'art', 'digital', 'marketing', 'pozitii'])
    sources.push(BASE + '/relevant/' + t);

  const seen = new Map();
  for (const src of sources) {
    let cat;
    try { cat = await get(src); } catch (e) { console.log('  ! sursa ' + src + ' ' + e.message); continue; }
    if (cat.status !== 200) { console.log('  ! sursa ' + src + ' HTTP ' + cat.status); continue; }
    const links = [...cat.body.matchAll(/href="(?:https?:\/\/(?:www\.)?iqads\.ro)?\/?(adjob\/(\d+)\/[a-z0-9-]+)"/g)];
    let added = 0;
    for (const m of links) if (!seen.has(m[2])) { seen.set(m[2], m[1]); added++; }
    console.log('  sursa ' + src.replace(BASE, '') + ' -> +' + added + ' (total ' + seen.size + ')');
  }
  console.log('joburi unice: ' + seen.size);

  const jobs = [];
  const ids = [...seen.keys()].sort((a, b) => b - a);
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i], path = seen.get(id);
    let r;
    try { r = await get(BASE + '/' + path); } catch (e) { console.log('  ! ' + id + ' ' + e.message); continue; }
    if (r.status !== 200) { console.log('  ! ' + id + ' HTTP ' + r.status); continue; }
    const p = parseJob(r.body);
    if (!p.jd || p.jd.length < 80) { console.log('  ~ ' + id + ' fara descriere utila'); continue; }
    const slug = path.split('/').pop();
    jobs.push({ src: 'IQads', id, url: BASE + '/' + path, slug, ...p });
    process.stdout.write(`  ${id} ${p.company || '?'} | ${p.title || slug} | exp ${p.expiry} | tip ${p.jobType.join('/')} | niv ${p.level} | jd ${p.jd.length}c\n`);
    await new Promise(res => setTimeout(res, 450));
  }
  fs.writeFileSync(OUT, JSON.stringify({ _meta: { scraped: '2026-10-23', source: BASE + '/p/adjob', count: jobs.length }, jobs }, null, 2));
  console.log('\nscrapat: ' + jobs.length + ' -> ' + OUT);

  // ---- LOCALIZAREA, de pe pagina companiei ----
  // MĂSURAT 2026-11-08: multe anunturi IQads nu publică orasul. De exemplu
  // „Art Director / Graphic Designer @ Cohn & Jansen" (#24000) nu-l avea NICAIDEATA
  // in anunt - si timp de 5 zile a stat in „verdict amanat" cu scor 8, desi
  // jobul e in Bucuresti. Pagina de contact a companiei pe IQads (t=info) ARE
  // adresa. ⇒ pentru firmele cu joburi fara oras, o cautam acolo.
  //
  // ATENTIE: pagina companiei listeaza si anunturi ale altor agentii (Cohn &
  // Jansen e o retea care publica si pentru altii). Deci localizarea se aplica
  // DOAR daca numele companiei din anunt corespunde celui al paginii.
  const CITY_RE = [
    [/\bbucharest\b|\bbucuresti\b/i, 'Bucuresti'],
    [/\bcluj\b/i, 'Cluj'], [/\bia[sș]i\b/i, 'Iasi'],
    [/\btimi[sș]oara\b/i, 'Timisoara'], [/\bbra[sș]ov\b/i, 'Brasov'],
    [/\bconstan[sț]a\b/i, 'Constanta'], [/\bsibiu\b/i, 'Sibiu'],
    [/\bcraiova\b/i, 'Craiova'], [/\bploie[sș]ti\b/i, 'Ploiesti'],
    [/\boradea\b/i, 'Oradea'], [/\bpite[sș]ti\b/i, 'Pitesti'],
    [/\bdeva\b/i, 'Deva'], [/\bbacau\b/i, 'Bacau'],
  ];
  const slugOf = s => String(s || '').toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const norm = s => String(s || '').toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '').trim();

  const byCompany = new Map();
  for (const j of jobs) {
    const hasCity = CITY_RE.some(([re]) => re.test(j.jd || ''));
    if (hasCity) continue;
    const key = slugOf(j.company);
    if (!key) continue;
    if (!byCompany.has(key)) byCompany.set(key, []);
    byCompany.get(key).push(j);
  }
  console.log('\nlocalizare: caut pe paginile companiei ' + byCompany.size + ' firme cu joburi fara oras...');
  for (const [key, list] of byCompany) {
    let html;
    try { const r = await get(BASE + '/relevant/' + key + '?t=info'); if (r.status !== 200) continue; html = r.body; }
    catch (e) { console.log('  ! ' + key + ' ' + e.message); continue; }
    // numele companiei din titlul paginii (titlul e forma „X - IQads" sau „X | IQads")
    const titleM = html.match(/<title>([^<]*?)(?:\s*[-|]\s*IQads)?\s*<\/title>/i);
    const pageCompany = titleM ? titleM[1] : '';
    const addrM = html.match(/Adresa:([^<]{0,160})/i);
    const addr = addrM ? addrM[1] : '';
    let city = null;
    for (const [re, name] of CITY_RE) { if (re.test(addr)) { city = { name, evidence: addr.trim().slice(0, 90) }; break; } }
    if (!city) { console.log('  ' + key + ': fara adresa de contact'); continue; }
    let applied = 0;
    for (const j of list) {
      // doar daca anuntul e chiar al acelei companii
      if (norm(j.company) !== norm(pageCompany)) continue;
      j.companyCity = city;
      applied++;
    }
    console.log('  ' + key + ': ' + (pageCompany || '?') + ' -> ' + city.name + ' (aplicat la ' + applied + '/' + list.length + ' joburi)');
    await new Promise(res => setTimeout(res, 350));
  }

  fs.writeFileSync(OUT, JSON.stringify({ _meta: { scraped: '2026-10-23', source: BASE + '/p/adjob', count: jobs.length }, jobs }, null, 2));
  console.log('rescris cu localizare: ' + OUT);
})();
