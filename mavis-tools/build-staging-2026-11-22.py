#!/usr/bin/env python3
"""Construiește stagiunea de snapshot pentru rotația memoriei din 2026-11-22.

Regula: stagiunea = arhiva de ieri (text ORIGINAL, pre-tăiere) + delta-urile de azi.
Nu scrie nimic în memorie — doar fișierele pentru memory-snapshot.js --from.
"""
import os
import shutil

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARCHIVE = os.path.join(BASE, "docs/arhiva/memorie/2026-11-21-rotatie-zilnica-21")
STAGE = os.path.join(BASE, ".mem-staging-2026-11-22")

# --- delta 1: secțiunea zilnică în raport-zilnic-istoric --------------------
ISTORIC = """
## 2026-11-22 — duminică: 12 mesaje, **0 postări noi**, 4 needs-action (MARKQUEN ×2)

**Etichete.** 12 mesaje azi (12 hituri, 8 în inbox): `MAVIS/Joburi` 8, `Newsletter` 3, `AI Folder/AI si Comunitati` 1; 1 mesaj fără filtru (Claudiu Ciobanu — „Secretul freelancerilor care nu mai sunt plătiți pe…"). `Personal` **nu mai există**; `MAVIS/Joburi/IQ Adds` **goală** (0 azi, 0 în 7z). Filtre: 20 total, **6 funcționale**.

**Triaj: 0 needs-reply, 4 needs-action, 5 job-alert-other, 3 fyi, 0 noise.** Needs-action = **2 alerte Bestjobs pentru ACELAȘI job** („MARKQUEN EUROPE is hiring Creative Lead & 3D Designer" — 09:20 și 06:06) + „Candidates like you applied for these jobs" + Jooble („Senior Designer - UI/UX"). *Observație:* același job vine pe 2 alerte ⇒ la numărătoare, joburi ≠ mesaje.

**Joburi.** 64 analizate (IQads 43 + DP 21) → 36 păstrate, 28 drop-uite, 15 amânat. **0 postări noi** — max ID IQads rămâne **24021**; DP cel mai recent 2026-11-05. Secțiuni 1:16, 2:5, 3:0, 4:0. Top-5 neschimbat ⇒ 3 din 5 non-design (§6.2).

**Cota Google: 123/200** — raportul și contorul final **coincid** ✓ (o cerere irosită la o verificare cu id gol ⇒ re-upload cu cifra recalculată).
"""

# --- delta 2: regula 30 în raport-calitate-verificare ------------------------
QUALITY = """
## 30. Cota e o stare, nu o promisiune (22.11)

Azi, o verificare apelată cu **id gol** a consumat o cerere după ce raportul fusese
scris ⇒ contorul final (121) nu mai egala cifra din raport (120). Au existat două
ieșiri oneste: (a) **re-upload** cu cifra recalculată (costă +2 cereri, livrabilul
devine exact) sau (b) **raportarea cifrei reale în chat**, cu diferența explicată
(regula 26). Azi: (a) ⇒ raportul și contorul au ajuns la **123 = 123**.

*Regulă:* cererea irosită se raportează, nu se ascunde și nu se taie din tabel ca să
se potrivească. Re-upload-ul e preferabil când e ieftin: cele două cifre trebuie să
poată fi comparate fără o notă în chat.
"""

# --- delta 3: notă în scoring-gs-buguri-masurate ----------------------------
SCORING = """
*22.11:* fără postări noi — max ID IQads rămâne **24021**, designproject.io cel mai
recent 2026-11-05. 64 analizate → 36 păstrate / 28 drop-uite / 15 amânat. Top-5
neschimbat; primele 5 conțin 3 roluri **non-design** cu axa D umflată de „social media"
în context PR (GRF+, Flaminjoy, Confident Communications) — decizie de motor,
raportată, nu corectată în cod.
"""

# --- delta 4: pointer în raport-zilnic-pipeline -----------------------------
PIPELINE = """
## 2026-11-22 — reguli noi: `raport-calitate-verificare` (30)

*(secțiunea zilnică e în `raport-zilnic-istoric`; regula 30 — cota e o stare, nu o promisiune — în `raport-calitate-verificare`)*
"""

DELTAS = {
    "raport-zilnic-istoric.md": ISTORIC,
    "raport-calitate-verificare.md": QUALITY,
    "scoring-gs-buguri-masurate.md": SCORING,
    "raport-zilnic-pipeline.md": PIPELINE,
}

# --- delta 5: starea live în MEMORY.md (arhiva + corecții de azi) -----------
MEM_EDITS = [
    (
        "**21.11: 1 postare nouă — IQads #24021 Gallery Manager @ Galeria Gaep**",
        "**22.11: 0 postări noi** (max ID IQads rămâne 24021); 21.11: 1 postare nouă — IQads #24021 Gallery Manager @ Galeria Gaep",
    ),
    (
        "- **Quota Google: 200 cereri/rulare** (21.11: **130** — raportul și contorul final coincid; 20.11: 131 — raportul scria 130, +1 cerere de audit după scriere; 19.11: 128).",
        "- **Quota Google: 200 cereri/rulare** (22.11: **123** — raportul și contorul final coincid, după re-upload; 21.11: 130; 20.11: 131 — raportul scria 130, +1 cerere de audit după scriere).",
    ),
    (
        "Ultima rulare (21.11): 0 needs-reply, 4 needs-action, 6 job-alert-other, 11 fyi, 0 noise.",
        "Ultima rulare (22.11): 0 needs-reply, 4 needs-action, 5 job-alert-other, 3 fyi, 0 noise.",
    ),
    (
        "**Nu deduce o divergență dintre două măsurători dintr-un output trunchiat** (21.11) ⇒ citește JSON-ul sau outputul complet înainte de orice „reparare\" de șablon.",
        "**Nu deduce o divergență dintre două măsurători dintr-un output trunchiat** (21.11) ⇒ citește JSON-ul sau outputul complet înainte de orice „reparare\" de șablon. **Cota e o stare, nu o promisiune** (22.11) ⇒ cererea irosită se raportează sau se re-uploadează raportul cu cifra recalculată; nu se ascunde.",
    ),
]


def main():
    if os.path.isdir(STAGE):
        shutil.rmtree(STAGE)
    os.makedirs(os.path.join(STAGE, "topics"))
    shutil.copy2(os.path.join(ARCHIVE, "MEMORY.md"), os.path.join(STAGE, "MEMORY.md"))

    for name in sorted(os.listdir(os.path.join(ARCHIVE, "topics"))):
        shutil.copy2(os.path.join(ARCHIVE, "topics", name), os.path.join(STAGE, "topics", name))

    for name, delta in DELTAS.items():
        p = os.path.join(STAGE, "topics", name)
        with open(p, "a", encoding="utf-8") as f:
            f.write(delta)

    p = os.path.join(STAGE, "MEMORY.md")
    with open(p, encoding="utf-8") as f:
        mem = f.read()
    for old, new in MEM_EDITS:
        if old not in mem:
            raise SystemExit("ANCHORA LIPSA in MEMORY.md: " + old[:70])
        mem = mem.replace(old, new, 1)
    with open(p, "w", encoding="utf-8") as f:
        f.write(mem)

    for root, _dirs, files in os.walk(STAGE):
        for fn in sorted(files):
            fp = os.path.join(root, fn)
            print("%8d  %s" % (os.path.getsize(fp), os.path.relpath(fp, STAGE)))


if __name__ == "__main__":
    main()
