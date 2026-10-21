---
name: google-cloud-auth
description: Cum conectezi Mavis Cloud la Google (Drive, Gmail, Calendar, Docs, Sheets, Slides) cu credentialele proprii. Când cauți chei Google lipsă, eroare invalid_grant, sau "de ce nu văd credentiale Google".
---

# Google Cloud Credentials

Google pentru Mavis Cloud = **OAuth propriu, cu 4 chei în secret manager**.
Nu conector nativ (nu există în Marketplace MiniMax).

## Cele 4 chei

```
GOOGLE_CLIENT_ID      = <client id, forma xxx.apps.googleusercontent.com>
GOOGLE_CLIENT_SECRET  = <client secret>
GOOGLE_REFRESH_TOKEN  = <1//...>
GOOGLE_EMAIL          = apvizual@gmail.com
```

Nu se scriu în repo, în chat, sau prin Jules/GitHub.

## Ordinea fluxului

1. **Local, cu browserul** — `node mavis-tools/google-setup.js`
   - deschide browserul, consimțământ, scrie `~/.google-mcp/tokens/mavis.json`
   - scrie `~/.google-mcp/cloud-secret.env` cu cele 4 linii `CHEIE=VALOARE`
2. **POPY copiază** cele 4 linii în secret manager (Mavis Cloud)
3. **Cloud** — `node mavis-tools/google-verify.js`
   - verificare read-only, un cod HTTP real per serviciu
4. **Local și Cloud folosesc același `kit.js`** — diferă doar unde stau cheile

## Diagnostic rapid

| Simptom | Cauză | Repar |
|---|---|---|
| `lipsesc: GOOGLE_CLIENT_ID, ...` | cheile nu sunt în secret manager | pasul 2 |
| `Error 400: invalid_scope` | API-ul unui scope **nu e activat** în proiectul Cloud (de ex. Photos Library API). Google nu te redirecționează înapoi → scriptul aștepta | activează API-ul în Cloud Console, apoi `--with-photos`; sau rulează fără Photos (default) |
| `invalid_grant` | app-ul OAuth e în **Testing** → tokenul moare în 7 zile; **sau** client_id și refresh_token din clienti diferiți | `Publishing status → In production`, apoi reia `google-setup.js` |
| `HTTP 403 insufficient authentication scopes` | scope lipsește | reia `google-setup.js` cu scope-ul complet |
| `HTTP 404` la Docs/Sheets/Slides | host greșit | `docs.googleapis.com` / `sheets.googleapis.com` / `slides.googleapis.com` — **nu** `www.googleapis.com` |
| `http=000` pe photos sau `*mcp.googleapis.com` | host blocat de egress din cloud | rulează de la Local |

## Scope-uri

**Implicit (6, funcționează fără API-uri suplimentare):** drive, gmail.modify, calendar,
documents, spreadsheets, presentations.

**Opțional:** `photoslibrary.readwrite` — **doar** cu `--with-photos` și **doar** dacă
Photos Library API e activată în proiect. Altfel Google răspunde `invalid_scope`.

## Regula „7 zile"

OAuth consent screen în **Testing** → refresh token-ul expiră în 7 zile.
Excepție doar pentru `userinfo.email` / `userinfo.profile` / `openid` — nu ne interesează.
Fix: `Publishing status → In production`. Atunci tokenul nu expiră (decât revocat sau ~6 luni nefolosit).
Sursă: https://support.google.com/cloud/answer/15549945

## Ce merge din cloud, măsurat 2026-10-21

✅ Drive, Gmail, Calendar, Docs, Sheets, Slides
⛔ Google Photos (`photoslibrary.googleapis.com` — 0/6 conexiuni)
⛔ Google Workspace MCP servers oficiali (`*mcp.googleapis.com` — 0/6)
⛔ Google Maps (are nevoie de `GOOGLE_MAPS_API_KEY` + proiect Cloud cu billing)

## Reguli

- NUNCIODATĂ ștergere definitivă. Doar Trash.
- Nu trimite mail fără comanda explicită a lui POPY, punctuală.
- Nu citi toate cheile deodată. Fiecare cheie, un singur scop.
- Cota: `list` înainte de `get`. `threads.list` (5 unități) nu `messages.get` (20).
  Vezi skill-ul `google-api-safe-scripting`.

## Fișiere

| Fișier | Ce face |
|---|---|
| `mavis-tools/google-auth.js` | rezolvarea credentialelor: env (cloud) sau fișiere (local) |
| `mavis-tools/kit.js` | clientul Google — Drive, Gmail, Calendar, Docs, Sheets, Slides, Photos |
| `mavis-tools/google-setup.js` | fluxul OAuth + generarea cheilor (rulezi la Local) |
| `mavis-tools/google-verify.js` | verificare read-only per serviciu (rulezi în Cloud) |
| `mavis-tools/test-endpoints.js` | test permanent: URL-urile API-urilor sunt corecte? |
| `docs/GOOGLE-INTEGRARE.md` | ghidul complet, cu surse |
