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


## 2026-11-01 — duminică: 7 mesaje, 0 postări noi, alerta Meta

*(secțiune mutată aici din topicul principal, pentru limita de 30KB; regulile
permanente rămân în `raport-zilnic-pipeline`)*

### Alerta de securitate vine și de la Meta

„Someone just logged into your Meta Account", 1 nov 05:39, **near Bucharest**,
Chrome pe Windows, pe 4 profile-uri (Facebook, Instagram, WhatsApp + profilul
„AI, devices and more"). **Prima alertă de securitate de la alt serviciu decât
Google** — iar regula o prinde corect, **pe subiect**, nu pe expeditor.
*Regulă confirmată:* regula de securitate trebuie să se declanșeze pe subiect.

### Tip NOU de alertă Bestjobs: „Candidates like you applied for these jobs"

Joburile la care au aplicat **candidați similari cu tine** — proxy bun pentru ce se
caută efectiv, dar lista e plină de roluri de marketing: filtrează pe titlu.
Nou azi: **Trade Marketing Specialist @ macromex 1790–1980 (estimare)**,
Consultant @ Electrica 1790–1980, Brand Executive @ Imperial Brands 1345–1485.

### Estimările de piață Bestjobs se recalculează zilnic

Ieri 1340–1485 și 1790–1975; azi **1345–1485 și 1790–1980**. ⇒ nu sunt oferte de
angajator, sunt indicii de jobboard. Nu le raporta ca „salariu".

### 0 postări noi, dar al doilea job expirat în două zile

max ID IQads 24003 neschimbat; designproject.io tot 13 joburi. Catalogul IQads a
scăzut **45 → 44**: **#23941 (Confident Communications) a expirat pe 31.10**.
MARKQUEN (Creative Lead & 3D, 1400–1800 Hybrid) a doua zi în alerte.

### Inbox: pragul s-a platizat

7d inbox **378 → 382** (643 pe 28.10). Scăderea mare a fost între 28–31.10, acum
e constant. ⇒ **nu mai promit golirea inboxului**, doar o raportez.

### Cota: 119 cereri pe 200


## 2026-11-02 — 3 alerte de securitate ratate + piața se curăță

*(secțiune mutată aici din topicul principal, pentru limita de 30KB; regulile
permanente rămân în `raport-zilnic-pipeline`)*

### Regula de securitate se declanșează pe ACȚIUNEA cerută

Trei alerte au fost clasificate greșit azi: **Alibaba Cloud „Critical Risk(s) –
Action Required"** (MFA dezactivat) a ajuns **promoție** — meniul paginii de alertă
conține „Free Trial"; **Dropbox „new sign in"** (fără cratime) și **„connected a new
app"** (grant OAuth) nu se potriveau deloc.
*Regulă:* semnalele de acțiune critică („action required", „critical risk", „new
sign in", „connected a new app", „mfa is disabled", „is this you") se declanșează pe
**subiect**, și **o regulă mai slabă nu poate anula o regulă mai puternică** — o
alertă critică nu ajunge la „promoție" oricât de mult marketing s-ar potrivi.

### Anunțul „X is hiring for Y" cu rol de design e alertă de job

„DuckDuckGo is hiring for Remote" (LinkedIn) conținea roluri reale de design și a
ajuns `fyi`: expresia cerea „linkedin job" sau „job alert". *Regulă:* `JOB_HIRING`
pe subiect + `ejobs` în `JOB_ALERT`. Efect: 0 → 7 needs-action, și a apărut cel mai
bine plătit rol: Senior Product Designer @ DuckDuckGo, **178.500 USD/anual +
equity, Remote, România eligibilă**.

### Piața se curăță: 6 joburi au expirat într-o zi

0 postări noi, dar au expirat **#23944 International Waters SENIOR CREATIVES**
(scor 10, era #1) + #23945 Touch Communications + #23946 AdSymphony + 3 pe
designproject.io. **Topul s-a schimbat: nu mai există job cu scor 10** (noul #1 =
Art Director @ Mercury360, 9,6). Catalogul IQads a ajuns la 41, designproject la 10,
iar paginatia nu mai avansează.


## 2026-11-03 — 3 joburi RE-POSTATE + Art Director remote la 4.500 USD

*(secțiune mutată aici din topicul principal; regulile permanente rămân în
`raport-zilnic-pipeline`)*

### Max ID-ul a crescut, dar rolurile erau aceleași: re-postări

max ID IQads **24003 → 24006**, 3 postinguri NOI — toate **Confident Communications**,
cu expirare **2027-01-01**: #24004 Influencer & Creator Marketing Lead, #24005 PR
Manager, #24006 Media Relations Specialist. În același timp au expirat cele două
anunturi VECHI ale aceleiași firme (#23977, #23978, expirau 30.11) ⇒ **compania
le-a re-postat**.
*Regulă:* „0 joburi noi" ar fi fost fals — **urmărește și re-postările**: același
`company+role` cu id nou = anunț reînnoit, nu rol nou. Se vede în diff zilnic
(care apune `id`-ul, nu `company+role`).

### Leaduri

- **Art Director (Thumbnails & Packaging) @ YTMG LTD** — baza **2.000–3.000
  USD/lună** + bonus de performanță până la **750 USD/lună** (max **4.500/lună**),
  remote, full-time, 6h suprapunere zilnică cu EET. Canalele lor YouTube
  (BeyondFacts, beyondmilitary) au 38M vizualizări/lună. Se cere portofoliu de
  thumbnails cu **CTR dovedit** — anuntul spune explicit că dacă instinctul e să
  designezi pentru frumusete și nu pentru click-uri, nu e potrivirea. ⚠️ un
  agregator arată o postare din martie 2026 închisă, dar LinkedIn o listează azi cu
  Easy Apply ⇒ starea vine de la sursa actuală.
- **Senior Marketing Designer @ NeaMob Tech** — București remote, 5+ ani,
  portofoliu cu bannere animate/video ads/GIF-uri. ⚠️ **183 de aplicații** deja.
- **Head of Content – 100+ conturi OnlyFans @ Click2Leads.com — 2500**, București
  (NOU, **neverificat**: anuntul nu apare în indexarea motorului de căutare;
  angajatorul e confirmat prin alte roluri ale lui).
- **MARKQUEN EUROPE** — a 4-a zi, și cu **alertă dedicată a angajatorului**
  („MARKQUEN EUROPE is hiring Creative Lead & 3D Designer"): compania împinge activ
  rolul, nu mai e doar în lista de căutare.

### Piața

designproject.io a ajuns la **9 joburi** și **paginatia nu mai avansează deloc**
(page2NewSlugs = 0) ⇒ sursa se epuizează. IQads: 42. Estimările de piață
Bestjobs s-au recalculat încă o dată (1345–1485 → **1385–1530**; 1790–1980 →
**1795–1985**).

### Inbox / etichete

12 mesaje, 14 hituri de etichetă. Toate cele 6 filtre funcționează; cele 3 moarte
(ramase fără filtru) nu s-au schimbat. 7d inbox 381 → **388** (platou).


## 2026-11-03 — 3 joburi RE-POSTATE + Art Director remote la 4.500 USD

*(secțiune mutată aici din topicul principal, pentru limita de 30KB; regulile
permanente rămân în `raport-zilnic-pipeline`)*

### Max ID-ul a crescut, dar rolurile erau aceleași: re-postări

max ID IQads **24003 → 24006**, 3 postinguri NOI — toate **Confident Communications**,
cu expirare **2027-01-01**: #24004 Influencer & Creator Marketing Lead, #24005 PR
Manager, #24006 Media Relations Specialist. În același timp au expirat cele două
anunturi VECHI ale aceleiași firme (#23977, #23978, expirau 30.11) ⇒ **compania
le-a re-postat**.
*Regulă:* „0 joburi noi" ar fi fost fals — **urmărește și re-postările**: același
`company+role` cu id nou = anunț reînnoit, nu rol nou. Se vede în diff zilnic
(care apune `id`-ul, nu `company+role`).

### Leaduri

- **Art Director (Thumbnails & Packaging) @ YTMG LTD** — baza **2.000–3.000
  USD/lună** + bonus de performanță până la **750 USD/lună** (max **4.500/lună**),
  remote, full-time, 6h suprapunere zilnică cu EET. Canalele lor YouTube
  (BeyondFacts, beyondmilitary) au 38M vizualizări/lună. Se cere portofoliu de
  thumbnails cu **CTR dovedit** — anuntul spune explicit că dacă instinctul e să
  designezi pentru frumusețe și nu pentru click-uri, nu e potrivirea. ⚠️ un
  agregator arată o postare din martie 2026 închisă, dar LinkedIn o listează azi cu
  Easy Apply ⇒ starea vine de la sursa actuală.
- **Senior Marketing Designer @ NeaMob Tech** — București remote, 5+ ani,
  portofoliu cu bannere animate/video ads/GIF-uri. ⚠️ **183 de aplicații** deja.
- **Head of Content – 100+ conturi OnlyFans @ Click2Leads.com — 2500**, București
  (NOU, **neverificat**: anuntul nu apare în indexarea motorului de căutare;
  angajatorul e confirmat prin alte roluri ale lui).
- **MARKQUEN EUROPE** — a 4-a zi, și cu **alertă dedicată a angajatorului**
  („MARKQUEN EUROPE is hiring Creative Lead & 3D Designer"): compania împinge activ
  rolul, nu mai e doar în lista de căutare.

### Piața

designproject.io a ajuns la **9 joburi** și **paginatia nu mai avansează deloc**
(page2NewSlugs = 0) ⇒ sursa se epuizează. IQads: 42. Estimările de piață
Bestjobs s-au recalculat încă o dată (1345–1485 → **1385–1530**; 1790–1980 →
**1795–1985**).

### Inbox / etichete

12 mesaje, 14 hituri de etichetă. Toate cele 6 filtre funcționează; cele 3 moarte
(rămase fără filtru) nu s-au schimbat. 7d inbox 381 → **388** (platou).


## 2026-10-30 — 12 mesaje, 1 posting nou

*(secțiune mutată aici din topicul principal; regulile permanente rămân în
`raport-zilnic-pipeline`)*

**Joburi:** 1 posting GENUIN NOU — IQads **#24003 Sr. Account Manager @ Saatchi &
Saatchi** (expiră 27.12.2026). Nu e rol de design ⇒ circuit breaker-ul îl
drop-uiează. designproject.io: **0 postări noi** (același set de 13 joburi ca
în 29.10, verificat byte cu byte). 59 analizate → 32 păstrate, 15 verdict amânat.
**Cohn & Jansen (#24000) e încă în „verdict amânat"** — a 2-a zi, tot fără
localizare publicată.

**Leaduri (ambele verificate pe sursa):**
- **Web Graphic Designer @ Profitshare** (alerta Jooble) — **citit DIRECT** de pe
  `profitshare.ro/en/career/18`: UX + arhitectura informației, suita Adobe
  (Photoshop, Illustrator), grid systems, HTML5/After Effects, instrumente CRO,
  3+ ani, marketing afiliat. Entitatea legală: Conversion Marketing SRL.
  **Localizarea și salariul NU sunt publicate** ⇒ raportat explicit ca atare.
  *Observație:* în alerta Jooble rolul apare doar în **SUBIECT** (jobul-cheie);
  corpul emailului e o listă generică de 100 de oferte ⇒ pentru un lead din
  Jooble, detaliul vine de pe pagina angajatorului, nu din alertă.
- **3D Video Games Artist @ Atypical Games** — **1000–2000**, Bulevardul Doina
  Cornea 2F, București. Aceleași 1000–2000 apare la toate rolurile studio-ului
  (2D Game Artist, Free 2 Play Game Designer, C++ Game Programmer 1810–2000) ⇒
  e bandă de studio, nu sumă negociată.

**Alerte Bestjobs:** azi alerta „Because you searched for graphic design,
bucharest jobs" poarte **salariul pentru toate cele 14 joburi**. Tipuri de sume:
„Market estimate on similar positions" = **estimare de jobboard**, nu de
angajator; sumă simplă = publicată de angajator; „Confidential" = **Turing**
(AI training) — sumele (3000/2000) sunt ale jobboard-ului, Turing afișează
„$300 estimated earning potential" ⇒ **nu lua 3000 ca garantat**.

**Inbox:** 7d inbox 643 → 430 ⇒ se golește. Filtrele: 6 din 6 funcționale.


## 2026-11-04 — designproject explodează (9 → 17 joburi), Head of Design la Endava

*(secțiune mutată aici din topicul principal; regulile permanente rămân în
`raport-zilnic-pipeline`)*

### Piața

designproject.io a sărit de la 9 la **17 joburi**, cu **16 postinguri noi** (cel mai
recent postat 3 noiembrie) și paginatia a pornit din nou (page 2 adaugă 10 slug-uri
noi). 7 postinguri vechi au expirat. IQads: 41 (1 expirat), 0 postări noi.
59 analizate (41 IQads + 17 DP) → 31 păstrate, 10 joburi noi, 14 verdict amânat.

### Reguli (din această zi)

1. **Pragul de „postări GENUIN noi" trebuie să fie INCLUSIV** (`>=` data rulării
   precedente, nu `>`). `datePosted` are granularitate de zi, deci un anunț postat
   chiar în ziua rulării precedente putea să fi apărut **după** acea rulare — și era
   exclus. Raportul spunea „0 anunțuri noi" în timp ce tabelele arătau 10 joburi
   noi. Ce fusese deja vizibil e prins de `newJobs` (`company+role` lipsă din
   PREV), deci nu se dublează numărătoarea.
2. **O cerere de confirmare de identitate cere omul, dar NU e alertă de securitate.**
   Academia.edu cere confirmarea unei lucrări din 2010 potrivite pe numele
   „Alexandru Popescu" — nume comun ⇒ „Yes, It's Mine" ar pune lucrarea pe profilul
   altcuia. Clasă separată în `report-triage.js`, cu motiv propriu.
3. **„Remote" ≠ „eligible din țara ta".** LearnWorlds scrie „Remote, Europe", dar nu
   oferă sponsorizare de viză și listingul de pe jobboarduri restrânge țările
   (Grecia, Spania, Portugalia, UK +3). Verifică eligibilitatea înainte de a
   aplica — și **cere întotdeauna** clauza de eligibilitate în `verifiedVia`.

### Leaduri

- **Global Head of Design @ Endava** — București hybrid, Full time, expiră 22.11.
  Conduce viziunea globală de design (brand, marketing, experiente digitale) și o
  echipă creativă multidisciplinară. Endava angajează o **agenție de brand nouă**,
  iar Head of Design e partenerul intern cheie; compania devine **AI-native**.
  Caută experiență dovedită în conducerea echipelor de design in-house și în
  parteneriate cu agenții externe. Salariu nepublicat + share plan + bonusuri.
  **Cel mai bun profil pentru Alex dintre toate rolurile zilei.**
- **Senior Product Designer, AI-powered Experiences (Adobe Experience Platform) @ Adobe**
  — București, expiră 29.11. L-ai văzut și pe 02.11 în alerta LinkedIn.
- **Product Designer Mid level (Remote, Europe) @ LearnWorlds** — ⚠️ nu oferă
  sponsorizare de viză; eligibilitatea pentru România trebuie verificată. Proces în
  5 etape, cu exercițiu practic de 10 min.
- **KittySpout — 4 roluri web/Shopify**, postate 3 noiembrie, contractor,
  expira 03.12. E-commerce, nu brand.
- **Electronic Arts — 2 roluri UI/UX** în București; „Experience Designer" expira
  **07.11**.
- **MARKQUEN EUROPE** — a cincea zi, 1400–1800 Hybrid; discrepanta de regim
  persistă (Bestjobs zice Hybrid, bebee spune „La sediu").

### Inbox / etichete

10 mesaje, 14 hituri de etichetă. Toate cele 6 filtre funcționează; cele 3 moarte
(rămase fără filtru) nu s-au schimbat. 7d inbox 378 → 400.


## 2026-11-05 — designproject la 30 joburi, score-10 umflat, 3 grant-uri Google

*(secțiune mutată aici din topicul principal; regulile permanente rămân în
`raport-zilnic-pipeline`)*

### Piața

designproject.io a ajuns la **30 de joburi** (04.11: 17, 03.11: 9), cu **15
postinguri noi** dintre care 2 publicate chiar ieri. Paginatia continua sa
avanseze (page 2 adauga 10 slug-uri noi). IQads: 41 (1 expirat), 1 nou
(#24007 Line Agency Senior Account Manager). 71 analizate → 39 pastrate,
10 joburi noi, 14 verdict amânat.

### Reguli (din această zi)

1. **Proza de cultură poate umfla scorul.** Două clase noi de „remote pozitiv
   fals": **eticheta** — linia `Remote Status: on-site`/`hybrid` conține chiar
   cuvântul „remote", deci linia care DECLARĂ regimul e citită ca semnal de
   remote; **cultura** — „distributed team setting", „we are a global team"
   (joburi on-site într-un oraș anume). UX Designer @ E.ON (Iași) a primit **L=10**
   din „distributed team setting" — cu L corect ar fi 9,6, deci **nu e #1, ci la
   egalitate cu Mercury360**. *Regulă pentru diagnostic:* declanșează doar dacă
   anunțul NU oferă remote ȘI locația e un oraș anume — altfel flagui joburi
   remote adevărate (Fluxon, KittySpout, Jobgether spun toate „fully remote").
   Rezultat corect: **4 semnalări clare, nu 14**. `scoring.gs` neatins.
2. **Nu conclude „sursa e epuizată" dintr-o zi** — 9 → 17 → 30 în trei zile.
3. **Grant-urile OAuth sunt notificări de acces, nu intruzuni.** Trei azi:
   cloudHQ, Awesome Screenshot, Crossover. Textul spune „you used Sign in with
   Google" — dar fiecare app **rămâne cu acces**. Verifică-le pe cele pe care nu
   le recunoști (emailul de „Welcome" e dovada că l-ai deschis tu).

### Leaduri

- **Staff Product Designer - AI Products @ Kraken** — remote RO, „Actively
  recruiting". Nivel STAFF la un exchange de crypto.
- **Senior UX/UI Designer @ Accion Labs** — București hybrid, „Actively
  recruiting", Easy Apply.
- **UX Designer @ E.ON** — Iași, expiră 07.11. **Scorul e umflat** (vezi regula 1).
- **Fabricator (Prototyping) @ Runware** — București **on-site**, postat 04.11.
  Linia „remote status: on-site" e cea care i-a dat L=10.
- **Product Designer @ Jobgether** — RO fully remote, contractor, postat 04.11.
- **Content Strategy & Creative Operations Lead @ Viseven** — București remote.
- **3 notificări de grant OAuth Google** — cloudHQ (05:28 UTC), Awesome Screenshot
  (07:18 EEST, cu email de welcome ⇒ deschis de tine), Crossover (02:59 EEST).

### Inbox / etichete

18 mesaje, 22 hituri de etichetă pe 16 mesaje. Toate cele 6 filtre funcționează;
cele 3 moarte (fără filtru) nu s-au schimbat. 7d inbox 378 → 400.


---

> **PROCEDURA DE ROTIRE (zilnic, la rularea raportului)**
> 1. **Arhivează întâi în repo** — `mavis-tools/memory-snapshot.js --from <staging> --label pre-restructure-topics-<DATA>` + MANIFEST + COMMIT + **PUSH**. Fără push, nu tai nimic.
> 2. Mută secțiunea zilnică precedentă din topicul `raport-zilnic-pipeline` aici.
> 3. În `raport-zilnic-pipeline` rămân **doar regulile permanente** + secțiunea zilnică nouă.
> 4. **Ambele topicuri sunt aproape de limita de 30 KB.** Dacă `raport-zilnic-pipeline`
>    refuză append-ul, comprese secțiunile zilnice vechi (ele sunt deja aici) — sau
>    mută mai multe reguli în topicul potrivit (`scoring-gs-buguri-masurate` pentru
>    motor, `gmail-sorting-filters` pentru filtre).
>
> **Mutate:** 30.10-05.11 (complete), 06.11-10.11 (compacte).


## 2026-11-06 — DP 30 (AECOM nou); IQads 41 (1 expirat). BUG sort date. Commit a443593.


## 2026-11-07 — Kraken Staff Brand Designer remote; 5 notificari = 1 actiune. Commit ee4abe4.


## 2026-11-09 — UserWise Lead UI/UX remote; 3 reguli triaj. Commit b344d75.


## 2026-11-10 — 22 aplicari; Ink Foundation AI. Commit 873155b.


## 2026-11-14 — sâmbătă: 9 mesaje, 1 postare nouă (non-design), triaj reparat

**Etichete.** 9 mesaje azi (8 hituri de etichetă, 7 în inbox): `MAVIS/Joburi` 6, `AI Folder/AI si Comunitati` 1, `Newsletter` 1, restul 0. 7d inbox 375/552. **`Personal` nu mai există** (nerezolvată). Filtre: 6 din 7 ating etichetă de categorie; al 7-lea (cloudHQ) a lovit azi primul mesaj în 30 de zile.

**Triaj: 0 needs-reply, 3 needs-action, 5 job-alert-other, 1 fyi, 0 noise.** Defect reparat azi: alerta eJobs tipărește **filtrele candidatului** („Departamente: … Grafică / Webdesign / DTP") ⇒ fiecare alertă eJobs părea „job de design" (fals pozitiv sistematic); boilerplate-ul se curăță înaintea verificării relevanței.

**Joburi.** 67 analizate (IQads 42 + DP 25) → 38 păstrate, 29 drop-uite, 16 amânate. **1 postare nouă: IQads #24017 Paid Media Specialist / PPC @ Flaminjoy** (Remote, 8,5) — non-design, dar **scor umflat**: S=10 din „lead", D=5 din „mcp" (§6.2). DP: 0 postari noi. **DTP Specialist @ Fieldstar (#24013) e încă drop-uit** — motorul n-are cheie DTP/prepress ⇒ decizia rămâne a lui Alex.

**Cota Google: 118/200.**


## 2026-11-15 — duminică: 13 mesaje, **0 postări noi**, 3 fixuri de șablon

**Etichete.** 13 mesaje azi (16 hituri de etichetă, 9 în inbox; 3 mesaje dublu-etichetate): `MAVIS/Joburi` 10, `AI Folder/AI si Comunitati` 2, `Newsletter` 4, restul 0. 24h 86 · 7z 746. **`Personal` nu mai există** (nerezolvată, raportată). Filtre: 20 total, 7 cu criteriu, 7 cu `addLabelIds`, **6 ating etichetă de categorie** — al 7-lea (cloudHQ) are criteriu valid + `addLabelIds` corect, dar **0 lovituri în 30 de zile**.

**Triaj: 0 needs-reply, 7 needs-action, 5 job-alert-other, 1 fyi, 0 noise.** Cele 7 needs-action = 3 alerte Bestjobs + **3 LinkedIn pentru ACELAȘI job** (Prohuman Romania Junior Graphic Designer | eCommerce | 1-Year Contract — trimis de 3 alerte diferite: Brand/Graphic/UI designer) + 1 JobLeads („AI Designer, UI/UX Designer, Senior UI Designer, Senior Art Director" — 96 joburi noi). *Observație:* **același job vine pe 3 alerte** ⇒ la numărătoare, distinge joburi de mesaje.

**Joburi.** 67 analizate (IQads 42 + DP 25) → 38 păstrate, 29 drop-uite, 16 amânat. **0 postări noi** — max ID IQads **24017** neschimbat (verificat în fișierul de azi), DP cel mai recent 2026-11-05. **DTP Specialist @ Fieldstar (#24013) e încă drop-uit** (motorul n-are cheie DTP/prepress ⇒ decizia rămâne a lui Alex).

**3 defecte de șablon reparate azi** (toate în `report-build.js`): (1) **tabela cotelor nu se aduna cu totalul** (137 în tabel, 140 total — lipsea rândul build-ului, scris la ieșirea procesului); (2) **fereastra zilei era cu o oră greșită** — eticheta spunea „EEST" și calculul folosea +3, dar România e pe **EET (+2) din 25.10.2026**; (3) **pluralul cu gen** — „Cele 1 filtre ... lovesc" ⇒ „Filtrul ... nu lovește"; „6 functioneaza, 1 sunt nefunctionale" ⇒ „1 este nefunctional".

**Cota Google: 147/200** (61 mail-count · 30 simulate-sort · 29 filter-state · 10 folder-discover · 7 inbox · 5 build · 5 verify).


## 2026-11-16 — luni: 11 mesaje, **0 postări noi**, cod de verificare prins ca test de acces

**Etichete.** 11 mesaje azi (9 hituri de etichetă, 8 în inbox): `MAVIS/Joburi` 6, `AI Folder/AI si Comunitati` 1, `Newsletter` 2, restul 0; 24h 51 · 7z 735. **1 mesaj nu a primit nicio etichetă** („Cezar Petrescu — Ferma Domnita Maria": ofertă personală cu cod REVENIM45, scrisă pe numele lui, dar **niciun filtru de categorie nu se potrivește** ⇒ rămâne neetichetat în inbox). **`Personal` nu mai există** (nerezolvată). Filtre: 20 total, 7 cu criteriu, 7 cu `addLabelIds`, **6 ating etichetă de categorie** — al 7-lea (cloudHQ) are criteriu valid, dar **0 lohituri în 30 de zile**.

**Triaj: 0 needs-reply, 3 needs-action, 5 job-alert-other, 3 fyi, 0 noise.** Cele 3 needs-action = 2 alerte Bestjobs + **„381878 is your verification code" (Slickdeals, 00:46 UTC)** — până azi era clasificat `fyi` (newsletter), deci **ascuns în „fără acțiune"**. Reparat azi: un cod de verificare e **test de autentificare** — dacă Alex nu l-a cerut, e tentativă de acces în cont (≠ confirmare de proprietate, care e altă clasă).

**Joburi.** 66 analizate (IQads 41 + DP 25) → 37 păstrate, 29 drop-uite, 15 amânat. **0 postări noi** — max ID IQads **24017** neschimbat; catalogul IQads **42 → 41** (unul expirat). DP: 0 postări noi (cel mai recent 2026-11-05). **DTP Specialist @ Fieldstar (#24013) e încă drop-uit** (motorul n-are cheie DTP/prepress ⇒ decizia rămâne a lui Alex).

**2 fixuri azi:** (1) `report-triage.js` — ramură nouă pentru codurile de verificare; (2) `report-build.js` — acord de plural („1 dintre ele nu au primit" ⇒ „nu a primit").

**Cota Google: 123/200** (61 mail-count · 29 filter-state · 13 simulate-sort · 7 inbox · 5 folder-discover · 5 build · 3 verify).

## 2026-11-17 — marți: 16 mesaje, **1 posting nou (non-design, scor umflat)**, 2 CI eșuate

**Etichete.** 16 mesaje azi (20 hituri de etichetă, 10 în inbox): `MAVIS/Joburi` 9, `AI Folder/AI si Comunitati` 4, `Newsletter` 4, `Finante` 1, `Optimus CD` 2; 1 mesaj fără etichetă (Atlas Obscura). **`Personal` nu mai există** (nerezolvată). Filtre: 7 cu `addLabelIds`, **6 ating etichetă de categorie** ⇒ 6 funcționale.

**Triaj: 0 needs-reply, 7 needs-action, 4 job-alert-other, 5 fyi, 0 noise.** Needs-action = 3 alerte Bestjobs (MARKQUEN dedicată, „Candidates like you applied", „10 graphic design jobs") + Jooble (Human Intelligence — AI Creative Specialist) + JobLeads (AI Designer, 96 joburi) + **2 CI eșuate în `hermes-agent-temp`** („CI: Some jobs were not successful").

**Joburi.** 66 analizate (IQads 42 + DP 24) → 38 păstrate, 28 drop-uite, 15 amânat. **1 postare nouă: IQads #24018 Partnerships & Business Development Specialist @ Confident Communications** (București, expiră 2027-01-15, scor 9) — **non-design, scor umflat**: S=10 din „**lead**-uri" (lead-uri de vânzare, nu senioritate) și D=8 din „social media" în prosa ⇒ §6.2. DP: 0 postări noi. **DTP #24013 e încă drop-uit** (motorul n-are cheie DTP/prepress ⇒ decizia e a lui Alex).

**Cota Google: 124/200.**

## 2026-11-18 — miercuri: 17 mesaje, **1 posting nou (non-design, scor umflat)**, 2 filtre „funcționale" numărate greșit

**Etichete.** 17 mesaje azi (25 hituri de etichetă, 11 în inbox): `MAVIS/Joburi` 10, `Newsletter` 10, `Socials` 4, `AI Folder/AI si Comunitati` 1, `Finante` 0, `Optimus CD` 0; **1 mesaj fără etichetă** (Isha Foundation). Eticheta nouă **`MAVIS/Joburi/IQ Adds`** (sub-etichetă, necunoscută taxonomiei) e **goală** — 0 azi, 0 în 7 zile ⇒ niciun mesaj ascuns. Eticheta `Personal` **nu mai există** în Gmail (rearanjare).

**Filtre: 6 funcționale, nu 7.** cloudHQ lovește 1 mesaj în 30 de zile, dar ținte `CATEGORY_PERSONAL` — **etichetă de SISTEM a Gmail**, nu una din cele 8 categorii ⇒ mesajele lui nu primesc etichetă de categorie. *Regulă:* „funcțional" = lovește ȘI etichetează o categorie.

**Triaj: 0 needs-reply, 2 needs-action, 6 job-alert-other, 9 fyi, 0 noise.** Needs-action = 2 alerte Bestjobs („8 new jobs for you: design graphic bucuresti" și „Job offers that fit your profile"). Astăzi **niciun CI eșuat**.

**Joburi.** 65 analizate (IQads 43 + DP 22) → 37 păstrate, 28 drop-uite, 15 amânat. **1 postare nouă: IQads #24019 Comms Consultant @ GRF+** (Hybrid, expiră 2027-01-16, scor 9.4) — **non-design**: S=10 din „lead" (aici **corect**: „Vei fi lead pe campaniile integrate"), D=8 din „social media" în context PR ⇒ fals. DP: 0 postări noi (24 → 22 joburi, două expirări). Secțiuni: 1:17, 2:5, 3:0, 4:0.

**Cota Google: 128/200** (61 mail-count · 29 filter-state · 19 simulate-sort · 7 inbox · 5 folder-discover · 3 label-stray · 3 build · 1 verify).

## 2026-11-19 — joi: 16 mesaje, **1 posting nou (#24020, PPC — non-design)**, o cursă reparată între scraping și scoring

**Etichete.** 16 mesaje azi (20 hituri, 10 în inbox): `MAVIS/Joburi` 10, `Newsletter` 5, `AI Folder/AI si Comunitati` 4, `Socials` 1; **0 mesaje fără etichetă** (prima dată în ultimele zile). Eticheta `MAVIS/Joburi/IQ Adds` rămâne **goală**; `Personal` **nu mai există**. Filtre: 20 total, 7 cu criteriu, 7 cu `addLabelIds`, **6 ating etichetă de categorie ⇒ 6 funcționale**.

**Triaj: 0 needs-reply, 4 needs-action, 5 job-alert-other, 7 fyi, 0 noise.** Needs-action = 2 alerte Bestjobs („New design graphic bucuresti jobs", „These employers are looking for people like you") + Jooble (Remote Labs — Fractional UI/UX Designer) + JobLeads (AI Designer, 96 joburi). **Reparat azi:** „Design Engineer CATIA – Bumpers" (Segula, CAD auto) intra în needs-action doar din cuvântul generic „design" ⇒ mutat în „nu atinge profilul" (needs-action 5 → 4).

**Joburi.** 65 analizate (IQads 44 + DP 21) → 37 păstrate, 28 drop-uite, 16 amânat. **1 postare nouă: IQads #24020 Digital Media Specialist Lead (PPC) @ Stefanini Infinit** (exp. 2027-01-17, scor 7.4) — **non-design** (media buying), fără localizare publicată ⇒ „verdict amânat". DP: 0 postări noi (22 → 21). Secțiuni 1:16, 2:5, 3:0, 4:0.

**Cursa reparată:** scoringul a citit `jobs-iqads` **înainte** de scrierea finală cu `companyCity` ⇒ Cohn & Jansen #24000 a picat de la 9,6 la 8,0 și a ieșit din secțiunea 1. Fix: scriere atomică + marker `companyCityResolved` + `report-score.js` refuză să ruleze fără marker.

**Cota Google: 128/200** (62 mail-count · 29 filter-state · 18 simulate-sort · 7 inbox · 5 folder · 3 label-stray · 3 build · 1 verify).

## 2026-11-20 — vineri: 14 mesaje, **0 postări noi**, cota raportată corect după un audit

**Etichete.** 14 mesaje azi (18 hituri, 9 în inbox): `MAVIS/Joburi` 8, `Newsletter` 6, `AI Folder/AI si Comunitati` 3, `Finante` 1, `Socials` 0. 2 mesaje azi **fără filtru** (Duty Free Otopeni — Black Friday; Team Begun, fosta Ethos). `Personal` **nu mai există**; `MAVIS/Joburi/IQ Adds` **goală** (0 azi, 0 în 7z). Filtre: 20 total, 7 cu `addLabelIds`, **6 ating etichetă de categorie ⇒ 6 funcționale**.

**Triaj: 0 needs-reply, 3 needs-action, 4 job-alert-other, 7 fyi, 0 noise.** Needs-action = 2 alerte Bestjobs („8 design graphic bucuresti jobs available on bestjobs", „Job offers that fit your profile") + Jooble („Compania caută Senior Designer - UI/UX (f/m/x) și 100 mai multe oferte noi de muncă").

**Joburi.** 65 analizate (IQads 44 + DP 21) → 37 păstrate, 28 drop-uite, 16 amânat. **0 postări noi** — max ID IQads rămâne **24020**; DP: cel mai recent postat 2026-11-05. Secțiuni 1:16, 2:5, 3:0, 4:0. Top-5 **neschimbat** față de 18–19.11 (Cohn & Jansen 9,6 · Mercury360 9,6 · GRF+ 9,4 · Flaminjoy 9,4 · Confident Communications 9,4) ⇒ primele 5 conțin **3 roluri non-design** umflate de „social media" (§6.2).

**Cota Google: 130/200 în raport** (62 mail-count · 29 filter-state · 16 simulate-sort · 7 inbox · 5 folder · 3 label-stray · 5 build · 3 verify). **Contorul final: 131** — un audit de unicitate pe Drive (search după nume, 1 cerere) a căzut după scrierea raportului ⇒ regula 26: cifra din raport e „starea la scriere", cea reală se raportează în chat.

**Reparat operativ:** scraping-ul designproject.io a picat cu `MODULE_NOT_FOUND` — în `cd X && (A) & (B) &` doar primul subshell moștenește directorul. ⇒ `cd X; (A) & (B) &` sau cale absolută în ambele.

## 2026-11-21 — sâmbătă: 21 mesaje, **1 posting nou (#24021 — drop-uit)**, 4 needs-action

**Etichete.** 21 mesaje azi (25 hituri, 9 în inbox): `MAVIS/Joburi` 14, `Newsletter` 7, `AI Folder/AI si Comunitati` 4, `Socials` 0, `Finante` 0; 2 mesaje fără filtru (Claudiu Ciobanu — copy/reclame; DOUGLAS OUTLET — Black Friday). `Personal` **nu mai există**; `MAVIS/Joburi/IQ Adds` **goală** (0 azi, 0 în 7z). Filtre: 20 total, 7 cu `addLabelIds`, **6 ating etichetă de categorie ⇒ 6 funcționale**.

**Triaj: 0 needs-reply, 4 needs-action, 6 job-alert-other, 11 fyi, 0 noise.** Needs-action = Twine Team („22 new job opportunities" — video editing) + 3 Bestjobs („New opportunities in top companies", „New design graphic bucuresti jobs", **„AGRESIV MEDIA is hiring Colaboratori design grafic"**).

**Joburi.** 66 analizate (IQads 45 + DP 21) → 37 păstrate, 29 drop-uite, 16 amânat. **1 postare nouă: IQads #24021 Gallery Manager @ Galeria Gaep** (exp. 2026-12-04) — **non-design** ⇒ drop-uit de motor (§4 îl arată, nu intră în tabele). DP: 0 postări noi (cel mai recent 2026-11-05). Secțiuni 1:16, 2:5, 3:0, 4:0. Top-5 **neschimbat** (Cohn & Jansen 9,6 · Mercury360 9,6 · GRF+ 9,4 · Flaminjoy 9,4 · Confident Communications 9,4) ⇒ 3 din 5 non-design (§6.2: 21 joburi, 25 semnalări).

**Cota Google: 130/200** (61 mail-count · 27 filter-state · 23 simulate-sort · 7 inbox · 5 folder · 3 label-stray · 3 build · 1 verify) — raportul și contorul final **coincid** ✓ (nicio cerere după scriere).

## 2026-11-22 — duminică: 12 mesaje, **0 postări noi**, 4 needs-action (MARKQUEN ×2)

**Etichete.** 12 mesaje azi (12 hituri, 8 în inbox): `MAVIS/Joburi` 8, `Newsletter` 3, `AI Folder/AI si Comunitati` 1; 1 mesaj fără filtru (Claudiu Ciobanu — „Secretul freelancerilor care nu mai sunt plătiți pe…"). `Personal` **nu mai există**; `MAVIS/Joburi/IQ Adds` **goală** (0 azi, 0 în 7z). Filtre: 20 total, **6 funcționale**.

**Triaj: 0 needs-reply, 4 needs-action, 5 job-alert-other, 3 fyi, 0 noise.** Needs-action = **2 alerte Bestjobs pentru ACELAȘI job** („MARKQUEN EUROPE is hiring Creative Lead & 3D Designer" — 09:20 și 06:06) + „Candidates like you applied for these jobs" + Jooble („Senior Designer - UI/UX"). *Observație:* același job vine pe 2 alerte ⇒ la numărătoare, joburi ≠ mesaje.

**Joburi.** 64 analizate (IQads 43 + DP 21) → 36 păstrate, 28 drop-uite, 15 amânat. **0 postări noi** — max ID IQads rămâne **24021**; DP cel mai recent 2026-11-05. Secțiuni 1:16, 2:5, 3:0, 4:0. Top-5 neschimbat ⇒ 3 din 5 non-design (§6.2).

**Cota Google: 123/200** — raportul și contorul final **coincid** ✓ (o cerere irosită la o verificare cu id gol ⇒ re-upload cu cifra recalculată).
