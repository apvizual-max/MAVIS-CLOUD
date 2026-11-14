# POST-TAIERE — rotatie zilnica 14.11.2026

Arhiva: `docs/arhiva/memorie/2026-11-14-rotatie-zilnica-14/` (snapshot înainte de tăiere).
Tăierea s-a făcut **după** ce arhiva a fost comitată și împinsă pe `main` (`fd2f7b2`).

## Ce s-a comprimat (topicul `raport-zilnic-istoric`)

| Secțiune | Acțiune | Câștig |
|---|---|---|
| `## 2026-10-24` — primul paragraf (măsurătoarea `validThrough`) | 4 rânduri → 1 rând | ~160 B |
| `## 2026-10-24` — paragraful YO AI Labs (lead) | 7 rânduri → 1 rând | ~340 B |
| `## 2026-11-11` — blocul „Triaj" (7 mesaje, detaliu individual) | 11 rânduri → 1 rând | ~390 B |

Total eliberat: **~890 B**, suficient pentru intrarea de azi.

## Ce s-a adăugat

- `raport-zilnic-istoric` → `## 2026-11-14` (etichete, triaj, joburi, cotă).
- `raport-calitate-verificare` → **regulile 14–15**:
  - 14. Boilerplate-ul de platformă se curăță înaintea verificării relevanței
    (alerta eJobs tipărește filtrele candidatului ⇒ fals pozitiv sistematic).
  - 15. Un trigger de tier poate veni dintr-un acronim străin de job („mcp" într-un
    anunț PPC) ⇒ se raportează ca scor umflat în §6.2, nu se ascunde.
- `raport-zilnic-pipeline` → pointer `## 2026-11-14` + s-a scos pointerul de arhivă
  învechit (2026-10-30).
- `MEMORY.md` (strat HOT) → max ID IQads **24017**, cotă **118/200**, triaj
  **0 / 3 / 5 / 1 / 0**, starea filtrelor (20 total, 7 cu `addLabelIds`, 6 ating
  etichetă de categorie), `Personal` nu mai există, plus lecția de ediție a
  memoriei (sondă scurtă înainte de bloc lung).
- Summary-ul memoriei regenerat (3.741 B).

## Ce NU s-a tăiat (rămâne în topicul live)

Secțiunile `## 2026-11-02`, `## 2026-11-03` (care conține `⚠️`), leadurile din
`## 2026-11-05` și `## 2026-10-31` — textul lor live diferă de forma din arhivă
(rewriting-uri din 11.11), deci editarea pe blocuri lungi a eșuat. Nu s-a forțat
prin tăiere parțială: informația e oricum în repo (rapoarte + istoric git).

## Lecție de măsurat (14.11)

`memory_topic_edit` acceptă **blocuri scurte** (1–2 rânduri) chiar când blocul
mare eșuează. wrapping-ul live e un **mix** între forma din arhiva de pe disc și
cea afișată de tool (ex. „30 zile" în arhivă vs. „30 de zile" în view). Strategia
care a mers: **sondă de 1 rând → apoi construiește blocul din linii probate**.
Emoji: arhiva are `⚠` (U+26A0, fără VS16), tool-ul afișează `⚠️` ⇒ tipărește
caracterul simplu.
