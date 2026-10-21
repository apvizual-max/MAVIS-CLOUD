// MAVIS-KIT — unelte Google pentru Mavis
// REGULI: nu trimite mail. nu șterge definitiv. tot restul: da.
//
// SCHIMBARE 2026-10-21: credentialele vin din google-auth.js
//   - Cloud: env vars (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN)
//   - Local: ~/.google-mcp/credentials.json + ~/.google-mcp/tokens/mavis.json
// Inainte, kit.js citea fisierele la require() si arunca daca lipseau.
// Acum e lazy: daca nu exista credentiale, arunca doar la primul apel real,
// cu mesaj care spune EXACT ce lipseste.
const https = require('https');
const AUTH = require('./google-auth.js');
const QUOTA_MGR = require('./quota.js');

let _tok = null, _exp = 0, _authCache = null;

function creds() {
  if (_authCache) return _authCache;
  const c = AUTH.resolve();
  if (!c) {
    const d = AUTH.describe();
    throw new Error(
      'Nu exista credentiale Google. Lipsesc: ' + (d.missing.join(', ') || '?') + '. ' +
      'Adauga in secret manager: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN. ' +
      'Sau local: ' + d.paths.CREDS_FILE + ' + ' + d.paths.TOKENS_FILE
    );
  }
  _authCache = c;
  return c;
}

function refresh() {
  return new Promise((res, rej) => {
    const c = creds();
    const body = new URLSearchParams({
      client_id: c.client_id, client_secret: c.client_secret,
      refresh_token: c.refresh_token, grant_type: 'refresh_token',
    }).toString();
    const req = https.request({
      hostname: 'oauth2.googleapis.com', path: '/token', method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) },
    }, r => {
      let d = ''; r.on('data', c => d += c); r.on('end', () => {
        let j; try { j = JSON.parse(d); } catch { j = { raw: d }; }
        if (j.error) {
          let msg = j.error + (j.error_description ? ': ' + j.error_description : '');
          if (j.error === 'invalid_grant') {
            // Doua cauze principale, ambele dau invalid_grant:
            msg += '\n  Diagnostic: tokenul a expirat sau a fost revocat. Verifica doua lucruri:\n'
              + '   1. "7 zile": OAuth consent screen in Testing => refresh tokenul expira in 7 zile.\n'
              + '      Fix: Publishing status -> In production, apoi reia google-setup.js.\n'
              + '   2. Client si token din clienti diferiti: GOOGLE_CLIENT_ID (env) trebuie sa fie\n'
              + '      din ACELASI OAuth client care a generat GOOGLE_REFRESH_TOKEN.\n'
              + '      Daca tokenul vine din ~/' + (AUTH.TOKENS_FILE.replace(process.env.HOME || '', '~')) + ', regenereaza-l\n'
              + '      cu google-setup.js pe aceeasi masina si pune toate 3 cheile impreuna.';
          }
          rej(new Error(msg));
        } else res(j.access_token);
      });
    });
    req.on('error', rej); req.write(body); req.end();
  });
}

async function token() {
  if (_tok && Date.now() < _exp - 60000) return _tok;
  _tok = await refresh(); _exp = Date.now() + 3600000; return _tok;
}

/** Ce scope-uri are efectiv tokenul. Diagnosticul cel mai util cand ceva nu merge. */
async function tokeninfo() {
  const t = await token();
  return req('GET', 'https://oauth2.googleapis.com/tokeninfo?access_token=' + encodeURIComponent(t), null, 'tokeninfo');
}

// QUOTA MANAGER: vezi quota.js — limite oficiale Google, nu estimari
function quotaMethodFor(url) {
  if (url.includes('/messages/send')) return 'messages.send';
  if (url.includes('/batchModify')) return 'messages.batchModify';
  if (url.includes('/batchTrash')) return 'messages.batchTrash';
  if (url.includes('/threads/trash')) return 'threads.trash';
  if (url.includes('/threads/')) return 'threads.get';
  if (url.includes('/messages/') && url.includes('alt=media')) return 'messages.get';
  if (url.includes('/messages?')) return 'messages.list';
  if (url.includes('/messages/')) return 'messages.get';
  if (url.includes('/labels')) return 'labels.list';
  if (url.includes('/filters')) return 'filters.list';
  return 'messages.list'; // default conservator: 5 unitati
}

function req(method, url, data, quotaMethod) {
  const qm = quotaMethod || quotaMethodFor(url);
  return QUOTA_MGR.reserve(qm).then(() => token()).then(t => attempt(method, url, data, t, 0, qm));
}

function attempt(method, url, data, t, n, qm) {
  return new Promise((res, rej) => {
    const body = data ? JSON.stringify(data) : null;
    const r = https.request(url, {
      method,
      headers: {
        Authorization: 'Bearer ' + t, 'Content-Type': 'application/json',
        ...(body ? { 'Content-Length': Buffer.byteLength(body) } : {}),
      },
    }, resp => {
      let d = ''; resp.on('data', c => d += c); resp.on('end', () => {
        let j; try { j = d ? JSON.parse(d) : {}; } catch { j = { raw: d }; }
        const rl = resp.statusCode === 429 || (resp.statusCode === 403 && /rateLimit|Quota exceeded/i.test(JSON.stringify(j)));
        if (rl && n < 5) {
          const wait = resp.headers['retry-after'] ? +resp.headers['retry-after'] * 1000 : QUOTA_MGR.backoffMs(n);
          return setTimeout(() => {
            QUOTA_MGR.state.used += QUOTA_MGR.costOf(qm);
            attempt(method, url, data, t, n + 1, qm).then(res, rej);
          }, wait);
        }
        if (resp.statusCode >= 400) rej(new Error(`HTTP ${resp.statusCode}: ${JSON.stringify(j).slice(0, 300)}`));
        else res(j);
      });
    });
    r.on('error', rej); if (body) r.write(body); r.end();
  });
}

// ---------- DRIVE ----------
const drive = {
  list: (q, pageSize = 50) => req('GET', `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q || 'trashed=false')}&pageSize=${pageSize}&fields=files(id,name,mimeType,modifiedTime,parents,size)&orderBy=folder,modifiedTime desc`),
  get: (id) => req('GET', `https://www.googleapis.com/drive/v3/files/${id}?fields=id,name,mimeType,parents,modifiedTime,size,description`),
  mkdir: (name, parent = 'root') => req('POST', 'https://www.googleapis.com/drive/v3/files',
    { name, mimeType: 'application/vnd.google-apps.folder', parents: [parent] }),
  upload: (name, content, mime = 'text/plain', parent = 'root') => req('POST',
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
    { metadata: { name, parents: [parent] }, file: { mimeType: mime, content } }),
  move: (id, newParent, oldParent) => req('PATCH', `https://www.googleapis.com/drive/v3/files/${id}?addParents=${newParent}&removeParents=${oldParent}`, {}),
  rename: (id, name) => req('PATCH', `https://www.googleapis.com/drive/v3/files/${id}`, { name }),
  trashed: (id, val) => req('PATCH', `https://www.googleapis.com/drive/v3/files/${id}`, { trashed: val }), // false = recuperare
  copy: (id, name, parent) => req('POST', 'https://www.googleapis.com/drive/v3/files/' + id + '/copy', { name, parents: [parent] }),
  about: () => req('GET', 'https://www.googleapis.com/drive/v3/about?fields=user,storageQuota'),
  // cauta prin API-ul de cautare (mai bun decat 'name contains' pentru continut)
  search: (q) => req('GET', `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&pageSize=50&fields=files(id,name,mimeType,modifiedTime,size)`),
  // citeste continutul unui fisier. Google Docs/Sheets/Slides NU se descarca cu alt=media.
  download: (id) => req('GET', `https://www.googleapis.com/drive/v3/files/${id}?alt=media`),
  // export pentru documente Google native
  export: (id, mime) => req('GET', `https://www.googleapis.com/drive/v3/files/${id}/export?mimeType=${encodeURIComponent(mime)}`),
};

// ---------- GMAIL (FĂRĂ TRIMITE) ----------
const gmail = {
  list: (q, max = 25) => req('GET', `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(q)}&maxResults=${max}`),
  labels: () => req('GET', 'https://gmail.googleapis.com/gmail/v1/users/me/labels'),
  createLabel: (name) => req('POST', 'https://gmail.googleapis.com/gmail/v1/users/me/labels', { name, labelListVisibility: 'labelShow', messageListVisibility: 'show' }),
  get: (id) => req('GET', `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=full`),
  addLabel: (id, labels) => req('POST', `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}/modify`, { addLabelIds: labels }),
  removeLabel: (id, labels) => req('POST', `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}/modify`, { removeLabelIds: labels }),
  markRead: (id) => req('POST', `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}/modify`, { removeLabelIds: ['UNREAD'] }),
  threads: (q, max = 50) => req('GET', `https://gmail.googleapis.com/gmail/v1/users/me/threads?q=${encodeURIComponent(q)}&maxResults=${max}`),
  profile: () => req('GET', 'https://gmail.googleapis.com/gmail/v1/users/me/profile'),
  // DOAR în coș. niciodată delete definitiv.
  trash: (id) => req('POST', `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}/trash`, {}),
};

// ---------- CALENDAR ----------
const calendar = {
  list: () => req('GET', 'https://www.googleapis.com/calendar/v3/users/me/calendarList'),
  events: (calId, max = 50) => req('GET', `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calId)}/events?maxResults=${max}&singleEvents=true&orderBy=startTime`),
  insert: (calId, body) => req('POST', `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calId)}/events`, body),
};

// ---------- DOCS / SHEETS / SLIDES ----------
// NOTA: fiecare API are PROPRIUL host. www.googleapis.com/docs/v1 -> 404 (masurat).
// Corect: docs.googleapis.com | sheets.googleapis.com | slides.googleapis.com
const docs = {
  get: (id) => req('GET', `https://docs.googleapis.com/docs/v1/documents/${id}`),
  create: (title) => req('POST', 'https://docs.googleapis.com/docs/v1/documents', { title }),
  // insereaza text la finalul documentului
  append: (id, text) => req('POST', `https://docs.googleapis.com/docs/v1/documents/${id}:batchUpdate`,
    { requests: [{ insertText: { location: { index: 1 }, text } }] }),
};

const sheets = {
  get: (id, range) => req('GET', `https://sheets.googleapis.com/v4/spreadsheets/${id}${range ? '?ranges=' + encodeURIComponent(range) : ''}`),
  values: (id, range) => req('GET', `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${encodeURIComponent(range || 'A1:Z1000')}`),
  update: (id, range, values) => req('PUT', `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`, { values }),
  append: (id, range, values) => req('POST', `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`, { values }),
};

const slides = {
  get: (id) => req('GET', `https://slides.googleapis.com/v1/presentations/${id}`),
};

// ---------- GOOGLE PHOTOS ----------
const photos = {
  albums: (pageSize = 50) => req('GET', `https://photoslibrary.googleapis.com/v1/albums?pageSize=${pageSize}`),
  listMedia: (albumId, pageSize = 100) => req('GET', `https://photoslibrary.googleapis.com/v1/mediaItems?albumId=${encodeURIComponent(albumId)}&pageSize=${pageSize}`),
  // scope photoslibrary.readwrite: cauta in toate albumele
  searchMedia: (pageSize = 50) => req('GET', `https://photoslibrary.googleapis.com/v1/mediaItems?pageSize=${pageSize}`),
};

// ---- FUNCȚII INTERZISE FĂRĂ COMANDA TA EXPLICITĂ ----
// Exista sa fie. Se folosesc DOAR cand spui tu, punctual, despre ce anume.
// Nu sunt apelate de nimic automat.
const danger = {
  sendMail: (to, subject, body) => req('POST', 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send', { to, subject, body }),
  deletePermanentMail: (id) => req('DELETE', `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`),
  driveHardDelete: (id) => req('DELETE', `https://www.googleapis.com/drive/v3/files/${id}`),
  listTrash: (folderId = 'root') => req('GET', `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent("trashed=true and '" + folderId + "' in parents")}&fields=files(id,name,trashedTime)`),
};

module.exports = { drive, gmail, calendar, docs, sheets, slides, photos, token, tokeninfo, req, danger, creds };
