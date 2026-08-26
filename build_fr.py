#!/usr/bin/env python3
"""
Build French (FR) versions of Charts and Compare pages for chemicalresistance.org.
Also updates navigation across all FR pages.
"""
import os, re, json, glob

BASE = os.path.dirname(os.path.abspath(__file__))

# ============================================================
# Shared: Analytics, styles, nav
# ============================================================
GA_HEAD = '''<script async src="https://www.googletagmanager.com/gtag/js?id=G-LTK6VVHYDW"></script>
<script src="https://analytics.ahrefs.com/analytics.js" data-key="xrS32xSgQE4Xp1oL20j7uQ" async></script>
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


def get_fr_header(active=None):
    """French navigation header."""
    links = [
        ('materials', '/materials/fr/', 'Matériaux'),
        ('chemicals', '/chemicals/fr/', 'Produits chimiques'),
        ('compare',   '/fr/compare/',   'Comparer'),
        ('charts',    '/fr/charts/',    'Tableaux'),
        ('storage',   '/fr/storage-compatibility/', 'Stockage'),
        ('sds',       '/fr/sds-decoder/', 'FDS'),
        ('viscosity', '/fr/viscosity/',  'Viscosité'),
        ('about',     '/fr/about/',      'À propos'),
    ]

    desktop_links = []
    for key, href, label in links:
        if key == active:
            desktop_links.append(f'<a href="{href}" class="text-emerald-600 font-medium">{label}</a>')
        else:
            desktop_links.append(f'<a href="{href}" class="text-gray-600 hover:text-gray-900 hover:underline">{label}</a>')
    desktop_nav = '\n                    '.join(desktop_links)

    mobile_items = [
        ('home',      '/fr/',           'Tableau de résistance'),
        ('materials', '/materials/fr/', 'Tous les matériaux'),
        ('chemicals', '/chemicals/fr/', 'Tous les produits chimiques'),
        ('compare',   '/fr/compare/',   'Comparer les matériaux'),
        ('charts',    '/fr/charts/',    'Tableaux comparatifs'),
        ('storage',   '/fr/storage-compatibility/', 'Compatibilité de stockage'),
        ('sds',       '/fr/sds-decoder/', 'Décodeur FDS'),
        ('viscosity', '/fr/viscosity/',  'Viscosité'),
        ('about',     '/fr/about/',      'À propos'),
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
            <a href="/fr/" class="flex items-center gap-2">
                <img src="/logos/logo-icon-128x128.png" alt="ChemicalResistance" class="w-10 h-10 rounded-xl">
                <div>
                    <div class="font-bold text-gray-900">ChemicalResistance.org</div>
                    <div class="text-xs text-gray-500 hidden sm:block">Base de données de résistance chimique</div>
                </div>
            </a>
            <div class="flex items-center gap-3 text-sm">
                <nav class="hidden md:flex items-center gap-4">
                    {desktop_nav}
                </nav>
                <select id="langSelect" aria-label="Choisir la langue" class="bg-gray-100 border border-gray-200 rounded-lg px-2 py-1 text-sm cursor-pointer">
                    <option value="en">🇬🇧 EN</option>
                    <option value="es">🇪🇸 ES</option>
                    <option value="de">🇩🇪 DE</option>
                    <option value="fr" selected>🇫🇷 FR</option>
                </select>
                <button id="mobileMenuBtn" class="md:hidden p-2 rounded-lg hover:bg-gray-100" aria-label="Menu">
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


FR_FOOTER = '''    <footer class="bg-gray-900 text-gray-400 py-8 px-4">
        <div class="max-w-5xl mx-auto text-center text-sm">
            <p>&copy; 2026 ChemicalResistance.org &mdash; Outil gratuit de compatibilit&eacute; chimique</p>
            <p class="mt-2">Sources de donn&eacute;es : B&uuml;rkle, INEOS, normes industrielles</p>
        </div>
    </footer>'''

# Shared JS functions
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
    'SAN':'SAN','SI':'Silicone','V2A':'SS304','V4A':'SS316'
}


# ============================================================
# 1. CHART PAGES (French)
# ============================================================
CHARTS = [
    {
        'slug': 'fluoropolymeres',
        'title': 'Comparaison de la résistance des Fluoropolymères',
        'h1': 'Comparaison des Fluoropolymères',
        'desc': 'Comparez la résistance chimique du PTFE, FEP, PVDF et ECTFE/ETFE côte à côte. Plus de 950 produits chimiques à 20°C et 50°C.',
        'intro': 'Les fluoropolymères offrent la meilleure résistance chimique de tous les plastiques. Comparez ici les quatre fluoropolymères les plus courants.',
        'materials': ['PTFE', 'FEP', 'PVDF', 'ECTFE_ETFE'],
        'color': 'blue',
        'faq': [
            ('Quel fluoropolymère offre la meilleure résistance ?',
             'Le PTFE (Téflon) possède la résistance chimique la plus large de tous les fluoropolymères, avec plus de 965 évaluations A (Excellent). Le FEP suit de près avec 899 évaluations A.'),
            ('Quelle est la différence entre le PTFE et le FEP ?',
             'Les deux ont une résistance chimique quasi identique. La principale différence réside dans la mise en œuvre : le FEP peut être transformé par fusion (injection, extrusion), tandis que le PTFE doit être fritté ou usiné. Le PTFE supporte des températures plus élevées (260°C contre 200°C).'),
        ],
    },
    {
        'slug': 'elastomeres',
        'title': 'Comparaison de la résistance des Élastomères',
        'h1': 'Comparaison des Élastomères',
        'desc': 'Comparez la résistance du NBR, EPDM, Viton et Silicone côte à côte. Trouvez le meilleur matériau d’étanchéité pour votre produit chimique.',
        'intro': 'Les élastomères sont utilisés pour les joints, les joints toriques et les tuyaux. Comparez ici les quatre types les plus importants.',
        'materials': ['NBR', 'EPDM', 'FPM', 'SI'],
        'color': 'amber',
        'faq': [
            ('Quelle est la différence entre le NBR et l’EPDM ?',
             'Le NBR (caoutchouc nitrile) résiste aux huiles et aux carburants, mais est sensible à l’ozone. L’EPDM offre une excellente résistance à l’eau, à la vapeur et à l’ozone, mais ne convient pas aux huiles minérales.'),
            ('Quand faut-il utiliser le Viton ?',
             'Le Viton (FPM/FKM) offre la résistance la plus large parmi les élastomères. Il est idéal pour les produits chimiques agressifs, les hautes températures et les solvants. Il est toutefois plus coûteux que le NBR ou l’EPDM.'),
        ],
    },
    {
        'slug': 'metaux',
        'title': 'Comparaison de la résistance des Métaux',
        'h1': 'Comparaison des Métaux',
        'desc': 'Comparez la résistance de l’acier inoxydable 316, de l’acier inoxydable 304 et de l’aluminium côte à côte à 20°C et 50°C.',
        'intro': 'Comparez la résistance à la corrosion des trois métaux les plus courants en génie chimique.',
        'materials': ['V4A', 'V2A', 'AL'],
        'color': 'gray',
        'faq': [
            ('Quelle est la différence entre l’acier inoxydable 304 et 316 ?',
             'L’acier 316 (V4A / 1.4401) contient du molybdène en plus, ce qui le rend nettement plus résistant aux chlorures et aux acides que le 304 (V2A / 1.4301). Le 316 est privilégié pour les milieux agressifs et l’eau de mer.'),
            ('Quand l’aluminium est-il adapté ?',
             'L’aluminium est léger et résistant à la corrosion face à de nombreux produits chimiques neutres, mais sensible aux acides forts et aux bases. Il convient au stockage et au transport de solvants et de produits chimiques secs.'),
        ],
    },
    {
        'slug': 'plastiques-courants',
        'title': 'Comparaison de la résistance des Plastiques Courants',
        'h1': 'Comparaison des Plastiques Courants',
        'desc': 'Comparez la résistance du HDPE, LDPE, PP, PVC rigide et PVC souple côte à côte. Les plastiques les plus utilisés pour le stockage chimique.',
        'intro': 'Les plastiques courants sont les matériaux les plus fréquemment utilisés pour les conteneurs et les canalisations de produits chimiques.',
        'materials': ['HDPE', 'LDPE', 'PP', 'PVC_HART', 'PVC_WEICH'],
        'color': 'green',
        'faq': [
            ('Quelle est la différence entre le HDPE et le LDPE ?',
             'Le HDPE est plus dense et plus rigide, avec une meilleure résistance chimique. Le LDPE est plus souple et utilisé pour les films et les sacs. Pour le stockage chimique, le HDPE est généralement le meilleur choix.'),
            ('Le PVC est-il résistant aux acides ?',
             'Le PVC rigide (PVC-U) offre une bonne résistance à la plupart des acides à température ambiante. Le PVC souple (PVC-P) est moins résistant en raison des plastifiants. Les deux sont sensibles aux solvants et aux hydrocarbures aromatiques.'),
        ],
    },
    {
        'slug': 'plastiques-transparents',
        'title': 'Comparaison de la résistance des Plastiques Transparents',
        'h1': 'Comparaison des Plastiques Transparents et de Laboratoire',
        'desc': 'Comparez la résistance du PC, PETG, PMP, PSU et SAN côte à côte. Matériaux transparents pour équipements de laboratoire et regards.',
        'intro': 'Les plastiques transparents sont essentiels pour les équipements de laboratoire, les regards et les applications optiques.',
        'materials': ['PC', 'PETG', 'PMP', 'PSU', 'SAN'],
        'color': 'purple',
        'faq': [
            ('Quel plastique transparent offre la meilleure résistance ?',
             'Le PMP (polyméthylpentène) et le PSU (polysulfone) offrent la meilleure résistance chimique parmi les plastiques transparents. Le PMP est également autoclavable.'),
            ('Le polycarbonate peut-il être utilisé avec des solvants ?',
             'Non, le polycarbonate (PC) est sensible à la plupart des solvants organiques, des cétones et des composés aromatiques. Pour un contact avec des solvants, utilisez plutôt le PMP ou le PTFE.'),
        ],
    },
    {
        'slug': 'plastiques-techniques',
        'title': 'Comparaison de la résistance des Plastiques Techniques',
        'h1': 'Comparaison des Plastiques Techniques',
        'desc': 'Comparez la résistance du Nylon (PA), POM et Polystyrène côte à côte à 20°C et 50°C.',
        'intro': 'Plastiques techniques pour pièces soumises à des contraintes mécaniques en contact avec des produits chimiques.',
        'materials': ['PA', 'POM', 'PS'],
        'color': 'orange',
        'faq': [
            ('Le Nylon est-il résistant aux produits chimiques ?',
             'Le Nylon (PA) offre une bonne résistance à de nombreux solvants et huiles, mais est sensible aux acides forts et aux agents oxydants. Il absorbe l’humidité, ce qui affecte ses propriétés mécaniques.'),
            ('Qu’est-ce que le POM et à quoi sert-il ?',
             'Le POM (polyoxyméthylène / acétal) est un plastique technique haute résistance offrant une bonne tenue face à de nombreux produits chimiques. Il est utilisé pour les engrenages, les vannes et les pièces de pompe. Le POM ne résiste pas aux acides forts.'),
        ],
    },
    {
        'slug': 'tous-les-materiaux',
        'title': 'Les 24 Matériaux — Comparaison de résistance',
        'h1': 'Comparaison des 24 Matériaux',
        'desc': 'Tableau comparatif complet des 24 matériaux — fluoropolymères, élastomères, métaux et plastiques côte à côte.',
        'intro': 'La vue d’ensemble complète des 24 matériaux. Faites défiler horizontalement pour voir toutes les colonnes.',
        'materials': list(MAT_SHORT.keys()),
        'color': 'emerald',
        'faq': [
            ('Combien de matériaux sont comparés ?',
             'Ce tableau compare les 24 matériaux disponibles : 4 fluoropolymères, 4 élastomères, 3 métaux, 5 plastiques courants, 5 plastiques transparents et 3 plastiques techniques.'),
            ('Que signifient les évaluations A, B, C, D ?',
             'A (Excellent) = le matériau résiste durablement. B (Bon) = résistance limitée, adapté aux contacts de courte durée. C (Limité) = le matériau peut gonfler ou se dégrader. D (Non recommandé) = le matériau n’est pas adapté.'),
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
        th_cols += f'<th class="py-3 px-2 font-semibold text-gray-600 text-center whitespace-nowrap"><a href="/materials/fr/{d}/" class="hover:text-emerald-600 hover:underline">{s}</a></th>'

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
        cross_links += f'''                <a href="/fr/charts/{c['slug']}/" class="p-3 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-center">
                    <div class="font-bold text-gray-900 text-sm">{c['h1'].replace('Comparaison des ','')}</div>
                    <div class="text-xs text-gray-500">{len(c['materials'])} matériaux</div>
                </a>\n'''

    header = get_fr_header(active='charts')

    html = f'''<!DOCTYPE html>
<html lang="fr">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{chart['title']}</title>
    <meta name="description" content="{chart['desc']}">
    <link rel="canonical" href="https://chemicalresistance.org/fr/charts/{slug}/">
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
                <a href="/fr/" class="hover:underline">Accueil</a>
                <span>&rsaquo;</span>
                <a href="/fr/charts/" class="hover:underline">Tableaux</a>
                <span>&rsaquo;</span>
                <span class="text-gray-600">{chart['h1']}</span>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-3">{chart['h1']}</h1>
            <p class="text-lg text-gray-600 mb-4">{chart['intro']}</p>
            <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-A"></span> A = Excellent</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-B"></span> B = Bon</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-C"></span> C = Limité</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-D"></span> D = Non recommandé</span>
            </div>
        </div>
    </section>

    <section class="px-4 py-6 no-print">
        <div class="max-w-7xl mx-auto">
            <div class="bg-white rounded-xl border border-gray-200 p-4">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <input type="text" id="searchInput" placeholder="Rechercher un produit chimique..." class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none">
                    </div>
                    <select id="ratingFilter" class="px-4 py-2 border border-gray-200 rounded-lg">
                        <option value="all">Toutes les évaluations</option>
                        <option value="any-A">Au moins un A</option>
                        <option value="any-D">Au moins un D</option>
                        <option value="diff">Évaluations différentes</option>
                        <option value="all-A">Tous les matériaux A</option>
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
                <span>Affichage de <span id="resultCount" class="font-semibold text-gray-700">0</span> produits chimiques</span>
                <label class="flex items-center gap-2 cursor-pointer no-print">
                    <input type="checkbox" id="highlightDiffs" checked class="rounded">
                    <span>Mettre en évidence les différences</span>
                </label>
            </div>
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full" style="min-width:600px">
                        <thead class="sticky top-0 z-10">
                            <tr class="bg-gray-50 text-left text-sm">
                                <th class="py-3 px-4 font-semibold text-gray-600">Produit chimique</th>
                                <th class="py-3 px-3 font-semibold text-gray-600 text-sm">Conc.</th>
                                {th_cols}
                            </tr>
                        </thead>
                        <tbody id="chartTable" class="divide-y divide-gray-100"></tbody>
                    </table>
                </div>
            </div>
            <div id="loadMore" class="mt-4 text-center hidden">
                <button onclick="loadMore()" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">Charger plus</button>
            </div>
        </div>
    </section>

    <section class="px-4 py-8 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
            <div class="space-y-3">
{faq_html}            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Autres tableaux comparatifs</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
{cross_links}            </div>
        </div>
    </section>

{FR_FOOTER}

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
            return a.name.localeCompare(b.name, 'fr');
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

    outdir = os.path.join(BASE, 'fr', 'charts', slug)
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'  Created: fr/charts/{slug}/index.html')


def build_charts_index():
    header = get_fr_header(active='charts')

    cards = ''
    for c in CHARTS:
        mat_names = ', '.join(MAT_SHORT[k] for k in c['materials'][:4])
        if len(c['materials']) > 4:
            mat_names += f' +{len(c["materials"])-4}'
        cards += f'''            <a href="/fr/charts/{c['slug']}/" class="bg-white p-6 rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-sm transition-all">
                <h2 class="text-lg font-bold text-gray-900 mb-1">{c['h1'].replace('Comparaison des ','')}</h2>
                <p class="text-sm text-gray-600">{mat_names}</p>
                <p class="text-xs text-gray-400 mt-2">{len(c['materials'])} matériaux à comparer &rarr;</p>
            </a>\n'''

    html = f'''<!DOCTYPE html>
<html lang="fr">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tableaux comparatifs &mdash; Résistance chimique</title>
    <meta name="description" content="Tableaux comparatifs de r&eacute;sistance chimique : fluoropolym&egrave;res, &eacute;lastom&egrave;res, m&eacute;taux et plastiques c&ocirc;te &agrave; c&ocirc;te.">
    <link rel="canonical" href="https://chemicalresistance.org/fr/charts/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="/css/tailwind.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>* {{ font-family: 'Inter', sans-serif; }} body {{ background: #f8fafc; }}</style>
</head>
<body class="text-gray-700 min-h-screen">
{header}

    <section class="bg-gradient-to-b from-emerald-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-3">Tableaux comparatifs</h1>
            <p class="text-lg text-gray-600">Comparez les groupes de matériaux côte à côte &mdash; fluoropolymères, élastomères, métaux et plastiques.</p>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
{cards}        </div>
    </section>

{FR_FOOTER}
{CF_BEACON}
</body>
</html>'''

    outdir = os.path.join(BASE, 'fr', 'charts')
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print('  Created: fr/charts/index.html')


# ============================================================
# 2. COMPARE PAGES (French)
# ============================================================
COMPARISONS = [
    {
        'slug': 'etfe-vs-ectfe',
        'title': 'ETFE vs ECTFE : Résistance chimique comparée',
        'h1': 'ETFE vs ECTFE',
        'mat_a_key': 'ECTFE_ETFE', 'mat_a_name': 'ETFE', 'mat_a_full': 'Éthylène-tétrafluoroéthylène',
        'mat_a_desc': 'L’ETFE offre une excellente résistance chimique combinée à une bonne résistance mécanique. Il est transparent et recyclable.',
        'mat_a_temp': '-100°C à 150°C',
        'mat_a_use': 'Vitrages architecturaux, gainages de câbles, couvertures de panneaux solaires, procédés chimiques généraux.',
        'mat_b_key': 'ECTFE_ETFE', 'mat_b_name': 'ECTFE', 'mat_b_full': 'Éthylène-chlorotrifluoroéthylène',
        'mat_b_desc': 'L’ECTFE possède une résistance chimique supérieure, en particulier contre les solvants chlorés et les milieux agressifs.',
        'mat_b_temp': '-76°C à 150°C',
        'mat_b_use': 'Produits chimiques agressifs, solvants chlorés, revêtements de cuves, systèmes d’évacuation de vapeurs acides.',
    },
    {
        'slug': 'ptfe-vs-fep',
        'title': 'PTFE vs FEP : Résistance chimique comparée',
        'h1': 'PTFE vs FEP',
        'mat_a_key': 'PTFE', 'mat_a_name': 'PTFE', 'mat_a_full': 'Polytétrafluoroéthylène (Téflon)',
        'mat_a_desc': 'Le PTFE possède la résistance chimique la plus large de tous les plastiques. Il doit être fritté ou usiné.',
        'mat_a_temp': '-200°C à 260°C',
        'mat_a_use': 'Résistance chimique universelle, applications haute température, joints, équipements de laboratoire.',
        'mat_b_key': 'FEP', 'mat_b_name': 'FEP', 'mat_b_full': 'Éthylène-propylène fluoré',
        'mat_b_desc': 'Le FEP offre une résistance quasi identique au PTFE, mais peut être transformé par fusion (injection, extrusion).',
        'mat_b_temp': '-200°C à 200°C',
        'mat_b_use': 'Tuyaux, revêtements de canalisations, équipements de laboratoire, lorsque la mise en forme est importante.',
    },
    {
        'slug': 'nbr-vs-epdm',
        'title': 'NBR vs EPDM : Résistance chimique comparée',
        'h1': 'NBR vs EPDM',
        'mat_a_key': 'NBR', 'mat_a_name': 'NBR', 'mat_a_full': 'Caoutchouc nitrile (Buna-N)',
        'mat_a_desc': 'Le NBR résiste aux huiles, aux carburants et à de nombreux produits chimiques industriels. C’est le matériau standard pour les joints toriques.',
        'mat_a_temp': '-40°C à 120°C',
        'mat_a_use': 'Joints pour huiles, flexibles de carburant, systèmes hydrauliques, joints toriques pour huiles minérales.',
        'mat_b_key': 'EPDM', 'mat_b_name': 'EPDM', 'mat_b_full': 'Caoutchouc éthylène-propylène-diène',
        'mat_b_desc': 'L’EPDM offre une excellente résistance à l’eau, à la vapeur, à l’ozone et à de nombreuses solutions aqueuses.',
        'mat_b_temp': '-50°C à 150°C',
        'mat_b_use': 'Systèmes d’eau, joints pour vapeur, applications extérieures, liquides de frein.',
    },
    {
        'slug': 'hdpe-vs-pvdf',
        'title': 'HDPE vs PVDF : Résistance chimique comparée',
        'h1': 'HDPE vs PVDF',
        'mat_a_key': 'HDPE', 'mat_a_name': 'HDPE', 'mat_a_full': 'Polyéthylène haute densité',
        'mat_a_desc': 'Le HDPE est économique et offre une bonne résistance à de nombreux acides et bases. C’est le matériau standard pour les conteneurs de stockage.',
        'mat_a_temp': '-50°C à 80°C',
        'mat_a_use': 'Conteneurs de produits chimiques, canalisations, bacs de rétention, solutions de stockage économiques.',
        'mat_b_key': 'PVDF', 'mat_b_name': 'PVDF', 'mat_b_full': 'Fluorure de polyvinyldène',
        'mat_b_desc': 'Le PVDF offre une résistance supérieure aux acides concentrés et aux solvants à des températures plus élevées.',
        'mat_b_temp': '-30°C à 150°C',
        'mat_b_use': 'Produits chimiques agressifs, industrie des semi-conducteurs, applications pharmaceutiques, systèmes d’eau ultra-pure.',
    },
    {
        'slug': 'polysulfone-vs-pvdf',
        'title': 'Polysulfone vs PVDF : Résistance chimique comparée',
        'h1': 'Polysulfone vs PVDF',
        'mat_a_key': 'PSU', 'mat_a_name': 'Polysulfone', 'mat_a_full': 'Polysulfone (PSU)',
        'mat_a_desc': 'Le polysulfone est transparent, autoclavable et résistant aux solutions aqueuses et à de nombreux produits chimiques.',
        'mat_a_temp': '-100°C à 160°C',
        'mat_a_use': 'Équipements de laboratoire, filtres à membrane, applications médicales, transformation alimentaire.',
        'mat_b_key': 'PVDF', 'mat_b_name': 'PVDF', 'mat_b_full': 'Fluorure de polyvinyldène',
        'mat_b_desc': 'Le PVDF offre une résistance supérieure aux acides concentrés et aux solvants.',
        'mat_b_temp': '-30°C à 150°C',
        'mat_b_use': 'Produits chimiques agressifs, industrie des semi-conducteurs, systèmes d’eau ultra-pure.',
    },
]


def build_comparison_page(comp):
    header = get_fr_header(active='compare')

    # Cross-links
    cross = ''
    for c in COMPARISONS:
        if c['slug'] == comp['slug']:
            continue
        cross += f'''                <a href="/fr/compare/{c['slug']}/" class="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-center">
                    <div class="font-bold text-gray-900">{c['h1']}</div>
                    <div class="text-xs text-gray-500">Voir la comparaison</div>
                </a>\n'''

    html = f'''<!DOCTYPE html>
<html lang="fr">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{comp['title']}</title>
    <meta name="description" content="{comp['title']}. Découvrez quel matériau est le mieux adapté à votre application.">
    <link rel="canonical" href="https://chemicalresistance.org/fr/compare/{comp['slug']}/">
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
                <a href="/fr/" class="hover:underline">Accueil</a>
                <span>&rsaquo;</span>
                <a href="/fr/compare/" class="hover:underline">Comparer</a>
                <span>&rsaquo;</span>
                <span class="text-gray-600">{comp['h1']}</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{comp['h1']}</h1>
            <p class="text-lg text-gray-600 mb-4">Résistance chimique en comparaison directe.</p>
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
                            <span class="text-gray-500">Plage de température</span>
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
                            <span class="text-gray-500">Plage de température</span>
                            <span class="font-medium">{comp['mat_b_temp']}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 py-8 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Quand utiliser chaque matériau ?</h2>
            <div class="grid md:grid-cols-2 gap-6">
                <div class="p-5 rounded-xl bg-blue-50 border border-blue-100">
                    <h3 class="font-bold text-gray-900 mb-2">{comp['mat_a_name']} choisir pour :</h3>
                    <p class="text-gray-600 text-sm">{comp['mat_a_use']}</p>
                </div>
                <div class="p-5 rounded-xl bg-amber-50 border border-amber-100">
                    <h3 class="font-bold text-gray-900 mb-2">{comp['mat_b_name']} choisir pour :</h3>
                    <p class="text-gray-600 text-sm">{comp['mat_b_use']}</p>
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Évaluations chimiques comparées</h2>
            <p class="text-gray-600 mb-4">Produits chimiques avec des évaluations différentes à 20°C :</p>
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gray-50 text-left text-sm">
                                <th class="py-3 px-4 font-semibold text-gray-600">Produit chimique</th>
                                <th class="py-3 px-4 font-semibold text-gray-600 text-center">{comp['mat_a_name']}</th>
                                <th class="py-3 px-4 font-semibold text-gray-600 text-center">{comp['mat_b_name']}</th>
                            </tr>
                        </thead>
                        <tbody id="compareTable" class="divide-y divide-gray-100"></tbody>
                    </table>
                </div>
            </div>
            <div id="loadMore" class="mt-4 text-center hidden">
                <button onclick="loadMore()" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">Charger plus</button>
            </div>
        </div>
    </section>

    <section class="px-4 py-12 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Autres comparaisons</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
{cross}            </div>
        </div>
    </section>

{FR_FOOTER}

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
            allDiffs.sort(function(a, b) {{ return a.name.localeCompare(b.name, 'fr'); }});
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

    outdir = os.path.join(BASE, 'fr', 'compare', comp['slug'])
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"  Created: fr/compare/{comp['slug']}/index.html")


def build_compare_index():
    """Build the French interactive comparison tool page."""
    header = get_fr_header(active='compare')

    # Static comparison cards
    comp_cards = ''
    for c in COMPARISONS:
        comp_cards += f'''                <a href="/fr/compare/{c['slug']}/" class="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                    <h3 class="text-lg font-bold text-gray-900 mb-1">{c['h1']}</h3>
                    <p class="text-sm text-gray-600">{c['mat_a_full']} vs {c['mat_b_full']}</p>
                </a>\n'''

    # Chart links
    chart_links = ''
    for c in CHARTS:
        mat_names = ', '.join(MAT_SHORT[k] for k in c['materials'][:4])
        if len(c['materials']) > 4:
            mat_names += f" +{len(c['materials'])-4}"
        chart_links += f'''                <a href="/fr/charts/{c['slug']}/" class="p-3 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-center">
                    <div class="font-bold text-gray-900 text-sm">{c['h1'].replace('Comparaison des ','')}</div>
                    <div class="text-xs text-gray-500">{mat_names}</div>
                </a>\n'''

    all_mats_js = '''[
        { key: 'AL',         name: 'Aluminium',              short: 'Al',       dir: 'aluminium',       group: 'Métaux' },
        { key: 'ECTFE_ETFE', name: 'ECTFE / ETFE',           short: 'ECTFE',    dir: 'ectfe-etfe',      group: 'Fluoropolymères' },
        { key: 'EPDM',       name: 'EPDM',                   short: 'EPDM',     dir: 'epdm',            group: 'Élastomères' },
        { key: 'FEP',        name: 'FEP',                    short: 'FEP',      dir: 'fep',             group: 'Fluoropolymères' },
        { key: 'FPM',        name: 'Viton (FPM/FKM)',        short: 'Viton',    dir: 'viton',           group: 'Élastomères' },
        { key: 'HDPE',       name: 'HDPE',                   short: 'HDPE',     dir: 'hdpe',            group: 'Plastiques Courants' },
        { key: 'LDPE',       name: 'LDPE',                   short: 'LDPE',     dir: 'ldpe',            group: 'Plastiques Courants' },
        { key: 'NBR',        name: 'NBR (Nitrile)',          short: 'NBR',      dir: 'nbr',             group: 'Élastomères' },
        { key: 'PA',         name: 'Nylon (PA)',             short: 'Nylon',    dir: 'nylon-pa',        group: 'Plastiques Techniques' },
        { key: 'PC',         name: 'Polycarbonate (PC)',     short: 'PC',       dir: 'polycarbonate',   group: 'Plastiques Transparents' },
        { key: 'PETG',       name: 'PETG',                   short: 'PETG',     dir: 'petg',            group: 'Plastiques Transparents' },
        { key: 'PMP',        name: 'PMP',                    short: 'PMP',      dir: 'pmp',             group: 'Plastiques Transparents' },
        { key: 'POM',        name: 'Acétal (POM)',            short: 'POM',      dir: 'acetal-pom',      group: 'Plastiques Techniques' },
        { key: 'PP',         name: 'Polypropylène (PP)',      short: 'PP',       dir: 'pp',              group: 'Plastiques Courants' },
        { key: 'PS',         name: 'Polystyrène (PS)',        short: 'PS',       dir: 'polystyrene',     group: 'Plastiques Techniques' },
        { key: 'PSU',        name: 'Polysulfone (PSU)',      short: 'PSU',      dir: 'polysulfone',     group: 'Plastiques Transparents' },
        { key: 'PTFE',       name: 'PTFE (Téflon)',           short: 'PTFE',     dir: 'ptfe',            group: 'Fluoropolymères' },
        { key: 'PVC_HART',   name: 'PVC rigide (PVC-U)',    short: 'uPVC',     dir: 'pvc-rigid',       group: 'Plastiques Courants' },
        { key: 'PVC_WEICH',  name: 'PVC souple (PVC-P)',    short: 'pPVC',     dir: 'pvc-flexible',    group: 'Plastiques Courants' },
        { key: 'PVDF',       name: 'PVDF',                   short: 'PVDF',     dir: 'pvdf',            group: 'Fluoropolymères' },
        { key: 'SAN',        name: 'SAN',                    short: 'SAN',      dir: 'san',             group: 'Plastiques Transparents' },
        { key: 'SI',         name: 'Silicone',               short: 'Silicone', dir: 'silicone',        group: 'Élastomères' },
        { key: 'V2A',        name: 'Acier inox 304 (V2A)',  short: 'SS304',    dir: 'stainless-steel-304', group: 'Métaux' },
        { key: 'V4A',        name: 'Acier inox 316 (V4A)',  short: 'SS316',    dir: 'ss316',           group: 'Métaux' },
    ]'''

    html = f'''<!DOCTYPE html>
<html lang="fr">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comparer les matériaux &mdash; Résistance chimique côte à côte</title>
    <meta name="description" content="Créez votre comparaison de matériaux. Sélectionnez 2 à 3 matériaux parmi 24 et consultez les évaluations de résistance pour 1 600+ produits.">
    <link rel="canonical" href="https://chemicalresistance.org/fr/compare/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="/css/tailwind.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
{STYLES}
<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{{"@type":"Question","name":"Comment comparer la résistance chimique de différents matériaux ?","acceptedAnswer":{{"@type":"Answer","text":"Utilisez l’outil de comparaison ci-dessus pour sélectionner 2 ou 3 matériaux dans les menus déroulants. L’outil affiche les évaluations de résistance (A à D) pour plus de 1 600 produits chimiques à 20°C et 50°C côte à côte."}}}},{{"@type":"Question","name":"Que signifient les évaluations A, B, C, D ?","acceptedAnswer":{{"@type":"Answer","text":"A (Excellent) = résistance durable. B (Bon) = résistance limitée, adapté aux contacts de courte durée. C (Limité) = le matériau peut gonfler ou se dégrader. D (Non recommandé) = le matériau n’est pas adapté."}}}}]}}
</script>
</head>
<body class="text-gray-700 min-h-screen">
{header}

    <section class="bg-gradient-to-b from-blue-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-3">Créez votre propre comparaison de matériaux</h1>
            <p class="text-lg text-gray-600">Sélectionnez 2 ou 3 matériaux et comparez la résistance chimique instantanément côte à côte pour plus de 1 600 produits chimiques.</p>
        </div>
    </section>

    <section class="px-4 py-6 no-print">
        <div class="max-w-5xl mx-auto">
            <div class="bg-white rounded-xl border border-gray-200 p-5">
                <div class="flex flex-col gap-4">
                    <div class="text-sm font-semibold text-gray-700 mb-1">Sélectionner les matériaux à comparer :</div>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">Matériau 1</label>
                            <select id="mat1" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm font-medium"></select>
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">Matériau 2</label>
                            <select id="mat2" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm font-medium"></select>
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">Matériau 3 <span class="text-gray-400">(facultatif)</span></label>
                            <select id="mat3" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm font-medium"></select>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                        <button id="compareBtn" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors">Comparer maintenant</button>
                        <button id="resetBtn" class="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors">Réinitialiser</button>
                        <span id="statusMsg" class="text-sm text-gray-500 ml-2"></span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="legendSection" class="px-4 hidden">
        <div class="max-w-5xl mx-auto">
            <div class="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-A"></span> A = Excellent</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-B"></span> B = Bon</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-C"></span> C = Limité</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-D"></span> D = Non recommandé</span>
            </div>
        </div>
    </section>

    <section id="filterSection" class="px-4 py-4 hidden no-print">
        <div class="max-w-5xl mx-auto">
            <div class="bg-white rounded-xl border border-gray-200 p-4">
                <div class="flex flex-col md:flex-row gap-3">
                    <div class="flex-1">
                        <input type="text" id="searchInput" placeholder="Rechercher un produit chimique..." class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm">
                    </div>
                    <select id="ratingFilter" class="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                        <option value="all">Toutes les évaluations</option>
                        <option value="any-A">Au moins un A</option>
                        <option value="any-D">Au moins un D</option>
                        <option value="diff">Évaluations différentes</option>
                        <option value="all-A">Tous les matériaux A</option>
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
                <span>Affichage de <span id="resultCount" class="font-semibold text-gray-700">0</span> produits chimiques</span>
                <label class="flex items-center gap-2 cursor-pointer no-print">
                    <input type="checkbox" id="highlightDiffs" checked class="rounded">
                    <span>Mettre en évidence les différences</span>
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
                <button onclick="loadMore()" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm">Charger plus</button>
            </div>
        </div>
    </section>

    <section class="px-4 py-8 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
            <div class="space-y-3">
                <details class="border border-gray-200 rounded-xl overflow-hidden">
                    <summary class="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">Comment comparer la résistance chimique de différents matériaux ?</summary>
                    <div class="px-5 py-4 border-t border-gray-100 text-gray-600 text-sm">Utilisez l’outil de comparaison ci-dessus pour sélectionner 2 ou 3 matériaux dans les menus déroulants. L’outil affiche les évaluations de résistance (A à D) pour plus de 1 600 produits chimiques à 20°C et 50°C côte à côte.</div>
                </details>
                <details class="border border-gray-200 rounded-xl overflow-hidden">
                    <summary class="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">Que signifient les évaluations A, B, C, D ?</summary>
                    <div class="px-5 py-4 border-t border-gray-100 text-gray-600 text-sm">A (Excellent) = le matériau résiste durablement. B (Bon) = résistance limitée, adapté aux contacts de courte durée. C (Limité) = le matériau peut gonfler ou se dégrader. D (Non recommandé) = le matériau n’est pas adapté.</div>
                </details>
            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Comparaisons populaires</h2>
            <div class="grid md:grid-cols-2 gap-4">
{comp_cards}            </div>
        </div>
    </section>

    <section class="px-4 py-8 border-t border-gray-100">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Tableaux comparatifs par groupe</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
{chart_links}            </div>
        </div>
    </section>

{FR_FOOTER}

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
        var groupOrder = ['Fluoropolymères', 'Élastomères', 'Métaux', 'Plastiques Courants', 'Plastiques Transparents', 'Plastiques Techniques'];

        ['mat1', 'mat2', 'mat3'].forEach(function(id, i) {{
            var sel = document.getElementById(id);
            if (i === 2) {{
                var opt = document.createElement('option');
                opt.value = '';
                opt.textContent = '— Aucun —';
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
        document.getElementById('statusMsg').textContent = 'Chargement des données...';
        return fetch('/data/chemicals_burkle_full.json')
            .then(function(r) {{ return r.json(); }})
            .then(function(data) {{
                allData = data;
                dataLoaded = true;
                document.getElementById('statusMsg').textContent = '';
            }})
            .catch(function() {{
                document.getElementById('statusMsg').textContent = 'Erreur de chargement. Veuillez réessayer.';
            }});
    }}

    function runComparison() {{
        var k1 = document.getElementById('mat1').value;
        var k2 = document.getElementById('mat2').value;
        var k3 = document.getElementById('mat3').value;
        if (k1 === k2 || (k3 && (k3 === k1 || k3 === k2))) {{
            document.getElementById('statusMsg').textContent = 'Veuillez sélectionner des matériaux différents.';
            return;
        }}
        activeMats = [ALL_MATS.find(function(m) {{ return m.key === k1; }}), ALL_MATS.find(function(m) {{ return m.key === k2; }})];
        if (k3) activeMats.push(ALL_MATS.find(function(m) {{ return m.key === k3; }}));

        loadData().then(function() {{
            var thead = document.getElementById('tableHead');
            thead.innerHTML = '<th class="py-3 px-4 font-semibold text-gray-600">Produit chimique</th>'
                + '<th class="py-3 px-3 font-semibold text-gray-600 text-sm">Conc.</th>'
                + activeMats.map(function(m) {{
                    return '<th class="py-3 px-2 font-semibold text-gray-600 text-center whitespace-nowrap"><a href="/materials/fr/' + m.dir + '/" class="hover:text-emerald-600 hover:underline">' + m.short + '</a></th>';
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
            return a.name.localeCompare(b.name, 'fr');
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
        history.replaceState(null, '', '/fr/compare/');
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

    outdir = os.path.join(BASE, 'fr', 'compare')
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print('  Created: fr/compare/index.html')


# ============================================================
# 3. UPDATE NAV ON EXISTING FR PAGES
# ============================================================
def update_fr_nav():
    """Update navigation on all existing FR pages."""
    fr_dir = os.path.join(BASE, 'fr')
    html_files = glob.glob(os.path.join(fr_dir, '**', '*.html'), recursive=True)

    # Also check materials/fr/ and chemicals/fr/
    html_files.extend(glob.glob(os.path.join(BASE, 'materials', 'fr', '**', '*.html'), recursive=True))
    html_files.extend(glob.glob(os.path.join(BASE, 'chemicals', 'fr', '**', '*.html'), recursive=True))
    html_files.extend(glob.glob(os.path.join(BASE, 'fr-about', '**', '*.html'), recursive=True))

    updated = 0
    for filepath in sorted(set(html_files)):
        # Skip files we just generated (charts and compare)
        rel = os.path.relpath(filepath, BASE)
        if 'fr/charts/' in rel or 'fr/compare/' in rel:
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            html = f.read()

        if '<header' not in html:
            continue

        # Detect active section
        active = None
        if 'materials/fr' in rel:
            active = 'materials'
        elif 'chemicals/fr' in rel:
            active = 'chemicals'
        elif 'storage-compatibility' in rel:
            active = 'storage'
        elif 'sds-decoder' in rel:
            active = 'sds'
        elif 'viscosity' in rel:
            active = 'viscosity'
        elif 'about' in rel or 'fr-about' in rel:
            active = 'about'
        elif rel == os.path.join('fr', 'index.html'):
            active = 'home'

        new_header = get_fr_header(active)

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
    new_urls.append('https://chemicalresistance.org/fr/charts/')
    for c in CHARTS:
        new_urls.append(f"https://chemicalresistance.org/fr/charts/{c['slug']}/")

    # Compare
    new_urls.append('https://chemicalresistance.org/fr/compare/')
    for c in COMPARISONS:
        new_urls.append(f"https://chemicalresistance.org/fr/compare/{c['slug']}/")

    # Add only URLs not already present
    added = 0
    insert_point = content.rfind('</urlset>')
    if insert_point == -1:
        print('  Sitemap: no </urlset> tag found, skipping.')
        return

    for url in new_urls:
        if url not in content:
            entry = f'  <url><loc>{url}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>\n'
            content = content[:insert_point] + entry + content[insert_point:]
            insert_point += len(entry)
            added += 1

    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'  Sitemap: added {added} new FR URLs')


# ============================================================
# Main
# ============================================================
if __name__ == '__main__':
    print("Building French (FR) pages for chemicalresistance.org")
    print("=" * 55)

    print("\n1. Chart pages:")
    build_charts_index()
    for chart in CHARTS:
        build_chart_page(chart)

    print("\n2. Compare pages:")
    build_compare_index()
    for comp in COMPARISONS:
        build_comparison_page(comp)

    print("\n3. Updating navigation on existing FR pages:")
    nav_count = update_fr_nav()
    print(f"  Updated {nav_count} existing pages")

    print("\n4. Updating sitemap:")
    update_sitemap()

    print("\n" + "=" * 55)
    print("Done! French pages created:")
    print(f"  - 1 charts index + {len(CHARTS)} chart pages")
    print(f"  - 1 compare tool + {len(COMPARISONS)} comparison pages")
    print(f"  - {nav_count} existing pages updated with new nav")
