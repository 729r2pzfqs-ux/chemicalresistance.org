#!/usr/bin/env python3
"""
Build Portuguese (PT) versions of Charts and Compare pages for chemicalresistance.org.
Also updates navigation across all PT pages.
"""
import os, re, json, glob

BASE = os.path.dirname(os.path.abspath(__file__))

# ============================================================
# Shared: Analytics, styles, nav
# ============================================================
GA_HEAD = '''<script async src="https://www.googletagmanager.com/gtag/js?id=G-LTK6VVHYDW"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-LTK6VVHYDW");</script>'''

CLARITY = '''<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "x1emzgmkzd");
</script>'''

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


def get_pt_header(active=None):
    """Portuguese navigation header."""
    links = [
        ('materials', '/materials/pt/', 'Materiais'),
        ('chemicals', '/chemicals/pt/', 'Produtos Químicos'),
        ('compare',   '/pt/compare/',   'Comparar'),
        ('charts',    '/pt/charts/',    'Gráficos'),
        ('storage',   '/pt/storage-compatibility/', 'Armazenamento'),
        ('sds',       '/pt/sds-decoder/', 'Decodificador SDS'),
        ('viscosity', '/pt/viscosity/',  'Viscosidade'),
        ('about',     '/pt/about/',      'Sobre'),
    ]

    desktop_links = []
    for key, href, label in links:
        if key == active:
            desktop_links.append(f'<a href="{href}" class="text-emerald-600 font-medium">{label}</a>')
        else:
            desktop_links.append(f'<a href="{href}" class="text-gray-600 hover:text-gray-900 hover:underline">{label}</a>')
    desktop_nav = '\n                    '.join(desktop_links)

    mobile_items = [
        ('home',      '/pt/',           'Tabela de resistência'),
        ('materials', '/materials/pt/', 'Todos os materiais'),
        ('chemicals', '/chemicals/pt/', 'Todos os produtos químicos'),
        ('compare',   '/pt/compare/',   'Comparar materiais'),
        ('charts',    '/pt/charts/',    'Gráficos comparativos'),
        ('storage',   '/pt/storage-compatibility/', 'Compatibilidade de armazenamento'),
        ('sds',       '/pt/sds-decoder/', 'Decodificador SDS'),
        ('viscosity', '/pt/viscosity/',  'Viscosidade'),
        ('about',     '/pt/about/',      'Sobre'),
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
            <a href="/pt/" class="flex items-center gap-2">
                <img src="/logos/logo-icon-128x128.png" alt="ChemicalResistance" class="w-10 h-10 rounded-xl">
                <div>
                    <div class="font-bold text-gray-900">ChemicalResistance.org</div>
                    <div class="text-xs text-gray-500 hidden sm:block">Banco de dados de resistência química</div>
                </div>
            </a>
            <div class="flex items-center gap-3 text-sm">
                <nav class="hidden md:flex items-center gap-4">
                    {desktop_nav}
                </nav>
                <select id="langSelect" aria-label="Escolher idioma" class="bg-gray-100 border border-gray-200 rounded-lg px-2 py-1 text-sm cursor-pointer">
                    <option value="en">&#127468;&#127463; EN</option>
                    <option value="es">&#127466;&#127480; ES</option>
                    <option value="de">&#127465;&#127466; DE</option>
                    <option value="fr">&#127467;&#127479; FR</option>
                    <option value="pt" selected>&#127463;&#127479; PT</option>
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


PT_FOOTER = '''    <footer class="bg-gray-900 text-gray-400 py-8 px-4">
        <div class="max-w-5xl mx-auto text-center text-sm">
            <p>&copy; 2026 ChemicalResistance.org &mdash; Ferramenta gratuita de compatibilidade qu&iacute;mica</p>
            <p class="mt-2">Fontes de dados: B&uuml;rkle, INEOS, normas industriais</p>
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
# 1. CHART PAGES (Portuguese)
# ============================================================
CHARTS = [
    {
        'slug': 'fluoropolimeros',
        'title': 'Comparação de Resistência dos Fluoropolímeros',
        'h1': 'Comparação dos Fluoropolímeros',
        'desc': 'Compare a resistência química do PTFE, FEP, PVDF e ECTFE/ETFE lado a lado. Mais de 950 produtos químicos a 20°C e 50°C.',
        'intro': 'Os fluoropolímeros oferecem a melhor resistência química de todos os plásticos. Compare aqui os quatro fluoropolímeros mais comuns.',
        'materials': ['PTFE', 'FEP', 'PVDF', 'ECTFE_ETFE'],
        'color': 'blue',
        'faq': [
            ('Qual fluoropolímero oferece a melhor resistência?',
             'O PTFE (Teflon) possui a resistência química mais ampla de todos os fluoropolímeros, com mais de 965 classificações A (Excelente). O FEP segue de perto com 899 classificações A.'),
            ('Qual é a diferença entre PTFE e FEP?',
             'Ambos têm resistência química quase idêntica. A principal diferença está no processamento: o FEP pode ser processado por fusão (injeção, extrusão), enquanto o PTFE deve ser sinterizado ou usinado. O PTFE suporta temperaturas mais altas (260°C contra 200°C).'),
        ],
    },
    {
        'slug': 'elastomeros',
        'title': 'Comparação de Resistência dos Elastômeros',
        'h1': 'Comparação dos Elastômeros',
        'desc': 'Compare a resistência do NBR, EPDM, Viton e Silicone lado a lado. Encontre o melhor material de vedação para seu produto químico.',
        'intro': 'Os elastômeros são utilizados para juntas, anéis de vedação e mangueiras. Compare aqui os quatro tipos mais importantes.',
        'materials': ['NBR', 'EPDM', 'FPM', 'SI'],
        'color': 'amber',
        'faq': [
            ('Qual é a diferença entre NBR e EPDM?',
             'O NBR (borracha nitrílica) resiste a óleos e combustíveis, mas é sensível ao ozônio. O EPDM oferece excelente resistência à água, ao vapor e ao ozônio, mas não é adequado para óleos minerais.'),
            ('Quando usar Viton?',
             'O Viton (FPM/FKM) oferece a resistência mais ampla entre os elastômeros. É ideal para produtos químicos agressivos, altas temperaturas e solventes. No entanto, é mais caro que o NBR ou EPDM.'),
        ],
    },
    {
        'slug': 'metais',
        'title': 'Comparação de Resistência dos Metais',
        'h1': 'Comparação dos Metais',
        'desc': 'Compare a resistência do aço inoxidável 316, aço inoxidável 304 e alumínio lado a lado a 20°C e 50°C.',
        'intro': 'Compare a resistência à corrosão dos três metais mais comuns na engenharia química.',
        'materials': ['V4A', 'V2A', 'AL'],
        'color': 'gray',
        'faq': [
            ('Qual é a diferença entre aço inoxidável 304 e 316?',
             'O aço 316 (V4A / 1.4401) contém molibdênio adicional, tornando-o significativamente mais resistente a cloretos e ácidos do que o 304 (V2A / 1.4301). O 316 é preferido para ambientes agressivos e água do mar.'),
            ('Quando o alumínio é adequado?',
             'O alumínio é leve e resistente à corrosão contra muitos produtos químicos neutros, mas sensível a ácidos fortes e bases. É adequado para armazenamento e transporte de solventes e produtos químicos secos.'),
        ],
    },
    {
        'slug': 'plasticos-comuns',
        'title': 'Comparação de Resistência dos Plásticos Comuns',
        'h1': 'Comparação dos Plásticos Comuns',
        'desc': 'Compare a resistência do HDPE, LDPE, PP, PVC rígido e PVC flexível lado a lado. Os plásticos mais usados para armazenamento químico.',
        'intro': 'Os plásticos comuns são os materiais mais frequentemente utilizados para recipientes e tubulações de produtos químicos.',
        'materials': ['HDPE', 'LDPE', 'PP', 'PVC_HART', 'PVC_WEICH'],
        'color': 'green',
        'faq': [
            ('Qual é a diferença entre HDPE e LDPE?',
             'O HDPE é mais denso e mais rígido, com melhor resistência química. O LDPE é mais flexível e usado para filmes e sacolas. Para armazenamento químico, o HDPE geralmente é a melhor escolha.'),
            ('O PVC é resistente a ácidos?',
             'O PVC rígido (PVC-U) oferece boa resistência à maioria dos ácidos em temperatura ambiente. O PVC flexível (PVC-P) é menos resistente devido aos plastificantes. Ambos são sensíveis a solventes e hidrocarbonetos aromáticos.'),
        ],
    },
    {
        'slug': 'plasticos-transparentes',
        'title': 'Comparação de Resistência dos Plásticos Transparentes',
        'h1': 'Comparação dos Plásticos Transparentes e de Laboratório',
        'desc': 'Compare a resistência do PC, PETG, PMP, PSU e SAN lado a lado. Materiais transparentes para equipamentos de laboratório e visores.',
        'intro': 'Os plásticos transparentes são essenciais para equipamentos de laboratório, visores e aplicações ópticas.',
        'materials': ['PC', 'PETG', 'PMP', 'PSU', 'SAN'],
        'color': 'purple',
        'faq': [
            ('Qual plástico transparente oferece a melhor resistência?',
             'O PMP (polimetilpenteno) e o PSU (polissulfona) oferecem a melhor resistência química entre os plásticos transparentes. O PMP também é autoclavável.'),
            ('O policarbonato pode ser usado com solventes?',
             'Não, o policarbonato (PC) é sensível à maioria dos solventes orgânicos, cetonas e compostos aromáticos. Para contato com solventes, use PMP ou PTFE.'),
        ],
    },
    {
        'slug': 'plasticos-de-engenharia',
        'title': 'Comparação de Resistência dos Plásticos de Engenharia',
        'h1': 'Comparação dos Plásticos de Engenharia',
        'desc': 'Compare a resistência do Nylon (PA), POM e Poliestireno lado a lado a 20°C e 50°C.',
        'intro': 'Plásticos de engenharia para peças sujeitas a esforços mecânicos em contato com produtos químicos.',
        'materials': ['PA', 'POM', 'PS'],
        'color': 'orange',
        'faq': [
            ('O Nylon é resistente a produtos químicos?',
             'O Nylon (PA) oferece boa resistência a muitos solventes e óleos, mas é sensível a ácidos fortes e agentes oxidantes. Ele absorve umidade, o que afeta suas propriedades mecânicas.'),
            ('O que é POM e para que serve?',
             'O POM (polioximetileno / acetal) é um plástico de engenharia de alta resistência que oferece boa tolerância a muitos produtos químicos. É utilizado para engrenagens, válvulas e peças de bombas. O POM não resiste a ácidos fortes.'),
        ],
    },
    {
        'slug': 'todos-os-materiais',
        'title': 'Os 24 Materiais — Comparação de Resistência',
        'h1': 'Comparação dos 24 Materiais',
        'desc': 'Tabela comparativa completa dos 24 materiais — fluoropolímeros, elastômeros, metais e plásticos lado a lado.',
        'intro': 'A visão geral completa dos 24 materiais. Role horizontalmente para ver todas as colunas.',
        'materials': list(MAT_SHORT.keys()),
        'color': 'emerald',
        'faq': [
            ('Quantos materiais são comparados?',
             'Esta tabela compara os 24 materiais disponíveis: 4 fluoropolímeros, 4 elastômeros, 3 metais, 5 plásticos comuns, 5 plásticos transparentes e 3 plásticos de engenharia.'),
            ('O que significam as classificações A, B, C, D?',
             'A (Excelente) = o material resiste de forma durável. B (Bom) = resistência limitada, adequado para contatos de curta duração. C (Regular) = o material pode inchar ou se degradar. D (Ruim) = o material não é adequado.'),
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
        th_cols += f'<th class="py-3 px-2 font-semibold text-gray-600 text-center whitespace-nowrap"><a href="/materials/pt/{d}/" class="hover:text-emerald-600 hover:underline">{s}</a></th>'

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
        cross_links += f'''                <a href="/pt/charts/{c['slug']}/" class="p-3 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-center">
                    <div class="font-bold text-gray-900 text-sm">{c['h1'].replace('Comparação dos ','')}</div>
                    <div class="text-xs text-gray-500">{len(c['materials'])} materiais</div>
                </a>\n'''

    header = get_pt_header(active='charts')

    html = f'''<!DOCTYPE html>
<html lang="pt">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{chart['title']}</title>
    <meta name="description" content="{chart['desc']}">
    <link rel="canonical" href="https://chemicalresistance.org/pt/charts/{slug}/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <meta property="og:title" content="{chart['title']}">
    <meta property="og:description" content="{chart['desc']}">
    <meta property="og:type" content="article">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
{STYLES}
<script type="application/ld+json">
{faq_schema}
</script>
{CLARITY}
</head>
<body class="text-gray-700 min-h-screen">
{header}

    <section class="bg-gradient-to-b from-{chart['color']}-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-5xl mx-auto">
            <div class="flex items-center gap-2 text-sm text-{chart['color']}-600 mb-3">
                <a href="/pt/" class="hover:underline">Início</a>
                <span>&rsaquo;</span>
                <a href="/pt/charts/" class="hover:underline">Gráficos</a>
                <span>&rsaquo;</span>
                <span class="text-gray-600">{chart['h1']}</span>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-3">{chart['h1']}</h1>
            <p class="text-lg text-gray-600 mb-4">{chart['intro']}</p>
            <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-A"></span> A = Excelente</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-B"></span> B = Bom</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-C"></span> C = Regular</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-D"></span> D = Ruim</span>
            </div>
        </div>
    </section>

    <section class="px-4 py-6 no-print">
        <div class="max-w-7xl mx-auto">
            <div class="bg-white rounded-xl border border-gray-200 p-4">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <input type="text" id="searchInput" placeholder="Buscar produtos químicos..." class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none">
                    </div>
                    <select id="ratingFilter" class="px-4 py-2 border border-gray-200 rounded-lg">
                        <option value="all">Todas as classificações</option>
                        <option value="any-A">Pelo menos um A</option>
                        <option value="any-D">Pelo menos um D</option>
                        <option value="diff">Classificações diferentes</option>
                        <option value="all-A">Todos os materiais A</option>
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
                <span>Mostrando <span id="resultCount" class="font-semibold text-gray-700">0</span> produtos químicos</span>
                <label class="flex items-center gap-2 cursor-pointer no-print">
                    <input type="checkbox" id="highlightDiffs" checked class="rounded">
                    <span>Destacar diferenças</span>
                </label>
            </div>
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full" style="min-width:600px">
                        <thead class="sticky top-0 z-10">
                            <tr class="bg-gray-50 text-left text-sm">
                                <th class="py-3 px-4 font-semibold text-gray-600">Produto químico</th>
                                <th class="py-3 px-3 font-semibold text-gray-600 text-sm">Conc.</th>
                                {th_cols}
                            </tr>
                        </thead>
                        <tbody id="chartTable" class="divide-y divide-gray-100"></tbody>
                    </table>
                </div>
            </div>
            <div id="loadMore" class="mt-4 text-center hidden">
                <button onclick="loadMore()" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">Carregar mais</button>
            </div>
        </div>
    </section>

    <section class="px-4 py-8 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
            <div class="space-y-3">
{faq_html}            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Outros gráficos comparativos</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
{cross_links}            </div>
        </div>
    </section>

{PT_FOOTER}

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
            return a.name.localeCompare(b.name, 'pt');
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

    outdir = os.path.join(BASE, 'pt', 'charts', slug)
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'  Created: pt/charts/{slug}/index.html')


def build_charts_index():
    header = get_pt_header(active='charts')

    cards = ''
    for c in CHARTS:
        mat_names = ', '.join(MAT_SHORT[k] for k in c['materials'][:4])
        if len(c['materials']) > 4:
            mat_names += f' +{len(c["materials"])-4}'
        cards += f'''            <a href="/pt/charts/{c['slug']}/" class="bg-white p-6 rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-sm transition-all">
                <h2 class="text-lg font-bold text-gray-900 mb-1">{c['h1'].replace('Comparação dos ','')}</h2>
                <p class="text-sm text-gray-600">{mat_names}</p>
                <p class="text-xs text-gray-400 mt-2">{len(c['materials'])} materiais para comparar &rarr;</p>
            </a>\n'''

    html = f'''<!DOCTYPE html>
<html lang="pt">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gr&aacute;ficos comparativos &mdash; Resist&ecirc;ncia qu&iacute;mica</title>
    <meta name="description" content="Gr&aacute;ficos comparativos de resist&ecirc;ncia qu&iacute;mica: fluoropol&iacute;meros, elast&ocirc;meros, metais e pl&aacute;sticos lado a lado.">
    <link rel="canonical" href="https://chemicalresistance.org/pt/charts/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>* {{ font-family: 'Inter', sans-serif; }} body {{ background: #f8fafc; }}</style>
{CLARITY}
</head>
<body class="text-gray-700 min-h-screen">
{header}

    <section class="bg-gradient-to-b from-emerald-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-3">Gráficos comparativos</h1>
            <p class="text-lg text-gray-600">Compare os grupos de materiais lado a lado &mdash; fluoropolímeros, elastômeros, metais e plásticos.</p>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
{cards}        </div>
    </section>

{PT_FOOTER}
{CF_BEACON}
</body>
</html>'''

    outdir = os.path.join(BASE, 'pt', 'charts')
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print('  Created: pt/charts/index.html')


# ============================================================
# 2. COMPARE PAGES (Portuguese)
# ============================================================
COMPARISONS = [
    {
        'slug': 'etfe-vs-ectfe',
        'title': 'ETFE vs ECTFE: Resistência Química Comparada',
        'h1': 'ETFE vs ECTFE',
        'mat_a_key': 'ECTFE_ETFE', 'mat_a_name': 'ETFE', 'mat_a_full': 'Etileno-tetrafluoretileno',
        'mat_a_desc': 'O ETFE oferece excelente resistência química combinada com boa resistência mecânica. É transparente e reciclável.',
        'mat_a_temp': '-100°C a 150°C',
        'mat_a_use': 'Envidraçamentos arquitetônicos, revestimento de cabos, coberturas de painéis solares, processos químicos gerais.',
        'mat_b_key': 'ECTFE_ETFE', 'mat_b_name': 'ECTFE', 'mat_b_full': 'Etileno-clorotrifluoretileno',
        'mat_b_desc': 'O ECTFE possui resistência química superior, especialmente contra solventes clorados e ambientes agressivos.',
        'mat_b_temp': '-76°C a 150°C',
        'mat_b_use': 'Produtos químicos agressivos, solventes clorados, revestimento de tanques, sistemas de exaustão de vapores ácidos.',
    },
    {
        'slug': 'ptfe-vs-fep',
        'title': 'PTFE vs FEP: Resistência Química Comparada',
        'h1': 'PTFE vs FEP',
        'mat_a_key': 'PTFE', 'mat_a_name': 'PTFE', 'mat_a_full': 'Politetrafluoretileno (Teflon)',
        'mat_a_desc': 'O PTFE possui a resistência química mais ampla de todos os plásticos. Deve ser sinterizado ou usinado.',
        'mat_a_temp': '-200°C a 260°C',
        'mat_a_use': 'Resistência química universal, aplicações de alta temperatura, vedações, equipamentos de laboratório.',
        'mat_b_key': 'FEP', 'mat_b_name': 'FEP', 'mat_b_full': 'Etileno-propileno fluorado',
        'mat_b_desc': 'O FEP oferece resistência quase idêntica ao PTFE, mas pode ser processado por fusão (injeção, extrusão).',
        'mat_b_temp': '-200°C a 200°C',
        'mat_b_use': 'Tubos, revestimentos de tubulações, equipamentos de laboratório, quando a moldagem é importante.',
    },
    {
        'slug': 'nbr-vs-epdm',
        'title': 'NBR vs EPDM: Resistência Química Comparada',
        'h1': 'NBR vs EPDM',
        'mat_a_key': 'NBR', 'mat_a_name': 'NBR', 'mat_a_full': 'Borracha nitrílica (Buna-N)',
        'mat_a_desc': 'O NBR resiste a óleos, combustíveis e muitos produtos químicos industriais. É o material padrão para anéis de vedação.',
        'mat_a_temp': '-40°C a 120°C',
        'mat_a_use': 'Vedações para óleos, mangueiras de combustível, sistemas hidráulicos, anéis de vedação para óleos minerais.',
        'mat_b_key': 'EPDM', 'mat_b_name': 'EPDM', 'mat_b_full': 'Borracha de etileno-propileno-dieno',
        'mat_b_desc': 'O EPDM oferece excelente resistência à água, ao vapor, ao ozônio e a muitas soluções aquosas.',
        'mat_b_temp': '-50°C a 150°C',
        'mat_b_use': 'Sistemas de água, vedações para vapor, aplicações externas, líquidos de freio.',
    },
    {
        'slug': 'hdpe-vs-pvdf',
        'title': 'HDPE vs PVDF: Resistência Química Comparada',
        'h1': 'HDPE vs PVDF',
        'mat_a_key': 'HDPE', 'mat_a_name': 'HDPE', 'mat_a_full': 'Polietileno de alta densidade',
        'mat_a_desc': 'O HDPE é econômico e oferece boa resistência a muitos ácidos e bases. É o material padrão para recipientes de armazenamento.',
        'mat_a_temp': '-50°C a 80°C',
        'mat_a_use': 'Recipientes de produtos químicos, tubulações, bacias de contenção, soluções de armazenamento econômicas.',
        'mat_b_key': 'PVDF', 'mat_b_name': 'PVDF', 'mat_b_full': 'Fluoreto de polivinilideno',
        'mat_b_desc': 'O PVDF oferece resistência superior a ácidos concentrados e solventes em temperaturas mais elevadas.',
        'mat_b_temp': '-30°C a 150°C',
        'mat_b_use': 'Produtos químicos agressivos, indústria de semicondutores, aplicações farmacêuticas, sistemas de água ultrapura.',
    },
    {
        'slug': 'polissulfona-vs-pvdf',
        'title': 'Polissulfona vs PVDF: Resistência Química Comparada',
        'h1': 'Polissulfona vs PVDF',
        'mat_a_key': 'PSU', 'mat_a_name': 'Polissulfona', 'mat_a_full': 'Polissulfona (PSU)',
        'mat_a_desc': 'A polissulfona é transparente, autoclavável e resistente a soluções aquosas e a muitos produtos químicos.',
        'mat_a_temp': '-100°C a 160°C',
        'mat_a_use': 'Equipamentos de laboratório, filtros de membrana, aplicações médicas, processamento de alimentos.',
        'mat_b_key': 'PVDF', 'mat_b_name': 'PVDF', 'mat_b_full': 'Fluoreto de polivinilideno',
        'mat_b_desc': 'O PVDF oferece resistência superior a ácidos concentrados e solventes.',
        'mat_b_temp': '-30°C a 150°C',
        'mat_b_use': 'Produtos químicos agressivos, indústria de semicondutores, sistemas de água ultrapura.',
    },
]


def build_comparison_page(comp):
    header = get_pt_header(active='compare')

    # Cross-links
    cross = ''
    for c in COMPARISONS:
        if c['slug'] == comp['slug']:
            continue
        cross += f'''                <a href="/pt/compare/{c['slug']}/" class="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-center">
                    <div class="font-bold text-gray-900">{c['h1']}</div>
                    <div class="text-xs text-gray-500">Ver comparação</div>
                </a>\n'''

    html = f'''<!DOCTYPE html>
<html lang="pt">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{comp['title']}</title>
    <meta name="description" content="{comp['title']}. Descubra qual material é mais adequado para sua aplicação.">
    <link rel="canonical" href="https://chemicalresistance.org/pt/compare/{comp['slug']}/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
{STYLES}
{CLARITY}
</head>
<body class="text-gray-700 min-h-screen">
{header}

    <section class="bg-gradient-to-b from-blue-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <div class="flex items-center gap-2 text-sm text-blue-600 mb-3">
                <a href="/pt/" class="hover:underline">Início</a>
                <span>&rsaquo;</span>
                <a href="/pt/compare/" class="hover:underline">Comparar</a>
                <span>&rsaquo;</span>
                <span class="text-gray-600">{comp['h1']}</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{comp['h1']}</h1>
            <p class="text-lg text-gray-600 mb-4">Resistência química em comparação direta.</p>
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
                            <span class="text-gray-500">Faixa de temperatura</span>
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
                            <span class="text-gray-500">Faixa de temperatura</span>
                            <span class="font-medium">{comp['mat_b_temp']}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 py-8 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Quando usar cada material?</h2>
            <div class="grid md:grid-cols-2 gap-6">
                <div class="p-5 rounded-xl bg-blue-50 border border-blue-100">
                    <h3 class="font-bold text-gray-900 mb-2">Escolha {comp['mat_a_name']} para:</h3>
                    <p class="text-gray-600 text-sm">{comp['mat_a_use']}</p>
                </div>
                <div class="p-5 rounded-xl bg-amber-50 border border-amber-100">
                    <h3 class="font-bold text-gray-900 mb-2">Escolha {comp['mat_b_name']} para:</h3>
                    <p class="text-gray-600 text-sm">{comp['mat_b_use']}</p>
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Classificações químicas comparadas</h2>
            <p class="text-gray-600 mb-4">Produtos químicos com classificações diferentes a 20°C:</p>
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gray-50 text-left text-sm">
                                <th class="py-3 px-4 font-semibold text-gray-600">Produto químico</th>
                                <th class="py-3 px-4 font-semibold text-gray-600 text-center">{comp['mat_a_name']}</th>
                                <th class="py-3 px-4 font-semibold text-gray-600 text-center">{comp['mat_b_name']}</th>
                            </tr>
                        </thead>
                        <tbody id="compareTable" class="divide-y divide-gray-100"></tbody>
                    </table>
                </div>
            </div>
            <div id="loadMore" class="mt-4 text-center hidden">
                <button onclick="loadMore()" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">Carregar mais</button>
            </div>
        </div>
    </section>

    <section class="px-4 py-12 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Outras comparações</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
{cross}            </div>
        </div>
    </section>

{PT_FOOTER}

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
            allDiffs.sort(function(a, b) {{ return a.name.localeCompare(b.name, 'pt'); }});
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

    outdir = os.path.join(BASE, 'pt', 'compare', comp['slug'])
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"  Created: pt/compare/{comp['slug']}/index.html")


def build_compare_index():
    """Build the Portuguese interactive comparison tool page."""
    header = get_pt_header(active='compare')

    # Static comparison cards
    comp_cards = ''
    for c in COMPARISONS:
        comp_cards += f'''                <a href="/pt/compare/{c['slug']}/" class="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                    <h3 class="text-lg font-bold text-gray-900 mb-1">{c['h1']}</h3>
                    <p class="text-sm text-gray-600">{c['mat_a_full']} vs {c['mat_b_full']}</p>
                </a>\n'''

    # Chart links
    chart_links = ''
    for c in CHARTS:
        mat_names = ', '.join(MAT_SHORT[k] for k in c['materials'][:4])
        if len(c['materials']) > 4:
            mat_names += f" +{len(c['materials'])-4}"
        chart_links += f'''                <a href="/pt/charts/{c['slug']}/" class="p-3 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-center">
                    <div class="font-bold text-gray-900 text-sm">{c['h1'].replace('Comparação dos ','')}</div>
                    <div class="text-xs text-gray-500">{mat_names}</div>
                </a>\n'''

    all_mats_js = '''[
        { key: 'AL',         name: 'Alumínio',                short: 'Al',       dir: 'aluminium',       group: 'Metais' },
        { key: 'ECTFE_ETFE', name: 'ECTFE / ETFE',           short: 'ECTFE',    dir: 'ectfe-etfe',      group: 'Fluoropolímeros' },
        { key: 'EPDM',       name: 'EPDM',                   short: 'EPDM',     dir: 'epdm',            group: 'Elastômeros' },
        { key: 'FEP',        name: 'FEP',                    short: 'FEP',      dir: 'fep',             group: 'Fluoropolímeros' },
        { key: 'FPM',        name: 'Viton (FPM/FKM)',        short: 'Viton',    dir: 'viton',           group: 'Elastômeros' },
        { key: 'HDPE',       name: 'HDPE',                   short: 'HDPE',     dir: 'hdpe',            group: 'Plásticos Comuns' },
        { key: 'LDPE',       name: 'LDPE',                   short: 'LDPE',     dir: 'ldpe',            group: 'Plásticos Comuns' },
        { key: 'NBR',        name: 'NBR (Nitrilo)',          short: 'NBR',      dir: 'nbr',             group: 'Elastômeros' },
        { key: 'PA',         name: 'Nylon (PA)',             short: 'Nylon',    dir: 'nylon-pa',        group: 'Plásticos de Engenharia' },
        { key: 'PC',         name: 'Policarbonato (PC)',     short: 'PC',       dir: 'polycarbonate',   group: 'Plásticos Transparentes' },
        { key: 'PETG',       name: 'PETG',                   short: 'PETG',     dir: 'petg',            group: 'Plásticos Transparentes' },
        { key: 'PMP',        name: 'PMP',                    short: 'PMP',      dir: 'pmp',             group: 'Plásticos Transparentes' },
        { key: 'POM',        name: 'Acetal (POM)',            short: 'POM',      dir: 'acetal-pom',      group: 'Plásticos de Engenharia' },
        { key: 'PP',         name: 'Polipropileno (PP)',      short: 'PP',       dir: 'pp',              group: 'Plásticos Comuns' },
        { key: 'PS',         name: 'Poliestireno (PS)',       short: 'PS',       dir: 'polystyrene',     group: 'Plásticos de Engenharia' },
        { key: 'PSU',        name: 'Polissulfona (PSU)',     short: 'PSU',      dir: 'polysulfone',     group: 'Plásticos Transparentes' },
        { key: 'PTFE',       name: 'PTFE (Teflon)',           short: 'PTFE',     dir: 'ptfe',            group: 'Fluoropolímeros' },
        { key: 'PVC_HART',   name: 'PVC rígido (PVC-U)',    short: 'uPVC',     dir: 'pvc-rigid',       group: 'Plásticos Comuns' },
        { key: 'PVC_WEICH',  name: 'PVC flexível (PVC-P)',   short: 'pPVC',     dir: 'pvc-flexible',    group: 'Plásticos Comuns' },
        { key: 'PVDF',       name: 'PVDF',                   short: 'PVDF',     dir: 'pvdf',            group: 'Fluoropolímeros' },
        { key: 'SAN',        name: 'SAN',                    short: 'SAN',      dir: 'san',             group: 'Plásticos Transparentes' },
        { key: 'SI',         name: 'Silicone',               short: 'Silicone', dir: 'silicone',        group: 'Elastômeros' },
        { key: 'V2A',        name: 'Aço inox 304 (V2A)',   short: 'SS304',    dir: 'stainless-steel-304', group: 'Metais' },
        { key: 'V4A',        name: 'Aço inox 316 (V4A)',   short: 'SS316',    dir: 'ss316',           group: 'Metais' },
    ]'''

    html = f'''<!DOCTYPE html>
<html lang="pt">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comparar materiais &mdash; Resistência química lado a lado</title>
    <meta name="description" content="Crie sua própria comparação de materiais. Selecione 2 a 3 materiais entre 24 opções e consulte as classificações de resistência para mais de 1.600 produtos químicos.">
    <link rel="canonical" href="https://chemicalresistance.org/pt/compare/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
{STYLES}
<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{{"@type":"Question","name":"Como comparar a resistência química de diferentes materiais?","acceptedAnswer":{{"@type":"Answer","text":"Use a ferramenta de comparação acima para selecionar 2 ou 3 materiais nos menus suspensos. A ferramenta exibe as classificações de resistência (A a D) para mais de 1.600 produtos químicos a 20°C e 50°C lado a lado."}}}},{{"@type":"Question","name":"O que significam as classificações A, B, C, D?","acceptedAnswer":{{"@type":"Answer","text":"A (Excelente) = resistência durável. B (Bom) = resistência limitada, adequado para contatos de curta duração. C (Regular) = o material pode inchar ou se degradar. D (Ruim) = o material não é adequado."}}}}]}}
</script>
{CLARITY}
</head>
<body class="text-gray-700 min-h-screen">
{header}

    <section class="bg-gradient-to-b from-blue-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-3">Crie sua própria comparação de materiais</h1>
            <p class="text-lg text-gray-600">Selecione 2 ou 3 materiais e compare a resistência química instantaneamente lado a lado para mais de 1.600 produtos químicos.</p>
        </div>
    </section>

    <section class="px-4 py-6 no-print">
        <div class="max-w-5xl mx-auto">
            <div class="bg-white rounded-xl border border-gray-200 p-5">
                <div class="flex flex-col gap-4">
                    <div class="text-sm font-semibold text-gray-700 mb-1">Selecionar materiais para comparar:</div>
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
                        <button id="compareBtn" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors">Comparar agora</button>
                        <button id="resetBtn" class="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors">Redefinir</button>
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
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-B"></span> B = Bom</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-C"></span> C = Regular</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-D"></span> D = Ruim</span>
            </div>
        </div>
    </section>

    <section id="filterSection" class="px-4 py-4 hidden no-print">
        <div class="max-w-5xl mx-auto">
            <div class="bg-white rounded-xl border border-gray-200 p-4">
                <div class="flex flex-col md:flex-row gap-3">
                    <div class="flex-1">
                        <input type="text" id="searchInput" placeholder="Buscar produtos químicos..." class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm">
                    </div>
                    <select id="ratingFilter" class="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                        <option value="all">Todas as classificações</option>
                        <option value="any-A">Pelo menos um A</option>
                        <option value="any-D">Pelo menos um D</option>
                        <option value="diff">Classificações diferentes</option>
                        <option value="all-A">Todos os materiais A</option>
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
                <span>Mostrando <span id="resultCount" class="font-semibold text-gray-700">0</span> produtos químicos</span>
                <label class="flex items-center gap-2 cursor-pointer no-print">
                    <input type="checkbox" id="highlightDiffs" checked class="rounded">
                    <span>Destacar diferenças</span>
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
                <button onclick="loadMore()" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm">Carregar mais</button>
            </div>
        </div>
    </section>

    <section class="px-4 py-8 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
            <div class="space-y-3">
                <details class="border border-gray-200 rounded-xl overflow-hidden">
                    <summary class="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">Como comparar a resistência química de diferentes materiais?</summary>
                    <div class="px-5 py-4 border-t border-gray-100 text-gray-600 text-sm">Use a ferramenta de comparação acima para selecionar 2 ou 3 materiais nos menus suspensos. A ferramenta exibe as classificações de resistência (A a D) para mais de 1.600 produtos químicos a 20°C e 50°C lado a lado.</div>
                </details>
                <details class="border border-gray-200 rounded-xl overflow-hidden">
                    <summary class="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">O que significam as classificações A, B, C, D?</summary>
                    <div class="px-5 py-4 border-t border-gray-100 text-gray-600 text-sm">A (Excelente) = o material resiste de forma durável. B (Bom) = resistência limitada, adequado para contatos de curta duração. C (Regular) = o material pode inchar ou se degradar. D (Ruim) = o material não é adequado.</div>
                </details>
            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Comparações populares</h2>
            <div class="grid md:grid-cols-2 gap-4">
{comp_cards}            </div>
        </div>
    </section>

    <section class="px-4 py-8 border-t border-gray-100">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Gráficos comparativos por grupo</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
{chart_links}            </div>
        </div>
    </section>

{PT_FOOTER}

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
        var groupOrder = ['Fluoropolímeros', 'Elastômeros', 'Metais', 'Plásticos Comuns', 'Plásticos Transparentes', 'Plásticos de Engenharia'];

        ['mat1', 'mat2', 'mat3'].forEach(function(id, i) {{
            var sel = document.getElementById(id);
            if (i === 2) {{
                var opt = document.createElement('option');
                opt.value = '';
                opt.textContent = '— Nenhum —';
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
        document.getElementById('statusMsg').textContent = 'Carregando dados...';
        return fetch('/data/chemicals_burkle_full.json')
            .then(function(r) {{ return r.json(); }})
            .then(function(data) {{
                allData = data;
                dataLoaded = true;
                document.getElementById('statusMsg').textContent = '';
            }})
            .catch(function() {{
                document.getElementById('statusMsg').textContent = 'Erro ao carregar. Tente novamente.';
            }});
    }}

    function runComparison() {{
        var k1 = document.getElementById('mat1').value;
        var k2 = document.getElementById('mat2').value;
        var k3 = document.getElementById('mat3').value;
        if (k1 === k2 || (k3 && (k3 === k1 || k3 === k2))) {{
            document.getElementById('statusMsg').textContent = 'Por favor, selecione materiais diferentes.';
            return;
        }}
        activeMats = [ALL_MATS.find(function(m) {{ return m.key === k1; }}), ALL_MATS.find(function(m) {{ return m.key === k2; }})];
        if (k3) activeMats.push(ALL_MATS.find(function(m) {{ return m.key === k3; }}));

        loadData().then(function() {{
            var thead = document.getElementById('tableHead');
            thead.innerHTML = '<th class="py-3 px-4 font-semibold text-gray-600">Produto químico</th>'
                + '<th class="py-3 px-3 font-semibold text-gray-600 text-sm">Conc.</th>'
                + activeMats.map(function(m) {{
                    return '<th class="py-3 px-2 font-semibold text-gray-600 text-center whitespace-nowrap"><a href="/materials/pt/' + m.dir + '/" class="hover:text-emerald-600 hover:underline">' + m.short + '</a></th>';
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
            return a.name.localeCompare(b.name, 'pt');
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
        history.replaceState(null, '', '/pt/compare/');
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

    outdir = os.path.join(BASE, 'pt', 'compare')
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print('  Created: pt/compare/index.html')


# ============================================================
# 3. UPDATE NAV ON EXISTING PT PAGES
# ============================================================
def update_pt_nav():
    """Update navigation on all existing PT pages."""
    pt_dir = os.path.join(BASE, 'pt')
    html_files = glob.glob(os.path.join(pt_dir, '**', '*.html'), recursive=True)

    # Also check materials/pt/ and chemicals/pt/
    html_files.extend(glob.glob(os.path.join(BASE, 'materials', 'pt', '**', '*.html'), recursive=True))
    html_files.extend(glob.glob(os.path.join(BASE, 'chemicals', 'pt', '**', '*.html'), recursive=True))
    html_files.extend(glob.glob(os.path.join(BASE, 'pt-about', '**', '*.html'), recursive=True))

    updated = 0
    for filepath in sorted(set(html_files)):
        # Skip files we just generated (charts and compare)
        rel = os.path.relpath(filepath, BASE)
        if 'pt/charts/' in rel or 'pt/compare/' in rel:
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            html = f.read()

        if '<header' not in html:
            continue

        # Detect active section
        active = None
        if 'materials/pt' in rel:
            active = 'materials'
        elif 'chemicals/pt' in rel:
            active = 'chemicals'
        elif 'storage-compatibility' in rel:
            active = 'storage'
        elif 'sds-decoder' in rel:
            active = 'sds'
        elif 'viscosity' in rel:
            active = 'viscosity'
        elif 'about' in rel or 'pt-about' in rel:
            active = 'about'
        elif rel == os.path.join('pt', 'index.html'):
            active = 'home'

        new_header = get_pt_header(active)

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
    new_urls.append('https://chemicalresistance.org/pt/charts/')
    for c in CHARTS:
        new_urls.append(f"https://chemicalresistance.org/pt/charts/{c['slug']}/")

    # Compare
    new_urls.append('https://chemicalresistance.org/pt/compare/')
    for c in COMPARISONS:
        new_urls.append(f"https://chemicalresistance.org/pt/compare/{c['slug']}/")

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
    print(f'  Sitemap: added {added} new PT URLs')


# ============================================================
# Main
# ============================================================
if __name__ == '__main__':
    print("Building Portuguese (PT) pages for chemicalresistance.org")
    print("=" * 55)

    print("\n1. Chart pages:")
    build_charts_index()
    for chart in CHARTS:
        build_chart_page(chart)

    print("\n2. Compare pages:")
    build_compare_index()
    for comp in COMPARISONS:
        build_comparison_page(comp)

    print("\n3. Updating navigation on existing PT pages:")
    nav_count = update_pt_nav()
    print(f"  Updated {nav_count} existing pages")

    print("\n4. Updating sitemap:")
    update_sitemap()

    print("\n" + "=" * 55)
    print("Done! Portuguese pages created:")
    print(f"  - 1 charts index + {len(CHARTS)} chart pages")
    print(f"  - 1 compare tool + {len(COMPARISONS)} comparison pages")
    print(f"  - {nav_count} existing pages updated with new nav")
