# Panoul Mavis Optimus Control Center — sursa

Panoul e **site-ul 1**. Adresa lui: `https://4nsxl2or95u1a.space.minimax.io`

## Ce e

Un site static, generat din repo. Nu are backend: de aceea tab-ul „Prompt ·
Acțiuni" pune cerințele în coadă și îți dă prompt-ul de trimis.

Tab-uri: Pano · Site CV · Punte · Jules/Git/GitHub · Prompt · TO DO.

## Cum se construiește

```bash
python3 SITE/build-hub.py        # scrie SITE/dist/index.html
```

Din repo. `build-hub.py` citește `docs/`, `docs/TODO.json`,
`docs/LOG-SISTEM.json`, `.skills/`, `vendor/`, `ALEX-KIT/SABLOANE/` și
măsoară repo-urile de pe disc. Fiecare rulare re-scrie panoul.

## Tab-ul „Site CV" — contractul

Panoul **nu conține copii** ale paginilor CV. Conține doar legături.

- Lista de site-uri CV vine din `SITE/date/cv-sites.json`.
- La fiecare încărcare a paginii, panoul **citește registrul de pe server**
  (`registryUrl` → `cv-sites.json` de pe site-ul CV) cu `cache: 'no-store'`.
- Previzualizarea e un `iframe` către **site-ul sursă**, nu către o copie.
- Rezervă: dacă registrul de la sursă nu răspunde, se folosește ultima copie
  locală (doar titlu, rol și URL — niciun conținut de CV).

Deci: schimbi datele CV, redeployezi site-ul CV, și tab-ul din panou arată
noul imediat. **Nu trebuie să reconstruiești panoul** ca să-l vezi schimbat.

Testul care păzește regula: `SITE/test_split.py`.

## Fișiere din această sursă

| Fișier | Ce e |
|---|---|
| `build-hub.py` | generatorul panoului |
| `cv-sites.json` | registrul site-urilor CV (sursa pentru linkuri) |
| `doc.css` | stilul vizualizatorului de documente |
| `docs-viewer-index.html` | vizualizatorul de documente (`docs/?doc=...`) |
| `AGENTS.md-panou.md` | regulile repo-ului, copiate aici |

## Deploy

Panoul e deja public la adresa de mai sus. Deploy-ul face **update in place**
pe același nod — nu creează un site nou.
