#!/usr/bin/env python3
"""Generate top 100 chemical pages for ChemicalResistance.org"""

import json
import os
import re

# Top 100 most searched chemicals (common industrial/lab chemicals)
TOP_CHEMICALS = [
    'Sulfuric Acid', 'Hydrochloric Acid', 'Nitric Acid', 'Acetic Acid', 'Phosphoric Acid',
    'Sodium Hydroxide', 'Potassium Hydroxide', 'Ammonia', 'Hydrogen Peroxide', 'Acetone',
    'Methanol', 'Ethanol', 'Isopropanol', 'Toluene', 'Xylene',
    'Benzene', 'Chloroform', 'Dichloromethane', 'Acetonitrile', 'Formaldehyde',
    'Formic Acid', 'Citric Acid', 'Lactic Acid', 'Oxalic Acid', 'Hydrofluoric Acid',
    'Sodium Hypochlorite', 'Bleach', 'Diesel', 'Gasoline', 'Kerosene',
    'Mineral Oil', 'Hydraulic Oil', 'Motor Oil', 'Glycerin', 'Ethylene Glycol',
    'Propylene Glycol', 'Urea', 'Sodium Chloride', 'Calcium Chloride', 'Ferric Chloride',
    'Copper Sulfate', 'Zinc Chloride', 'Chromic Acid', 'Boric Acid', 'Tartaric Acid',
    'Sodium Carbonate', 'Sodium Bicarbonate', 'Potassium Permanganate', 'Silver Nitrate', 'Sodium Nitrate',
    'Ammonium Hydroxide', 'Ammonium Chloride', 'Ammonium Nitrate', 'Ammonium Sulfate', 'Calcium Hydroxide',
    'Magnesium Chloride', 'Sodium Sulfate', 'Potassium Chloride', 'Butanol', 'MEK',
    'MIBK', 'THF', 'DMF', 'DMSO', 'Diethyl Ether',
    'Hexane', 'Heptane', 'Cyclohexane', 'Turpentine', 'White Spirit',
    'Naphtha', 'Styrene', 'Phenol', 'Aniline', 'Pyridine',
    'Bromine', 'Chlorine', 'Fluorine', 'Iodine', 'Ozone',
    'Sodium Sulfide', 'Hydrogen Sulfide', 'Carbon Disulfide', 'Sodium Cyanide', 'Potassium Cyanide',
    'Perchloric Acid', 'Sulfamic Acid', 'Glycolic Acid', 'Malic Acid', 'Succinic Acid',
    'Fatty Acids', 'Oleic Acid', 'Stearic Acid', 'Palmitic Acid', 'Linoleic Acid',
    'Sodium Lauryl Sulfate', 'Triton X-100', 'Tween 80', 'Silicone Oil', 'Paraffin Oil',
]

MATERIAL_NAMES = {
    'AL': 'Aluminium',
    'ECTFE_ETFE': 'ECTFE/ETFE',
    'EPDM': 'EPDM',
    'FEP': 'FEP',
    'FPM': 'Viton',
    'HDPE': 'HDPE',
    'LDPE': 'LDPE',
    'NBR': 'NBR',
    'PA': 'Nylon',
    'PC': 'Polycarbonate',
    'PETG': 'PETG',
    'PMP': 'PMP',
    'POM': 'Acetal',
    'PP': 'PP',
    'PS': 'Polystyrene',
    'PSU': 'Polysulfone',
    'PTFE': 'PTFE',
    'PVC_HART': 'PVC Rigid',
    'PVC_WEICH': 'PVC Flex',
    'PVDF': 'PVDF',
    'SAN': 'SAN',
    'SI': 'Silicone',
    'V2A': 'SS 304',
    'V4A': 'SS 316',
}

def slugify(name):
    """Convert chemical name to URL slug"""
    slug = name.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = slug.strip('-')
    return slug

def rating_to_grade(rating):
    if rating == '1': return 'A'
    elif rating == '2': return 'B'
    elif rating == '3': return 'C'
    elif rating == '4': return 'D'
    else: return 'NR'

def generate_chemical_page(chem_data):
    name = chem_data.get('name_en', chem_data.get('name', ''))
    slug = slugify(name)
    cas = chem_data.get('cas', '')
    formula = chem_data.get('formula', '')
    ratings = chem_data.get('ratings', {})
    
    # Build material rows
    rows = []
    for mat_code in sorted(ratings.keys()):
        mat_name = MATERIAL_NAMES.get(mat_code, mat_code)
        r = ratings[mat_code]
        c20 = rating_to_grade(r.get('c20', '0'))
        c50 = rating_to_grade(r.get('c50', '0'))
        rows.append(f'''
            <tr class="border-b border-gray-100 hover:bg-gray-50">
                <td class="py-3 px-4 font-medium text-gray-900">{mat_name}</td>
                <td class="py-3 px-4 text-center">
                    <span class="rating-{c20} px-2 py-1 rounded text-sm font-medium">{c20}</span>
                </td>
                <td class="py-3 px-4 text-center">
                    <span class="rating-{c50} px-2 py-1 rounded text-sm font-medium">{c50}</span>
                </td>
            </tr>''')
    
    # Count good/bad materials
    excellent = sum(1 for r in ratings.values() if r.get('c20') == '1')
    not_rec = sum(1 for r in ratings.values() if r.get('c20') == '4')
    
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-LTK6VVHYDW"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){{dataLayer.push(arguments);}}
        gtag('js', new Date());
        gtag('config', 'G-LTK6VVHYDW');
    </script>
    <title>{name} Chemical Resistance | Compatible Materials</title>
    <meta name="description" content="Which materials are resistant to {name}? Complete compatibility chart for {name}{' (CAS ' + cas + ')' if cas else ''} at 20°C and 50°C.">
    <link rel="icon" href="../favicon.ico" type="image/x-icon">
    <link rel="canonical" href="https://chemicalresistance.org/chemicals/{slug}">
    <meta property="og:title" content="{name} Chemical Resistance Chart">
    <meta property="og:description" content="Find which materials are compatible with {name}. {len(ratings)} materials tested.">
    <meta property="og:type" content="article">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {{ font-family: 'Inter', sans-serif; }}
        body {{ background: #f8fafc; }}
        .rating-A {{ background: #22c55e; color: white; }}
        .rating-B {{ background: #3b82f6; color: white; }}
        .rating-C {{ background: #f59e0b; color: white; }}
        .rating-D {{ background: #ef4444; color: white; }}
        .rating-NR {{ background: #e5e7eb; color: #9ca3af; }}
    </style>
</head>
<body class="text-gray-700 min-h-screen">
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="../index.html" class="flex items-center gap-2">
                <img src="../logos/logo-icon-128x128.png" alt="ChemicalResistance" class="w-10 h-10 rounded-xl">
                <div>
                    <div class="font-bold text-gray-900">ChemicalResistance.org</div>
                    <div class="text-xs text-gray-500">Chemical compatibility database</div>
                </div>
            </a>
            <a href="../index.html" class="text-gray-600 hover:text-gray-900 text-sm">← Back to Search</a>
        </div>
    </header>

    <section class="bg-gradient-to-b from-emerald-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <div class="flex items-center gap-2 text-sm text-emerald-600 mb-3">
                <a href="../index.html" class="hover:underline">Home</a>
                <span>›</span>
                <span>Chemicals</span>
                <span>›</span>
                <span class="text-gray-600">{name}</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {name} Chemical Resistance
            </h1>
            <p class="text-lg text-gray-600 mb-4">
                Find which materials are compatible with {name}. This chart shows resistance ratings at 20°C and 50°C.
            </p>
            <div class="flex flex-wrap gap-3 text-sm">
                {f'<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">CAS: {cas}</span>' if cas else ''}
                {f'<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Formula: {formula}</span>' if formula else ''}
                <span class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">{excellent} excellent materials</span>
            </div>
        </div>
    </section>

    <section class="px-4 py-6 bg-white border-b border-gray-200">
        <div class="max-w-4xl mx-auto">
            <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="font-semibold text-gray-900 mb-2">Rating Scale</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div class="flex items-center gap-2"><span class="rating-A px-2 py-1 rounded">A</span> Excellent</div>
                    <div class="flex items-center gap-2"><span class="rating-B px-2 py-1 rounded">B</span> Good</div>
                    <div class="flex items-center gap-2"><span class="rating-C px-2 py-1 rounded">C</span> Limited</div>
                    <div class="flex items-center gap-2"><span class="rating-D px-2 py-1 rounded">D</span> Not recommended</div>
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Material Compatibility</h2>
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="text-left py-3 px-4 font-semibold text-gray-900">Material</th>
                            <th class="text-center py-3 px-4 font-semibold text-gray-900">20°C</th>
                            <th class="text-center py-3 px-4 font-semibold text-gray-900">50°C</th>
                        </tr>
                    </thead>
                    <tbody>
                        {''.join(rows)}
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <section class="px-4 py-8 bg-gray-50">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Related Chemicals</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <a href="sulfuric-acid" class="bg-white p-3 rounded-lg border border-gray-200 hover:border-emerald-500 text-center text-sm font-medium text-gray-700 hover:text-emerald-600">Sulfuric Acid</a>
                <a href="hydrochloric-acid" class="bg-white p-3 rounded-lg border border-gray-200 hover:border-emerald-500 text-center text-sm font-medium text-gray-700 hover:text-emerald-600">Hydrochloric Acid</a>
                <a href="sodium-hydroxide" class="bg-white p-3 rounded-lg border border-gray-200 hover:border-emerald-500 text-center text-sm font-medium text-gray-700 hover:text-emerald-600">Sodium Hydroxide</a>
                <a href="acetone" class="bg-white p-3 rounded-lg border border-gray-200 hover:border-emerald-500 text-center text-sm font-medium text-gray-700 hover:text-emerald-600">Acetone</a>
            </div>
        </div>
    </section>

    <footer class="bg-gray-900 text-gray-400 px-4 py-8">
        <div class="max-w-4xl mx-auto text-center text-sm">
            <p>© 2026 ChemicalResistance.org — Free chemical compatibility database</p>
            <p class="mt-2">Always verify compatibility with your supplier before use.</p>
        </div>
    </footer>
</body>
</html>'''
    
    return slug, html

def main():
    with open('data/chemicals_burkle_full.json', 'r') as f:
        chemicals = json.load(f)
    
    # Create name lookup
    chem_lookup = {}
    for c in chemicals:
        name_en = c.get('name_en', c.get('name', '')).lower()
        # Prefer entries with actual data
        ratings = c.get("ratings", {})
        has_data = any(r.get("c20", "0") not in ["0", ""] for r in ratings.values())
        if name_en not in chem_lookup or has_data:
            chem_lookup[name_en] = c
    
    os.makedirs('chemicals', exist_ok=True)
    
    generated = 0
    for target in TOP_CHEMICALS:
        target_lower = target.lower()
        
        # Find matching chemical
        chem = chem_lookup.get(target_lower)
        if not chem:
            # Try partial match
            for name, data in chem_lookup.items():
                if target_lower in name or name in target_lower:
                    chem = data
                    break
        
        if not chem:
            print(f"  ⚠️ Not found: {target}")
            continue
        
        slug, html = generate_chemical_page(chem)
        output = f'chemicals/{slug}.html'
        
        with open(output, 'w') as f:
            f.write(html)
        
        print(f"✅ {chem.get('name_en', chem.get('name'))} → {slug}.html")
        generated += 1
    
    print(f"\n✅ Generated {generated} chemical pages")

if __name__ == '__main__':
    main()
