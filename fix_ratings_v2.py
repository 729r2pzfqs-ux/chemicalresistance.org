import os
import json
import re

# Better mapping - checked against actual data
EN_TO_DE = {
    'acetone': 'Aceton',
    'acetic-acid': 'Essigsäure',
    'ammonia': 'Ammoniak',
    'benzene': 'Benzol',
    'bromine': 'Brom',
    'chlorine': 'Chlor',
    'citric-acid': 'Zitronensäure',
    'diesel-fuel': 'Dieselöl',
    'ethylene-glycol': 'Ethylenglykol',
    'formaldehyde-solution': 'Formaldehyd',
    'formic-acid': 'Ameisensäure',
    'hydraulic-oil': 'Hydrauliköle (Mineralölbasis)',
    'hydrochloric-acid': 'Salzsäure',
    'hydrofluoric-acid': 'Flusssäure',
    'hydrogen-peroxide': 'Wasserstoffperoxid',
    'lactic-acid': 'Milchsäure',
    'mineral-oil': 'Mineralöl',
    'motor-oil': 'Motorenöl',
    'nitric-acid': 'Salpetersäure',
    'oxalic-acid': 'Oxalsäure',
    'phosphoric-acid': 'Phosphorsäure',
    'potassium-hydroxide': 'Kaliumhydroxid',
    'silicone-oil': 'Siliconöl',
    'sodium-chloride': 'Natriumchlorid',
    'sodium-hydroxide-caustic-soda': 'Natronlauge',
    'sulfuric-acid': 'Schwefelsäure',
    'toluene': 'Toluol',
    'xylene': 'Xylol',
    'urea': 'Harnstoff',
}

# Load data
with open('data/chemicals.json') as f:
    chem_data = json.load(f)

de_lookup = {c['name']: c for c in chem_data}

MAT_CODES = {
    'hdpe': 'HDPE', 'ldpe': 'LDPE', 'pp': 'PP',
    'pvc-rigid': 'PVC_HART', 'pvc-flexible': 'PVC_WEICH',
    'pmp': 'PMP', 'polystyrene': 'PS', 'san': 'SAN',
    'polycarbonate': 'PC', 'petg': 'PETG', 'acetal-pom': 'POM',
    'nylon-pa': 'PA', 'polysulfone': 'PSU', 'ectfe-etfe': 'ECTFE_ETFE',
    'fep': 'FEP', 'ptfe': 'PTFE', 'pvdf': 'PVDF',
    'epdm': 'EPDM', 'viton': 'FPM', 'nbr': 'NBR',
    'silicone': 'SI', 'aluminium': 'AL',
    'stainless-steel-304': 'V2A', 'ss316': 'V4A',
}

MAT_NAMES = {
    'hdpe': 'HDPE', 'ldpe': 'LDPE', 'pp': 'Polypropylene (PP)',
    'pvc-rigid': 'PVC Rigid', 'pvc-flexible': 'PVC Flexible',
    'pmp': 'PMP', 'polystyrene': 'Polystyrene', 'san': 'SAN',
    'polycarbonate': 'Polycarbonate', 'petg': 'PETG', 'acetal-pom': 'Acetal (POM)',
    'nylon-pa': 'Nylon (PA)', 'polysulfone': 'Polysulfone', 'ectfe-etfe': 'ECTFE/ETFE',
    'fep': 'FEP', 'ptfe': 'PTFE', 'pvdf': 'PVDF',
    'epdm': 'EPDM', 'viton': 'Viton (FPM)', 'nbr': 'NBR',
    'silicone': 'Silicone', 'aluminium': 'Aluminium',
    'stainless-steel-304': 'Stainless Steel 304', 'ss316': 'Stainless Steel 316',
}

RATINGS = {
    '1': ('A', 'Excellent', '#22c55e', 'Excellent resistance - recommended for continuous use'),
    '2': ('B', 'Good', '#3b82f6', 'Good resistance - suitable for intermittent contact'),
    '3': ('C', 'Fair', '#f59e0b', 'Limited resistance - short-term exposure only'),
    '4': ('D', 'Poor', '#ef4444', 'Not recommended - significant degradation expected'),
    '0': ('NR', 'No Data', '#9ca3af', 'No data available'),
    0: ('NR', 'No Data', '#9ca3af', 'No data available'),
}

updated = 0

for en_slug, de_name in EN_TO_DE.items():
    chem_path = f'chemicals/{en_slug}'
    if not os.path.isdir(chem_path):
        continue
    
    chem_info = de_lookup.get(de_name)
    if not chem_info:
        continue
    
    ratings_data = chem_info.get('ratings', {})
    chem_name = en_slug.replace('-', ' ').title()
    
    for mat_slug, mat_code in MAT_CODES.items():
        mat_path = f'{chem_path}/{mat_slug}'
        index_path = f'{mat_path}/index.html'
        if not os.path.exists(index_path):
            continue
        
        mat_rating = ratings_data.get(mat_code, {})
        c20 = str(mat_rating.get('c20', 0))
        c50 = str(mat_rating.get('c50', 0))
        
        r20 = RATINGS.get(c20, RATINGS['0'])
        r50 = RATINGS.get(c50, RATINGS['0'])
        
        if r20[0] == 'NR':
            continue
        
        mat_name = MAT_NAMES.get(mat_slug, mat_slug.upper())
        
        html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-LTK6VVHYDW"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag('js',new Date());gtag('config','G-LTK6VVHYDW');</script>
    <title>{chem_name} Resistance of {mat_name} | Chemical Compatibility</title>
    <meta name="description" content="Is {mat_name} resistant to {chem_name}? Rating: {r20[1]} at 20°C, {r50[1]} at 50°C.">
    <link rel="icon" href="/favicon.ico">
    <link rel="canonical" href="https://chemicalresistance.org/chemicals/{en_slug}/{mat_slug}/">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>*{{font-family:'Inter',sans-serif}}body{{background:#f8fafc}}.rating{{display:inline-block;padding:0.5rem 1rem;border-radius:0.5rem;font-weight:700;font-size:1.25rem}}</style>
</head>
<body class="text-gray-700 min-h-screen">
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2">
                <img src="/logos/logo-icon-128x128.png" alt="ChemicalResistance" class="w-10 h-10 rounded-xl">
                <div><div class="font-bold text-gray-900">ChemicalResistance.org</div><div class="text-xs text-gray-500">Chemical compatibility database</div></div>
            </a>
            <a href="/" class="text-gray-600 hover:text-gray-900 text-sm">← Search</a>
        </div>
    </header>
    <section class="bg-gradient-to-b from-emerald-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <div class="flex items-center gap-2 text-sm text-emerald-600 mb-3">
                <a href="/" class="hover:underline">Home</a><span>›</span>
                <a href="/chemicals/{en_slug}" class="hover:underline">{chem_name}</a><span>›</span>
                <span class="text-gray-600">{mat_name}</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{chem_name} Resistance of {mat_name}</h1>
            <p class="text-lg text-gray-600">Is {mat_name} compatible with {chem_name}? See the chemical resistance rating below.</p>
        </div>
    </section>
    <main class="max-w-4xl mx-auto px-4 py-8">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Compatibility Rating</h2>
            <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-gray-50 rounded-xl p-5">
                    <div class="text-sm text-gray-500 mb-2">At 20°C (68°F)</div>
                    <div class="flex items-center gap-4">
                        <span class="rating" style="background:{r20[2]};color:white">{r20[0]}</span>
                        <div><div class="font-bold text-gray-900 text-lg">{r20[1]}</div><div class="text-gray-600 text-sm">{r20[3]}</div></div>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-xl p-5">
                    <div class="text-sm text-gray-500 mb-2">At 50°C (122°F)</div>
                    <div class="flex items-center gap-4">
                        <span class="rating" style="background:{r50[2]};color:white">{r50[0]}</span>
                        <div><div class="font-bold text-gray-900 text-lg">{r50[1]}</div><div class="text-gray-600 text-sm">{r50[3]}</div></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 class="text-xl font-bold text-gray-900 mb-4">FAQ</h2>
            <div class="space-y-4">
                <div class="border-b border-gray-100 pb-4">
                    <h3 class="font-semibold text-gray-900 mb-2">Is {mat_name} resistant to {chem_name}?</h3>
                    <p class="text-gray-600">{mat_name} has <strong>{r20[1]} ({r20[0]})</strong> resistance to {chem_name} at 20°C. {r20[3]}.</p>
                </div>
                <div class="pb-4">
                    <h3 class="font-semibold text-gray-900 mb-2">Can I store {chem_name} in {mat_name} containers?</h3>
                    <p class="text-gray-600">Based on the {r20[0]} rating, {mat_name} {"is suitable" if r20[0] in ['A','B'] else "may not be ideal"} for {chem_name} storage.</p>
                </div>
            </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
            <a href="/chemicals/{en_slug}" class="block bg-emerald-600 text-white rounded-xl p-4 hover:bg-emerald-700 transition text-center font-semibold">All Materials for {chem_name}</a>
            <a href="/materials/{mat_slug}" class="block bg-gray-100 text-gray-700 rounded-xl p-4 hover:bg-gray-200 transition text-center font-semibold">All Chemicals for {mat_name}</a>
        </div>
    </main>
    <footer class="bg-white border-t border-gray-200 mt-12 py-8 px-4 text-center text-gray-500 text-sm">© 2026 ChemicalResistance.org</footer>
</body>
</html>'''
        
        with open(index_path, 'w') as f:
            f.write(html)
        updated += 1

print(f"✅ Updated {updated} pages with correct ratings")
