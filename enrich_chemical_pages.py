#!/usr/bin/env python3
"""
Enrich chemical index pages with FAQ section, description text, and Schema.org markup.
Target: chemicals/*/index.html (29,501 pages)
"""

import os
import re
import json
from pathlib import Path

CHEMICALS_DIR = Path("chemicals")
count = 0
errors = 0

def get_chemical_name(html):
    """Extract chemical name from the page title or h1"""
    m = re.search(r'<h1[^>]*>([^<]+?)(?:\s*Chemical Resistance)?</h1>', html)
    if m:
        return m.group(1).strip()
    m = re.search(r'<title>([^|<]+)', html)
    if m:
        name = m.group(1).strip().replace(' Chemical Resistance Chart', '').replace(' | ChemicalResistance.org', '')
        return name
    return None

def get_materials_from_page(html):
    """Extract material links from the page"""
    materials = re.findall(r'class="bg-white px-4 py-3[^"]*"[^>]*>([^<]+)</a>', html)
    return materials

def build_faq_html(chemical_name, materials):
    """Generate FAQ accordion HTML"""
    mat_list = ", ".join(materials[:6])
    if len(materials) > 6:
        mat_list += f" and {len(materials) - 6} more"
    
    faqs = [
        (f"What materials are resistant to {chemical_name}?",
         f"Our database covers {len(materials)} materials tested against {chemical_name}, including {mat_list}. Ratings range from A (excellent resistance) to D (not recommended). Click any material above to see its specific rating at 20°C and 50°C."),
        
        (f"What is the best material for storing {chemical_name}?",
         f"The best material depends on concentration, temperature, and exposure duration. PTFE and fluoropolymers generally offer excellent resistance to most chemicals. Check individual material ratings above for {chemical_name} compatibility at your specific conditions."),
        
        (f"How do I read the chemical resistance ratings?",
         f"A = Excellent (fully resistant, recommended for long-term use). B = Good (minor effect possible, suitable for most applications). C = Limited (some degradation, short-term use only). D = Not Recommended (significant attack, do not use). Always verify ratings with your equipment manufacturer."),
        
        (f"Does temperature affect {chemical_name} resistance?",
         f"Yes. Chemical resistance ratings can change significantly between 20°C and 50°C. Higher temperatures generally reduce material resistance. Our charts show ratings at both temperatures where data is available."),
        
        (f"Where does the {chemical_name} compatibility data come from?",
         f"Chemical resistance data is based on comprehensive compatibility charts published by Bürkle GmbH (buerkle.de), a German manufacturer with decades of expertise in chemical handling equipment."),
    ]
    
    faq_html = '''
    <section class="px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
'''
    
    for q, a in faqs:
        faq_html += f'''
                <details class="border-b border-gray-100 last:border-0">
                    <summary class="py-3 cursor-pointer font-medium text-gray-900 flex justify-between items-center hover:text-emerald-600">
                        {q}
                        <svg class="w-5 h-5 text-gray-400 shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                    </summary>
                    <p class="pb-3 text-gray-600 text-sm leading-relaxed">{a}</p>
                </details>
'''
    
    faq_html += '''
            </div>
        </div>
    </section>
'''
    return faqs, faq_html

def build_description_html(chemical_name, materials):
    """Generate description section"""
    return f'''
    <section class="px-4 py-6">
        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-3">About {chemical_name} Compatibility</h2>
                <p class="text-gray-600 text-sm leading-relaxed mb-3">
                    Choosing the right material for handling or storing {chemical_name} is critical for safety and equipment longevity. 
                    The wrong material can lead to container failure, leaks, or contamination.
                </p>
                <p class="text-gray-600 text-sm leading-relaxed mb-3">
                    Our compatibility chart shows resistance ratings for <strong>{len(materials)} materials</strong> against {chemical_name}, 
                    tested at both 20°C and 50°C. Ratings follow the A-D scale: A (excellent) means the material is fully resistant 
                    and recommended for long-term use, while D means the material should not be used.
                </p>
                <p class="text-gray-600 text-sm leading-relaxed">
                    Always consider your specific conditions — concentration, temperature, pressure, and exposure time can all affect 
                    material performance. When in doubt, consult your equipment manufacturer or conduct testing.
                </p>
            </div>
        </div>
    </section>
'''

def build_schema(chemical_name, faqs):
    """Build FAQPage + WebPage schema"""
    faq_schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": q,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": a
                }
            }
            for q, a in faqs
        ]
    }
    
    webpage_schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": f"{chemical_name} Chemical Resistance Chart",
        "dateModified": "2026-03-27",
    }
    
    return (
        f'<script type="application/ld+json">{json.dumps(faq_schema)}</script>\n'
        f'<script type="application/ld+json">{json.dumps(webpage_schema)}</script>'
    )

def process_page(filepath):
    """Enrich a single chemical index page"""
    global count, errors
    
    with open(filepath, 'r') as f:
        html = f.read()
    
    # Skip if already enriched
    if 'FAQPage' in html or 'Frequently Asked Questions' in html:
        return
    
    chemical_name = get_chemical_name(html)
    if not chemical_name:
        errors += 1
        return
    
    materials = get_materials_from_page(html)
    
    # Build new content
    faqs, faq_html = build_faq_html(chemical_name, materials)
    desc_html = build_description_html(chemical_name, materials)
    schema_html = build_schema(chemical_name, faqs)
    
    # Inject description after the main grid (before the rating scale section)
    html = html.replace(
        '<div class="mt-8 p-6 bg-white rounded-2xl border">',
        desc_html + '\n    <div class="mt-8 p-6 bg-white rounded-2xl border">'
    )
    
    # Inject FAQ before footer
    html = html.replace(
        '<footer class="border-t mt-12',
        faq_html + '\n    <footer class="border-t mt-12'
    )
    
    # Inject schema before </head>
    html = html.replace('</head>', schema_html + '\n</head>')
    
    with open(filepath, 'w') as f:
        f.write(html)
    
    count += 1

# Process all chemical index pages
print("🧪 Enriching chemical pages...")
for chemical_dir in sorted(CHEMICALS_DIR.iterdir()):
    if not chemical_dir.is_dir():
        continue
    index_file = chemical_dir / "index.html"
    if index_file.exists():
        process_page(index_file)
        if count % 2000 == 0 and count > 0:
            print(f"  ... {count} pages enriched")

print(f"\n✅ Done! Enriched {count} pages ({errors} errors)")
