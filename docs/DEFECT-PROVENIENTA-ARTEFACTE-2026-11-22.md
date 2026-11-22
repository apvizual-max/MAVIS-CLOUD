# Verificarea zilei 22.11.2026 — defecte găsite, reparate, și ce rămâne de decis

**Data:** 22.11.2026 · **Workflow:** „Raport zilnic - email prins + joburi noi"
**Cine a verificat:** `Mavis_Cloud_Jobs` (auto-verificare, 12 verificări) + `Verifier` (independent, adversarial, 10 clase de defecte) + măsurători directe

**Verdictul celor două verificări: FAIL** — 12 defecte, dintre care **8 reparate la sursă în această sesiune**
și 4 rămase ca decizii pentru Alex (nu le-am atins: motorul de scoring nu se schimbă fără acordul lui).

Raportul livrat pe Drive a fost **reexpus** după reparații (4 re-upload-uri, contorul reconciliat la
**141 = ledger = antet = §5 = tabel**).

---

## 1. Reparat la sursă (și propagat în raportul livrat)

| # | Defect | Severitate | Reparație |
|---|---|---|---|
| 1 | **§7 lista 13 artefacte, 12 erau în repo.** Al 13-lea (`report-simulate-sort.json` — dump de corpuri de mesaje) e gitignored (`.gitignore:52`), iar raportul nu spunea. Promisiune neîndeplinită, fără semn. | critic | `mavis-tools/report-files.js` — lista **generată**, cu **proveniență** per rând („în repo" / „local, necomitat în repo"). Plus companion **sanitizat** (`report-simulate-sort-clasificare.json`: doar cifre și clase, zero corp/subiect/expedent) ⇒ cifrele de triaj devin verificabile din repo. |
| 2 | **Antetul spunea „verificarea de pe Drive mai adaugă 1 cerere"** ⇒ cititorul deducea 124, ledgerul spunea 123. Proză statică, greșită la fiecare rulare. | minor | Sursa: proza spune acum că cifra **include** verificarea. `report-refresh-files.js` a propagat corectura în raportul livrat. |
| 3 | **„Diferență: 0.4 puncte per job"** — cifră statică, corectă doar pentru jobul de azi; cu 0 false pozitivi ar fi tot aceeași. | minor | `report-score.js` măsoară acum corecția **per job**, prin port: `LCorectat` + `deltaPuncte` (L-ul coreectat iese din motor, ponderea din `ALEX.weights.L`). Azi: 10 → 8, Δ 0.4 — identic cu valoarea de mână. |
| 4 | **„Verificat pe 4 ferestre"** — număr scris cu mâna în proză, ferestrele codificate în alt loc. | minor | Lista `WINDOWS` e **sursă unică** (`report-files.js`) și e folosită în tabel, în antet și în proză. |
| 5 | **Exemplul din §1.1** („o alertă de job care intră și la Joburi și la Newsletter") era fals: mesajul real e „Claude is Replacing Every App You Pay For" (AI Folder + Newsletter). | minor | Exemplu neutru; niciun nume de etichetă nu mai e scris cu mâna în proză. |
| 6 | **„din care 15 cu verdict amânat"** — cei 15 sunt **în** cei 36 păstrați (§2.5), nu în cei 28 drop-uri. | minor | „28 drop-uri, **plus** 15 cu verdict amânat". |
| 7 | **„Trei mecanisme, măsurate pe 05.11"** — static de 18 rapoarte consecutive, într-un raport de 22.11. | minor | Marcat explicit ca „măsurătoare de referință, nu de azi". |
| 8 | **`score-run.js` scria în `scoring-result-2026-10-22.json`** (nume hardcodat) ⇒ cu setul de azi nu producea rezultatul zilei și **săpra istoricul din 22.10**. | major | Numele se deduce acum din `_meta.date` al setului. **Plus:** documentația scrisă de mine în această sesiune (skill, promptul agentului, promptul cronului) numea `score-run.js` ca etapă 8 — greșit; etapa reală e `report-score.js`. Corectat în toate cele trei locuri + în promptul live al agentului. |
| 9 | **Folderul de livrare: id hardcodat STALE** în `report-build.js` — raportul zilei **nu era** în folderul default (căutat: nu exista acolo). | major | `report-folder-discover.js` scrie acum `report-folder.json` (id descoperit **pe cale**), iar `report-build.js` și `report-refresh-files.js` îl citesc. Niciun id de folder hardcodat. |
| 10 | **Zero mascat** în două locuri: set de joburi lipsă ⇒ „IQads 0"; ledger corupt ⇒ cotă raportată mică. | minor | Se raportează explicit (`srcTotalError`, `usageError`); cotă necunoscută se scrie „n/măsurată", **nu** 4. |
| 11 | **Lungimea descrierilor** (30619) nu e re-deribilă din fișierul arhivat (30591) — alt parse. | minor | Se spune de unde vine cifra: „măsurat azi pe pagina live de sondă". |
| 12 | **§2.5 dă linkuri doar pentru 8 din 15 joburi; §2.6 nu dă niciun link** ⇒ 35 de joburi fără URL, deși URL-ul e în JSON. | minor | Link pentru fiecare job amanat și pentru fiecare drop. |
| 13 | **„cel mai recent de pe site e din 05.11"** — listarea globală are postări din 21.11; formularea era imprecisă. | minor | „pe listările folosite (România/București)". |

## 2. Îmbunătățiri adăugate (din verificări)

| Ce | De ce |
|---|---|
| **§6.1 detectează acum 4 false pozitive „remote", nu 1** | `report-score.js` avea un detector care ratea joburile cu „Vineri: WFH" (motorul vedea `wfh`). Noua categorie `remote-partial`. Statisticile de scoring nu se schimbă (64/36/28/15). |
| **Dovezi de eligibilitate per job** | Până acum: **0** mențiuni de țări eligibile / viză / fus orar în tot raportul. Măsurat: din **17** joburi cu L=10 (remote detectat), **0** publică țări eligibile, **1** publică sponsorizare de viză, **5** menționează fus orar. Acum se raportează per job, cu „—" când nu e publicat. |
| **Companionul sanitizat de triaj** | Cifrele 0/4/5/3/0 și numărul de UNREAD devin verificabile din repo, fără conținut personal. |
| **`report-folder.json`** | Id-ul folderului de livrare e descoperit pe cale, nu scris cu mâna. |

## 3. Ce a trecut verificarea (măsurat, nu presupus)

| Verificare | Rezultat |
|---|---|
| Contul joburilor | 64 (IQads 43 + DP 21) → 36 păstrate / 28 drop-uite / 15 amânat; secțiuni 16/5/0/0 — **re-derivat prin re-rulare izolată** a scoring-ului, identic cu JSON-ul din repo |
| Rândurile tabelelor | §2.1=16, §2.2=5, §2.3=0, §2.4=0, §2.5=15, §2.6=28, Top5=5 — celulele coincid **celulă cu celulă** cu JSON-ul |
| „0 postări noi" | confirmat **live**: iqads.ro/p/adjob → 43 aduri, max ID 24021 (niciunul > 24021); designproject.io → 21 poziții, cea mai nouă Nov 5; 0 slug-uri noi vs. 21.11 |
| Etichete | 8 etichete × 4 ferestre, sumă pe etichete 12 pe 11 mesaje distincte + 1 necategorizat = 12 ✓ |
| Filtre | 20 total, 7 cu criteriu, 6 funcționale, hit-uri 30z 1043/413/132/1263/73/788 — toate confirmate |
| Ordinea regulilor de triaj | 13 reguli în ordine: toate semnalele critice („action required", „mfa is disabled", „new sign in", „connected a new app", „security incident", „reset your password") se declanșează **înaintea** promo/newsletter/fyi. 10/10 sonde adversariale au trecut |
| Livrare | 7/7 secțiuni prezente **pe Drive**, descărcate și comparate **byte cu byte** cu repo-ul |
| Secrete | scanare pe tot arborele versionat (751 fișiere): **zero** secrete reale — tot ce s-a potrivit e placeholder sau fixture de test; fișierele de credențiale sunt gitignored și absente de pe disc |

## 4. RĂMÂNE PENTRU ALEX — nu am atins motorul

| # | Întrebare | Context |
|---|---|---|
| A | **„România" e cuvânt-cheie de „București"** în `scoring.gs` (`BUCHAREST_KW`), deci orice job din România primește L=8, nu -5. Deci OPSWAT (Timișoara) e tratat ca „București" — scor 9.4, Secțiunea 1, cu 0.4 puncte din axa L. | **Motorul nu se schimbă fără acordul tău.** Azi e doar raportat corect (corecția e calculată per job). |
| B | **Dacă ai corecta L pentru Timișoara (-5)**, scorul ar fi 6.4 și jobul ar cădea în Secțiunea 4 (sau ar fi drop-uit). Secțiunea 4 e azi 0. | Decizie de motor, nu de raport. |
| C | **17 joburi sunt „remote", 0 publică țări eligibile.** Top-5 include „fully remote" fără nicio dovadă de eligibilitate. | Raportul arată acum dovadele per job (—, nu „da"). |
| D | **Newsletter cu footer de parolă** („trebuie să alegi o parolă nouă") poate fi escaladat la „contul cere o acțiune". Job-urile cu același footer sunt protejate (verificat), newsletter-urile nu. | Detectorul din `report-triage.js` — pragul e o decizie de echilibru, nu o eroare confirmată azi. |
| E | **Pragul de „nou" la designproject.io** e pe ZI, nu pe oră ⇒ un job postat înaintea ultimei rulări din acea zi e numărat „nou" a doua zi (supranumărătoare 1–2/zi). | Corectarea ar fi trecerea pe timestamp. |
