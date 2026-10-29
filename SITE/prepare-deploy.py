#!/usr/bin/env python3
"""Pregateste cele doua site-uri pentru deploy: build + sursa, in directorul tinta.

    python3 SITE/prepare-deploy.py <director-tinta>

Produce:
    <tinta>/Mavis-Cloud/site/                 → panoul (index.html la radacina)
    <tinta>/Mavis-Cloud/source/               → sursa panoului
    <tinta>/Mavis-CV-<Rol>/site/              → site-ul CV (index.html la radacina)
    <tinta>/Mavis-CV-<Rol>/source/            → sursa site-ului CV

Directorul tinta e, in mod normal, oglinda locala din Google Drive:
    .../CASA/_Sites/Mavis
Acolo ajung site-urile, cu sursa lor, ca backup si ca sursa de deploy.

De ce exista: sursa de deploy se ridica SEPARAT de repo. Repo-ul contine si
documente cu alte subiecte (conturi, credentiale, arhive) - acelea nu au ce
sa urce pe un site. Aici se urca exact fisierele care construiesc site-ul.
"""
import json, os, shutil, sys

BASE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(BASE)


def copiere(src, dst):
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copyfile(src, dst)
    return dst


def copiere_arbore(src, dst):
    """Copiere suprascrie. NU sterge nimic: DriveFS refusa eliminarea de
    directoare, iar regula vaultului e fara stergere. Ce e nou se scrie peste
    ce era; ce nu mai exista in build ar ramane, de aceea lista de fisiere se
    verifica dupa copiere."""
    shutil.copytree(src, dst, dirs_exist_ok=True)
    return dst


def scrie_md(path, text):
    """Documentatie .md: UTF-8 fara BOM, LF. Conventional din vault."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(text.replace('\r\n', '\n'))


def complete(tmpl, **tokens):
    for k, v in tokens.items():
        tmpl = tmpl.replace('{{%s}}' % k, str(v))
    return tmpl


def nume_panou():
    return 'Mavis-Cloud'


def nume_cv(slug):
    return 'Mavis-CV-' + '-'.join(w[:1].upper() + w[1:] for w in slug.split('-'))


def pregateste(out):
    out = os.path.abspath(out)
    os.makedirs(out, exist_ok=True)

    reg = json.load(open(os.path.join(BASE, 'date', 'cv-sites.json'), encoding='utf-8'))
    sites = reg.get('sites', [])

    # --- PANOU ---------------------------------------------------------------
    pdir = os.path.join(out, nume_panou())
    copiere_arbore(os.path.join(BASE, 'dist'), os.path.join(pdir, 'site'))

    ps = os.path.join(pdir, 'source')
    copiere(os.path.join(BASE, 'build-hub.py'), os.path.join(ps, 'build-hub.py'))
    copiere(os.path.join(BASE, 'date', 'cv-sites.json'), os.path.join(ps, 'cv-sites.json'))
    copiere(os.path.join(BASE, 'css', 'doc.css'), os.path.join(ps, 'doc.css'))
    copiere(os.path.join(BASE, 'docs-viewer', 'index.html'), os.path.join(ps, 'docs-viewer-index.html'))
    copiere(os.path.join(BASE, 'README-PANOU.md'), os.path.join(ps, 'README.md'))

    scrie_md(os.path.join(pdir, 'README.md'), complete(README_PANOU,
        N=len(sites),
        REG=reg.get('registryUrl', '') or '—',
    ))

    # --- SITE-URI CV ---------------------------------------------------------
    for s in sites:
        slug = s.get('slug')
        if not slug:
            continue
        cdir = os.path.join(out, nume_cv(slug))
        copiere_arbore(os.path.join(BASE, 'dist-cv', slug), os.path.join(cdir, 'site'))

        cs = os.path.join(cdir, 'source')
        copiere(os.path.join(BASE, 'build.py'), os.path.join(cs, 'build.py'))
        copiere(os.path.join(BASE, 'date', slug + '.json'), os.path.join(cs, 'date', slug + '.json'))
        copiere(os.path.join(BASE, 'date', 'cv-sites.json'), os.path.join(cs, 'date', 'cv-sites.json'))
        copiere(os.path.join(BASE, 'css', 'schelet.css'), os.path.join(cs, 'css', 'schelet.css'))
        copiere(os.path.join(BASE, 'README-CV.md'), os.path.join(cs, 'README.md'))

        scrie_md(os.path.join(cdir, 'README.md'), complete(README_CV,
            TITLU=s.get('titlu', slug),
            ROL=s.get('rol', ''),
            URL=s.get('url', '') or '—',
            SLUG=slug,
            REG=reg.get('registryUrl', '') or '—',
        ))

    return out


README_PANOU = """# Mavis Cloud — panoul (site 1)

**Live:** https://4nsxl2or95u1a.space.minimax.io

Panoul de comanda: Pano · Site CV · Punte · Jules/Git/GitHub · Prompt · TO DO.
Statica, fara backend. Citeste repo-ul, nu scrie in el.

## Ce e in acest folder

| Folder | Ce e |
|---|---|
| `site/` | build-ul publicat (index.html la radacina) |
| `source/` | sursa: generatorul, registrul, stilul, vizualizatorul de documente |

## Tab-ul „Site CV"

Nu contine copii ale paginilor CV. Contine **legaturi**.

Lista de site-uri CV se citeste de pe server, la fiecare incarcare:
`{{REG}}`. Previzualizarea e un iframe catre **site-ul surs**, nu o copie.

Rezerva: daca registrul de la sursa nu raspunde, se foloseste ultima copie
locala (doar titlu, rol, URL). Fara continut de CV.

**{{N}} rol(i)** inregistrate in registru.

## Rebuild

```bash
python3 SITE/build.py --all     # site-urile CV
python3 SITE/build-hub.py       # panoul
python3 SITE/prepare-deploy.py <acest-folder>
```

Sursa completa (repo cu istoric, CI, skill-uri):
https://github.com/apvizual-max/MAVIS-CLOUD
"""

README_CV = """# {{TITLU}} — site CV (site 2)

**Live:** {{URL}}

Rol: {{ROL}}
Slug: `{{SLUG}}`

## Ce e in acest folder

| Folder | Ce e |
|---|---|
| `site/` | build-ul publicat (index.html la radacina + registrul) |
| `source/` | sursa: generatorul, datele rolului, scheletul comun |

## Contract

`site/index.html` e la radacina: site-ul e autonom, nu o pagină in panou.

`site/cv-sites.json` e registrul site-urilor CV. Panoul il citeste de aici,
la fiecare incarcare, cu `cache: no-store` — de aceea schimbarea sursei se
vede imediat, fara sa reconstruiesc panoul.

Registrul: {{REG}}

## Rebuild

```bash
cd source
python3 build.py {{SLUG}}
```
"""


if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(BASE), '.deploy')
    p = pregateste(out)
    print('OK  %s' % p)
    for root, dirs, files in os.walk(p):
        rel = os.path.relpath(root, p)
        for f in sorted(files):
            fp = os.path.join(root, f)
            print('    %8d  %s' % (os.path.getsize(fp), os.path.join(rel, f).replace('\\', '/')))
