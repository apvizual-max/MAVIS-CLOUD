# Site CV — sursa

Site-ul de CV e **site-ul 2**, separat de panou. Fiecare rol are URL-ul lui.

## Cum se construiește

```bash
python3 build.py graphic-designer     # scrie dist-cv/graphic-designer/index.html
python3 build.py --all                # toate rolurile
```

## Ce iese

```
dist-cv/<rol>/
├── index.html        ← pagina CV, la rădăcina site-ului
└── cv-sites.json     ← registrul site-urilor CV
```

`index.html` e la rădăcină: site-ul e autonom. Nu e o pagină pusă în panou.

## Registrul

`cv-sites.json` e sursa unică a listei de site-uri CV. Se copiază lângă fiecare
site, ca panoul să-l poată citi **de pe server** și să arate ce există acum,
fără copii și fără rebuild de panou.

```json
{
  "registryUrl": "https://<nod>.space.minimax.io/cv-sites.json",
  "sites": [
    { "slug": "graphic-designer", "titlu": "...", "rol": "...", "url": "https://..." }
  ]
}
```

## Fișiere din această sursă

| Fișier | Ce e |
|---|---|
| `build.py` | generatorul: JSON intră, HTML iese |
| `date/<rol>.json` | **singurul lucru pe care îl schimbi** — datele rolului |
| `date/cv-sites.json` | registrul site-urilor |
| `css/schelet.css` | scheletul comun — nu se atinge |

Regula: **datele se schimbă, UI-ul nu.** Adăugarea unui rol nou înseamnă un
JSON, nu scriere de HTML.
