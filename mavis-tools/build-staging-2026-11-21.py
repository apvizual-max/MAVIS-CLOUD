#!/usr/bin/env python3
"""Construiește stagiunea de snapshot pentru rotația memoriei din 2026-11-21.

Regula: stagiunea = arhiva de ieri (text ORIGINAL, pre-tăiere) + delta-urile de azi.
Nu scrie nimic în memorie — doar fișierele pentru memory-snapshot.js --from.
"""
import os
import shutil

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARCHIVE = os.path.join(BASE, "docs/arhiva/memorie/2026-11-20-rotatie-zilnica-20")
STAGE = os.path.join(BASE, ".mem-staging-2026-11-21")

# --- delta 1: secțiunea zilnică în raport-zilnic-istoric --------------------
ISTORIC = """
## 2026-11-21 — sâmbătă: 21 mesaje, **1 posting nou (#24021 — drop-uit)**, 4 needs-action

**Etichete.** 21 mesaje azi (25 hituri, 9 în inbox): `MAVIS/Joburi` 14, `Newsletter` 7, `AI Folder/AI si Comunitati` 4, `Socials` 0, `Finante` 0; 2 mesaje fără filtru (Claudiu Ciobanu — copy/reclame; DOUGLAS OUTLET — Black Friday). `Personal` **nu mai există**; `MAVIS/Joburi/IQ Adds` **goală** (0 azi, 0 în 7z). Filtre: 20 total, 7 cu `addLabelIds`, **6 ating etichetă de categorie ⇒ 6 funcționale**.

**Triaj: 0 needs-reply, 4 needs-action, 6 job-alert-other, 11 fyi, 0 noise.** Needs-action = Twine Team („22 new job opportunities" — video editing) + 3 Bestjobs („New opportunities in top companies", „New design graphic bucuresti jobs", **„AGRESIV MEDIA is hiring Colaboratori design grafic"**).

**Joburi.** 66 analizate (IQads 45 + DP 21) → 37 păstrate, 29 drop-uite, 16 amânat. **1 postare nouă: IQads #24021 Gallery Manager @ Galeria Gaep** (exp. 2026-12-04) — **non-design** ⇒ drop-uit de motor (§4 îl arată, nu intră în tabele). DP: 0 postări noi (cel mai recent 2026-11-05). Secțiuni 1:16, 2:5, 3:0, 4:0. Top-5 **neschimbat** (Cohn & Jansen 9,6 · Mercury360 9,6 · GRF+ 9,4 · Flaminjoy 9,4 · Confident Communications 9,4) ⇒ 3 din 5 non-design (§6.2: 21 joburi, 25 semnalări).

**Cota Google: 130/200** (61 mail-count · 27 filter-state · 23 simulate-sort · 7 inbox · 5 folder · 3 label-stray · 3 build · 1 verify) — raportul și contorul final **coincid** ✓ (nicio cerere după scriere).
"""

# --- delta 2: regula 29 în raport-calitate-verificare ------------------------
QUALITY = """
## 29. Nu deduce o divergență dintr-un output trunchiat (21.11)

Azi am văzut că `report-mail-count.js` nu mai raporta `Personal` ca etichetă lipsă și
aproape am „reparat" șablonul (cuvintele „nu mai exista in Gmail" → „nedeterminat").
Verificarea a arătat că **linia exista în output, doar `tail -13` o tăiase**; ambele
sondae (`report-mail-count.json` și `report-label-stray.json`) spuneau `Personal` ⇒
nu era divergență.

*Regulă:* când două măsurători par să nu se potrivească, **citește fișierul JSON sau
outputul complet**, nu fragmentul afișat. Un „fix" bazat pe o divergență inexistentă
corupe șablonul pentru o cauză care nu există.
"""

# --- delta 3: notă în scoring-gs-buguri-masurate ----------------------------
SCORING = """
*21.11:* 1 postare nouă — **#24021 Gallery Manager @ Galeria Gaep** (exp. 2026-12-04) —
**non-design** (galerie/management) ⇒ drop-uit de motor, apare în §4, nu în tabele.
Top-5 neschimbat; 3 din 5 rămân non-design cu axa D umflată de „social media" (§6.2).
"""

# --- delta 4: pointer în raport-zilnic-pipeline -----------------------------
PIPELINE = """
## 2026-11-21 — reguli noi: `raport-calitate-verificare` (29)

*(secțiunea zilnică e în `raport-zilnic-istoric`; regula 29 — nu deduce o divergență dintr-un output trunchiat — în `raport-calitate-verificare`)*
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
        "**20.11: 0 postări noi** (max ID IQads rămâne 24020; designproject.io cel mai recent postat 2026-11-05).",
        "**21.11: 1 postare nouă — IQads #24021 Gallery Manager @ Galeria Gaep** (exp. 2026-12-04, non-design ⇒ drop-uit, arătat în §4); 20.11: 0 postări noi (max ID 24020); designproject.io cel mai recent postat 2026-11-05.",
    ),
    (
        "- **Quota Google: 200 cereri/rulare** (20.11: **131** — raportul scrie 130, +1 cerere de audit după scriere; 19.11: 128; 18.11: 128; 17.11: 124).",
        "- **Quota Google: 200 cereri/rulare** (21.11: **130** — raportul și contorul final coincid; 20.11: 131 — raportul scria 130, +1 cerere de audit după scriere; 19.11: 128).",
    ),
    (
        "Ultima rulare (20.11): 0 needs-reply, 3 needs-action, 4 job-alert-other, 7 fyi, 0 noise.",
        "Ultima rulare (21.11): 0 needs-reply, 4 needs-action, 6 job-alert-other, 11 fyi, 0 noise.",
    ),
    (
        "id-ul de verificare vine din răspunsul build-ului, nu se scrie cu mâna.",
        "id-ul de verificare vine din răspunsul build-ului, nu se scrie cu mâna. **Nu deduce o divergență dintre două măsurători dintr-un output trunchiat** (21.11) ⇒ citește JSON-ul sau outputul complet înainte de orice „reparare\" de șablon.",
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
