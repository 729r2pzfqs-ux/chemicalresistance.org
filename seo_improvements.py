#!/usr/bin/env python3
"""
SEO Improvements for chemicalresistance.org
Based on Google Search Console keyword analysis (3 months data)
"""

import os
import json
import re

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Material data key to directory mapping
MAT_KEY_TO_DIR = {
    'AL': 'aluminium', 'ECTFE_ETFE': 'ectfe-etfe', 'EPDM': 'epdm',
    'FEP': 'fep', 'FPM': 'viton', 'HDPE': 'hdpe', 'LDPE': 'ldpe',
    'NBR': 'nbr', 'PA': 'nylon-pa', 'PC': 'polycarbonate', 'PETG': 'petg',
    'PMP': 'pmp', 'POM': 'acetal-pom', 'PP': 'pp', 'PS': 'polystyrene',
    'PSU': 'polysulfone', 'PTFE': 'ptfe', 'PVC_HART': 'pvc-rigid',
    'PVC_WEICH': 'pvc-flexible', 'PVDF': 'pvdf', 'SAN': 'san',
    'SI': 'silicone', 'V2A': 'stainless-steel-304', 'V4A': 'ss316'
}

MAT_DIR_TO_KEY = {v: k for k, v in MAT_KEY_TO_DIR.items()}

# Material display names
MAT_DISPLAY = {
    'aluminium': 'Aluminium', 'ectfe-etfe': 'ECTFE/ETFE', 'epdm': 'EPDM',
    'fep': 'FEP', 'viton': 'Viton (FKM)', 'hdpe': 'HDPE', 'ldpe': 'LDPE',
    'nbr': 'NBR', 'nylon-pa': 'Nylon (PA)', 'polycarbonate': 'Polycarbonate',
    'petg': 'PETG', 'pmp': 'PMP', 'acetal-pom': 'Acetal (POM)', 'pp': 'PP',
    'polystyrene': 'Polystyrene', 'polysulfone': 'Polysulfone', 'ptfe': 'PTFE',
    'pvc-rigid': 'PVC Rigid', 'pvc-flexible': 'PVC Flexible', 'pvdf': 'PVDF',
    'san': 'SAN', 'silicone': 'Silicone', 'stainless-steel-304': 'SS 304',
    'ss316': 'SS 316'
}

# Material full names for SEO
MAT_FULL_NAME = {
    'nbr': 'Nitrile Butadiene Rubber',
    'ptfe': 'Polytetrafluoroethylene (Teflon)',
    'hdpe': 'High-Density Polyethylene',
    'epdm': 'Ethylene Propylene Diene Monomer',
    'pvdf': 'Polyvinylidene Fluoride',
    'fep': 'Fluorinated Ethylene Propylene',
    'ectfe-etfe': 'Ethylene Chlorotrifluoroethylene / Ethylene Tetrafluoroethylene',
    'polysulfone': 'Polysulfone (PSU)',
    'ss316': '316 Stainless Steel (V4A)',
    'silicone': 'Silicone Rubber',
    'viton': 'Viton (Fluoroelastomer FKM/FPM)',
    'pp': 'Polypropylene',
    'aluminium': 'Aluminium',
    'stainless-steel-304': '304 Stainless Steel (V2A)',
}

# Related materials groups
RELATED_GROUPS = {
    'rubbers': ['nbr', 'epdm', 'silicone', 'viton', 'pvc-flexible'],
    'fluoropolymers': ['ptfe', 'fep', 'ectfe-etfe', 'pvdf'],
    'plastics': ['hdpe', 'ldpe', 'pp', 'polycarbonate', 'petg', 'pvc-rigid', 'nylon-pa', 'acetal-pom', 'polystyrene', 'san', 'pmp', 'polysulfone'],
    'metals': ['aluminium', 'stainless-steel-304', 'ss316'],
}

def get_related_materials(mat_dir):
    """Get related materials for a given material."""
    related = []
    for group_name, members in RELATED_GROUPS.items():
        if mat_dir in members:
            related.extend([m for m in members if m != mat_dir])
    # Deduplicate and limit
    seen = set()
    result = []
    for m in related:
        if m not in seen:
            seen.add(m)
            result.append(m)
    return result[:8]


# ============================================================
# IMPROVEMENT 1: Fix French viscosity title & meta description
# ============================================================
def fix_french_viscosity():
    """Fix the French viscosity page title and meta description for better CTR."""
    print("\n=== IMPROVEMENT 1: Fixing French viscosity page ===")

    for path in ['fr/viscosity/index.html', 'fr/viscosity.html']:
        filepath = os.path.join(BASE_DIR, path)
        if not os.path.exists(filepath):
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Fix title - include the exact search phrase people use
        old_title = '<title>Tableau de Viscosité des Liquides | 100+ Substances | Recherche Gratuite</title>'
        new_title = '<title>Table de Viscosité des Liquides — Valeurs en mPa·s pour 100+ Substances | ChemicalResistance.org</title>'
        content = content.replace(old_title, new_title)

        # Fix meta description - more compelling, action-oriented
        old_desc = '<meta name="description" content="Recherche gratuite de viscosité pour plus de 100 liquides et substances. Trouvez les valeurs de viscosité en mPa·s (cP) pour la sélection de pompes et la manipulation des fluides.">'
        new_desc = '<meta name="description" content="Table de viscosité des liquides : trouvez instantanément la viscosité en mPa·s (cP) de plus de 100 substances — eau, huile, glycérine, acides et solvants. Données à 20°C et 50°C pour la sélection de pompes.">'
        content = content.replace(old_desc, new_desc)

        # Fix OG title too
        old_og = '<meta property="og:title" content="Tableau de Viscosité des Liquides | 100+ Substances">'
        new_og = '<meta property="og:title" content="Table de Viscosité des Liquides — 100+ Substances en mPa·s">'
        content = content.replace(old_og, new_og)

        # Fix OG description
        old_og_desc = '<meta property="og:description" content="Outil gratuit de recherche de viscosité. Trouvez les valeurs pour la sélection de pompes et la manipulation des fluides.">'
        new_og_desc = '<meta property="og:description" content="Consultez la table de viscosité complète : valeurs en mPa·s pour plus de 100 liquides. Recherche instantanée et gratuite.">'
        content = content.replace(old_og_desc, new_og_desc)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  Fixed: {path}")


# ============================================================
# IMPROVEMENT 2: Add Related Materials sections to material pages
# ============================================================
def add_related_materials():
    """Add Related Materials sections with richer cross-linking."""
    print("\n=== IMPROVEMENT 2: Adding Related Materials sections ===")

    mat_dirs = [d for d in os.listdir(os.path.join(BASE_DIR, 'materials'))
                if os.path.isdir(os.path.join(BASE_DIR, 'materials', d))
                and d not in ('de', 'es', 'fr', 'pt')]

    count = 0
    for mat_dir in mat_dirs:
        filepath = os.path.join(BASE_DIR, 'materials', mat_dir, 'index.html')
        if not os.path.exists(filepath):
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Skip if already has a "Related Materials" section (not "Compare Materials")
        if 'Related Materials' in content:
            continue

        related = get_related_materials(mat_dir)
        if not related:
            continue

        display_name = MAT_DISPLAY.get(mat_dir, mat_dir.upper())

        # Build the Related Materials HTML
        related_html = f'''
    <!-- Related Materials -->
    <section class="px-4 py-12 border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Related Materials</h2>
            <p class="text-gray-600 mb-6">Explore other materials commonly compared with {display_name}:</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">'''

        for rel in related[:8]:
            rel_display = MAT_DISPLAY.get(rel, rel)
            rel_full = MAT_FULL_NAME.get(rel, '')
            subtitle = rel_full[:30] + '...' if len(rel_full) > 30 else rel_full
            if not subtitle:
                subtitle = 'View chart'
            related_html += f'''
                <a href="../{rel}" class="p-4 rounded-xl border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-colors text-center">
                    <div class="font-bold text-gray-900">{rel_display}</div>
                    <div class="text-xs text-gray-500">{subtitle}</div>
                </a>'''

        related_html += '''
            </div>
        </div>
    </section>
'''
        # Insert before footer
        footer_marker = '    <!-- Footer -->'
        if footer_marker in content:
            content = content.replace(footer_marker, related_html + '\n' + footer_marker)

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            count += 1

    print(f"  Added Related Materials sections to {count} material pages")


# ============================================================
# IMPROVEMENT 3: Create comparison pages
# ============================================================
def create_comparison_pages():
    """Create /compare/ pages for high-demand material pairs."""
    print("\n=== IMPROVEMENT 3: Creating comparison pages ===")

    comparisons = [
        {
            'slug': 'etfe-vs-ectfe',
            'mat_a': 'ECTFE_ETFE', 'mat_b': 'ECTFE_ETFE',  # same data key
            'name_a': 'ETFE', 'name_b': 'ECTFE',
            'full_a': 'Ethylene Tetrafluoroethylene',
            'full_b': 'Ethylene Chlorotrifluoroethylene',
            'desc_a': 'ETFE offers excellent chemical resistance with good mechanical strength. It\'s transparent and recyclable, commonly used for architectural glazing and chemical processing.',
            'desc_b': 'ECTFE has superior chemical resistance, especially to chlorinated solvents. It offers better permeation resistance and is preferred for aggressive chemical environments.',
            'when_a': 'Architectural applications, wire insulation, solar panel covers, general chemical processing where transparency is valued.',
            'when_b': 'Aggressive chemical environments, chlorinated solvent handling, tank linings, exhaust systems with acid fumes.',
            'temp_a': '-100°C to 150°C', 'temp_b': '-76°C to 150°C',
        },
        {
            'slug': 'ptfe-vs-fep',
            'mat_a': 'PTFE', 'mat_b': 'FEP',
            'name_a': 'PTFE', 'name_b': 'FEP',
            'full_a': 'Polytetrafluoroethylene (Teflon)',
            'full_b': 'Fluorinated Ethylene Propylene',
            'desc_a': 'PTFE is the gold standard for chemical resistance — virtually inert to all chemicals. Cannot be melt-processed, so it\'s machined or sintered.',
            'desc_b': 'FEP shares most of PTFE\'s chemical resistance but can be melt-processed, making it ideal for tubing, coatings, and complex shapes.',
            'when_a': 'Maximum chemical resistance needed, high-temperature seals, gaskets, bearings, non-stick surfaces.',
            'when_b': 'Tubing and linings requiring chemical resistance, lower-cost alternative to PTFE, transparent applications.',
            'temp_a': '-200°C to 260°C', 'temp_b': '-200°C to 200°C',
        },
        {
            'slug': 'nbr-vs-epdm',
            'mat_a': 'NBR', 'mat_b': 'EPDM',
            'name_a': 'NBR', 'name_b': 'EPDM',
            'full_a': 'Nitrile Butadiene Rubber (Buna-N)',
            'full_b': 'Ethylene Propylene Diene Monomer',
            'desc_a': 'NBR is the standard elastomer for oil and fuel resistance. Most widely used rubber for hydraulic seals and automotive fuel systems.',
            'desc_b': 'EPDM excels in water, steam, and outdoor applications. Outstanding ozone/UV resistance makes it ideal for weathering applications.',
            'when_a': 'Oil and fuel systems, hydraulic equipment, automotive seals, petroleum-based fluids.',
            'when_b': 'Water and steam systems, outdoor seals, roofing, automotive coolant systems, brake fluid.',
            'temp_a': '-30°C to 120°C', 'temp_b': '-50°C to 150°C',
        },
        {
            'slug': 'hdpe-vs-pvdf',
            'mat_a': 'HDPE', 'mat_b': 'PVDF',
            'name_a': 'HDPE', 'name_b': 'PVDF',
            'full_a': 'High-Density Polyethylene',
            'full_b': 'Polyvinylidene Fluoride',
            'desc_a': 'HDPE is an economical thermoplastic with good chemical resistance to many acids and bases. Lightweight and easy to fabricate.',
            'desc_b': 'PVDF offers superior chemical resistance, especially to solvents and halogens. Higher temperature rating and mechanical strength than HDPE.',
            'when_a': 'Chemical storage tanks, piping for mild chemicals, containers, general-purpose chemical handling on a budget.',
            'when_b': 'Aggressive solvents, high-purity applications, semiconductor manufacturing, pharmaceutical processing.',
            'temp_a': '-50°C to 80°C', 'temp_b': '-30°C to 150°C',
        },
        {
            'slug': 'polysulfone-vs-pvdf',
            'mat_a': 'PSU', 'mat_b': 'PVDF',
            'name_a': 'Polysulfone', 'name_b': 'PVDF',
            'full_a': 'Polysulfone (PSU)',
            'full_b': 'Polyvinylidene Fluoride',
            'desc_a': 'Polysulfone is a high-performance thermoplastic with excellent thermal stability, transparency, and resistance to aqueous acids and bases.',
            'desc_b': 'PVDF provides outstanding chemical resistance to solvents and halogens with excellent mechanical properties and purity.',
            'when_a': 'Medical devices, water filtration membranes, hot water systems, sterilizable equipment.',
            'when_b': 'Aggressive chemical handling, semiconductor processing, piping for solvents and acids.',
            'temp_a': '-100°C to 160°C', 'temp_b': '-30°C to 150°C',
        },
    ]

    compare_dir = os.path.join(BASE_DIR, 'compare')
    os.makedirs(compare_dir, exist_ok=True)

    # Load chemical data for rating comparison
    with open(os.path.join(BASE_DIR, 'data', 'chemicals_burkle_full.json'), 'r') as f:
        chemicals = json.load(f)

    for comp in comparisons:
        slug = comp['slug']
        page_dir = os.path.join(compare_dir, slug)
        os.makedirs(page_dir, exist_ok=True)

        # Count compatible chemicals for each material
        a_excellent = sum(1 for c in chemicals if c['ratings'].get(comp['mat_a'], {}).get('c20') == '1')
        b_excellent = sum(1 for c in chemicals if c['ratings'].get(comp['mat_b'], {}).get('c20') == '1')
        a_good = sum(1 for c in chemicals if c['ratings'].get(comp['mat_a'], {}).get('c20') in ('1', '2'))
        b_good = sum(1 for c in chemicals if c['ratings'].get(comp['mat_b'], {}).get('c20') in ('1', '2'))

        title = f"{comp['name_a']} vs {comp['name_b']}: Chemical Resistance Comparison"
        description = f"Compare {comp['name_a']} and {comp['name_b']} chemical resistance side-by-side. See which material is better for your application — temperature range, compatibility ratings, and recommendations."

        # Pre-escape strings for JSON-LD (can't use backslash in f-string expr in Python 3.10)
        dq = '"'
        esc_dq = '&quot;'
        desc_a_esc = comp['desc_a'].replace(dq, esc_dq)
        desc_b_esc = comp['desc_b'].replace(dq, esc_dq)
        when_a_esc = comp['when_a'].replace(dq, esc_dq)
        when_b_esc = comp['when_b'].replace(dq, esc_dq)
        mat_a_dir = MAT_KEY_TO_DIR.get(comp['mat_a'], comp['name_a'].lower())
        mat_b_dir = MAT_KEY_TO_DIR.get(comp['mat_b'], comp['name_b'].lower())

        html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LTK6VVHYDW"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag("js",new Date());gtag("config","G-LTK6VVHYDW");</script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{description}">
    <link rel="canonical" href="https://chemicalresistance.org/compare/{slug}/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{description}">
    <meta property="og:type" content="article">
    <link rel="stylesheet" href="/css/tailwind.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        * {{ font-family: 'Inter', sans-serif; }}
        body {{ background: #f8fafc; }}
        .rating-A {{ background: #22c55e; color: white; }}
        .rating-B {{ background: #3b82f6; color: white; }}
        .rating-C {{ background: #f59e0b; color: white; }}
        .rating-D {{ background: #ef4444; color: white; }}
    </style>
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {{
      "@type": "Question",
      "name": "What is the difference between {comp['name_a']} and {comp['name_b']}?",
      "acceptedAnswer": {{
        "@type": "Answer",
        "text": "{desc_a_esc} {desc_b_esc}"
      }}
    }},
    {{
      "@type": "Question",
      "name": "When should I use {comp['name_a']} instead of {comp['name_b']}?",
      "acceptedAnswer": {{
        "@type": "Answer",
        "text": "Use {comp['name_a']} for: {when_a_esc} Use {comp['name_b']} for: {when_b_esc}"
      }}
    }},
    {{
      "@type": "Question",
      "name": "Which has better chemical resistance: {comp['name_a']} or {comp['name_b']}?",
      "acceptedAnswer": {{
        "@type": "Answer",
        "text": "{comp['name_a']} has {a_excellent} chemicals rated Excellent (A) at 20°C, while {comp['name_b']} has {b_excellent}. Including Good (B) ratings, {comp['name_a']} is compatible with {a_good} chemicals and {comp['name_b']} with {b_good}."
      }}
    }}
  ]
}}
</script>
</head>
<body class="text-gray-700 min-h-screen">
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2">
                <img src="/logos/logo-icon-128x128.png" alt="ChemicalResistance" class="w-10 h-10 rounded-xl">
                <div>
                    <div class="font-bold text-gray-900">ChemicalResistance.org</div>
                    <div class="text-xs text-gray-500 hidden sm:block">Chemical compatibility database</div>
                </div>
            </a>
            <div class="flex items-center gap-4 text-sm">
                <a href="/" class="text-gray-600 hover:text-gray-900">&larr; Back to Search</a>
            </div>
        </div>
    </header>

    <section class="bg-gradient-to-b from-blue-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <div class="flex items-center gap-2 text-sm text-blue-600 mb-3">
                <a href="/" class="hover:underline">Home</a>
                <span>&rsaquo;</span>
                <a href="/compare/" class="hover:underline">Compare</a>
                <span>&rsaquo;</span>
                <span class="text-gray-600">{comp['name_a']} vs {comp['name_b']}</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {comp['name_a']} vs {comp['name_b']}
            </h1>
            <p class="text-lg text-gray-600 mb-4">
                Side-by-side chemical resistance comparison to help you choose the right material.
            </p>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-1">{comp['name_a']}</h2>
                    <p class="text-sm text-blue-600 mb-3">{comp['full_a']}</p>
                    <p class="text-gray-600 mb-4">{comp['desc_a']}</p>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between py-1 border-b border-gray-100">
                            <span class="text-gray-500">Temperature Range</span>
                            <span class="font-medium">{comp['temp_a']}</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-gray-100">
                            <span class="text-gray-500">Excellent (A) Ratings</span>
                            <span class="font-medium text-emerald-600">{a_excellent} chemicals</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-gray-100">
                            <span class="text-gray-500">Compatible (A+B)</span>
                            <span class="font-medium text-blue-600">{a_good} chemicals</span>
                        </div>
                    </div>
                    <a href="/materials/{mat_a_dir}/" class="mt-4 inline-block text-sm text-blue-600 hover:underline">View full {comp['name_a']} chart &rarr;</a>
                </div>
                <div class="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-1">{comp['name_b']}</h2>
                    <p class="text-sm text-blue-600 mb-3">{comp['full_b']}</p>
                    <p class="text-gray-600 mb-4">{comp['desc_b']}</p>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between py-1 border-b border-gray-100">
                            <span class="text-gray-500">Temperature Range</span>
                            <span class="font-medium">{comp['temp_b']}</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-gray-100">
                            <span class="text-gray-500">Excellent (A) Ratings</span>
                            <span class="font-medium text-emerald-600">{b_excellent} chemicals</span>
                        </div>
                        <div class="flex justify-between py-1 border-b border-gray-100">
                            <span class="text-gray-500">Compatible (A+B)</span>
                            <span class="font-medium text-blue-600">{b_good} chemicals</span>
                        </div>
                    </div>
                    <a href="/materials/{mat_b_dir}/" class="mt-4 inline-block text-sm text-blue-600 hover:underline">View full {comp['name_b']} chart &rarr;</a>
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 py-8 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">When to Use Each Material</h2>
            <div class="grid md:grid-cols-2 gap-6">
                <div class="p-5 rounded-xl bg-blue-50 border border-blue-100">
                    <h3 class="font-bold text-gray-900 mb-2">Choose {comp['name_a']} when:</h3>
                    <p class="text-gray-600 text-sm">{comp['when_a']}</p>
                </div>
                <div class="p-5 rounded-xl bg-amber-50 border border-amber-100">
                    <h3 class="font-bold text-gray-900 mb-2">Choose {comp['name_b']} when:</h3>
                    <p class="text-gray-600 text-sm">{comp['when_b']}</p>
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Side-by-Side Chemical Ratings</h2>
            <p class="text-gray-600 mb-4">Showing chemicals where these materials differ in resistance rating at 20°C:</p>
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gray-50 text-left text-sm">
                                <th class="py-3 px-4 font-semibold text-gray-600">Chemical</th>
                                <th class="py-3 px-4 font-semibold text-gray-600 text-center">{comp['name_a']}</th>
                                <th class="py-3 px-4 font-semibold text-gray-600 text-center">{comp['name_b']}</th>
                            </tr>
                        </thead>
                        <tbody id="compareTable" class="divide-y divide-gray-100"></tbody>
                    </table>
                </div>
            </div>
            <div id="loadMore" class="mt-4 text-center hidden">
                <button onclick="loadMore()" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">Load more</button>
            </div>
        </div>
    </section>

    <section class="px-4 py-12 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">More Comparisons</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">'''

        for other in comparisons:
            if other['slug'] != slug:
                html += f'''
                <a href="/compare/{other['slug']}/" class="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-center">
                    <div class="font-bold text-gray-900">{other['name_a']} vs {other['name_b']}</div>
                    <div class="text-xs text-gray-500">View comparison</div>
                </a>'''

        html += f'''
            </div>
        </div>
    </section>

    <footer class="bg-gray-900 text-gray-400 py-8 px-4">
        <div class="max-w-5xl mx-auto text-center text-sm">
            <p>&copy; 2026 ChemicalResistance.org — Free chemical compatibility tool</p>
            <p class="mt-2">Data sources: Bürkle, INEOS, industry standards</p>
        </div>
    </footer>

    <script>
    const MAT_A = '{comp["mat_a"]}';
    const MAT_B = '{comp["mat_b"]}';
    let allDiffs = [];
    let displayCount = 30;
    const ratingMap = {{ '1': 'A', '2': 'B', '3': 'C', '4': 'D', '0': 'NR' }};

    fetch('/data/chemicals_burkle_full.json')
        .then(r => r.json())
        .then(data => {{
            allDiffs = data.filter(c => {{
                const rA = c.ratings[MAT_A]?.c20;
                const rB = c.ratings[MAT_B]?.c20;
                return rA && rB && rA !== rB;
            }}).sort((a, b) => {{
                const diff_a = Math.abs((a.ratings[MAT_A]?.c20 || 0) - (a.ratings[MAT_B]?.c20 || 0));
                const diff_b = Math.abs((b.ratings[MAT_A]?.c20 || 0) - (b.ratings[MAT_B]?.c20 || 0));
                return diff_b - diff_a;
            }});
            renderTable();
        }});

    function renderTable() {{
        const tbody = document.getElementById('compareTable');
        const toShow = allDiffs.slice(0, displayCount);
        document.getElementById('loadMore').classList.toggle('hidden', displayCount >= allDiffs.length);
        tbody.innerHTML = toShow.map(c => {{
            const name = c.name_en || c.name;
            const rA = ratingMap[c.ratings[MAT_A]?.c20] || 'NR';
            const rB = ratingMap[c.ratings[MAT_B]?.c20] || 'NR';
            return `<tr class="hover:bg-gray-50">
                <td class="py-3 px-4 text-sm font-medium text-gray-900">${{name}}</td>
                <td class="py-3 px-4 text-center"><span class="rating-${{rA}} px-2 py-1 rounded text-xs font-bold">${{rA}}</span></td>
                <td class="py-3 px-4 text-center"><span class="rating-${{rB}} px-2 py-1 rounded text-xs font-bold">${{rB}}</span></td>
            </tr>`;
        }}).join('');
    }}

    function loadMore() {{ displayCount += 30; renderTable(); }}
    lucide.createIcons();
    </script>
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{{"token": "cba547e85ee54e0f9cdc27e68405eead"}}'></script>
</body>
</html>'''

        with open(os.path.join(page_dir, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"  Created: compare/{slug}/index.html")

    # Create compare index page
    index_html = '''<!DOCTYPE html>
<html lang="en">
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LTK6VVHYDW"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-LTK6VVHYDW");</script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Material Comparison Tool | Chemical Resistance Side-by-Side</title>
    <meta name="description" content="Compare chemical resistance of different materials side-by-side. ETFE vs ECTFE, PTFE vs FEP, NBR vs EPDM and more.">
    <link rel="canonical" href="https://chemicalresistance.org/compare/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="/css/tailwind.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>* { font-family: 'Inter', sans-serif; } body { background: #f8fafc; }</style>
</head>
<body class="text-gray-700 min-h-screen">
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2">
                <img src="/logos/logo-icon-128x128.png" alt="ChemicalResistance" class="w-10 h-10 rounded-xl">
                <div>
                    <div class="font-bold text-gray-900">ChemicalResistance.org</div>
                    <div class="text-xs text-gray-500">Chemical compatibility database</div>
                </div>
            </a>
        </div>
    </header>
    <section class="bg-gradient-to-b from-blue-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-3">Material Comparisons</h1>
            <p class="text-lg text-gray-600">Side-by-side chemical resistance comparisons to help you choose the right material.</p>
        </div>
    </section>
    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
'''
    for comp in comparisons:
        index_html += f'''            <a href="/compare/{comp['slug']}/" class="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                <h2 class="text-lg font-bold text-gray-900 mb-1">{comp['name_a']} vs {comp['name_b']}</h2>
                <p class="text-sm text-gray-600">{comp['full_a']} vs {comp['full_b']}</p>
            </a>
'''
    index_html += '''        </div>
    </section>
    <footer class="bg-gray-900 text-gray-400 py-8 px-4">
        <div class="max-w-5xl mx-auto text-center text-sm">
            <p>&copy; 2026 ChemicalResistance.org</p>
        </div>
    </footer>
<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "cba547e85ee54e0f9cdc27e68405eead"}'></script>
</body>
</html>'''

    with open(os.path.join(compare_dir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(index_html)
    print(f"  Created: compare/index.html")


# ============================================================
# IMPROVEMENT 4: Create compatibility chart pages
# ============================================================
def create_chart_pages():
    """Create visual compatibility chart pages for high-demand materials."""
    print("\n=== IMPROVEMENT 4: Creating compatibility chart pages ===")

    charts = [
        {'slug': 'ptfe-compatibility-chart', 'mat_key': 'PTFE', 'name': 'PTFE', 'full': 'Polytetrafluoroethylene (Teflon)', 'color': 'emerald'},
        {'slug': 'ss316-compatibility-chart', 'mat_key': 'V4A', 'name': '316 Stainless Steel', 'full': '316 Stainless Steel (V4A/1.4404)', 'color': 'blue'},
        {'slug': 'hdpe-compatibility-chart', 'mat_key': 'HDPE', 'name': 'HDPE', 'full': 'High-Density Polyethylene', 'color': 'amber'},
        {'slug': 'nbr-compatibility-chart', 'mat_key': 'NBR', 'name': 'NBR', 'full': 'Nitrile Butadiene Rubber (Buna-N)', 'color': 'purple'},
    ]

    charts_dir = os.path.join(BASE_DIR, 'charts')
    os.makedirs(charts_dir, exist_ok=True)

    for chart in charts:
        page_dir = os.path.join(charts_dir, chart['slug'])
        os.makedirs(page_dir, exist_ok=True)

        mat_dir = MAT_KEY_TO_DIR.get(chart['mat_key'], chart['name'].lower())
        title = f"{chart['name']} Compatibility Chart — Chemical Resistance Ratings"
        desc = f"Visual {chart['name']} ({chart['full']}) chemical compatibility chart. Color-coded resistance ratings for 900+ chemicals at 20°C and 50°C. Printable format."

        html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LTK6VVHYDW"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag("js",new Date());gtag("config","G-LTK6VVHYDW");</script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{desc}">
    <link rel="canonical" href="https://chemicalresistance.org/charts/{chart['slug']}/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{desc}">
    <link rel="stylesheet" href="/css/tailwind.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        * {{ font-family: 'Inter', sans-serif; }}
        body {{ background: #f8fafc; }}
        .rating-A {{ background: #22c55e; color: white; }}
        .rating-B {{ background: #3b82f6; color: white; }}
        .rating-C {{ background: #f59e0b; color: white; }}
        .rating-D {{ background: #ef4444; color: white; }}
        .rating-NR {{ background: #e5e7eb; color: #9ca3af; }}
        @media print {{
            header, footer, .no-print {{ display: none !important; }}
            body {{ background: white; }}
            .print-break {{ page-break-before: always; }}
        }}
    </style>
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {{
      "@type": "Question",
      "name": "What is a {chart['name']} compatibility chart?",
      "acceptedAnswer": {{
        "@type": "Answer",
        "text": "A {chart['name']} compatibility chart shows the chemical resistance ratings of {chart['full']} against various chemicals. Ratings range from A (Excellent) to D (Not Recommended), tested at 20°C and 50°C."
      }}
    }},
    {{
      "@type": "Question",
      "name": "How do I read the {chart['name']} chemical resistance chart?",
      "acceptedAnswer": {{
        "@type": "Answer",
        "text": "Rating A (green) means excellent resistance with no effect. B (blue) means good resistance with minor effect. C (amber) means limited resistance — short-term use only. D (red) means not recommended — the material will degrade."
      }}
    }}
  ]
}}
</script>
</head>
<body class="text-gray-700 min-h-screen">
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50 no-print">
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2">
                <img src="/logos/logo-icon-128x128.png" alt="ChemicalResistance" class="w-10 h-10 rounded-xl">
                <div>
                    <div class="font-bold text-gray-900">ChemicalResistance.org</div>
                    <div class="text-xs text-gray-500 hidden sm:block">Chemical compatibility database</div>
                </div>
            </a>
            <div class="flex items-center gap-4 text-sm no-print">
                <button onclick="window.print()" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 flex items-center gap-2">
                    <i data-lucide="printer" class="w-4 h-4"></i> Print Chart
                </button>
            </div>
        </div>
    </header>

    <section class="bg-gradient-to-b from-{chart['color']}-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-6xl mx-auto">
            <div class="flex items-center gap-2 text-sm text-{chart['color']}-600 mb-3">
                <a href="/" class="hover:underline">Home</a>
                <span>&rsaquo;</span>
                <a href="/charts/" class="hover:underline">Charts</a>
                <span>&rsaquo;</span>
                <span class="text-gray-600">{chart['name']} Chart</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{chart['name']} Compatibility Chart</h1>
            <p class="text-lg text-gray-600 mb-4">Complete chemical resistance ratings for {chart['full']}. Color-coded for quick reference.</p>
            <div class="flex flex-wrap gap-4 text-sm">
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-A"></span> A = Excellent</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-B"></span> B = Good</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-C"></span> C = Limited</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-D"></span> D = Not Recommended</span>
            </div>
        </div>
    </section>

    <section class="px-4 py-6 no-print">
        <div class="max-w-6xl mx-auto">
            <div class="bg-white rounded-xl border border-gray-200 p-4">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <input type="text" id="searchInput" placeholder="Search chemicals..." class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-{chart['color']}-500 focus:ring-2 focus:ring-{chart['color']}-100 outline-none">
                    </div>
                    <select id="ratingFilter" class="px-4 py-2 border border-gray-200 rounded-lg">
                        <option value="all">All ratings</option>
                        <option value="A">A - Excellent only</option>
                        <option value="B">B - Good only</option>
                        <option value="AB">A & B (Compatible)</option>
                        <option value="D">D - Not Recommended</option>
                    </select>
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 py-4">
        <div class="max-w-6xl mx-auto">
            <div class="mb-4 text-sm text-gray-500">
                Showing <span id="resultCount" class="font-semibold text-gray-700">0</span> chemicals
            </div>
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gray-50 text-left text-sm">
                                <th class="py-3 px-4 font-semibold text-gray-600">Chemical</th>
                                <th class="py-3 px-4 font-semibold text-gray-600">Concentration</th>
                                <th class="py-3 px-4 font-semibold text-gray-600 text-center">20°C</th>
                                <th class="py-3 px-4 font-semibold text-gray-600 text-center">50°C</th>
                                <th class="py-3 px-4 font-semibold text-gray-600">CAS</th>
                            </tr>
                        </thead>
                        <tbody id="chartTable" class="divide-y divide-gray-100"></tbody>
                    </table>
                </div>
            </div>
            <div id="loadMore" class="mt-4 text-center hidden">
                <button onclick="loadMore()" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">Load more chemicals</button>
            </div>
        </div>
    </section>

    <section class="px-4 py-8 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">More Charts</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">'''

        for other in charts:
            if other['slug'] != chart['slug']:
                html += f'''
                <a href="/charts/{other['slug']}/" class="p-4 rounded-xl border border-gray-200 hover:border-{other['color']}-300 hover:bg-{other['color']}-50 transition-colors text-center">
                    <div class="font-bold text-gray-900">{other['name']}</div>
                    <div class="text-xs text-gray-500">View chart</div>
                </a>'''

        html += f'''
                <a href="/materials/{mat_dir}/" class="p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-center">
                    <div class="font-bold text-gray-900">{chart['name']} Details</div>
                    <div class="text-xs text-gray-500">Properties & apps</div>
                </a>
            </div>
        </div>
    </section>

    <footer class="bg-gray-900 text-gray-400 py-8 px-4">
        <div class="max-w-5xl mx-auto text-center text-sm">
            <p>&copy; 2026 ChemicalResistance.org — Free chemical compatibility tool</p>
        </div>
    </footer>

    <script>
    const MATERIAL = '{chart['mat_key']}';
    let chemicals = [];
    let filtered = [];
    let displayCount = 100;
    const ratingMap = {{ '1': 'A', '2': 'B', '3': 'C', '4': 'D', '0': 'NR' }};

    fetch('/data/chemicals_burkle_full.json')
        .then(r => r.json())
        .then(data => {{
            chemicals = data.filter(c => c.ratings[MATERIAL] && (c.ratings[MATERIAL].c20 || c.ratings[MATERIAL].c50));
            applyFilters();
        }});

    function applyFilters() {{
        const search = document.getElementById('searchInput').value.toLowerCase();
        const rating = document.getElementById('ratingFilter').value;
        filtered = chemicals.filter(c => {{
            const name = (c.name_en || c.name).toLowerCase();
            if (search && !name.includes(search) && !c.name.toLowerCase().includes(search)) return false;
            if (rating !== 'all') {{
                const r = ratingMap[c.ratings[MATERIAL]?.c20] || 'NR';
                if (rating === 'AB' && r !== 'A' && r !== 'B') return false;
                else if (rating !== 'AB' && r !== rating) return false;
            }}
            return true;
        }});
        displayCount = 100;
        renderTable();
    }}

    function renderTable() {{
        const tbody = document.getElementById('chartTable');
        const toShow = filtered.slice(0, displayCount);
        document.getElementById('resultCount').textContent = filtered.length;
        document.getElementById('loadMore').classList.toggle('hidden', displayCount >= filtered.length);
        tbody.innerHTML = toShow.map(c => {{
            const name = c.name_en || c.name;
            const r20 = ratingMap[c.ratings[MATERIAL]?.c20] || 'NR';
            const r50 = ratingMap[c.ratings[MATERIAL]?.c50] || 'NR';
            return `<tr class="hover:bg-gray-50">
                <td class="py-2 px-4 text-sm"><div class="font-medium text-gray-900">${{name}}</div></td>
                <td class="py-2 px-4 text-sm text-gray-600">${{c.concentration || '—'}}</td>
                <td class="py-2 px-4 text-center"><span class="rating-${{r20}} px-2 py-0.5 rounded text-xs font-bold">${{r20}}</span></td>
                <td class="py-2 px-4 text-center"><span class="rating-${{r50}} px-2 py-0.5 rounded text-xs font-bold">${{r50}}</span></td>
                <td class="py-2 px-4 text-sm text-gray-500 font-mono">${{c.cas || '—'}}</td>
            </tr>`;
        }}).join('');
    }}

    function loadMore() {{ displayCount += 100; renderTable(); }}
    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('ratingFilter').addEventListener('change', applyFilters);
    lucide.createIcons();
    </script>
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{{"token": "cba547e85ee54e0f9cdc27e68405eead"}}'></script>
</body>
</html>'''

        with open(os.path.join(page_dir, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"  Created: charts/{chart['slug']}/index.html")

    # Create charts index
    idx = '''<!DOCTYPE html>
<html lang="en"><head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LTK6VVHYDW"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-LTK6VVHYDW");</script>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Chemical Compatibility Charts — Printable Resistance Ratings</title>
<meta name="description" content="Printable chemical compatibility charts for PTFE, 316 Stainless Steel, HDPE, and NBR. Color-coded resistance ratings for 900+ chemicals.">
<link rel="canonical" href="https://chemicalresistance.org/charts/">
<link rel="icon" href="/favicon.ico"><link rel="stylesheet" href="/css/tailwind.min.css">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>*{font-family:'Inter',sans-serif;}body{background:#f8fafc;}</style>
</head><body class="text-gray-700 min-h-screen">
<header class="bg-white border-b border-gray-200 sticky top-0 z-50">
<div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
<a href="/" class="flex items-center gap-2"><img src="/logos/logo-icon-128x128.png" alt="CR" class="w-10 h-10 rounded-xl">
<div><div class="font-bold text-gray-900">ChemicalResistance.org</div></div></a></div></header>
<section class="bg-gradient-to-b from-gray-50 to-white px-4 py-8 md:py-12">
<div class="max-w-4xl mx-auto"><h1 class="text-3xl font-bold text-gray-900 mb-3">Chemical Compatibility Charts</h1>
<p class="text-lg text-gray-600">Printable, color-coded chemical resistance charts. Search, filter, and print.</p></div></section>
<section class="px-4 py-8"><div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
'''
    for chart in charts:
        idx += f'<a href="/charts/{chart["slug"]}/" class="bg-white p-6 rounded-xl border border-gray-200 hover:border-{chart["color"]}-300 hover:shadow-sm transition-all"><h2 class="text-lg font-bold text-gray-900 mb-1">{chart["name"]} Compatibility Chart</h2><p class="text-sm text-gray-600">{chart["full"]}</p></a>\n'
    idx += '</div></section><footer class="bg-gray-900 text-gray-400 py-8 px-4"><div class="max-w-5xl mx-auto text-center text-sm"><p>&copy; 2026 ChemicalResistance.org</p></div></footer></body></html>'

    with open(os.path.join(charts_dir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(idx)
    print("  Created: charts/index.html")


# ============================================================
# IMPROVEMENT 5: Optimize meta descriptions for high-impression pages
# ============================================================
def optimize_meta_descriptions():
    """Optimize meta descriptions for material pages with high impressions but low CTR."""
    print("\n=== IMPROVEMENT 5: Optimizing meta descriptions ===")

    optimizations = {
        'materials/nbr/index.html': {
            'old_desc': 'Complete NBR (Nitrile rubber) chemical resistance chart. The standard seal material for oils, fuels, and hydraulic fluids.',
            'new_desc': 'NBR chemical resistance chart — check 950+ chemicals rated A-D at 20°C and 50°C. Nitrile rubber is the go-to for oil, fuel, and hydraulic seals. Free searchable database.',
            'old_title': 'NBR Chemical Resistance Chart | Nitrile Rubber Compatibility',
            'new_title': 'NBR Chemical Resistance Chart — 950+ Chemicals Rated | Nitrile Rubber Guide',
        },
        'materials/ss316/index.html': {
            'old_desc': 'Complete SS 316 (V4A) chemical resistance chart. The premium stainless steel for corrosive environments.',
            'new_desc': '316 Stainless Steel chemical resistance chart — 950+ chemicals rated at 20°C and 50°C. See which acids, solvents, and bases are safe for SS 316 (V4A). Free lookup.',
            'old_title': 'SS 316 Chemical Resistance Chart | Stainless Steel V4A Compatibility',
            'new_title': '316 Stainless Steel Chemical Resistance Chart — 950+ Chemicals | SS 316 V4A',
        },
        'materials/ptfe/index.html': {
            'old_desc': 'Complete PTFE chemical resistance chart. The ultimate material for universal chemical compatibility.',
            'new_desc': 'PTFE (Teflon) chemical resistance chart — rated against 950+ chemicals at 20°C and 50°C. Nearly universal compatibility. Free searchable database with CAS numbers.',
            'old_title': 'PTFE Chemical Resistance Chart | Teflon Compatibility',
            'new_title': 'PTFE Chemical Resistance Chart — 950+ Chemicals | Teflon Compatibility Guide',
        },
        'materials/hdpe/index.html': {
            'old_desc': 'Complete HDPE chemical resistance chart. The workhorse plastic for chemical storage.',
            'new_desc': 'HDPE chemical resistance chart — check 950+ chemicals rated A-D at 20°C and 50°C. Is your chemical safe with high-density polyethylene? Free lookup tool.',
            'old_title': 'HDPE Chemical Resistance Chart | Polyethylene Compatibility',
            'new_title': 'HDPE Chemical Resistance Chart — 950+ Chemicals | Polyethylene Compatibility',
        },
        'materials/epdm/index.html': {
            'old_desc': 'Complete EPDM chemical resistance chart. The go-to rubber for water, steam, and outdoor applications.',
            'new_desc': 'EPDM chemical resistance chart — 950+ chemicals rated at 20°C and 50°C. Best rubber for water, steam, and weather exposure. Free searchable compatibility data.',
            'old_title': 'EPDM Chemical Resistance Chart | Rubber Compatibility',
            'new_title': 'EPDM Chemical Resistance Chart — 950+ Chemicals Rated | Rubber Compatibility',
        },
        'materials/fep/index.html': {
            'old_desc': 'Complete FEP chemical resistance chart. The melt-processable fluoropolymer alternative to PTFE.',
            'new_desc': 'FEP chemical resistance chart — 950+ chemicals rated A-D. Fluorinated Ethylene Propylene tubing and liner compatibility data at 20°C and 50°C. Free database.',
            'old_title': 'FEP Chemical Resistance Chart | Fluoropolymer Compatibility',
            'new_title': 'FEP Chemical Resistance Chart — 950+ Chemicals | Tubing & Liner Compatibility',
        },
        'materials/polysulfone/index.html': {
            'old_desc': 'Complete Polysulfone (PSU) chemical resistance chart. High-performance thermoplastic for medical and filtration.',
            'new_desc': 'Polysulfone (PSU) chemical resistance chart — 950+ chemicals rated at 20°C and 50°C. Check compatibility for medical, filtration, and hot water applications.',
            'old_title': 'Polysulfone Chemical Resistance Chart | PSU Compatibility',
            'new_title': 'Polysulfone Chemical Resistance Chart — 950+ Chemicals | PSU Compatibility',
        },
    }

    count = 0
    for filepath_rel, opt in optimizations.items():
        filepath = os.path.join(BASE_DIR, filepath_rel)
        if not os.path.exists(filepath):
            print(f"  Skipped (not found): {filepath_rel}")
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        changed = False
        if opt.get('old_desc') and opt['old_desc'] in content:
            content = content.replace(
                f'<meta name="description" content="{opt["old_desc"]}">',
                f'<meta name="description" content="{opt["new_desc"]}">'
            )
            changed = True

        if opt.get('old_title') and opt['old_title'] in content:
            content = content.replace(
                f'<title>{opt["old_title"]}</title>',
                f'<title>{opt["new_title"]}</title>'
            )
            changed = True

        if changed:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            count += 1
            print(f"  Optimized: {filepath_rel}")
        else:
            print(f"  No match found: {filepath_rel} (titles/descriptions may have changed)")

    print(f"  Optimized {count} material pages")


# ============================================================
# Update sitemap
# ============================================================
def update_sitemap():
    """Add new pages to sitemap.xml."""
    print("\n=== Updating sitemap.xml ===")

    sitemap_path = os.path.join(BASE_DIR, 'sitemap.xml')
    with open(sitemap_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_urls = []

    # Compare pages
    compare_pages = ['etfe-vs-ectfe', 'ptfe-vs-fep', 'nbr-vs-epdm', 'hdpe-vs-pvdf', 'polysulfone-vs-pvdf']
    new_urls.append('https://chemicalresistance.org/compare/')
    for slug in compare_pages:
        new_urls.append(f'https://chemicalresistance.org/compare/{slug}/')

    # Chart pages
    chart_pages = ['ptfe-compatibility-chart', 'ss316-compatibility-chart', 'hdpe-compatibility-chart', 'nbr-compatibility-chart']
    new_urls.append('https://chemicalresistance.org/charts/')
    for slug in chart_pages:
        new_urls.append(f'https://chemicalresistance.org/charts/{slug}/')

    # Build new URL entries
    url_entries = ''
    for url in new_urls:
        if url not in content:
            url_entries += f'''  <url>
    <loc>{url}</loc>
    <lastmod>2026-06-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
'''

    if url_entries:
        # Insert before closing </urlset>
        content = content.replace('</urlset>', url_entries + '</urlset>')
        with open(sitemap_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  Added {len(new_urls)} new URLs to sitemap.xml")
    else:
        print("  All URLs already in sitemap")


# ============================================================
# Main
# ============================================================
if __name__ == '__main__':
    print("ChemicalResistance.org SEO Improvements")
    print("=" * 50)

    fix_french_viscosity()
    add_related_materials()
    create_comparison_pages()
    create_chart_pages()
    optimize_meta_descriptions()
    update_sitemap()

    print("\n" + "=" * 50)
    print("All improvements completed!")
    print("\nSummary:")
    print("  1. French viscosity title/meta description optimized")
    print("  2. Related Materials sections added to material pages")
    print("  3. 5 comparison pages created in /compare/")
    print("  4. 4 chart pages created in /charts/")
    print("  5. Meta descriptions optimized on 7 high-impression pages")
    print("  6. Sitemap updated with new URLs")
