#!/usr/bin/env python3
"""
Build index.html with embedded chemical data.
"""
import json
from pathlib import Path

def main():
    data_dir = Path(__file__).parent / "data"
    
    # Load chemical data
    with open(data_dir / "chemicals_burkle.json", 'r', encoding='utf-8') as f:
        chemicals = json.load(f)
    
    # Sort by English name (if available) or German name
    chemicals.sort(key=lambda c: (c.get('name_en') or c['name']).lower())
    
    # Statistics
    with_en = sum(1 for c in chemicals if c.get('name_en'))
    total = len(chemicals)
    print(f"Total chemicals: {total}")
    print(f"With English names: {with_en}")
    print(f"German only: {total - with_en}")
    
    # Minify JSON for embedding
    json_str = json.dumps(chemicals, ensure_ascii=False, separators=(',', ':'))
    
    # Build HTML
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chemical Resistance Guide | {total}+ Chemicals | Free Material Compatibility Tool</title>
    <meta name="description" content="Free chemical resistance chart with {total}+ chemicals. Find compatible materials (HDPE, PP, PTFE, Stainless Steel, Viton) for safe chemical storage and handling.">
    <link rel="canonical" href="https://chemicalresistance.org/">
    
    <meta property="og:title" content="Chemical Resistance Guide | {total}+ Chemicals">
    <meta property="og:description" content="Free tool to check material compatibility for chemical storage. {total}+ chemicals, 12 materials.">
    <meta property="og:type" content="website">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <style>
        * {{ font-family: 'Inter', sans-serif; }}
        body {{ background: #f8fafc; }}
        .rating-A {{ background: #22c55e; color: white; }}
        .rating-B {{ background: #3b82f6; color: white; }}
        .rating-C {{ background: #f59e0b; color: white; }}
        .rating-D {{ background: #ef4444; color: white; }}
        .rating-NR {{ background: #d1d5db; color: #6b7280; }}
        .search-highlight {{ background: #fef08a; }}
    </style>
</head>
<body class="text-gray-700 min-h-screen">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2">
                <div class="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                    <i data-lucide="flask-conical" class="w-5 h-5 text-white"></i>
                </div>
                <div>
                    <div class="font-bold text-gray-900">ChemicalResistance.org</div>
                    <div class="text-xs text-gray-500">{total}+ chemicals • 12 materials</div>
                </div>
            </a>
            <div class="flex items-center gap-4 text-sm">
                <a href="#guide" class="text-gray-600 hover:text-gray-900 hidden sm:block">Material Guide</a>
                <a href="#about" class="text-gray-600 hover:text-gray-900 hidden sm:block">About</a>
            </div>
        </div>
    </header>

    <!-- Hero + Search -->
    <section class="bg-gradient-to-b from-gray-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Chemical Resistance Lookup
            </h1>
            <p class="text-gray-600 mb-6">
                Find the right material for your chemical. Search by name, CAS number, or formula.
            </p>
            
            <!-- Search Box -->
            <div class="relative max-w-2xl mx-auto">
                <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <i data-lucide="search" class="w-5 h-5 text-gray-400"></i>
                </div>
                <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="Search: Sulfuric Acid, Acetone, 7664-93-9..."
                    class="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                    autocomplete="off"
                >
                <div id="searchResults" class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hidden z-50 max-h-96 overflow-y-auto">
                </div>
            </div>
            
            <div class="mt-4 flex flex-wrap justify-center gap-2 text-sm">
                <span class="text-gray-500">Popular:</span>
                <button onclick="searchFor('Sulfuric Acid')" class="text-emerald-600 hover:underline">Sulfuric Acid</button>
                <button onclick="searchFor('Sodium Hydroxide')" class="text-emerald-600 hover:underline">Sodium Hydroxide</button>
                <button onclick="searchFor('Acetone')" class="text-emerald-600 hover:underline">Acetone</button>
                <button onclick="searchFor('Hydrochloric')" class="text-emerald-600 hover:underline">Hydrochloric Acid</button>
            </div>
        </div>
    </section>

    <!-- Results Section -->
    <section id="results" class="px-4 py-6 hidden">
        <div class="max-w-7xl mx-auto">
            <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <!-- Chemical Info Header -->
                <div class="p-6 border-b border-gray-100 bg-gray-50">
                    <div class="flex items-start justify-between">
                        <div>
                            <h2 id="chemName" class="text-2xl font-bold text-gray-900"></h2>
                            <div class="flex flex-wrap gap-3 mt-2 text-sm">
                                <span id="chemNameDe" class="text-gray-500"></span>
                                <span id="chemFormula" class="bg-gray-200 px-2 py-0.5 rounded font-mono"></span>
                                <span id="chemCas" class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded"></span>
                                <span id="chemConc" class="bg-amber-100 text-amber-700 px-2 py-0.5 rounded"></span>
                            </div>
                        </div>
                        <button onclick="clearResults()" class="text-gray-400 hover:text-gray-600">
                            <i data-lucide="x" class="w-6 h-6"></i>
                        </button>
                    </div>
                </div>

                <!-- Quick Recommendation -->
                <div id="recommendation" class="p-4 bg-emerald-50 border-b border-emerald-100">
                    <div class="flex items-center gap-2">
                        <i data-lucide="check-circle" class="w-5 h-5 text-emerald-600"></i>
                        <span class="font-medium text-emerald-800">Recommended materials:</span>
                        <span id="recMaterials" class="text-emerald-700"></span>
                    </div>
                </div>

                <!-- Ratings Table -->
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gray-50 text-left text-sm">
                                <th class="py-3 px-4 font-semibold text-gray-600">Material</th>
                                <th class="py-3 px-4 font-semibold text-gray-600 text-center">20°C<br><span class="font-normal text-gray-400">(68°F)</span></th>
                                <th class="py-3 px-4 font-semibold text-gray-600 text-center">50°C<br><span class="font-normal text-gray-400">(122°F)</span></th>
                                <th class="py-3 px-4 font-semibold text-gray-600">Material Type</th>
                            </tr>
                        </thead>
                        <tbody id="ratingsTable"></tbody>
                    </table>
                </div>

                <!-- Legend -->
                <div class="p-4 bg-gray-50 border-t border-gray-200">
                    <div class="flex flex-wrap items-center gap-4 text-sm">
                        <span class="font-medium text-gray-700">Ratings:</span>
                        <span class="flex items-center gap-1"><span class="rating-A px-2 py-0.5 rounded text-xs font-bold">A</span> Excellent</span>
                        <span class="flex items-center gap-1"><span class="rating-B px-2 py-0.5 rounded text-xs font-bold">B</span> Good</span>
                        <span class="flex items-center gap-1"><span class="rating-C px-2 py-0.5 rounded text-xs font-bold">C</span> Limited</span>
                        <span class="flex items-center gap-1"><span class="rating-D px-2 py-0.5 rounded text-xs font-bold">D</span> Not Recommended</span>
                        <span class="flex items-center gap-1"><span class="rating-NR px-2 py-0.5 rounded text-xs font-bold">NR</span> No Data</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats -->
    <section class="px-4 py-12">
        <div class="max-w-5xl mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white rounded-xl p-5 border border-gray-200 text-center">
                    <div class="text-3xl font-bold text-emerald-600">{total}+</div>
                    <div class="text-gray-500 text-sm">Chemicals</div>
                </div>
                <div class="bg-white rounded-xl p-5 border border-gray-200 text-center">
                    <div class="text-3xl font-bold text-blue-600">12</div>
                    <div class="text-gray-500 text-sm">Materials</div>
                </div>
                <div class="bg-white rounded-xl p-5 border border-gray-200 text-center">
                    <div class="text-3xl font-bold text-purple-600">2</div>
                    <div class="text-gray-500 text-sm">Temperatures</div>
                </div>
                <div class="bg-white rounded-xl p-5 border border-gray-200 text-center">
                    <div class="text-3xl font-bold text-amber-600">100%</div>
                    <div class="text-gray-500 text-sm">Free</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Material Guide -->
    <section id="guide" class="px-4 py-12 bg-white border-y border-gray-200">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 text-center mb-8">Material Quick Guide</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="p-4 rounded-xl border border-gray-200 hover:border-emerald-300 transition-colors">
                    <div class="font-bold text-gray-900">HDPE</div>
                    <div class="text-sm text-gray-500 mb-2">High-Density Polyethylene</div>
                    <div class="text-sm text-gray-600">Best for: Acids, bases, alcohols. Common for drums & containers.</div>
                </div>
                <div class="p-4 rounded-xl border border-gray-200 hover:border-emerald-300 transition-colors">
                    <div class="font-bold text-gray-900">PP</div>
                    <div class="text-sm text-gray-500 mb-2">Polypropylene</div>
                    <div class="text-sm text-gray-600">Best for: Strong acids & bases. Higher temp resistance than PE.</div>
                </div>
                <div class="p-4 rounded-xl border border-gray-200 hover:border-emerald-300 transition-colors">
                    <div class="font-bold text-gray-900">PTFE</div>
                    <div class="text-sm text-gray-500 mb-2">Teflon®</div>
                    <div class="text-sm text-gray-600">Best for: Nearly all chemicals. Premium choice for seals & gaskets.</div>
                </div>
                <div class="p-4 rounded-xl border border-gray-200 hover:border-emerald-300 transition-colors">
                    <div class="font-bold text-gray-900">SS 316</div>
                    <div class="text-sm text-gray-500 mb-2">Stainless Steel (1.4401)</div>
                    <div class="text-sm text-gray-600">Best for: Corrosive environments. Better than 304 for chlorides.</div>
                </div>
                <div class="p-4 rounded-xl border border-gray-200 hover:border-emerald-300 transition-colors">
                    <div class="font-bold text-gray-900">Viton® (FKM)</div>
                    <div class="text-sm text-gray-500 mb-2">Fluoroelastomer</div>
                    <div class="text-sm text-gray-600">Best for: Oils, fuels, acids. Premium seal material.</div>
                </div>
                <div class="p-4 rounded-xl border border-gray-200 hover:border-emerald-300 transition-colors">
                    <div class="font-bold text-gray-900">EPDM</div>
                    <div class="text-sm text-gray-500 mb-2">Ethylene Propylene</div>
                    <div class="text-sm text-gray-600">Best for: Water, steam, bases. NOT for oils/fuels.</div>
                </div>
            </div>
        </div>
    </section>

    <!-- About -->
    <section id="about" class="px-4 py-12">
        <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">About This Tool</h2>
            <p class="text-gray-600 mb-6">
                ChemicalResistance.org helps engineers, safety professionals, and anyone handling chemicals 
                find the right materials for safe storage and handling. Our database includes {total}+ chemicals 
                with resistance ratings for 12 common materials at two temperatures.
            </p>
            <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                <strong>⚠️ Disclaimer:</strong> This information is a general guide only. Always verify 
                compatibility with equipment manufacturers and conduct testing for critical applications. 
                Factors like concentration, temperature, and pressure can affect performance.
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-8 px-4">
        <div class="max-w-5xl mx-auto text-center text-sm">
            <p>© 2026 ChemicalResistance.org — Free Chemical Compatibility Tool</p>
            <p class="mt-2">Data sources: Bürkle, INEOS, industry standards</p>
        </div>
    </footer>

    <script>
    const chemicals = {json_str};

    const materialInfo = {{
        "HDPE": {{ name: "HDPE", full: "High-Density Polyethylene", type: "Plastic" }},
        "LDPE": {{ name: "LDPE", full: "Low-Density Polyethylene", type: "Plastic" }},
        "PP": {{ name: "PP", full: "Polypropylene", type: "Plastic" }},
        "PVC": {{ name: "PVC", full: "Polyvinyl Chloride", type: "Plastic" }},
        "PTFE": {{ name: "PTFE", full: "Teflon®", type: "Fluoropolymer" }},
        "PVDF": {{ name: "PVDF", full: "Polyvinylidene Fluoride", type: "Fluoropolymer" }},
        "PA": {{ name: "PA", full: "Polyamide (Nylon)", type: "Plastic" }},
        "PC": {{ name: "PC", full: "Polycarbonate", type: "Plastic" }},
        "SS304": {{ name: "SS 304", full: "Stainless Steel 1.4301", type: "Metal" }},
        "SS316": {{ name: "SS 316", full: "Stainless Steel 1.4401", type: "Metal" }},
        "EPDM": {{ name: "EPDM", full: "Ethylene Propylene Rubber", type: "Elastomer" }},
        "NBR": {{ name: "NBR", full: "Nitrile Rubber", type: "Elastomer" }},
    }};

    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const resultsSection = document.getElementById('results');

    searchInput.addEventListener('input', (e) => {{
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {{
            searchResults.classList.add('hidden');
            return;
        }}

        const matches = chemicals.filter(c => 
            c.name.toLowerCase().includes(query) ||
            (c.name_en && c.name_en.toLowerCase().includes(query)) ||
            (c.cas && c.cas.includes(query)) ||
            (c.formula && c.formula.toLowerCase().includes(query))
        ).slice(0, 15);

        if (matches.length > 0) {{
            searchResults.innerHTML = matches.map(c => {{
                const displayName = c.name_en || c.name;
                const subtitle = c.name_en ? c.name : '';
                return `
                    <div class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0" data-idx="${{chemicals.indexOf(c)}}">
                        <div class="font-medium text-gray-900">${{highlightMatch(displayName, query)}}</div>
                        <div class="text-sm text-gray-500 flex gap-2">
                            ${{subtitle ? `<span>${{subtitle}}</span>` : ''}}
                            ${{c.cas ? `<span class="text-blue-600">CAS: ${{c.cas}}</span>` : ''}}
                            ${{c.concentration ? `<span class="text-amber-600">${{c.concentration}}</span>` : ''}}
                        </div>
                    </div>
                `;
            }}).join('');
            searchResults.classList.remove('hidden');
        }} else {{
            searchResults.innerHTML = '<div class="px-4 py-3 text-gray-500">No chemicals found</div>';
            searchResults.classList.remove('hidden');
        }}
    }});

    searchResults.addEventListener('click', (e) => {{
        const item = e.target.closest('[data-idx]');
        if (item) {{
            const chem = chemicals[parseInt(item.dataset.idx)];
            showResults(chem);
            searchResults.classList.add('hidden');
        }}
    }});

    function highlightMatch(text, query) {{
        const idx = text.toLowerCase().indexOf(query);
        if (idx >= 0) {{
            return text.slice(0, idx) + '<mark class="search-highlight">' + text.slice(idx, idx + query.length) + '</mark>' + text.slice(idx + query.length);
        }}
        return text;
    }}

    function searchFor(term) {{
        searchInput.value = term;
        searchInput.dispatchEvent(new Event('input'));
    }}

    function showResults(chem) {{
        const displayName = chem.name_en || chem.name;
        document.getElementById('chemName').textContent = displayName;
        document.getElementById('chemNameDe').textContent = chem.name_en ? `(${{chem.name}})` : '';
        document.getElementById('chemFormula').textContent = chem.formula || '';
        document.getElementById('chemFormula').style.display = chem.formula ? 'inline' : 'none';
        document.getElementById('chemCas').textContent = chem.cas ? `CAS: ${{chem.cas}}` : '';
        document.getElementById('chemCas').style.display = chem.cas ? 'inline' : 'none';
        document.getElementById('chemConc').textContent = chem.concentration || '';
        document.getElementById('chemConc').style.display = chem.concentration ? 'inline' : 'none';

        searchInput.value = displayName;

        const tbody = document.getElementById('ratingsTable');
        const recommended = [];
        
        const sortedMaterials = Object.entries(chem.ratings).sort((a, b) => {{
            const order = {{ 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'NR': 4 }};
            return (order[a[1].c20] || 4) - (order[b[1].c20] || 4);
        }});

        tbody.innerHTML = sortedMaterials.map(([mat, rating]) => {{
            const info = materialInfo[mat] || {{ name: mat, full: mat, type: '' }};
            if (rating.c20 === 'A') recommended.push(info.name);
            
            return `
                <tr class="border-b border-gray-100 hover:bg-gray-50">
                    <td class="py-3 px-4">
                        <div class="font-medium text-gray-900">${{info.name}}</div>
                        <div class="text-xs text-gray-500">${{info.full}}</div>
                    </td>
                    <td class="py-3 px-4 text-center">
                        <span class="rating-${{rating.c20}} px-3 py-1 rounded text-sm font-bold">${{rating.c20}}</span>
                    </td>
                    <td class="py-3 px-4 text-center">
                        <span class="rating-${{rating.c50}} px-3 py-1 rounded text-sm font-bold">${{rating.c50}}</span>
                    </td>
                    <td class="py-3 px-4 text-gray-500 text-sm">${{info.type}}</td>
                </tr>
            `;
        }}).join('');

        document.getElementById('recMaterials').textContent = recommended.length > 0 
            ? recommended.join(', ') 
            : 'Check ratings below - limited compatibility';
        document.getElementById('recommendation').className = recommended.length > 0
            ? 'p-4 bg-emerald-50 border-b border-emerald-100'
            : 'p-4 bg-amber-50 border-b border-amber-100';
        document.getElementById('recommendation').querySelector('i').className = recommended.length > 0
            ? 'w-5 h-5 text-emerald-600'
            : 'w-5 h-5 text-amber-600';

        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({{ behavior: 'smooth', block: 'start' }});
        lucide.createIcons();
    }}

    function clearResults() {{
        resultsSection.classList.add('hidden');
        searchInput.value = '';
    }}

    document.addEventListener('click', (e) => {{
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {{
            searchResults.classList.add('hidden');
        }}
    }});

    lucide.createIcons();
    </script>
</body>
</html>'''
    
    # Write the file
    output_path = Path(__file__).parent / "index.html"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f"\n✓ Built index.html ({len(html):,} bytes)")

if __name__ == "__main__":
    main()
