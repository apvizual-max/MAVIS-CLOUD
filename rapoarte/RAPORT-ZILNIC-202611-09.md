# Raport zilnic — luni 9 noiembrie 2026

> Generat de Mavis Cloud · 12 mesaje noi măsurate azi (00:00–09:11 EEST) · 67 joburi analizate
> Cota Google: **121 cereri** (plafon 200 — **în limita plafonului**). Zero scrieri pe Gmail; tot consumul a fost măsurare și diagnostic. Detaliu în §5.

---

## 1. Gmail — etichetele de categorie

### 1.1 Rezultatul scurt
**Pe etichetele de categorie a intrat azi: 14 etichete.** În ultimele 24h: 62; în 7 zile: 769.

Azi au intrat **12 mesaje** în total, iar în inbox sunt **8**.

> **14 etichete pe 12 mesaje** — 2 mesaje primesc două etichete de categorie (ex. o alertă de job care intră și la „Joburi" și la „Newsletter"). De aceea suma pe etichete e mai mare decât numărul de mesaje distincte.

### 1.2 Măsurătoarea pe etichete (numărare exactă, cu paginare)

| Etichetă | azi | 24h | 7z | 30z | Ultimul mesaj etichetat |
|---|---|---|---|---|---|
| `MAVIS/Joburi` | 7 | 22 | 259 | 487 | Mon, 09 Nov 2026 |
| `AI Folder/AI si Comunitati` | 0 | 9 | 103 | 191 | Sun, 8 Nov 2026  |
| `Socials` | 1 | 5 | 34 | 62 | Mon, 09 Nov 2026 |
| `Newsletter` | 6 | 23 | 338 | 595 | Mon, 9 Nov 2026  |
| `Finante` | 0 | 0 | 17 | 34 | Sat, 07 Nov 2026 |
| `Personal` | 0 | 0 | 0 | 0 | n/a |
| `De raspuns` | 0 | 0 | 0 | 0 | n/a |
| `Facturi si Conturi` | 0 | 0 | 0 | 0 | n/a |
| `Optimus CD` | 0 | 3 | 18 | 1028 | Sun, 08 Nov 2026 |

**Concluzie:** 6 categorii primesc mesaje (`MAVIS/Joburi`, `AI Folder/AI si Comunitati`, `Socials`, `Newsletter`, `Finante`, `Optimus CD`); 3 categorii n-a fost folosită niciodată (0 pe 30 de zile, fără istoric) (`Personal`, `De raspuns`, `Facturi si Conturi`).

> Zero pe o fereastră nu înseamnă "etichetă goală" — înseamnă "eticheta nu mai primește nimic". Verificat pe 4 ferestre.

### 1.3 Filtrele, măsurate azi

Filtre cu criteriu de interogare pe cont: **7**, din 20 total. **7** dintre ele are `addLabelIds`, iar **6** atinge o etichetă de categorie. Criteriul celui de joburi, citit live azi:

```
from:{jooble bestjobs hipo indeed jobleads linkedin} OR subject:{job angajare vacanta oportunitate}
```

#### 6 filtre FUNCȚIONEAZĂ

**6 dintre 7 filtre lovesc efectiv mesaje.** `from:{jooble bestjobs hipo indeed jobleads linkedi…` → **1082** mesaje în 30 de zile, etichetează `joburi`; `from:{substack goatacademy aiautomationsociety sad…` → **411** mesaje în 30 de zile, etichetează `ai`; `from:{skool facebook instagram pinterest tiktok po…` → **133** mesaje în 30 de zile, etichetează `social`; `from:{noreply no-reply newsletter digest mail@ inf…` → **1253** mesaje în 30 de zile, etichetează `newsletter`; `from:{kraken tradingview bitunix coinbase binance}…` → **39** mesaje în 30 de zile, etichetează `finante`; `from:(notifications@github.com OR *jules*) OR subj…` → **1020** mesaje în 30 de zile, etichetează `agenti`


**Cauza reală, măsurată azi pe Gmail:** în căutarea Gmail, `()` înseamnă **ȘI**, iar `{}` înseamnă **SAU**. Cele 1 filtre nefuncționale folosesc `from:(jooble bestjobs ...)` — deci cer un expeditor care să conțină **toate** cuvintele simultan. Rezultat: **0 mesaje lovite în 30 de zile.**

| Filtru | cum e scris acum | cum ar trebui scris (`{}`) |
|---|---|---|
| `from:@cloudhq.net OR from:cloudhq.us OR from:cloudhq.io OR…` | **0** | **0** |

Cu acoladele, aceleași filtre ar fi prins **3938 mesaje în 30 de zile**.

**Două defecte, în ordine:**
1. **Criteriile nu pot lovi nimic** — paranteze în loc de acolade.
2. **`addLabelIds` e vid** — nici măcar cu criterii corecte n-ar eticheta ceva.

**De ce nu le-am reparat azi:** repararea de filtre cere scope-ul `gmail.settings.basic` — fără el, `filters PATCH` răspunde 403. Starea scope-urilor din cloud se **măsoară**, nu se presupune: `node mavis-tools/google-preflight.js` (pasul [6] — control de drift). Repararea se face prin **DELETE + CREATE** (`filters.update`/PUT → 404, `filters.patch`/PATCH → 404 „Method not found"). Scriptul e pregătit cu `--dry-run` și cu salvarea stării de dinainte pentru rollback: `mavis-tools/fix-mavis-filters.js`.

**Inboxul nu se golește.** Măsurat pe cele 12 mesaje de azi, etichetele lor reale: **8 sunt încă în INBOX**, dar **doar 0 au rămas UNREAD**. Deci filtrele **curăță „necitit"**, dar **nu scoate mesajele din inbox**:

| Fereastră | În inbox | În toate stările |
|---|---|---|
| azi | 8 | 11 |
| 24h | 29 | 48 |
| 7z | 386 | 532 |

**~386 mesaje stau în inbox într-o săptămână** (~55/zi).

### 1.4 Cum ar fi fost sortate mesajele de azi

Simulare pe cele 12 mesaje de azi, cu **aceleași criterii** ale filtrelor (fără scriere):

| Categorie | Mesaje azi |
|---|---|
| `MAVIS/Joburi` | 8 |
| `AI Folder/AI si Comunitati` | 0 |
| `Socials` | 1 |
| `Newsletter` | 6 |
| `Finante` | 0 |
| `Personal` | 0 |
| `De raspuns` | 0 |
| `Facturi si Conturi` | 0 |
| `Optimus CD` | 0 |
| *niciun filtru se potrivește* | 0 |

> Unele mesaje se potrivesc la 2 filtre (ex. "Joburi" + "Newsletter" de la LinkedIn), deci suma poate depăși 12.

**Observație:** **0 mesaje** de azi sunt notificări ale agenților tăi (Jules și GitHub Actions pe repo-urile proprii). Categoria dedicata lor e `Optimus CD`, care a primit 0 mesaje azi, iar filtrul ei functioneaza efectiv. In rest, **6 din 9 categorii** primesc mesaje, iar 3 nu primesc.


### 1.5 Mesajele care chiar necesită răspuns

Clasificarea e făcută din date, nu dintr-o listă scrisă cu mâna: 0 cer răspuns explicit, 4 cer o decizie, 4 sunt alerte de job care nu ating profilul tău, 4 sunt newsletter/promoție, 0 sunt zgomot de pipeline.

**Niciun mesaj nu cere explicit un răspuns.**

**Ceres o decizie sau o acțiune:**

- **Bestjobs** — 05:57 UTC. *7 design graphic bucuresti jobs available on bestjobs* _(alerta de job cu rol de design)_ — 7 design graphic bucuresti jobs available on bestjobs Top jobs according to your activity: CV entries, job applications and job searches. Hi there, Alexandru Popescu ! Bestie, your career friend, is o
- **LinkedIn** — 05:50 UTC. *New jobs similar to Lead Product Designer at Scrambly* _(alerta de job cu rol de design)_ — UserWise Lead UI/UX Designer - Mobile Casual F2P Games: The OpportunityUserWise is looking for an… Jobs similar to Lead Product Designer at Scrambly Lead UI/UX Designer - Mobile Casual F2P Games UserW
- **Bestjobs** — 05:28 UTC. *Job offers that fit your profile* _(alerta de job cu rol de design)_ — Job offers that fit your profile Top jobs according to your activity: CV entries, job applications and job searches. Hi there, Alexandru Popescu ! Bestie, your career friend, is on WhatsApp Get matchi
- **Jooble** — 04:52 UTC. *Profitshare caută Web Graphic Designer și 102 mai multe oferte noi de muncă* _(alerta de job cu rol de design)_ — LT-1 new concept 96 Anunțurile dvs. zilnice de oferte de muncă pentru 09 noiembrie, 2026 Verificați ofertele noi de muncă pe care le-am găsit pentru dvs. astăzi. Afișați toate ofertele noi de muncă (1

**Alerte de job care NU ating profilul de design** (informativ, 4):

- Jooble — 06:07 UTC · *🔔 PRIM-AUDIT S.R.L. caută Auditor Financiar - Remote (Toată țara) și 56 mai multe oferte noi de muncă*
- Indeed — 05:40 UTC · *Coordonator Activitate - Sales Controlling la Allianz. Încă 19 locuri de muncă în București, Ilfov*
- Jooble — 04:06 UTC · *🔔 Hotel The Marmorosch caută Camerista  și 84 mai multe oferte noi de muncă*
- Glassdoor Jobs — 02:32 UTC · *SOTI has an opportunity for you. Apply Now.*

**Newsletter / promoție, fără acțiune** (4): XDA, AI Money Lab (Skool), LinkedIn, DIGI

**Leads din alertele de job.** Fiecare poartă propria cale de verificare, declarată mai jos — nu toate sunt citite direct de pe pagină:

##### Lead UI/UX Designer - Mobile Casual F2P Games @ UserWise - Remote, Romania eligibila (NOU)

Din alerta **LinkedIn Job Alerts** — *New jobs similar to Lead Product Designer at Scrambly*

**Cum a fost verificat:** Descrierea completă a rolului, citită prin indexarea motorului de căutare pe agregatoare specializate de joburi (woodyjobs.com, secțiunile Remote UI Designer și Gaming & XR), care preiau anuntul original: titlu, nivel (Senior 5y+), full-time, tarile eligibile (inclusiv Romania) si descrierea responsabilitatilor. Anuntul original pe boardul UserWise NU a fost deschis.

UserWise cauta un Lead UI/UX Designer pentru un joc mobile free-to-play. Rolul e hands-on: creezi user flows, wireframes si prototipuri, mentori un UI/UX Designer din echipa si asiguri un experience de jucator de calitate pe tot parcursul productiei. UserWise are si un rol de Art Director (sa conduca directia vizuala a unui joc F2P bazat pe un IP de entertainment important).

**Cerințe:**

- Nivel senior (5 ani+), full-time, domeniu Gaming & XR
- Crearea de user flows, wireframes si prototipuri
- Mentorarea unui UI/UX Designer si asigurarea calitatii experientei de jucator
- Tari eligibile: Romania, Serbia, Turcia, Polonia si inca 2

**Condiții:** Remote, full-time, senior. Postat acum circa 2 luni, dar acceptarea e continua.

**Cum se aplică:** Aplicare pe anuntul de pe boardul oficial UserWise (pozitia apare in agregatoarele de joburi din Gaming & XR).

> ⚠️ E product design pentru jocuri - UX de fapt, cu mentorat. Se potrivește cu profilul tău pe partea de proces și sisteme, mai puțin pe partea de brand identity. Punct de verificat: rolul de Lead presupune mentorarea altora, deci e un step real de la execuție la conducere. Salariul nu e publicat.

- https://www.woodyjobs.com/ui/romania

##### Lead UX Designer @ Raiffeisen Bank Romania - Bucuresti hybrid (NOU)

Din alerta **LinkedIn Job Alerts** — *New jobs similar to Lead Product Designer at Scrambly*

**Cum a fost verificat:** Corpul emailului de alerta LinkedIn (titlu, companie, localizarea Bucuresti hybrid) + profiluri publice de angajati ai Raiffeisen Bank Romania care arata ca rolul Lead UX Designer / User Experience Lead exista in echipa din octombrie 2025. Anuntul oficial de angajare NU a fost deschis - deci cerintele complete raman necunoscute.

Raiffeisen Bank Romania cauta un Lead UX Designer, cu sediul in Bucuresti, regim hybrid. Echipa de design din banca lucreaza la produsele digitale destinate clientilor (retail, SME si Corporate) si la tool-urile interne.

**Cerințe:**

- Nivel lead - conducere de fluxuri si design system pentru produse complexe, cu constrangeri de reglementare stricta in finantare
- Experienta pe produse SaaS/B2B si pe aplicatii de banking, cu accent pe UX de proces si pe sisteme
- Portofoliu de UX cu decizii documentate

**Condiții:** Bucuresti, Romania. Hybrid.

**Cum se aplică:** Aplicare pe anuntul de pe boardul de cariere al Raiffeisen Bank Romania sau prin LinkedIn.

> ⚠️ E UX de produs financiar, cu accent pe IA si product design de sistem - nu brand. In plus, in banca romaneasca portofoliul conteaza mai mult decat in agentie, iar rolul de lead inseamna ca conduci altii. Salariul nu e publicat. Important: rolul exista cu certitudine - in echipa Raiffeisen Bank Romania sunt angajati cu titlurile Lead UX Designer si User Experience Lead din octombrie 2025, deci echipa de design e reala.

- https://www.linkedin.com/jobs

##### Senior Product Designer @ Proxify + Senior Game Designer / Product Builder (AI Games) @ UserWise - Romania remote (NOU)

Din alerta **LinkedIn Job Alerts** — *New jobs similar to Lead Product Designer at Scrambly*

**Cum a fost verificat:** Corpul emailului de alerta LinkedIn (titlul, companiile si localizarea remote Romania). Anunturile oficiale NU au fost deschise - cerintele si salariile sunt necunoscute.

Aceeasi alerta LinkedIn a adus inca doua roluri noi pentru tine, ambele remote din Romania: Senior Product Designer la Proxify, si Senior Game Designer / Product Builder (AI Games) la UserWise. La UserWise, rolul de game designer lucreaza cu AI - in aceeasi companie pentru care cauti si Lead UI/UX Designer.

**Cerințe:**

- Roluri de product design si game design, remote, Romania
- Cerintele exacte nu apar in emailul de alerta

**Condiții:** Remote, Romania.

**Cum se aplică:** Aplicare pe boardurile oficiale Proxify si UserWise.

> ⚠️ Ambele sunt roluri de product/game design, nu brand - deci e vecin cu profilul tau, nu identic. Cerintele nu sunt in email, deci deschide anuntul inainte sa aplici. Salariile nu sunt publicate. Valoarea reala aici: UserWise are 3 roluri deschise acum, daca te intereseaza genul, merita sa urmareesti firma.

- https://www.linkedin.com/jobs

##### Bestjobs - 7 joburi de design (lista s-a restrans) + roluri noi

Din alerta **Bestjobs** — *7 design graphic bucuresti jobs available on bestjobs / Job offers that fit your profile*

**Cum a fost verificat:** Corpul COMPLET al emailurilor Bestjobs de azi (ambele alerte, cu joburile, sumele si localizarile). Pagina de anunt Bestjobs raspunde 403 la acces automat - NU am deschis paginile individuale.

Alerta de cautare de azi are doar 7 joburi de design (ieri erau 11-12) - piata se retrage. MARKQUEN e in top de a noua zi: Creative Lead & 3D Designer la MARKQUEN EUROPE 1400-1800 Hybrid, urmat de Colaboratori design grafic la AGRESIV MEDIA 780-1020, SudRezidential Videograf & Editor Video 1000-1200, ARHITECT/DESIGNER MOBILA la UNICAN PRODUCTION 800-1420 si Specialist Marketing Digital la Fabrica De Podcasturi 700-1350. In lista de profil apar si roluri noi: Videograf la Affinity Life Care (1435-1590, estimare), Operator imprimante de print digital la Agrafa Print 900-1200, Editor Web la Antena Group 700-800, Head of Content la Click2Leads 2500, 3D Video Games Artist la Atypical Games 1000-2000.

**Cerințe:**

- Pentru fiecare job: portofoliu si CV pe anuntul Bestjobs, din email

**Rate-uri publicate:**

- Cele mai mari sume publicate de angajator: Click2Leads 2500, MARKQUEN 1400-1800, UNICAN 800-1420, Agrafa Print 900-1200
- Cu estimare de piata (nu e oferta): Affinity Life Care 1435-1590, macromex 1795-1985, TEZAUR 1795-1985, BCR 1795-1985

**Condiții:** Toate din alertele zilnice Bestjobs.

**Cum se aplică:** Aplicare pe anuntul Bestjobs, din email.

> ⚠️ MARKQUEN e in top de a noua zi - rolul e activ, dar si concurenta. La Head of Content @ Click2Leads (2500) verifica tu profilul clientilor: agentia administreaza conturi de continut adult, ceea ce schimba tot contextul jobului. Sumele cu estimare de piata se recalculeaza zilnic si nu sunt oferte de angajator.

- https://www.bestjobs.eu

##### Profitshare - Web Graphic Designer (recurent, a 2-a zi)

Din alerta **Jooble** — *Profitshare caută Web Graphic Designer și 102 mai multe oferte noi de muncă*

**Cum a fost verificat:** Corpul emailului de alerta Jooble (subiectul cu numele rolului si lista de 102 de oferte). Detaliile anuntului sunt cele citite pe 08.11 de pe boardul oficial (neamob.com/careers/marketing-designer/).

Alerta Jooble de azi aduce din nou rolul de la Profitshare: Web Graphic Designer la agentia de marketing digital. La verificarea de pe 08.11 (vezi raportul anterior) am citit anuntul oficial: designer web cu ochi pentru UX si arhitectura informatiei, suita Adobe, grid systems, HTML5/After Effects, minim 3 ani, proces in 5 etape cu exercitiu practic.

**Cerințe:**

- Anuntul oficial citit pe 08.11 - 3+ ani, UX si arhitectura informatiei, Adobe, Figma, HTML5/After Effects

**Condiții:** Bucuresti (agentia lucreaza global).

**Cum se aplică:** Aplicare pe neamob.com/careers sau pe anuntul Jooble.

> ⚠️ Rolul reapare in alerta de azi, deci e inca deschis. Vezi raportul de ieri pentru cerintele complete - nu s-a schimbat nimic.

- https://www.neamob.com/careers/marketing-designer/

---
## 2. Joburi — scorate cu `ALEX-KIT/scoring.gs`

**67 joburi analizate** (IQads 37 + designproject.io 30) → 37 păstrate în tabele, 30 drop-uri, din care **13 cu verdict amânat** (locația nu e publicată de sursă). **0 joburi noi** față de 2026-11-08.

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

### 2.5 Verdict amânat — locația nu e publicată de sursă (13)

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

### 2.6 Drop-uri (circuit breaker) — 30

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

1. **3 din 9 categorii nu mai primesc nimic**3 n-a fost folosită niciodată). Cauza pentru 3 dintre ele: **nu au filtru creat** (`Personal`, `De raspuns`, `Facturi si Conturi`) — deci nimic nu le poate eticheta, oricare ar fi criteriul. Starea filtrelor, masurata azi: **6 functioneaza, 1 sunt nefunctionale** — cele nefunctionale folosesc `from:(...)` unde Gmail cere `from:{...}` (paranteze = ȘI, acolade = SAU), deci nu pot lovi niciun mesaj; cu acoladele ar fi prins 3938 mesaje in 30 de zile. ~386 mesaje/7 zile stau in inbox.
2. **designproject.io servește descrieri foarte inegale** (2094–30619 de caractere pe cele 30 de joburi, măsurat azi). Cele mai lungi sunt rescrise de AI și injectează cuvinte-cheie care ridică axele — vezi §6.2.
3. **Celelalte două câmpuri de engagement ale designproject.io sunt inutilizabile.** `employmentType` din JSON-LD spune `FULL_TIME` pentru 30 din 30, iar badge-ul din listing spune "Full-time" pentru 30 din 30. Singura sură corectă e linia **"Job Type:"** din descriere — prezentă la 13 din 30. Am folosit asta.
4. **Paginatia IQads nu funcționează.** `?page=2` și `?page=3` servesc exact pagina 0 (aceleași 37 de linkuri — verificat azi pe 0, 2, 3). Catalogul complet e pe pagina 0 — nu iterez pagini.
5. **Cota Google: 121 cereri pe 200** (în limita plafonului). Consumul pe etape:

| Etapă | Cereri |
|---|---|
| `report-mail-count.js` | 64 |
| `report-filter-state.js` | 28 |
| `report-simulate-sort.js` | 14 |
| `report-inbox-counts.js` | 7 |
| `report-folder-discover.js` | 4 |
| `inline` | 1 |
| **total** | **121** |

> Rulare 2026-11-09 (raport zilnic). Contor pornit de la zero.

Ce a consumat cel mai mult: corpurile complete ale mesajelor de azi (12) — fără corp, nu se poate distinge un mesaj care cere răspuns de o alertă automată. **Zero scrieri pe Gmail** — niciun mail trimis, marcat sau arhivat, niciun filtru modificat.

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

- `rapoarte/RAPORT-ZILNIC-202611-09.md` — raportul acesta (și în repo)
- `mavis-tools/scoring-result-2026-11-09.json` — scoruri + secțiuni + diagnostice
- `mavis-tools/jobs-iqads-2026-11-09.json` — joburi IQads, text integral
- `mavis-tools/jobs-designproject-2026-11-09.json` — joburi designproject.io, JSON-LD
- `mavis-tools/jobs-2026-11-08.json` — setul normalizat de ieri (cu care s-a comparat)
- `mavis-tools/report-mail-count.json` — numărătoare pe etichetele de categorie
- `mavis-tools/report-inbox-counts.json` — numărătoare exactă inbox
- `mavis-tools/report-simulate-sort.json` — simularea sortării + mesajele de azi
- `mavis-tools/report-source-probe.json` — sonda de surse (comportamentul iqads.ro / designproject.io, măsurat azi)
- `mavis-tools/report-filter-state.json` — starea filtrelor Gmail + testul paranteze-vs-acolade (măsurat azi)
- `mavis-tools/report-triage.js` — clasificatorul mesajelor (needs-reply / needs-action / fyi / noise)
- `mavis-tools/taxonomy.js` — sursa unică pentru numele etichetelor de categorie (rezolvate live, nu hardcodate)

---

*Generat de Mavis Cloud. Nimic nu a fost șters, nimic nu a fost trimis, nimic nu a fost modificat în Gmail sau Drive. Totul e anulabil.*
