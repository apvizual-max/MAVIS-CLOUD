# Raport zilnic — miercuri 4 noiembrie 2026

> Generat de Mavis Cloud · 11 mesaje noi măsurate azi (00:00–09:08 EEST) · 58 joburi analizate
> Cota Google: **122 cereri** (plafon 200 — **în limita plafonului**). Zero scrieri pe Gmail; tot consumul a fost măsurare și diagnostic. Detaliu în §5.

---

## 1. Gmail — etichetele de categorie

### 1.1 Rezultatul scurt
**Pe etichetele de categorie a intrat azi: 14 etichete.** În ultimele 24h: 113; în 7 zile: 775.

Azi au intrat **11 mesaje** în total, iar în inbox sunt **8**. **1 dintre ele nu au primit nicio etichetă de categorie** (nu se potrivesc niciunui filtru de categorie — deci rămân în inbox, neetichetate).

> **14 etichete pe 10 mesaje** — 4 mesaje primesc două etichete de categorie (ex. o alertă de job care intră și la „Joburi" și la „Newsletter"). De aceea suma pe etichete e mai mare decât numărul de mesaje distincte.

### 1.2 Măsurătoarea pe etichete (numărare exactă, cu paginare)

| Etichetă | azi | 24h | 7z | 30z | Ultimul mesaj etichetat |
|---|---|---|---|---|---|
| `MAVIS/Joburi` | 5 | 37 | 222 | 429 | Wed, 04 Nov 2026 |
| `AI Folder/AI si Comunitati` | 2 | 14 | 87 | 167 | Wed, 4 Nov 2026  |
| `Socials` | 2 | 6 | 29 | 110 | Wed, 04 Nov 2026 |
| `Newsletter` | 5 | 52 | 304 | 459 | Wed, 04 Nov 2026 |
| `Finante` | 0 | 2 | 19 | 25 | Tue, 03 Nov 2026 |
| `Personal` | 0 | 0 | 0 | 0 | n/a |
| `De raspuns` | 0 | 0 | 0 | 13 | Fri, 9 Oct 2026  |
| `Facturi si Conturi` | 0 | 0 | 0 | 1 | Fri, 09 Oct 2026 |
| `Optimus CD` | 0 | 2 | 114 | 1026 | Tue, 03 Nov 2026 |

**Concluzie:** 6 categorii primesc mesaje (`MAVIS/Joburi`, `AI Folder/AI si Comunitati`, `Socials`, `Newsletter`, `Finante`, `Optimus CD`); 2 categorii nu primesc nimic de **25 zile** (pe `De raspuns`, `Facturi si Conturi` = **09.10.2026**); o categorie n-a fost folosită niciodată (0 pe 30 de zile, fără istoric) (`Personal`).

> Zero pe o fereastră nu înseamnă "etichetă goală" — înseamnă "eticheta nu mai primește nimic". Verificat pe 4 ferestre.

### 1.3 Filtrele, măsurate azi

Filtre cu criteriu de interogare pe cont: **6**, din 19 total. **6** dintre ele are `addLabelIds`, iar **6** atinge o etichetă de categorie. Criteriul celui de joburi, citit live azi:

```
from:{jooble bestjobs hipo indeed jobleads linkedin} OR subject:{job angajare vacanta oportunitate}
```

#### 6 filtre FUNCȚIONEAZĂ

**6 dintre 6 filtre lovesc efectiv mesaje.** `from:{jooble bestjobs hipo indeed jobleads linkedi…` → **1085** mesaje în 30 de zile, etichetează `joburi`; `from:{substack goatacademy aiautomationsociety sad…` → **404** mesaje în 30 de zile, etichetează `ai`; `from:{skool facebook instagram pinterest tiktok po…` → **139** mesaje în 30 de zile, etichetează `social`; `from:{noreply no-reply newsletter digest mail@ inf…` → **1237** mesaje în 30 de zile, etichetează `newsletter`; `from:{kraken tradingview bitunix coinbase binance}…` → **28** mesaje în 30 de zile, etichetează `finante`; `from:(notifications@github.com OR *jules*) OR subj…` → **1025** mesaje în 30 de zile, etichetează `agenti`


**Inboxul nu se golește.** Măsurat pe cele 11 mesaje de azi, etichetele lor reale: **9 sunt încă în INBOX**, dar **doar 0 au rămas UNREAD**. Deci filtrele **curăță „necitit"**, dar **nu scoate mesajele din inbox**:

| Fereastră | În inbox | În toate stările |
|---|---|---|
| azi | 8 | 10 |
| 24h | 57 | 76 |
| 7z | 378 | 574 |

**~378 mesaje stau în inbox într-o săptămână** (~54/zi).

### 1.4 Cum ar fi fost sortate mesajele de azi

Simulare pe cele 11 mesaje de azi, cu **aceleași criterii** ale filtrelor (fără scriere):

| Categorie | Mesaje azi |
|---|---|
| `MAVIS/Joburi` | 5 |
| `AI Folder/AI si Comunitati` | 2 |
| `Socials` | 3 |
| `Newsletter` | 4 |
| `Finante` | 0 |
| `Personal` | 0 |
| `De raspuns` | 0 |
| `Facturi si Conturi` | 0 |
| `Optimus CD` | 0 |
| *niciun filtru se potrivește* | 1 |

> Unele mesaje se potrivesc la 2 filtre (ex. "Joburi" + "Newsletter" de la LinkedIn), deci suma poate depăși 11.

**Observație:** **0 mesaje** de azi sunt notificări ale agenților tăi (Jules și GitHub Actions pe repo-urile proprii). Categoria dedicata lor e `Optimus CD`, care a primit 0 mesaje azi, iar filtrul ei functioneaza efectiv. In rest, **6 din 9 categorii** primesc mesaje, iar 3 nu primesc.


### 1.5 Mesajele care chiar necesită răspuns

Clasificarea e făcută din date, nu dintr-o listă scrisă cu mâna: 0 cer răspuns explicit, 4 cer o decizie, 1 este alerte de job care nu ating profilul tău, 6 sunt newsletter/promoție, 0 sunt zgomot de pipeline.

**Niciun mesaj nu cere explicit un răspuns.**

**Ceres o decizie sau o acțiune:**

- **Bestjobs** — 05:55 UTC. *Candidates like you applied for these jobs* _(alerta de job cu rol de design)_ — Candidates like you applied for these jobs Top jobs according to your activity: CV entries, job applications and job searches. Hi there, Alexandru Popescu ! Bestie, your career friend, is on WhatsApp 
- **Bestjobs** — 05:28 UTC. *Because you searched for design graphic bucuresti jobs* _(alerta de job cu rol de design)_ — Because you searched for design graphic bucuresti jobs Top jobs according to your activity: CV entries, job applications and job searches. Hi there, Alexandru Popescu ! Bestie, your career friend, is 
- **Joburi Hipo.ro** — 04:33 UTC. *Alex - 34 Joburi noi adaugate pentru tine pe hipo.ro* _(contul cere o actiune (parola / confirmare))_ — Peste 5000 de Locuri de munca si Joburi pentru profesionisti, studenti si absolventi. Intra in contul tau CV-urile mele Domeniile selectate ( modifica ) Orasele selectate ( modifica ) Publicitate - Ag
- **Authorship check** — 01:07 UTC. *Yes / no — Alexandru, your name is on a paper* _(cer confirmare umana de identitate — verifica inainte sa raspunzi)_ — Sorry to interrupt — if it isn't yours, tell us and we won't ask about it again. Authorship check Sorry to interrupt — this takes one click. Alexandru, can you confirm this paper is yours — or tell us

**Alerte de job care NU ating profilul de design** (informativ, 1):

- Indeed — 05:47 UTC · *Membru al echipei - Part Time la Lovisa. Încă 12 locuri de muncă în București, Ilfov*

**Newsletter / promoție, fără acțiune** (6): AI Automation Society (Skool), Project 720 (Skool), Isha News, Mihai Svasta via LinkedIn, Ken wheeler from Ken Theoria Apophasis Substack, AI Money Lab (Skool)

**Leads din alertele de job.** Fiecare poartă propria cale de verificare, declarată mai jos — nu toate sunt citite direct de pe pagină:

##### Global Head of Design @ Endava - Bucuresti hybrid, conducere globala de design (NOU)

Din alerta **designproject.io (catalog)** — *Global Head of Design @ Endava*

**Cum a fost verificat:** Anuntul complet (descriere, responsabilitati, cerinte, beneficii) obtinut prin indexarea motorului de cautare pe o platforma de joburi cu anuntul integral, plus listingul de pe designproject.io care da localizarea, tipul de angajare si data expirarii. Confirmat si pe jobboard-uri care listeaza rolul ca Global Head of Design la Endava, Bucuresti, Hybrid, cu data de publicare 23.10.2026. Salariul: nepublicat de angajator.

Cel mai bine potrivit rol cu profilul tau dintre toate cele aparute azi. Endava angajeaza Global Head of Design: defineste, conduce si evolueaza viziunea globala de design a companiei - brand, marketing, experiente digitale, comunicare interna - si conduce o organizatie creativa multidisciplinara. Endava se transforma intr-o companie de transformare AI-native, iar sistemul lor de design trebuie sa reflecte acea ambitie. In plus, angajeaza o agentie de brand noua, iar Head of Design va fi partenerul intern cheie.

**Cerințe:**

- Experienta dovedita in conducerea si dezvoltarea unor echipe de design interne performante (B2B, servicii profesionale, tehnologie sau corporativ)
- Track record real in definirea, evolutia si implementarea unor identitati de brand distinctive
- Experienta in initiativele de transformare de brand si in ridicarea perceptiei de brand
- Background solid in a lucra cu agentii creative externe (parteneriate, briefing, evaluare)
- Brand strategy, sisteme de identitate vizuala, creative direction, design governance, design systems
- Uzanta instrumentelor moderne de design si a tehnologiilor generative AI / LLM in mediul creativ
- Bun consumator de marketing digital, content creation, customer experience
- Bonus: experienta de brand transformation multi-canal, leadership cross-functional

**Condiții:** Bucuresti, Hybrid, Full time, cu ore flexibile. Echipa Endava: 10K-50K. Postat 23.10.2026, expiră 22.11.2026.

**Cum se aplică:** Aplicare pe formularul de pe SmartRecruiters (linkul original e pe anuntul de pe designproject.io).

> ⚠️ Salariul NU este publicat de angajator - un jobboard pune o medie orientativa de ~482.000 RON, dar aia e estimarea lui, nu oferta. Puncte de verificat: (1) e un rol de conducere GLOBALA - cu scope pe toate pietele, nu doar Romania; (2) anuntul cere experienta dovedita in conducerea echipelor de design in-house, deci daca ai condus mai degraba proiecte si colaborat cu agentii decat oameni, asta e pragul real; (3) la final, salariu competitiv + share plan + bonusuri de performanta + bonus de recomandare, plus coaching si buget de training. Daca iti place sa lucrezi cu AI in procesul de design, e un avantaj real aici.

- https://designproject.io/jobs/global-head-of-design-at-endava-a90ehj

##### Senior Product Designer, AI-powered Experiences (Adobe Experience Platform) @ Adobe - Bucuresti (NOU)

Din alerta **designproject.io (catalog)** — *Senior Product Designer, AI-powered Experiences (Adobe Experience Platform) @ Adobe*

**Cum a fost verificat:** Listingul de pe designproject.io (titlu, companie, localizare, tip angajare, data publicarii si expirare) si confirmarea faptului ca rolul a aparut si in alerta LinkedIn din 02.11. Cerintele complete NU au fost verificate pe pagina oficiala.

Rol de la Adobe, cu sediu in Bucuresti. L-ai vazut si pe 02.11 in alerta LinkedIn (DuckDuckGo era doar jobul-cheie de atunci) - acum e in catalogul designproject.io, deci poti vedea data de expirare. E un rol de product design pe Adobe Experience Platform, cu componenta de experiente bazate pe AI.

**Cerințe:**

- Necesa in anunt - anuntul de pe designproject.io are descrierea disponibila, dar linkul de aplicare este pe SmartRecruiters; cerintele complete n-au fost verificate pe pagina oficiala
- Rol senior de product design pe o platforma de marketing/experiente (Adobe Experience Platform)

**Condiții:** Bucuresti, Full time. Postat 30.10.2026, expiră 29.11.2026.

**Cum se aplică:** Aplicare pe anuntul Adobe (linkul oficial e in anuntul de pe designproject.io).

> ⚠️ E product design la o platforma enterprise - profil de design de produs, nu de brand identity. Merită verificat pe pagina oficială cerințele exacte și nivelul de seniority. Data de expirare (29.11) e scurtă: dacă te interesează, e urgent.

- https://designproject.io/jobs/senior-product-designer-ai-powered-experiences-adobe-experience-platform-at-adobe-s71luz

##### Product Designer - Mid level (Remote, Europe) @ LearnWorlds (NOU, cu atentie la eligibilitate)

Din alerta **designproject.io (catalog)** — *Product Designer - Mid level (Remote, Europe) @ LearnWorlds*

**Cum a fost verificat:** Pagina oficiala de joburi a firmei citita prin indexarea motorului de cautare (learnworlds.com/job/product-designer-mid-level-remote-europe/): cerintele, procesul de recrutare in 5 etape, beneficiile si clauzele de eligibilitate. Listingul de pe designproject.io da localizarea si expirarea. Confirmat si pe jobboard-uri care precizeaza tarile eligibile (Grecia, Spania, Portugalia, UK si inca 3).

LearnWorlds (SaaS de learning platforms) angajeaza un Product Designer de nivel mijloc, remote in Europa. Rolul acopera ambele experiente - admin si learner - cu UI, fluxuri complexe, feature-uri AI si design system. Raporteaza direct la Head of Product Design. Ai in cerinta un exercitiu practic de 10 minute si un task de design de o saptamana.

**Cerințe:**

- Aproximativ 3 ani sau mai mult de experienta profesionala in product design (mai conteaza dovada decat anii)
- Portofoliu obligatoriu: arata lucru puternic si clar ce ai condus tu, de ce ai luat deciziile si ce s-a schimbat in urma lor
- Daca AI-ul a fost in procesul tau, spune ce a contribuit el si unde a intervenit judecata ta
- Craft solid de product design si UI; ideal experienta pe produse SaaS, B2B sau complexe
- Engleză puternica - e limba de lucru zilnică

**Condiții:** Remote in Europa (Chania/Atena/Limassol) sau remote. Full time, permanent. Postat 30.10.2026, expiră 29.11.2026.

**Cum se aplică:** 1) aplicare cu CV + portofoliu + întrebări + exercițiu de observare de 10 min; 2) conversație cu talent acquisition; 3) task de design de o saptamana + evaluare cognitiva; 4) discuție live cu Head of Product Design; 5) conversație finală cu CPO.

> ⚠️ ATENTIE LA ELIGIBILITATE - asta e cel mai important: anuntul spune explicit ca NU ofera relocalizare sau sponsorizare de viza si ca applicantii trebuie sa aiba deja dreptul legal de a lucra remote din tara lor de reședință, sub eligibilitatea LearnWorlds. Romania apare in listing, dar listarea de pe jobboarduri restrânge tarile la Grecia, Spania, Portugalia, UK +3. Deci verifica eligibilitatea pentru Romania inainte de a aplica. Restul: rolul e de product design la nivel mijloc (3+ ani), cu exercițiu practic - pragul e real. Beneficile: 23 zile PTO, buget anual de training, allowance pentru birou acasa, laptop si monitor, unelte AI la locul de munca, retreaturi de echipa.

- https://www.learnworlds.com/job/product-designer-mid-level-remote-europe/

##### KittySpout - 4 roluri de web/shopify designer, Bucuresti sau fully remote, contractor (NOI)

Din alerta **designproject.io (catalog)** — *Senior Shopify Web Designer / Senior Web Designer, Shopify / Freelance Web Designer: DTC Shopify / Shopify Brand & Web Designer @ KittySpout*

**Cum a fost verificat:** Listingurile de pe designproject.io (titlu, companie, localizare, linia Job Type din descriere, data publicarii si expirarea) si confirmarea ca toate patru au fost publicate pe 3 noiembrie 2026. Cerintele complete NU au fost verificate pe paginile oficiale.

KittySpout a postat 4 roluri de web design cu-focus Shopify pe 3 noiembrie - ieri, deci toate sunt proaspete. Sunt: Senior Shopify Web Designer, Senior Web Designer Shopify, Freelance Web Designer DTC Shopify, Shopify Brand & Web Designer. Trei sunt Bucuresti Fully Remote, unul doar Bucuresti. Toate au Job Type: Contractor si expira pe 03.12.2026.

**Cerințe:**

- Necesa in anunt - linkurile de aplicare sunt pe SmartRecruiters, iar textele complete ale anunturilor sunt pe designproject.io; nu am verificat cerintele pe paginile oficiale

**Condiții:** Bucuresti, Romania, Fully Remote (3 dintre 4) si Bucuresti (1). Contractor. Postate 3 noiembrie 2026, expira 03.12.2026.

**Cum se aplică:** Aplicare pe anuntul KittySpout (linkul oficial e in listingul de pe designproject.io).

> ⚠️ Cinci roluri de la un singur angajator, toate contractor, toate cu focus pe Shopify/e-commerce. ATENTIE: e web design pentru magazine Shopify, nu brand identity - e o altă disciplină decât ce cauți de obicei, dar 4 roluri deodată la același angajator înseamnă că recrutează activ. Salariul nu e publicat. Expiră în mai puțin de o lună, deci dacă te interesează, e acum sau nu e nimic.

- https://designproject.io/jobs/senior-shopify-web-designer-at-kittyspout-gblhhk

##### Electronic Arts - 2 roluri de design UI/UX in Bucuresti

Din alerta **designproject.io (catalog)** — *Experience Designer, UI & UX @ Electronic Arts / Technical Interface Designer @ EA Sports FC*

**Cum a fost verificat:** Listingurile de pe designproject.io (titlu, companie, localizare, tip angajare, data publicarii si expirarea). Cerintele complete NU au fost verificate pe paginile oficiale.

EA are doua roluri de design de interfata in Bucuresti, aparute recent in catalog. Experience Designer, UI & UX (postat 08.10, expira 07.11 - aproape expirat) si Technical Interface Designer la EA Sports FC (postat 23.10, expira 22.11). Sunt roluri de design de jocuri/ interfata, cu profil tehnic.

**Cerințe:**

- Necesa in anunt - linkurile de aplicare sunt pe SmartRecruiters; cerintele complete nu au fost verificate pe paginile oficiale

**Condiții:** Bucuresti, Romania, Full time.

**Cum se aplică:** Aplicare pe anuntul EA (linkul oficial e in listingul de pe designproject.io).

> ⚠️ Punctul important: rolul Experience Designer expira pe 07.11 - adica peste 3 zile. Daca vrei, abia ai timp. Restul: design de interfata pentru jocuri (EA Sports FC) - portofoliu de UI/UX de joc, nu brand identity. Salariul nu e publicat.

- https://designproject.io/jobs/technical-interface-designer-at-ea-sports-fc-at-electronic-arts-aeepnc

##### Creative Lead & 3D Designer @ MARKQUEN EUROPE (a 5-a zi) + lista Bestjobs cu salarii

Din alerta **Bestjobs** — *Because you searched for design graphic bucuresti jobs / Candidates like you applied for these jobs*

**Cum a fost verificat:** Corpul COMPLET al celor doua emailuri Bestjobs de azi. Pagina de anunt Bestjobs raspunde 403 pentru acces automat - NU am deschis paginile individuale. MARKQUEN: confirmat si pe listingul indexat de pe bebee (profilul firmei + regimul de lucru).

MARKQUEN e in topul ambele alerte Bestjobs de azi, a cincea zi consecutiv. Cel mai bine platit rol de design din Romania listat. Lista de azi, cu sumele publicate de angajator: Proiectant Productie Publicitara la BD Lemntech 1405-2000 (DISPONIBIL IMEDIAT), Creative Lead & 3D Designer la MARKQUEN 1400-1800 Hybrid, Specialist Marketing Digital la Fabrica De Podcasturi 700-1350, AI Video Editor la Apex Digital Alliance 1200-1300, SudRezidential Videograf & Editor Video 1000-1200, Operator Grafica la Viragos Design 800-1000, Colaboratori design grafic la AGRESIV MEDIA 780-1020, Social Media & Content Creator la AMAL HEALTH CARE 900, Junior Content Creator la INTAX TRADING 700, Graphic Designer part-time 15h remote la CreativeEd Media 525, Asistent Promovare si Comunicare la BERGERAT MONNOYEUR, Content Specialist la Dr.Max.

**Cerințe:**

- Pentru fiecare job: portofoliu si CV pe anuntul Bestjobs, din email

**Rate-uri publicate:**

- Cel mai mult platit din lista publica de angajator: BD Lemntech 1405-2000, apoi MARKQUEN 1400-1800
- Cu estimare de piata (nu e oferta): ELBI 1195-1325, Imperial Brands 1385-1530, FRF 1385-1530, Rompetrol 1385-1530, Electrica 1795-1985, Instore 1795-1985, Working4U 1795-1985

**Condiții:** Toate din alertele zilnice Bestjobs.

**Cum se aplică:** Aplicare pe anuntul Bestjobs, din email.

> ⚠️ MARKQUEN: discrepanta de regim persista - Bestjobs zice Hybrid, listingul de pe bebee pentru acelasi rol spune La sediu (on-site). Intreaba in aplicatie. Sumele cu estimare de piata se recalculeaza zilnic, deci nu le raporta ca salariu oferit.

- https://www.bestjobs.eu

---
## 2. Joburi — scorate cu `ALEX-KIT/scoring.gs`

**58 joburi analizate** (IQads 41 + designproject.io 17) → 31 păstrate în tabele, 27 drop-uri, din care **14 cu verdict amânat** (locația nu e publicată de sursă). **10 joburi noi** față de 2026-11-03.

Surse: **IQads** (tabloul AdJob activ, citit azi) + **designproject.io** (România + București).

> ⛔ **Expirate marcate în tabele.** La IQads data de expirare vine direct din anunț. La designproject.io `validThrough` = data postării + 30 zile — măsurat pe toate cele 17 de joburi (17 exacte, 0 cu o zi de fus orar, 0 altfel), deci e o expirare reală, nu o derivare inutilă. 0 joburi din tabele au expirat și nu se mai pot aplica.

| | S | D | L | E |
|---|---|---|---|---|
| **S** — senioritate | 0.35 | | | |
| **D** — disciplină | | 0.30 | | |
| **L** — locație | | | 0.20 | |
| **E** — engagement | | | 0.15 | |

### 2.1 Secțiunea 1 — scor maxim — senior/lead, remote sau București, full-time (12)

| Scor | Tag | S/D/L/E | Rol | Companie | Locație | Engagement | Expirare | Nou |
|---|---|---|---|---|---|---|---|---
| **9.6** | [DTC] | 10/10/8/10 | Art Director | Mercury360 | Bucuresti | Full Time | expiră 2026-12-25 |
| **9.4** | [DTC] | 10/8/10/10 | Media Relations Specialist | Confident Communications | Bucuresti | Full Time | expiră 2027-01-01 |
| **9.4** | [DTC] | 10/8/10/10 | PR Manager | Confident Communications | Bucuresti | Full Time | expiră 2027-01-01 |
| **9.4** | [B2B] | 10/8/10/10 | Influencer & Creator Marketing Lead | Confident Communications | Bucuresti | Full Time | expiră 2027-01-01 |
| **9.4** | [B2B] | 10/8/10/10 | Digital Marketing Specialist | Alpha Clinic | Hybrid (Office & Remote) | Full Time | expiră 2026-11-27 |
| **9.4** | [DTC] | 10/8/10/10 | Graphic Designer | LUCA | Bucuresti | Full Time | expiră 2026-11-13 |
| **9.4** | [DTC] | 10/8/10/10 | Senior Shopify Web Designer | KittySpout | Bucharest, Romania | Full Time | postat 2026-11-03 · expiră 2026-12-03 | ✅
| **9.4** | [B2B] | 10/8/10/10 | Product Designer - Mid level (Remote, Europe) | LearnWorlds | Romania | Full Time | postat 2026-10-30 · expiră 2026-11-29 | ✅
| **9** | [DTC] | 10/8/8/10 | Global Head of Design | Endava | Bucharest, Romania | Full Time | postat 2026-10-23 · expiră 2026-11-22 | ✅
| **9** | [B2B] | 10/8/8/10 | Experience Designer, UI & UX | Electronic Arts | Bucharest, Romania | Full Time | postat 2026-10-08 · expiră 2026-11-07 | ✅
| **8.7** | [DTC] | 8/8/10/10 | Digital Marketing Specialist | GoTech World | Bucuresti, Hybrid (Office & Remote) | Full Time | expiră 2026-11-30 |
| **8.7** | [B2C] | 8/8/10/10 | UX/UI Designer | pubGENIUS | Bucharest, Romania | Full Time | postat 2026-10-31 · expiră 2026-11-30 | ✅

<!-- linkuri -->
- Mercury360 :: Art Director — https://www.iqads.ro/adjob/23999/art-director-mercury360
- Confident Communications :: Media Relations Specialist — https://www.iqads.ro/adjob/24006/media-relations-specialist-confident-communications
- Confident Communications :: PR Manager — https://www.iqads.ro/adjob/24005/pr-manager-confident-communications
- Confident Communications :: Influencer & Creator Marketing Lead — https://www.iqads.ro/adjob/24004/influencer-creator-marketing-lead-confident-agency
- Alpha Clinic :: Digital Marketing Specialist — https://www.iqads.ro/adjob/23970/digital-marketing-specialist-alpha-clinic
- LUCA :: Graphic Designer — https://www.iqads.ro/adjob/23959/graphic-designer-luca
- KittySpout :: Senior Shopify Web Designer — https://designproject.io/jobs/senior-shopify-web-designer-at-kittyspout-gblhhk
- LearnWorlds :: Product Designer - Mid level (Remote, Europe) — https://designproject.io/jobs/product-designer-mid-level-remote-europe-at-learnworlds-06xtkh
- Endava :: Global Head of Design — https://designproject.io/jobs/global-head-of-design-at-endava-a90ehj
- Electronic Arts :: Experience Designer, UI & UX — https://designproject.io/jobs/experience-designer-ui-and-ux-at-electronic-arts-tgvhpw
- GoTech World :: Digital Marketing Specialist — https://www.iqads.ro/adjob/23981/digital-marketing-specialist-gotech-world
- pubGENIUS :: UX/UI Designer — https://designproject.io/jobs/uxui-designer-at-pubgenius-it82y1

### 2.2 Secțiunea 2 — contract / B2B — senioritate bună, engagement pe contract (5)

| Scor | Tag | S/D/L/E | Rol | Companie | Locație | Engagement | Expirare | Nou |
|---|---|---|---|---|---|---|---|---
| **9.1** | [DTC] | 10/8/10/8 | Senior Web Designer, Shopify | KittySpout | Bucharest, Romania, Fully Remote | Contract | postat 2026-11-03 · expiră 2026-12-03 | ✅
| **9.1** | [DTC] | 10/8/10/8 | Senior Web Designer: DTC Ecommerce | KittySpout | Bucharest, Romania, Fully Remote | Contract | postat 2026-11-03 · expiră 2026-12-03 | ✅
| **9.1** | [DTC] | 10/8/10/8 | Freelance Web Designer: DTC Shopify | KittySpout | Bucharest, Romania, Fully Remote | Contract | postat 2026-11-03 · expiră 2026-12-03 | ✅
| **9.1** | [DTC] | 10/8/10/8 | Shopify Brand & Web Designer | KittySpout | Bucharest, Romania, Fully Remote | Contract | postat 2026-11-03 · expiră 2026-12-03 | ✅
| **9.1** | [DTC] | 10/8/10/8 | Graphic Designer (Freelance) | Jobgether | Romania | Contract | postat 2026-10-29 · expiră 2026-11-28 | ✅

<!-- linkuri -->
- KittySpout :: Senior Web Designer, Shopify — https://designproject.io/jobs/senior-web-designer-shopify-at-kittyspout-i7v8bm
- KittySpout :: Senior Web Designer: DTC Ecommerce — https://designproject.io/jobs/senior-web-designer-dtc-ecommerce-at-kittyspout-2v3wla
- KittySpout :: Freelance Web Designer: DTC Shopify — https://designproject.io/jobs/freelance-web-designer-dtc-shopify-at-kittyspout-74yl5m
- KittySpout :: Shopify Brand & Web Designer — https://designproject.io/jobs/shopify-brand-and-web-designer-at-kittyspout-bqt798
- Jobgether :: Graphic Designer (Freelance) — https://designproject.io/jobs/graphic-designer-freelance-at-jobgether-xuv9he

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
| Senior Product Designer, AI-powered Experiences (Adobe Experience Platform) | Adobe | rol necorelabil cu portofoliul — Senior Product Designer, AI-powered Experiences (Adobe Experience Platform) |  ✅ |
| English to German (Germany or Switzerland) Linguist & Copy Editor for Product, Marketing & UI Content | Jobgether | disciplina nu se potrivește niciunui tier — English to German (Germany or Switzerland) Linguist & Copy Editor for Product, Marketing & UI Content |  ✅ |
| Technical Interface Designer @ EA Sports FC | Electronic Arts | rol necorelabil cu portofoliul — Technical Interface Designer @ EA Sports FC |  ✅ |
| UX Engineer | Lenovo | rol necorelabil cu portofoliul — UX Engineer |  ✅ |
| Product Designer | MWDN | rol necorelabil cu portofoliul — Product Designer |  ✅ |
| Digital Workflow Developer — Rapid Prototyping and Pilots for NATO with security clearance | WLG | rol necorelabil cu portofoliul — Digital Workflow Developer — Rapid Prototyping and Pilots for NATO with security clearance |  |
| Senior UX Engineer | Lenovo | disciplina nu se potrivește niciunui tier — Senior UX Engineer |  |

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
| 3 | **9.4** | Senior Shopify Web Designer | KittySpout | Bucharest, Romania | Full Time | nu | L=10 (remote detectat în text) |
| 4 | **9.4** | Product Designer - Mid level (Remote, Europe) | LearnWorlds | Romania | Full Time | nu | L=10 (remote detectat în text) |
| 5 | **9.1** | Senior Web Designer, Shopify | KittySpout | Bucharest, Romania, Fully Remote | Contract | nu | remote |

- Mercury360 :: Art Director — https://www.iqads.ro/adjob/23999/art-director-mercury360
- LUCA :: Graphic Designer — https://www.iqads.ro/adjob/23959/graphic-designer-luca
- KittySpout :: Senior Shopify Web Designer — https://designproject.io/jobs/senior-shopify-web-designer-at-kittyspout-gblhhk
- LearnWorlds :: Product Designer - Mid level (Remote, Europe) — https://designproject.io/jobs/product-designer-mid-level-remote-europe-at-learnworlds-06xtkh
- KittySpout :: Senior Web Designer, Shopify — https://designproject.io/jobs/senior-web-designer-shopify-at-kittyspout-i7v8bm

---

## 4. Postări GENUIN noi (nu doar "absente din raportul de ieri")

> "nou" în tabele înseamnă **"nu era în raportul de ieri"**, nu neapărat "postat azi". Iată ce e postat efectiv nou:

| Sursă | Cum am măsurat | Rezultat |
|---|---|---|
| **IQads** | ID-ul ad-ului crește monoton cu postarea. Cel mai mare ID din setul de ieri: **24006** | **0 anunțuri noi** |
| **designproject.io** | data de publicare vs. ultima rulare | **5 anunțuri noi** — cel mai recent de pe site e din **2026-11-03** |

- **designproject.io** — Senior Web Designer, Shopify @ KittySpout (postat Nov 3, 2026) — https://designproject.io/jobs/senior-web-designer-shopify-at-kittyspout-i7v8bm
- **designproject.io** — Senior Web Designer: DTC Ecommerce @ KittySpout (postat Nov 3, 2026) — https://designproject.io/jobs/senior-web-designer-dtc-ecommerce-at-kittyspout-2v3wla
- **designproject.io** — Freelance Web Designer: DTC Shopify @ KittySpout (postat Nov 3, 2026) — https://designproject.io/jobs/freelance-web-designer-dtc-shopify-at-kittyspout-74yl5m
- **designproject.io** — Shopify Brand & Web Designer @ KittySpout (postat Nov 3, 2026) — https://designproject.io/jobs/shopify-brand-and-web-designer-at-kittyspout-bqt798
- **designproject.io** — Senior Shopify Web Designer @ KittySpout (postat Nov 3, 2026) — https://designproject.io/jobs/senior-shopify-web-designer-at-kittyspout-gblhhk
**Concluzie:** 5 postareri noue de la ultima rulare.

Ce nu a mai apărut în raportul anterior, dar există în catalog (10 la număr, toate cu ✅ în tabele):

- **9.4** · Secția 1 · Senior Shopify Web Designer — KittySpout (designproject.io)
- **9.4** · Secția 1 · Product Designer - Mid level (Remote, Europe) — LearnWorlds (designproject.io)
- **9.1** · Secția 2 · Senior Web Designer, Shopify — KittySpout (designproject.io)
- **9.1** · Secția 2 · Senior Web Designer: DTC Ecommerce — KittySpout (designproject.io)
- **9.1** · Secția 2 · Freelance Web Designer: DTC Shopify — KittySpout (designproject.io)
- **9.1** · Secția 2 · Shopify Brand & Web Designer — KittySpout (designproject.io)
- **9.1** · Secția 2 · Graphic Designer (Freelance) — Jobgether (designproject.io)
- **9** · Secția 1 · Global Head of Design — Endava (designproject.io)
- **9** · Secția 1 · Experience Designer, UI & UX — Electronic Arts (designproject.io)
- **8.7** · Secția 1 · UX/UI Designer — pubGENIUS (designproject.io)

---

## 5. Ce n-a mers, măsurat

1. **3 din 9 categorii nu mai primesc nimic** (2 de 25 zile, 1 n-a fost folosită niciodată). Cauza pentru 3 dintre ele: **nu au filtru creat** (`Personal`, `De raspuns`, `Facturi si Conturi`) — deci nimic nu le poate eticheta, oricare ar fi criteriul. Starea filtrelor, masurata azi: **6 functioneaza, 0 sunt nefunctionale**. ~378 mesaje/7 zile stau in inbox.
2. **designproject.io servește descrieri foarte inegale** (3096–30430 de caractere pe cele 17 de joburi, măsurat azi). Cele mai lungi sunt rescrise de AI și injectează cuvinte-cheie care ridică axele — vezi §6.2.
3. **Celelalte două câmpuri de engagement ale designproject.io sunt inutilizabile.** `employmentType` din JSON-LD spune `FULL_TIME` pentru 17 din 17, iar badge-ul din listing spune "Full-time" pentru 17 din 17. Singura sură corectă e linia **"Job Type:"** din descriere — prezentă la 6 din 17. Am folosit asta.
4. **Paginatia IQads nu funcționează.** `?page=2` și `?page=3` servesc exact pagina 0 (aceleași 41 de linkuri — verificat azi pe 0, 2, 3). Catalogul complet e pe pagina 0 — nu iterez pagini.
5. **Cota Google: 122 cereri pe 200** (în limita plafonului). Consumul pe etape:

| Etapă | Cereri |
|---|---|
| `report-mail-count.js` | 68 |
| `report-filter-state.js` | 26 |
| `report-simulate-sort.js` | 13 |
| `report-inbox-counts.js` | 7 |
| `report-folder-discover.js` | 4 |
| `inline` | 1 |
| **total** | **122** |

> Rulare 2026-11-04 (raport zilnic). Contor pornit de la zero.

Ce a consumat cel mai mult: corpurile complete ale mesajelor de azi (11) — fără corp, nu se poate distinge un mesaj care cere răspuns de o alertă automată. **Zero scrieri pe Gmail** — niciun mail trimis, marcat sau arhivat, niciun filtru modificat.

---

## 6. Două semnalări ale motorului de scoring (portul rămâne fidel — decizia e a ta)

### 6.1 "remote" pozitiv fals — 1 joburi

| Rol | Companie | De ce e fals | L |
|---|---|---|---|
| Graphic Designer | LUCA | negatie: `nu se lucreaza remote` | 10 |

"Remote" apare în text, dar jobul **nu** e remote. `L` ar trebui să fie 8 (București) sau 0 (necunoscut), nu 10. Diferență: **0.4 puncte** per job. Nu am atins motorul — portul e fidel prin design.

### 6.2 Axa D ridicată de prosa, nu de titlu — 17 joburi (20 semnalări)

| Rol | Companie | Ce a ridicat axa | De unde |
|---|---|---|---|
| Media Relations Specialist | Confident Communications | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| PR Manager | Confident Communications | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Influencer & Creator Marketing Lead | Confident Communications | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Digital Marketing Specialist | Alpha Clinic | S=10 prin `"head of"` (—) | prosa anuntului |
| Digital Marketing Specialist | Alpha Clinic | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Product Designer - Mid level (Remote, Europe) | LearnWorlds | S=10 prin `"head of"` (—) | prosa anuntului |
| Freelance Web Designer: DTC Shopify | KittySpout | S=10 prin `"senior"` (—) | prosa anuntului |
| Shopify Brand & Web Designer | KittySpout | S=10 prin `"senior"` (—) | prosa anuntului |
| Graphic Designer (Freelance) | Jobgether | S=10 prin `"expert"` (—) | prosa anuntului |
| Global Head of Design | Endava | D=8 prin `"graphic design"` (Core Design) | prosa anuntului |
| Experience Designer, UI & UX | Electronic Arts | S=10 prin `"manager"` (—) | prosa anuntului |
| Experience Designer, UI & UX | Electronic Arts | D=8 prin `"visual design"` (Core Design) | prosa anuntului |
| Digital Marketing Specialist | GoTech World | S=8 prin `"principal"` (—) | prosa anuntului |
| Digital Marketing Specialist | GoTech World | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| UX/UI Designer | pubGENIUS | S=8 prin `"global"` (—) | prosa anuntului |
| Influence & Content Production Manager | Publicis | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Influence Lead | Publicis | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Digital Account Manager | WoPA | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Copywriter | Stefanini Infinit | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Digital Media Specialist / PPC | Stefanini Infinit | D=8 prin `"social media"` (Core Design) | prosa anuntului |

**Ce propun:** ca `D` să se calculeze din **titlul rolului**, nu din textul anunțului, sau măcar ca un rol să poată intra într-o secțiune doar dacă titlul conține o cheie de design. E o decizie de motor — nu am atins `scoring.gs` fără acordul tău.

---

## 7. Fișiere

- `rapoarte/RAPORT-ZILNIC-202611-04.md` — raportul acesta (și în repo)
- `mavis-tools/scoring-result-2026-11-04.json` — scoruri + secțiuni + diagnostice
- `mavis-tools/jobs-iqads-2026-11-04.json` — joburi IQads, text integral
- `mavis-tools/jobs-designproject-2026-11-04.json` — joburi designproject.io, JSON-LD
- `mavis-tools/jobs-2026-11-03.json` — setul normalizat de ieri (cu care s-a comparat)
- `mavis-tools/report-mail-count.json` — numărătoare pe etichetele de categorie
- `mavis-tools/report-inbox-counts.json` — numărătoare exactă inbox
- `mavis-tools/report-simulate-sort.json` — simularea sortării + mesajele de azi
- `mavis-tools/report-source-probe.json` — sonda de surse (comportamentul iqads.ro / designproject.io, măsurat azi)
- `mavis-tools/report-filter-state.json` — starea filtrelor Gmail + testul paranteze-vs-acolade (măsurat azi)
- `mavis-tools/report-triage.js` — clasificatorul mesajelor (needs-reply / needs-action / fyi / noise)
- `mavis-tools/taxonomy.js` — sursa unică pentru numele etichetelor de categorie (rezolvate live, nu hardcodate)

---

*Generat de Mavis Cloud. Nimic nu a fost șters, nimic nu a fost trimis, nimic nu a fost modificat în Gmail sau Drive. Totul e anulabil.*
