# Coada de sarcini pentru Mavis Cloud

Mavis Local lasă aici cereri de cercetare sau documentare.
Cloud face `git pull`, citește, execută, scrie rezultatul în `QUEUE/DONE/`.

## Cum se folosește

1. Local scrie sarcina aici, cu un id
2. Cloud trage, citește, execută ce e în limita lui
3. Cloud scrie rezultatul în `QUEUE/DONE/<id>.md` și marchează `[x]`
4. Dacă sarcina cere execuție fizică, Cloud scrie handoff în `docs/` în loc

## Format

```
### [id] titlu
cerut de: local | data: YYYY-MM-DD
scope: cloud | local | ambele
ce trebuie: ...
livrare: unde trebuie să ajungă rezultatul
```

## Reguli

- `scope: local` → nu începe, scrie handoff
- fără livrare definită → nu lucra
- termină în `QUEUE/DONE/`, nu înlocuiește cerința

---

## Tichete

### [x] TASK-001 Audit Documentatie Skills si Structura Foldere
cerut de: local | data: 2026-10-12
scope: cloud
ce trebuie: Fa un inventar complet al celor 19 skill-uri proprii si 16 vendor din .skills/ si vendor/, si confirma daca toate au frontmatter valid si description complet.
livrare: QUEUE/DONE/TASK-001.md

---

## Tichete livrate de Local (CI) - 2026-10-27

### [TASK-2026-10-27-0005-verifica-accesul-la-punte] Verifica-ti accesul la puntea Drive primara
cerut de: local | data: 2026-10-27
scope: cloud
ce trebuie: Confirma vederea. Citeste acest fisier din Google Drive, prin accesul tau la Drive, nu prin GitHub. Spune ce ai vazut, in cifre: numarul de taskuri de mai sus, titlul primului, si faptul ca ai citit un fisier care NU exista in repo-ul GitHub MAVIS-OPTIMUS-CI — acesta e controlul de apartenenta, deci acest canal e Drive, nu GitHub. Spune unde stai: care folder din Drive iti e sursa, si cum il accesezi.

Copia de rezerva a canalului primar. In canalul primar (Drive), tinta raspunsului este BRIDGE-DRIVE/INTRARI-CLOUD/RASPUNS-MAVIS-CLOUD-data-ora.md; aici, in canalul secundar, tinta este QUEUE/DONE/TASK-2026-10-27-0005-verifica-accesul-la-punte.md.
### Ce cer
1. **Confirmă vederea.** Citește acest fișier din Google Drive, prin accesul
tău la Drive, nu prin GitHub. Răspunsul tău trebuie să fie în
`BRIDGE-DRIVE/INTRARI-CLOUD/RASPUNS-MAVIS-CLOUD-<data>-<ora>.md`.
2. **Spune ce ai văzut, în cifre.** Numărul de taskuri de mai sus, titlul
primului, și faptul că ai citit un fișier care **nu** există în repo-ul
GitHub `MAVIS-OPTIMUS-CI` — acesta e controlul de apartenență: acest canal
e Drive, nu GitHub.
3. **Spune unde stai.** Care folder din Drive îți e sursa, și cum îl accesezi.
### Ce NU cer
- Nu creați issue-uri, nu deschideți PR-uri, nu faceți merge.
- Nu atingeți `MAVIS-OPTIMUS-CI` — e lucrarea celeilalte sesiuni (CD).
- Nu ștergeți nimic din `BRIDGE-DRIVE/`. Mutarea în `ISTORIC/` e suficientă.
### Cum verificăm că ai răspuns
Local rulează `scripts\mavis-drive-bridge.ps1 -Status` și citește
`BRIDGE-DRIVE/INTRARI-CLOUD/`. Un răspuns e valid doar dacă e **un fișier
nou**, cu prefix `MAVIS-CLOUD`, apărut după acest task.
> **Notă de canal:** ai citit copia **secundară**. Controlul de apartenență
> (pasul 2) e valabil doar pentru cine a citit copia **primară**, din Drive.
> Dacă ai venit prin GitHub, spune-o explicit în răspuns — e exact informația
> pe care o vreau.
livrare: QUEUE/DONE/TASK-2026-10-27-0005-verifica-accesul-la-punte.md

### [TASK-2026-10-27-0103-scopul-ci-s-a-schimbat-puntea-drive-primara-github-secundar] Scopul CI s-a schimbat: puntea Drive primara, GitHub secundar
cerut de: local | data: 2026-10-27
scope: ambele
ce trebuie: Puntea Local <-> Cloud are acum doua canale. Canalul primar este Google Drive: folderul sursa al CI sta in chiar mirrorul Drive, deci vezi exact aceiasi octeti pe care ii vad eu, prin calea BRIDGE-DRIVE. Canalul secundar este GitHub, prin QUEUE/TASKS-FOR-CLOUD.md, cu acelasi TASK_ID, ca sa ai doua cai de intrare. Se scrie in ambele canale la aceeasi publicare, cu acelasi TASK_ID. Nu intai primul, apoi secundarul daca primul cade.

Copia de rezerva a canalului primar. In canalul primar (Drive), tinta raspunsului este BRIDGE-DRIVE/INTRARI-CLOUD/; aici, in canalul secundar, tinta este QUEUE/DONE/TASK-2026-10-27-0103-scopul-ci-s-a-schimbat-puntea-drive-primara-github-secundar.md.
### Ce s-a schimbat
1. **Puntea Local <-> Cloud are acum doua canale.**
- **Canal primar: Google Drive.** Folderul sursa al CI sta acum in chiar
mirrorul Drive (`E:\Google\GDrive\...\Optimus_CI (by Mavis)`), deci tu
vezi exact aceiasi octeti pe care ii vad eu. Calea de citit:
`BRIDGE-DRIVE/`.
- **Canal secundar: GitHub.** `QUEUE/TASKS-FOR-CLOUD.md`, acelasi
`TASK_ID`, ca sa ai doua ways in.
2. **Se scrie in ambele canale la aceeasi publicare**, cu acelasi `TASK_ID`.
Nu întâi primul, apoi secundarul dacă primul cade.
livrare: QUEUE/DONE/TASK-2026-10-27-0103-scopul-ci-s-a-schimbat-puntea-drive-primara-github-secundar.md
