#!/usr/bin/env python3
"""
Build German (DE) versions of Charts and Compare pages for chemicalresistance.org.
Also updates navigation across all DE pages.
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


def get_de_header(active=None):
    """German navigation header."""
    links = [
        ('materials', '/materials/de/', 'Materialien'),
        ('chemicals', '/chemicals/de/', 'Chemikalien'),
        ('compare',   '/de/compare/',   'Vergleich'),
        ('charts',    '/de/charts/',    'Tabellen'),
        ('storage',   '/de/storage-compatibility/', 'Lagerung'),
        ('sds',       '/de/sds-decoder/', 'SDB'),
        ('viscosity', '/de/viscosity/',  'Viskosität'),
        ('about',     '/de/about/',      'Über uns'),
    ]

    desktop_links = []
    for key, href, label in links:
        if key == active:
            desktop_links.append(f'<a href="{href}" class="text-emerald-600 font-medium">{label}</a>')
        else:
            desktop_links.append(f'<a href="{href}" class="text-gray-600 hover:text-gray-900 hover:underline">{label}</a>')
    desktop_nav = '\n                    '.join(desktop_links)

    mobile_items = [
        ('home',      '/de/',           'Beständigkeitstabelle'),
        ('materials', '/materials/de/', 'Alle Materialien'),
        ('chemicals', '/chemicals/de/', 'Alle Chemikalien'),
        ('compare',   '/de/compare/',   'Materialvergleich'),
        ('charts',    '/de/charts/',    'Vergleichstabellen'),
        ('storage',   '/de/storage-compatibility/', 'Lagerkompatibilität'),
        ('sds',       '/de/sds-decoder/', 'SDB-Decoder'),
        ('viscosity', '/de/viscosity/',  'Viskosität'),
        ('about',     '/de/about/',      'Über uns'),
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
            <a href="/de/" class="flex items-center gap-2">
                <img src="/logos/logo-icon-128x128.png" alt="ChemicalResistance" class="w-10 h-10 rounded-xl">
                <div>
                    <div class="font-bold text-gray-900">ChemicalResistance.org</div>
                    <div class="text-xs text-gray-500 hidden sm:block">Chemische Beständigkeitsdatenbank</div>
                </div>
            </a>
            <div class="flex items-center gap-3 text-sm">
                <nav class="hidden md:flex items-center gap-4">
                    {desktop_nav}
                </nav>
                <select id="langSelect" aria-label="Sprache wählen" class="bg-gray-100 border border-gray-200 rounded-lg px-2 py-1 text-sm cursor-pointer">
                    <option value="en">🇬🇧 EN</option>
                    <option value="es">🇪🇸 ES</option>
                    <option value="de" selected>🇩🇪 DE</option>
                    <option value="fr">🇫🇷 FR</option>
                    <option value="pt">🇧🇷 PT</option>
                </select>
                <button id="mobileMenuBtn" class="md:hidden p-2 rounded-lg hover:bg-gray-100" aria-label="Menü">
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


DE_FOOTER = '''    <footer class="bg-gray-900 text-gray-400 py-8 px-4">
        <div class="max-w-5xl mx-auto text-center text-sm">
            <p>&copy; 2026 ChemicalResistance.org &mdash; Kostenloses Werkzeug f&uuml;r chemische Kompatibilit&auml;t</p>
            <p class="mt-2">Datenquellen: B&uuml;rkle, INEOS, Industriestandards</p>
        </div>
    </footer>'''

# Shared JS functions (translateConc keeps German terms as-is since source data IS German)
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
    'SAN':'SAN','SI':'Silikon','V2A':'SS304','V4A':'SS316'
}


# ============================================================
# 1. CHART PAGES (German)
# ============================================================
CHARTS = [
    {
        'slug': 'fluoropolymere',
        'title': 'Fluorpolymer-Beständigkeitsvergleich',
        'h1': 'Fluorpolymere im Vergleich',
        'desc': 'Vergleichen Sie die chemische Beständigkeit von PTFE, FEP, PVDF und ECTFE/ETFE nebeneinander. Über 950 Chemikalien bei 20°C und 50°C.',
        'intro': 'Fluorpolymere bieten die höchste chemische Beständigkeit aller Kunststoffe. Vergleichen Sie hier alle vier gängigen Fluorpolymere.',
        'materials': ['PTFE', 'FEP', 'PVDF', 'ECTFE_ETFE'],
        'color': 'blue',
        'faq': [
            ('Welches Fluorpolymer ist am beständigsten?',
             'PTFE (Teflon) hat die breiteste chemische Beständigkeit aller Fluorpolymere mit über 965 A-Bewertungen (Ausgezeichnet). FEP liegt mit 899 A-Bewertungen dicht dahinter.'),
            ('Was ist der Unterschied zwischen PTFE und FEP?',
             'Beide haben nahezu identische chemische Beständigkeit. Der Hauptunterschied liegt in der Verarbeitbarkeit: FEP kann schmelzverarbeitet werden (Spritzguss, Extrusion), während PTFE gesintert oder spanend bearbeitet werden muss. PTFE verträgt höhere Temperaturen (260°C vs 200°C).'),
        ],
    },
    {
        'slug': 'elastomere',
        'title': 'Elastomer-Beständigkeitsvergleich',
        'h1': 'Gummi & Elastomere im Vergleich',
        'desc': 'Vergleichen Sie NBR, EPDM, Viton und Silikon Beständigkeit nebeneinander. Finden Sie das beste Dichtungsmaterial für Ihre Chemikalie.',
        'intro': 'Elastomere werden für Dichtungen, O-Ringe und Schläuche verwendet. Vergleichen Sie hier die vier wichtigsten Typen.',
        'materials': ['NBR', 'EPDM', 'FPM', 'SI'],
        'color': 'amber',
        'faq': [
            ('Was ist der Unterschied zwischen NBR und EPDM?',
             'NBR (Nitrilkautschuk) ist beständig gegen Öle und Kraftstoffe, aber empfindlich gegen Ozon. EPDM ist hervorragend beständig gegen Wasser, Dampf und Ozon, aber nicht gegen Mineralöle.'),
            ('Wann sollte man Viton verwenden?',
             'Viton (FPM/FKM) bietet die breiteste Beständigkeit unter den Elastomeren und ist ideal für aggressive Chemikalien, hohe Temperaturen und Lösungsmittel. Es ist jedoch teurer als NBR oder EPDM.'),
        ],
    },
    {
        'slug': 'metalle',
        'title': 'Metall-Beständigkeitsvergleich',
        'h1': 'Metalle im Vergleich',
        'desc': 'Vergleichen Sie Edelstahl 316, Edelstahl 304 und Aluminium Beständigkeit nebeneinander bei 20°C und 50°C.',
        'intro': 'Vergleichen Sie die Korrosionsbeständigkeit der drei gängigsten Metalle in der Chemietechnik.',
        'materials': ['V4A', 'V2A', 'AL'],
        'color': 'gray',
        'faq': [
            ('Was ist der Unterschied zwischen V2A und V4A Edelstahl?',
             'V4A (1.4401/316) enthält zusätzlich Molybdän und ist dadurch deutlich beständiger gegen Chloride und Säuren als V2A (1.4301/304). V4A wird für aggressive Medien und Meerwasser bevorzugt.'),
            ('Wann ist Aluminium geeignet?',
             'Aluminium ist leicht und korrosionsbeständig gegen viele neutrale Chemikalien, aber empfindlich gegen starke Säuren und Laugen. Es eignet sich für Lagerung und Transport von Lösungsmitteln und trockenen Chemikalien.'),
        ],
    },
    {
        'slug': 'standardkunststoffe',
        'title': 'Standardkunststoff-Beständigkeitsvergleich',
        'h1': 'Standardkunststoffe im Vergleich',
        'desc': 'Vergleichen Sie HDPE, LDPE, PP, Hart-PVC und Weich-PVC Beständigkeit nebeneinander. Die gängigsten Kunststoffe für chemische Lagerung.',
        'intro': 'Standardkunststoffe sind die am häufigsten verwendeten Materialien für Chemikalienbehälter und Rohrleitungen.',
        'materials': ['HDPE', 'LDPE', 'PP', 'PVC_HART', 'PVC_WEICH'],
        'color': 'green',
        'faq': [
            ('Was ist der Unterschied zwischen HDPE und LDPE?',
             'HDPE ist dichter und steifer mit besserer chemischer Beständigkeit. LDPE ist flexibler und wird für Folien und Beutel verwendet. Für chemische Lagerung ist HDPE in der Regel die bessere Wahl.'),
            ('Ist PVC beständig gegen Säuren?',
             'Hart-PVC (PVC-U) hat eine gute Beständigkeit gegen die meisten Säuren bei Raumtemperatur. Weich-PVC (PVC-P) ist aufgrund der Weichmacher weniger beständig. Beide sind empfindlich gegen Lösungsmittel und aromatische Kohlenwasserstoffe.'),
        ],
    },
    {
        'slug': 'transparente-kunststoffe',
        'title': 'Transparenter Kunststoff-Beständigkeitsvergleich',
        'h1': 'Transparente & Laborkunststoffe im Vergleich',
        'desc': 'Vergleichen Sie PC, PETG, PMP, PSU und SAN Beständigkeit nebeneinander. Transparente Materialien für Laborgeräte und Sichtgläser.',
        'intro': 'Transparente Kunststoffe sind wichtig für Laborgeräte, Sichtgläser und optische Anwendungen.',
        'materials': ['PC', 'PETG', 'PMP', 'PSU', 'SAN'],
        'color': 'purple',
        'faq': [
            ('Welcher transparente Kunststoff hat die beste Beständigkeit?',
             'PMP (Polymethylpenten) und PSU (Polysulfon) bieten die beste chemische Beständigkeit unter den transparenten Kunststoffen. PMP ist zudem autoklavierbar.'),
            ('Kann Polycarbonat mit Lösungsmitteln verwendet werden?',
             'Nein, Polycarbonat (PC) ist empfindlich gegen die meisten organischen Lösungsmittel, Ketone und aromatische Verbindungen. Für Lösungsmittelkontakt verwenden Sie stattdessen PMP oder PTFE.'),
        ],
    },
    {
        'slug': 'technische-kunststoffe',
        'title': 'Technischer Kunststoff-Beständigkeitsvergleich',
        'h1': 'Technische Kunststoffe im Vergleich',
        'desc': 'Vergleichen Sie Nylon (PA), POM und Polystyrol Beständigkeit nebeneinander bei 20°C und 50°C.',
        'intro': 'Technische Kunststoffe für mechanisch beanspruchte Bauteile mit Chemikalienkontakt.',
        'materials': ['PA', 'POM', 'PS'],
        'color': 'orange',
        'faq': [
            ('Ist Nylon beständig gegen Chemikalien?',
             'Nylon (PA) hat eine gute Beständigkeit gegen viele Lösungsmittel und Öle, ist aber empfindlich gegen starke Säuren und oxidierende Medien. Es nimmt Feuchtigkeit auf, was die mechanischen Eigenschaften beeinflusst.'),
            ('Was ist POM und wofür wird es verwendet?',
             'POM (Polyoxymethylen/Acetal) ist ein hochfester technischer Kunststoff mit guter Beständigkeit gegen viele Chemikalien. Er wird für Zahnräder, Ventile und Pumpenteile verwendet. POM ist nicht beständig gegen starke Säuren.'),
        ],
    },
    {
        'slug': 'alle-materialien',
        'title': 'Alle 24 Materialien — Beständigkeitsvergleich',
        'h1': 'Alle 24 Materialien im Vergleich',
        'desc': 'Vollständige Vergleichstabelle aller 24 Materialien — Fluorpolymere, Elastomere, Metalle und Kunststoffe nebeneinander.',
        'intro': 'Die vollständige Übersicht über alle 24 Materialien. Scrollen Sie horizontal, um alle Spalten zu sehen.',
        'materials': list(MAT_SHORT.keys()),
        'color': 'emerald',
        'faq': [
            ('Wie viele Materialien werden verglichen?',
             'Diese Tabelle vergleicht alle 24 verfügbaren Materialien: 4 Fluorpolymere, 4 Elastomere, 3 Metalle, 5 Standardkunststoffe, 5 transparente Kunststoffe und 3 technische Kunststoffe.'),
            ('Was bedeuten die Bewertungen A, B, C, D?',
             'A (Ausgezeichnet) = Material ist dauerhaft beständig. B (Gut) = Eingeschränkt beständig, für kurzzeitigen Kontakt geeignet. C (Begrenzt) = Material kann quellen oder sich zersetzen. D (Nicht empfohlen) = Material ist nicht geeignet.'),
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
        th_cols += f'<th class="py-3 px-2 font-semibold text-gray-600 text-center whitespace-nowrap"><a href="/materials/de/{d}/" class="hover:text-emerald-600 hover:underline">{s}</a></th>'

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
        cross_links += f'''                <a href="/de/charts/{c['slug']}/" class="p-3 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-center">
                    <div class="font-bold text-gray-900 text-sm">{c['h1'].replace(' im Vergleich','')}</div>
                    <div class="text-xs text-gray-500">{len(c['materials'])} Materialien</div>
                </a>\n'''

    header = get_de_header(active='charts')

    html = f'''<!DOCTYPE html>
<html lang="de">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{chart['title']}</title>
    <meta name="description" content="{chart['desc']}">
    <link rel="canonical" href="https://chemicalresistance.org/de/charts/{slug}/">
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
{CLARITY}
</head>
<body class="text-gray-700 min-h-screen">
{header}

    <section class="bg-gradient-to-b from-{chart['color']}-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-5xl mx-auto">
            <div class="flex items-center gap-2 text-sm text-{chart['color']}-600 mb-3">
                <a href="/de/" class="hover:underline">Start</a>
                <span>&rsaquo;</span>
                <a href="/de/charts/" class="hover:underline">Tabellen</a>
                <span>&rsaquo;</span>
                <span class="text-gray-600">{chart['h1']}</span>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-3">{chart['h1']}</h1>
            <p class="text-lg text-gray-600 mb-4">{chart['intro']}</p>
            <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-A"></span> A = Ausgezeichnet</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-B"></span> B = Gut</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-C"></span> C = Begrenzt</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-D"></span> D = Nicht empfohlen</span>
            </div>
        </div>
    </section>

    <section class="px-4 py-6 no-print">
        <div class="max-w-7xl mx-auto">
            <div class="bg-white rounded-xl border border-gray-200 p-4">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <input type="text" id="searchInput" placeholder="Chemikalie suchen..." class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none">
                    </div>
                    <select id="ratingFilter" class="px-4 py-2 border border-gray-200 rounded-lg">
                        <option value="all">Alle Bewertungen</option>
                        <option value="any-A">Mindestens ein A</option>
                        <option value="any-D">Mindestens ein D</option>
                        <option value="diff">Unterschiedliche Bewertungen</option>
                        <option value="all-A">Alle Materialien A</option>
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
                <span>Zeige <span id="resultCount" class="font-semibold text-gray-700">0</span> Chemikalien</span>
                <label class="flex items-center gap-2 cursor-pointer no-print">
                    <input type="checkbox" id="highlightDiffs" checked class="rounded">
                    <span>Unterschiede hervorheben</span>
                </label>
            </div>
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full" style="min-width:600px">
                        <thead class="sticky top-0 z-10">
                            <tr class="bg-gray-50 text-left text-sm">
                                <th class="py-3 px-4 font-semibold text-gray-600">Chemikalie</th>
                                <th class="py-3 px-3 font-semibold text-gray-600 text-sm">Konz.</th>
                                {th_cols}
                            </tr>
                        </thead>
                        <tbody id="chartTable" class="divide-y divide-gray-100"></tbody>
                    </table>
                </div>
            </div>
            <div id="loadMore" class="mt-4 text-center hidden">
                <button onclick="loadMore()" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">Mehr laden</button>
            </div>
        </div>
    </section>

    <section class="px-4 py-8 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Häufig gestellte Fragen</h2>
            <div class="space-y-3">
{faq_html}            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Weitere Vergleichstabellen</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
{cross_links}            </div>
        </div>
    </section>

{DE_FOOTER}

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
            return a.name.localeCompare(b.name, 'de');
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

    outdir = os.path.join(BASE, 'de', 'charts', slug)
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'  Created: de/charts/{slug}/index.html')


def build_charts_index():
    header = get_de_header(active='charts')

    cards = ''
    for c in CHARTS:
        mat_names = ', '.join(MAT_SHORT[k] for k in c['materials'][:4])
        if len(c['materials']) > 4:
            mat_names += f' +{len(c["materials"])-4}'
        cards += f'''            <a href="/de/charts/{c['slug']}/" class="bg-white p-6 rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-sm transition-all">
                <h2 class="text-lg font-bold text-gray-900 mb-1">{c['h1'].replace(' im Vergleich','')}</h2>
                <p class="text-sm text-gray-600">{mat_names}</p>
                <p class="text-xs text-gray-400 mt-2">{len(c['materials'])} Materialien vergleichen &rarr;</p>
            </a>\n'''

    html = f'''<!DOCTYPE html>
<html lang="de">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vergleichstabellen — Chemische Beständigkeit</title>
    <meta name="description" content="Vergleichstabellen f&uuml;r chemische Best&auml;ndigkeit: Fluorpolymere, Elastomere, Metalle und Kunststoffe nebeneinander.">
    <link rel="canonical" href="https://chemicalresistance.org/de/charts/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="/css/tailwind.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>* {{ font-family: 'Inter', sans-serif; }} body {{ background: #f8fafc; }}</style>
{CLARITY}
</head>
<body class="text-gray-700 min-h-screen">
{header}

    <section class="bg-gradient-to-b from-emerald-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-3">Vergleichstabellen</h1>
            <p class="text-lg text-gray-600">Materialgruppen nebeneinander vergleichen &mdash; Fluorpolymere, Elastomere, Metalle und Kunststoffe.</p>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
{cards}        </div>
    </section>

{DE_FOOTER}
{CF_BEACON}
</body>
</html>'''

    outdir = os.path.join(BASE, 'de', 'charts')
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print('  Created: de/charts/index.html')


# ============================================================
# 2. COMPARE PAGES (German)
# ============================================================
COMPARISONS = [
    {
        'slug': 'etfe-vs-ectfe',
        'title': 'ETFE vs ECTFE: Chemische Beständigkeit im Vergleich',
        'h1': 'ETFE vs ECTFE',
        'mat_a_key': 'ECTFE_ETFE', 'mat_a_name': 'ETFE', 'mat_a_full': 'Ethylentetrafluorethylen',
        'mat_a_desc': 'ETFE bietet ausgezeichnete chemische Beständigkeit mit guter mechanischer Festigkeit. Es ist transparent und recycelbar.',
        'mat_a_temp': '-100°C bis 150°C',
        'mat_a_use': 'Architekturverglasungen, Drahtummantelungen, Solarmodulabdeckungen, allgemeine chemische Verarbeitung.',
        'mat_b_key': 'ECTFE_ETFE', 'mat_b_name': 'ECTFE', 'mat_b_full': 'Ethylenchlortrifluorethylen',
        'mat_b_desc': 'ECTFE hat überlegene chemische Beständigkeit, besonders gegen chlorierte Lösungsmittel und aggressive Medien.',
        'mat_b_temp': '-76°C bis 150°C',
        'mat_b_use': 'Aggressive Chemikalien, chlorierte Lösungsmittel, Tankauskleidungen, Abgassysteme mit Säuredämpfen.',
    },
    {
        'slug': 'ptfe-vs-fep',
        'title': 'PTFE vs FEP: Chemische Beständigkeit im Vergleich',
        'h1': 'PTFE vs FEP',
        'mat_a_key': 'PTFE', 'mat_a_name': 'PTFE', 'mat_a_full': 'Polytetrafluorethylen (Teflon)',
        'mat_a_desc': 'PTFE hat die breiteste chemische Beständigkeit aller Kunststoffe. Es muss gesintert oder spanend bearbeitet werden.',
        'mat_a_temp': '-200°C bis 260°C',
        'mat_a_use': 'Universelle chemische Beständigkeit, Hochtemperaturanwendungen, Dichtungen, Laborgeräte.',
        'mat_b_key': 'FEP', 'mat_b_name': 'FEP', 'mat_b_full': 'Fluoriertes Ethylenpropylen',
        'mat_b_desc': 'FEP hat nahezu identische Beständigkeit wie PTFE, kann aber schmelzverarbeitet werden (Spritzguss, Extrusion).',
        'mat_b_temp': '-200°C bis 200°C',
        'mat_b_use': 'Schläuche, Rohrauskleidungen, Laborgeräte, wenn Formbarkeit wichtig ist.',
    },
    {
        'slug': 'nbr-vs-epdm',
        'title': 'NBR vs EPDM: Chemische Beständigkeit im Vergleich',
        'h1': 'NBR vs EPDM',
        'mat_a_key': 'NBR', 'mat_a_name': 'NBR', 'mat_a_full': 'Nitrilkautschuk (Buna-N)',
        'mat_a_desc': 'NBR ist beständig gegen Öle, Kraftstoffe und viele industrielle Chemikalien. Standardmaterial für O-Ringe.',
        'mat_a_temp': '-40°C bis 120°C',
        'mat_a_use': 'Öldichtungen, Kraftstoffschläuche, hydraulische Systeme, O-Ringe für Mineralöle.',
        'mat_b_key': 'EPDM', 'mat_b_name': 'EPDM', 'mat_b_full': 'Ethylen-Propylen-Dien-Kautschuk',
        'mat_b_desc': 'EPDM ist hervorragend beständig gegen Wasser, Dampf, Ozon und viele wässrige Lösungen.',
        'mat_b_temp': '-50°C bis 150°C',
        'mat_b_use': 'Wassersysteme, Dampfdichtungen, Outdoor-Anwendungen, Bremsflüssigkeiten.',
    },
    {
        'slug': 'hdpe-vs-pvdf',
        'title': 'HDPE vs PVDF: Chemische Beständigkeit im Vergleich',
        'h1': 'HDPE vs PVDF',
        'mat_a_key': 'HDPE', 'mat_a_name': 'HDPE', 'mat_a_full': 'Polyethylen hoher Dichte',
        'mat_a_desc': 'HDPE ist kostengünstig mit guter Beständigkeit gegen viele Säuren und Laugen. Standardmaterial für Lagerbehälter.',
        'mat_a_temp': '-50°C bis 80°C',
        'mat_a_use': 'Chemikalienbehälter, Rohrleitungen, Auffangwannen, kostengünstige Lagerlösungen.',
        'mat_b_key': 'PVDF', 'mat_b_name': 'PVDF', 'mat_b_full': 'Polyvinylidenfluorid',
        'mat_b_desc': 'PVDF bietet überlegene Beständigkeit gegen konzentrierte Säuren und Lösungsmittel bei höheren Temperaturen.',
        'mat_b_temp': '-30°C bis 150°C',
        'mat_b_use': 'Aggressive Chemikalien, Halbleiterindustrie, Pharmaanwendungen, Ultrareinwassersysteme.',
    },
    {
        'slug': 'polysulfon-vs-pvdf',
        'title': 'Polysulfon vs PVDF: Chemische Beständigkeit im Vergleich',
        'h1': 'Polysulfon vs PVDF',
        'mat_a_key': 'PSU', 'mat_a_name': 'Polysulfon', 'mat_a_full': 'Polysulfon (PSU)',
        'mat_a_desc': 'Polysulfon ist transparent, autoklavierbar und beständig gegen wässrige Lösungen und viele Chemikalien.',
        'mat_a_temp': '-100°C bis 160°C',
        'mat_a_use': 'Laborgeräte, Membranfilter, medizinische Anwendungen, Lebensmittelverarbeitung.',
        'mat_b_key': 'PVDF', 'mat_b_name': 'PVDF', 'mat_b_full': 'Polyvinylidenfluorid',
        'mat_b_desc': 'PVDF bietet überlegene Beständigkeit gegen konzentrierte Säuren und Lösungsmittel.',
        'mat_b_temp': '-30°C bis 150°C',
        'mat_b_use': 'Aggressive Chemikalien, Halbleiterindustrie, Ultrareinwassersysteme.',
    },
]


def build_comparison_page(comp):
    header = get_de_header(active='compare')

    # Cross-links
    cross = ''
    for c in COMPARISONS:
        if c['slug'] == comp['slug']:
            continue
        cross += f'''                <a href="/de/compare/{c['slug']}/" class="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-center">
                    <div class="font-bold text-gray-900">{c['h1']}</div>
                    <div class="text-xs text-gray-500">Vergleich ansehen</div>
                </a>\n'''

    html = f'''<!DOCTYPE html>
<html lang="de">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{comp['title']}</title>
    <meta name="description" content="{comp['title']}. Sehen Sie welches Material besser für Ihre Anwendung geeignet ist.">
    <link rel="canonical" href="https://chemicalresistance.org/de/compare/{comp['slug']}/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="/css/tailwind.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
{STYLES}
{CLARITY}
</head>
<body class="text-gray-700 min-h-screen">
{header}

    <section class="bg-gradient-to-b from-blue-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <div class="flex items-center gap-2 text-sm text-blue-600 mb-3">
                <a href="/de/" class="hover:underline">Start</a>
                <span>&rsaquo;</span>
                <a href="/de/compare/" class="hover:underline">Vergleich</a>
                <span>&rsaquo;</span>
                <span class="text-gray-600">{comp['h1']}</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{comp['h1']}</h1>
            <p class="text-lg text-gray-600 mb-4">Chemische Beständigkeit im direkten Vergleich.</p>
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
                            <span class="text-gray-500">Temperaturbereich</span>
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
                            <span class="text-gray-500">Temperaturbereich</span>
                            <span class="font-medium">{comp['mat_b_temp']}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 py-8 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Wann welches Material?</h2>
            <div class="grid md:grid-cols-2 gap-6">
                <div class="p-5 rounded-xl bg-blue-50 border border-blue-100">
                    <h3 class="font-bold text-gray-900 mb-2">{comp['mat_a_name']} wählen für:</h3>
                    <p class="text-gray-600 text-sm">{comp['mat_a_use']}</p>
                </div>
                <div class="p-5 rounded-xl bg-amber-50 border border-amber-100">
                    <h3 class="font-bold text-gray-900 mb-2">{comp['mat_b_name']} wählen für:</h3>
                    <p class="text-gray-600 text-sm">{comp['mat_b_use']}</p>
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Chemische Bewertungen im Vergleich</h2>
            <p class="text-gray-600 mb-4">Chemikalien mit unterschiedlicher Bewertung bei 20°C:</p>
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gray-50 text-left text-sm">
                                <th class="py-3 px-4 font-semibold text-gray-600">Chemikalie</th>
                                <th class="py-3 px-4 font-semibold text-gray-600 text-center">{comp['mat_a_name']}</th>
                                <th class="py-3 px-4 font-semibold text-gray-600 text-center">{comp['mat_b_name']}</th>
                            </tr>
                        </thead>
                        <tbody id="compareTable" class="divide-y divide-gray-100"></tbody>
                    </table>
                </div>
            </div>
            <div id="loadMore" class="mt-4 text-center hidden">
                <button onclick="loadMore()" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">Mehr laden</button>
            </div>
        </div>
    </section>

    <section class="px-4 py-12 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Weitere Vergleiche</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
{cross}            </div>
        </div>
    </section>

{DE_FOOTER}

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
            allDiffs.sort(function(a, b) {{ return a.name.localeCompare(b.name, 'de'); }});
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

    outdir = os.path.join(BASE, 'de', 'compare', comp['slug'])
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"  Created: de/compare/{comp['slug']}/index.html")


def build_compare_index():
    """Build the German interactive comparison tool page."""
    header = get_de_header(active='compare')

    # Static comparison cards
    comp_cards = ''
    for c in COMPARISONS:
        comp_cards += f'''                <a href="/de/compare/{c['slug']}/" class="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                    <h3 class="text-lg font-bold text-gray-900 mb-1">{c['h1']}</h3>
                    <p class="text-sm text-gray-600">{c['mat_a_full']} vs {c['mat_b_full']}</p>
                </a>\n'''

    # Chart links
    chart_links = ''
    for c in CHARTS:
        mat_names = ', '.join(MAT_SHORT[k] for k in c['materials'][:4])
        if len(c['materials']) > 4:
            mat_names += f" +{len(c['materials'])-4}"
        chart_links += f'''                <a href="/de/charts/{c['slug']}/" class="p-3 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-center">
                    <div class="font-bold text-gray-900 text-sm">{c['h1'].replace(' im Vergleich','')}</div>
                    <div class="text-xs text-gray-500">{mat_names}</div>
                </a>\n'''

    # Read the EN compare page's JS ALL_MATS structure (reuse same structure, just translate group names)
    all_mats_js = '''[
        { key: 'AL',         name: 'Aluminium',              short: 'Al',       dir: 'aluminium',       group: 'Metalle' },
        { key: 'ECTFE_ETFE', name: 'ECTFE / ETFE',           short: 'ECTFE',    dir: 'ectfe-etfe',      group: 'Fluorpolymere' },
        { key: 'EPDM',       name: 'EPDM',                   short: 'EPDM',     dir: 'epdm',            group: 'Elastomere' },
        { key: 'FEP',        name: 'FEP',                    short: 'FEP',      dir: 'fep',             group: 'Fluorpolymere' },
        { key: 'FPM',        name: 'Viton (FPM/FKM)',        short: 'Viton',    dir: 'viton',           group: 'Elastomere' },
        { key: 'HDPE',       name: 'HDPE',                   short: 'HDPE',     dir: 'hdpe',            group: 'Standardkunststoffe' },
        { key: 'LDPE',       name: 'LDPE',                   short: 'LDPE',     dir: 'ldpe',            group: 'Standardkunststoffe' },
        { key: 'NBR',        name: 'NBR (Nitril)',           short: 'NBR',      dir: 'nbr',             group: 'Elastomere' },
        { key: 'PA',         name: 'Nylon (PA)',             short: 'Nylon',    dir: 'nylon-pa',        group: 'Technische Kunststoffe' },
        { key: 'PC',         name: 'Polycarbonat (PC)',      short: 'PC',       dir: 'polycarbonate',   group: 'Transparente Kunststoffe' },
        { key: 'PETG',       name: 'PETG',                   short: 'PETG',     dir: 'petg',            group: 'Transparente Kunststoffe' },
        { key: 'PMP',        name: 'PMP',                    short: 'PMP',      dir: 'pmp',             group: 'Transparente Kunststoffe' },
        { key: 'POM',        name: 'Acetal (POM)',           short: 'POM',      dir: 'acetal-pom',      group: 'Technische Kunststoffe' },
        { key: 'PP',         name: 'Polypropylen (PP)',      short: 'PP',       dir: 'pp',              group: 'Standardkunststoffe' },
        { key: 'PS',         name: 'Polystyrol (PS)',        short: 'PS',       dir: 'polystyrene',     group: 'Technische Kunststoffe' },
        { key: 'PSU',        name: 'Polysulfon (PSU)',       short: 'PSU',      dir: 'polysulfone',     group: 'Transparente Kunststoffe' },
        { key: 'PTFE',       name: 'PTFE (Teflon)',          short: 'PTFE',     dir: 'ptfe',            group: 'Fluorpolymere' },
        { key: 'PVC_HART',   name: 'PVC hart (PVC-U)',      short: 'uPVC',     dir: 'pvc-rigid',       group: 'Standardkunststoffe' },
        { key: 'PVC_WEICH',  name: 'PVC weich (PVC-P)',     short: 'pPVC',     dir: 'pvc-flexible',    group: 'Standardkunststoffe' },
        { key: 'PVDF',       name: 'PVDF',                   short: 'PVDF',     dir: 'pvdf',            group: 'Fluorpolymere' },
        { key: 'SAN',        name: 'SAN',                    short: 'SAN',      dir: 'san',             group: 'Transparente Kunststoffe' },
        { key: 'SI',         name: 'Silikon',                short: 'Silikon',  dir: 'silicone',        group: 'Elastomere' },
        { key: 'V2A',        name: 'Edelstahl 304 (V2A)',   short: 'SS304',    dir: 'stainless-steel-304', group: 'Metalle' },
        { key: 'V4A',        name: 'Edelstahl 316 (V4A)',   short: 'SS316',    dir: 'ss316',           group: 'Metalle' },
    ]'''

    html = f'''<!DOCTYPE html>
<html lang="de">
<head>
{GA_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Materialvergleich — Chemische Beständigkeit nebeneinander</title>
    <meta name="description" content="Erstellen Sie Ihren eigenen Materialvergleich. Wählen Sie 2-3 Materialien aus 24 Optionen und sehen Sie Beständigkeitsbewertungen für über 1.600 Chemikalien.">
    <link rel="canonical" href="https://chemicalresistance.org/de/compare/">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="/css/tailwind.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
{STYLES}
<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{{"@type":"Question","name":"Wie vergleiche ich die chemische Beständigkeit verschiedener Materialien?","acceptedAnswer":{{"@type":"Answer","text":"Verwenden Sie das Vergleichstool oben, um 2 oder 3 Materialien aus den Dropdown-Menüs auszuwählen. Das Tool zeigt Beständigkeitsbewertungen (A bis D) für über 1.600 Chemikalien bei 20°C und 50°C nebeneinander an."}}}},{{"@type":"Question","name":"Was bedeuten die Bewertungen A, B, C, D?","acceptedAnswer":{{"@type":"Answer","text":"A (Ausgezeichnet) = dauerhaft beständig. B (Gut) = eingeschränkt beständig, für kurzzeitigen Kontakt geeignet. C (Begrenzt) = Material kann quellen oder sich zersetzen. D (Nicht empfohlen) = Material ist nicht geeignet."}}}}]}}
</script>
{CLARITY}
</head>
<body class="text-gray-700 min-h-screen">
{header}

    <section class="bg-gradient-to-b from-blue-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-900 mb-3">Eigenen Materialvergleich erstellen</h1>
            <p class="text-lg text-gray-600">Wählen Sie 2 oder 3 Materialien und vergleichen Sie die chemische Beständigkeit sofort nebeneinander für über 1.600 Chemikalien.</p>
        </div>
    </section>

    <section class="px-4 py-6 no-print">
        <div class="max-w-5xl mx-auto">
            <div class="bg-white rounded-xl border border-gray-200 p-5">
                <div class="flex flex-col gap-4">
                    <div class="text-sm font-semibold text-gray-700 mb-1">Materialien zum Vergleichen auswählen:</div>
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
                            <label class="block text-xs text-gray-500 mb-1">Material 3 <span class="text-gray-400">(optional)</span></label>
                            <select id="mat3" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm font-medium"></select>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                        <button id="compareBtn" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors">Jetzt vergleichen</button>
                        <button id="resetBtn" class="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors">Zurücksetzen</button>
                        <span id="statusMsg" class="text-sm text-gray-500 ml-2"></span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="legendSection" class="px-4 hidden">
        <div class="max-w-5xl mx-auto">
            <div class="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-A"></span> A = Ausgezeichnet</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-B"></span> B = Gut</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-C"></span> C = Begrenzt</span>
                <span class="flex items-center gap-1"><span class="w-4 h-4 rounded rating-D"></span> D = Nicht empfohlen</span>
            </div>
        </div>
    </section>

    <section id="filterSection" class="px-4 py-4 hidden no-print">
        <div class="max-w-5xl mx-auto">
            <div class="bg-white rounded-xl border border-gray-200 p-4">
                <div class="flex flex-col md:flex-row gap-3">
                    <div class="flex-1">
                        <input type="text" id="searchInput" placeholder="Chemikalie suchen..." class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-sm">
                    </div>
                    <select id="ratingFilter" class="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                        <option value="all">Alle Bewertungen</option>
                        <option value="any-A">Mindestens ein A</option>
                        <option value="any-D">Mindestens ein D</option>
                        <option value="diff">Unterschiedliche Bewertungen</option>
                        <option value="all-A">Alle Materialien A</option>
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
                <span>Zeige <span id="resultCount" class="font-semibold text-gray-700">0</span> Chemikalien</span>
                <label class="flex items-center gap-2 cursor-pointer no-print">
                    <input type="checkbox" id="highlightDiffs" checked class="rounded">
                    <span>Unterschiede hervorheben</span>
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
                <button onclick="loadMore()" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm">Mehr laden</button>
            </div>
        </div>
    </section>

    <section class="px-4 py-8 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Häufig gestellte Fragen</h2>
            <div class="space-y-3">
                <details class="border border-gray-200 rounded-xl overflow-hidden">
                    <summary class="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">Wie vergleiche ich die chemische Beständigkeit verschiedener Materialien?</summary>
                    <div class="px-5 py-4 border-t border-gray-100 text-gray-600 text-sm">Verwenden Sie das Vergleichstool oben, um 2 oder 3 Materialien aus den Dropdown-Menüs auszuwählen. Das Tool zeigt Beständigkeitsbewertungen (A bis D) für über 1.600 Chemikalien bei 20°C und 50°C nebeneinander an.</div>
                </details>
                <details class="border border-gray-200 rounded-xl overflow-hidden">
                    <summary class="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">Was bedeuten die Bewertungen A, B, C, D?</summary>
                    <div class="px-5 py-4 border-t border-gray-100 text-gray-600 text-sm">A (Ausgezeichnet) = Material ist dauerhaft beständig. B (Gut) = Eingeschränkt beständig, für kurzzeitigen Kontakt geeignet. C (Begrenzt) = Material kann quellen oder sich zersetzen. D (Nicht empfohlen) = Material ist nicht geeignet.</div>
                </details>
            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Beliebte Vergleiche</h2>
            <div class="grid md:grid-cols-2 gap-4">
{comp_cards}            </div>
        </div>
    </section>

    <section class="px-4 py-8 border-t border-gray-100">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Gruppen-Vergleichstabellen</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
{chart_links}            </div>
        </div>
    </section>

{DE_FOOTER}

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
        var groupOrder = ['Fluorpolymere', 'Elastomere', 'Metalle', 'Standardkunststoffe', 'Transparente Kunststoffe', 'Technische Kunststoffe'];

        ['mat1', 'mat2', 'mat3'].forEach(function(id, i) {{
            var sel = document.getElementById(id);
            if (i === 2) {{
                var opt = document.createElement('option');
                opt.value = '';
                opt.textContent = '— Keins —';
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
        document.getElementById('statusMsg').textContent = 'Daten laden...';
        return fetch('/data/chemicals_burkle_full.json')
            .then(function(r) {{ return r.json(); }})
            .then(function(data) {{
                allData = data;
                dataLoaded = true;
                document.getElementById('statusMsg').textContent = '';
            }})
            .catch(function() {{
                document.getElementById('statusMsg').textContent = 'Fehler beim Laden. Bitte erneut versuchen.';
            }});
    }}

    function runComparison() {{
        var k1 = document.getElementById('mat1').value;
        var k2 = document.getElementById('mat2').value;
        var k3 = document.getElementById('mat3').value;
        if (k1 === k2 || (k3 && (k3 === k1 || k3 === k2))) {{
            document.getElementById('statusMsg').textContent = 'Bitte verschiedene Materialien wählen.';
            return;
        }}
        activeMats = [ALL_MATS.find(function(m) {{ return m.key === k1; }}), ALL_MATS.find(function(m) {{ return m.key === k2; }})];
        if (k3) activeMats.push(ALL_MATS.find(function(m) {{ return m.key === k3; }}));

        loadData().then(function() {{
            var thead = document.getElementById('tableHead');
            thead.innerHTML = '<th class="py-3 px-4 font-semibold text-gray-600">Chemikalie</th>'
                + '<th class="py-3 px-3 font-semibold text-gray-600 text-sm">Konz.</th>'
                + activeMats.map(function(m) {{
                    return '<th class="py-3 px-2 font-semibold text-gray-600 text-center whitespace-nowrap"><a href="/materials/de/' + m.dir + '/" class="hover:text-emerald-600 hover:underline">' + m.short + '</a></th>';
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
            return a.name.localeCompare(b.name, 'de');
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
        history.replaceState(null, '', '/de/compare/');
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

    outdir = os.path.join(BASE, 'de', 'compare')
    os.makedirs(outdir, exist_ok=True)
    with open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print('  Created: de/compare/index.html')


# ============================================================
# 3. UPDATE NAV ON EXISTING DE PAGES
# ============================================================
def update_de_nav():
    """Update navigation on all existing DE pages."""
    de_dir = os.path.join(BASE, 'de')
    html_files = glob.glob(os.path.join(de_dir, '**', '*.html'), recursive=True)

    # Also check materials/de/ and chemicals/de/
    html_files.extend(glob.glob(os.path.join(BASE, 'materials', 'de', '**', '*.html'), recursive=True))
    html_files.extend(glob.glob(os.path.join(BASE, 'chemicals', 'de', '**', '*.html'), recursive=True))
    html_files.extend(glob.glob(os.path.join(BASE, 'de-about', '**', '*.html'), recursive=True))

    updated = 0
    for filepath in sorted(set(html_files)):
        # Skip files we just generated (charts and compare)
        rel = os.path.relpath(filepath, BASE)
        if 'de/charts/' in rel or 'de/compare/' in rel:
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            html = f.read()

        if '<header' not in html:
            continue

        # Detect active section
        active = None
        if 'materials/de' in rel:
            active = 'materials'
        elif 'chemicals/de' in rel:
            active = 'chemicals'
        elif 'storage-compatibility' in rel:
            active = 'storage'
        elif 'sds-decoder' in rel:
            active = 'sds'
        elif 'viscosity' in rel:
            active = 'viscosity'
        elif 'about' in rel or 'de-about' in rel:
            active = 'about'
        elif rel == os.path.join('de', 'index.html'):
            active = 'home'

        new_header = get_de_header(active)

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
    with open(sitemap_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_urls = []

    # Charts
    new_urls.append('https://chemicalresistance.org/de/charts/')
    for c in CHARTS:
        new_urls.append(f"https://chemicalresistance.org/de/charts/{c['slug']}/")

    # Compare
    new_urls.append('https://chemicalresistance.org/de/compare/')
    for c in COMPARISONS:
        new_urls.append(f"https://chemicalresistance.org/de/compare/{c['slug']}/")

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
    print(f'  Sitemap: added {added} new DE URLs')


# ============================================================
# Main
# ============================================================
if __name__ == '__main__':
    print("Building German (DE) pages for chemicalresistance.org")
    print("=" * 55)

    print("\n1. Chart pages:")
    build_charts_index()
    for chart in CHARTS:
        build_chart_page(chart)

    print("\n2. Compare pages:")
    build_compare_index()
    for comp in COMPARISONS:
        build_comparison_page(comp)

    print("\n3. Updating navigation on existing DE pages:")
    nav_count = update_de_nav()
    print(f"  Updated {nav_count} existing pages")

    print("\n4. Updating sitemap:")
    update_sitemap()

    print("\n" + "=" * 55)
    print("Done! German pages created:")
    print(f"  - 1 charts index + {len(CHARTS)} chart pages")
    print(f"  - 1 compare tool + {len(COMPARISONS)} comparison pages")
    print(f"  - {nav_count} existing pages updated with new nav")
