import os
import json
import re

with open('data/chemicals.json') as f:
    data = json.load(f)

# Get existing chemical slugs
existing = set()
for f in os.listdir('chemicals'):
    if f.endswith('.html') and f != 'index.html':
        existing.add(f.replace('.html', ''))

# Top 50 searchable chemicals (German name -> English name)
TOP_50 = {
    # Alcohols - very high search volume
    'Methanol': 'methanol',
    'Ethanol': 'ethanol', 
    'Isopropanol': 'isopropanol',
    'Butanol': 'butanol',
    'Glycerin': 'glycerin',
    'Ethylenglykol': 'ethylene-glycol',
    'Propylenglykol': 'propylene-glycol',
    
    # Bases
    'Calciumhydroxid': 'calcium-hydroxide',
    'Bariumhydroxid': 'barium-hydroxide',
    'Magnesiumhydroxid': 'magnesium-hydroxide',
    
    # Bleach/Cleaning
    'Natriumhypochlorit': 'sodium-hypochlorite',
    'Calciumhypochlorit': 'calcium-hypochlorite',
    
    # Carbonates
    'Natriumcarbonat': 'sodium-carbonate',
    'Kaliumcarbonat': 'potassium-carbonate',
    
    # More chlorides
    'Bariumchlorid': 'barium-chloride',
    'Eisenchlorid': 'ferric-chloride',
    'Kupferchlorid': 'copper-chloride',
    
    # Sulfates
    'Kupfersulfat': 'copper-sulfate',
    'Eisensulfat': 'ferrous-sulfate',
    'Zinksulfat': 'zinc-sulfate',
    'Nickelsulfat': 'nickel-sulfate',
    'Magnesiumsulfat': 'magnesium-sulfate',
    
    # Nitrates
    'Kaliumnitrat': 'potassium-nitrate',
    'Calciumnitrat': 'calcium-nitrate',
    'Bariumnitrat': 'barium-nitrate',
    
    # Solvents
    'Chloroform': 'chloroform',
    'Tetrachlorkohlenstoff': 'carbon-tetrachloride',
    'Tetrahydrofuran': 'thf-tetrahydrofuran',
    'Dimethylformamid': 'dmf-dimethylformamide',
    'Dimethylsulfoxid': 'dmso',
    'Acrolein': 'acrolein',
    
    # Fuels/Oils
    'Benzin': 'gasoline-petrol',
    'Heizöl': 'heating-oil',
    'Kerosin': 'kerosene',
    'Schmieröle': 'lubricating-oil',
    
    # Acids
    'Perchlorsäure': 'perchloric-acid',
    'Flusssäure': 'hydrofluoric-acid',
    'Schweflige Säure': 'sulfurous-acid',
    'Kohlensäure': 'carbonic-acid',
    
    # Industrial
    'Natriumsulfat': 'sodium-sulfate',
    'Natriumsulfit': 'sodium-sulfite',
    'Natriumnitrit': 'sodium-nitrite',
    'Kaliumchromat': 'potassium-chromate',
    'Kaliumpermanganat': 'potassium-permanganate',
    
    # Misc common
    'Formaldehyd': 'formaldehyde',
    'Phenol': 'phenol',
    'Cresol': 'cresol',
    'Anilin': 'aniline',
    'Pyridin': 'pyridine',
    'Harnstoff': 'urea',
}

# Find chemicals in data
found = []
for chem in data:
    if chem['name'] in TOP_50:
        en_slug = TOP_50[chem['name']]
        if en_slug not in existing:
            found.append((chem['name'], en_slug, chem))

print(f"Found {len(found)} chemicals to add")
for de, en, _ in found[:20]:
    print(f"  {de} -> {en}")

# Save for next step
import pickle
with open('/tmp/chemicals_to_add.pkl', 'wb') as f:
    pickle.dump(found, f)
