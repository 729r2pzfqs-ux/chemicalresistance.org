#!/usr/bin/env python3
"""Translate German chemical names to Spanish"""

import json
import re

# German to Spanish chemical term mappings
TRANSLATIONS = {
    # Common suffixes/prefixes
    'säure': 'ácido',
    'Säure': 'ácido',
    '-säure': ' ácido',
    'oxid': 'óxido',
    'Oxid': 'óxido',
    'hydroxid': 'hidróxido',
    'Hydroxid': 'hidróxido',
    'chlorid': 'cloruro',
    'Chlorid': 'cloruro',
    'bromid': 'bromuro',
    'Bromid': 'bromuro',
    'fluorid': 'fluoruro',
    'Fluorid': 'fluoruro',
    'sulfat': 'sulfato',
    'Sulfat': 'sulfato',
    'sulfid': 'sulfuro',
    'Sulfid': 'sulfuro',
    'nitrat': 'nitrato',
    'Nitrat': 'nitrato',
    'nitrit': 'nitrito',
    'Nitrit': 'nitrito',
    'phosphat': 'fosfato',
    'Phosphat': 'fosfato',
    'carbonat': 'carbonato',
    'Carbonat': 'carbonato',
    'acetat': 'acetato',
    'Acetat': 'acetato',
    'alkohol': 'alcohol',
    'Alkohol': 'alcohol',
    
    # Elements
    'Wasserstoff': 'hidrógeno',
    'Sauerstoff': 'oxígeno',
    'Stickstoff': 'nitrógeno',
    'Kohlenstoff': 'carbono',
    'Schwefel': 'azufre',
    'Phosphor': 'fósforo',
    'Chlor': 'cloro',
    'Brom': 'bromo',
    'Fluor': 'flúor',
    'Jod': 'yodo',
    'Natrium': 'sodio',
    'Kalium': 'potasio',
    'Calcium': 'calcio',
    'Magnesium': 'magnesio',
    'Aluminium': 'aluminio',
    'Eisen': 'hierro',
    'Kupfer': 'cobre',
    'Zink': 'zinc',
    'Silber': 'plata',
    'Gold': 'oro',
    'Blei': 'plomo',
    'Quecksilber': 'mercurio',
    'Nickel': 'níquel',
    'Chrom': 'cromo',
    'Mangan': 'manganeso',
    'Kobalt': 'cobalto',
    'Zinn': 'estaño',
    'Barium': 'bario',
    'Lithium': 'litio',
    'Ammonium': 'amonio',
    
    # Common words
    'wasser': 'agua',
    'Wasser': 'agua',
    'Öl': 'aceite',
    'öl': 'aceite',
    'Fett': 'grasa',
    'fett': 'grasa',
    'Salz': 'sal',
    'salz': 'sal',
    'Lauge': 'lejía',
    'lauge': 'lejía',
    'Lösung': 'solución',
    'lösung': 'solución',
    'rein': 'puro',
    'technisch': 'técnico',
    'konzentriert': 'concentrado',
    'verdünnt': 'diluido',
    'gesättigt': 'saturado',
    'wässrig': 'acuoso',
    'flüssig': 'líquido',
    'fest': 'sólido',
    'gasförmig': 'gaseoso',
    'alkalisch': 'alcalino',
    'sauer': 'ácido',
    'neutral': 'neutro',
    'heiß': 'caliente',
    'kalt': 'frío',
    'warm': 'tibio',
    
    # Specific compounds - common acids
    'Schwefelsäure': 'ácido sulfúrico',
    'Salzsäure': 'ácido clorhídrico',
    'Salpetersäure': 'ácido nítrico',
    'Phosphorsäure': 'ácido fosfórico',
    'Essigsäure': 'ácido acético',
    'Ameisensäure': 'ácido fórmico',
    'Zitronensäure': 'ácido cítrico',
    'Milchsäure': 'ácido láctico',
    'Oxalsäure': 'ácido oxálico',
    'Weinsäure': 'ácido tartárico',
    'Benzoesäure': 'ácido benzoico',
    'Borsäure': 'ácido bórico',
    'Kohlensäure': 'ácido carbónico',
    'Blausäure': 'ácido cianhídrico',
    'Flusssäure': 'ácido fluorhídrico',
    'Chromsäure': 'ácido crómico',
    'Perchlorsäure': 'ácido perclórico',
    'Bromwasserstoffsäure': 'ácido bromhídrico',
    'Jodwasserstoffsäure': 'ácido yodhídrico',
    'Kieselsäure': 'ácido silícico',
    
    # Common bases
    'Natronlauge': 'hidróxido de sodio',
    'Kalilauge': 'hidróxido de potasio',
    'Ammoniak': 'amoníaco',
    'Ammoniakwasser': 'agua amoniacal',
    
    # Common solvents
    'Aceton': 'acetona',
    'Methanol': 'metanol',
    'Ethanol': 'etanol',
    'Propanol': 'propanol',
    'Butanol': 'butanol',
    'Benzol': 'benceno',
    'Toluol': 'tolueno',
    'Xylol': 'xileno',
    'Hexan': 'hexano',
    'Heptan': 'heptano',
    'Oktan': 'octano',
    'Chloroform': 'cloroformo',
    'Tetrachlorkohlenstoff': 'tetracloruro de carbono',
    'Dichlormethan': 'diclorometano',
    'Trichlorethylen': 'tricloroetileno',
    'Perchlorethylen': 'percloroetileno',
    'Ethylacetat': 'acetato de etilo',
    'Methylacetat': 'acetato de metilo',
    'Diethylether': 'éter dietílico',
    'Tetrahydrofuran': 'tetrahidrofurano',
    'Dimethylformamid': 'dimetilformamida',
    'Dimethylsulfoxid': 'dimetilsulfóxido',
    'Acetonitril': 'acetonitrilo',
    'Formaldehyd': 'formaldehído',
    'Acetaldehyd': 'acetaldehído',
    'Glycerin': 'glicerina',
    'Ethylenglykol': 'etilenglicol',
    'Propylenglykol': 'propilenglicol',
    
    # Fuels and oils
    'Benzin': 'gasolina',
    'Diesel': 'diésel',
    'Heizöl': 'aceite de calefacción',
    'Motoröl': 'aceite de motor',
    'Hydrauliköl': 'aceite hidráulico',
    'Schmieröl': 'aceite lubricante',
    'Mineralöl': 'aceite mineral',
    'Pflanzenöl': 'aceite vegetal',
    'Olivenöl': 'aceite de oliva',
    'Rizinusöl': 'aceite de ricino',
    'Leinöl': 'aceite de linaza',
    'Petroleum': 'petróleo',
    'Kerosin': 'queroseno',
    
    # Gases
    'Abgase': 'gases de escape',
    'Chlorgas': 'gas cloro',
    'Sauerstoffgas': 'gas oxígeno',
    'Stickstoffgas': 'gas nitrógeno',
    'Kohlendioxid': 'dióxido de carbono',
    'Kohlenmonoxid': 'monóxido de carbono',
    'Schwefeldioxid': 'dióxido de azufre',
    'Schwefeltrioxid': 'trióxido de azufre',
    'Stickstoffdioxid': 'dióxido de nitrógeno',
    'Ozon': 'ozono',
    'Wasserstoffperoxid': 'peróxido de hidrógeno',
    
    # Food and beverages
    'Milch': 'leche',
    'Bier': 'cerveza',
    'Wein': 'vino',
    'Essig': 'vinagre',
    'Kaffee': 'café',
    'Tee': 'té',
    'Fruchtsaft': 'jugo de frutas',
    'Apfelsaft': 'jugo de manzana',
    'Orangensaft': 'jugo de naranja',
    'Zucker': 'azúcar',
    'Zuckerlösung': 'solución de azúcar',
    'Honig': 'miel',
    'Sirup': 'jarabe',
    'Gelatine': 'gelatina',
    'Stärke': 'almidón',
    
    # Cleaning products
    'Seife': 'jabón',
    'Seifenlauge': 'agua jabonosa',
    'Waschmittel': 'detergente',
    'Reinigungsmittel': 'producto de limpieza',
    'Bleichmittel': 'blanqueador',
    'Desinfektionsmittel': 'desinfectante',
    
    # Misc
    'Harnstoff': 'urea',
    'Harnsäure': 'ácido úrico',
    'Glucose': 'glucosa',
    'Fructose': 'fructosa',
    'Saccharose': 'sacarosa',
    'Cellulose': 'celulosa',
    'Phenol': 'fenol',
    'Anilin': 'anilina',
    'Pyridin': 'piridina',
    'Terpentin': 'trementina',
    'Lack': 'barniz',
    'Farbe': 'pintura',
    'Tinte': 'tinta',
    'Klebstoff': 'adhesivo',
    'Leim': 'cola',
    'Gummi': 'goma',
    'Latex': 'látex',
    'Silikon': 'silicona',
    'Harz': 'resina',
    'Bitumen': 'betún',
    'Teer': 'alquitrán',
    'Asphalt': 'asfalto',
    
    # Prefixes for concentration/state
    'haltig': 'que contiene',
    'frei': 'libre de',
    'reich': 'rico en',
    'arm': 'bajo en',
}

# Full name replacements (exact matches)
EXACT_TRANSLATIONS = {
    'Abgase, alkalisch': 'Gases de escape, alcalinos',
    'Abgase, fluorwasserstoffhaltig': 'Gases de escape con ácido fluorhídrico',
    'Abgase, kohlendioxidhaltig': 'Gases de escape con dióxido de carbono',
    'Abgase, nitrosehaltig': 'Gases de escape nitrosos',
    'Abgase, salzsäurehaltig': 'Gases de escape con ácido clorhídrico',
    'Abgase, schwefeldioxidhaltig': 'Gases de escape con dióxido de azufre',
    'Abgase, schwefelsäurehaltig': 'Gases de escape con ácido sulfúrico',
    'Abgase, schwefeltrioxidhaltig': 'Gases de escape con trióxido de azufre',
    'Akkusäure': 'Ácido de batería',
    'Bleichmittel': 'Blanqueador',
    'Bremsflüssigkeit': 'Líquido de frenos',
    'Brennspiritus': 'Alcohol de quemar',
    'Destilliertes Wasser': 'Agua destilada',
    'Druckerschwärze': 'Tinta de impresora',
    'Entwickler (fotografisch)': 'Revelador (fotográfico)',
    'Fixierbad (fotografisch)': 'Fijador (fotográfico)',
    'Fotochemikalien': 'Productos químicos fotográficos',
    'Frostschutzmittel': 'Anticongelante',
    'Galvanisierbäder': 'Baños de galvanizado',
    'Gerbsäure': 'Ácido tánico',
    'Gewürzextrakte': 'Extractos de especias',
    'Glasreiniger': 'Limpiacristales',
    'Haarfärbemittel': 'Tinte para el cabello',
    'Handwaschpaste': 'Pasta lavamanos',
    'Holzschutzmittel': 'Protector de madera',
    'Industrieabwässer': 'Aguas residuales industriales',
    'Insektizide': 'Insecticidas',
    'Kältemittel': 'Refrigerante',
    'Kalkwasser': 'Agua de cal',
    'Kernseife': 'Jabón de Marsella',
    'Kleister': 'Engrudo',
    'Kondensatoröl': 'Aceite de condensador',
    'Königswasser': 'Agua regia',
    'Kosmetika': 'Cosméticos',
    'Kraftstoff': 'Combustible',
    'Kühlwasser': 'Agua de refrigeración',
    'Kunststoffdispersion': 'Dispersión plástica',
    'Lackverdünner': 'Diluyente de pintura',
    'Lösungsmittel': 'Disolvente',
    'Magensäure': 'Ácido gástrico',
    'Meerwasser': 'Agua de mar',
    'Metallbeizen': 'Decapantes metálicos',
    'Molke': 'Suero de leche',
    'Natursaft': 'Jugo natural',
    'Pflanzenschutzmittel': 'Fitosanitarios',
    'Pharmazeutika': 'Productos farmacéuticos',
    'Reinigungsbenzin': 'Bencina de limpieza',
    'Rostschutzmittel': 'Antioxidante',
    'Rostumwandler': 'Convertidor de óxido',
    'Salzwasser': 'Agua salada',
    'Scheuermittel': 'Producto abrasivo',
    'Schneidöl': 'Aceite de corte',
    'Schwefelleber': 'Hígado de azufre',
    'Schwimmbadwasser': 'Agua de piscina',
    'Spülmittel': 'Lavavajillas',
    'Transformatorenöl': 'Aceite de transformador',
    'Trinkwasser': 'Agua potable',
    'Urin': 'Orina',
    'Waschbenzin': 'Bencina de lavado',
    'Weichmacher': 'Plastificante',
    'Zellstoff': 'Pulpa de celulosa',
}

def translate_chemical_name(german_name):
    """Translate a German chemical name to Spanish"""
    
    # Check for exact match first
    if german_name in EXACT_TRANSLATIONS:
        return EXACT_TRANSLATIONS[german_name]
    
    spanish = german_name
    
    # Apply translations from longest to shortest to avoid partial replacements
    sorted_terms = sorted(TRANSLATIONS.items(), key=lambda x: len(x[0]), reverse=True)
    
    for german, spanish_term in sorted_terms:
        if german in spanish:
            spanish = spanish.replace(german, spanish_term)
    
    return spanish

def main():
    # Load chemicals
    with open('data/chemicals.json', 'r', encoding='utf-8') as f:
        chemicals = json.load(f)
    
    print(f"Translating {len(chemicals)} chemicals to Spanish...")
    
    # Translate each chemical
    translated = 0
    for chem in chemicals:
        german_name = chem.get('name', '')
        spanish_name = translate_chemical_name(german_name)
        
        # Only add if translation is different
        if spanish_name != german_name:
            chem['name_es'] = spanish_name
            translated += 1
        else:
            # Keep original if no translation found
            chem['name_es'] = german_name
    
    # Save updated chemicals
    with open('data/chemicals.json', 'w', encoding='utf-8') as f:
        json.dump(chemicals, f, ensure_ascii=False, indent=2)
    
    print(f"Done! Translated {translated} chemicals.")
    print("\nSample translations:")
    for chem in chemicals[:20]:
        print(f"  {chem['name']} → {chem.get('name_es', chem['name'])}")

if __name__ == '__main__':
    main()
