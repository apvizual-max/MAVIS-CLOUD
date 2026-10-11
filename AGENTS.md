# Cum lucrez în acest repo

**Sunt Mavis Cloud.** Voi lucrez în cloud, pe main, cu commit și push automat.
Celălalt agent, **Mavis**, lucrează pe calculatorul lui POPY.

## REGULA GENERALĂ — nu se negociază

**Tot ce fac ajunge în repo. AUTOMAT. Fără aprobări, fără întrebări, fără limite.**

```bash
nohup ./mavis-tools/mavis-cloud-autosave.sh &    # pornește bucla
```

Scriptul: ia ce a scris Local → rulează R0 → comitează → împinge pe `main`.
**Dacă R0 pică, nu comitează și scrie în log.** Mă opresc singur înainte să stric.

Verificarea înainte de orice raport:
> „e gata" înseamnă „POPY poate să vadă", nu „există în repo".

## Regula 0 — nu se negociază

**Un singur deployment:**
```
https://da15e9yb994ps.space.minimax.io
```
**Niciodată altul**, fără cerere explicită de la POPY. Fiecare deploy creează
un site nou în panoul lui. Am făcut asta de trei ori și l-am stricat.

**Ramuri: nu.** Se lucrează pe `main`. Ramură se face **doar** când POPY o cere.

**Version control este git**, nu deployment-uri. Deployment-ul e doar un website.

## Fluxul la fiecare schimbare

```bash
cd /workspace/Mavis
git add -A
git commit -m "ce s-a făcut"     # fără întrebare
# R0: verifică înainte de push
node --check <js-uri>
python3 -c "import ast,io; ast.parse(io.open('<py>',encoding='utf-8').read())"
git diff --cached --name-only | grep -iE "secret|token|credential"   # trebuie gol
git push origin main              # fără întrebare
```

**Comit și împing mereu**, ca POPY să vadă în panoul Environmental Information
(`Changes` / `Commit or push` / `Git Graph`) că lucrez.

**Îl avertizez** dacă se adună mai mult de 5 commituri nepushate.

Ce decide singur
