import json
import os
import re

# Load chemicals data
with open('data/chemicals.json', 'r') as f:
    chemicals = json.load(f)

# Material mappings (code -> slug, display name)
MATERIALS = {
    'HDPE': ('hdpe', 'HDPE'),
    'LDPE': ('ldpe', 'LDPE'),
    'PP': ('pp', 'Polypropylene (PP)'),
    'PVC_HART': ('pvc-rigid', 'PVC Rigid'),
    'PVC_WEICH': ('pvc-flexible', 'PVC Flexible'),
    'PMP': ('pmp', 'PMP'),
    'PS': ('polystyrene', 'Polystyrene'),
    'SAN': ('san', 'SAN'),
    'PC': ('polycarbonate', 'Polycarbonate'),
    'PETG': ('petg', 'PETG'),
    'POM': ('acetal-pom', 'Acetal (POM)'),
    'PA': ('nylon-pa', 'Nylon (PA)'),
    'PSU': ('polysulfone', 'Polysulfone'),
    'ECTFE_ETFE': ('ectfe-etfe', 'ECTFE/ETFE'),
    'FEP': ('fep', 'FEP'),
    'PTFE': ('ptfe', 'PTFE'),
    'PVDF': ('pvdf', 'PVDF'),
    'EPDM': ('epdm', 'EPDM'),
    'FPM': ('viton', 'Viton (FPM)'),
    'NBR': ('nbr', 'NBR'),
    'SI': ('silicone', 'Silicone'),
    'AL': ('aluminium', 'Aluminium'),
    'V2A': ('stainless-steel-304', 'Stainless Steel 304'),
    'V4A': ('ss316', 'Stainless Steel 316'),
}

RATINGS = {
    '1': ('A', 'Excellent', 'Excellent resistance - suitable for continuous use'),
    '2': ('B', 'Good', 'Good resistance - suitable for limited exposure'),
    '3': ('C', 'Fair', 'Fair resistance - may show some effects'),
    '4': ('D', 'Poor', 'Not recommended - significant degradation expected'),
    '0': ('NR', 'No Data', 'No data available'),
}

def slugify(name):
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')

def generate_page(chemical, material_code, material_slug, material_name):
    chem_name = chemical['name']
    chem_slug = slugify(chem_name)
    
    ratings = chemical.get('ratings', {})
    mat_rating = ratings.get(material_code, {})
    c20 = mat_rating.get('c20', '0')
    c50 = mat_rating.get('c50', '0')
    
    r20 = RATINGS.get(c20, RATINGS['0'])
    r50 = RATINGS.get(c50, RATINGS['0'])
    
    # Find best/worst materials for this chemical
    best_mats = []
    worst_mats = []
    for mc, mr in ratings.items():
        if mc not in MATERIALS:
            continue
        if mr.get('c20') == '1':
            best_mats.append(MATERIALS[mc][1])
        elif mr.get('c20') == '4':
            worst_mats.append(MATERIALS[mc][1])
    
    formula = chemical.get('formula', '')
    cas = chemical.get('cas', '')
    
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-LTK6VVHYDW"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag('js',new Date());gtag('config','G-LTK6VVHYDW');</script>
    <title>{chem_name} Resistance of {material_name} | Chemical Compatibility</title>
    <meta name="description" content="Can {material_name} resist {chem_name}? Rating: {r20[1]} at 20°C, {r50[1]} at 50°C. See if {material_name} containers are safe for {chem_name} storage.">
    <link rel="icon" href="../../favicon.ico">
    <link rel="canonical" href="https://chemicalresistance.org/chemicals/{chem_slug}/{material_slug}/">
    <meta property="og:title" content="{chem_name} + {material_name} Compatibility">
    <meta property="og:description" content="Is {material_name} resistant to {chem_name}? {r20[1]} rating at 20°C.">
    <meta property="og:type" content="article">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        *{{font-family:'Inter',sans-serif}}body{{background:#f8fafc}}
        .rating-A{{background:#22c55e;color:white}}.rating-B{{background:#3b82f6;color:white}}
        .rating-C{{background:#f59e0b;color:white}}.rating-D{{background:#ef4444;color:white}}
        .rating-NR{{background:#e5e7eb;color:#9ca3af}}
    </style>
    <script type="application/ld+json">{{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {{"@type": "Question", "name": "Can I store {chem_name} in {material_name} containers?", "acceptedAnswer": {{"@type": "Answer", "text": "{material_name} has a rating of {r20[1]} ({r20[0]}) for {chem_name} at 20°C. {r20[2]}."}} }},
            {{"@type": "Question", "name": "Is {material_name} safe for {chem_name} at high temperatures?", "acceptedAnswer": {{"@type": "Answer", "text": "At 50°C, {material_name} has a rating of {r50[1]} ({r50[0]}) for {chem_name}. Always verify with your supplier for specific conditions."}} }},
            {{"@type": "Question", "name": "What are the best materials for {chem_name}?", "acceptedAnswer": {{"@type": "Answer", "text": "Materials with excellent (A) resistance to {chem_name} include: {', '.join(best_mats[:5]) if best_mats else 'Check our full compatibility chart'}."}} }}
        ]
    }}</script>
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

    <section class="bg-gradient-to-b from-blue-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <div class="flex items-center gap-2 text-sm text-blue-600 mb-3">
                <a href="../../index.html" class="hover:underline">Home</a>
                <span>›</span>
                <a href="../{chem_slug}.html" class="hover:underline">{chem_name}</a>
                <span>›</span>
                <span class="text-gray-600">{material_name}</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {chem_name} Resistance of {material_name}
            </h1>
            <p class="text-lg text-gray-600 mb-4">
                Can {material_name} safely contain {chem_name}? See compatibility ratings at different temperatures.
            </p>
            {f'<p class="text-sm text-gray-500">Formula: {formula} | CAS: {cas}</p>' if formula or cas else ''}
        </div>
    </section>

    <main class="max-w-4xl mx-auto px-4 py-8">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Compatibility Rating</h2>
            <div class="grid md:grid-cols-2 gap-4">
                <div class="p-4 rounded-xl bg-gray-50">
                    <div class="text-sm text-gray-500 mb-1">At 20°C (68°F)</div>
                    <div class="flex items-center gap-3">
                        <span class="rating-{r20[0]} px-4 py-2 rounded-lg font-bold text-lg">{r20[0]}</span>
                        <div>
                            <div class="font-semibold text-gray-900">{r20[1]}</div>
                            <div class="text-sm text-gray-600">{r20[2]}</div>
                        </div>
                    </div>
                </div>
                <div class="p-4 rounded-xl bg-gray-50">
                    <div class="text-sm text-gray-500 mb-1">At 50°C (122°F)</div>
                    <div class="flex items-center gap-3">
                        <span class="rating-{r50[0]} px-4 py-2 rounded-lg font-bold text-lg">{r50[0]}</span>
                        <div>
                            <div class="font-semibold text-gray-900">{r50[1]}</div>
                            <div class="text-sm text-gray-600">{r50[2]}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div class="space-y-4">
                <div class="border-b border-gray-100 pb-4">
                    <h3 class="font-semibold text-gray-900 mb-2">Can I store {chem_name} in {material_name} containers?</h3>
                    <p class="text-gray-600">{material_name} has a <strong>{r20[1]}</strong> ({r20[0]}) rating for {chem_name} at room temperature (20°C). {r20[2]}. Always consider concentration, exposure time, and verify with your container supplier.</p>
                </div>
                <div class="border-b border-gray-100 pb-4">
                    <h3 class="font-semibold text-gray-900 mb-2">Does temperature affect {material_name}'s resistance to {chem_name}?</h3>
                    <p class="text-gray-600">Yes. At elevated temperature (50°C), the rating changes to <strong>{r50[1]}</strong> ({r50[0]}). Higher temperatures typically reduce chemical resistance.</p>
                </div>
                <div class="pb-4">
                    <h3 class="font-semibold text-gray-900 mb-2">What materials work best for {chem_name}?</h3>
                    <p class="text-gray-600">{f"Materials with excellent (A) resistance include: {', '.join(best_mats[:5])}." if best_mats else "Check our full compatibility chart for all material ratings."} <a href="../{chem_slug}.html" class="text-blue-600 hover:underline">See all materials →</a></p>
                </div>
            </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
            <a href="../{chem_slug}.html" class="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-blue-300 transition">
                <div class="font-semibold text-gray-900">All {chem_name} Ratings</div>
                <div class="text-sm text-gray-600">Compare all materials for {chem_name}</div>
            </a>
            <a href="../../{material_slug}/{chem_slug}.html" class="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-blue-300 transition">
                <div class="font-semibold text-gray-900">All {material_name} Ratings</div>
                <div class="text-sm text-gray-600">See what chemicals {material_name} resists</div>
            </a>
        </div>
    </main>

    <footer class="bg-white border-t border-gray-200 mt-12 py-8 px-4 text-center text-gray-500 text-sm">
        <p>© 2026 ChemicalResistance.org | <a href="../../about.html" class="hover:underline">About</a></p>
    </footer>
</body>
</html>'''
    
    return html

# Generate pages
count = 0
for chem in chemicals:
    chem_slug = slugify(chem['name'])
    ratings = chem.get('ratings', {})
    
    for mat_code, (mat_slug, mat_name) in MATERIALS.items():
        if mat_code not in ratings:
            continue
        
        # Create directory
        dir_path = f'chemicals/{chem_slug}/{mat_slug}'
        os.makedirs(dir_path, exist_ok=True)
        
        # Generate page
        html = generate_page(chem, mat_code, mat_slug, mat_name)
        
        with open(f'{dir_path}/index.html', 'w') as f:
            f.write(html)
        
        count += 1

print(f"✅ Generated {count} chemical-to-material pages")
