---
description: "[ARHIVĂ] Snapshot memorie agent — rotatie-zilnica-14"
---

# MANIFEST — snapshot memorie, rotatie-zilnica-14

| | |
|---|---|
| Etichetă | `rotatie-zilnica-14` |
| Creat | 2026-11-14T06:04:23.731Z |
| Sursă | .mem-staging-2026-11-14 |
| Fișiere | 9 |
| Notă | Arhiva pre-taiere a memoriei inainte de rotia zilnica a raportului 2026-11-14 |

## Fișiere

| Fișier | Bytes | sha256 (primele 16) |
|---|---|---|
| `MEMORY.md` | 18114 | `7e7dd39c008dc26d` |
| `topics/gmail-sorting-filters.md` | 3412 | `599ae32619dad560` |
| `topics/google-cloud-access.md` | 4879 | `08c0b7cc80d82232` |
| `topics/memory-maintenance-tooling.md` | 4356 | `99155d881b8e27d8` |
| `topics/puntea-local-cloud.md` | 4128 | `6eedc88942952f55` |
| `topics/raport-calitate-verificare.md` | 8756 | `41166688e0c90115` |
| `topics/raport-zilnic-istoric.md` | 30717 | `ec01fae0577ee5de` |
| `topics/raport-zilnic-pipeline.md` | 30702 | `48ac0101034eed5e` |
| `topics/scoring-gs-buguri-masurate.md` | 15507 | `54a705867884e0fa` |

## Ce s-a tăiat din această versiune

_(se completează în sesiunea de optimizare)_

### Proveniența fișierelor

Fișierele de memorie trăiesc pe host, **nu** în sandbox ⇒ nu pot fi copiate byte-exact
de aici:

| Fișier | Cum a fost obținut | Exactitudine |
|---|---|---|
| `topics/gmail-sorting-filters.md`, `google-cloud-access.md`, `memory-maintenance-tooling.md`, `puntea-local-cloud.md`, `scoring-gs-buguri-masurate.md` | **copie byte-exactă** din arhiva 13.11 (neschimbate) | byte-identic |
| `MEMORY.md` | arhiva 13.11 + delta de live-state din 13.11 (3 linii înlocuite) | 18.114 B vs ~18.118 B live |
| `topics/raport-calitate-verificare.md` | arhiva 13.11 + regulile 12–13 (text adăugat pe 13.11, copiat verbatim) | 8.756 B vs 8.759 B live |
| `topics/raport-zilnic-istoric.md`, `topics/raport-zilnic-pipeline.md` | **copie byte-exactă** din arhiva 13.11 | **super-set** al stării de azi |

**De ce super-setul e suficient:** singura tăiere de azi e **comprimarea** secțiunilor
FULL din cele două topicuri de raport; textele care se comprimă se află byte-exact
aici, în `rapoarte/RAPORT-ZILNIC-*.md` și în istoricul git. Super-setul nu conține
secțiunile adăugate după snapshot (12.11, 13.11) — ele sunt în
`2026-11-12-rotatie-topics-zilnic/POST-TAIERE.md` și `2026-11-13-rotatie-zilnica/POST-TAIERE.md`.

### Ce se taie azi (14.11)

| Se taie | Unde trăiește după tăiere |
|---|---|
| `raport-zilnic-istoric`: secțiuni FULL (24.10, 31.10, 02.11, 03.11, leadurile din 05.11) comprimate | arhiva de azi + rapoarte + git |
| `raport-zilnic-istoric`: se adaugă `## 2026-11-14` | topic |
| `raport-zilnic-pipeline`: se comprimă cât să încapă pointerul de azi | topic + arhiva de azi |
| `raport-calitate-verificare`: se adaugă regulile 14–15 | topic |

**Regulă:** arhiva e append-only. Nu se șterge nimic din ea.
