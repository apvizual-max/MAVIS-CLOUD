---
description: "[ARHIVĂ] Snapshot memorie agent — rotatie-zilnica-19"
---

# MANIFEST — snapshot memorie, rotatie-zilnica-19

| | |
|---|---|
| Etichetă | `rotatie-zilnica-19` |
| Creat | 2026-11-19T06:15:19.301Z |
| Sursă | .mem-staging-2026-11-19 |
| Fișiere | 9 |
| Notă | Arhiva pre-taiere a memoriei inainte de rotia zilnica a raportului 2026-11-19 |

## Fișiere

| Fișier | Bytes | sha256 (primele 16) |
|---|---|---|
| `MEMORY.md` | 20725 | `65eb1763201e2166` |
| `topics/gmail-sorting-filters.md` | 3412 | `599ae32619dad560` |
| `topics/google-cloud-access.md` | 4879 | `08c0b7cc80d82232` |
| `topics/memory-maintenance-tooling.md` | 4356 | `99155d881b8e27d8` |
| `topics/puntea-local-cloud.md` | 4128 | `6eedc88942952f55` |
| `topics/raport-calitate-verificare.md` | 18108 | `de99ef34cd440ea6` |
| `topics/raport-zilnic-istoric.md` | 40536 | `9e97c6cc5750567b` |
| `topics/raport-zilnic-pipeline.md` | 31489 | `d09eae0aa18ad174` |
| `topics/scoring-gs-buguri-masurate.md` | 18446 | `6af0b3553d0fc437` |

### Proveniența fișierelor

Fișierele de memorie trăiesc pe host, **nu** în sandbox ⇒ nu pot fi copiate byte-exact
de aici:

| Fișier | Cum a fost obținut | Exactitudine |
|---|---|---|
| `topics/gmail-sorting-filters.md`, `google-cloud-access.md`, `memory-maintenance-tooling.md`, `puntea-local-cloud.md` | **copie byte-exactă** din arhiva 18.11 (neschimbate) | byte-identic |
| `topics/raport-zilnic-istoric.md` | arhiva 18.11 + secțiunea `## 2026-11-19` | **super-set** al stării de azi |
| `topics/raport-calitate-verificare.md` | arhiva 18.11 + regulile 24–25 | 18.108 B |
| `topics/scoring-gs-buguri-masurate.md` | arhiva 18.11 + cursorile Stefanini | 18.446 B |
| `topics/raport-zilnic-pipeline.md` | arhiva 18.11 + pointerul de azi | 31.489 B |
| `MEMORY.md` | arhiva 18.11 + delta de live-state (max ID 24020, cota 128, triaj 0/4/5/7/0, lecțiile 19.11) | 20.725 B |

### Ce se taie azi (19.11)

| Se taie | Unde trăiește după tăiere |
|---|---|
| `raport-zilnic-istoric`: secțiuni vechi comprimate (10.23, 10.24, 10.25, 11.01, 11.02, 11.03, 11.05) | arhiva de azi + rapoartele zilei + git |
| `raport-zilnic-istoric`: se adaugă `## 2026-11-19` | topic |
| `raport-calitate-verificare`: se adaugă regulile 24–25 | topic |
| `scoring-gs-buguri-masurate`: se adaugă notă despre rolurile Stefanini | topic |
| `raport-zilnic-pipeline`: pointer de azi | topic + arhiva de azi |
| `MEMORY.md`: max ID 24020, cota 128, triaj 0/4/5/7/0, regulile 19.11 | topic |

**Regulă:** arhiva e append-only. Nu se șterge nimic din ea.
