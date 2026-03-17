import os
import json

with open('data/chemicals.json') as f:
    data = json.load(f)

# Next 50 high-value chemicals with English mappings
NEXT_50 = {
    # Acids
    'Ameisensäure': 'formic-acid',
    'Arsensäure': 'arsenic-acid',
    'Ascorbinsäure': 'ascorbic-acid',
    'Bernsteinsäure': 'succinic-acid',
    'Buttersäure': 'butyric-acid',
    'Caprylsäure': 'caprylic-acid',
    'Fumarsäure': 'fumaric-acid',
    'Gerbsäure': 'tannic-acid',
    'Glutarsäure': 'glutaric-acid',
    'Maleinsäure': 'maleic-acid',
    'Malonsäure': 'malonic-acid',
    'Propionsäure': 'propionic-acid',
    'Stearinsäure': 'stearic-acid',
    'Weinsäure': 'tartaric-acid',
    
    # Salts/Chlorides
    'Bariumsulfat': 'barium-sulfate',
    'Calciumcarbonat': 'calcium-carbonate',
    'Calciumsulfat': 'calcium-sulfate',
    'Eisensulfat': 'iron-sulfate',
    'Kaliumcarbonat': 'potassium-carbonate',
    'Kaliumpermanganat': 'potassium-permanganate',
    'Magnesiumcarbonat': 'magnesium-carbonate',
    'Natriumnitrat': 'sodium-nitrate',
    'Natriumsulfat': 'sodium-sulfate',
    'Natriumthiosulfat': 'sodium-thiosulfate',
    'Silbernitrat': 'silver-nitrate',
    'Zinkchlorid': 'zinc-chloride',
    
    # Solvents
    'Cyclohexanon': 'cyclohexanone',
    'Diethylketon': 'diethyl-ketone',
    'Dioxan': 'dioxane',
    'Methylenchlorid': 'methylene-chloride',
    'Perchlorethylen': 'perchloroethylene',
    'Trichlorethylen': 'trichloroethylene',
    
    # Alcohols
    'Amylalkohol': 'amyl-alcohol',
    'Benzylalkohol': 'benzyl-alcohol',
    'Cyclohexanol': 'cyclohexanol',
    'Octanol': 'octanol',
    'Propanol': 'propanol',
    
    # Industrial
    'Acetylen': 'acetylene',
    'Brom': 'bromine',
    'Chlor, wässrig': 'chlorine-water',
    'Fluor': 'fluorine',
    'Jod': 'iodine',
    'Ozon': 'ozone',
    'Schwefeldioxid': 'sulfur-dioxide',
    'Schwefelwasserstoff': 'hydrogen-sulfide',
    
    # Common industrial
    'Kalk, gelöscht': 'slaked-lime',
    'Kalkmilch': 'lime-milk',
    'Seewasser': 'seawater',
    'Kochsalzlösung': 'saline-solution',
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
    '1': ('A', 'Excellent', '#22c55e', 'Excellent resistance - recommended for continuous use'),
    '2': ('B', 'Good', '#3b82f6', 'Good resistance - suitable for intermittent contact'),
    '3': ('C', 'Fair', '#f59e0b', 'Limited resistance - short-term exposure only'),
    '4': ('D', 'Poor', '#ef4444', 'Not recommended - significant degradation expected'),
    '0': ('NR', 'No Data', '#9ca3af', 'No data available'),
}

added = 0
pages = 0

for chem in data:
    if chem['name'] not in NEXT_50:
        continue
    
    en_slug = NEXT_50[chem['name']]
    
    if os.path.exists(f'chemicals/{en_slug}'):
        continue
    
    chem_name = en_slug.replace('-', ' ').title()
    ratings_data = chem.get('ratings', {})
    
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
            <div class="text-sm text-emerald-600 mb-3"><a href="/">Home</a> › <a href="/chemicals/{en_slug}">{chem_name}</a> › {mat_name}</div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{chem_name} Resistance of {mat_name}</h1>
            <p class="text-gray-600">Is {mat_name} compatible with {chem_name}? See the chemical resistance rating below.</p>
        </div>
    </section>
    <main class="max-w-4xl mx-auto px-4 py-8">
        <div class="bg-white rounded-2xl shadow-sm border p-6 mb-6">
            <h2 class="text-xl font-bold mb-4">Compatibility Rating</h2>
            <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-gray-50 rounded-xl p-4">
                    <div class="text-sm text-gray-500 mb-2">At 20°C (68°F)</div>
                    <div class="flex items-center gap-3">
                        <span class="rating" style="background:{r20[2]};color:white">{r20[0]}</span>
                        <div><div class="font-bold">{r20[1]}</div><div class="text-sm text-gray-600">{r20[3]}</div></div>
                    </div>
                </div>
                <div class="bg-gray-50 rounded-xl p-4">
                    <div class="text-sm text-gray-500 mb-2">At 50°C (122°F)</div>
                    <div class="flex items-center gap-3">
                        <span class="rating" style="background:{r50[2]};color:white">{r50[0]}</span>
                        <div><div class="font-bold">{r50[1]}</div><div class="text-sm text-gray-600">{r50[3]}</div></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border p-6 mb-6">
            <h2 class="text-xl font-bold mb-4">FAQ</h2>
            <div class="space-y-4">
                <div class="border-b pb-4">
                    <h3 class="font-semibold mb-2">Is {mat_name} resistant to {chem_name}?</h3>
                    <p class="text-gray-600">{mat_name} has <strong>{r20[1]} ({r20[0]})</strong> resistance to {chem_name} at 20°C. {r20[3]}.</p>
                </div>
                <div>
                    <h3 class="font-semibold mb-2">Can I store {chem_name} in {mat_name} containers?</h3>
                    <p class="text-gray-600">{"Yes, " if r20[0] in ['A','B'] else "Use caution - "}{mat_name} is rated {r20[0]} ({r20[1]}) for {chem_name}.</p>
                </div>
            </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
            <a href="/chemicals/{en_slug}" class="bg-emerald-600 text-white rounded-xl p-4 text-center font-semibold hover:bg-emerald-700">All Materials for {chem_name}</a>
            <a href="/materials/{mat_slug}" class="bg-gray-100 text-gray-700 rounded-xl p-4 text-center font-semibold hover:bg-gray-200">All Chemicals for {mat_name}</a>
        </div>
    </main>
    <footer class="border-t mt-12 py-6 text-center text-gray-500 text-sm">© 2026 ChemicalResistance.org</footer>
</body>
</html>'''
        
        with open(f'{mat_path}/index.html', 'w') as f:
            f.write(html)
        pages += 1
    
    added += 1
    print(f"✅ {en_slug}")

print(f"\n✅ Added {added} chemicals, {pages} pages")
