#!/usr/bin/env python3
"""
Translate German chemical names to Portuguese
Uses pattern matching and term dictionary
"""

import json
import re

# German → Portuguese term translations
TERM_TRANSLATIONS = {
    # Common prefixes/suffixes
    'säure': 'ácido',
    'chlorid': 'cloreto',
    'fluorid': 'fluoreto',
    'bromid': 'brometo',
    'iodid': 'iodeto',
    'sulfat': 'sulfato',
    'sulfid': 'sulfeto',
    'sulfit': 'sulfito',
    'nitrat': 'nitrato',
    'nitrit': 'nitrito',
    'phosphat': 'fosfato',
    'carbonat': 'carbonato',
    'hydroxid': 'hidróxido',
    'oxid': 'óxido',
    'peroxid': 'peróxido',
    'acetat': 'acetato',
    'formiat': 'formiato',
    'citrat': 'citrato',
    'lactat': 'lactato',
    'oxalat': 'oxalato',
    'tartrat': 'tartarato',
    'benzoat': 'benzoato',
    'stearat': 'estearato',
    'oleat': 'oleato',
    'palmitat': 'palmitato',
    'silicat': 'silicato',
    'borat': 'borato',
    'chromat': 'cromato',
    'permanganat': 'permanganato',
    'molybdat': 'molibdato',
    'wolframat': 'tungstato',
    'vanadat': 'vanadato',
    'arsenat': 'arsenato',
    'arsenit': 'arsenito',
    'cyanid': 'cianeto',
    'cyanat': 'cianato',
    'thiocyanat': 'tiocianato',
    
    # Alcohols
    'alkohol': 'álcool',
    'methanol': 'metanol',
    'ethanol': 'etanol',
    'propanol': 'propanol',
    'butanol': 'butanol',
    'pentanol': 'pentanol',
    'hexanol': 'hexanol',
    'glycol': 'glicol',
    'glycerin': 'glicerina',
    
    # Acids
    'essigsäure': 'ácido acético',
    'salzsäure': 'ácido clorídrico',
    'schwefelsäure': 'ácido sulfúrico',
    'salpetersäure': 'ácido nítrico',
    'phosphorsäure': 'ácido fosfórico',
    'flusssäure': 'ácido fluorídrico',
    'ameisensäure': 'ácido fórmico',
    'milchsäure': 'ácido lático',
    'zitronensäure': 'ácido cítrico',
    'oxalsäure': 'ácido oxálico',
    'weinsäure': 'ácido tartárico',
    'benzoesäure': 'ácido benzóico',
    'stearinsäure': 'ácido esteárico',
    'ölsäure': 'ácido oleico',
    'palmitinsäure': 'ácido palmítico',
    'kohlensäure': 'ácido carbônico',
    'borsäure': 'ácido bórico',
    'chromsäure': 'ácido crômico',
    'perchlorsäure': 'ácido perclórico',
    'blausäure': 'ácido cianídrico',
    'kieselsäure': 'ácido silícico',
    'harnsäure': 'ácido úrico',
    'fettsäure': 'ácido graxo',
    'propionsäure': 'ácido propiônico',
    'buttersäure': 'ácido butírico',
    'bernsteinsäure': 'ácido succínico',
    'maleinsäure': 'ácido maleico',
    'fumarsäure': 'ácido fumárico',
    'acrylsäure': 'ácido acrílico',
    'adipinsäure': 'ácido adípico',
    'capronsäure': 'ácido caproico',
    'laurinsäure': 'ácido láurico',
    'myristinsäure': 'ácido mirístico',
    
    # Bases
    'natronlauge': 'solução de hidróxido de sódio',
    'kalilauge': 'solução de hidróxido de potássio',
    'ammoniak': 'amônia',
    'ammoniakwasser': 'água amoniacal',
    
    # Elements and compounds
    'wasserstoff': 'hidrogênio',
    'sauerstoff': 'oxigênio',
    'stickstoff': 'nitrogênio',
    'kohlenstoff': 'carbono',
    'schwefel': 'enxofre',
    'phosphor': 'fósforo',
    'chlor': 'cloro',
    'brom': 'bromo',
    'iod': 'iodo',
    'fluor': 'flúor',
    'eisen': 'ferro',
    'kupfer': 'cobre',
    'zink': 'zinco',
    'blei': 'chumbo',
    'aluminium': 'alumínio',
    'natrium': 'sódio',
    'kalium': 'potássio',
    'calcium': 'cálcio',
    'magnesium': 'magnésio',
    'barium': 'bário',
    'silber': 'prata',
    'gold': 'ouro',
    'platin': 'platina',
    'quecksilber': 'mercúrio',
    'nickel': 'níquel',
    'chrom': 'cromo',
    'mangan': 'manganês',
    'kobalt': 'cobalto',
    'zinn': 'estanho',
    'antimon': 'antimônio',
    'wismut': 'bismuto',
    'arsen': 'arsênio',
    'selen': 'selênio',
    'titan': 'titânio',
    'vanadium': 'vanádio',
    'wolfram': 'tungstênio',
    'molybdän': 'molibdênio',
    'cadmium': 'cádmio',
    'lithium': 'lítio',
    'beryllium': 'berílio',
    'strontium': 'estrôncio',
    
    # Common solvents
    'aceton': 'acetona',
    'benzol': 'benzeno',
    'toluol': 'tolueno',
    'xylol': 'xileno',
    'chloroform': 'clorofórmio',
    'tetrachlorkohlenstoff': 'tetracloreto de carbono',
    'ether': 'éter',
    'diethylether': 'éter dietílico',
    'petrolether': 'éter de petróleo',
    'benzin': 'gasolina',
    'petroleum': 'petróleo',
    'kerosin': 'querosene',
    'diesel': 'diesel',
    'heizöl': 'óleo combustível',
    'motoröl': 'óleo de motor',
    'hydrauliköl': 'óleo hidráulico',
    'schmieröl': 'óleo lubrificante',
    'mineralöl': 'óleo mineral',
    'silikonöl': 'óleo de silicone',
    'leinöl': 'óleo de linhaça',
    'olivenöl': 'azeite de oliva',
    'rizinusöl': 'óleo de rícino',
    'terpentin': 'terebintina',
    'terpentinöl': 'óleo de terebintina',
    
    # Misc compounds
    'wasser': 'água',
    'meerwasser': 'água do mar',
    'salzwasser': 'água salgada',
    'destilliertes wasser': 'água destilada',
    'trinkwasser': 'água potável',
    'leitungswasser': 'água da torneira',
    'abwasser': 'esgoto',
    'kochsalz': 'sal de cozinha',
    'natriumchlorid': 'cloreto de sódio',
    'kaliumchlorid': 'cloreto de potássio',
    'calciumchlorid': 'cloreto de cálcio',
    'zucker': 'açúcar',
    'glukose': 'glicose',
    'fruktose': 'frutose',
    'saccharose': 'sacarose',
    'stärke': 'amido',
    'zellulose': 'celulose',
    'harnstoff': 'ureia',
    'formaldehyd': 'formaldeído',
    'acetaldehyd': 'acetaldeído',
    'wasserstoffperoxid': 'peróxido de hidrogênio',
    'natriumhypochlorit': 'hipoclorito de sódio',
    'chlorkalk': 'cal clorada',
    'kalk': 'cal',
    'gips': 'gesso',
    'kreide': 'giz',
    'ton': 'argila',
    'zement': 'cimento',
    'beton': 'concreto',
    'seife': 'sabão',
    'waschmittel': 'detergente',
    'reinigungsmittel': 'produto de limpeza',
    'farbstoff': 'corante',
    'tinte': 'tinta',
    'lack': 'verniz',
    'farbe': 'tinta',
    'klebstoff': 'adesivo',
    'leim': 'cola',
    'harz': 'resina',
    'latex': 'látex',
    'gummi': 'borracha',
    'kautschuk': 'borracha natural',
    'silikon': 'silicone',
    
    # Concentration terms
    'wässrig': 'aquoso',
    'gesättigt': 'saturado',
    'verdünnt': 'diluído',
    'konzentriert': 'concentrado',
    'rein': 'puro',
    'techn. rein': 'grau técnico',
    'jede': 'qualquer',
    'gering': 'baixo',
    'flüssig': 'líquido',
    'gasförmig': 'gasoso',
    'geschmolzen': 'fundido',
    'trocken': 'seco',
    'feucht': 'úmido',
    'fest': 'sólido',
    
    # Other common terms
    'lösung': 'solução',
    'mischung': 'mistura',
    'verbindung': 'composto',
    'ester': 'éster',
    'aldehyd': 'aldeído',
    'keton': 'cetona',
    'amin': 'amina',
    'amid': 'amida',
    'anhydrid': 'anidrido',
    'phenol': 'fenol',
    'nitril': 'nitrila',
}

# Additional manual translations for complex names
ADDITIONAL_TRANSLATIONS = {
    'abgase, alkalisch': 'Gases de escape, alcalinos',
    'abgase, fluorwasserstoffhaltig': 'Gases de escape contendo ácido fluorídrico',
    'abgase, kohlendioxidhaltig': 'Gases de escape contendo dióxido de carbono',
    'abgase, nitrosehaltig': 'Gases de escape contendo óxidos de nitrogênio',
    'abgase, salzsäurehaltig': 'Gases de escape contendo ácido clorídrico',
    'abgase, schwefeldioxidhaltig': 'Gases de escape contendo dióxido de enxofre',
    'abgase, schwefelsäurehaltig': 'Gases de escape contendo ácido sulfúrico',
    'abgase, schwefeltrioxidhaltig': 'Gases de escape contendo trióxido de enxofre',
    'acetamid': 'Acetamida',
    'aceton': 'Acetona',
    'acetonitril': 'Acetonitrila',
    'acetophenon': 'Acetofenona',
    'acetylen': 'Acetileno',
    'acrylnitril': 'Acrilonitrila',
    'adipinsäure': 'Ácido Adípico',
    'akkusäure': 'Ácido de Bateria',
    'alanin': 'Alanina',
    'alaune': 'Alúmen',
    'allylalkohol': 'Álcool Alílico',
    'allylchlorid': 'Cloreto de Alila',
    'aluminiumchlorid': 'Cloreto de Alumínio',
    'aluminiumfluorid': 'Fluoreto de Alumínio',
    'aluminiumhydroxid': 'Hidróxido de Alumínio',
    'aluminiumnitrat': 'Nitrato de Alumínio',
    'aluminiumoxid': 'Óxido de Alumínio',
    'aluminiumsulfat': 'Sulfato de Alumínio',
    'ameisensäure': 'Ácido Fórmico',
    'aminoessigsäure': 'Glicina',
    'ammoniak': 'Amônia',
    'ammoniakwasser': 'Água Amoniacal',
    'ammoniumacetat': 'Acetato de Amônio',
    'ammoniumcarbonat': 'Carbonato de Amônio',
    'ammoniumchlorid': 'Cloreto de Amônio',
    'ammoniumfluorid': 'Fluoreto de Amônio',
    'ammoniumhydroxid': 'Hidróxido de Amônio',
    'ammoniumnitrat': 'Nitrato de Amônio',
    'ammoniumsulfat': 'Sulfato de Amônio',
    'amylacetat': 'Acetato de Amila',
    'amylalkohol': 'Álcool Amílico',
    'anilin': 'Anilina',
    'antimon': 'Antimônio',
    'bariumchlorid': 'Cloreto de Bário',
    'bariumhydroxid': 'Hidróxido de Bário',
    'bariumsulfat': 'Sulfato de Bário',
    'benzaldehyd': 'Benzaldeído',
    'benzin': 'Gasolina',
    'benzol': 'Benzeno',
    'benzoesäure': 'Ácido Benzóico',
    'benzylalkohol': 'Álcool Benzílico',
    'bier': 'Cerveja',
    'bitumen': 'Betume',
    'blausäure': 'Ácido Cianídrico',
    'bleiacetât': 'Acetato de Chumbo',
    'bleichlauge': 'Solução de Branqueamento',
    'bleinitrat': 'Nitrato de Chumbo',
    'borsäure': 'Ácido Bórico',
    'borax': 'Bórax',
    'brom': 'Bromo',
    'bromwasser': 'Água de Bromo',
    'butandiol': 'Butanodiol',
    'butanol': 'Butanol',
    'buttersäure': 'Ácido Butírico',
    'butylacetat': 'Acetato de Butila',
    'calciumcarbonat': 'Carbonato de Cálcio',
    'calciumchlorid': 'Cloreto de Cálcio',
    'calciumhydroxid': 'Hidróxido de Cálcio',
    'calciumnitrat': 'Nitrato de Cálcio',
    'calciumsulfat': 'Sulfato de Cálcio',
    'chlor': 'Cloro',
    'chlorbenzol': 'Clorobenzeno',
    'chloroform': 'Clorofórmio',
    'chlorwasser': 'Água Clorada',
    'chromsäure': 'Ácido Crômico',
    'cyclohexan': 'Ciclo-hexano',
    'cyclohexanol': 'Ciclo-hexanol',
    'cyclohexanon': 'Ciclo-hexanona',
    'dekalin': 'Decalina',
    'destilliertes wasser': 'Água Destilada',
    'diesel': 'Diesel',
    'diethylamin': 'Dietilamina',
    'diethylether': 'Éter Dietílico',
    'dimethylformamid': 'Dimetilformamida',
    'dioxan': 'Dioxano',
    'eisenchlorid': 'Cloreto de Ferro',
    'eisensulfat': 'Sulfato de Ferro',
    'essig': 'Vinagre',
    'essigsäure': 'Ácido Acético',
    'essigsäureanhydrid': 'Anidrido Acético',
    'ethanol': 'Etanol',
    'ethylacetat': 'Acetato de Etila',
    'ethylbenzol': 'Etilbenzeno',
    'ethylenglycol': 'Etilenoglicol',
    'fettsäure': 'Ácido Graxo',
    'fluor': 'Flúor',
    'flusssäure': 'Ácido Fluorídrico',
    'formaldehyd': 'Formaldeído',
    'formalin': 'Formalina',
    'fruchtsäure': 'Ácido de Frutas',
    'fruktose': 'Frutose',
    'furfural': 'Furfural',
    'gelatine': 'Gelatina',
    'glukose': 'Glicose',
    'glutaraldehyd': 'Glutaraldeído',
    'glycerin': 'Glicerina',
    'glycol': 'Glicol',
    'glykolsäure': 'Ácido Glicólico',
    'harnstoff': 'Ureia',
    'heizöl': 'Óleo Combustível',
    'heptan': 'Heptano',
    'hexan': 'Hexano',
    'hydrauliköl': 'Óleo Hidráulico',
    'iod': 'Iodo',
    'isopropanol': 'Isopropanol',
    'kaliumcarbonat': 'Carbonato de Potássio',
    'kaliumchlorid': 'Cloreto de Potássio',
    'kaliumhydroxid': 'Hidróxido de Potássio',
    'kaliumnitrat': 'Nitrato de Potássio',
    'kaliumsulfat': 'Sulfato de Potássio',
    'kalilauge': 'Solução de Hidróxido de Potássio',
    'kaliumpermanganat': 'Permanganato de Potássio',
    'kerosin': 'Querosene',
    'kochsalzlösung': 'Solução Salina',
    'kohlensäure': 'Ácido Carbônico',
    'kohlenwasserstoff': 'Hidrocarboneto',
    'kupferchlorid': 'Cloreto de Cobre',
    'kupfersulfat': 'Sulfato de Cobre',
    'leinöl': 'Óleo de Linhaça',
    'lithiumchlorid': 'Cloreto de Lítio',
    'magnesiumchlorid': 'Cloreto de Magnésio',
    'magnesiumhydroxid': 'Hidróxido de Magnésio',
    'magnesiumsulfat': 'Sulfato de Magnésio',
    'maleinsäure': 'Ácido Maleico',
    'meerwasser': 'Água do Mar',
    'methanol': 'Metanol',
    'methylacetat': 'Acetato de Metila',
    'methylalkohol': 'Álcool Metílico',
    'methylenchlorid': 'Diclorometano',
    'milch': 'Leite',
    'milchsäure': 'Ácido Lático',
    'mineralöl': 'Óleo Mineral',
    'motoröl': 'Óleo de Motor',
    'naphthalin': 'Naftaleno',
    'natriumacetat': 'Acetato de Sódio',
    'natriumcarbonat': 'Carbonato de Sódio',
    'natriumchlorid': 'Cloreto de Sódio',
    'natriumhydroxid': 'Hidróxido de Sódio',
    'natriumhypochlorit': 'Hipoclorito de Sódio',
    'natriumnitrat': 'Nitrato de Sódio',
    'natriumsulfat': 'Sulfato de Sódio',
    'natronlauge': 'Solução de Soda Cáustica',
    'nickelchlorid': 'Cloreto de Níquel',
    'nickelsulfat': 'Sulfato de Níquel',
    'nitrobenzol': 'Nitrobenzeno',
    'octan': 'Octano',
    'olivenöl': 'Azeite de Oliva',
    'oxalsäure': 'Ácido Oxálico',
    'paraffin': 'Parafina',
    'pentan': 'Pentano',
    'perchlorsäure': 'Ácido Perclórico',
    'petroleum': 'Petróleo',
    'phenol': 'Fenol',
    'phosphorsäure': 'Ácido Fosfórico',
    'propanol': 'Propanol',
    'propionsäure': 'Ácido Propiônico',
    'propylenglycol': 'Propilenoglicol',
    'pyridin': 'Piridina',
    'quecksilber': 'Mercúrio',
    'quecksilberchlorid': 'Cloreto de Mercúrio',
    'salpetersäure': 'Ácido Nítrico',
    'salzsäure': 'Ácido Clorídrico',
    'schwefeldioxid': 'Dióxido de Enxofre',
    'schwefelsäure': 'Ácido Sulfúrico',
    'schwefelwasserstoff': 'Sulfeto de Hidrogênio',
    'seife': 'Sabão',
    'seifenlauge': 'Água com Sabão',
    'silikonöl': 'Óleo de Silicone',
    'silbernitrat': 'Nitrato de Prata',
    'stärke': 'Amido',
    'stearinsäure': 'Ácido Esteárico',
    'styrol': 'Estireno',
    'terpentin': 'Terebintina',
    'terpentinöl': 'Óleo de Terebintina',
    'tetrahydrofuran': 'Tetra-hidrofurano',
    'thf': 'THF',
    'toluol': 'Tolueno',
    'trichlorethylen': 'Tricloroetileno',
    'triethylamin': 'Trietilamina',
    'wasser': 'Água',
    'wasserstoffperoxid': 'Peróxido de Hidrogênio',
    'wein': 'Vinho',
    'weinsäure': 'Ácido Tartárico',
    'xylol': 'Xileno',
    'zinkchlorid': 'Cloreto de Zinco',
    'zinksulfat': 'Sulfato de Zinco',
    'zinnchlorid': 'Cloreto de Estanho',
    'zitronensäure': 'Ácido Cítrico',
    'zucker': 'Açúcar',
}

def translate_chemical(german_name):
    """Translate a German chemical name to Portuguese"""
    lower = german_name.lower().strip()
    
    # Check additional translations first (manually curated)
    if lower in ADDITIONAL_TRANSLATIONS:
        return ADDITIONAL_TRANSLATIONS[lower]
    
    # Try direct term translations
    result = lower
    for de, pt in sorted(TERM_TRANSLATIONS.items(), key=lambda x: -len(x[0])):
        if de in result:
            result = result.replace(de, pt)
    
    # Capitalize properly
    if result != lower:
        # Title case with some exceptions
        words = result.split()
        capitalized = []
        skip_caps = {'de', 'do', 'da', 'dos', 'das', 'e', 'em', 'com'}
        for i, word in enumerate(words):
            if i == 0 or word not in skip_caps:
                capitalized.append(word.capitalize())
            else:
                capitalized.append(word)
        return ' '.join(capitalized)
    
    # Return original with first letter capitalized if no translation
    return german_name

def main():
    # Load chemicals
    with open('data/chemicals_burkle_full.json', 'r', encoding='utf-8') as f:
        chemicals = json.load(f)
    
    # Build translations
    translations = {}
    for chem in chemicals:
        german_name = chem['name']
        lower = german_name.lower()
        if lower not in translations:
            pt_name = translate_chemical(german_name)
            translations[lower] = pt_name
    
    # Sort by key
    sorted_translations = dict(sorted(translations.items()))
    
    # Generate JS file
    js_content = "// German → Portuguese chemical name translations\n"
    js_content += f"// Auto-generated - {len(sorted_translations)} translations\n"
    js_content += "const chemicalTranslations = {\n"
    
    for key, value in sorted_translations.items():
        # Escape single quotes
        escaped_key = key.replace("'", "\\'")
        escaped_value = value.replace("'", "\\'")
        js_content += f"    '{escaped_key}': '{escaped_value}',\n"
    
    js_content += "};\n"
    
    # Write output
    with open('js/chemical_translations_pt.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"Generated {len(sorted_translations)} translations")
    print("Output: js/chemical_translations_pt.js")

if __name__ == '__main__':
    main()
