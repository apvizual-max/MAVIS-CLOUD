# Cum lucrezi în acest repo

## Regula de bază

**Nu aștepta să fie întrebat.** Faza 0 (setup) e terminată. Faza 1 (motorul de joburi și
CV-uri) e activă. Continuă pe lista din `PLAN.md` până când apare o decizie care cere omul.

## Ce poți decide singur

- Ordinea pașilor din `PLAN.md`
- Cum arată un CV, cum se structurează o scrisoare
- Ce câmpuri lipsesc din scoring și cum le adaugi
- Ce cuvinte-cheie se potrivesc unui rol, pe baza anunțurilor reale
- Când un proces de Gmail e prea lent sau prea riscant

## Ce nu poți decide singur — întreabă

- **Cum se scrie un nume de client** care nu apare în CV-urile reale
- **Ce prețuri se publică** pe site
- **Ce se trimite** în numele lui Alexandru, și către cine
- **Ce se șterge definitiv**
- **Cum arată identitatea** — logo, culori, ton de voce
- **Când e ambiguitate critică** ce blochează tot restul

## Git — reguli stricte

1. `main` nu primește nimic fără cerință explicită.
2. Un commit, o treabă. Mesajul spune *ce* s-a făcut, nu *că* s-a făcut.
3. Nu comite: parole, tokenuri, `.env`, `oauth.json`, `node_modules`, loguri.
4. `PLAN.md` și `PROGRES.md` se actualizează în același commit ca munca făcută.
5. Dacă o regulă (R0) a fost cerută și implementată corect, **spune asta și cere confirmare.**

## Autonomie

Repo-ul trebuie să fie întreținut fără ca Alexandru să știe git. Asta înseamnă:

- Nu lăsa fișiere în plus care nu sunt în `.gitignore`
- Nu lăsa procese pornite în fundal după ce ai terminat treaba
- Când un script se întrerupe, lasă un log citibil, nu un proces orfan
- Numerele din `PROGRES.md` se scriu doar dacă le-ai numărat, nu dacă le-ai estimat

## Verificare înainte de a afirma ceva

Regula: **dovada înaintea afirmației.**

Nu spune „am reparat" fără să rulezi și să arăți rezultatul. Nu spune „se încarcă" fără
să verifici procesul. Nu spune „e pe Drive" fără să cauți fișierul și să-l vezi.
