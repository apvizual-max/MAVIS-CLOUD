---
name: sandbox-gotchas
description: Capcane ale mediului cloud care te opresc din drum fara sa iti spuna clar de ce. Toate au fost rezolvate.
---

# Capcanele mediului cloud

Toate au fost întâlnite efectiv. Fiecare a costat timp până am înțeles-o.

## 1. `gh` dispare între sesiuni

Am instalat `gh` în `/usr/local/bin`. La sesiunea următoare: `command not found`.

**Fix:** binarul stă în `mavis-tools/bin/gh`, în repo. Îl cheami cu calea plină.

```bash
GH=/workspace/Mavis/mavis-tools/bin/gh
```

## 2. Recursie infinită în credential helper

```bash
# GREȘIT — funcția se numește gh și în interior apelează gh
git config --global credential.helper '!gh() { echo username=x-access-token; echo password=$(gh auth token); }; gh'

# CORECT — alt nume + cale plină
git config --global credential.helper '!f() { echo username=x-access-token; echo password=$(/workspace/Mavis/mavis-tools/bin/gh auth token); }; f'
```

Semnul: `Maximum function recursion depth (1000) reached`, apoi `HTTP 431`.
431 înseamnă **credentialele sunt gunoi**, nu că serverul e ocupat.

## 3. Certificat SSL pentru git

```
server certificate verification failed. CAfile: /etc/ssl/certs/ca-certificates.crt
```

`openssl s_client` spune `Verify return code: 0` și `curl` merge. Deci **certificatul
e valid** — sandboxul are un proxy pe care curl îl onorează, git nu.

```bash
git config --global http.sslCAInfo /etc/ssl/certs/ca-certificates.crt
git config --global http.sslVerify false
```

## 4. Fișierele din Drive vin în `.raw`, nu în `.data`

```js
const d = await k.req('GET', 'https://www.googleapis.com/drive/v3/files/' + id + '?alt=media');
// JSON.parse picască pe conținut markdown → obiectul e { raw: continut }
const text = String(d.raw || d.data || '');
```

Am pierdut ore căutând `.data` și fiind convins că **nu am acces la Drive**. Aveam.

## 5. `resultSizeEstimate` din Gmail nu e numărătoare

Întoarce aceeași valoare (ex. `201`) pentru interogări de 6 și de 30.000 de mailuri.
**Numără prin paginare.** Vezi skill-ul `gmail-exact-counting`.

## 6. `pgrep` se potrivește cu propria ta comandă

```
$ pgrep -f email-sort.js   →  "rulează"   (nu rulează nimic)
```

Comanda ta conține șirul căutat, deci `pgrep` se potrivește cu ea însăși.
Verifică altfel:

```bash
date -r fisier.log '+%H:%M:%S'   # ultima modificare
```

Un log nemodificat de 9 ore înseamnă că procesul a murit, indiferent ce zice `pgrep`.

## 7. `nohup ... &` într-un tool cu timeout

Procesul moare când comanda expiră. Folosește parametrul de fundal al tool-ului,
nu `nohup` manual.

## 8. Copierea unui director cu `node_modules`

Un `cp -r` a transformat workspace-ul în 209 MB. `node_modules` se exclude, apoi
`.gitignore` acoperă `mavis-tools/bin/`.

## 9. Contul GitHub e pe plan FREE

`gh api /users/apvizual-max/copilot` → `Not Found`. **Copilot și Jules nu sunt
accesibile prin API pe plan free.** Nu se configurează automat. Se activează din
interfața web, manual, de POPY.

## Ordinea de verificare la ceva ce "nu merge"

1. Fișierul există? `ls`
2. E la locul așteptat? `find`
3. Ce spune procesul? `date -r x.log`
4. E o limitare reală sau o greșeală de instrument?
5. **Abia după astea** spune „nu se poate"
