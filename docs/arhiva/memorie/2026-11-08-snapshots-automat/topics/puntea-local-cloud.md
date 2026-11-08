# Puntea Local ↔ Cloud — două canale

Procedura decisă de Popy pe 2026-10-27, **măsurată**, nu presupusă.

## Cele două canale

| Canal | Unde | Cine scrie | Cine citește |
|---|---|---|---|
| **PRIMAR** | Google Drive: `BRIDGE-DRIVE/` în folderul `Optimus_CI (by Mavis)` | Local scrie taskurile, Cloud scrie răspunsurile | ambele |
| **SECUNDAR** | GitHub `apvizual-max/MAVIS-CLOUD`: `QUEUE/TASKS-FOR-CLOUD.md` | Local | Cloud |

Aceleași `TASK_ID` pe ambele. Cloud verifică **ambele** la start de sesiune și
la fiecare job; dacă transportul Drive e `DOWN`, canalul activ devine GitHub.

## cloud_id-uri măsurate

| Folder | cloud_id |
|---|---|
| `Optimus_CI (by Mavis)` (rădăcina punții) | `1V87h9Pbw52chSVNkxQ_NNuMh-CLfZeuI` |
| `BRIDGE-DRIVE/` | `1bUMihY3SSORW3c6H7vF4uSIzIlqTNUfD` |
| `BRIDGE-DRIVE/INTRARI-CLOUD/` | `1nvbzLAiZ5pmpGsMBQ1ug-tZcR9P0_UYU` |
| `BRIDGE-DRIVE/ISTORIC/` | `17MEolk1ZFH1iLNxg3UVfwQIDO6r7bPA2` |

## Calea în Drive

`My Drive > GDrive-Second_Brain_PKMS > 02_Areas > 02-2-AI-SOT > CASA > OPTIMUS - Prime > Optimus_CI (by Mavis)`

## Cine arhivează — regula reală

- **Local** mută secțiunea consumată în `BRIDGE-DRIVE/ISTORIC/` (conținut păstrat integral).
- **Cloud** marchează ce a consumat, în repo-ul lui: ticheta trece în `QUEUE/DONE/` și se marchează `[x]` în `QUEUE/TASKS-FOR-CLOUD.md`.

**Arhivare + marcaj, NU amputare.** Ticheta rămâne în coada secundară până când
Cloud-ul o marchează — pentru că poarta (`queue-contract-check.ps1`) cere ca
fiecare `TASK_ID` din coada secundară să apară și în canalul primar. Dacă o
ștergi, poarta stinge ticheta.

## Formatul tichetei în `QUEUE/TASKS-FOR-CLOUD.md`

```
### [id] titlu
cerut de: local | data: YYYY-MM-DD
scope: cloud | local | ambele
ce trebuie: ...
livrare: unde trebuie să ajungă rezultatul
```

Marcarea: `### [x] id` — secțiunea **rămâne** în fișier.

## Livrarea

- Canal primar: `BRIDGE-DRIVE/INTRARI-CLOUD/RASPUNS-MAVIS-CLOUD-<data>-<ora>-<slug>.md` — **fișier nou, niciodată suprascriere**.
- Canal secundar: `QUEUE/DONE/<id>.md` (repo-ul MAVIS-CLOUD).
- **Se scrie în ambele, la aceeași publicare, cu același `TASK_ID`.**

## Cele patru interdicții (din `README-BRIDGE-DRIVE.md`)

1. Nu suprascrii un fișier al celeilalte instanțe. **Niciodată.** Nici pentru o corecție de un cuvânt.
2. Corecția se face printr-un **fișier nou**, care îl citește pe celălalt.
3. Nu redenumești fișierele celeilalte instanțe.
4. Nu ștergi nimic din `BRIDGE-DRIVE/`. Mutarea în `ISTORIC/` e suficientă.

## Convenția de denumire

`MAVIS-LOCAL-*` / `MAVIS-CLOUD-*`. Un document fără prefix nu aparține nimănui.
Protocol: `docs/PROTOCOL-DENUMIRE-LOCAL-CLOUD.md`.

## Cifre măsurate

- **Lag de propagare ≈ 80 min** (scris local 22:11 → în Drive 23:31). ⇒ cerințele
  cu termen în minute **nu** se trimit pe Drive, ci pe GitHub.
- Rădăcina mirrorului: `Google\GDrive` → `E:\Google\GDrive`, `root_id=23`, `sync_type=MIRROR`, `connected = true`.

## Corectură de măsurătoare (2026-10-27)

Am afirmat într-un raport că `BRIDGE-DRIVE/TASKURI-PENTRU-CLOUD.md` „există
**doar în Drive**". **Fals ca afirmație generală** — există și în
`MAVIS-OPTIMUS-CI` @ `main` (5.854 B, dimensiune identică). Local are dreptate.

**Ce rămâne corect:** în repo-ul **MAVIS-CLOUD**, `BRIDGE-DRIVE/` nu există,
prin design — deci *acel* repo n-a putut fi citit prin GitHub.

**Regulă generală:** verifică existența unui fișier pe **toate** canalele înainte
 să afirmi că nu există undeva. „Nu am acces" ≠ „nu există".

## Ce NU se face

- ❌ Nu atingi `MAVIS-OPTIMUS-CI` (e lucrarea celeilalte sesiuni, CD). Poți doar
  să citești read-only prin API ca să verifici o afirmație.
- ❌ Nu deschizi issue-uri, nu deschizi PR-uri, nu faci merge în repo-ul de sistem.
- ❌ Nu ștergi nimic din `BRIDGE-DRIVE/`.

## Verificare

Local rulează `scripts\mavis-drive-bridge.ps1 -Status` și citește
`BRIDGE-DRIVE/INTRARI-CLOUD/`. Un răspuns e valid doar dacă e **fișier nou**,
cu prefix `MAVIS-CLOUD`, apărut după task.
