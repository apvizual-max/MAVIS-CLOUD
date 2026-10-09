// MAVIS-KIT — unelte Google pentru Mavis
// REGULI: nu trimite mail. nu șterge definitiv. tot restul: da.
const fs = require('fs');
const path = require('path');
const https = require('https');
const querystring = require('querystring');

const HOME = process.env.HOME;
const CREDS = JSON.parse(fs.readFileSync(path.join(HOME, '.google-mcp', 'credentials.json'))).installed;
const TOKF = path.join(HOME, '.google-mcp', 'tokens', 'mavis.json');
let _tok = null, _exp = 0;

function refresh() {
  return new Promise((res, rej) => {
    const t = JSON.parse(fs.readFileSync(TOKF));
    const body = querystring.stringify({ client_id: CREDS.client_id, client_secret: CREDS.client_secret,
      refresh_token: t.refresh_token, grant_type: 'refresh_token' });
    const req = https.request({ hostname: 'oauth2.googleapis.com', path: '/token', method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) } },
      r => { let d = ''; r.on('data', c => d += c); r.on('end', () => { const j = JSON.parse(d); j.error ? rej(new Error(j.error)) : res(j.access_token); }); });
    req.on('error', rej); req.write(body); req.end();
  });
}

async function token() {
  if (_tok && Date.now() < _exp - 60000) return _tok;
  _tok = await refresh(); _exp = Date.now() + 3600000; return _tok;
}


// QUOTA MANAGER: vezi quota.js — limite oficiale Google, nu estimari
const QUOTA_MGR = require('./quota.js');
function throttle(t) { return Promise.resolve(t); }
function req(method, url, data, quotaMethod) {
  const qm = quotaMethod || (url.includes('/messages/send') ? 'messages.send'
    : url.includes('/batchModify') ? 'messages.batchModify'
    : url.includes('/threads/trash') ? 'threads.trash'
    : url.includes('/threads/') ? 'threads.get'
    : url.includes('/messages/') && url.includes('alt=media') ? 'messages.get'
    : url.includes('/messages?') || url.includes('/messages?') ? 'messages.list'
    : url.includes('/messages/') ? 'messages.get'
    : url.includes('/labels') ? 'labels.list' : 'messages.list');
  return QUOTA_MGR.reserve(qm).then(() => token()).then(t => attempt(method, url, data, t, 0));
}

function attempt(method, url, data, t, n) {
  return new Promise((res, rej) => {
    const body = data ? JSON.stringify(data) : null;
    const r = https.request(url, { method, headers: {
      Authorization: 'Bearer ' + t, 'Content-Type': 'application/json',
      ...(body ? { 'Content-Length': Buffer.byteLength(body) } : {}) } },
      resp => { let d = ''; resp.on('data', c => d += c); resp.on('end', () => {
        let j; try { j = d ? JSON.parse(d) : {}; } catch { j = { raw: d }; }
        const rl = resp.statusCode === 429 || (resp.statusCode === 403 && /rateLimit|Quota exceeded/i.test(JSON.stringify(j)));
        if (rl && n < 5) {
          const wait = resp.headers['retry-after'] ? +resp.headers['retry-after']*1000 : QUOTA_MGR.backoffMs(n);
          return setTimeout(() => { QUOTA_MGR.state.used += QUOTA_MGR.costOf('messages.list'); attempt(method,url,data,t,n+1).then(res,rej); }, wait);
        }
        if (resp.statusCode >= 400) rej(new Error(`HTTP ${resp.statusCode}: ${JSON.stringify(j).slice(0,200)}`));
        else res(j); }); });
    r.on('error', rej); if (body) r.write(body); r.end();
  });
}

// ---------- DRIVE ----------
const drive = {
  list: (q, pageSize = 50) => req('GET', `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q||"trashed=false")}&pageSize=${pageSize}&fields=files(id,name,mimeType,modifiedTime,parents,size)&orderBy=folder,modifiedTime desc`),
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
  // DOAR în coș. niciodată delete definitiv.
  trash: (id) => req('POST', `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}/trash`, {}),
};

// ---- FUNCȚII INTERZISE FĂRĂ COMANDA TA EXPLICITĂ ----
// Exista sa fie. Se folosesc DOAR cand spui tu, punctual, despre ce anume.
// Nu sunt apelate de nimic automat.
const danger = {
  sendMail: (to, subject, body) => req('POST', 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send', { to, subject, body }),
  deletePermanentMail: (id) => req('DELETE', `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`),
  driveHardDelete: (id) => req('DELETE', `https://www.googleapis.com/drive/v3/files/${id}`),
  listTrash: (folderId='root') => req('GET', `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent("trashed=true and '"+folderId+"' in parents")}&fields=files(id,name,trashedTime)`),
};

module.exports = { drive, gmail, token, req, danger };
