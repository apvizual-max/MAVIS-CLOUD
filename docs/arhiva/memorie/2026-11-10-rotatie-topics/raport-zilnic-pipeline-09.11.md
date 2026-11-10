## 2026-11-09 → `raport-zilnic-istoric` (regulile rămân aici)

**Platformele de job nu cer niciodată răspuns de la om.** Azi: alerta LinkedIn
„New jobs similar to..." a fost `needs-reply` — REPLY_TEXT a potrivit pe
„Opportunity" din corp, iar „LinkedIn" trecea de testul „de la o persoană".
*Regulă:* platformele de job sunt excluse din `needs-reply`, iar alerta se
recunoaște după **marcajul ei**, nu după numele platformei — altfel „134 people
viewed" ar fi clasificat ca job.

**Când subiectul numește un job anume, relevanța se judecă pe subiect.** Corpul
alertelor Jooble e o listă generică de 100+ joburi (conține și roluri de design),
deci „PRIM-AUDIT caută Auditor Financiar" apărea de design.

**Regex cu diacritice: fără `\b`** (`\b` e ASCII).

**O adresă lipsă din anunț se găsește pe pagina companiei** (`rel/<firma>?t=info`) —
așa a rezolvat Cohn & Jansen: 5 zile în „verdict amânat" → #1 cu 9,6. **Guard:**
adresa se aplică DOAR dacă firma din anunț corespunde paginii.
