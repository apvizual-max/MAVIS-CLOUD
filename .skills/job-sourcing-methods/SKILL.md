---
name: job-sourcing-methods
description: Cum se gasesc joburi reale pe piata romaneasca. IQads si designproject.io se scrapeaza direct (masurat); restul se cauta cu interogare pe domeniu.
---

# Cum se găsesc joburi reale

## Constatarea care a schimbat metoda

Am încercat scraping direct pe platformele de joburi. Rezultat:

| Platformă | Ce s-a întâmplat | Stare |
|---|---|---|
| **IQads** | **merge** cu User-Agent de browser: `https://www.iqads.ro/p/adjob` → HTTP 200, ~73 KB | **măsurat 23.10 + confirmat 22.11.2026** |
| **designproject.io** | merge prin `web_fetch`; paginarea merge (10 carduri/pagină) | **măsurat 22.11.2026** |
| eJobs | 403 / răspuns gol | nu merge |
| BestJobs | 403 | nu merge |
| Jooble | 503 | nu merge |
| bestjobs.eu | `page load failed` | nu merge |

Motive: protecție anti-bot, liste randate client-side, rate limiting. **Nu merită încercat.**

> **Corectare 22.11.2026:** această tabelă spunea „IQads → 403". **E depășit** — IQads
> e reachabil din cloud cu UA de browser (scraper: `mavis-tools/scrape-iqads.js`).
> Nu rescrie sursele după memorie, ci după măsurătoare.

### Detaliu IQads (măsurat)

- Catalogul complet e pe **pagina 0** (~43 linkuri). **Paginarea NU merge**:
  `?page=2` și `?page=3` servesc exact pagina 0 (aceleași linkuri). Deci: ia
  catalogul de pe pagina 0, **nu itera pagini**.
- Headerul fiecărui anunț e mereu: „Anunț valabil pana la data de …", apoi
  „Companie:", „Specializare:", „Tip job:", „Nivel:".

### Detaliu designproject.io (măsurat 22.11.2026)

- Paginarea **merge**: 10 carduri pe pagină, pagina 2 adaugă slug-uri noi.
  Scraperul ia paginile **0, 2, 3** ca să acopere slug-urile noi.
- `employmentType` din JSON-LD zice `FULL_TIME` pentru 21 din 21 ⇒ **nu e de
  folosit**. Singura sură corectă e linia **„Job Type:"** din descriere
  (prezentă la 7 din 21).

## Ce funcționează: căutare cu interogare pe domeniu

Pentru platformele care **nu** se scrapează (eJobs, BestJobs, Jooble, bestjobs.eu):

```bash
web_search "site:iqads.ro \"art director\" 2026"
web_search "site:iqads.ro adjob \"creative director\" octombrie 2026"
```

Interogarea pe domeniu trece pe unde scraping-ul nu trece, **și întoarce textul complet
al anunțului** — nu doar linkul. Asta e exact ce are nevoie scoring-ul.

**Pentru IQads și designproject.io nu mai e nevoie de asta** — au scrapere
proprie, care aduc textul integral direct: `mavis-tools/scrape-iqads.js`,
`mavis-tools/scrape-designproject.js`. Interogarea pe domeniu rămâne metoda de
**căutare a noilor** (cum se vede un anunț nou), nu de colectare.

## Alternative confirmate

- `designproject.io` — merge prin `web_fetch`/scraper. **21 de anunțuri RO** (măsurat 22.11.2026), cu salariu, remote, visa sponsorship. Numărul oscilează zilnic — **măsoară-l, nu-l copia de aici**.
- `uiuxjobsboard.com`, `euremotejobs.com`, `Nomado24`, `DailyRemote` — design remote
- `Jobgether` — agregator; a dat Senior Product Designer RO la $70–80k

## Regexul practic

```bash
site:iqads.ro "art director" 2026
site:designproject.io romania design
site:iqads.ro "senior graphic" "2026-1"     # filtrează după lună
```

## Verificarea zilei de expirare

IQads pune **„Anunț valabil până la data de ..."** în text. **Întotdeauna verifică
data înainte să scrii ceva într-un raport.** Un anunț expirat e exact la fel de inutil
ca unul inexistent, dar pare nou.

## Ce faci cu ce găsești

1. Copiezi textul integral în `jd`
2. Îl treci prin `scoring.gs`
3. Ie într-una din 4 secțiuni
4. **Din secțiunea 1 ieși CV-ul** prin `cv-mutator.js`

Nu inventa anunțuri ca să ai de unde lucra. Dacă nu s-a găsit nimic proaspăt, spune
„nu s-a găsit nimic proaspăt azi" — e o informație, nu o eșec.

## Ce a funcționat exemplar

Am citit 6 anunțuri reale și am extras **limbajul pieței**, citat:

- **Saatchi:** „viteză în execuție, dar și atenție la detalii. Care dă și prompturi bune"
- **Bell Studio:** „researchul și ideile bune stau la baza oricărui proiect reușit, indiferent de unelte"
- **pastel:** „diferența dintre AI slop și AI care te ajută să fii mai eficient"
- **Line Agency:** „Nu ești doar un executant — ești omul care definește standardul", 7–10 ani

**Asta e poziționarea lui POPY, în cuvintele pieței, nu ale mele.** Se folosește ca
axiomă în CV-uri și scrisori.
