---
description: "[ARHIVĂ] Snapshot memorie agent — rotatie-zilnica-21"
---

# MANIFEST — snapshot memorie, rotatie-zilnica-21

| | |
|---|---|
| Etichetă | `rotatie-zilnica-21` |
| Creat | 2026-11-21T07:35:06.992Z |
| Sursă | .mem-staging-2026-11-21 |
| Fișiere | 9 |
| Notă | Arhiva pre-taiere a memoriei inainte de rotatia zilnica a raportului 2026-11-21 |

## Fișiere

| Fișier | Bytes | sha256 (primele 16) |
|---|---|---|
| `MEMORY.md` | 21420 | `9beb3385e71b1293` |
| `topics/gmail-sorting-filters.md` | 3412 | `599ae32619dad560` |
| `topics/google-cloud-access.md` | 4879 | `08c0b7cc80d82232` |
| `topics/memory-maintenance-tooling.md` | 4356 | `99155d881b8e27d8` |
| `topics/puntea-local-cloud.md` | 4128 | `6eedc88942952f55` |
| `topics/raport-calitate-verificare.md` | 20249 | `e4db80f3cba44a17` |
| `topics/raport-zilnic-istoric.md` | 43941 | `1c13e9b206a5abb4` |
| `topics/raport-zilnic-pipeline.md` | 32175 | `e9cea955204cde71` |
| `topics/scoring-gs-buguri-masurate.md` | 19223 | `f8ab29642aa5f729` |

## Ce s-a tăiat din această versiune

_(se completează în sesiunea de optimizare: ce a fost comprimat, mutat în topic
sau șters, și unde trăiește acum)_

### Proveniența fișierelor

Fișierele de memorie trăiesc pe host, **nu** în sandbox ⇒ nu pot fi copiate byte-exact
de aici:

| Fișier | Cum a fost obținut | Exactitudine |
|---|---|---|
| `topics/gmail-sorting-filters.md`, `google-cloud-access.md`, `memory-maintenance-tooling.md`, `puntea-local-cloud.md` | **copie byte-exactă** din arhiva 20.11 (neschimbate azi) | byte-identic |
| `topics/raport-zilnic-istoric.md` | arhiva 20.11 + secțiunea `## 2026-11-21` | **super-set** al stării de azi |
| `topics/raport-calitate-verificare.md` | arhiva 20.11 + regula 29 | 20.249 B |
| `topics/scoring-gs-buguri-masurate.md` | arhiva 20.11 + nota de 21.11 | 19.223 B |
| `topics/raport-zilnic-pipeline.md` | arhiva 20.11 + pointerul de azi | 32.175 B |
| `MEMORY.md` | arhiva 20.11 + delta de live-state (max ID 24021, cota 130, triaj 0/4/6/11/0, regula 29) | 21.420 B |

### Ce se taie azi (21.11)

| Se taie | Unde trăiește după tăiere |
|---|---|
| `raport-zilnic-istoric`: secțiuni vechi comprimate (11.04, 11.05, 11.06 → 11) | arhiva de azi + rapoartele zilei + git |
| `raport-zilnic-istoric`: se adaugă `## 2026-11-21` | topic |
| `raport-calitate-verificare`: se adaugă regula 29 (nu deduce o divergență dintr-un output trunchiat) | topic |
| `scoring-gs-buguri-masurate`: se adaugă nota de 21.11 (#24021 Gallery Manager — non-design, drop-uit) | topic |
| `raport-zilnic-pipeline`: pointer de azi | topic + arhiva de azi |
| `MEMORY.md`: max ID 24021, cota 130, triaj 0/4/6/11/0, regula 29 | topic |

**Regulă:** arhiva e append-only. Nu se șterge nimic din ea.
