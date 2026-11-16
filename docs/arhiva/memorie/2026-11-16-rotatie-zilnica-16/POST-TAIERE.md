# POST-TAIERE — rotatie zilnica 16.11.2026

Arhiva: `docs/arhiva/memorie/2026-11-16-rotatie-zilnica-16/` (snapshot înainte de tăiere).
Tăierea s-a făcut **după** ce arhiva a fost comitată și împinsă pe `main` (`c9607e1`).

## Ce s-a comprimat

**Nimic, azi.** Topicul `raport-zilnic-istoric` avea **1.966 B liberi** (cumulul
comprimărilor din 15.11: secțiunea `## 2026-11-04`, ~3,9 KB) ⇒ loc pentru intrarea
de azi fără să sacrifice nimic.

Comprimarea secțiunii `## 2026-11-11` a **eșuat**: blocul lung nu s-a potrivit, deși
titlul și subtitlul se potriveau (sondă de 1–2 linii ✓). Deci textul live diferă de
view-ul afișat și de arhiva de pe disc, în același bloc ⇒ **nu s-a forțat** o tăiere
parțială; informația e oricum în `rapoarte/RAPORT-ZILNIC-202611-11.md` + git.

## Ce s-a adăugat

- `raport-zilnic-istoric` → `## 2026-11-16` (etichete, triaj, joburi, 2 fixuri, cotă).
- `raport-calitate-verificare` → **regulile 19–20**:
  - 19. Un cod de verificare e **test de autentificare** (dacă nu l-ai cerut, tentativă de acces) — nu newsletter; e distinct de confirmarea de proprietate și de incidentul de securitate.
  - 20. Acordul de plural se aplică și în propoziții cu verb („1 dintre ele nu **a** primit").
- `raport-zilnic-pipeline` → pointer `## 2026-11-16`.
- `MEMORY.md` (strat HOT) → starea live (16.11): quota **123/200**, triaj **0 / 3 / 5 / 3 / 0**, max ID IQads **24017** (15–16.11: 0 postări noi), 6 filtre funcționale, 1 mesaj fără etichetă, regula 19 adăugată în „Reguli de calitate — generale".
- Summary-ul memoriei regenerat (4.081 B).

## Ce a mers prost azi (măsurat, raportat)

1. **Blocurile lungi nu se potrivesc** nici când vin din view-ul proaspăt ⇒compressed
   rămâne pe „sondă de 1–2 linii" + citirea view-ului înainte de a tăia.
2. **Arhivele nu reflectă tăierile din topicul live** — fiecare arhivă e construită
   din arhiva precedentă + delta, deci păstrează textul ORIGINAL, nu pe cel curent.
   Consecință: textul din arhivă ≠ textul din topic pentru secțiunile deja comprimate.
3. **`report-score.js --save-set` nu scrie și `scoring-result-<DATA>.json`** în aceeași
   rulare (setul e salvat, rezultatul nu) ⇒ rularea trebuie repetată fără `--save-set`
   sau rezultatul trebuie cerut explicit.

## Lecție (16.11)

- **Regula de triaj „cod de verificare"** e o clasă nouă: `AUTH_CHALLENGE` în
  `report-triage.js`, între regula de alertă de securitate și cea de newsletter.
- **Regula „suma rândurilor = totalul"** (15.11) a funcționat prima dată: raportul de
  azi spune **123**, iar contorul măsurat spune **123** ⇒ coincidență exactă.
