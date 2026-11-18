---
description: "[ARHIVĂ] Snapshot memorie agent — rotatie-zilnica-18"
---

# MANIFEST — snapshot memorie, rotatie-zilnica-18

| | |
|---|---|
| Etichetă | `rotatie-zilnica-18` |
| Creat | 2026-11-18T06:10:09.319Z |
| Sursă | .mem-staging-2026-11-18 |
| Fișiere | 9 |
| Notă | Arhiva pre-taiere a memoriei inainte de rotia zilnica a raportului 2026-11-18 |

## Fișiere

| Fișier | Bytes | sha256 (primele 16) |
|---|---|---|
| `MEMORY.md` | 19833 | `10530148bfa1c515` |
| `topics/gmail-sorting-filters.md` | 3412 | `599ae32619dad560` |
| `topics/google-cloud-access.md` | 4879 | `08c0b7cc80d82232` |
| `topics/memory-maintenance-tooling.md` | 4356 | `99155d881b8e27d8` |
| `topics/puntea-local-cloud.md` | 4128 | `6eedc88942952f55` |
| `topics/raport-calitate-verificare.md` | 16157 | `2f2c054c53a3981d` |
| `topics/raport-zilnic-istoric.md` | 38730 | `2110788a4bf03740` |
| `topics/raport-zilnic-pipeline.md` | 31302 | `84ee31ecb4b2e0d4` |
| `topics/scoring-gs-buguri-masurate.md` | 17520 | `f5310b779d9a3bcf` |

## Ce s-a tăiat din această versiune

_(se completează în sesiunea de optimizare: ce a fost comprimat, mutat în topic
sau șters, și unde trăiește acum)_

### Proveniența fișierelor

Fișierele de memorie trăiesc pe host, **nu** în sandbox ⇒ nu pot fi copiate byte-exact
de aici:

| Fișier | Cum a fost obținut | Exactitudine |
|---|---|---|
| `topics/gmail-sorting-filters.md`, `google-cloud-access.md`, `memory-maintenance-tooling.md`, `puntea-local-cloud.md` | **copie byte-exactă** din arhiva 17.11 (neschimbate) | byte-identic |
| `topics/raport-zilnic-istoric.md` | arhiva 17.11 + secțiunile `## 2026-11-17` și `## 2026-11-18` | **super-set** al stării de azi |
| `topics/raport-calitate-verificare.md` | arhiva 17.11 + regulile 21–23 | 16.157 B |
| `topics/scoring-gs-buguri-masurate.md` | arhiva 17.11 + triggerul „lead" (17.11) + nuanceaza per axă (18.11) | 17.520 B |
| `topics/raport-zilnic-pipeline.md` | arhiva 17.11 + pointerul de azi | 31.302 B |
| `MEMORY.md` | arhiva 17.11 + delta de live-state (max ID 24019, cota 128, triaj 0/2/6/9/0, starea filtrelor + definiția „funcțional", regulile 16–18.11) | 19.833 B |

**De ce super-setul e suficient:** tăierea de azi e **comprimarea** secțiunilor vechi
din topicul istoric ⇒ textele lor trăiesc și în `rapoarte/RAPORT-ZILNIC-2026-10-31.md`
/ `-11-05.md` / `-11-27.md` + în istoricul git.

### Ce se taie azi (18.11)

| Se taie | Unde trăiește după tăiere |
|---|---|
| `raport-zilnic-istoric`: secțiuni vechi comprimate (10.27, 10.31, 11.02, 11.05) | arhiva de azi + rapoartele zilei + git |
| `raport-zilnic-istoric`: se adaugă `## 2026-11-18` | topic |
| `raport-calitate-verificare`: se adaugă regulile 22–23 | topic |
| `scoring-gs-buguri-masurate`: se adaugă nuanceza „axa umflată se stabilește per axă" | topic |
| `raport-zilnic-pipeline`: pointer de azi | topic + arhiva de azi |
| `MEMORY.md`: max ID 24019, cota 128, triaj 0/2/6/9/0, definiția „filtru funcțional" | topic |

**Regulă:** arhiva e append-only. Nu se șterge nimic din ea.
