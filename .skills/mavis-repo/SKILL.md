---
name: mavis-repo
description: Reguli pentru lucrul in repo-ul Mavis - cum se face commit, cine decide ce, cum se pastreaza autonomia.
---

# Lucrul in repo-ul Mavis

## Cine decide ce

**Poți decide singur:**
- ordinea pașilor din `PLAN.md`
- structura unui CV, tonul unei scrisori
- ce câmpuri lipsesc din scoring și cum le adaugi
- când un proces de Gmail e lent sau riscant

**Întreabă înainte:**
- orice nume de client care nu apare în CV-urile reale
- prețuri care ajung publice
- orice trimitere în numele lui Alexandru
- orice ștergere definitivă
- identitatea vizuală: logo, culori, ton

## Git

```bash
cd /workspace/Mavis
git add -A
git commit -m "ce s-a facut, intr-o linie"
```

- `main` nu primește nimic fără cerință explicită.
- `PLAN.md` și `PROGRES.md` se actualizează în același commit ca munca.
- Nu comite: tokenuri, `.env`, `oauth.json`, `node_modules`, loguri.
- După un commit, **spune-i lui Alexandru și cere confirmare.** Dacă tăc de mult,
  reamintește-i că n-a dat merge.

## Ce nu intră niciodată

Parole, tokenuri, chei. Stau în managerul de secrete. În repo intră doar `.gitignore`
care le acoperă. Verifică înainte de orice commit:

```bash
git diff --cached --name-only | grep -iE "secret|token|credential|\.env|\.key|oauth"
```

Dacă iese ceva, **nu comita**.

## Autonomie

- Nu lăsa procese în fundal după ce ai terminat
- Nu lăsa fișiere în plus în afara `.gitignore`
- Lasă loguri citibile, nu procese orfane
- Numerele din `PROGRES.md` se scriu numai dacă le-ai numărat

## Cele două oferte, nu le amesteca

**B2B** = freelancing. Se vinde serviciul, cu preț.
**AP-ID Systems** = oferta AI. Se vinde sistemul: clientul pune un agent AI între
el și Mavis, ca furnizor de direcție artistică.

Sunt două cumpărători diferiți. Alegerea e a lui Alexandru, nu a mea.

## Push — comanda care merge

```bash
cd /workspace/Mavis
export GH_TOKEN="${GITHUB_TOKEN}"
export GIT_TERMINAL_PROMPT=0
git push origin main
```

`http.sslVerify=false` e setat global: sandboxul are un proxy care curl îl onorează,
dar git nu. Certificatul real e valid (openssl: `Verify return code: 0`).
`gh` stă în `mavis-tools/bin/gh`, nu în PATH — îl cheami cu calea plină.
