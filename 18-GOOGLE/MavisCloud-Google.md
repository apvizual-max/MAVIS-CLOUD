# MavisCloud-Google

**Document pentru încărcare în notebookul `MavisCloud-Google`**
Pregătit de Mavis Cloud · 2026-10-21 · stare reală, măsurată

Google Workspace: Gmail, Drive, Calendar, Docs, Sheets, Slides

---

**Stare** — ⛔ Credentialele NU sunt încă în Cloud. Setup-ul e gata, un command.

**Ce e măsurat acum** — din sandbox-ul de cloud:
- Google Drive API → merge
- Gmail API → merge
- Calendar API → merge
- Docs / Sheets / Slides → merge
- Google Photos → ⛔ host blocat de rețea din cloud (`photoslibrary.googleapis.com`, 0/6)
- Google Workspace MCP servers (oficiale) → ⛔ tot blocate din cloud (`*mcp.googleapis.com`, 0/6)

**Conector nativ MiniMax pentru Google** → nu există în Marketplace
(catalog: Hundsun, Qichacha, EverMe, PKUlaw, Office, WPS, WeCom; cache runtime: figma, github).

**Cum se rezolvă** → OAuth propriu. 4 chei în secret manager:
`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, `GOOGLE_EMAIL`.

**Setup** → `node mavis-tools/google-setup.js` (la Local) → `node mavis-tools/google-verify.js` (în Cloud)

**Regulă** — NUNCIODATĂ ștergere definitivă. Trash doar, și se poate restaura.

**Identitate** — apvizual@gmail.com — singurul email pe tot sistemul.

**Detalii complete** — `docs/GOOGLE-INTEGRARE.md`

---

*2026-10-21 · Mavis Cloud · măsurat, nu estimat*
