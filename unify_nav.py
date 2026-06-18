#!/usr/bin/env python3
"""
Unify navigation across all pages on chemicalresistance.org.
Replaces each page's <header>...</header> + mobile menu JS with the
same complete nav used on the homepage.
"""
import os, re, glob

BASE = os.path.dirname(os.path.abspath(__file__))

# The unified header template — uses absolute paths so it works everywhere.
# {active} placeholder will be replaced per-page to highlight current section.
def get_header(active=None):
    """Generate the unified header HTML. `active` is a nav key to highlight."""

    links = [
        ('materials', '/materials/', 'Materials'),
        ('chemicals', '/chemicals/', 'Chemicals'),
        ('compare', '/compare/', 'Compare'),
        ('charts', '/charts/', 'Charts'),
        ('storage', '/storage-compatibility/', 'Storage'),
        ('sds', '/sds-decoder/', 'SDS Decoder'),
        ('viscosity', '/viscosity/', 'Viscosity'),
        ('about', '/about/', 'About'),
    ]

    # Desktop nav links
    desktop_links = []
    for key, href, label in links:
        if key == active:
            desktop_links.append(
                f'<a href="{href}" class="text-emerald-600 font-medium">{label}</a>'
            )
        else:
            desktop_links.append(
                f'<a href="{href}" class="text-gray-600 hover:text-gray-900 hover:underline">{label}</a>'
            )
    desktop_nav = '\n                    '.join(desktop_links)

    # Mobile nav links
    mobile_links = []
    mobile_items = [
        ('home', '/', 'Resistance Chart'),
        ('materials', '/materials/', 'All Materials'),
        ('chemicals', '/chemicals/', 'All Chemicals'),
        ('compare', '/compare/', 'Compare Materials'),
        ('charts', '/charts/', 'Comparison Charts'),
        ('storage', '/storage-compatibility/', 'Storage Compatibility'),
        ('sds', '/sds-decoder/', 'SDS Decoder'),
        ('viscosity', '/viscosity/', 'Viscosity Lookup'),
        ('about', '/about/', 'About'),
    ]
    for key, href, label in mobile_items:
        if key == active:
            mobile_links.append(
                f'<a href="{href}" class="py-2 px-3 rounded-lg text-emerald-700 bg-emerald-50 font-medium">{label}</a>'
            )
        else:
            mobile_links.append(
                f'<a href="{href}" class="py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50">{label}</a>'
            )
    mobile_nav = '\n                '.join(mobile_links)

    return f'''    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2">
                <img src="/logos/logo-icon-128x128.png" alt="ChemicalResistance" class="w-10 h-10 rounded-xl">
                <div>
                    <div class="font-bold text-gray-900">ChemicalResistance.org</div>
                    <div class="text-xs text-gray-500 hidden sm:block">Chemical compatibility database</div>
                </div>
            </a>
            <div class="flex items-center gap-3 text-sm">
                <nav class="hidden md:flex items-center gap-4">
                    {desktop_nav}
                </nav>
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
    </script>'''


def detect_active(filepath):
    """Guess which nav item to highlight based on file path."""
    rel = os.path.relpath(filepath, BASE)
    if rel.startswith('materials/'):
        return 'materials'
    elif rel.startswith('chemicals/'):
        return 'chemicals'
    elif rel.startswith('compare/'):
        return 'compare'
    elif rel.startswith('charts/'):
        return 'charts'
    elif rel.startswith('storage-compatibility'):
        return 'storage'
    elif rel.startswith('sds-decoder'):
        return 'sds'
    elif rel.startswith('viscosity'):
        return 'viscosity'
    elif rel.startswith('about'):
        return 'about'
    elif rel == 'index.html':
        return 'home'
    return None


def replace_header(html, new_header):
    """Replace everything from <header to </header> plus any mobile menu JS."""

    # Remove old mobile menu JS that might follow </header>
    # Pattern: </header> followed by optional whitespace and a <script> block
    # that contains 'mobileMenu'
    html = re.sub(
        r'</header>\s*<script>\s*document\.getElementById\([\'"]mobileMenuBtn[\'"]\).*?</script>',
        '</header>',
        html,
        flags=re.DOTALL
    )

    # Now replace <header...>...</header> with new header
    pattern = r'[ \t]*<header\b[^>]*>.*?</header>'
    match = re.search(pattern, html, re.DOTALL)
    if match:
        html = html[:match.start()] + new_header + html[match.end():]

    return html


def process_file(filepath):
    """Process a single HTML file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    if '<header' not in html:
        return False

    active = detect_active(filepath)
    new_header = get_header(active)
    new_html = replace_header(html, new_header)

    if new_html != html:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_html)
        return True
    return False


if __name__ == '__main__':
    # Find all HTML files (skip localized versions for now — de/, es/, fr/, pt/)
    html_files = []
    for pattern in ['index.html', '*/index.html', '*/*/index.html']:
        html_files.extend(glob.glob(os.path.join(BASE, pattern)))

    # Filter out localized dirs and non-page files
    skip_prefixes = ['de/', 'es/', 'fr/', 'pt/', 'de-about/', 'data/']

    updated = 0
    skipped = 0
    for f in sorted(set(html_files)):
        rel = os.path.relpath(f, BASE)
        if any(rel.startswith(p) for p in skip_prefixes):
            skipped += 1
            continue

        if process_file(f):
            print(f"  Updated: {rel}")
            updated += 1
        else:
            print(f"  Skipped: {rel} (no header or no change)")

    print(f"\nDone! Updated {updated} files, skipped {skipped} localized files")
