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

## Măsurători

| Zi | Mesaje | MAVIS/* | Joburi analizate | Păstrate | Verdict amânat | Postări noi | Cereri Google |
|---|---|---|---|---|---|---|---|
| 2026-10-23 | 125 (00:00–08:15 EEST) | 0 | 72 (46 IQads + 26 DP) | 36 | 14 | 0 | 422 (depășit) |
| 2026-10-24 | — | 0 (sorting oprit de 12 zile) | 72 | 36 | 14 | 0 | 200 (exact) |

0 postări noi: max ID IQads 23997 neschimbat; cel mai recent designproject.io
e din 2026-10-06. **Nu e blocaj de scraping — e realitate de piață.**

## Lead nou, verificat pe pagină (2026-10-24)

Alerta Jooble „YO AI Labs caută Graphic designer - Remote" →
`yoailabs.com/remote-jobs/graphic-designers` — **121 roluri de design remote,
contract, 5 platforme** (Micro1, SuperAnnotate, Ethos AI, AfterQuery, Handshake AI).

Rate-uri publicate: Graphic Designer $30–105/h, Graphic Designer / UI-UX Designer
(Ethos AI) **până la $150/h**, Creative Director până la $80/h, Brand Director
până la $70–80/h. Contract cu **platforma**, nu cu YO AI Labs. Interviu AI +
assessment de domeniu.

**Batează direct cu Traseul 2** (bani din proiecte + produse / freelance + AI).

## Istoric relevant

- 2026-10-21: 59 joburi analizate (12 IQads + 47 DP) → 40 păstrate, 7 verdict
  amânat, 19 drop-ate; scor top 9.6 (International Waters :: Senior Creatives).
  Livrat ca mirror local în workspace, pentru că Drive era încă inaccesibil.
- 2026-10-24: rescriere completă a `report-build.js` (commit `439c678`).


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


## Măsurătoare 2026-10-26 — 110 cereri (plafon 200), etichete MAVIS/* încă moarte

- **Consum: 110 cereri Google** (folder-discover 4 + inbox-counts 9 + mail-count 59 +
  simulate-sort 11 + filter-state 16 + inline 5 + build/upload 6). Mult sub plafon, pentru că
  azi au intrat doar **10 mesaje** (ieri erau ~130) ⇒ simulate-sort a costat 11, nu 89.
  *Regulă:* costul lui simulate-sort e proporțional cu numărul de mesaje de azi, nu fix.
  Ziua ușoară = raport ieftin. Nu presupune că 200 e mereu aproape.
- **Etichetele MAVIS/*: 0 pe azi, 0 pe 24h, 0 pe 7z, 1015 pe 30z.** Ultima etichetare reală:
  **11 octombrie** pe Joburi/AI/Social/Newsletter ⇒ **15 zile**, nu 14 (calculul zilei crește).
  Atenție: raportul calculează `daysOff` din data etichetei — crește zilnic, nu e cifră fixă.
- **Defectul filtrelor reconfirmat azi, măsurat identic:** 5 filtre cu criteriu,
  0 cu `addLabelIds`, 0 ating etichetă MAVIS/*. `from:(...)` = ȘI în Gmail ⇒ 0 lovituri.
  Cu `{}` ar fi prins **2909 mesaje în 30 de zile** (1087 joburi + 380 AI + 153 social +
  1253 newsletter + 36 finante). Cifrele se schimbă zilnic — se măsoară, nu se copiază.
- **Joburi:** 65 analizate (42 IQads + 23 designproject.io) → 34 păstrate, 31 drop-uri,
  12 cu verdict amânat (locație nepublicată de sursă).
- **0 postări genuinely noi** — max ID IQads 23997 neschimbat, cel mai recent designproject.io
  e din 2026-10-06. Piața e rece, nu e blocaj de scraping.
- **designproject.io:** 23 joburi (ieri 26), descrieri 363–31.446 caractere (ieri 71–1484 —
  **gama s-a comprimat**, nu s-a extins). `validThrough` = datePosted + 30 zile, **23/23 exacte**.

### NOU: corpurile complete ale emailurilor de job dau date pe care snippet-ul nu dă

Ieri (25.10) am raportat că anunțul AGRESIV MEDIA *„nu publică orașul, tipul de contract sau
salariul"* — **era fals**. Fragmentul de text (snippet) e trunchiat la 200 de caractere și
conține doar antetul; **corpul complet al emailului conține lista integrală a joburilor, cu
companie, oraș și salariu**.

Cost: 2 cereri (un `messages.get` per email, format=full, apoi decodare base64 a
`payload.parts[].body.data` cu mimeType=text/plain). **Merită întotdeauna** — costă 1 cerere
pe email și scoate cifra false din raport.

Din corpul emailului Bestjobs de azi (13 joburi, cu salariu) am scos leaduri pe care snippet-ul
nu le arăta deloc. Regula: **snippet = descoperire, corp = adevăr**.

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

### Leaduri noi, verificate pe pagină (5 din 6 sunt noi față de 25.10)

| Lead | Salariu | De ce contează |
|---|---|---|
| **UX/UI Designer — micro1** (contract, AI training) | **$50–90/oră** (3000 EUR cum apare pe Bestjobs) | Traseul 2 direct. Job listat azi pe Bestjobs la 3000; pe jobs.micro1.ai + aiannotationjobs.com: contractor, remote, **eligible Europa**, 3000 openings. Jobul e altul decât leadul YO AI Labs de ieri (același angajator, alt rol). |
| **Digital Content Designer (DTC, Amazon & Online Retail) Remote — Concentrix** | competitive package | **100% remote, eligibil din România** („RON Work-at-Home"). Postat 8 oct. Verificat pe jobgether + remowork.life + jobs.concentrix.com. ⚠️ Există și o versiune Sofia/Bulgaria care cere domiciu în Bulgaria — **aplică doar varianta RON** (Workday R1770996). |
| **Senior Art Director — Leo Burnett Bucharest** | neprecizat | Agenție de top, listată activ pe LinkedIn Jobs. ⚠️ Termenul BeBee („09.08.2026") e în trecut față de postarea recentă ⇒ **termen de agregator, nu de angajator**. |
| **Proiectant Producție Publicitară — BD Lemntech** | 1405–2000 EUR | Cel mai mare interval din lista de azi, „DISPONIBIL IMEDIAT". Locație Popești-Leordeni, dar listat și ca București. |
| **AI Video Editor (Meta & AppLovin) — Apex Digital Alliance** | 1200–1300 EUR | Design + performance + AI. |
| **Colaboratori design grafic — AGRESIV MEDIA** (reapărut) | **780–1020 EUR** | Salariul apare acum, pentru că azi am citit corpul complet. Ieri raportul spunea că nu apare. |

**micro1 = YO AI Labs?** Ieri am descoperit YO AI Labs cu 121 roluri remote și rate până la $150/h.
Azi, leadul micro1 (UX/UI Designer) vine pe Bestjobs. **Sunt aceeași platformă** — dar jobul
de azi e altul decât leadul de ieri. Nu confunda platforma cu jobul.

### Livrare

- Folder pe Drive: `GDrive-Second_Brain_PKMS/00_Inbox/00-2-Daily_Raw_Notes` = `1VjRvaInHjhzrIx90Pt3IiBh_yeSOg25c`
  (descoperit cu `report-folder-discover.js`, 4 cereri — **nu** hardcodat).
- Raport creat: `RAPORT-ZILNIC-202610-26.md` (id `11jjpmypH7bdOny8CSwkTKBfFPyrHMxWZ`, 40.106 bytes).
  `report-build.js` face search-then-upload ⇒ **actualizare in place**, nu duplicat.
- Commit `7668bf7` pushuit pe `main`.
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

| Categorie | azi | 24h | 7z | 30z | ultima etichetare |
|---|---|---|---|---|---|
| `MAVIS/Joburi` | 0 | 0 | 0 | 333 | 11.10 |
| `AI Folder/AI si Comunitati` | 0 | 0 | 0 | 115 | 11.10 |
| `Socials` | 0 | 0 | 0 | 216 | 11.10 |
| `Newsletter` | 0 | 0 | 0 | 235 | 11.10 |
| `Finante` | 0 | 0 | 0 | 5 | 06.10 |
| `Personal` | 0 | 0 | 0 | 0 | n/a |
| `De raspuns` | 0 | 0 | 0 | 30 | 09.10 |
| `Facturi si Conturi` | 0 | 0 | 0 | 2 | 09.10 |
| **`Optimus CD`** | **8** | **201** | **582** | **638** | **26.10** |

**8 din 9 categorii sunt MOARTE de 15 zile. Una e vie.**

**Filtrele: 6 cu criteriu, 1 funcționează.**
- ✅ `from:(notifications@github.com OR *jules*) OR subject:(Jules OR GitHub O...)`
  → **917 mesaje/30z**, `addLabelIds: ["CATEGORY_UPDATES","Optimus CD"]`,
  `removeLabelIds: ["INBOX","SPAM"]`. Funcționează efectiv (8 mesaje azi).
- ❌ celelalte 5: `from:(...)` în loc de `from:{...}` → **0** lovituri.
  Cu acoladele ar fi prins **3737 mesaje/30z**.

**De ce n-a mers mai devreme:** toate 5 aveau `addLabelIds` vid **și** criterii
care nu pot lovi nimic. Doar filtrul NOU (scris de Mavis Local) are ambele
corecte. ⇒ **reparația e deja în scriptul lui Local**; de partea mea rămâne
`fix-mavis-filters.js` pentru cele 5 vechi, care cere scope
`gmail.settings.basic` (absent în cloud) ⇒ rulează de pe mașina lui Alex.

### Joburi 27.10

62 analizate (43 IQads + 19 designproject.io) → 33 păstrate, 12 verdict amânat.
**1 postare GENUIN NOUĂ:** `Art Director @ Mercury360` (IQads #23999, max ID
anterior 23997), scor **9.6** — al doilea din tabele, și cel mai bine potrivit
din categoria „design efectiv". Verificat pe pagina IQads: București hybrid,
Full Time, Senior, expiră 25.12.2026, 7+ ani experiență advertising,
motion design/video **obligatoriu**.

designproject.io: 19 joburi (ieri 23), descrieri 363–30.012 caractere,
`validThrough` = datePosted + 30 zile, **23/23 exacte** (pe 23 joburi ieri).

### Cota: 207 cereri (plafon 200) — depășită cu 7

`report-mail-count.js` 78 · `inline` 69 · `report-simulate-sort.js` 24 ·
`report-filter-state.js` 20 · `report-inbox-counts.js` 9 · folder-discover 4.

**Cele 69 de `inline` au fost diagnosticul rearanjării taxonomiei**: liste de
etichete, comparații de numere, verificarea filtrului nou funcțional. Cheltuite
pe **înțelegerea** stării, nu pe măsurarea zilei. Zero scrieri pe Gmail.
**Raportat explicit în §5 al raportului** — nu ascuns.


## 2026-10-28 — FILTRELE S-AU REPARAT; TRIAJUL CITESTE CORPUL

### Starea filtrelor: 6 din 6 functionale (ieri 1 din 6)

Masurat azi: toate cele 6 filtre MAVIS au `addLabelIds` **si** folosesc `from:{...}`
(acolade = SAU). Toate lovesc efectiv. **6 din 9 categorii primesc mesaje** (era 1 pe 24.10).

Causa reala a categoriilor ramase moarte s-a schimbat, si asta e important:
`Personal`, `De raspuns`, `Facturi si Conturi` **nu au filtru creat** — nu e criteriu
invalid. Diagnosticul se calculeaza comparand filtrul viu cu eticheta categoriei
(nu hardcodat). Fara filtru, nimic nu le poate eticheta, oricare ar fi criteriul.

**Filtrele curata UNREAD, dar NU scote din INBOX:** masurat pe cele 20 de mesaje de
azi — 17 au inca INBOX, doar 5 au ramas UNREAD. Inboxul s-a umplut la 643/7z.
Deci „necitit" se curata, „inbox" nu. Nu promite golirea inboxului.

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
  depinde de continut** (needs-reply/needs-action/job-alert-other). Un newsletter
  isi stie clasa din expeditor ⇒ refacerea lui ar arde cereri pentru zero informatie.
  `--all` reface tot; `--ids=a,b` face interventie chirurgicala. **Nu re-listeaza**
  mesajele ⇒ setul masurat ramane consistent cu `report-inbox-counts.js`.
- `report-build.js --file-id=<ID>` — reincarca raportul creat cu **1 PATCH** in
  loc de 3 cereri (search + upload + verificare). Raspunsul include
  name/mimeType/size/parents ⇒ e si verificarea. `UPLOAD_COST` devine dinamic.

### Numerele trebuie sa fie de aceeasi fereastra

Raportul spunea 18 mesaje in antet si 20 in §1.4: masuratori la momente
diferite (2 mesaje au sosit intre timp). **Sursa unica pentru „azi" = simularea**
(cea mai recenta). In plus: `mailCount.totals.azi` e **suma hiturilor pe etichete**
(un mesaj cu 2 etichete se numara de 2 ori), NU numarul de mesaje distincte.
Azi: 20 mesaje → 16 cu eticheta → 18 hituri (2 dublu-etichetate) → 4 fara filtru.
Raportul explica asta explicit, ca nu para numere contradictorii.

### Portul de upload: o greseala de JSON a costat 1 cerere peste plafon

`email-leads-2026-10-28.json` avea ghilimele drepte in loc de cele romanesti
(„Aplică & Începe interviul") ⇒ JSON invalid ⇒ **sectiunea de leads nu se randa
deloc** si raportul s-a urcat fara ea. Detectat abia **dupa** upload, prin
verificarea continutului pe Drive. ⇒ **verifica continutul raportului pe Drive
(citeste-l inapoi), nu doar metadata.** Costul repararii: 1 PATCH.
Cota finala: **201 pe 200 (depasit cu 1)**, raportat explicit in raport.
Excedentul a fost diagnostic (17 cereri readbodies/extract/inline) + reupload.

### Starea joburilor

57 analizate (42 IQads + 15 designproject.io) → 29 pastrate, 28 drop-uri,
12 cu verdict amanat. **0 postari noi** — max ID IQads 23999 neschimbat, cel mai
recent designproject.io tot 2026-10-06. Piata e rece, nu e blocaj de scraping.

**designproject.io: PAGINATIA ACUM AVANSEAZA** (pe 27.10 nu avansa). Page 1 adauga
0 slug-uri peste page 0, dar **page 2 adauga 4** — iar scraperul ia deja paginile
0, 2, 3, deci le are. Verificat ca toate 4 sunt in fisierul de azi. Sonda
`report-source-probe.js` compara doar **lungimea in octeti** a paginilor, deci
raporteaza `sameBytes: false` fara sa arate ca paginatia avanseaza — **sonda e prea
slaba; compara slug-urile**, nu bytes.

### Leaduri de azi (5, fiecare cu calea de verificare declarata)

| Lead | Sursa | Bani | Verificat |
|---|---|---|---|
| Graphic Designer part-time 15h remote @ CreativeEd Media | Bestjobs | 525 EUR/luna | text integral, indexat |
| Graphic Designer @ ELBI ElectricLighting | Bestjobs | 1195–1325 (estimare) | sumat, fara cerinte |
| UX/UI Designer – Video Annotation Remote (micro1) | Bestjobs | 3000 EUR/luna | text integral, indexat |
| Editor imagine TV Junior @ Aleph News | HiPo | 4000–5000 RON net | **pagina HiPo, HTTP 200** |
| Junior Mid-Level Graphic Designer & DTP @ BRAYTRON SRL | eJobs | — | **NEVERIFICAT** (403) |

Regula noua: `report-build.js` spunea „pagina sursa citita direct" despre leads —
**fals** pentru Bestjobs (403 la acces automat, s-a citit textul indexat de motor).
Acum fiecare lead declara `verifiedVia`, iar rubrica spune corect ce s-a facut.


## 2026-10-29 — 3 joburi NOI; etichetele se stabilizeaza

### Joburi

**3 postari GENUIN NOUI** pe IQads (max ID 23999 → 24002), toate expiră 27.12.2026:
- **#24000 Art Director / Graphic Designer @ Cohn & Jansen** — Full Time, nivel
  „Middle, Senior", 5+ ani în agenție, campanii 360°. **IQads nu publică
  localizarea** (verificat: pagina de anunt + 6 pagini de listare + motorul de
  căutare) ⇒ rămâne în „verdict amânat" cu scor 8 (L=0). Dacă e București,
  scorul = 9,6 și ar fi #2. Verifică-l manual.
- #24001 Influence Lead @ Publicis · #24002 Influence & Content Production
  Manager @ Publicis — ambele influență/conținut, nu design pur.
- designproject.io: **0 postări noi** (cel mai recent tot 06.10).

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

### Etichete: inboxul se golește

6 din 9 categorii primesc mesaje (a 3-a zi la rând). **7d inbox: 643 → 430**
(ieri 643, acum 430) ⇒ inboxul SE GOLESTE, în sfârșit. Optimus CD: 24h 98,
7z 769 (explozie de notificări GitHub). Azi: 18 mesaje, 24 hituri de etichetă pe
16 mesaje (8 dublu-etichetate), 2 fără etichetă. Filtrele: 6 din 6 funcționale,
0 nefuncționale. Cele 3 categorii moarte: `Personal` (n-a fost folosită
niciodată), `De raspuns` + `Facturi si Conturi` (19 zile) — **toate trei fără
filtru creat**.

### CI: 2 rulări eșuate pe MAVIS-OPTIMUS-CI

„CI-verify: All jobs have failed" — două commituri consecutive (485440d, c226ac4).
Astăzi e prima dată când triajul le prinde ca `needs-action` (nu `noise`), fiindcă
regula pentru workflow eșuat a fost adăugată pe 28.10.

### Cota: 137 cereri pe 200

Cel mai ieftin zilnic până acum. Diferența față de 28.10 (201): n-am mai folosit
scriptele ad-hoc de citire a corpurilor (`readbodies.js` 10 + `extract.js` 2) —
acum corpul le extrage pipeline-ul însuși, cu 0 cereri în plus.
