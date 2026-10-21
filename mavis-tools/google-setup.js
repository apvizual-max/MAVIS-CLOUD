#!/usr/bin/env node
/**
 * GOOGLE SETUP — se ruleaza la LOCAL (acolo unde exista browser).
 *
 * Ce face:
 *   1. Ia client_id + client_secret (din credentials.json sau din env)
 *   2. Deschide un server local pe 127.0.0.1 (loopback)
 *   3. Scoate linkul de consimtamant Google cu TOATE scope-urile deodata
 *   4. Prinde codul, il schimba in refresh_token
 *   5. Scrie refresh_token in ~/.google-mcp/tokens/mavis.json
 *   6. Scrie cheile pentru cloud in ~/.google-mcp/cloud-secret.env  (fisier local, NU in repo)
 *
 * Nu scrie nimic in repo. Nu trimite nimic. Nu atinge Drive sau Gmail.
 *
 *   node mavis-tools/google-setup.js            -> flux complet
 *   node mavis-tools/google-setup.js --check    -> doar raport, nu schimba nimic
 *   node mavis-tools/google-setup.js --print    -> arata si valorile pe ecran
 */
const fs = require('fs');
const path = require('path');
const http = require('http');
const { exec } = require('child_process');
const AUTH = require('./google-auth.js');

const HOME = process.env.HOME || require('os').homedir();
const DIR = path.join(HOME, '.google-mcp');
const CREDS_FILE = path.join(DIR, 'credentials.json');
const TOKENS_FILE = path.join(DIR, 'tokens', 'mavis.json');
const ENV_OUT = path.join(DIR, 'cloud-secret.env');
const CHECK = process.argv.includes('--check');
const PRINT = process.argv.includes('--print');

const C = {
  b: (s) => `\x1b[1m${s}\x1b[0m`, g: (s) => `\x1b[32m${s}\x1b[0m`,
  y: (s) => `\x1b[33m${s}\x1b[0m`, r: (s) => `\x1b[31m${s}\x1b[0m`, d: (s) => `\x1b[2m${s}\x1b[0m`,
};

function credsFromDisk() {
  const c = AUTH.readJson(CREDS_FILE);
  if (!c) return null;
  const inst = c.installed || c.web || c;
  if (inst.client_id && inst.client_secret) {
    return { client_id: inst.client_id, client_secret: inst.client_secret, kind: c.installed ? 'installed (desktop)' : (c.web ? 'web' : 'raw') };
  }
  return null;
}

function credsFromEnv() {
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    return { client_id: process.env.GOOGLE_CLIENT_ID, client_secret: process.env.GOOGLE_CLIENT_SECRET, kind: 'env' };
  }
  return null;
}

function ask(question) {
  const rl = require('readline').createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(res => rl.question(question, a => { rl.close(); res(a.trim()); }));
}

async function check() {
  const d = AUTH.describe();
  console.log(C.b('\n=== STARE GOOGLE (local) ===\n'));
  console.log('credentials.json :', d.files.credentials_json ? C.g('exista') : C.r('lipseste'), '—', CREDS_FILE);
  console.log('tokens/mavis.json:', d.files.tokens_mavis_json ? C.g('exista') : C.r('lipseste'), '—', TOKENS_FILE);
  const c = credsFromDisk() || credsFromEnv();
  console.log('client OAuth     :', c ? C.g(c.kind) : C.r('niciun client OAuth'));
  const t = AUTH.readJson(TOKENS_FILE);
  if (t && t.scope) {
    console.log('\nscope-uri deja acordate:');
    for (const s of String(t.scope).split(/\s+/).filter(Boolean)) console.log('  ·', s);
  }
  const missing = [];
  for (const [k, v] of [['drive', AUTH.SCOPES.drive], ['gmail', AUTH.SCOPES.gmail], ['calendar', AUTH.SCOPES.calendar], ['docs', AUTH.SCOPES.docs], ['sheets', AUTH.SCOPES.spreadsheets], ['slides', AUTH.SCOPES.slides], ['photos', AUTH.SCOPES.photosReadwrite]]) {
    if (!(t && t.scope && String(t.scope).includes(v))) missing.push(k);
  }
  console.log('\n' + (missing.length ? C.y('scope-uri lipsa: ' + missing.join(', ')) : C.g('toate scope-urile sunt acordate')));
  console.log(C.d('\n' + (missing.length ? 'Rula: node mavis-tools/google-setup.js' : 'Gata. Cheile pentru cloud: ' + ENV_OUT) + '\n'));
  process.exit(0);
}

function openBrowser(url) {
  const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
  try { exec(`${cmd} "${url}"`, () => {}); } catch { /* merge fara browser, POPY deschide linkul manual */ }
}

(async () => {
  if (CHECK) return check();

  console.log(C.b('\n=== GOOGLE SETUP ===\n'));
  let c = credsFromDisk() || credsFromEnv();
  if (!c) {
    console.log(C.y('Nu am gasit un client OAuth.'));
    console.log(C.d('Creeaza unul in Google Cloud Console -> APIs & Services -> Credentials -> Create Credentials -> OAuth client ID -> Application type: Desktop app.\n'));
    c = {
      client_id: await ask('client_id: '),
      client_secret: await ask('client_secret: '),
      kind: 'introdus manual',
    };
  } else {
    console.log(C.g('Client OAuth gasit (' + c.kind + ').'));
  }
  if (!c.client_id || !c.client_secret) { console.log(C.r('Fara client_id/client_secret nu pot continua.')); process.exit(1); }

  const scopes = AUTH.FULL_SCOPES;
  console.log(C.d('Scope-uri cerute:\n  ' + scopes.join('\n  ') + '\n'));

  const server = http.createServer((req, res) => {
    const u = new URL(req.url, 'http://127.0.0.1');
    if (u.pathname !== '/callback') { res.writeHead(404); return res.end('not found'); }
    const code = u.searchParams.get('code');
    const err = u.searchParams.get('error');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    if (err) {
      res.end(`<h2>EROARE</h2><p>${err}</p><p>${u.searchParams.get('error_description') || ''}</p>`);
      server.close(); console.log(C.r('\nConsimtamant refuzat / eroare: ' + err)); process.exit(1);
    }
    res.end('<h2>OK</h2><p>Autentificare reusita. Poti inchide fereastra.</p>');
    server.close();
    exchange(code);
  });

  await new Promise(res => server.listen(0, '127.0.0.1', res));
  const port = server.address().port;
  const redirect = `http://127.0.0.1:${port}`;

  const url = 'https://accounts.google.com/o/oauth2/v2/auth?' + new URLSearchParams({
    client_id: c.client_id,
    redirect_uri: redirect,
    response_type: 'code',
    scope: scopes.join(' '),
    access_type: 'offline',
    prompt: 'consent',
    include_granted_scopes: 'true',
  }).toString();

  console.log(C.b('Daca browserul nu s-a deschis, deschide manual:\n'));
  console.log(C.g(url) + '\n');
  console.log(C.d('Dupa ce consimti, revino aici. Astept...\n'));
  openBrowser(url);

  async function exchange(code) {
    try {
      const r = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: c.client_id, client_secret: c.client_secret,
          code, grant_type: 'authorization_code', redirect_uri: redirect,
        }).toString(),
      });
      const j = await r.json();
      if (j.error) { console.log(C.r('Schimbul codului a esuat: ' + j.error + ' — ' + (j.error_description || ''))); process.exit(1); }

      fs.mkdirSync(path.dirname(TOKENS_FILE), { recursive: true });
      const out = {
        access_token: j.access_token,
        refresh_token: j.refresh_token,
        scope: j.scope,
        token_type: j.token_type,
        expires_in: j.expires_in,
        obtained_at: new Date().toISOString(),
      };
      fs.writeFileSync(TOKENS_FILE, JSON.stringify(out, null, 2), { mode: 0o600 });
      fs.chmodSync(TOKENS_FILE, 0o600);

      const envLines = [
        '# CHEI PENTRU SECRET MANAGER (Mavis Cloud) — generat de google-setup.js',
        '# NU comita acest fisier. Nu il trimite in chat.',
        'GOOGLE_CLIENT_ID=' + c.client_id,
        'GOOGLE_CLIENT_SECRET=' + c.client_secret,
        'GOOGLE_REFRESH_TOKEN=' + j.refresh_token,
        'GOOGLE_EMAIL=' + (process.env.GOOGLE_EMAIL || 'apvizual@gmail.com'),
      ];
      fs.writeFileSync(ENV_OUT, envLines.join('\n') + '\n', { mode: 0o600 });
      fs.chmodSync(ENV_OUT, 0o600);

      console.log(C.g('\nOK. Credentialele sunt gata.\n'));
      console.log('  token salvat  : ' + TOKENS_FILE);
      console.log('  chei cloud    : ' + ENV_OUT + C.d('  (chmod 600)'));
      console.log('\n' + C.b('Adauga in secret manager (Mavis Cloud):\n'));
      console.log('  GOOGLE_CLIENT_ID      = <din fisier>');
      console.log('  GOOGLE_CLIENT_SECRET  = <din fisier>');
      console.log('  GOOGLE_REFRESH_TOKEN  = <din fisier>');
      console.log('  GOOGLE_EMAIL          = ' + (process.env.GOOGLE_EMAIL || 'apvizual@gmail.com'));
      if (PRINT) {
        console.log(C.d('\n--- valori (doar cu --print) ---\n'));
        console.log(envLines.filter(l => !l.startsWith('#')).join('\n'));
      }
      console.log(C.d('\nDupa ce le adaugi, ruleaza in cloud: node mavis-tools/google-verify.js\n'));
      process.exit(0);
    } catch (e) { console.log(C.r('Eroare: ' + e.message)); process.exit(1); }
  }
})();
