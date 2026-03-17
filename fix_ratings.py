import os
import json
import re

# Manual mapping for common chemicals (English slug -> German name in data)
EN_TO_DE = {
    'acetone': 'Aceton',
    'acetic-acid': 'Essigsäure',
    'acetonitrile': 'Acetonitril',
    'ammonia': 'Ammoniak',
    'ammonium-chloride': 'Ammoniumchlorid',
    'ammonium-hydroxide': 'Ammoniumhydroxid',
    'ammonium-nitrate': 'Ammoniumnitrat',
    'ammonium-sulfate': 'Ammoniumsulfat',
    'aniline': 'Anilin',
    'benzene': 'Benzol',
    'boric-acid': 'Borsäure',
    'bromine': 'Brom',
    'butanone-mek': 'Butanon',
    'calcium-chloride': 'Calciumchlorid',
    'calcium-hydroxide': 'Calciumhydroxid',
    'carbon-disulfide': 'Schwefelkohlenstoff',
    'chlorine': 'Chlor',
    'chlorine-bleach-solution': 'Chlorbleichlauge',
    'chromic-acid': 'Chromsäure',
    'citric-acid': 'Zitronensäure',
    'copper-vitriol-copper-sulfate': 'Kupfersulfat',
    'cyclohexane': 'Cyclohexan',
    'dichloromethane': 'Dichlormethan',
    'diesel-fuel': 'Dieselkraftstoff',
    'diethyl-ether': 'Diethylether',
    'ethylene-glycol': 'Ethylenglykol',
    'fluorine': 'Fluor',
    'formaldehyde-solution': 'Formaldehydlösung',
    'formic-acid': 'Ameisensäure',
    'glycolic-acid': 'Glykolsäure',
    'heptane': 'Heptan',
    'hexane': 'Hexan',
    'hydraulic-oil': 'Hydrauliköl',
    'hydrochloric-acid': 'Salzsäure',
    'hydrofluoric-acid': 'Flusssäure',
    'hydrogen-peroxide': 'Wasserstoffperoxid',
    'hydrogen-sulfide': 'Schwefelwasserstoff',
    'kerosene': 'Kerosin',
    'lactic-acid': 'Milchsäure',
    'magnesium-chloride': 'Magnesiumchlorid',
    'mineral-oil': 'Mineralöl',
    'motor-oil': 'Motoröl',
    'nitric-acid': 'Salpetersäure',
    'oleic-acid': 'Ölsäure',
    'oxalic-acid': 'Oxalsäure',
    'ozone': 'Ozon',
    'palmitic-acid': 'Palmitinsäure',
    'perchloric-acid': 'Perchlorsäure',
    'phosphoric-acid': 'Phosphorsäure',
    'potassium-chloride': 'Kaliumchlorid',
    'potassium-cyanide': 'Kaliumcyanid',
    'potassium-hydroxide': 'Kaliumhydroxid',
    'potassium-permanganate': 'Kaliumpermanganat',
    'propylene-glycol': 'Propylenglykol',
    'pyridine': 'Pyridin',
    'silicone-oil': 'Silikonöl',
    'silver-nitrate': 'Silbernitrat',
    'sodium-bicarbonate': 'Natriumbicarbonat',
    'sodium-carbonate': 'Natriumcarbonat',
    'sodium-chloride': 'Natriumchlorid',
    'sodium-cyanide': 'Natriumcyanid',
    'sodium-hydroxide-caustic-soda': 'Natronlauge',
    'sodium-nitrate': 'Natriumnitrat',
    'sodium-sulfate': 'Natriumsulfat',
    'sodium-sulfide': 'Natriumsulfid',
    'stearic-acid': 'Stearinsäure',
    'styrene': 'Styrol',
    'succinic-acid': 'Bernsteinsäure',
    'sulfuric-acid': 'Schwefelsäure',
    'tartaric-acid': 'Weinsäure',
    'toluene': 'Toluol',
    'turpentine-substitute': 'Terpentinersatz',
    'urea': 'Harnstoff',
    'xylene': 'Xylol',
    'zinc-chloride': 'Zinkchlorid',
    'iodine-pentafluoride': 'Jodpentafluorid',
    'labarraque-solution-sodium-hypochlorite': 'Javelwasser',
    'methyl-isobutyl-ketone-mibk': 'Methylisobutylketon',
}

# Load chemical data
with open('data/chemicals.json') as f:
    chem_data = json.load(f)

# Create lookup by German name
de_lookup = {}
for chem in chem_data:
    de_lookup[chem['name']] = chem
    de_lookup[chem['name'].lower()] = chem

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
    '0': ('NR', 'No Data', '#9ca3af', 'No data available - verify before use'),
}

def get_rating(chem_slug, mat_slug):
    de_name = EN_TO_DE.get(chem_slug)
    if not de_name:
        return RATINGS['0'], RATINGS['0']
    
    chem_info = de_lookup.get(de_name) or de_lookup.get(de_name.lower())
    if not chem_info:
        return RATINGS['0'], RATINGS['0']
    
    mat_code = MAT_CODES.get(mat_slug)
    if not mat_code:
        return RATINGS['0'], RATINGS['0']
    
    ratings = chem_info.get('ratings', {})
    mat_rating = ratings.get(mat_code, {})
    c20 = str(mat_rating.get('c20', 0))
    c50 = str(mat_rating.get('c50', 0))
    
    return RATINGS.get(c20, RATINGS['0']), RATINGS.get(c50, RATINGS['0'])

count = 0
updated = 0

for chem_slug in EN_TO_DE.keys():
    chem_path = f'chemicals/{chem_slug}'
    if not os.path.isdir(chem_path):
        continue
    
    chem_name = chem_slug.replace('-', ' ').title()
    
    for mat_slug in MAT_CODES.keys():
        mat_path = f'{chem_path}/{mat_slug}'
        index_path = f'{mat_path}/index.html'
        if not os.path.exists(index_path):
            continue
        
        mat_name = MAT_NAMES.get(mat_slug, mat_slug.upper())
        rating_20, rating_50 = get_rating(chem_slug, mat_slug)
        
        # Skip if no data
        count += 1
        if rating_20[0] == 'NR':
            continue
        
        html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-LTK6VVHYDW"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag('js',new Date());gtag('config','G-LTK6VVHYDW');</script>
    <title>{chem_name} Resistance of {mat_name} | Chemical Compatibility</title>
    <meta name="description" content="Is {mat_name} resistant to {chem_name}? Rating: {rating_20[1]} at 20°C, {rating_50[1]} at 50°C. Container compatibility guide.">
    <link rel="icon" href="/favicon.ico">
    <link rel="canonical" href="https://chemicalresistance.org/chemicals/{chem_slug}/{mat_slug}/">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>*{{font-family:'Inter',sans-serif}}body{{background:#f8fafc}}.rating{{display:inline-block;padding:0.5rem 1rem;border-radius:0.5rem;font-weight:700;font-size:1.25rem}}</style>
    <script type="application/ld+json">{{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {{"@type": "Question", "name": "Is {mat_name} resistant to {chem_name}?", "acceptedAnswer": {{"@type": "Answer", "text": "{mat_name} has {rating_20[1]} ({rating_20[0]}) resistance to {chem_name} at 20°C. {rating_20[3]}."}} }},
            {{"@type": "Question", "name": "Can I store {chem_name} in {mat_name} containers?", "acceptedAnswer": {{"@type": "Answer", "text": "Based on our data, {mat_name} is rated {rating_20[0]} ({rating_20[1]}) for {chem_name} at room temperature. At 50°C, the rating is {rating_50[0]} ({rating_50[1]}). Always verify with your supplier for specific applications."}} }}
        ]
    }}</script>
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
                <a href="/chemicals/{chem_slug}" class="hover:underline">{chem_name}</a><span>›</span>
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
                        <span class="rating" style="background:{rating_20[2]};color:white">{rating_20[0]}</span>
                        <div><div class="font-bold text-gray-900 text-lg">{rating_20[1]}</div><div class="text-gray-600 text-sm">{rating_20[3]}</div></div>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-xl p-5">
                    <div class="text-sm text-gray-500 mb-2">At 50°C (122°F)</div>
                    <div class="flex items-center gap-4">
                        <span class="rating" style="background:{rating_50[2]};color:white">{rating_50[0]}</span>
                        <div><div class="font-bold text-gray-900 text-lg">{rating_50[1]}</div><div class="text-gray-600 text-sm">{rating_50[3]}</div></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Rating Legend</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div class="flex items-center gap-2"><span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold" style="background:#22c55e">A</span> Excellent</div>
                <div class="flex items-center gap-2"><span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold" style="background:#3b82f6">B</span> Good</div>
                <div class="flex items-center gap-2"><span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold" style="background:#f59e0b">C</span> Fair</div>
                <div class="flex items-center gap-2"><span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold" style="background:#ef4444">D</span> Poor</div>
            </div>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 class="text-xl font-bold text-gray-900 mb-4">FAQ</h2>
            <div class="space-y-4">
                <div class="border-b border-gray-100 pb-4">
                    <h3 class="font-semibold text-gray-900 mb-2">Is {mat_name} resistant to {chem_name}?</h3>
                    <p class="text-gray-600">{mat_name} has <strong>{rating_20[1]} ({rating_20[0]})</strong> resistance to {chem_name} at 20°C. {rating_20[3]}.</p>
                </div>
                <div class="border-b border-gray-100 pb-4">
                    <h3 class="font-semibold text-gray-900 mb-2">Can I store {chem_name} in {mat_name} containers?</h3>
                    <p class="text-gray-600">Based on the {rating_20[0]} rating, {mat_name} {"is suitable" if rating_20[0] in ['A','B'] else "may not be ideal"} for {chem_name} storage. At 50°C, the rating {"remains stable" if rating_20[0] == rating_50[0] else f"changes to {rating_50[0]}"}.</p>
                </div>
            </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
            <a href="/chemicals/{chem_slug}" class="block bg-emerald-600 text-white rounded-xl p-4 hover:bg-emerald-700 transition text-center font-semibold">All Materials for {chem_name}</a>
            <a href="/materials/{mat_slug}" class="block bg-gray-100 text-gray-700 rounded-xl p-4 hover:bg-gray-200 transition text-center font-semibold">All Chemicals for {mat_name}</a>
        </div>
    </main>
    <footer class="bg-white border-t border-gray-200 mt-12 py-8 px-4 text-center text-gray-500 text-sm">© 2026 ChemicalResistance.org</footer>
</body>
</html>'''
        
        with open(index_path, 'w') as f:
            f.write(html)
        updated += 1

print(f"✅ Updated {updated}/{count} pages with actual ratings")
