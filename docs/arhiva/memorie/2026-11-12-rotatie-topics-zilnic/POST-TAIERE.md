---
description: "[POST-TAIERE] Ce s-a taiat din memorie pe 12.11.2026 si unde traieste acum"
---

# POST-TAIERE — rotatia topicurilor de raport, 12.11.2026

Flux complet respectat: **SNAPSHOT → MANIFEST → COMMIT → PUSH → taie → COMMIT → PUSH.**

Arhiva pre-taiere: `docs/arhiva/memorie/2026-11-12-rotatie-topics-zilnic/`
(commit `0fd83cf`, push facut **inainte** de orice taiere; eticheta de verificare:
`node mavis-tools/memory-snapshot.js --verify rotatie-topics-zilnic`).

## Ce s-a taiat si unde traieste acum

| Taiat | Unde traieste acum |
|---|---|
| `raport-zilnic-istoric`: sectiunea FULL `## 2026-10-26` (consum, etichete, 6 leaduri, livrare) → **o linie** | arhiva de azi (byte-exact) + `rapoarte/RAPORT-ZILNIC-202610-26.md` + git |
| `raport-zilnic-istoric`: sectiunea FULL `## 2026-10-27` (taxonomie + filtre + cota 207) → **o linie** | arhiva de azi + raport + git |
| `raport-zilnic-istoric`: sectiunea FULL `## Leaduri 28.10` (tabel cu 5 leaduri) → **o linie** | arhiva de azi + raport + git |
| `raport-zilnic-istoric`: sectiunea FULL `## Joburi 29.10` (3 postari noi + etichete) → **o linie** | arhiva de azi + raport + git |
| `raport-zilnic-istoric`: sectiunea FULL `## 2026-11-04` (piata, 3 reguli, 6 leaduri) → **o linie** + leaduri compactate | arhiva de azi + raport + git |
| `raport-zilnic-istoric`: ultima linie a notei bestjobs.ro (11.11 → 12.11) | arhiva de azi |
| `raport-zilnic-istoric`: sectiunea FULL `## 2026-10-25` → doar fragmentul bestjobs.ro ramas | arhiva de azi + raport + git |

**Spatiu eliberat in `raport-zilnic-istoric`: 30.714 B → 30.224 B**, apoi a adaugat
sectiunea de azi. Nicio informatie unica pierduta: textele taiate exista in arhiva
de azi (byte-exact), in rapoartele zilnice din repo si in istoricul git.

## Ce s-a ADAUGAT azi

- **`raport-zilnic-istoric`**: sectiunea `## 2026-11-12` — 16 mesaje, **1 posting nou**
  (IQads #24013 DTP Specialist @ Fieldstar), 2 defecte de triaj reparate, top de joburi,
  cota 126/200.
- **`raport-calitate-verificare`**: regulile **9–11** —
  9. *un rol drop-uit intr-o disciplina din profilul tau e un LEAD ASCUNS* (masurat: singura
  posting noua a zilei era drop-uita ca „disciplina care nu se potriveste niciunui tier",
  desi profilul declara `prepress: 10` ani; reparatie = diagnostic nou §6.3 in raport,
  motorul neatins);
  10. *regula „neexpiratii primii" se aplica tuturor tabelelor* (topul de design avea un
  job expirat pe pozitia 1);
  11. *facturarea/suspendarea nu e incident de securitate* (motiv propriu in triaj).
- **`raport-zilnic-pipeline`**: pointer la topicul de calitate.
- **MEMORY.md (strat HOT)**: max ID IQads **24013** (DTP Specialist @ Fieldstar), cota
  **126**, triajul zilei (0 / 11 / 4 / 1 / 0) + bulletul nou despre lipsa cheii DTP/prepress
  in motor.

## Stare dupa taiere

| Topic | Bytes | Note |
|---|---|---|
| `raport-zilnic-istoric` | 30.224 | limita 30.720 — ~500 B liberi |
| `raport-zilnic-pipeline` | 30.620 | limita 30.720 — **la limita**, urmata rotatia comprima aici |
| `raport-calitate-verificare` | 7.517 | are loc |

## Ce a mers prost azi (de retinut)

`memory_topic_edit` cu blocuri lungi a esuat de repetii (`OLD_STRING_NOT_FOUND`) pe
texte care **exista** — cauza nu e normalizarea, ci **typo-uri la recopiere** (am
scris „raportultreated", „fus oriar" etc.) si **diferente reale** fata de arhiva de
ieri (topicul a fost rescris pe 11.11 in unele sectiuni: ex. „ROTARE" vs „ROTIRE",
„30 de zile" vs „30 zile", wrapping diferit).

**Regula practică:** pentru un bloc lung, **verifica-l mai intai pe 2-3 linii**
(no-op edit cu `old_string` == `new_string`), apoi taie in bucati mici. Textul
**byte-exact** se ia din arhiva de pe disc (`docs/arhiva/memorie/.../topics/*.md`),
nu din view-ul tool-ului.
