# MavisCloud-Google

**Document pentru încărcare în notebookul `MavisCloud-Google`**
Pregătit de Mavis Cloud · actualizat 2026-10-22 · stare reală, măsurată

Google Workspace: Gmail, Drive, Calendar, Docs, Sheets, Slides

---

**Stare** — ⛔ **Tokenul lipsește.** Clientul OAuth e corect și verificat.
Mai trebuie **un singur consimțământ** în browser.

**Ce e măsurat acum** (din sandbox-ul de cloud, cu cod HTTP real):
- Google Drive API → merge
- Gmail API → merge
- Calendar API → merge
- Docs / Sheets / Slides → merge
- Google Photos → ⛔ host blocat de rețea din cloud (`photoslibrary.googleapis.com`, 0/6)
- Google Workspace MCP servers (oficiale) → ⛔ tot blocate din cloud (`*mcp.googleapis.com`, 0/6)

**Conector nativ MiniMax pentru Google** → nu există în Marketplace
(catalog: Hundsun, Qichacha, EverMe, PKBC, Office, WPS, WeCom; cache runtime: figma, github).

**Cum se rezolvă** → OAuth propriu. Client ID = identificator public, stă în
`mavis-tools/google-client.json`. Secretele stau în secret manager:
`GOOGLE_CLIENT_SECRET_MAVIS_CLOUD`, `GOOGLE_REFRESH_TOKEN_MAVIS_CLOUD`, `GOOGLE_EMAIL`.

**Setup** →
1. `node mavis-tools/google-preflight.js` — verdict pe un singur rând
2. `node mavis-tools/google-link-file.js` — scrie linkul în `18-GOOGLE/AUTORIZARE-LINK.txt`
3. consimțământ în browser → codul de autorizare
4. `node mavis-tools/google-connect.js "<url>"` → tokenul
5. `node mavis-tools/google-verify.js` — măsurătoare reală per serviciu

**Regulă** — NUNCIODATĂ ștergere definitivă. Trash doar, și se poate restaura.

**Identitate** — apvizual@gmail.com — singurul email pe tot sistemul.

**Detalii complete** — `docs/GOOGLE-INTEGRARE.md` ·
`docs/GOOGLE-STATUS-2026-10-22.md` (diagnostic + forensică) ·
`docs/GOOGLE-PRODUCTION-CHECKLIST.md` (Testing → In production)

---

*2026-10-22 · Mavis Cloud · măsurat, nu estimat*
