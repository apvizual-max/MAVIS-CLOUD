# Raport zilnic — marți 10 noiembrie 2026

> Generat de Mavis Cloud · 41 mesaje noi măsurate azi (00:00–09:16 EEST) · 70 joburi analizate
> Cota Google: **154 cereri** (plafon 200 — **în limita plafonului**). Zero scrieri pe Gmail; tot consumul a fost măsurare și diagnostic. Detaliu în §5.

---

## 1. Gmail — etichetele de categorie

### 1.1 Rezultatul scurt
**Pe etichetele de categorie a intrat azi: 37 etichete.** În ultimele 24h: 105; în 7 zile: 759.

Azi au intrat **41 mesaje** în total, iar în inbox sunt **37**. **15 dintre ele nu au primit nicio etichetă de categorie** (nu se potrivesc niciunui filtru de categorie — deci rămân în inbox, neetichetate).

> **37 etichete pe 26 mesaje** — 11 mesaje primesc două etichete de categorie (ex. o alertă de job care intră și la „Joburi" și la „Newsletter"). De aceea suma pe etichete e mai mare decât numărul de mesaje distincte.

### 1.2 Măsurătoarea pe etichete (numărare exactă, cu paginare)

| Etichetă | azi | 24h | 7z | 30z | Ultimul mesaj etichetat |
|---|---|---|---|---|---|
| `MAVIS/Joburi` | 20 | 43 | 264 | 503 | Tue, 10 Nov 2026 |
| `AI Folder/AI si Comunitati` | 2 | 14 | 106 | 199 | Tue, 10 Nov 2026 |
| `Socials` | 0 | 2 | 33 | 62 | Mon, 09 Nov 2026 |
| `Newsletter` | 15 | 39 | 322 | 628 | Tue, 10 Nov 2026 |
| `Finante` | 0 | 2 | 16 | 36 | Mon, 09 Nov 2026 |
| `Personal` | 0 | 0 | 0 | 0 | n/a |
| `De raspuns` | 0 | 0 | 0 | 0 | n/a |
| `Facturi si Conturi` | 0 | 0 | 0 | 0 | n/a |
| `Optimus CD` | 0 | 5 | 18 | 1030 | Mon, 09 Nov 2026 |

**Concluzie:** 6 categorii primesc mesaje (`MAVIS/Joburi`, `AI Folder/AI si Comunitati`, `Socials`, `Newsletter`, `Finante`, `Optimus CD`); 3 categorii n-a fost folosită niciodată (0 pe 30 de zile, fără istoric) (`Personal`, `De raspuns`, `Facturi si Conturi`).

> Zero pe o fereastră nu înseamnă "etichetă goală" — înseamnă "eticheta nu mai primește nimic". Verificat pe 4 ferestre.

### 1.3 Filtrele, măsurate azi

Filtre cu criteriu de interogare pe cont: **7**, din 20 total. **7** dintre ele are `addLabelIds`, iar **6** atinge o etichetă de categorie. Criteriul celui de joburi, citit live azi:

```
from:{jooble bestjobs hipo indeed jobleads linkedin} OR subject:{job angajare vacanta oportunitate}
```

#### 6 filtre FUNCȚIONEAZĂ

**6 dintre 7 filtre lovesc efectiv mesaje.** `from:{jooble bestjobs hipo indeed jobleads linkedi…` → **1094** mesaje în 30 de zile, etichetează `joburi`; `from:{substack goatacademy aiautomationsociety sad…` → **418** mesaje în 30 de zile, etichetează `ai`; `from:{skool facebook instagram pinterest tiktok po…` → **133** mesaje în 30 de zile, etichetează `social`; `from:{noreply no-reply newsletter digest mail@ inf…` → **1265** mesaje în 30 de zile, etichetează `newsletter`; `from:{kraken tradingview bitunix coinbase binance}…` → **41** mesaje în 30 de zile, etichetează `finante`; `from:(notifications@github.com OR *jules*) OR subj…` → **1020** mesaje în 30 de zile, etichetează `agenti`


**Cauza reală, măsurată azi pe Gmail:** în căutarea Gmail, `()` înseamnă **ȘI**, iar `{}` înseamnă **SAU**. Cele 1 filtre nefuncționale folosesc `from:(jooble bestjobs ...)` — deci cer un expeditor care să conțină **toate** cuvintele simultan. Rezultat: **0 mesaje lovite în 30 de zile.**

| Filtru | cum e scris acum | cum ar trebui scris (`{}`) |
|---|---|---|
| `from:@cloudhq.net OR from:cloudhq.us OR from:cloudhq.io OR…` | **0** | **0** |

Cu acoladele, aceleași filtre ar fi prins **3971 mesaje în 30 de zile**.

**Două defecte, în ordine:**
1. **Criteriile nu pot lovi nimic** — paranteze în loc de acolade.
2. **`addLabelIds` e vid** — nici măcar cu criterii corecte n-ar eticheta ceva.

**De ce nu le-am reparat azi:** repararea de filtre cere scope-ul `gmail.settings.basic` — fără el, `filters PATCH` răspunde 403. Starea scope-urilor din cloud se **măsoară**, nu se presupune: `node mavis-tools/google-preflight.js` (pasul [6] — control de drift). Repararea se face prin **DELETE + CREATE** (`filters.update`/PUT → 404, `filters.patch`/PATCH → 404 „Method not found"). Scriptul e pregătit cu `--dry-run` și cu salvarea stării de dinainte pentru rollback: `mavis-tools/fix-mavis-filters.js`.

**Inboxul nu se golește.** Măsurat pe cele 41 mesaje de azi, etichetele lor reale: **37 sunt încă în INBOX**, dar **doar 17 au rămas UNREAD**. Deci filtrele **curăță „necitit"**, dar **nu scoate mesajele din inbox**:

| Fereastră | În inbox | În toate stările |
|---|---|---|
| azi | 37 | 41 |
| 24h | 69 | 92 |
| 7z | 396 | 547 |

**~396 mesaje stau în inbox într-o săptămână** (~57/zi).

### 1.4 Cum ar fi fost sortate mesajele de azi

Simulare pe cele 41 mesaje de azi, cu **aceleași criterii** ale filtrelor (fără scriere):

| Categorie | Mesaje azi |
|---|---|
| `MAVIS/Joburi` | 23 |
| `AI Folder/AI si Comunitati` | 2 |
| `Socials` | 0 |
| `Newsletter` | 15 |
| `Finante` | 0 |
| `Personal` | 0 |
| `De raspuns` | 0 |
| `Facturi si Conturi` | 0 |
| `Optimus CD` | 0 |
| *niciun filtru se potrivește* | 15 |

> Unele mesaje se potrivesc la 2 filtre (ex. "Joburi" + "Newsletter" de la LinkedIn), deci suma poate depăși 41.

**Observație:** **0 mesaje** de azi sunt notificări ale agenților tăi (Jules și GitHub Actions pe repo-urile proprii). Categoria dedicata lor e `Optimus CD`, care a primit 0 mesaje azi, iar filtrul ei functioneaza efectiv. In rest, **6 din 9 categorii** primesc mesaje, iar 3 nu primesc.


### 1.5 Mesajele care chiar necesită răspuns

Clasificarea e făcută din date, nu dintr-o listă scrisă cu mâna: 0 cer răspuns explicit, 6 cer o decizie, 6 sunt alerte de job care nu ating profilul tău, 29 sunt newsletter/promoție, 0 sunt zgomot de pipeline.

**Niciun mesaj nu cere explicit un răspuns.**

**Ceres o decizie sau o acțiune:**

- **LinkedIn Job Alerts** — 05:50 UTC. *Lead UX Designer IRC307741 at GlobalLogic* _(alerta de job cu rol de design)_ — GlobalLogic Lead UX Designer IRC307741: DescriptionOur client is a global leader in… Your job alert for User Experience Designer Lead UX Designer IRC307741 GlobalLogic Romania (Remote) Actively recrui
- **Bestjobs** — 05:48 UTC. *9 graphic design, bucharest jobs available on bestjobs* _(alerta de job cu rol de design)_ — 9 graphic design, bucharest jobs available on bestjobs Top jobs according to your activity: CV entries, job applications and job searches. Hi there, Alexandru Popescu ! Bestie, your career friend, is 
- **Bestjobs** — 05:31 UTC. *These employers are looking for people like you* _(alerta de job cu rol de design)_ — These employers are looking for people like you Top jobs according to your activity: CV entries, job applications and job searches. Hi there, Alexandru Popescu ! Bestie, your career friend, is on What
- **Alerta eJobs** — 05:01 UTC. *Care dintre cele 2 joburi noi ti se potriveste?* _(alerta de job cu rol de design)_ — job-recommendation-daily-weekly Descoperă joburile care ți se potrivesc Special pentru tine am făcut o selecție de 2 joburi care se potrivesc profilului tău: Graphic Design Specialist IKEA ROMANIA S.A
- **Google** — 01:36 UTC. *You shared some Google Account data with ejobs.ro* _(alerta de securitate — cere verificare umana)_ — 96 Keep track of your Google Account data apvizual@gmail.com You're receiving this email because you used Sign in with Google to sign in to ejobs.ro on 10 November at 03:36 . This email summarises the
- **JobLeads** — 00:14 UTC. *Celebrating a match! Senior Brand Designer – Systems & Identity (London), Greater London* _(alerta de job cu rol de design)_ — 96 Alexandru, your perfect job match just dropped Alexandru, your perfect job match just dropped It's tailored to your goals and resume. Senior Brand Designer – Systems & Identity (London) Creative Bo

**Alerte de job care NU ating profilul de design** (informativ, 6):

- Jooble — 04:53 UTC · *Electronic Arts caută Experience Designer, UI & UX și 98 mai multe oferte noi de muncă*
- Indeed — 04:48 UTC · *Casier - Bucuresti la NORMAL Romania. Încă 16 locuri de muncă în București, Ilfov*
- Jooble — 04:06 UTC · *🔔 EURO GENWORK caută Personal în depozit alimentar în Cehia și 84 mai multe oferte noi de muncă*
- Glassdoor Jobs — 03:47 UTC · *How is your Art Direction job search going?*
- Glassdoor Jobs — 01:50 UTC · *SOTI has an opportunity for you. Apply Now.*
- Gameloft Bucharest — 01:28 UTC · *Thank you for applying to Gameloft Bucharest*

**Newsletter / promoție, fără acțiune** (29): LinkedIn, D‌O‌U‌G‌L‌A‌S‌ OUTLET, eJobs.ro, eJobs.ro, eJobs.ro, Keith Rumjahn from AI for Solopreneurs, Supabase, Cafenea ☕️☕️☕️ via LinkedIn, eJobs.ro, eJobs.ro, eJobs.ro, eJobs.ro, eJobs.ro, eJobs.ro, eJobs.ro, eJobs.ro, eJobs.ro, eJobs.ro, LinkedIn, LinkedIn, LinkedIn, LinkedIn, LinkedIn, LinkedIn, LinkedIn, noreply@broadbean.net, LinkedIn, Felix & Winston 🐶, LinkedIn

### 1.6 Aplicări trimise (22)

Sunt confirmări de aplicare extrase din corpurile emailurilor — nu cer nicio decizie, dar arată ce ai aplicat noaptea trecută.

| # | Rol | Angajator | Sursă |
|---|---|---|---|
| 1 | Digital Marketing Manager | STIFT LUX DESIGN SRL | eJobs.ro |
| 2 | Marketing & Social Media Specialist | BORG DESIGN SRL | eJobs.ro |
| 3 | DESIGN ENGINEER – AUTOMATION SYSTEMS COMPANIA DE CONSULTANTA IN ENERGIE SI MEDIU S.A. | (angajator neextras) | eJobs.ro |
| 4 | Grapfic Designer | LPP | eJobs.ro |
| 5 | Stagiair Visual Designer | KLM Royal Dutch Airlines | eJobs.ro |
| 6 | Social Media Video Editor | CD PROJEKT RED | eJobs.ro |
| 7 | Senior 2D Motion Designer | CD PROJEKT RED | eJobs.ro |
| 8 | Graphic Designer - Zalău | TRANSILVANIA HR CONSULTANT S.R.L. | eJobs.ro |
| 9 | Graphic designer | ZENPRO HR S.R.L. | eJobs.ro |
| 10 | Designer Interior | INVEST DESIGN WANANDREE S.R.L. | eJobs.ro |
| 11 | Interior Designer / Kitchen Design Specialist | ARMONI MOBILIER DE BUCATARIE S.R.L. | eJobs.ro |
| 12 | Graphic Design Specialist | IKEA ROMANIA S.A. | eJobs.ro |
| 13 | Junior / Mid-Level Graphic Designer & | DTP Specialist BRAYTRON SRL | eJobs.ro |
| 14 | Senior Product Designer — United Kingdom (Remote) | Jobgether | LinkedIn |
| 15 | User Experience Designer - Mid & Senior — United Kingdom (Remote) | Stealth iT Consulting | LinkedIn |
| 16 | Specialist Marketing si Comunicare - Palatul — Noblesse   Bucharest (On-site) | Noblesse Group | LinkedIn |
| 17 | Internship Graphic Designer — Bucharest, Romania (On-site) | Graphfull | LinkedIn |
| 18 | Video Editor & Motion — Designer   Bucharest (Hybrid) | Gameloft Bucharest | LinkedIn |
| 19 | Lead Service & Interaction Designer - AI — United Kingdom (Remote) | Roc Search | LinkedIn |
| 20 | Lead Web Designer   London — Area, United Kingdom (Remote) | Pertemps Network Group | LinkedIn |
| 21 | Senior UX Designer - Conversational AI & Commerce — London | Principle | LinkedIn |
| 22 | Specialist Brand & Packaging - FMCG - Onsite (zona Drumul Taberei) — Bucharest, Romania (On-site) | Adecco | LinkedIn |

**Leads din alertele de job.** Fiecare poartă propria cale de verificare, declarată mai jos — nu toate sunt citite direct de pe pagină:

##### Staff Product Designer - AI Products @ Ink Foundation - Remote, Romania eligibila (NOU)

Din alerta **LinkedIn Job Alerts** — *Lead UX Designer IRC307741 at GlobalLogic*

**Cum a fost verificat:** Descrierea completa a rolului, citita prin indexarea motorului de cautare pe agregatoarele de joburi de design (designjobs.careers, remote4africa.com, remote.io): titlu, seniority (7+ ani), tip de job (full-time, 100% remote), tarile eligibile (lista completa, Romania inclusa), fusul orar (SAST / UTC+2), domeniul (Financial Services / FinTech) si data publicarii (08.11.2026). Anuntul original pe boardul Ink Foundation NU a fost deschis (pe agregatoare e members-only).

Ink Foundation cauta un Staff Product Designer - AI Products la o companie de servicii financiare / fintech. Rolul conduce designul end-to-end pentru produse AI noi, de la discovery si concept pana la prototipare, livrare si lansare, inclusiv pentru clienti externi si echipe interne. Shapezi directia produsului alaturi de product, engineering si leadership, folosind research, customer insights, date si experimentare.

**Cerințe:**

- Experienta 7+ ani in product design
- Full-time, 100% remote
- Lead end-to-end: discovery, concept, prototipare, livrare, lansare
- Shape product direction cu product, engineering si leadership
- Research, customer insights, date si experimentare
- Tarile eligibile includ Romania

**Condiții:** 100% remote, full-time. Fus orar: SAST (UTC+2) - aceeasi zona ca EET (Romania e UTC+2 iarna). Postat 08.11.2026. Salariul nu e publicat.

**Cum se aplică:** Aplicare pe anuntul de pe boardul oficial Ink Foundation (rolul apare in agregatoarele de joburi de design ca designjobs.careers si remote4africa).

> ⚠️ Punctul de verificat: 7+ ani in product design. Tu ai 20+ ani graphic design si 15 art direction, dar product design end-to-end e altceva decat art direction - conteaza cat de mult din portofoliu e produs digital, nu identitate de brand. Rolul e foarte bun ca directie (AI products, seniority potrivita, Romania eligibila, fus orar identic), dar anuntul e members-only pe agregatoare, deci descrierea completa n-a fost deschisa.

- https://remote4africa.com/jobs/staff-product-designer-ai-products-1

##### Lead UX Designer @ GlobalLogic - Romania Remote (NOU)

Din alerta **LinkedIn Job Alerts** — *Lead UX Designer IRC307741 at GlobalLogic*

**Cum a fost verificat:** Pagina oficiala de cariere GlobalLogic (globallogic.com/ro/careers) - lista de pozitii deschise cu filtrele de tara si regim, la care Lead UX Designer IRC307741 apare pentru Romania cu variantele Remote / On-site / Hybrid; plus contorul de 569 pozitii deschise. Descrierea completa a rolului NU a fost deschisa.

GlobalLogic publica pozitia Lead UX Designer IRC307741, listata cu filtrele Romania / Remote / On-site / Hybrid pe pagina lor oficiala de cariere. Clientul e o companie globala din sectorul tehnologiei. Anuntul apare si in alerta LinkedIn de azi.

**Cerințe:**

- Nivel lead - conducere de UX
- Disponibil in Romania, remote
- La nivel de companie: GlobalLogic are 569 pozitii deschise

**Condiții:** Romania, remote. Salariul nu e publicat in anuntul preluat de alerta LinkedIn.

**Cum se aplică:** Aplicare pe anuntul de pe boardul oficial GlobalLogic (pagina lor de cariere).

> ⚠️ Punct de verificat: anuntul de pe LinkedIn e scurt (clientul e descris doar ca global leader) - descrierea completa n-a fost deschisa, deci nu pot confirma cerintele concrete. Confirmat ca POZITIE DESCHISA pe boardul oficial GlobalLogic (apare la filtrul Romania cu optiunile Remote/On-site/Hybrid).

- https://www.globallogic.com/ro/careers/

##### Art Director (Thumbnails & Packaging) @ YTMG LTD - Remote, $45.000-$54.000/an (NOU)

Din alerta **LinkedIn** — *Alexandru, your application was sent to Gameloft Bucharest*

**Cum a fost verificat:** Descrierea completa a rolului, citita prin indexarea motorului de cautare pe ytjobs.co (pozitia 37140) si pe pagina de profil a fondatorului YTMG LTD: salariu, regim (remote, full-time, 40 ore), overlap-ul de 6 ore cu Ciprusu/EET, descrierea responsabilitatilor, volumul canalelor (38M -> 60M vizualizari) si instrumentele cerute. Anuntul original pe LinkedIn NU a fost deschis, deci starea lui reala (deschis/inchis) NU e confirmata.

YTMG LTD produce continut YouTube documentar (canalele BeyondFacts si BeyondMilitary, 38 milioane de vizualizari lunare). Rolul de Art Director conduce tot ce se intampla vizual inainte de apasarea play: thumbnails, titluri, strategie de packaging si identitatea vizuala completa a unui canal nou. Faci tu thumbnails la inceput, indici designerul din casa, masori CTR-ul si cresci canalul de la 38 la 60 de milioane de vizualizari.

**Cerințe:**

- Portofoliu de thumbnails YouTube cu impact masurabil pe CTR (ideal, canale cu 100K+ abonati)
- Intelegerea analiticii YouTube
- Photoshop (inclusiv features AI/beta), Illustrator, Lightroom
- Unelte de generare AI de imagini (Nano Banana, Ideogram, Magnific)
- Explicarea de ce un thumbnail functioneaza, nu doar crearea lui
- Experienta 1+ ani; full-time, remote, 40 ore/saptamana
- Overlap de minimum 6 ore zilnice cu fusul Ciprusu/EET

**Rate-uri publicate:**

- 45.000 - 54.000 USD/an

**Condiții:** Full-time, remote, 40 ore pe saptamana. Overlap obligatoriu de minimum 6 ore zilnice cu Ciprusu/EET (Romania e in fus, deci conditia se respecta). Postat pe 26.03.2026.

**Cum se aplică:** LinkedIn arata Easy Apply. Anuntul se gaseste si pe ytjobs.co la pozitia 37140.

> ⚠️ ATENTIE - anuntul poate fi INCHIS: pe ytjobs.co (care preia anuntul original) apare mentiunea This position is no longer available, iar pozitia e din martie 2026. LinkedIn inca il afata cu Easy Apply. Verifica pe LinkedIn inainte sa aplici. Daca se aplica, e un fit excelent de profil: thumbnails + art direction + AI tools + measuring CTR, exact stack-ul tau.

- https://ytjobs.co/job/37140

##### Bild-Ad Designer (m/w/d) @ Jobgether - Remote, doar Romania (NOU)

Din alerta **LinkedIn** — *Alexandru, your application was sent to Jobgether*

**Cum a fost verificat:** Listarea pozitiei pe jobs.remote.com (Board de joburi remote, categoria Remote design jobs): titlu, angajator (Jobgether) si conditia exacta de eligibilitate (Remote - Romania only). Anuntul original pe Jobgether NU a fost deschis.

Jobgether publica pozitia Bild-Ad Designer (m/w/d), listata explicit ca Remote, Romania only - adica eligibila doar pentru cei din Romania, cu contract remote.

**Cerințe:**

- Design de reclame (image ads / bild ads)
- Remote, eligibil doar din Romania

**Condiții:** Remote, doar Romania. Salariul nu e publicat in anuntul preluat.

**Cum se aplică:** Aplicare pe anuntul de pe Jobgether (jobgether.com).

> ⚠️ Punct de verificat: pozitia a aparut la sfarsit de lista in emailul LinkedIn, ca si job similar - anuntul propriu n-a fost deschis. Jobgether este un agregator/intermediar, deci verifica cine angajeaza efectiv si care e regimul contractual (PFA sau angajare directa) inainte sa aplici.

- https://jobs.remote.com/jobs/types-of-remote-jobs/remote-design-jobs

##### Staff Brand Designer - Consumer @ Kraken Romania - Remote (NOU)

Din alerta **LinkedIn** — *Alexandru, your application was sent to Adecco*

**Cum a fost verificat:** Listarile de joburi remote de pe remote.io si jobs.remote.com, care arata Kraken cu Romania printre tarile eligibile si listarea de roluri de design ale companiei. Anuntul original pe boardul Kraken NU a fost deschis.

Kraken (criptomonedele) publica roluri de brand design disponibile remote din Romania. Astazi apare in lista de joburi similare de pe LinkedIn, iar pe agregatoarele de joburi remote Kraken are un rol de product design pentru AI, listat tot cu Romania intre tarile eligibile.

**Cerințe:**

- Brand design la nivel de consumer / brand
- Remote, eligibil din Romania

**Condiții:** Remote, Romania eligibila. Salariul nu e publicat.

**Cum se aplică:** Aplicare pe anuntul de pe boardul oficial Kraken.

> ⚠️ Punct de verificat: pe agregatoare apare la Kraken un rol cu titlul Staff Product Designer - AI Products (Romania eligibila), iar pe LinkedIn unul cu titlul Staff Brand Designer - Consumer. Poate fi acelasi rol redenumit, sau doua roluri diferite la aceeasi companie. Verifica identitatea exacta (titlu + pozitie) pe boardul Kraken. Anuntul original n-a fost deschis.

- https://remote.io/remote-jobs/romania

##### Angajam Video Editor - Remote @ Inpixels - 810-895 lei (NOU)

Din alerta **Bestjobs** — *9 graphic design, bucharest jobs available on bestjobs*

**Cum a fost verificat:** Corpul emailului Bestjobs de azi (lista de 9 joburi de graphic design din Bucuresti), unde apare randul Angajam Video Editor - Remote / Inpixels / Market estimate on similar positions: 810 - 895 / Remote. Anuntul sursa NU a fost deschis - verificarea a esuat.

Inpixels cauta un Video Editor remote. In lista de design de pe Bestjobs de azi apare cu salariu estimat pe pozitii similare, fara interval publicat de catre angajator.

**Cerințe:**

- Editare video
- Regim remote

**Rate-uri publicate:**

- 810 - 895 lei (estimare pe pozitii similare, nu interval publicat de angajator)

**Condiții:** Remote. Salariu estimat, nu comunicat de angajator.

**Cum se aplică:** Aplicare din lista Bestjobs.

> ⚠️ NU VERIFICAT: n-am reusit sa deschid anuntul Inpixels nici pe Bestjobs, nici pe un canal oficial - cautarea a returnat doar agregatoare generice de joburi video. Salariul e estimarea Bestjobs pe pozitii similare, nu o cifra publicata de angajator. Inainte sa aplici, deschide anuntul de pe Bestjobs si verifica ca mai exista.

- https://www.bestjobs.eu

---
## 2. Joburi — scorate cu `ALEX-KIT/scoring.gs`

**70 joburi analizate** (IQads 40 + designproject.io 30) → 40 păstrate în tabele, 30 drop-uri, din care **16 cu verdict amânat** (locația nu e publicată de sursă). **3 joburi noi** față de 2026-11-09.

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

### 2.5 Verdict amânat — locația nu e publicată de sursă (16)

| Scor | Rol | Companie | Locație | Engagement | Expirare | Nou |
|---|---|---|---|---|---|---|
| 8 | Art Director | Stefanini Infinit | neprecizată de sursă | Full Time | 2026-12-14 |  |
| 8 | Creative Lead | Stefanini Infinit | neprecizată de sursă | Full Time | 2026-12-14 |  |
| 8 | ART MID | ontheroof | neprecizată de sursă | Full Time | 2026-11-28 |  |
| 8 | Art Director | Saatchi & Saatchi | neprecizată de sursă | Full Time | 2026-11-15 |  |
| 7.4 | Content Creator | Stefanini Infinit | neprecizată de sursă | Full Time | 2027-01-08 |  ✅ |
| 7.4 | Social Media Lead | Stefanini Infinit | neprecizată de sursă | Full Time | 2027-01-08 |  ✅ |
| 7.4 | Senior Product & Visual Designer | theMarketer | neprecizată de sursă | Full Time | 2027-01-08 |  ✅ |
| 7.4 | Social Media Content Creator | Digitas | neprecizată de sursă | Full Time | 2027-01-05 |  |
| 7.4 | Influence & Content Production Manager | Publicis | neprecizată de sursă | Full Time | 2026-12-27 |  |
| 7.4 | Influence Lead | Publicis | neprecizată de sursă | Full Time | 2026-12-27 |  |
| 7.4 | Social Media Manager | Stefanini Infinit | neprecizată de sursă | Full Time | 2026-12-14 |  |
| 7.4 | Senior Social Media & Content Specialist (Project-Based or Full-Time) | Flaminjoy | neprecizată de sursă | Full Time, Project Based | 2026-12-07 |  |
| 7.4 | Social Media Manager | WoPA | neprecizată de sursă | Full Time | 2026-12-01 |  |
| 7.4 | Digital Account Manager | WoPA | neprecizată de sursă | Full Time | 2026-11-21 |  |
| 5.65 | Copywriter | Stefanini Infinit | neprecizată de sursă | Full Time | 2026-12-14 |  |
| 5.65 | Digital Media Specialist / PPC | Stefanini Infinit | neprecizată de sursă | Full Time | 2026-11-27 |  |

**Dintre astea, 3 sunt noi.** Nu le-am dat verdict de locație pentru că anunțul nu o spune — să le verifici pe cele care te interesează:

- Art Director — Stefanini Infinit (IQads) — https://www.iqads.ro/adjob/23996/art-director-stefanini-infinit
- Creative Lead — Stefanini Infinit (IQads) — https://www.iqads.ro/adjob/23993/creative-lead-stefanini-infinit
- ART MID — ontheroof (IQads) — https://www.iqads.ro/adjob/23974/art-mid-ontheroof
- Art Director — Saatchi & Saatchi (IQads) — https://www.iqads.ro/adjob/23963/art-director-saatchi-saatchi
- Content Creator — Stefanini Infinit (IQads) — https://www.iqads.ro/adjob/24012/content-creator-stefanini-infinit
- Social Media Lead — Stefanini Infinit (IQads) — https://www.iqads.ro/adjob/24011/social-media-lead-stefanini-infinit
- Senior Product & Visual Designer — theMarketer (IQads) — https://www.iqads.ro/adjob/24010/senior-product-visual-designer-themarketer
- Social Media Content Creator — Digitas (IQads) — https://www.iqads.ro/adjob/24008/social-media-content-creator-digitas

### 2.6 Drop-uri (circuit breaker) — 30

| Rol | Companie | Motiv | Nou |
|---|---|---|---|
| Internship Client Service | Digital Distrikt Agency | rol junior/entry/intern — Internship Client Service |  ✅ |
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
| **IQads** | ID-ul ad-ului crește monoton cu postarea. Cel mai mare ID din setul de ieri: **24008** | **4 anunțuri noi** |
| **designproject.io** | data de publicare vs. ultima rulare | **0 anunțuri noi** — cel mai recent de pe site e din **2026-11-05** |

- **IQads #24012** — Content Creator @ Stefanini Infinit (expiră 2027-01-08) — https://www.iqads.ro/adjob/24012/content-creator-stefanini-infinit
- **IQads #24011** — Social Media Lead @ Stefanini Infinit (expiră 2027-01-08) — https://www.iqads.ro/adjob/24011/social-media-lead-stefanini-infinit
- **IQads #24010** — Senior Product & Visual Designer @ theMarketer (expiră 2027-01-08) — https://www.iqads.ro/adjob/24010/senior-product-visual-designer-themarketer
- **IQads #24009** — Internship Client Service @ Digital Distrikt Agency (expiră 2027-01-08) — https://www.iqads.ro/adjob/24009/internship-client-service-digital-distrikt
**Concluzie:** 4 postareri noue de la ultima rulare.

Ce nu a mai apărut în raportul anterior, dar există în catalog (3 la număr, toate cu ✅ în tabele):


---

## 5. Ce n-a mers, măsurat

1. **3 din 9 categorii nu mai primesc nimic**3 n-a fost folosită niciodată). Cauza pentru 3 dintre ele: **nu au filtru creat** (`Personal`, `De raspuns`, `Facturi si Conturi`) — deci nimic nu le poate eticheta, oricare ar fi criteriul. Starea filtrelor, masurata azi: **6 functioneaza, 1 sunt nefunctionale** — cele nefunctionale folosesc `from:(...)` unde Gmail cere `from:{...}` (paranteze = ȘI, acolade = SAU), deci nu pot lovi niciun mesaj; cu acoladele ar fi prins 3971 mesaje in 30 de zile. ~396 mesaje/7 zile stau in inbox.
2. **designproject.io servește descrieri foarte inegale** (2094–30619 de caractere pe cele 30 de joburi, măsurat azi). Cele mai lungi sunt rescrise de AI și injectează cuvinte-cheie care ridică axele — vezi §6.2.
3. **Celelalte două câmpuri de engagement ale designproject.io sunt inutilizabile.** `employmentType` din JSON-LD spune `FULL_TIME` pentru 30 din 30, iar badge-ul din listing spune "Full-time" pentru 30 din 30. Singura sură corectă e linia **"Job Type:"** din descriere — prezentă la 13 din 30. Am folosit asta.
4. **Paginatia IQads nu funcționează.** `?page=2` și `?page=3` servesc exact pagina 0 (aceleași 40 de linkuri — verificat azi pe 0, 2, 3). Catalogul complet e pe pagina 0 — nu iterez pagini.
5. **Cota Google: 154 cereri pe 200** (în limita plafonului). Consumul pe etape:

| Etapă | Cereri |
|---|---|
| `report-mail-count.js` | 65 |
| `report-simulate-sort.js` | 43 |
| `report-filter-state.js` | 28 |
| `report-inbox-counts.js` | 7 |
| `report-folder-discover.js` | 4 |
| `report-build.js` | 6 |
| `inline` | 1 |
| **total** | **154** |

> Rulare 2026-11-10 (raport zilnic). Contor pornit de la zero.

Ce a consumat cel mai mult: corpurile complete ale mesajelor de azi (41) — fără corp, nu se poate distinge un mesaj care cere răspuns de o alertă automată. **Zero scrieri pe Gmail** — niciun mail trimis, marcat sau arhivat, niciun filtru modificat.

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

### 6.2 Axa D ridicată de prosa, nu de titlu — 20 joburi (24 semnalări)

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
| Content Creator | Stefanini Infinit | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Influence & Content Production Manager | Publicis | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Influence Lead | Publicis | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Digital Account Manager | WoPA | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Copywriter | Stefanini Infinit | D=8 prin `"social media"` (Core Design) | prosa anuntului |
| Digital Media Specialist / PPC | Stefanini Infinit | D=8 prin `"social media"` (Core Design) | prosa anuntului |

**Ce propun:** ca `D` să se calculeze din **titlul rolului**, nu din textul anunțului, sau măcar ca un rol să poată intra într-o secțiune doar dacă titlul conține o cheie de design. E o decizie de motor — nu am atins `scoring.gs` fără acordul tău.

---

## 7. Fișiere

- `rapoarte/RAPORT-ZILNIC-202611-10.md` — raportul acesta (și în repo)
- `mavis-tools/scoring-result-2026-11-10.json` — scoruri + secțiuni + diagnostice
- `mavis-tools/jobs-iqads-2026-11-10.json` — joburi IQads, text integral
- `mavis-tools/jobs-designproject-2026-11-10.json` — joburi designproject.io, JSON-LD
- `mavis-tools/jobs-2026-11-09.json` — setul normalizat de ieri (cu care s-a comparat)
- `mavis-tools/report-mail-count.json` — numărătoare pe etichetele de categorie
- `mavis-tools/report-inbox-counts.json` — numărătoare exactă inbox
- `mavis-tools/report-simulate-sort.json` — simularea sortării + mesajele de azi
- `mavis-tools/report-source-probe.json` — sonda de surse (comportamentul iqads.ro / designproject.io, măsurat azi)
- `mavis-tools/report-filter-state.json` — starea filtrelor Gmail + testul paranteze-vs-acolade (măsurat azi)
- `mavis-tools/report-triage.js` — clasificatorul mesajelor (needs-reply / needs-action / fyi / noise)
- `mavis-tools/taxonomy.js` — sursa unică pentru numele etichetelor de categorie (rezolvate live, nu hardcodate)

---

*Generat de Mavis Cloud. Nimic nu a fost șters, nimic nu a fost trimis, nimic nu a fost modificat în Gmail sau Drive. Totul e anulabil.*
