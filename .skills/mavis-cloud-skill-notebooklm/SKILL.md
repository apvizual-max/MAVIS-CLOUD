---
name: mavis-cloud-skill-notebooklm
description: Accesul la NotebookLM / Gemini Notebook pentru Mavis Cloud. Ce este posibil si ce nu este, cele trei cai reale, si de ce API-ul oficial nu merge pentru un cont Google normal. Trigger-uri: "notebooklm", "gemini notebook", "adauga surse", "interactioneaza cu notebook", "RAG pe documente", "citare".
---

# NotebookLM / Gemini Notebook — ce e real

**Redenumit:** Google a renumat NotebookLM în **Gemini Notebook** pe **16 iulie
2026**. Același produs, aceleași endpoint-uri, redirect-urile vechi funcționează.

**Cercetat 28 oct 2026. Concluzia: pentru un cont Google normal, NotebookLM
NU are API oficial accesibil din cloud.**

---

## Situația reală

| Cale | Stare | Detalii |
|---|---|---|
| **API oficial Google** | ⛔ pentru cont normal | Doar **Gemini Notebook Enterprise**: cere proiect Cloud + **licențe plătite per utilizator** + `discoveryengine.googleapis.com/v1alpha`. Un cont gmail.com nu intră. |
| **API oficial — Enterprise** | ⚠️ limitat | `notebooks.create/get`, `notebooks.sources.batchCreate/uploadFile`, `sources.batchDelete`, audio overview. **Nu există operație de ask/chat** în API-ul documentat. |
| **useapi.net** (terț) | ✅ Merge cu abonament | REST + **MCP server cu 57 de tool-uri**, pe abonamentul Google AI al lui POPY (Free/Plus/Pro/Ultra). ~15 USD/lună pentru cheie. |
| **Automatizare browser/sesiune** | ⚠️ Fragil | `notebooklm-py` & co. folosesc **API-uri nedocumentate** ale Google — se pot schimba fără notificare. Merge de pe calculatorul lui POPY. |
| **Gemini API + File Search** | ✅ **Alternativa oficială** | Nu e NotebookLM, dar e **același rezultat**: întrebi cu citare peste documente. Cheie API separată, de la `ai.google.dev`. |

**Nu există connector App pentru Google** în catalogul disponibil (verificat:
`cloudflare, coinmarketcap, email_workbench_credentials, figma, github, matrix`).

---

## Ce știm deja din repo

`13-NOTEBOOKLM/` — partea locală a documentat capcana, cu 4 utilizări:
cercetare · pregătire interviu · cercetare client · design schema. Toate cer
**documente corecte în Drive**. Fluxul desenat: *Cloud culege documente → Drive
→ NotebookLM răspunde cu citări → Local folosește*.

**Gap-ul rămas:** API-ul. Nu e cod lipsă, e **produs fără API public**.

---

## Ce aleg pe baza situației reale

**Calea 1 — Gemini API + File Search (aleasă implicit).**
- Motiv: oficială, stabilă, API deschis, se conectează cu cheie API.
- Dă RAG cu citare peste fișierele lui POPY, din cloud, permanent.
- **Cerință:** cheie Gemini API de la POPY → secret manager
  `GEMINI_API_KEY`. **Fără ea, nu se face nimic.**
- Diferența față de NotebookLM: alt produs, alt branding, aceleași capabilități
  de bază (întrebări cu citare peste surse).

**Calea 2 — useapi.net MCP (aleasă dacă POPY vrea chiar NotebookLM).**
- Motiv: conduce **NotebookLM-ul real** de pe abonamentul lui, cu 57 de tool-uri
  (chat cu citări, Deep Research, audio/video overview, slide-deck, quiz,
  flashcards, mind maps).
- **Cerință:** token useapi.net de la POPY → secret manager.
- Se conectează prin MCP, nu prin OAuth Google.

**Calea 3 — automatizare locală (deja există).**
- `13-NOTEBOOKLM/` e deja documentat. Rulează pe calculatorul lui POPY.
- **Nu o mut în cloud** — API-urile nedocumentate se pot schimba oricând, iar
  cloud-ul n-are sesiunea de browser a lui.

---

## Ceea ce NU fac

- **Nu pretind că pot citi un notebook NotebookLM din cloud.** Nu pot, fără una
  din cele trei căi de mai sus.
- **Nu folosesc `photoslibrary` sau `maps` ca să „compensez"** — sunt
  rezolvate pe partea locală, decis de POPY pe 28 oct.
- **Nu cer scope-uri Google care nu există** pentru consumator. `notebooklm` nu e
  un scope OAuth Google.

## Primul pas, concret

**Întrebarea pentru POPY:** vrei
**(a)** Gemini API + File Search — oficial, permanent, alt produs, cheie de la
`ai.google.dev`; sau
**(b)** useapi.net — chiar NotebookLM, token de la useapi.net, ~15 USD/lună; sau
**(c)** rămâne local, iar cloud-ul doar furnizează documentele pe Drive.

Până la răspuns, rămâne calea **(a)**, pentru că e singura care nu depinde de
un API nedocumentat sau de un serviciu terț plătit.

## Legături

Skill central: `mavis-cloud-google-access-bot` · sibling: `mavis-cloud-skill-drive`
(care furnizează sursele), `mavis-cloud-skill-sync-bridge`
