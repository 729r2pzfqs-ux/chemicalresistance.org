import os
import re

# Material name to slug mapping
MATERIAL_MAP = {
    'Aluminium': 'aluminium',
    'ECTFE/ETFE': 'ectfe-etfe',
    'EPDM': 'epdm',
    'FEP': 'fep',
    'Viton': 'viton',
    'HDPE': 'hdpe',
    'LDPE': 'ldpe',
    'NBR': 'nbr',
    'Nylon (PA)': 'nylon-pa',
    'PETG': 'petg',
    'PMP': 'pmp',
    'Acetal (POM)': 'acetal-pom',
    'Polycarbonate': 'polycarbonate',
    'Polystyrene': 'polystyrene',
    'Polysulfone': 'polysulfone',
    'PP': 'pp',
    'PTFE': 'ptfe',
    'PVC Rigid': 'pvc-rigid',
    'PVC Flexible': 'pvc-flexible',
    'PVDF': 'pvdf',
    'SAN': 'san',
    'Silicone': 'silicone',
    'Stainless Steel 304': 'stainless-steel-304',
    'Stainless Steel 316': 'ss316',
}

def slugify(name):
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')

count = 0

# Update chemical index pages
for f in os.listdir('chemicals'):
    if not f.endswith('.html') or f == 'index.html':
        continue
    
    chem_slug = f.replace('.html', '')
    path = f'chemicals/{f}'
    
    with open(path) as file:
        html = file.read()
    
    changed = False
    
    for mat_name, mat_slug in MATERIAL_MAP.items():
        # Check if detail page exists
        detail_path = f'chemicals/{chem_slug}/{mat_slug}/index.html'
        if not os.path.exists(detail_path):
            continue
        
        # Find and replace material name with link
        pattern = rf'<td class="py-3 px-4 font-medium text-gray-900">{re.escape(mat_name)}</td>'
        replacement = f'<td class="py-3 px-4 font-medium text-gray-900"><a href="{chem_slug}/{mat_slug}/" class="text-blue-600 hover:underline">{mat_name}</a></td>'
        
        if re.search(pattern, html):
            html = re.sub(pattern, replacement, html)
            changed = True
    
    if changed:
        with open(path, 'w') as file:
            file.write(html)
        count += 1

print(f"✅ Added links to {count} chemical index pages")
