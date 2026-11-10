# MANIFEST — arhivă pre-tăiere memorie 2026-11-10

**Data:** 2026-11-10
**Motivul arhivării:** rotația zilnică a topicurilor de raport (regula: *optimizarea
fără arhivare = eroare*). Fluxul respectat: SNAPSHOT → MANIFEST → COMMIT → PUSH → taie.

## Ce se taie azi

### 1. `raport-zilnic-pipeline` — secțiunea zilnică `## 2026-11-09`

Fișier: `raport-zilnic-pipeline-09.11.md` (copie **exactă** a secțiunii care e
înlocuită azi cu secțiunea `## 2026-11-10`).

Conținutul ei e deja reflectat și în:
- commit `b344d75` (mesajul de commit descrie cele 3 reguli de triage);
- raportul `RAPORT-ZILNIC-202611-09.md` din repo (secțiunea 5: „Ce n-a mers, măsurat").

### 2. `raport-zilnic-istoric` — **copie duplicată** a secțiunii `## 2026-11-03`

Topicul conținea secțiunea `## 2026-11-03` **de două ori**, cu o singură diferență
(`38M vizualări/lună` vs `38M vizualizări/lună`). Se elimină **copia**; rămâne
secțiunea unică, cu ortografia corectă. **Zero informație se pierde** — de aceea
nu e necesară o arhivă separată pentru ea, dar e înregistrată aici.

## Unde trăiește restul conținutului

| Conținut | Locație |
|---|---|
| Topicul `raport-zilnic-pipeline` întreg, la 08.11 | `docs/arhiva/memorie/2026-11-08-snapshots-automat/topics/raport-zilnic-pipeline.md` |
| Topicul `raport-zilnic-istoric` întreg, la 08.11 | `docs/arhiva/memorie/2026-11-08-snapshots-automat/topics/raport-zilnic-istoric.md` |
| Secțiunile zilnice 21.10 – 05.11 | același folder, `raport-zilnic-istoric.md` |
| Stratul HOT (MEMORY.md), la 08.11 | `docs/arhiva/memorie/2026-11-08-snapshots-automat/MEMORY.md` |

## Procedura următoare (dacă se repetă)

1. Copiază secțiunea zilnică precedentă în `docs/arhiva/memorie/<DATA>-rotatie-topics/`.
2. Scrie MANIFEST-ul + sha256.
3. COMMIT + **PUSH** — fără push, nu tai nimic.
4. Abia apoi rotește topicul.

## Notă de întreținere

Topicul `raport-zilnic-istoric` a ajuns la **30.703 B** din limita de 30.720 B, deci
era la 17 B de spațiu liber. Cuplica de 11.03 consuma ~2,5 B fără să aducă informație.
**Verificări de integritate:** după fiecare rotaie, caută secțiuni cu același titlu
(`## 2026-11-XX`) — o apariție duplicată e întotdeauna o eroare de rotație.
