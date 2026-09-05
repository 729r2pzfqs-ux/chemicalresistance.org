#!/usr/bin/env python3
"""Generate meta-refresh redirect stubs for every legacy URL that would 404.

data/legacy_urls.txt lists every page path that ever existed on the site and
was later deleted (mined from git history). Most are old German-slug chemical
URLs from the original Bürkle-database era:

    chemicals/<german-slug>/index.html
    chemicals/<german-slug>/<material>/index.html
    chemicals/<material>/<german-slug>.html
    <material>/<chemical>.html   and   <material>/<chemical>/index.html
    chemicals/<english-slug>.html            (old flat pages)

GitHub Pages cannot serve real 301s, so each gets a noindex meta-refresh stub
(same approach as the existing pair-page stubs). Targets are chosen in order:

  1. /chemicals/<en>/<material>/  when the German name maps to a live English
     chemical page (via translate_to_english + data/chemical_names_en_overrides.json)
     and that pair page exists
  2. /chemicals/<en>/ or /materials/<material>/ when only one side resolves
  3. /chemicals/ as the last resort

The script is idempotent: paths that already resolve to a file are skipped, so
re-running it after adding real pages never overwrites content.
"""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from translate_to_english import translate_chemical_name

MATS = {'acetal-pom', 'aluminium', 'ectfe-etfe', 'epdm', 'fep', 'hdpe', 'ldpe',
        'nbr', 'nylon-pa', 'petg', 'pmp', 'polycarbonate', 'polystyrene',
        'polysulfone', 'pp', 'ptfe', 'pvc-flexible', 'pvc-rigid', 'pvdf', 'san',
        'silicone', 'ss316', 'ss304', 'stainless-steel-304', 'viton'}

# Old English slugs that were later renamed
SLUG_ALIASES = {
    'gasoline': 'gasoline-petrol',
    'tetrahydrofuran-thf': 'thf',
    'white-spirit': 'turpentine-substitute',
}

# One-off legacy pages with no same-named directory to fall back on
MISC_TARGETS = {
    'ghs-symbols.html': '/sds-decoder/',
    'materials/ss304.html': '/materials/stainless-steel-304/',
    'charts/hdpe-compatibility-chart/index.html': '/materials/hdpe/',
    'charts/nbr-compatibility-chart/index.html': '/materials/nbr/',
    'charts/ptfe-compatibility-chart/index.html': '/materials/ptfe/',
    'charts/ss316-compatibility-chart/index.html': '/materials/ss316/',
}

STUB = '''<html><head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LTK6VVHYDW"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag("js",new Date());gtag("config","G-LTK6VVHYDW");</script><meta http-equiv="refresh" content="0;url=https://chemicalresistance.org{target}"><link rel="canonical" href="https://chemicalresistance.org{target}">
    <meta name="robots" content="noindex,follow"></head><body><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{{"token": "cba547e85ee54e0f9cdc27e68405eead"}}'></script>
</body></html>'''


def slugify(name):
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')


def is_stub(path):
    """True when path is itself a meta-refresh redirect stub."""
    try:
        with open(path, encoding='utf-8', errors='replace') as f:
            return 'http-equiv="refresh"' in f.read(600)
    except OSError:
        return False


def is_live_page(path):
    return os.path.isfile(path) and not is_stub(path)


def build_chem_map():
    """Map every historical chemical slug (German or renamed English) to the
    slug of a live English chemical page. Directories whose index is itself a
    redirect stub are not live pages — counting them would chain redirects."""
    en_dirs = {d for d in os.listdir('chemicals')
               if is_live_page(os.path.join('chemicals', d, 'index.html'))}
    dehyphenated = {d.replace('-', ''): d for d in en_dirs}

    names = set()
    for src in ('data/chemicals_burkle_full.json', 'data/chemicals.json'):
        with open(src, encoding='utf-8') as f:
            names.update(c['name'] for c in json.load(f))

    chem_map = {}
    for name in sorted(names):
        de_slug = slugify(name)
        en_slug = slugify(translate_chemical_name(name))
        live = en_slug if en_slug in en_dirs else dehyphenated.get(en_slug.replace('-', ''))
        if live:
            chem_map.setdefault(de_slug, live)
    for old, new in SLUG_ALIASES.items():
        if new in en_dirs:
            chem_map[old] = new
    return en_dirs, chem_map


def classify(path):
    """Return (kind, chem_slug, material_slug) for a legacy path."""
    seg = path.split('/')
    if seg[0] == 'chemicals':
        if len(seg) == 2:
            return 'chem', seg[1][:-5], None
        if len(seg) == 3 and seg[2] == 'index.html':
            if seg[1] in MATS:
                return 'mat_index', None, seg[1]
            return 'chem', seg[1], None
        if len(seg) == 3:
            if seg[1] in MATS:
                return 'pair', seg[2][:-5], seg[1]
            return 'chem', seg[1], None
        if len(seg) == 4 and seg[2] in MATS and seg[3] == 'index.html':
            return 'pair', seg[1], seg[2]
        if len(seg) == 4 and seg[1] in MATS and seg[3] == 'index.html':
            return 'pair', seg[2], seg[1]
        return 'misc', None, None
    if seg[0] in MATS:
        if len(seg) == 2:
            return 'pair', seg[1][:-5], seg[0]
        if len(seg) == 3 and seg[2] == 'index.html':
            return 'pair', seg[1], seg[0]
    return 'misc', None, None


def resolve_target(path, en_dirs, chem_map):
    kind, chem, mat = classify(path)
    if chem:
        chem = chem if chem in en_dirs else chem_map.get(chem)
    if kind == 'pair':
        if chem and is_live_page(f'chemicals/{chem}/{mat}/index.html'):
            return f'/chemicals/{chem}/{mat}/'
        if is_live_page(f'materials/{mat}/index.html'):
            return f'/materials/{mat}/'
        return '/chemicals/'
    if kind == 'chem':
        return f'/chemicals/{chem}/' if chem else '/chemicals/'
    if kind == 'mat_index':
        return f'/materials/{mat}/'
    # misc: prefer the directory form of the same page
    base = path[:-5] if path.endswith('.html') else path
    base = base[:-6] if base.endswith('/index') else base
    if is_live_page(f'{base}/index.html'):
        return f'/{base}/'
    return MISC_TARGETS.get(path)


def main():
    with open('data/legacy_urls.txt', encoding='utf-8') as f:
        legacy = [l.strip() for l in f if l.strip()]

    en_dirs, chem_map = build_chem_map()

    # Google also crawled a /chemicals/<material>/<chemical> matrix that git
    # history only partially records (e.g. /chemicals/silicone/naphtha), so
    # expand the legacy list with the full matrix over the old top-level
    # material trees' chemical set.
    old_mat_chems = set()
    for path in legacy:
        seg = path.split('/')
        if seg[0] in MATS and len(seg) in (2, 3):
            chem = seg[1][:-5] if seg[1].endswith('.html') else seg[1]
            old_mat_chems.add(chem)
    extra = []
    for mat in MATS:
        for chem in old_mat_chems:
            extra.append(f'chemicals/{mat}/{chem}.html')
            extra.append(f'chemicals/{mat}/{chem}/index.html')
            extra.append(f'{mat}/{chem}.html')
            extra.append(f'{mat}/{chem}/index.html')

    written = skipped = 0
    unmapped = []
    for path in legacy + extra:
        if os.path.isfile(path):
            skipped += 1
            continue
        target = resolve_target(path, en_dirs, chem_map)
        if not target:
            unmapped.append(path)
            continue
        os.makedirs(os.path.dirname(path) or '.', exist_ok=True)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(STUB.format(target=target))
        written += 1

    print(f'wrote {written} redirect stubs, skipped {skipped} live paths')
    if unmapped:
        print(f'{len(unmapped)} paths had no target and were NOT written:')
        for p in unmapped:
            print(' ', p)


if __name__ == '__main__':
    main()
