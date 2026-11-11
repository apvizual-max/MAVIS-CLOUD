# Raport zilnic — miercuri 11 noiembrie 2026

> Generat de Mavis Cloud · 21 mesaje noi măsurate azi (00:00–09:09 EEST) · 65 joburi analizate
> Cota Google: **126 cereri** (plafon 200 — **în limita plafonului**). Zero scrieri pe Gmail; tot consumul a fost măsurare și diagnostic. Detaliu în §5.
> Cifra e măsurată **la scrierea raportului**; verificarea conținutului de pe Drive (citire înapoi, după upload) mai adaugă **1 cerere**.

---

## 1. Gmail — etichetele de categorie

### 1.1 Rezultatul scurt
**Pe etichetele de categorie a intrat azi: 23 etichete.** În ultimele 24h: 122; în 7 zile: 764.

Azi au intrat **21 mesaje** în total, iar în inbox sunt **14**. **3 dintre ele nu au primit nicio etichetă de categorie** (nu se potrivesc niciunui filtru de categorie — deci rămân în inbox, neetichetate).

> **23 etichete pe 18 mesaje** — 5 mesaje primesc două etichete de categorie (ex. o alertă de job care intră și la „Joburi" și la „Newsletter"). De aceea suma pe etichete e mai mare decât numărul de mesaje distincte.

### 1.2 Măsurătoarea pe etichete (numărare exactă, cu paginare)

| Etichetă | azi | 24h | 7z | 30z | Ultimul mesaj etichetat |
|---|---|---|---|---|---|
| `MAVIS/Joburi` | 8 | 40 | 267 | 528 | Wed, 11 Nov 2026 |
| `AI Folder/AI si Comunitati` | 2 | 19 | 111 | 216 | Wed, 11 Nov 2026 |
| `Socials` | 3 | 7 | 32 | 67 | Wed, 11 Nov 2026 |
| `Newsletter` | 10 | 52 | 320 | 676 | Wed, 11 Nov 2026 |
| `Finante` | 0 | 2 | 16 | 38 | Tue, 10 Nov 2026 |
| `De raspuns` | 0 | 0 | 0 | 0 | n/a |
| `Facturi si Conturi` | 0 | 0 | 0 | 0 | n/a |
| `Optimus CD` | 0 | 2 | 18 | 1015 | Tue, 10 Nov 2026 |

**Concluzie:** 6 categorii primesc mesaje (`MAVIS/Joburi`, `AI Folder/AI si Comunitati`, `Socials`, `Newsletter`, `Finante`, `Optimus CD`); 2 categorii n-a fost folosită niciodată (0 pe 30 de zile, fără istoric) (`De raspuns`, `Facturi si Conturi`).

> Zero pe o fereastră nu înseamnă "etichetă goală" — înseamnă "eticheta nu mai primește nimic". Verificat pe 4 ferestre.

### 1.3 Filtrele, măsurate azi

Filtre cu criteriu de interogare pe cont: **7**, din 20 total. **7** dintre ele are `addLabelIds`, iar **6** atinge o etichetă de categorie. Criteriul celui de joburi, citit live azi:

```
from:{jooble bestjobs hipo indeed jobleads linkedin} OR subject:{job angajare vacanta oportunitate}
```

#### 6 filtre FUNCȚIONEAZĂ

**6 dintre 7 filtre lovesc efectiv mesaje.** `from:{jooble bestjobs hipo indeed jobleads linkedi…` → **1112** mesaje în 30 de zile, etichetează `joburi`; `from:{substack goatacademy aiautomationsociety sad…` → **435** mesaje în 30 de zile, etichetează `ai`; `from:{skool facebook instagram pinterest tiktok po…` → **137** mesaje în 30 de zile, etichetează `social`; `from:{noreply no-reply newsletter digest mail@ inf…` → **1291** mesaje în 30 de zile, etichetează `newsletter`; `from:{kraken tradingview bitunix coinbase binance}…` → **43** mesaje în 30 de zile, etichetează `finante`; `from:(notifications@github.com OR *jules*) OR subj…` → **1006** mesaje în 30 de zile, etichetează `agenti`


**Cele 1 filtre cu criteriu care nu lovesc niciun mesaj în 30 de zile** — cauza e calculată per filtru, nu spusă din memorie:

| Filtru | cum e scris acum | cum ar trebui scris (`{}`) | cauza |
|---|---|---|---|
| `from:@cloudhq.net OR from:cloudhq.us OR from:cloudhq.io OR…` | **0** | **0** | criteriu valid (`OR` explicit) și `addLabelIds` corect, dar 0 lovituri în 30 de zile: nu a venit niciun mail de la aceste surse în fereastră. Nu e o categorie a ta — eticheta țintă e `CATEGORY_PERSONAL` |

**Rescrierea cu `{}` nu ar aduce nimic** (0 mesaje în plus) — deci aici nu e o eroare de sintaxă, ci absența mesajelor de la aceste surse în fereastra măsurată.

**De ce nu le-am reparat azi:** scope-ul `gmail.settings.basic` **e acordat** (verificat live azi pe token, 29 scope-uri) — deci repararea se poate face și din cloud, prin **DELETE + CREATE** (`filters.update`/PUT → 404, `filters.patch`/PATCH → 404 „Method not found").

**Inboxul nu se golește.** Măsurat pe cele 21 mesaje de azi, etichetele lor reale: **14 sunt încă în INBOX**, dar **doar 2 au rămas UNREAD**. Deci filtrele **curăță „necitit"**, dar **nu scoate mesajele din inbox**:

| Fereastră | În inbox | În toate stările |
|---|---|---|
| azi | 14 | 21 |
| 24h | 51 | 84 |
| 7z | 388 | 555 |

**~388 mesaje stau în inbox într-o săptămână** (~55/zi).

### 1.4 Cum ar fi fost sortate mesajele de azi

Simulare pe cele 21 mesaje de azi, cu **aceleași criterii** ale filtrelor (fără scriere):

| Categorie | Mesaje azi |
|---|---|
| `MAVIS/Joburi` | 8 |
| `AI Folder/AI si Comunitati` | 3 |
| `Socials` | 3 |
| `Newsletter` | 10 |
| `Finante` | 0 |
| `De raspuns` | 0 |
| `Facturi si Conturi` | 0 |
| `Optimus CD` | 0 |
| *niciun filtru se potrivește* | 3 |

> Unele mesaje se potrivesc la 2 filtre (ex. "Joburi" + "Newsletter" de la LinkedIn), deci suma poate depăși 21.

**Observație:** **0 mesaje** de azi sunt notificări ale agenților tăi (Jules și GitHub Actions pe repo-urile proprii). Categoria dedicata lor e `Optimus CD`, care a primit 0 mesaje azi, iar filtrul ei functioneaza efectiv. In rest, **6 din 8 categorii** primesc mesaje, iar 2 nu primesc.


### 1.5 Mesajele care chiar necesită răspuns

Clasificarea e făcută din date, nu dintr-o listă scrisă cu mâna: 0 cer răspuns explicit, 6 cer o decizie, 3 sunt alerte de job care nu ating profilul tău, 12 sunt newsletter/promoție, 0 sunt zgomot de pipeline.

**Niciun mesaj nu cere explicit un răspuns.**

**Ceres o decizie sau o acțiune:**

- **Bestjobs** — 05:54 UTC. *Because you searched for design graphic bucuresti jobs* _(alerta de job cu rol de design)_ — Because you searched for design graphic bucuresti jobs Top jobs according to your activity: CV entries, job applications and job searches. Hi there, Alexandru Popescu ! Bestie, your career friend, is 
- **LinkedIn Job Alerts** — 05:50 UTC. *Uzum Team is hiring: Графический дизайнер Uzum Holding* _(alerta de job cu rol de design)_ — Uzum Team Графический дизайнер Uzum Holding: Telegram WhatsAppКого мы ищем:Ищем графического… Your job alert for Graphic Designer Графический дизайнер Uzum Holding Uzum Team Sector 3 See all jobs Mana
- **Bestjobs** — 05:49 UTC. *Job offers that fit your profile* _(alerta de job cu rol de design)_ — Job offers that fit your profile Top jobs according to your activity: CV entries, job applications and job searches. Hi there, Alexandru Popescu ! Bestie, your career friend, is on WhatsApp Get matchi
- **Jooble** — 04:51 UTC. *4PSA caută UI/UX Designer și 101 mai multe oferte noi de muncă* _(alerta de job cu rol de design)_ — LT-1 new concept 96 Anunțurile dvs. zilnice de oferte de muncă pentru 11 noiembrie, 2026 Verificați ofertele noi de muncă pe care le-am găsit pentru dvs. astăzi. Afișați toate ofertele noi de muncă (1
- **Google** — 04:09 UTC. *Security alert* _(alerta de securitate — cere verificare umana)_ — You allowed Antigravity for Gmail access to some of your Google Account data apvizual@gmail.com If you didn't allow Antigravity for Gmail access to some of your Google Account data, someone else may b
- **JobLeads** — 00:04 UTC. *Your skills + this role = Senior Graphic Designer for Brand, Campaigns & Experiences, Greater London* _(alerta de job cu rol de design)_ — 96 Don't miss your top job match today, Alexandru! Don't miss your top job match today, Alexandru! Your resume. Your goals. One perfect match. Senior Graphic Designer for Brand, Campaigns & Experience

**Alerte de job care NU ating profilul de design** (informativ, 3):

- Joburi Hipo.ro — 04:30 UTC · *Alex - 36 Joburi noi adaugate pentru tine pe hipo.ro*
- Jooble — 04:07 UTC · *🔔 Cosmoworker caută Top - Lucrător depozit - Colectare și ambalare comenzi  și 84 mai multe oferte noi de muncă*
- Glassdoor Jobs — 01:39 UTC · *Allianz has an opportunity for you. Apply Now.*

**Newsletter / promoție, fără acțiune** (12): Isha News, Mihai Svasta via LinkedIn, OTOPENI FREE SHOP, Project 720 (Skool), DocFreemason, AI Automation Society (Skool), AI Automation Vault (Skool), Supabase, Isha Foundation, Mikki Willis, Trezor, Prince Adewale

---
## 2. Joburi — scorate cu `ALEX-KIT/scoring.gs`

**65 joburi analizate** (IQads 39 + designproject.io 26) → 37 păstrate în tabele, 28 drop-uri, din care **16 cu verdict amânat** (locația nu e publicată de sursă). **0 joburi noi** față de 2026-11-10.

Surse: **IQads** (tabloul AdJob activ, citit azi) + **designproject.io** (România + București).

> ⛔ **Expirate marcate în tabele.** La IQads data de expirare vine direct din anunț. La designproject.io `validThrough` = data postării + 30 zile — măsurat pe toate cele 26 de joburi (26 exacte, 0 cu o zi de fus orar, 0 altfel), deci e o expirare reală, nu o derivare inutilă. 3 joburi din tabele au expirat și nu se mai pot aplica.

| | S | D | L | E |
|---|---|---|---|---|
| **S** — senioritate | 0.35 | | | |
| **D** — disciplină | | 0.30 | | |
| **L** — locație | | | 0.20 | |
| **E** — engagement | | | 0.15 | |

### 2.1 Secțiunea 1 — scor maxim — senior/lead, remote sau București, full-time (16)

| Scor | Tag | S/D/L/E | Rol | Companie | Locație | Engagement | Expirare | Nou |
|---|---|---|---|---|---|---|---|---
| **10** | [DTC] | 10/10/10/10 | UX Designer | E.ON | Iasi, Romania | Full Time | postat 2026-10-08 · expiră 2026-11-07 ⛔ **EXPIRAT** |
| **9.6** | [DTC] | 10/10/8/10 | Art Director / Graphic Designer | Cohn & Jansen | Bucuresti | Full Time | expiră 2026-12-27 |
| **9.6** | [DTC] | 10/10/8/10 | Art Director | Mercury360 | Bucuresti | Full Time | expiră 2026-12-25 |
| **9.4** | [DTC] | 10/8/10/10 | Media Relations Specialist | Confident Communications | Bucuresti | Full Time | expiră 2027-01-01 |
| **9.4** | [DTC] | 10/8/10/10 | PR Manager | Confident Communications | Bucuresti | Full Time | expiră 2027-01-01 |
| **9.4** | [B2B] | 10/8/10/10 | Influencer & Creator Marketing Lead | Confident Communications | Bucuresti | Full Time | expiră 2027-01-01 |
| **9.4** | [DTC] | 10/8/10/10 | Graphic Designer | LUCA | Bucuresti | Full Time | expiră 2026-11-13 |
| **9.4** | [B2B] | 10/8/10/10 | Product Designer | Jobgether | Romania, Fully Remote | Full Time, Contract | postat 2026-11-04 · expiră 2026-12-04 |
| **9.4** | [DTC] | 10/8/10/10 | Senior Shopify Web Designer | KittySpout | Bucharest, Romania | Full Time | postat 2026-11-03 · expiră 2026-12-03 |
| **9.4** | [B2B] | 10/8/10/10 | Product Designer - Mid level (Remote, Europe) | LearnWorlds | Romania | Full Time | postat 2026-10-30 · expiră 2026-11-29 |
| **9.4** | [B2C] | 10/8/10/10 | Senior Product Designer | Fluxon | Romania | Full Time | postat 2026-10-26 · expiră 2026-11-25 |
| **9.4** | [DTC] | 10/8/10/10 | Senior Product Designer | OPSWAT | Timisoara, Romania | Full Time | postat 2026-10-26 · expiră 2026-11-25 |
| **9.4** | [DTC] | 10/8/10/10 | 1173/ Senior UX Designer | Intetics | Romania | Full Time | postat 2026-10-07 · expiră 2026-11-06 ⛔ **EXPIRAT** |
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
- LUCA :: Graphic Designer — https://www.iqads.ro/adjob/23959/graphic-designer-luca
- Jobgether :: Product Designer — https://designproject.io/jobs/product-designer-at-jobgether-pqedji
- KittySpout :: Senior Shopify Web Designer — https://designproject.io/jobs/senior-shopify-web-designer-at-kittyspout-gblhhk
- LearnWorlds :: Product Designer - Mid level (Remote, Europe) — https://designproject.io/jobs/product-designer-mid-level-remote-europe-at-learnworlds-06xtkh
- Fluxon :: Senior Product Designer — https://designproject.io/jobs/senior-product-designer-at-fluxon-rntrqs
- OPSWAT :: Senior Product Designer — https://designproject.io/jobs/senior-product-designer-at-opswat-78h0hy
- Intetics :: 1173| Senior UX Designer — https://designproject.io/jobs/1173-senior-ux-designer-at-intetics-fzjoks
- Endava :: Global Head of Design — https://designproject.io/jobs/global-head-of-design-at-endava-a90ehj
- Electronic Arts :: Experience Designer, UI & UX — https://designproject.io/jobs/experience-designer-ui-and-ux-at-electronic-arts-tgvhpw
- pubGENIUS :: UX/UI Designer — https://designproject.io/jobs/uxui-designer-at-pubgenius-it82y1

### 2.2 Secțiunea 2 — contract / B2B — senioritate bună, engagement pe contract (5)

| Scor | Tag | S/D/L/E | Rol | Companie | Locație | Engagement | Expirare | Nou |
|---|---|---|---|---|---|---|---|---
| **9.1** | [DTC] | 10/8/10/8 | Senior Web Designer, Shopify | KittySpout | Bucharest, Romania, Fully Remote | Contract | postat 2026-11-03 · expiră 2026-12-03 |
| **9.1** | [DTC] | 10/8/10/8 | Senior Web Designer: DTC Ecommerce | KittySpout | Bucharest, Romania, Fully Remote | Contract | postat 2026-11-03 · expiră 2026-12-03 |
| **9.1** | [DTC] | 10/8/10/8 | Freelance Web Designer: DTC Shopify | KittySpout | Bucharest, Romania, Fully Remote | Contract | postat 2026-11-03 · expiră 2026-12-03 |
| **9.1** | [DTC] | 10/8/10/8 | Shopify Brand & Web Designer | KittySpout | Bucharest, Romania, Fully Remote | Contract | postat 2026-11-03 · expiră 2026-12-03 |
| **9.1** | [DTC] | 10/8/10/8 | Graphic Designer (Freelance) | Jobgether | Romania | Contract | postat 2026-10-29 · expiră 2026-11-28 |

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

### 2.5 Verdict amânat — locația nu e publicată de sursă (16)

| Scor | Rol | Companie | Locație | Engagement | Expirare | Nou |
|---|---|---|---|---|---|---|
| 8 | Art Director | Stefanini Infinit | neprecizată de sursă | Full Time | 2026-12-14 |  |
| 8 | Creative Lead | Stefanini Infinit | neprecizată de sursă | Full Time | 2026-12-14 |  |
| 8 | ART MID | ontheroof | neprecizată de sursă | Full Time | 2026-11-28 |  |
| 8 | Art Director | Saatchi & Saatchi | neprecizată de sursă | Full Time | 2026-11-15 |  |
| 7.4 | Content Creator | Stefanini Infinit | neprecizată de sursă | Full Time | 2027-01-08 |  |
| 7.4 | Social Media Lead | Stefanini Infinit | neprecizată de sursă | Full Time | 2027-01-08 |  |
| 7.4 | Senior Product & Visual Designer | theMarketer | neprecizată de sursă | Full Time | 2027-01-08 |  |
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
- Content Creator — Stefanini Infinit (IQads) — https://www.iqads.ro/adjob/24012/content-creator-stefanini-infinit
- Social Media Lead — Stefanini Infinit (IQads) — https://www.iqads.ro/adjob/24011/social-media-lead-stefanini-infinit
- Senior Product & Visual Designer — theMarketer (IQads) — https://www.iqads.ro/adjob/24010/senior-product-visual-designer-themarketer
- Social Media Content Creator — Digitas (IQads) — https://www.iqads.ro/adjob/24008/social-media-content-creator-digitas

### 2.6 Drop-uri (circuit breaker) — 28

| Rol | Companie | Motiv | Nou |
|---|---|---|---|
| Internship Client Service | Digital Distrikt Agency | rol junior/entry/intern — Internship Client Service |  |
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
| **IQads** | ID-ul ad-ului crește monoton cu postarea. Cel mai mare ID din setul de ieri: **24012** | **0 anunțuri noi** |
| **designproject.io** | data de publicare vs. ultima rulare | **0 anunțuri noi** — cel mai recent de pe site e din **2026-11-05** |

**Concluzie:** **nicio postare nouă față de ultima rulare.** Piața nu a produs nimic nou relevant azi.


---

## 5. Ce n-a mers, măsurat

1. **2 din 8 categorii nu mai primesc nimic** (2 n-a fost folosită niciodată). Cauza pentru 2 dintre ele: **nu au filtru creat** (`De raspuns`, `Facturi si Conturi`) — deci nimic nu le poate eticheta, oricare ar fi criteriul. Starea filtrelor, masurata azi: **6 functioneaza, 1 sunt nefunctionale** — cauza, măsurată per filtru: 0 din 1 au criteriu de tip `from:(...)` (paranteze = ȘI, acolade = SAU); restul au criteriu valid (OR explicit) și `addLabelIds` corect, dar nu a venit niciun mail de la aceste surse în fereastra măsurată. ~388 mesaje/7 zile stau in inbox.
2. **designproject.io servește descrieri foarte inegale** (2094–30619 de caractere pe cele 26 de joburi, măsurat azi). Cele mai lungi sunt rescrise de AI și injectează cuvinte-cheie care ridică axele — vezi §6.2.
3. **Celelalte două câmpuri de engagement ale designproject.io sunt inutilizabile.** `employmentType` din JSON-LD spune `FULL_TIME` pentru 26 din 26, iar badge-ul din listing spune "Full-time" pentru 26 din 26. Singura sură corectă e linia **"Job Type:"** din descriere — prezentă la 9 din 26. Am folosit asta.
4. **Paginatia IQads nu funcționează.** `?page=2` și `?page=3` servesc exact pagina 0 (aceleași 39 de linkuri — verificat azi pe 0, 2, 3). Catalogul complet e pe pagina 0 — nu iterez pagini.
5. **Cota Google: 126 cereri pe 200** (în limita plafonului). Consumul pe etape:

| Etapă | Cereri |
|---|---|
| `report-mail-count.js` | 61 |
| `report-filter-state.js` | 29 |
| `report-simulate-sort.js` | 23 |
| `report-inbox-counts.js` | 7 |
| `report-folder-discover.js` | 5 |
| **total** | **126** |

> Rulare 2026-11-11 (raport zilnic, re-rulare la 06:06 UTC). Contor pornit de la zero.

Ce a consumat cel mai mult: corpurile complete ale mesajelor de azi (21) — fără corp, nu se poate distinge un mesaj care cere răspuns de o alertă automată. **Zero scrieri pe Gmail** — niciun mail trimis, marcat sau arhivat, niciun filtru modificat.

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

### 6.2 Axa D ridicată de prosa, nu de titlu — 18 joburi (20 semnalări)

| Rol | Companie | Ce a ridicat axa | De unde |
|---|---|---|---|
| UX Designer | E.ON | S=10 prin `"art director"` (—) | prosa anuntului |
| UX Designer | E.ON | D=10 prin `"art director"` (Creative Leadership) | prosa anuntului |
| Media Relations Specialist | Confident Communications | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| PR Manager | Confident Communications | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Influencer & Creator Marketing Lead | Confident Communications | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Product Designer | Jobgether | S=10 prin `"senior"` (—) | prosa anuntului |
| Product Designer - Mid level (Remote, Europe) | LearnWorlds | S=10 prin `"head of"` (—) | prosa anuntului |
| Freelance Web Designer: DTC Shopify | KittySpout | S=10 prin `"senior"` (—) | prosa anuntului |
| Shopify Brand & Web Designer | KittySpout | S=10 prin `"senior"` (—) | prosa anuntului |
| Graphic Designer (Freelance) | Jobgether | S=10 prin `"expert"` (—) | prosa anuntului |
| Global Head of Design | Endava | D=8 prin `"graphic design"` (Core Design) | prosa anuntului |
| Experience Designer, UI & UX | Electronic Arts | S=10 prin `"manager"` (—) | prosa anuntului |
| Experience Designer, UI & UX | Electronic Arts | D=8 prin `"visual design"` (Core Design) | prosa anuntului |
| UX/UI Designer | pubGENIUS | S=8 prin `"global"` (—) | prosa anuntului |
| Content Creator | Stefanini Infinit | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Influence & Content Production Manager | Publicis | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Influence Lead | Publicis | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Digital Account Manager | WoPA | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Copywriter | Stefanini Infinit | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Digital Media Specialist / PPC | Stefanini Infinit | D=8 prin `"social media"` (Core Design) | prosa anuntului |

**Ce propun:** ca `D` să se calculeze din **titlul rolului**, nu din textul anunțului, sau măcar ca un rol să poată intra într-o secțiune doar dacă titlul conține o cheie de design. E o decizie de motor — nu am atins `scoring.gs` fără acordul tău.

---

## 7. Fișiere

- `rapoarte/RAPORT-ZILNIC-202611-11.md` — raportul acesta (și în repo)
- `mavis-tools/scoring-result-2026-11-11.json` — scoruri + secțiuni + diagnostice
- `mavis-tools/jobs-iqads-2026-11-11.json` — joburi IQads, text integral
- `mavis-tools/jobs-designproject-2026-11-11.json` — joburi designproject.io, JSON-LD
- `mavis-tools/jobs-2026-11-10.json` — setul normalizat de ieri (cu care s-a comparat)
- `mavis-tools/report-mail-count.json` — numărătoare pe etichetele de categorie
- `mavis-tools/report-inbox-counts.json` — numărătoare exactă inbox
- `mavis-tools/report-simulate-sort.json` — simularea sortării + mesajele de azi
- `mavis-tools/report-source-probe.json` — sonda de surse (comportamentul iqads.ro / designproject.io, măsurat azi)
- `mavis-tools/report-filter-state.json` — starea filtrelor Gmail + testul paranteze-vs-acolade (măsurat azi)
- `mavis-tools/report-triage.js` — clasificatorul mesajelor (needs-reply / needs-action / fyi / noise)
- `mavis-tools/taxonomy.js` — sursa unică pentru numele etichetelor de categorie (rezolvate live, nu hardcodate)

---

*Generat de Mavis Cloud. Nimic nu a fost șters, nimic nu a fost trimis, nimic nu a fost modificat în Gmail sau Drive. Totul e anulabil.*
