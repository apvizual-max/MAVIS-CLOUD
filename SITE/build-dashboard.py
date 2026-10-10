#!/usr/bin/env python3
"""Pagina de bord - tot ce exista, descris intr-un loc, deschis in browser.

    python3 SITE/build-dashboard.py
    deschide SITE/dist/index.html

POPY nu are acces la fisiere, doar la imagini. Asta-i rezolva.
"""
import os, json, subprocess, glob, datetime

BASE = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(BASE, 'dist')
REPO = os.path.dirname(BASE)

def sh(c, cwd=REPO):
    try:
        return subprocess.run(c, shell=True, cwd=cwd, capture_output=True,
                              text=True, timeout=25).stdout.strip()
    except Exception:
        return ''

def du(p):
    r = sh('du -sh "%s" 2>/dev/null | cut -f1' % p)
    return r or '-'

def main():
    os.makedirs(DIST, exist_ok=True)

    # site-uri de CV
    sites = sorted(glob.glob(os.path.join(DIST, '*.index.html')))
    site_rows = ''
    for s in sites:
        slug = os.path.basename(s).replace('.index.html', '')
        site_rows += ('<tr><td><a href="%s">%s</a></td><td class="mono">HTML gata</td>'
                      '<td>deschide in browser</td></tr>\n' % (os.path.basename(s), slug))

    # skill-uri
    skills = sorted(d for d in glob.glob(os.path.join(REPO, '.skills', '*'))
                    if os.path.isdir(d))
    vendor = sorted(d for d in glob.glob(os.path.join(REPO, 'vendor', '*'))
                    if os.path.isdir(d))
    skill_rows = ''
    for s in skills:
        n = os.path.basename(s)
        f = os.path.join(s, 'SKILL.md')
        desc = ''
        if os.path.exists(f):
            for line in open(f, encoding='utf-8'):
                if line.startswith('description:'):
                    desc = line.split(':', 1)[1].strip()[:120]; break
        src = 'vendor' if n in [os.path.basename(v) for v in vendor] else 'propriu'
        skill_rows += ('<tr><td class="mono">%s</td><td>%s</td>'
                       '<td><span class="tag">%s</span></td></tr>\n' % (n, desc, src))

    # sabloane
    sab = sorted(glob.glob(os.path.join(REPO, 'ALEX-KIT', 'SABLOANE', '*.md')))
    sab_rows = ''.join('<li class="mono">%s</li>' % os.path.basename(s) for s in sab)

    # CV-uri
    cvs = sorted(glob.glob(os.path.join(REPO, 'ALEX-KIT', 'CV-URI', '*.docx')))
    cv_rows = ''.join('<li class="mono">%s</li>' % os.path.basename(c) for c in cvs)

    # documente
    docs = sorted(glob.glob(os.path.join(REPO, 'docs', '*.md')))
    doc_rows = ''.join('<tr><td><a href="../docs/%s">%s</a></td></tr>\n'
                       % (os.path.basename(d), os.path.basename(d)) for d in docs)

    # git
    last = sh('git log --oneline -1')
    ncommits = sh('git rev-list --count HEAD') or '0'
    branch = sh('git rev-parse --abbrev-ref HEAD') or 'main'
    dirty = sh('git status --porcelain | wc -l') or '0'

    n = len(skills) + len(vendor)

    html = f"""<!DOCTYPE html>
<html lang="ro"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Mavis · Panou de bord</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
*{{box-sizing:border-box;margin:0;padding:0}}
body{{background:#0b0f19;color:#f8fafc;font-family:'Inter',sans-serif;line-height:1.6;padding:0 0 80px}}
.wrap{{max-width:1100px;margin:0 auto;padding:0 24px}}
header{{padding:64px 0 32px;border-bottom:1px solid #1e293b;margin-bottom:36px}}
h1{{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;letter-spacing:-.03em;line-height:1.05}}
h1 span{{background:linear-gradient(120deg,#14b8a6,#67e8f9);-webkit-background-clip:text;background-clip:text;color:transparent}}
.sub{{color:#94a3b8;margin-top:12px;font-size:1.02rem}}
.mono{{font-family:'JetBrains Mono',monospace;font-size:12.5px}}
a{{color:#14b8a6;text-decoration:none}} a:hover{{text-decoration:underline}}
h2{{font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;color:#f8fafc;
   font-weight:800;margin:44px 0 16px;padding-bottom:9px;border-bottom:1px solid #1e293b}}
.grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:8px}}
.card{{background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:18px}}
.card .n{{font-size:1.9rem;font-weight:800;color:#14b8a6;line-height:1}}
.card .l{{font-size:11.5px;color:#64748b;margin-top:6px;text-transform:uppercase;letter-spacing:.07em;font-weight:700}}
table{{width:100%;border-collapse:collapse;font-size:13.5px}}
th{{text-align:left;font-size:10.5px;letter-spacing:.11em;text-transform:uppercase;color:#64748b;
   padding:9px 12px;border-bottom:1px solid #1e293b;font-weight:800}}
td{{padding:10px 12px;border-bottom:1px solid #131c2e;vertical-align:top}}
tr:hover td{{background:rgba(20,184,166,.035)}}
.tag{{font-size:10px;font-weight:800;padding:3px 8px;border-radius:5px;
     background:rgba(20,184,166,.12);color:#14b8a6;border:1px solid rgba(20,184,166,.3);
     text-transform:uppercase;letter-spacing:.05em}}
.tag.warn{{background:rgba(251,191,36,.1);color:#fbbf24;border-color:rgba(251,191,36,.3)}}
ul{{list-style:none;display:grid;gap:6px}}
li{{padding:9px 13px;background:#0f172a;border:1px solid #1e293b;border-radius:8px}}
.note{{padding:14px 17px;border-radius:11px;border:1px solid rgba(251,191,36,.25);
       background:rgba(251,191,36,.05);color:#94a3b8;font-size:13.5px;margin-top:16px}}
.note b{{color:#fbbf24}}
.ok{{padding:14px 17px;border-radius:11px;border:1px solid rgba(20,184,166,.25);
     background:rgba(20,184,166,.05);color:#94a3b8;font-size:13.5px;margin-top:16px}}
.ok b{{color:#14b8a6}}
.btn{{display:inline-block;padding:11px 20px;background:#14b8a6;color:#04211e;
      border-radius:9px;font-weight:800;font-size:14px;margin:8px 8px 0 0}}
.btn:hover{{background:#0d9488;text-decoration:none;color:#04211e}}
</style></head><body>
<div class="wrap">

<header>
  <h1>Mavis · <span>Tot ce există</span></h1>
  <p class="sub">Panou de bord generat {datetime.date.today()}<br>
  Repo <a href="https://github.com/apvizual-max/Mavis">apvizual-max/Mavis</a> ·
  ramura <code class="mono">{branch}</code> · {ncommits} commit-uri</p>
  <p><span class="tag">{'totul comitat' if dirty=='0' else str(dirty)+' necomitat'}</span></p>
</header>

<h2>Sumar</h2>
<div class="grid">
  <div class="card"><div class="n">{n}</div><div class="l">skill-uri</div></div>
  <div class="card"><div class="n">{len(sites)}</div><div class="l">site-uri de CV</div></div>
  <div class="card"><div class="n">{len(sab)}</div><div class="l">șabloane CV</div></div>
  <div class="card"><div class="n">{len(cvs)}</div><div class="l">CV-uri Word</div></div>
  <div class="card"><div class="n">{len(docs)}</div><div class="l">documente</div></div>
</div>

<h2>Deschide astea</h2>
<p><a class="btn" href="graphic-designer.index.html">Site de CV — Graphic Designer</a></p>
<div class="ok"><b>Site-ul e complet funcțional.</b> Trei tab-uri, navigare cu tastele
1 · 2 · 3, interacțiuni cu mouse-ul. Se deschide direct din browser, fără server.</div>

<h2>Site-uri de CV</h2>
<table><thead><tr><th>Rol</th><th>Stare</th><th>Cum îl deschizi</th></tr></thead>
<tbody>
{site_rows or '<tr><td colspan="3">niciunul</td></tr>'}
</tbody></table>
<div class="note"><b>Se construiește din date, nu din HTML.</b> Ca să adaugi un rol
nou, scrii un fișier JSON și rulezi <code class="mono">python3 SITE/build.py nume-rol</code>.
UI-ul nu se atinge niciodată.</div>

<h2>Șabloane CV — generice, zero nume de firmă</h2>
<ul>{sab_rows or '<li>nepopulate</li>'}</ul>

<h2>CV-uri Word</h2>
<ul>{cv_rows or '<li>nepopulate</li>'}</ul>
<div class="note"><b>Astea au fost generate cu date particulare.</b> Urmează
regenerarea din șabloane, ca să nu se piardă munca la o firmă și să se refacă la alta.</div>

<h2>Skill-uri</h2>
<table><thead><tr><th>Nume</th><th>Ce face</th><th>Origine</th></tr></thead>
<tbody>
{skill_rows}
</tbody></table>

<h2>Documentație</h2>
<table><tbody>
{doc_rows}
</tbody></table>

<h2>Ultimul commit</h2>
<p class="mono" style="color:#94a3b8">{last}</p>

</div></body></html>"""

    out = os.path.join(DIST, 'index.html')
    open(out, 'w', encoding='utf-8').write(html)
    return out, len(sites), n

if __name__ == '__main__':
    p, s, n = main()
    print('OK  %s' % p)
    print('    %d site-uri, %d skill-uri' % (s, n))
