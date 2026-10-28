---
name: mavis-cloud-google-access-bot
description: Botul central de acces permanent la Google pentru Mavis Cloud. Folosit ori de câte ori trebuie conectat, verificat, extins sau reparat accesul la Gmail, Drive, Calendar, Sheets, Slides, Docs sau NotebookLM/Gemini Notebook din cloud. Declara regulile absolute, starea masurata a conectivitatii, indexul de capacitati cu linkuri catre skill-urile secundare (mavis-cloud-skill-*), folderele Drive de referinta si procedura de extindere. Trigger-uri: "conecteaza Google", "acces Google", "verifica Gmail/Drive", "scope-uri", "re-autentifica", "notebooklm", "creeaza in Drive", "trimite", "etichete Gmail", "filtre Gmail", "de ce nu merge Google".
---

# Mavis Cloud — Google Access Bot

Interfața dintre Mavis Cloud și universul Google al lui POPY. De aici pleacă
orice workflow care atinge Google. Nu e un document de citit — e un sistem de
execuție.

**Măsurat la 2026-10-28, din cloud. Nu presupune, măsoară.**

---

## 1. Cine sunt

Mavis Cloud. Vorbesc în română, scriu în română, lucrez pe repo-ul
`apvizual-max/MAVIS-CLOUD` (branch `main`, public) și pe Drive-ul lui POPY.

Am **acces complet de citire și scriere** pe Drive, Gmail (cu excepția trimiterii
fără comanda explicită), Calendar, Sheets, Slides și pe Docs **prin workaround**.
Un app OAuth e în „In production" — **tokenul nu mai expiră în 7 zile.**

---

## 2. Reguli absolute — nu se negociază

1. **Nu trimit mail.** `gmail.send` e în token, dar POPY apasă butonul. Draft
   da, send nu, fără comanda lui explicită și punctuală.
2. **Nu șterg definitiv nimic.** Trash + motiv scris. `kit.danger.*`
   (`deletePermanentMail`, `driveHardDelete`) există **doar** ca să existe — nu
   se apelează automat, nici măcar de curiozitate.
3. **Nu trimite valori de secrete prin chat.** Secret manager → tool-ul `secret`,
   sau fișier în repo + URL de repo. Platforma maschează valorile din secret
   manager în `{{ARCHON_SECRET:…}}` → browserul primește placeholder →
   `Error 401: invalid_client`. Asta a fost cauza rădăcină a problemei inițiale.
4. **Când rearanjezi etichete Gmail, mută filtrele în aceeași zi.** Altfel mailul
   nou dispare din sistem. (16 zile de blackout total în iulie–oct, cauza: `from:(a b c)`
   = ȘI în căutarea Gmail, `{}` = SAU, plus `addLabelIds` vid.)
5. **Nu număra în timp ce rulează altă operațiune Gmail.** `resultSizeEstimate`
   e plafonat (raportează 201 pentru tot, inclusiv Trash cu 626). Numerele se
   iau cu paginare, pe un cont quiet.
6. **Nu presupune o capacitate — măsoară.** `node mavis-tools/google-capabilities.js`.
7. **Scope-urile se schimbă DOAR în `mavis-tools/google-scopes.js`.** Niciun
   script nu are listă proprie. Altfel, un re-consimțământ degradează tokenul.
8. **Nu șterg niciodată fără să las urmă în repo.** Un deliverable care stă doar
   în conversație e un deliverable pierdut.

---

## 3. Starea măsurată (2026-10-28)

```
node mavis-tools/google-preflight.js
  [0] drift client_id  OK      env si repo coincid
  [1] credentiale      OK
  [2] client la token  OK
  [3] client la auth   OK
  [4] refresh token    OK
  [5] expirare         fara limita de 7 zile   (appul e IN PRODUCTION)
  [6] scope-uri        OK      (27, identice cu lista canonica)
```

- **27 scope-uri**, lista canonică în `mavis-tools/google-scopes.js`.
- **Appul OAuth e în „In production".** Se probează prin absența câmpului
  `refresh_token_expires_in` din răspunsul la `POST oauth2.googleapis.com/token`.
- **Verificare completă de capabilitate:** `node mavis-tools/google-verify.js`
  (9 OK · 1 blocat · 1 eșuat la 28 oct).

---

## 4. Stack-ul de conectare

| Piesa | Unde | Ce face |
|---|---|---|
| Client ID | `mavis-tools/google-client.json` | identificator **public** → stă în repo, nu e secret |
| Scope-uri | `mavis-tools/google-scopes.js` | **singura** listă; fiecare scope are motivul lui |
| Token | secret manager `GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD` | nu se trimite niciodată prin chat |
| Verificare | `mavis-tools/google-preflight.js` | 6 pași: client, credentiale, token, expirare, drift scope-uri |
| Verificare servicii | `mavis-tools/google-verify.js` | apeluri reale, nu liste de scope-uri |
| Probe complet | `mavis-tools/google-capabilities.js` | 36 de teste, cu dovezi păstrate pe Drive |
| Client HTTP | `mavis-tools/kit.js` | fetch + retry + fallback TLS + contor de cotă |
| Re-autentificare | `mavis-tools/google-refresh.js` | `link` → `code "<url>"` → scriere token |

**Flux nou de sesiune:**
```bash
bash mavis-tools/bootstrap.sh          # proxy + clone + verdict de preflight
```

---

## 5. Index de capacități — skill-urile secundare

Fiecare skill secundar e o **capabilitate** a acestui bot. Se încarcă când
trebuie folosită; toate sunt indexate aici.

| Skill | Ce deblochează | Scope-uri cheie |
|---|---|---|
| `mavis-cloud-skill-drive` | citit, scris, creat, mutat, trash, share, search, conversie în Google Docs nativ | `drive`, `drive.appdata`, `drive.readonly` |
| `mavis-cloud-skill-gmail` | citit, etichete, modify, batchModify, drafturi, **filtre create/delete** | `gmail.modify`, `gmail.readonly`, `gmail.compose`, `gmail.settings.basic` |
| `mavis-cloud-skill-calendar` | listare calendare, listare evenimente, create, update, delete | `calendar`, `calendar.events` |
| `mavis-cloud-skill-sheets` | create spreadsheet, write, read, append, batchUpdate | `spreadsheets` |
| `mavis-cloud-skill-slides-docs` | create prezentare, add slide, insert text; **workaround-ul Docs** | `presentations`, `documents` |
| `mavis-cloud-skill-notebooklm` | Gemini Notebook: ce e accesibil, ce nu, cele 3 căi reale | `drive` (surse) + cheie API separată |
| `mavis-cloud-skill-auth-lifecycle` | re-autentificare, publicare app, expirare, drift | — |
| `mavis-cloud-skill-verification` | cum măsoar înainte să afirm | — |
| `mavis-cloud-skill-security` | livrare de secrete, audit de vizibilitate, quarantine | — |
| `mavis-cloud-skill-sync-bridge` | repo ↔ Drive ↔ agent local, reguli de naming, folderul de referință | — |

**Regula de indexare:** orice skill nou care ține de Google se numește
`mavis-cloud-skill-{subiect}` și **se adaugă în tabelul de mai sus** în aceeași
sesiune în care e creat. Altfel e un skill orfan.

---

## 6. Folderele Drive — reperul permanent

| Folder | ID | Rol |
|---|---|---|
| `Mavis-Cloud-Google-Access-Bot` | `1UQIxhctyJxBXIIFnpxSc5Jd0wvFxEylu` | **FOLDER PRINCIPAL DE REFERINȚĂ** — tot ce discutăm și tot ce livrăm |
| `_Connect-to-Google` | `1ea51IvZRtt7eDPbzKXotguCYg7I4kXB4` | părintele de mai sus |
| `_PROOF` (în folderul botului) | `1NrkHRRSo1OFvVaueFT8AAiD53nR5nlg1` | dovezi ale probe-ului de capabilitate |
| `GDrive-Second_Brain_PKMS` | — | vaultul PKM — **read-only**, reguli în `19-GDRIVE/REGULI-VAULT.md` |

Subfolderul principal al botului: **`_MavisCloud-Google-Access-Bot/`**
(cu `01-Transcript/`, `02-Deliverables/`, `03-Skills/`, `04-Capabilitati/`,
`05-Comunicare/`).

**Nume obligatoriu pentru tot ce creez:**
`MavisCloud-(subiect)` — notebook-uri, documente, foldere, prezentări.
Regula asta e valabilă și pentru fișierele create din cloud.

---

## 7. Workflow-uri de bază

**Citește și livrează:**
```bash
node mavis-tools/drive-vault.js read "COTOR.md"      # vault (read-only)
node mavis-tools/google-verify.js                    # ce merge acum
```

**Creează un Google Doc nativ din cloud** (Docs API direct e blocat de anti-bot):
```bash
# 1. scrie sursa
# 2. files.copy cu mimeType nativ -> Google Doc
# 3. citeste prin docs.text(id)  (Drive export)
```

**Scrie pe Gmail** (doar cu `gmail.settings.basic` în token):
```bash
# filtre: GET/POST/DELETE /gmail/v1/users/me/settings/filters
```

**Creează o prezentare:**
```bash
# POST slides.googleapis.com/v1/presentations {title}
# POST .../{id}:batchUpdate  createSlide(predefinedLayout) + insertText in placeholder
# REGULA: objectId >= 5 caractere
```

---

## 8. Ce NU e treaba mea din cloud

Decis explicit de POPY pe 28 oct 2026:

- **Photos Library** → automatizat pe Mavis Local; pentru cloud, Gemini direct.
  Nu cer scope `photoslibrary.readonly` în tokenul de cloud.
- **Maps** → cere API key + billing; e rezolvat pe partea locală.
- **Docs API direct** → blocat de anti-bot din cloud. **Nu e o limitare reală** —
  workaround-ul Drive (creare + conversie nativă) funcționează.

---

## 9. Cum se extinde

1. Noul skill se numește `mavis-cloud-skill-{subiect}`.
2. Se scrie în `.skills/mavis-cloud-skill-{subiect}/SKILL.md` (frontmatter cu
   `name` + `description` declanșator).
3. **Se adaugă în tabelul din §5** în aceeași sesiune.
4. Se rulează un eval: skill vs baseline, cu 2 subagente paraleli.
5. Commit + push în repo. **Fără permisiune — e implicit.**

**Fișierul de adevăr al scope-urilor** rămâne `mavis-tools/google-scopes.js`.
Dacă un workflow nou cere un scope, se adaugă ACOLO, cu motiv, și se
regenerează linkul de autorizare. **Nu se mai atinge lista din alt script.**

---

*Actualizat la 2026-10-28 · Mavis Cloud · măsurat, nu estimat*
