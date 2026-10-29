---
name: site-split-cv-sites
description: Contractul separarii site-urilor CV de panou. Panoul doar leaga, nu copiaza. Registry viu, previzualizare legata.
---

# Site-uri CV separate de panou

## Problema pe care o rezolvă

Panoul și site-urile CV erau **un singur deployment**: panoul includea pagina
CV ca `iframe`, iar pagina CV era un fișier în panou. Două consecințe:

1. **Copia jura.** Cine edita sursa CV și uită să rebuildeze panoul vedea două
   realități: panoul arăta versiunea veche, site-ul versiunea nouă.
2. **Un URL pentru tot.** Nu puteai da un rol propriu, ca să-l primească cineva
   separat, și nu puteai construi site-uri noi fără să creeze noduri noi.

## Contractul

1. **Un rol = un site.** `SITE/build.py <rol>` scrie în
   `SITE/dist-cv/<rol>/index.html` — index la rădăcină, site autonom.
2. **Panoul nu are copii.** `SITE/build-hub.py` nu scrie și nu include pagini
   CV. `SITE/dist/` conține doar panoul. Copiile vechi `*.index.html` sunt
   curățate la build (`curata_dist()`).
3. **Legături, nu conținut.** Tab-ul „Site CV" afișează carduri cu URL-ul
   fiecărui site.
4. **Previzualizare legată.** `iframe` către URL-ul **site-ului surs**, nu
   către o pagină locală. Se actualizează singur, la fiecare încărcare.
5. **Registry viu.** `SITE/date/cv-sites.json` e sursa unică. Panoul îl
   citește de la `registryUrl` (de pe server) la fiecare încărcare, cu
   `cache: 'no-store'`. Rezervă: ultima copie locală — doar titlu, rol, URL.
   **Niciodată** conținut de CV copiat în panou.
6. **Testul care ține contractul.** `SITE/test_split.py` pică dacă o copie
   se întoarce în panou. Rulează în CI (`verify.yml`).

## De ce registry, și nu un URL scris tare

URL-ul site-ului e dat de platformă la creare (`node_id` → domeniu
`*.space.minimax.io`). **Nu poate fi scris în cod înainte de deploy.** De
aceea registrul există:

- rol nou → JSON nou + deploy site nou
- URL nou → se actualizează registry-ul → panoul îl afișează imediat, **fără
  rebuild de panou**

## Ordinea la deploy — 2 pași, obligatoriu

1. Publici site-ul CV (nod nou) → primești URL-ul.
2. Pui URL-ul în `SITE/date/cv-sites.json` (`sites[].url` + `registryUrl`).
3. Rebuild + publici din nou: site-ul CV (**nodul existent**, update in place)
   și panoul (**nodul existent**, update in place).

**Panoul nu se publică niciodată pe nod nou** — vezi Regula 0 din `AGENTS.md`.

## Ce se verifică înainte de deploy

```bash
python3 SITE/build.py --all
python3 SITE/build-hub.py
python3 SITE/test_split.py
```

Registrul se copiază lângă fiecare site (`cv-sites.json` în `dist-cv/<rol>/`).
Fără el, panoul n-ar avea de unde citi lista.

## Oglinda locală (Drive)

Cele două site-uri + sursele lor stau în oglinda locală:

```
E:\Google\GDrive\GDrive-Second_Brain_PKMS\02_Areas\02-2-AI-SOT\CASA\_Sites\Mavis\
├── Mavis-Cloud\                  → panoul    (site/ + source/)
└── Mavis-CV-<Rol>\               → site CV   (site/ + source/)
```

`SITE/prepare-deploy.py <folder>` pregătește exact această structură — și
sursa de deploy (fără nimic din restul repo-ului: acolo sunt și documente cu
conturi, care nu au ce urce pe un site public).
