# GOOGLE — stare măsurată 2026-10-22 02:10 (Mavis Cloud)

**Măsurat în sandbox, cu cod HTTP real. Nu e estimare.**

---

## 1. Răspuns scurt

**NU.** Google nu funcționează acum din cloud. `refresh_token`-ul din secret manager
**e mort**.

Diagnosticul e însă **curat**: clientul OAuth e valid, secretul e valid.
**Singura piesă moartă e tokenul.** Deci nu trebuie re-făcut nimic de la zero —
trebuie reificat **un singur** token.

---

## 2. Diagnosticul, cu probe

| Test | Ce am trimis | Răspuns Google | Ce înseamnă |
|---|---|---|---|
| 1 | client_id real + secret real + **token fictiv** | `invalid_grant: Bad Request` | client_id + client_secret **sunt valide** (altfel ar fi `invalid_client`) |
| 2 | client_id real + **secret fals** + token fictiv | `invalid_client` | confirmă că testul 1 chiar verifică secretul |
| 3 | client_id real + secret real + **token real** | `invalid_grant: Token has been expired or revoked.` | **tokenul e expirat sau revocat** |

Plus:
- `client_id` din secret manager **==** cel hardcodat în `google-link.js`
  (`1068987308935-…apps.googleusercontent.com`) → **nu** e cauza „client și token din clienți diferiți".
- Tokenul **nu** apare în istoricul git (n-a fost vărsat niciodată în repo).

## 3. Cronologia — de ce se repetă

| Data | Ce s-a întâmplat |
|---|---|
| 2026-10-09 → 11 | Gmail mergea **real** (SENTINEL 2026-10-11: `in:inbox` 4000) |
| 2026-10-21 20:00 → 23:10 | 6 commituri: credentiale pentru cloud, kit refăcut, `google-local.js` |
| 2026-10-21 22:50 | `docs/GOOGLE-INTEGRARE.md` scris, cu tabelul „ce funcționează azi din cloud" |
| 2026-10-22 02:10 | **token mort** |

**Cauza reală:** app-ul OAuth e în modul **Testing**. În Testing, refresh token-ul
moare în **7 zile de la consimțământ** (sursa oficială:
https://support.google.com/cloud/answer/15549945). Consimțământul a fost în jur de
**2026-10-09/10** → tokenul a expirat în jur de **2026-10-16/17**.

Setarea de pe 2026-10-21 a pus în secret manager tokenul **vechi, deja mort**.
Tabelul din `GOOGLE-INTEGRARE.md` secțiunea 6 spune chiar, paranteză:
*„exemplu de format — numerele reale apar doar după ce cheile sunt puse și rulezi tu"*.
Deci **nu a existat niciodată o verificare reală din cloud.** De aceea fiecare
sessie a început cu „nu merge" și a cerut re-setup.

**Bucla:** re-setup → token nou → moare în 7 zile → re-setup → …

## 4. Împărțirea cauzelor

Două cauze posibile, **același fix**:

- **(a) Testing** — probabil (~85%). Se vede în Cloud Console: banner galben
  „Google hasn't verified this app" + buton **Publish app**.
- **(b) Client secret rotit/șters** — posibil (~15%). Google: ștergerea unui
  client secret **revocă toate refresh token-urile** clientului. Se vede dacă în
  Cloud Console → Credentials există mai multe secrete pentru același client.

Ambele se rezolvă cu **aceeași secvență**: Publishing status → In production,
apoi un consimțământ nou.

---

## 5. Fix — o singură acțiune din partea lui POPY

### Pasul A (obligatoriu, ~30 sec) — înainte de consimțământ

Google Cloud Console → **APIs & Services → OAuth consent screen**:
- dacă vezi bannerul galben „Google hasn't verified this app" → apeș��
  **Publish app** → **In production**
- verifică și `apvizual@gmail.com` e în **Test users** (sau în Production nu mai contează)

> **Fără Pasul A, tokenul nou moare în 7 zile și suntem exact în punctul de acum.**

### Pasul B (~1 min) — consimțământ

Deschide linkul (generat cu scope-urile canonice, redirect fix):

```
https://accounts.google.com/o/oauth2/v2/auth?client_id=1068987308935-5b7h17gt1c5hc4i1m6eginads37o3m2h.apps.googleusercontent.com&redirect_uri=http%3A%2F%2F127.0.0.1%3A8976&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.modify+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdocuments+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fspreadsheets+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fpresentations&access_type=offline&prompt=consent&include_granted_scopes=true
```

Apasă **Continue** → **Allow**. Browserul o să moară pe `http://127.0.0.1:8976`
(normal — nu e nimic acolo). **Copiază bara de adresa** (conține `?code=…`) și
trimite-mi-o. Atât.

### Pasul C — îl fac eu, în cloud, în același tur

1. `node mavis-tools/google-connect.js "<url>"` → schimb codul în refresh_token
2. scriu tokenul în secret manager (`GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD`)
3. `node mavis-tools/google-verify.js` → **verificare reală, per serviciu, cu cod HTTP**

Niciun secret nu trece prin chat, niciunul în repo.

---

## 6. Bug de tooling reparat azi

`kit.js` folosea `https.request` → în sandboxul de cloud proxy-ul nu e onorat:
`Client network socket disconnected before secure TLS connection was established`.
**Apărea ca „nu am acces la Google"** — fals. `fetch` merge.

Reparat: `refresh()` și `attempt()` folosesc acum `fetch` (fallback `https.request`
pentru Node < 18). Commit `0d5bfe5`, împins pe `main`.

`google-verify.js` funcționează acum din cloud și raportează corect.

## 7. Ce nu merge și NU se repară din cloud

| Serviciu | Stare | De ce |
|---|---|---|
| Google Photos | ⛔ | `photoslibrary.googleapis.com` nu răspunde din cloud (DNS ok, conexiune nu) |
| Google Workspace MCP servers | ⛔ | `*mcp.googleapis.com` — 0/6 conexiuni din cloud |
| Google Maps | ⛔ | are nevoie de `GOOGLE_MAPS_API_KEY` + proiect cu billing |

---

*2026-10-22 02:10 · Mavis Cloud · măsurat în cloud, pe sandbox-ul real*
