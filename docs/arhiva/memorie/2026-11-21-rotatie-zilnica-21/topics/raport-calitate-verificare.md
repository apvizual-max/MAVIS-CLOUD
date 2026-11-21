# Calitate & verificare — reguli permanente

> Reguli apărute din greșeli reale ale pipeline-ului de raport zilnic. Fiecare e
> însoțită de **măsurătoarea** care a dezvăluit-o și de **reparația** făcută.
> Mecanica pipeline-ului rămâne în `raport-zilnic-pipeline`; jurnalul zilnic în
> `raport-zilnic-istoric`.

## 1. Un diagnostic greșit într-un raport zilnic e o cifră mascată (11.11)

§1.3 spunea, despre filtrul moarte, „folosesc `from:(...)` în loc de `from:{...}`" și
„`addLabelIds` e vid". Pe 27.10 era adevărat; pe 11.11 **ambele erau false** — filtrul
mort (`from:@cloudhq.net OR … OR mailking` → `CATEGORY_PERSONAL`) are OR explicit și
`addLabelIds` corect, iar 0 lovituri doar pentru că nu a venit mail de la aceste surse
în 30 de zile.

*Regulă:* **cauza se calculează per obiect, din date** (`causeOf()` în
`report-build.js`) — pe aceeași regulă ca etichetele: niciun nume, cauză sau
diagnostic scris de mână în cod.

## 2. Scope-ul `gmail.settings.basic` E ACORDAT (măsurat 11.11)

`tokeninfo` arată **29 scope-uri**, identice cu lista canonică din `google-scopes.js` —
inclusiv `gmail.settings.basic`. ⇒ **repararea filtrelor se poate face și din cloud**
(DELETE + CREATE: `filters.update`/PUT → 404, `filters.patch`/PATCH → 404 „Method
not found"), nu doar de pe calculatorul lui Alex. Regula veche („scope-ul lipsește")
e depășită.

`report-filter-state.js` citește scope-ul de pe token (1 cerere) și îl scrie în raport
— **măsurat, nu presupus**.

## 3. Semnalul de cont din corp nu poate fura o alertă de job (11.11)

Alerta Hipo.ro („Alex - 36 Joburi noi") era clasificată „contul cere o actiune
(parola / confirmare)" — motiv **FALS**: expresia se potrivea pe link-ul de footer
din newsletter („Trebuie sa alegi o parola noua").

*Regulă:* semnalul de cont din **antet + fragment** e dominant oricând; semnalul din
**corp** contează doar dacă mesajul **nu** e alertă de job (cazul HiRo, 28.10 —
body-only, firmă, nu platformă).

## 4. Corpul trunchiat poate ascunde roluri — verifică-l înainte de a clasifica (11.11)

`BODY_CAP = 4000` în `report-simulate-sort.js`. Alerta Hipo avea 112.996 de caractere
⇒ 96% trunchiate, iar clasamentul „nu atinge profilul de design" s-a bazat pe primele
4.000 de caractere. Verificat cu corpul complet: niciun rol de design (SAP Solution
Designer, Senior Brand & Consumer Advisor, Brands Ads Lead ⇒ IT/marketing).

*Regulă:* dacă clasa unui mesaj depinde de conținut și corpul e trunchiat, **citesc
corpul complet** (1 cerere, `messages.get format=full`) înainte de a afirma ceva despre
roluri.

## 5. `_meta.scraped` hardcodat = data de scrape FALSĂ în artefact (11.11)

Ambele scrapere scriau `scraped: '2026-10-23'` în `_meta`, indiferent de zi. Acum se
deduce din **numele fișierului de ieșire** (`jobs-iqads-AAAA-LL-ZZ.json`), cu data
curentă ca rezervă.

## 6. Livrarea se verifică pe CONȚINUT, nu pe metadata (11.11)

`report-build.js` verifica metadata-ul (name/mime/size/parents). Nou:
**`mavis-tools/report-verify-upload.js`** citește fișierul de pe Drive înapoi
(`drive.download` → `{raw}` — **nu** JSON!), îl compară byte cu byte cu localul și
verifică explicit fiecare secțiune promisă. Cost: **1 cerere**.

*Capcană măsurată:* `kit.js` întoarce `{raw: text}` pentru fișiere care nu sunt JSON;
`String(obj)` dă „[object Object]" ⇒ o verificare scrisă prost raportează „conținut
lipsă" când conținutul e acolo. E exact inversul eșecului din 28.10 (conținut lipsă,
metadata perfect) — ambele sunt „cifre mascate".

## 7. Cifra de cotă e măsurată la un moment, nu pe tot parcursul

Raportul spune „cota la scrierea raportului"; verificarea post-upload mai consumă
1 cerere. Deci raportul declară explicit ambele: *„cifra e măsurată la scrierea
raportului; verificarea conținutului de pe Drive mai adaugă 1 cerere"*.


## 8. Un rol de design poate fi anunțat în altă limbă (11.11)

Alerta LinkedIn „Uzum Team is hiring: **Графический дизайнер** Uzum Holding" era
clasificată „alerta de job, dar **nu atinge profilul de design**" — motiv **FALS**:
rolul E un graphic designer, dar anunțul e în rusonește, iar `DESIGN_KW` era doar
engleză. Regula „relevanța se judecă pe subiect" funcționa; **detectorul de cuvinte
nu acoperea limba**.

*Regulă:* când semnalul decisiv e în subiect/conținut, detectorul trebuie să acopere
și **limba în care e scris rolul** — altfel regula ratează exact rolurile de design
(de exemplu, alertele LinkedIn vin în limba anunțului). `DESIGN_KW` include acum
rusonește (`графический дизайнер`, `графического дизайнера`).

**Însoțitor, tot din 11.11:** o alertă de rol de design care **nu publică locație**
(nici remote, nici țară, nici fus orar) se raportează ca **eligibilitate
necunoscută**, nu ca „nu e relevant". Aici: Uzum Holding e companie turcească, iar
alerta nu spune nimic despre locație ⇒ spus explicit în chat și în jurnal, nu
inventată o locație.


## 9. Un rol drop-uit într-o disciplină din profilul tău e un LEAD ASCUNS, nu gunoi (12.11)

Măsurat: **singura postare nouă a zilei** (IQads #24013 DTP Specialist @ Fieldstar) a
fost drop-uită de circuit breaker cu motivul „disciplina nu se potrivește niciunui
tier". `scoring.gs` are chei `graphic designer` / `dtp designer`, dar **nu are cheie
pentru DTP/prepress ca atare** — deși profilul din același fișier declară
`prepress: 10` ani. ⇒ **lead-ul cel mai bun al zilei era ascuns în drop-uri**, iar
raportul aproape că nu îl arăta.

*Regulă:* când motorul drop-uiește un rol, verifică **dacă disciplina lui e în
profilul tău** — și dacă da, raportează-l explicit, nu-l îngropa în drop-uri.

*Reparație (raport, nu motor):* diagnostic nou **§6.3 „roluri drop-uite într-o
disciplină din profilul tău"** în `report-build.js`. Disciplina se calculează din
**titlu + specializare** (cuvânt cu frontieră, nu substring) — **nu** din prosa
anunțului, altfel inflăm exact ca în §6.2. `scoring.gs` **neatin**: portul e fidel
prin design, decizia de a adăuga cheile lipsă (tier 2 sau tier 3) e a lui Alex.

## 10. Regula „neexpirații primii" trebuie să se aplice TUTUROR tabelelor (12.11)

Top-ul brut punea neexpirații primii, dar **top-ul „efectiv de design"** (filtrat pe
titlu) avea pe poziția 1 un job **expirat** (E.ON UX Designer, scor 10) — în
contraza regula scrisă chiar deasupra lui.

*Regulă:* când un tabel promite un criteriu de ordine, **același criteriu se aplică
în toate tabelele derivate**. Reparare: ambele tabele folosesc acum aceeași ordine
(`liveFirst()` = neexpirații întâi, expirații la final).

## 11. Facturarea/suspendarea nu e incident de securitate (12.11)

Două mesaje Google Cloud de azi („Your Project: Sentinel Prime is at risk of
suspension", „Action required: your billing account … is past due") intrau în
`needs-action` — dar **motivul trebuie să fie propriu**: facturare/suspendare, nu
securitate. Altfel un cititor trece alertele de facturare drept incidente de
securitate și nu le tratează ca atare.

*Regulă:* ramură separată pentru „contul/proiectul cere o acțiune (facturare /
suspendare)", declanșată pe **ACȚIUNEA cerută** și pe ambele forme de subiect
(„at risk of suspension" / „billing account … past due") — nu pe expeditor.


## 12. Concluzia unui raport se scrie cu `plural()`, nu cu concatenare (13.11)

Măsurat: cu 3 postări noi, §4 scria **„3 postareri noue"** — șablonul construia
pluralul prin `postare${n>1?'ri':''}` ⇒ `postareri`. Pentru n=1 ieșea corect
(„1 postare nouă"), deci bugul apărea doar la plural.

*Regulă:* **orice plural din șablon se calculează, nu se concatenează** — în
`report-build.js` există deja `plural(n, one, few, many)`; folosește-l peste tot.
Regula e generală: un șablon care „merge" la singular poate fi stricat la plural,
deci testează ambele forme.

## 13. Facturarea Google Cloud neplătită a doua zi = acțiune repetată, nu noutate (13.11)

Alertele „Your Project: Sentinel Prime is at risk of suspension" și „billing account
01676A-B533AF-A666B51 is past due" au apărut **a doua zi consecutiv**. Triajul le
clasifică corect ca „facturare/suspendare" (nu securitate), dar un mesaj care
repetă aceeași cerere de două zile la rând e **acțiune încă neexecutată**, nu
noutate.

*Regulă:* când un mesaj de acțiune reapare, raportează-l ca **pendent** (a 2-a
zi), nu ca eveniment nou — altfel zile întregi arată „acțiuni de luat" fără să
spui că nu s-a făcut nimic.


## 14. Boilerplate-ul de platformă se curăță înaintea verificării relevanței (14.11)

Alerta eJobs tipărește **filtrele candidatului** („Joburi în Niveluri carieră: … Departamente: … **Grafică / Webdesign / DTP**"). Cum `DESIGN_KW` căuta „grafică/webdesign/dtp", **fiecare alertă eJobs părea un job de design** — fals pozitiv *sistematic*, nu accidental: azi a stricat 2 din 9 mesaje (Unity Developer, Business Manager - Architects & Designers).

*Regulă:* înainte de a verifica dacă un mesaj e relevant, **separă conținutul mesajului de boilerplate-ul platformei** (filtre candidat, meniuri, footere, categorii de job). Boilerplate-ul se recunoaște după structură (etichete de configurare, liste de departamente), nu după expeditor. Implementare: `stripSettingsBoilerplate(t)` în `report-triage.js`, aplicat **numai** când mesajul nu e o alertă de job nominală (`namesSpecificJob`).

## 15. Un trigger de tier poate veni dintr-un acronim străin de job — îl raportezi, nu îl ignori (14.11)

IQads #24017 (Paid Media Specialist / PPC @ Flaminjoy) a primit **D=5 prin `"mcp"`** (tier Emerging Sectors) și **S=10 prin `"lead"`** — cu toate că e un job de marketing/paid media. Cuvântul „mcp" apărea în prosa anunțului, într-un context care nu are legătură cu rolul.

*Regulă:* când un trigger vine din **acronime sau cuvinte scurte** care pot apărea incidental, **nu îl ignora și nu îl confunda cu un lead**: raportează-l explicit în §6.2 („axa D ridicată de prosa, nu de titlu") ca **scor umflat**, și păstrează rolul în tabele — așa cum se face pentru orice altă discrepanță. `scoring.gs` **nu se modifică** fără decizia lui Alex; raportul are datoria să arate discrepanța, nu s-o ascundă.


## 16. Tabelul de măsurători trebuie să se adune cu totalul lui (15.11)

Raportul afișa rânduri care însumau **137**, dar un total de **140**: lipseau cererile
făcute de `report-build.js` însuși (3 = search + upload + verificare) și de
`report-verify-upload.js` (1). Contorul le scrie **la ieșirea procesului**, deci la
momentul generării **nu sunt încă în fișier** ⇒ șablonul le omitea.

*Regulă:* costurile etapelor ulterioare generării se calculează **explicit**, nu se
presupun că sunt în contor: `buildRow = contor[build] + UPLOAD_COST`,
`verifyRow = contor[verify] + 1`, totalul = suma rândurilor. **Regula de verificare:
suma rândurilor trebuie să fie egală cu totalul afișat** — altfel cifra din antet
descrie altceva decât tabelul.

## 17. Acordul de plural și de gen se calculează, nu se concatenează (15.11)

„**Cele 1 filtre** cu criteriu care **lovesc** niciun mesaj" — pentru n=1 trebuie
singular **și** acordul verbului: „**Filtrul** cu criteriu care **nu lovește**". La fel,
„**6 functioneaza**, **1 sunt nefunctionale**" ⇒ „6 functioneaza, **1 este nefunctional**".
Este aceeași clasă ca „3 postareri noue" (13.11).

*Regulă:* în șablon, orice numătoare urmată de substantiv și verb are **două forme**
(număr + gen + acord verbal); testează **n=1 și n≥2**, nu doar forma întâlnită în ziua
respectivă.

## 18. Fereastra zilei se etichetează cu fusul orar real (15.11)

Raportul scria „00:00–09:09 EEST" și calcula fereastra cu **+3 ore** — dar România a
trecut pe **EET (UTC+2) din 25.10.2026** ⇒ fereastra și eticheta erau cu o oră greșite.

*Regulă:* fusul orar se **calculează din dată** (EEST până la 25.10.2026, EET după),
iar eticheta se generează din aceeași valoare — nu se scrie `EEST` în șablon ca
constantă. La fel ca orice altă constantă de mediu: **se rezolvă live, nu se hardcodează**.


## 19. Un cod de verificare e un TEST DE AUTENTIFICARE, nu newsletter (16.11)

„**381878 is your verification code**" (Slickdeals, 00:46 UTC) a fost clasificat `fyi`
— deci raportat ca „fără acțiune". Dar e un **test de acces**: cineva încearcă să intre
în cont. Dacă Alex nu l-a cerut, e o tentativă de acces.

*Regulă:* trei clase distincte, cu priorități diferite:
- **confirmare de proprietate** („numele tău e pe asta") → cere omul, **nu** e alertă de securitate;
- **cod de verificare / „verify it's you"** → **test de autentificare** ⇒ `needs-action`, cu motivul „dacă nu l-ai cerut tu, e tentativă de acces în cont";
- **incident de securitate** („new sign in", „connected a new app") → alertă de securitate.

Implementare: `AUTH_CHALLENGE` în `report-triage.js`, plasat **după** regula de alertă
de securitate și **înaintea** newsletter-ului. Atenție la zgomot: un cod de 2FA al
unui serviciu pe care Alex îl folosește e legitim ⇒ întotdeauna întrebarea „l-am cerut eu?"
în motivul raportat, nu o alertă de urgență.

## 20. Acordul de plural se aplică și la propoziții, nu doar la tabele (16.11)

„**1 dintre ele nu au primit** nicio etichetă de categorie" — corect: „**1 dintre ele nu a
primit**". Același tip de eroare ca „Cele 1 filtre" (regula 17), dar în altă formă.

*Regulă:* când numărul intră într-o **propoziție cu verb**, verifică acordul pentru
**n=1 și n≥2**; șablonul trebuie să aibă ambele forme, nu doar pe cea întâlnită azi.

## 21. Cota din raport trebuie să fie IDENTICĂ cu contorul măsurat (17.11)

Regula 16 (suma rândurilor = totalul) intrase în vigoare pe 15.11. **Verificată trei zile
la rând:** 16.11 → 123 = 123 · 17.11 → 124 = 124 · 18.11 → 128 = 128.

*Regulă:* după fiecare rulare, compară cifra din antetul raportului cu valoarea finală
din contor. Dacă diferă, defectul e în șablon (o etapă nu intră în tabel), nu în contor.

## 22. „Filtru funcțional" = lovește mesaje ȘI adaugă etichetă de categorie (18.11)

Raportul spunea „**7 filtre functioneaza**" — numărat doar după „lovește mesaje". Al 7-lea
filtru (cloudHQ) lovește 1 mesaj în 30 de zile, dar ținta e `CATEGORY_PERSONAL`, care e
**etichetă de SISTEM a Gmail**, nu una din cele 8 categorii ale tale ⇒ mesajele lui nu
primesc nicio etichetă de categorie. Corect: **6 funcționale** (măsurat de sondă:
`functionalFilters = 6`).

*Regulă:* „funcțional" se calculează per filtru ca `lovește ȘI etichetează o categorie`.
În `report-build.js`, flag-ul `functional` vine de la sondă — **nu îl suprascriem** cu
un proxy (`_matchesAsIs` nu există în JSON-ul salvat ⇒ toate filtrele ar părea
„nefuncționale"). În §5, diferența trebuie **numită** (ce filtru, ce țintă), nu doar
corectată. *Regula conexă:* o etichetă de **sistem** a Gmail (`CATEGORY_*`) nu e o
categorie a taxonomiei — nu spune „eticheta nu mai există" (ea există).

## 23. O etichetă nouă, necunoscută taxonomiei, se raportează — și se verifică dacă are mesaje (18.11)

Apărută în Gmail: `MAVIS/Joburi/IQ Adds` (sub-etichetă a `MAVIS/Joburi`). Scriptul de
numărare o raporta pe stderr, dar **nu o salva** ⇒ putea lua mesaje pe care nicio
categorie din raport nu le numără (cifră mascată).

*Regulă:* sondă nouă `mavis-tools/report-label-stray.js` (~3 cereri): pentru fiecare
etichetă `MAVIS/*` necunoscută → câte mesaje azi / 7 zile și câte poartă eticheta **fără**
nicio categorie rezolvată. Azi: eticheta e **goală** (0 azi, 0 în 7 zile), deci niciun
mesaj nu e ascuns; în raport apare în §5, cu cifra, nu ca notă de subsol.

## 24. Un fișier de intrare INCOMPLET se raportează — nu se folosește (19.11)

`scrape-iqads.js` scria `jobs-iqads-<data>.json` **de două ori**: o dată cu lista de
joburi, o dată după ce atașamentul `companyCity` (orașul de pe pagina companiei) era
aplicat. Rularea de scoring a citit fișierul **între cele două scrieri** ⇒ fără
`companyCity` ⇒ joburi cu locație reală au căzut în „verdict amânat" și **scorul lor a
scăzut**: Cohn & Jansen #24000 a trecut de la **9,6 în secțiunea 1** la **8,0 în
„verdict amânat"** — un job de top pierdut din tabele fără niciun semn.

*Regulă:* intrarea care se scrie în două etape trebuie să fie **atomică** (`OUT.tmp` +
`rename`) și să poarte un **marker** în `_meta` (`companyCityResolved: true`). Scriptul
consumator **refuză să ruleze** dacă markerul lipsește, cu mesaj explicit — nu
continuă cu cifre greșite. *Regula conexă:* „zero mascat e mai periculos decât eroare"
aplică și la fișiere: un zero mascat înseamnă un job scos din tabele.

## 25. Cuvântul generic „design" nu e o disciplină (19.11)

Alerta Indeed „București, Ilfov: **Design Engineer CATIA – Bumpers** la Segula
Technologies" a fost clasificată „alerta de job cu rol de design" ⇒ **needs-action**,
fiindcă `DESIGN_KW` conținea cuvântul generic `design`. E **CAD mecanic/auto**
(proiectarea barelor de protecție), nu disciplina lui Alex.

*Regulă:* detectorul separă cuvintele-cheie **specifice** (tier-urile din `scoring.gs`:
graphic/UI-UX/art/motion/DTP/foto/video/AI) de cele **generice** (`design`, `creativ`).
O alertă e de design dacă se potrivește o cheie specifică **sau** una generică **în
absența** contextului mecanic/auto (`CATIA`, `SolidWorks`, `CREO`, `PLM`, `automotive`,
`sheet metal`, `tooling`, `car body`, `proiectarea componentelor`). Rezultatul azi:
needs-action 5 → **4**, fără să se piardă nicio alertă de design reală.

## 26. Cota din raport e o fotografie la momentul scrierii (20.11)

Raportul scrie „Cota Google: **130** cereri" — măsurată când raportul a fost scris,
plus cererile *pending* (upload-ul + verificarea). Orice cerere făcută **după** acel
moment intră doar în contor: azi, un audit de unicitate pe Drive (search după nume,
1 cerere) a dus contorul final la **131**, cu raportul deja publicat la 130.

*Regulă:* la finalul zilei, compară cifra din raport cu **contorul final** și
raportează cifra reală, cu diferența explicată — nu scoți o cerere din tabel ca să
se potrivească. Tabelul din §5 rămâne „starea la scriere" și e corect așa.

## 27. Verificarea livrării: o singură dată, cu id-ul real (20.11)

Trei cereri cheltuite degeaba pe un raport care se verifica cu 1: (1)
`report-verify-upload.js` apelat cu un **id inventat** („PLACEHOLDER") a consumat o
cerere chiar deși a eșuat; (2) un build cu **folder id greșit** (transcriere) a pornit
un search+upload inutile; (3) build repetat (dry → upload → patch) — fiecare upload
real se contorizează.

*Regulă:* id-ul de verificare vine **din răspunsul build-ului**, nu se scrie cu mâna;
build-ul se rulează o dată pentru conținut și o dată pentru livrare; după livrare,
un search după nume (1 cerere) confirmă că n-a rămas **duplicat** și că `parents` e
folderul corect. Cererea de audit intră în contor și se raportează, nu se ascunde.

## 29. Nu deduce o divergență dintr-un output trunchiat (21.11)

Azi am văzut că `report-mail-count.js` nu mai raporta `Personal` ca etichetă lipsă și
aproape am „reparat" șablonul (cuvintele „nu mai exista in Gmail" → „nedeterminat").
Verificarea a arătat că **linia exista în output, doar `tail -13` o tăiase**; ambele
sondae (`report-mail-count.json` și `report-label-stray.json`) spuneau `Personal` ⇒
nu era divergență.

*Regulă:* când două măsurători par să nu se potrivească, **citește fișierul JSON sau
outputul complet**, nu fragmentul afișat. Un „fix" bazat pe o divergență inexistentă
corupe șablonul pentru o cauză care nu există.
