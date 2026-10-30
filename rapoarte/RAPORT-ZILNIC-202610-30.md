# Raport zilnic — vineri 30 octombrie 2026

> Generat de Mavis Cloud · 12 mesaje noi măsurate azi (00:00–09:06 EEST) · 59 joburi analizate
> Cota Google: **125 cereri** (plafon 200 — **în limita plafonului**). Zero scrieri pe Gmail; tot consumul a fost măsurare și diagnostic. Detaliu în §5.

---

## 1. Gmail — etichetele de categorie

### 1.1 Rezultatul scurt
**Pe etichetele de categorie a intrat azi: 14 etichete.** În ultimele 24h: 94; în 7 zile: 1069.

Azi au intrat **12 mesaje** în total, iar în inbox sunt **9**. **1 dintre ele nu au primit nicio etichetă de categorie** (nu se potrivesc niciunui filtru de categorie — deci rămân în inbox, neetichetate).

> **14 etichete pe 11 mesaje** — 3 mesaje primesc două etichete de categorie (ex. o alertă de job care intră și la „Joburi" și la „Newsletter"). De aceea suma pe etichete e mai mare decât numărul de mesaje distincte.

### 1.2 Măsurătoarea pe etichete (numărare exactă, cu paginare)

| Etichetă | azi | 24h | 7z | 30z | Ultimul mesaj etichetat |
|---|---|---|---|---|---|
| `MAVIS/Joburi` | 8 | 37 | 117 | 391 | Fri, 30 Oct 2026 |
| `AI Folder/AI si Comunitati` | 2 | 13 | 48 | 142 | Fri, 30 Oct 2026 |
| `Socials` | 1 | 3 | 15 | 174 | Fri, 30 Oct 2026 |
| `Newsletter` | 3 | 37 | 144 | 315 | Fri, 30 Oct 2026 |
| `Finante` | 0 | 1 | 9 | 14 | Thu, 29 Oct 2026 |
| `Personal` | 0 | 0 | 0 | 0 | n/a |
| `De raspuns` | 0 | 0 | 0 | 22 | Fri, 9 Oct 2026  |
| `Facturi si Conturi` | 0 | 0 | 0 | 1 | Fri, 09 Oct 2026 |
| `Optimus CD` | 0 | 3 | 736 | 1023 | Thu, 29 Oct 2026 |

**Concluzie:** 6 categorii primesc mesaje (`MAVIS/Joburi`, `AI Folder/AI si Comunitati`, `Socials`, `Newsletter`, `Finante`, `Optimus CD`); 2 categorii nu primesc nimic de **20 zile** (pe `De raspuns`, `Facturi si Conturi` = **09.10.2026**); o categorie n-a fost folosită niciodată (0 pe 30 de zile, fără istoric) (`Personal`).

> Zero pe o fereastră nu înseamnă "etichetă goală" — înseamnă "eticheta nu mai primește nimic". Verificat pe 4 ferestre.

### 1.3 Filtrele, măsurate azi

Filtre cu criteriu de interogare pe cont: **6**, din 19 total. **6** dintre ele are `addLabelIds`, iar **6** atinge o etichetă de categorie. Criteriul celui de joburi, citit live azi:

```
from:{jooble bestjobs hipo indeed jobleads linkedin} OR subject:{job angajare vacanta oportunitate}
```

#### 6 filtre FUNCȚIONEAZĂ

**6 dintre 6 filtre lovesc efectiv mesaje.** `from:{jooble bestjobs hipo indeed jobleads linkedi…` → **1103** mesaje în 30 de zile, etichetează `joburi`; `from:{substack goatacademy aiautomationsociety sad…` → **395** mesaje în 30 de zile, etichetează `ai`; `from:{skool facebook instagram pinterest tiktok po…` → **145** mesaje în 30 de zile, etichetează `social`; `from:{noreply no-reply newsletter digest mail@ inf…` → **1204** mesaje în 30 de zile, etichetează `newsletter`; `from:{kraken tradingview bitunix coinbase binance}…` → **15** mesaje în 30 de zile, etichetează `finante`; `from:(notifications@github.com OR *jules*) OR subj…` → **1025** mesaje în 30 de zile, etichetează `agenti`


**Inboxul nu se golește.** Măsurat pe cele 12 mesaje de azi, etichetele lor reale: **9 sunt încă în INBOX**, dar **doar 1 au rămas UNREAD**. Deci filtrele **curăță „necitit"**, dar **nu scoate mesajele din inbox**:

| Fereastră | În inbox | În toate stările |
|---|---|---|
| azi | 9 | 12 |
| 24h | 59 | 72 |
| 7z | 404 | 1182 |

**~404 mesaje stau în inbox într-o săptămână** (~58/zi).

### 1.4 Cum ar fi fost sortate mesajele de azi

Simulare pe cele 12 mesaje de azi, cu **aceleași criterii** ale filtrelor (fără scriere):

| Categorie | Mesaje azi |
|---|---|
| `MAVIS/Joburi` | 8 |
| `AI Folder/AI si Comunitati` | 2 |
| `Socials` | 1 |
| `Newsletter` | 2 |
| `Finante` | 0 |
| `Personal` | 0 |
| `De raspuns` | 0 |
| `Facturi si Conturi` | 0 |
| `Optimus CD` | 0 |
| *niciun filtru se potrivește* | 1 |

> Unele mesaje se potrivesc la 2 filtre (ex. "Joburi" + "Newsletter" de la LinkedIn), deci suma poate depăși 12.

**Observație:** **0 mesaje** de azi sunt notificări ale agenților tăi (Jules și GitHub Actions pe repo-urile proprii). Categoria dedicata lor e `Optimus CD`, care a primit 0 mesaje azi, iar filtrul ei functioneaza efectiv. In rest, **6 din 9 categorii** primesc mesaje, iar 3 nu primesc.


### 1.5 Mesajele care chiar necesită răspuns

Clasificarea e făcută din date, nu dintr-o listă scrisă cu mâna: 0 cer răspuns explicit, 4 cer o decizie, 3 sunt alerte de job care nu ating profilul tău, 5 sunt newsletter/promoție, 0 sunt zgomot de pipeline.

**Niciun mesaj nu cere explicit un răspuns.**

**Ceres o decizie sau o acțiune:**

- **Bestjobs** — 05:57 UTC. *These employers are looking for people like you* _(alerta de job cu rol de design)_ — These employers are looking for people like you Top jobs according to your activity: CV entries, job applications and job searches. Hi there, Alexandru Popescu ! Bestie, your career friend, is on What
- **Bestjobs** — 05:48 UTC. *New design graphic bucuresti jobs available on bestjobs* _(alerta de job cu rol de design)_ — New design graphic bucuresti jobs available on bestjobs Top jobs according to your activity: CV entries, job applications and job searches. Hi there, Alexandru Popescu ! Bestie, your career friend, is
- **Bestjobs** — 05:20 UTC. *14 graphic design, bucharest jobs available on bestjobs* _(alerta de job cu rol de design)_ — 14 graphic design, bucharest jobs available on bestjobs Top jobs according to your activity: CV entries, job applications and job searches. Hi there, Alexandru Popescu ! Bestie, your career friend, is
- **Jooble** — 04:55 UTC. *Profitshare caută Web Graphic Designer și 100 mai multe oferte noi de muncă* _(alerta de job cu rol de design)_ — LT-1 new concept 96 Anunțurile dvs. zilnice de oferte de muncă pentru 30 octombrie, 2026 Verificați ofertele noi de muncă pe care le-am găsit pentru dvs. astăzi. Afișați toate ofertele noi de muncă (1

**Alerte de job care NU ating profilul de design** (informativ, 3):

- Jooble — 05:11 UTC · *Dezabonare - Hippo recruitment și altele*
- Indeed — 04:10 UTC · *Administrator Clădiri & Responsabil Parc Auto la Sartorom. Încă 16 locuri de muncă în București, Ilfov*
- Jooble — 00:08 UTC · *🔔 GM-CAD SRL caută Lucrător curățenie camere și 84 mai multe oferte noi de muncă*

**Newsletter / promoție, fără acțiune** (5): Jay E, AI Money Lab (Skool), Substack, David, Alerta eJobs

**Leads din alertele de job.** Fiecare poartă propria cale de verificare, declarată mai jos — nu toate sunt citite direct de pe pagină:

##### Web Graphic Designer @ Profitshare (NOU)

Din alerta **Jooble** — *Profitshare caută Web Graphic Designer și 100 mai multe oferte noi de muncă*

**Cum a fost verificat:** Pagina de cariere a firmei citita DIRECT (profitshare.ro/en/career/18): cerintele complete, rolul in echipa si entitatea legala (Conversion Marketing SRL). Locatia si salariul: absente de pe pagina — confirmat ca nu sunt publicate.

Profitshare (entitatea legala: Conversion Marketing SRL) angajeaza un Web Graphic Designer. Alerta Jooble de azi il numeste drept jobul-cheie — dar corpul emailului e o lista generica de 100 de oferte (UX Designer, ux/ui graphic designer, Graphic design Bucuresti / România), fara detalii despre rol. DETALIILE le-am luat de pe pagina de cariere a firmei, care le publica integral.

**Cerințe:**

- Designer web cu ochiul format pentru user experience (UX) si arhitectura informatiei (AI)
- La zi cu noile trenduri in digital, deschis spre concepte noi si tehnologii noi
- Experienta de lucru de minimum 3 ani
- Instrumente de CRO pentru wireframes si prototype-uri
- Programe din suita Adobe, incepand cu Photoshop si Illustrator
- Familiar cu grid system-urile curente
- Animatii html5 si/sau video reprezinta un avantaj (Google Web Designer, After Effects)
- Notiuni de baza despre marketing afiliat
- Proiecte cu impact la nivel national si international

**Condiții:** Locatie: NEPRECIZATA in anunt. Salariu: nepublicat. Echipa de creatie + UX, alaturi de project manageri si web developeri.

**Cum se aplică:** Aplicare pe pagina oficiala de cariere a firmei (profitshare.ro/en/career/18).

> ⚠️ Excelenta potrivire cu profilul: UX + design + Adobe + animatii, cu 3+ ani ceruti. Doua lucruri lipsesc din anunt si trebuie sa le afli tu: LOCATIA (nici oras, nici remote/onsite) si SALARIUL. In plus, rolul intra in UX ca proces strategic si cere notiuni de marketing afiliat — e un hybrid design/UX, nu graphic design clasic. Inainte sa aplici, intreaba clar remote si buget.

- https://profitshare.ro/en/career/18

##### 3D Video Games Artist @ Atypical Games (NOU)

Din alerta **Bestjobs** — *These employers are looking for people like you*

**Cum a fost verificat:** Text integral al anuntului obtinut din indexarea motorului de cautare pe paginile de listare Bestjobs (titlu, angajator, interval de plata, adresa). Pagina /en/job/ raspunde 403 pentru acces automat — NU am deschis-o.

Atypical Games (studio de jocuri din Bucuresti) angajeaza 3D Video Games Artist. Anuntul a aparut azi in alerta Bestjobs de tip „angajatori care cauta oameni ca tine”. Pe paginile de listare Bestjobs apare in mai multe categorii de design (3D, modelator/animator 3D, game tester), cu acelasi interval de plata.

**Cerințe:**

- Necesa in anunt — pagina Bestjobs /en/job/ raspunde 403 pentru acces automat; am verificat listingul de pe paginile de categorie
- Experienta in 3D pentru jocuri video (modelare, texturare, animatie)
- Portofoliu de lucrari 3D

**Rate-uri publicate:**

- 1000 - 2000 (suma afisata de Bestjobs, fara mentiune „estimare” — deci publicata de angajator)

**Condiții:** Bulevardul Doina Cornea 2F, Bucuresti. Acelasi interval 1000-2000 apare la toate rolurile Atypical Games din listing (2D Game Artist, Free 2 Play Game Designer, C++ Game Programmer 1810-2000) — deci e o banda pe care angajatorul o foloseste la nivel de studio, nu o suma negociata individual.

**Cum se aplică:** Aplicare pe anuntul Bestjobs.

> ⚠️ E un rol de 3D pentru jocuri, nu design de brand — depinde cat de mult te duce jocurile video. Salariul de 1000-2000 e generos, dar e un interval lat folosit de studio pe mai multe roluri, deci nu stiu unde te plaseaza concret. Important: Bestjobs are si roluri conexe la acest studio — Technical Artist UI la EA SPORTS FC si Associate Cinematics Designer la EA Sports (tot Bucuresti) — pe care nu le-am pus in lista de azi pentru ca nu sunt in alertele tale.

- https://www.bestjobs.eu/locuri-de-munca/modelator+animator+3d

##### Bestjobs — 14 joburi de design cu salariu (suma pentru decizie)

Din alerta **Bestjobs** — *New design graphic bucuresti jobs available on bestjobs*

**Cum a fost verificat:** Corpul COMPLET al emailului Bestjobs de azi (titlu, angajator, salariu si locatie pentru fiecare job). Pagina de anunt Bestjobs raspunde 403 — NU am deschis paginile individuale.

Alerta de azi aduce acelasi set de 14 joburi de design — cu SALARIU pentru fiecare (azi la fel ca ieri; asta e o imbunatatire fata de 27-28.10, unde salariul lipsea). Tabelul complet:

| Job | Angajator | Salariu | Locatie |
|---|---|---|---|
| Proiectant Productie Publicitara (DISPONIBIL IMEDIAT) | BD Lemntech | 1405 – 2000 | Bucuresti / Popesti-Leordeni |
| AI Video Editor – Meta & AppLovin Performance Ads | Apex Digital Alliance | 1200 – 1300 | (fara oras in anunt) |
| Graphic Designer | ELBI ElectricLighting | 1195 – 1325 (estimare de piata) | Bragadiru, Hybrid |
| SudRezidential Videograf & Editor Video | SudRezidential Real Estate | 1000 – 1200 | Bucuresti (Drumul Jilavei 72) |
| ARHITECT / DESIGNER MOBILA LA COMANDA | UNICAN PRODUCTION | 800 – 1420 | Voluntari |
| Specialist Marketing Digital | Fabrica De Podcasturi | 700 – 1350 | Hybrid, Bucuresti |
| Operator Grafica, Print & Personalizari | Viragos Design | 800 – 1000 | Bucuresti |
| Colaboratori design grafic, creatie si grafica | AGRESIV MEDIA | 780 – 1020 | Bucuresti |
| Video Editor | BLEU PHARMA | 800 – 1000 | Bucuresti |
| Social Media & Content Creator | AMAL HEALTH CARE | 900 | Hybrid, Bucuresti |
| Junior Content Creator | INTAX TRADING | 700 | Otopeni |
| Graphic Designer part-time 15h (remote) | CreativeEd Media | 525 | Remote |
| Illustrator/Sketcher/Cartoonist (Turing) | Confidential | 3000 | Remote |
| Photographer (Turing) | Confidential | 2000 | Remote |

**Cerințe:**

- Pentru fiecare job: portofoliu + CV pe anuntul Bestjobs, din email

**Rate-uri publicate:**

- Cel mai mult platit: BD Lemntech, 1405 – 2000
- Cea mai buna raport bani/ore: Turing remote (totusi vezi caveat-ul de la leadul separat despre 3000 vs $300)

**Condiții:** Toate din alerta zilnica Bestjobs, pe criteriul „design graphic bucuresti”.

**Cum se aplică:** Aplicare pe anuntul Bestjobs, din email.

> ⚠️ Sumele de la ELBI si BCR sunt „market estimate on similar positions” — NU le publica angajatorul. Restul apar publicate de angajator. Bestjobs /en/job/ raspunde 403 la acces automat, deci valorile vin din corpul emailului (care, spre noroc, poarta si salariul).

- https://www.bestjobs.eu

##### Brand Executive @ Imperial Brands (REAPĂRUT) + roluri de brand NOI azi

Din alerta **Bestjobs** — *These employers are looking for people like you*

**Cum a fost verificat:** Corpul COMPLET al emailului Bestjobs de azi (grupul „angajatori care cauta oameni ca tine”, cu angajator, suma si locatie). Pagina de anunt Bestjobs raspunde 403 pentru acces automat.

Alerta de azi de tip „angajatori care cauta oameni ca tine” a adus un grup de roluri de BRAND si marketing care ieri nu erau acolo. Leadul principal: Brand Executive @ Imperial Brands — acelasi anunt care a fost si in leads din 27.10, deci reaparut, cu salariu afumat acum.

| Rol | Angajator | Salariu | Locatie |
|---|---|---|---|
| Brand Executive | Imperial Brands | 1340 – 1485 (estimare) | Bucharest |
| BRAND MANAGER | FEDERATIA ROMANA DE FOTBAL | 1340 – 1485 (estimare) | Bucuresti |
| BRAND MANAGER | Maspex | fara suma | Bucuresti |
| Director Marketing @ TEZAUR | TEZAUR INVESTMENT GROUP | 1790 – 1975 (estimare) | Sector 1, Bucuresti |
| Marketing Specialist | Rompetrol | 1340 – 1485 (estimare) | Bucharest |
| Consultant management senior | Electrica Furnizare | 1790 – 1975 (estimare) | Bucuresti |
| Account Manager BTL – Brand Activations & Events | Instore Power Provider | 1790 – 1975 (estimare) | Bucuresti |
| Corporate Marketing Director | Working4U Exclusive | 1790 – 1975 (estimare) | Bucuresti/Voluntari/Afumati |

**Cerințe:**

- Necesa in anunt — Bestjobs /en/job/ raspunde 403, deci cerintele nu au putut fi citite de pe pagina
- Din titlu: experienta in brand si/sau marketing, la agentie sau companie mare

**Rate-uri publicate:**

- Cea mai mare suma din grup: 1790 – 1975 (estimare de piata) — la Director Marketing @ TEZAUR, Consultant @ Electrica, Corporate Marketing Director @ Working4U
- Restul grupului: 1340 – 1485 (estimare de piata)

**Condiții:** Toate in Bucuresti (TEZAUR in Sector 1).

**Cum se aplică:** Aplicare pe anuntul Bestjobs, din email.

> ⚠️ ONEST: toate sumele din acest grup sunt „market estimate on similar positions” — Bestjobs le calculeaza din pozitii similare, NU le publica angajatorii. Deci sunt indicii de piata, nu oferte. In plus, sunt roluri de management de brand/marketing, nu de design efectiv — daca urmaresti Traseul 1 (creatie), sunt secundare; daca urmaresti Traseul 2 (proiecte + produse), merita evaluat. Brand Executive la Imperial Brands e cel mai apropiat de profilul tau.

- https://www.bestjobs.eu

##### Jooble — 100 de oferte, cu joburi de design (alerta de azi)

Din alerta **Jooble** — *Profitshare caută Web Graphic Designer și 100 mai multe oferte noi de muncă*

**Cum a fost verificat:** Corpul emailului de alerta (lista de joburi cu titlu si localizare, fara salariu). Joburile individuale NU au fost deschise.

Alerta Jooble de azi are 100 de oferte. Corpul ei listeaza, printre altele: UX Designer (Bucuresti, 40 km), Remote ux/ui graphic designer (Bucuresti, 40 km), Graphic design România (40 km) si Graphic design Bucuresti (40 km) — adica joburi de design remote si din Bucuresti. Nu am intrat in ele unul cate unul: ar fi fost 100 de cereri, iar alerta Jooble nu da nici salariu in corp. Am extras doar leadul cu nume (Profitshare).

**Cerințe:**

- Joburile individuale au pagini proprii pe Jooble, cu detalii si salariu — dar deschiderea lor costa 1 cerere fiecare.

**Condiții:** Bucuresti si remote, cu raza de 40 km in jurul orasului.

**Cum se aplică:** Aplicare prin Jooble.

> ⚠️ Alerta Jooble de azi nu contine salariu in corp — deci NU pot face comparatia de bani ca la Bestjobs. Daca vrei, pot citi paginile joburilor de design din ea (40 km, Remote ux/ui) — costa ~1 cerere Google fiecare.

- https://www.jooble.ro

---
## 2. Joburi — scorate cu `ALEX-KIT/scoring.gs`

**59 joburi analizate** (IQads 46 + designproject.io 13) → 32 păstrate în tabele, 27 drop-uri, din care **15 cu verdict amânat** (locația nu e publicată de sursă). **0 joburi noi** față de 2026-10-29.

Surse: **IQads** (tabloul AdJob activ, citit azi) + **designproject.io** (România + București).

> ⛔ **Expirate marcate în tabele.** La IQads data de expirare vine direct din anunț. La designproject.io `validThrough` = data postării + 30 zile — măsurat pe toate cele 13 de joburi (13 exacte, 0 cu o zi de fus orar, 0 altfel), deci e o expirare reală, nu o derivare inutilă. 4 joburi din tabele au expirat și nu se mai pot aplica.

| | S | D | L | E |
|---|---|---|---|---|
| **S** — senioritate | 0.35 | | | |
| **D** — disciplină | | 0.30 | | |
| **L** — locație | | | 0.20 | |
| **E** — engagement | | | 0.15 | |

### 2.1 Secțiunea 1 — scor maxim — senior/lead, remote sau București, full-time (14)

| Scor | Tag | S/D/L/E | Rol | Companie | Locație | Engagement | Expirare | Nou |
|---|---|---|---|---|---|---|---|---
| **10** | [B2C] | 10/10/10/10 | Senior Creatives | International Waters | Bucuresti, Hybrid (Office & Remote) | Full Time | expiră 2026-11-01 |
| **9.6** | [DTC] | 10/10/8/10 | Art Director | Mercury360 | Bucuresti | Full Time | expiră 2026-12-25 |
| **9.4** | [DTC] | 10/8/10/10 | Media Relations Specialist | Confident Communications | Bucuresti | Full Time | expiră 2026-11-30 |
| **9.4** | [DTC] | 10/8/10/10 | PR Manager | Confident Communications | Bucuresti | Full Time | expiră 2026-11-30 |
| **9.4** | [B2B] | 10/8/10/10 | Digital Marketing Specialist | Alpha Clinic | Hybrid (Office & Remote) | Full Time | expiră 2026-11-27 |
| **9.4** | [DTC] | 10/8/10/10 | Graphic Designer | LUCA | Bucuresti | Full Time | expiră 2026-11-13 |
| **9.4** | [DTC] | 10/8/10/10 | Account Manager | AdSymphony | Hybrid (Office & Remote) | Full Time | expiră 2026-11-01 |
| **9.4** | [B2B] | 10/8/10/10 | Influencer & Creator Marketing Lead | Confident Communications | Bucuresti | Full Time | expiră 2026-10-31 |
| **9.4** | [DTC] | 10/8/10/10 | Senior Product Designer | Jobgether | Romania, Fully Remote | Full Time | postat 2026-10-02 · expiră 2026-11-01 |
| **9.4** | [DTC] | 10/8/10/10 | AI Research Lab UI/UX & Brand Designer (100 % remote) (m/f/d) | EWOR GmbH | Bucharest, Romania, Remote Solely | Full Time | postat 2026-09-25 · expiră 2026-10-25 ⛔ **EXPIRAT** |
| **9** | [B2B] | 10/8/8/10 | Social Media Specialist | Viva Credit | Romania | Full Time | expiră 2026-12-12 |
| **9** | [B2B] | 10/8/8/10 | Social Media Copywriter | Digital Star | Romania | Full Time | expiră 2026-10-30 |
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
- Confident Communications :: Influencer & Creator Marketing Lead — https://www.iqads.ro/adjob/23941/influencer-creator-marketing-lead-confident-agency
- Jobgether :: Senior Product Designer — https://designproject.io/jobs/senior-product-designer-at-jobgether-6r1kga
- EWOR GmbH :: AI Research Lab UI/UX & Brand Designer (100 % remote) (m/f/d) — https://designproject.io/jobs/ai-research-lab-uiux-and-brand-designer-100-percent-remote-mfd-at-ewor-gmbh-teu2mk
- Viva Credit :: Social Media Specialist — https://www.iqads.ro/adjob/23990/social-media-specialist-viva-credit
- Digital Star :: Social Media Copywriter — https://www.iqads.ro/adjob/23940/social-media-copywriter-digital-star
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
| Sr. Account Manager | Saatchi & Saatchi | disciplina nu se potrivește niciunui tier — Sr. Account Manager |  ✅ |
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
| **IQads** | ID-ul ad-ului crește monoton cu postarea. Cel mai mare ID din setul de ieri: **24002** | **1 anunț nou** |
| **designproject.io** | data de publicare vs. ultima rulare | **0 anunțuri noi** — cel mai recent de pe site e din **2026-10-06** |

- **IQads #24003** — Sr. Account Manager @ Saatchi & Saatchi (expiră 2026-12-28) — https://www.iqads.ro/adjob/24003/sr-account-manager-saatchi-saatchi
**Concluzie:** 1 postare nou de la ultima rulare.


---

## 5. Ce n-a mers, măsurat

1. **3 din 9 categorii nu mai primesc nimic** (2 de 20 zile, 1 n-a fost folosită niciodată). Cauza pentru 3 dintre ele: **nu au filtru creat** (`Personal`, `De raspuns`, `Facturi si Conturi`) — deci nimic nu le poate eticheta, oricare ar fi criteriul. Starea filtrelor, masurata azi: **6 functioneaza, 0 sunt nefunctionale**. ~404 mesaje/7 zile stau in inbox.
2. **designproject.io servește descrieri foarte inegale** (363–30012 de caractere pe cele 13 de joburi, măsurat azi). Cele mai lungi sunt rescrise de AI și injectează cuvinte-cheie care ridică axele — vezi §6.2.
3. **Celelalte două câmpuri de engagement ale designproject.io sunt inutilizabile.** `employmentType` din JSON-LD spune `FULL_TIME` pentru 13 din 13, iar badge-ul din listing spune "Full-time" pentru 13 din 13. Singura sură corectă e linia **"Job Type:"** din descriere — prezentă la 13 din 13. Am folosit asta.
4. **Paginatia IQads nu funcționează.** `?page=2` și `?page=3` servesc exact pagina 0 (aceleași 46 de linkuri — verificat azi pe 0, 2, 3). Catalogul complet e pe pagina 0 — nu iterez pagini.
5. **Cota Google: 125 cereri pe 200** (în limita plafonului). Consumul pe etape:

| Etapă | Cereri |
|---|---|
| `report-mail-count.js` | 69 |
| `report-filter-state.js` | 26 |
| `report-simulate-sort.js` | 14 |
| `report-inbox-counts.js` | 8 |
| `report-folder-discover.js` | 4 |
| `inline` | 1 |
| **total** | **125** |

> Rulare 2026-10-30 (raport zilnic). Contor pornit de la zero.

Ce a consumat cel mai mult: corpurile complete ale mesajelor de azi (12) — fără corp, nu se poate distinge un mesaj care cere răspuns de o alertă automată. **Zero scrieri pe Gmail** — niciun mail trimis, marcat sau arhivat, niciun filtru modificat.

---

## 6. Două semnalări ale motorului de scoring (portul rămâne fidel — decizia e a ta)

### 6.1 "remote" pozitiv fals — 2 joburi

| Rol | Companie | De ce e fals | L |
|---|---|---|---|
| Graphic Designer | LUCA | negatie: `nu se lucreaza remote` | 10 |
| Graphic Designer | Super Technologies | eticheta: `Remote Status: Hybrid` | 10 |

"Remote" apare în text, dar jobul **nu** e remote. `L` ar trebui să fie 8 (București) sau 0 (necunoscut), nu 10. Diferență: **0.4 puncte** per job. Nu am atins motorul — portul e fidel prin design.

### 6.2 Axa D ridicată de prosa, nu de titlu — 15 joburi (18 semnalări)

| Rol | Companie | Ce a ridicat axa | De unde |
|---|---|---|---|
| Media Relations Specialist | Confident Communications | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| PR Manager | Confident Communications | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Digital Marketing Specialist | Alpha Clinic | S=10 prin `"head of"` (—) | prosa anuntului |
| Digital Marketing Specialist | Alpha Clinic | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Account Manager | AdSymphony | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Influencer & Creator Marketing Lead | Confident Communications | D=8 prin `"social media"` (Core Design) | prosa anuntului |
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

- `rapoarte/RAPORT-ZILNIC-202610-30.md` — raportul acesta (și în repo)
- `mavis-tools/scoring-result-2026-10-30.json` — scoruri + secțiuni + diagnostice
- `mavis-tools/jobs-iqads-2026-10-30.json` — joburi IQads, text integral
- `mavis-tools/jobs-designproject-2026-10-30.json` — joburi designproject.io, JSON-LD
- `mavis-tools/jobs-2026-10-29.json` — setul normalizat de ieri (cu care s-a comparat)
- `mavis-tools/report-mail-count.json` — numărătoare pe etichetele de categorie
- `mavis-tools/report-inbox-counts.json` — numărătoare exactă inbox
- `mavis-tools/report-simulate-sort.json` — simularea sortării + mesajele de azi
- `mavis-tools/report-source-probe.json` — sonda de surse (comportamentul iqads.ro / designproject.io, măsurat azi)
- `mavis-tools/report-filter-state.json` — starea filtrelor Gmail + testul paranteze-vs-acolade (măsurat azi)
- `mavis-tools/report-triage.js` — clasificatorul mesajelor (needs-reply / needs-action / fyi / noise)
- `mavis-tools/taxonomy.js` — sursa unică pentru numele etichetelor de categorie (rezolvate live, nu hardcodate)

---

*Generat de Mavis Cloud. Nimic nu a fost șters, nimic nu a fost trimis, nimic nu a fost modificat în Gmail sau Drive. Totul e anulabil.*
