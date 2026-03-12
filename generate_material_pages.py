#!/usr/bin/env python3
"""Generate material hub pages for ChemicalResistance.org"""

import json
import os

# Material definitions
MATERIALS = {
    'AL': {'name': 'Aluminium', 'slug': 'aluminium', 'desc': 'Aluminium is a lightweight metal with good corrosion resistance. It\'s commonly used in chemical processing equipment, tanks, and heat exchangers.'},
    'ECTFE_ETFE': {'name': 'ECTFE/ETFE', 'slug': 'ectfe-etfe', 'desc': 'ECTFE and ETFE are fluoropolymers with excellent chemical resistance and high temperature stability. Used in chemical processing and semiconductor industries.'},
    'FEP': {'name': 'FEP', 'slug': 'fep', 'desc': 'FEP (Fluorinated Ethylene Propylene) is a fluoropolymer with outstanding chemical resistance. Similar to PTFE but with better clarity and weldability.'},
    'LDPE': {'name': 'LDPE', 'slug': 'ldpe', 'desc': 'Low-Density Polyethylene (LDPE) is a flexible plastic with good chemical resistance. Commonly used for squeeze bottles, tubing, and flexible containers.'},
    'PA': {'name': 'Nylon (PA)', 'slug': 'nylon-pa', 'desc': 'Polyamide (Nylon) offers good mechanical strength and chemical resistance. Used in fittings, gears, and structural components in chemical applications.'},
    'PC': {'name': 'Polycarbonate', 'slug': 'polycarbonate', 'desc': 'Polycarbonate is a transparent thermoplastic with high impact resistance. Used in safety equipment and laboratory containers.'},
    'PETG': {'name': 'PETG', 'slug': 'petg', 'desc': 'PETG is a glycol-modified polyester with good chemical resistance and clarity. Common in food packaging and medical devices.'},
    'PMP': {'name': 'PMP', 'slug': 'pmp', 'desc': 'Polymethylpentene (PMP) is a transparent plastic with excellent chemical resistance. Used in laboratory equipment and measuring devices.'},
    'POM': {'name': 'Acetal (POM)', 'slug': 'acetal-pom', 'desc': 'Polyoxymethylene (Acetal) is an engineering plastic with high stiffness and low friction. Used in valves, pumps, and precision parts.'},
    'PS': {'name': 'Polystyrene', 'slug': 'polystyrene', 'desc': 'Polystyrene is an economical plastic with limited chemical resistance. Used in disposable labware and packaging.'},
    'PSU': {'name': 'Polysulfone', 'slug': 'polysulfone', 'desc': 'Polysulfone is a high-performance thermoplastic with excellent chemical resistance at high temperatures. Used in medical and food processing equipment.'},
    'PVC_HART': {'name': 'PVC (Rigid)', 'slug': 'pvc-rigid', 'desc': 'Rigid PVC (unplasticized) offers excellent chemical resistance to acids and bases. Widely used in pipes, tanks, and chemical storage.'},
    'PVC_WEICH': {'name': 'PVC (Flexible)', 'slug': 'pvc-flexible', 'desc': 'Flexible PVC contains plasticizers for flexibility. Used in tubing, cable insulation, and protective clothing.'},
    'PVDF': {'name': 'PVDF', 'slug': 'pvdf', 'desc': 'Polyvinylidene Fluoride (PVDF) is a high-purity fluoropolymer with excellent chemical resistance. Used in semiconductor and pharmaceutical industries.'},
    'SAN': {'name': 'SAN', 'slug': 'san', 'desc': 'Styrene Acrylonitrile (SAN) is a transparent plastic with better chemical resistance than polystyrene. Used in housewares and packaging.'},
    'V2A': {'name': 'Stainless Steel 304', 'slug': 'stainless-steel-304', 'desc': 'Stainless Steel 304 (V2A/1.4301) is the most common stainless steel. Excellent corrosion resistance for general chemical applications.'},
}

def rating_to_grade(rating):
    """Convert numeric rating to letter grade"""
    if rating == '1': return 'A'
    elif rating == '2': return 'B'
    elif rating == '3': return 'C'
    elif rating == '4': return 'D'
    else: return 'NR'

def generate_material_page(material_code, material_info, chemicals):
    """Generate HTML for a material page"""
    
    # Filter chemicals that have data for this material
    compatible = []
    for chem in chemicals:
        ratings = chem.get('ratings', {})
        if material_code in ratings:
            rating = ratings[material_code]
            compatible.append({
                'name': chem.get('name_en', chem.get('name', '')),
                'cas': chem.get('cas', ''),
                'formula': chem.get('formula', ''),
                'c20': rating_to_grade(rating.get('c20', '0')),
                'c50': rating_to_grade(rating.get('c50', '0')),
            })
    
    # Count ratings
    stats = {'A': 0, 'B': 0, 'C': 0, 'D': 0, 'NR': 0}
    for c in compatible:
        stats[c['c20']] = stats.get(c['c20'], 0) + 1
    
    # Generate table rows
    rows = []
    for c in sorted(compatible, key=lambda x: x['name']):
        rows.append(f'''
            <tr class="border-b border-gray-100 hover:bg-gray-50">
                <td class="py-3 px-4 font-medium text-gray-900">{c['name']}</td>
                <td class="py-3 px-4 text-gray-500 text-sm">{c['cas']}</td>
                <td class="py-3 px-4 text-center">
                    <span class="rating-{c['c20']} px-2 py-1 rounded text-sm font-medium">{c['c20']}</span>
                </td>
                <td class="py-3 px-4 text-center">
                    <span class="rating-{c['c50']} px-2 py-1 rounded text-sm font-medium">{c['c50']}</span>
                </td>
            </tr>''')
    
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
    <title>{material_info['name']} Chemical Resistance Chart | {len(compatible)}+ Chemicals Tested</title>
    <meta name="description" content="Complete {material_info['name']} chemical resistance chart. Find which chemicals are compatible at 20°C and 50°C. Free searchable database.">
    <link rel="icon" href="../favicon.ico" type="image/x-icon">
    <link rel="canonical" href="https://chemicalresistance.org/materials/{material_info['slug']}">
    <meta property="og:title" content="{material_info['name']} Chemical Resistance Chart">
    <meta property="og:description" content="Complete compatibility data for {material_info['name']}. {len(compatible)}+ chemicals tested at multiple temperatures.">
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
            <div class="flex items-center gap-4 text-sm">
                <a href="../index.html" class="text-gray-600 hover:text-gray-900">← Back to Search</a>
            </div>
        </div>
    </header>

    <section class="bg-gradient-to-b from-emerald-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <div class="flex items-center gap-2 text-sm text-emerald-600 mb-3">
                <a href="../index.html" class="hover:underline">Home</a>
                <span>›</span>
                <span>Materials</span>
                <span>›</span>
                <span class="text-gray-600">{material_info['name']}</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {material_info['name']} Chemical Resistance Chart
            </h1>
            <p class="text-lg text-gray-600 mb-4">
                {material_info['desc']}
            </p>
            <div class="flex flex-wrap gap-3">
                <span class="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">{len(compatible)}+ chemicals tested</span>
                <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">20°C & 50°C data</span>
                <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">Free to use</span>
            </div>
        </div>
    </section>

    <section class="px-4 py-6 border-b border-gray-200 bg-white">
        <div class="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
                <div class="text-2xl font-bold text-emerald-600">{stats['A']}</div>
                <div class="text-sm text-gray-500">Excellent (A)</div>
            </div>
            <div>
                <div class="text-2xl font-bold text-blue-600">{stats['B']}</div>
                <div class="text-sm text-gray-500">Good (B)</div>
            </div>
            <div>
                <div class="text-2xl font-bold text-amber-600">{stats['C']}</div>
                <div class="text-sm text-gray-500">Limited (C)</div>
            </div>
            <div>
                <div class="text-2xl font-bold text-red-600">{stats['D']}</div>
                <div class="text-sm text-gray-500">Not Recommended (D)</div>
            </div>
        </div>
    </section>

    <section class="px-4 py-6 bg-white border-b border-gray-200">
        <div class="max-w-4xl mx-auto">
            <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="font-semibold text-gray-900 mb-2">Rating Scale</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div class="flex items-center gap-2"><span class="rating-A px-2 py-1 rounded">A</span> Excellent resistance</div>
                    <div class="flex items-center gap-2"><span class="rating-B px-2 py-1 rounded">B</span> Good resistance</div>
                    <div class="flex items-center gap-2"><span class="rating-C px-2 py-1 rounded">C</span> Limited resistance</div>
                    <div class="flex items-center gap-2"><span class="rating-D px-2 py-1 rounded">D</span> Not recommended</div>
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-gray-900">Chemical Compatibility Table</h2>
                <input type="text" id="searchInput" placeholder="Search chemicals..." 
                       class="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                       onkeyup="filterTable()">
            </div>
            
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table class="w-full" id="chemTable">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="text-left py-3 px-4 font-semibold text-gray-900">Chemical</th>
                            <th class="text-left py-3 px-4 font-semibold text-gray-900">CAS</th>
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
            <h2 class="text-xl font-bold text-gray-900 mb-4">Other Materials</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <a href="hdpe" class="bg-white p-3 rounded-lg border border-gray-200 hover:border-emerald-500 text-center text-sm font-medium text-gray-700 hover:text-emerald-600">HDPE</a>
                <a href="pp" class="bg-white p-3 rounded-lg border border-gray-200 hover:border-emerald-500 text-center text-sm font-medium text-gray-700 hover:text-emerald-600">Polypropylene</a>
                <a href="ptfe" class="bg-white p-3 rounded-lg border border-gray-200 hover:border-emerald-500 text-center text-sm font-medium text-gray-700 hover:text-emerald-600">PTFE</a>
                <a href="ss316" class="bg-white p-3 rounded-lg border border-gray-200 hover:border-emerald-500 text-center text-sm font-medium text-gray-700 hover:text-emerald-600">Stainless Steel 316</a>
            </div>
        </div>
    </section>

    <footer class="bg-gray-900 text-gray-400 px-4 py-8">
        <div class="max-w-4xl mx-auto text-center text-sm">
            <p>© 2026 ChemicalResistance.org — Free chemical compatibility database</p>
            <p class="mt-2">Data sourced from manufacturer specifications. Always verify with your supplier.</p>
        </div>
    </footer>

    <script>
        function filterTable() {{
            const input = document.getElementById('searchInput').value.toLowerCase();
            const rows = document.querySelectorAll('#chemTable tbody tr');
            rows.forEach(row => {{
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(input) ? '' : 'none';
            }});
        }}
    </script>
</body>
</html>'''
    
    return html

def main():
    # Load chemicals
    with open('data/chemicals_burkle_full.json', 'r') as f:
        chemicals = json.load(f)
    
    print(f"Loaded {len(chemicals)} chemicals")
    
    # Generate pages for missing materials
    os.makedirs('materials', exist_ok=True)
    
    generated = 0
    for code, info in MATERIALS.items():
        output_path = f"materials/{info['slug']}.html"
        
        if os.path.exists(output_path):
            print(f"  Skipping {info['name']} (exists)")
            continue
        
        html = generate_material_page(code, info, chemicals)
        
        with open(output_path, 'w') as f:
            f.write(html)
        
        print(f"✅ Generated {info['name']} ({info['slug']}.html)")
        generated += 1
    
    print(f"\n✅ Generated {generated} new material pages")

if __name__ == '__main__':
    main()
