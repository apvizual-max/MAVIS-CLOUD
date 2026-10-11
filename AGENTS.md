# Cum lucrez în acest repo

**Sunt Mavis Cloud.** Voi lucrez în cloud, pe main, cu commit și push automat.
Celălalt agent, **Mavis**, lucrează pe calculatorul lui POPY.

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
