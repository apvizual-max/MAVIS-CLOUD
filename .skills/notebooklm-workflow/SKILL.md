---
name: notebooklm-workflow
description: Folosește când POPY sau Gemini spun "notebook", "notebooklm", "google notebook", "GNotebook", "sinteză din notebook", sau cer să intri într-un notebook ca să extragi/sintetizezi ceva. Firește rezolvarea, NU discută situația.
---

# NotebookLM — procedură, nu discuție

## REGULA 1 — NICIODATĂ NU ÎNTREBI

**Nu întrebi:**
- care cont are notebook-urile
- dacă există un notebook
- dacă trebuie să creez fișiere
- ce sinteză vrea (dacă nu e scris explicit, **fă ce e cel mai util și spune ce ai făcut**)

**Nu cauți** notebook-uri în Drive, **nu cauți** fișiere `.ipynb`,
**nu cauți** conectoare. **Astea sunt de căutări inutile, dovedite.**

## REGULA 2 — FAPTUL MĂSURAT

NotebookLM = **Gemini Notebook**, redenumit în iulie 2026. `notebook.google.com`.
Nu e alt produs. Nu căuta altceva.

**Cum ajunge un agent la el:** cookie de sesiune Google. Nu există
API oficial pe cont personal. API-ul oficial e doar pe Enterprise —
**irrelevant aici.**

## REGULA 3 — TESTUL, NU PRESUPUNEREA

Înainte de orice, rulează:

```bash
python3 mavis-tools/notebooklm-probe.py
```

| Ieșire | Ce înseamnă | Ce faci |
|---|---|---|
| `ACCES` | Cloud merge | lucrezi direct, fără discuții |
| `RESING` | Google respinge de la IP datacenter | **treci pe calea Local**, fără comentarii lungi |
| `FARA` | lipsesc cookie-urile | ceri cookie-ul, **o singură frază** |

**Rezultatul măsurat pe 2026-10-12: `RESING`.**
Cookie-ul lui POPY e valid pe mașina lui. Google îl respinge venit
de la IP-ul cloud-ului. **Asta e real, nu e limită inventată.**

## REGULA 4 — CÂND E `RESING`

**Calea corectă, anunțată în maxim trei rânduri:**

> Notebook-ul e pe mașina ta, nu aici. Deschide `notebook.google.com`,
> fă sinteza, scrie rezultatul în repo. Eu îl citesc de acolo.

**Apoi taci.** Nu explica, nu te scuzi, nu oferi alternative.

## REGULA 5 — CE NU FACI NICIODATĂ

- ❌ Nu creezi fișiere `MavisCloud-*.md` ca „pregătire" — **făcut o dată, greșit, cerut de nimeni**
- ❌ Nu scrii rapoarte, handoff-uri sau tabele „de sincronizare" nesolicitate
- ❌ Nu afirmi „nu am găsit notebook-ul" — **e o concluzie falsă, ai căutat greșit**
- ❌ Nu zici „e imposibil" — **e posibil, doar prin altă cale**
- ❌ Nu împingi nimic în repo fără cerere explicită — **push cere R0**

## REGULA 6 — MODE B

**POPY a cerut: vorbește, nu face.** Respectă-l.
Nu rula probe, nu scrie, nu împinge. **Doar răspunde.**

---

## Scurtătură — răspunsul standard

Când apare cuvântul „notebook":

```bash
python3 mavis-tools/notebooklm-probe.py
```

`RESING` → trei rânduri, apoi liniște.
`ACCES` → lucrezi.
`FARA` → o frază: *„pune cookie-ul în credential field, numele NOTEBOOKLM_COOKIES"*.

**Atât. Zero întrebări.**

---

*Testat pe fapte, 2026-10-12 · Mavis Cloud*