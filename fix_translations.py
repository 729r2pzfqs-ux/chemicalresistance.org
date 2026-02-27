#!/usr/bin/env python3
"""Fix untranslated chemical names across all languages."""
import re
import json

# German → Target language dictionaries
# Structure: { 'german_term': {'en': 'English', 'es': 'Spanish', 'fr': 'French', 'pt': 'Portuguese'} }

TERM_TRANSLATIONS = {
    # Acids
    'säure': {'en': 'acid', 'es': 'ácido', 'fr': 'acide', 'pt': 'ácido'},
    'essigsäure': {'en': 'acetic acid', 'es': 'ácido acético', 'fr': 'acide acétique', 'pt': 'ácido acético'},
    'salzsäure': {'en': 'hydrochloric acid', 'es': 'ácido clorhídrico', 'fr': 'acide chlorhydrique', 'pt': 'ácido clorídrico'},
    'schwefelsäure': {'en': 'sulfuric acid', 'es': 'ácido sulfúrico', 'fr': 'acide sulfurique', 'pt': 'ácido sulfúrico'},
    'salpetersäure': {'en': 'nitric acid', 'es': 'ácido nítrico', 'fr': 'acide nitrique', 'pt': 'ácido nítrico'},
    'phosphorsäure': {'en': 'phosphoric acid', 'es': 'ácido fosfórico', 'fr': 'acide phosphorique', 'pt': 'ácido fosfórico'},
    'flusssäure': {'en': 'hydrofluoric acid', 'es': 'ácido fluorhídrico', 'fr': 'acide fluorhydrique', 'pt': 'ácido fluorídrico'},
    'ameisensäure': {'en': 'formic acid', 'es': 'ácido fórmico', 'fr': 'acide formique', 'pt': 'ácido fórmico'},
    'zitronensäure': {'en': 'citric acid', 'es': 'ácido cítrico', 'fr': 'acide citrique', 'pt': 'ácido cítrico'},
    'milchsäure': {'en': 'lactic acid', 'es': 'ácido láctico', 'fr': 'acide lactique', 'pt': 'ácido lático'},
    'oxalsäure': {'en': 'oxalic acid', 'es': 'ácido oxálico', 'fr': 'acide oxalique', 'pt': 'ácido oxálico'},
    'benzoesäure': {'en': 'benzoic acid', 'es': 'ácido benzoico', 'fr': 'acide benzoïque', 'pt': 'ácido benzóico'},
    'weinsäure': {'en': 'tartaric acid', 'es': 'ácido tartárico', 'fr': 'acide tartrique', 'pt': 'ácido tartárico'},
    'bernsteinsäure': {'en': 'succinic acid', 'es': 'ácido succínico', 'fr': 'acide succinique', 'pt': 'ácido succínico'},
    'malonsäure': {'en': 'malonic acid', 'es': 'ácido malónico', 'fr': 'acide malonique', 'pt': 'ácido malónico'},
    'adipinsäure': {'en': 'adipic acid', 'es': 'ácido adípico', 'fr': 'acide adipique', 'pt': 'ácido adípico'},
    'stearinsäure': {'en': 'stearic acid', 'es': 'ácido esteárico', 'fr': 'acide stéarique', 'pt': 'ácido esteárico'},
    'ölsäure': {'en': 'oleic acid', 'es': 'ácido oleico', 'fr': 'acide oléique', 'pt': 'ácido oleico'},
    'palmitinsäure': {'en': 'palmitic acid', 'es': 'ácido palmítico', 'fr': 'acide palmitique', 'pt': 'ácido palmítico'},
    'acrylsäure': {'en': 'acrylic acid', 'es': 'ácido acrílico', 'fr': 'acide acrylique', 'pt': 'ácido acrílico'},
    'buttersäure': {'en': 'butyric acid', 'es': 'ácido butírico', 'fr': 'acide butyrique', 'pt': 'ácido butírico'},
    'propionsäure': {'en': 'propionic acid', 'es': 'ácido propiónico', 'fr': 'acide propionique', 'pt': 'ácido propiônico'},
    'capronsäure': {'en': 'caproic acid', 'es': 'ácido caproico', 'fr': 'acide caproïque', 'pt': 'ácido capróico'},
    'chromsäure': {'en': 'chromic acid', 'es': 'ácido crómico', 'fr': 'acide chromique', 'pt': 'ácido crômico'},
    'borsäure': {'en': 'boric acid', 'es': 'ácido bórico', 'fr': 'acide borique', 'pt': 'ácido bórico'},
    'kohlensäure': {'en': 'carbonic acid', 'es': 'ácido carbónico', 'fr': 'acide carbonique', 'pt': 'ácido carbônico'},
    'kieselsäure': {'en': 'silicic acid', 'es': 'ácido silícico', 'fr': 'acide silicique', 'pt': 'ácido silícico'},
    'blausäure': {'en': 'hydrocyanic acid', 'es': 'ácido cianhídrico', 'fr': 'acide cyanhydrique', 'pt': 'ácido cianídrico'},
    'fettsäure': {'en': 'fatty acid', 'es': 'ácido graso', 'fr': 'acide gras', 'pt': 'ácido graxo'},
    'gerbsäure': {'en': 'tannic acid', 'es': 'ácido tánico', 'fr': 'acide tannique', 'pt': 'ácido tânico'},
    'harnsäure': {'en': 'uric acid', 'es': 'ácido úrico', 'fr': 'acide urique', 'pt': 'ácido úrico'},
    'phthalsäure': {'en': 'phthalic acid', 'es': 'ácido ftálico', 'fr': 'acide phtalique', 'pt': 'ácido ftálico'},
    'sebacinsäure': {'en': 'sebacic acid', 'es': 'ácido sebácico', 'fr': 'acide sébacique', 'pt': 'ácido sebácico'},
    'salicylsäure': {'en': 'salicylic acid', 'es': 'ácido salicílico', 'fr': 'acide salicylique', 'pt': 'ácido salicílico'},
    'arsensäure': {'en': 'arsenic acid', 'es': 'ácido arsénico', 'fr': 'acide arsénique', 'pt': 'ácido arsênico'},
    'schwefligsäure': {'en': 'sulfurous acid', 'es': 'ácido sulfuroso', 'fr': 'acide sulfureux', 'pt': 'ácido sulfuroso'},
    'chloressigsäure': {'en': 'chloroacetic acid', 'es': 'ácido cloroacético', 'fr': 'acide chloroacétique', 'pt': 'ácido cloroacético'},
    'dichloressigsäure': {'en': 'dichloroacetic acid', 'es': 'ácido dicloroacético', 'fr': 'acide dichloroacétique', 'pt': 'ácido dicloroacético'},
    'trichloressigsäure': {'en': 'trichloroacetic acid', 'es': 'ácido tricloroacético', 'fr': 'acide trichloroacétique', 'pt': 'ácido tricloroacético'},
    'cyanwasserstoffsäure': {'en': 'hydrocyanic acid', 'es': 'ácido cianhídrico', 'fr': 'acide cyanhydrique', 'pt': 'ácido cianídrico'},
    'chlorwasserstoffsäure': {'en': 'hydrochloric acid', 'es': 'ácido clorhídrico', 'fr': 'acide chlorhydrique', 'pt': 'ácido clorídrico'},
    'fluorwasserstoffsäure': {'en': 'hydrofluoric acid', 'es': 'ácido fluorhídrico', 'fr': 'acide fluorhydrique', 'pt': 'ácido fluorídrico'},
    'bromwasserstoffsäure': {'en': 'hydrobromic acid', 'es': 'ácido bromhídrico', 'fr': 'acide bromhydrique', 'pt': 'ácido bromídrico'},
    'fruchtsäure': {'en': 'fruit acid', 'es': 'ácido de frutas', 'fr': 'acide de fruits', 'pt': 'ácido de frutas'},
    
    # Solutions/liquids
    'lösung': {'en': 'solution', 'es': 'solución', 'fr': 'solution', 'pt': 'solução'},
    'lauge': {'en': 'lye', 'es': 'lejía', 'fr': 'lessive', 'pt': 'soda cáustica'},
    'wasser': {'en': 'water', 'es': 'agua', 'fr': 'eau', 'pt': 'água'},
    'flüssigkeit': {'en': 'liquid', 'es': 'líquido', 'fr': 'liquide', 'pt': 'líquido'},
    'dampf': {'en': 'steam', 'es': 'vapor', 'fr': 'vapeur', 'pt': 'vapor'},
    'gas': {'en': 'gas', 'es': 'gas', 'fr': 'gaz', 'pt': 'gás'},
    
    # Salts and compounds
    'chlorid': {'en': 'chloride', 'es': 'cloruro', 'fr': 'chlorure', 'pt': 'cloreto'},
    'bromid': {'en': 'bromide', 'es': 'bromuro', 'fr': 'bromure', 'pt': 'brometo'},
    'fluorid': {'en': 'fluoride', 'es': 'fluoruro', 'fr': 'fluorure', 'pt': 'fluoreto'},
    'iodid': {'en': 'iodide', 'es': 'yoduro', 'fr': 'iodure', 'pt': 'iodeto'},
    'oxid': {'en': 'oxide', 'es': 'óxido', 'fr': 'oxyde', 'pt': 'óxido'},
    'hydroxid': {'en': 'hydroxide', 'es': 'hidróxido', 'fr': 'hydroxyde', 'pt': 'hidróxido'},
    'sulfid': {'en': 'sulfide', 'es': 'sulfuro', 'fr': 'sulfure', 'pt': 'sulfeto'},
    'sulfat': {'en': 'sulfate', 'es': 'sulfato', 'fr': 'sulfate', 'pt': 'sulfato'},
    'sulfit': {'en': 'sulfite', 'es': 'sulfito', 'fr': 'sulfite', 'pt': 'sulfito'},
    'nitrat': {'en': 'nitrate', 'es': 'nitrato', 'fr': 'nitrate', 'pt': 'nitrato'},
    'nitrit': {'en': 'nitrite', 'es': 'nitrito', 'fr': 'nitrite', 'pt': 'nitrito'},
    'carbonat': {'en': 'carbonate', 'es': 'carbonato', 'fr': 'carbonate', 'pt': 'carbonato'},
    'phosphat': {'en': 'phosphate', 'es': 'fosfato', 'fr': 'phosphate', 'pt': 'fosfato'},
    'acetat': {'en': 'acetate', 'es': 'acetato', 'fr': 'acétate', 'pt': 'acetato'},
    'cyanid': {'en': 'cyanide', 'es': 'cianuro', 'fr': 'cyanure', 'pt': 'cianeto'},
    'peroxid': {'en': 'peroxide', 'es': 'peróxido', 'fr': 'peroxyde', 'pt': 'peróxido'},
    'dioxid': {'en': 'dioxide', 'es': 'dióxido', 'fr': 'dioxyde', 'pt': 'dióxido'},
    'monoxid': {'en': 'monoxide', 'es': 'monóxido', 'fr': 'monoxyde', 'pt': 'monóxido'},
    'trioxid': {'en': 'trioxide', 'es': 'trióxido', 'fr': 'trioxyde', 'pt': 'trióxido'},
    'tetroxid': {'en': 'tetroxide', 'es': 'tetróxido', 'fr': 'tétroxyde', 'pt': 'tetróxido'},
    'silikat': {'en': 'silicate', 'es': 'silicato', 'fr': 'silicate', 'pt': 'silicato'},
    'borat': {'en': 'borate', 'es': 'borato', 'fr': 'borate', 'pt': 'borato'},
    'chromat': {'en': 'chromate', 'es': 'cromato', 'fr': 'chromate', 'pt': 'cromato'},
    'permanganat': {'en': 'permanganate', 'es': 'permanganato', 'fr': 'permanganate', 'pt': 'permanganato'},
    'hypochlorit': {'en': 'hypochlorite', 'es': 'hipoclorito', 'fr': 'hypochlorite', 'pt': 'hipoclorito'},
    'chlorat': {'en': 'chlorate', 'es': 'clorato', 'fr': 'chlorate', 'pt': 'clorato'},
    'perchlorat': {'en': 'perchlorate', 'es': 'perclorato', 'fr': 'perchlorate', 'pt': 'perclorato'},
    
    # Elements
    'wasserstoff': {'en': 'hydrogen', 'es': 'hidrógeno', 'fr': 'hydrogène', 'pt': 'hidrogênio'},
    'sauerstoff': {'en': 'oxygen', 'es': 'oxígeno', 'fr': 'oxygène', 'pt': 'oxigênio'},
    'stickstoff': {'en': 'nitrogen', 'es': 'nitrógeno', 'fr': 'azote', 'pt': 'nitrogênio'},
    'kohlenstoff': {'en': 'carbon', 'es': 'carbono', 'fr': 'carbone', 'pt': 'carbono'},
    'schwefel': {'en': 'sulfur', 'es': 'azufre', 'fr': 'soufre', 'pt': 'enxofre'},
    'phosphor': {'en': 'phosphorus', 'es': 'fósforo', 'fr': 'phosphore', 'pt': 'fósforo'},
    'kalium': {'en': 'potassium', 'es': 'potasio', 'fr': 'potassium', 'pt': 'potássio'},
    'natrium': {'en': 'sodium', 'es': 'sodio', 'fr': 'sodium', 'pt': 'sódio'},
    'calcium': {'en': 'calcium', 'es': 'calcio', 'fr': 'calcium', 'pt': 'cálcio'},
    'magnesium': {'en': 'magnesium', 'es': 'magnesio', 'fr': 'magnésium', 'pt': 'magnésio'},
    'eisen': {'en': 'iron', 'es': 'hierro', 'fr': 'fer', 'pt': 'ferro'},
    'kupfer': {'en': 'copper', 'es': 'cobre', 'fr': 'cuivre', 'pt': 'cobre'},
    'zink': {'en': 'zinc', 'es': 'zinc', 'fr': 'zinc', 'pt': 'zinco'},
    'blei': {'en': 'lead', 'es': 'plomo', 'fr': 'plomb', 'pt': 'chumbo'},
    'quecksilber': {'en': 'mercury', 'es': 'mercurio', 'fr': 'mercure', 'pt': 'mercúrio'},
    'silber': {'en': 'silver', 'es': 'plata', 'fr': 'argent', 'pt': 'prata'},
    'gold': {'en': 'gold', 'es': 'oro', 'fr': 'or', 'pt': 'ouro'},
    'aluminium': {'en': 'aluminum', 'es': 'aluminio', 'fr': 'aluminium', 'pt': 'alumínio'},
    'barium': {'en': 'barium', 'es': 'bario', 'fr': 'baryum', 'pt': 'bário'},
    'chrom': {'en': 'chromium', 'es': 'cromo', 'fr': 'chrome', 'pt': 'cromo'},
    'kobalt': {'en': 'cobalt', 'es': 'cobalto', 'fr': 'cobalt', 'pt': 'cobalto'},
    'mangan': {'en': 'manganese', 'es': 'manganeso', 'fr': 'manganèse', 'pt': 'manganês'},
    'nickel': {'en': 'nickel', 'es': 'níquel', 'fr': 'nickel', 'pt': 'níquel'},
    'zinn': {'en': 'tin', 'es': 'estaño', 'fr': 'étain', 'pt': 'estanho'},
    'titan': {'en': 'titanium', 'es': 'titanio', 'fr': 'titane', 'pt': 'titânio'},
    'chlor': {'en': 'chlorine', 'es': 'cloro', 'fr': 'chlore', 'pt': 'cloro'},
    'brom': {'en': 'bromine', 'es': 'bromo', 'fr': 'brome', 'pt': 'bromo'},
    'fluor': {'en': 'fluorine', 'es': 'flúor', 'fr': 'fluor', 'pt': 'flúor'},
    'jod': {'en': 'iodine', 'es': 'yodo', 'fr': 'iode', 'pt': 'iodo'},
    
    # Organic compound classes
    'alkohol': {'en': 'alcohol', 'es': 'alcohol', 'fr': 'alcool', 'pt': 'álcool'},
    'aldehyd': {'en': 'aldehyde', 'es': 'aldehído', 'fr': 'aldéhyde', 'pt': 'aldeído'},
    'keton': {'en': 'ketone', 'es': 'cetona', 'fr': 'cétone', 'pt': 'cetona'},
    'äther': {'en': 'ether', 'es': 'éter', 'fr': 'éther', 'pt': 'éter'},
    'ester': {'en': 'ester', 'es': 'éster', 'fr': 'ester', 'pt': 'éster'},
    'amin': {'en': 'amine', 'es': 'amina', 'fr': 'amine', 'pt': 'amina'},
    'amid': {'en': 'amide', 'es': 'amida', 'fr': 'amide', 'pt': 'amida'},
    'nitril': {'en': 'nitrile', 'es': 'nitrilo', 'fr': 'nitrile', 'pt': 'nitrila'},
    'anhydrid': {'en': 'anhydride', 'es': 'anhídrido', 'fr': 'anhydride', 'pt': 'anidrido'},
    'benzol': {'en': 'benzene', 'es': 'benceno', 'fr': 'benzène', 'pt': 'benzeno'},
    'toluol': {'en': 'toluene', 'es': 'tolueno', 'fr': 'toluène', 'pt': 'tolueno'},
    'xylol': {'en': 'xylene', 'es': 'xileno', 'fr': 'xylène', 'pt': 'xileno'},
    'phenol': {'en': 'phenol', 'es': 'fenol', 'fr': 'phénol', 'pt': 'fenol'},
    'naphthalin': {'en': 'naphthalene', 'es': 'naftaleno', 'fr': 'naphtalène', 'pt': 'naftaleno'},
    'glycol': {'en': 'glycol', 'es': 'glicol', 'fr': 'glycol', 'pt': 'glicol'},
    'glycerin': {'en': 'glycerin', 'es': 'glicerina', 'fr': 'glycérine', 'pt': 'glicerina'},
    
    # Solvents & fuels
    'öl': {'en': 'oil', 'es': 'aceite', 'fr': 'huile', 'pt': 'óleo'},
    'fett': {'en': 'fat/grease', 'es': 'grasa', 'fr': 'graisse', 'pt': 'gordura'},
    'wachs': {'en': 'wax', 'es': 'cera', 'fr': 'cire', 'pt': 'cera'},
    'harz': {'en': 'resin', 'es': 'resina', 'fr': 'résine', 'pt': 'resina'},
    'lack': {'en': 'lacquer', 'es': 'laca', 'fr': 'laque', 'pt': 'laca'},
    'farbe': {'en': 'paint', 'es': 'pintura', 'fr': 'peinture', 'pt': 'tinta'},
    'tinte': {'en': 'ink', 'es': 'tinta', 'fr': 'encre', 'pt': 'tinta'},
    'kraftstoff': {'en': 'fuel', 'es': 'combustible', 'fr': 'carburant', 'pt': 'combustível'},
    'benzin': {'en': 'gasoline', 'es': 'gasolina', 'fr': 'essence', 'pt': 'gasolina'},
    'diesel': {'en': 'diesel', 'es': 'diésel', 'fr': 'diesel', 'pt': 'diesel'},
    'kerosin': {'en': 'kerosene', 'es': 'queroseno', 'fr': 'kérosène', 'pt': 'querosene'},
    'terpentin': {'en': 'turpentine', 'es': 'trementina', 'fr': 'térébenthine', 'pt': 'terebintina'},
    
    # Common compounds
    'ammoniak': {'en': 'ammonia', 'es': 'amoníaco', 'fr': 'ammoniac', 'pt': 'amônia'},
    'ammonium': {'en': 'ammonium', 'es': 'amonio', 'fr': 'ammonium', 'pt': 'amônio'},
    'salz': {'en': 'salt', 'es': 'sal', 'fr': 'sel', 'pt': 'sal'},
    'zucker': {'en': 'sugar', 'es': 'azúcar', 'fr': 'sucre', 'pt': 'açúcar'},
    'seife': {'en': 'soap', 'es': 'jabón', 'fr': 'savon', 'pt': 'sabão'},
    'essig': {'en': 'vinegar', 'es': 'vinagre', 'fr': 'vinaigre', 'pt': 'vinagre'},
    'milch': {'en': 'milk', 'es': 'leche', 'fr': 'lait', 'pt': 'leite'},
    'bier': {'en': 'beer', 'es': 'cerveza', 'fr': 'bière', 'pt': 'cerveja'},
    'wein': {'en': 'wine', 'es': 'vino', 'fr': 'vin', 'pt': 'vinho'},
    'saft': {'en': 'juice', 'es': 'jugo', 'fr': 'jus', 'pt': 'suco'},
    'sirup': {'en': 'syrup', 'es': 'jarabe', 'fr': 'sirop', 'pt': 'xarope'},
    'honig': {'en': 'honey', 'es': 'miel', 'fr': 'miel', 'pt': 'mel'},
    
    # Prefixes/modifiers
    'rein': {'en': 'pure', 'es': 'puro', 'fr': 'pur', 'pt': 'puro'},
    'trocken': {'en': 'dry', 'es': 'seco', 'fr': 'sec', 'pt': 'seco'},
    'feucht': {'en': 'wet/moist', 'es': 'húmedo', 'fr': 'humide', 'pt': 'úmido'},
    'geschmolzen': {'en': 'molten', 'es': 'fundido', 'fr': 'fondu', 'pt': 'fundido'},
    'wässrig': {'en': 'aqueous', 'es': 'acuoso', 'fr': 'aqueux', 'pt': 'aquoso'},
    'konzentriert': {'en': 'concentrated', 'es': 'concentrado', 'fr': 'concentré', 'pt': 'concentrado'},
    'verdünnt': {'en': 'diluted', 'es': 'diluido', 'fr': 'dilué', 'pt': 'diluído'},
    'gesättigt': {'en': 'saturated', 'es': 'saturado', 'fr': 'saturé', 'pt': 'saturado'},
    
    # Specific common chemicals
    'aceton': {'en': 'acetone', 'es': 'acetona', 'fr': 'acétone', 'pt': 'acetona'},
    'formaldehyd': {'en': 'formaldehyde', 'es': 'formaldehído', 'fr': 'formaldéhyde', 'pt': 'formaldeído'},
    'methanol': {'en': 'methanol', 'es': 'metanol', 'fr': 'méthanol', 'pt': 'metanol'},
    'ethanol': {'en': 'ethanol', 'es': 'etanol', 'fr': 'éthanol', 'pt': 'etanol'},
    'propanol': {'en': 'propanol', 'es': 'propanol', 'fr': 'propanol', 'pt': 'propanol'},
    'butanol': {'en': 'butanol', 'es': 'butanol', 'fr': 'butanol', 'pt': 'butanol'},
    'methan': {'en': 'methane', 'es': 'metano', 'fr': 'méthane', 'pt': 'metano'},
    'ethan': {'en': 'ethane', 'es': 'etano', 'fr': 'éthane', 'pt': 'etano'},
    'propan': {'en': 'propane', 'es': 'propano', 'fr': 'propane', 'pt': 'propano'},
    'butan': {'en': 'butane', 'es': 'butano', 'fr': 'butane', 'pt': 'butano'},
    'pentan': {'en': 'pentane', 'es': 'pentano', 'fr': 'pentane', 'pt': 'pentano'},
    'hexan': {'en': 'hexane', 'es': 'hexano', 'fr': 'hexane', 'pt': 'hexano'},
    'heptan': {'en': 'heptane', 'es': 'heptano', 'fr': 'heptane', 'pt': 'heptano'},
    'octan': {'en': 'octane', 'es': 'octano', 'fr': 'octane', 'pt': 'octano'},
    'ethen': {'en': 'ethene', 'es': 'eteno', 'fr': 'éthène', 'pt': 'eteno'},
    'propen': {'en': 'propene', 'es': 'propeno', 'fr': 'propène', 'pt': 'propeno'},
    'ethylen': {'en': 'ethylene', 'es': 'etileno', 'fr': 'éthylène', 'pt': 'etileno'},
    'propylen': {'en': 'propylene', 'es': 'propileno', 'fr': 'propylène', 'pt': 'propileno'},
    'butylen': {'en': 'butylene', 'es': 'butileno', 'fr': 'butylène', 'pt': 'butileno'},
    'styrol': {'en': 'styrene', 'es': 'estireno', 'fr': 'styrène', 'pt': 'estireno'},
    'acetylen': {'en': 'acetylene', 'es': 'acetileno', 'fr': 'acétylène', 'pt': 'acetileno'},
}

# Full compound translations (German -> {lang: translation})
COMPOUND_TRANSLATIONS = {
    # Oils
    'dieselöl': {'en': 'Diesel Oil', 'es': 'Aceite Diesel', 'fr': 'Huile Diesel', 'pt': 'Óleo Diesel'},
    'erdöl': {'en': 'Petroleum', 'es': 'Petróleo', 'fr': 'Pétrole', 'pt': 'Petróleo'},
    'rohöl': {'en': 'Crude Oil', 'es': 'Petróleo Crudo', 'fr': 'Pétrole Brut', 'pt': 'Petróleo Bruto'},
    'motorenöl': {'en': 'Motor Oil', 'es': 'Aceite de Motor', 'fr': 'Huile Moteur', 'pt': 'Óleo de Motor'},
    'hydrauliköl': {'en': 'Hydraulic Oil', 'es': 'Aceite Hidráulico', 'fr': 'Huile Hydraulique', 'pt': 'Óleo Hidráulico'},
    'schmieröl': {'en': 'Lubricating Oil', 'es': 'Aceite Lubricante', 'fr': 'Huile Lubrifiante', 'pt': 'Óleo Lubrificante'},
    'siliconöl': {'en': 'Silicone Oil', 'es': 'Aceite de Silicona', 'fr': 'Huile de Silicone', 'pt': 'Óleo de Silicone'},
    'maschinenöl': {'en': 'Machine Oil', 'es': 'Aceite de Máquina', 'fr': 'Huile de Machine', 'pt': 'Óleo de Máquina'},
    'transformatorenöl': {'en': 'Transformer Oil', 'es': 'Aceite de Transformador', 'fr': 'Huile de Transformateur', 'pt': 'Óleo de Transformador'},
    'turbinenöl': {'en': 'Turbine Oil', 'es': 'Aceite de Turbina', 'fr': 'Huile de Turbine', 'pt': 'Óleo de Turbina'},
    'getriebeöl': {'en': 'Gear Oil', 'es': 'Aceite de Engranajes', 'fr': 'Huile de Boîte', 'pt': 'Óleo de Câmbio'},
    'spindelöl': {'en': 'Spindle Oil', 'es': 'Aceite de Husillo', 'fr': 'Huile de Broche', 'pt': 'Óleo de Fuso'},
    'zweitaktöl': {'en': 'Two-Stroke Oil', 'es': 'Aceite de Dos Tiempos', 'fr': 'Huile Deux Temps', 'pt': 'Óleo Dois Tempos'},
    'anisöl': {'en': 'Anise Oil', 'es': 'Aceite de Anís', 'fr': 'Huile d\'Anis', 'pt': 'Óleo de Anis'},
    'eukalyptusöl': {'en': 'Eucalyptus Oil', 'es': 'Aceite de Eucalipto', 'fr': 'Huile d\'Eucalyptus', 'pt': 'Óleo de Eucalipto'},
    'lavendelöl': {'en': 'Lavender Oil', 'es': 'Aceite de Lavanda', 'fr': 'Huile de Lavande', 'pt': 'Óleo de Lavanda'},
    'mandelöl': {'en': 'Almond Oil', 'es': 'Aceite de Almendra', 'fr': 'Huile d\'Amande', 'pt': 'Óleo de Amêndoa'},
    'erdnussöl': {'en': 'Peanut Oil', 'es': 'Aceite de Cacahuete', 'fr': 'Huile d\'Arachide', 'pt': 'Óleo de Amendoim'},
    'olivenöl': {'en': 'Olive Oil', 'es': 'Aceite de Oliva', 'fr': 'Huile d\'Olive', 'pt': 'Óleo de Oliva'},
    'kokosnussöl': {'en': 'Coconut Oil', 'es': 'Aceite de Coco', 'fr': 'Huile de Coco', 'pt': 'Óleo de Coco'},
    'palmkernöl': {'en': 'Palm Kernel Oil', 'es': 'Aceite de Palmiste', 'fr': 'Huile de Palmiste', 'pt': 'Óleo de Palmiste'},
    'palmöl': {'en': 'Palm Oil', 'es': 'Aceite de Palma', 'fr': 'Huile de Palme', 'pt': 'Óleo de Palma'},
    'rapsöl': {'en': 'Rapeseed Oil', 'es': 'Aceite de Colza', 'fr': 'Huile de Colza', 'pt': 'Óleo de Colza'},
    'rüböl': {'en': 'Rapeseed Oil', 'es': 'Aceite de Nabo', 'fr': 'Huile de Navette', 'pt': 'Óleo de Nabo'},
    'senföl': {'en': 'Mustard Oil', 'es': 'Aceite de Mostaza', 'fr': 'Huile de Moutarde', 'pt': 'Óleo de Mostarda'},
    'allylsenföl': {'en': 'Allyl Mustard Oil', 'es': 'Aceite de Mostaza Alílica', 'fr': 'Huile de Moutarde Allylique', 'pt': 'Óleo de Mostarda Alílica'},
    'holzöl': {'en': 'Wood Oil', 'es': 'Aceite de Madera', 'fr': 'Huile de Bois', 'pt': 'Óleo de Madeira'},
    'tungöl': {'en': 'Tung Oil', 'es': 'Aceite de Tung', 'fr': 'Huile de Tung', 'pt': 'Óleo de Tungue'},
    'gasöl': {'en': 'Gas Oil', 'es': 'Gasóleo', 'fr': 'Gazole', 'pt': 'Gasóleo'},
    'campheröl': {'en': 'Camphor Oil', 'es': 'Aceite de Alcanfor', 'fr': 'Huile de Camphre', 'pt': 'Óleo de Cânfora'},
    'lebertran': {'en': 'Cod Liver Oil', 'es': 'Aceite de Hígado de Bacalao', 'fr': 'Huile de Foie de Morue', 'pt': 'Óleo de Fígado de Bacalhau'},
    'fischtran': {'en': 'Fish Oil', 'es': 'Aceite de Pescado', 'fr': 'Huile de Poisson', 'pt': 'Óleo de Peixe'},
    'walnussöl': {'en': 'Walnut Oil', 'es': 'Aceite de Nuez', 'fr': 'Huile de Noix', 'pt': 'Óleo de Noz'},
    'maiskeimöl': {'en': 'Corn Oil', 'es': 'Aceite de Maíz', 'fr': 'Huile de Maïs', 'pt': 'Óleo de Milho'},
    'baumwollsamenöl': {'en': 'Cottonseed Oil', 'es': 'Aceite de Algodón', 'fr': 'Huile de Coton', 'pt': 'Óleo de Algodão'},
    'sonnenblumenöl': {'en': 'Sunflower Oil', 'es': 'Aceite de Girasol', 'fr': 'Huile de Tournesol', 'pt': 'Óleo de Girassol'},
    'leinöl': {'en': 'Linseed Oil', 'es': 'Aceite de Linaza', 'fr': 'Huile de Lin', 'pt': 'Óleo de Linhaça'},
    'rizinusöl': {'en': 'Castor Oil', 'es': 'Aceite de Ricino', 'fr': 'Huile de Ricin', 'pt': 'Óleo de Rícino'},
    'sesamöl': {'en': 'Sesame Oil', 'es': 'Aceite de Sésamo', 'fr': 'Huile de Sésame', 'pt': 'Óleo de Gergelim'},
    'sojaöl': {'en': 'Soybean Oil', 'es': 'Aceite de Soja', 'fr': 'Huile de Soja', 'pt': 'Óleo de Soja'},
    'rosenöl': {'en': 'Rose Oil', 'es': 'Aceite de Rosa', 'fr': 'Huile de Rose', 'pt': 'Óleo de Rosa'},
    'zimtöl': {'en': 'Cinnamon Oil', 'es': 'Aceite de Canela', 'fr': 'Huile de Cannelle', 'pt': 'Óleo de Canela'},
    'kiefernadelöl': {'en': 'Pine Needle Oil', 'es': 'Aceite de Agujas de Pino', 'fr': 'Huile d\'Aiguilles de Pin', 'pt': 'Óleo de Agulhas de Pinheiro'},
    'fichtennadelöl': {'en': 'Spruce Needle Oil', 'es': 'Aceite de Agujas de Abeto', 'fr': 'Huile d\'Aiguilles d\'Épicéa', 'pt': 'Óleo de Agulhas de Abeto'},
    'zedernöl': {'en': 'Cedar Oil', 'es': 'Aceite de Cedro', 'fr': 'Huile de Cèdre', 'pt': 'Óleo de Cedro'},
    'nelkenöl': {'en': 'Clove Oil', 'es': 'Aceite de Clavo', 'fr': 'Huile de Clou de Girofle', 'pt': 'Óleo de Cravo'},
    'thymianöl': {'en': 'Thyme Oil', 'es': 'Aceite de Tomillo', 'fr': 'Huile de Thym', 'pt': 'Óleo de Tomilho'},
    'pfefferminzöl': {'en': 'Peppermint Oil', 'es': 'Aceite de Menta', 'fr': 'Huile de Menthe Poivrée', 'pt': 'Óleo de Hortelã-Pimenta'},
    'teeröl': {'en': 'Tar Oil', 'es': 'Aceite de Alquitrán', 'fr': 'Huile de Goudron', 'pt': 'Óleo de Alcatrão'},
    'holzteeröl': {'en': 'Wood Tar Oil', 'es': 'Aceite de Alquitrán de Madera', 'fr': 'Huile de Goudron de Bois', 'pt': 'Óleo de Alcatrão de Madeira'},
    'steinkohlenteeröl': {'en': 'Coal Tar Oil', 'es': 'Aceite de Alquitrán de Hulla', 'fr': 'Huile de Goudron de Houille', 'pt': 'Óleo de Alcatrão de Carvão'},
    'vaselinöl': {'en': 'Vaseline Oil', 'es': 'Aceite de Vaselina', 'fr': 'Huile de Vaseline', 'pt': 'Óleo de Vaselina'},
    'mineralöl': {'en': 'Mineral Oil', 'es': 'Aceite Mineral', 'fr': 'Huile Minérale', 'pt': 'Óleo Mineral'},
    'bittermandelöl': {'en': 'Bitter Almond Oil', 'es': 'Aceite de Almendra Amarga', 'fr': 'Huile d\'Amande Amère', 'pt': 'Óleo de Amêndoa Amarga'},
    'muskatnussöl': {'en': 'Nutmeg Oil', 'es': 'Aceite de Nuez Moscada', 'fr': 'Huile de Noix de Muscade', 'pt': 'Óleo de Noz-Moscada'},
    'orangenschalenöl': {'en': 'Orange Peel Oil', 'es': 'Aceite de Cáscara de Naranja', 'fr': 'Huile d\'Écorce d\'Orange', 'pt': 'Óleo de Casca de Laranja'},
    'apfelsinenschalenöl': {'en': 'Orange Peel Oil', 'es': 'Aceite de Cáscara de Naranja', 'fr': 'Huile d\'Écorce d\'Orange', 'pt': 'Óleo de Casca de Laranja'},
    'zitronenschalenöl': {'en': 'Lemon Peel Oil', 'es': 'Aceite de Cáscara de Limón', 'fr': 'Huile d\'Écorce de Citron', 'pt': 'Óleo de Casca de Limão'},
    'pomeranzenöl': {'en': 'Bitter Orange Oil', 'es': 'Aceite de Naranja Amarga', 'fr': 'Huile d\'Orange Amère', 'pt': 'Óleo de Laranja Amarga'},
    'lemongrasöl': {'en': 'Lemongrass Oil', 'es': 'Aceite de Limoncillo', 'fr': 'Huile de Citronnelle', 'pt': 'Óleo de Capim-Limão'},
    'knochenöl': {'en': 'Bone Oil', 'es': 'Aceite de Huesos', 'fr': 'Huile d\'Os', 'pt': 'Óleo de Osso'},
    
    # Fats and greases
    'kokosfett': {'en': 'Coconut Fat', 'es': 'Grasa de Coco', 'fr': 'Graisse de Coco', 'pt': 'Gordura de Coco'},
    'schweinefett': {'en': 'Lard', 'es': 'Manteca de Cerdo', 'fr': 'Saindoux', 'pt': 'Banha de Porco'},
    'rindertalg': {'en': 'Beef Tallow', 'es': 'Sebo de Res', 'fr': 'Suif de Bœuf', 'pt': 'Sebo de Boi'},
    'talg': {'en': 'Tallow', 'es': 'Sebo', 'fr': 'Suif', 'pt': 'Sebo'},
    'wollfett': {'en': 'Wool Fat', 'es': 'Grasa de Lana', 'fr': 'Graisse de Laine', 'pt': 'Gordura de Lã'},
    'kakaobutter': {'en': 'Cocoa Butter', 'es': 'Manteca de Cacao', 'fr': 'Beurre de Cacao', 'pt': 'Manteiga de Cacau'},
    
    # Foods and beverages  
    'apfelsaft': {'en': 'Apple Juice', 'es': 'Jugo de Manzana', 'fr': 'Jus de Pomme', 'pt': 'Suco de Maçã'},
    'orangensaft': {'en': 'Orange Juice', 'es': 'Jugo de Naranja', 'fr': 'Jus d\'Orange', 'pt': 'Suco de Laranja'},
    'apfelsinensaft': {'en': 'Orange Juice', 'es': 'Jugo de Naranja', 'fr': 'Jus d\'Orange', 'pt': 'Suco de Laranja'},
    'ananassaft': {'en': 'Pineapple Juice', 'es': 'Jugo de Piña', 'fr': 'Jus d\'Ananas', 'pt': 'Suco de Abacaxi'},
    'traubensaft': {'en': 'Grape Juice', 'es': 'Jugo de Uva', 'fr': 'Jus de Raisin', 'pt': 'Suco de Uva'},
    'zitronensaft': {'en': 'Lemon Juice', 'es': 'Jugo de Limón', 'fr': 'Jus de Citron', 'pt': 'Suco de Limão'},
    'fruchtsäfte': {'en': 'Fruit Juices', 'es': 'Jugos de Fruta', 'fr': 'Jus de Fruits', 'pt': 'Sucos de Frutas'},
    'zitrussäfte': {'en': 'Citrus Juices', 'es': 'Jugos Cítricos', 'fr': 'Jus d\'Agrumes', 'pt': 'Sucos Cítricos'},
    'traubenzucker': {'en': 'Glucose', 'es': 'Glucosa', 'fr': 'Glucose', 'pt': 'Glicose'},
    'fruchtzucker': {'en': 'Fructose', 'es': 'Fructosa', 'fr': 'Fructose', 'pt': 'Frutose'},
    'milchzucker': {'en': 'Lactose', 'es': 'Lactosa', 'fr': 'Lactose', 'pt': 'Lactose'},
    'zuckersirup': {'en': 'Sugar Syrup', 'es': 'Jarabe de Azúcar', 'fr': 'Sirop de Sucre', 'pt': 'Xarope de Açúcar'},
    'stärkesirup': {'en': 'Starch Syrup', 'es': 'Jarabe de Almidón', 'fr': 'Sirop d\'Amidon', 'pt': 'Xarope de Amido'},
    'glucosesirup': {'en': 'Glucose Syrup', 'es': 'Jarabe de Glucosa', 'fr': 'Sirop de Glucose', 'pt': 'Xarope de Glicose'},
    'mineralwasser': {'en': 'Mineral Water', 'es': 'Agua Mineral', 'fr': 'Eau Minérale', 'pt': 'Água Mineral'},
    'salzwasser': {'en': 'Salt Water', 'es': 'Agua Salada', 'fr': 'Eau Salée', 'pt': 'Água Salgada'},
    'seewasser': {'en': 'Sea Water', 'es': 'Agua de Mar', 'fr': 'Eau de Mer', 'pt': 'Água do Mar'},
    'branntweine': {'en': 'Spirits', 'es': 'Aguardientes', 'fr': 'Eaux-de-vie', 'pt': 'Aguardentes'},
    'spirituosen': {'en': 'Spirits', 'es': 'Licores', 'fr': 'Spiritueux', 'pt': 'Bebidas Destiladas'},
    'liköre': {'en': 'Liqueurs', 'es': 'Licores', 'fr': 'Liqueurs', 'pt': 'Licores'},
    'obstwein': {'en': 'Fruit Wine', 'es': 'Vino de Frutas', 'fr': 'Vin de Fruits', 'pt': 'Vinho de Frutas'},
    'margarine': {'en': 'Margarine', 'es': 'Margarina', 'fr': 'Margarine', 'pt': 'Margarina'},
    'butter': {'en': 'Butter', 'es': 'Mantequilla', 'fr': 'Beurre', 'pt': 'Manteiga'},
    'marmelade': {'en': 'Marmalade', 'es': 'Mermelada', 'fr': 'Confiture', 'pt': 'Geleia'},
    
    # Industrial chemicals and solutions
    'bremsflüssigkeit': {'en': 'Brake Fluid', 'es': 'Líquido de Frenos', 'fr': 'Liquide de Frein', 'pt': 'Fluido de Freio'},
    'frostschutzmittel': {'en': 'Antifreeze', 'es': 'Anticongelante', 'fr': 'Antigel', 'pt': 'Anticongelante'},
    'nagellackentferner': {'en': 'Nail Polish Remover', 'es': 'Quitaesmalte', 'fr': 'Dissolvant', 'pt': 'Removedor de Esmalte'},
    'spülmittel': {'en': 'Dishwashing Liquid', 'es': 'Lavavajillas', 'fr': 'Liquide Vaisselle', 'pt': 'Detergente'},
    'netzmittel': {'en': 'Wetting Agent', 'es': 'Agente Humectante', 'fr': 'Agent Mouillant', 'pt': 'Agente Umectante'},
    'flüssigseifen': {'en': 'Liquid Soaps', 'es': 'Jabones Líquidos', 'fr': 'Savons Liquides', 'pt': 'Sabões Líquidos'},
    'seifenlösung': {'en': 'Soap Solution', 'es': 'Solución de Jabón', 'fr': 'Solution de Savon', 'pt': 'Solução de Sabão'},
    'schmierseife': {'en': 'Soft Soap', 'es': 'Jabón Blando', 'fr': 'Savon Mou', 'pt': 'Sabão Mole'},
    'schmieröle': {'en': 'Lubricating Oils', 'es': 'Aceites Lubricantes', 'fr': 'Huiles Lubrifiantes', 'pt': 'Óleos Lubrificantes'},
    'siliconfette': {'en': 'Silicone Greases', 'es': 'Grasas de Silicona', 'fr': 'Graisses de Silicone', 'pt': 'Graxas de Silicone'},
    'testbenzin': {'en': 'Test Gasoline', 'es': 'Gasolina de Prueba', 'fr': 'Essence de Test', 'pt': 'Gasolina de Teste'},
    'lackbenzin': {'en': 'White Spirit', 'es': 'Aguarrás', 'fr': 'White Spirit', 'pt': 'Aguarrás'},
    'schwefelkohlenstoff': {'en': 'Carbon Disulfide', 'es': 'Disulfuro de Carbono', 'fr': 'Disulfure de Carbone', 'pt': 'Dissulfeto de Carbono'},
    'chlorwasserstoff': {'en': 'Hydrogen Chloride', 'es': 'Cloruro de Hidrógeno', 'fr': 'Chlorure d\'Hydrogène', 'pt': 'Cloreto de Hidrogênio'},
    'fluorwasserstoff': {'en': 'Hydrogen Fluoride', 'es': 'Fluoruro de Hidrógeno', 'fr': 'Fluorure d\'Hydrogène', 'pt': 'Fluoreto de Hidrogênio'},
    'bromwasserstoff': {'en': 'Hydrogen Bromide', 'es': 'Bromuro de Hidrógeno', 'fr': 'Bromure d\'Hydrogène', 'pt': 'Brometo de Hidrogênio'},
    'schwefelwasserstoff': {'en': 'Hydrogen Sulfide', 'es': 'Sulfuro de Hidrógeno', 'fr': 'Sulfure d\'Hydrogène', 'pt': 'Sulfeto de Hidrogênio'},
    'cyanwasserstoff': {'en': 'Hydrogen Cyanide', 'es': 'Cianuro de Hidrógeno', 'fr': 'Cyanure d\'Hydrogène', 'pt': 'Cianeto de Hidrogênio'},
    'phosphorwasserstoff': {'en': 'Phosphine', 'es': 'Fosfina', 'fr': 'Phosphine', 'pt': 'Fosfina'},
    'stickstoffwasserstoff': {'en': 'Hydrazine', 'es': 'Hidrazina', 'fr': 'Hydrazine', 'pt': 'Hidrazina'},
    'stickstofftetroxid': {'en': 'Nitrogen Tetroxide', 'es': 'Tetróxido de Nitrógeno', 'fr': 'Tétroxyde d\'Azote', 'pt': 'Tetróxido de Nitrogênio'},
    'distickstofftetroxid': {'en': 'Dinitrogen Tetroxide', 'es': 'Tetróxido de Dinitrógeno', 'fr': 'Tétroxyde de Diazote', 'pt': 'Tetróxido de Dinitrogênio'},
    'wasserstoffperoxid': {'en': 'Hydrogen Peroxide', 'es': 'Peróxido de Hidrógeno', 'fr': 'Peroxyde d\'Hydrogène', 'pt': 'Peróxido de Hidrogênio'},
    'wasserstoffsuperoxid': {'en': 'Hydrogen Peroxide', 'es': 'Peróxido de Hidrógeno', 'fr': 'Peroxyde d\'Hydrogène', 'pt': 'Peróxido de Hidrogênio'},
    'kohlendioxid': {'en': 'Carbon Dioxide', 'es': 'Dióxido de Carbono', 'fr': 'Dioxyde de Carbone', 'pt': 'Dióxido de Carbono'},
    'kohlenmonoxid': {'en': 'Carbon Monoxide', 'es': 'Monóxido de Carbono', 'fr': 'Monoxyde de Carbone', 'pt': 'Monóxido de Carbono'},
    'schwefeldioxid': {'en': 'Sulfur Dioxide', 'es': 'Dióxido de Azufre', 'fr': 'Dioxyde de Soufre', 'pt': 'Dióxido de Enxofre'},
    'schwefeltrioxid': {'en': 'Sulfur Trioxide', 'es': 'Trióxido de Azufre', 'fr': 'Trioxyde de Soufre', 'pt': 'Trióxido de Enxofre'},
    'stickstoffdioxid': {'en': 'Nitrogen Dioxide', 'es': 'Dióxido de Nitrógeno', 'fr': 'Dioxyde d\'Azote', 'pt': 'Dióxido de Nitrogênio'},
    'stickstoffmonoxid': {'en': 'Nitric Oxide', 'es': 'Óxido Nítrico', 'fr': 'Monoxyde d\'Azote', 'pt': 'Óxido Nítrico'},
    'lachgas': {'en': 'Nitrous Oxide', 'es': 'Óxido Nitroso', 'fr': 'Protoxyde d\'Azote', 'pt': 'Óxido Nitroso'},
    'grubengas': {'en': 'Firedamp', 'es': 'Grisú', 'fr': 'Grisou', 'pt': 'Grisu'},
    'leuchtgas': {'en': 'Town Gas', 'es': 'Gas Ciudad', 'fr': 'Gaz de Ville', 'pt': 'Gás de Iluminação'},
    'chlorgas': {'en': 'Chlorine Gas', 'es': 'Gas Cloro', 'fr': 'Gaz Chlore', 'pt': 'Gás Cloro'},
    'wasserglas': {'en': 'Water Glass', 'es': 'Silicato de Sodio', 'fr': 'Silicate de Sodium', 'pt': 'Silicato de Sódio'},
    'natronwasserglas': {'en': 'Sodium Water Glass', 'es': 'Silicato de Sodio', 'fr': 'Silicate de Sodium', 'pt': 'Silicato de Sódio'},
    'gaswasser': {'en': 'Gas Water', 'es': 'Agua de Gas', 'fr': 'Eau de Gaz', 'pt': 'Água de Gás'},
    'eisessig': {'en': 'Glacial Acetic Acid', 'es': 'Ácido Acético Glacial', 'fr': 'Acide Acétique Glacial', 'pt': 'Ácido Acético Glacial'},
    'weinstein': {'en': 'Tartar', 'es': 'Tártaro', 'fr': 'Tartre', 'pt': 'Tártaro'},
    'weingeist': {'en': 'Spirit of Wine', 'es': 'Alcohol de Vino', 'fr': 'Esprit de Vin', 'pt': 'Álcool Vínico'},
    'holzgeist': {'en': 'Wood Spirit', 'es': 'Alcohol de Madera', 'fr': 'Esprit de Bois', 'pt': 'Álcool de Madeira'},
    'spiritus': {'en': 'Denatured Alcohol', 'es': 'Alcohol Desnaturalizado', 'fr': 'Alcool Dénaturé', 'pt': 'Álcool Desnaturado'},
    'dampf': {'en': 'Steam', 'es': 'Vapor', 'fr': 'Vapeur', 'pt': 'Vapor'},
    'pressluft': {'en': 'Compressed Air', 'es': 'Aire Comprimido', 'fr': 'Air Comprimé', 'pt': 'Ar Comprimido'},
    'stärkelösung': {'en': 'Starch Solution', 'es': 'Solución de Almidón', 'fr': 'Solution d\'Amidon', 'pt': 'Solução de Amido'},
    'formaldehydlösung': {'en': 'Formaldehyde Solution', 'es': 'Solución de Formaldehído', 'fr': 'Solution de Formaldéhyde', 'pt': 'Solução de Formaldeído'},
    'methanallösung': {'en': 'Formaldehyde Solution', 'es': 'Solución de Formaldehído', 'fr': 'Solution de Formaldéhyde', 'pt': 'Solução de Formaldeído'},
    'fluorwasserstofflösung': {'en': 'Hydrofluoric Acid Solution', 'es': 'Solución de Ácido Fluorhídrico', 'fr': 'Solution d\'Acide Fluorhydrique', 'pt': 'Solução de Ácido Fluorídrico'},
    
    # Spices and herbs
    'zimt': {'en': 'Cinnamon', 'es': 'Canela', 'fr': 'Cannelle', 'pt': 'Canela'},
    'pfeffer': {'en': 'Pepper', 'es': 'Pimienta', 'fr': 'Poivre', 'pt': 'Pimenta'},
    'muskat': {'en': 'Nutmeg', 'es': 'Nuez Moscada', 'fr': 'Noix de Muscade', 'pt': 'Noz-Moscada'},
    'kümmel': {'en': 'Caraway', 'es': 'Alcaravea', 'fr': 'Carvi', 'pt': 'Cominho'},
    'kardamom': {'en': 'Cardamom', 'es': 'Cardamomo', 'fr': 'Cardamome', 'pt': 'Cardamomo'},
    'nelken': {'en': 'Cloves', 'es': 'Clavo', 'fr': 'Clou de Girofle', 'pt': 'Cravo'},
    'ingwer': {'en': 'Ginger', 'es': 'Jengibre', 'fr': 'Gingembre', 'pt': 'Gengibre'},
    'senf': {'en': 'Mustard', 'es': 'Mostaza', 'fr': 'Moutarde', 'pt': 'Mostarda'},
    'curry': {'en': 'Curry', 'es': 'Curry', 'fr': 'Curry', 'pt': 'Curry'},
    'anis': {'en': 'Anise', 'es': 'Anís', 'fr': 'Anis', 'pt': 'Anis'},
    'lorbeer': {'en': 'Bay Leaf', 'es': 'Laurel', 'fr': 'Laurier', 'pt': 'Louro'},
    'piment': {'en': 'Allspice', 'es': 'Pimienta de Jamaica', 'fr': 'Piment de la Jamaïque', 'pt': 'Pimenta da Jamaica'},
    'kakao': {'en': 'Cocoa', 'es': 'Cacao', 'fr': 'Cacao', 'pt': 'Cacau'},
    'hefe': {'en': 'Yeast', 'es': 'Levadura', 'fr': 'Levure', 'pt': 'Fermento'},
    
    # Generic terms that should stay similar
    'äther': {'en': 'Ether', 'es': 'Éter', 'fr': 'Éther', 'pt': 'Éter'},
    'vaseline': {'en': 'Vaseline', 'es': 'Vaselina', 'fr': 'Vaseline', 'pt': 'Vaselina'},
    'paraffine': {'en': 'Paraffins', 'es': 'Parafinas', 'fr': 'Paraffines', 'pt': 'Parafinas'},
    'paraffinwachs': {'en': 'Paraffin Wax', 'es': 'Cera de Parafina', 'fr': 'Cire de Paraffine', 'pt': 'Cera de Parafina'},
    'lanolin': {'en': 'Lanolin', 'es': 'Lanolina', 'fr': 'Lanoline', 'pt': 'Lanolina'},
    'dextrin': {'en': 'Dextrin', 'es': 'Dextrina', 'fr': 'Dextrine', 'pt': 'Dextrina'},
    'pectin': {'en': 'Pectin', 'es': 'Pectina', 'fr': 'Pectine', 'pt': 'Pectina'},
    'tannin': {'en': 'Tannin', 'es': 'Tanino', 'fr': 'Tanin', 'pt': 'Tanino'},
}

def translate_chemical(german_name, lang):
    """Translate a German chemical name to target language."""
    lower_name = german_name.lower()
    
    # First check for exact compound match
    if lower_name in COMPOUND_TRANSLATIONS:
        if lang in COMPOUND_TRANSLATIONS[lower_name]:
            return COMPOUND_TRANSLATIONS[lower_name][lang]
    
    # Try term-by-term translation
    result = german_name
    for german_term, translations in sorted(TERM_TRANSLATIONS.items(), key=lambda x: -len(x[0])):
        if german_term in result.lower() and lang in translations:
            # Case-sensitive replacement
            pattern = re.compile(re.escape(german_term), re.IGNORECASE)
            result = pattern.sub(translations[lang], result)
    
    # Capitalize first letter if original was capitalized
    if german_name[0].isupper() and result[0].islower():
        result = result[0].upper() + result[1:]
    
    return result

def load_translations(lang):
    """Load existing translations from JS file."""
    filepath = f'js/chemical_translations_{lang}.js'
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        translations = {}
        pattern = r"'([^']+)':\s*'([^']+)'"
        for match in re.finditer(pattern, content):
            translations[match.group(1)] = match.group(2)
        return translations
    except FileNotFoundError:
        return {}

def save_translations(lang, translations):
    """Save translations to JS file."""
    filepath = f'js/chemical_translations_{lang}.js'
    
    # Get language name
    lang_names = {'en': 'English', 'es': 'Spanish', 'fr': 'French', 'pt': 'Portuguese'}
    lang_name = lang_names.get(lang, lang.upper())
    
    lines = [
        f'// German → {lang_name} chemical name translations',
        f'// Auto-generated - {len(translations)} translations',
        'const chemicalTranslations = {'
    ]
    
    for german, translation in sorted(translations.items()):
        # Escape single quotes
        escaped_trans = translation.replace("'", "\\'")
        lines.append(f"    '{german}': '{escaped_trans}',")
    
    lines.append('};')
    
    with open(filepath, 'w') as f:
        f.write('\n'.join(lines))

def main():
    # Load chemicals from source
    with open('data/chemicals_burkle_full.json', 'r') as f:
        chemicals = json.load(f)
    
    german_names = sorted(set(c['name'] for c in chemicals))
    print(f"Total unique chemicals: {len(german_names)}")
    
    for lang in ['en', 'es', 'fr', 'pt']:
        print(f"\n=== {lang.upper()} ===")
        
        # Load existing translations
        existing = load_translations(lang)
        print(f"Existing translations: {len(existing)}")
        
        # Find untranslated or poorly translated
        updated = 0
        for name in german_names:
            lower_name = name.lower()
            
            # Check if exists and is properly translated
            if lower_name in existing:
                current = existing[lower_name]
                # Check if it looks like German (contains German-specific patterns)
                is_german = any(p in current.lower() for p in ['säure', 'lösung', 'stoff', 'öl', 'wasser', 'äther'])
                is_same = current.lower() == lower_name
                
                if is_german or is_same:
                    # Try to translate
                    new_trans = translate_chemical(name, lang)
                    if new_trans != name and new_trans != current:
                        existing[lower_name] = new_trans
                        updated += 1
            else:
                # New translation needed
                new_trans = translate_chemical(name, lang)
                existing[lower_name] = new_trans
                updated += 1
        
        print(f"Updated/added: {updated}")
        print(f"Total translations: {len(existing)}")
        
        # Save
        save_translations(lang, existing)
        print(f"Saved to js/chemical_translations_{lang}.js")

if __name__ == '__main__':
    main()
