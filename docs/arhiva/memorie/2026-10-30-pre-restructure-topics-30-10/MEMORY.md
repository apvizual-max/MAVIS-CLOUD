### Platforma Mavis Cloud — reguli de platformă
- **Cronurile Cloud și Local sunt în locuri diferite** și nu se văd reciproc: Cloud se vede doar pe platforma online, Local doar în interfața Local. La „ai programat ceva?" răspunde întotdeauna cu **unde** („e în cloud, se vede online" vs. „nu e programat deloc"). Nu amesteca niciodată cele două.
- **NotebookLM** (măsurat 2026-10-12): API oficial = doar Enterprise; cookie-ul de sesiune al lui Alex e valid pe mașina lui, dar Google îl respinge venit de la IP de datacenter ⇒ sinteza se face de pe Local, rezultatul în repo, Cloud doar citește. Rezultat cunoscut — nu îl remăsura.
- **Nume de variabile: verifică ce există.** `GOOGLE_EMAIL` = `apvizual@gmail.com` (login-ul LinkedIn e cu adresa Gmail, cheia `LINKEDIN_PASSWORD`); `LINKEDIN_EMAIL` nu există. Nu inventa nume ca să sune bine.

### Reguli de comportament cu POPY (skill: `alex-collaboration-protocol`)
- **Răspunsul are lungimea răspunsului.** 2 rânduri cerute → 2 rânduri. Fără titluri `#`, tabele, liste numerotate, blocuri de livrare care nu-l interesează, secțiune de auto-laudă („ce am construit ca să nu se mai întâmple") și fără anunț de final („discuția asta se încheie aici", „stau aici"). La „dă-mi ce pun în env" → chei + 1 command + ce e blocat; restul în repo, nu în chat.
- **Execută exact ce e cerut.** Cerut 2 fișiere → atingi 2. Nu curăți „deodată" documentele lui, nu face revert când nu s-a cerut.
- **Nu inventa conținut.** Zero mesaje, subiecte, numere, orașe sau leaduri inventate. Dacă n-ai măsurat → spune „nu am măsurat" și lasă secțiunea goală. Regula „nu șterg definitiv" e a lui, pentru vault — **nu** pentru fișierele mele de lucru făcute din greșeală: acelea se șterg imediat, fără ritual, fiind recreabile.
- **Măsurător, nu presupunut.** Limită de produs, API sau acces se verifică pe web/pagină, nu din memorie. „Nu am găsit" ≠ „nu există"; un search cu `partial: true` sau o eroare de discovery NU dovedesc că un App lipsește. Nu spune „e imposibil" — e posibil, pe altă cale (Local, alt tool, altă platformă). Nu pune întrebări oferite de tine însuți (ex. „cine are notebook-urile") — au fost premisă falsă.
- **Nu transcrie manual output de tool.** Copiază din output sau generează programatic; altfel typos genereză `invalid_scope` / `invalid_client`.

### Arhivezi ÎNAINTE să tai din memorie (regulă POPY, 2026-10-24)

- **Optimizarea memoriei fără arhivarea a ce ai tăiat e EROARE, nu optimizare.** Cât timp versiunea precedentă e în repo, e optimizare; altfel e trunchiere și pierdere de context.
- **Flux obligatoriu:** SNAPSHOT → MANIFEST → COMMIT → **PUSH** → abia apoi tai din memorie → COMMIT → PUSH. Dacă push-ul arhivei pică, **nu tai nimic**.
- **Un topic șters se arhivează înainte** de `memory_topic_delete`. Un topic nu se șterge fără ca informația lui să fie depusă undeva.
- **Unde:** `docs/arhiva/memorie/<DATA>-<etichetă>/` în repo `apvizual-max/MAVIS-CLOUD` (MEMORY.md + topics/ + MANIFEST.md cu sha256). Script: `mavis-tools/memory-snapshot.js` (`--from` / `--stdin` / `--verify` / `--list`). Procedură: `docs/PROCEDURA-OPTIMIZARE-MEMORIE.md`. Regula e și în `AGENTS.md` (Regula 4).
- **Task cloud:** snapshot săptămânal, duminica 23:00 (task `455764418027683`) — doar arhivează, **nu taie**. Se vede pe platforma online, nu în interfața Local.
- **Secretele se elimină din memorie ÎNAINTE de arhivare** — repo-ul e public, arhiva nu poate conține chei.

### Sourcing joburi (skill: `job-sourcing-methods`, topic `scoring-gs-buguri-masurate`)
- **IQads:** scraping merge **doar cu User-Agent de browser** (fără UA → 403), dar depinde de egress — când handshake-ul TLS se rupe, `web_fetch` timeout-uiește (15s). Nu te baza pe „curl merge" ca fapt permanent; testează hostul înainte. Calea de azi: `web_search` pe domeniu pentru IQads, `web_fetch` pentru designproject.io.
- **Indexul motorului de căutare ține anunțuri expirate.** Căutarea = descoperire; validarea (data expirării, orașul) se face în HTML-ul paginii anunțului, înainte de intrarea într-un raport. Nu inventa orașul lipsă — IQads nu îl publică pe majoritatea anunțurilor.

### Reguli de raport (detalii în topic `raport-zilnic-pipeline`)
- **Nu inventa mesaje, subiecte, numere de joburi sau orașe.** Locațiile necunoscute stau în grup separat („verdict amânat"), nu sunt inventate ca „București" și nici aruncate fals ca „on-site în afara Bucureștiului".
- **Git merge (corectat 2026-10-21):** cauza era TLS (`git` nu folosește `SSL_CERT_FILE`, dar `curl` da) + repo privat (cere auth). Cu `GIT_ASKPASS` + `http.sslVerify false` merge, iar tokenul nu ajunge în log. Folosește `git`, nu doar API-ul REST.
- `designproject.io ?page=1` a servit pagina 0 la 3 încercări, inclusiv cu cache-buster — nu te bazezi pe paginare fără verificare.

### Google: conectat din cloud (OAuth propriu) → topic `google-cloud-access`
Merge: Gmail, Drive, Calendar, Sheets, Slides. Nu merge din cloud: Photos, `*.mcp.googleapis.com`, Docs API (citești prin `drive/v3/files/{id}/export`), Maps (cere API key + billing).

**Fiecare API are propriul host** (`docs.googleapis.com`, `sheets.googleapis.com`, `slides.googleapis.com`) — `www.googleapis.com/docs/v1/...` → 404 fals. Test permanent: `mavis-tools/test-endpoints.js` (401=endpoint există, 404=URL greșit, 0=rețea).

`web_fetch` merge mai bine pe paginile /docs decât pe paginile de listare — verifică întâi /docs, apoi marketplace.

### Platforma maschează secretele din secret manager în chat
O cheie intrată în secret manager e mascată în output ca `{{ARCHON_SECRET:...}}` — **inclusiv în interiorul unor URL-uri**. Un link scris cu mâna poate arăta perfect pentru mine și să fie stricat la Alex (`invalid_client`).
**Regulă:** credentialele nu trec prin chat și nici prin URL-uri scrise cu mâna. Generează-le pe mașina lui dintr-un script standalone care citește valorile din fișier (`mavis-tools/google-local.js` — flux OAuth complet, zero dependențe, se descarcă direct de pe raw.githubusercontent), nu din secret manager. Skill: `mavis-secure-delivery`.

**Valori de secret:** nu le ține în memorie și nu le scrie în repo-uri publice — doar prefix + referință. Clientul care merge e perechea din `~/.google-mcp/tokens/apvizual.json` (client_id public `1068987308935-5b7h17gt1c5hc4i1m6eginads37o3m2h`); celălalt e dintr-un proiect Google gestionat automat (familia `gen-lang-client-*`, Gemini CLI) — nu are consent pentru Drive/Gmail.

**Toolul `secret` (create/update) e BROKEN:** orice format de flaguri → `--name=<NAME> is required` (testat: `--name=X`, `--name X`, JSON, cu prefix `secret`). `list` merge. Workaround: valori inline ca env vars; persistența o face Alex din UI.

### Egress, TLS și conectoare (skill: `sandbox-gotchas`)
- **Egressul din cloud nu e blocat, e TLS.** Sandboxul prezintă un CA invalid ⇒ `curl` → 000, `git` → „server certificate verification failed", node `fetch` → AbortError, `mcode-tools` → CERT_HAS_EXPIRED. **Soluție:** `export NODE_TLS_REJECT_UNAUTHORIZED=0` (node), `curl -k` (shell), `git config http.sslVerify false` (persistă în repo).

- **Catalogul de conectoare al platformei (116 tooluri, 5 provideri) nu conține Google** — de aceea s-a crezut că Google e inaccesibil. Un `invalid signature` înseamnă „catalogul nu e accesibil azi", nu „nu ai Gmail".
- **Nu mai spune „nu am acces la Google" din cloud** — verifică întâi cu TLS-ul rezolvat; preflight dă verdict pe un rând.

> Filtrele MAVIS/* (defect `addLabelIds`, scope lipsă, reparația) → topicul `gmail-sorting-filters`.

### Utilitare repo (`mavis-tools/`)
- **Drive upload (`kit.js`):** `uploadType=multipart` **ignoră metadata** dacă trimiți JSON (`JSON.stringify` + `application/json`) — fișierul ajunge „Untitled", fără părinte. Corpul trebuie `multipart/related` real (boundary + 2 părți); pentru actualizare în place, `drive.replaceContent(id, content, mime)`.
- **Port `scoring.gs`:** `mavis-tools/score-port.js` citește `ALEX-KIT/scoring.gs`, aplică inserări pe anchor-uri EXACTE (refuză să ruleze dacă anchor-ul lipsește) și evaluează cu `new Function`. `loadEngine({fixAi:true})` dă varianta cu bug-ul `'ai'` reparat, pentru comparație. Detalii: topic `scoring-gs-buguri-masurate`.

### Pipeline-ul de raport zilnic (topic `raport-zilnic-pipeline`)
Ordinea: `scrape-iqads.js` → `scrape-designproject.js` → `report-mail-count.js` → `report-inbox-counts.js` → `report-simulate-sort.js` → `report-score.js` → `report-build.js <DATA> <FOLDER_ID>`. Destinație Drive `Alex Work/00-INTRARE` (`1sAs2ktJhGanKeGv87LIxkTD34S7P5XvT`) — raportul se **actualizează in place**, nu se creează duplicat.

Reguli: nu șterge, nu trimite, nu modifică Gmail; orice acțiune e anulabilă; cota de 200 cereri Google se raportează explicit, cu defalcare pe etape. `.api-usage.json` ține contul.

**Șablonul e complet data-driven** — nicio cifră sau narativă scrisă cu mâna în cod (altfel mâine se repostează cifrele de azi). `report-build.js --dry` scrie local, fără să atingă Drive.

### Stare live a raportului zilnic (topic `raport-zilnic-pipeline`)
- **Sortarea Gmail MAVIS/* e oprită de ~12 zile** (ultima etichetare: 2026-10-11): filtrele din Gmail arhivează, dar nu etichetează, iar scriptul local care eticheta nu mai rulează. Repararea cere re-consimțământ cu scope `gmail.settings.basic` (`filters PATCH` → 403 insufficient scopes); script gata: `mavis-tools/fix-mavis-filters.js`. → topic `gmail-sorting-filters`
- **0 postări noi** la ultimele două rulări (max ID IQads 23997 neschimbat; cel mai recent designproject.io = 2026-10-06) — nu e blocaj de scraping, e realitate de piață.
- **Quota Google: 200 cereri/rulare** (ieri 566, azi exact 200). Reduceri care contează: `messages.list` e deja ordonat descrescător ⇒ 25 metadata/etichetă → 4; `report-inbox.js` (105 cereri) e ignorat de toată lumea.
- **Triage:** `report-triage.js` clasifică mesajele din date în `needs-reply` / `needs-action` / `job-alert-other` / `fyi` / `noise`; ordinea regulilor contează (newsletter se verifică **înainte** de semnalul de „răspuns"). Ultima rulare: 1 needs-reply, 2 needs-action, 116 noise (Jules + GitHub Actions pe repo-uri proprii).
- **Lead nou, verificat pe pagină:** YO AI Labs → **121 roluri de design remote, contract, 5 platforme** (rate-uri până la $150/h la Ethos AI; interviu AI + assessment). Batează direct cu Traseul 2 (bani din proiecte + produse / freelance + AI).
- **Regulă:** când o valoare „derivată" se dovedește constantă față de alta, e o relație reală, nu gunoi — și merită folosită. `validThrough` = `datePosted` + 30 zile (măsurat pe toate cele 26) ⇒ 7 din 36 joburi erau expirate, nemarcate. (Detalii: `scoring-gs-buguri-masurate` §11.)

### Verificare de lead-uri: snippet vs. corp complet (regulă permanentă) (2026-10-26)

**Snippet-ul de text al unui email e trunchiat la ~200 de caractere și conține doar antetul.**
Ieri (25.10) am raportat că anunțul AGRESIV MEDIA „nu publică orașul, tipul de contract sau
salariul" — **era fals**: corpurile complete ale emailurilor de job de la Bestjobs conțin
lista integrală cu companie, oraș și salariu.

**Regulă:** la un email de alertă de job, citește corpul complet (`format=full` + decode
base64 din `payload.parts[].body.data`, mimeType=text/plain), nu snippet-ul. Costă 1 cerere
Google per email. **Snippet = descoperire, corp = adevăr.**

### bestjobs.ro nu se poate verifica automat (2026-10-26)

`web_fetch` → „file load failed" pe toate URL-urile. `curl` cu User-Agent de browser →
**403**. Singura cale: snippet-ul motorului de căutare (conține textul integral al anunțului),
sau o sursă alternativă (jobgether, remowork, aiannotationjobs, bebee, bdlemntech.ro,
jobs.concentrix.com, jobs.micro1.ai). **Dacă nu poți verifica, spune-o în raport** — nu
lăsa tăcerea să pară confirmare.

### Push în GitHub fără `gh` CLI (2026-10-26)

`gh` **nu e instalat** în sandbox, iar credential helper-ul nu e configurat. `GITHUB_TOKEN`
e în env. Funcționează:

```sh
cat > /tmp/askpass.sh <<'EOF'
#!/bin/sh
case "$1" in
  *Username*) echo "x-access-token" ;;
  *Password*) printf '%s' "$GITHUB_TOKEN" ;;
  *) echo "" ;;
esac
EOF
chmod +x /tmp/askpass.sh
GIT_ASKPASS=/tmp/askpass.sh GIT_TERMINAL_PROMPT=0 git push origin main
rm -f /tmp/askpass.sh   # OBLIGATORIU: e un credential pe disc
```

`git config http.sslVerify false` e necesar în sandbox (CA invalid). Username = `x-access-token`.
**Șterge scriptul după push.**

### micro1 = YO AI Labs — aceeași platformă, joburi diferite (2026-10-26)

micro1 (aka YO AI Labs) angajează UX/UI Designeri ca **contractori** pentru antrenarea modelelor
AI pe task-uri de adnotare video (brațe robotice): **$50–90/oră**, remote, eligibil din Europa,
3.000 openings, fără experiență anterioară în AI. Joblistat pe Bestjobs la „3000".
Aceleași joburi apar ca `Xperteez Technology` pe designproject.io. **Nu confunda platforma cu
jobul** — sunt roluri distincte.

### Puntea Local ↔ Cloud: Drive = canal primar, GitHub = secundar (2026-10-27)

Procedura decisă de Popy, măsurată. La **start de sesiune** citesc
`BRIDGE-DRIVE/TASKURI-PENTRU-CLOUD.md` din **Google Drive** (puntea principală),
apoi `QUEUE/TASKS-FOR-CLOUD.md` din GitHub (canal secundar, același TASK_ID).
La fiecare job automat verific ambele. Rezultatul se scrie în
`BRIDGE-DRIVE/INTRARI-CLOUD/` ca **fișier nou** `RASPUNS-MAVIS-CLOUD-<data>-<ora>-<slug>.md`
**și** în `QUEUE/DONE/<id>.md` — ambele, la aceeași publicare.

- **Local** arhivează (mută secțiunea consumată în `ISTORIC/`); **eu** marchez
  `[x]` și scriu rezultatul în `QUEUE/DONE/`. **Arhivare + marcaj, nu amputare** —
  poarta cere ca fiecare TASK_ID să apară pe ambele canale.
- **Lag de propagare ≈ 80 min** pe Drive ⇒ cerințele urgente merg pe GitHub.
- cloud_id-uri: rădăcina `1V87h9Pbw52chSVNkxQ_NNuMh-CLfZeuI`, `BRIDGE-DRIVE/`
  `1bUMihY3SSORW3c6H7vF4uSIzIlqTNUfD`, `INTRARI-CLOUD/`
  `1nvbzLAiZ5pmpGsMBQ1ug-tZcR9P0_UYU`, `ISTORIC/` `17MEolk1ZFH1iLNxg3UVfwQIDO6r7bPA2`.
- Detalii complete: topicul `puntea-local-cloud`.

### „Nu am acces" ≠ „nu există" — verifică pe toate canalele (2026-10-27)

Am afirmat că `BRIDGE-DRIVE/TASKURI-PENTRU-CLOUD.md` există „doar în Drive".
**Fals**: există și în `MAVIS-OPTIMUS-CI` @ `main` (5.854 B, dimensiune
identică). Local m-a corectat, corect.

**Regulă:** înainte să afirmi că un fișier nu există undeva, verifică pe
TOATE canalele. „Nu am acces" înseamnă „nu am acces", nu „nu există".

### Etichetele Gmail se pot rearanja — nu hardcoda numele lor (2026-10-27)

Peste noapte, etichetele lui Alex au fost rearanjate: din 8 etichete `MAVIS/*`,
doar `MAVIS/Joburi` și-a păstrat prefixul; celelalte 7 au primit alte nume și
hierarhii (`AI Folder/AI si Comunitati`, `Socials`, `Newsletter`, `Finante`,
`Personal`, `De raspuns`, `Facturi si Conturi`) + o categorie nouă `Optimus CD`.

Raportele mele zilnice ar fi raportat **7 din 8 etichete dispărute, fără semn**.

**Reparația făcută la sursă:** `mavis-tools/taxonomy.js` e singura sursă pentru
numele etichetelor; fiecare script le rezolvă **live, la runtime**. Rearanjarea
viitoare se repară schimbând **un loc**.

**Regulă generală:** orice nume de etichetă, folder, coloană sau tabel scris în
cod e o bombă cu ceas. Rezolvă-l la runtime și raportează explicit dacă nu se
rezolvă (zero mascat e mai periculos decât eroare).
