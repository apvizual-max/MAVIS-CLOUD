# Jurnal zilnic — 21–27 octombrie 2026

> **De ce există acest topic:** topicul `raport-zilnic-pipeline` a ajuns la 29.109 B
> din limita de 30.720 B. Secțiunile zilnice (21–27.10) au fost mutate aici.
> **Regulile permanente** (mecanica pipeline-ului, regulile de triage, lecțiile
> structurale) rămân în `raport-zilnic-pipeline`.
> **Arhivă completă pre-tăiere:** `docs/arhiva/memorie/2026-10-30-pre-restructure-topics-30-10/`
> în repo `apvizual-max/MAVIS-CLOUD` (MEMORY.md + topics/ + MANIFEST.md cu sha256).

## 2026-10-21 — primul raport cu scoring

59 joburi analizate (12 IQads + 47 DP) → 40 păstrate, 7 verdict amânat, 19 drop-ate.
Scor top **9.6** (International Waters :: Senior Creatives). Livrat ca mirror local în
workspace, pentru că Drive era încă inaccesibil.

## 2026-10-22 → 23 — designproject.io rescrie descrierile cu AI

Descrierile urcă de la 71–1484 la **24.000–33.000 de caractere** (inclusiv
„📝 Enhancement Note"). Diferența de scor față de o zi nu înseamnă că jobul s-a
schimbat. A stricat 2 din 3 surse de engagement (vezi skill-ul `job-sourcing-methods`).

## 2026-10-23 — măsurătoare

125 mesaje (00:00–08:15 EEST) · MAVIS/* = 0 · 72 joburi (46 IQads + 26 DP) → 36 păstrate,
14 verdict amânat · 0 postări noi · **422 cereri Google — plafonul depășit**.
0 postări noi: max ID IQads 23997 neschimbat; cel mai recent designproject.io e din
2026-10-06. **Nu e blocaj de scraping — e realitate de piață.**

## 2026-10-24 — validThrough devine expirare reală

Până aici raportul trata `validThrough` ca gunoi. **Justificarea era greșită.**
Măsurat pe toate cele 26 de joburi: `validThrough` = `datePosted` + **30 zile** exact
(24/26 exacte; 2 cu o zi diferență de fus orar). ⇒ fereastră de postare de 30 de zile.
Consecință: **7 din cele 36 joburi din tabele erau deja expirate**, fără niciun semn.
Corectat: `expKind='expiră'`, flag `expired`, marcaj `⛔ **EXPIRAT**`.

**Rescriere completă a `report-build.js`** (commit `439c678`): șablonul devine complet
data-driven (nicio cifră scrisă cu mâna în cod).

**Lead nou, verificat pe pagină:** alerta Jooble „YO AI Labs caută Graphic designer -
Remote" → `yoailabs.com/remote-jobs/graphic-designers` — **121 roluri de design
remote, contract, 5 platforme** (Micro1, SuperAnnotate, Ethos AI, AfterQuery,
Handshake AI). Rate-uri: Graphic Designer $30–105/h, Graphic Designer / UI-UX Designer
(Ethos AI) **până la $150/h**, Creative Director până la $80/h, Brand Director
$70–80/h. Contract cu **platforma**, nu cu YO AI Labs. Interviu AI + assessment.
**Batează direct cu Traseul 2.**

## 2026-10-25 — snippet vs. corp: o cifră FALSĂ în raport

Raportul spunea că anunțul AGRESIV MEDIA *„nu publică orașul, tipul de contract sau
salariul"*. **Era fals** — fragmentul de text (snippet) e trunchiat la 200 de caractere
și conține doar antetul; **corpul complet conține lista integrală cu companie, oraș și
salariu**. Cost: 1 cerere per email (`format=full` + decode base64).
**Regulă: snippet = descoperire, corp = adevăr.**

**bestjobs.ro: inaccesibil pentru verificare automată.** `web_fetch` → „file load failed"
pe toate URL-urile; `curl` cu User-Agent de browser → **403**. Singura cale: snippet-ul
motorului de căutare (conține textul integral) sau surse alternative (jobgether,
remowork, aiannotationjobs, bebee, bdlemntech.ro, jobs.concentrix.com, jobs.micro1.ai).
**Dacă nu poți verifica, spune-o în raport — nu lăsa tăcerea să pară confirmare.**

## 2026-10-26 — 110 cereri (plafon 200), etichete încă moarte

**Consum: 110 cereri Google** (folder-discover 4 + inbox-counts 9 + mail-count 59 +
simulate-sort 11 + filter-state 16 + inline 5 + build/upload 6). Mult sub plafon, pentru
că azi au intrat doar **10 mesaje** (ieri ~130) ⇒ simulate-sort a costat 11, nu 89.
*Regulă:* costul lui simulate-sort e **proporțional cu numărul de mesaje de azi**, nu fix.

- **Etichetele MAVIS/*: 0 pe azi, 0 pe 24h, 0 pe 7z, 1015 pe 30z.** Ultima etichetare
  reală: **11 octombrie** ⇒ 15 zile (calculul crește zilnic, nu e cifră fixă).
- **Defectul filtrelor reconfirmat, măsurat identic:** 5 filtre cu criteriu, **0 cu
  `addLabelIds`**, 0 ating etichetă MAVIS/*. `from:(...)` = ȘI în Gmail ⇒ 0 lovituri.
  Cu `{}` ar fi prins **2909 mesaje în 30 de zile**.
- **Joburi:** 65 analizate (42 IQads + 23 DP) → 34 păstrate, 31 drop-uri, 12 verdict
  amânat. **0 postări genuinely noi.**
- **designproject.io:** 23 joburi (ieri 26), descrieri 363–31.446 caractere — **gama s-a
  comprimat**, nu s-a extins. `validThrough` = datePosted + 30 zile, **23/23 exacte**.

**Leaduri verificate (5 din 6 noi față de 25.10):**

| Lead | Salariu | Observație |
|---|---|---|
| UX/UI Designer — micro1 | **$50–90/oră** (3000 EUR la Bestjobs) | Contractor, remote, eligibil Europa, 3000 openings |
| Digital Content Designer (DTC, Amazon) Remote — Concentrix | competitive | 100% remote, eligibil RO — **aplică doar varianta RON** |
| Senior Art Director — Leo Burnett Bucharest | neprecizat | ⚠️ termenul BeBee e în trecut ⇒ termen de agregator |
| Proiectant Producție Publicitară — BD Lemntech | 1405–2000 EUR | Cel mai mare interval, „DISPONIBIL IMEDIAT" |
| AI Video Editor (Meta & AppLovin) — Apex Digital Alliance | 1200–1300 EUR | Design + performance + AI |
| Colaboratori design grafic — AGRESIV MEDIA | **780–1020 EUR** | reapărut, acum cu salariu |

**micro1 = YO AI Labs?** Aceleași platformă, joburi diferite. Nu confunda platforma cu jobul.

**Livrare:** folder pe Drive `GDrive-Second_Brain_PKMS/00_Inbox/00-2-Daily_Raw_Notes`
= `1VjRvaInHjhzrIx90Pt3IiBh_yeSOg25c` (descoperit pe cale, 4 cereri, **nu** hardcodat).
Raport `RAPORT-ZILNIC-202610-26.md` (id `11jjpmypH7bdOny8CSwkTKBfFPyrHMxWZ`, 40.106 B),
commit `7668bf7`. `report-build.js` face search-then-upload ⇒ **actualizare in place**.

## 2026-10-27 — etichetele au fost rearanjate peste noapte (reparat la sursă)

Din cele 8 etichete `MAVIS/*`, **doar `MAVIS/Joburi` și-a păstrat prefixul**; celelalte
7 au primit alte nume (`AI Folder/AI si Comunitati`, `Socials`, `Newsletter`, `Finante`,
`Personal`, `De raspuns`, `Facturi si Conturi`) + **categorie nouă `Optimus CD`**.
Fără reparație, rapoartele ar fi raportat **7 din 8 etichete dispărute, fără semn**.
Reparația: `mavis-tools/taxonomy.js` — singura sursă, rezolvată **live, la runtime**.
*(Regula e în topicul principal.)*

**Măsurătoare 27.10: 9 categorii, 1 funcționează.** `MAVIS/Joburi` 0/0/0/333,
`AI Folder/AI si Comunitati` 0/0/0/115, `Socials` 0/0/0/216, `Newsletter` 0/0/0/235,
`Finante` 0/0/0/5, `Personal` 0/0/0/0, `De raspuns` 0/0/0/30, `Facturi si Conturi`
0/0/0/2, **`Optimus CD` 8/201/582/638**. **8 din 9 categorii sunt MOARTE de 15 zile.**

**Filtrele: 6 cu criteriu, 1 funcționează.** ✅
`from:(notifications@github.com OR *jules*) OR subject:(Jules OR GitHub O...)` →
**917 mesaje/30z**, `addLabelIds: ["CATEGORY_UPDATES","Optimus CD"]`. ❌ celelalte 5:
`from:(...)` ⇒ **0** lovituri; cu `{}` ar fi prins **3737 mesaje/30z**.

**Joburi 27.10:** 62 analizate (43 IQads + 19 DP) → 33 păstrate, 12 verdict amânat.
**1 postare GENUIN NOUĂ:** `Art Director @ Mercury360` (IQads #23999; max ID anterior
23997), scor **9.6** — al doilea din tabele. Verificat pe pagină: București hybrid,
Full Time, Senior, expiră 25.12.2026, 7+ ani advertising, motion design/video
**obligatoriu**. designproject.io: 19 joburi, **23/23** validThrough exacte.

**Cota: 207 cereri — depășită cu 7.** `report-mail-count.js` 78 · `inline` 69 ·
`report-simulate-sort.js` 24 · `report-filter-state.js` 20 · `report-inbox-counts.js` 9 ·
folder-discover 4. Cele 69 de `inline` au fost **diagnosticul rearanjării taxonomiei**
(liste de etichete, comparații de numere, verificarea filtrului nou funcțional) —
cheltuite pe **înțelegerea** stării, nu pe măsurarea zilei. Zero scrieri pe Gmail.
**Raportat explicit în §5 al raportului** — nu ascuns.


## Leaduri 28.10 (5, fiecare cu calea de verificare declarata)

| Lead | Sursa | Bani | Verificat |
|---|---|---|---|
| Graphic Designer part-time 15h remote @ CreativeEd Media | Bestjobs | 525 EUR/luna | text integral, indexat |
| Graphic Designer @ ELBI ElectricLighting | Bestjobs | 1195–1325 (estimare) | sumat, fara cerinte |
| UX/UI Designer – Video Annotation Remote (micro1) | Bestjobs | 3000 EUR/luna | text integral, indexat |
| Editor imagine TV Junior @ Aleph News | HiPo | 4000–5000 RON net | **pagina HiPo, HTTP 200** |
| Junior Mid-Level Graphic Designer & DTP @ BRAYTRON SRL | eJobs | — | **NEVERIFICAT** (403) |

**Joburi 28.10:** 57 analizate (42 IQads + 15 designproject.io) → 29 pastrate, 28 drop-uri,
12 verdict amânat. **0 postări noi** — max ID IQads 23999 neschimbat, cel mai recent
designproject.io tot 2026-10-06. Piata e rece, nu e blocaj de scraping.

## Joburi 29.10 — 3 postari NOI

max ID IQads 23999 → 24002, toate expiră 27.12.2026:
- **#24000 Art Director / Graphic Designer @ Cohn & Jansen** — Full Time, nivel
  „Middle, Senior", 5+ ani în agenție, campanii 360°. **IQads nu publică
  localizarea** (verificat: pagina + 6 pagini de listare + motorul de căutare) ⇒
  rămâne în „verdict amânat" cu scor 8 (L=0). **Dacă e București, scorul = 9,6.**
  Reconfirmat fără localizare și pe 31.10 (a 3-a zi).
- #24001 Influence Lead @ Publicis · #24002 Influence & Content Production Manager
  @ Publicis — influență/conținut, nu design pur.
- designproject.io: **0 postări noi** (cel mai recent tot 06.10).
59 analizate (45 IQads + 14 DP) → 32 păstrate, 12 verdict amânat.

**Etichete 29.10:** 18 mesaje, 24 hituri pe 16 mesaje (8 dublu-etichetate), 2 fără
etichetă. **7d inbox: 643 → 430** ⇒ inboxul se golește. Toate cele 6 filtre
funcționează. Cele 3 moarte: `Personal` (n-a fost folosită niciodată), `De raspuns` +
`Facturi si Conturi` (19 zile) — **toate trei fără filtru creat**.


## 2026-10-31 — sâmbătă: 7 mesaje, 0 postări noi, 2 leaduri

*(secțiune mutată aici din topicul principal, pentru limita de 30KB; regulile
permanente rămân în `raport-zilnic-pipeline`)*

### Catalogul IQads se micșorează prin expirare

**0 postări noi** (max ID IQads 24003 neschimbat; designproject.io tot aceleași 13
joburi). Dar catalogul a **scăzut de la 46 la 45 joburi**: **#24040 (Digital Star,
Social Media Copywriter) a expirat pe 30.10** și a ieșit din AdJob.
*Regulă:* „0 postări noi" **≠** „catalogul neschimbat". Urmărește și **numărul de
joburi**, nu doar max ID-ul — altfel expirările rămân invizibile.

### Două leaduri

- **Creative Lead & 3D Designer @ MARKQUEN EUROPE — 1400–1800, Hybrid, Strada
  Promoroacă 5, București.** Cel mai bine platit rol de design din zilele trecute.
  MARKQUEN = grup internațional de POSM/trade marketing pentru FMCG, peste 30 de
  țări. ⚠️ **discrepanță pe regim:** Bestjobs zice Hybrid, listingul de pe bebee
  zice „La sediu" (on-site) — întreabă în aplicație.
- **UX Jobs Weekly (LinkedIn), ed. 82 — canal NOU de alerte**, neobservat până acum.
  Peste 60 de surse, zilnic, pe `jobs.uxjobs.io`, cu filtru pe țară și plugin
  ChatGPT. Azi arată doar roluri din SUA ⇒ pentru Alex contează filtrul
  Romania/Remote. *Posibilă sursă 4 pentru joburi UX.*

### O alertă poate fi „de job" fără să aibă joburi relevante

Alerta eJobs de azi: 2 joburi — Digital Marketing Manager la **STIFT LUX DESIGN
SRL** (mobilier de grădină, Otopeni ⇒ marketing de produs, nu design) + Gaming
Equipment Integrity Manager. **0 relevante.** Filtrarea eJobs a fost pe
departamentul „Grafică/Webdesign/DTP", dar rolul în sine nu e de design.
*Regulă:* clasa mesajului și **relevanța jobului** sunt lucruri diferite —
verifică titlul rolului, nu departamentul de pe etichetă.

### Ordinea corectă a pipeline-ului (confirmată)

**scraping → sondă de surse → raport.** Sonda citește `jobs-designproject-<data>.json`,
deci în paralel cu scraping-ul prinde fișierul vechi și raportul spune „sonda nu a
rulat". Azi: sondă după scraping, cifre complete (13 joburi, validThrough 13/13).

### Etichete, inbox, scraper

7 mesaje azi, 9 hituri pe 7 mesaje, 1 fără etichetă. **7d inbox: 430 → 378**
(de la 643 pe 28.10). Toate cele 6 filtre funcționează; cele 3 moarte sunt toate
**fără filtru**.
Prima rulare a `scrape-iqads.js` a picat (rețea) — a doua: 45 joburi, exit 0.
*Regulă:* la eșec de scrape, re-rulează și verifică EXIT + numărul de joburi;
fișierul apare doar la final ⇒ **fișier lipsă = scrape nefinalizat**.

### Cota: 121 cereri pe 200
