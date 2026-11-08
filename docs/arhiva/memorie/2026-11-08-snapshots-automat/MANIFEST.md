---
description: "[ARHIVĂ] Snapshot memorie agent — snapshots-automat"
---

# MANIFEST — snapshot memorie, snapshots-automat

| | |
|---|---|
| Etichetă | `snapshots-automat` |
| Creat | 2026-11-08T21:05:28.005Z |
| Sursă | ../../../../../../workspace/.staging/memorie-snapshot |
| Fișiere | 8 |
| Notă | Snapshot săptămânal automat (task cloud). Nu s-a tăiat nimic. |

## Fișiere

| Fișier | Bytes | sha256 (primele 16) |
|---|---|---|
| `MEMORY.md` | 16011 | `2ccbfe7a0fc09fb5` |
| `topics/gmail-sorting-filters.md` | 3412 | `599ae32619dad560` |
| `topics/google-cloud-access.md` | 4879 | `08c0b7cc80d82232` |
| `topics/memory-maintenance-tooling.md` | 3224 | `1e72832ee2b39603` |
| `topics/puntea-local-cloud.md` | 4128 | `6eedc88942952f55` |
| `topics/raport-zilnic-istoric.md` | 30719 | `5f299f85d7111d91` |
| `topics/raport-zilnic-pipeline.md` | 30701 | `5a392a238441e20e` |
| `topics/scoring-gs-buguri-masurate.md` | 15507 | `54a705867884e0fa` |

## Ce s-a tăiat din această versiune

**Nimic.** Acesta e snapshotul săptămânal automat (task cloud
`455764418027683`, duminica 23:00) — doar arhivează, **nu taie**, nu comprimă,
nu modifică nimic din memorie.

| Ce s-a tăiat | Unde trăiește acum |
|---|---|
| — (nimic) | — |

Arhiva e ca să existe o copie recentă a memoriei **înainte** de orice tăiere
viitoare, nu ca o urmă de optimizare. Orice optimizare ulterioară își taie
versiunea precedentă din arhiva asta.

## Delta față de arhiva precedentă (`2026-11-01-snapshots-automat`)

| Fișier | Stare |
|---|---|
| `MEMORY.md` | **neschimbat** (sha identic) |
| `topics/gmail-sorting-filters.md` | **neschimbat** |
| `topics/google-cloud-access.md` | **neschimbat** |
| `topics/memory-maintenance-tooling.md` | **neschimbat** |
| `topics/puntea-local-cloud.md` | **neschimbat** |
| `topics/scoring-gs-buguri-masurate.md` | **neschimbat** |
| `topics/raport-zilnic-istoric.md` | **schimbat** — 12.789 B → 30.719 B (secțiuni 01.11 → 07.11 mutate) |
| `topics/raport-zilnic-pipeline.md` | **schimbat** — 30.497 B → 30.701 B (secțiuni zilnice 01.11 → 08.11 comprimate) |

**Fidelitate:** conținutul a fost scris din output-ul `memory_read` /
`memory_topic_read` (memoria trăiește pe host, nu în sandbox). `memory_read`
normalizează unele cuvinte la afișare ⇒ conținutul e fidel, dar **nu e
byte-identic** cu fișierul de pe host. Dimensiunile scrise aici corespund cu
cele raportate de host, cu excepții mici (ex. `memory-maintenance-tooling`
3224 B aici vs. 3222 B raportat, `raport-zilnic-pipeline` 30.701 B vs.
30.687 B — diferențe de whitespace/normalizare, nu de conținut).

**Secrete:** verificate înainte de snapshot — nicio valoare de cheie (client
secret, refresh token, API key) în conținut. Doar identificatori publici
(client_id Google, id-uri de folder Drive), care există deja în repo.

**Regulă:** arhiva e append-only. Nu se șterge nimic din ea.
