/**
 * GOOGLE AUTH — rezolvarea unica a credentialelor Google.
 *
 * Ordinea (prima care exista castiga):
 *   1. ENV din secret manager (Cloud):
 *        GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN
 *   2. FISIERE locale (Local):
 *        ~/.google-mcp/credentials.json  -> installed.client_id / installed.client_secret
 *        ~/.google-mcp/tokens/mavis.json  -> refresh_token
 *
 * REGULA: nu afiseaza NICIO secret. describe() intoarce doar DE UNDE a venit.
 *          niciun secret nu ajunge in repo, in chat, sau in log.
 */

const fs = require('fs');
const path = require('path');

const HOME = process.env.HOME || '/root';
const CREDS_FILE = path.join(HOME, '.google-mcp', 'credentials.json');
const TOKENS_FILE = path.join(HOME, '.google-mcp', 'tokens', 'mavis.json');

function readJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; }
}

function fromEnv() {
  const client_id = process.env.GOOGLE_CLIENT_ID;
  const client_secret = process.env.GOOGLE_CLIENT_SECRET;
  const refresh_token = process.env.GOOGLE_REFRESH_TOKEN;
  if (!client_id || !client_secret || !refresh_token) return null;
  return {
    client_id,
    client_secret,
    refresh_token,
    source: 'env',
    source_detail: ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN'],
  };
}

function fromFiles() {
  const c = readJson(CREDS_FILE);
  const t = readJson(TOKENS_FILE);
  if (!c || !t) return null;
  const inst = c.installed || c.web || c; // desktop client = installed, web = web
  const client_id = inst.client_id;
  const client_secret = inst.client_secret;
  const refresh_token = t.refresh_token;
  if (!client_id || !client_secret || !refresh_token) return null;
  return {
    client_id,
    client_secret,
    refresh_token,
    source: 'files',
    source_detail: [CREDS_FILE, TOKENS_FILE],
  };
}

/** Credentialele active, sau null daca nu exista niciun set complet. */
function resolve() {
  return fromEnv() || fromFiles() || null;
}

/** Diagnostic fara secreti. Spune EXACT ce lipseste. */
function describe() {
  const env = {
    GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: !!process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_EMAIL: !!process.env.GOOGLE_EMAIL,
    GOOGLE_MAPS_API_KEY: !!process.env.GOOGLE_MAPS_API_KEY,
  };
  const files = {
    credentials_json: fs.existsSync(CREDS_FILE),
    tokens_mavis_json: fs.existsSync(TOKENS_FILE),
  };
  const r = resolve();
  const missing = [];
  if (!env.GOOGLE_CLIENT_ID && !files.credentials_json) missing.push('GOOGLE_CLIENT_ID');
  if (!env.GOOGLE_CLIENT_SECRET && !files.credentials_json) missing.push('GOOGLE_CLIENT_SECRET');
  if (!env.GOOGLE_REFRESH_TOKEN && !files.tokens_mavis_json) missing.push('GOOGLE_REFRESH_TOKEN');
  return {
    resolved: !!r,
    source: r ? r.source : null,
    source_detail: r ? r.source_detail : null,
    env,
    files,
    missing,
    paths: { CREDS_FILE, TOKENS_FILE },
  };
}

/** Scope-urile pentru care se cere consimtamant. Un set complet, o singura cerere. */
const SCOPES = {
  drive: 'https://www.googleapis.com/auth/drive',
  gmail: 'https://www.googleapis.com/auth/gmail.modify',
  gmailReadonly: 'https://www.googleapis.com/auth/gmail.readonly',
  calendar: 'https://www.googleapis.com/auth/calendar',
  docs: 'https://www.googleapis.com/auth/documents',
  spreadsheets: 'https://www.googleapis.com/auth/spreadsheets',
  slides: 'https://www.googleapis.com/auth/presentations',
  photosReadonly: 'https://www.googleapis.com/auth/photoslibrary.readonly',
  photosReadwrite: 'https://www.googleapis.com/auth/photoslibrary.readwrite',
  driveFile: 'https://www.googleapis.com/auth/drive.file',
};

/** Setul complet folosit de google-setup.js. */
const FULL_SCOPES = [
  SCOPES.drive,
  SCOPES.gmail,
  SCOPES.calendar,
  SCOPES.docs,
  SCOPES.spreadsheets,
  SCOPES.slides,
  SCOPES.photosReadwrite,
];

/** Setul minim: ce trebuie ca Drive + Gmail sa mearga in cloud. */
const CORE_SCOPES = [SCOPES.drive, SCOPES.gmail, SCOPES.calendar];

module.exports = {
  resolve,
  describe,
  fromEnv,
  fromFiles,
  readJson,
  SCOPES,
  FULL_SCOPES,
  CORE_SCOPES,
  CREDS_FILE,
  TOKENS_FILE,
};
