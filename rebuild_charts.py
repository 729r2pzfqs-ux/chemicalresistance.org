#!/usr/bin/env python3
"""
Rebuild /charts/ as multi-material comparison grids.
Each chart shows 3-5 materials side-by-side for the same chemicals.
Plus one "all materials" master chart with all 24.
"""
import os, json

BASE = os.path.dirname(os.path.abspath(__file__))

MAT_KEY_TO_DIR = {
    'AL':'aluminium','ECTFE_ETFE':'ectfe-etfe','EPDM':'epdm','FEP':'fep',
    'FPM':'viton','HDPE':'hdpe','LDPE':'ldpe','NBR':'nbr','PA':'nylon-pa',
    'PC':'polycarbonate','PETG':'petg','PMP':'pmp','POM':'acetal-pom','PP':'pp',
    'PS':'polystyrene','PSU':'polysulfone','PTFE':'ptfe','PVC_HART':'pvc-rigid',
    'PVC_WEICH':'pvc-flexible','PVDF':'pvdf','SAN':'san','SI':'silicone',
    'V2A':'stainless-steel-304','V4A':'ss316'
}

MAT_SHORT = {
    'AL':'Al','ECTFE_ETFE':'ECTFE','EPDM':'EPDM','FEP':'FEP','FPM':'Viton',
    'HDPE':'HDPE','LDPE':'LDPE','NBR':'NBR','PA':'Nylon','PC':'PC',
    'PETG':'PETG','PMP':'PMP','POM':'POM','PP':'PP','PS':'PS','PSU':'PSU',
    'PTFE':'PTFE','PVC_HART':'uPVC','PVC_WEICH':'pPVC','PVDF':'PVDF',
    'SAN':'SAN','SI':'Silicone','V2A':'SS304','V4A':'SS316'
}

CHARTS = [
    {
        'slug': 'fluoropolymers',
        'title': 'Fluoropolymer Chemical Resistance Comparison',
        'h1': 'Fluoropolymer Comparison Chart',
        'desc': 'Compare PTFE, FEP, PVDF, and ECTFE/ETFE chemical resistance side by side. See which fluoropolymer is best for your application — 950+ chemicals at 20°C and 50°C.',
        'intro': 'Fluoropolymers offer the highest chemical resistance of any polymer family. But they differ in processability, temperature limits, and cost. This chart helps you pick the right one.',
        'materials': ['PTFE','FEP','PVDF','ECTFE_ETFE'],
        'color': 'emerald',
        'faq': [
            ('What is the most chemically resistant fluoropolymer?', 'PTFE (Teflon) has the broadest chemical resistance of any fluoropolymer, rated A (Excellent) for 965+ chemicals. FEP is a close second with 899 A-ratings.'),
            ('What is the difference between PTFE and FEP?', 'Both have nearly identical chemical resistance. The key difference is processability: FEP can be melt-processed (injection molded, extruded into tubing), while PTFE must be machined or sintered. PTFE handles higher temperatures (260°C vs 200°C).'),
        ],
    },
    {
        'slug': 'elastomers',
        'title': 'Rubber & Elastomer Chemical Resistance Comparison',
        'h1': 'Rubber & Elastomer Comparison Chart',
        'desc': 'Compare NBR, EPDM, Viton (FKM), and Silicone chemical resistance side by side. Find the right rubber seal material for your chemical environment.',
        'intro': 'Choosing the wrong elastomer leads to seal failure and chemical leaks. Each rubber has a distinct chemical profile: NBR for oils, EPDM for water, Viton for broad resistance, Silicone for temperature extremes.',
        'materials': ['NBR','EPDM','FPM','SI'],
        'color': 'amber',
        'faq': [
            ('Which rubber has the best chemical resistance?', 'Viton (FKM/FPM) has the broadest chemical resistance of any elastomer with 550 A-ratings, covering most acids, fuels, and solvents. However, it is attacked by ketones and amines.'),
            ('What is the difference between NBR and EPDM?', 'NBR (Nitrile) excels with oils, fuels, and hydraulic fluids but fails with ozone and UV. EPDM excels with water, steam, and outdoor exposure but fails with petroleum products. They are essentially complementary materials.'),
        ],
    },
    {
        'slug': 'metals',
        'title': 'Metal Chemical Resistance Comparison — SS316 vs SS304 vs Aluminium',
        'h1': 'Metal Comparison Chart',
        'desc': 'Compare 316 Stainless Steel, 304 Stainless Steel, and Aluminium chemical resistance. See which metal handles your chemicals — acids, alkalis, solvents rated A-D.',
        'intro': 'Metal selection for chemical service depends on the specific chemicals, concentration, and temperature. SS 316 adds molybdenum for chloride resistance, SS 304 is the general-purpose workhorse, and aluminium saves weight but has narrower compatibility.',
        'materials': ['V4A','V2A','AL'],
        'color': 'blue',
        'faq': [
            ('Is 316 or 304 stainless steel better for chemical resistance?', '316 SS is better for most chemical environments, especially those involving chlorides, acids, and marine conditions. The molybdenum in 316 provides significantly better pitting and crevice corrosion resistance. 304 is adequate for mild chemicals and food processing.'),
            ('Can aluminium be used with acids?', 'Aluminium has good resistance to some organic acids and dilute mineral acids, but is attacked by strong alkalis (NaOH, KOH) and hydrochloric acid. It performs well with many organic solvents and fuels.'),
        ],
    },
    {
        'slug': 'commodity-plastics',
        'title': 'Commodity Plastics Chemical Resistance — HDPE vs PP vs PVC',
        'h1': 'Commodity Plastics Comparison Chart',
        'desc': 'Compare HDPE, LDPE, PP, PVC Rigid, and PVC Flexible chemical resistance. Find the most cost-effective plastic for chemical storage and piping.',
        'intro': 'Commodity plastics are the workhorses of chemical storage — affordable, easy to fabricate, and resistant to many chemicals. This chart compares the five most common options to help you balance cost against chemical compatibility.',
        'materials': ['HDPE','LDPE','PP','PVC_HART','PVC_WEICH'],
        'color': 'blue',
        'faq': [
            ('What is the most chemically resistant commodity plastic?', 'PP (Polypropylene) has the most A-ratings (643) among commodity plastics, with excellent resistance to acids and bases. HDPE is a close second (561 A-ratings) and offers better impact resistance at low temperatures.'),
            ('What is the difference between HDPE and PP for chemical storage?', 'Both resist most acids and bases. PP handles higher temperatures (100°C vs 80°C) and has better resistance to organic solvents. HDPE is tougher, more impact-resistant, and performs better in cold environments (down to -50°C vs 0°C for PP).'),
        ],
    },
    {
        'slug': 'transparent-plastics',
        'title': 'Transparent Plastics Chemical Resistance — PC vs PETG vs PMP',
        'h1': 'Transparent & Lab Plastics Comparison Chart',
        'desc': 'Compare Polycarbonate, PETG, PMP, Polysulfone, and SAN chemical resistance. Choose the right clear plastic for lab equipment and chemical handling.',
        'intro': 'When you need to see through the material — sight glasses, lab equipment, displays — chemical resistance becomes critical. These five transparent plastics vary widely in what they can handle.',
        'materials': ['PC','PETG','PMP','PSU','SAN'],
        'color': 'purple',
        'faq': [
            ('Which transparent plastic has the best chemical resistance?', 'PMP (Polymethylpentene/TPX) offers the best balance of transparency and chemical resistance, plus it can be autoclaved. Polysulfone has excellent thermal stability and steam sterilizability. Polycarbonate has the best impact resistance but poor solvent resistance.'),
            ('Can polycarbonate be used with chemicals?', 'Polycarbonate has limited chemical resistance. It is attacked by most solvents (acetone, MEK, toluene), strong alkalis, and many acids. It is best suited for applications where impact resistance is critical and chemical contact is minimal.'),
        ],
    },
    {
        'slug': 'engineering-plastics',
        'title': 'Engineering Plastics Chemical Resistance — Nylon vs Acetal vs PS',
        'h1': 'Engineering Plastics Comparison Chart',
        'desc': 'Compare Nylon (PA), Acetal (POM), and Polystyrene chemical resistance for mechanical and structural applications.',
        'intro': 'Engineering plastics are selected for their mechanical properties — wear resistance, stiffness, dimensional stability — but chemical compatibility can make or break a design. This chart shows where each material excels and fails.',
        'materials': ['PA','POM','PS'],
        'color': 'blue',
        'faq': [
            ('Is Nylon or Acetal better for chemical resistance?', 'They have similar overall resistance (412 vs 389 A-ratings) but different profiles. Nylon resists hydrocarbons and most solvents well but absorbs water and is attacked by strong acids. Acetal resists solvents and fuels but is attacked by strong acids and oxidizers. Choose based on the specific chemicals in your application.'),
            ('Can Polystyrene be used with chemicals?', 'Polystyrene has poor chemical resistance overall (229 A-ratings). It is dissolved by most organic solvents and is best suited for disposable lab items, packaging, and low-demand applications where cost is the priority.'),
        ],
    },
    {
        'slug': 'all-materials',
        'title': 'Complete Chemical Resistance Chart — All 24 Materials Compared',
        'h1': 'Complete Material Comparison Chart',
        'desc': 'Compare chemical resistance ratings for all 24 materials side by side — fluoropolymers, elastomers, plastics, and metals. 950+ chemicals at 20°C.',
        'intro': 'The definitive comparison: every material in our database, every chemical, one table. Use the search and filters to narrow down to the chemicals relevant to your application, then compare ratings across material families.',
        'materials': ['PTFE','FEP','PVDF','ECTFE_ETFE','NBR','EPDM','FPM','SI',
                      'HDPE','LDPE','PP','PVC_HART','PVC_WEICH','PA','POM',
                      'PC','PETG','PMP','PSU','PS','SAN','V4A','V2A','AL'],
        'color': 'gray',
        'faq': [
            ('Which material has the best overall chemical resistance?', 'PTFE (Teflon) tops the chart with 965 chemicals rated A (Excellent) at 20°C, followed by FEP (899) and SS 316 (773). However, the best material depends on your specific chemicals, temperature, and mechanical requirements.'),
            ('How do I read this chart?', 'A (green) = Excellent resistance, no degradation. B (blue) = Good resistance, minor effect. C (amber) = Limited resistance, short-term use only. D (red) = Not recommended, material will degrade. Search for your specific chemical and compare ratings across materials.'),
        ],
    },
]

def build_mat_headers_js(materials):
    """Build JS array of material column headers."""
    items = []
    for m in materials:
        d = MAT_KEY_TO_DIR.get(m, m.lower())
        s = MAT_SHORT.get(m, m)
        items.append(f'{{key:"{m}",short:"{s}",dir:"{d}"}}')
    return '[' + ','.join(items) + ']'


def generate_chart(chart):
    slug = chart['slug']
    mats = chart['materials']
    color = chart['color']
    n_mats = len(mats)

    # Build material header columns
    mat_cols_html = ''
    for m in mats:
        short = MAT_SHORT.get(m, m)
        d = MAT_KEY_TO_DIR.get(m, m.lower())
        mat_cols_html += f'<th class="py-3 px-2 font-semibold text-gray-600 text-center whitespace-nowrap"><a href="/materials/{d}/" class="hover:text-{color}-600 hover:underline">{short}</a></th>'

    # FAQ schema
    faq_items = ''
    for i, (q, a) in enumerate(chart['faq']):
        comma = ',' if i < len(chart['faq'])-1 else ''
        q_esc = q.replace('"', '&quot;')
        a_esc = a.replace('"', '&quot;')
        faq_items += f'{{"@type":"Question","name":"{q_esc}","acceptedAnswer":{{"@type":"Answer","text":"{a_esc}"}}}}{comma}'

    # FAQ HTML
    faq_html = ''
    for q, a in chart['faq']:
        faq_html += f'''            <details class="border border-gray-200 rounded-xl overflow-hidden">
                <summary class="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">{q}</summary>
                <div class="px-5 py-4 border-t border-gray-100 text-gray-600 text-sm">{a}</div>
            </details>
'''

    # Other charts for cross-linking
    other_charts_html = ''
    for other in CHARTS:
        if other['slug'] != slug:
            other_charts_html += f'''                <a href="/charts/{other['slug']}/" class="p-3 rounded-xl border border-gray-200 hover:border-{color}-300 hover:bg-{color}-50 transition-colors text-center">
                    <div class="font-bold text-gray-900 text-sm">{other['h1'].replace(' Comparison Chart','').replace(' Chart','')}</div>
                    <div class="text-xs text-gray-500">{len(other['materials'])} materials</div>
                </a>
'''

    min_table_w = max(600, 100 + n_mats * 70)

    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LTK6VVHYDW"></script>
<script src="https://analytics.ahrefs.com/analytics.js" data-key="xrS32xSgQE4Xp1oL20j7uQ" async></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag("js",new Date());gtag("config","G-LTK6VVHYDW");</script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{chart['title']}</title>
    <meta name="description" content="{chart['desc']}">
    <link rel="canonical" href="https://chemicalresistance.org/charts/{slug}/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <meta property="og:title" content="{chart['title']}">
    <meta property="og:description" content="{chart['desc']}">
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
        .rating-NR {{ background: #e5e7eb; color: #9ca3af; }}
        @media print {{ header, footer, .no-print {{ display: none !important; }} body {{ background: white; }} }}
        .diff-row {{ background: #fffbeb; }}
    </style>
<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{faq_items}]}}
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
                <a href="/charts/" class="text-gray-600 hover:text-gray-900 hidden sm:inline">All Charts</a>
                <a href="/compare/" class="text-gray-600 hover:text-gray-900 hidden sm:inline">Compare</a>
                <button onclick="window.print()" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 flex items-center gap-2">
                    <i data-lucide="printer" class="w-4 h-4"></i> Print
                </button>
            </div>
        </div>
    </header>

    <section class="bg-gradient-to-b from-{color}-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-7xl mx-auto">
            <div class="flex items-center gap-2 text-sm text-{color}-600 mb-3">
                <a href="/" class="hover:underline">Home</a>
                <span>&rsaquo;</span>
                <a href="/charts/" class="hover:underline">Charts</a>
                <span>&rsaquo;</span>
                <span class="text-gray-600">{chart['h1']}</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{chart['h1']}</h1>
            <p class="text-lg text-gray-600 mb-4 max-w-3xl">{chart['intro']}</p>
            <div class="flex flex-wrap gap-3 text-sm">
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-A"></span> A = Excellent</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-B"></span> B = Good</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-C"></span> C = Limited</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-D"></span> D = Not Recommended</span>
            </div>
        </div>
    </section>

    <section class="px-4 py-6 no-print">
        <div class="max-w-7xl mx-auto">
            <div class="bg-white rounded-xl border border-gray-200 p-4">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <input type="text" id="searchInput" placeholder="Search chemicals..." class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-{color}-500 focus:ring-2 focus:ring-{color}-100 outline-none">
                    </div>
                    <select id="ratingFilter" class="px-4 py-2 border border-gray-200 rounded-lg">
                        <option value="all">All ratings</option>
                        <option value="any-A">Any material rated A</option>
                        <option value="any-D">Any material rated D</option>
                        <option value="diff">Ratings differ (most useful!)</option>
                        <option value="all-A">All materials rated A</option>
                    </select>
                    <select id="tempFilter" class="px-4 py-2 border border-gray-200 rounded-lg">
                        <option value="c20">20°C</option>
                        <option value="c50">50°C</option>
                    </select>
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 py-4">
        <div class="max-w-7xl mx-auto">
            <div class="mb-4 flex items-center justify-between text-sm text-gray-500">
                <span>Showing <span id="resultCount" class="font-semibold text-gray-700">0</span> chemicals</span>
                <label class="flex items-center gap-2 cursor-pointer no-print">
                    <input type="checkbox" id="highlightDiffs" checked class="rounded">
                    <span>Highlight differences</span>
                </label>
            </div>
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full" style="min-width:{min_table_w}px">
                        <thead class="sticky top-0 z-10">
                            <tr class="bg-gray-50 text-left text-sm">
                                <th class="py-3 px-4 font-semibold text-gray-600">Chemical</th>
                                <th class="py-3 px-3 font-semibold text-gray-600 text-sm">Conc.</th>
                                {mat_cols_html}
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
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div class="space-y-3">
{faq_html}            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">More Comparison Charts</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
{other_charts_html}            </div>
        </div>
    </section>

    <footer class="bg-gray-900 text-gray-400 py-8 px-4">
        <div class="max-w-5xl mx-auto text-center text-sm">
            <p>&copy; 2026 ChemicalResistance.org &mdash; Free chemical compatibility tool</p>
            <p class="mt-2">Data sources: B&uuml;rkle, INEOS, industry standards</p>
        </div>
    </footer>

    <script src="/js/chemical_translations_en.js"></script>
    <script>
    const MATS = {build_mat_headers_js(mats)};
    const ratingMap = {{ '1':'A', '2':'B', '3':'C', '4':'D', '0':'NR' }};
    let chemicals = [];
    let filtered = [];
    let displayCount = 80;

    function translateConc(conc) {{
        if (!conc) return '&mdash;';
        const map = {{
            'w\\u00e4ssrig':'Aqueous','ges\\u00e4ttigt':'Saturated','verd\\u00fcnnt':'Diluted',
            'konz.':'Concentrated','konzentriert':'Concentrated','rein':'Pure',
            'techn. rein':'Technical Grade','jede':'Any','gering':'Low',
            'fl\\u00fcssig':'Liquid','gasf\\u00f6rmig':'Gaseous','geschmolzen':'Molten',
            'trocken':'Dry','feucht':'Wet/Moist','fest':'Solid',
            'Pulver':'Powder','gemahlen':'Ground','\\u00f6lhaltig':'Oil-containing',
            'sulfuriert':'Sulfurized','kalt':'Cold','hei\\u00df':'Hot','heiss':'Hot',
            'siedend':'Boiling','handels\\u00fcblich':'Commercial Grade'
        }};
        for (const [de, en] of Object.entries(map)) {{
            if (conc.toLowerCase().includes(de.toLowerCase())) {{
                conc = conc.replace(new RegExp(de, 'gi'), en);
            }}
        }}
        return conc;
    }}

    function translateName(n) {{
        const lower = n.toLowerCase();
        if (typeof chemicalTranslations !== 'undefined' && chemicalTranslations[lower]) return chemicalTranslations[lower];
        return n;
    }}

    function getRating(c, matKey, temp) {{
        return ratingMap[c.ratings[matKey]?.[temp]] || 'NR';
    }}

    function hasDiff(c, temp) {{
        const ratings = new Set();
        for (const m of MATS) {{
            const r = c.ratings[m.key]?.[temp];
            if (r && r !== '0') ratings.add(r);
        }}
        return ratings.size > 1;
    }}

    fetch('/data/chemicals_burkle_full.json')
        .then(r => r.json())
        .then(data => {{
            // Keep chemicals that have data for at least 2 of our materials
            chemicals = data.filter(c => {{
                let count = 0;
                for (const m of MATS) {{
                    if (c.ratings[m.key]?.c20 && c.ratings[m.key].c20 !== '0') count++;
                    if (count >= 2) return true;
                }}
                return false;
            }});
            applyFilters();
        }});

    function applyFilters() {{
        const query = document.getElementById('searchInput').value.toLowerCase();
        const filter = document.getElementById('ratingFilter').value;
        const temp = document.getElementById('tempFilter').value;

        filtered = chemicals.filter(c => {{
            if (query) {{
                const name = (c.name_en || c.name).toLowerCase();
                if (!name.includes(query) && !c.name.toLowerCase().includes(query) && !(c.cas && c.cas.includes(query))) return false;
            }}

            if (filter === 'diff') return hasDiff(c, temp);
            if (filter === 'any-A') return MATS.some(m => getRating(c, m.key, temp) === 'A');
            if (filter === 'any-D') return MATS.some(m => getRating(c, m.key, temp) === 'D');
            if (filter === 'all-A') return MATS.every(m => {{
                const r = getRating(c, m.key, temp);
                return r === 'A' || r === 'NR';
            }});
            return true;
        }});

        // Sort: chemicals where ratings differ first, then alphabetically
        filtered.sort((a, b) => {{
            const aDiff = hasDiff(a, temp) ? 0 : 1;
            const bDiff = hasDiff(b, temp) ? 0 : 1;
            if (aDiff !== bDiff) return aDiff - bDiff;
            const nameA = (a.name_en || a.name).toLowerCase();
            const nameB = (b.name_en || b.name).toLowerCase();
            return nameA.localeCompare(nameB);
        }});

        displayCount = 80;
        renderTable();
    }}

    function renderTable() {{
        const tbody = document.getElementById('chartTable');
        const temp = document.getElementById('tempFilter').value;
        const highlight = document.getElementById('highlightDiffs').checked;
        const toShow = filtered.slice(0, displayCount);

        document.getElementById('resultCount').textContent = filtered.length;
        document.getElementById('loadMore').classList.toggle('hidden', displayCount >= filtered.length);

        tbody.innerHTML = toShow.map(c => {{
            const name = c.name_en ? translateName(c.name) : c.name;
            const displayName = c.name_en || name;
            const conc = translateConc(c.concentration);
            const isDiff = hasDiff(c, temp);
            const rowClass = (highlight && isDiff) ? 'diff-row hover:bg-amber-100' : 'hover:bg-gray-50';

            let cells = '';
            for (const m of MATS) {{
                const r = getRating(c, m.key, temp);
                cells += `<td class="py-2 px-2 text-center"><span class="rating-${{r}} px-1.5 py-0.5 rounded text-xs font-bold">${{r}}</span></td>`;
            }}

            return `<tr class="${{rowClass}}">
                <td class="py-2 px-4 text-sm">
                    <div class="font-medium text-gray-900">${{displayName}}</div>
                    ${{displayName !== c.name ? `<div class="text-xs text-gray-400">${{c.name}}</div>` : ''}}
                </td>
                <td class="py-2 px-3 text-xs text-gray-500">${{conc}}</td>
                ${{cells}}
            </tr>`;
        }}).join('');
    }}

    function loadMore() {{ displayCount += 80; renderTable(); }}

    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('ratingFilter').addEventListener('change', applyFilters);
    document.getElementById('tempFilter').addEventListener('change', applyFilters);
    document.getElementById('highlightDiffs').addEventListener('change', renderTable);
    lucide.createIcons();
    </script>
<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{{"token": "cba547e85ee54e0f9cdc27e68405eead"}}'></script>
</body>
</html>'''
    return html


def generate_index():
    """Generate the /charts/ index page."""
    cards = ''
    for chart in CHARTS:
        n = len(chart['materials'])
        mat_list = ', '.join(MAT_SHORT.get(m,m) for m in chart['materials'][:6])
        if n > 6:
            mat_list += f' +{n-6} more'
        cards += f'''            <a href="/charts/{chart['slug']}/" class="bg-white p-6 rounded-xl border border-gray-200 hover:border-{chart['color']}-300 hover:shadow-md transition-all group">
                <h2 class="text-lg font-bold text-gray-900 mb-1 group-hover:text-{chart['color']}-600">{chart['h1']}</h2>
                <p class="text-sm text-gray-600 mb-3">{mat_list}</p>
                <span class="text-xs text-{chart['color']}-600 font-medium">{n} materials compared &rarr;</span>
            </a>
'''

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LTK6VVHYDW"></script>
<script src="https://analytics.ahrefs.com/analytics.js" data-key="xrS32xSgQE4Xp1oL20j7uQ" async></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag("js",new Date());gtag("config","G-LTK6VVHYDW");</script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chemical Resistance Comparison Charts — Multi-Material Side-by-Side</title>
    <meta name="description" content="Compare chemical resistance of multiple materials side by side. Fluoropolymers, elastomers, metals, plastics — find the right material for your chemicals.">
    <link rel="canonical" href="https://chemicalresistance.org/charts/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="/css/tailwind.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>*{{font-family:'Inter',sans-serif;}}body{{background:#f8fafc;}}</style>
</head>
<body class="text-gray-700 min-h-screen">
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2">
                <img src="/logos/logo-icon-128x128.png" alt="CR" class="w-10 h-10 rounded-xl">
                <div>
                    <div class="font-bold text-gray-900">ChemicalResistance.org</div>
                    <div class="text-xs text-gray-500">Chemical compatibility database</div>
                </div>
            </a>
            <div class="flex items-center gap-4 text-sm">
                <a href="/compare/" class="text-gray-600 hover:text-gray-900">Compare</a>
                <a href="/materials/" class="text-gray-600 hover:text-gray-900">Materials</a>
                <a href="/" class="text-gray-600 hover:text-gray-900">&larr; Search</a>
            </div>
        </div>
    </header>
    <section class="bg-gradient-to-b from-gray-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-3">Multi-Material Comparison Charts</h1>
            <p class="text-lg text-gray-600">Compare chemical resistance ratings across material families. Search for your chemicals and see how multiple materials perform side by side.</p>
        </div>
    </section>
    <section class="px-4 py-8">
        <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-4">
{cards}        </div>
    </section>
    <footer class="bg-gray-900 text-gray-400 py-8 px-4">
        <div class="max-w-5xl mx-auto text-center text-sm">
            <p>&copy; 2026 ChemicalResistance.org &mdash; Free chemical compatibility tool</p>
        </div>
    </footer>
<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{{"token": "cba547e85ee54e0f9cdc27e68405eead"}}'></script>
</body>
</html>'''


if __name__ == '__main__':
    import shutil

    charts_dir = os.path.join(BASE, 'charts')

    # Remove old single-material chart dirs
    for old in ['ptfe-compatibility-chart','ss316-compatibility-chart',
                'hdpe-compatibility-chart','nbr-compatibility-chart']:
        old_path = os.path.join(charts_dir, old)
        if os.path.exists(old_path):
            shutil.rmtree(old_path)
            print(f"  Removed old: charts/{old}/")

    # Generate new charts
    for chart in CHARTS:
        slug = chart['slug']
        out_dir = os.path.join(charts_dir, slug)
        os.makedirs(out_dir, exist_ok=True)
        html = generate_chart(chart)
        with open(os.path.join(out_dir, 'index.html'), 'w') as f:
            f.write(html)
        print(f"  Built: charts/{slug}/ ({len(chart['materials'])} materials)")

    # Generate index
    idx = generate_index()
    with open(os.path.join(charts_dir, 'index.html'), 'w') as f:
        f.write(idx)
    print(f"  Built: charts/index.html")

    # Update sitemap - remove old chart URLs, add new ones
    sitemap_path = os.path.join(BASE, 'sitemap.xml')
    with open(sitemap_path, 'r') as f:
        sitemap = f.read()

    # Remove old chart URLs
    for old in ['ptfe-compatibility-chart','ss316-compatibility-chart',
                'hdpe-compatibility-chart','nbr-compatibility-chart']:
        old_url = f'https://chemicalresistance.org/charts/{old}/'
        sitemap = sitemap.replace(f'''  <url>
    <loc>{old_url}</loc>
    <lastmod>2026-06-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
''', '')

    # Add new chart URLs
    new_urls = ''
    for chart in CHARTS:
        url = f'https://chemicalresistance.org/charts/{chart["slug"]}/'
        if url not in sitemap:
            new_urls += f'''  <url>
    <loc>{url}</loc>
    <lastmod>2026-06-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
'''

    if new_urls:
        sitemap = sitemap.replace('</urlset>', new_urls + '</urlset>')
        with open(sitemap_path, 'w') as f:
            f.write(sitemap)
        print(f"  Updated sitemap.xml")

    print(f"\nDone! Built {len(CHARTS)} comparison charts + index")
