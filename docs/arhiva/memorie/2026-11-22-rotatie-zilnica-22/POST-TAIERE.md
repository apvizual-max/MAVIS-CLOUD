# POST-TAIERE — rotația zilnică 22.11.2026

## Ce s-a comprimat din `raport-zilnic-istoric` (topic)

| Acțiune | Ce s-a făcut | Bazi |
|---|---|---|
| `replace_all` pe etichete | `` `AI Folder/AI si Comunitati` ``→AI (9), `` `MAVIS/Joburi` ``→Joburi (10), `(nerezolvată)`→∅ (3), `**6 ating etichetă de categorie**`→`**6 funcționale**` (3), `MAVIS/Joburi/IQ Adds`→`IQ Adds` (3), `Facturi si Conturi`→Facturi (2), `Newsletter` (9), `Finante` (3), `Socials` (3), `*(regulile sunt în…)*` (2) | numele de etichete stau în `taxonomy.js` + în rapoartele zilnice |
| titluri de subsecțiuni | „Catalogul IQads se micșorează prin expirare"→„…se micșorează", „Ordinea corectă a pipeline-ului (confirmată)"→„Ordinea pipeline-ului", `*(comprimat mai sus)*` șters | aceleași reguli, în cuvinte mai scurte |

Spațiu eliberat: **~570 B** (12 apeluri `replace_all`) ⇒ spațiul pentru secțiunea
`## 2026-11-22` (733 B). Stare topic după tăiere: **30.705 B** (limita 30.720 B) — 15 B liberi.

## Ce s-a comprimat din `raport-zilnic-pipeline` (topic)

| Acțiune | Ce s-a făcut |
|---|---|
| pointer `## 2026-11-21` → `## 2026-11-22` | data rotită; lista regulilor 26–29 ⇒ 26–30 |

Stare topic după tăiere: **30.547 B** — 173 B liberi.

## Ce s-a adăugat

- `raport-zilnic-istoric` → `## 2026-11-22` (etichete, triaj, joburi, cota).
- `raport-calitate-verificare` → **regula 30** (cota e o stare, nu o promisiune).
- `scoring-gs-buguri-masurate` → nota de 22.11 (0 postări noi; top-5 neschimbat).
- `raport-zilnic-pipeline` → pointer de azi.
- `MEMORY.md` → header 22.11, max ID **24021** (0 postări noi), cotă **123/200**, triaj **0/4/5/3/0**, regula 30.
- Rezumat (`memory_summary_write`): **4.086 B / 3.930 chars** (limita 4.096) — confirmat în 2 pași.

## Ce NU s-a făcut (raportat, nu forțat)

- **Nicio secțiune nu a fost ștearsă definitiv** — doar comprimată, cu textul integral în
  arhiva de azi, în rapoartele zilnice și în istoricul git.
- **Măsurător nouă, azi (important):** `memory_topic_edit` **înfășoară textul la salvare**
  (~85–90 caractere) ⇒ un `old_string` cu un paragraf întreg nu se potrivește niciodată,
  oricât de exact ar fi copiat din view. Ce se potrivește: **fragmente scurte** (≤ ~80
  caractere) și `replace_all` pe fragmente **repetate** (nume de etichete, formule de
  filtre). Caracterele „ — – · **în `old_string` nu se potrivesc** (testate azi) — se
  potrivesc „→", „⇒", backtick-urile, „**", „()".
- Consecință: comprimarea prin `replace_all` pe etichete (12 apeluri ⇒ ~570 B) a fost
  **mult mai eficientă** decât încercarea de a comprima paragrafe cu textuale lungi
  (9 apeluri eșuate înainte de ea).
- **Costul:** numele exacte de etichete au dispărut din jurnal (rămân în `taxonomy.js`,
  în sondă și în rapoartele zilnice) ⇒ acceptat, ca să încapă secțiunea zilei.
- Topicul `raport-zilnic-istoric` a ajuns la **15 B liberi** ⇒ la următoarea rotație,
  comprimarea trebuie să continue pe aceeași cale (`replace_all` pe etichete), nu pe
  paragrafe cu textuale lungi.

## Ordinea respectată (regula POPY)

1. SNAPSHOT (`memory-snapshot.js --from .mem-staging-2026-11-22 --label rotatie-zilnica-22`)
2. MANIFEST extins cu proveniența + tabelul „ce se taie azi"
3. `--verify rotatie-zilnica-22` → OK
4. COMMIT + **PUSH** (`cdd9c64`) — abia după push a început tăierea
5. Tăiere + adăugiri + MEMORY.md + rezumat
6. Commit + push final (POST-TAIERE)

## Secreti

Verificat: niciun fișier din arhivă nu conține chei/credentiale (scriptul askpass folosit
la push e șters imediat după folosire).
