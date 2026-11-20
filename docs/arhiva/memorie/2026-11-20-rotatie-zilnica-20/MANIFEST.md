---
description: "[ARHIVĂ] Snapshot memorie agent — rotatie-zilnica-20"
---

# MANIFEST — snapshot memorie, rotatie-zilnica-20

| | |
|---|---|
| Etichetă | `rotatie-zilnica-20` |
| Creat | 2026-11-20T06:15:59.413Z |
| Sursă | .mem-staging-2026-11-20 |
| Fișiere | 9 |
| Notă | Arhiva pre-taiere a memoriei inainte de rotatia zilnica a raportului 2026-11-20 |

## Fișiere

| Fișier | Bytes | sha256 (primele 16) |
|---|---|---|
| `MEMORY.md` | 21100 | `377f678f458b004e` |
| `topics/gmail-sorting-filters.md` | 3412 | `599ae32619dad560` |
| `topics/google-cloud-access.md` | 4879 | `08c0b7cc80d82232` |
| `topics/memory-maintenance-tooling.md` | 4356 | `99155d881b8e27d8` |
| `topics/puntea-local-cloud.md` | 4128 | `6eedc88942952f55` |
| `topics/raport-calitate-verificare.md` | 19563 | `a8b2b0e6436f0c5e` |
| `topics/raport-zilnic-istoric.md` | 42386 | `27e31b134ca49ca0` |
| `topics/raport-zilnic-pipeline.md` | 31952 | `f190479d4094e640` |
| `topics/scoring-gs-buguri-masurate.md` | 18948 | `e4742f9bae43a877` |

## Ce s-a tăiat din această versiune

_(se completează în sesiunea de optimizare: ce a fost comprimat, mutat în topic
sau șters, și unde trăiește acum)_

### Proveniența fișierelor

Fișierele de memorie trăiesc pe host, **nu** în sandbox ⇒ nu pot fi copiate byte-exact
de aici:

| Fișier | Cum a fost obținut | Exactitudine |
|---|---|---|
| `topics/gmail-sorting-filters.md`, `google-cloud-access.md`, `memory-maintenance-tooling.md`, `puntea-local-cloud.md` | **copie byte-exactă** din arhiva 19.11 (neschimbate azi) | byte-identic |
| `topics/raport-zilnic-istoric.md` | arhiva 19.11 + secțiunea `## 2026-11-20` | **super-set** al stării de azi |
| `topics/raport-calitate-verificare.md` | arhiva 19.11 + regulile 26–27 | 19.563 B |
| `topics/scoring-gs-buguri-masurate.md` | arhiva 19.11 + nota de 20.11 | 18.948 B |
| `topics/raport-zilnic-pipeline.md` | arhiva 19.11 + pointerul de azi | 31.952 B |
| `MEMORY.md` | arhiva 19.11 + delta de live-state (cota 131, triaj 0/3/4/7/0, 0 postări noi, regulile 26–27) | 21.100 B |

### Ce se taie azi (20.11)

| Se taie | Unde trăiește după tăiere |
|---|---|
| `raport-zilnic-istoric`: secțiuni vechi comprimate (11.04, 11.05, 11.08, 11.09, 11.10) | arhiva de azi + rapoartele zilei + git |
| `raport-zilnic-istoric`: se adaugă `## 2026-11-20` | topic |
| `raport-calitate-verificare`: se adaugă regulile 26–27 (cota = „starea la scriere"; verificarea livrării: o singură dată, cu id-ul real) | topic |
| `scoring-gs-buguri-masurate`: se adaugă nota de 20.11 (0 postări noi; Stefanini rămân amânate) | topic |
| `raport-zilnic-pipeline`: pointer de azi + nota de execuție (subshell fără `cd`) | topic + arhiva de azi |
| `MEMORY.md`: cota 131, triaj 0/3/4/7/0, 0 postări noi, regulile 26–27 | topic |

**Regulă:** arhiva e append-only. Nu se șterge nimic din ea.
