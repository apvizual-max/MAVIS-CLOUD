# Raport zilnic — marți 3 noiembrie 2026

> Generat de Mavis Cloud · 12 mesaje noi măsurate azi (00:00–09:11 EEST) · 51 joburi analizate
> Cota Google: **123 cereri** (plafon 200 — **în limita plafonului**). Zero scrieri pe Gmail; tot consumul a fost măsurare și diagnostic. Detaliu în §5.

---

## 1. Gmail — etichetele de categorie

### 1.1 Rezultatul scurt
**Pe etichetele de categorie a intrat azi: 14 etichete.** În ultimele 24h: 116; în 7 zile: 791.

Azi au intrat **12 mesaje** în total, iar în inbox sunt **9**.

> **14 etichete pe 12 mesaje** — 2 mesaje primesc două etichete de categorie (ex. o alertă de job care intră și la „Joburi" și la „Newsletter"). De aceea suma pe etichete e mai mare decât numărul de mesaje distincte.

### 1.2 Măsurătoarea pe etichete (numărare exactă, cu paginare)

| Etichetă | azi | 24h | 7z | 30z | Ultimul mesaj etichetat |
|---|---|---|---|---|---|
| `MAVIS/Joburi` | 8 | 39 | 224 | 404 | Tue, 03 Nov 2026 |
| `AI Folder/AI si Comunitati` | 1 | 11 | 91 | 154 | Tue, 3 Nov 2026  |
| `Socials` | 0 | 3 | 27 | 115 | Mon, 02 Nov 2026 |
| `Newsletter` | 3 | 55 | 302 | 411 | Tue, 3 Nov 2026  |
| `Finante` | 0 | 3 | 20 | 23 | Mon, 02 Nov 2026 |
| `Personal` | 0 | 0 | 0 | 0 | n/a |
| `De raspuns` | 0 | 0 | 0 | 13 | Fri, 9 Oct 2026  |
| `Facturi si Conturi` | 0 | 0 | 0 | 1 | Fri, 09 Oct 2026 |
| `Optimus CD` | 2 | 5 | 127 | 1026 | Mon, 02 Nov 2026 |

**Concluzie:** 6 categorii primesc mesaje (`MAVIS/Joburi`, `AI Folder/AI si Comunitati`, `Socials`, `Newsletter`, `Finante`, `Optimus CD`); 2 categorii nu primesc nimic de **24 zile** (pe `De raspuns`, `Facturi si Conturi` = **09.10.2026**); o categorie n-a fost folosită niciodată (0 pe 30 de zile, fără istoric) (`Personal`).

> Zero pe o fereastră nu înseamnă "etichetă goală" — înseamnă "eticheta nu mai primește nimic". Verificat pe 4 ferestre.

### 1.3 Filtrele, măsurate azi

Filtre cu criteriu de interogare pe cont: **6**, din 19 total. **6** dintre ele are `addLabelIds`, iar **6** atinge o etichetă de categorie. Criteriul celui de joburi, citit live azi:

```
from:{jooble bestjobs hipo indeed jobleads linkedin} OR subject:{job angajare vacanta oportunitate}
```

#### 6 filtre FUNCȚIONEAZĂ

**6 dintre 6 filtre lovesc efectiv mesaje.** `from:{jooble bestjobs hipo indeed jobleads linkedi…` → **1068** mesaje în 30 de zile, etichetează `joburi`; `from:{substack goatacademy aiautomationsociety sad…` → **394** mesaje în 30 de zile, etichetează `ai`; `from:{skool facebook instagram pinterest tiktok po…` → **137** mesaje în 30 de zile, etichetează `social`; `from:{noreply no-reply newsletter digest mail@ inf…` → **1199** mesaje în 30 de zile, etichetează `newsletter`; `from:{kraken tradingview bitunix coinbase binance}…` → **26** mesaje în 30 de zile, etichetează `finante`; `from:(notifications@github.com OR *jules*) OR subj…` → **1025** mesaje în 30 de zile, etichetează `agenti`


**Inboxul nu se golește.** Măsurat pe cele 12 mesaje de azi, etichetele lor reale: **9 sunt încă în INBOX**, dar **doar 0 au rămas UNREAD**. Deci filtrele **curăță „necitit"**, dar **nu scoate mesajele din inbox**:

| Fereastră | În inbox | În toate stările |
|---|---|---|
| azi | 9 | 12 |
| 24h | 59 | 79 |
| 7z | 388 | 595 |

**~388 mesaje stau în inbox într-o săptămână** (~55/zi).

### 1.4 Cum ar fi fost sortate mesajele de azi

Simulare pe cele 12 mesaje de azi, cu **aceleași criterii** ale filtrelor (fără scriere):

| Categorie | Mesaje azi |
|---|---|
| `MAVIS/Joburi` | 8 |
| `AI Folder/AI si Comunitati` | 2 |
| `Socials` | 0 |
| `Newsletter` | 3 |
| `Finante` | 0 |
| `Personal` | 0 |
| `De raspuns` | 0 |
| `Facturi si Conturi` | 0 |
| `Optimus CD` | 2 |
| *niciun filtru se potrivește* | 0 |

> Unele mesaje se potrivesc la 2 filtre (ex. "Joburi" + "Newsletter" de la LinkedIn), deci suma poate depăși 12.

**Observație:** **0 mesaje** de azi sunt notificări ale agenților tăi (Jules și GitHub Actions pe repo-urile proprii). Categoria dedicata lor e `Optimus CD`, care a primit 2 mesaje azi, iar filtrul ei functioneaza efectiv. In rest, **6 din 9 categorii** primesc mesaje, iar 3 nu primesc.


### 1.5 Mesajele care chiar necesită răspuns

Clasificarea e făcută din date, nu dintr-o listă scrisă cu mâna: 0 cer răspuns explicit, 6 cer o decizie, 2 sunt alerte de job care nu ating profilul tău, 4 sunt newsletter/promoție, 0 sunt zgomot de pipeline.

**Niciun mesaj nu cere explicit un răspuns.**

**Ceres o decizie sau o acțiune:**

- **Bestjobs** — 06:03 UTC. *MARKQUEN EUROPE is hiring Creative Lead & 3D Designer* _(alerta de job cu rol de design)_ — MARKQUEN EUROPE is hiring Creative Lead & 3D Designer Top jobs according to your activity: CV entries, job applications and job searches. Hi there, Alexandru Popescu ! Bestie, your career friend, is o
- **LinkedIn Job Alerts** — 05:50 UTC. *YTMG LTD is hiring a Art Director (Thumbnails & Packaging)* _(alerta de job cu rol de design)_ — View jobs in Romania Your job alert for Senior Graphics Designer 2 new jobs in Romania match your preferences. Art Director (Thumbnails & Packaging) YTMG LTD Romania (Remote) Easy Apply Senior Marketi
- **Bestjobs** — 05:38 UTC. *These employers are looking for people like you* _(alerta de job cu rol de design)_ — These employers are looking for people like you Top jobs according to your activity: CV entries, job applications and job searches. Hi there, Alexandru Popescu ! Bestie, your career friend, is on What
- **Bestjobs** — 05:09 UTC. *MARKQUEN EUROPE is hiring Creative Lead & 3D Designer* _(alerta de job cu rol de design)_ — MARKQUEN EUROPE is hiring Creative Lead & 3D Designer Top jobs according to your activity: CV entries, job applications and job searches. Hi there, Alexandru Popescu ! Bestie, your career friend, is o
- **apvizual-max** — 01:15 UTC. *[apvizual-max/hermes-agent-temp] Run failed: CI - main (bc2ca07)* _(workflow CI esuat — cere actiune)_ — [apvizual-max/hermes-agent-temp] Run failed: CI - main (bc2ca07) [apvizual-max/hermes-agent-temp] CI workflow run CI: Some jobs were not successful View workflow run Status Job Annotations CI / Detect
- **apvizual-max** — 01:09 UTC. *[apvizual-max/hermes-agent-temp] Run failed: CI - main (4831dfb)* _(workflow CI esuat — cere actiune)_ — [apvizual-max/hermes-agent-temp] Run failed: CI - main (4831dfb) [apvizual-max/hermes-agent-temp] CI workflow run CI: Some jobs were not successful View workflow run Status Job Annotations CI / Detect

**Alerte de job care NU ating profilul de design** (informativ, 2):

- Alerta eJobs — 05:01 UTC · *Avem un job nou care ti se potriveste!*
- Indeed — 03:07 UTC · *Membru al echipei - Part Time la Lovisa. Încă 15 locuri de muncă în București, Ilfov*

**Newsletter / promoție, fără acțiune** (4): DocFreemason, Cafenea ☕️☕️☕️ via LinkedIn, Cafenea ☕️☕️☕️ via LinkedIn, Lucid

**Leads din alertele de job.** Fiecare poartă propria cale de verificare, declarată mai jos — nu toate sunt citite direct de pe pagină:

##### Art Director (Thumbnails & Packaging) @ YTMG LTD - pana la 4.500 USD/luna, Remote

Din alerta **LinkedIn Job Alerts** — *YTMG LTD is hiring a Art Director (Thumbnails & Packaging)*

**Cum a fost verificat:** Descrierea completa a jobului, obtinuta prin indexarea motorului de cautare de pe un agregator de joburi YouTube: salariu, bonusul lunar pe trei criterii, cerintele, programul si instructiunile de aplicare. Confirmat si ca YTMG LTD este un angajator real (pagina de companie LinkedIn, plus un ex-angajat al carui profil LinkedIn apare in cautare).

YTMG LTD produce continut YouTube in stil documentar (canalele BeyondFacts si beyondmilitary, 38 de milioane de vizualizari lunare combinate, al treilea canal in dezvoltare). Echipa e remote, cu 20 de oameni. Rolul de Art Director este tot ce se intampla vizual inainte de apasarea play: thumbnails, titluri, strategie de packaging si identitatea vizuala completa a unui canal nou. Cu timpul, rolul evolueaza spre conducere de departament - vei recruta, forma si conduce designeri.

**Cerințe:**

- Portfolio de thumbnails YouTube cu impact masurabil pe CTR (ideal, canale cu 100.000+ de abonati)
- Intelegere profunda a analiticii YouTube
- Photoshop (inclusiv functiile AI/beta), Illustrator, Lightroom
- Instrumente de generare de imagini AI: Nano Banana, Ideogram, Magnific
- Sa explici DE CE functioneaza un thumbnail, nu doar ca arata bine
- Bonus: identitate vizuala de canal de la zero, motion graphics, subiecte militare/geopolitice/inginerie, gestionarea designerilor

**Rate-uri publicate:**

- Baza: 2.000 - 3.000 USD/luna, in functie de experienta
- Bonus de performanta pana la 750 USD/luna, se reseteaza lunar: 250 pentru benchmark-uri de CTR, 250 pentru retentie de 30s peste 75%, 250 pentru optimizare proactiva
- Total cand performezi bine: 3.750 - 4.500 USD/luna

**Condiții:** Full-time, remote, 40 ore/saptamana. Se cere minimum 6 ore zilnice de suprapunere cu EET/Cipra (Romania e EET, deci e direct compatibil). Raportezi direct la CEO.

**Cum se aplică:** Aplicare pe LinkedIn (Easy Apply). La aplicare alegi TREI thumbnails din portofoliu si, pentru fiecare, spui CTR-ul obtinut (sau estimarea ta), de ce a functionat designul si ce ai schimba azi. Plus linkuri catre canalele pe care ai lucrat.

> ⚠️ Excelenta potrivire cu profilul tau: Art Director, thumbnails, remote, cu latura de leadership si cu rezultate masurabile pe CTR. Trei lucruri de stiut: (1) e un rol cu performanta masurata pe CTR, nu doar estetica - anuntul spune explicit ca daca instinctul tau e sa designezi pentru frumusete, nu pentru click-uri, nu e potrivirea; (2) un agregator arata o postare din martie 2026 marcata inchisa, dar LinkedIn o listeaza AZI cu Easy Apply, deci starea de job deschis vine de la sursa actuala - verifica pe LinkedIn; (3) portofoliul trebuie sa aiba thumbnails cu CTR dovedit - daca nu ai, asta e pragul real, nu anuntul.

- https://www.linkedin.com/jobs

##### Senior Marketing Designer @ NeaMob Tech - Bucuresti (Remote), agentie de marketing

Din alerta **LinkedIn Job Alerts** — *YTMG LTD is hiring a Art Director (Thumbnails & Packaging)*

**Cum a fost verificat:** Pagina de cariere a firmei citita prin indexarea motorului de cautare (neamob.com/careers/marketing-designer): descrierea completa, responsabilitatile, cerintele, numarul de aplicanti si pasii de aplicare. Confirmat si pe un director de joburi care listeaza rolul ca singura pozitie deschisa a firmei, cu Remote EU si fara salariu publicat.

NeaMob Tech e o agentie de marketing digital in crestere, specializata in solutii de growth online. Echipa combina dezvoltatori, analisti, specialisti de growth si creativi. Alerta LinkedIn de azi o listase ca al doilea job nou din Romania pentru preferintele tale de design.

**Cerințe:**

- 5+ ani in marketing design, ideal in agentie digitala sau mediu performance-driven
- Experienta cu clientii: prezentare de lucru creativ, gestionare feedback, aliniere cu obiectivele clientului
- Portofoliu puternic cu bannere (statice si animate), ads video si GIF-uri
- Figma, Adobe Creative Suite (Photoshop, Illustrator, After Effects)
- Bonus: animatie, productii cu AI, prototipare, ilustratie

**Condiții:** Bucuresti, Romania (Remote). Echipa lucreaza pe piete globale.

**Cum se aplică:** Aplicare pe neamob.com/careers (CV + portofoliu). Echipa raspunde in 48 de ore.

> ⚠️ ATENTIE: sunt deja 183 de aplicanti la acest rol, deci pragul de intrare e real. Portofoliul cerut (bannere animate, video ads, GIF-uri) e mai greu decat un portofoliu de brand identity - daca nu ai motion in portofoliu, e un handicap. Salariul nu e publicat. Rolul e mai aproape de performance creative decat de art direction.

- https://www.neamob.com/careers/marketing-designer/

##### Head of Content - 100+ conturi OnlyFans @ Click2Leads.com - 2500, Bucuresti (NOU)

Din alerta **Bestjobs** — *These employers are looking for people like you*

**Cum a fost verificat:** Corpul COMPLET al emailului Bestjobs de azi (titlu, angajator, suma 2500, localizarea). Identitatea angajatorului confirmata prin alte listari ale sale pe Bestjobs (Marketing Manager, Marketing Specialist). Anuntul Head of Content in sine nu a fost gasit in indexarea motorului de cautare - deci cerintele NU sunt cunoscute.

Cel mai nou rol din lista de azi: Head of Content pentru un portofoliu de 100+ conturi OnlyFans, la Click2Leads.com, cu 2500 in Bucuresti. Click2Leads este un angajator real, prezent in listele Bestjobs cu mai multe roluri de marketing (Marketing Manager, Marketing Specialist).

**Cerințe:**

- Necesa in anunt - anuntul nu a fost gasit in indexarea motorului de cautare, deci NU am putut citi cerintele
- Din titlu: rol de conducere de continut pe un portofoliu mare de conturi

**Rate-uri publicate:**

- 2500 (fara mentiune de estimare in email, deci suma pare publicata de angajator)

**Condiții:** Bucuresti.

**Cum se aplică:** Aplicare pe anuntul Bestjobs.

> ⚠️ NEVERIFICAT pe pagina anuntului: anuntul Head of Content nu apare in indexarea motorului de cautare. Angajatorul e confirmat (Click2Leads.com are alte roluri listate activ pe Bestjobs). Titlul sugereaza ca e un rol de management de continut intr-o agentie care administreaza conturi de continut adult - merita sa verifici tu profilul clientilor inainte sa aplici, pentru ca asta schimba tot contextul jobului. Salariul de 2500 e cel mai bun din lista de azi dupa MARKQUEN.

- https://www.bestjobs.eu

##### Creative Lead & 3D Designer @ MARKQUEN EUROPE (a 4-a zi + alerta dedicata a angajatorului)

Din alerta **Bestjobs** — *MARKQUEN EUROPE is hiring Creative Lead & 3D Designer*

**Cum a fost verificat:** Corpul COMPLET al celor trei emailuri Bestjobs de azi (titlul alertei dedicate, angajator, suma 1400-1800, Hybrid, adresa) plus listingul indexat de pe bebee, care confirma firma, profilul si regimul de lucru La sediu. Pagina /en/job/ de pe Bestjobs raspunde 403 - NU am deschis-o.

MARKQUEN are acum propria alerta dedicata pe Bestjobs - compania impinge activ rolul, nu mai este doar in lista ta de cautare. Este cel mai bine platit rol de design din Romania listat, in topul fiecareia dintre cele trei alerte de azi.

**Cerințe:**

- Rolul combina directie creativa si executie 3D pentru retail si POSM (afisaj, mobilier de retail, retail marketing pentru FMCG)
- Necesa complete in anunt - pagina Bestjobs /en/job/ raspunde 403 la acces automat; descrierea firmei si regimul de lucru sunt pe listingul indexat de pe bebee

**Rate-uri publicate:**

- 1400 - 1800 (suma afisata de Bestjobs, fara mentiune de estimare - deci publicata de angajator)

**Condiții:** Hybrid, Strada Promoroaca 5, Bucuresti. ATENTIE: listarea de pe bebee a aceluiasi rol (3D Designer Retail/POSM) spune La sediu, adica on-site, in timp ce Bestjobs zice Hybrid. Exista discrepanta pe regim - intreaba in aplicatie.

**Cum se aplică:** Aplicare pe anuntul Bestjobs.

> ⚠️ Faptul ca angajatorul are alerta dedicata e un semnal mai puternic decat prezenta in lista de cautare - dar si unul mai concurent. Punct slab: 3D si POSM e o nisa diferita de brand identity - daca portofoliul tau e greu de port, suna inainte de a aplica.

- https://www.bestjobs.eu

##### Bestjobs - 17 joburi in lista de azi, cu salariu (suma pentru decizie)

Din alerta **Bestjobs** — *These employers are looking for people like you*

**Cum a fost verificat:** Corpul COMPLET al celor trei emailuri Bestjobs de azi. Pagina de anunt Bestjobs raspunde 403 - NU am deschis paginile individuale.

Lista de azi pentru candidati similari cu tine. Joburile cu suma publicata de angajator:

| Job | Angajator | Salariu | Locatie |
|---|---|---|---|
| Creative Lead & 3D Designer | MARKQUEN EUROPE | 1400 - 1800 | Hybrid, Bucuresti |
| Proiectant Productie Publicitara (DISPONIBIL IMEDIAT) | BD Lemntech | 1405 - 2000 | Bucuresti / Popesti-Leordeni |
| Head of Content - 100+ conturi OnlyFans | Click2Leads.com | 2500 | Bucuresti |
| Specialist Marketing Digital | Fabrica De Podcasturi | 700 - 1350 | Hybrid, Bucuresti |
| AI Video Editor - Meta & AppLovin Performance Ads | Apex Digital Alliance | 1200 - 1300 | fara oras in anunt |
| 3D Video Games Artist | Atypical Games | 1000 - 2000 | Bulevardul Doina Cornea 2F, Bucuresti |
| SudRezidential Videograf & Editor Video | SudRezidential Real Estate | 1000 - 1200 | Bucuresti |
| Operator Grafica, Print & Personalizari | Viragos Design | 800 - 1000 | Bucuresti |
| Colaboratori design grafic, creatie si grafica | AGRESIV MEDIA | 780 - 1020 | Bucuresti |
| Social Media & Content Creator | AMAL HEALTH CARE | 900 | Hybrid, Bucuresti |
| Junior Content Creator | INTAX TRADING | 700 | Otopeni |
| Graphic Designer part-time 15h (remote) | CreativeEd Media | 525 | Remote |

Cu estimare de piata (nu e oferta de angajator): Graphic Designer ELBI 1195-1325, Brand Executive Imperial Brands 1385-1530, BRAND MANAGER FRF 1385-1530, Marketing Specialist Rompetrol 1385-1530, Consultant Electrica 1795-1985, Account Manager BTL Instore 1795-1985, Corporate Marketing Director Working4U 1795-1985.

**Cerințe:**

- Pentru fiecare job: portofoliu si CV pe anuntul Bestjobs, din email

**Rate-uri publicate:**

- Cele mai mari sume publicate: Click2Leads 2500, BD Lemntech 1405-2000, MARKQUEN 1400-1800, Atypical Games 1000-2000
- Estimarile de piata s-au miscat din nou: ieri 1345-1485 si 1790-1980, azi 1385-1530 si 1795-1985 - deci se recalculeaza zilnic

**Condiții:** Toate din alerta zilnica Bestjobs de tipul These employers are looking for people like you.

**Cum se aplică:** Aplicare pe anuntul Bestjobs, din email.

> ⚠️ Sumele fara mentiune de estimare sunt publicate de angajator; cele cu estimare de piata se recalculeaza zilnic si nu sunt oferte. Paginile de anunt Bestjobs raspund 403 la acces automat, deci tot ce e aici vine din corpul emailului.

- https://www.bestjobs.eu

---
## 2. Joburi — scorate cu `ALEX-KIT/scoring.gs`

**51 joburi analizate** (IQads 42 + designproject.io 9) → 27 păstrate în tabele, 24 drop-uri, din care **14 cu verdict amânat** (locația nu e publicată de sursă). **1 job nou** față de 2026-11-02.

Surse: **IQads** (tabloul AdJob activ, citit azi) + **designproject.io** (România + București).

> ⛔ **Expirate marcate în tabele.** La IQads data de expirare vine direct din anunț. La designproject.io `validThrough` = data postării + 30 zile — măsurat pe toate cele 9 de joburi (9 exacte, 0 cu o zi de fus orar, 0 altfel), deci e o expirare reală, nu o derivare inutilă. 5 joburi din tabele au expirat și nu se mai pot aplica.

| | S | D | L | E |
|---|---|---|---|---|
| **S** — senioritate | 0.35 | | | |
| **D** — disciplină | | 0.30 | | |
| **L** — locație | | | 0.20 | |
| **E** — engagement | | | 0.15 | |

### 2.1 Secțiunea 1 — scor maxim — senior/lead, remote sau București, full-time (11)

| Scor | Tag | S/D/L/E | Rol | Companie | Locație | Engagement | Expirare | Nou |
|---|---|---|---|---|---|---|---|---
| **9.6** | [DTC] | 10/10/8/10 | Art Director | Mercury360 | Bucuresti | Full Time | expiră 2026-12-25 |
| **9.4** | [DTC] | 10/8/10/10 | Media Relations Specialist | Confident Communications | Bucuresti | Full Time | expiră 2027-01-01 |
| **9.4** | [DTC] | 10/8/10/10 | PR Manager | Confident Communications | Bucuresti | Full Time | expiră 2027-01-01 |
| **9.4** | [B2B] | 10/8/10/10 | Influencer & Creator Marketing Lead | Confident Communications | Bucuresti | Full Time | expiră 2027-01-01 | ✅
| **9.4** | [B2B] | 10/8/10/10 | Digital Marketing Specialist | Alpha Clinic | Hybrid (Office & Remote) | Full Time | expiră 2026-11-27 |
| **9.4** | [DTC] | 10/8/10/10 | Graphic Designer | LUCA | Bucuresti | Full Time | expiră 2026-11-13 |
| **9.4** | [DTC] | 10/8/10/10 | Senior Product Designer | Jobgether | Romania, Fully Remote | Full Time | postat 2026-10-02 · expiră 2026-11-01 ⛔ **EXPIRAT** |
| **9.4** | [DTC] | 10/8/10/10 | AI Research Lab UI/UX & Brand Designer (100 % remote) (m/f/d) | EWOR GmbH | Bucharest, Romania, Remote Solely | Full Time | postat 2026-09-25 · expiră 2026-10-25 ⛔ **EXPIRAT** |
| **9** | [B2B] | 10/8/8/10 | Social Media Specialist | Viva Credit | Romania | Full Time | expiră 2026-12-12 |
| **8.7** | [DTC] | 8/8/10/10 | Digital Marketing Specialist | GoTech World | Bucuresti, Hybrid (Office & Remote) | Full Time | expiră 2026-11-30 |
| **8.7** | [B2B] | 8/8/10/10 | Graphic Designer | Super Technologies | Romania, Hybrid | Full Time | postat 2026-09-29 · expiră 2026-10-29 ⛔ **EXPIRAT** |

<!-- linkuri -->
- Mercury360 :: Art Director — https://www.iqads.ro/adjob/23999/art-director-mercury360
- Confident Communications :: Media Relations Specialist — https://www.iqads.ro/adjob/24006/media-relations-specialist-confident-communications
- Confident Communications :: PR Manager — https://www.iqads.ro/adjob/24005/pr-manager-confident-communications
- Confident Communications :: Influencer & Creator Marketing Lead — https://www.iqads.ro/adjob/24004/influencer-creator-marketing-lead-confident-agency
- Alpha Clinic :: Digital Marketing Specialist — https://www.iqads.ro/adjob/23970/digital-marketing-specialist-alpha-clinic
- LUCA :: Graphic Designer — https://www.iqads.ro/adjob/23959/graphic-designer-luca
- Jobgether :: Senior Product Designer — https://designproject.io/jobs/senior-product-designer-at-jobgether-6r1kga
- EWOR GmbH :: AI Research Lab UI/UX & Brand Designer (100 % remote) (m/f/d) — https://designproject.io/jobs/ai-research-lab-uiux-and-brand-designer-100-percent-remote-mfd-at-ewor-gmbh-teu2mk
- Viva Credit :: Social Media Specialist — https://www.iqads.ro/adjob/23990/social-media-specialist-viva-credit
- GoTech World :: Digital Marketing Specialist — https://www.iqads.ro/adjob/23981/digital-marketing-specialist-gotech-world
- Super Technologies :: Graphic Designer — https://designproject.io/jobs/graphic-designer-at-super-technologies-epi5zr

### 2.2 Secțiunea 2 — contract / B2B — senioritate bună, engagement pe contract (2)

| Scor | Tag | S/D/L/E | Rol | Companie | Locație | Engagement | Expirare | Nou |
|---|---|---|---|---|---|---|---|---
| **8.4** | [B2B] | 8/8/10/8 | English to French Linguist & Copy Editor for Product, Marketing & UI Content | Jobgether | Romania, Fully Remote | Contract | postat 2026-10-02 · expiră 2026-11-01 ⛔ **EXPIRAT** |
| **8.4** | [DTC] | 8/8/10/8 | Freelance Brand Designer | Mindrift | Romania, Fully Remote | Part Time, Contract | postat 2026-09-25 · expiră 2026-10-25 ⛔ **EXPIRAT** |

<!-- linkuri -->
- Jobgether :: English to French Linguist & Copy Editor for Product, Marketing & UI Content — https://designproject.io/jobs/english-to-french-linguist-and-copy-editor-for-product-marketing-and-ui-content-at-jobgether-j0zyru
- Mindrift :: Freelance Brand Designer — https://designproject.io/jobs/freelance-brand-designer-at-mindrift-ymls4c

### 2.3 Secțiunea 3 — mid-level — potrivire bună, senioritate sub prag (0)

*Niciun job în această secțiune.*

### 2.4 Secțiunea 4 — on-site în afara Bucureștiului — doar dacă S=10 și D≥8 (0)

*Niciun job în această secțiune.*

### 2.5 Verdict amânat — locația nu e publicată de sursă (14)

| Scor | Rol | Companie | Locație | Engagement | Expirare | Nou |
|---|---|---|---|---|---|---|
| 8 | Art Director / Graphic Designer | Cohn & Jansen | neprecizată de sursă | Full Time | 2026-12-27 |  |
| 8 | Art Director | Stefanini Infinit | neprecizată de sursă | Full Time | 2026-12-14 |  |
| 8 | Creative Lead | Stefanini Infinit | neprecizată de sursă | Full Time | 2026-12-14 |  |
| 8 | ART MID | ontheroof | neprecizată de sursă | Full Time | 2026-11-28 |  |
| 8 | Art Director | Saatchi & Saatchi | neprecizată de sursă | Full Time | 2026-11-15 |  |
| 7.4 | Influence & Content Production Manager | Publicis | neprecizată de sursă | Full Time | 2026-12-27 |  |
| 7.4 | Influence Lead | Publicis | neprecizată de sursă | Full Time | 2026-12-27 |  |
| 7.4 | Social Media Manager | Stefanini Infinit | neprecizată de sursă | Full Time | 2026-12-14 |  |
| 7.4 | Senior Social Media & Content Specialist (Project-Based or Full-Time) | Flaminjoy | neprecizată de sursă | Full Time, Project Based | 2026-12-07 |  |
| 7.4 | Social Media Manager | WoPA | neprecizată de sursă | Full Time | 2026-12-01 |  |
| 7.4 | Digital Account Manager | WoPA | neprecizată de sursă | Full Time | 2026-11-21 |  |
| 7.4 | Social Media Content Creator | Play Vertical | neprecizată de sursă | Full Time | 2026-11-08 |  |
| 5.65 | Copywriter | Stefanini Infinit | neprecizată de sursă | Full Time | 2026-12-14 |  |
| 5.65 | Digital Media Specialist / PPC | Stefanini Infinit | neprecizată de sursă | Full Time | 2026-11-27 |  |

**Dintre astea, 0 sunt noi.** Nu le-am dat verdict de locație pentru că anunțul nu o spune — să le verifici pe cele care te interesează:

- Art Director / Graphic Designer — Cohn & Jansen (IQads) — https://www.iqads.ro/adjob/24000/art-director-graphic-designer-cohn-jansen
- Art Director — Stefanini Infinit (IQads) — https://www.iqads.ro/adjob/23996/art-director-stefanini-infinit
- Creative Lead — Stefanini Infinit (IQads) — https://www.iqads.ro/adjob/23993/creative-lead-stefanini-infinit
- ART MID — ontheroof (IQads) — https://www.iqads.ro/adjob/23974/art-mid-ontheroof
- Art Director — Saatchi & Saatchi (IQads) — https://www.iqads.ro/adjob/23963/art-director-saatchi-saatchi
- Influence & Content Production Manager — Publicis (IQads) — https://www.iqads.ro/adjob/24002/influence-content-production-manager-publicis
- Influence Lead — Publicis (IQads) — https://www.iqads.ro/adjob/24001/influence-lead-publicis
- Social Media Manager — Stefanini Infinit (IQads) — https://www.iqads.ro/adjob/23994/social-media-manager-stefanini-infinit

### 2.6 Drop-uri (circuit breaker) — 24

| Rol | Companie | Motiv | Nou |
|---|---|---|---|
| Sr. Account Manager | Saatchi & Saatchi | disciplina nu se potrivește niciunui tier — Sr. Account Manager |  |
| Account Director | Stefanini Infinit | disciplina nu se potrivește niciunui tier — Account Director |  |
| Influencer Marketing Director | Golin Ketchum | disciplina nu se potrivește niciunui tier — Influencer Marketing Director |  |
| Sales Associate | Elite Media United | rol junior/entry/intern — Sales Associate |  |
| BTL Account Manager | Highlight PR | disciplina nu se potrivește niciunui tier — BTL Account Manager |  |
| Account Manager | Stefanini Infinit | disciplina nu se potrivește niciunui tier — Account Manager |  |
| Key Account Manager | GoTech World | disciplina nu se potrivește niciunui tier — Key Account Manager |  |
| Account Director | Confident Communications | rol necorelabil cu portofoliul — Account Director |  |
| PR Manager | Highlight PR | disciplina nu se potrivește niciunui tier — PR Manager |  |
| Senior Strategist & Copywriter | HUBvertising | disciplina nu se potrivește niciunui tier — Senior Strategist & Copywriter |  |
| Traffic Manager | WoPA | disciplina nu se potrivește niciunui tier — Traffic Manager |  |
| BTL Account Manager | The Social Nest | disciplina nu se potrivește niciunui tier — BTL Account Manager |  |
| Specialist Productie Merchandise & Produse Custom | Godmother | disciplina nu se potrivește niciunui tier — Specialist Productie Merchandise & Produse Custom |  |
| Business Development Executive | Flaminjoy | disciplina nu se potrivește niciunui tier — Business Development Executive |  |
| BTL Senior Account Manager | WoPA | disciplina nu se potrivește niciunui tier — BTL Senior Account Manager |  |
| Tehnician montaj si logistica evenimente (BTL) | Hexagon X | disciplina nu se potrivește niciunui tier — Tehnician montaj si logistica evenimente (BTL) |  |
| Senior Account Manager | Propaganda | disciplina nu se potrivește niciunui tier — Senior Account Manager |  |
| Account Director | Propaganda | disciplina nu se potrivește niciunui tier — Account Director |  |
| Group Account Director | Propaganda | disciplina nu se potrivește niciunui tier — Group Account Director |  |
| Growth Marketing Manager | Voxa | disciplina nu se potrivește niciunui tier — Growth Marketing Manager |  |
| Digital Workflow Developer — Rapid Prototyping and Pilots for NATO with security clearance | WLG | rol necorelabil cu portofoliul — Digital Workflow Developer — Rapid Prototyping and Pilots for NATO with security clearance |  |
| Senior UX Engineer | Lenovo | disciplina nu se potrivește niciunui tier — Senior UX Engineer |  |
| English to Romanian Linguist & Copy Editor for Product, Marketing & UI Content | Welo Global | disciplina nu se potrivește niciunui tier — English to Romanian Linguist & Copy Editor for Product, Marketing & UI Content |  |
| Senior UX Researcher (f/m/d) | Awin | rol necorelabil cu portofoliul — Senior UX Researcher (f/m/d) |  |

---

## 3. Top 5 joburi cu scor

| # | Scor | Tag | Rol | Companie | Locație | Engagement | Expirat? | De ce contează |
|---|---|---|---|---|---|---|---|---|
| 1 | **9.6** | [DTC] | Art Director | Mercury360 | Bucuresti | Full Time | nu | S și D maxime |
| 2 | **9.4** | [DTC] | Media Relations Specialist | Confident Communications | Bucuresti | Full Time | nu | D ridicat de prosa ("social media") |
| 3 | **9.4** | [DTC] | PR Manager | Confident Communications | Bucuresti | Full Time | nu | D ridicat de prosa ("social media") |
| 4 | **9.4** | [B2B] | Influencer & Creator Marketing Lead | Confident Communications | Bucuresti | Full Time | nu | D ridicat de prosa ("social media") |
| 5 | **9.4** | [B2B] | Digital Marketing Specialist | Alpha Clinic | Hybrid (Office & Remote) | Full Time | nu | D ridicat de prosa ("social media") |

- Mercury360 :: Art Director — https://www.iqads.ro/adjob/23999/art-director-mercury360
- Confident Communications :: Media Relations Specialist — https://www.iqads.ro/adjob/24006/media-relations-specialist-confident-communications
- Confident Communications :: PR Manager — https://www.iqads.ro/adjob/24005/pr-manager-confident-communications
- Confident Communications :: Influencer & Creator Marketing Lead — https://www.iqads.ro/adjob/24004/influencer-creator-marketing-lead-confident-agency
- Alpha Clinic :: Digital Marketing Specialist — https://www.iqads.ro/adjob/23970/digital-marketing-specialist-alpha-clinic

> **Atenție:** din top 5 după scor, 4 **nu sunt roluri de design** (au trecut doar pentru că textul lor conține "social media" sau "art director" — vezi §6.2). Iată top 5 **efectiv de design**, filtrate pe titlu:

| # | Scor | Rol | Companie | Locație | Engagement | Expirat? | De ce contează |
|---|---|---|---|---|---|---|---|
| 1 | **9.6** | Art Director | Mercury360 | Bucuresti | Full Time | nu | S și D maxime |
| 2 | **9.4** | Graphic Designer | LUCA | Bucuresti | Full Time | nu | L=10 (remote detectat în text) |
| 3 | **9.4** | Senior Product Designer | Jobgether | Romania, Fully Remote | Full Time | ⛔ da | remote |
| 4 | **9.4** | AI Research Lab UI/UX & Brand Designer (100 % remote) (m/f/d) | EWOR GmbH | Bucharest, Romania, Remote Solely | Full Time | ⛔ da | remote |
| 5 | **8.7** | Graphic Designer | Super Technologies | Romania, Hybrid | Full Time | ⛔ da | L=10 (remote detectat în text) |

- Mercury360 :: Art Director — https://www.iqads.ro/adjob/23999/art-director-mercury360
- LUCA :: Graphic Designer — https://www.iqads.ro/adjob/23959/graphic-designer-luca
- Jobgether :: Senior Product Designer — https://designproject.io/jobs/senior-product-designer-at-jobgether-6r1kga
- EWOR GmbH :: AI Research Lab UI/UX & Brand Designer (100 % remote) (m/f/d) — https://designproject.io/jobs/ai-research-lab-uiux-and-brand-designer-100-percent-remote-mfd-at-ewor-gmbh-teu2mk
- Super Technologies :: Graphic Designer — https://designproject.io/jobs/graphic-designer-at-super-technologies-epi5zr

---

## 4. Postări GENUIN noi (nu doar "absente din raportul de ieri")

> "nou" în tabele înseamnă **"nu era în raportul de ieri"**, nu neapărat "postat azi". Iată ce e postat efectiv nou:

| Sursă | Cum am măsurat | Rezultat |
|---|---|---|
| **IQads** | ID-ul ad-ului crește monoton cu postarea. Cel mai mare ID din setul de ieri: **24003** | **3 anunțuri noi** |
| **designproject.io** | data de publicare vs. ultima rulare | **0 anunțuri noi** — cel mai recent de pe site e din **2026-10-06** |

- **IQads #24006** — Media Relations Specialist @ Confident Communications (expiră 2027-01-01) — https://www.iqads.ro/adjob/24006/media-relations-specialist-confident-communications
- **IQads #24005** — PR Manager @ Confident Communications (expiră 2027-01-01) — https://www.iqads.ro/adjob/24005/pr-manager-confident-communications
- **IQads #24004** — Influencer & Creator Marketing Lead @ Confident Communications (expiră 2027-01-01) — https://www.iqads.ro/adjob/24004/influencer-creator-marketing-lead-confident-agency
**Concluzie:** 3 postareri noue de la ultima rulare.

Ce nu a mai apărut în raportul anterior, dar există în catalog (1 la număr, toate cu ✅ în tabele):

- **9.4** · Secția 1 · Influencer & Creator Marketing Lead — Confident Communications (IQads)

---

## 5. Ce n-a mers, măsurat

1. **3 din 9 categorii nu mai primesc nimic** (2 de 24 zile, 1 n-a fost folosită niciodată). Cauza pentru 3 dintre ele: **nu au filtru creat** (`Personal`, `De raspuns`, `Facturi si Conturi`) — deci nimic nu le poate eticheta, oricare ar fi criteriul. Starea filtrelor, masurata azi: **6 functioneaza, 0 sunt nefunctionale**. ~388 mesaje/7 zile stau in inbox.
2. **designproject.io servește descrieri foarte inegale** (363–30012 de caractere pe cele 9 de joburi, măsurat azi). Cele mai lungi sunt rescrise de AI și injectează cuvinte-cheie care ridică axele — vezi §6.2.
3. **Celelalte două câmpuri de engagement ale designproject.io sunt inutilizabile.** `employmentType` din JSON-LD spune `FULL_TIME` pentru 9 din 9, iar badge-ul din listing spune "Full-time" pentru 9 din 9. Singura sură corectă e linia **"Job Type:"** din descriere — prezentă la 9 din 9. Am folosit asta.
4. **Paginatia IQads nu funcționează.** `?page=2` și `?page=3` servesc exact pagina 0 (aceleași 42 de linkuri — verificat azi pe 0, 2, 3). Catalogul complet e pe pagina 0 — nu iterez pagini.
5. **Cota Google: 123 cereri pe 200** (în limita plafonului). Consumul pe etape:

| Etapă | Cereri |
|---|---|
| `report-mail-count.js` | 68 |
| `report-filter-state.js` | 26 |
| `report-simulate-sort.js` | 14 |
| `report-inbox-counts.js` | 7 |
| `report-folder-discover.js` | 4 |
| `inline` | 1 |
| **total** | **123** |

> Rulare 2026-11-03 (raport zilnic). Contor pornit de la zero.

Ce a consumat cel mai mult: corpurile complete ale mesajelor de azi (12) — fără corp, nu se poate distinge un mesaj care cere răspuns de o alertă automată. **Zero scrieri pe Gmail** — niciun mail trimis, marcat sau arhivat, niciun filtru modificat.

---

## 6. Două semnalări ale motorului de scoring (portul rămâne fidel — decizia e a ta)

### 6.1 "remote" pozitiv fals — 2 joburi

| Rol | Companie | De ce e fals | L |
|---|---|---|---|
| Graphic Designer | LUCA | negatie: `nu se lucreaza remote` | 10 |
| Graphic Designer | Super Technologies | eticheta: `Remote Status: Hybrid` | 10 |

"Remote" apare în text, dar jobul **nu** e remote. `L` ar trebui să fie 8 (București) sau 0 (necunoscut), nu 10. Diferență: **0.4 puncte** per job. Nu am atins motorul — portul e fidel prin design.

### 6.2 Axa D ridicată de prosa, nu de titlu — 13 joburi (16 semnalări)

| Rol | Companie | Ce a ridicat axa | De unde |
|---|---|---|---|
| Media Relations Specialist | Confident Communications | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| PR Manager | Confident Communications | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Influencer & Creator Marketing Lead | Confident Communications | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Digital Marketing Specialist | Alpha Clinic | S=10 prin `"head of"` (—) | prosa anuntului |
| Digital Marketing Specialist | Alpha Clinic | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| AI Research Lab UI/UX & Brand Designer (100 % remote) (m/f/d) | EWOR GmbH | S=10 prin `"senior"` (—) | prosa anuntului |
| Digital Marketing Specialist | GoTech World | S=8 prin `"principal"` (—) | prosa anuntului |
| Digital Marketing Specialist | GoTech World | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| English to French Linguist & Copy Editor for Product, Marketing & UI Content | Jobgether | S=8 prin `"lead"` (—) | prosa anuntului |
| English to French Linguist & Copy Editor for Product, Marketing & UI Content | Jobgether | D=8 prin `"ui/ux"` (Core Design) | prosa anuntului |
| Freelance Brand Designer | Mindrift | S=8 prin `"lead"` (—) | prosa anuntului |
| Influence & Content Production Manager | Publicis | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Influence Lead | Publicis | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Digital Account Manager | WoPA | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Copywriter | Stefanini Infinit | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Digital Media Specialist / PPC | Stefanini Infinit | D=8 prin `"social media"` (Core Design) | prosa anuntului |

**Ce propun:** ca `D` să se calculeze din **titlul rolului**, nu din textul anunțului, sau măcar ca un rol să poată intra într-o secțiune doar dacă titlul conține o cheie de design. E o decizie de motor — nu am atins `scoring.gs` fără acordul tău.

---

## 7. Fișiere

- `rapoarte/RAPORT-ZILNIC-202611-03.md` — raportul acesta (și în repo)
- `mavis-tools/scoring-result-2026-11-03.json` — scoruri + secțiuni + diagnostice
- `mavis-tools/jobs-iqads-2026-11-03.json` — joburi IQads, text integral
- `mavis-tools/jobs-designproject-2026-11-03.json` — joburi designproject.io, JSON-LD
- `mavis-tools/jobs-2026-11-02.json` — setul normalizat de ieri (cu care s-a comparat)
- `mavis-tools/report-mail-count.json` — numărătoare pe etichetele de categorie
- `mavis-tools/report-inbox-counts.json` — numărătoare exactă inbox
- `mavis-tools/report-simulate-sort.json` — simularea sortării + mesajele de azi
- `mavis-tools/report-source-probe.json` — sonda de surse (comportamentul iqads.ro / designproject.io, măsurat azi)
- `mavis-tools/report-filter-state.json` — starea filtrelor Gmail + testul paranteze-vs-acolade (măsurat azi)
- `mavis-tools/report-triage.js` — clasificatorul mesajelor (needs-reply / needs-action / fyi / noise)
- `mavis-tools/taxonomy.js` — sursa unică pentru numele etichetelor de categorie (rezolvate live, nu hardcodate)

---

*Generat de Mavis Cloud. Nimic nu a fost șters, nimic nu a fost trimis, nimic nu a fost modificat în Gmail sau Drive. Totul e anulabil.*
