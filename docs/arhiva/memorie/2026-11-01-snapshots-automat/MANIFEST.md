---
description: "[ARHIVĂ] Snapshot memorie agent — snapshots-automat"
---

# MANIFEST — snapshot memorie, snapshots-automat

| | |
|---|---|
| Etichetă | `snapshots-automat` |
| Creat | 2026-11-01T21:05:50.219Z |
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
| `topics/raport-zilnic-istoric.md` | 12789 | `b96bd23602844d30` |
| `topics/raport-zilnic-pipeline.md` | 30497 | `0ab3ef0bc2de76a0` |
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

**Fidelitate:** conținutul a fost scris din output-ul `memory_read` /
`memory_topic_read` (memoria trăiește pe host, nu în sandbox). `memory_read`
normalizează unele cuvinte la afișare ⇒ conținutul e fidel, dar **nu e
byte-identic** cu fișierul de pe host. Dimensiunile scrise aici corespund cu
cele raportate de host, cu excepția topicului `memory-maintenance-tooling`
(3224 B aici vs. 3222 B raportat de host — aceeași diferență ca în arhiva din
25.10).

**Secrete:** verificate înainte de snapshot — nicio valoare de cheie (client
secret, refresh token, API key) în conținut. Doar identificatori publici
(client_id Google, id-uri de folder Drive), care există deja în repo.

**Regulă:** arhiva e append-only. Nu se șterge nimic din ea.
