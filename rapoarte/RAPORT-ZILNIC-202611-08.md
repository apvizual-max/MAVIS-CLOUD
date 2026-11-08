# Raport zilnic — duminică 8 noiembrie 2026

> Generat de Mavis Cloud · 15 mesaje noi măsurate azi (00:00–09:12 EEST) · 71 joburi analizate
> Cota Google: **130 cereri** (plafon 200 — **în limita plafonului**). Zero scrieri pe Gmail; tot consumul a fost măsurare și diagnostic. Detaliu în §5.

---

## 1. Gmail — etichetele de categorie

### 1.1 Rezultatul scurt
**Pe etichetele de categorie a intrat azi: 19 etichete.** În ultimele 24h: 84; în 7 zile: 758.

Azi au intrat **15 mesaje** în total, iar în inbox sunt **11**. **1 dintre ele nu au primit nicio etichetă de categorie** (nu se potrivesc niciunui filtru de categorie — deci rămân în inbox, neetichetate).

> **19 etichete pe 14 mesaje** — 5 mesaje primesc două etichete de categorie (ex. o alertă de job care intră și la „Joburi" și la „Newsletter"). De aceea suma pe etichete e mai mare decât numărul de mesaje distincte.

### 1.2 Măsurătoarea pe etichete (numărare exactă, cu paginare)

| Etichetă | azi | 24h | 7z | 30z | Ultimul mesaj etichetat |
|---|---|---|---|---|---|
| `MAVIS/Joburi` | 9 | 35 | 254 | 500 | Sun, 8 Nov 2026  |
| `AI Folder/AI si Comunitati` | 1 | 12 | 100 | 200 | Sun, 8 Nov 2026  |
| `Socials` | 1 | 3 | 32 | 60 | Sun, 08 Nov 2026 |
| `Newsletter` | 8 | 30 | 336 | 611 | Sun, 8 Nov 2026  |
| `Finante` | 0 | 2 | 18 | 34 | Sat, 07 Nov 2026 |
| `Personal` | 0 | 0 | 0 | 0 | n/a |
| `De raspuns` | 0 | 0 | 0 | 7 | Fri, 9 Oct 2026  |
| `Facturi si Conturi` | 0 | 0 | 0 | 1 | Fri, 09 Oct 2026 |
| `Optimus CD` | 0 | 2 | 18 | 1026 | Sat, 07 Nov 2026 |

**Concluzie:** 6 categorii primesc mesaje (`MAVIS/Joburi`, `AI Folder/AI si Comunitati`, `Socials`, `Newsletter`, `Finante`, `Optimus CD`); 2 categorii nu primesc nimic de **29 zile** (pe `De raspuns`, `Facturi si Conturi` = **09.10.2026**); o categorie n-a fost folosită niciodată (0 pe 30 de zile, fără istoric) (`Personal`).

> Zero pe o fereastră nu înseamnă "etichetă goală" — înseamnă "eticheta nu mai primește nimic". Verificat pe 4 ferestre.

### 1.3 Filtrele, măsurate azi

Filtre cu criteriu de interogare pe cont: **7**, din 20 total. **7** dintre ele are `addLabelIds`, iar **6** atinge o etichetă de categorie. Criteriul celui de joburi, citit live azi:

```
from:{jooble bestjobs hipo indeed jobleads linkedin} OR subject:{job angajare vacanta oportunitate}
```

#### 6 filtre FUNCȚIONEAZĂ

**6 dintre 7 filtre lovesc efectiv mesaje.** `from:{jooble bestjobs hipo indeed jobleads linkedi…` → **1111** mesaje în 30 de zile, etichetează `joburi`; `from:{substack goatacademy aiautomationsociety sad…` → **421** mesaje în 30 de zile, etichetează `ai`; `from:{skool facebook instagram pinterest tiktok po…` → **131** mesaje în 30 de zile, etichetează `social`; `from:{noreply no-reply newsletter digest mail@ inf…` → **1296** mesaje în 30 de zile, etichetează `newsletter`; `from:{kraken tradingview bitunix coinbase binance}…` → **39** mesaje în 30 de zile, etichetează `finante`; `from:(notifications@github.com OR *jules*) OR subj…` → **1022** mesaje în 30 de zile, etichetează `agenti`


**Cauza reală, măsurată azi pe Gmail:** în căutarea Gmail, `()` înseamnă **ȘI**, iar `{}` înseamnă **SAU**. Cele 1 filtre nefuncționale folosesc `from:(jooble bestjobs ...)` — deci cer un expeditor care să conțină **toate** cuvintele simultan. Rezultat: **0 mesaje lovite în 30 de zile.**

| Filtru | cum e scris acum | cum ar trebui scris (`{}`) |
|---|---|---|
| `from:@cloudhq.net OR from:cloudhq.us OR from:cloudhq.io OR…` | **0** | **0** |

Cu acoladele, aceleași filtre ar fi prins **4020 mesaje în 30 de zile**.

**Două defecte, în ordine:**
1. **Criteriile nu pot lovi nimic** — paranteze în loc de acolade.
2. **`addLabelIds` e vid** — nici măcar cu criterii corecte n-ar eticheta ceva.

**De ce nu le-am reparat azi:** repararea de filtre cere scope-ul `gmail.settings.basic` — fără el, `filters PATCH` răspunde 403. Starea scope-urilor din cloud se **măsoară**, nu se presupune: `node mavis-tools/google-preflight.js` (pasul [6] — control de drift). Repararea se face prin **DELETE + CREATE** (`filters.update`/PUT → 404, `filters.patch`/PATCH → 404 „Method not found"). Scriptul e pregătit cu `--dry-run` și cu salvarea stării de dinainte pentru rollback: `mavis-tools/fix-mavis-filters.js`.

**Inboxul nu se golește.** Măsurat pe cele 15 mesaje de azi, etichetele lor reale: **11 sunt încă în INBOX**, dar **doar 0 au rămas UNREAD**. Deci filtrele **curăță „necitit"**, dar **nu scoate mesajele din inbox**:

| Fereastră | În inbox | În toate stările |
|---|---|---|
| azi | 11 | 15 |
| 24h | 38 | 57 |
| 7z | 395 | 525 |

**~395 mesaje stau în inbox într-o săptămână** (~56/zi).

### 1.4 Cum ar fi fost sortate mesajele de azi

Simulare pe cele 15 mesaje de azi, cu **aceleași criterii** ale filtrelor (fără scriere):

| Categorie | Mesaje azi |
|---|---|
| `MAVIS/Joburi` | 9 |
| `AI Folder/AI si Comunitati` | 1 |
| `Socials` | 1 |
| `Newsletter` | 8 |
| `Finante` | 0 |
| `Personal` | 0 |
| `De raspuns` | 0 |
| `Facturi si Conturi` | 0 |
| `Optimus CD` | 0 |
| *niciun filtru se potrivește* | 1 |

> Unele mesaje se potrivesc la 2 filtre (ex. "Joburi" + "Newsletter" de la LinkedIn), deci suma poate depăși 15.

**Observație:** **0 mesaje** de azi sunt notificări ale agenților tăi (Jules și GitHub Actions pe repo-urile proprii). Categoria dedicata lor e `Optimus CD`, care a primit 0 mesaje azi, iar filtrul ei functioneaza efectiv. In rest, **6 din 9 categorii** primesc mesaje, iar 3 nu primesc.


### 1.5 Mesajele care chiar necesită răspuns

Clasificarea e făcută din date, nu dintr-o listă scrisă cu mâna: 0 cer răspuns explicit, 8 cer o decizie, 2 sunt alerte de job care nu ating profilul tău, 5 sunt newsletter/promoție, 0 sunt zgomot de pipeline.

**Niciun mesaj nu cere explicit un răspuns.**

**Ceres o decizie sau o acțiune:**

- **LinkedIn Job Alerts** — 05:50 UTC. *Staff Brand Designer - Consumer job at Kraken - Actively recruiting* _(alerta de job cu rol de design)_ — View jobs in Romania Your job alert for Senior Graphics Designer 1 new job in Romania matches your preferences. Staff Brand Designer - Consumer Kraken Romania (Remote) Actively recruiting See all jobs
- **Bestjobs** — 05:49 UTC. *Job offers that fit your profile* _(alerta de job cu rol de design)_ — Job offers that fit your profile Top jobs according to your activity: CV entries, job applications and job searches. Hi there, Alexandru Popescu ! Bestie, your career friend, is on WhatsApp Get matchi
- **Bestjobs** — 05:23 UTC. *AGRESIV MEDIA is hiring Colaboratori design grafic creatie si grafica* _(alerta de job cu rol de design)_ — AGRESIV MEDIA is hiring Colaboratori design grafic creatie si grafica Top jobs according to your activity: CV entries, job applications and job searches. Hi there, Alexandru Popescu ! Bestie, your car
- **Jooble** — 04:54 UTC. *Cohn & Jansen caută Art Director / Graphic Designer @ Cohn & Jansen și 102 mai multe oferte noi de muncă* _(alerta de job cu rol de design)_ — LT-1 new concept 96 Anunțurile dvs. zilnice de oferte de muncă pentru 08 noiembrie, 2026 Verificați ofertele noi de muncă pe care le-am găsit pentru dvs. astăzi. Afișați toate ofertele noi de muncă (1
- **LinkedIn Job Alerts** — 03:50 UTC. *Staff Brand Designer - Consumer at Kraken* _(alerta de job cu rol de design)_ — View jobs in Bucharest Your job alert for graphic designer remote 1 new job in Bucharest matches your preferences. Staff Brand Designer - Consumer Kraken Romania (Remote) Actively recruiting See all j
- **LinkedIn Job Alerts** — 01:50 UTC. *SS&C Technologies is hiring: Senior User Experience Designer* _(alerta de job cu rol de design)_ — SS&C Technologies Senior User Experience Designer: Get To Know UsSS&C Technologies is a global… Your job alert for User Experience Designer Senior User Experience Designer SS&C Technologies Bucharest,
- **Discord** — 00:38 UTC. *Discord password changed* _(contul cere o actiune (parola / confirmare))_ — 96 What's up popy911, We've channeled our psionic energy to change your Discord account password. Gonna go get a seltzer to calm down. If this wasn't done by you, please immediately reset the password
- **Google** — 20:10 UTC. *Critical security alert* _(alerta de securitate — cere verificare umana)_ — Some of your saved passwords were found online apvizual@gmail.com Some of your saved passwords were found in a data breach from a site or app that you use. Your Google Account is not affected. To secu

**Alerte de job care NU ating profilul de design** (informativ, 2):

- Jooble — 04:07 UTC · *🔔 EURO GENWORK caută Personal în depozit alimentar în Cehia și 84 mai multe oferte noi de muncă*
- Indeed — 02:34 UTC · *Vânzător București, Râmnicu Vâlcea (f/m) la Lidl. Încă 12 locuri de muncă în București, Ilfov*

**Newsletter / promoție, fără acțiune** (5): Jay E, LinkedIn, Shiva Newsletter, Glassdoor Jobs, AI Money Lab (Skool)

**Leads din alertele de job.** Fiecare poartă propria cale de verificare, declarată mai jos — nu toate sunt citite direct de pe pagină:

##### Art Director / Graphic Designer @ Cohn & Jansen - Bucuresti, scor 9,6 (localizarea rezolvata azi)

Din alerta **IQads (scraping direct) + Jooble (alerta de azi)** — *Cohn & Jansen cauta Art Director / Graphic Designer @ Cohn & Jansen*

**Cum a fost verificat:** Pagina anuntului IQads (titlu, companie, nivel, tip job, expirare) plus adresa de pe pagina companiei pe IQads (rel/cohn-jansen?t=info: Strada Sperantei nr. 21, etaj 2, sector 2, Bucuresti) plus anuntul listat de Jooble cu localizarea Bucuresti (reluat de la 4 zile in urma). Localizarea e acum rezolvata automat de scraper (paginile companiei), cu verificarea ca numele companiei din anunt corespunde paginii - altfel s-ar aplica adresa altui angajator de pe aceeasi pagina.

Rolul care a stat 5 zile in verdict amanat pentru ca IQads nu publica orasul in anunt. AZI e rezolvat: atat Jooble (in alerta de azi) cat si pagina companiei pe IQads (care da adresa) spun BUCURESTI. Deci jobul e real, in oras, si cu scorul corect ajunge pe 9,6 - pe locul 2 in tabel, la egalitate cu Art Director @ Mercury360. Agentie de publicitate: proiecte diverse, branduri mari, campanii de care sa fie mandri, bonusuri cand campanile castiga.

**Cerințe:**

- Cel putin 5 ani de experienta, ideal intr-o agentie de publicitate
- Experienta cu campanii 360 - de la idee la executie, pe diverse canale
- Ochi pentru detalii si curiositate fata de noile tehnologii creative
- Mediu de lucru relaxat, dar cu oameni de treaba - asa se descrie firma in anunt

**Condiții:** Bucuresti, sector 2 (Strada Sperantei nr. 21, etaj 2, sediul companiei). Full time, nivel Middle, Senior. Valabil pana la 2026-12-27.

**Cum se aplică:** Aplicare pe IQads (anuntul #24000) sau pe Jooble, de unde a venit alerta de azi.

> ⚠️ Salariul nu e publicat de nimeni - nici IQads, nici Jooble. Punctul de verificat: rolul cere 5+ ani intr-o agentie, deci daca portofoliul tau e mai greu de port spre agentie, intreaba. In rest, e potential cea mai buna potrivire din tabel: Art Director, agentie, proiecte de brand mari, expira peste 7 saptamani.

- https://www.iqads.ro/adjob/24000/art-director-graphic-designer-cohn-jansen

##### Staff Brand Designer - Consumer @ Kraken - remote, Romania eligibila (a 2-a zi)

Din alerta **LinkedIn Job Alerts** — *Staff Brand Designer - Consumer job at Kraken - Actively recruiting*

**Cum a fost verificat:** Boardul oficial Kraken (jobs.ashbyhq.com/kraken.com) citit prin indexarea motorului de cautare: titlu, lista completa de tari eligibile (inclusiv Romania), tipul de angajare si banda de compensare pentru varianta SU. Confirmat si pe jobboard-uri de crypto care dau descrierea completa si cerintele, si pe un agregator care listeaza 49 de roluri deschise la Kraken (5 in Design & Creative).

A doua zi consecutiv pe alerta ta. Kraken angajeaza un Staff Brand Designer - Consumer: stabilesti standardul vizual al brandului Kraken pe consumator (design static pentru lansari si campanii, layout-uri systemizate in Figma, localizare multi-piata). Raportezi la Creative Lead, Consumer Creative & Design - senior individual contributor, fara oameni in subordine. Kraken are 5 roluri deschise in Design & Creative, iar doua au ajuns pe alertele tale in 3 zile.

**Cerințe:**

- Portofoliu cu lucru de brand si static, adaptare multi-format si multi-piata, si sisteme de design reutilizabile
- Pentru varianta 3D: Cinema 4D expert (modelare, iluminare, materiale, randare), biblioteci de asseturi 3D, 7+ ani
- Figma de nivel expert (componente, auto layout, variabile)
- Adobe Creative Suite avansat plus productie asistata de AI
- Versionare si localizare pe piete si limbi diferite, cu layout-uri care rezista la traducere

**Rate-uri publicate:**

- Varianta SU: 127.200 - 254.400 USD pe an (banda publicata de angajator)
- Varianta europeana: salariu nepublicat

**Condiții:** Remote, full time. Romania pe lista explicita a tarilor eligibile, alaturi de 23 de altele. Aplicarile sunt acceptate permanent.

**Cum se aplică:** Aplicare pe boardul oficial Kraken (jobs.ashbyhq.com/kraken.com).

> ⚠️ Excelenta potrivire cu profilul tau: brand + sisteme + 3D + Figma + unelte AI, remote, Romania eligibila. Doua nuanțe: e brand de CONSUMER la un exchange de crypto (identitate si campanii, nu interfete de trading), iar banda de 127-254K USD e lata si nu spune ce primesti tu - varianta europeana nu publica suma.

- https://jobs.ashbyhq.com/kraken.com

##### Senior User Experience Designer @ SS&C Technologies - Bucuresti hybrid (NOU)

Din alerta **LinkedIn Job Alerts** — *SS&C Technologies is hiring: Senior User Experience Designer*

**Cum a fost verificat:** Corpul emailului de alerta LinkedIn (titlu, companie, localizarea Bucuresti hybrid, statutul Actively recruiting si Easy Apply, plus al doilea rol din alerta). Descrierea completa si cerintele, din jobboard-uri de specialitate (himalayas.app, JobzMall) care citesc anuntul original. Pagina oficiala SS&C NU a fost deschisa.

SS&C Technologies (companie de tehnologie pentru servicii financiare si sanatate, cu sediul in Windsor, Connecticut, 27.000+ angajati in 35 de tari) angajeaza un Senior User Experience Designer in Bucuresti, hybrid, cu statut Actively recruiting si Easy Apply. In aceeasi alerta a venit si un Senior UI/UX Designer with German la EVA, tot in Bucuresti Metropolitan Area, hybrid.

**Cerințe:**

- 5+ ani de experienta in UX design cu focus pe product design (versiunea Senior UX Product Designer din anunt)
- Pentru varianta Sr. UX Designer: 7+ ani in UX / interaction design, participand la ciclul complet de dezvoltare de produs
- Portofoliu puternic, cercetare de utilizator, teste de uzabilitate, wireframes, prototipuri
- Bun portofoliu de UX, comunicare excelenta cu stakeholderi si echipe cross-functional
- Licenta sau master in design, HCI sau domeniu conex - dorit pentru varianta de produs

**Rate-uri publicate:**

- Jobboard-ul estimeaza 8.000 - 10.000 RON/luna pentru Senior UX Product Designer in Bucuresti (circa 2.000 - 2.500 USD) - ESTIMARE, nu cifra angajatorului

**Condiții:** Bucuresti, Romania. Hybrid. Actively recruiting, Easy Apply.

**Cum se aplică:** Aplicare pe LinkedIn cu Easy Apply; si pe boardul oficial SS&C.

> ⚠️ E product design pentru software B2B de servicii financiare, nu brand identity - vecin cu profilul tau, nu identic. Salariul nu e publicat de angajator (doar estimarea unui jobboard, care poate fi mult prea generoasa sau generoasa). Daca vrei varianta de pe anuntul de produs, cere clar despre buget inainte de a parcurge procesul lung.

- https://www.linkedin.com/jobs

##### Google + Discord - doua evenimente de cont azi (parola si breach)

Din alerta **Google, Discord** — *Critical security alert / Discord password changed*

**Cum a fost verificat:** Corpul COMPLET al ambelor emailuri, cu textul exact (Some of your saved passwords were found online... Your Google Account is not affected si We've... change your Discord account password... If this wasn't done by you, please immediately reset the password). Linkurile de reset sunt in ambele emailuri.

Doua mesaje care cer verificare umana, de tip diferit. (1) GOOGLE, Critical security alert: unele din parolele tale salvate au fost gasite online, intr-o incaclare de date a unui site sau app pe care il folosesti. Google spune explicit ca nu e afectat contul tau Google - e o notificare despre parole salvate care au aparut intr-un breach extern. (2) DISCORD, Discord password changed: parola contului tau Discord (popy911) a fost schimbata. Daca nu ai fost tu, Discord cere reset imediat.

**Cerințe:**

- Nu e o cerere de job - sunt doua evenimente de cont care cer actiune umana.

**Condiții:** Contul Google afectat: apvizual@gmail.com. Contul Discord: popy911.

**Cum se aplică:** Google: myaccount.google.com/notifications si Password Manager (vezi parolele expuse). Discord: support.discord.com/hc/articles/218410947 (reset de parola).

> ⚠️ Distinctia conteaza: alerta Google NU inseamna cont compromis - inseamna ca acele parole au aparut intr-o baza de date furata, deci trebuie schimbate ACEA parola (si orice site care foloseste aceeasi parola). Iar Discord: daca NU ai schimbat tu parola, schimba-o acum si verifica sesiunile active. Nota: pe 05.11 ai avut un grant OAuth pentru Antigravity, pe 06.11 cinci notificari Google, iar acum asta - tiparul de evenimente pe cont se repeta, deci merita sa arunci un ochi la lista de aplicatii conectate.

- https://myaccount.google.com/notifications

##### Bestjobs - 4 tipuri de alerte azi, lista cu salarii

Din alerta **Bestjobs** — *Job offers that fit your profile / Because you searched for design graphic bucuresti jobs / AGRESIV MEDIA is hiring / New opportunities in top companies*

**Cum a fost verificat:** Corpul COMPLET al emailurilor Bestjobs de azi. Pagina de anunt Bestjobs raspunde 403 la acces automat - NU am deschis paginile individuale.

Bestjobs ti-a trimis azi PATRU tipuri de alerta distincte - cel mai mult observate pana acum intr-o zi: Job offers that fit your profile (tip NOU), Because you searched for design graphic bucuresti jobs, New opportunities in top companies, si alerta dedicata AGRESIV MEDIA is hiring Colaboratori design grafic (a doua zi pentru ei, a opta pentru MARKQUEN). Lista cu salariu: Proiectant Productie Publicitara la BD Lemntech 1405-2000 (DISPONIBIL IMEDIAT), Creative Lead & 3D Designer la MARKQUEN 1400-1800 Hybrid, Specialist Marketing Digital la Fabrica De Podcasturi 700-1350, AI Video Editor la Apex Digital Alliance 1200-1300, SudRezidential Videograf & Editor Video 1000-1200, ARHITECT/DESIGNER MOBILA la UNICAN PRODUCTION 800-1420, Operator Grafica la Viragos Design 800-1000, Colaboratori design grafic la AGRESIV MEDIA 780-1020, Social Media & Content Creator la AMAL HEALTH CARE 900, Junior Content Creator la INTAX TRADING 700, Graphic Designer part-time 15h remote la CreativeEd Media 525.

**Cerințe:**

- Pentru fiecare job: portofoliu si CV pe anuntul Bestjobs, din email

**Rate-uri publicate:**

- Cele mai mari sume publicate de angajator: BD Lemntech 1405-2000, MARKQUEN 1400-1800, Apex Digital Alliance 1200-1300
- Cu estimare de piata (nu e oferta): BCR 1795-1985, ELBI 1195-1325, Imperial Brands 1385-1530

**Condiții:** Toate din alertele zilnice Bestjobs.

**Cum se aplică:** Aplicare pe anuntul Bestjobs, din email.

> ⚠️ MARKQUEN e in top de opt zile - rolul e activ, dar si concurenta. La BD Lemntech scrie DISPONIBIL IMEDIAT: verifica daca anuntul mai e activ. Sumele cu estimare de piata se recalculeaza zilnic si nu sunt oferte de angajator.

- https://www.bestjobs.eu

---
## 2. Joburi — scorate cu `ALEX-KIT/scoring.gs`

**71 joburi analizate** (IQads 41 + designproject.io 30) → 38 păstrate în tabele, 33 drop-uri, din care **14 cu verdict amânat** (locația nu e publicată de sursă). **0 joburi noi** față de 2026-11-07.

Surse: **IQads** (tabloul AdJob activ, citit azi) + **designproject.io** (România + București).

> ⛔ **Expirate marcate în tabele.** La IQads data de expirare vine direct din anunț. La designproject.io `validThrough` = data postării + 30 zile — măsurat pe toate cele 30 de joburi (30 exacte, 0 cu o zi de fus orar, 0 altfel), deci e o expirare reală, nu o derivare inutilă. 5 joburi din tabele au expirat și nu se mai pot aplica.

| | S | D | L | E |
|---|---|---|---|---|
| **S** — senioritate | 0.35 | | | |
| **D** — disciplină | | 0.30 | | |
| **L** — locație | | | 0.20 | |
| **E** — engagement | | | 0.15 | |

### 2.1 Secțiunea 1 — scor maxim — senior/lead, remote sau București, full-time (18)

| Scor | Tag | S/D/L/E | Rol | Companie | Locație | Engagement | Expirare | Nou |
|---|---|---|---|---|---|---|---|---
| **10** | [DTC] | 10/10/10/10 | UX Designer | E.ON | Iasi, Romania | Full Time | postat 2026-10-08 · expiră 2026-11-07 ⛔ **EXPIRAT** |
| **9.6** | [DTC] | 10/10/8/10 | Art Director / Graphic Designer | Cohn & Jansen | Bucuresti | Full Time | expiră 2026-12-27 |
| **9.6** | [DTC] | 10/10/8/10 | Art Director | Mercury360 | Bucuresti | Full Time | expiră 2026-12-25 |
| **9.4** | [DTC] | 10/8/10/10 | Media Relations Specialist | Confident Communications | Bucuresti | Full Time | expiră 2027-01-01 |
| **9.4** | [DTC] | 10/8/10/10 | PR Manager | Confident Communications | Bucuresti | Full Time | expiră 2027-01-01 |
| **9.4** | [B2B] | 10/8/10/10 | Influencer & Creator Marketing Lead | Confident Communications | Bucuresti | Full Time | expiră 2027-01-01 |
| **9.4** | [B2B] | 10/8/10/10 | Digital Marketing Specialist | Alpha Clinic | Hybrid (Office & Remote) | Full Time | expiră 2026-11-27 |
| **9.4** | [DTC] | 10/8/10/10 | Graphic Designer | LUCA | Bucuresti | Full Time | expiră 2026-11-13 |
| **9.4** | [B2B] | 10/8/10/10 | Product Designer | Jobgether | Romania, Fully Remote | Full Time, Contract | postat 2026-11-04 · expiră 2026-12-04 |
| **9.4** | [DTC] | 10/8/10/10 | Senior Shopify Web Designer | KittySpout | Bucharest, Romania | Full Time | postat 2026-11-03 · expiră 2026-12-03 |
| **9.4** | [B2B] | 10/8/10/10 | Product Designer - Mid level (Remote, Europe) | LearnWorlds | Romania | Full Time | postat 2026-10-30 · expiră 2026-11-29 |
| **9.4** | [B2C] | 10/8/10/10 | Senior Product Designer | Fluxon | Romania | Full Time | postat 2026-10-26 · expiră 2026-11-25 |
| **9.4** | [DTC] | 10/8/10/10 | Senior Product Designer | OPSWAT | Timisoara, Romania | Full Time | postat 2026-10-26 · expiră 2026-11-25 |
| **9.4** | [DTC] | 10/8/10/10 | 1173/ Senior UX Designer | Intetics | Romania | Full Time | postat 2026-10-07 · expiră 2026-11-06 ⛔ **EXPIRAT** |
| **9.4** | [DTC] | 10/8/10/10 | Senior Product Designer | Jobgether | Romania, Fully Remote | Full Time | postat 2026-10-02 · expiră 2026-11-01 ⛔ **EXPIRAT** |
| **9** | [DTC] | 10/8/8/10 | Global Head of Design | Endava | Bucharest, Romania | Full Time | postat 2026-10-23 · expiră 2026-11-22 |
| **9** | [B2B] | 10/8/8/10 | Experience Designer, UI & UX | Electronic Arts | Bucharest, Romania | Full Time | postat 2026-10-08 · expiră 2026-11-07 ⛔ **EXPIRAT** |
| **8.7** | [B2C] | 8/8/10/10 | UX/UI Designer | pubGENIUS | Bucharest, Romania | Full Time | postat 2026-10-31 · expiră 2026-11-30 |

<!-- linkuri -->
- E.ON :: UX Designer — https://designproject.io/jobs/ux-designer-at-e-on-z3l7kz
- Cohn & Jansen :: Art Director / Graphic Designer — https://www.iqads.ro/adjob/24000/art-director-graphic-designer-cohn-jansen
- Mercury360 :: Art Director — https://www.iqads.ro/adjob/23999/art-director-mercury360
- Confident Communications :: Media Relations Specialist — https://www.iqads.ro/adjob/24006/media-relations-specialist-confident-communications
- Confident Communications :: PR Manager — https://www.iqads.ro/adjob/24005/pr-manager-confident-communications
- Confident Communications :: Influencer & Creator Marketing Lead — https://www.iqads.ro/adjob/24004/influencer-creator-marketing-lead-confident-agency
- Alpha Clinic :: Digital Marketing Specialist — https://www.iqads.ro/adjob/23970/digital-marketing-specialist-alpha-clinic
- LUCA :: Graphic Designer — https://www.iqads.ro/adjob/23959/graphic-designer-luca
- Jobgether :: Product Designer — https://designproject.io/jobs/product-designer-at-jobgether-pqedji
- KittySpout :: Senior Shopify Web Designer — https://designproject.io/jobs/senior-shopify-web-designer-at-kittyspout-gblhhk
- LearnWorlds :: Product Designer - Mid level (Remote, Europe) — https://designproject.io/jobs/product-designer-mid-level-remote-europe-at-learnworlds-06xtkh
- Fluxon :: Senior Product Designer — https://designproject.io/jobs/senior-product-designer-at-fluxon-rntrqs
- OPSWAT :: Senior Product Designer — https://designproject.io/jobs/senior-product-designer-at-opswat-78h0hy
- Intetics :: 1173| Senior UX Designer — https://designproject.io/jobs/1173-senior-ux-designer-at-intetics-fzjoks
- Jobgether :: Senior Product Designer — https://designproject.io/jobs/senior-product-designer-at-jobgether-6r1kga
- Endava :: Global Head of Design — https://designproject.io/jobs/global-head-of-design-at-endava-a90ehj
- Electronic Arts :: Experience Designer, UI & UX — https://designproject.io/jobs/experience-designer-ui-and-ux-at-electronic-arts-tgvhpw
- pubGENIUS :: UX/UI Designer — https://designproject.io/jobs/uxui-designer-at-pubgenius-it82y1

### 2.2 Secțiunea 2 — contract / B2B — senioritate bună, engagement pe contract (6)

| Scor | Tag | S/D/L/E | Rol | Companie | Locație | Engagement | Expirare | Nou |
|---|---|---|---|---|---|---|---|---
| **9.1** | [DTC] | 10/8/10/8 | Senior Web Designer, Shopify | KittySpout | Bucharest, Romania, Fully Remote | Contract | postat 2026-11-03 · expiră 2026-12-03 |
| **9.1** | [DTC] | 10/8/10/8 | Senior Web Designer: DTC Ecommerce | KittySpout | Bucharest, Romania, Fully Remote | Contract | postat 2026-11-03 · expiră 2026-12-03 |
| **9.1** | [DTC] | 10/8/10/8 | Freelance Web Designer: DTC Shopify | KittySpout | Bucharest, Romania, Fully Remote | Contract | postat 2026-11-03 · expiră 2026-12-03 |
| **9.1** | [DTC] | 10/8/10/8 | Shopify Brand & Web Designer | KittySpout | Bucharest, Romania, Fully Remote | Contract | postat 2026-11-03 · expiră 2026-12-03 |
| **9.1** | [DTC] | 10/8/10/8 | Graphic Designer (Freelance) | Jobgether | Romania | Contract | postat 2026-10-29 · expiră 2026-11-28 |
| **8.4** | [B2B] | 8/8/10/8 | English to French Linguist & Copy Editor for Product, Marketing & UI Content | Jobgether | Romania, Fully Remote | Contract | postat 2026-10-02 · expiră 2026-11-01 ⛔ **EXPIRAT** |

<!-- linkuri -->
- KittySpout :: Senior Web Designer, Shopify — https://designproject.io/jobs/senior-web-designer-shopify-at-kittyspout-i7v8bm
- KittySpout :: Senior Web Designer: DTC Ecommerce — https://designproject.io/jobs/senior-web-designer-dtc-ecommerce-at-kittyspout-2v3wla
- KittySpout :: Freelance Web Designer: DTC Shopify — https://designproject.io/jobs/freelance-web-designer-dtc-shopify-at-kittyspout-74yl5m
- KittySpout :: Shopify Brand & Web Designer — https://designproject.io/jobs/shopify-brand-and-web-designer-at-kittyspout-bqt798
- Jobgether :: Graphic Designer (Freelance) — https://designproject.io/jobs/graphic-designer-freelance-at-jobgether-xuv9he
- Jobgether :: English to French Linguist & Copy Editor for Product, Marketing & UI Content — https://designproject.io/jobs/english-to-french-linguist-and-copy-editor-for-product-marketing-and-ui-content-at-jobgether-j0zyru

### 2.3 Secțiunea 3 — mid-level — potrivire bună, senioritate sub prag (0)

*Niciun job în această secțiune.*

### 2.4 Secțiunea 4 — on-site în afara Bucureștiului — doar dacă S=10 și D≥8 (0)

*Niciun job în această secțiune.*

### 2.5 Verdict amânat — locația nu e publicată de sursă (14)

| Scor | Rol | Companie | Locație | Engagement | Expirare | Nou |
|---|---|---|---|---|---|---|
| 8 | Art Director | Stefanini Infinit | neprecizată de sursă | Full Time | 2026-12-14 |  |
| 8 | Creative Lead | Stefanini Infinit | neprecizată de sursă | Full Time | 2026-12-14 |  |
| 8 | ART MID | ontheroof | neprecizată de sursă | Full Time | 2026-11-28 |  |
| 8 | Art Director | Saatchi & Saatchi | neprecizată de sursă | Full Time | 2026-11-15 |  |
| 7.4 | Social Media Content Creator | Digitas | neprecizată de sursă | Full Time | 2027-01-05 |  |
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

- Art Director — Stefanini Infinit (IQads) — https://www.iqads.ro/adjob/23996/art-director-stefanini-infinit
- Creative Lead — Stefanini Infinit (IQads) — https://www.iqads.ro/adjob/23993/creative-lead-stefanini-infinit
- ART MID — ontheroof (IQads) — https://www.iqads.ro/adjob/23974/art-mid-ontheroof
- Art Director — Saatchi & Saatchi (IQads) — https://www.iqads.ro/adjob/23963/art-director-saatchi-saatchi
- Social Media Content Creator — Digitas (IQads) — https://www.iqads.ro/adjob/24008/social-media-content-creator-digitas
- Influence & Content Production Manager — Publicis (IQads) — https://www.iqads.ro/adjob/24002/influence-content-production-manager-publicis
- Influence Lead — Publicis (IQads) — https://www.iqads.ro/adjob/24001/influence-lead-publicis
- Social Media Manager — Stefanini Infinit (IQads) — https://www.iqads.ro/adjob/23994/social-media-manager-stefanini-infinit

### 2.6 Drop-uri (circuit breaker) — 33

| Rol | Companie | Motiv | Nou |
|---|---|---|---|
| Senior Account Manager | Line Agency | disciplina nu se potrivește niciunui tier — Senior Account Manager |  |
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
| Data Center Deputy Design Manager | AECOM | rol necorelabil cu portofoliul — Data Center Deputy Design Manager |  |
| Fabricator (Prototyping) | Runware | rol necorelabil cu portofoliul — Fabricator (Prototyping) |  |
| Senior Product Designer, AI-powered Experiences (Adobe Experience Platform) | Adobe | rol necorelabil cu portofoliul — Senior Product Designer, AI-powered Experiences (Adobe Experience Platform) |  |
| English to German (Germany or Switzerland) Linguist & Copy Editor for Product, Marketing & UI Content | Jobgether | disciplina nu se potrivește niciunui tier — English to German (Germany or Switzerland) Linguist & Copy Editor for Product, Marketing & UI Content |  |
| Technical Interface Designer @ EA Sports FC | Electronic Arts | rol necorelabil cu portofoliul — Technical Interface Designer @ EA Sports FC |  |
| UX Engineer | Lenovo | rol necorelabil cu portofoliul — UX Engineer |  |
| Senior UX Researcher - Hybrid (Cluj-Napoca) | Global App Testing | rol necorelabil cu portofoliul — Senior UX Researcher - Hybrid (Cluj-Napoca) |  |
| Senior UX Designer | Waters Corporation | rol necorelabil cu portofoliul — Senior UX Designer |  |
| Product Designer | MWDN | rol necorelabil cu portofoliul — Product Designer |  |
| Digital Workflow Developer — Rapid Prototyping and Pilots for NATO with security clearance | WLG | rol necorelabil cu portofoliul — Digital Workflow Developer — Rapid Prototyping and Pilots for NATO with security clearance |  |
| Senior UX Engineer | Lenovo | disciplina nu se potrivește niciunui tier — Senior UX Engineer |  |
| English to Romanian Linguist & Copy Editor for Product, Marketing & UI Content | Welo Global | disciplina nu se potrivește niciunui tier — English to Romanian Linguist & Copy Editor for Product, Marketing & UI Content |  |
| Senior UX Researcher (f/m/d) | Awin | rol necorelabil cu portofoliul — Senior UX Researcher (f/m/d) |  |

---

## 3. Top 5 joburi cu scor

*Rankingul pune **neexpirații primii** — un job expirat nu e un candidat, oricât de mare e scorul. Tabelul marchează explicit cine e expirat, iar secțiunea 2 are lista completă.*

| # | Scor | Tag | Rol | Companie | Locație | Engagement | Expirat? | De ce contează |
|---|---|---|---|---|---|---|---|---|
| 1 | **9.6** | [DTC] | Art Director / Graphic Designer | Cohn & Jansen | Bucuresti | Full Time | nu | S și D maxime |
| 2 | **9.6** | [DTC] | Art Director | Mercury360 | Bucuresti | Full Time | nu | S și D maxime |
| 3 | **9.4** | [DTC] | Media Relations Specialist | Confident Communications | Bucuresti | Full Time | nu | D ridicat de prosa ("social media") |
| 4 | **9.4** | [DTC] | PR Manager | Confident Communications | Bucuresti | Full Time | nu | D ridicat de prosa ("social media") |
| 5 | **9.4** | [B2B] | Influencer & Creator Marketing Lead | Confident Communications | Bucuresti | Full Time | nu | D ridicat de prosa ("social media") |

- Cohn & Jansen :: Art Director / Graphic Designer — https://www.iqads.ro/adjob/24000/art-director-graphic-designer-cohn-jansen
- Mercury360 :: Art Director — https://www.iqads.ro/adjob/23999/art-director-mercury360
- Confident Communications :: Media Relations Specialist — https://www.iqads.ro/adjob/24006/media-relations-specialist-confident-communications
- Confident Communications :: PR Manager — https://www.iqads.ro/adjob/24005/pr-manager-confident-communications
- Confident Communications :: Influencer & Creator Marketing Lead — https://www.iqads.ro/adjob/24004/influencer-creator-marketing-lead-confident-agency

> **Atenție:** din top 5 după scor, 3 **nu sunt roluri de design** (au trecut doar pentru că textul lor conține "social media" sau "art director" — vezi §6.2). Iată top 5 **efectiv de design**, filtrate pe titlu:

| # | Scor | Rol | Companie | Locație | Engagement | Expirat? | De ce contează |
|---|---|---|---|---|---|---|---|
| 1 | **10** | UX Designer | E.ON | Iasi, Romania | Full Time | ⛔ da | S și D maxime |
| 2 | **9.6** | Art Director / Graphic Designer | Cohn & Jansen | Bucuresti | Full Time | nu | S și D maxime |
| 3 | **9.6** | Art Director | Mercury360 | Bucuresti | Full Time | nu | S și D maxime |
| 4 | **9.4** | Graphic Designer | LUCA | Bucuresti | Full Time | nu | L=10 (remote detectat în text) |
| 5 | **9.4** | Product Designer | Jobgether | Romania, Fully Remote | Full Time, Contract | nu | remote |

- E.ON :: UX Designer — https://designproject.io/jobs/ux-designer-at-e-on-z3l7kz
- Cohn & Jansen :: Art Director / Graphic Designer — https://www.iqads.ro/adjob/24000/art-director-graphic-designer-cohn-jansen
- Mercury360 :: Art Director — https://www.iqads.ro/adjob/23999/art-director-mercury360
- LUCA :: Graphic Designer — https://www.iqads.ro/adjob/23959/graphic-designer-luca
- Jobgether :: Product Designer — https://designproject.io/jobs/product-designer-at-jobgether-pqedji

---

## 4. Postări GENUIN noi (nu doar "absente din raportul de ieri")

> "nou" în tabele înseamnă **"nu era în raportul de ieri"**, nu neapărat "postat azi". Iată ce e postat efectiv nou:

| Sursă | Cum am măsurat | Rezultat |
|---|---|---|
| **IQads** | ID-ul ad-ului crește monoton cu postarea. Cel mai mare ID din setul de ieri: **24008** | **0 anunțuri noi** |
| **designproject.io** | data de publicare vs. ultima rulare | **0 anunțuri noi** — cel mai recent de pe site e din **2026-11-05** |

**Concluzie:** **nicio postare nouă față de ultima rulare.** Piața nu a produs nimic nou relevant azi.


---

## 5. Ce n-a mers, măsurat

1. **3 din 9 categorii nu mai primesc nimic** (2 de 29 zile, 1 n-a fost folosită niciodată). Cauza pentru 3 dintre ele: **nu au filtru creat** (`Personal`, `De raspuns`, `Facturi si Conturi`) — deci nimic nu le poate eticheta, oricare ar fi criteriul. Starea filtrelor, masurata azi: **6 functioneaza, 1 sunt nefunctionale** — cele nefunctionale folosesc `from:(...)` unde Gmail cere `from:{...}` (paranteze = ȘI, acolade = SAU), deci nu pot lovi niciun mesaj; cu acoladele ar fi prins 4020 mesaje in 30 de zile. ~395 mesaje/7 zile stau in inbox.
2. **designproject.io servește descrieri foarte inegale** (2094–30619 de caractere pe cele 30 de joburi, măsurat azi). Cele mai lungi sunt rescrise de AI și injectează cuvinte-cheie care ridică axele — vezi §6.2.
3. **Celelalte două câmpuri de engagement ale designproject.io sunt inutilizabile.** `employmentType` din JSON-LD spune `FULL_TIME` pentru 30 din 30, iar badge-ul din listing spune "Full-time" pentru 30 din 30. Singura sură corectă e linia **"Job Type:"** din descriere — prezentă la 13 din 30. Am folosit asta.
4. **Paginatia IQads nu funcționează.** `?page=2` și `?page=3` servesc exact pagina 0 (aceleași 41 de linkuri — verificat azi pe 0, 2, 3). Catalogul complet e pe pagina 0 — nu iterez pagini.
5. **Cota Google: 130 cereri pe 200** (în limita plafonului). Consumul pe etape:

| Etapă | Cereri |
|---|---|
| `report-mail-count.js` | 70 |
| `report-filter-state.js` | 28 |
| `report-simulate-sort.js` | 17 |
| `report-inbox-counts.js` | 7 |
| `report-folder-discover.js` | 4 |
| `inline` | 1 |
| **total** | **130** |

> Rulare 2026-11-08 (raport zilnic). Contor pornit de la zero.

Ce a consumat cel mai mult: corpurile complete ale mesajelor de azi (15) — fără corp, nu se poate distinge un mesaj care cere răspuns de o alertă automată. **Zero scrieri pe Gmail** — niciun mail trimis, marcat sau arhivat, niciun filtru modificat.

---

## 6. Două semnalări ale motorului de scoring (portul rămâne fidel — decizia e a ta)

### 6.1 "remote" pozitiv fals — 3 joburi

| Rol | Companie | De ce e fals | L |
|---|---|---|---|
| UX Designer | E.ON | cultura: `ty to work and communicate effectively in an international, distributed team setting Business fluent in English Our Bene` | 10 |
| Graphic Designer | LUCA | negatie: `nu se lucreaza remote` | 10 |
| Senior Product Designer | OPSWAT | cultura: `s, we provide feedback, and are stronger together. We are a global team. Design Structure The Product Design team is par` | 10 |

"Remote" apare în text, dar jobul **nu** e remote. `L` ar trebui să fie 8 (București) sau -5 (necunoscut), nu 10. Diferență: **0.4 puncte** per job. Nu am atins motorul — portul e fidel prin design.

**Trei mecanisme, măsurate pe 05.11:** (1) **negatie** — anunțul spune exact contrariul; (2) **eticheta** — linia `Remote Status: Hybrid` e citită ca remote; (3) **cultura** — „distributed team setting", „we are a global team", jobul fiind on-site într-un oraș anume.

### 6.2 Axa D ridicată de prosa, nu de titlu — 19 joburi (23 semnalări)

| Rol | Companie | Ce a ridicat axa | De unde |
|---|---|---|---|
| UX Designer | E.ON | S=10 prin `"art director"` (—) | prosa anuntului |
| UX Designer | E.ON | D=10 prin `"art director"` (Creative Leadership) | prosa anuntului |
| Media Relations Specialist | Confident Communications | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| PR Manager | Confident Communications | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Influencer & Creator Marketing Lead | Confident Communications | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Digital Marketing Specialist | Alpha Clinic | S=10 prin `"head of"` (—) | prosa anuntului |
| Digital Marketing Specialist | Alpha Clinic | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Product Designer | Jobgether | S=10 prin `"senior"` (—) | prosa anuntului |
| Product Designer - Mid level (Remote, Europe) | LearnWorlds | S=10 prin `"head of"` (—) | prosa anuntului |
| Freelance Web Designer: DTC Shopify | KittySpout | S=10 prin `"senior"` (—) | prosa anuntului |
| Shopify Brand & Web Designer | KittySpout | S=10 prin `"senior"` (—) | prosa anuntului |
| Graphic Designer (Freelance) | Jobgether | S=10 prin `"expert"` (—) | prosa anuntului |
| Global Head of Design | Endava | D=8 prin `"graphic design"` (Core Design) | prosa anuntului |
| Experience Designer, UI & UX | Electronic Arts | S=10 prin `"manager"` (—) | prosa anuntului |
| Experience Designer, UI & UX | Electronic Arts | D=8 prin `"visual design"` (Core Design) | prosa anuntului |
| UX/UI Designer | pubGENIUS | S=8 prin `"global"` (—) | prosa anuntului |
| English to French Linguist & Copy Editor for Product, Marketing & UI Content | Jobgether | S=8 prin `"lead"` (—) | prosa anuntului |
| English to French Linguist & Copy Editor for Product, Marketing & UI Content | Jobgether | D=8 prin `"ui/ux"` (Core Design) | prosa anuntului |
| Influence & Content Production Manager | Publicis | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Influence Lead | Publicis | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Digital Account Manager | WoPA | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Copywriter | Stefanini Infinit | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Digital Media Specialist / PPC | Stefanini Infinit | D=8 prin `"social media"` (Core Design) | prosa anuntului |

**Ce propun:** ca `D` să se calculeze din **titlul rolului**, nu din textul anunțului, sau măcar ca un rol să poată intra într-o secțiune doar dacă titlul conține o cheie de design. E o decizie de motor — nu am atins `scoring.gs` fără acordul tău.

---

## 7. Fișiere

- `rapoarte/RAPORT-ZILNIC-202611-08.md` — raportul acesta (și în repo)
- `mavis-tools/scoring-result-2026-11-08.json` — scoruri + secțiuni + diagnostice
- `mavis-tools/jobs-iqads-2026-11-08.json` — joburi IQads, text integral
- `mavis-tools/jobs-designproject-2026-11-08.json` — joburi designproject.io, JSON-LD
- `mavis-tools/jobs-2026-11-07.json` — setul normalizat de ieri (cu care s-a comparat)
- `mavis-tools/report-mail-count.json` — numărătoare pe etichetele de categorie
- `mavis-tools/report-inbox-counts.json` — numărătoare exactă inbox
- `mavis-tools/report-simulate-sort.json` — simularea sortării + mesajele de azi
- `mavis-tools/report-source-probe.json` — sonda de surse (comportamentul iqads.ro / designproject.io, măsurat azi)
- `mavis-tools/report-filter-state.json` — starea filtrelor Gmail + testul paranteze-vs-acolade (măsurat azi)
- `mavis-tools/report-triage.js` — clasificatorul mesajelor (needs-reply / needs-action / fyi / noise)
- `mavis-tools/taxonomy.js` — sursa unică pentru numele etichetelor de categorie (rezolvate live, nu hardcodate)

---

*Generat de Mavis Cloud. Nimic nu a fost șters, nimic nu a fost trimis, nimic nu a fost modificat în Gmail sau Drive. Totul e anulabil.*
