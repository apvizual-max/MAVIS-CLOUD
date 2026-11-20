#!/usr/bin/env python3
"""Construiește stagiunea de snapshot pentru rotația memoriei din 2026-11-20.

Regula: stagiunea = arhiva de ieri (text ORIGINAL, pre-tăiere) + delta-urile de azi.
Nu scrie nimic în memorie — doar fiișierele pentru memory-snapshot.js --from.
"""
import os
import shutil

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARCHIVE = os.path.join(BASE, "docs/arhiva/memorie/2026-11-19-rotatie-zilnica-19")
STAGE = os.path.join(BASE, ".mem-staging-2026-11-20")

# --- delta 1: secțiunea zilnică în raport-zilnic-istoric --------------------
ISTORIC = """
## 2026-11-20 — vineri: 14 mesaje, **0 postări noi**, cota raportată corect după un audit

**Etichete.** 14 mesaje azi (18 hituri, 9 în inbox): `MAVIS/Joburi` 8, `Newsletter` 6, `AI Folder/AI si Comunitati` 3, `Finante` 1, `Socials` 0. 2 mesaje azi **fără filtru** (Duty Free Otopeni — Black Friday; Team Begun, fosta Ethos). `Personal` **nu mai există**; `MAVIS/Joburi/IQ Adds` **goală** (0 azi, 0 în 7z). Filtre: 20 total, 7 cu `addLabelIds`, **6 ating etichetă de categorie ⇒ 6 funcționale**.

**Triaj: 0 needs-reply, 3 needs-action, 4 job-alert-other, 7 fyi, 0 noise.** Needs-action = 2 alerte Bestjobs („8 design graphic bucuresti jobs available on bestjobs", „Job offers that fit your profile") + Jooble („Compania caută Senior Designer - UI/UX (f/m/x) și 100 mai multe oferte noi de muncă").

**Joburi.** 65 analizate (IQads 44 + DP 21) → 37 păstrate, 28 drop-uite, 16 amânat. **0 postări noi** — max ID IQads rămâne **24020**; DP: cel mai recent postat 2026-11-05. Secțiuni 1:16, 2:5, 3:0, 4:0. Top-5 **neschimbat** față de 18–19.11 (Cohn & Jansen 9,6 · Mercury360 9,6 · GRF+ 9,4 · Flaminjoy 9,4 · Confident Communications 9,4) ⇒ primele 5 conțin **3 roluri non-design** umflate de „social media" (§6.2).

**Cota Google: 130/200 în raport** (62 mail-count · 29 filter-state · 16 simulate-sort · 7 inbox · 5 folder · 3 label-stray · 5 build · 3 verify). **Contorul final: 131** — un audit de unicitate pe Drive (search după nume, 1 cerere) a căzut după scrierea raportului ⇒ regula 26: cifra din raport e „starea la scriere", cea reală se raportează în chat.

**Reparat operativ:** scraping-ul designproject.io a picat cu `MODULE_NOT_FOUND` — în `cd X && (A) & (B) &` doar primul subshell moștenește directorul. ⇒ `cd X; (A) & (B) &` sau cale absolută în ambele.
"""

# --- delta 2: regulile 26–27 în raport-calitate-verificare -------------------
QUALITY = """
## 26. Cota din raport e o fotografie la momentul scrierii (20.11)

Raportul scrie „Cota Google: **130** cereri" — măsurată când raportul a fost scris,
plus cererile *pending* (upload-ul + verificarea). Orice cerere făcută **după** acel
moment intră doar în contor: azi, un audit de unicitate pe Drive (search după nume,
1 cerere) a dus contorul final la **131**, cu raportul deja publicat la 130.

*Regulă:* la finalul zilei, compară cifra din raport cu **contorul final** și
raportează cifra reală, cu diferența explicată — nu scoți o cerere din tabel ca să
se potrivească. Tabelul din §5 rămâne „starea la scriere" și e corect așa.

## 27. Verificarea livrării: o singură dată, cu id-ul real (20.11)

Trei cereri cheltuite degeaba pe un raport care se verifica cu 1: (1)
`report-verify-upload.js` apelat cu un **id inventat** („PLACEHOLDER") a consumat o
cerere chiar deși a eșuat; (2) un build cu **folder id greșit** (transcriere) a pornit
un search+upload inutile; (3) build repetat (dry → upload → patch) — fiecare upload
real se contorizează.

*Regulă:* id-ul de verificare vine **din răspunsul build-ului**, nu se scrie cu mâna;
build-ul se rulează o dată pentru conținut și o dată pentru livrare; după livrare,
un search după nume (1 cerere) confirmă că n-a rămas **duplicat** și că `parents` e
folderul corect. Cererea de audit intră în contor și se raportează, nu se ascunde.
"""

# --- delta 3: notă în scoring-gs-buguri-masurate ----------------------------
SCORING = """
*20.11:* fără postări noi — max ID IQads rămâne **24020**, designproject.io cel mai
recent 2026-11-05. **Art Director #23996** și **Creative Lead #23993** (Stefanini
Infinit) rămân „verdict amânat" (L=0 — compania nu publică localizare) ⇒ decizia e a
lui Alex (§6.3). Top-5 neschimbat; primele 5 conțin 3 roluri **non-design** cu
axa D umflată de „social media" în context PR (GRF+, Flaminjoy, Confident
Communications) — decizie de motor, raportată, nu corectată în cod.
"""

# --- delta 4: pointer în raport-zilnic-pipeline -----------------------------
PIPELINE = """
## 2026-11-20 — regulile noi sunt în topicul `raport-calitate-verificare`

*(secțiunea zilnică e în `raport-zilnic-istoric`; regulile 26–27 despre cotă/audit sunt în `raport-calitate-verificare`)*

*Notă de execuție (20.11):* scraping-ul DP a picat cu `MODULE_NOT_FOUND` — într-un
subshell de fundal scris `cd X && (A) & (B) &`, doar primul subshell moștenește
directorul de lucru. ⇒ `cd X; (A) & (B) &` sau cale absolută în ambele comenzi.
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
        "- **Quota Google: 200 cereri/rulare** (19.11: **128**; 18.11: 128; 17.11: 124).",
        "- **Quota Google: 200 cereri/rulare** (20.11: **131** — raportul scrie 130, +1 cerere de audit după scriere; 19.11: 128; 18.11: 128; 17.11: 124).",
    ),
    (
        "Ultima rulare (19.11): 0 needs-reply, 4 needs-action, 5 job-alert-other, 7 fyi, 0 noise.",
        "Ultima rulare (20.11): 0 needs-reply, 3 needs-action, 4 job-alert-other, 7 fyi, 0 noise.",
    ),
    (
        "designproject.io: cel mai recent postat 2026-11-05 (0 postări noi).",
        "**20.11: 0 postări noi** (max ID IQads rămâne 24020; designproject.io cel mai recent postat 2026-11-05).",
    ),
    (
        "- **Motorul nu are cheie pentru DTP/prepress**",
        "- **Cota din raport e „starea la scriere\"** (20.11): cererile făcute după (audit de unicitate pe Drive) intră doar în contor ⇒ raportează cifra reală zilei, cu diferența explicată; id-ul de verificare vine din răspunsul build-ului, nu se scrie cu mâna.\n- **Motorul nu are cheie pentru DTP/prepress**",
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
            raise SystemExit("ANCHORA LIPSA in MEMORY.md: " + old[:60])
        mem = mem.replace(old, new, 1)
    with open(p, "w", encoding="utf-8") as f:
        f.write(mem)

    for root, _dirs, files in os.walk(STAGE):
        for fn in sorted(files):
            fp = os.path.join(root, fn)
            print("%8d  %s" % (os.path.getsize(fp), os.path.relpath(fp, STAGE)))


if __name__ == "__main__":
    main()
