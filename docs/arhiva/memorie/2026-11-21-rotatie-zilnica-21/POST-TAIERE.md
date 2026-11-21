# POST-TAIERE — rotația zilnică 21.11.2026

## Ce s-a comprimat din `raport-zilnic-istoric` (topic)

| Secțiune | Ce s-a făcut | Bazi |
|---|---|---|
| `## 2026-10-27` | 4 rânduri de măsurători (27.10) → 1 rând + 2 rânduri șterse | raportul 27.10 |
| `## 2026-11-02` | paragraful „DuckDuckGo is hiring" scurtat | raportul 02.11 |
| `## 2026-10-30` / `## 2026-10-31` / `## 2026-11-03` | câte un paragraf lung scurtat | rapoartele zilei |
| `## Leaduri 28.10` / `## Joburi 29.10` | paragrafe scurtate | rapoartele 28–29.10 |
| `## 2026-11-13` | paragraful „Leaduri de azi" scurtat | raportul 13.11 |

Spațiu eliberat: **~890 B** ⇒ spațiul pentru secțiunea `## 2026-11-21` (880 B).
Stare topic după tăiere: **30.530 B** (limita 30.720 B) — 190 B liberi.

## Ce s-a comprimat din `raport-zilnic-pipeline` (topic)

| Acțiune | Ce s-a făcut | Bazi |
|---|---|---|
| pointer `## 2026-11-20` → `## 2026-11-21` | data rotită; textul regulilor 26–28 ⇒ 26–29 | rotația zilnică |

Stare topic după tăiere: **30.542 B** — 178 B liberi. Pointerii zilnici vechi (11-14 … 11-18)
rămân în topic; conținutul lor e deja în `raport-zilnic-istoric` și în arhivă.

## Ce s-a adăugat

- `raport-zilnic-istoric` → `## 2026-11-21` (etichete, triaj, joburi, cota).
- `raport-calitate-verificare` → **regula 29** (nu deduce o divergență dintr-un output trunchiat).
- `scoring-gs-buguri-masurate` → nota de 21.11 (#24021 Gallery Manager — non-design, drop-uit).
- `raport-zilnic-pipeline` → pointer de azi.
- `MEMORY.md` → header 21.11, max ID **24021**, cotă **130/200**, triaj **0/4/6/11/0**, regula 29.
- Rezumat (`memory_summary_write`): **4.085 B / 3.938 chars** (limita 4.096) — confirmat în 2 pași.

## Ce NU s-a făcut (raportat, nu forțat)

- **Nicio secțiune nu a fost ștearsă definitiv** — doar comprimată, cu textul integral în
  arhiva de azi, în rapoartele zilnice și în istoricul git.
- Comprimarea s-a făcut **pe rânduri scurte / paragrafe pe o singură linie**: blocurile
  multi-liniu **eșuează** (`OLD_STRING_NOT_FOUND`) chiar dacă textul vine din arhivă.
- **O corecție a fost făcută în două etape**: întâi am înlocuit 1 rând cu 1 rând mai lung
  (conținutul celor 3 rânduri vecine intrând în el) ⇒ duplicare temporară; apoi am șters
  cele 3 rânduri originale cu `new_string` gol. Legea: **o înlocuire care adaugă conținut
  duplică**, nu comprimă.
- **Deplasarea unei linii cu 1 caracter** (ex. „regulile 26" → „regulile 26–29") a fost
  suficientă pentru a rotui pointerul: match-urile|match-urile lungi cu `—` și `–` au eșuat, cele
  scurte s-au potrivit ⇒ **pornește de la view, cu sonde scurte**.
- Topicul `raport-zilnic-pipeline` era la **30.482 B** la începutul zilei (sub plafon, dar
  cu 238 B liberi) ⇒ orice scriere care depășea limita era respinsă.

## Ordinea respectată (regula POPY)

1. SNAPSHOT (`memory-snapshot.js --from .mem-staging-2026-11-21 --label rotatie-zilnica-21`)
2. MANIFEST extins cu proveniența + tabelul „ce se taie azi"
3. `--verify rotatie-zilnica-21` → OK
4. COMMIT + **PUSH** (`876fd63`) — abia după push a început tăierea
5. Tăiere + adăugiri + MEMORY.md + rezumat
6. Commit + push final (POST-TAIERE)

## Secreti

Verificat: niciun fișier din arhivă nu conține chei/credentiale (scriptul askpass folosit
la push e șters imediat după folosire).
