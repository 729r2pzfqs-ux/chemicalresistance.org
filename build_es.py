#!/usr/bin/env python3
"""
Build Spanish (ES) versions of Charts and Compare pages for chemicalresistance.org.
Also updates navigation across all ES pages.
"""
import os, re, json, glob

BASE = os.path.dirname(os.path.abspath(__file__))

# ============================================================
# Shared: Analytics, styles, nav
# ============================================================
GA_HEAD = '''<script async src="https://www.googletagmanager.com/gtag/js?id=G-LTK6VVHYDW"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-LTK6VVHYDW");</script>'''

CF_BEACON = '<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon=\'{"token": "cba547e85ee54e0f9cdc27e68405eead"}\'></script>'

STYLES = '''    <style>
        * { font-family: 'Inter', sans-serif; }
        body { background: #f8fafc; }
        .rating-A { background: #22c55e; color: white; }
        .rating-B { background: #3b82f6; color: white; }
        .rating-C { background: #f59e0b; color: white; }
        .rating-D { background: #ef4444; color: white; }
        .rating-NR { background: #e5e7eb; color: #9ca3af; }
        .diff-row { background: #fffbeb; }
        @media print { header, footer, .no-print { display: none !important; } body { background: white; } }
    </style>'''


def get_es_header(active=None):
    """Spanish navigation header."""
    links = [
        ('materials', '/materials/es/', 'Materiales'),
        ('chemicals', '/chemicals/es/', 'Químicos'),
        ('compare',   '/es/compare/',   'Comparar'),
        ('charts',    '/es/charts/',    'Tablas'),
        ('storage',   '/es/storage-compatibility/', 'Almacenamiento'),
        ('sds',       '/es/sds-decoder/', 'FDS'),
        ('viscosity', '/es/viscosity/',  'Viscosidad'),
        ('about',     '/es/about/',      'Acerca de'),
    ]

    desktop_links = []
    for key, href, label in links:
        if key == active:
            desktop_links.append(f'<a href="{href}" class="text-emerald-600 font-medium">{label}</a>')
        else:
            desktop_links.append(f'<a href="{href}" class="text-gray-600 hover:text-gray-900 hover:underline">{label}</a>')
    desktop_nav = '\n                    '.join(desktop_links)

    mobile_items = [
        ('home',      '/es/',           'Tabla de Resistencia'),
        ('materials', '/materials/es/', 'Todos los Materiales'),
        ('chemicals', '/chemicals/es/', 'Todos los Químicos'),
        ('compare',   '/es/compare/',   'Comparar Materiales'),
        ('charts',    '/es/charts/',    'Tablas Comparativas'),
        ('storage',   '/es/storage-compatibility/', 'Compatibilidad de Almacenamiento'),
        ('sds',       '/es/sds-decoder/', 'Decodificador FDS'),
        ('viscosity', '/es/viscosity/',  'Viscosidad'),
        ('about',     '/es/about/',      'Acerca de'),
    ]
    mobile_links = []
    for key, href, label in mobile_items:
        if key == active:
            mobile_links.append(f'<a href="{href}" class="py-2 px-3 rounded-lg text-emerald-700 bg-emerald-50 font-medium">{label}</a>')
        else:
            mobile_links.append(f'<a href="{href}" class="py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50">{label}</a>')
    mobile_nav = '\n                '.join(mobile_links)

    return f'''    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/es/" class="flex items-center gap-2">
                <img src="/logos/logo-icon-128x128.png" alt="ChemicalResistance" class="w-10 h-10 rounded-xl">
                <div>
                    <div class="font-bold text-gray-900">ChemicalResistance.org</div>
                    <div class="text-xs text-gray-500 hidden sm:block">Base de datos de resistencia química</div>
                </div>
            </a>
            <div class="flex items-center gap-3 text-sm">
                <nav class="hidden md:flex items-center gap-4">
                    {desktop_nav}
                </nav>
                <select id="langSelect" aria-label="Seleccionar idioma" class="bg-gray-100 border border-gray-200 rounded-lg px-2 py-1 text-sm cursor-pointer">
                    <option value="en">&#127468;&#127463; EN</option>
                    <option value="es" selected>&#127466;&#127480; ES</option>
                    <option value="de">&#127465;&#127466; DE</option>
                </select>
                <button id="mobileMenuBtn" class="md:hidden p-2 rounded-lg hover:bg-gray-100" aria-label="Menú">
                    <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                </button>
            </div>
        </div>
        <div id="mobileMenu" class="hidden md:hidden border-t border-gray-200 bg-white">
            <nav class="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
                {mobile_nav}
            </nav>
        </div>
    </header>
    <script>
        document.getElementById('mobileMenuBtn').addEventListener('click', function() {{
            document.getElementById('mobileMenu').classList.toggle('hidden');
        }});
        document.getElementById('langSelect').addEventListener('change', function() {{
            var lang = this.value;
            if (lang === 'en') window.location.href = '/';
            else window.location.href = '/' + lang + '/';
        }});
    </script>'''


ES_FOOTER = '''    <footer class="bg-gray-900 text-gray-400 py-8 px-4">
        <div class="max-w-5xl mx-auto text-center text-sm">
            <p>&copy; 2026 ChemicalResistance.org &mdash; Herramienta gratuita de compatibilidad qu&iacute;mica</p>
            <p class="mt-2">Fuentes de datos: B&uuml;rkle, INEOS, est&aacute;ndares industriales</p>
        </div>
    </footer>'''

# Shared JS functions (chemical names stay as-is from the JSON source)
SHARED_JS = r'''
    const ratingMap = { '1':'A', '2':'B', '3':'C', '4':'D', '0':'NR' };

    function translateConc(conc) {
        if (!conc) return '&mdash;';
        return conc;
    }

    function getRating(c, matKey, temp) {
        return ratingMap[c.ratings[matKey]?.[temp]] || 'NR';
    }
'''

# Material mappings
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
    'SAN':'SAN','SI':'Silicona','V2A':'SS304','V4A':'SS316'
}


# ============================================================
# 1. CHART PAGES (Spanish)
# ============================================================
CHARTS = [
    {
        'slug': 'fluoropolimeros',
        'title': 'Comparación de resistencia de fluoropolímeros',
        'h1': 'Comparación de Fluoropolímeros',
        'desc': 'Compare la resistencia química de PTFE, FEP, PVDF y ECTFE/ETFE lado a lado. Más de 950 químicos a 20°C y 50°C.',
        'intro': 'Los fluoropolímeros ofrecen la mayor resistencia química de todos los plásticos. Compare aquí los cuatro fluoropolímeros más comunes.',
        'materials': ['PTFE', 'FEP', 'PVDF', 'ECTFE_ETFE'],
        'color': 'blue',
        'faq': [
            ('¿Cuál fluoropolímero es el más resistente?',
             'El PTFE (Teflón) tiene la resistencia química más amplia de todos los fluoropolímeros, con más de 965 calificaciones A (Excelente). El FEP le sigue de cerca con 899 calificaciones A.'),
            ('¿Cuál es la diferencia entre PTFE y FEP?',
             'Ambos tienen una resistencia química prácticamente idéntica. La diferencia principal radica en el procesamiento: el FEP puede procesarse por fusión (inyección, extrusión), mientras que el PTFE debe sinterizarse o mecanizarse. El PTFE soporta temperaturas más altas (260°C vs 200°C).'),
        ],
    },
    {
        'slug': 'elastomeros',
        'title': 'Comparación de resistencia de elastómeros',
        'h1': 'Comparación de Elastómeros',
        'desc': 'Compare la resistencia de NBR, EPDM, Viton y Silicona lado a lado. Encuentre el mejor material de sellado para su químico.',
        'intro': 'Los elastómeros se utilizan para juntas, juntas tóricas y mangueras. Compare aquí los cuatro tipos más importantes.',
        'materials': ['NBR', 'EPDM', 'FPM', 'SI'],
        'color': 'amber',
        'faq': [
            ('¿Cuál es la diferencia entre NBR y EPDM?',
             'El NBR (caucho nitrilo) es resistente a aceites y combustibles, pero sensible al ozono. El EPDM tiene excelente resistencia al agua, vapor y ozono, pero no a los aceites minerales.'),
            ('¿Cuándo se debe usar Viton?',
             'El Viton (FPM/FKM) ofrece la resistencia más amplia entre los elastómeros y es ideal para químicos agresivos, altas temperaturas y solventes. Sin embargo, es más costoso que el NBR o el EPDM.'),
        ],
    },
    {
        'slug': 'metales',
        'title': 'Comparación de resistencia de metales',
        'h1': 'Comparación de Metales',
        'desc': 'Compare la resistencia del acero inoxidable 316, acero inoxidable 304 y aluminio lado a lado a 20°C y 50°C.',
        'intro': 'Compare la resistencia a la corrosión de los tres metales más comunes en la ingeniería química.',
        'materials': ['V4A', 'V2A', 'AL'],
        'color': 'gray',
        'faq': [
            ('¿Cuál es la diferencia entre acero inoxidable 304 y 316?',
             'El 316 (V4A/1.4401) contiene molibdeno adicional, lo que lo hace significativamente más resistente a cloruros y ácidos que el 304 (V2A/1.4301). El 316 se prefiere para medios agresivos y agua de mar.'),
            ('¿Cuándo es adecuado el aluminio?',
             'El aluminio es ligero y resistente a la corrosión frente a muchos químicos neutros, pero sensible a ácidos y bases fuertes. Es adecuado para almacenamiento y transporte de solventes y químicos secos.'),
        ],
    },
    {
        'slug': 'plasticos-comunes',
        'title': 'Comparación de resistencia de plásticos comunes',
        'h1': 'Comparación de Plásticos Comunes',
        'desc': 'Compare la resistencia de HDPE, LDPE, PP, PVC rígido y PVC flexible lado a lado. Los plásticos más utilizados para almacenamiento químico.',
        'intro': 'Los plásticos comunes son los materiales más utilizados para contenedores de químicos y tuberías.',
        'materials': ['HDPE', 'LDPE', 'PP', 'PVC_HART', 'PVC_WEICH'],
        'color': 'green',
        'faq': [
            ('¿Cuál es la diferencia entre HDPE y LDPE?',
             'El HDPE es más denso y rígido con mejor resistencia química. El LDPE es más flexible y se usa para películas y bolsas. Para almacenamiento químico, el HDPE es generalmente la mejor opción.'),
            ('¿Es el PVC resistente a los ácidos?',
             'El PVC rígido (PVC-U) tiene buena resistencia a la mayoría de los ácidos a temperatura ambiente. El PVC flexible (PVC-P) es menos resistente debido a los plastificantes. Ambos son sensibles a solventes e hidrocarburos aromáticos.'),
        ],
    },
    {
        'slug': 'plasticos-transparentes',
        'title': 'Comparación de resistencia de plásticos transparentes',
        'h1': 'Comparación de Plásticos Transparentes y de Laboratorio',
        'desc': 'Compare la resistencia de PC, PETG, PMP, PSU y SAN lado a lado. Materiales transparentes para equipos de laboratorio y mirillas.',
        'intro': 'Los plásticos transparentes son importantes para equipos de laboratorio, mirillas y aplicaciones ópticas.',
        'materials': ['PC', 'PETG', 'PMP', 'PSU', 'SAN'],
        'color': 'purple',
        'faq': [
            ('¿Qué plástico transparente tiene la mejor resistencia?',
             'El PMP (polimetilpenteno) y el PSU (polisulfona) ofrecen la mejor resistencia química entre los plásticos transparentes. El PMP también es autoclavable.'),
            ('¿Se puede usar policarbonato con solventes?',
             'No, el policarbonato (PC) es sensible a la mayoría de los solventes orgánicos, cetonas y compuestos aromáticos. Para contacto con solventes, use PMP o PTFE en su lugar.'),
        ],
    },
    {
        'slug': 'plasticos-de-ingenieria',
        'title': 'Comparación de resistencia de plásticos de ingeniería',
        'h1': 'Comparación de Plásticos de Ingeniería',
        'desc': 'Compare la resistencia de Nylon (PA), POM y Poliestireno lado a lado a 20°C y 50°C.',
        'intro': 'Plásticos de ingeniería para componentes mecánicamente exigidos con contacto químico.',
        'materials': ['PA', 'POM', 'PS'],
        'color': 'orange',
        'faq': [
            ('¿Es el nylon resistente a los químicos?',
             'El nylon (PA) tiene buena resistencia a muchos solventes y aceites, pero es sensible a ácidos fuertes y medios oxidantes. Absorbe humedad, lo que afecta las propiedades mecánicas.'),
            ('¿Qué es el POM y para qué se usa?',
             'El POM (polioximetileno/acetal) es un plástico de ingeniería de alta resistencia con buena resistencia a muchos químicos. Se utiliza para engranajes, válvulas y piezas de bombas. El POM no es resistente a ácidos fuertes.'),
        ],
    },
    {
        'slug': 'todos-los-materiales',
        'title': 'Los 24 materiales — Comparación de resistencia',
        'h1': 'Comparación de los 24 Materiales',
        'desc': 'Tabla comparativa completa de los 24 materiales — fluoropolímeros, elastómeros, metales y plásticos lado a lado.',
        'intro': 'La visión completa de los 24 materiales. Desplácese horizontalmente para ver todas las columnas.',
        'materials': list(MAT_SHORT.keys()),
        'color': 'emerald',
        'faq': [
            ('¿Cuántos materiales se comparan?',
             'Esta tabla compara los 24 materiales disponibles: 4 fluoropolímeros, 4 elastómeros, 3 metales, 5 plásticos comunes, 5 plásticos transparentes y 3 plásticos de ingeniería.'),
            ('¿Qué significan las calificaciones A, B, C, D?',
             'A (Excelente) = El material es permanentemente resistente. B (Bueno) = Resistencia limitada, adecuado para contacto breve. C (Limitado) = El material puede hincharse o degradarse. D (No recomendado) = El material no es adecuado.'),
        ],
    },
]


def build_chart_page(chart):
    slug = chart['slug']
    mats = chart['materials']
    mat_js = json.dumps([{'key': k, 'short': MAT_SHORT[k], 'dir': MAT_KEY_TO_DIR[k]} for k in mats])

    # Table header columns
    th_cols = ''
    for k in mats:
        d = MAT_KEY_TO_DIR[k]
        s = MAT_SHORT[k]
        th_cols += f'<th class="py-3 px-2 font-semibold text-gray-600 text-center whitespace-nowrap"><a href="/materials/es/{d}/" class="hover:text-emerald-600 hover:underline">{s}</a></th>'

    # FAQ schema
    faq_entities = []
    for q, a in chart['faq']:
        faq_entities.append(f'{{"@type":"Question","name":"{q}","acceptedAnswer":{{"@type":"Answer","text":"{a}"}}}}')
    faq_schema = '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[' + ','.join(faq_entities) + ']}'

    # FAQ HTML
    faq_html = ''
    for q, a in chart['faq']:
        faq_html += f'''            <details class="border border-gray-200 rounded-xl overflow-hidden">
                <summary class="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">{q}</summary>
                <div class="px-5 py-4 border-t border-gray-100 text-gray-600 text-sm">{a}</div>
            </details>\n'''

    # Cross-links to other chart pages
    cross_links = ''
    for c in CHARTS:
        if c['slug'] == slug:
            continue
        cross_links += f'''                <a href="/es/charts/{c['slug']}/" class="p-3 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-center">
                    <div class="font-bold text-gray-900 text-sm">{c['h1'].replace('Comparación de ','')}</div>
                    <div class="text-xs text-gray-500">{len(c['materials'])} materiales</div>
                </a>\n'''

    header = get_es_header(active='charts')

    html = f'''<!DOCTYPE html>
<html lang="es">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{chart['title']}</title>
    <meta name="description" content="{chart['desc']}">
    <link rel="canonical" href="https://chemicalresistance.org/es/charts/{slug}/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <meta property="og:title" content="{chart['title']}">
    <meta property="og:description" content="{chart['desc']}">
    <meta property="og:type" content="article">
    <link rel="stylesheet" href="/css/tailwind.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
{STYLES}
<script type="application/ld+json">
{faq_schema}
</script>
</head>
<body class="text-gray-700 min-h-screen">
{header}

    <section class="bg-gradient-to-b from-{chart['color']}-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-5xl mx-auto">
            <div class="flex items-center gap-2 text-sm text-{chart['color']}-600 mb-3">
                <a href="/es/" class="hover:underline">Inicio</a>
                <span>&rsaquo;</span>
                <a href="/es/charts/" class="hover:underline">Tablas</a>
                <span>&rsaquo;</span>
                <span class="text-gray-600">{chart['h1']}</span>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-3">{chart['h1']}</h1>
            <p class="text-lg text-gray-600 mb-4">{chart['intro']}</p>
            <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-A"></span> A = Excelente</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-B"></span> B = Bueno</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-C"></span> C = Limitado</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-D"></span> D = No recomendado</span>
            </div>
        </div>
    </section>

    <section class="px-4 py-6 no-print">
        <div class="max-w-7xl mx-auto">
            <div class="bg-white rounded-xl border border-gray-200 p-4">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <input type="text" id="searchInput" placeholder="Buscar químico..." class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none">
                    </div>
                    <select id="ratingFilter" class="px-4 py-2 border border-gray-200 rounded-lg">
                        <option value="all">Todas las calificaciones</option>
                        <option value="any-A">Al menos un A</option>
                        <option value="any-D">Al menos un D</option>
                        <option value="diff">Calificaciones diferentes</option>
                        <option value="all-A">Todos los materiales A</option>
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
                <span>Mostrando <span id="resultCount" class="font-semibold text-gray-700">0</span> químicos</span>
                <label class="flex items-center gap-2 cursor-pointer no-print">
                    <input type="checkbox" id="highlightDiffs" checked class="rounded">
                    <span>Resaltar diferencias</span>
                </label>
            </div>
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full" style="min-width:600px">
                        <thead class="sticky top-0 z-10">
                            <tr class="bg-gray-50 text-left text-sm">
                                <th class="py-3 px-4 font-semibold text-gray-600">Químico</th>
                                <th class="py-3 px-3 font-semibold text-gray-600 text-sm">Conc.</th>
                                {th_cols}
                            </tr>
                        </thead>
                        <tbody id="chartTable" class="divide-y divide-gray-100"></tbody>
                    </table>
                </div>
            </div>
            <div id="loadMore" class="mt-4 text-center hidden">
                <button onclick="loadMore()" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">Cargar más</button>
            </div>
        </div>
    </section>

    <section class="px-4 py-8 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Preguntas frecuentes</h2>
            <div class="space-y-3">
{faq_html}            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Más tablas comparativas</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
{cross_links}            </div>
        </div>
    </section>

{ES_FOOTER}

    <script>
    var MATS = {mat_js};
    {SHARED_JS}
    var chemicals = [];
    var filtered = [];
    var displayCount = 80;

    function hasDiff(c, temp) {{
        var ratings = new Set();
        for (var i = 0; i < MATS.length; i++) {{
            var r = c.ratings[MATS[i].key]?.[temp];
            if (r && r !== '0') ratings.add(r);
        }}
        return ratings.size > 1;
    }}

    fetch('/data/chemicals_burkle_full.json')
        .then(function(r) {{ return r.json(); }})
        .then(function(data) {{
            chemicals = data.filter(function(c) {{
                var count = 0;
                for (var i = 0; i < MATS.length; i++) {{
                    if (c.ratings[MATS[i].key]?.c20 && c.ratings[MATS[i].key].c20 !== '0') count++;
                    if (count >= 2) return true;
                }}
                return false;
            }});
            applyFilters();
        }});

    function applyFilters() {{
        var query = document.getElementById('searchInput').value.toLowerCase();
        var filter = document.getElementById('ratingFilter').value;
        var temp = document.getElementById('tempFilter').value;

        filtered = chemicals.filter(function(c) {{
            if (query) {{
                var name = c.name.toLowerCase();
                if (!name.includes(query) && !(c.cas && c.cas.includes(query))) return false;
            }}
            if (filter === 'diff') return hasDiff(c, temp);
            if (filter === 'any-A') return MATS.some(function(m) {{ return getRating(c, m.key, temp) === 'A'; }});
            if (filter === 'any-D') return MATS.some(function(m) {{ return getRating(c, m.key, temp) === 'D'; }});
            if (filter === 'all-A') return MATS.every(function(m) {{
                var r = getRating(c, m.key, temp);
                return r === 'A' || r === 'NR';
            }});
            return true;
        }});

        filtered.sort(function(a, b) {{
            var aDiff = hasDiff(a, temp) ? 0 : 1;
            var bDiff = hasDiff(b, temp) ? 0 : 1;
            if (aDiff !== bDiff) return aDiff - bDiff;
            return a.name.localeCompare(b.name, 'es');
        }});

        displayCount = 80;
        renderTable();
    }}

    function renderTable() {{
        var tbody = document.getElementById('chartTable');
        var temp = document.getElementById('tempFilter').value;
        var highlight = document.getElementById('highlightDiffs').checked;
        var toShow = filtered.slice(0, displayCount);

        document.getElementById('resultCount').textContent = filtered.length;
        document.getElementById('loadMore').classList.toggle('hidden', displayCount >= filtered.length);

        tbody.innerHTML = toShow.map(function(c) {{
            var conc = translateConc(c.concentration);
            var isDiff = hasDiff(c, temp);
            var rowClass = (highlight && isDiff) ? 'diff-row hover:bg-amber-100' : 'hover:bg-gray-50';

            var cells = '';
            for (var i = 0; i < MATS.length; i++) {{
                var r = getRating(c, MATS[i].key, temp);
                cells += '<td class="py-2 px-2 text-center"><span class="rating-' + r + ' px-1.5 py-0.5 rounded text-xs font-bold">' + r + '</span></td>';
            }}

            return '<tr class="' + rowClass + '">'
                + '<td class="py-2 px-4 text-sm"><div class="font-medium text-gray-900">' + c.name + '</div></td>'
                + '<td class="py-2 px-3 text-xs text-gray-500">' + conc + '</td>'
                + cells + '</tr>';
        }}).join('');
    }}

    function loadMore() {{ displayCount += 80; renderTable(); }}

    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('ratingFilter').addEventListener('change', applyFilters);
    document.getElementById('tempFilter').addEventListener('change', applyFilters);
    document.getElementById('highlightDiffs').addEventListener('change', renderTable);
    </script>
{CF_BEACON}
</body>
</html>'''

    outdir = os.path.join(BASE, 'es', 'charts', slug)
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'  Created: es/charts/{slug}/index.html')


def build_charts_index():
    header = get_es_header(active='charts')

    cards = ''
    for c in CHARTS:
        mat_names = ', '.join(MAT_SHORT[k] for k in c['materials'][:4])
        if len(c['materials']) > 4:
            mat_names += f' +{len(c["materials"])-4}'
        cards += f'''            <a href="/es/charts/{c['slug']}/" class="bg-white p-6 rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-sm transition-all">
                <h2 class="text-lg font-bold text-gray-900 mb-1">{c['h1'].replace('Comparación de ','')}</h2>
                <p class="text-sm text-gray-600">{mat_names}</p>
                <p class="text-xs text-gray-400 mt-2">{len(c['materials'])} materiales comparar &rarr;</p>
            </a>\n'''

    html = f'''<!DOCTYPE html>
<html lang="es">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tablas comparativas &mdash; Resistencia química</title>
    <meta name="description" content="Tablas comparativas de resistencia qu&iacute;mica: fluoropol&iacute;meros, elast&oacute;meros, metales y pl&aacute;sticos lado a lado.">
    <link rel="canonical" href="https://chemicalresistance.org/es/charts/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="/css/tailwind.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>* {{ font-family: 'Inter', sans-serif; }} body {{ background: #f8fafc; }}</style>
</head>
<body class="text-gray-700 min-h-screen">
{header}

    <section class="bg-gradient-to-b from-emerald-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-3">Tablas comparativas</h1>
            <p class="text-lg text-gray-600">Compare grupos de materiales lado a lado &mdash; fluoropolímeros, elastómeros, metales y plásticos.</p>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
{cards}        </div>
    </section>

{ES_FOOTER}
{CF_BEACON}
</body>
</html>'''

    outdir = os.path.join(BASE, 'es', 'charts')
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print('  Created: es/charts/index.html')


# ============================================================
# 2. COMPARE PAGES (Spanish)
# ============================================================
COMPARISONS = [
    {
        'slug': 'etfe-vs-ectfe',
        'title': 'ETFE vs ECTFE: Comparación de resistencia química',
        'h1': 'ETFE vs ECTFE',
        'mat_a_key': 'ECTFE_ETFE', 'mat_a_name': 'ETFE', 'mat_a_full': 'Etileno tetrafluoroetileno',
        'mat_a_desc': 'El ETFE ofrece excelente resistencia química con buena resistencia mecánica. Es transparente y reciclable.',
        'mat_a_temp': '-100°C a 150°C',
        'mat_a_use': 'Acristalamientos arquitectónicos, recubrimiento de cables, cubiertas de módulos solares, procesamiento químico general.',
        'mat_b_key': 'ECTFE_ETFE', 'mat_b_name': 'ECTFE', 'mat_b_full': 'Etileno clorotrifluoroetileno',
        'mat_b_desc': 'El ECTFE tiene una resistencia química superior, especialmente contra solventes clorados y medios agresivos.',
        'mat_b_temp': '-76°C a 150°C',
        'mat_b_use': 'Químicos agresivos, solventes clorados, revestimiento de tanques, sistemas de escape con vapores ácidos.',
    },
    {
        'slug': 'ptfe-vs-fep',
        'title': 'PTFE vs FEP: Comparación de resistencia química',
        'h1': 'PTFE vs FEP',
        'mat_a_key': 'PTFE', 'mat_a_name': 'PTFE', 'mat_a_full': 'Politetrafluoroetileno (Teflón)',
        'mat_a_desc': 'El PTFE tiene la resistencia química más amplia de todos los plásticos. Debe sinterizarse o mecanizarse.',
        'mat_a_temp': '-200°C a 260°C',
        'mat_a_use': 'Resistencia química universal, aplicaciones de alta temperatura, juntas, equipos de laboratorio.',
        'mat_b_key': 'FEP', 'mat_b_name': 'FEP', 'mat_b_full': 'Etileno propileno fluorado',
        'mat_b_desc': 'El FEP tiene resistencia prácticamente idéntica al PTFE, pero puede procesarse por fusión (inyección, extrusión).',
        'mat_b_temp': '-200°C a 200°C',
        'mat_b_use': 'Mangueras, revestimiento de tuberías, equipos de laboratorio, cuando la moldeabilidad es importante.',
    },
    {
        'slug': 'nbr-vs-epdm',
        'title': 'NBR vs EPDM: Comparación de resistencia química',
        'h1': 'NBR vs EPDM',
        'mat_a_key': 'NBR', 'mat_a_name': 'NBR', 'mat_a_full': 'Caucho nitrilo (Buna-N)',
        'mat_a_desc': 'El NBR es resistente a aceites, combustibles y muchos químicos industriales. Material estándar para juntas tóricas.',
        'mat_a_temp': '-40°C a 120°C',
        'mat_a_use': 'Sellos de aceite, mangueras de combustible, sistemas hidráulicos, juntas tóricas para aceites minerales.',
        'mat_b_key': 'EPDM', 'mat_b_name': 'EPDM', 'mat_b_full': 'Caucho de etileno-propileno-dieno',
        'mat_b_desc': 'El EPDM tiene excelente resistencia al agua, vapor, ozono y muchas soluciones acuosas.',
        'mat_b_temp': '-50°C a 150°C',
        'mat_b_use': 'Sistemas de agua, sellos de vapor, aplicaciones exteriores, líquidos de frenos.',
    },
    {
        'slug': 'hdpe-vs-pvdf',
        'title': 'HDPE vs PVDF: Comparación de resistencia química',
        'h1': 'HDPE vs PVDF',
        'mat_a_key': 'HDPE', 'mat_a_name': 'HDPE', 'mat_a_full': 'Polietileno de alta densidad',
        'mat_a_desc': 'El HDPE es económico con buena resistencia a muchos ácidos y bases. Material estándar para contenedores de almacenamiento.',
        'mat_a_temp': '-50°C a 80°C',
        'mat_a_use': 'Contenedores de químicos, tuberías, bandejas de contención, soluciones de almacenamiento económicas.',
        'mat_b_key': 'PVDF', 'mat_b_name': 'PVDF', 'mat_b_full': 'Fluoruro de polivinilideno',
        'mat_b_desc': 'El PVDF ofrece resistencia superior contra ácidos concentrados y solventes a temperaturas más altas.',
        'mat_b_temp': '-30°C a 150°C',
        'mat_b_use': 'Químicos agresivos, industria de semiconductores, aplicaciones farmacéuticas, sistemas de agua ultrapura.',
    },
    {
        'slug': 'polisulfona-vs-pvdf',
        'title': 'Polisulfona vs PVDF: Comparación de resistencia química',
        'h1': 'Polisulfona vs PVDF',
        'mat_a_key': 'PSU', 'mat_a_name': 'Polisulfona', 'mat_a_full': 'Polisulfona (PSU)',
        'mat_a_desc': 'La polisulfona es transparente, autoclavable y resistente a soluciones acuosas y muchos químicos.',
        'mat_a_temp': '-100°C a 160°C',
        'mat_a_use': 'Equipos de laboratorio, filtros de membrana, aplicaciones médicas, procesamiento de alimentos.',
        'mat_b_key': 'PVDF', 'mat_b_name': 'PVDF', 'mat_b_full': 'Fluoruro de polivinilideno',
        'mat_b_desc': 'El PVDF ofrece resistencia superior contra ácidos concentrados y solventes.',
        'mat_b_temp': '-30°C a 150°C',
        'mat_b_use': 'Químicos agresivos, industria de semiconductores, sistemas de agua ultrapura.',
    },
]


def build_comparison_page(comp):
    header = get_es_header(active='compare')

    # Cross-links
    cross = ''
    for c in COMPARISONS:
        if c['slug'] == comp['slug']:
            continue
        cross += f'''                <a href="/es/compare/{c['slug']}/" class="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-center">
                    <div class="font-bold text-gray-900">{c['h1']}</div>
                    <div class="text-xs text-gray-500">Ver comparación</div>
                </a>\n'''

    html = f'''<!DOCTYPE html>
<html lang="es">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{comp['title']}</title>
    <meta name="description" content="{comp['title']}. Vea qué material es mejor para su aplicación.">
    <link rel="canonical" href="https://chemicalresistance.org/es/compare/{comp['slug']}/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="/css/tailwind.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
{STYLES}
</head>
<body class="text-gray-700 min-h-screen">
{header}

    <section class="bg-gradient-to-b from-blue-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <div class="flex items-center gap-2 text-sm text-blue-600 mb-3">
                <a href="/es/" class="hover:underline">Inicio</a>
                <span>&rsaquo;</span>
                <a href="/es/compare/" class="hover:underline">Comparar</a>
                <span>&rsaquo;</span>
                <span class="text-gray-600">{comp['h1']}</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{comp['h1']}</h1>
            <p class="text-lg text-gray-600 mb-4">Resistencia química en comparación directa.</p>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-1">{comp['mat_a_name']}</h2>
                    <p class="text-sm text-blue-600 mb-3">{comp['mat_a_full']}</p>
                    <p class="text-gray-600 mb-4">{comp['mat_a_desc']}</p>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between py-1 border-b border-gray-100">
                            <span class="text-gray-500">Rango de temperatura</span>
                            <span class="font-medium">{comp['mat_a_temp']}</span>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-1">{comp['mat_b_name']}</h2>
                    <p class="text-sm text-blue-600 mb-3">{comp['mat_b_full']}</p>
                    <p class="text-gray-600 mb-4">{comp['mat_b_desc']}</p>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between py-1 border-b border-gray-100">
                            <span class="text-gray-500">Rango de temperatura</span>
                            <span class="font-medium">{comp['mat_b_temp']}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 py-8 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">¿Cuándo usar cada material?</h2>
            <div class="grid md:grid-cols-2 gap-6">
                <div class="p-5 rounded-xl bg-blue-50 border border-blue-100">
                    <h3 class="font-bold text-gray-900 mb-2">{comp['mat_a_name']} elegir para:</h3>
                    <p class="text-gray-600 text-sm">{comp['mat_a_use']}</p>
                </div>
                <div class="p-5 rounded-xl bg-amber-50 border border-amber-100">
                    <h3 class="font-bold text-gray-900 mb-2">{comp['mat_b_name']} elegir para:</h3>
                    <p class="text-gray-600 text-sm">{comp['mat_b_use']}</p>
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Calificaciones químicas comparadas</h2>
            <p class="text-gray-600 mb-4">Químicos con calificación diferente a 20°C:</p>
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gray-50 text-left text-sm">
                                <th class="py-3 px-4 font-semibold text-gray-600">Químico</th>
                                <th class="py-3 px-4 font-semibold text-gray-600 text-center">{comp['mat_a_name']}</th>
                                <th class="py-3 px-4 font-semibold text-gray-600 text-center">{comp['mat_b_name']}</th>
                            </tr>
                        </thead>
                        <tbody id="compareTable" class="divide-y divide-gray-100"></tbody>
                    </table>
                </div>
            </div>
            <div id="loadMore" class="mt-4 text-center hidden">
                <button onclick="loadMore()" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">Cargar más</button>
            </div>
        </div>
    </section>

    <section class="px-4 py-12 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Más comparaciones</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
{cross}            </div>
        </div>
    </section>

{ES_FOOTER}

    <script>
    var MAT_A = '{comp['mat_a_key']}';
    var MAT_B = '{comp['mat_b_key']}';
    var allDiffs = [];
    var displayCount = 30;
    {SHARED_JS}

    fetch('/data/chemicals_burkle_full.json')
        .then(function(r) {{ return r.json(); }})
        .then(function(data) {{
            allDiffs = data.filter(function(c) {{
                var rA = c.ratings[MAT_A];
                var rB = c.ratings[MAT_B];
                if (!rA || !rB) return false;
                if (rA.c20 === '0' && rB.c20 === '0') return false;
                return rA.c20 !== rB.c20;
            }});
            allDiffs.sort(function(a, b) {{ return a.name.localeCompare(b.name, 'es'); }});
            renderTable();
        }});

    function renderTable() {{
        var tbody = document.getElementById('compareTable');
        var toShow = allDiffs.slice(0, displayCount);
        document.getElementById('loadMore').classList.toggle('hidden', displayCount >= allDiffs.length);

        tbody.innerHTML = toShow.map(function(c) {{
            var rA = getRating(c, MAT_A, 'c20');
            var rB = getRating(c, MAT_B, 'c20');
            return '<tr class="hover:bg-gray-50">'
                + '<td class="py-2 px-4 text-sm font-medium text-gray-900">' + c.name + '</td>'
                + '<td class="py-2 px-4 text-center"><span class="rating-' + rA + ' px-2 py-0.5 rounded text-xs font-bold">' + rA + '</span></td>'
                + '<td class="py-2 px-4 text-center"><span class="rating-' + rB + ' px-2 py-0.5 rounded text-xs font-bold">' + rB + '</span></td>'
                + '</tr>';
        }}).join('');
    }}

    function loadMore() {{ displayCount += 30; renderTable(); }}
    </script>
{CF_BEACON}
</body>
</html>'''

    outdir = os.path.join(BASE, 'es', 'compare', comp['slug'])
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"  Created: es/compare/{comp['slug']}/index.html")


def build_compare_index():
    """Build the Spanish interactive comparison tool page."""
    header = get_es_header(active='compare')

    # Static comparison cards
    comp_cards = ''
    for c in COMPARISONS:
        comp_cards += f'''                <a href="/es/compare/{c['slug']}/" class="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                    <h3 class="text-lg font-bold text-gray-900 mb-1">{c['h1']}</h3>
                    <p class="text-sm text-gray-600">{c['mat_a_full']} vs {c['mat_b_full']}</p>
                </a>\n'''

    # Chart links
    chart_links = ''
    for c in CHARTS:
        mat_names = ', '.join(MAT_SHORT[k] for k in c['materials'][:4])
        if len(c['materials']) > 4:
            mat_names += f" +{len(c['materials'])-4}"
        chart_links += f'''                <a href="/es/charts/{c['slug']}/" class="p-3 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-center">
                    <div class="font-bold text-gray-900 text-sm">{c['h1'].replace('Comparación de ','')}</div>
                    <div class="text-xs text-gray-500">{mat_names}</div>
                </a>\n'''

    # ALL_MATS JS structure with Spanish group names
    all_mats_js = '''[
        { key: 'AL',         name: 'Aluminio',               short: 'Al',       dir: 'aluminium',       group: 'Metales' },
        { key: 'ECTFE_ETFE', name: 'ECTFE / ETFE',           short: 'ECTFE',    dir: 'ectfe-etfe',      group: 'Fluoropolímeros' },
        { key: 'EPDM',       name: 'EPDM',                   short: 'EPDM',     dir: 'epdm',            group: 'Elastómeros' },
        { key: 'FEP',        name: 'FEP',                    short: 'FEP',      dir: 'fep',             group: 'Fluoropolímeros' },
        { key: 'FPM',        name: 'Viton (FPM/FKM)',        short: 'Viton',    dir: 'viton',           group: 'Elastómeros' },
        { key: 'HDPE',       name: 'HDPE',                   short: 'HDPE',     dir: 'hdpe',            group: 'Plásticos Comunes' },
        { key: 'LDPE',       name: 'LDPE',                   short: 'LDPE',     dir: 'ldpe',            group: 'Plásticos Comunes' },
        { key: 'NBR',        name: 'NBR (Nitrilo)',          short: 'NBR',      dir: 'nbr',             group: 'Elastómeros' },
        { key: 'PA',         name: 'Nylon (PA)',             short: 'Nylon',    dir: 'nylon-pa',        group: 'Plásticos de Ingeniería' },
        { key: 'PC',         name: 'Policarbonato (PC)',     short: 'PC',       dir: 'polycarbonate',   group: 'Plásticos Transparentes' },
        { key: 'PETG',       name: 'PETG',                   short: 'PETG',     dir: 'petg',            group: 'Plásticos Transparentes' },
        { key: 'PMP',        name: 'PMP',                    short: 'PMP',      dir: 'pmp',             group: 'Plásticos Transparentes' },
        { key: 'POM',        name: 'Acetal (POM)',           short: 'POM',      dir: 'acetal-pom',      group: 'Plásticos de Ingeniería' },
        { key: 'PP',         name: 'Polipropileno (PP)',     short: 'PP',       dir: 'pp',              group: 'Plásticos Comunes' },
        { key: 'PS',         name: 'Poliestireno (PS)',      short: 'PS',       dir: 'polystyrene',     group: 'Plásticos de Ingeniería' },
        { key: 'PSU',        name: 'Polisulfona (PSU)',      short: 'PSU',      dir: 'polysulfone',     group: 'Plásticos Transparentes' },
        { key: 'PTFE',       name: 'PTFE (Teflón)',          short: 'PTFE',     dir: 'ptfe',            group: 'Fluoropolímeros' },
        { key: 'PVC_HART',   name: 'PVC rígido (PVC-U)',    short: 'uPVC',     dir: 'pvc-rigid',       group: 'Plásticos Comunes' },
        { key: 'PVC_WEICH',  name: 'PVC flexible (PVC-P)',  short: 'pPVC',     dir: 'pvc-flexible',    group: 'Plásticos Comunes' },
        { key: 'PVDF',       name: 'PVDF',                   short: 'PVDF',     dir: 'pvdf',            group: 'Fluoropolímeros' },
        { key: 'SAN',        name: 'SAN',                    short: 'SAN',      dir: 'san',             group: 'Plásticos Transparentes' },
        { key: 'SI',         name: 'Silicona',               short: 'Silicona', dir: 'silicone',        group: 'Elastómeros' },
        { key: 'V2A',        name: 'Acero inoxidable 304 (V2A)', short: 'SS304', dir: 'stainless-steel-304', group: 'Metales' },
        { key: 'V4A',        name: 'Acero inoxidable 316 (V4A)', short: 'SS316', dir: 'ss316',           group: 'Metales' },
    ]'''

    html = f'''<!DOCTYPE html>
<html lang="es">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comparar materiales &mdash; Resistencia química lado a lado</title>
    <meta name="description" content="Cree su propia comparación de materiales. Seleccione 2-3 materiales de 24 opciones y vea calificaciones de resistencia para más de 1.600 químicos.">
    <link rel="canonical" href="https://chemicalresistance.org/es/compare/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="/css/tailwind.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
{STYLES}
<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{{"@type":"Question","name":"¿Cómo comparo la resistencia química de diferentes materiales?","acceptedAnswer":{{"@type":"Answer","text":"Use la herramienta de comparación de arriba para seleccionar 2 o 3 materiales de los menús desplegables. La herramienta muestra calificaciones de resistencia (A a D) para más de 1.600 químicos a 20°C y 50°C lado a lado."}}}},{{"@type":"Question","name":"¿Qué significan las calificaciones A, B, C, D?","acceptedAnswer":{{"@type":"Answer","text":"A (Excelente) = permanentemente resistente. B (Bueno) = resistencia limitada, adecuado para contacto breve. C (Limitado) = el material puede hincharse o degradarse. D (No recomendado) = el material no es adecuado."}}}}]}}
</script>
</head>
<body class="text-gray-700 min-h-screen">
{header}

    <section class="bg-gradient-to-b from-blue-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-3">Cree su propia comparación de materiales</h1>
            <p class="text-lg text-gray-600">Seleccione 2 o 3 materiales y compare la resistencia química al instante lado a lado para más de 1.600 químicos.</p>
        </div>
    </section>

    <section class="px-4 py-6 no-print">
        <div class="max-w-5xl mx-auto">
            <div class="bg-white rounded-xl border border-gray-200 p-5">
                <div class="flex flex-col gap-4">
                    <div class="text-sm font-semibold text-gray-700 mb-1">Seleccionar materiales para comparar:</div>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">Material 1</label>
                            <select id="mat1" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm font-medium"></select>
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">Material 2</label>
                            <select id="mat2" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm font-medium"></select>
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">Material 3 <span class="text-gray-400">(opcional)</span></label>
                            <select id="mat3" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm font-medium"></select>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                        <button id="compareBtn" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors">Comparar ahora</button>
                        <button id="resetBtn" class="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors">Restablecer</button>
                        <span id="statusMsg" class="text-sm text-gray-500 ml-2"></span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="legendSection" class="px-4 hidden">
        <div class="max-w-5xl mx-auto">
            <div class="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-A"></span> A = Excelente</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-B"></span> B = Bueno</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-C"></span> C = Limitado</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-D"></span> D = No recomendado</span>
            </div>
        </div>
    </section>

    <section id="filterSection" class="px-4 py-4 hidden no-print">
        <div class="max-w-5xl mx-auto">
            <div class="bg-white rounded-xl border border-gray-200 p-4">
                <div class="flex flex-col md:flex-row gap-3">
                    <div class="flex-1">
                        <input type="text" id="searchInput" placeholder="Buscar químico..." class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm">
                    </div>
                    <select id="ratingFilter" class="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                        <option value="all">Todas las calificaciones</option>
                        <option value="any-A">Al menos un A</option>
                        <option value="any-D">Al menos un D</option>
                        <option value="diff">Calificaciones diferentes</option>
                        <option value="all-A">Todos los materiales A</option>
                    </select>
                    <select id="tempFilter" class="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                        <option value="c20">20°C</option>
                        <option value="c50">50°C</option>
                    </select>
                </div>
            </div>
        </div>
    </section>

    <section id="resultsSection" class="px-4 py-4 hidden">
        <div class="max-w-5xl mx-auto">
            <div class="mb-3 flex items-center justify-between text-sm text-gray-500">
                <span>Mostrando <span id="resultCount" class="font-semibold text-gray-700">0</span> químicos</span>
                <label class="flex items-center gap-2 cursor-pointer no-print">
                    <input type="checkbox" id="highlightDiffs" checked class="rounded">
                    <span>Resaltar diferencias</span>
                </label>
            </div>
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full" style="min-width:500px">
                        <thead class="sticky top-0 z-10">
                            <tr id="tableHead" class="bg-gray-50 text-left text-sm"></tr>
                        </thead>
                        <tbody id="tableBody" class="divide-y divide-gray-100"></tbody>
                    </table>
                </div>
            </div>
            <div id="loadMore" class="mt-4 text-center hidden">
                <button onclick="loadMore()" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm">Cargar más</button>
            </div>
        </div>
    </section>

    <section class="px-4 py-8 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Preguntas frecuentes</h2>
            <div class="space-y-3">
                <details class="border border-gray-200 rounded-xl overflow-hidden">
                    <summary class="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">¿Cómo comparo la resistencia química de diferentes materiales?</summary>
                    <div class="px-5 py-4 border-t border-gray-100 text-gray-600 text-sm">Use la herramienta de comparación de arriba para seleccionar 2 o 3 materiales de los menús desplegables. La herramienta muestra calificaciones de resistencia (A a D) para más de 1.600 químicos a 20°C y 50°C lado a lado.</div>
                </details>
                <details class="border border-gray-200 rounded-xl overflow-hidden">
                    <summary class="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">¿Qué significan las calificaciones A, B, C, D?</summary>
                    <div class="px-5 py-4 border-t border-gray-100 text-gray-600 text-sm">A (Excelente) = El material es permanentemente resistente. B (Bueno) = Resistencia limitada, adecuado para contacto breve. C (Limitado) = El material puede hincharse o degradarse. D (No recomendado) = El material no es adecuado.</div>
                </details>
            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Comparaciones populares</h2>
            <div class="grid md:grid-cols-2 gap-4">
{comp_cards}            </div>
        </div>
    </section>

    <section class="px-4 py-8 border-t border-gray-100">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Tablas comparativas por grupo</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
{chart_links}            </div>
        </div>
    </section>

{ES_FOOTER}

    <script>
    var ALL_MATS = {all_mats_js};
    {SHARED_JS}
    var allData = [];
    var filtered = [];
    var displayCount = 80;
    var activeMats = [];
    var dataLoaded = false;

    function populateSelects() {{
        var groups = {{}};
        ALL_MATS.forEach(function(m) {{
            if (!groups[m.group]) groups[m.group] = [];
            groups[m.group].push(m);
        }});
        var groupOrder = ['Fluoropolímeros', 'Elastómeros', 'Metales', 'Plásticos Comunes', 'Plásticos Transparentes', 'Plásticos de Ingeniería'];

        ['mat1', 'mat2', 'mat3'].forEach(function(id, i) {{
            var sel = document.getElementById(id);
            if (i === 2) {{
                var opt = document.createElement('option');
                opt.value = '';
                opt.textContent = '— Ninguno —';
                sel.appendChild(opt);
            }}
            groupOrder.forEach(function(gName) {{
                var og = document.createElement('optgroup');
                og.label = gName;
                (groups[gName] || []).forEach(function(m) {{
                    var opt = document.createElement('option');
                    opt.value = m.key;
                    opt.textContent = m.name;
                    og.appendChild(opt);
                }});
                sel.appendChild(og);
            }});
        }});
        document.getElementById('mat1').value = 'PTFE';
        document.getElementById('mat2').value = 'HDPE';
        document.getElementById('mat3').value = '';
    }}

    function hasDiff(c, temp) {{
        var ratings = new Set();
        for (var i = 0; i < activeMats.length; i++) {{
            var r = c.ratings[activeMats[i].key]?.[temp];
            if (r && r !== '0') ratings.add(r);
        }}
        return ratings.size > 1;
    }}

    function loadData() {{
        if (dataLoaded) return Promise.resolve();
        document.getElementById('statusMsg').textContent = 'Cargando datos...';
        return fetch('/data/chemicals_burkle_full.json')
            .then(function(r) {{ return r.json(); }})
            .then(function(data) {{
                allData = data;
                dataLoaded = true;
                document.getElementById('statusMsg').textContent = '';
            }})
            .catch(function() {{
                document.getElementById('statusMsg').textContent = 'Error al cargar. Por favor, inténtelo de nuevo.';
            }});
    }}

    function runComparison() {{
        var k1 = document.getElementById('mat1').value;
        var k2 = document.getElementById('mat2').value;
        var k3 = document.getElementById('mat3').value;
        if (k1 === k2 || (k3 && (k3 === k1 || k3 === k2))) {{
            document.getElementById('statusMsg').textContent = 'Por favor, seleccione materiales diferentes.';
            return;
        }}
        activeMats = [ALL_MATS.find(function(m) {{ return m.key === k1; }}), ALL_MATS.find(function(m) {{ return m.key === k2; }})];
        if (k3) activeMats.push(ALL_MATS.find(function(m) {{ return m.key === k3; }}));

        loadData().then(function() {{
            var thead = document.getElementById('tableHead');
            thead.innerHTML = '<th class="py-3 px-4 font-semibold text-gray-600">Químico</th>'
                + '<th class="py-3 px-3 font-semibold text-gray-600 text-sm">Conc.</th>'
                + activeMats.map(function(m) {{
                    return '<th class="py-3 px-2 font-semibold text-gray-600 text-center whitespace-nowrap"><a href="/materials/es/' + m.dir + '/" class="hover:text-emerald-600 hover:underline">' + m.short + '</a></th>';
                }}).join('');

            document.getElementById('legendSection').classList.remove('hidden');
            document.getElementById('filterSection').classList.remove('hidden');
            document.getElementById('resultsSection').classList.remove('hidden');

            var params = new URLSearchParams();
            params.set('m1', k1); params.set('m2', k2);
            if (k3) params.set('m3', k3);
            history.replaceState(null, '', '?' + params.toString());

            applyFilters();
            document.getElementById('legendSection').scrollIntoView({{ behavior: 'smooth' }});
        }});
    }}

    function applyFilters() {{
        if (!activeMats.length) return;
        var query = document.getElementById('searchInput').value.toLowerCase();
        var filter = document.getElementById('ratingFilter').value;
        var temp = document.getElementById('tempFilter').value;

        var relevant = allData.filter(function(c) {{
            var count = 0;
            for (var i = 0; i < activeMats.length; i++) {{
                if (c.ratings[activeMats[i].key] && c.ratings[activeMats[i].key].c20 && c.ratings[activeMats[i].key].c20 !== '0') count++;
                if (count >= 2) return true;
            }}
            return false;
        }});

        filtered = relevant.filter(function(c) {{
            if (query) {{
                if (!c.name.toLowerCase().includes(query) && !(c.cas && c.cas.includes(query))) return false;
            }}
            if (filter === 'diff') return hasDiff(c, temp);
            if (filter === 'any-A') return activeMats.some(function(m) {{ return getRating(c, m.key, temp) === 'A'; }});
            if (filter === 'any-D') return activeMats.some(function(m) {{ return getRating(c, m.key, temp) === 'D'; }});
            if (filter === 'all-A') return activeMats.every(function(m) {{
                var r = getRating(c, m.key, temp);
                return r === 'A' || r === 'NR';
            }});
            return true;
        }});

        filtered.sort(function(a, b) {{
            var aDiff = hasDiff(a, temp) ? 0 : 1;
            var bDiff = hasDiff(b, temp) ? 0 : 1;
            if (aDiff !== bDiff) return aDiff - bDiff;
            return a.name.localeCompare(b.name, 'es');
        }});

        displayCount = 80;
        renderTable();
    }}

    function renderTable() {{
        var tbody = document.getElementById('tableBody');
        var temp = document.getElementById('tempFilter').value;
        var highlight = document.getElementById('highlightDiffs').checked;
        var toShow = filtered.slice(0, displayCount);

        document.getElementById('resultCount').textContent = filtered.length;
        document.getElementById('loadMore').classList.toggle('hidden', displayCount >= filtered.length);

        tbody.innerHTML = toShow.map(function(c) {{
            var conc = translateConc(c.concentration);
            var isDiff = hasDiff(c, temp);
            var rowClass = (highlight && isDiff) ? 'diff-row hover:bg-amber-100' : 'hover:bg-gray-50';

            var cells = '';
            for (var i = 0; i < activeMats.length; i++) {{
                var r = getRating(c, activeMats[i].key, temp);
                cells += '<td class="py-2 px-2 text-center"><span class="rating-' + r + ' px-1.5 py-0.5 rounded text-xs font-bold">' + r + '</span></td>';
            }}

            return '<tr class="' + rowClass + '">'
                + '<td class="py-2 px-4 text-sm"><div class="font-medium text-gray-900">' + c.name + '</div></td>'
                + '<td class="py-2 px-3 text-xs text-gray-500">' + conc + '</td>'
                + cells + '</tr>';
        }}).join('');
    }}

    function loadMore() {{ displayCount += 80; renderTable(); }}

    document.getElementById('compareBtn').addEventListener('click', runComparison);
    document.getElementById('resetBtn').addEventListener('click', function() {{
        document.getElementById('mat1').value = 'PTFE';
        document.getElementById('mat2').value = 'HDPE';
        document.getElementById('mat3').value = '';
        document.getElementById('legendSection').classList.add('hidden');
        document.getElementById('filterSection').classList.add('hidden');
        document.getElementById('resultsSection').classList.add('hidden');
        document.getElementById('searchInput').value = '';
        document.getElementById('ratingFilter').value = 'all';
        document.getElementById('tempFilter').value = 'c20';
        history.replaceState(null, '', '/es/compare/');
        activeMats = [];
    }});
    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('ratingFilter').addEventListener('change', applyFilters);
    document.getElementById('tempFilter').addEventListener('change', applyFilters);
    document.getElementById('highlightDiffs').addEventListener('change', renderTable);

    populateSelects();

    var params = new URLSearchParams(window.location.search);
    if (params.get('m1') && params.get('m2')) {{
        var m1 = params.get('m1'), m2 = params.get('m2'), m3 = params.get('m3') || '';
        if (ALL_MATS.find(function(m) {{ return m.key === m1; }}) && ALL_MATS.find(function(m) {{ return m.key === m2; }})) {{
            document.getElementById('mat1').value = m1;
            document.getElementById('mat2').value = m2;
            if (m3 && ALL_MATS.find(function(m) {{ return m.key === m3; }})) document.getElementById('mat3').value = m3;
            runComparison();
        }}
    }}
    </script>
{CF_BEACON}
</body>
</html>'''

    outdir = os.path.join(BASE, 'es', 'compare')
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print('  Created: es/compare/index.html')


# ============================================================
# 3. UPDATE NAV ON EXISTING ES PAGES
# ============================================================
def update_es_nav():
    """Update navigation on all existing ES pages."""
    es_dir = os.path.join(BASE, 'es')
    html_files = glob.glob(os.path.join(es_dir, '**', '*.html'), recursive=True)

    # Also check materials/es/ and chemicals/es/
    html_files.extend(glob.glob(os.path.join(BASE, 'materials', 'es', '**', '*.html'), recursive=True))
    html_files.extend(glob.glob(os.path.join(BASE, 'chemicals', 'es', '**', '*.html'), recursive=True))
    html_files.extend(glob.glob(os.path.join(BASE, 'es-about', '**', '*.html'), recursive=True))

    updated = 0
    for filepath in sorted(set(html_files)):
        # Skip files we just generated (charts and compare)
        rel = os.path.relpath(filepath, BASE)
        if 'es/charts/' in rel or 'es/compare/' in rel:
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            html = f.read()

        if '<header' not in html:
            continue

        # Detect active section
        active = None
        if 'materials/es' in rel:
            active = 'materials'
        elif 'chemicals/es' in rel:
            active = 'chemicals'
        elif 'storage-compatibility' in rel:
            active = 'storage'
        elif 'sds-decoder' in rel:
            active = 'sds'
        elif 'viscosity' in rel:
            active = 'viscosity'
        elif 'about' in rel or 'es-about' in rel:
            active = 'about'
        elif rel == os.path.join('es', 'index.html'):
            active = 'home'

        new_header = get_es_header(active)

        # Remove old mobile menu JS
        html = re.sub(
            r'</header>\s*<script>\s*document\.getElementById\([\'"]mobileMenuBtn[\'"]\).*?</script>',
            '</header>',
            html, flags=re.DOTALL
        )

        # Replace header
        pattern = r'[ \t]*<header\b[^>]*>.*?</header>'
        match = re.search(pattern, html, re.DOTALL)
        if match:
            new_html = html[:match.start()] + new_header + html[match.end():]
            if new_html != html:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_html)
                print(f'  Updated nav: {rel}')
                updated += 1

    return updated


# ============================================================
# 4. UPDATE SITEMAP
# ============================================================
def update_sitemap():
    sitemap_path = os.path.join(BASE, 'sitemap.xml')
    if not os.path.exists(sitemap_path):
        print('  Sitemap not found, skipping.')
        return

    with open(sitemap_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_urls = []

    # Charts
    new_urls.append('https://chemicalresistance.org/es/charts/')
    for c in CHARTS:
        new_urls.append(f"https://chemicalresistance.org/es/charts/{c['slug']}/")

    # Compare
    new_urls.append('https://chemicalresistance.org/es/compare/')
    for c in COMPARISONS:
        new_urls.append(f"https://chemicalresistance.org/es/compare/{c['slug']}/")

    # Add only URLs not already present
    added = 0
    insert_point = content.rfind('</urlset>')
    for url in new_urls:
        if url not in content:
            entry = f'  <url><loc>{url}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>\n'
            content = content[:insert_point] + entry + content[insert_point:]
            insert_point += len(entry)
            added += 1

    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'  Sitemap: added {added} new ES URLs')


# ============================================================
# Main
# ============================================================
if __name__ == '__main__':
    print("Building Spanish (ES) pages for chemicalresistance.org")
    print("=" * 55)

    print("\n1. Chart pages:")
    build_charts_index()
    for chart in CHARTS:
        build_chart_page(chart)

    print("\n2. Compare pages:")
    build_compare_index()
    for comp in COMPARISONS:
        build_comparison_page(comp)

    print("\n3. Updating navigation on existing ES pages:")
    nav_count = update_es_nav()
    print(f"  Updated {nav_count} existing pages")

    print("\n4. Updating sitemap:")
    update_sitemap()

    print("\n" + "=" * 55)
    print("Done! Spanish pages created:")
    print(f"  - 1 charts index + {len(CHARTS)} chart pages")
    print(f"  - 1 compare tool + {len(COMPARISONS)} comparison pages")
    print(f"  - {nav_count} existing pages updated with new nav")
