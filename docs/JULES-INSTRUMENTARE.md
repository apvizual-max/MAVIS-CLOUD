# Jules — documentație de instrumentare

Repo: **apvizual-max/MAVIS-CLOUD**. CLAUDE: acest document îl configurezi în Jules,
ca să știe ce are de făcut și cum.

---

## 1. Ce este deja conectat

Din capturile tale:

| Element | Stare |
|---|---|
| Repo `apvizual-max/Mavis` (acum `MAVIS-CLOUD`) | ✅ conectat |
| Suggestions BETA | ✅ pornit — arată deja sugestii reale |
| Knowledge → Memories | ⚠️ **gol** — trebuie umplut |
| Environment → Setup script | ⚠️ **gol** — trebuie completat |
| Network access | ✅ pornit |
| Environment variables | ⚠️ **gol** — necesare pentru Google API |
| Limita zilnică | 0/100 sesiune, 5 repo-uri max |

## 2. Sugestiile pe care Jules le-a găsit deja — și sunt **corecte**

Am citit lista din captura ta. Nu sunt false pozitive:

```
Blocking Async I/O in Loop          ← în kit.js, apelurile sequențiale în for
Sequential API Calls in Loop        ← același tip, în email-sort.js
Missing Escaping/Sanitization for Process Argument in cv-mutator.js
Missing Escaping/Sanitization for Process Argument in JSON.parse
Unused Import: WD_ALIGN_PARAGRAPH    ← în make-cv-docx.py
Add tests for buildHeader / buildSummary / cleanTitle / detectStress /
            classifyBusiness / buildLetter / pickLinks / hasWord / refresh
```

**Asta spune exact ce nu am făcut: nu există un singur test automat.**
Am verificat manual, cu `node --e` și cu randare în browser. Jules are dreptate
că nimic din aia nu e prins în CI, și de aceea workflow-ul meu a prins o
sintaxă stricată **după** ce o comitem, nu înainte.

**Concluzia: cea mai bună integrare nu e să-l atașez, ci să-l fac să prindă
ce eu uit.**

## 3. Ce configurezi în Environment → Setup script

Copiază asta în câmpul „echo do setup":

```bash
#!/usr/bin/env bash
set -euo pipefail

# 1. dependențe pentru rularea verificărilor
apt-get update -qq
apt-get install -y -qq python3 python3-pip nodejs npm git ripgrep >/dev/null 2>&1 || true

# 2. unelte de build
npm install -g @anthropic-ai/claude-code 2>/dev/null || true
pip3 install --quiet requests 2>/dev/null || true

# 3. pregătește mediul pentru verificări
cd /app 2>/dev/null || cd "$REPO_DIR" || true
node --version && python3 --version && git --version

echo "Mediu pregatit."
```

## 4. Ce configurezi în Environment → Environment variables

**NU pune secrete aici.** Cheile stau în managerul de secrete și nu ajung în repo.

| Cheie | De ce |
|---|---|
| `JULES_API_KEY` | pentru apeluri Jules din CI |
| `GITHUB_TOKEN` | pentru operații pe repo |
| `GOOGLE_OAUTH` | pentru Gmail/Drive — **doar dacă vrei ca Jules să aibă acces** |

## 5. Ce configurezi în Knowledge → Memories

Gol înseamnă că **nu știe nimic despre proiect**, deși vede codul. Adaugă:

```
Mavis Cloud lucrează pentru Alexandru Popescu (POPY), designer și art director,
București. Repo-ul conține: motor de CV (cv-mutator.js, letter-engine.js),
scoring de joburi (scoring.gs), site de CV construit din date JSON (SITE/),
instrumente Google (mavis-tools/), 29 de skill-uri.

Reguli care NU se încalcă niciodată:
- niciodată ștergere definitivă, doar Trash
- niciodată trimitere în numele lui POPY
- niciun număr fără numărare reală (resultSizeEstimate din Gmail e plafonat)
- niciun nume de client care nu vine din materialul lui
- șabloanele sunt generice, niciodată cu nume de firmă concretă
- se lucrează pe main, fără ramuri, dacă POPY nu cere altfel
```

## 6. Live Review de la GitHub

**Funcționează deja** — hexmos.com, plan free 30%.

Singura condiție: **rulează pe pull request, nu pe push direct.**
În captura ta scrie „No review pipeline data yet" — pentru că încă nu a existat PR.

Ca să-l vezi prima dată:
```bash
git checkout -b o-verificare
# o schimbare mică
git commit -m "..."
git push -u origin o-verificare
gh pr create --base main --head o-verificare --title "Verificare" --body "..."
```

## 7. Ce cer de la Jules, formulat ca task

```
Creează teste pentru ALEX-KIT/cv-mutator.js și ALEX-KIT/letter-engine.js.
Funcțiile de acoperit: buildHeader, buildSummary, cleanTitle, detectStress,
buildExpertise, buildAchievements, buildLetter, pickLinks, hasWord, refresh.

Criterii de acceptare:
- testele rulează cu `node --test` sau un runner similar
- acoperă cel puțin: titlu determinist prin FAMILY_TITLE, hasWord cu limite
  de cuvânt (ai nu trebuie să se potrivească în 'said'), placeholder [ROLE],
  prăjina unică a fiecărei specializări
- niciun test nu depinde de rețea
- rulează în workflow, nu doar local

Restricții:
- nu rescrie motorul, doar adaugă teste
- nu introduce dependințe noi
```

## 8. Ordinea corectă a integrării

| Pas | Ce | Cine |
|---|---|---|
| 1 | Setup script în Environment | POPY, 5 minute |
| 2 | Memoriile în Knowledge | POPY, 3 minute |
| 3 | Primul pull request → vezi Live Review + Jules | POPY sau Mavis Cloud |
| 4 | Cererea de teste de la Jules | Jules |
| 5 | Workflow cu teste | Mavis Cloud |

**Nu se începe cu API-ul.** Se începe cu Environment + Knowledge, pentru că
acolo Jules chiar nu știe nimic. API-ul vine după, ca să automatizezi ce manual făcut.

## 9. Ce am nevoie înapoi de la tine

**Nimic urgent.** cheia Jules e deja la mine, în managerul de secrete.
Doar când ai făcut pasul 1 și 2, spune-mi, și eu verific dacă Jules prinde
sugestiile — prin API sau citind ce a scris în repo.