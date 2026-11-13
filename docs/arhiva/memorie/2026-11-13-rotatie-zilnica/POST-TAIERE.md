---
description: "[POST-TAIERE] Ce s-a taiat din memorie pe 13.11.2026 si unde traieste acum"
---

# POST-TAIERE — rotatia topicurilor de raport, 13.11.2026

Flux complet respectat: **SNAPSHOT → MANIFEST → COMMIT → PUSH → taie → COMMIT → PUSH.**

Arhiva pre-taiere: `docs/arhiva/memorie/2026-11-13-rotatie-zilnica/`
(commit `2467b86`, push facut **inainte** de orice taiere; verificare:
`node mavis-tools/memory-snapshot.js --verify rotatie-zilnica`).

## Ce s-a taiat si unde traieste acum

| Taiat | Unde traieste acum |
|---|---|
| `raport-zilnic-istoric`: sectiunea FULL `## 2026-11-05` (piata + 3 reguli) → **o linie** | arhiva de azi (byte-exact) + `rapoarte/RAPORT-ZILNIC-202611-05.md` + git |
| `raport-zilnic-istoric`: sectiunea FULL `## 2026-11-01` (alerta Meta + 4 reguli + cota) → **o linie** | arhiva de azi + raport + git |
| `raport-zilnic-istoric`: sectiunea FULL `## 2026-10-30` (posting Saatchi + 2 leaduri + tipuri de sume Bestjobs) → **o linie** | arhiva de azi + raport + git |
| `raport-zilnic-pipeline`: blocul de reguli din `## 2026-11-05` → **o linie** | arhiva de azi + raport + git |

**Spatiu eliberat in `raport-zilnic-istoric`: 30.224 B → 27.974 B**, apoi a adaugat
sectiunea de azi (final: **30.422 B**). In `raport-zilnic-pipeline`: 30.620 → 30.646 B
(pointerul de azi a intrat dupa ce am eliberat 109 B prin comprimarea regulilor din
11.11.05). Nicio informatie unica pierduta: textele taiate exista in arhiva de azi
(byte-exact), in rapoartele zilnice din repo si in istoricul git.

## Ce s-a ADAUGAT azi

- **`raport-zilnic-istoric`**: sectiunea `## 2026-11-13` — 24 mesaje, 34 hituri de
  eticheta, **3 postari noi (niciuna de design)**, DTP Specialist @ Fieldstar inca
  drop-uit (motorul nu are cheie DTP/prepress), top de joburi, leaduri din alerte,
  facturarea Google Cloud neplatita a doua zi, cota 138/200.
- **`raport-calitate-verificare`**: regulile **12–13** —
  12. *concluzia unui raport se scrie cu `plural()`, nu cu concatenare* (bug masurat:
    „3 postareri noue" — corectat azi in `report-build.js`);
  13. *facturarea neplatita a doua zi = actiune repetata, nu noutate* (raportata ca
    pendent).
- **`raport-zilnic-pipeline`**: pointer la topicul de calitate.
- **MEMORY.md (strat HOT)**: max ID IQads **24016** (3 postari noi, niciuna de
  design), cota **138**, triajul zilei (0 / 12 / 3 / 9 / 0).

## Stare dupa taiere

| Topic | Bytes | Note |
|---|---|---|
| `raport-zilnic-istoric` | 30.422 | limita 30.720 — ~300 B liberi |
| `raport-zilnic-pipeline` | 30.646 | limita 30.720 — **la limita**, urmata rotatia comprima aici |
| `raport-calitate-verificare` | 8.759 | are loc |

## Ce a mers prost azi (de retinut)

1. **Scraperele au nevoie de calea de ieșire ca argument** (`process.argv[2]`), altfel
   scriu peste **fisierele din 23.10** (numele implicit e `jobs-*-2026-10-23.json`).
   Azi le-am pornit fara argument → am rescris fisierele vechi; le-am restaurat cu
   `git checkout` si am reluat cu calea corecta. **Regula:** verifica `ls jobs-*<data>.json`
   inainte sa consideri scraping-ul gata.
2. **`memory_topic_edit` cu blocuri lungi** esueaza pe orice diferenta reala de
   text fata de arhiva de pe disc (ex. 11.11 a rescris sectiuni: „ROTARE" vs
   „ROTIRE", „30 de zile" vs „30 zile", wrapping diferit, un cuvant fara bold).
   **Regula:** pentru blocuri lungi, ia textul **byte-exact din arhiva de pe disc**
   (`docs/arhiva/memorie/.../topics/*.md`), probeaza mai intai cu 2-3 linii (no-op
   edit), apoi taie in bucati mici. 3 sectiuni s-au comprimat in 5 edit-uri.
3. **Pluralul din §4** — `postare${n>1?'ri':''}` dă „postareri". Reparat cu
   `plural(n, one, few, many)` (vezi regula 12 din topicul de calitate).
