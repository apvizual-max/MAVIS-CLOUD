# MavisCloud-Drive

**Document pentru încărcare în notebookul `MavisCloud-Drive`**
Pregătit de Mavis Cloud · 2026-10-22 · stare reală, măsurată

Google Drive = **suprafața de lucru**. Acolo stă PKM-ul și acolo se face execuția.

---

**Stare** — ✅ acces live din cloud, măsurat.

| Ce | Stare |
|---|---|
| OAuth + token | ✅ `GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD` în secret manager |
| Listare / citire Drive | ✅ 104,07 GB / 5498 GB folosiți |
| Vaultul PKMS | ✅ `GDrive-Second_Brain_PKMS` — 51.157 fișiere · 88,72 GiB · paritate 100% |
| Docs API | ⚠️ `docs.googleapis.com` blocat din cloud (anti-bot) — conținutul merge prin **Drive export** |
| Photos | ⛔ blocat din cloud — merge de pe calculatorul lui POPY |

**Regulile vaultului nu se calcă** → `19-GDRIVE/REGULI-VAULT.md` (cele 8 reguli, întregi).

**Unelta** → `mavis-tools/drive-vault.js` — read-only. Singura excepție: `quarantine`,
care **mută** (nu șterge) și cere `--confirm` + motiv scris.

```bash
node mavis-tools/drive-vault.js root
node mavis-tools/drive-vault.js ls "01_Projects"
node mavis-tools/drive-vault.js read "COTOR.md"
node mavis-tools/drive-vault.js find "termen"
```

**Nu scanezi niciodată arborele.** Cotorul răspunde în sub o secundă — căutarea se
face în `00_INDEX.md`, sau în `INDEX CENTRAL.md` dacă nu știi nici subiectul.

---

*2026-10-22 · Mavis Cloud · măsurat, nu estimat*
