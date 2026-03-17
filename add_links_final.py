import os
import re

MATERIAL_MAP = {
    'Aluminium': 'aluminium',
    'ECTFE/ETFE': 'ectfe-etfe',
    'EPDM': 'epdm',
    'FEP': 'fep',
    'Viton': 'viton',
    'HDPE': 'hdpe',
    'LDPE': 'ldpe',
    'NBR': 'nbr',
    'Nylon': 'nylon-pa',
    'PETG': 'petg',
    'PMP': 'pmp',
    'Acetal': 'acetal-pom',
    'Polycarbonate': 'polycarbonate',
    'Polystyrene': 'polystyrene',
    'Polysulfone': 'polysulfone',
    'PP': 'pp',
    'PTFE': 'ptfe',
    'PVC rigid': 'pvc-rigid',
    'PVC flexible': 'pvc-flexible',
    'PVDF': 'pvdf',
    'SAN': 'san',
    'Silicone': 'silicone',
    'SS 304': 'stainless-steel-304',
    'SS 316': 'ss316',
}

count = 0

for f in os.listdir('chemicals'):
    if not f.endswith('.html') or f == 'index.html':
        continue
    
    chem_slug = f.replace('.html', '')
    path = f'chemicals/{f}'
    
    with open(path) as file:
        html = file.read()
    
    # Skip if already has links to subdirectories
    if f'/{chem_slug}/' in html:
        continue
    
    changed = False
    
    for mat_name, mat_slug in MATERIAL_MAP.items():
        # Check if detail page exists
        detail_path = f'chemicals/{chem_slug}/{mat_slug}/index.html'
        if not os.path.exists(detail_path):
            continue
        
        # Find and replace material name with link
        pattern = rf'(<td class="py-3 px-4 font-medium text-gray-900">)({re.escape(mat_name)})(</td>)'
        replacement = rf'\1<a href="{chem_slug}/{mat_slug}/" class="text-blue-600 hover:underline">\2</a>\3'
        
        new_html = re.sub(pattern, replacement, html)
        if new_html != html:
            html = new_html
            changed = True
    
    if changed:
        with open(path, 'w') as file:
            file.write(html)
        count += 1

print(f"✅ Added internal links to {count} chemical pages")
