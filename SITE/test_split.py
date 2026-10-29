"""Teste pentru SEPARAREA site-urilor (2026-10-29).

Regula pe care o aparam:
  - fiecare rol CV e un SITE AUTONOM, cu index.html la radacina;
  - panoul NU contine copii ale paginilor CV - doar legaturi;
  - panoul isi ia lista de site-uri de la sursa (registrul), nu din interior.

Daca un test pică, nu se mai face deploy: o copie intoarsa in panou inseamna
ca sursa si panoul arata doua realitati diferite.
"""
import json
import os
import sys
import unittest
import importlib.util

BASE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE)
import build


def incarca_build_hub():
    cale = os.path.join(BASE, 'build-hub.py')
    spec = importlib.util.spec_from_file_location('build_hub', cale)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


class TestSeparare(unittest.TestCase):
    def test_registrul_e_json_valid(self):
        reg = build.load_registry()
        self.assertIn('sites', reg)
        for s in reg['sites']:
            for k in ('slug', 'titlu', 'url'):
                self.assertIn(k, s, 'site fara %s' % k)

    def test_site_cv_are_index_la_radacina(self):
        folder, index, _, _ = build.build_site('graphic-designer')
        self.assertTrue(os.path.isfile(index), 'CV site fara index.html')
        self.assertEqual(os.path.basename(index), 'index.html')
        self.assertEqual(os.path.basename(folder), 'graphic-designer')
        reg = os.path.join(folder, 'cv-sites.json')
        self.assertTrue(os.path.isfile(reg), 'CV site fara cv-sites.json')
        with open(reg, encoding='utf-8') as f:
            json.load(f)

    def test_panoul_nu_embedeaza_pagina_cv(self):
        hub = incarca_build_hub()
        out, _, _, _, _ = hub.main()
        with open(out, encoding='utf-8') as f:
            html = f.read()
        # niciun iframe/legatura catre o copie locala a paginii CV
        self.assertNotIn('graphic-designer.index.html', html)
        self.assertNotIn('src="graphic-designer', html)
        # in schimb: legatura + previzualizare incarcata de pe server
        self.assertIn('cv-frame', html)
        self.assertIn('cv-list', html)
        self.assertIn('fetch(', html)

    def test_panoul_nu_are_pagini_cv_in_dist(self):
        import glob
        hub = incarca_build_hub()
        hub.main()
        rest = glob.glob(os.path.join(BASE, 'dist', '*.index.html'))
        self.assertEqual(rest, [], 'panoul contine inca copii de pagini CV: %s' % rest)


if __name__ == '__main__':
    unittest.main()
