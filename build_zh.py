#!/usr/bin/env python3
"""
Build Chinese (ZH) versions of Charts and Compare pages for chemicalresistance.org.
Also updates navigation across all ZH pages.
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


def get_zh_header(active=None):
    """Chinese navigation header."""
    links = [
        ('materials', '/materials/zh/', '材料'),
        ('chemicals', '/chemicals/zh/', '化学品'),
        ('compare',   '/zh/compare/',   '对比'),
        ('charts',    '/zh/charts/',    '图表'),
        ('storage',   '/zh/storage-compatibility/', '存储'),
        ('sds',       '/zh/sds-decoder/', 'SDS解码器'),
        ('viscosity', '/zh/viscosity/',  '粘度'),
        ('about',     '/zh/about/',      '关于'),
    ]

    desktop_links = []
    for key, href, label in links:
        if key == active:
            desktop_links.append(f'<a href="{href}" class="text-emerald-600 font-medium">{label}</a>')
        else:
            desktop_links.append(f'<a href="{href}" class="text-gray-600 hover:text-gray-900 hover:underline">{label}</a>')
    desktop_nav = '\n                    '.join(desktop_links)

    mobile_items = [
        ('home',      '/zh/',           '耐化学性表'),
        ('materials', '/materials/zh/', '所有材料'),
        ('chemicals', '/chemicals/zh/', '所有化学品'),
        ('compare',   '/zh/compare/',   '材料对比'),
        ('charts',    '/zh/charts/',    '对比图表'),
        ('storage',   '/zh/storage-compatibility/', '存储兼容性'),
        ('sds',       '/zh/sds-decoder/', 'SDS解码器'),
        ('viscosity', '/zh/viscosity/',  '粘度'),
        ('about',     '/zh/about/',      '关于'),
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
            <a href="/zh/" class="flex items-center gap-2">
                <img src="/logos/logo-icon-128x128.png" alt="ChemicalResistance" class="w-10 h-10 rounded-xl">
                <div>
                    <div class="font-bold text-gray-900">ChemicalResistance.org</div>
                    <div class="text-xs text-gray-500 hidden sm:block">化学耐受性数据库</div>
                </div>
            </a>
            <div class="flex items-center gap-3 text-sm">
                <nav class="hidden md:flex items-center gap-4">
                    {desktop_nav}
                </nav>
                <select id="langSelect" aria-label="选择语言" class="bg-gray-100 border border-gray-200 rounded-lg px-2 py-1 text-sm cursor-pointer">
                    <option value="" selected disabled>&#127760;</option>
                    <option value="en">&#127468;&#127463; EN</option>
                    <option value="es">&#127466;&#127480; ES</option>
                    <option value="de">&#127465;&#127466; DE</option>
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


ZH_FOOTER = '''    <footer class="bg-gray-900 text-gray-400 py-8 px-4">
        <div class="max-w-5xl mx-auto text-center text-sm">
            <p>&copy; 2026 ChemicalResistance.org &mdash; 免费化学兼容性工具</p>
            <p class="mt-2">数据来源：B&uuml;rkle、INEOS、行业标准</p>
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
# 1. CHART PAGES (Chinese)
# ============================================================
CHARTS = [
    {
        'slug': 'fluoropolymers',
        'title': '氟聚合物耐化学性对比',
        'h1': '氟聚合物对比',
        'desc': '并排比较PTFE、FEP、PVDF和ECTFE/ETFE的耐化学性。超过950种化学品在20°C和50°C下的数据。',
        'intro': '氟聚合物是所有塑料中耐化学性最好的材料。在此比较四种最常见的氟聚合物。',
        'materials': ['PTFE', 'FEP', 'PVDF', 'ECTFE_ETFE'],
        'color': 'blue',
        'faq': [
            ('哪种氟聚合物的耐化学性最好？',
             'PTFE（特氟龙）在所有氟聚合物中具有最广泛的耐化学性，拥有超过965个A级（优秀）评级。FEP紧随其后，有899个A级评级。'),
            ('PTFE和FEP有什么区别？',
             '两者的耐化学性几乎相同。主要区别在于加工方式：FEP可以通过熔融加工（注塑、挤出），而PTFE必须通过烧结或机加工成型。PTFE耐温更高（260°C vs 200°C）。'),
        ],
    },
    {
        'slug': 'elastomers',
        'title': '弹性体耐化学性对比',
        'h1': '弹性体对比',
        'desc': '并排比较NBR、EPDM、氟橡胶和硅胶的耐化学性。找到最适合您化学品的密封材料。',
        'intro': '弹性体用于垫片、密封圈和软管。在此比较四种最重要的类型。',
        'materials': ['NBR', 'EPDM', 'FPM', 'SI'],
        'color': 'amber',
        'faq': [
            ('NBR和EPDM有什么区别？',
             'NBR（丁腈橡胶）耐油和燃料，但对臭氧敏感。EPDM对水、蒸汽和臭氧具有优异的耐受性，但不适用于矿物油。'),
            ('什么时候使用氟橡胶（Viton）？',
             '氟橡胶（FPM/FKM）在弹性体中具有最广泛的耐化学性。适用于腐蚀性化学品、高温和溶剂环境。但价格高于NBR或EPDM。'),
        ],
    },
    {
        'slug': 'metals',
        'title': '金属耐化学性对比',
        'h1': '金属对比',
        'desc': '并排比较316不锈钢、304不锈钢和铝在20°C和50°C下的耐化学性。',
        'intro': '比较化学工程中三种最常用金属的耐腐蚀性。',
        'materials': ['V4A', 'V2A', 'AL'],
        'color': 'gray',
        'faq': [
            ('304不锈钢和316不锈钢有什么区别？',
             '316钢（V4A / 1.4401）含有额外的钼，使其对氯化物和酸的耐受性显著优于304（V2A / 1.4301）。316更适合腐蚀性环境和海水。'),
            ('什么情况下铝是合适的？',
             '铝重量轻，对许多中性化学品具有良好的耐腐蚀性，但对强酸和强碱敏感。适用于溶剂和干燥化学品的储存和运输。'),
        ],
    },
    {
        'slug': 'common-plastics',
        'title': '常用塑料耐化学性对比',
        'h1': '常用塑料对比',
        'desc': '并排比较HDPE、LDPE、PP、硬质PVC和软质PVC的耐化学性。化学品储存中最常用的塑料。',
        'intro': '常用塑料是化学品容器和管道中最常使用的材料。',
        'materials': ['HDPE', 'LDPE', 'PP', 'PVC_HART', 'PVC_WEICH'],
        'color': 'green',
        'faq': [
            ('HDPE和LDPE有什么区别？',
             'HDPE密度更高、更坚硬，耐化学性更好。LDPE更柔软，用于薄膜和袋子。对于化学品储存，HDPE通常是更好的选择。'),
            ('PVC耐酸吗？',
             '硬质PVC（PVC-U）在室温下对大多数酸具有良好的耐受性。软质PVC（PVC-P）由于含有增塑剂，耐受性较差。两者对溶剂和芳烃敏感。'),
        ],
    },
    {
        'slug': 'transparent-plastics',
        'title': '透明塑料耐化学性对比',
        'h1': '透明及实验室塑料对比',
        'desc': '并排比较PC、PETG、PMP、PSU和SAN的耐化学性。实验室设备和视窗用透明材料。',
        'intro': '透明塑料对于实验室设备、视窗和光学应用至关重要。',
        'materials': ['PC', 'PETG', 'PMP', 'PSU', 'SAN'],
        'color': 'purple',
        'faq': [
            ('哪种透明塑料耐化学性最好？',
             'PMP（聚甲基戊烯）和PSU（聚砜）在透明塑料中具有最好的耐化学性。PMP还可以高压灭菌。'),
            ('聚碳酸酯能接触溶剂吗？',
             '不能。聚碳酸酯（PC）对大多数有机溶剂、酮类和芳香族化合物敏感。接触溶剂时请使用PMP或PTFE。'),
        ],
    },
    {
        'slug': 'engineering-plastics',
        'title': '工程塑料耐化学性对比',
        'h1': '工程塑料对比',
        'desc': '并排比较尼龙（PA）、POM和聚苯乙烯在20°C和50°C下的耐化学性。',
        'intro': '工程塑料用于在化学品环境中承受机械负载的零件。',
        'materials': ['PA', 'POM', 'PS'],
        'color': 'orange',
        'faq': [
            ('尼龙耐化学品吗？',
             '尼龙（PA）对许多溶剂和油类具有良好的耐受性，但对强酸和氧化剂敏感。它会吸收水分，影响其机械性能。'),
            ('什么是POM，用途是什么？',
             'POM（聚甲醛/缩醛）是一种高强度工程塑料，对许多化学品具有良好的耐受性。用于齿轮、阀门和泵部件。POM不耐强酸。'),
        ],
    },
    {
        'slug': 'all-materials',
        'title': '全部24种材料 — 耐化学性对比',
        'h1': '全部24种材料对比',
        'desc': '24种材料的完整对比表 — 氟聚合物、弹性体、金属和塑料并排对比。',
        'intro': '完整的24种材料概览。水平滚动查看所有列。',
        'materials': list(MAT_SHORT.keys()),
        'color': 'emerald',
        'faq': [
            ('对比了多少种材料？',
             '本表对比了24种可用材料：4种氟聚合物、4种弹性体、3种金属、5种常用塑料、5种透明塑料和3种工程塑料。'),
            ('A、B、C、D评级代表什么？',
             'A（优秀）= 材料具有持久耐受性。B（良好）= 耐受性有限，适合短期接触。C（一般）= 材料可能膨胀或降解。D（差）= 材料不适用。'),
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
        th_cols += f'<th class="py-3 px-2 font-semibold text-gray-600 text-center whitespace-nowrap"><a href="/materials/zh/{d}/" class="hover:text-emerald-600 hover:underline">{s}</a></th>'

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
        cross_links += f'''                <a href="/zh/charts/{c['slug']}/" class="p-3 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-center">
                    <div class="font-bold text-gray-900 text-sm">{c['h1'].replace('对比','')}</div>
                    <div class="text-xs text-gray-500">{len(c['materials'])} 种材料</div>
                </a>\n'''

    header = get_zh_header(active='charts')

    html = f'''<!DOCTYPE html>
<html lang="zh">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{chart['title']}</title>
    <meta name="description" content="{chart['desc']}">
    <link rel="canonical" href="https://chemicalresistance.org/zh/charts/{slug}/">
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
                <a href="/zh/" class="hover:underline">首页</a>
                <span>&rsaquo;</span>
                <a href="/zh/charts/" class="hover:underline">图表</a>
                <span>&rsaquo;</span>
                <span class="text-gray-600">{chart['h1']}</span>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-3">{chart['h1']}</h1>
            <p class="text-lg text-gray-600 mb-4">{chart['intro']}</p>
            <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-A"></span> A = 优秀</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-B"></span> B = 良好</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-C"></span> C = 一般</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-D"></span> D = 差</span>
            </div>
        </div>
    </section>

    <section class="px-4 py-6 no-print">
        <div class="max-w-7xl mx-auto">
            <div class="bg-white rounded-xl border border-gray-200 p-4">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <input type="text" id="searchInput" placeholder="搜索化学品..." class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none">
                    </div>
                    <select id="ratingFilter" class="px-4 py-2 border border-gray-200 rounded-lg">
                        <option value="all">所有评级</option>
                        <option value="any-A">至少一个A</option>
                        <option value="any-D">至少一个D</option>
                        <option value="diff">不同评级</option>
                        <option value="all-A">所有材料为A</option>
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
                <span>显示 <span id="resultCount" class="font-semibold text-gray-700">0</span> 种化学品</span>
                <label class="flex items-center gap-2 cursor-pointer no-print">
                    <input type="checkbox" id="highlightDiffs" checked class="rounded">
                    <span>高亮差异</span>
                </label>
            </div>
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full" style="min-width:600px">
                        <thead class="sticky top-0 z-10">
                            <tr class="bg-gray-50 text-left text-sm">
                                <th class="py-3 px-4 font-semibold text-gray-600">化学品</th>
                                <th class="py-3 px-3 font-semibold text-gray-600 text-sm">浓度</th>
                                {th_cols}
                            </tr>
                        </thead>
                        <tbody id="chartTable" class="divide-y divide-gray-100"></tbody>
                    </table>
                </div>
            </div>
            <div id="loadMore" class="mt-4 text-center hidden">
                <button onclick="loadMore()" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">加载更多</button>
            </div>
        </div>
    </section>

    <section class="px-4 py-8 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
            <div class="space-y-3">
{faq_html}            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">其他对比图表</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
{cross_links}            </div>
        </div>
    </section>

{ZH_FOOTER}

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
            return a.name.localeCompare(b.name, 'zh');
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

    outdir = os.path.join(BASE, 'zh', 'charts', slug)
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'  Created: zh/charts/{slug}/index.html')


def build_charts_index():
    header = get_zh_header(active='charts')

    cards = ''
    for c in CHARTS:
        mat_names = ', '.join(MAT_SHORT[k] for k in c['materials'][:4])
        if len(c['materials']) > 4:
            mat_names += f' +{len(c["materials"])-4}'
        cards += f'''            <a href="/zh/charts/{c['slug']}/" class="bg-white p-6 rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-sm transition-all">
                <h2 class="text-lg font-bold text-gray-900 mb-1">{c['h1'].replace('对比','')}</h2>
                <p class="text-sm text-gray-600">{mat_names}</p>
                <p class="text-xs text-gray-400 mt-2">{len(c['materials'])} 种材料可对比 &rarr;</p>
            </a>\n'''

    html = f'''<!DOCTYPE html>
<html lang="zh">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>对比图表 — 耐化学性</title>
    <meta name="description" content="耐化学性对比图表：氟聚合物、弹性体、金属和塑料并排对比。">
    <link rel="canonical" href="https://chemicalresistance.org/zh/charts/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="/css/tailwind.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>* {{ font-family: 'Inter', sans-serif; }} body {{ background: #f8fafc; }}</style>
</head>
<body class="text-gray-700 min-h-screen">
{header}

    <section class="bg-gradient-to-b from-emerald-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-3">对比图表</h1>
            <p class="text-lg text-gray-600">并排比较各材料组 — 氟聚合物、弹性体、金属和塑料。</p>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
{cards}        </div>
    </section>

{ZH_FOOTER}
{CF_BEACON}
</body>
</html>'''

    outdir = os.path.join(BASE, 'zh', 'charts')
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print('  Created: zh/charts/index.html')


# ============================================================
# 2. COMPARE PAGES (Chinese)
# ============================================================
COMPARISONS = [
    {
        'slug': 'etfe-vs-ectfe',
        'title': 'ETFE vs ECTFE：耐化学性对比',
        'h1': 'ETFE vs ECTFE',
        'mat_a_key': 'ECTFE_ETFE', 'mat_a_name': 'ETFE', 'mat_a_full': '乙烯-四氟乙烯共聚物',
        'mat_a_desc': 'ETFE具有优异的耐化学性和良好的机械强度。透明且可回收。',
        'mat_a_temp': '-100°C 至 150°C',
        'mat_a_use': '建筑幕墙、电缆护套、太阳能电池板覆盖层、一般化工工艺。',
        'mat_b_key': 'ECTFE_ETFE', 'mat_b_name': 'ECTFE', 'mat_b_full': '乙烯-三氟氯乙烯共聚物',
        'mat_b_desc': 'ECTFE具有更优异的耐化学性，特别是对氯化溶剂和腐蚀性环境。',
        'mat_b_temp': '-76°C 至 150°C',
        'mat_b_use': '腐蚀性化学品、氯化溶剂、储罐内衬、酸性气体排放系统。',
    },
    {
        'slug': 'ptfe-vs-fep',
        'title': 'PTFE vs FEP：耐化学性对比',
        'h1': 'PTFE vs FEP',
        'mat_a_key': 'PTFE', 'mat_a_name': 'PTFE', 'mat_a_full': '聚四氟乙烯（特氟龙）',
        'mat_a_desc': 'PTFE在所有塑料中具有最广泛的耐化学性。须通过烧结或机加工成型。',
        'mat_a_temp': '-200°C 至 260°C',
        'mat_a_use': '通用耐化学性、高温应用、密封件、实验室设备。',
        'mat_b_key': 'FEP', 'mat_b_name': 'FEP', 'mat_b_full': '氟化乙烯丙烯共聚物',
        'mat_b_desc': 'FEP的耐化学性与PTFE几乎相同，但可通过熔融加工（注塑、挤出）成型。',
        'mat_b_temp': '-200°C 至 200°C',
        'mat_b_use': '管材、管道内衬、实验室设备，需要模塑成型的场合。',
    },
    {
        'slug': 'nbr-vs-epdm',
        'title': 'NBR vs EPDM：耐化学性对比',
        'h1': 'NBR vs EPDM',
        'mat_a_key': 'NBR', 'mat_a_name': 'NBR', 'mat_a_full': '丁腈橡胶（Buna-N）',
        'mat_a_desc': 'NBR耐油、燃料及多种工业化学品。是密封圈的标准材料。',
        'mat_a_temp': '-40°C 至 120°C',
        'mat_a_use': '耐油密封件、燃油软管、液压系统、矿物油密封圈。',
        'mat_b_key': 'EPDM', 'mat_b_name': 'EPDM', 'mat_b_full': '三元乙丙橡胶',
        'mat_b_desc': 'EPDM对水、蒸汽、臭氧及多种水溶液具有优异的耐受性。',
        'mat_b_temp': '-50°C 至 150°C',
        'mat_b_use': '水系统、蒸汽密封、室外应用、制动液。',
    },
    {
        'slug': 'hdpe-vs-pvdf',
        'title': 'HDPE vs PVDF：耐化学性对比',
        'h1': 'HDPE vs PVDF',
        'mat_a_key': 'HDPE', 'mat_a_name': 'HDPE', 'mat_a_full': '高密度聚乙烯',
        'mat_a_desc': 'HDPE经济实惠，对多种酸和碱具有良好的耐受性。是储存容器的标准材料。',
        'mat_a_temp': '-50°C 至 80°C',
        'mat_a_use': '化学品容器、管道、收容盆、经济型存储解决方案。',
        'mat_b_key': 'PVDF', 'mat_b_name': 'PVDF', 'mat_b_full': '聚偏氟乙烯',
        'mat_b_desc': 'PVDF在较高温度下对浓酸和溶剂具有更优异的耐受性。',
        'mat_b_temp': '-30°C 至 150°C',
        'mat_b_use': '腐蚀性化学品、半导体工业、制药应用、超纯水系统。',
    },
    {
        'slug': 'polysulfone-vs-pvdf',
        'title': '聚砜 vs PVDF：耐化学性对比',
        'h1': '聚砜 vs PVDF',
        'mat_a_key': 'PSU', 'mat_a_name': '聚砜', 'mat_a_full': '聚砜（PSU）',
        'mat_a_desc': '聚砜透明、可高压灭菌，对水溶液和多种化学品具有良好的耐受性。',
        'mat_a_temp': '-100°C 至 160°C',
        'mat_a_use': '实验室设备、膜过滤器、医疗应用、食品加工。',
        'mat_b_key': 'PVDF', 'mat_b_name': 'PVDF', 'mat_b_full': '聚偏氟乙烯',
        'mat_b_desc': 'PVDF对浓酸和溶剂具有更优异的耐受性。',
        'mat_b_temp': '-30°C 至 150°C',
        'mat_b_use': '腐蚀性化学品、半导体工业、超纯水系统。',
    },
]


def build_comparison_page(comp):
    header = get_zh_header(active='compare')

    # Cross-links
    cross = ''
    for c in COMPARISONS:
        if c['slug'] == comp['slug']:
            continue
        cross += f'''                <a href="/zh/compare/{c['slug']}/" class="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-center">
                    <div class="font-bold text-gray-900">{c['h1']}</div>
                    <div class="text-xs text-gray-500">查看对比</div>
                </a>\n'''

    html = f'''<!DOCTYPE html>
<html lang="zh">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{comp['title']}</title>
    <meta name="description" content="{comp['title']}. 找到最适合您应用的材料。">
    <link rel="canonical" href="https://chemicalresistance.org/zh/compare/{comp['slug']}/">
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
                <a href="/zh/" class="hover:underline">首页</a>
                <span>&rsaquo;</span>
                <a href="/zh/compare/" class="hover:underline">对比</a>
                <span>&rsaquo;</span>
                <span class="text-gray-600">{comp['h1']}</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{comp['h1']}</h1>
            <p class="text-lg text-gray-600 mb-4">耐化学性直接对比。</p>
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
                            <span class="text-gray-500">温度范围</span>
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
                            <span class="text-gray-500">温度范围</span>
                            <span class="font-medium">{comp['mat_b_temp']}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 py-8 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">何时使用每种材料？</h2>
            <div class="grid md:grid-cols-2 gap-6">
                <div class="p-5 rounded-xl bg-blue-50 border border-blue-100">
                    <h3 class="font-bold text-gray-900 mb-2">选择 {comp['mat_a_name']}：</h3>
                    <p class="text-gray-600 text-sm">{comp['mat_a_use']}</p>
                </div>
                <div class="p-5 rounded-xl bg-amber-50 border border-amber-100">
                    <h3 class="font-bold text-gray-900 mb-2">选择 {comp['mat_b_name']}：</h3>
                    <p class="text-gray-600 text-sm">{comp['mat_b_use']}</p>
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">化学品评级对比</h2>
            <p class="text-gray-600 mb-4">20°C下评级不同的化学品：</p>
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gray-50 text-left text-sm">
                                <th class="py-3 px-4 font-semibold text-gray-600">化学品</th>
                                <th class="py-3 px-4 font-semibold text-gray-600 text-center">{comp['mat_a_name']}</th>
                                <th class="py-3 px-4 font-semibold text-gray-600 text-center">{comp['mat_b_name']}</th>
                            </tr>
                        </thead>
                        <tbody id="compareTable" class="divide-y divide-gray-100"></tbody>
                    </table>
                </div>
            </div>
            <div id="loadMore" class="mt-4 text-center hidden">
                <button onclick="loadMore()" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">加载更多</button>
            </div>
        </div>
    </section>

    <section class="px-4 py-12 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">其他对比</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
{cross}            </div>
        </div>
    </section>

{ZH_FOOTER}

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
            allDiffs.sort(function(a, b) {{ return a.name.localeCompare(b.name, 'zh'); }});
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

    outdir = os.path.join(BASE, 'zh', 'compare', comp['slug'])
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"  Created: zh/compare/{comp['slug']}/index.html")


def build_compare_index():
    """Build the Chinese interactive comparison tool page."""
    header = get_zh_header(active='compare')

    # Static comparison cards
    comp_cards = ''
    for c in COMPARISONS:
        comp_cards += f'''                <a href="/zh/compare/{c['slug']}/" class="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                    <h3 class="text-lg font-bold text-gray-900 mb-1">{c['h1']}</h3>
                    <p class="text-sm text-gray-600">{c['mat_a_full']} vs {c['mat_b_full']}</p>
                </a>\n'''

    # Chart links
    chart_links = ''
    for c in CHARTS:
        mat_names = ', '.join(MAT_SHORT[k] for k in c['materials'][:4])
        if len(c['materials']) > 4:
            mat_names += f" +{len(c['materials'])-4}"
        chart_links += f'''                <a href="/zh/charts/{c['slug']}/" class="p-3 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-center">
                    <div class="font-bold text-gray-900 text-sm">{c['h1'].replace('对比','')}</div>
                    <div class="text-xs text-gray-500">{mat_names}</div>
                </a>\n'''

    all_mats_js = '''[
        { key: 'AL',         name: '铝',                short: 'Al',       dir: 'aluminium',       group: '金属' },
        { key: 'ECTFE_ETFE', name: 'ECTFE / ETFE',           short: 'ECTFE',    dir: 'ectfe-etfe',      group: '氟聚合物' },
        { key: 'EPDM',       name: 'EPDM',                   short: 'EPDM',     dir: 'epdm',            group: '弹性体' },
        { key: 'FEP',        name: 'FEP',                    short: 'FEP',      dir: 'fep',             group: '氟聚合物' },
        { key: 'FPM',        name: '氟橡胶 (FPM/FKM)',        short: 'Viton',    dir: 'viton',           group: '弹性体' },
        { key: 'HDPE',       name: 'HDPE',                   short: 'HDPE',     dir: 'hdpe',            group: '常用塑料' },
        { key: 'LDPE',       name: 'LDPE',                   short: 'LDPE',     dir: 'ldpe',            group: '常用塑料' },
        { key: 'NBR',        name: '丁腈橡胶 (NBR)',          short: 'NBR',      dir: 'nbr',             group: '弹性体' },
        { key: 'PA',         name: '尼龙 (PA)',             short: 'Nylon',    dir: 'nylon-pa',        group: '工程塑料' },
        { key: 'PC',         name: '聚碳酸酯 (PC)',     short: 'PC',       dir: 'polycarbonate',   group: '透明塑料' },
        { key: 'PETG',       name: 'PETG',                   short: 'PETG',     dir: 'petg',            group: '透明塑料' },
        { key: 'PMP',        name: 'PMP',                    short: 'PMP',      dir: 'pmp',             group: '透明塑料' },
        { key: 'POM',        name: '缩醛 (POM)',            short: 'POM',      dir: 'acetal-pom',      group: '工程塑料' },
        { key: 'PP',         name: '聚丙烯 (PP)',      short: 'PP',       dir: 'pp',              group: '常用塑料' },
        { key: 'PS',         name: '聚苯乙烯 (PS)',       short: 'PS',       dir: 'polystyrene',     group: '工程塑料' },
        { key: 'PSU',        name: '聚砜 (PSU)',     short: 'PSU',      dir: 'polysulfone',     group: '透明塑料' },
        { key: 'PTFE',       name: 'PTFE (Teflon)',           short: 'PTFE',     dir: 'ptfe',            group: '氟聚合物' },
        { key: 'PVC_HART',   name: '硬质PVC (PVC-U)',    short: 'uPVC',     dir: 'pvc-rigid',       group: '常用塑料' },
        { key: 'PVC_WEICH',  name: '软质PVC (PVC-P)',   short: 'pPVC',     dir: 'pvc-flexible',    group: '常用塑料' },
        { key: 'PVDF',       name: 'PVDF',                   short: 'PVDF',     dir: 'pvdf',            group: '氟聚合物' },
        { key: 'SAN',        name: 'SAN',                    short: 'SAN',      dir: 'san',             group: '透明塑料' },
        { key: 'SI',         name: 'Silicone',               short: 'Silicone', dir: 'silicone',        group: '弹性体' },
        { key: 'V2A',        name: '304不锈钢 (V2A)',   short: 'SS304',    dir: 'stainless-steel-304', group: '金属' },
        { key: 'V4A',        name: '316不锈钢 (V4A)',   short: 'SS316',    dir: 'ss316',           group: '金属' },
    ]'''

    html = f'''<!DOCTYPE html>
<html lang="zh">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>材料对比 — 耐化学性并排对比</title>
    <meta name="description" content="创建您自己的材料对比。从24种材料中选择2至3种，查看超过1600种化学品的耐受性评级。">
    <link rel="canonical" href="https://chemicalresistance.org/zh/compare/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="/css/tailwind.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
{STYLES}
<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{{"@type":"Question","name":"如何对比不同材料的耐化学性？","acceptedAnswer":{{"@type":"Answer","text":"使用上方的对比工具，从下拉菜单中选择2或3种材料。该工具将显示超过1600种化学品在20°C和50°C下的耐受性评级（A至D）并排对比。"}}}},{{"@type":"Question","name":"A、B、C、D评级代表什么？","acceptedAnswer":{{"@type":"Answer","text":"A (Excelente) = resistência durável. B (Bom) = resistência limitada, adequado para contatos de curta duração. C (Regular) = o material pode inchar ou se degradar. D (Ruim) = o material não é adequado."}}}}]}}
</script>
</head>
<body class="text-gray-700 min-h-screen">
{header}

    <section class="bg-gradient-to-b from-blue-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-3">创建您的材料对比</h1>
            <p class="text-lg text-gray-600">选择2或3种材料，即时并排对比超过1600种化学品的耐化学性。</p>
        </div>
    </section>

    <section class="px-4 py-6 no-print">
        <div class="max-w-5xl mx-auto">
            <div class="bg-white rounded-xl border border-gray-200 p-5">
                <div class="flex flex-col gap-4">
                    <div class="text-sm font-semibold text-gray-700 mb-1">选择要对比的材料：</div>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">材料 1</label>
                            <select id="mat1" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm font-medium"></select>
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">材料 2</label>
                            <select id="mat2" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm font-medium"></select>
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">材料 3 <span class="text-gray-400">（可选）</span></label>
                            <select id="mat3" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm font-medium"></select>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                        <button id="compareBtn" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors">立即对比</button>
                        <button id="resetBtn" class="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors">重置</button>
                        <span id="statusMsg" class="text-sm text-gray-500 ml-2"></span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="legendSection" class="px-4 hidden">
        <div class="max-w-5xl mx-auto">
            <div class="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-A"></span> A = 优秀</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-B"></span> B = 良好</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-C"></span> C = 一般</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-D"></span> D = 差</span>
            </div>
        </div>
    </section>

    <section id="filterSection" class="px-4 py-4 hidden no-print">
        <div class="max-w-5xl mx-auto">
            <div class="bg-white rounded-xl border border-gray-200 p-4">
                <div class="flex flex-col md:flex-row gap-3">
                    <div class="flex-1">
                        <input type="text" id="searchInput" placeholder="搜索化学品..." class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm">
                    </div>
                    <select id="ratingFilter" class="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                        <option value="all">所有评级</option>
                        <option value="any-A">至少一个A</option>
                        <option value="any-D">至少一个D</option>
                        <option value="diff">不同评级</option>
                        <option value="all-A">所有材料为A</option>
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
                <span>显示 <span id="resultCount" class="font-semibold text-gray-700">0</span> 种化学品</span>
                <label class="flex items-center gap-2 cursor-pointer no-print">
                    <input type="checkbox" id="highlightDiffs" checked class="rounded">
                    <span>高亮差异</span>
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
                <button onclick="loadMore()" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm">加载更多</button>
            </div>
        </div>
    </section>

    <section class="px-4 py-8 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">常见问题</h2>
            <div class="space-y-3">
                <details class="border border-gray-200 rounded-xl overflow-hidden">
                    <summary class="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">如何对比不同材料的耐化学性？</summary>
                    <div class="px-5 py-4 border-t border-gray-100 text-gray-600 text-sm">使用上方的对比工具，从下拉菜单中选择2或3种材料。该工具将显示超过1600种化学品在20°C和50°C下的耐受性评级（A至D）并排对比。</div>
                </details>
                <details class="border border-gray-200 rounded-xl overflow-hidden">
                    <summary class="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">A、B、C、D评级代表什么？</summary>
                    <div class="px-5 py-4 border-t border-gray-100 text-gray-600 text-sm">A（优秀）= 材料具有持久耐受性。B（良好）= 耐受性有限，适合短期接触。C（一般）= 材料可能膨胀或降解。D（差）= 材料不适用。</div>
                </details>
            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">热门对比</h2>
            <div class="grid md:grid-cols-2 gap-4">
{comp_cards}            </div>
        </div>
    </section>

    <section class="px-4 py-8 border-t border-gray-100">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">按组分类的对比图表</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
{chart_links}            </div>
        </div>
    </section>

{ZH_FOOTER}

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
        var groupOrder = ['氟聚合物', '弹性体', '金属', '常用塑料', '透明塑料', '工程塑料'];

        ['mat1', 'mat2', 'mat3'].forEach(function(id, i) {{
            var sel = document.getElementById(id);
            if (i === 2) {{
                var opt = document.createElement('option');
                opt.value = '';
                opt.textContent = '— 无 —';
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
        document.getElementById('statusMsg').textContent = '加载数据...';
        return fetch('/data/chemicals_burkle_full.json')
            .then(function(r) {{ return r.json(); }})
            .then(function(data) {{
                allData = data;
                dataLoaded = true;
                document.getElementById('statusMsg').textContent = '';
            }})
            .catch(function() {{
                document.getElementById('statusMsg').textContent = '加载失败，请重试。';
            }});
    }}

    function runComparison() {{
        var k1 = document.getElementById('mat1').value;
        var k2 = document.getElementById('mat2').value;
        var k3 = document.getElementById('mat3').value;
        if (k1 === k2 || (k3 && (k3 === k1 || k3 === k2))) {{
            document.getElementById('statusMsg').textContent = '请选择不同的材料。';
            return;
        }}
        activeMats = [ALL_MATS.find(function(m) {{ return m.key === k1; }}), ALL_MATS.find(function(m) {{ return m.key === k2; }})];
        if (k3) activeMats.push(ALL_MATS.find(function(m) {{ return m.key === k3; }}));

        loadData().then(function() {{
            var thead = document.getElementById('tableHead');
            thead.innerHTML = '<th class="py-3 px-4 font-semibold text-gray-600">化学品</th>'
                + '<th class="py-3 px-3 font-semibold text-gray-600 text-sm">浓度</th>'
                + activeMats.map(function(m) {{
                    return '<th class="py-3 px-2 font-semibold text-gray-600 text-center whitespace-nowrap"><a href="/materials/zh/' + m.dir + '/" class="hover:text-emerald-600 hover:underline">' + m.short + '</a></th>';
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
            return a.name.localeCompare(b.name, 'zh');
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
        history.replaceState(null, '', '/zh/compare/');
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

    outdir = os.path.join(BASE, 'zh', 'compare')
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print('  Created: zh/compare/index.html')


# ============================================================
# 3. UPDATE NAV ON EXISTING ZH PAGES
# ============================================================
def update_zh_nav():
    """Update navigation on all existing ZH pages."""
    pt_dir = os.path.join(BASE, 'zh')
    html_files = glob.glob(os.path.join(pt_dir, '**', '*.html'), recursive=True)

    # Also check materials/pt/ and chemicals/pt/
    html_files.extend(glob.glob(os.path.join(BASE, 'materials', 'zh', '**', '*.html'), recursive=True))
    html_files.extend(glob.glob(os.path.join(BASE, 'chemicals', 'zh', '**', '*.html'), recursive=True))
    html_files.extend(glob.glob(os.path.join(BASE, 'zh-about', '**', '*.html'), recursive=True))

    updated = 0
    for filepath in sorted(set(html_files)):
        # Skip files we just generated (charts and compare)
        rel = os.path.relpath(filepath, BASE)
        if 'zh/charts/' in rel or 'zh/compare/' in rel:
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            html = f.read()

        if '<header' not in html:
            continue

        # Detect active section
        active = None
        if 'materials/zh' in rel:
            active = 'materials'
        elif 'chemicals/zh' in rel:
            active = 'chemicals'
        elif 'storage-compatibility' in rel:
            active = 'storage'
        elif 'sds-decoder' in rel:
            active = 'sds'
        elif 'viscosity' in rel:
            active = 'viscosity'
        elif 'about' in rel or 'zh-about' in rel:
            active = 'about'
        elif rel == os.path.join('zh', 'index.html'):
            active = 'home'

        new_header = get_zh_header(active)

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
    new_urls.append('https://chemicalresistance.org/zh/charts/')
    for c in CHARTS:
        new_urls.append(f"https://chemicalresistance.org/zh/charts/{c['slug']}/")

    # Compare
    new_urls.append('https://chemicalresistance.org/zh/compare/')
    for c in COMPARISONS:
        new_urls.append(f"https://chemicalresistance.org/zh/compare/{c['slug']}/")

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
    print(f'  Sitemap: added {added} new ZH URLs')


# ============================================================
# Main
# ============================================================
if __name__ == '__main__':
    print("Building Chinese (ZH) pages for chemicalresistance.org")
    print("=" * 55)

    print("\n1. Chart pages:")
    build_charts_index()
    for chart in CHARTS:
        build_chart_page(chart)

    print("\n2. Compare pages:")
    build_compare_index()
    for comp in COMPARISONS:
        build_comparison_page(comp)

    print("\n3. Updating navigation on existing ZH pages:")
    nav_count = update_zh_nav()
    print(f"  Updated {nav_count} existing pages")

    print("\n4. Updating sitemap:")
    update_sitemap()

    print("\n" + "=" * 55)
    print("Done! Chinese pages created:")
    print(f"  - 1 charts index + {len(CHARTS)} chart pages")
    print(f"  - 1 compare tool + {len(COMPARISONS)} comparison pages")
    print(f"  - {nav_count} existing pages updated with new nav")
