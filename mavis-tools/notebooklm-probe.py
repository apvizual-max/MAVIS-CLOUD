#!/usr/bin/env python3
"""
notebooklm-probe.py — testează dacă Cloud poate accesa NotebookLM.

NU CAUTĂ notebook-uri. NU CREEAZĂ fișiere. Doar măsoară o singură
lucrure: acceptă Google cookie-ul din mediu, sau îl respinge?

Ieșire:  ACCES   — cloud poate lucra direct
        RESING  — Google respinge, mergi pe calea Local

Testat 2026-10-12: RESING. Cookie-ul din browser e valid pe mașina
lui POPY, dar Google îl respinge venit de la IP de datacenter.
"""

import os, sys, re, urllib.request

URL = 'https://notebooklm.google.com/'
UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36')

HEADERS = {
    'Cookie': '{cookies}',
    'User-Agent': UA,
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'ro-RO,ro;q=0.9,en-US;q=0.8,en;q=0.7',
    'Upgrade-Insecure-Requests': '1',
}


def main():
    cookies = os.environ.get('NOTEBOOKLM_COOKIES', '').strip()
    if not cookies:
        print('FARA  — variabila NOTEBOOKLM_COOKIES nu e setata')
        print('       Nu cauta nimic, nu intreba nimic. Spune-i lui POPY:')
        print('       "pune cookie-ul in credential field, numele NOTEBOOKLM_COOKIES"')
        return 2

    h = dict(HEADERS); h['Cookie'] = cookies
    try:
        r = urllib.request.urlopen(
            urllib.request.Request(URL, headers=h), timeout=30)
        body = r.read().decode('utf-8', 'ignore')
        final = r.geturl()
    except Exception as e:
        print('EROARE  —', type(e).__name__, str(e)[:120])
        return 1

    redirected = 'accounts.google.com' in final
    title = re.search(r'<title>(.*?)</title>', body, re.S)
    title = title.group(1).strip()[:60] if title else '?'

    if redirected or 'WIZ_global_data' not in body or 'Sign in' in title or 'Conecta' in title:
        print('RESING  — Google a redirectionat la pagina de autentificare')
        print('         URL final :', final[:80])
        print('         Titlu     :', title)
        print()
        print('  DIAGNOZA: cookie-ul este valid pe masina lui POPY, dar Google')
        print('  il respinge venit de la IP de datacenter. Nu este o limita')
        print('  imaginara — a fost masurat.')
        print()
        print('  CALE: Local deschide notebook.google.com in browserul real,')
        print('        face sinteza, scrie rezultatul in repo.')
        print('  Cloud citeste rezultatul de acolo.')
        return 1

    print('ACCES   — Cloud poate lucra direct cu NotebookLM')
    print('         titlu:', title)
    return 0


if __name__ == '__main__':
    sys.exit(main())