# POST-TAIERE — rotatie zilnica 15.11.2026

Arhiva: `docs/arhiva/memorie/2026-11-15-rotatie-zilnica-15/` (snapshot înainte de tăiere).
Tăierea s-a făcut **după** ce arhiva a fost comitată și împinsă pe `main` (`942fcbe`).

## Ce s-a comprimat (topicul `raport-zilnic-istoric`)

| Secțiune | Acțiune | Câștig |
|---|---|---|
| `## 2026-11-04` — secțiunea apărea **de două ori** în topic (3,6 KB în total) | ambele copii comprimate într-un rând (`replace_all`) | ~3.900 B |

Descoperirea zilei: **`raport-zilnic-istoric` avea o secțiune duplicată** (11-04). A
fost posibilă comprimarea ei deoarece textul vine din **view-ul tool-ului**, care e
fidel pentru blocurile neatinse; blocurile scrise **din arhivă** eșuează, fiindcă
arhiva și topicul au wrapping diferit (ex. „30 zile" vs „30 de zile").

## Ce s-a adăugat

- `raport-zilnic-istoric` → `## 2026-11-15` (etichete, triaj, joburi, 3 fixuri de șablon, cotă).
- `raport-calitate-verificare` → **regulile 16–18**:
  - 16. Tabelul de măsurători trebuie să se adune cu totalul lui (costurile build + verify se calculează explicit — contorul le scrie la ieșirea procesului).
  - 17. Acordul de plural și de gen se calculează („Cele 1 filtre … lovesc" ⇒ „Filtrul … nu lovește").
  - 18. Fereastra zilei se etichetează cu fusul orar real (EET din 25.10.2026).
- `raport-zilnic-pipeline` → pointer `## 2026-11-15`.
- `MEMORY.md` (strat HOT) → starea live (15.11): quota **147/200**, triaj **0 / 7 / 5 / 1 / 0**, max ID IQads **24017** (0 postări noi, ID neschimbat), starea filtrelor (6 din 7 ating etichetă de categorie), lecția de editare a memoriei (sondă scurtă + `replace_all` pentru duplicate).
- Summary-ul memoriei regenerat (4.065 B, 15 intrări).

## Ce NU s-a tăiat

Secțiunile `## 2026-10-24`, `## 2026-11-02`, `## 2026-11-03` (care conține `⚠️`),
leadurile din `## 2026-11-05` — textul lor live diferă de forma din arhivă (au fost
rescrise pe 11.11), deci editarea pe blocuri lungi eșuează. Nu s-a forțat prin tăiere
parțială: informația e oricum în repo (rapoarte + istoric git).

## Lecție de măsurat (15.11)

1. **Textul din view-ul tool-ului e fidel pentru blocurile neatinse** ⇒ pornește
   comprimarea de la view, nu din arhivă.
2. **Sondele de 1–2 linii reușesc** acolo unde blocurile lungi eșuează.
3. **`replace_all`** e calea pentru secțiunile duplicate.
4. Echipajul de ieri a lăsat în urmă **2 secțiuni duplicate** — de verificat la
   fiecare rotație: `grep '^## ' topic` și compara cu numărul de apariții.
