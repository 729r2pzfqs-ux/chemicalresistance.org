import os
import json

with open('data/chemicals.json') as f:
    data = json.load(f)

existing = set()
for d in os.listdir('chemicals'):
    if os.path.isdir(f'chemicals/{d}'):
        existing.add(d)

# 35 more to reach 200+
FINAL = {
    'Chlorbenzol': 'chlorobenzene',
    'Chlorgas': 'chlorine-gas',
    'Chlorwasser': 'chlorine-water',
    'Chlorwasserstoff(gas)': 'hydrogen-chloride-gas',
    'Cobalt-(II)-chlorid': 'cobalt-chloride',
    'Cumol': 'cumene',
    'Decalin': 'decalin',
    'Dichlormethan': 'dichloromethane',
    'Diisopropylether': 'diisopropyl-ether',
    'Diisobutylen (DIB)': 'diisobutylene',
    'Epichlorhydrin': 'epichlorohydrin',
    'Ethylacetat': 'ethyl-acetate',
    'Ethylbenzol': 'ethylbenzene',
    'Ethylenchlorid': 'ethylene-dichloride',
    'Fluorwasserstoff': 'hydrogen-fluoride',
    'Glutaraldehyd': 'glutaraldehyde',
    'Glycol': 'glycol',
    'Heptan, n-': 'n-heptane',
    'Hexan, n-': 'n-hexane',
    'Isobutanol': 'isobutanol',
    'Isooctan': 'isooctane',
    'Isopren': 'isoprene',
    'Kaliumdichromat': 'potassium-dichromate',
    'Kresol': 'cresol-mix',
    'Kupfer-(II)-sulfat': 'copper-ii-sulfate',
    'Methylacetat': 'methyl-acetate',
    'Methylacrylat': 'methyl-acrylate',
    'Methylchlorid': 'methyl-chloride',
    'Natriumdichromat': 'sodium-dichromate',
    'Natriumperborat': 'sodium-perborate',
    'Natriumperoxid': 'sodium-peroxide',
    'Nitrobenzol': 'nitrobenzene',
    'Octylalkohol': 'octyl-alcohol',
    'Pentachlorphenol': 'pentachlorophenol',
    'Styrol': 'styrene',
}

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
    '1': ('A', 'Excellent', '#22c55e', 'Excellent resistance'),
    '2': ('B', 'Good', '#3b82f6', 'Good resistance'),
    '3': ('C', 'Fair', '#f59e0b', 'Limited resistance'),
    '4': ('D', 'Poor', '#ef4444', 'Not recommended'),
    '0': ('NR', 'No Data', '#9ca3af', 'No data available'),
}

added = 0
pages = 0
processed = set()

for chem in data:
    if chem['name'] not in FINAL:
        continue
    
    en_slug = FINAL[chem['name']]
    if en_slug in processed or en_slug in existing:
        continue
    processed.add(en_slug)
    
    ratings_data = chem.get('ratings', {})
    if not ratings_data:
        continue
    
    chem_name = en_slug.replace('-', ' ').title()
    os.makedirs(f'chemicals/{en_slug}', exist_ok=True)
    
    for mat_slug, mat_code in MAT_CODES.items():
        mat_path = f'chemicals/{en_slug}/{mat_slug}'
        os.makedirs(mat_path, exist_ok=True)
        
        mat_rating = ratings_data.get(mat_code, {})
        c20 = str(mat_rating.get('c20', 0))
        c50 = str(mat_rating.get('c50', 0))
        r20 = RATINGS.get(c20, RATINGS['0'])
        r50 = RATINGS.get(c50, RATINGS['0'])
        mat_name = MAT_NAMES.get(mat_slug, mat_slug.upper())
        
        html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-LTK6VVHYDW"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag('js',new Date());gtag('config','G-LTK6VVHYDW');</script>
    <title>{chem_name} Resistance of {mat_name} | ChemicalResistance.org</title>
    <meta name="description" content="Is {mat_name} resistant to {chem_name}? Rating: {r20[1]} at 20°C, {r50[1]} at 50°C.">
    <link rel="icon" href="/favicon.ico">
    <link rel="canonical" href="https://chemicalresistance.org/chemicals/{en_slug}/{mat_slug}/">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>*{{font-family:system-ui,sans-serif}}body{{background:#f8fafc}}.rating{{display:inline-block;padding:0.5rem 1rem;border-radius:0.5rem;font-weight:700;font-size:1.25rem}}</style>
</head>
<body class="text-gray-700 min-h-screen">
    <header class="bg-white border-b sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2"><img src="/logos/logo-icon-128x128.png" class="w-10 h-10 rounded-xl"><span class="font-bold text-gray-900">ChemicalResistance.org</span></a>
            <a href="/" class="text-gray-600 text-sm">← Search</a>
        </div>
    </header>
    <section class="bg-gradient-to-b from-emerald-50 to-white px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{chem_name} Resistance of {mat_name}</h1>
            <p class="text-gray-600">Is {mat_name} compatible with {chem_name}?</p>
        </div>
    </section>
    <main class="max-w-4xl mx-auto px-4 py-8">
        <div class="bg-white rounded-2xl shadow-sm border p-6 mb-6">
            <h2 class="text-xl font-bold mb-4">Compatibility Rating</h2>
            <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-gray-50 rounded-xl p-4">
                    <div class="text-sm text-gray-500 mb-2">At 20°C</div>
                    <span class="rating" style="background:{r20[2]};color:white">{r20[0]} - {r20[1]}</span>
                </div>
                <div class="bg-gray-50 rounded-xl p-4">
                    <div class="text-sm text-gray-500 mb-2">At 50°C</div>
                    <span class="rating" style="background:{r50[2]};color:white">{r50[0]} - {r50[1]}</span>
                </div>
            </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
            <a href="/chemicals/{en_slug}" class="bg-emerald-600 text-white rounded-xl p-4 text-center font-semibold">All Materials</a>
            <a href="/materials/{mat_slug}" class="bg-gray-100 text-gray-700 rounded-xl p-4 text-center font-semibold">All Chemicals</a>
        </div>
    </main>
</body>
</html>'''
        
        with open(f'{mat_path}/index.html', 'w') as f:
            f.write(html)
        pages += 1
    
    added += 1

print(f"✅ Added {added} chemicals, {pages} pages")
