# Raport zilnic pentru Alex — pipeline, reguli și măsurători

Raportul **nu se mai construiește ad-hoc**: e o secvență de scripturi în
`apvizual-max/MAVIS-CLOUD`.

## Ordinea scripturilor

```bash
node mavis-tools/scrape-iqads.js            # catalog AdJob complet
node mavis-tools/scrape-designproject.js    # JSON-LD JobPosting
node mavis-tools/report-mail-count.js 2026/10/23   # etichete MAVIS/* (4 ferestre)
node mavis-tools/report-inbox-counts.js     # numarătoare exactă inbox
node mavis-tools/report-simulate-sort.js    # simularea sortării + mesajele de azi
node mavis-tools/report-score.js            # port fidel scoring.gs + diagnostice
node mavis-tools/report-build.js 2026-10-23 <FOLDER_ID>   # scrie .md + urcă pe Drive
```

Destinație Drive: `Alex Work/00-INTRARE` = `1sAs2ktJhGanKeGv87LIxkTD34S7P5XvT`.
Raportul se **actualizează in place**, nu se creează duplicat.

## Reguli de pipeline

- **Nu șterge, nu trimite, nu modifică Gmail.** Orice acțiune e anulabilă.
- **Cota de 200 cereri Google/rulare** se raportează explicit, cu defalcare pe etape.
- `.api-usage.json` (scris de `kit.js` la ieșirea procesului) ține contul — regula
  "max 200 cereri" se respectă **fără estimări**.
- **Șablonul e complet data-driven.** Nicio cifră sau narativă scrisă cu mâna în
  cod (motivul rescrierii din 2026-10-24: template-ul avea „a intrat azi: 0
  mesaje", „12 zile", „48 joburi IQads" scrise de mână → mâine ar fi repostat
  cifrele de azi).
  - `report-build.js --dry` scrie raportul local, **nu atinge Drive**.
  - `report-score.js --save-set` salvează setul normalizat (`jobs-AAAA-LL-ZZ.json`)
    ca PREV; `prevRunDate` și `prevRes` se derivă din numele fișierului PREV.
  - `mavis-tools/email-leads-AAAA-LL-ZZ.json` (opțional) — leads verificate;
    raportul sare peste secțiune dacă fișierul nu există.
  - `report-inbox-counts.js` și `report-simulate-sort.js` iau data ca argument.

## Triage (`mavis-tools/report-triage.js`)

Clasifică mesajele DIN DATE în 5 clase: `needs-reply` / `needs-action` /
`job-alert-other` / `fyi` / `noise`.

**Ordinea regulilor contează:** newsletter se verifică **înainte** de semnalul de
„răspuns" — altfel un digest cu cuvântul „interview" în snippet era clasificat
ca needs-reply.

Ultima rulare (2026-10-24): 1 needs-reply, 2 needs-action, **116 noise**
(Jules + GitHub Actions pe repo-uri proprii).

## Economisirea de cereri

- **`messages.list` întoarce ID-urile în ordine descrescătoare** după data
  internă ⇒ `c.ids[0]` e deja cel mai nou. În `report-mail-count.js` erau 25
  `messages.get`/etichetă doar ca să afli „ultimul mesaj etichetat" = **200 de
  cereri singure**, peste buget. Redus la 4/etichetă ⇒ scriptul a coborât de
  **403 la 60 cereri**.
  *Regulă:* înainte să ceri corpul unui mesaj, verifică dacă lista nu ți-a dat
  deja ordinea. `threads.list` la fel.
- **`report-inbox.js` (105 cereri) nu era folosit de nimeni** — ieșirea
  (`report-inbox.json`) nu e citită de `report-build.js` sau de alt script.
  Numărătoarea exactă vine din `report-inbox-counts.js` (8 cereri).
  *Regulă:* când un pas costă mult, verifică întâi dacă ieșirea lui e consumată
  înainte să-l optimizezi. Optimizarea unui script mort e muncă pierdută.

## Scor

`mavis-tools/score-port.js` — port fidel al `ALEX-KIT/scoring.gs` (vezi topicul
`scoring-gs-buguri-masurate`).

## `validThrough` la designproject.io = expirare REALĂ

Până la 2026-10-24 raportul tratase `validThrough` ca fiind gunoi (`expKind='postat'`,
justificare „e derivat și uneori în trecut"). **Justificarea era greșită.**

Măsurat pe toate cele 26 de joburi: `validThrough` = `datePosted` + **30 zile**
exact (24/26 exacte; 2 cu o zi diferență de fus orar). Deci e o fereastră de
postare de 30 de zile, nu o valoare derivată fără sens.

Consecință: **7 din cele 36 joburi din tabele erau deja expirate**, fără niciun
semn, pentru că raportul afișa data postării, nu data expirării. Corectat:
`expKind='expiră'` pentru ambele surse, flag `expired`, marcajul `⛔ **EXPIRAT**`.

**Regulă generală:** când o valoare „derivată" se dovedește constantă față de
alta, e o relație reală, nu gunoi — și merită folosită. Verifică relația pe
TOATĂ setul înainte să o ignori.

## Capcană: descrierile rescrise cu AI

2026-10-22 → 2026-10-23, designproject.io și-a rescris descrierile de la
71–1484 la **24.000–33.000 de caractere** (inclusiv „📝 Enhancement Note").
Diferența de scor față de ieri nu înseamnă că jobul s-a schimbat. A stricat 2 din
3 surse de engagement — vezi skill-ul `job-sourcing-methods` („care e adevărul
despre engagement").

## Jurnalul zilnic (21–27.10) — mutat

Măsurătorile, leadurile și cotele zilnice din 21–27 octombrie sunt în topicul
**`raport-zilnic-istoric`**. Aici rămân doar regulile permanente și măsurătorile
din 28.10 încolo. Arhivă completă pre-tăiere:
`docs/arhiva/memorie/2026-10-30-pre-restructure-topics-30-10/` (repo MAVIS-CLOUD).


## Sonde noi (25.10) — raportul nu mai repetă cifrele de ieri

- `mavis-tools/report-source-probe.js` → `report-source-probe.json`: măsoară azi
  comportamentul surselor (lungimea descrierilor designproject.io, `employmentType`
  vs linia „Job Type:", paginatia IQads/designproject). **Zero cereri Google.**
- `mavis-tools/report-filter-state.js` → `report-filter-state.json`: citește
  filtrele live și **testează** semantica Gmail (cum e scris acum vs cum ar trebui
  scris cu `{}`). 20 cereri — e cea mai scumpă sondă, rulează-o doar dacă e nevoie.
- `mavis-tools/report-folder-discover.js`: găsește pe Drive folderul de livrare
  pe CALE (fără id-uri hardcodate). 4 cereri.
- `report-build.js` citește sondele în locul cifrelor scrise cu mâna. La rulare
  **reia contorul** `.api-usage.json` (nu-l reseta între rulări) — altfel
  raportul raportează greșit.

**Cost real măsurat 25.10:** 198 cereri Google pentru o rulare completă
(folder-discover 4 + inbox-counts 9 + mail-count 59 + simulate-sort 89 +
filter-state 20 + inline 11 + build/upload 6). Plafonul de 200 e atins aproape —
dacă adaugi o sondă nouă, scoate altă una.


## Măsurătoare 2026-10-26 — mutată, dar 2 reguli rămân aici

Măsurătoarea propriu-zisă (110 cereri, etichetele încă moarte, cele 6 leaduri verificate,
livrarea) e în topicul **`raport-zilnic-istoric`**. Două lecții rămân **aici** (sunt reguli,
nu cifre):

- **Costul lui `simulate-sort` e proporțional cu numărul de mesaje de azi, nu fix.**
  Ziua ușoară = raport ieftin (10 mesaje ⇒ 11 cereri; ~130 mesaje ⇒ 89 cereri).
  Nu presupune că 200 e mereu aproape.
- **Corpurile complete ale emailurilor de job dau date pe care snippet-ul nu dă.**
  Pe 25.10 am raportat că anunțul AGRESIV MEDIA „nu publică orașul, tipul de contract sau
  salariul" — **era fals**: snippet-ul e trunchiat la ~200 de caractere și conține doar
  antetul, iar **corpul conține lista integrală cu companie, oraș și salariu**. Costă
  1 cerere per email (`format=full` + decode base64). Regula: **snippet = descoperire,
  corp = adevăr.**

### NOU: bestjobs.ro e inaccesibil pentru verificare automată

- `web_fetch` → „file load failed" pe TOATE URL-urile bestjobs (listări și joburi).
- `curl` cu User-Agent de browser → **403 Forbidden**.
- **Singura cale de verificare: snippet-ul de la motorul de căutare**, care include textul
  complet al anunțului (titlu, cerințe, salariu) — și uneori *pagina alternativă*
  `bestjobs.eu/loc-de-munca/<slug>` (fără `/en/job/`) e indexată cu text integral.
- Verificarea pe surse independente funcționează: jobgether.com, remowork.life, aiannotationjobs.com,
  bebee.com, bdlemntech.ro, jobs.concentrix.com, jobs.micro1.ai.
- Concluzie: **pentru un job Bestjobs, verifică fie pe o sursă alternativă, fie acceptă
  explicit că e nemonitorizat de pagină** — și spune asta în raport, nu tăcerea.

### Leaduri noi, verificate pe pagină (25–26.10) — mutate în `raport-zilnic-istoric`

_(tabelul complet al leadurilor din 25–26.10, cu cele 2 capcane de verificare, e în
topicul `raport-zilnic-istoric`)_

| ~~Lead~~ | ~~Salariu~~ | ~~De ce contează~~ |
|---|---|---|
| ~~Digital Content Designer — Concentrix~~ | competitive | ~~100% remote, eligibil RO — aplică doar varianta RON~~ |
| ~~Senior Art Director — Leo Burnett~~ | neprecizat | ~~termen de agregator, nu de angajator~~ |
| ~~Proiectant Producție Publicitară — BD Lemntech~~ | 1405–2000 EUR | ~~cel mai mare interval~~ |
| ~~AI Video Editor — Apex Digital Alliance~~ | 1200–1300 EUR | ~~design + performance + AI~~ |
| ~~Colaboratori design grafic — AGRESIV MEDIA~~ | 780–1020 EUR | ~~reapărut, acum cu salariu~~ |

**micro1 = YO AI Labs?** Ieri am descoperit YO AI Labs cu 121 roluri remote și rate până la $150/h.
Azi, leadul micro1 (UX/UI Designer) vine pe Bestjobs. **Sunt aceeași platformă** — dar jobul
de azi e altul decât leadul de ieri. Nu confunda platforma cu jobul.

### Livrare

- Folder pe Drive: `GDrive-Second_Brain_PKMS/00_Inbox/00-2-Daily_Raw_Notes` = `1VjRvaInHjhzrIx90Pt3IiBh_yeSOg25c`
  (descoperit cu `report-folder-discover.js`, 4 cereri — **nu** hardcodat).
- `report-build.js` face search-then-upload ⇒ **actualizare in place**, nu duplicat.
- **Push fără `gh` și fără credential helper:** `GITHUB_TOKEN` e în env. Funcționează cu
  `GIT_ASKPASS=/tmp/askpass.sh` (script care citește `$GITHUB_TOKEN` la cererea „Password'),
  username `x-access-token`. **Șterge scriptul după push** — e un credential pe disc.
  `gh` CLI **nu e instalat** în sandbox.


## 2026-10-27 — TAXONOMIA ETICHETELOR A FOST REARANJATĂ; am reparat la sursă

**Eveniment:** peste noapte, etichetele Gmail ale lui Alex au fost rearanjate
(cel mai probabil de Mavis Local, de pe calculatorul lui). Din cele 8 etichete
`MAVIS/*` de pe 26.10, **doar `MAVIS/Joburi` și-a păstrat prefixul**:

| Vechi (26.10) | Noi (27.10) |
|---|---|
| `MAVIS/Joburi` | `MAVIS/Joburi` |
| `MAVIS/AI si comunitati` | `AI Folder/AI si Comunitati` |
| `MAVIS/Social` | `Socials` |
| `MAVIS/Newsletter` | `Newsletter` |
| `MAVIS/Finante` | `Finante` |
| `MAVIS/Personal` | `Personal` |
| `MAVIS/De raspuns` | `De raspuns` |
| `MAVIS/Facturi si conturi` | `Facturi si Conturi` |
| — | **`Optimus CD`** (categorie NOUĂ) |

**Consecința, dacă nu s-ar fi reparat:** rapoartele zilnice ar fi raportat
**7 din 8 etichete dispărute**, fără niciun semn. Asta e exact clasa de eroare
pe care o numim „cifră mascată".

### Reparația: `mavis-tools/taxonomy.js` (nou)

Sursă unică pentru numele etichetelor de categorie. Fiecare script le rezolvă
**live, la runtime**, din etichetele vii — niciun nume de etichetă nu mai e
scris în cod.

```js
const { CATEGORIES, normalize, resolve, labelName } = require('./taxonomy.js');
const { resolved, missing, byKey } = TAX.resolve(labs.labels || []);
```

`normalize()` ia **ultima componentă** după `/` sau ` | ` (deci
`AI Folder/AI si Comunitati` → `ai si comunitati`), și e case-insensitive.
Fiecare categorie are o listă de `aliases` (nume vechi + noi) — de aceea
funcționează și peainte, și după rearanjare.

**Regulă:** dacă o categorie nu se rezolvă, scriptul **RAPORTEAZĂ lipsa**
(`missing[]`), nu tace și nu scrie 0. Zero-ul mascat e mai periculos decât eroarea.

Scripturi modificate: `report-mail-count.js` (măsoară pe categorii),
`report-simulate-sort.js` (chei stabile: `joburi`, `ai`, `social`, ...),
`report-filter-state.js` (nu mai enumeră filtrele; **le testează pe toate vii**),
`report-build.js` (împarte în categorii vii/moarte, nu global).

**Când rearanjezi din nou taxonomy: se schimbă UN LOC** — lista din `taxonomy.js`.

### Măsurătoare 27.10: 9 categorii, 1 funcționează

*(tabelul pe categorii e în `raport-zilnic-istoric`)*

**8 din 9 categorii erau MOARTE de 15 zile. Una era vie** (`Optimus CD`, filtrul
nou scris de Mavis Local — singurul cu `addLabelIds` corect).

**Filtrele: 6 cu criteriu, 1 funcționa.** Celelalte 5 foloseau `from:(...)` în loc
de `from:{...}` ⇒ **0** lohituri; cu acoladele ar fi prins **3737 mesaje/30z**.
**De ce n-a mers mai devreme:** toate 5 aveau `addLabelIds` vid **și** criterii
care nu pot lovi nimic. Doar filtrul NOU (scris de Mavis Local) are ambele
corecte. ⇒ **reparația e deja în scriptul lui Local**; de partea mea rămâne
`fix-mavis-filters.js` pentru cele 5 vechi, care cere scope
`gmail.settings.basic` ⇒ rulează de pe mașina lui Alex.

### Joburi 27.10

62 analizate (43 IQads + 19 designproject.io) → 33 păstrate, 12 verdict amânat.
**1 postare GENUIN NOUĂ:** `Art Director @ Mercury360` (IQads #23999), scor **9.6** —
cel mai bine potrivit din categoria „design efectiv". Verificat pe pagina IQads:
București hybrid, Full Time, Senior, expiră 25.12.2026, motion design/video
**obligatoriu**. designproject.io: 19 joburi, **23/23** validThrough exacte.
*(detalii zilnice în `raport-zilnic-istoric`)*

### Cota: 207 cereri (plafon 200) — depășită cu 7

Excedentul a fost **diagnostic** (69 de cereri `inline`: liste de etichete,
comparații de numere, verificarea filtrului nou funcțional) — cheltuite pe
**înțelegerea** stării, nu pe măsurarea zilei. Zero scrieri pe Gmail.
**Raportat explicit în §5 al raportului** — nu ascuns.
*(defalcarea pe etape e în `raport-zilnic-istoric`)*


## 2026-10-28 — FILTRELE S-AU REPARAT; TRIAJUL CITESTE CORPUL

### Starea filtrelor: 6 din 6 functionale

Toate cele 6 filtre MAVIS au `addLabelIds` **și** folosesc `from:{...}` ⇒ **6 din 9
categorii primesc mesaje** (era 1 pe 24.10). Cele 3 moarte (`Personal`, `De
raspuns`, `Facturi si Conturi`) **nu au filtru creat** — diagnosticul compară
filtrul viu cu eticheta categoriei (nu e hardcodat). Filtrele curăță UNREAD, dar
NU scot din INBOX (17 din 20 au încă INBOX) ⇒ „necitit" se curăță, „inbox" nu.

### TRIAJUL TREBUIE SA CITEASCA CORPUL, NU SNIPPET-UL

Descoperirea de azi: **snippet-ul e trunchiat la ~200 de caractere si contine doar
antetul.**Corpul contine lucrurile care conteaza. Trei cazuri reale de azi:
- alerta HiRo: corpul are „**Trebuie sa alegi o parola noua**" — snippet-ul NU.
- Google Security alert: regula „alerta de securitate" se declanseaza din corp.
- CI esuat pe MAVIS-OPTIMUS-CI: era clasificat „noise" (expeditor github.com).

**Cost: 0 cereri in plus.** Corpul vine DEJA in raspunsul `format=full` pe care
`report-simulate-sort.js` il cerea oricum — era aruncat. Acum e decodat si salvat.

**Dar doua capcane măsurate:**
1. **text/plain poate sa NU contina ce contine HTML.** Alerta HiPo: text/plain =
   13.128 caractere **fara** „parola"; text/html = 32.169 caractere **cu** „parola".
   ⇒ extractorul prefera **HTML-ul** (forma randata), text/plain doar ca rezerva.
   La fel, nu te opri la **prima** parte: un email are mai multe parti.
2. **Un disclaimer legal contine cuvintele-cheie.** Goat Academy: disclaimerul
   „does not constitute an **offer** to purchase" declansa `needs-reply` (regula
   contine „offer"). ⇒ semnalul „cere raspuns" se citeste din **antet + fragment**,
   NU din corp. Corpul se foloseste pentru cereri de actiune ascunse (parola,
   securitate, CI), nu pentru intentia mesajului.

Reguli noi in `report-triage.js`: alerta de securitate, workflow CI esuat, contul
cere o actiune. Ordinea: securitate → CI → cont → noise → job-alert → newsletter
→ **promo** → needs-reply → robot → fyi. (Promo a ajuns **inainte** de needs-reply:
o casa de newslettere scrie cu numele omului, dar nu cere raspuns de la om.)

### Unelte noi

- `report-simulate-sort.js --backfill` — reface doar corpurile ale caror **clasa
  depinde de continut**. Un newsletter isi stie clasa din expeditor ⇒ refacerea lui
  ar arde cereri pentru zero informatie. `--all` reface tot; `--ids=a,b` face
  interventie chirurgicala. **Nu re-listeaza** mesajele ⇒ setul masurat ramane
  consistent cu `report-inbox-counts.js`.
- `report-build.js --file-id=<ID>` — reincarca raportul creat cu **1 PATCH** in
  loc de 3 cereri. Raspunsul include name/mimeType/size/parents ⇒ e si
  verificarea. `UPLOAD_COST` devine dinamic.

### Numerele trebuie sa fie de aceeasi fereastra

Raportul spunea 18 mesaje in antet si 20 in §1.4: masuratori la momente
diferite. **Sursa unica pentru „azi" = simularea** (cea mai recenta). In plus:
`mailCount.totals.azi` e **suma hiturilor pe etichete** (un mesaj cu 2 etichete
se numara de 2 ori), NU numarul de mesaje distincte. Raportul explica asta
explicit, ca nu para numere contradictorii.

### Portul de upload: o greseala de JSON a costat 1 cerere peste plafon

`email-leads-2026-10-28.json` avea ghilimele drepte in loc de cele romanesti
(„Aplică & Începe interviul") ⇒ JSON invalid ⇒ **sectiunea de leads nu se randa
deloc** si raportul s-a urcat fara ea. Detectat abia **dupa** upload, prin
verificarea continutului pe Drive. ⇒ **verifica continutul raportului pe Drive
(citeste-l inapoi), nu doar metadata.** Costul repararii: 1 PATCH.
Cota finala: **201 pe 200 (depasit cu 1)**, raportat explicit in raport.
Excedentul a fost diagnostic (17 cereri readbodies/extract/inline) + reupload.

### Starea joburilor (28.10)

57 analizate → 29 pastrate, 12 verdict amanat. **0 postari noi** (max ID IQads 23999).
*(cifrele zilnice sunt in `raport-zilnic-istoric`)*

**designproject.io: PAGINATIA ACUM AVANSEAZA** (pe 27.10 nu avansa). Page 1 adauga
0 slug-uri peste page 0, dar **page 2 adauga 4** — iar scraperul ia deja paginile
0, 2, 3, deci le are. Verificat ca toate 4 sunt in fisierul de azi. Sonda
`report-source-probe.js` compara doar **lungimea in octeti** a paginilor, deci
raporteaza `sameBytes: false` fara sa arate ca paginatia avanseaza — **sonda e prea
slaba; compara slug-urile**, nu bytes.

### Leaduri de azi (5, fiecare cu calea de verificare declarata)

*(tabelul leadurilor din 28.10 e în topicul `raport-zilnic-istoric`)*

Regula noua: `report-build.js` spunea „pagina sursa citita direct" despre leads —
**fals** pentru Bestjobs (403 la acces automat, s-a citit textul indexat de motor).
Acum fiecare lead declara `verifiedVia`, iar rubrica spune corect ce s-a facut.


## 2026-10-29 — 3 joburi NOI; etichetele se stabilizeaza

### Joburi (29.10) — 3 postari NOI

max ID IQads 23999 → 24002, expiră 27.12.2026. **#24000 Art Director / Graphic Designer @ Cohn & Jansen** — IQads nu publică localizarea (reconfirmat până pe 04.11) ⇒ „verdict amânat", scor 8; dacă e București, scorul = 9,6. *(zilnic: in `raport-zilnic-istoric`)*

### Parser IQads: "Nivel" multi

Unele anunturi au **nivel cu mai multe etichete** („Nivel: Middle, Senior" la
Cohn & Jansen #24000). Regex-ul lua doar primul `<a>` ⇒ pierdea semnalul de
senioritate. Regula nouă (identică cu Tip job / Specializare): **toate
etichetele, unite** ⇒ „Middle, Senior". 9 joburi afectate.
*Observație:* `level` nu intră în scor (portul primește doar company/role/loc/
eng/jd) — dar apare în tabele, deci contează la citit.

### Regula de securitate NU depinde de expeditor

„Notice of Security Incident" (Scribd, prin Epiq) — incident real de date
(un terț neautorizat ar fi putut accesa date de utilizatori) — era clasificat
`fyi`, fiindcă regula cerea `SECURITY_FROM` (Google/accounts). **Corectare:**
`SECURITY_SUBJECT` (alertă/incident de securitate, sign-in nou, dispozitiv nou)
declanșează regula **indiferent de expeditor**. `SECURITY_FROM` rămâne pentru
cazul „subiect vag, corp explicit" (alerta de acces Google).

### Sonda de paginatie: compara identitati, nu proxy-uri

`report-source-probe.js` compara **lungimea în octeți** a paginilor ⇒ raporta
`sameBytes: false` (diferența e un token CSRF) și **nu arăta că paginarea
avansează**. Azi: **page 2 adaugă 3 slug-uri noi peste page 0; page 1 adaugă 0**
⇒ paginatia avansează, iar scraperul (0, 2, 3) acoperă tot. Sonda compară acum
slug-urile reale ale joburilor.
*Regulă:* o sondă care „măsoară" ceva trebuie să compare **identitatea obiectelor**,
nu o metrica de transport. Proxy-ul produce false negative și false positive.

### Input invalid = sectiune care dispare SILENT (reparat)

`email-leads-2026-10-29.json` a fost scris cu ghilimele drepte în loc de cele
românești ⇒ JSON invalid ⇒ **secțiunea de leads lipsea din raport fără niciun
semn**. Pe 28.10 costase 1 cerere peste plafon (re-upload) + o oră de diagnostic.
Reparat structural: `report-build.js` citește fișierul cu `try/catch` care
distingue ENOENT (lipsă legitimă) de **eroare de parse** → scrie un
`⛔ Secțiunea de leads lipsește` în raport și un warning pe stderr.
*Regulă:* un input opțional care nu se parsează se **raportează**, nu se ascunde.
⇒ Și mai mult: **scrie fișierele de input ca obiect JS + `JSON.stringify`**, nu
ca JSON scris cu mâna — imposibil să se malformeze. (Am ratat de două ori cu
ghilimele drepte, a doua oară și după ce corectasem prima.)

### Alertele Bestjobs: tipul de email contează

Azi alerta **„Because you searched for graphic design, bucharest jobs"** poarte
**salariul pentru toate cele 14 joburi** (ieri îl avea doar pe un subset, în
alerta „13 new jobs"). Tipuri de sume întâlnite:
- „Market estimate on similar positions" = **estimare de jobboard**, nu de
  angajator (ELBI 1195–1325, BCR 1790–1980).
- sumă simplă = publicată de angajator (AGRESIV MEDIA 780–1020, BD Lemntech
  1405–2000, Apex 1200–1300, CreativeEd 525, Viragos 800–1000, UNICAN 800–1420,
  SudRezidential 1000–1200, BLEU PHARMA 800–1000, AMAL 900, INTAX 700).
- „Confidential" la Bestjobs = **Turing** (AI training) — verificat pe
  work.turing.com. Sumele (3000 ilustrator, 2000 fotograf) sunt ale jobboard-ului;
  Turing afișează „$300 estimated earning potential based on Approved tasks" ⇒
  **nu lua 3000 ca garantat**.

*Adaugat 01.11:* **estimările de piață se recalculează zilnic** (ieri 1340–1485 și
1790–1975, azi 1345–1485 și 1790–1980) — deci nu sunt oferte de angajator.

### Etichete: inboxul se golește

De la 28.10 incoace inboxul a scazut mult (643 → 430 → 378 → 382, deci prag
platizat). Filtrele: 6 din 6 functionale. Cele 3 categorii moarte sunt **toate fara
filtru creat** — cauza e absenta filtrului, nu un criteriu invalid.
*(cifrele zilnice sunt in `raport-zilnic-istoric`)*

### CI: rulari esuate pe MAVIS-OPTIMUS-CI — „All jobs have failed", detectate ca `needs-action` (nu `noise`) abia dupa regula de workflow esuat (28.10)

### Cota: 137 cereri pe 200

Cel mai ieftin zilnic până acum. Diferența față de 28.10 (201): n-am mai folosit
scriptele ad-hoc de citire a corpurilor — acum corpul le extrage pipeline-ul însuși,
cu 0 cereri în plus.


## 2026-10-30 — 12 mesaje, 1 posting nou, inboxul în continuă să se golească

### Joburi + leaduri (30.10) — în `raport-zilnic-istoric`

### Alertele Bestjobs are 3 forme de subiect

1. „**These employers are looking for people like you**" (Nou) — „angajatori care caută
   oameni ca tine": roluri de BRAND/marketing cu **estimări de piață** (Maspex, FRF,
   TEZAUR 1790–1975, Rompetrol, Electrica, Instore, Working4U, Imperial Brands
   1340–1485). Toate „market estimate on similar positions" — **nu oferte de
   angajator**, ci indicii de piață.
2. „New design graphic bucuresti jobs available" — cele 14 de design cu salariu.
3. „14 graphic design, bucharest jobs available" — aceleași 14.
⇒ Bestjobs are 3 alerte/zi; cea cu joburile de design e cea utilă.

### Etichete: inboxul se golește

azi=12 mesaje, 14 hituri de etichetă pe 11 mesaje (3 dublu-etichetate), 1 fără
etichetă. **7d inbox: 430 → 404** (643 pe 28.10). Toate cele 6 filtre
funcționează. Cele 3 moarte: `Personal` (n-a fost folosită niciodată),
`De raspuns` + `Facturi si Conturi` (20 de zile) — toate trei **fără filtru**.
`Optimus CD` = 0 azi (ultima 29.10), 736 pe 7z.

### Triaj: regula de job-alert are un caz complet

Alerta eJobs de azi: „Este un job nou care te așteaptă chiar acum!" — corpul spune
„Customer Support Agent (iGaming) @ TONLANOR HOLDING" ⇒ **nu e design**, și a fost
corect clasificat `fyi`. *Regulă verificată:* o alertă de job ajunge în
`needs-action` doar dacă rolul chiar e de design; alerta în sine nu ajunge.
(Contrar: pe 29.10, alerta eJobs cu „Graphic Designer" a fost corect `needs-action`.)

### Ocazional: „Dezabonare - Hippo recruitment" (Jooble)

Emailul spune „Abonamentul dvs. la newsletter-ul de căutare a noilor posturi vacante
Jooble **a fost oprit automat**". Clasificat `job-alert-other` — corect ca nu e job,
dar e un semnal: abonarea la alertele Jooble s-a oprit singură.
*De verificat cu Alex:* dacă mai vrea alertele Jooble, trebuie reactivată.

### Sondă: ruleaz-o DUPĂ ce se termină scraping-ul

`report-source-probe.js` citește fișierul `jobs-designproject-<data>.json`. Azi l-am
rulat în paralel cu scraping-ul ⇒ a prins fișierul vechi (inexistent) și a scris
„Sonda de surse nu a rulat azi" în raport. **Ordinea corectă: scraping → sondă →
raport.** (Sonda costă 0 cereri Google, deci poate fi rulată oricând, dar după
scraping.)

### Reparare mică în `report-build.js`

În secțiunea 5, ramura de fallback a sondei de surse scria doar itemul 2 și sărea la
4 (itemul 3 lipsea). Acum scrie și itemul 3.

### Cota (30.10): 126 cereri pe 200 — pipeline ≈ 122 + build 3 + verificare 1


> **Structura topicului (30.10):** regulile permanente + măsurătorile din 28.10 încolo
> rămân aici; jurnalul zilnic 21–27.10 e în topicul **`raport-zilnic-istoric`**.
> Arhivă completă pre-tăiere: `docs/arhiva/memorie/2026-10-30-pre-restructure-topics-30-10/`.


## 2026-10-31 — sâmbătă (secțiunea zilnică e în `raport-zilnic-istoric`)

Regulile rămase de aici: **catalogul IQads se micșorează prin expirare** („0 postări
noi" ≠ „catalog neschimbat" — urmărește și numărul de joburi); **o alertă de job poate
fi „de job" fără să aibă joburi relevante** (verifică titlul rolului, nu
departamentul de pe etichetă); **ordinea corectă e scraping → sondă → raport**;
**la eșec de scrape, re-rulează și verifică EXIT + numărul de joburi**.


> La limita 30KB. 31.10, 01.11, 02.11 și 03.11 sunt deja mutate în
> `raport-zilnic-istoric`; la următoarea rulare mută secțiunea zilnică precedentă
> (arhivează întâi în repo).


## 2026-11-01 — duminică (secțiunea zilnică e în `raport-zilnic-istoric`)

Regulile rămase de aici: **alerta de securitate se declanșează pe subiect, nu pe
expeditor** (prima alertă reală de la alt serviciu decât Google: „Someone just logged
into your Meta Account", cu loc, browser și profiluri); **tip nou de alertă Bestjobs:
„Candidates like you applied for these jobs"** — proxy bun pentru ce se caută, dar
filtrează pe titlu; **estimările de piață Bestjobs se recalculează zilnic** ⇒ nu sunt
oferte de angajator; **„0 postări noi" ≠ „catalog neschimbat"** (urmărește și numărul
de joburi).


## 2026-11-02 (secțiunea zilnică e în `raport-zilnic-istoric`)

Regulile: **alerta de securitate se declanșează pe ACȚIUNEA cerută** („action
required", „critical risk", „new sign in", „connected a new app", „mfa is disabled",
„is this you") pe **subiect**, și **o regulă mai slabă nu anulează una mai
puternică** (o alertă critică nu ajunge la „promoție" oricât de mult marketing s-ar
potrivi în corp); **„X is hiring for Y" cu rol de design e alertă de job**
(`JOB_HIRING` pe subiect + `ejobs` în `JOB_ALERT`).


## 2026-11-03 → `raport-zilnic-istoric` (regulile rămân aici)

Regulile: **„0 joburi noi" poate fi fals** — max ID-ul poate crește prin
**re-postări** (același `company+role` cu id nou, expirare nouă); diff-ul zilnic
trebuie să compare **id-urile**, nu doar `company+role`. **O alertă dedicată a
angajatorului** („MARKQUEN EUROPE is hiring ...") e semnal mai puternic decât
prezent în lista de căutare — și mai concurent.


## 2026-11-04 → `raport-zilnic-istoric` (regulile rămân aici)

Regulile: **pragul de „postări GENUIN noi" trebuie să fie INCLUSIV** (`>=`, nu `>`
— `datePosted` are granularitate de zi, deci un anunț postat chiar în ziua rulării
precedente putea să fi apărut după acea rulare; ce fusese deja vizibil e prins de
`newJobs`, deci nu se dublează numărătoarea). **O cerere de confirmare de
identitate cere omul, dar NU e alertă de securitate** (clasă separată, motiv
propriu). **„Remote" ≠ „eligible din țara ta"** — cere întotdeauna clauza de
eligibilitate în `verifiedVia`.


## 2026-11-05 → `raport-zilnic-istoric` (regulile rămân aici)

Regulile rămân valabile: **proza de cultură poate umfla scorul** — două clase noi
de „remote pozitiv fals" (**eticheta**: linia `Remote Status: on-site`/`hybrid`
conține chiar cuvântul „remote", deci linia care declară regimul e citită ca
semn de remote; **cultura**: „distributed team setting", „we are a global team" la
joburi on-site într-un oraș anume). Diagnosticul se declanșează doar dacă anunțul
NU oferă remote ȘI locația e un oraș anume — altfel flagui joburi remote adevărate.
**Nu conclude „sursa e epuizată" dintr-o zi.** **Grant-urile OAuth sunt
notificări de acces, nu intruzuni** — dar fiecare app rămâne cu acces.


## 2026-11-08 → `raport-zilnic-istoric` (regulile rămân aici)

**O adresă lipsă din anunț se găsește pe pagina companiei.** IQads nu publică
orașul în anunț, dar pagina de contact (`rel/<firma>?t=info`) dă adresa — așa a
rezolvat Cohn & Jansen: 5 zile în „verdict amânat" → #1 cu 9,6.
*Regulă:* înainte să iei un rol drept „locație necunoscută", caută pagina
companiei. **Guard:** adresa se aplică DOAR dacă numele companiei din anunț
corespunde paginii — altfel pui adresa altui angajator de pe ea.

**Cinci notificări pot fi o singură acțiune.** 5 emailuri Google, toate „You allowed
Antigravity for Google Drive/Calendar access..." = 4 scope-uri de Drive + 1 de
Calendar, pentru **o singură conectare**. *Regulă:* citește corpul și compară
numele aplicației, nu numără emailurile.

**Top 5 = joburi care se mai pot aplica.** Un job expirat nu e candidat oricât de
mare e scorul. *Regulă:* neexpirații primii în clasament, expirații marcați, lista
completă e în secțiunea 2.
