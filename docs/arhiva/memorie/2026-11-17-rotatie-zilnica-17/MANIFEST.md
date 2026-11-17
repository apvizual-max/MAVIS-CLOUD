---
description: "[ARHIVĂ] Snapshot memorie agent — rotatie-zilnica-17"
---

# MANIFEST — snapshot memorie, rotatie-zilnica-17

| | |
|---|---|
| Etichetă | `rotatie-zilnica-17` |
| Creat | 2026-11-17T06:11:46.903Z |
| Sursă | .mem-staging-2026-11-17 |
| Fișiere | 9 |
| Notă | Arhiva pre-taiere a memoriei inainte de rotia zilnica a raportului 2026-11-17 |

## Fișiere

| Fișier | Bytes | sha256 (primele 16) |
|---|---|---|
| `MEMORY.md` | 18722 | `625f08dea33c0449` |
| `topics/gmail-sorting-filters.md` | 3412 | `599ae32619dad560` |
| `topics/google-cloud-access.md` | 4879 | `08c0b7cc80d82232` |
| `topics/memory-maintenance-tooling.md` | 4356 | `99155d881b8e27d8` |
| `topics/puntea-local-cloud.md` | 4128 | `6eedc88942952f55` |
| `topics/raport-calitate-verificare.md` | 13996 | `77984e133c3578bb` |
| `topics/raport-zilnic-istoric.md` | 35736 | `b0a9a8179b6a7360` |
| `topics/raport-zilnic-pipeline.md` | 31104 | `2fddcc0fb1f5977d` |
| `topics/scoring-gs-buguri-masurate.md` | 15507 | `54a705867884e0fa` |

## Ce s-a tăiat din această versiune

_(se completează în sesiunea de optimizare: ce a fost comprimat, mutat în topic
sau șters, și unde trăiește acum)_

### Proveniența fișierelor

Fișierele de memorie trăiesc pe host, **nu** în sandbox ⇒ nu pot fi copiate byte-exact
de aici:

| Fișier | Cum a fost obținut | Exactitudine |
|---|---|---|
| `topics/gmail-sorting-filters.md`, `google-cloud-access.md`, `memory-maintenance-tooling.md`, `puntea-local-cloud.md`, `scoring-gs-buguri-masurate.md` | **copie byte-exactă** din arhiva 16.11 (neschimbate) | byte-identic |
| `topics/raport-zilnic-istoric.md`, `topics/raport-zilnic-pipeline.md` | arhiva 16.11 + secțiunea/pointerul din 16.11 | **super-set** al stării de azi |
| `topics/raport-calitate-verificare.md` | arhiva 16.11 + regulile 19–20 (text adăugat pe 16.11, copiat verbatim) | 13.996 B vs ~14 KB live |
| `MEMORY.md` | arhiva 16.11 + delta de live-state (max ID 24018, cota 124, triaj 0/7/4/5/0, starea filtrelor) | 18.722 B vs ~18.8 KB live |

**De ce super-setul e suficient:** tăierea de azi e **comprimarea** secțiunilor vechi
din topicul istoric (10.31, 11.05, 11.11) ⇒ textele lor trăiesc și în
`rapoarte/RAPORT-ZILNIC-2026-10-31.md` / `-11-05.md` / `-11-11.md` + în istoricul git.

### Ce se taie azi (17.11)

| Se taie | Unde trăiește după tăiere |
|---|---|
| `raport-zilnic-istoric`: secțiunile `## 2026-10-31`, `## 2026-11-05`, `## 2026-11-11` comprimate | arhiva de azi + rapoartele zilei + git |
| `raport-zilnic-istoric`: se adaugă `## 2026-11-17` | topic |
| `raport-calitate-verificare`: se adaugă regula 21 | topic |
| `scoring-gs-buguri-masurate`: se adaugă „lead" în sens comercial ≠ senioritate | topic |
| `raport-zilnic-pipeline`: pointer de azi | topic + arhiva de azi |

**Regulă:** arhiva e append-only. Nu se șterge nimic din ea.
