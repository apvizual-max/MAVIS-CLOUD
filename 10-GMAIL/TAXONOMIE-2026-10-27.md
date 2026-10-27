# GMAIL — taxonomia măsurată la 2026-10-27

> Măsurată live din cloud la `2026-10-27 ~14:40 UTC`, cu paginare exactă.
> **Nu e estimare.** Fiecare număr vine din `labels/{id}` (API-ul oficial).

---

## 1. Ce s-a schimbat față de 12 iul

Între 12 iul și 27 octombrie, taxonomia Gmail a fost **rearanjată**:

| Etichetă veche (09 iul) | Etichetă nouă (27 oct) | Mesaje | Thread-uri |
|---|---|---|---|
| `MAVIS/Joburi` | **`MAVIS/Joburi`** (singura păstrată) | 8.125 | 7.945 |
| `MAVIS/Newsletter` | `Newsletter` | 4.558 | 4.005 |
| `MAVIS/Social` | `Socials` | 2.864 | 2.787 |
| `MAVIS/AI si comunitati` | `AI Folder/AI si Comunitati` | 2.499 | 2.303 |
| `MAVIS/De raspuns` | `De raspuns` | 1.750 | 1.291 |
| `MAVIS/Facturi si conturi` | `Facturi si Conturi` | 113 | 91 |
| `MAVIS/Personal` | `Personal` | 169 | 168 |
| `MAVIS/Finante` | `Finante` | 15 | 14 |

**Prefixul `MAVIS/` a căzut de pe 7 din 8 etichete.** Doar `MAVIS/Joburi` l-a
păstrat — probabil pentru că e eticheta de lucru principală.

**Hierarhii noi, care nu existau în iulie:**

```
WORK | AP-ID/                        ← businessul de design (apvizual.ro)
  ├─ WORK | AP-ID/THEMA - Siteuri AP              42 mesaje
  ├─ WORK | AP-ID/TRIPINGERS                       28
  ├─ WORK | AP-ID/ROTLD - Domenii                  28
  ├─ WORK | AP-ID/RESURSE si INSPIRATIE            20
  ├─ WORK | AP-ID/Dreams Time                       8
  ├─ WORK | AP-ID/Scoala foto - SFF - Dan Besliu    7
  ├─ WORK | AP-ID/PHOTOGRAPHY - Subscriptions and Material   5
  ├─ WORK | AP-ID/Claus Web - Gazduire ap-id.ro     3
  ├─ WORK | AP-ID/www.aptailor.com                  3
  └─ WORK | AP-ID/Finantare - Granturi              0

Knowledge/                           ← bibliotecă personală
  ├─ Knowledge/Pillai Center Brzee Godess            9
  ├─ Knowledge/Dr. Pillai                            8
  ├─ Knowledge/ISHA                                  4
  ├─ Knowledge/MANIFESTATION - 15 min                4
  ├─ Knowledge/Inner Engineering - Sadguru           2
  ├─ Knowledge/ARK Cristal                          2
  └─ Knowledge/Gaia                                  0

AI Folder/AI si Comunitati            2.499
Crypto | Trade | News/Token Metrics   0
Home | Car | Shopping/Electric Company  2
JOBS-Interview            18 · JOBS-Interview/Taste  25
Optimus CD                687
SCAMS                       0
```

**Total etichetat: 20.780 mesaje** (era 19.070 la 12 iul) — deci sortarea a
continuat, în plus față de rearanjare.

---

## 2. Filtrele server-side — toate intacte

**19 filtre, 0 sparte.** Am verificat fiecare: eticheta țintă există și încă
poartă numele nou.

| Filtre | Etichetă țintă | Status |
|---|---|---|
| joburi (`jooble bestjobs linkedin …`) | `MAVIS/Joburi` | ✅ |
| AI (`substack goatacademy …`) | `AI Folder/AI si Comunitati` | ✅ |
| social (`skool facebook instagram …`) | `Socials` | ✅ |
| newsletter (`noreply newsletter digest …`) | `Newsletter` | ✅ |
| crypto (`kraken tradingview binance …`) | `Finante` | ✅ |
| GitHub / Jules | `Optimus CD` | ✅ |
| 2 filtre AP-ID | `WORK \| AP-ID/THEMA - Siteuri AP`, `WORK \| AP-ID/www.aptailor.com` | ✅ |

**Cine a rearanjat a mutat etichetele ȘI filtrele împreună.** Nu s-a lăsat un
filtre batând spre o etichetă dispărută — care ar fi însemnat că mailul nou
nu mai ajunge nicăieri.

### Filtrele care pun în Trash — verificate, sunt strânse

| Filtre | Criteriu complet |
|---|---|
| YouTube | `from: noreply@youtube.com` |
| GraphicStock | `from: mail@graphicstockemail.com` |
| DigitalMarketer | `from: support@digitalmarketer.com` |
| Tinder | `from: mail@tinder.pc.dating` + are atașament + >1000 bytes |
| Barnes & Noble | `from: barnesandnoble@mail.barnesandnoble.com` + are atașament |

Niciunul nu prinde mailul de lucru. **Risc de pierdere de date: zero.**

### Etichete fără filtru automat

`De raspuns` (1.750) · `Personal` (169) · `Facturi si Conturi` (113) ·
`Newsletter` are filtru, dar `Personal`/`Facturi`/`De raspuns` nu. Sunt
etichete de **triaj manual**, nu de filtrare automată — la fel ca în iulie.
`De respuns` era deja documentat ca „etichetă fără regulă" în skill-ul
`gmail-label-correction`.

---

## 3. Taxonomia reflectă cele 5 trasee de venit

Asta e partea importantă. Etichetele noi **nu sunt o reorganizare cosmetică** —
ele codifică exact cele 2 trasee active decise pe 22 octombrie:

| Traseu | Etichete |
|---|---|
| **1. Locuri de muncă** | `MAVIS/Joburi` (8.125) · `JOBS-Interview` · `JOBS-Interview/Taste` |
| **2a. Freelance (design)** | `WORK \| AP-ID/*` · `Optimus CD` (687) · `De raspuns` (1.750) · `Facturi si Conturi` · `Finante` |
| **2b. AI** | `AI Folder/AI si Comunitati` (2.499) |
| **2c. Arhivă foto** | `WORK \| AP-ID/PHOTOGRAPHY…` · `WORK \| AP-ID/Scoala foto…` · `WORK \| AP-ID/Dreams Time` · `TRIPINGERS` |
| **2d. Crypto** | `Crypto \| Trade \| News` · `/Token Metrics` |
| **Personal** | `Personal` · `Home \| Car \| Shopping/*` · `Knowledge/*` |

**Concluzie operațională:** orice workflow Gmail pe care îl construim
(TO DO 03) trebuie să citească aceste etichete, nu vechile `MAVIS/*`.

---

## 4. Ce a dispărut din cont — de verificat cu POPY

| | 22 oct | 27 oct | Δ |
|---|---|---|---|
| mesaje în cont | 84.316 | **83.505** | **−811** |
| thread-uri | 78.522 | **77.701** | **−821** |
| în Trash | (necontorizat) | **626** | — |
| în Spam | (necontorizat) | 2 | — |

**811 mesaje au dispărut din cont** între 22 și 27 octombrie, în timp ce
mesajele *etichetate* au **crescut** cu ~1.000. Deci:

- **626 de mesaje sunt în Trash** → recuperabile.
- Restul de **~185 au fost șterse definitiv** (golirea Trash-ului).

**Măsurătorile anterioare nu au contorizat Trash**, deci nu pot separa
"sortare + golire" de "ștergere accidentală". **Întrebarea pentru POPY:** ai
golit Trash-ul între 22 și 27 octombrie? Dacă da — totul e în regulă. Dacă
**nu**, atunci ceva a șters mesaje din contul tău fără să știi, și asta
trebuie aflat.

*(Notă: 185 e o estimare — diferența dintre 811 și 626. Nu am contorizat
Trash-ul pe 22 oct, deci n-am o confirmare exactă.)*

---

## 5. Reguli pentru ce urmează

1. **Nicio etichetă nouă fără filtru**, sau fără o notă aici că e manuală.
2. **Când rearanjezi etichete, mută filtrele în aceeași zi.** Altfel, mailul
   nou dispare din sistem.
3. **Nu șterge definitiv.** Trash, cu motiv scris. (Ca în vault.)
4. **Nu număra în timp ce rulează altă operațiune Gmail** — cererile se
   ciocnesc, `threads.list` întoarce gol și raportează 0 cînd sunt mii.
5. **Măsoară cu paginare** — `resultSizeEstimate` e plafonat (a raportat 201
   pentru tot, inclusiv pentru `in:trash` care are 626).

---

*2026-10-27 · Mavis Cloud · măsurat live din cloud*
