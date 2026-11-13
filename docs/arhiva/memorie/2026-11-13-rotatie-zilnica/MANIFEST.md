---
description: "[ARHIVĂ] Snapshot memorie agent — rotatie-zilnica"
---

# MANIFEST — snapshot memorie, rotatie-zilnica

| | |
|---|---|
| Etichetă | `rotatie-zilnica` |
| Creat | 2026-11-13T06:05:49.921Z |
| Sursă | .mem-staging-2026-11-13 |
| Fișiere | 9 |
| Notă | Arhiva pre-taiere a memoriei inainte de rotia zilnica a raportului 2026-11-13 (comprimarea sectiunilor FULL din raport-zilnic-istoric + adaugarea sectiunii 13.11) |

## Fișiere

| Fișier | Bytes | sha256 (primele 16) |
|---|---|---|
| `MEMORY.md` | 17978 | `78ca4c1a27bb6947` |
| `topics/gmail-sorting-filters.md` | 3412 | `599ae32619dad560` |
| `topics/google-cloud-access.md` | 4879 | `08c0b7cc80d82232` |
| `topics/memory-maintenance-tooling.md` | 4356 | `99155d881b8e27d8` |
| `topics/puntea-local-cloud.md` | 4128 | `6eedc88942952f55` |
| `topics/raport-calitate-verificare.md` | 7516 | `e543f49d91d0ea62` |
| `topics/raport-zilnic-istoric.md` | 30717 | `ec01fae0577ee5de` |
| `topics/raport-zilnic-pipeline.md` | 30702 | `48ac0101034eed5e` |
| `topics/scoring-gs-buguri-masurate.md` | 15507 | `54a705867884e0fa` |

## Ce s-a tăiat din această versiune

_(se completează în sesiunea de optimizare: ce a fost comprimat, mutat în topic
sau șters, și unde trăiește acum)_

### Proveniența fișierelor (IMPORTANT — citește înainte să reconstituie)

Fișierele de memorie trăiesc pe host, **nu** în sandbox ⇒ nu pot fi copiate byte-exact
de aici. Prin urmare:

| Fișier | Cum a fost obținut | Exactitudine |
|---|---|---|
| `topics/gmail-sorting-filters.md`, `google-cloud-access.md`, `memory-maintenance-tooling.md`, `puntea-local-cloud.md`, `scoring-gs-buguri-masurate.md` | **copie byte-exactă** din arhiva 12.11 (neschimbate de atunci — conținut + dimensiune verificate) | byte-identic |
| `MEMORY.md` | arhiva 12.11 + delta de live-state din 12.11 aplicat scriptic (3 linii înlocuite, 1 bullet adăugat) | 17.978 B vs 17.982 B live — diferența e normalizarea view-ului |
| `topics/raport-calitate-verificare.md` | arhiva 12.11 + regulile 9–11 (text adăugat pe 12.11, copiat verbatim) | 7.516 B vs 7.517 B live |
| `topics/raport-zilnic-istoric.md`, `topics/raport-zilnic-pipeline.md` | **copie byte-exactă** din arhiva 12.11 | **super-set** al stării de azi (vezi mai jos) |

**De ce super-setul e suficient:** singura tăiere de azi e **comprimarea** secțiunilor
FULL din cele două topicuri de raport. Textele care se comprimă azi se află
**byte-exact aici** (fișierele copiate din arhiva 12.11) **și** în:
- `rapoarte/RAPORT-ZILNIC-*.md` (rapoartele zilnice din repo),
- istoricul git al repo-ului MAVIS-CLOUD,
- arhivele `2026-10-30-pre-restructure-topics-30-10/` și `2026-11-12-rotatie-topics-zilnic/`.

Super-setul nu conține secțiunea `## 2026-11-12` (adăugată după snapshot-ul din 12.11)
— ea e descrisă în `2026-11-12-rotatie-topics-zilnic/POST-TAIERE.md` și e în istoricul git.

### Ce se taie azi (13.11)

| Se taie | Unde trăiește după tăiere |
|---|---|
| `raport-zilnic-istoric`: secțiuni FULL din 24.10–05.11 (10-30, 10-31, 11-01, 11-02, 11-03, 11-05), comprimate la **o linie fiecare** | arhiva de azi (byte-exact) + `rapoarte/RAPORT-ZILNIC-*.md` + git |
| `raport-zilnic-istoric`: secțiunea `## 2026-11-12` rămâne; se adaugă `## 2026-11-13` | topic |
| `raport-zilnic-pipeline`: secțiunile zilnice vechi (27.10–05.11) se comprimă ca să încapă pointerul de azi | topic + arhiva de azi |
| `raport-calitate-verificare`: se adaugă regula 12 (13.11) | topic |

**Regulă:** arhiva e append-only. Nu se șterge nimic din ea.
