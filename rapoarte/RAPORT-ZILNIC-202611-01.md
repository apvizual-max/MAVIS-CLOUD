# Raport zilnic — duminică 1 noiembrie 2026

> Generat de Mavis Cloud · 7 mesaje noi măsurate azi (00:00–09:09 EEST) · 57 joburi analizate
> Cota Google: **118 cereri** (plafon 200 — **în limita plafonului**). Zero scrieri pe Gmail; tot consumul a fost măsurare și diagnostic. Detaliu în §5.

---

## 1. Gmail — etichetele de categorie

### 1.1 Rezultatul scurt
**Pe etichetele de categorie a intrat azi: 7 etichete.** În ultimele 24h: 70; în 7 zile: 926.

Azi au intrat **7 mesaje** în total, iar în inbox sunt **7**. **2 dintre ele nu au primit nicio etichetă de categorie** (nu se potrivesc niciunui filtru de categorie — deci rămân în inbox, neetichetate).

> **7 etichete pe 5 mesaje** — 2 mesaje primesc două etichete de categorie (ex. o alertă de job care intră și la „Joburi" și la „Newsletter"). De aceea suma pe etichete e mai mare decât numărul de mesaje distincte.

### 1.2 Măsurătoarea pe etichete (numărare exactă, cu paginare)

| Etichetă | azi | 24h | 7z | 30z | Ultimul mesaj etichetat |
|---|---|---|---|---|---|
| `MAVIS/Joburi` | 4 | 20 | 168 | 384 | Sun, 1 Nov 2026  |
| `AI Folder/AI si Comunitati` | 1 | 12 | 74 | 152 | Sun, 1 Nov 2026  |
| `Socials` | 0 | 3 | 21 | 141 | Sat, 31 Oct 2026 |
| `Newsletter` | 2 | 30 | 226 | 356 | Sun, 1 Nov 2026  |
| `Finante` | 0 | 3 | 16 | 21 | Sat, 31 Oct 2026 |
| `Personal` | 0 | 0 | 0 | 0 | n/a |
| `De raspuns` | 0 | 0 | 0 | 14 | Fri, 9 Oct 2026  |
| `Facturi si Conturi` | 0 | 0 | 0 | 1 | Fri, 09 Oct 2026 |
| `Optimus CD` | 0 | 2 | 421 | 1022 | Sat, 31 Oct 2026 |

**Concluzie:** 6 categorii primesc mesaje (`MAVIS/Joburi`, `AI Folder/AI si Comunitati`, `Socials`, `Newsletter`, `Finante`, `Optimus CD`); 2 categorii nu primesc nimic de **22 zile** (pe `De raspuns`, `Facturi si Conturi` = **09.10.2026**); o categorie n-a fost folosită niciodată (0 pe 30 de zile, fără istoric) (`Personal`).

> Zero pe o fereastră nu înseamnă "etichetă goală" — înseamnă "eticheta nu mai primește nimic". Verificat pe 4 ferestre.

### 1.3 Filtrele, măsurate azi

Filtre cu criteriu de interogare pe cont: **6**, din 19 total. **6** dintre ele are `addLabelIds`, iar **6** atinge o etichetă de categorie. Criteriul celui de joburi, citit live azi:

```
from:{jooble bestjobs hipo indeed jobleads linkedin} OR subject:{job angajare vacanta oportunitate}
```

#### 6 filtre FUNCȚIONEAZĂ

**6 dintre 6 filtre lovesc efectiv mesaje.** `from:{jooble bestjobs hipo indeed jobleads linkedi…` → **1069** mesaje în 30 de zile, etichetează `joburi`; `from:{substack goatacademy aiautomationsociety sad…` → **399** mesaje în 30 de zile, etichetează `ai`; `from:{skool facebook instagram pinterest tiktok po…` → **141** mesaje în 30 de zile, etichetează `social`; `from:{noreply no-reply newsletter digest mail@ inf…` → **1185** mesaje în 30 de zile, etichetează `newsletter`; `from:{kraken tradingview bitunix coinbase binance}…` → **22** mesaje în 30 de zile, etichetează `finante`; `from:(notifications@github.com OR *jules*) OR subj…` → **1024** mesaje în 30 de zile, etichetează `agenti`


**Inboxul nu se golește.** Măsurat pe cele 7 mesaje de azi, etichetele lor reale: **7 sunt încă în INBOX**, dar **doar 2 au rămas UNREAD**. Deci filtrele **curăță „necitit"**, dar **nu scoate mesajele din inbox**:

| Fereastră | În inbox | În toate stările |
|---|---|---|
| azi | 7 | 7 |
| 24h | 43 | 50 |
| 7z | 382 | 867 |

**~382 mesaje stau în inbox într-o săptămână** (~55/zi).

### 1.4 Cum ar fi fost sortate mesajele de azi

Simulare pe cele 7 mesaje de azi, cu **aceleași criterii** ale filtrelor (fără scriere):

| Categorie | Mesaje azi |
|---|---|
| `MAVIS/Joburi` | 4 |
| `AI Folder/AI si Comunitati` | 1 |
| `Socials` | 0 |
| `Newsletter` | 1 |
| `Finante` | 0 |
| `Personal` | 0 |
| `De raspuns` | 0 |
| `Facturi si Conturi` | 0 |
| `Optimus CD` | 0 |
| *niciun filtru se potrivește* | 2 |

> Unele mesaje se potrivesc la 2 filtre (ex. "Joburi" + "Newsletter" de la LinkedIn), deci suma poate depăși 7.

**Observație:** **0 mesaje** de azi sunt notificări ale agenților tăi (Jules și GitHub Actions pe repo-urile proprii). Categoria dedicata lor e `Optimus CD`, care a primit 0 mesaje azi, iar filtrul ei functioneaza efectiv. In rest, **6 din 9 categorii** primesc mesaje, iar 3 nu primesc.


### 1.5 Mesajele care chiar necesită răspuns

Clasificarea e făcută din date, nu dintr-o listă scrisă cu mâna: 0 cer răspuns explicit, 3 cer o decizie, 1 este alerte de job care nu ating profilul tău, 3 sunt newsletter/promoție, 0 sunt zgomot de pipeline.

**Niciun mesaj nu cere explicit un răspuns.**

**Ceres o decizie sau o acțiune:**

- **Bestjobs** — 05:49 UTC. *Because you searched for design graphic bucuresti jobs* _(alerta de job cu rol de design)_ — Because you searched for design graphic bucuresti jobs Top jobs according to your activity: CV entries, job applications and job searches. Hi there, Alexandru Popescu ! Bestie, your career friend, is 
- **Bestjobs** — 05:30 UTC. *Candidates like you applied for these jobs* _(alerta de job cu rol de design)_ — Candidates like you applied for these jobs Top jobs according to your activity: CV entries, job applications and job searches. Hi there, Alexandru Popescu ! Bestie, your career friend, is on WhatsApp 
- **Meta** — 03:39 UTC. *Did you just log in on a new device?* _(alerta de securitate — cere verificare umana)_ — Meta Let us know if it wasn't you, Alex. Hi Alex, Someone just logged into your Meta Account. If this wasn't you, we're here to help you take some simple steps to secure your account. Was this you? 1 

**Alerte de job care NU ating profilul de design** (informativ, 1):

- Indeed — 04:49 UTC · *Stagiar - Autorizari la GROUPAMA ASIGURARI S.A. Încă 22 de locuri de muncă în București, Ilfov*

**Newsletter / promoție, fără acțiune** (3): Vaibhav Sisinty, Alexandru Chirita via LinkedIn, David

**Leads din alertele de job.** Fiecare poartă propria cale de verificare, declarată mai jos — nu toate sunt citite direct de pe pagină:

##### Creative Lead & 3D Designer @ MARKQUEN EUROPE (a 2-a zi consecutiv - cel mai bine platit)

Din alerta **Bestjobs** — *Because you searched for design graphic bucuresti jobs / Candidates like you applied for these jobs*

**Cum a fost verificat:** Corpul COMPLET al celor doua emailuri Bestjobs de azi (titlu, angajator, suma 1400-1800, Hybrid, adresa) plus listingul indexat de pe bebee, care confirma firma, profilul si regimul de lucru La sediu. Pagina /en/job/ de pe Bestjobs raspunde 403 - NU am deschis-o.

Cel mai bine platit rol de design din zilele trecute, din nou in alerte. MARKQUEN Europe angajeaza un Creative Lead & 3D Designer in Bucuresti. MARKQUEN e un grup international specializat in POSM, trade marketing si solutii de retail pentru branduri FMCG, cu birouri in Romania, Polonia si Ucraina, proiecte livrate in peste 30 de tari. Adresa din anunt: Strada Promoroaca 5, Bucuresti.

**Cerințe:**

- Rolul combina directie creativa si executie 3D pentru retail si POSM (afisaj, mobilier de retail, retail marketing pentru FMCG)
- Necesa complete in anunt - pagina Bestjobs /en/job/ raspunde 403 la acces automat; descrierea firmei si regimul de lucru sunt pe listingul indexat de pe bebee

**Rate-uri publicate:**

- 1400 - 1800 (suma afisata de Bestjobs, fara mentiune de estimare - deci publicata de angajator)

**Condiții:** Hybrid, Strada Promoroaca 5, Bucuresti. ATENTIE: listarea de pe bebee a aceluiasi rol (3D Designer Retail/POSM) spune La sediu, adica on-site, in timp ce Bestjobs zice Hybrid. Exista discrepanta pe regim - intreaba in aplicatie.

**Cum se aplică:** Aplicare pe anuntul Bestjobs.

> ⚠️ Apare in doua alerte diferite azi, deci e inca activ. Punct slab: 3D si POSM e o nisa diferita de brand identity - daca portofoliul tau e greu de port, suna inainte de a aplica. E si Creative Lead, deci salvare mai mare, dar verifica inainte.

- https://www.bestjobs.eu

##### Bestjobs - tip NOU de alerta: Candidates like you applied for these jobs (18 joburi)

Din alerta **Bestjobs** — *Candidates like you applied for these jobs*

**Cum a fost verificat:** Corpul COMPLET al emailului Bestjobs de azi (18 joburi cu angajator, suma estimata sau publicata, si localizare). Pagina de anunt Bestjobs raspunde 403 - NU am deschis paginile individuale.

Alerta NOUA, care nu a mai aparut pana acum: Bestjobs iti trimite joburile la care au aplicat candidati similari cu tine. Asta e un filtru diferit de cautarea ta - lista e mai larga si mai putin tintita pe design. Ea contine MARKQUEN din nou. Joburile NOI fata de ieri, cu sumele de azi:

| Job | Angajator | Salariu | Locatie |
|---|---|---|---|
| Trade Marketing Specialist | macromex | 1790 - 1980 (estimare) | Bucuresti |
| Consultant management senior | Electrica Furnizare | 1790 - 1980 (estimare) | Bucuresti |
| Brand Executive | Imperial Brands | 1345 - 1485 (estimare) | Bucharest |
| BRAND MANAGER | Maspex | fara suma | Bucuresti |
| Marketing Specialist | Rompetrol | 1345 - 1485 (estimare) | Bucharest |
| Referent Marketing | HUMANITAS FICTION | 1345 - 1485 (estimare) | Piata Presei Libere, Bucuresti |
| Marketing Assistant - Bucuresti | PROHUMAN APT | 1345 - 1485 (estimare) | Bucuresti |
| Content Specialist | Dr.Max | fara suma | Bucuresti |
| Asistent Promovare si Comunicare (2 ani) | BERGERAT MONNOYEUR | fara suma | Bucuresti, Chitila, Mogosoaia |
| Manager comunicare | FUNDATIA DAN VOICULESCU PENTRU | fara suma | (Bucuresti) |

**Cerințe:**

- Pentru fiecare job: portofoliu si CV pe anuntul Bestjobs, din email

**Rate-uri publicate:**

- Cea mai mare suma: Trade Marketing Specialist la macromex, 1790 - 1980 (estimare)
- ATENTIE: estimarile de piata se recalculeaza zilnic - ieri erau 1340-1485 si 1790-1975, azi sunt 1345-1485 si 1790-1980. Nu sunt oferte de angajator, sunt indicii de jobboard

**Condiții:** Toate din alerta zilnica Bestjobs, pe criteriul profilului tau.

**Cum se aplică:** Aplicare pe anuntul Bestjobs, din email.

> ⚠️ Utilitatea acestui tip de alerta: iti arata ce aplica altii similari cu tine, deci e un proxy bun pentru ce se cauta efectiv. Dar lista e plina de roluri de marketing si comunicare - filtreaza pe titlu, nu lua tot. Si nu confunda estimarea de piata cu o oferta: se misca zilnic.

- https://www.bestjobs.eu

##### Bestjobs - lista de 11 joburi de design (a 2-a zi, neschimbata)

Din alerta **Bestjobs** — *Because you searched for design graphic bucuresti jobs*

**Cum a fost verificat:** Corpul COMPLET al emailului Bestjobs de azi. Pagina de anunt Bestjobs raspunde 403 - NU am deschis paginile individuale.

Aceleasi 11 joburi de design ca ieri, cu salariu. Tabelul:

| Job | Angajator | Salariu | Locatie |
|---|---|---|---|
| Creative Lead & 3D Designer | MARKQUEN EUROPE | 1400 - 1800 | Hybrid, Bucuresti |
| Proiectant Productie Publicitara (DISPONIBIL IMEDIAT) | BD Lemntech | 1405 - 2000 | Bucuresti / Popesti-Leordeni |
| Specialist Marketing Digital | Fabrica De Podcasturi | 700 - 1350 | Hybrid, Bucuresti |
| AI Video Editor - Meta & AppLovin Performance Ads | Apex Digital Alliance | 1200 - 1300 | fara oras in anunt |
| Graphic Designer | ELBI ElectricLighting | 1195 - 1325 (estimare de piata) | Bragadiru, Hybrid |
| SudRezidential Videograf & Editor Video | SudRezidential Real Estate | 1000 - 1200 | Bucuresti, Drumul Jilavei 72 |
| ARHITECT / DESIGNER MOBILA LA COMANDA | UNICAN PRODUCTION | 800 - 1420 | Voluntari |
| Operator Grafica, Print & Personalizari | Viragos Design | 800 - 1000 | Bucuresti |
| Colaboratori design grafic, creatie si grafica | AGRESIV MEDIA | 780 - 1020 | Bucuresti |
| Junior Content Creator | INTAX TRADING | 700 | Otopeni |
| Graphic Designer part-time 15h (remote) | CreativeEd Media | 525 | Remote |

**Cerințe:**

- Pentru fiecare job: portofoliu si CV pe anuntul Bestjobs, din email

**Rate-uri publicate:**

- Cel mai mult platit: BD Lemntech, 1405 - 2000 (dar scrie DISPONIBIL IMEDIAT - verifica daca anuntul mai e activ)

**Condiții:** Toate din alerta zilnica Bestjobs, pe criteriul design graphic bucuresti.

**Cum se aplică:** Aplicare pe anuntul Bestjobs, din email.

> ⚠️ Identica cu lista de ieri - deci nimic nou aici, dar niciunul nu a disparut. Suma de la ELBI e estimare de piata, restul sunt publicate de angajator. Turing (3000 si 2000) nu apare in niciuna dintre cele doua liste.

- https://www.bestjobs.eu

##### Cohn & Jansen - a 4-a zi, tot fara localizare publicata (REAPARUT)

Din alerta **IQads (scraping direct)** — *Art Director / Graphic Designer @ Cohn & Jansen*

**Cum a fost verificat:** Pagina IQads a anuntului citita DIRECT (HTTP 200, headerul parsat: companie, nivel, tip job, expirare). Localizarea: absenta de pe pagina si de pe listarile categoriale - reconfirmat azi.

Nu e posting nou (IQads #24000, aparut pe 29.10), dar e inca in catalogul activ si expira pe 27.12.2026. Full Time, nivel Middle si Senior, minimum 5 ani intr-o agentie de publicitate, campanii 360 de la idee la executie, curiozitate fata de noile tehnologii creative.

**Cerințe:**

- Cel putin 5 ani de experienta, ideal intr-o agentie de publicitate
- Experienta cu campanii 360 - de la idee la executie, pe diverse canale
- Ochi pentru detalii si curiositate fata de noile tehnologii creative

**Condiții:** Full Time. Nivel: Middle, Senior. Specializare: Art, Digital, Graphic Designer, Marketing, Social Media. Valabil pana la 2026-12-27.

**Cum se aplică:** Aplicare pe IQads (anuntul #24000).

> ⚠️ IQads NU publica localizarea pentru acest anunt - am verificat din nou pagina de anunt si listarile categoriale (a 4-a zi la rand, tot nimic). De asta sta in verdict amanat cu scor 8: nu stiu unde e. Daca e Bucuresti, scorul sare la 9,6 si ar fi al doilea in tabel. Verifica tu - e o agentie mare, dar nu presupun.

- https://www.iqads.ro/adjob/24000/art-director-graphic-designer-cohn-jansen

---
## 2. Joburi — scorate cu `ALEX-KIT/scoring.gs`

**57 joburi analizate** (IQads 44 + designproject.io 13) → 30 păstrate în tabele, 27 drop-uri, din care **15 cu verdict amânat** (locația nu e publicată de sursă). **0 joburi noi** față de 2026-10-31.

Surse: **IQads** (tabloul AdJob activ, citit azi) + **designproject.io** (România + București).

> ⛔ **Expirate marcate în tabele.** La IQads data de expirare vine direct din anunț. La designproject.io `validThrough` = data postării + 30 zile — măsurat pe toate cele 13 de joburi (13 exacte, 0 cu o zi de fus orar, 0 altfel), deci e o expirare reală, nu o derivare inutilă. 4 joburi din tabele au expirat și nu se mai pot aplica.

| | S | D | L | E |
|---|---|---|---|---|
| **S** — senioritate | 0.35 | | | |
| **D** — disciplină | | 0.30 | | |
| **L** — locație | | | 0.20 | |
| **E** — engagement | | | 0.15 | |

### 2.1 Secțiunea 1 — scor maxim — senior/lead, remote sau București, full-time (12)

| Scor | Tag | S/D/L/E | Rol | Companie | Locație | Engagement | Expirare | Nou |
|---|---|---|---|---|---|---|---|---
| **10** | [B2C] | 10/10/10/10 | Senior Creatives | International Waters | Bucuresti, Hybrid (Office & Remote) | Full Time | expiră 2026-11-01 |
| **9.6** | [DTC] | 10/10/8/10 | Art Director | Mercury360 | Bucuresti | Full Time | expiră 2026-12-25 |
| **9.4** | [DTC] | 10/8/10/10 | Media Relations Specialist | Confident Communications | Bucuresti | Full Time | expiră 2026-11-30 |
| **9.4** | [DTC] | 10/8/10/10 | PR Manager | Confident Communications | Bucuresti | Full Time | expiră 2026-11-30 |
| **9.4** | [B2B] | 10/8/10/10 | Digital Marketing Specialist | Alpha Clinic | Hybrid (Office & Remote) | Full Time | expiră 2026-11-27 |
| **9.4** | [DTC] | 10/8/10/10 | Graphic Designer | LUCA | Bucuresti | Full Time | expiră 2026-11-13 |
| **9.4** | [DTC] | 10/8/10/10 | Account Manager | AdSymphony | Hybrid (Office & Remote) | Full Time | expiră 2026-11-01 |
| **9.4** | [DTC] | 10/8/10/10 | Senior Product Designer | Jobgether | Romania, Fully Remote | Full Time | postat 2026-10-02 · expiră 2026-11-01 |
| **9.4** | [DTC] | 10/8/10/10 | AI Research Lab UI/UX & Brand Designer (100 % remote) (m/f/d) | EWOR GmbH | Bucharest, Romania, Remote Solely | Full Time | postat 2026-09-25 · expiră 2026-10-25 ⛔ **EXPIRAT** |
| **9** | [B2B] | 10/8/8/10 | Social Media Specialist | Viva Credit | Romania | Full Time | expiră 2026-12-12 |
| **8.7** | [DTC] | 8/8/10/10 | Digital Marketing Specialist | GoTech World | Bucuresti, Hybrid (Office & Remote) | Full Time | expiră 2026-11-30 |
| **8.7** | [B2B] | 8/8/10/10 | Graphic Designer | Super Technologies | Romania, Hybrid | Full Time | postat 2026-09-29 · expiră 2026-10-29 ⛔ **EXPIRAT** |

<!-- linkuri -->
- International Waters :: Senior Creatives — https://www.iqads.ro/adjob/23944/senior-creatives-international-waters
- Mercury360 :: Art Director — https://www.iqads.ro/adjob/23999/art-director-mercury360
- Confident Communications :: Media Relations Specialist — https://www.iqads.ro/adjob/23978/media-relations-specialist-confident-communications
- Confident Communications :: PR Manager — https://www.iqads.ro/adjob/23977/pr-manager-confident-communications
- Alpha Clinic :: Digital Marketing Specialist — https://www.iqads.ro/adjob/23970/digital-marketing-specialist-alpha-clinic
- LUCA :: Graphic Designer — https://www.iqads.ro/adjob/23959/graphic-designer-luca
- AdSymphony :: Account Manager — https://www.iqads.ro/adjob/23946/account-manager-adsymphony
- Jobgether :: Senior Product Designer — https://designproject.io/jobs/senior-product-designer-at-jobgether-6r1kga
- EWOR GmbH :: AI Research Lab UI/UX & Brand Designer (100 % remote) (m/f/d) — https://designproject.io/jobs/ai-research-lab-uiux-and-brand-designer-100-percent-remote-mfd-at-ewor-gmbh-teu2mk
- Viva Credit :: Social Media Specialist — https://www.iqads.ro/adjob/23990/social-media-specialist-viva-credit
- GoTech World :: Digital Marketing Specialist — https://www.iqads.ro/adjob/23981/digital-marketing-specialist-gotech-world
- Super Technologies :: Graphic Designer — https://designproject.io/jobs/graphic-designer-at-super-technologies-epi5zr

### 2.2 Secțiunea 2 — contract / B2B — senioritate bună, engagement pe contract (3)

| Scor | Tag | S/D/L/E | Rol | Companie | Locație | Engagement | Expirare | Nou |
|---|---|---|---|---|---|---|---|---
| **8.4** | [B2B] | 8/8/10/8 | English to French Linguist & Copy Editor for Product, Marketing & UI Content | Jobgether | Romania, Fully Remote | Contract | postat 2026-10-02 · expiră 2026-11-01 |
| **8.4** | [DTC] | 8/8/10/8 | Freelance Brand Designer | Mindrift | Romania, Fully Remote | Part Time, Contract | postat 2026-09-25 · expiră 2026-10-25 ⛔ **EXPIRAT** |
| **8.4** | [DTC] | 8/8/10/8 | Freelance Graphic Designer | Mindrift | Romania, Remote Solely | Part Time, Contract | postat 2026-09-21 · expiră 2026-10-21 ⛔ **EXPIRAT** |

<!-- linkuri -->
- Jobgether :: English to French Linguist & Copy Editor for Product, Marketing & UI Content — https://designproject.io/jobs/english-to-french-linguist-and-copy-editor-for-product-marketing-and-ui-content-at-jobgether-j0zyru
- Mindrift :: Freelance Brand Designer — https://designproject.io/jobs/freelance-brand-designer-at-mindrift-ymls4c
- Mindrift :: Freelance Graphic Designer — https://designproject.io/jobs/freelance-graphic-designer-at-mindrift-snjhmz

### 2.3 Secțiunea 3 — mid-level — potrivire bună, senioritate sub prag (0)

*Niciun job în această secțiune.*

### 2.4 Secțiunea 4 — on-site în afara Bucureștiului — doar dacă S=10 și D≥8 (0)

*Niciun job în această secțiune.*

### 2.5 Verdict amânat — locația nu e publicată de sursă (15)

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
| 7.4 | Graphic Designer | Touch Communications | neprecizată de sursă | Full Time | 2026-11-01 |  |
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

### 2.6 Drop-uri (circuit breaker) — 27

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
| Front-end Engineer - SDD UI @ING Hubs Romania | ING | rol necorelabil cu portofoliul — Front-end Engineer - SDD UI @ING Hubs Romania |  |
| Senior Front-End Software Development Engineer (UI Foundations) | Criteo | rol necorelabil cu portofoliul — Senior Front-End Software Development Engineer (UI Foundations) |  |
| Senior Motion Graphic Designer | Jobgether | rol necorelabil cu portofoliul — Senior Motion Graphic Designer |  |

---

## 3. Top 5 joburi cu scor

| # | Scor | Tag | Rol | Companie | Locație | Engagement | Expirat? | De ce contează |
|---|---|---|---|---|---|---|---|---|
| 1 | **10** | [B2C] | Senior Creatives | International Waters | Bucuresti, Hybrid (Office & Remote) | Full Time | nu | S și D maxime |
| 2 | **9.6** | [DTC] | Art Director | Mercury360 | Bucuresti | Full Time | nu | S și D maxime |
| 3 | **9.4** | [DTC] | Media Relations Specialist | Confident Communications | Bucuresti | Full Time | nu | D ridicat de prosa ("social media") |
| 4 | **9.4** | [DTC] | PR Manager | Confident Communications | Bucuresti | Full Time | nu | D ridicat de prosa ("social media") |
| 5 | **9.4** | [B2B] | Digital Marketing Specialist | Alpha Clinic | Hybrid (Office & Remote) | Full Time | nu | D ridicat de prosa ("social media") |

- International Waters :: Senior Creatives — https://www.iqads.ro/adjob/23944/senior-creatives-international-waters
- Mercury360 :: Art Director — https://www.iqads.ro/adjob/23999/art-director-mercury360
- Confident Communications :: Media Relations Specialist — https://www.iqads.ro/adjob/23978/media-relations-specialist-confident-communications
- Confident Communications :: PR Manager — https://www.iqads.ro/adjob/23977/pr-manager-confident-communications
- Alpha Clinic :: Digital Marketing Specialist — https://www.iqads.ro/adjob/23970/digital-marketing-specialist-alpha-clinic

> **Atenție:** din top 5 după scor, 3 **nu sunt roluri de design** (au trecut doar pentru că textul lor conține "social media" sau "art director" — vezi §6.2). Iată top 5 **efectiv de design**, filtrate pe titlu:

| # | Scor | Rol | Companie | Locație | Engagement | Expirat? | De ce contează |
|---|---|---|---|---|---|---|---|
| 1 | **10** | Senior Creatives | International Waters | Bucuresti, Hybrid (Office & Remote) | Full Time | nu | S și D maxime |
| 2 | **9.6** | Art Director | Mercury360 | Bucuresti | Full Time | nu | S și D maxime |
| 3 | **9.4** | Graphic Designer | LUCA | Bucuresti | Full Time | nu | L=10 (remote detectat în text) |
| 4 | **9.4** | Senior Product Designer | Jobgether | Romania, Fully Remote | Full Time | nu | remote |
| 5 | **9.4** | AI Research Lab UI/UX & Brand Designer (100 % remote) (m/f/d) | EWOR GmbH | Bucharest, Romania, Remote Solely | Full Time | ⛔ da | remote |

- International Waters :: Senior Creatives — https://www.iqads.ro/adjob/23944/senior-creatives-international-waters
- Mercury360 :: Art Director — https://www.iqads.ro/adjob/23999/art-director-mercury360
- LUCA :: Graphic Designer — https://www.iqads.ro/adjob/23959/graphic-designer-luca
- Jobgether :: Senior Product Designer — https://designproject.io/jobs/senior-product-designer-at-jobgether-6r1kga
- EWOR GmbH :: AI Research Lab UI/UX & Brand Designer (100 % remote) (m/f/d) — https://designproject.io/jobs/ai-research-lab-uiux-and-brand-designer-100-percent-remote-mfd-at-ewor-gmbh-teu2mk

---

## 4. Postări GENUIN noi (nu doar "absente din raportul de ieri")

> "nou" în tabele înseamnă **"nu era în raportul de ieri"**, nu neapărat "postat azi". Iată ce e postat efectiv nou:

| Sursă | Cum am măsurat | Rezultat |
|---|---|---|
| **IQads** | ID-ul ad-ului crește monoton cu postarea. Cel mai mare ID din setul de ieri: **24003** | **0 anunțuri noi** |
| **designproject.io** | data de publicare vs. ultima rulare | **0 anunțuri noi** — cel mai recent de pe site e din **2026-10-06** |

**Concluzie:** **nicio postare nouă față de ultima rulare.** Piața nu a produs nimic nou relevant azi.


---

## 5. Ce n-a mers, măsurat

1. **3 din 9 categorii nu mai primesc nimic** (2 de 22 zile, 1 n-a fost folosită niciodată). Cauza pentru 3 dintre ele: **nu au filtru creat** (`Personal`, `De raspuns`, `Facturi si Conturi`) — deci nimic nu le poate eticheta, oricare ar fi criteriul. Starea filtrelor, masurata azi: **6 functioneaza, 0 sunt nefunctionale**. ~382 mesaje/7 zile stau in inbox.
2. **designproject.io servește descrieri foarte inegale** (363–30012 de caractere pe cele 13 de joburi, măsurat azi). Cele mai lungi sunt rescrise de AI și injectează cuvinte-cheie care ridică axele — vezi §6.2.
3. **Celelalte două câmpuri de engagement ale designproject.io sunt inutilizabile.** `employmentType` din JSON-LD spune `FULL_TIME` pentru 13 din 13, iar badge-ul din listing spune "Full-time" pentru 13 din 13. Singura sură corectă e linia **"Job Type:"** din descriere — prezentă la 13 din 13. Am folosit asta.
4. **Paginatia IQads nu funcționează.** `?page=2` și `?page=3` servesc exact pagina 0 (aceleași 44 de linkuri — verificat azi pe 0, 2, 3). Catalogul complet e pe pagina 0 — nu iterez pagini.
5. **Cota Google: 118 cereri pe 200** (în limita plafonului). Consumul pe etape:

| Etapă | Cereri |
|---|---|
| `report-mail-count.js` | 68 |
| `report-filter-state.js` | 26 |
| `report-simulate-sort.js` | 9 |
| `report-inbox-counts.js` | 7 |
| `report-folder-discover.js` | 4 |
| `inline` | 1 |
| **total** | **118** |

> Rulare 2026-11-01 (raport zilnic). Contor pornit de la zero.

Ce a consumat cel mai mult: corpurile complete ale mesajelor de azi (7) — fără corp, nu se poate distinge un mesaj care cere răspuns de o alertă automată. **Zero scrieri pe Gmail** — niciun mail trimis, marcat sau arhivat, niciun filtru modificat.

---

## 6. Două semnalări ale motorului de scoring (portul rămâne fidel — decizia e a ta)

### 6.1 "remote" pozitiv fals — 2 joburi

| Rol | Companie | De ce e fals | L |
|---|---|---|---|
| Graphic Designer | LUCA | negatie: `nu se lucreaza remote` | 10 |
| Graphic Designer | Super Technologies | eticheta: `Remote Status: Hybrid` | 10 |

"Remote" apare în text, dar jobul **nu** e remote. `L` ar trebui să fie 8 (București) sau 0 (necunoscut), nu 10. Diferență: **0.4 puncte** per job. Nu am atins motorul — portul e fidel prin design.

### 6.2 Axa D ridicată de prosa, nu de titlu — 14 joburi (17 semnalări)

| Rol | Companie | Ce a ridicat axa | De unde |
|---|---|---|---|
| Media Relations Specialist | Confident Communications | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| PR Manager | Confident Communications | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Digital Marketing Specialist | Alpha Clinic | S=10 prin `"head of"` (—) | prosa anuntului |
| Digital Marketing Specialist | Alpha Clinic | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Account Manager | AdSymphony | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| AI Research Lab UI/UX & Brand Designer (100 % remote) (m/f/d) | EWOR GmbH | S=10 prin `"senior"` (—) | prosa anuntului |
| Digital Marketing Specialist | GoTech World | S=8 prin `"principal"` (—) | prosa anuntului |
| Digital Marketing Specialist | GoTech World | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| English to French Linguist & Copy Editor for Product, Marketing & UI Content | Jobgether | S=8 prin `"lead"` (—) | prosa anuntului |
| English to French Linguist & Copy Editor for Product, Marketing & UI Content | Jobgether | D=8 prin `"ui/ux"` (Core Design) | prosa anuntului |
| Freelance Brand Designer | Mindrift | S=8 prin `"lead"` (—) | prosa anuntului |
| Freelance Graphic Designer | Mindrift | S=8 prin `"lead"` (—) | prosa anuntului |
| Influence & Content Production Manager | Publicis | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Influence Lead | Publicis | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Digital Account Manager | WoPA | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Copywriter | Stefanini Infinit | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Digital Media Specialist / PPC | Stefanini Infinit | D=8 prin `"social media"` (Core Design) | prosa anuntului |

**Ce propun:** ca `D` să se calculeze din **titlul rolului**, nu din textul anunțului, sau măcar ca un rol să poată intra într-o secțiune doar dacă titlul conține o cheie de design. E o decizie de motor — nu am atins `scoring.gs` fără acordul tău.

---

## 7. Fișiere

- `rapoarte/RAPORT-ZILNIC-202611-01.md` — raportul acesta (și în repo)
- `mavis-tools/scoring-result-2026-11-01.json` — scoruri + secțiuni + diagnostice
- `mavis-tools/jobs-iqads-2026-11-01.json` — joburi IQads, text integral
- `mavis-tools/jobs-designproject-2026-11-01.json` — joburi designproject.io, JSON-LD
- `mavis-tools/jobs-2026-10-31.json` — setul normalizat de ieri (cu care s-a comparat)
- `mavis-tools/report-mail-count.json` — numărătoare pe etichetele de categorie
- `mavis-tools/report-inbox-counts.json` — numărătoare exactă inbox
- `mavis-tools/report-simulate-sort.json` — simularea sortării + mesajele de azi
- `mavis-tools/report-source-probe.json` — sonda de surse (comportamentul iqads.ro / designproject.io, măsurat azi)
- `mavis-tools/report-filter-state.json` — starea filtrelor Gmail + testul paranteze-vs-acolade (măsurat azi)
- `mavis-tools/report-triage.js` — clasificatorul mesajelor (needs-reply / needs-action / fyi / noise)
- `mavis-tools/taxonomy.js` — sursa unică pentru numele etichetelor de categorie (rezolvate live, nu hardcodate)

---

*Generat de Mavis Cloud. Nimic nu a fost șters, nimic nu a fost trimis, nimic nu a fost modificat în Gmail sau Drive. Totul e anulabil.*
