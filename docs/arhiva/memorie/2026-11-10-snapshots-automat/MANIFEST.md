---
description: "[ARHIVĂ] Snapshot memorie agent — snapshots-automat"
---

# MANIFEST — snapshot memorie, snapshots-automat

| | |
|---|---|
| Etichetă | `snapshots-automat` |
| Creat | 2026-11-10T19:26:17.728Z |
| Sursă | ../../../../../../workspace/.staging/memorie-snapshot |
| Fișiere | 8 |
| Notă | Snapshot săptămânal automat (task cloud). Nu s-a tăiat nimic. |

## Fișiere

| Fișier | Bytes | sha256 (primele 16) |
|---|---|---|
| `MEMORY.md` | 16737 | `8dc106fc8f766123` |
| `topics/gmail-sorting-filters.md` | 3412 | `599ae32619dad560` |
| `topics/google-cloud-access.md` | 4879 | `08c0b7cc80d82232` |
| `topics/memory-maintenance-tooling.md` | 4356 | `99155d881b8e27d8` |
| `topics/puntea-local-cloud.md` | 4128 | `6eedc88942952f55` |
| `topics/raport-zilnic-istoric.md` | 30717 | `ec01fae0577ee5de` |
| `topics/raport-zilnic-pipeline.md` | 30702 | `48ac0101034eed5e` |
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

## Delta față de arhiva precedentă (`2026-11-08-snapshots-automat`)

| Fișier | Stare |
|---|---|
| `MEMORY.md` | **schimbat** — 16.011 B → 16.737 B (paragraf nou despre limita de 30 KB și rotația zilnică) |
| `topics/gmail-sorting-filters.md` | **neschimbat** (sha identic) |
| `topics/google-cloud-access.md` | **neschimbat** (sha identic) |
| `topics/memory-maintenance-tooling.md` | **schimbat** — 3.224 B → 4.356 B (secțiune nouă: emoji-ul `⚠️` rupe potrivirea lungă) |
| `topics/puntea-local-cloud.md` | **neschimbat** (sha identic) |
| `topics/scoring-gs-buguri-masurate.md` | **neschimbat** (sha identic) |
| `topics/raport-zilnic-istoric.md` | **schimbat** — 30.719 B → 30.717 B (linia „Mutate" actualizată; intrările 06.11–07.11 compactate; 09.11 și 10.11 adăugate) |
| `topics/raport-zilnic-pipeline.md` | **schimbat** — 30.701 B → 30.702 B (secțiunea zilnică 11.08 înlocuită cu 11.10) |

**Observație (proveniență, nu acțiune):** între 08.11 și 10.11 a rulat rotația
zilnică a topicurilor (`2026-11-10-rotatie-topics` + commit `5bff5a0`). Secțiunea
zilnică `## 2026-11-08` din `raport-zilnic-pipeline` (3 reguli: adresa de pe pagina
companiei, „5 notificări = 1 acțiune", „Top 5 = joburi care se mai pot aplica")
**nu mai apare în niciun topic** — `raport-zilnic-istoric` sare de la 11.07 la 11.09.
Conținutul ei e prezent doar în arhiva `2026-11-08-snapshots-automat`.

**Fidelitate:** conținutul a fost scris din output-ul `memory_read` /
`memory_topic_read` (memoria trăiește pe host, nu în sandbox). `memory_read`
normalizează unele cuvinte la afișare ⇒ conținutul e fidel, dar **nu e
byte-identic** cu fișierul de pe host. Dimensiunile scrise aici corespund cu
cele raportate de host, cu excepții mici (ex. `scoring-gs-buguri-masurate`
15.507 B aici vs. 15.506 B raportat, `raport-zilnic-pipeline` 30.702 B vs.
30.688 B raportat — diferențe de whitespace/normalizare, nu de conținut).

**Secrete:** verificate înainte de snapshot — nicio valoare de cheie (client
secret, refresh token, API key) în conținut. Doar identificatori publici
(client_id Google, id-uri de folder Drive), care există deja în repo.

**Regulă:** arhiva e append-only. Nu se șterge nimic din ea.
