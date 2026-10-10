# Intenții — de la POPY, prin agentul local, către cloud

Canalul prin care cerințele ajung de la om la Mavis, fără să fie nevoie de
sesiune deschisă.

## Cum se folosește

1. POPY scrie ce vrea aici
2. Agentul local face `git pull`, citește, face ce poate local
3. Agentul local notează ce a făcut aici
4. Mavis face `git pull` la următoarea sesiune și continuă

## Înregistrări

### [2026-10-10] Livrare, agenți și registru

**POPY a cerut:**
- corectarea numelui „Smite" — făcută, era corect din start
- rezolvarea etichetelor Gmail goale — **diagnoză găsită: fereastra 1–3 ani
  pe care am pus tot sistemul excludea newsletter-urile AI, care vin zilnic**
- un Sentinel — raport de stare complet, cu dată, permanent
- un registru al tot ce vine de pe GitHub/GitLab
- o punte între cloud și agentul local
- flux CI cu pull request, ca Live Review să aibă ce verifica

**Mavis a răspuns:**
- toate mai sus, în repo
- 3 skill-uri noi: `sentinel-report`, `registru-extern`, `puntea-agenti`
- eticheta `MAVIS/AI si comunitati`: **0 → 2.000+**
- flux CI: ramură + PR + merge, scris în `AGENTS.md`

**Rămâne de făcut de POPY:**
- activează GitHub Copilot și Jules din interfața web (contul e pe plan free,
  API-ul răspunde `Not Found`)
- trimite linkul la „Mavis Apple Design", dacă e alt repo decât `emilkowalski/skills`
- email și telefon pentru site — sunt încă `[EMAIL]` și `[TELEFON]`

---

*Adaugă aici, în ordine, cu dată. Nu șterge intrările vechi.*