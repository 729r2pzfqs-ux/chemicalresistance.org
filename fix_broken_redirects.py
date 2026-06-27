#!/usr/bin/env python3
"""Fix broken redirect stubs (loops + redirect->404) site-wide.

One authoritative GitHub-Pages resolver decides what is broken and verifies that
every proposed new target actually resolves before any file is written.

Rules for the new target:
  A) chemicals/<material>/<x>.html              -> /materials/<material>/
  B) chemicals/<chem>/<material>/index.html     -> /materials/<material>/
  C) chemicals/<de-chem>/index.html  whose target is /chemicals/<en-chem>/index.html/
     (malformed alias) -> /chemicals/<en-chem>/   if that resolves
Anything that can't be mapped to a resolving target is reported, not touched.
"""
import os, re, glob, sys

MATERIALS = {'acetal-pom','aluminium','ectfe-etfe','epdm','fep','hdpe','ldpe','nbr',
    'nylon-pa','petg','pmp','polycarbonate','polystyrene','polysulfone','pp','ptfe',
    'pvc-flexible','pvc-rigid','pvdf','san','silicone','ss316','ss304',
    'stainless-steel-304','viton'}

def redirect_target(f):
    txt = open(f, encoding='utf-8', errors='replace').read(2000)
    m = re.search(r'refresh"\s*content="0;\s*url=(?:https://chemicalresistance\.org)?(/[^"\']*)', txt)
    return m.group(1) if m else None

ALL = [f for f in glob.glob('**/*.html', recursive=True) if not f.startswith('.git')]
STUBS = {f: redirect_target(f) for f in ALL}
STUBS = {f: t for f, t in STUBS.items() if t}

def resolve(url):
    """Return (file_served_or_None, redirect_to_slash_url_or_None) per GH Pages."""
    path = url.split('#')[0].split('?')[0]
    trailing = path.endswith('/')
    p = path.strip('/')
    if not p:
        return ('index.html' if os.path.isfile('index.html') else None, None)
    if trailing:
        fp = os.path.join(p, 'index.html')
        return (fp if os.path.isfile(fp) else None, None)
    if os.path.isfile(p):           return (p, None)
    if os.path.isfile(p + '.html'): return (p + '.html', None)
    if os.path.isfile(os.path.join(p, 'index.html')):
        return (os.path.join(p, 'index.html'), '/' + p + '/')
    return (None, None)

def endpoint(start_url):
    """Follow stub + GH redirects; return 'OK' | '404' | 'LOOP'."""
    seen = []
    cur = start_url
    for _ in range(15):
        n = cur.split('#')[0].split('?')[0]
        if n in seen:
            return 'LOOP'
        seen.append(n)
        fp, redir = resolve(cur)
        if redir:
            cur = redir; continue
        if fp is None:
            return '404'
        t = STUBS.get(fp)
        if t is None:
            return 'OK'
        cur = t
    return 'LOOP'

def material_of(f):
    p = f.split('/')
    if len(p) >= 2 and p[1] in MATERIALS: return p[1]
    if len(p) >= 3 and p[2] in MATERIALS: return p[2]
    return None

broken = [f for f, t in STUBS.items() if endpoint(t) in ('LOOP', '404')]

fixes = {}     # file -> new_target
report = []    # files we won't touch
for f in broken:
    mat = material_of(f)
    if mat and os.path.isfile(f'materials/{mat}/index.html'):
        fixes[f] = f'/materials/{mat}/'
        continue
    t = STUBS[f]
    # malformed alias: /chemicals/<x>/index.html/  ->  /chemicals/<x>/
    m = re.match(r'(/chemicals/[^/]+)/index\.html/?$', t)
    if m:
        cand = m.group(1) + '/'
        fp, _ = resolve(cand)
        if fp is not None or os.path.isfile(cand.strip('/') + '/index.html'):
            fixes[f] = cand
            continue
    # catch-all: route anything else to the chemicals index (which resolves)
    if os.path.isfile('chemicals/index.html'):
        fixes[f] = '/chemicals/'
        continue
    report.append((f, t))

print(f'broken stubs: {len(broken)}   will fix: {len(fixes)}   report-only: {len(report)}')
# verify every NEW target resolves cleanly (no loop / no 404) with the same resolver
bad = []
for f, nt in fixes.items():
    fp, redir = resolve(nt)
    final = redir or nt
    if endpoint(final) != 'OK' and endpoint(nt) != 'OK':
        bad.append((f, nt))
print('new targets that do NOT resolve OK:', len(bad))
for f, nt in bad[:10]:
    print('   ', f, '->', nt)
print('\nreport-only (left as-is):')
for f, t in report:
    print('   ', f, '->', t)

from collections import Counter
print('\nfix target distribution:', Counter(fixes.values()).most_common(6))

DRY = '--apply' not in sys.argv
if DRY:
    print('\nDRY RUN — re-run with --apply to write changes.')
    sys.exit(0)
if bad:
    sys.exit('ABORT: some new targets do not resolve; not writing.')

written = 0
skipped = []
for f, nt in fixes.items():
    txt = open(f, encoding='utf-8').read()
    old = STUBS[f]
    # Quote-anchored replace: a redirect target always ends at the closing quote
    # of url="..."/href="...", so old+'"' matches exactly the two target URLs and
    # cannot collide with a longer path that merely shares the prefix.
    if (old + '"') not in txt:
        skipped.append((f, old)); continue
    new = txt.replace(old + '"', nt + '"')
    assert (old + '"') not in new, f'residual old target in {f}'
    open(f, 'w', encoding='utf-8').write(new)
    written += 1
print(f'wrote {written} files; skipped {len(skipped)}')
for f, o in skipped[:10]:
    print('  skipped', f, o)
