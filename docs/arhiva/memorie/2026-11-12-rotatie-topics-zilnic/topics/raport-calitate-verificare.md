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
