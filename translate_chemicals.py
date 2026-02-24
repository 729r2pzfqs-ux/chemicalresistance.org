#!/usr/bin/env python3
"""
Translate German chemical names to English.
Uses a dictionary for common patterns + Google Translate API for the rest.
"""
import json
import re
from pathlib import Path

# Common German → English chemical name translations
TRANSLATIONS = {
    # Common single-word chemicals
    "Acetaldehyd": "Acetaldehyde",
    "Acetamid": "Acetamide",
    "Acetylen": "Acetylene",
    "Acrylnitril": "Acrylonitrile",
    "Adipinsäure": "Adipic Acid",
    "Alanin": "Alanine",
    "Allylalkohol": "Allyl Alcohol",
    "Ameisensäure": "Formic Acid",
    "Amylacetat": "Amyl Acetate",
    "Amylalkohol": "Amyl Alcohol",
    "Anilin": "Aniline",
    "Anthracen": "Anthracene",
    "Argon": "Argon",
    "Bariumsulfat": "Barium Sulfate",
    "Benzoesäure": "Benzoic Acid",
    "Benzaldehyd": "Benzaldehyde",
    "Bernsteinsäure": "Succinic Acid",
    "Borsäure": "Boric Acid",
    "Bromethan": "Ethyl Bromide",
    "Bromwasserstoffsäure": "Hydrobromic Acid",
    "Buttersäure": "Butyric Acid",
    "Butylacetat": "Butyl Acetate",
    "Butylamin": "Butylamine",
    "Butylglycol": "Butyl Glycol",
    "Capronsäure": "Caproic Acid",
    "Chloressigsäure": "Chloroacetic Acid",
    "Chlorwasserstoffsäure": "Hydrochloric Acid",
    "Chromsäure": "Chromic Acid",
    "Cyclohexan": "Cyclohexane",
    "Cyclohexanol": "Cyclohexanol",
    "Cyclohexanon": "Cyclohexanone",
    "Dekan": "Decane",
    "Dextrin": "Dextrin",
    "Dioxan": "Dioxane",
    "Ethylamin": "Ethylamine",
    "Ethylbenzol": "Ethylbenzene",
    "Ethylenchlorid": "Ethylene Chloride",
    "Ethylenglycol": "Ethylene Glycol",
    "Ethylenoxid": "Ethylene Oxide",
    "Fettsäuren": "Fatty Acids",
    "Fruchtsäure": "Fruit Acid",
    "Furfural": "Furfural",
    "Gelatine": "Gelatin",
    "Glukose": "Glucose",
    "Glutamin": "Glutamine",
    "Glutarsäure": "Glutaric Acid",
    "Glycin": "Glycine",
    "Guajacol": "Guaiacol",
    "Harnstoff": "Urea",
    "Helium": "Helium",
    "Heptan": "Heptane",
    "Hexan": "Hexane",
    "Hydrazin": "Hydrazine",
    "Isobutanol": "Isobutanol",
    "Isooktan": "Isooctane",
    "Isopropanol": "Isopropanol",
    "Isopropylalkohol": "Isopropyl Alcohol",
    "Kampfer": "Camphor",
    "Kreosot": "Creosote",
    "Kresol": "Cresol",
    "Laurinsäure": "Lauric Acid",
    "Maleinsäure": "Maleic Acid",
    "Malonsäure": "Malonic Acid",
    "Melaminharz": "Melamine Resin",
    "Melasse": "Molasses",
    "Menthol": "Menthol",
    "Mesitylen": "Mesitylene",
    "Methan": "Methane",
    "Methylamin": "Methylamine",
    "Methylbromid": "Methyl Bromide",
    "Methylchlorid": "Methyl Chloride",
    "Morpholin": "Morpholine",
    "Naphthalin": "Naphthalene",
    "Naphtha": "Naphtha",
    "Neon": "Neon",
    "Nitromethan": "Nitromethane",
    "Nitrobenzol": "Nitrobenzene",
    "Nonan": "Nonane",
    "Octan": "Octane",
    "Ölsäure": "Oleic Acid",
    "Palmitinsäure": "Palmitic Acid",
    "Paraffin": "Paraffin",
    "Pektin": "Pectin",
    "Pentan": "Pentane",
    "Peroxid": "Peroxide",
    "Phtalsäure": "Phthalic Acid",
    "Piperidin": "Piperidine",
    "Propan": "Propane",
    "Propanol": "Propanol",
    "Propionsäure": "Propionic Acid",
    "Propylenglycol": "Propylene Glycol",
    "Propylenoxid": "Propylene Oxide",
    "Pyridin": "Pyridine",
    "Pyrrol": "Pyrrole",
    "Resorcin": "Resorcinol",
    "Schwefel": "Sulfur",
    "Stärke": "Starch",
    "Stearinsäure": "Stearic Acid",
    "Styrol": "Styrene",
    "Tannin": "Tannin",
    "Teer": "Tar",
    "Thiophen": "Thiophene",
    "Triacetin": "Triacetin",
    "Tributylphosphat": "Tributyl Phosphate",
    "Triethanolamin": "Triethanolamine",
    "Triethylamin": "Triethylamine",
    "Vaseline": "Petroleum Jelly",
    "Vinylacetat": "Vinyl Acetate",
    "Xenon": "Xenon",
    
    # Acids
    "säure": "Acid",
    "Schwefelsäure": "Sulfuric Acid",
    "Salzsäure": "Hydrochloric Acid",
    "Salpetersäure": "Nitric Acid",
    "Phosphorsäure": "Phosphoric Acid",
    "Essigsäure": "Acetic Acid",
    "Ameisensäure": "Formic Acid",
    "Milchsäure": "Lactic Acid",
    "Zitronensäure": "Citric Acid",
    "Oxalsäure": "Oxalic Acid",
    "Weinsäure": "Tartaric Acid",
    "Kohlensäure": "Carbonic Acid",
    "Borsäure": "Boric Acid",
    "Flusssäure": "Hydrofluoric Acid",
    "Chromsäure": "Chromic Acid",
    "Perchlorsäure": "Perchloric Acid",
    "Schweflige Säure": "Sulfurous Acid",
    "Kieselsäure": "Silicic Acid",
    
    # Bases
    "Natriumhydroxid": "Sodium Hydroxide",
    "Kaliumhydroxid": "Potassium Hydroxide",
    "Calciumhydroxid": "Calcium Hydroxide",
    "Ammoniumhydroxid": "Ammonium Hydroxide",
    "Natronlauge": "Caustic Soda",
    "Kalilauge": "Potassium Lye",
    
    # Common salts
    "Natriumchlorid": "Sodium Chloride",
    "Kaliumchlorid": "Potassium Chloride",
    "Calciumchlorid": "Calcium Chloride",
    "Natriumcarbonat": "Sodium Carbonate",
    "Natriumsulfat": "Sodium Sulfate",
    "Natriumnitrat": "Sodium Nitrate",
    "Natriumhypochlorit": "Sodium Hypochlorite",
    "Natriumphosphat": "Sodium Phosphate",
    "Kaliumcarbonat": "Potassium Carbonate",
    "Ammoniumchlorid": "Ammonium Chloride",
    "Ammoniumsulfat": "Ammonium Sulfate",
    "Ammoniumnitrat": "Ammonium Nitrate",
    "Kupfersulfat": "Copper Sulfate",
    "Eisensulfat": "Iron Sulfate",
    "Zinksulfat": "Zinc Sulfate",
    "Zinkchlorid": "Zinc Chloride",
    "Silbernitrat": "Silver Nitrate",
    "Bariumchlorid": "Barium Chloride",
    "Magnesiumchlorid": "Magnesium Chloride",
    "Aluminiumchlorid": "Aluminum Chloride",
    "Aluminiumsulfat": "Aluminum Sulfate",
    
    # Solvents
    "Aceton": "Acetone",
    "Methanol": "Methanol",
    "Ethanol": "Ethanol",
    "Isopropanol": "Isopropanol",
    "Butanol": "Butanol",
    "Benzol": "Benzene",
    "Toluol": "Toluene",
    "Xylol": "Xylene",
    "Chloroform": "Chloroform",
    "Dichlormethan": "Dichloromethane",
    "Tetrachlorkohlenstoff": "Carbon Tetrachloride",
    "Trichlorethen": "Trichloroethylene",
    "Perchlorethylen": "Perchloroethylene",
    "Diethylether": "Diethyl Ether",
    "Tetrahydrofuran": "Tetrahydrofuran",
    "Dimethylformamid": "Dimethylformamide",
    "Dimethylsulfoxid": "Dimethyl Sulfoxide",
    "Ethylacetat": "Ethyl Acetate",
    "Butylacetat": "Butyl Acetate",
    "Methylethylketon": "Methyl Ethyl Ketone",
    
    # Common chemicals
    "Ammoniak": "Ammonia",
    "Wasserstoffperoxid": "Hydrogen Peroxide",
    "Formaldehyd": "Formaldehyde",
    "Glycerin": "Glycerin",
    "Glycol": "Glycol",
    "Harnstoff": "Urea",
    "Phenol": "Phenol",
    "Anilin": "Aniline",
    "Chlor": "Chlorine",
    "Brom": "Bromine",
    "Jod": "Iodine",
    "Fluor": "Fluorine",
    "Ozon": "Ozone",
    "Schwefelwasserstoff": "Hydrogen Sulfide",
    "Kohlendioxid": "Carbon Dioxide",
    "Kohlenmonoxid": "Carbon Monoxide",
    "Stickstoff": "Nitrogen",
    "Sauerstoff": "Oxygen",
    "Wasserstoff": "Hydrogen",
    "Wasser": "Water",
    
    # Oils and fats
    "Öl": "Oil",
    "Mineralöl": "Mineral Oil",
    "Olivenöl": "Olive Oil",
    "Dieselöl": "Diesel Oil",
    "Heizöl": "Heating Oil",
    "Hydrauliköl": "Hydraulic Oil",
    "Motoröl": "Motor Oil",
    "Schmieröl": "Lubricating Oil",
    "Silikonöl": "Silicone Oil",
    "Fett": "Grease",
    "Schmierfett": "Lubricating Grease",
    
    # Fuels
    "Benzin": "Gasoline",
    "Diesel": "Diesel",
    "Kerosin": "Kerosene",
    "Petroleum": "Petroleum",
    
    # Other common terms
    "Bleiche": "Bleach",
    "Seife": "Soap",
    "Waschmittel": "Detergent",
    "Reinigungsmittel": "Cleaning Agent",
    "Lösungsmittel": "Solvent",
    "Tinte": "Ink",
    "Farbe": "Paint",
    "Lack": "Lacquer",
    "Klebstoff": "Adhesive",
    "Harz": "Resin",
    "Gummi": "Rubber",
    "Latex": "Latex",
    "Milch": "Milk",
    "Bier": "Beer",
    "Wein": "Wine",
    "Essig": "Vinegar",
    "Zucker": "Sugar",
    "Salz": "Salt",
}

# Prefixes and suffixes for pattern matching
PREFIXES = {
    "Natrium": "Sodium",
    "Kalium": "Potassium",
    "Calcium": "Calcium",
    "Magnesium": "Magnesium",
    "Barium": "Barium",
    "Aluminium": "Aluminum",
    "Eisen": "Iron",
    "Kupfer": "Copper",
    "Zink": "Zinc",
    "Blei": "Lead",
    "Nickel": "Nickel",
    "Chrom": "Chromium",
    "Mangan": "Manganese",
    "Silber": "Silver",
    "Quecksilber": "Mercury",
    "Ammonium": "Ammonium",
    "Lithium": "Lithium",
}

SUFFIXES = {
    "hydroxid": "Hydroxide",
    "chlorid": "Chloride",
    "bromid": "Bromide",
    "jodid": "Iodide",
    "fluorid": "Fluoride",
    "sulfat": "Sulfate",
    "sulfit": "Sulfite",
    "sulfid": "Sulfide",
    "nitrat": "Nitrate",
    "nitrit": "Nitrite",
    "phosphat": "Phosphate",
    "carbonat": "Carbonate",
    "acetat": "Acetate",
    "oxid": "Oxide",
    "peroxid": "Peroxide",
    "cyanid": "Cyanide",
    "chromat": "Chromate",
    "dichromat": "Dichromate",
    "permanganat": "Permanganate",
    "silikat": "Silicate",
    "borat": "Borate",
    "citrat": "Citrate",
    "oxalat": "Oxalate",
    "tartrat": "Tartrate",
    "benzoat": "Benzoate",
    "hypochlorit": "Hypochlorite",
    "chlorat": "Chlorate",
    "perchlorat": "Perchlorate",
    "thiosulfat": "Thiosulfate",
    "bisulfat": "Bisulfate",
    "bicarbonat": "Bicarbonate",
}

def translate_german_chemical(name):
    """Try to translate a German chemical name to English."""
    
    # Check direct translations first
    if name in TRANSLATIONS:
        return TRANSLATIONS[name]
    
    # Check if base name is in translations (ignore concentration)
    base_name = re.split(r'\s*[,(]', name)[0].strip()
    if base_name in TRANSLATIONS:
        return TRANSLATIONS[base_name]
    
    # Try pattern matching for salts
    for prefix_de, prefix_en in PREFIXES.items():
        if name.startswith(prefix_de):
            remainder = name[len(prefix_de):].lower()
            for suffix_de, suffix_en in SUFFIXES.items():
                if remainder.startswith(suffix_de):
                    return f"{prefix_en} {suffix_en}"
    
    # Try to translate acids (ends with "säure")
    if "säure" in name.lower():
        acid_match = re.match(r'(\w+)säure', name, re.IGNORECASE)
        if acid_match:
            prefix = acid_match.group(1)
            # Check if we know this acid
            for trans_de, trans_en in TRANSLATIONS.items():
                if trans_de.lower() == name.lower():
                    return trans_en
    
    return None

def main():
    # Load the JSON
    json_path = Path(__file__).parent / "data" / "chemicals_burkle.json"
    with open(json_path, 'r', encoding='utf-8') as f:
        chemicals = json.load(f)
    
    # Track statistics
    already_translated = 0
    newly_translated = 0
    needs_translation = []
    
    for chem in chemicals:
        if chem.get('name_en'):
            already_translated += 1
            continue
        
        # Try to translate
        english = translate_german_chemical(chem['name'])
        if english:
            chem['name_en'] = english
            newly_translated += 1
            print(f"✓ {chem['name']} → {english}")
        else:
            needs_translation.append(chem['name'])
    
    # Save updated JSON
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(chemicals, f, ensure_ascii=False, indent=2)
    
    print(f"\n{'='*50}")
    print(f"Already translated: {already_translated}")
    print(f"Newly translated: {newly_translated}")
    print(f"Still needs translation: {len(needs_translation)}")
    print(f"Total chemicals: {len(chemicals)}")
    
    if needs_translation:
        print(f"\n{'='*50}")
        print("Sample chemicals still needing translation:")
        for name in needs_translation[:20]:
            print(f"  - {name}")

if __name__ == "__main__":
    main()
