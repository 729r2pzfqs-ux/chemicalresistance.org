#!/usr/bin/env python3
"""Generate material × chemical pair pages"""

import json
import os
import re

MATERIAL_INFO = {
    'AL': {'name': 'Aluminium', 'slug': 'aluminium'},
    'ECTFE_ETFE': {'name': 'ECTFE/ETFE', 'slug': 'ectfe-etfe'},
    'EPDM': {'name': 'EPDM', 'slug': 'epdm'},
    'FEP': {'name': 'FEP', 'slug': 'fep'},
    'FPM': {'name': 'Viton', 'slug': 'viton'},
    'HDPE': {'name': 'HDPE', 'slug': 'hdpe'},
    'LDPE': {'name': 'LDPE', 'slug': 'ldpe'},
    'NBR': {'name': 'NBR', 'slug': 'nbr'},
    'PA': {'name': 'Nylon', 'slug': 'nylon-pa'},
    'PC': {'name': 'Polycarbonate', 'slug': 'polycarbonate'},
    'PETG': {'name': 'PETG', 'slug': 'petg'},
    'PMP': {'name': 'PMP', 'slug': 'pmp'},
    'POM': {'name': 'Acetal', 'slug': 'acetal-pom'},
    'PP': {'name': 'Polypropylene', 'slug': 'pp'},
    'PS': {'name': 'Polystyrene', 'slug': 'polystyrene'},
    'PSU': {'name': 'Polysulfone', 'slug': 'polysulfone'},
    'PTFE': {'name': 'PTFE', 'slug': 'ptfe'},
    'PVC_HART': {'name': 'PVC Rigid', 'slug': 'pvc-rigid'},
    'PVC_WEICH': {'name': 'PVC Flexible', 'slug': 'pvc-flexible'},
    'PVDF': {'name': 'PVDF', 'slug': 'pvdf'},
    'SAN': {'name': 'SAN', 'slug': 'san'},
    'SI': {'name': 'Silicone', 'slug': 'silicone'},
    'V2A': {'name': 'Stainless Steel 304', 'slug': 'stainless-steel-304'},
    'V4A': {'name': 'Stainless Steel 316', 'slug': 'ss316'},
}

def slugify(name):
    slug = name.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    return slug.strip('-')

def rating_to_grade(r):
    return {'1': 'A', '2': 'B', '3': 'C', '4': 'D'}.get(r, 'NR')

def grade_to_text(g):
    return {
        'A': ('Excellent', 'is highly resistant to', '#22c55e'),
        'B': ('Good', 'has good resistance to', '#3b82f6'),
        'C': ('Limited', 'has limited resistance to', '#f59e0b'),
        'D': ('Not Recommended', 'is not recommended for use with', '#ef4444'),
        'NR': ('No Data', 'has no resistance data for', '#9ca3af'),
    }.get(g, ('Unknown', '', '#9ca3af'))

def generate_pair_page(mat_code, mat_info, chem_data):
    chem_name = chem_data.get('name_en', chem_data.get('name', ''))
    chem_slug = slugify(chem_name)
    mat_name = mat_info['name']
    mat_slug = mat_info['slug']
    
    ratings = chem_data.get('ratings', {})
    rating = ratings.get(mat_code, {})
    c20 = rating_to_grade(rating.get('c20', '0'))
    c50 = rating_to_grade(rating.get('c50', '0'))
    
    grade_text, grade_verb, grade_color = grade_to_text(c20)
    cas = chem_data.get('cas', '')
    
    # Find other materials for comparison
    other_mats = []
    for m_code, m_info in MATERIAL_INFO.items():
        if m_code != mat_code and m_code in ratings:
            r = ratings[m_code]
            other_mats.append({
                'name': m_info['name'],
                'slug': m_info['slug'],
                'c20': rating_to_grade(r.get('c20', '0')),
            })
    other_mats = sorted(other_mats, key=lambda x: ('ABCDNR'.index(x['c20'][0]) if x['c20'] else 5, x['name']))[:8]
    
    comparison_links = ''.join([
        f'<a href="../{m["slug"]}/{chem_slug}" class="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 hover:border-emerald-500">'
        f'<span class="font-medium text-gray-700">{m["name"]}</span>'
        f'<span class="rating-{m["c20"]} px-2 py-1 rounded text-sm">{m["c20"]}</span></a>'
        for m in other_mats
    ])
    
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-LTK6VVHYDW"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag('js',new Date());gtag('config','G-LTK6VVHYDW');</script>
    <title>{mat_name} vs {chem_name} | Chemical Resistance</title>
    <meta name="description" content="Is {mat_name} resistant to {chem_name}? {grade_text} resistance rating at 20°C. Full compatibility data with temperature comparison.">
    <link rel="icon" href="../../favicon.ico">
    <link rel="canonical" href="https://chemicalresistance.org/{mat_slug}/{chem_slug}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        *{{font-family:'Inter',sans-serif}}body{{background:#f8fafc}}
        .rating-A{{background:#22c55e;color:white}}.rating-B{{background:#3b82f6;color:white}}
        .rating-C{{background:#f59e0b;color:white}}.rating-D{{background:#ef4444;color:white}}
        .rating-NR{{background:#e5e7eb;color:#9ca3af}}
    </style>
</head>
<body class="text-gray-700 min-h-screen">
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="../../index.html" class="flex items-center gap-2">
                <img src="../../logos/logo-icon-128x128.png" alt="ChemicalResistance" class="w-10 h-10 rounded-xl">
                <div>
                    <div class="font-bold text-gray-900">ChemicalResistance.org</div>
                    <div class="text-xs text-gray-500">Chemical compatibility database</div>
                </div>
            </a>
            <a href="../../index.html" class="text-gray-600 hover:text-gray-900 text-sm">← Back to Search</a>
        </div>
    </header>

    <section class="bg-gradient-to-b from-emerald-50 to-white px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <div class="flex items-center gap-2 text-sm text-emerald-600 mb-3">
                <a href="../../index.html" class="hover:underline">Home</a>
                <span>›</span>
                <a href="../../materials/{mat_slug}" class="hover:underline">{mat_name}</a>
                <span>›</span>
                <span class="text-gray-600">{chem_name}</span>
            </div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {mat_name} + {chem_name}
            </h1>
            <p class="text-lg text-gray-600">
                <strong>{mat_name}</strong> {grade_verb} <strong>{chem_name}</strong>.
            </p>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <h2 class="text-xl font-bold text-gray-900 mb-4">Compatibility Rating</h2>
                <div class="grid grid-cols-2 gap-6">
                    <div class="text-center p-6 bg-gray-50 rounded-xl">
                        <div class="text-sm text-gray-500 mb-2">At 20°C</div>
                        <div class="inline-block rating-{c20} text-3xl font-bold px-6 py-3 rounded-xl">{c20}</div>
                        <div class="mt-2 text-sm font-medium" style="color:{grade_color}">{grade_text}</div>
                    </div>
                    <div class="text-center p-6 bg-gray-50 rounded-xl">
                        <div class="text-sm text-gray-500 mb-2">At 50°C</div>
                        <div class="inline-block rating-{c50} text-3xl font-bold px-6 py-3 rounded-xl">{c50}</div>
                        <div class="mt-2 text-sm font-medium">{grade_to_text(c50)[0]}</div>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <h2 class="text-xl font-bold text-gray-900 mb-4">Rating Scale</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div class="flex items-center gap-2"><span class="rating-A px-2 py-1 rounded text-sm">A</span> Excellent resistance</div>
                    <div class="flex items-center gap-2"><span class="rating-B px-2 py-1 rounded text-sm">B</span> Good resistance</div>
                    <div class="flex items-center gap-2"><span class="rating-C px-2 py-1 rounded text-sm">C</span> Limited use only</div>
                    <div class="flex items-center gap-2"><span class="rating-D px-2 py-1 rounded text-sm">D</span> Not recommended</div>
                </div>
            </div>

            {f'<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"><h2 class="text-xl font-bold text-gray-900 mb-4">Compare Other Materials</h2><div class="grid grid-cols-2 md:grid-cols-4 gap-3">{comparison_links}</div></div>' if comparison_links else ''}
        </div>
    </section>

    <section class="px-4 py-8 bg-gray-50">
        <div class="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
            <a href="../../materials/{mat_slug}" class="bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-emerald-500 text-sm font-medium">
                View all {mat_name} compatibility →
            </a>
            <a href="../../chemicals/{chem_slug}" class="bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-emerald-500 text-sm font-medium">
                View all {chem_name} compatibility →
            </a>
        </div>
    </section>

    <footer class="bg-gray-900 text-gray-400 px-4 py-8 text-center text-sm">
        <p>© 2026 ChemicalResistance.org — Always verify with your supplier.</p>
    </footer>
</body>
</html>'''
    
    return html

def main():
    with open('data/chemicals_burkle_full.json', 'r') as f:
        chemicals = json.load(f)
    
    # Get existing chemical pages
    existing_chems = set()
    for f in os.listdir('chemicals'):
        if f.endswith('.html') and f != 'index.html':
            existing_chems.add(f.replace('.html', ''))
    
    print(f"Found {len(existing_chems)} chemical pages")
    
    # Build lookup
    chem_by_slug = {}
    for c in chemicals:
        name = c.get('name_en', c.get('name', ''))
        slug = slugify(name)
        if slug in existing_chems:
            chem_by_slug[slug] = c
    
    print(f"Matched {len(chem_by_slug)} chemicals")
    
    generated = 0
    for mat_code, mat_info in MATERIAL_INFO.items():
        mat_slug = mat_info['slug']
        os.makedirs(mat_slug, exist_ok=True)
        
        for chem_slug, chem_data in chem_by_slug.items():
            ratings = chem_data.get('ratings', {})
            if mat_code not in ratings:
                continue
            
            html = generate_pair_page(mat_code, mat_info, chem_data)
            output = f'{mat_slug}/{chem_slug}.html'
            
            with open(output, 'w') as f:
                f.write(html)
            
            generated += 1
        
        print(f"✅ {mat_info['name']}: {len([c for c in chem_by_slug.values() if mat_code in c.get('ratings', {})])} pairs")
    
    print(f"\n✅ Generated {generated} pair pages")

if __name__ == '__main__':
    main()
