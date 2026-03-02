// Chemical Hazard Database for Storage Compatibility & SDS Decoder
// 100+ chemicals with hazard classifications, GHS, PPE, and storage info

const chemicalHazardDB = {
  // ===== ACIDS =====
  "Sulfuric Acid": {
    cas: "7664-93-9", formula: "H₂SO₄",
    de: "Schwefelsäure", es: "Ácido sulfúrico", fr: "Acide sulfurique", pt: "Ácido sulfúrico",
    synonyms: ["Battery acid", "Oil of vitriol"],
    classes: ["acid", "corrosive"],
    ghs: ["GHS05", "GHS07"],
    hazardStatements: [
      { code: "H314", text: "Causes severe skin burns and eye damage" },
      { code: "H290", text: "May be corrosive to metals" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles + face shield" },
      skin: { required: true, type: "Butyl or neoprene gloves, chemical-resistant suit" },
      respiratory: { required: true, type: "Acid gas respirator if ventilation inadequate" },
      other: "Chemical-resistant boots, emergency shower access"
    },
    storage: {
      cabinet: "Acid cabinet (separate from bases and oxidizers)",
      temp: "Store below 35°C (95°F)",
      ventilation: "Store in well-ventilated area",
      incompatible: ["Bases", "Organic materials", "Metals", "Water (add acid to water, never reverse)"]
    },
    transport: { un: "1830", class: "8", packingGroup: "II", properShipping: "Sulfuric acid" },
    firstAid: {
      inhalation: "Move to fresh air. If breathing difficult, give oxygen. Seek medical attention.",
      skin: "Remove contaminated clothing. Flush with water for 15+ minutes. Seek medical attention.",
      eyes: "Flush with water for 15+ minutes, lifting eyelids. Seek immediate medical attention.",
      ingestion: "Do NOT induce vomiting. Rinse mouth. Drink water if conscious. Seek immediate medical attention."
    }
  },

  "Hydrochloric Acid": {
    cas: "7647-01-0", formula: "HCl",
    de: "Salzsäure", es: "Ácido clorhídrico", fr: "Acide chlorhydrique", pt: "Ácido clorídrico",
    synonyms: ["Muriatic acid", "Hydrogen chloride solution"],
    classes: ["acid", "corrosive"],
    ghs: ["GHS05", "GHS07"],
    hazardStatements: [
      { code: "H314", text: "Causes severe skin burns and eye damage" },
      { code: "H335", text: "May cause respiratory irritation" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles + face shield" },
      skin: { required: true, type: "PVC or neoprene gloves, chemical-resistant apron" },
      respiratory: { required: true, type: "Acid gas respirator in confined spaces" },
      other: "Emergency shower and eyewash access"
    },
    storage: {
      cabinet: "Acid cabinet (corrosion-resistant)",
      temp: "Store below 25°C (77°F)",
      ventilation: "Well-ventilated area, away from heat",
      incompatible: ["Bases", "Metals", "Oxidizers", "Amines"]
    },
    transport: { un: "1789", class: "8", packingGroup: "II", properShipping: "Hydrochloric acid" },
    firstAid: {
      inhalation: "Move to fresh air. Give oxygen if breathing difficult. Seek medical help.",
      skin: "Remove clothing. Flush skin with water for 15+ minutes.",
      eyes: "Flush with water for 15-20 minutes. Seek immediate medical attention.",
      ingestion: "Do NOT induce vomiting. Rinse mouth. Drink milk or water if conscious."
    }
  },

  "Nitric Acid": {
    cas: "7697-37-2", formula: "HNO₃",
    de: "Salpetersäure", es: "Ácido nítrico", fr: "Acide nitrique", pt: "Ácido nítrico",
    synonyms: ["Aqua fortis"],
    classes: ["acid", "corrosive", "oxidizer"],
    ghs: ["GHS03", "GHS05", "GHS07"],
    hazardStatements: [
      { code: "H272", text: "May intensify fire; oxidizer" },
      { code: "H314", text: "Causes severe skin burns and eye damage" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles + face shield" },
      skin: { required: true, type: "Butyl rubber gloves, full chemical suit" },
      respiratory: { required: true, type: "Acid gas/oxidizer respirator" },
      other: "Emergency shower required"
    },
    storage: {
      cabinet: "Acid cabinet (separate from organics and flammables)",
      temp: "Store cool, away from heat",
      ventilation: "Well-ventilated, vented container",
      incompatible: ["Organic materials", "Flammables", "Bases", "Metals", "Reducing agents"]
    },
    transport: { un: "2031", class: "8 (5.1)", packingGroup: "I", properShipping: "Nitric acid" },
    firstAid: {
      inhalation: "Move to fresh air immediately. Give oxygen. Seek immediate medical attention.",
      skin: "Flush with water for 20+ minutes. Remove all contaminated clothing.",
      eyes: "Flush with water for 30+ minutes. Seek immediate medical attention.",
      ingestion: "Do NOT induce vomiting. Seek immediate medical attention."
    }
  },

  "Phosphoric Acid": {
    cas: "7664-38-2", formula: "H₃PO₄",
    de: "Phosphorsäure", es: "Ácido fosfórico", fr: "Acide phosphorique", pt: "Ácido fosfórico",
    synonyms: ["Orthophosphoric acid"],
    classes: ["acid", "corrosive"],
    ghs: ["GHS05"],
    hazardStatements: [
      { code: "H314", text: "Causes severe skin burns and eye damage" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles" },
      skin: { required: true, type: "Rubber or PVC gloves" },
      respiratory: { required: false, type: "Not typically required with good ventilation" },
      other: "Chemical-resistant apron"
    },
    storage: {
      cabinet: "Acid cabinet",
      temp: "Store at room temperature",
      ventilation: "Keep container closed",
      incompatible: ["Bases", "Metals"]
    },
    transport: { un: "1805", class: "8", packingGroup: "III", properShipping: "Phosphoric acid" },
    firstAid: {
      inhalation: "Move to fresh air.",
      skin: "Flush with water for 15 minutes.",
      eyes: "Flush with water for 15 minutes. Seek medical attention.",
      ingestion: "Rinse mouth. Drink water. Seek medical attention."
    }
  },

  "Acetic Acid": {
    cas: "64-19-7", formula: "CH₃COOH",
    de: "Essigsäure", es: "Ácido acético", fr: "Acide acétique", pt: "Ácido acético",
    synonyms: ["Glacial acetic acid", "Ethanoic acid", "Vinegar (diluted)"],
    classes: ["acid", "corrosive", "flammable"],
    ghs: ["GHS02", "GHS05"],
    hazardStatements: [
      { code: "H226", text: "Flammable liquid and vapor" },
      { code: "H314", text: "Causes severe skin burns and eye damage" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles" },
      skin: { required: true, type: "Nitrile or butyl gloves" },
      respiratory: { required: true, type: "Organic vapor respirator at high concentrations" },
      other: "No open flames"
    },
    storage: {
      cabinet: "Acid cabinet or flammable cabinet (glacial)",
      temp: "Store cool",
      ventilation: "Well-ventilated area",
      incompatible: ["Bases", "Oxidizers", "Metals"]
    },
    transport: { un: "2789", class: "8 (3)", packingGroup: "II", properShipping: "Acetic acid, glacial" },
    firstAid: {
      inhalation: "Move to fresh air. Seek medical attention if symptoms persist.",
      skin: "Flush with water for 15 minutes.",
      eyes: "Flush with water for 15 minutes. Seek medical attention.",
      ingestion: "Rinse mouth. Drink water. Do NOT induce vomiting."
    }
  },

  "Formic Acid": {
    cas: "64-18-6", formula: "HCOOH",
    de: "Ameisensäure", es: "Ácido fórmico", fr: "Acide formique", pt: "Ácido fórmico",
    synonyms: ["Methanoic acid"],
    classes: ["acid", "corrosive", "flammable"],
    ghs: ["GHS02", "GHS05", "GHS06"],
    hazardStatements: [
      { code: "H226", text: "Flammable liquid and vapor" },
      { code: "H302", text: "Harmful if swallowed" },
      { code: "H314", text: "Causes severe skin burns and eye damage" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles + face shield" },
      skin: { required: true, type: "Butyl rubber gloves" },
      respiratory: { required: true, type: "Organic vapor/acid gas respirator" },
      other: "No open flames"
    },
    storage: {
      cabinet: "Acid cabinet",
      temp: "Store cool, away from heat",
      ventilation: "Well-ventilated area",
      incompatible: ["Bases", "Oxidizers", "Strong acids"]
    },
    transport: { un: "1779", class: "8 (3)", packingGroup: "II", properShipping: "Formic acid" },
    firstAid: {
      inhalation: "Move to fresh air. Give oxygen if needed. Seek medical attention.",
      skin: "Flush with water for 15+ minutes.",
      eyes: "Flush with water for 20+ minutes. Seek immediate medical attention.",
      ingestion: "Do NOT induce vomiting. Seek medical attention."
    }
  },

  "Citric Acid": {
    cas: "77-92-9", formula: "C₆H₈O₇",
    de: "Zitronensäure", es: "Ácido cítrico", fr: "Acide citrique", pt: "Ácido cítrico",
    synonyms: [],
    classes: ["acid"],
    ghs: ["GHS07"],
    hazardStatements: [
      { code: "H319", text: "Causes serious eye irritation" }
    ],
    ppe: {
      eyes: { required: true, type: "Safety glasses" },
      skin: { required: false, type: "Gloves for prolonged contact" },
      respiratory: { required: false, type: "Not required" },
      other: "None"
    },
    storage: {
      cabinet: "General storage",
      temp: "Room temperature",
      ventilation: "Normal",
      incompatible: ["Strong oxidizers", "Bases"]
    },
    transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
    firstAid: {
      inhalation: "Move to fresh air.",
      skin: "Wash with soap and water.",
      eyes: "Flush with water for 10 minutes.",
      ingestion: "Rinse mouth. Drink water."
    }
  },

  "Oxalic Acid": {
    cas: "144-62-7", formula: "C₂H₂O₄",
    de: "Oxalsäure", es: "Ácido oxálico", fr: "Acide oxalique", pt: "Ácido oxálico",
    synonyms: ["Ethanedioic acid"],
    classes: ["acid", "toxic"],
    ghs: ["GHS05", "GHS06"],
    hazardStatements: [
      { code: "H302", text: "Harmful if swallowed" },
      { code: "H312", text: "Harmful in contact with skin" },
      { code: "H314", text: "Causes severe skin burns and eye damage" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles" },
      skin: { required: true, type: "Nitrile gloves" },
      respiratory: { required: false, type: "Dust mask if handling powder" },
      other: "Avoid dust formation"
    },
    storage: {
      cabinet: "Acid cabinet",
      temp: "Room temperature",
      ventilation: "Normal",
      incompatible: ["Strong oxidizers", "Bases", "Silver compounds"]
    },
    transport: { un: "3261", class: "8", packingGroup: "III", properShipping: "Corrosive solid, acidic" },
    firstAid: {
      inhalation: "Move to fresh air.",
      skin: "Flush with water for 15 minutes.",
      eyes: "Flush with water for 15 minutes. Seek medical attention.",
      ingestion: "Seek immediate medical attention. Do NOT induce vomiting."
    }
  },

  // ===== BASES =====
  "Sodium Hydroxide": {
    cas: "1310-73-2", formula: "NaOH",
    de: "Natriumhydroxid", es: "Hidróxido de sodio", fr: "Hydroxyde de sodium", pt: "Hidróxido de sódio",
    synonyms: ["Caustic soda", "Lye"],
    classes: ["base", "corrosive"],
    ghs: ["GHS05"],
    hazardStatements: [
      { code: "H314", text: "Causes severe skin burns and eye damage" },
      { code: "H290", text: "May be corrosive to metals" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles + face shield" },
      skin: { required: true, type: "Nitrile or neoprene gloves, chemical-resistant suit" },
      respiratory: { required: false, type: "Not typically required with good ventilation" },
      other: "Chemical-resistant boots"
    },
    storage: {
      cabinet: "Base/alkali cabinet (separate from acids)",
      temp: "Store at room temperature",
      ventilation: "Keep container tightly closed",
      incompatible: ["Acids", "Aluminum", "Zinc", "Tin", "Water (dissolving is exothermic)"]
    },
    transport: { un: "1823", class: "8", packingGroup: "II", properShipping: "Sodium hydroxide, solid" },
    firstAid: {
      inhalation: "Move to fresh air. Seek medical attention if symptoms persist.",
      skin: "Brush off solid. Flush with water for 15+ minutes. Remove contaminated clothing.",
      eyes: "Flush with water for 30+ minutes. Seek immediate medical attention.",
      ingestion: "Do NOT induce vomiting. Rinse mouth. Drink water or milk. Seek medical help."
    }
  },

  "Potassium Hydroxide": {
    cas: "1310-58-3", formula: "KOH",
    de: "Kaliumhydroxid", es: "Hidróxido de potasio", fr: "Hydroxyde de potassium", pt: "Hidróxido de potássio",
    synonyms: ["Caustic potash"],
    classes: ["base", "corrosive"],
    ghs: ["GHS05", "GHS07"],
    hazardStatements: [
      { code: "H302", text: "Harmful if swallowed" },
      { code: "H314", text: "Causes severe skin burns and eye damage" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles + face shield" },
      skin: { required: true, type: "Nitrile or neoprene gloves" },
      respiratory: { required: false, type: "Not typically required" },
      other: "Chemical-resistant apron"
    },
    storage: {
      cabinet: "Base cabinet",
      temp: "Room temperature, keep dry",
      ventilation: "Keep tightly closed",
      incompatible: ["Acids", "Aluminum", "Zinc", "Water (exothermic)"]
    },
    transport: { un: "1813", class: "8", packingGroup: "II", properShipping: "Potassium hydroxide, solid" },
    firstAid: {
      inhalation: "Move to fresh air.",
      skin: "Brush off solid. Flush with water for 15+ minutes.",
      eyes: "Flush with water for 30+ minutes. Seek immediate medical attention.",
      ingestion: "Do NOT induce vomiting. Drink water or milk."
    }
  },

  "Ammonia": {
    cas: "7664-41-7", formula: "NH₃",
    de: "Ammoniak", es: "Amoníaco", fr: "Ammoniac", pt: "Amoníaco",
    synonyms: ["Ammonia gas", "Ammonia solution", "Ammonium hydroxide (in water)"],
    classes: ["base", "corrosive", "toxic"],
    ghs: ["GHS04", "GHS05", "GHS06", "GHS09"],
    hazardStatements: [
      { code: "H221", text: "Flammable gas" },
      { code: "H280", text: "Contains gas under pressure" },
      { code: "H314", text: "Causes severe skin burns and eye damage" },
      { code: "H331", text: "Toxic if inhaled" },
      { code: "H400", text: "Very toxic to aquatic life" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles + face shield" },
      skin: { required: true, type: "Butyl rubber gloves, chemical suit for liquid" },
      respiratory: { required: true, type: "Ammonia-rated respirator or SCBA" },
      other: "Emergency shower required"
    },
    storage: {
      cabinet: "Base storage, away from acids",
      temp: "Store cool, in ventilated area",
      ventilation: "Excellent ventilation required",
      incompatible: ["Acids", "Halogens", "Oxidizers", "Mercury"]
    },
    transport: { un: "1005", class: "2.3 (8)", packingGroup: "-", properShipping: "Ammonia, anhydrous" },
    firstAid: {
      inhalation: "Move to fresh air immediately. Give oxygen if available. Seek immediate medical attention.",
      skin: "Flush with water for 15+ minutes. Remove contaminated clothing.",
      eyes: "Flush with water for 30+ minutes. Seek immediate medical attention.",
      ingestion: "Rinse mouth. Do NOT induce vomiting. Seek immediate medical attention."
    }
  },

  "Calcium Hydroxide": {
    cas: "1305-62-0", formula: "Ca(OH)₂",
    de: "Calciumhydroxid", es: "Hidróxido de calcio", fr: "Hydroxyde de calcium", pt: "Hidróxido de cálcio",
    synonyms: ["Slaked lime", "Hydrated lime"],
    classes: ["base", "corrosive"],
    ghs: ["GHS05", "GHS07"],
    hazardStatements: [
      { code: "H315", text: "Causes skin irritation" },
      { code: "H318", text: "Causes serious eye damage" },
      { code: "H335", text: "May cause respiratory irritation" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles" },
      skin: { required: true, type: "Rubber gloves" },
      respiratory: { required: true, type: "Dust mask" },
      other: "Avoid dust formation"
    },
    storage: {
      cabinet: "Base storage",
      temp: "Room temperature, keep dry",
      ventilation: "Keep tightly closed",
      incompatible: ["Acids", "Aluminum"]
    },
    transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
    firstAid: {
      inhalation: "Move to fresh air.",
      skin: "Brush off. Wash with soap and water.",
      eyes: "Flush with water for 15+ minutes. Seek medical attention.",
      ingestion: "Rinse mouth. Drink water."
    }
  },

  // ===== FLAMMABLES =====
  "Acetone": {
    cas: "67-64-1", formula: "C₃H₆O",
    de: "Aceton", es: "Acetona", fr: "Acétone", pt: "Acetona",
    synonyms: ["Propanone", "Dimethyl ketone"],
    classes: ["flammable"],
    ghs: ["GHS02", "GHS07"],
    hazardStatements: [
      { code: "H225", text: "Highly flammable liquid and vapor" },
      { code: "H319", text: "Causes serious eye irritation" },
      { code: "H336", text: "May cause drowsiness or dizziness" }
    ],
    ppe: {
      eyes: { required: true, type: "Safety glasses or goggles" },
      skin: { required: true, type: "Nitrile gloves (limited protection)" },
      respiratory: { required: false, type: "Use in well-ventilated area" },
      other: "No smoking, no open flames"
    },
    storage: {
      cabinet: "Flammable safety cabinet",
      temp: "Store cool, away from heat/ignition",
      ventilation: "Well-ventilated area",
      incompatible: ["Oxidizers", "Strong acids", "Strong bases"]
    },
    transport: { un: "1090", class: "3", packingGroup: "II", properShipping: "Acetone" },
    firstAid: {
      inhalation: "Move to fresh air. Rest.",
      skin: "Wash with soap and water.",
      eyes: "Flush with water for 15 minutes.",
      ingestion: "Rinse mouth. Do NOT induce vomiting."
    }
  },

  "Ethanol": {
    cas: "64-17-5", formula: "C₂H₅OH",
    de: "Ethanol", es: "Etanol", fr: "Éthanol", pt: "Etanol",
    synonyms: ["Ethyl alcohol", "Alcohol", "Spirits"],
    classes: ["flammable"],
    ghs: ["GHS02"],
    hazardStatements: [
      { code: "H225", text: "Highly flammable liquid and vapor" }
    ],
    ppe: {
      eyes: { required: true, type: "Safety glasses" },
      skin: { required: false, type: "Nitrile gloves for prolonged contact" },
      respiratory: { required: false, type: "Not required with good ventilation" },
      other: "No open flames"
    },
    storage: {
      cabinet: "Flammable safety cabinet",
      temp: "Store cool",
      ventilation: "Well-ventilated area",
      incompatible: ["Strong oxidizers", "Peroxides", "Strong acids"]
    },
    transport: { un: "1170", class: "3", packingGroup: "II", properShipping: "Ethanol" },
    firstAid: {
      inhalation: "Move to fresh air.",
      skin: "Wash with soap and water.",
      eyes: "Flush with water for several minutes.",
      ingestion: "Rinse mouth. Drink water."
    }
  },

  "Methanol": {
    cas: "67-56-1", formula: "CH₃OH",
    de: "Methanol", es: "Metanol", fr: "Méthanol", pt: "Metanol",
    synonyms: ["Methyl alcohol", "Wood alcohol"],
    classes: ["flammable", "toxic"],
    ghs: ["GHS02", "GHS06", "GHS08"],
    hazardStatements: [
      { code: "H225", text: "Highly flammable liquid and vapor" },
      { code: "H301", text: "Toxic if swallowed" },
      { code: "H311", text: "Toxic in contact with skin" },
      { code: "H331", text: "Toxic if inhaled" },
      { code: "H370", text: "Causes damage to organs (eyes, nervous system)" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles + face shield" },
      skin: { required: true, type: "Butyl rubber gloves, full body protection for large quantities" },
      respiratory: { required: true, type: "Organic vapor respirator; SCBA for high concentrations" },
      other: "No open flames, no smoking"
    },
    storage: {
      cabinet: "Flammable safety cabinet",
      temp: "Store cool, away from heat sources",
      ventilation: "Well-ventilated area, ground containers",
      incompatible: ["Oxidizers", "Strong acids", "Alkali metals"]
    },
    transport: { un: "1230", class: "3 (6.1)", packingGroup: "II", properShipping: "Methanol" },
    firstAid: {
      inhalation: "Move to fresh air. Give artificial respiration if needed. Seek immediate medical attention.",
      skin: "Remove clothing. Wash thoroughly with soap and water. Seek medical attention.",
      eyes: "Flush with water for 15-20 minutes. Seek immediate medical attention.",
      ingestion: "POISON - Seek immediate medical attention. Do NOT induce vomiting."
    }
  },

  "Isopropanol": {
    cas: "67-63-0", formula: "C₃H₇OH",
    de: "Isopropanol", es: "Isopropanol", fr: "Isopropanol", pt: "Isopropanol",
    synonyms: ["Isopropyl alcohol", "IPA", "Rubbing alcohol"],
    classes: ["flammable"],
    ghs: ["GHS02", "GHS07"],
    hazardStatements: [
      { code: "H225", text: "Highly flammable liquid and vapor" },
      { code: "H319", text: "Causes serious eye irritation" },
      { code: "H336", text: "May cause drowsiness or dizziness" }
    ],
    ppe: {
      eyes: { required: true, type: "Safety glasses" },
      skin: { required: false, type: "Nitrile gloves for prolonged contact" },
      respiratory: { required: false, type: "Use in well-ventilated area" },
      other: "No smoking, no open flames"
    },
    storage: {
      cabinet: "Flammable safety cabinet",
      temp: "Store cool",
      ventilation: "Well-ventilated area",
      incompatible: ["Strong oxidizers", "Strong acids"]
    },
    transport: { un: "1219", class: "3", packingGroup: "II", properShipping: "Isopropanol" },
    firstAid: {
      inhalation: "Move to fresh air.",
      skin: "Wash with soap and water.",
      eyes: "Flush with water for 15 minutes.",
      ingestion: "Rinse mouth. Seek medical attention if large amount ingested."
    }
  },

  "Toluene": {
    cas: "108-88-3", formula: "C₇H₈",
    de: "Toluol", es: "Tolueno", fr: "Toluène", pt: "Tolueno",
    synonyms: ["Methylbenzene", "Toluol"],
    classes: ["flammable", "toxic"],
    ghs: ["GHS02", "GHS07", "GHS08"],
    hazardStatements: [
      { code: "H225", text: "Highly flammable liquid and vapor" },
      { code: "H304", text: "May be fatal if swallowed and enters airways" },
      { code: "H315", text: "Causes skin irritation" },
      { code: "H336", text: "May cause drowsiness or dizziness" },
      { code: "H361d", text: "Suspected of damaging the unborn child" },
      { code: "H373", text: "May cause damage to organs through prolonged exposure" }
    ],
    ppe: {
      eyes: { required: true, type: "Safety glasses or chemical splash goggles" },
      skin: { required: true, type: "Nitrile or butyl gloves" },
      respiratory: { required: true, type: "Organic vapor respirator" },
      other: "No open flames, use in fume hood"
    },
    storage: {
      cabinet: "Flammable safety cabinet",
      temp: "Store cool",
      ventilation: "Well-ventilated area",
      incompatible: ["Strong oxidizers", "Strong acids"]
    },
    transport: { un: "1294", class: "3", packingGroup: "II", properShipping: "Toluene" },
    firstAid: {
      inhalation: "Move to fresh air. Seek medical attention.",
      skin: "Wash with soap and water.",
      eyes: "Flush with water for 15 minutes.",
      ingestion: "Do NOT induce vomiting. Seek immediate medical attention."
    }
  },

  "Xylene": {
    cas: "1330-20-7", formula: "C₈H₁₀",
    de: "Xylol", es: "Xileno", fr: "Xylène", pt: "Xileno",
    synonyms: ["Dimethylbenzene", "Xylol"],
    classes: ["flammable", "toxic"],
    ghs: ["GHS02", "GHS07", "GHS08"],
    hazardStatements: [
      { code: "H226", text: "Flammable liquid and vapor" },
      { code: "H304", text: "May be fatal if swallowed and enters airways" },
      { code: "H312", text: "Harmful in contact with skin" },
      { code: "H315", text: "Causes skin irritation" },
      { code: "H332", text: "Harmful if inhaled" }
    ],
    ppe: {
      eyes: { required: true, type: "Safety glasses" },
      skin: { required: true, type: "Nitrile or butyl gloves" },
      respiratory: { required: true, type: "Organic vapor respirator" },
      other: "Use in well-ventilated area or fume hood"
    },
    storage: {
      cabinet: "Flammable safety cabinet",
      temp: "Store cool",
      ventilation: "Well-ventilated area",
      incompatible: ["Strong oxidizers"]
    },
    transport: { un: "1307", class: "3", packingGroup: "III", properShipping: "Xylenes" },
    firstAid: {
      inhalation: "Move to fresh air. Seek medical attention.",
      skin: "Wash with soap and water.",
      eyes: "Flush with water for 15 minutes.",
      ingestion: "Do NOT induce vomiting. Seek medical attention."
    }
  },

  "Benzene": {
    cas: "71-43-2", formula: "C₆H₆",
    de: "Benzol", es: "Benceno", fr: "Benzène", pt: "Benzeno",
    synonyms: ["Benzol"],
    classes: ["flammable", "toxic"],
    ghs: ["GHS02", "GHS07", "GHS08"],
    hazardStatements: [
      { code: "H225", text: "Highly flammable liquid and vapor" },
      { code: "H304", text: "May be fatal if swallowed and enters airways" },
      { code: "H315", text: "Causes skin irritation" },
      { code: "H319", text: "Causes serious eye irritation" },
      { code: "H340", text: "May cause genetic defects" },
      { code: "H350", text: "May cause cancer" },
      { code: "H372", text: "Causes damage to organs through prolonged exposure" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles" },
      skin: { required: true, type: "Viton or butyl rubber gloves" },
      respiratory: { required: true, type: "Supplied air or SCBA for significant exposure" },
      other: "Handle in fume hood, minimize exposure"
    },
    storage: {
      cabinet: "Flammable safety cabinet",
      temp: "Store cool",
      ventilation: "Well-ventilated area",
      incompatible: ["Strong oxidizers"]
    },
    transport: { un: "1114", class: "3", packingGroup: "II", properShipping: "Benzene" },
    firstAid: {
      inhalation: "Move to fresh air immediately. Seek medical attention.",
      skin: "Remove contaminated clothing. Wash thoroughly.",
      eyes: "Flush with water for 15 minutes.",
      ingestion: "Do NOT induce vomiting. Seek immediate medical attention."
    }
  },

  "Hexane": {
    cas: "110-54-3", formula: "C₆H₁₄",
    de: "Hexan", es: "Hexano", fr: "Hexane", pt: "Hexano",
    synonyms: ["n-Hexane"],
    classes: ["flammable", "toxic"],
    ghs: ["GHS02", "GHS07", "GHS08", "GHS09"],
    hazardStatements: [
      { code: "H225", text: "Highly flammable liquid and vapor" },
      { code: "H304", text: "May be fatal if swallowed and enters airways" },
      { code: "H315", text: "Causes skin irritation" },
      { code: "H336", text: "May cause drowsiness or dizziness" },
      { code: "H361f", text: "Suspected of damaging fertility" },
      { code: "H373", text: "May cause damage to organs through prolonged exposure" },
      { code: "H411", text: "Toxic to aquatic life with long lasting effects" }
    ],
    ppe: {
      eyes: { required: true, type: "Safety glasses" },
      skin: { required: true, type: "Nitrile gloves" },
      respiratory: { required: true, type: "Organic vapor respirator" },
      other: "Use in fume hood, no open flames"
    },
    storage: {
      cabinet: "Flammable safety cabinet",
      temp: "Store cool",
      ventilation: "Well-ventilated area",
      incompatible: ["Strong oxidizers"]
    },
    transport: { un: "1208", class: "3", packingGroup: "II", properShipping: "Hexanes" },
    firstAid: {
      inhalation: "Move to fresh air. Seek medical attention.",
      skin: "Wash with soap and water.",
      eyes: "Flush with water for 15 minutes.",
      ingestion: "Do NOT induce vomiting. Seek medical attention."
    }
  },

  "Diethyl Ether": {
    cas: "60-29-7", formula: "C₄H₁₀O",
    de: "Diethylether", es: "Éter dietílico", fr: "Éther diéthylique", pt: "Éter dietílico",
    synonyms: ["Ether", "Ethoxyethane"],
    classes: ["flammable"],
    ghs: ["GHS02", "GHS07"],
    hazardStatements: [
      { code: "H224", text: "Extremely flammable liquid and vapor" },
      { code: "H302", text: "Harmful if swallowed" },
      { code: "H336", text: "May cause drowsiness or dizziness" }
    ],
    ppe: {
      eyes: { required: true, type: "Safety glasses" },
      skin: { required: true, type: "Nitrile gloves" },
      respiratory: { required: false, type: "Use in well-ventilated area" },
      other: "EXTREME fire hazard, no ignition sources"
    },
    storage: {
      cabinet: "Flammable safety cabinet, explosion-proof",
      temp: "Store cold, away from all heat",
      ventilation: "Well-ventilated area",
      incompatible: ["Oxidizers", "Halogens", "Peroxides may form over time"]
    },
    transport: { un: "1155", class: "3", packingGroup: "I", properShipping: "Diethyl ether" },
    firstAid: {
      inhalation: "Move to fresh air. Rest.",
      skin: "Wash with soap and water.",
      eyes: "Flush with water for 15 minutes.",
      ingestion: "Rinse mouth. Do NOT induce vomiting."
    }
  },

  "Tetrahydrofuran": {
    cas: "109-99-9", formula: "C₄H₈O",
    de: "Tetrahydrofuran", es: "Tetrahidrofurano", fr: "Tétrahydrofurane", pt: "Tetrahidrofurano",
    synonyms: ["THF", "Oxolane"],
    classes: ["flammable"],
    ghs: ["GHS02", "GHS07"],
    hazardStatements: [
      { code: "H225", text: "Highly flammable liquid and vapor" },
      { code: "H319", text: "Causes serious eye irritation" },
      { code: "H335", text: "May cause respiratory irritation" },
      { code: "H336", text: "May cause drowsiness or dizziness" }
    ],
    ppe: {
      eyes: { required: true, type: "Safety glasses or goggles" },
      skin: { required: true, type: "Butyl rubber gloves (nitrile not suitable)" },
      respiratory: { required: false, type: "Use in well-ventilated area" },
      other: "May form peroxides - check before distilling"
    },
    storage: {
      cabinet: "Flammable safety cabinet",
      temp: "Store cool",
      ventilation: "Well-ventilated area",
      incompatible: ["Strong oxidizers", "Strong acids", "May form explosive peroxides"]
    },
    transport: { un: "2056", class: "3", packingGroup: "II", properShipping: "Tetrahydrofuran" },
    firstAid: {
      inhalation: "Move to fresh air.",
      skin: "Wash with soap and water.",
      eyes: "Flush with water for 15 minutes.",
      ingestion: "Rinse mouth. Seek medical attention."
    }
  },

  "Acetonitrile": {
    cas: "75-05-8", formula: "CH₃CN",
    de: "Acetonitril", es: "Acetonitrilo", fr: "Acétonitrile", pt: "Acetonitrila",
    synonyms: ["Methyl cyanide"],
    classes: ["flammable", "toxic"],
    ghs: ["GHS02", "GHS07"],
    hazardStatements: [
      { code: "H225", text: "Highly flammable liquid and vapor" },
      { code: "H302", text: "Harmful if swallowed" },
      { code: "H312", text: "Harmful in contact with skin" },
      { code: "H319", text: "Causes serious eye irritation" },
      { code: "H332", text: "Harmful if inhaled" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles" },
      skin: { required: true, type: "Nitrile or butyl gloves" },
      respiratory: { required: true, type: "Organic vapor respirator" },
      other: "Use in fume hood"
    },
    storage: {
      cabinet: "Flammable safety cabinet",
      temp: "Store cool",
      ventilation: "Well-ventilated area",
      incompatible: ["Strong oxidizers", "Strong acids", "Strong bases"]
    },
    transport: { un: "1648", class: "3", packingGroup: "II", properShipping: "Acetonitrile" },
    firstAid: {
      inhalation: "Move to fresh air. Seek medical attention.",
      skin: "Wash with soap and water.",
      eyes: "Flush with water for 15 minutes.",
      ingestion: "Seek medical attention. May release cyanide in body."
    }
  },

  // ===== OXIDIZERS =====
  "Hydrogen Peroxide": {
    cas: "7722-84-1", formula: "H₂O₂",
    de: "Wasserstoffperoxid", es: "Peróxido de hidrógeno", fr: "Peroxyde d'hydrogène", pt: "Peróxido de hidrogênio",
    synonyms: ["Peroxide"],
    classes: ["oxidizer", "corrosive"],
    ghs: ["GHS03", "GHS05", "GHS07"],
    hazardStatements: [
      { code: "H271", text: "May cause fire or explosion; strong oxidizer" },
      { code: "H302", text: "Harmful if swallowed" },
      { code: "H314", text: "Causes severe skin burns and eye damage" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles + face shield" },
      skin: { required: true, type: "Neoprene or PVC gloves, chemical-resistant suit" },
      respiratory: { required: false, type: "Not required with good ventilation" },
      other: "Keep away from combustibles"
    },
    storage: {
      cabinet: "Oxidizer storage (separate from flammables and organics)",
      temp: "Store cool, in original container",
      ventilation: "Well-ventilated, vented container",
      incompatible: ["Flammables", "Organic materials", "Metals", "Reducing agents"]
    },
    transport: { un: "2014", class: "5.1 (8)", packingGroup: "II", properShipping: "Hydrogen peroxide, aqueous solution" },
    firstAid: {
      inhalation: "Move to fresh air. Seek medical attention.",
      skin: "Flush with water for 15+ minutes.",
      eyes: "Flush with water for 15-20 minutes. Seek immediate medical attention.",
      ingestion: "Rinse mouth. Do NOT induce vomiting. Seek medical attention."
    }
  },

  "Sodium Hypochlorite": {
    cas: "7681-52-9", formula: "NaOCl",
    de: "Natriumhypochlorit", es: "Hipoclorito de sodio", fr: "Hypochlorite de sodium", pt: "Hipoclorito de sódio",
    synonyms: ["Bleach", "Chlorine bleach"],
    classes: ["oxidizer", "corrosive"],
    ghs: ["GHS05", "GHS09"],
    hazardStatements: [
      { code: "H314", text: "Causes severe skin burns and eye damage" },
      { code: "H400", text: "Very toxic to aquatic life" },
      { code: "H290", text: "May be corrosive to metals" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles" },
      skin: { required: true, type: "Rubber or nitrile gloves" },
      respiratory: { required: true, type: "Chlorine-rated respirator if mixed with acid" },
      other: "NEVER mix with acids or ammonia"
    },
    storage: {
      cabinet: "Oxidizer storage",
      temp: "Store cool, away from sunlight",
      ventilation: "Ventilated area",
      incompatible: ["Acids (releases toxic chlorine gas!)", "Ammonia", "Organics"]
    },
    transport: { un: "1791", class: "8", packingGroup: "II", properShipping: "Hypochlorite solution" },
    firstAid: {
      inhalation: "Move to fresh air. Seek medical attention if symptoms persist.",
      skin: "Flush with water for 15 minutes.",
      eyes: "Flush with water for 20 minutes. Seek medical attention.",
      ingestion: "Rinse mouth. Drink water. Do NOT induce vomiting."
    }
  },

  "Potassium Permanganate": {
    cas: "7722-64-7", formula: "KMnO₄",
    de: "Kaliumpermanganat", es: "Permanganato de potasio", fr: "Permanganate de potassium", pt: "Permanganato de potássio",
    synonyms: ["Condy's crystals"],
    classes: ["oxidizer", "toxic"],
    ghs: ["GHS03", "GHS05", "GHS07", "GHS09"],
    hazardStatements: [
      { code: "H272", text: "May intensify fire; oxidizer" },
      { code: "H302", text: "Harmful if swallowed" },
      { code: "H314", text: "Causes severe skin burns and eye damage" },
      { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles" },
      skin: { required: true, type: "Rubber gloves" },
      respiratory: { required: false, type: "Dust mask if handling powder" },
      other: "Stains skin purple - harmless but unsightly"
    },
    storage: {
      cabinet: "Oxidizer storage",
      temp: "Room temperature",
      ventilation: "Normal",
      incompatible: ["Organics", "Reducing agents", "Glycerol", "Sulfuric acid"]
    },
    transport: { un: "1490", class: "5.1", packingGroup: "II", properShipping: "Potassium permanganate" },
    firstAid: {
      inhalation: "Move to fresh air.",
      skin: "Flush with water for 15 minutes.",
      eyes: "Flush with water for 20 minutes. Seek medical attention.",
      ingestion: "Rinse mouth. Seek medical attention."
    }
  },

  "Sodium Nitrate": {
    cas: "7631-99-4", formula: "NaNO₃",
    de: "Natriumnitrat", es: "Nitrato de sodio", fr: "Nitrate de sodium", pt: "Nitrato de sódio",
    synonyms: ["Chile saltpeter"],
    classes: ["oxidizer"],
    ghs: ["GHS03", "GHS07"],
    hazardStatements: [
      { code: "H272", text: "May intensify fire; oxidizer" },
      { code: "H319", text: "Causes serious eye irritation" }
    ],
    ppe: {
      eyes: { required: true, type: "Safety glasses" },
      skin: { required: false, type: "Gloves for prolonged contact" },
      respiratory: { required: false, type: "Dust mask if handling powder" },
      other: "Keep away from combustibles"
    },
    storage: {
      cabinet: "Oxidizer storage",
      temp: "Room temperature, keep dry",
      ventilation: "Normal",
      incompatible: ["Flammables", "Organics", "Reducing agents"]
    },
    transport: { un: "1498", class: "5.1", packingGroup: "III", properShipping: "Sodium nitrate" },
    firstAid: {
      inhalation: "Move to fresh air.",
      skin: "Wash with soap and water.",
      eyes: "Flush with water for 15 minutes.",
      ingestion: "Rinse mouth. Drink water."
    }
  },

  "Ammonium Nitrate": {
    cas: "6484-52-2", formula: "NH₄NO₃",
    de: "Ammoniumnitrat", es: "Nitrato de amonio", fr: "Nitrate d'ammonium", pt: "Nitrato de amônio",
    synonyms: ["AN"],
    classes: ["oxidizer"],
    ghs: ["GHS03"],
    hazardStatements: [
      { code: "H272", text: "May intensify fire; oxidizer" }
    ],
    ppe: {
      eyes: { required: true, type: "Safety glasses" },
      skin: { required: false, type: "Gloves for prolonged contact" },
      respiratory: { required: false, type: "Dust mask" },
      other: "EXPLOSION RISK if contaminated or confined with heat"
    },
    storage: {
      cabinet: "Oxidizer storage, isolated area",
      temp: "Keep cool, away from heat",
      ventilation: "Well-ventilated",
      incompatible: ["Combustibles", "Organics", "Fuels", "Reducing agents", "Heat sources"]
    },
    transport: { un: "1942", class: "5.1", packingGroup: "III", properShipping: "Ammonium nitrate" },
    firstAid: {
      inhalation: "Move to fresh air.",
      skin: "Wash with soap and water.",
      eyes: "Flush with water for 15 minutes.",
      ingestion: "Rinse mouth. Drink water."
    }
  },

  // ===== TOXIC =====
  "Formaldehyde": {
    cas: "50-00-0", formula: "CH₂O",
    de: "Formaldehyd", es: "Formaldehído", fr: "Formaldéhyde", pt: "Formaldeído",
    synonyms: ["Formalin (aqueous solution)", "Methanal"],
    classes: ["flammable", "toxic", "corrosive"],
    ghs: ["GHS02", "GHS05", "GHS06", "GHS08"],
    hazardStatements: [
      { code: "H226", text: "Flammable liquid and vapor" },
      { code: "H301", text: "Toxic if swallowed" },
      { code: "H311", text: "Toxic in contact with skin" },
      { code: "H314", text: "Causes severe skin burns and eye damage" },
      { code: "H317", text: "May cause an allergic skin reaction" },
      { code: "H331", text: "Toxic if inhaled" },
      { code: "H350", text: "May cause cancer" },
      { code: "H370", text: "Causes damage to organs" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles + face shield" },
      skin: { required: true, type: "Butyl rubber or nitrile gloves, chemical suit" },
      respiratory: { required: true, type: "Formaldehyde-rated respirator or SCBA" },
      other: "Handle in fume hood only"
    },
    storage: {
      cabinet: "Toxic chemical storage, temperature controlled",
      temp: "Store at 15-25°C (prevents polymerization)",
      ventilation: "Well-ventilated area",
      incompatible: ["Strong oxidizers", "Strong acids", "Strong bases", "Amines"]
    },
    transport: { un: "2209", class: "8", packingGroup: "III", properShipping: "Formaldehyde solution" },
    firstAid: {
      inhalation: "Move to fresh air immediately. Seek immediate medical attention.",
      skin: "Flush with water for 15+ minutes. Remove clothing. Seek medical attention.",
      eyes: "Flush with water for 20+ minutes. Seek immediate medical attention.",
      ingestion: "Do NOT induce vomiting. Seek immediate medical attention."
    }
  },

  "Chlorine": {
    cas: "7782-50-5", formula: "Cl₂",
    de: "Chlor", es: "Cloro", fr: "Chlore", pt: "Cloro",
    synonyms: ["Chlorine gas"],
    classes: ["oxidizer", "toxic", "corrosive"],
    ghs: ["GHS03", "GHS04", "GHS05", "GHS06", "GHS09"],
    hazardStatements: [
      { code: "H270", text: "May cause or intensify fire; oxidizer" },
      { code: "H280", text: "Contains gas under pressure" },
      { code: "H315", text: "Causes skin irritation" },
      { code: "H319", text: "Causes serious eye irritation" },
      { code: "H330", text: "Fatal if inhaled" },
      { code: "H335", text: "May cause respiratory irritation" },
      { code: "H400", text: "Very toxic to aquatic life" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles + face shield" },
      skin: { required: true, type: "Full chemical suit" },
      respiratory: { required: true, type: "SCBA or supplied air required" },
      other: "Highly toxic - handle with extreme caution"
    },
    storage: {
      cabinet: "Separate toxic gas storage, outdoors or in gas cabinet",
      temp: "Room temperature",
      ventilation: "Excellent ventilation, gas detectors recommended",
      incompatible: ["Flammables", "Ammonia", "Hydrogen", "Most metals when wet"]
    },
    transport: { un: "1017", class: "2.3 (5.1, 8)", packingGroup: "-", properShipping: "Chlorine" },
    firstAid: {
      inhalation: "Move to fresh air immediately. Give oxygen. Seek immediate medical attention.",
      skin: "Flush with water for 15+ minutes.",
      eyes: "Flush with water for 20+ minutes. Seek immediate medical attention.",
      ingestion: "Not applicable (gas)"
    }
  },

  "Dichloromethane": {
    cas: "75-09-2", formula: "CH₂Cl₂",
    de: "Dichlormethan", es: "Diclorometano", fr: "Dichlorométhane", pt: "Diclorometano",
    synonyms: ["Methylene chloride", "DCM"],
    classes: ["toxic"],
    ghs: ["GHS07", "GHS08"],
    hazardStatements: [
      { code: "H315", text: "Causes skin irritation" },
      { code: "H319", text: "Causes serious eye irritation" },
      { code: "H335", text: "May cause respiratory irritation" },
      { code: "H336", text: "May cause drowsiness or dizziness" },
      { code: "H351", text: "Suspected of causing cancer" },
      { code: "H373", text: "May cause damage to organs through prolonged exposure" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles" },
      skin: { required: true, type: "Viton or polyvinyl alcohol (PVA) gloves - NOT nitrile" },
      respiratory: { required: true, type: "Organic vapor respirator with high efficiency" },
      other: "Use in fume hood only"
    },
    storage: {
      cabinet: "General chemical storage (not flammable)",
      temp: "Room temperature",
      ventilation: "Well-ventilated area",
      incompatible: ["Strong oxidizers", "Alkali metals", "Strong bases"]
    },
    transport: { un: "1593", class: "6.1", packingGroup: "III", properShipping: "Dichloromethane" },
    firstAid: {
      inhalation: "Move to fresh air. Seek medical attention.",
      skin: "Wash with soap and water.",
      eyes: "Flush with water for 15 minutes.",
      ingestion: "Rinse mouth. Do NOT induce vomiting. Seek medical attention."
    }
  },

  "Chloroform": {
    cas: "67-66-3", formula: "CHCl₃",
    de: "Chloroform", es: "Cloroformo", fr: "Chloroforme", pt: "Clorofórmio",
    synonyms: ["Trichloromethane"],
    classes: ["toxic"],
    ghs: ["GHS06", "GHS08"],
    hazardStatements: [
      { code: "H302", text: "Harmful if swallowed" },
      { code: "H315", text: "Causes skin irritation" },
      { code: "H319", text: "Causes serious eye irritation" },
      { code: "H331", text: "Toxic if inhaled" },
      { code: "H351", text: "Suspected of causing cancer" },
      { code: "H361d", text: "Suspected of damaging the unborn child" },
      { code: "H372", text: "Causes damage to organs through prolonged exposure" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles" },
      skin: { required: true, type: "Viton or polyvinyl alcohol gloves" },
      respiratory: { required: true, type: "Organic vapor respirator or SCBA" },
      other: "Use in fume hood only"
    },
    storage: {
      cabinet: "Toxic chemical storage",
      temp: "Room temperature, in dark bottles",
      ventilation: "Well-ventilated area",
      incompatible: ["Strong bases", "Strong oxidizers", "Alkali metals"]
    },
    transport: { un: "1888", class: "6.1", packingGroup: "III", properShipping: "Chloroform" },
    firstAid: {
      inhalation: "Move to fresh air immediately. Seek medical attention.",
      skin: "Wash with soap and water.",
      eyes: "Flush with water for 15 minutes.",
      ingestion: "Do NOT induce vomiting. Seek medical attention."
    }
  },

  "Phenol": {
    cas: "108-95-2", formula: "C₆H₅OH",
    de: "Phenol", es: "Fenol", fr: "Phénol", pt: "Fenol",
    synonyms: ["Carbolic acid", "Hydroxybenzene"],
    classes: ["toxic", "corrosive"],
    ghs: ["GHS05", "GHS06", "GHS08"],
    hazardStatements: [
      { code: "H301", text: "Toxic if swallowed" },
      { code: "H311", text: "Toxic in contact with skin" },
      { code: "H314", text: "Causes severe skin burns and eye damage" },
      { code: "H331", text: "Toxic if inhaled" },
      { code: "H341", text: "Suspected of causing genetic defects" },
      { code: "H373", text: "May cause damage to organs through prolonged exposure" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles + face shield" },
      skin: { required: true, type: "Butyl rubber or neoprene gloves, full suit" },
      respiratory: { required: true, type: "Organic vapor respirator" },
      other: "Rapidly absorbed through skin!"
    },
    storage: {
      cabinet: "Toxic chemical storage",
      temp: "Room temperature, keep container closed",
      ventilation: "Well-ventilated area",
      incompatible: ["Strong oxidizers", "Strong bases"]
    },
    transport: { un: "1671", class: "6.1 (8)", packingGroup: "II", properShipping: "Phenol, solid" },
    firstAid: {
      inhalation: "Move to fresh air. Seek immediate medical attention.",
      skin: "Wipe off immediately with PEG 400 or glycerol. Then flush with water. Seek immediate medical attention.",
      eyes: "Flush with water for 20+ minutes. Seek immediate medical attention.",
      ingestion: "Do NOT induce vomiting. Seek immediate medical attention."
    }
  },

  // ===== ADDITIONAL COMMON CHEMICALS =====
  "Sodium Chloride": {
    cas: "7647-14-5", formula: "NaCl",
    de: "Natriumchlorid", es: "Cloruro de sodio", fr: "Chlorure de sodium", pt: "Cloreto de sódio",
    synonyms: ["Table salt", "Rock salt"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: {
      eyes: { required: false, type: "Safety glasses if dusty" },
      skin: { required: false, type: "Not required" },
      respiratory: { required: false, type: "Not required" },
      other: "Non-hazardous"
    },
    storage: {
      cabinet: "General storage",
      temp: "Room temperature",
      ventilation: "Normal",
      incompatible: ["Strong acids (releases HCl fumes)"]
    },
    transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
    firstAid: {
      inhalation: "Move to fresh air.",
      skin: "Wash with water.",
      eyes: "Flush with water.",
      ingestion: "Drink water."
    }
  },

  "Copper Sulfate": {
    cas: "7758-99-8", formula: "CuSO₄·5H₂O",
    de: "Kupfersulfat", es: "Sulfato de cobre", fr: "Sulfate de cuivre", pt: "Sulfato de cobre",
    synonyms: ["Blue vitriol", "Bluestone"],
    classes: ["toxic"],
    ghs: ["GHS07", "GHS09"],
    hazardStatements: [
      { code: "H302", text: "Harmful if swallowed" },
      { code: "H315", text: "Causes skin irritation" },
      { code: "H319", text: "Causes serious eye irritation" },
      { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
    ],
    ppe: {
      eyes: { required: true, type: "Safety glasses" },
      skin: { required: true, type: "Rubber gloves" },
      respiratory: { required: false, type: "Dust mask if handling powder" },
      other: "Stains skin/nails blue temporarily"
    },
    storage: {
      cabinet: "General chemical storage",
      temp: "Room temperature",
      ventilation: "Normal",
      incompatible: ["Aluminum", "Magnesium", "Strong bases"]
    },
    transport: { un: "3077", class: "9", packingGroup: "III", properShipping: "Environmentally hazardous substance" },
    firstAid: {
      inhalation: "Move to fresh air.",
      skin: "Wash with soap and water.",
      eyes: "Flush with water for 15 minutes.",
      ingestion: "Rinse mouth. Seek medical attention."
    }
  },

  "Iron(III) Chloride": {
    cas: "7705-08-0", formula: "FeCl₃",
    de: "Eisen(III)-chlorid", es: "Cloruro de hierro(III)", fr: "Chlorure de fer(III)", pt: "Cloreto de ferro(III)",
    synonyms: ["Ferric chloride"],
    classes: ["corrosive"],
    ghs: ["GHS05", "GHS07"],
    hazardStatements: [
      { code: "H290", text: "May be corrosive to metals" },
      { code: "H302", text: "Harmful if swallowed" },
      { code: "H315", text: "Causes skin irritation" },
      { code: "H318", text: "Causes serious eye damage" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles" },
      skin: { required: true, type: "Rubber or nitrile gloves" },
      respiratory: { required: false, type: "Not typically required" },
      other: "Stains skin and fabric"
    },
    storage: {
      cabinet: "Corrosive chemical storage",
      temp: "Room temperature",
      ventilation: "Normal",
      incompatible: ["Bases", "Most metals"]
    },
    transport: { un: "2582", class: "8", packingGroup: "III", properShipping: "Ferric chloride solution" },
    firstAid: {
      inhalation: "Move to fresh air.",
      skin: "Wash with soap and water.",
      eyes: "Flush with water for 20 minutes. Seek medical attention.",
      ingestion: "Rinse mouth. Drink water. Seek medical attention."
    }
  },

  "Silver Nitrate": {
    cas: "7761-88-8", formula: "AgNO₃",
    de: "Silbernitrat", es: "Nitrato de plata", fr: "Nitrate d'argent", pt: "Nitrato de prata",
    synonyms: ["Lunar caustic"],
    classes: ["oxidizer", "corrosive"],
    ghs: ["GHS03", "GHS05", "GHS09"],
    hazardStatements: [
      { code: "H272", text: "May intensify fire; oxidizer" },
      { code: "H314", text: "Causes severe skin burns and eye damage" },
      { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles" },
      skin: { required: true, type: "Nitrile gloves" },
      respiratory: { required: false, type: "Not required" },
      other: "Permanently stains skin black"
    },
    storage: {
      cabinet: "Oxidizer storage, protected from light",
      temp: "Room temperature, in dark bottles",
      ventilation: "Normal",
      incompatible: ["Reducing agents", "Organics", "Ammonia"]
    },
    transport: { un: "1493", class: "5.1", packingGroup: "II", properShipping: "Silver nitrate" },
    firstAid: {
      inhalation: "Move to fresh air.",
      skin: "Wash with water.",
      eyes: "Flush with water for 20 minutes. Seek medical attention.",
      ingestion: "Rinse mouth. Seek medical attention."
    }
  },

  "Zinc Chloride": {
    cas: "7646-85-7", formula: "ZnCl₂",
    de: "Zinkchlorid", es: "Cloruro de zinc", fr: "Chlorure de zinc", pt: "Cloreto de zinco",
    synonyms: ["Butter of zinc"],
    classes: ["corrosive"],
    ghs: ["GHS05", "GHS07", "GHS09"],
    hazardStatements: [
      { code: "H302", text: "Harmful if swallowed" },
      { code: "H314", text: "Causes severe skin burns and eye damage" },
      { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
    ],
    ppe: {
      eyes: { required: true, type: "Chemical splash goggles" },
      skin: { required: true, type: "Nitrile or rubber gloves" },
      respiratory: { required: false, type: "Dust mask if handling powder" },
      other: "Very hygroscopic"
    },
    storage: {
      cabinet: "Corrosive storage",
      temp: "Room temperature, keep dry",
      ventilation: "Normal",
      incompatible: ["Strong bases", "Water (reacts exothermically)"]
    },
    transport: { un: "2331", class: "8", packingGroup: "III", properShipping: "Zinc chloride" },
    firstAid: {
      inhalation: "Move to fresh air.",
      skin: "Flush with water for 15 minutes.",
      eyes: "Flush with water for 20 minutes. Seek medical attention.",
      ingestion: "Rinse mouth. Drink water or milk. Seek medical attention."
    }
  },

  "Glycerol": {
    cas: "56-81-5", formula: "C₃H₈O₃",
    de: "Glycerin", es: "Glicerol", fr: "Glycérol", pt: "Glicerol",
    synonyms: ["Glycerin", "Glycerine"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: {
      eyes: { required: false, type: "Safety glasses if splashing" },
      skin: { required: false, type: "Not required" },
      respiratory: { required: false, type: "Not required" },
      other: "Non-hazardous"
    },
    storage: {
      cabinet: "General storage",
      temp: "Room temperature",
      ventilation: "Normal",
      incompatible: ["Strong oxidizers (especially potassium permanganate!)"]
    },
    transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
    firstAid: {
      inhalation: "Move to fresh air.",
      skin: "Wash with water.",
      eyes: "Flush with water.",
      ingestion: "Rinse mouth."
    }
  },

  "Dimethyl Sulfoxide": {
    cas: "67-68-5", formula: "C₂H₆OS",
    de: "Dimethylsulfoxid", es: "Dimetilsulfóxido", fr: "Diméthylsulfoxyde", pt: "Dimetilsulfóxido",
    synonyms: ["DMSO"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: {
      eyes: { required: true, type: "Safety glasses" },
      skin: { required: true, type: "Nitrile gloves (note: DMSO carries chemicals through skin!)" },
      respiratory: { required: false, type: "Not required" },
      other: "Penetrates skin rapidly and carries dissolved chemicals with it!"
    },
    storage: {
      cabinet: "General storage",
      temp: "Room temperature",
      ventilation: "Normal",
      incompatible: ["Strong oxidizers", "Acyl chlorides"]
    },
    transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
    firstAid: {
      inhalation: "Move to fresh air.",
      skin: "Wash immediately with water.",
      eyes: "Flush with water for 15 minutes.",
      ingestion: "Rinse mouth. Drink water."
    }
  },

  // ===== ADDITIONAL ACIDS =====
  "Chromic Acid": {
    cas: "7738-94-5", formula: "H₂CrO₄",
    de: "Chromsäure", es: "Ácido crómico", fr: "Acide chromique", pt: "Ácido crômico",
    synonyms: ["Chromium trioxide solution"],
    classes: ["acid", "corrosive", "oxidizer", "toxic"],
    ghs: ["GHS03", "GHS05", "GHS06", "GHS08", "GHS09"],
    hazardStatements: [
      { code: "H350", text: "May cause cancer" },
      { code: "H314", text: "Causes severe skin burns and eye damage" },
      { code: "H317", text: "May cause allergic skin reaction" }
    ],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Butyl gloves, full suit" }, respiratory: { required: true, type: "P100/OV respirator" }, other: "Full chemical protection required" },
    storage: { cabinet: "Oxidizer cabinet (separate from organics)", temp: "Below 25°C", ventilation: "Required", incompatible: ["Organic materials", "Flammables", "Reducing agents"] },
    transport: { un: "1755", class: "8", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air, medical attention.", skin: "Flush 20+ min, seek medical care.", eyes: "Flush 20+ min, immediate medical attention.", ingestion: "Do NOT induce vomiting, seek emergency care." }
  },

  "Hydrofluoric Acid": {
    cas: "7664-39-3", formula: "HF",
    de: "Flusssäure", es: "Ácido fluorhídrico", fr: "Acide fluorhydrique", pt: "Ácido fluorídrico",
    synonyms: ["HF", "Hydrogen fluoride solution"],
    classes: ["acid", "corrosive", "toxic"],
    ghs: ["GHS05", "GHS06"],
    hazardStatements: [
      { code: "H300", text: "Fatal if swallowed" },
      { code: "H310", text: "Fatal in contact with skin" },
      { code: "H314", text: "Causes severe skin burns and eye damage" },
      { code: "H330", text: "Fatal if inhaled" }
    ],
    ppe: { eyes: { required: true, type: "Face shield + splash goggles" }, skin: { required: true, type: "Neoprene or butyl gloves, full suit" }, respiratory: { required: true, type: "Full-face respirator with acid gas cartridge" }, other: "Calcium gluconate gel must be available" },
    storage: { cabinet: "Dedicated HF storage (polyethylene containers)", temp: "Cool, below 25°C", ventilation: "Required - corrosive fumes", incompatible: ["Glass", "Metals", "Concrete", "Bases", "Ammonia"] },
    transport: { un: "1790", class: "8", packingGroup: "II" },
    firstAid: { inhalation: "Remove to fresh air immediately, seek emergency care.", skin: "Flush with water, apply calcium gluconate gel, SEEK IMMEDIATE MEDICAL CARE.", eyes: "Flush 15+ min, seek immediate medical attention.", ingestion: "Do NOT induce vomiting, give calcium antacid if conscious, emergency care." }
  },

  "Perchloric Acid": {
    cas: "7601-90-3", formula: "HClO₄",
    de: "Perchlorsäure", es: "Ácido perclórico", fr: "Acide perchlorique", pt: "Ácido perclórico",
    synonyms: [],
    classes: ["acid", "corrosive", "oxidizer"],
    ghs: ["GHS03", "GHS05"],
    hazardStatements: [
      { code: "H271", text: "May cause fire or explosion; strong oxidizer" },
      { code: "H314", text: "Causes severe skin burns and eye damage" }
    ],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "PVC or neoprene gloves" }, respiratory: { required: true, type: "Acid gas respirator" }, other: "Fire-resistant clothing" },
    storage: { cabinet: "Dedicated perchloric acid cabinet", temp: "Below 25°C", ventilation: "Special perchloric acid fume hood required", incompatible: ["Organic materials", "Metals", "Flammables", "Reducing agents"] },
    transport: { un: "1873", class: "5.1", packingGroup: "I" },
    firstAid: { inhalation: "Fresh air, medical care.", skin: "Flush 20+ min.", eyes: "Flush 20+ min.", ingestion: "Do NOT induce vomiting, emergency care." }
  },

  "Lactic Acid": {
    cas: "50-21-5", formula: "C₃H₆O₃",
    de: "Milchsäure", es: "Ácido láctico", fr: "Acide lactique", pt: "Ácido lático",
    synonyms: ["2-Hydroxypropanoic acid"],
    classes: ["acid"],
    ghs: ["GHS05"],
    hazardStatements: [
      { code: "H315", text: "Causes skin irritation" },
      { code: "H318", text: "Causes serious eye damage" }
    ],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Not normally required" }, other: "Standard lab coat" },
    storage: { cabinet: "General chemical storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong bases"] },
    transport: { un: "Not regulated", class: "Not hazardous for transport", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush 15 min.", ingestion: "Rinse mouth, drink water." }
  },

  // ===== ADDITIONAL BASES =====
  "Sodium Carbonate": {
    cas: "497-19-8", formula: "Na₂CO₃",
    de: "Natriumcarbonat", es: "Carbonato de sodio", fr: "Carbonate de sodium", pt: "Carbonato de sódio",
    synonyms: ["Soda ash", "Washing soda"],
    classes: ["base"],
    ghs: ["GHS07"],
    hazardStatements: [
      { code: "H319", text: "Causes serious eye irritation" }
    ],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Nitrile gloves recommended" }, respiratory: { required: false, type: "Dust mask if handling powder" }, other: "Standard PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids", "Aluminum"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush 10 min.", ingestion: "Rinse mouth, drink water." }
  },

  "Sodium Bicarbonate": {
    cas: "144-55-8", formula: "NaHCO₃",
    de: "Natriumhydrogencarbonat", es: "Bicarbonato de sodio", fr: "Bicarbonate de sodium", pt: "Bicarbonato de sódio",
    synonyms: ["Baking soda", "Sodium hydrogen carbonate"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: false, type: "Safety glasses if dusty" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Dust mask if needed" }, other: "Minimal PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Safe in small amounts." }
  },

  "Lithium Hydroxide": {
    cas: "1310-65-2", formula: "LiOH",
    de: "Lithiumhydroxid", es: "Hidróxido de litio", fr: "Hydroxyde de lithium", pt: "Hidróxido de lítio",
    synonyms: [],
    classes: ["base", "corrosive"],
    ghs: ["GHS05"],
    hazardStatements: [
      { code: "H302", text: "Harmful if swallowed" },
      { code: "H314", text: "Causes severe skin burns and eye damage" }
    ],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Neoprene gloves" }, respiratory: { required: true, type: "Dust mask minimum" }, other: "Chemical-resistant clothing" },
    storage: { cabinet: "Base cabinet", temp: "Dry storage", ventilation: "Normal", incompatible: ["Acids", "Water (reacts)"] },
    transport: { un: "2680", class: "8", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air, medical care.", skin: "Flush 20+ min.", eyes: "Flush 20+ min.", ingestion: "Do NOT induce vomiting." }
  },

  // ===== ADDITIONAL SOLVENTS =====
  "Ethyl Acetate": {
    cas: "141-78-6", formula: "C₄H₈O₂",
    de: "Ethylacetat", es: "Acetato de etilo", fr: "Acétate d'éthyle", pt: "Acetato de etila",
    synonyms: ["Ethyl ethanoate", "EtOAc"],
    classes: ["flammable"],
    ghs: ["GHS02", "GHS07"],
    hazardStatements: [
      { code: "H225", text: "Highly flammable liquid and vapor" },
      { code: "H319", text: "Causes serious eye irritation" },
      { code: "H336", text: "May cause drowsiness or dizziness" }
    ],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator in confined spaces" }, other: "No ignition sources" },
    storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Required", incompatible: ["Oxidizers", "Strong acids", "Strong bases"] },
    transport: { un: "1173", class: "3", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 10 min.", ingestion: "Rinse mouth, do not induce vomiting." }
  },

  "Butanol": {
    cas: "71-36-3", formula: "C₄H₁₀O",
    de: "Butanol", es: "Butanol", fr: "Butanol", pt: "Butanol",
    synonyms: ["n-Butanol", "1-Butanol", "Butyl alcohol"],
    classes: ["flammable", "toxic"],
    ghs: ["GHS02", "GHS05", "GHS07"],
    hazardStatements: [
      { code: "H226", text: "Flammable liquid and vapor" },
      { code: "H302", text: "Harmful if swallowed" },
      { code: "H318", text: "Causes serious eye damage" },
      { code: "H335", text: "May cause respiratory irritation" }
    ],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "OV respirator" }, other: "Ventilation" },
    storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Required", incompatible: ["Oxidizers", "Strong acids"] },
    transport: { un: "1120", class: "3", packingGroup: "III" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min, medical care.", ingestion: "Rinse mouth." }
  },

  "Cyclohexane": {
    cas: "110-82-7", formula: "C₆H₁₂",
    de: "Cyclohexan", es: "Ciclohexano", fr: "Cyclohexane", pt: "Ciclo-hexano",
    synonyms: ["Hexamethylene", "Hexahydrobenzene"],
    classes: ["flammable"],
    ghs: ["GHS02", "GHS07", "GHS08", "GHS09"],
    hazardStatements: [
      { code: "H225", text: "Highly flammable liquid and vapor" },
      { code: "H304", text: "May be fatal if swallowed and enters airways" },
      { code: "H315", text: "Causes skin irritation" },
      { code: "H336", text: "May cause drowsiness or dizziness" },
      { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
    ],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "OV respirator" }, other: "Ground containers" },
    storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Required", incompatible: ["Oxidizers"] },
    transport: { un: "1145", class: "3", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Do NOT induce vomiting - aspiration hazard." }
  },

  "Petroleum Ether": {
    cas: "8032-32-4", formula: "Mixture",
    de: "Petrolether", es: "Éter de petróleo", fr: "Éther de pétrole", pt: "Éter de petróleo",
    synonyms: ["Ligroin", "Petroleum spirit", "Benzine"],
    classes: ["flammable"],
    ghs: ["GHS02", "GHS07", "GHS08", "GHS09"],
    hazardStatements: [
      { code: "H225", text: "Highly flammable liquid and vapor" },
      { code: "H304", text: "May be fatal if swallowed and enters airways" },
      { code: "H315", text: "Causes skin irritation" },
      { code: "H336", text: "May cause drowsiness or dizziness" },
      { code: "H411", text: "Toxic to aquatic life with long lasting effects" }
    ],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "OV respirator" }, other: "Ground containers" },
    storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Required", incompatible: ["Oxidizers", "Strong acids"] },
    transport: { un: "1268", class: "3", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Do NOT induce vomiting." }
  },

  "N,N-Dimethylformamide": {
    cas: "68-12-2", formula: "C₃H₇NO",
    de: "Dimethylformamid", es: "Dimetilformamida", fr: "Diméthylformamide", pt: "Dimetilformamida",
    synonyms: ["DMF", "Dimethylformamide"],
    classes: ["flammable", "toxic"],
    ghs: ["GHS02", "GHS07", "GHS08"],
    hazardStatements: [
      { code: "H226", text: "Flammable liquid and vapor" },
      { code: "H312", text: "Harmful in contact with skin" },
      { code: "H319", text: "Causes serious eye irritation" },
      { code: "H332", text: "Harmful if inhaled" },
      { code: "H360D", text: "May damage the unborn child" }
    ],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Butyl gloves (NOT nitrile)" }, respiratory: { required: true, type: "OV respirator" }, other: "Work in fume hood" },
    storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Required", incompatible: ["Strong oxidizers", "Halogens"] },
    transport: { un: "2265", class: "3", packingGroup: "III" },
    firstAid: { inhalation: "Fresh air, medical care.", skin: "Remove clothing, wash thoroughly.", eyes: "Flush 15 min.", ingestion: "Rinse mouth, medical care." }
  },

  "Carbon Tetrachloride": {
    cas: "56-23-5", formula: "CCl₄",
    de: "Tetrachlorkohlenstoff", es: "Tetracloruro de carbono", fr: "Tétrachlorure de carbone", pt: "Tetracloreto de carbono",
    synonyms: ["Tetrachloromethane", "Carbon tet"],
    classes: ["toxic"],
    ghs: ["GHS06", "GHS08"],
    hazardStatements: [
      { code: "H301", text: "Toxic if swallowed" },
      { code: "H311", text: "Toxic in contact with skin" },
      { code: "H331", text: "Toxic if inhaled" },
      { code: "H351", text: "Suspected of causing cancer" },
      { code: "H372", text: "Causes damage to organs through prolonged exposure" },
      { code: "H420", text: "Harms public health and environment by destroying ozone" }
    ],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Viton or Silvershield gloves" }, respiratory: { required: true, type: "Full-face OV respirator" }, other: "Work in fume hood only" },
    storage: { cabinet: "Toxic substances cabinet", temp: "Cool", ventilation: "Required", incompatible: ["Alkali metals", "Aluminum", "Strong bases"] },
    transport: { un: "1846", class: "6.1", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air immediately, emergency care.", skin: "Remove clothing, wash thoroughly.", eyes: "Flush 15 min.", ingestion: "Do NOT induce vomiting, emergency care." }
  },

  "1,4-Dioxane": {
    cas: "123-91-1", formula: "C₄H₈O₂",
    de: "1,4-Dioxan", es: "1,4-Dioxano", fr: "1,4-Dioxane", pt: "1,4-Dioxano",
    synonyms: ["Dioxane", "Diethylene dioxide"],
    classes: ["flammable", "toxic"],
    ghs: ["GHS02", "GHS07", "GHS08"],
    hazardStatements: [
      { code: "H225", text: "Highly flammable liquid and vapor" },
      { code: "H319", text: "Causes serious eye irritation" },
      { code: "H335", text: "May cause respiratory irritation" },
      { code: "H351", text: "Suspected of causing cancer" }
    ],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Butyl gloves" }, respiratory: { required: true, type: "OV respirator" }, other: "Fume hood recommended" },
    storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Required - forms peroxides", incompatible: ["Oxidizers", "Halogens", "Strong acids"] },
    transport: { un: "1165", class: "3", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 10 min.", ingestion: "Rinse mouth, medical care." }
  },

  // ===== ADDITIONAL OXIDIZERS =====
  "Calcium Hypochlorite": {
    cas: "7778-54-3", formula: "Ca(ClO)₂",
    de: "Calciumhypochlorit", es: "Hipoclorito de calcio", fr: "Hypochlorite de calcium", pt: "Hipoclorito de cálcio",
    synonyms: ["Pool shock", "Bleaching powder", "HTH"],
    classes: ["oxidizer", "corrosive"],
    ghs: ["GHS03", "GHS05", "GHS07", "GHS09"],
    hazardStatements: [
      { code: "H272", text: "May intensify fire; oxidizer" },
      { code: "H302", text: "Harmful if swallowed" },
      { code: "H314", text: "Causes severe skin burns and eye damage" },
      { code: "H400", text: "Very toxic to aquatic life" }
    ],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Neoprene or nitrile gloves" }, respiratory: { required: true, type: "Chlorine-rated respirator" }, other: "No contact with ammonia products" },
    storage: { cabinet: "Oxidizer cabinet", temp: "Cool, dry", ventilation: "Required", incompatible: ["Acids", "Ammonia", "Organic materials", "Reducing agents"] },
    transport: { un: "1748", class: "5.1", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air, medical care.", skin: "Flush 20+ min.", eyes: "Flush 20+ min.", ingestion: "Rinse mouth, do NOT induce vomiting." }
  },

  "Sodium Perchlorate": {
    cas: "7601-89-0", formula: "NaClO₄",
    de: "Natriumperchlorat", es: "Perclorato de sodio", fr: "Perchlorate de sodium", pt: "Perclorato de sódio",
    synonyms: [],
    classes: ["oxidizer"],
    ghs: ["GHS03"],
    hazardStatements: [
      { code: "H271", text: "May cause fire or explosion; strong oxidizer" }
    ],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Keep away from combustibles" },
    storage: { cabinet: "Oxidizer cabinet", temp: "Room temperature", ventilation: "Normal", incompatible: ["Organic materials", "Reducing agents", "Flammables", "Metals"] },
    transport: { un: "1502", class: "5.1", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 10 min.", ingestion: "Rinse mouth, medical care if large amount." }
  },

  "Potassium Dichromate": {
    cas: "7778-50-9", formula: "K₂Cr₂O₇",
    de: "Kaliumdichromat", es: "Dicromato de potasio", fr: "Dichromate de potassium", pt: "Dicromato de potássio",
    synonyms: ["Potassium bichromate"],
    classes: ["oxidizer", "toxic", "corrosive"],
    ghs: ["GHS03", "GHS05", "GHS06", "GHS08", "GHS09"],
    hazardStatements: [
      { code: "H272", text: "May intensify fire; oxidizer" },
      { code: "H301", text: "Toxic if swallowed" },
      { code: "H312", text: "Harmful in contact with skin" },
      { code: "H314", text: "Causes severe skin burns" },
      { code: "H317", text: "May cause allergic skin reaction" },
      { code: "H330", text: "Fatal if inhaled" },
      { code: "H340", text: "May cause genetic defects" },
      { code: "H350", text: "May cause cancer" }
    ],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Butyl gloves, full protection" }, respiratory: { required: true, type: "P100 respirator" }, other: "Full chemical suit recommended" },
    storage: { cabinet: "Oxidizer cabinet", temp: "Room temperature", ventilation: "Normal", incompatible: ["Organic materials", "Reducing agents", "Flammables"] },
    transport: { un: "3086", class: "5.1", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air, emergency care.", skin: "Wash thoroughly, medical care.", eyes: "Flush 20+ min.", ingestion: "Do NOT induce vomiting, emergency care." }
  },

  // ===== ADDITIONAL TOXICS =====
  "Mercury": {
    cas: "7439-97-6", formula: "Hg",
    de: "Quecksilber", es: "Mercurio", fr: "Mercure", pt: "Mercúrio",
    synonyms: ["Quicksilver"],
    classes: ["toxic"],
    ghs: ["GHS06", "GHS08", "GHS09"],
    hazardStatements: [
      { code: "H330", text: "Fatal if inhaled" },
      { code: "H360D", text: "May damage the unborn child" },
      { code: "H372", text: "Causes damage to organs through prolonged exposure" },
      { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
    ],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Mercury vapor respirator" }, other: "Mercury spill kit must be available" },
    storage: { cabinet: "Secure toxic substances storage", temp: "Room temperature", ventilation: "Required - vapor hazard", incompatible: ["Ammonia", "Azides", "Acetylene", "Strong acids"] },
    transport: { un: "2809", class: "8", packingGroup: "III" },
    firstAid: { inhalation: "Fresh air immediately, seek emergency medical care.", skin: "Wash thoroughly.", eyes: "Flush 15 min.", ingestion: "Rinse mouth, seek medical care." }
  },

  "Lead(II) Nitrate": {
    cas: "10099-74-8", formula: "Pb(NO₃)₂",
    de: "Blei(II)-nitrat", es: "Nitrato de plomo(II)", fr: "Nitrate de plomb(II)", pt: "Nitrato de chumbo(II)",
    synonyms: ["Lead nitrate"],
    classes: ["oxidizer", "toxic"],
    ghs: ["GHS03", "GHS07", "GHS08", "GHS09"],
    hazardStatements: [
      { code: "H272", text: "May intensify fire; oxidizer" },
      { code: "H302", text: "Harmful if swallowed" },
      { code: "H332", text: "Harmful if inhaled" },
      { code: "H360Df", text: "May damage the unborn child" },
      { code: "H373", text: "May cause damage to organs through prolonged exposure" },
      { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
    ],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "P100 respirator" }, other: "Avoid all dust exposure" },
    storage: { cabinet: "Oxidizer cabinet", temp: "Room temperature", ventilation: "Normal", incompatible: ["Reducing agents", "Organic materials"] },
    transport: { un: "1469", class: "5.1", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air, medical care.", skin: "Wash thoroughly.", eyes: "Flush 10 min.", ingestion: "Rinse mouth, medical care." }
  },

  "Arsenic Trioxide": {
    cas: "1327-53-3", formula: "As₂O₃",
    de: "Arsen(III)-oxid", es: "Trióxido de arsénico", fr: "Trioxyde d'arsenic", pt: "Trióxido de arsênio",
    synonyms: ["Arsenous oxide", "White arsenic"],
    classes: ["toxic"],
    ghs: ["GHS06", "GHS08", "GHS09"],
    hazardStatements: [
      { code: "H300", text: "Fatal if swallowed" },
      { code: "H310", text: "Fatal in contact with skin" },
      { code: "H330", text: "Fatal if inhaled" },
      { code: "H350", text: "May cause cancer" },
      { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
    ],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Double gloves, full suit" }, respiratory: { required: true, type: "Full-face P100 respirator" }, other: "Maximum protection required" },
    storage: { cabinet: "Locked poison cabinet", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids", "Reducing agents"] },
    transport: { un: "1561", class: "6.1", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air, emergency care.", skin: "Remove clothing, wash, emergency care.", eyes: "Flush 20+ min.", ingestion: "Do NOT induce vomiting, emergency care." }
  },

  "Potassium Cyanide": {
    cas: "151-50-8", formula: "KCN",
    de: "Kaliumcyanid", es: "Cianuro de potasio", fr: "Cyanure de potassium", pt: "Cianeto de potássio",
    synonyms: ["KCN"],
    classes: ["toxic"],
    ghs: ["GHS06", "GHS09"],
    hazardStatements: [
      { code: "H300", text: "Fatal if swallowed" },
      { code: "H310", text: "Fatal in contact with skin" },
      { code: "H330", text: "Fatal if inhaled" },
      { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
    ],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Butyl gloves, full suit" }, respiratory: { required: true, type: "Full-face respirator with cyanide cartridge" }, other: "Cyanide antidote kit must be available" },
    storage: { cabinet: "Locked poison cabinet, separate from acids", temp: "Room temperature", ventilation: "Normal but NEVER near acids", incompatible: ["ACIDS (releases HCN gas)", "Oxidizers", "Water (slightly)"] },
    transport: { un: "1680", class: "6.1", packingGroup: "I" },
    firstAid: { inhalation: "Fresh air, amyl nitrite if available, EMERGENCY CARE.", skin: "Remove clothing, wash, EMERGENCY CARE.", eyes: "Flush 20+ min.", ingestion: "EMERGENCY CARE IMMEDIATELY - cyanide antidote needed." }
  },

  "Sodium Azide": {
    cas: "26628-22-8", formula: "NaN₃",
    de: "Natriumazid", es: "Azida de sodio", fr: "Azoture de sodium", pt: "Azida de sódio",
    synonyms: ["Sodium trinitride"],
    classes: ["toxic"],
    ghs: ["GHS06", "GHS09"],
    hazardStatements: [
      { code: "H300", text: "Fatal if swallowed" },
      { code: "H310", text: "Fatal in contact with skin" },
      { code: "H330", text: "Fatal if inhaled" },
      { code: "H400", text: "Very toxic to aquatic life" },
      { code: "EUH032", text: "Contact with acids liberates very toxic gas" }
    ],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "P100 respirator" }, other: "NEVER contact with acids or metals" },
    storage: { cabinet: "Locked poison cabinet, away from metals", temp: "Room temperature", ventilation: "Normal", incompatible: ["ACIDS (releases HN3)", "Metals (forms explosive azides)", "Water (reacts)"] },
    transport: { un: "1687", class: "6.1", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air, emergency care.", skin: "Wash, medical care.", eyes: "Flush 15 min.", ingestion: "Rinse mouth, emergency care." }
  },

  // ===== ADDITIONAL GASES =====
  "Carbon Dioxide": {
    cas: "124-38-9", formula: "CO₂",
    de: "Kohlendioxid", es: "Dióxido de carbono", fr: "Dioxyde de carbone", pt: "Dióxido de carbono",
    synonyms: ["Carbonic acid gas", "Dry ice (solid)"],
    classes: ["gas"],
    ghs: ["GHS04"],
    hazardStatements: [
      { code: "H280", text: "Contains gas under pressure; may explode if heated" }
    ],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Insulated gloves for dry ice" }, respiratory: { required: true, type: "SCBA in confined spaces" }, other: "Ventilation critical - asphyxiation hazard" },
    storage: { cabinet: "Gas cylinder storage", temp: "Below 50°C", ventilation: "Required - displaces oxygen", incompatible: ["None significant"] },
    transport: { un: "1013", class: "2.2", packingGroup: "N/A" },
    firstAid: { inhalation: "Move to fresh air, give oxygen if needed.", skin: "Frostbite from dry ice - warm slowly.", eyes: "Flush.", ingestion: "N/A for gas." }
  },

  "Nitrogen": {
    cas: "7727-37-9", formula: "N₂",
    de: "Stickstoff", es: "Nitrógeno", fr: "Azote", pt: "Nitrogênio",
    synonyms: ["Liquid nitrogen (LN2)"],
    classes: ["gas"],
    ghs: ["GHS04"],
    hazardStatements: [
      { code: "H280", text: "Contains gas under pressure; may explode if heated" },
      { code: "H281", text: "Contains refrigerated gas; may cause cryogenic burns" }
    ],
    ppe: { eyes: { required: true, type: "Face shield for liquid" }, skin: { required: true, type: "Cryogenic gloves for liquid" }, respiratory: { required: true, type: "SCBA in confined spaces" }, other: "Oxygen monitor recommended - asphyxiant" },
    storage: { cabinet: "Gas cylinder storage or dewar", temp: "As specified for form", ventilation: "Required", incompatible: ["None significant"] },
    transport: { un: "1066 (compressed), 1977 (liquid)", class: "2.2", packingGroup: "N/A" },
    firstAid: { inhalation: "Move to fresh air, give oxygen.", skin: "Cryogenic burns - do NOT rub, warm slowly.", eyes: "Flush.", ingestion: "N/A." }
  },

  "Oxygen": {
    cas: "7782-44-7", formula: "O₂",
    de: "Sauerstoff", es: "Oxígeno", fr: "Oxygène", pt: "Oxigênio",
    synonyms: ["LOX (liquid oxygen)"],
    classes: ["gas", "oxidizer"],
    ghs: ["GHS03", "GHS04"],
    hazardStatements: [
      { code: "H270", text: "May cause or intensify fire; oxidizer" },
      { code: "H280", text: "Contains gas under pressure; may explode if heated" }
    ],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Clean, oil-free gloves" }, respiratory: { required: false, type: "N/A" }, other: "Keep away from oils/greases - fire hazard" },
    storage: { cabinet: "Gas cylinder storage, away from flammables", temp: "Below 50°C", ventilation: "Normal", incompatible: ["Oils", "Greases", "Flammables", "Combustible materials"] },
    transport: { un: "1072 (compressed), 1073 (liquid)", class: "2.2", packingGroup: "N/A" },
    firstAid: { inhalation: "N/A.", skin: "Cryogenic burns from liquid - warm slowly.", eyes: "Flush.", ingestion: "N/A." }
  },

  "Hydrogen": {
    cas: "1333-74-0", formula: "H₂",
    de: "Wasserstoff", es: "Hidrógeno", fr: "Hydrogène", pt: "Hidrogênio",
    synonyms: [],
    classes: ["gas", "flammable"],
    ghs: ["GHS02", "GHS04"],
    hazardStatements: [
      { code: "H220", text: "Extremely flammable gas" },
      { code: "H280", text: "Contains gas under pressure; may explode if heated" }
    ],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Standard" }, respiratory: { required: true, type: "SCBA if leak" }, other: "Eliminate all ignition sources, ground equipment" },
    storage: { cabinet: "Gas cylinder storage, outdoor or well-ventilated", temp: "Below 50°C", ventilation: "Required", incompatible: ["Oxidizers", "Halogens", "Ignition sources"] },
    transport: { un: "1049", class: "2.1", packingGroup: "N/A" },
    firstAid: { inhalation: "Move to fresh air.", skin: "N/A.", eyes: "N/A.", ingestion: "N/A." }
  },

  // ===== COMMON INDUSTRIAL CHEMICALS =====
  "Sodium Sulfate": {
    cas: "7757-82-6", formula: "Na₂SO₄",
    de: "Natriumsulfat", es: "Sulfato de sodio", fr: "Sulfate de sodium", pt: "Sulfato de sódio",
    synonyms: ["Glauber's salt", "Thenardite"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: false, type: "Safety glasses if dusty" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Dust mask if needed" }, other: "Minimal PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids (minor)"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
  },

  "Calcium Chloride": {
    cas: "10043-52-4", formula: "CaCl₂",
    de: "Calciumchlorid", es: "Cloruro de calcio", fr: "Chlorure de calcium", pt: "Cloreto de cálcio",
    synonyms: ["Calcium dichloride"],
    classes: [],
    ghs: ["GHS07"],
    hazardStatements: [
      { code: "H319", text: "Causes serious eye irritation" }
    ],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves recommended" }, respiratory: { required: false, type: "Dust mask" }, other: "Exothermic when dissolved" },
    storage: { cabinet: "General storage, keep dry", temp: "Room temperature", ventilation: "Normal", incompatible: ["Zinc", "Bromine trifluoride"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 10 min.", ingestion: "Rinse mouth, drink water." }
  },

  "Magnesium Sulfate": {
    cas: "7487-88-9", formula: "MgSO₄",
    de: "Magnesiumsulfat", es: "Sulfato de magnesio", fr: "Sulfate de magnésium", pt: "Sulfato de magnésio",
    synonyms: ["Epsom salt"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: false, type: "Safety glasses if dusty" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Dust mask if needed" }, other: "Minimal PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["None significant"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Safe in moderate amounts." }
  },

  "Potassium Chloride": {
    cas: "7447-40-7", formula: "KCl",
    de: "Kaliumchlorid", es: "Cloruro de potasio", fr: "Chlorure de potassium", pt: "Cloreto de potássio",
    synonyms: ["Muriate of potash", "Sylvite"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Dust mask" }, other: "Minimal PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids", "Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
  },

  "Urea": {
    cas: "57-13-6", formula: "CH₄N₂O",
    de: "Harnstoff", es: "Urea", fr: "Urée", pt: "Ureia",
    synonyms: ["Carbamide"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Dust mask" }, other: "Minimal PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Nitrates"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
  },

  "Boric Acid": {
    cas: "10043-35-3", formula: "H₃BO₃",
    de: "Borsäure", es: "Ácido bórico", fr: "Acide borique", pt: "Ácido bórico",
    synonyms: ["Orthoboric acid", "Boracic acid"],
    classes: ["toxic"],
    ghs: ["GHS08"],
    hazardStatements: [
      { code: "H360FD", text: "May damage fertility. May damage the unborn child." }
    ],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Avoid during pregnancy" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases", "Potassium"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth, seek medical advice if large amount." }
  },

  "Sodium Thiosulfate": {
    cas: "7772-98-7", formula: "Na₂S₂O₃",
    de: "Natriumthiosulfat", es: "Tiosulfato de sodio", fr: "Thiosulfate de sodium", pt: "Tiossulfato de sódio",
    synonyms: ["Hypo", "Sodium hyposulfite"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Dust mask" }, other: "Minimal PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids", "Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
  },

  "Activated Carbon": {
    cas: "7440-44-0", formula: "C",
    de: "Aktivkohle", es: "Carbón activado", fr: "Charbon actif", pt: "Carvão ativado",
    synonyms: ["Activated charcoal", "Active carbon"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves recommended" }, respiratory: { required: true, type: "Dust mask required" }, other: "Dust is a nuisance" },
    storage: { cabinet: "General storage, keep dry", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Oxygen at high temp"] },
    transport: { un: "1362 (wet)", class: "4.2", packingGroup: "III" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Not harmful." }
  },

  "Aluminum Sulfate": {
    cas: "10043-01-3", formula: "Al₂(SO₄)₃",
    de: "Aluminiumsulfat", es: "Sulfato de aluminio", fr: "Sulfate d'aluminium", pt: "Sulfato de alumínio",
    synonyms: ["Alum", "Papermaker's alum"],
    classes: [],
    ghs: ["GHS07"],
    hazardStatements: [
      { code: "H318", text: "Causes serious eye damage" }
    ],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Acidic solution" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases", "Alkali metals"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min, medical care.", ingestion: "Rinse mouth, drink water." }
  },

  "Ferric Sulfate": {
    cas: "10028-22-5", formula: "Fe₂(SO₄)₃",
    de: "Eisen(III)-sulfat", es: "Sulfato de hierro(III)", fr: "Sulfate de fer(III)", pt: "Sulfato de ferro(III)",
    synonyms: ["Iron(III) sulfate", "Ferric sulfate"],
    classes: [],
    ghs: ["GHS07"],
    hazardStatements: [
      { code: "H315", text: "Causes skin irritation" },
      { code: "H319", text: "Causes serious eye irritation" }
    ],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Standard PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases", "Reducing agents"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 10 min.", ingestion: "Rinse mouth." }
  },

  // ===== MORE SOLVENTS =====
  "Methyl Ethyl Ketone": {
    cas: "78-93-3", formula: "C₄H₈O",
    de: "Methylethylketon", es: "Metiletilcetona", fr: "Méthyléthylcétone", pt: "Metiletilcetona",
    synonyms: ["MEK", "2-Butanone", "Ethyl methyl ketone"],
    classes: ["flammable"],
    ghs: ["GHS02", "GHS07"],
    hazardStatements: [{ code: "H225", text: "Highly flammable liquid and vapor" }, { code: "H319", text: "Causes serious eye irritation" }, { code: "H336", text: "May cause drowsiness or dizziness" }],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "OV respirator" }, other: "Use in ventilated area" },
    storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Required", incompatible: ["Oxidizers", "Strong acids", "Strong bases"] },
    transport: { un: "1193", class: "3", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth, do not induce vomiting." }
  },

  "Methyl Isobutyl Ketone": {
    cas: "108-10-1", formula: "C₆H₁₂O",
    de: "Methylisobutylketon", es: "Metilisobutilcetona", fr: "Méthylisobutylcétone", pt: "Metilisobutilcetona",
    synonyms: ["MIBK", "4-Methylpentan-2-one", "Hexone"],
    classes: ["flammable"],
    ghs: ["GHS02", "GHS07"],
    hazardStatements: [{ code: "H225", text: "Highly flammable liquid and vapor" }, { code: "H319", text: "Causes serious eye irritation" }, { code: "H332", text: "Harmful if inhaled" }],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "OV respirator" }, other: "Ventilation required" },
    storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Required", incompatible: ["Oxidizers", "Strong acids"] },
    transport: { un: "1245", class: "3", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
  },

  "N-Methyl-2-pyrrolidone": {
    cas: "872-50-4", formula: "C₅H₉NO",
    de: "N-Methyl-2-pyrrolidon", es: "N-Metil-2-pirrolidona", fr: "N-Méthyl-2-pyrrolidone", pt: "N-Metil-2-pirrolidona",
    synonyms: ["NMP", "1-Methyl-2-pyrrolidone"],
    classes: ["toxic"],
    ghs: ["GHS07", "GHS08"],
    hazardStatements: [{ code: "H315", text: "Causes skin irritation" }, { code: "H319", text: "Causes serious eye irritation" }, { code: "H360D", text: "May damage the unborn child" }],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Butyl gloves" }, respiratory: { required: true, type: "OV respirator" }, other: "Avoid during pregnancy" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Recommended", incompatible: ["Strong oxidizers", "Strong acids"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash thoroughly.", eyes: "Flush 15 min.", ingestion: "Rinse mouth, seek medical advice." }
  },

  "Propylene Glycol": {
    cas: "57-55-6", formula: "C₃H₈O₂",
    de: "Propylenglykol", es: "Propilenglicol", fr: "Propylène glycol", pt: "Propilenoglicol",
    synonyms: ["1,2-Propanediol", "PG"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Not required" }, other: "Minimal PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Generally safe, rinse mouth." }
  },

  "Ethylene Glycol": {
    cas: "107-21-1", formula: "C₂H₆O₂",
    de: "Ethylenglykol", es: "Etilenglicol", fr: "Éthylène glycol", pt: "Etilenoglicol",
    synonyms: ["1,2-Ethanediol", "Antifreeze", "EG"],
    classes: ["toxic"],
    ghs: ["GHS07"],
    hazardStatements: [{ code: "H302", text: "Harmful if swallowed" }],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Not normally required" }, other: "Standard PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong acids"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "TOXIC - seek immediate medical attention." }
  },

  "Turpentine": {
    cas: "8006-64-2", formula: "C₁₀H₁₆ (mixture)",
    de: "Terpentinöl", es: "Trementina", fr: "Térébenthine", pt: "Terebintina",
    synonyms: ["Turps", "Gum turpentine", "Wood turpentine"],
    classes: ["flammable", "toxic"],
    ghs: ["GHS02", "GHS07", "GHS08"],
    hazardStatements: [{ code: "H226", text: "Flammable liquid and vapor" }, { code: "H304", text: "May be fatal if swallowed and enters airways" }, { code: "H315", text: "Causes skin irritation" }, { code: "H317", text: "May cause allergic skin reaction" }],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "OV respirator" }, other: "Ventilation required" },
    storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Required", incompatible: ["Oxidizers", "Halogens"] },
    transport: { un: "1299", class: "3", packingGroup: "III" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Do NOT induce vomiting - aspiration hazard." }
  },

  "White Spirit": {
    cas: "64475-85-0", formula: "Mixture",
    de: "Testbenzin", es: "Aguarrás mineral", fr: "White-spirit", pt: "Aguarrás",
    synonyms: ["Mineral spirits", "Stoddard solvent", "Mineral turpentine"],
    classes: ["flammable"],
    ghs: ["GHS02", "GHS07", "GHS08"],
    hazardStatements: [{ code: "H226", text: "Flammable liquid and vapor" }, { code: "H304", text: "May be fatal if swallowed and enters airways" }, { code: "H336", text: "May cause drowsiness or dizziness" }],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "OV respirator" }, other: "Good ventilation" },
    storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Required", incompatible: ["Oxidizers"] },
    transport: { un: "1300", class: "3", packingGroup: "III" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Do NOT induce vomiting." }
  },

  "Trichloroethylene": {
    cas: "79-01-6", formula: "C₂HCl₃",
    de: "Trichlorethylen", es: "Tricloroetileno", fr: "Trichloréthylène", pt: "Tricloroetileno",
    synonyms: ["TCE", "Trike", "Triclene"],
    classes: ["toxic"],
    ghs: ["GHS07", "GHS08"],
    hazardStatements: [{ code: "H315", text: "Causes skin irritation" }, { code: "H319", text: "Causes serious eye irritation" }, { code: "H336", text: "May cause drowsiness or dizziness" }, { code: "H350", text: "May cause cancer" }, { code: "H341", text: "Suspected of causing genetic defects" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Viton gloves" }, respiratory: { required: true, type: "Full-face OV respirator" }, other: "Fume hood required" },
    storage: { cabinet: "Toxic substances", temp: "Cool", ventilation: "Required", incompatible: ["Strong bases", "Alkali metals", "Aluminum"] },
    transport: { un: "1710", class: "6.1", packingGroup: "III" },
    firstAid: { inhalation: "Fresh air, medical care.", skin: "Wash thoroughly.", eyes: "Flush 15 min.", ingestion: "Do NOT induce vomiting, seek medical care." }
  },

  "Perchloroethylene": {
    cas: "127-18-4", formula: "C₂Cl₄",
    de: "Tetrachlorethylen", es: "Percloroetileno", fr: "Perchloroéthylène", pt: "Percloroetileno",
    synonyms: ["PCE", "Perc", "Tetrachloroethylene", "Dry cleaning fluid"],
    classes: ["toxic"],
    ghs: ["GHS07", "GHS08"],
    hazardStatements: [{ code: "H351", text: "Suspected of causing cancer" }, { code: "H336", text: "May cause drowsiness or dizziness" }],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Viton or butyl gloves" }, respiratory: { required: true, type: "OV respirator" }, other: "Fume hood" },
    storage: { cabinet: "Toxic substances", temp: "Cool", ventilation: "Required", incompatible: ["Strong bases", "Alkali metals", "Aluminum"] },
    transport: { un: "1897", class: "6.1", packingGroup: "III" },
    firstAid: { inhalation: "Fresh air, medical care.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Do NOT induce vomiting." }
  },

  // ===== CLEANING AGENTS =====
  "Sodium Lauryl Sulfate": {
    cas: "151-21-3", formula: "C₁₂H₂₅NaO₄S",
    de: "Natriumlaurylsulfat", es: "Laurilsulfato de sodio", fr: "Laurylsulfate de sodium", pt: "Lauril sulfato de sódio",
    synonyms: ["SLS", "Sodium dodecyl sulfate", "SDS"],
    classes: [],
    ghs: ["GHS05", "GHS07"],
    hazardStatements: [{ code: "H315", text: "Causes skin irritation" }, { code: "H318", text: "Causes serious eye damage" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Dust mask if powder" }, other: "Standard PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15+ min, seek medical care.", ingestion: "Rinse mouth, drink water." }
  },

  "Triclosan": {
    cas: "3380-34-5", formula: "C₁₂H₇Cl₃O₂",
    de: "Triclosan", es: "Triclosán", fr: "Triclosan", pt: "Triclosan",
    synonyms: ["Irgasan", "Microban"],
    classes: ["toxic"],
    ghs: ["GHS07", "GHS09"],
    hazardStatements: [{ code: "H315", text: "Causes skin irritation" }, { code: "H319", text: "Causes serious eye irritation" }, { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Prevent release to environment" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 10 min.", ingestion: "Rinse mouth." }
  },

  "Isopropyl Alcohol": {
    cas: "67-63-0", formula: "C₃H₈O",
    de: "Isopropylalkohol", es: "Alcohol isopropílico", fr: "Alcool isopropylique", pt: "Álcool isopropílico",
    synonyms: ["IPA", "Isopropanol", "2-Propanol", "Rubbing alcohol"],
    classes: ["flammable"],
    ghs: ["GHS02", "GHS07"],
    hazardStatements: [{ code: "H225", text: "Highly flammable liquid and vapor" }, { code: "H319", text: "Causes serious eye irritation" }, { code: "H336", text: "May cause drowsiness or dizziness" }],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "OV respirator if concentrated" }, other: "Ventilation" },
    storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Required", incompatible: ["Oxidizers", "Strong acids"] },
    transport: { un: "1219", class: "3", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 10 min.", ingestion: "Rinse mouth, seek medical advice if large amount." }
  },

  // ===== PLATING CHEMICALS =====
  "Nickel Sulfate": {
    cas: "7786-81-4", formula: "NiSO₄",
    de: "Nickelsulfat", es: "Sulfato de níquel", fr: "Sulfate de nickel", pt: "Sulfato de níquel",
    synonyms: ["Nickelous sulfate"],
    classes: ["toxic"],
    ghs: ["GHS07", "GHS08", "GHS09"],
    hazardStatements: [{ code: "H302", text: "Harmful if swallowed" }, { code: "H315", text: "Causes skin irritation" }, { code: "H317", text: "May cause allergic skin reaction" }, { code: "H334", text: "May cause allergy or asthma symptoms if inhaled" }, { code: "H341", text: "Suspected of causing genetic defects" }, { code: "H350i", text: "May cause cancer by inhalation" }, { code: "H360D", text: "May damage the unborn child" }, { code: "H372", text: "Causes damage to organs" }, { code: "H410", text: "Very toxic to aquatic life" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "P100 respirator" }, other: "Full protection for powder handling" },
    storage: { cabinet: "Toxic substances", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
    transport: { un: "Not regulated (solid)", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air, medical care.", skin: "Wash thoroughly.", eyes: "Flush 15 min.", ingestion: "Rinse mouth, seek medical care." }
  },

  "Chromium Trioxide": {
    cas: "1333-82-0", formula: "CrO₃",
    de: "Chrom(VI)-oxid", es: "Trióxido de cromo", fr: "Trioxyde de chrome", pt: "Trióxido de cromo",
    synonyms: ["Chromic anhydride", "Chromic acid (solid)"],
    classes: ["oxidizer", "toxic", "corrosive"],
    ghs: ["GHS03", "GHS05", "GHS06", "GHS08", "GHS09"],
    hazardStatements: [{ code: "H271", text: "May cause fire or explosion; strong oxidizer" }, { code: "H301", text: "Toxic if swallowed" }, { code: "H311", text: "Toxic in contact with skin" }, { code: "H314", text: "Causes severe skin burns" }, { code: "H317", text: "May cause allergic skin reaction" }, { code: "H330", text: "Fatal if inhaled" }, { code: "H340", text: "May cause genetic defects" }, { code: "H350", text: "May cause cancer" }, { code: "H361f", text: "Suspected of damaging fertility" }, { code: "H372", text: "Causes damage to organs" }, { code: "H410", text: "Very toxic to aquatic life" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Butyl gloves, full suit" }, respiratory: { required: true, type: "Full-face P100" }, other: "Maximum protection required" },
    storage: { cabinet: "Oxidizer cabinet, locked", temp: "Cool, dry", ventilation: "Required", incompatible: ["Organic materials", "Reducing agents", "Flammables"] },
    transport: { un: "1463", class: "5.1", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air, emergency care.", skin: "Flush 20+ min, emergency care.", eyes: "Flush 20+ min, emergency care.", ingestion: "Do NOT induce vomiting, emergency care." }
  },

  "Zinc Sulfate": {
    cas: "7733-02-0", formula: "ZnSO₄",
    de: "Zinksulfat", es: "Sulfato de zinc", fr: "Sulfate de zinc", pt: "Sulfato de zinco",
    synonyms: ["White vitriol", "Zinc vitriol"],
    classes: [],
    ghs: ["GHS07", "GHS09"],
    hazardStatements: [{ code: "H302", text: "Harmful if swallowed" }, { code: "H318", text: "Causes serious eye damage" }, { code: "H410", text: "Very toxic to aquatic life" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Standard PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min, seek medical care.", ingestion: "Rinse mouth, seek medical advice." }
  },

  "Copper Cyanide": {
    cas: "544-92-3", formula: "CuCN",
    de: "Kupfer(I)-cyanid", es: "Cianuro de cobre", fr: "Cyanure de cuivre", pt: "Cianeto de cobre",
    synonyms: ["Cuprous cyanide"],
    classes: ["toxic"],
    ghs: ["GHS06", "GHS09"],
    hazardStatements: [{ code: "H300", text: "Fatal if swallowed" }, { code: "H310", text: "Fatal in contact with skin" }, { code: "H330", text: "Fatal if inhaled" }, { code: "H410", text: "Very toxic to aquatic life" }, { code: "EUH032", text: "Contact with acids liberates very toxic gas" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Butyl gloves, full suit" }, respiratory: { required: true, type: "Full-face with cyanide cartridge" }, other: "Cyanide antidote must be available" },
    storage: { cabinet: "Locked poison cabinet, away from acids", temp: "Room temperature", ventilation: "Normal", incompatible: ["ACIDS (releases HCN)", "Oxidizers"] },
    transport: { un: "1587", class: "6.1", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air, amyl nitrite, EMERGENCY.", skin: "Remove clothing, wash, EMERGENCY.", eyes: "Flush 20+ min.", ingestion: "EMERGENCY - cyanide antidote needed." }
  },

  // ===== WATER TREATMENT =====
  "Polyaluminum Chloride": {
    cas: "1327-41-9", formula: "Al₂Cl(OH)₅",
    de: "Polyaluminiumchlorid", es: "Policloruro de aluminio", fr: "Chlorure de polyaluminium", pt: "Policloreto de alumínio",
    synonyms: ["PAC", "Aluminum chlorohydrate"],
    classes: [],
    ghs: ["GHS05"],
    hazardStatements: [{ code: "H314", text: "Causes severe skin burns and eye damage" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Not normally required" }, other: "Acidic solution" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Flush with water.", eyes: "Flush 15 min, seek medical care.", ingestion: "Rinse mouth, drink water." }
  },

  "Ferric Chloride": {
    cas: "7705-08-0", formula: "FeCl₃",
    de: "Eisen(III)-chlorid", es: "Cloruro férrico", fr: "Chlorure ferrique", pt: "Cloreto férrico",
    synonyms: ["Iron(III) chloride", "Ferric trichloride"],
    classes: ["corrosive"],
    ghs: ["GHS05", "GHS07"],
    hazardStatements: [{ code: "H290", text: "May be corrosive to metals" }, { code: "H302", text: "Harmful if swallowed" }, { code: "H315", text: "Causes skin irritation" }, { code: "H318", text: "Causes serious eye damage" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Nitrile or PVC gloves" }, respiratory: { required: false, type: "Not normally required" }, other: "Corrosive to metals" },
    storage: { cabinet: "Corrosive cabinet", temp: "Room temperature", ventilation: "Normal", incompatible: ["Bases", "Metals"] },
    transport: { un: "1773", class: "8", packingGroup: "III" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min, medical care.", ingestion: "Rinse mouth, seek medical advice." }
  },

  "Sodium Silicate": {
    cas: "1344-09-8", formula: "Na₂SiO₃",
    de: "Natriumsilikat", es: "Silicato de sodio", fr: "Silicate de sodium", pt: "Silicato de sódio",
    synonyms: ["Water glass", "Liquid glass"],
    classes: ["base"],
    ghs: ["GHS05"],
    hazardStatements: [{ code: "H314", text: "Causes severe skin burns and eye damage" }, { code: "H335", text: "May cause respiratory irritation" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Dust mask if powder" }, other: "Highly alkaline" },
    storage: { cabinet: "Base storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids", "Aluminum"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Flush with water.", eyes: "Flush 20+ min, seek medical care.", ingestion: "Do NOT induce vomiting, drink water." }
  },

  "Poly(diallyldimethylammonium chloride)": {
    cas: "26062-79-3", formula: "(C₈H₁₆ClN)ₙ",
    de: "Poly-DADMAC", es: "Poli-DADMAC", fr: "Poly-DADMAC", pt: "Poli-DADMAC",
    synonyms: ["PDADMAC", "PolyDADMAC", "Poly-DMDAAC"],
    classes: [],
    ghs: ["GHS07"],
    hazardStatements: [{ code: "H315", text: "Causes skin irritation" }, { code: "H319", text: "Causes serious eye irritation" }],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Not required" }, other: "Standard PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Anionic polymers", "Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 10 min.", ingestion: "Rinse mouth." }
  },

  // ===== FOOD GRADE CHEMICALS =====
  "Sodium Benzoate": {
    cas: "532-32-1", formula: "C₇H₅NaO₂",
    de: "Natriumbenzoat", es: "Benzoato de sodio", fr: "Benzoate de sodium", pt: "Benzoato de sódio",
    synonyms: ["E211", "Benzoate of soda"],
    classes: [],
    ghs: ["GHS07"],
    hazardStatements: [{ code: "H319", text: "Causes serious eye irritation" }],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask if needed" }, other: "Food grade available" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids", "Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 10 min.", ingestion: "Safe in small amounts." }
  },

  "Potassium Sorbate": {
    cas: "24634-61-5", formula: "C₆H₇KO₂",
    de: "Kaliumsorbat", es: "Sorbato de potasio", fr: "Sorbate de potassium", pt: "Sorbato de potássio",
    synonyms: ["E202", "Potassium 2,4-hexadienoate"],
    classes: [],
    ghs: ["GHS07"],
    hazardStatements: [{ code: "H319", text: "Causes serious eye irritation" }],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Food preservative" },
    storage: { cabinet: "General storage", temp: "Cool, dry", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 10 min.", ingestion: "Safe food additive." }
  },

  "Ascorbic Acid": {
    cas: "50-81-7", formula: "C₆H₈O₆",
    de: "Ascorbinsäure", es: "Ácido ascórbico", fr: "Acide ascorbique", pt: "Ácido ascórbico",
    synonyms: ["Vitamin C", "E300"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Dust mask" }, other: "Minimal PPE" },
    storage: { cabinet: "General storage", temp: "Cool, dry, protected from light", ventilation: "Normal", incompatible: ["Strong oxidizers", "Bases"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Safe." }
  },

  "Tartaric Acid": {
    cas: "87-69-4", formula: "C₄H₆O₆",
    de: "Weinsäure", es: "Ácido tartárico", fr: "Acide tartrique", pt: "Ácido tartárico",
    synonyms: ["E334", "2,3-Dihydroxysuccinic acid"],
    classes: ["acid"],
    ghs: ["GHS07"],
    hazardStatements: [{ code: "H319", text: "Causes serious eye irritation" }],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves recommended" }, respiratory: { required: false, type: "Dust mask" }, other: "Food acid" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases", "Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 10 min.", ingestion: "Safe in normal amounts." }
  },

  "Malic Acid": {
    cas: "6915-15-7", formula: "C₄H₆O₅",
    de: "Äpfelsäure", es: "Ácido málico", fr: "Acide malique", pt: "Ácido málico",
    synonyms: ["E296", "2-Hydroxybutanedioic acid"],
    classes: ["acid"],
    ghs: ["GHS07"],
    hazardStatements: [{ code: "H319", text: "Causes serious eye irritation" }],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves recommended" }, respiratory: { required: false, type: "Dust mask" }, other: "Food acid" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases", "Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 10 min.", ingestion: "Safe in normal amounts." }
  },

  // ===== PAINT/COATING CHEMICALS =====
  "Titanium Dioxide": {
    cas: "13463-67-7", formula: "TiO₂",
    de: "Titandioxid", es: "Dióxido de titanio", fr: "Dioxyde de titane", pt: "Dióxido de titânio",
    synonyms: ["Titanium white", "E171", "CI 77891"],
    classes: [],
    ghs: [],
    hazardStatements: [{ code: "H351 (inhalation)", text: "Suspected of causing cancer by inhalation" }],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves optional" }, respiratory: { required: true, type: "P100 respirator for dust" }, other: "Avoid inhaling dust" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["None significant"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air, seek medical advice if symptoms.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
  },

  "Zinc Oxide": {
    cas: "1314-13-2", formula: "ZnO",
    de: "Zinkoxid", es: "Óxido de zinc", fr: "Oxyde de zinc", pt: "Óxido de zinco",
    synonyms: ["Zinc white", "Chinese white", "CI 77947"],
    classes: [],
    ghs: ["GHS09"],
    hazardStatements: [{ code: "H410", text: "Very toxic to aquatic life with long lasting effects" }],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves optional" }, respiratory: { required: true, type: "Dust mask" }, other: "Prevent environmental release" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
  },

  "Iron Oxide Red": {
    cas: "1309-37-1", formula: "Fe₂O₃",
    de: "Eisenoxidrot", es: "Óxido de hierro rojo", fr: "Oxyde de fer rouge", pt: "Óxido de ferro vermelho",
    synonyms: ["Hematite", "Ferric oxide", "CI 77491", "E172"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves optional" }, respiratory: { required: true, type: "Dust mask" }, other: "Avoid dust" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Aluminum powder", "Strong acids"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
  },

  "Carbon Black": {
    cas: "1333-86-4", formula: "C",
    de: "Ruß", es: "Negro de humo", fr: "Noir de carbone", pt: "Negro de fumo",
    synonyms: ["Lamp black", "Channel black", "CI 77266"],
    classes: [],
    ghs: [],
    hazardStatements: [{ code: "H351 (suspected)", text: "Suspected of causing cancer (IARC 2B)" }],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves recommended" }, respiratory: { required: true, type: "P100 respirator" }, other: "Control dust exposure" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Required", incompatible: ["Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air, seek medical advice.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
  },

  // ===== MORE INDUSTRIAL CHEMICALS =====
  "Sodium Nitrite": {
    cas: "7632-00-0", formula: "NaNO₂",
    de: "Natriumnitrit", es: "Nitrito de sodio", fr: "Nitrite de sodium", pt: "Nitrito de sódio",
    synonyms: ["E250"],
    classes: ["oxidizer", "toxic"],
    ghs: ["GHS03", "GHS06", "GHS09"],
    hazardStatements: [{ code: "H272", text: "May intensify fire; oxidizer" }, { code: "H301", text: "Toxic if swallowed" }, { code: "H319", text: "Causes serious eye irritation" }, { code: "H400", text: "Very toxic to aquatic life" }],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Standard PPE" },
    storage: { cabinet: "Oxidizer cabinet", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids (releases toxic NOx)", "Reducing agents", "Organic materials"] },
    transport: { un: "1500", class: "5.1", packingGroup: "III" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 10 min.", ingestion: "TOXIC - seek immediate medical care." }
  },

  "Potassium Nitrate": {
    cas: "7757-79-1", formula: "KNO₃",
    de: "Kaliumnitrat", es: "Nitrato de potasio", fr: "Nitrate de potassium", pt: "Nitrato de potássio",
    synonyms: ["Saltpeter", "E252", "Niter"],
    classes: ["oxidizer"],
    ghs: ["GHS03"],
    hazardStatements: [{ code: "H272", text: "May intensify fire; oxidizer" }],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves recommended" }, respiratory: { required: false, type: "Dust mask" }, other: "Keep from combustibles" },
    storage: { cabinet: "Oxidizer cabinet", temp: "Room temperature", ventilation: "Normal", incompatible: ["Organic materials", "Reducing agents", "Flammables"] },
    transport: { un: "1486", class: "5.1", packingGroup: "III" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth, seek medical advice." }
  },

  "Ammonium Chloride": {
    cas: "12125-02-9", formula: "NH₄Cl",
    de: "Ammoniumchlorid", es: "Cloruro de amonio", fr: "Chlorure d'ammonium", pt: "Cloreto de amônio",
    synonyms: ["Sal ammoniac", "E510"],
    classes: [],
    ghs: ["GHS07"],
    hazardStatements: [{ code: "H302", text: "Harmful if swallowed" }, { code: "H319", text: "Causes serious eye irritation" }],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves recommended" }, respiratory: { required: false, type: "Dust mask" }, other: "Standard PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases", "Silver salts"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 10 min.", ingestion: "Rinse mouth, drink water." }
  },

  "Ammonium Sulfate": {
    cas: "7783-20-2", formula: "(NH₄)₂SO₄",
    de: "Ammoniumsulfat", es: "Sulfato de amonio", fr: "Sulfate d'ammonium", pt: "Sulfato de amônio",
    synonyms: ["Diammonium sulfate"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Dust mask" }, other: "Minimal PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases", "Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
  },

  "Sodium Metabisulfite": {
    cas: "7681-57-4", formula: "Na₂S₂O₅",
    de: "Natriumdisulfit", es: "Metabisulfito de sodio", fr: "Métabisulfite de sodium", pt: "Metabissulfito de sódio",
    synonyms: ["Sodium pyrosulfite", "E223"],
    classes: [],
    ghs: ["GHS07"],
    hazardStatements: [{ code: "H302", text: "Harmful if swallowed" }, { code: "H318", text: "Causes serious eye damage" }, { code: "EUH031", text: "Contact with acids liberates toxic gas (SO2)" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Respirator if dust/acid contact" }, other: "Keep from acids" },
    storage: { cabinet: "General storage", temp: "Dry", ventilation: "Normal", incompatible: ["Acids (releases SO2)", "Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air, medical care if SO2 exposure.", skin: "Wash.", eyes: "Flush 15 min, seek medical care.", ingestion: "Rinse mouth, seek medical advice." }
  },

  "Sodium Bisulfite": {
    cas: "7631-90-5", formula: "NaHSO₃",
    de: "Natriumhydrogensulfit", es: "Bisulfito de sodio", fr: "Bisulfite de sodium", pt: "Bissulfito de sódio",
    synonyms: ["Sodium hydrogen sulfite", "E222"],
    classes: [],
    ghs: ["GHS07"],
    hazardStatements: [{ code: "H302", text: "Harmful if swallowed" }, { code: "H318", text: "Causes serious eye damage" }, { code: "EUH031", text: "Contact with acids liberates toxic gas" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Respirator if near acids" }, other: "Avoid acid contact" },
    storage: { cabinet: "General storage", temp: "Cool, dry", ventilation: "Normal", incompatible: ["Acids", "Oxidizers"] },
    transport: { un: "2693", class: "8", packingGroup: "III" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min, seek medical care.", ingestion: "Rinse mouth." }
  },

  "Trisodium Phosphate": {
    cas: "7601-54-9", formula: "Na₃PO₄",
    de: "Trinatriumphosphat", es: "Fosfato trisódico", fr: "Phosphate trisodique", pt: "Fosfato trissódico",
    synonyms: ["TSP", "Sodium phosphate tribasic"],
    classes: ["base"],
    ghs: ["GHS05", "GHS07"],
    hazardStatements: [{ code: "H315", text: "Causes skin irritation" }, { code: "H318", text: "Causes serious eye damage" }, { code: "H335", text: "May cause respiratory irritation" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Dust mask" }, other: "Strong alkali" },
    storage: { cabinet: "Base storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min, seek medical care.", ingestion: "Rinse mouth, drink water." }
  },

  "Monosodium Phosphate": {
    cas: "7558-80-7", formula: "NaH₂PO₄",
    de: "Natriumdihydrogenphosphat", es: "Fosfato monosódico", fr: "Phosphate monosodique", pt: "Fosfato monossódico",
    synonyms: ["MSP", "Sodium dihydrogen phosphate", "E339i"],
    classes: [],
    ghs: ["GHS07"],
    hazardStatements: [{ code: "H319", text: "Causes serious eye irritation" }],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves recommended" }, respiratory: { required: false, type: "Dust mask" }, other: "Mild acid" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 10 min.", ingestion: "Rinse mouth." }
  },

  "Disodium Phosphate": {
    cas: "7558-79-4", formula: "Na₂HPO₄",
    de: "Dinatriumhydrogenphosphat", es: "Fosfato disódico", fr: "Phosphate disodique", pt: "Fosfato dissódico",
    synonyms: ["DSP", "Sodium hydrogen phosphate", "E339ii"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Dust mask" }, other: "Minimal PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
  },

  "Sodium Hydroxide Flakes": {
    cas: "1310-73-2", formula: "NaOH",
    de: "Natriumhydroxid-Schuppen", es: "Escamas de hidróxido de sodio", fr: "Pastilles d'hydroxyde de sodium", pt: "Escamas de hidróxido de sódio",
    synonyms: ["Caustic soda flakes", "Lye flakes"],
    classes: ["base", "corrosive"],
    ghs: ["GHS05"],
    hazardStatements: [{ code: "H290", text: "May be corrosive to metals" }, { code: "H314", text: "Causes severe skin burns and eye damage" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Neoprene or butyl gloves" }, respiratory: { required: true, type: "Dust mask minimum" }, other: "Full chemical protection" },
    storage: { cabinet: "Base cabinet", temp: "Dry storage", ventilation: "Normal", incompatible: ["Acids", "Water (exothermic)", "Aluminum", "Zinc"] },
    transport: { un: "1823", class: "8", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air, medical care.", skin: "Flush 20+ min, remove clothing.", eyes: "Flush 20+ min, SEEK IMMEDIATE MEDICAL CARE.", ingestion: "Do NOT induce vomiting, drink water, seek medical care." }
  },

  "Calcium Oxide": {
    cas: "1305-78-8", formula: "CaO",
    de: "Calciumoxid", es: "Óxido de calcio", fr: "Oxyde de calcium", pt: "Óxido de cálcio",
    synonyms: ["Quicklime", "Burnt lime", "Unslaked lime"],
    classes: ["base", "corrosive"],
    ghs: ["GHS05", "GHS07"],
    hazardStatements: [{ code: "H315", text: "Causes skin irritation" }, { code: "H318", text: "Causes serious eye damage" }, { code: "H335", text: "May cause respiratory irritation" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Dust mask" }, other: "Reacts violently with water (heat)" },
    storage: { cabinet: "Base storage, keep dry", temp: "Room temperature", ventilation: "Normal", incompatible: ["Water (violent)", "Acids"] },
    transport: { un: "1910", class: "8", packingGroup: "III" },
    firstAid: { inhalation: "Fresh air, medical care.", skin: "Brush off, wash.", eyes: "Flush 20+ min, SEEK MEDICAL CARE.", ingestion: "Rinse mouth, drink water, seek medical care." }
  },

  "Calcium Carbonate": {
    cas: "471-34-1", formula: "CaCO₃",
    de: "Calciumcarbonat", es: "Carbonato de calcio", fr: "Carbonate de calcium", pt: "Carbonato de cálcio",
    synonyms: ["Limestone", "Chalk", "Marble", "E170"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Dust mask if needed" }, other: "Minimal PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids (fizzes)"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Safe, antacid." }
  },

  "Magnesium Chloride": {
    cas: "7786-30-3", formula: "MgCl₂",
    de: "Magnesiumchlorid", es: "Cloruro de magnesio", fr: "Chlorure de magnésium", pt: "Cloreto de magnésio",
    synonyms: ["E511"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Dust mask" }, other: "Minimal PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["None significant"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
  },

  "Sodium Sulfite": {
    cas: "7757-83-7", formula: "Na₂SO₃",
    de: "Natriumsulfit", es: "Sulfito de sodio", fr: "Sulfite de sodium", pt: "Sulfito de sódio",
    synonyms: ["E221"],
    classes: [],
    ghs: ["GHS07"],
    hazardStatements: [{ code: "H302", text: "Harmful if swallowed" }, { code: "EUH031", text: "Contact with acids liberates toxic gas" }],
    ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Respirator if near acids" }, other: "Avoid acids" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids (releases SO2)", "Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth, seek medical advice." }
  },

  "Sodium Acetate": {
    cas: "127-09-3", formula: "C₂H₃NaO₂",
    de: "Natriumacetat", es: "Acetato de sodio", fr: "Acétate de sodium", pt: "Acetato de sódio",
    synonyms: ["E262", "Sodium ethanoate"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Dust mask" }, other: "Minimal PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Safe." }
  },

  "Potassium Acetate": {
    cas: "127-08-2", formula: "C₂H₃KO₂",
    de: "Kaliumacetat", es: "Acetato de potasio", fr: "Acétate de potassium", pt: "Acetato de potássio",
    synonyms: ["E261"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Dust mask" }, other: "Minimal PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Safe." }
  },

  "Stearic Acid": {
    cas: "57-11-4", formula: "C₁₈H₃₆O₂",
    de: "Stearinsäure", es: "Ácido esteárico", fr: "Acide stéarique", pt: "Ácido esteárico",
    synonyms: ["Octadecanoic acid"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Dust mask" }, other: "Minimal PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Safe." }
  },

  "Oleic Acid": {
    cas: "112-80-1", formula: "C₁₈H₃₄O₂",
    de: "Ölsäure", es: "Ácido oleico", fr: "Acide oléique", pt: "Ácido oleico",
    synonyms: ["cis-9-Octadecenoic acid"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Gloves optional" }, respiratory: { required: false, type: "Not required" }, other: "Minimal PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Safe." }
  },

  "Paraffin Wax": {
    cas: "8002-74-2", formula: "CₙH₂ₙ₊₂",
    de: "Paraffinwachs", es: "Parafina", fr: "Cire de paraffine", pt: "Parafina",
    synonyms: ["Paraffin", "Mineral wax"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Heat-resistant gloves if molten" }, respiratory: { required: false, type: "Not required" }, other: "Caution with hot wax" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Cool burns.", eyes: "Flush.", ingestion: "Safe." }
  },

  "Silicone Oil": {
    cas: "63148-62-9", formula: "(SiO(CH₃)₂)ₙ",
    de: "Silikonöl", es: "Aceite de silicona", fr: "Huile de silicone", pt: "Óleo de silicone",
    synonyms: ["Polydimethylsiloxane", "PDMS", "Dimethicone"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Not required" }, other: "Minimal PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Generally safe." }
  },

  "Mineral Oil": {
    cas: "8042-47-5", formula: "Mixture",
    de: "Mineralöl", es: "Aceite mineral", fr: "Huile minérale", pt: "Óleo mineral",
    synonyms: ["White oil", "Paraffin oil", "Liquid paraffin"],
    classes: [],
    ghs: [],
    hazardStatements: [],
    ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Gloves optional" }, respiratory: { required: false, type: "Not required" }, other: "Minimal PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Generally safe, mild laxative effect." }
  },

  "Propyl Alcohol": {
    cas: "71-23-8", formula: "C₃H₈O",
    de: "Propylalkohol", es: "Alcohol propílico", fr: "Alcool propylique", pt: "Álcool propílico",
    synonyms: ["1-Propanol", "n-Propanol", "Propan-1-ol"],
    classes: ["flammable"],
    ghs: ["GHS02", "GHS07"],
    hazardStatements: [{ code: "H225", text: "Highly flammable liquid and vapor" }, { code: "H318", text: "Causes serious eye damage" }, { code: "H336", text: "May cause drowsiness or dizziness" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "OV respirator" }, other: "Ventilation required" },
    storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Required", incompatible: ["Oxidizers", "Strong acids"] },
    transport: { un: "1274", class: "3", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min, SEEK MEDICAL CARE.", ingestion: "Rinse mouth." }
  },

  "Acrylic Acid": {
    cas: "79-10-7", formula: "C₃H₄O₂",
    de: "Acrylsäure", es: "Ácido acrílico", fr: "Acide acrylique", pt: "Ácido acrílico",
    synonyms: ["Propenoic acid", "2-Propenoic acid"],
    classes: ["flammable", "corrosive", "toxic"],
    ghs: ["GHS02", "GHS05", "GHS07"],
    hazardStatements: [{ code: "H226", text: "Flammable liquid and vapor" }, { code: "H302", text: "Harmful if swallowed" }, { code: "H312", text: "Harmful in contact with skin" }, { code: "H314", text: "Causes severe skin burns and eye damage" }, { code: "H332", text: "Harmful if inhaled" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Butyl gloves" }, respiratory: { required: true, type: "OV/AG respirator" }, other: "May polymerize if heated" },
    storage: { cabinet: "Flammable cabinet with inhibitor", temp: "Cool", ventilation: "Required", incompatible: ["Oxidizers", "Bases", "Amines", "Heat (polymerization)"] },
    transport: { un: "2218", class: "8", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air, medical care.", skin: "Flush 20+ min.", eyes: "Flush 20+ min, SEEK MEDICAL CARE.", ingestion: "Do NOT induce vomiting, seek medical care." }
  },

  "Styrene": {
    cas: "100-42-5", formula: "C₈H₈",
    de: "Styrol", es: "Estireno", fr: "Styrène", pt: "Estireno",
    synonyms: ["Vinylbenzene", "Phenylethene", "Ethenylbenzene"],
    classes: ["flammable", "toxic"],
    ghs: ["GHS02", "GHS07", "GHS08"],
    hazardStatements: [{ code: "H226", text: "Flammable liquid and vapor" }, { code: "H315", text: "Causes skin irritation" }, { code: "H319", text: "Causes serious eye irritation" }, { code: "H332", text: "Harmful if inhaled" }, { code: "H361d", text: "Suspected of damaging the unborn child" }, { code: "H372", text: "Causes damage to organs through prolonged exposure" }],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "OV respirator" }, other: "Work in fume hood" },
    storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Required", incompatible: ["Oxidizers", "Peroxides", "Heat"] },
    transport: { un: "2055", class: "3", packingGroup: "III" },
    firstAid: { inhalation: "Fresh air, medical care.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth, do NOT induce vomiting." }
  },

  "Butyl Acetate": {
    cas: "123-86-4", formula: "C₆H₁₂O₂",
    de: "Butylacetat", es: "Acetato de butilo", fr: "Acétate de butyle", pt: "Acetato de butila",
    synonyms: ["n-Butyl acetate", "Butyl ethanoate"],
    classes: ["flammable"],
    ghs: ["GHS02", "GHS07"],
    hazardStatements: [{ code: "H226", text: "Flammable liquid and vapor" }, { code: "H336", text: "May cause drowsiness or dizziness" }],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "OV respirator" }, other: "Good ventilation" },
    storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Required", incompatible: ["Oxidizers", "Strong acids", "Strong bases"] },
    transport: { un: "1123", class: "3", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 10 min.", ingestion: "Rinse mouth, do NOT induce vomiting." }
  },

  // ===== FINAL 15 TO REACH 200 =====
  "Methyl Acetate": {
    cas: "79-20-9", formula: "C₃H₆O₂",
    de: "Methylacetat", es: "Acetato de metilo", fr: "Acétate de méthyle", pt: "Acetato de metila",
    synonyms: ["Acetic acid methyl ester"],
    classes: ["flammable"],
    ghs: ["GHS02", "GHS07"],
    hazardStatements: [{ code: "H225", text: "Highly flammable liquid and vapor" }, { code: "H319", text: "Causes serious eye irritation" }, { code: "H336", text: "May cause drowsiness or dizziness" }],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "OV respirator" }, other: "Ventilation" },
    storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Required", incompatible: ["Oxidizers", "Strong acids", "Strong bases"] },
    transport: { un: "1231", class: "3", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 10 min.", ingestion: "Rinse mouth." }
  },

  "Propylene Oxide": {
    cas: "75-56-9", formula: "C₃H₆O",
    de: "Propylenoxid", es: "Óxido de propileno", fr: "Oxyde de propylène", pt: "Óxido de propileno",
    synonyms: ["1,2-Epoxypropane", "Methyloxirane"],
    classes: ["flammable", "toxic"],
    ghs: ["GHS02", "GHS06", "GHS08"],
    hazardStatements: [{ code: "H224", text: "Extremely flammable liquid and vapor" }, { code: "H302", text: "Harmful if swallowed" }, { code: "H332", text: "Harmful if inhaled" }, { code: "H335", text: "May cause respiratory irritation" }, { code: "H350", text: "May cause cancer" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Butyl gloves" }, respiratory: { required: true, type: "SCBA or OV respirator" }, other: "Work in fume hood" },
    storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Required - vapors heavier than air", incompatible: ["Acids", "Bases", "Oxidizers", "Anhydrous metal chlorides"] },
    transport: { un: "1280", class: "3", packingGroup: "I" },
    firstAid: { inhalation: "Fresh air, emergency care.", skin: "Flush immediately.", eyes: "Flush 15 min.", ingestion: "Rinse mouth, seek medical care." }
  },

  "Ethylene Oxide": {
    cas: "75-21-8", formula: "C₂H₄O",
    de: "Ethylenoxid", es: "Óxido de etileno", fr: "Oxyde d'éthylène", pt: "Óxido de etileno",
    synonyms: ["Oxirane", "EO", "Epoxyethane"],
    classes: ["flammable", "toxic"],
    ghs: ["GHS02", "GHS04", "GHS06", "GHS08"],
    hazardStatements: [{ code: "H220", text: "Extremely flammable gas" }, { code: "H280", text: "Contains gas under pressure" }, { code: "H331", text: "Toxic if inhaled" }, { code: "H340", text: "May cause genetic defects" }, { code: "H350", text: "May cause cancer" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Butyl or Silvershield gloves, full suit" }, respiratory: { required: true, type: "SCBA" }, other: "Maximum protection required" },
    storage: { cabinet: "Gas cylinder storage, special precautions", temp: "Cool", ventilation: "Required", incompatible: ["Acids", "Bases", "Oxidizers", "Ammonia"] },
    transport: { un: "1040", class: "2.3", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air, emergency care.", skin: "Flush, remove clothing.", eyes: "Flush 20+ min.", ingestion: "Rinse mouth, emergency care." }
  },

  "Glutaraldehyde": {
    cas: "111-30-8", formula: "C₅H₈O₂",
    de: "Glutaraldehyd", es: "Glutaraldehído", fr: "Glutaraldéhyde", pt: "Glutaraldeído",
    synonyms: ["Glutaral", "1,5-Pentanedial"],
    classes: ["toxic", "corrosive"],
    ghs: ["GHS05", "GHS06", "GHS08", "GHS09"],
    hazardStatements: [{ code: "H301", text: "Toxic if swallowed" }, { code: "H314", text: "Causes severe skin burns and eye damage" }, { code: "H317", text: "May cause allergic skin reaction" }, { code: "H331", text: "Toxic if inhaled" }, { code: "H334", text: "May cause allergy or asthma symptoms if inhaled" }, { code: "H400", text: "Very toxic to aquatic life" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "OV/AG respirator" }, other: "Work in fume hood" },
    storage: { cabinet: "Corrosive cabinet", temp: "Cool", ventilation: "Required", incompatible: ["Strong oxidizers", "Strong bases", "Strong acids"] },
    transport: { un: "2922", class: "6.1", packingGroup: "III" },
    firstAid: { inhalation: "Fresh air, medical care.", skin: "Flush 20+ min.", eyes: "Flush 20+ min, seek medical care.", ingestion: "Do NOT induce vomiting, seek medical care." }
  },

  "Peroxyacetic Acid": {
    cas: "79-21-0", formula: "C₂H₄O₃",
    de: "Peressigsäure", es: "Ácido peracético", fr: "Acide peracétique", pt: "Ácido peracético",
    synonyms: ["Peracetic acid", "PAA"],
    classes: ["oxidizer", "corrosive", "flammable"],
    ghs: ["GHS02", "GHS03", "GHS05", "GHS07", "GHS09"],
    hazardStatements: [{ code: "H226", text: "Flammable liquid and vapor" }, { code: "H242", text: "Heating may cause a fire" }, { code: "H314", text: "Causes severe skin burns and eye damage" }, { code: "H332", text: "Harmful if inhaled" }, { code: "H400", text: "Very toxic to aquatic life" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Butyl gloves, apron" }, respiratory: { required: true, type: "OV/AG respirator" }, other: "Strong oxidizer - fire hazard" },
    storage: { cabinet: "Oxidizer cabinet, cool", temp: "Below 30°C", ventilation: "Required", incompatible: ["Organic materials", "Reducing agents", "Metals"] },
    transport: { un: "3105", class: "5.2", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air, medical care.", skin: "Flush 20+ min.", eyes: "Flush 20+ min, SEEK MEDICAL CARE.", ingestion: "Do NOT induce vomiting, seek medical care." }
  },

  "Sodium Persulfate": {
    cas: "7775-27-1", formula: "Na₂S₂O₈",
    de: "Natriumpersulfat", es: "Persulfato de sodio", fr: "Persulfate de sodium", pt: "Persulfato de sódio",
    synonyms: ["Sodium peroxydisulfate"],
    classes: ["oxidizer"],
    ghs: ["GHS03", "GHS07", "GHS08"],
    hazardStatements: [{ code: "H272", text: "May intensify fire; oxidizer" }, { code: "H302", text: "Harmful if swallowed" }, { code: "H315", text: "Causes skin irritation" }, { code: "H317", text: "May cause allergic skin reaction" }, { code: "H319", text: "Causes serious eye irritation" }, { code: "H334", text: "May cause allergy or asthma symptoms if inhaled" }, { code: "H335", text: "May cause respiratory irritation" }],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Dust mask" }, other: "Sensitizer - avoid repeated exposure" },
    storage: { cabinet: "Oxidizer cabinet", temp: "Cool, dry", ventilation: "Normal", incompatible: ["Reducing agents", "Organic materials", "Moisture"] },
    transport: { un: "1505", class: "5.1", packingGroup: "III" },
    firstAid: { inhalation: "Fresh air, medical care if symptoms.", skin: "Wash thoroughly.", eyes: "Flush 10 min.", ingestion: "Rinse mouth." }
  },

  "Ammonium Persulfate": {
    cas: "7727-54-0", formula: "(NH₄)₂S₂O₈",
    de: "Ammoniumpersulfat", es: "Persulfato de amonio", fr: "Persulfate d'ammonium", pt: "Persulfato de amônio",
    synonyms: ["Ammonium peroxydisulfate", "APS"],
    classes: ["oxidizer"],
    ghs: ["GHS03", "GHS07", "GHS08"],
    hazardStatements: [{ code: "H272", text: "May intensify fire; oxidizer" }, { code: "H302", text: "Harmful if swallowed" }, { code: "H315", text: "Causes skin irritation" }, { code: "H317", text: "May cause allergic skin reaction" }, { code: "H319", text: "Causes serious eye irritation" }, { code: "H334", text: "May cause allergy or asthma symptoms if inhaled" }, { code: "H335", text: "May cause respiratory irritation" }],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Dust mask" }, other: "Sensitizer" },
    storage: { cabinet: "Oxidizer cabinet", temp: "Cool, dry", ventilation: "Normal", incompatible: ["Reducing agents", "Organic materials"] },
    transport: { un: "1444", class: "5.1", packingGroup: "III" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 10 min.", ingestion: "Rinse mouth." }
  },

  "Triethanolamine": {
    cas: "102-71-6", formula: "C₆H₁₅NO₃",
    de: "Triethanolamin", es: "Trietanolamina", fr: "Triéthanolamine", pt: "Trietanolamina",
    synonyms: ["TEA", "2,2',2''-Nitrilotriethanol"],
    classes: [],
    ghs: ["GHS07"],
    hazardStatements: [{ code: "H319", text: "Causes serious eye irritation" }],
    ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Not normally required" }, other: "Standard PPE" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong acids"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 10 min.", ingestion: "Rinse mouth." }
  },

  "Diethanolamine": {
    cas: "111-42-2", formula: "C₄H₁₁NO₂",
    de: "Diethanolamin", es: "Dietanolamina", fr: "Diéthanolamine", pt: "Dietanolamina",
    synonyms: ["DEA", "2,2'-Iminodiethanol"],
    classes: ["toxic"],
    ghs: ["GHS07", "GHS08"],
    hazardStatements: [{ code: "H302", text: "Harmful if swallowed" }, { code: "H315", text: "Causes skin irritation" }, { code: "H318", text: "Causes serious eye damage" }, { code: "H373", text: "May cause damage to organs through prolonged exposure" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "OV respirator if heated" }, other: "Avoid prolonged exposure" },
    storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong acids"] },
    transport: { un: "Not regulated", class: "Not hazardous", packingGroup: "N/A" },
    firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min, seek medical care.", ingestion: "Rinse mouth, seek medical advice." }
  },

  "Monoethanolamine": {
    cas: "141-43-5", formula: "C₂H₇NO",
    de: "Monoethanolamin", es: "Monoetanolamina", fr: "Monoéthanolamine", pt: "Monoetanolamina",
    synonyms: ["MEA", "Ethanolamine", "2-Aminoethanol"],
    classes: ["corrosive", "toxic"],
    ghs: ["GHS05", "GHS07"],
    hazardStatements: [{ code: "H302", text: "Harmful if swallowed" }, { code: "H312", text: "Harmful in contact with skin" }, { code: "H314", text: "Causes severe skin burns and eye damage" }, { code: "H332", text: "Harmful if inhaled" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Nitrile or butyl gloves" }, respiratory: { required: true, type: "OV/AG respirator" }, other: "Corrosive base" },
    storage: { cabinet: "Corrosive cabinet", temp: "Room temperature", ventilation: "Required", incompatible: ["Strong acids", "Strong oxidizers"] },
    transport: { un: "2491", class: "8", packingGroup: "III" },
    firstAid: { inhalation: "Fresh air, medical care.", skin: "Flush 20+ min.", eyes: "Flush 20+ min, SEEK MEDICAL CARE.", ingestion: "Do NOT induce vomiting, seek medical care." }
  },

  "Ethylenediamine": {
    cas: "107-15-3", formula: "C₂H₈N₂",
    de: "Ethylendiamin", es: "Etilendiamina", fr: "Éthylènediamine", pt: "Etilenodiamina",
    synonyms: ["EDA", "1,2-Diaminoethane", "1,2-Ethanediamine"],
    classes: ["flammable", "corrosive", "toxic"],
    ghs: ["GHS02", "GHS05", "GHS07"],
    hazardStatements: [{ code: "H226", text: "Flammable liquid and vapor" }, { code: "H302", text: "Harmful if swallowed" }, { code: "H312", text: "Harmful in contact with skin" }, { code: "H314", text: "Causes severe skin burns and eye damage" }, { code: "H317", text: "May cause allergic skin reaction" }, { code: "H332", text: "Harmful if inhaled" }, { code: "H334", text: "May cause allergy or asthma symptoms if inhaled" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Butyl gloves" }, respiratory: { required: true, type: "Full-face OV/AG respirator" }, other: "Strong sensitizer" },
    storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Required", incompatible: ["Acids", "Oxidizers", "Copper", "Zinc"] },
    transport: { un: "1604", class: "8", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air, emergency care.", skin: "Flush 20+ min.", eyes: "Flush 20+ min, SEEK MEDICAL CARE.", ingestion: "Do NOT induce vomiting, seek medical care." }
  },

  "Sodium Hydroxide 50%": {
    cas: "1310-73-2", formula: "NaOH (aq)",
    de: "Natriumhydroxid 50%", es: "Hidróxido de sodio 50%", fr: "Hydroxyde de sodium 50%", pt: "Hidróxido de sódio 50%",
    synonyms: ["Caustic soda solution", "Lye solution", "Liquid caustic"],
    classes: ["base", "corrosive"],
    ghs: ["GHS05"],
    hazardStatements: [{ code: "H290", text: "May be corrosive to metals" }, { code: "H314", text: "Causes severe skin burns and eye damage" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Neoprene or butyl gloves, apron" }, respiratory: { required: true, type: "Not normally required unless misted" }, other: "Full chemical protection" },
    storage: { cabinet: "Base storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids", "Aluminum", "Zinc", "Tin"] },
    transport: { un: "1824", class: "8", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air.", skin: "Flush 20+ min.", eyes: "Flush 20+ min, SEEK IMMEDIATE MEDICAL CARE.", ingestion: "Do NOT induce vomiting, drink water, seek medical care." }
  },

  "Sulfuric Acid 98%": {
    cas: "7664-93-9", formula: "H₂SO₄",
    de: "Schwefelsäure 98%", es: "Ácido sulfúrico 98%", fr: "Acide sulfurique 98%", pt: "Ácido sulfúrico 98%",
    synonyms: ["Concentrated sulfuric acid", "Oil of vitriol"],
    classes: ["acid", "corrosive"],
    ghs: ["GHS05"],
    hazardStatements: [{ code: "H290", text: "May be corrosive to metals" }, { code: "H314", text: "Causes severe skin burns and eye damage" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Butyl or neoprene gloves, full suit" }, respiratory: { required: true, type: "Acid gas respirator" }, other: "NEVER add water to acid" },
    storage: { cabinet: "Acid cabinet", temp: "Room temperature", ventilation: "Required", incompatible: ["Water (add acid to water only)", "Bases", "Organics", "Metals"] },
    transport: { un: "1830", class: "8", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air, medical care.", skin: "Flush 20+ min.", eyes: "Flush 20+ min, SEEK IMMEDIATE MEDICAL CARE.", ingestion: "Do NOT induce vomiting, drink water, emergency care." }
  },

  "Hydrochloric Acid 37%": {
    cas: "7647-01-0", formula: "HCl (aq)",
    de: "Salzsäure 37%", es: "Ácido clorhídrico 37%", fr: "Acide chlorhydrique 37%", pt: "Ácido clorídrico 37%",
    synonyms: ["Concentrated hydrochloric acid", "Muriatic acid conc."],
    classes: ["acid", "corrosive"],
    ghs: ["GHS05", "GHS07"],
    hazardStatements: [{ code: "H290", text: "May be corrosive to metals" }, { code: "H314", text: "Causes severe skin burns and eye damage" }, { code: "H335", text: "May cause respiratory irritation" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "PVC or neoprene gloves, apron" }, respiratory: { required: true, type: "Acid gas respirator" }, other: "Fuming acid - work in fume hood" },
    storage: { cabinet: "Acid cabinet", temp: "Room temperature", ventilation: "Required - corrosive fumes", incompatible: ["Bases", "Metals", "Oxidizers", "Cyanides", "Sulfides"] },
    transport: { un: "1789", class: "8", packingGroup: "II" },
    firstAid: { inhalation: "Fresh air, medical care.", skin: "Flush 20+ min.", eyes: "Flush 20+ min, SEEK IMMEDIATE MEDICAL CARE.", ingestion: "Do NOT induce vomiting, drink water, emergency care." }
  },

  "Nitric Acid 70%": {
    cas: "7697-37-2", formula: "HNO₃",
    de: "Salpetersäure 70%", es: "Ácido nítrico 70%", fr: "Acide nitrique 70%", pt: "Ácido nítrico 70%",
    synonyms: ["Concentrated nitric acid"],
    classes: ["acid", "corrosive", "oxidizer"],
    ghs: ["GHS03", "GHS05"],
    hazardStatements: [{ code: "H272", text: "May intensify fire; oxidizer" }, { code: "H290", text: "May be corrosive to metals" }, { code: "H314", text: "Causes severe skin burns and eye damage" }],
    ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Butyl or neoprene gloves, full suit" }, respiratory: { required: true, type: "Full-face acid gas/OV respirator" }, other: "Fuming, oxidizing acid - maximum precautions" },
    storage: { cabinet: "Acid cabinet (separate from organics)", temp: "Room temperature", ventilation: "Required - toxic fumes", incompatible: ["Organic materials", "Reducing agents", "Metals", "Bases"] },
    transport: { un: "2031", class: "8", packingGroup: "I" },
    firstAid: { inhalation: "Fresh air, emergency care.", skin: "Flush 20+ min.", eyes: "Flush 20+ min, SEEK IMMEDIATE MEDICAL CARE.", ingestion: "Do NOT induce vomiting, emergency care." }
  }
};

// Compatibility rules for storage
const storageCompatibility = {
  "acid+base": { rating: "never", reason: "Violent exothermic reaction - NEVER store together" },
  "acid+flammable": { rating: "separate", reason: "Store in separate cabinets" },
  "acid+oxidizer": { rating: "separate", reason: "May produce toxic gases - separate storage required" },
  "acid+toxic": { rating: "caution", reason: "Check specific chemicals - may release toxic gases" },
  "acid+corrosive": { rating: "ok", reason: "Acids are corrosive - same cabinet if both acids" },
  "acid+acid": { rating: "ok", reason: "Can store together in acid cabinet" },
  "base+flammable": { rating: "separate", reason: "Store in separate cabinets" },
  "base+oxidizer": { rating: "caution", reason: "Check specific chemicals for compatibility" },
  "base+toxic": { rating: "caution", reason: "Check specific chemicals for compatibility" },
  "base+corrosive": { rating: "ok", reason: "Bases are corrosive - same cabinet if both bases" },
  "base+base": { rating: "ok", reason: "Can store together in base cabinet" },
  "flammable+oxidizer": { rating: "never", reason: "Fire and explosion hazard - NEVER store together" },
  "flammable+toxic": { rating: "separate", reason: "Store in separate ventilated areas" },
  "flammable+corrosive": { rating: "separate", reason: "Store in separate areas" },
  "flammable+flammable": { rating: "ok", reason: "Can store together in flammable safety cabinet" },
  "oxidizer+toxic": { rating: "separate", reason: "May release toxic fumes - separate storage" },
  "oxidizer+corrosive": { rating: "caution", reason: "Check specific chemicals" },
  "oxidizer+oxidizer": { rating: "caution", reason: "Check specific chemicals - some oxidizers are incompatible" },
  "toxic+toxic": { rating: "caution", reason: "Check specific chemicals for reactions" },
  "toxic+corrosive": { rating: "caution", reason: "Check specific chemicals" },
  "corrosive+corrosive": { rating: "caution", reason: "Separate acids from bases even though both corrosive" }
};

// GHS pictogram info with image paths
const ghsInfo = {
  "GHS01": { img: "img/ghs/ghs01.svg", emoji: "💥", name: "Explosive", desc: "Explosives, self-reactive substances" },
  "GHS02": { img: "img/ghs/ghs02.svg", emoji: "🔥", name: "Flammable", desc: "Flammable materials" },
  "GHS03": { img: "img/ghs/ghs03.svg", emoji: "⭕", name: "Oxidizer", desc: "May cause or intensify fire" },
  "GHS04": { img: "img/ghs/ghs04.svg", emoji: "🫧", name: "Gas Cylinder", desc: "Gases under pressure" },
  "GHS05": { img: "img/ghs/ghs05.svg", emoji: "⚗️", name: "Corrosive", desc: "Causes burns" },
  "GHS06": { img: "img/ghs/ghs06.svg", emoji: "☠️", name: "Toxic", desc: "Acute toxicity (fatal or toxic)" },
  "GHS07": { img: "img/ghs/ghs07.svg", emoji: "⚠️", name: "Irritant", desc: "Harmful/irritant" },
  "GHS08": { img: "img/ghs/ghs08.svg", emoji: "🫁", name: "Health Hazard", desc: "Serious health hazard" },
  "GHS09": { img: "img/ghs/ghs09.svg", emoji: "🌿", name: "Environment", desc: "Environmental hazard" }
};

// Class information
const classInfo = {
  acid: { name: "Acid", color: "#ef4444", cabinet: "Acid cabinet" },
  base: { name: "Base/Alkali", color: "#3b82f6", cabinet: "Base cabinet" },
  flammable: { name: "Flammable", color: "#f97316", cabinet: "Flammable safety cabinet" },
  oxidizer: { name: "Oxidizer", color: "#eab308", cabinet: "Oxidizer storage" },
  toxic: { name: "Toxic", color: "#7c3aed", cabinet: "Toxic chemical storage" },
  corrosive: { name: "Corrosive", color: "#dc2626", cabinet: "Corrosive storage" }
};

// Export for use in HTML
if (typeof window !== 'undefined') {
  window.chemicalHazardDB = chemicalHazardDB;
  window.storageCompatibility = storageCompatibility;
  window.ghsInfo = ghsInfo;
  window.classInfo = classInfo;
}

// ===== ADDITIONAL CHEMICALS (Batch 2) =====

// More acids
chemicalHazardDB["Hydrofluoric Acid"] = {
  cas: "7664-39-3", formula: "HF",
  de: "Flusssäure", es: "Ácido fluorhídrico", fr: "Acide fluorhydrique", pt: "Ácido fluorídrico",
  synonyms: ["HF", "Fluorhydric acid"],
  classes: ["acid", "corrosive", "toxic"],
  ghs: ["GHS05", "GHS06"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H314", text: "Causes severe skin burns and eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Neoprene or thick nitrile gloves, full suit" }, respiratory: { required: true, type: "Full-face respirator or SCBA" }, other: "EXTREMELY DANGEROUS - calcium gluconate gel must be available" },
  storage: { cabinet: "Acid cabinet (separate)", temp: "Cool, below 25°C", ventilation: "Excellent", incompatible: ["Glass", "Bases", "Metals", "Ammonia"] },
  transport: { un: "1790", class: "8 (6.1)", packingGroup: "I", properShipping: "Hydrofluoric acid" },
  firstAid: { inhalation: "Move to fresh air. Seek IMMEDIATE medical attention.", skin: "Apply calcium gluconate gel. Flush with water. IMMEDIATE medical attention.", eyes: "Flush 30+ min. IMMEDIATE medical attention.", ingestion: "IMMEDIATE medical attention. Give calcium gluconate if available." }
};

chemicalHazardDB["Chromic Acid"] = {
  cas: "7738-94-5", formula: "H₂CrO₄",
  de: "Chromsäure", es: "Ácido crómico", fr: "Acide chromique", pt: "Ácido crômico",
  synonyms: ["Chromium trioxide solution"],
  classes: ["acid", "corrosive", "oxidizer", "toxic"],
  ghs: ["GHS03", "GHS05", "GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H271", text: "May cause fire or explosion; strong oxidizer" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H314", text: "Causes severe skin burns" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H340", text: "May cause genetic defects" },
    { code: "H350", text: "May cause cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber gloves, full chemical suit" }, respiratory: { required: true, type: "P100 or SCBA" }, other: "Carcinogen - minimize all exposure" },
  storage: { cabinet: "Oxidizer/acid (separate from organics)", temp: "Room temperature", ventilation: "Good", incompatible: ["Organics", "Flammables", "Reducing agents"] },
  transport: { un: "1755", class: "8", packingGroup: "II", properShipping: "Chromic acid solution" },
  firstAid: { inhalation: "Fresh air. Immediate medical attention.", skin: "Flush 20+ min. Medical attention.", eyes: "Flush 30+ min. Immediate medical attention.", ingestion: "Do NOT vomit. Immediate medical attention." }
};

chemicalHazardDB["Perchloric Acid"] = {
  cas: "7601-90-3", formula: "HClO₄",
  de: "Perchlorsäure", es: "Ácido perclórico", fr: "Acide perchlorique", pt: "Ácido perclórico",
  synonyms: [],
  classes: ["acid", "corrosive", "oxidizer"],
  ghs: ["GHS03", "GHS05", "GHS07"],
  hazardStatements: [
    { code: "H271", text: "May cause fire or explosion; strong oxidizer" },
    { code: "H290", text: "May be corrosive to metals" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H314", text: "Causes severe skin burns" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Neoprene gloves" }, respiratory: { required: true, type: "Acid gas respirator" }, other: "Use only in perchloric acid fume hood" },
  storage: { cabinet: "Dedicated perchloric acid storage", temp: "Cool", ventilation: "Perchloric acid rated hood", incompatible: ["Organics", "Wood", "Cellulose", "Metals"] },
  transport: { un: "1873", class: "5.1 (8)", packingGroup: "I", properShipping: "Perchloric acid" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Flush 20+ min.", eyes: "Flush 30+ min. Medical attention.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Lactic Acid"] = {
  cas: "50-21-5", formula: "C₃H₆O₃",
  de: "Milchsäure", es: "Ácido láctico", fr: "Acide lactique", pt: "Ácido lático",
  synonyms: ["2-Hydroxypropanoic acid"],
  classes: ["acid"],
  ghs: ["GHS05"],
  hazardStatements: [{ code: "H314", text: "Causes severe skin burns and eye damage" }],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Rubber gloves" }, respiratory: { required: false, type: "Not required" }, other: "" },
  storage: { cabinet: "Acid cabinet", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Bases"] },
  transport: { un: "3265", class: "8", packingGroup: "III", properShipping: "Corrosive liquid, acidic" },
  firstAid: { inhalation: "Fresh air.", skin: "Flush with water 15 min.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Drink water." }
};

chemicalHazardDB["Tartaric Acid"] = {
  cas: "87-69-4", formula: "C₄H₆O₆",
  de: "Weinsäure", es: "Ácido tartárico", fr: "Acide tartrique", pt: "Ácido tartárico",
  synonyms: [],
  classes: ["acid"],
  ghs: ["GHS07"],
  hazardStatements: [{ code: "H319", text: "Causes serious eye irritation" }],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves for prolonged contact" }, respiratory: { required: false, type: "Not required" }, other: "" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush 10 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Boric Acid"] = {
  cas: "10043-35-3", formula: "H₃BO₃",
  de: "Borsäure", es: "Ácido bórico", fr: "Acide borique", pt: "Ácido bórico",
  synonyms: ["Orthoboric acid"],
  classes: ["toxic"],
  ghs: ["GHS08"],
  hazardStatements: [{ code: "H360FD", text: "May damage fertility. May damage the unborn child." }],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask if powder" }, other: "Reproductive hazard" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong reducing agents"] },
  transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush 15 min.", ingestion: "Seek medical attention." }
};

// More solvents
chemicalHazardDB["Ethyl Acetate"] = {
  cas: "141-78-6", formula: "C₄H₈O₂",
  de: "Ethylacetat", es: "Acetato de etilo", fr: "Acétate d'éthyle", pt: "Acetato de etila",
  synonyms: ["Ethyl ester"],
  classes: ["flammable"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Use in ventilated area" }, other: "No flames" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers", "Strong acids", "Strong bases"] },
  transport: { un: "1173", class: "3", packingGroup: "II", properShipping: "Ethyl acetate" },
  firstAid: { inhalation: "Fresh air. Rest.", skin: "Wash with soap and water.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Butanol"] = {
  cas: "71-36-3", formula: "C₄H₉OH",
  de: "Butanol", es: "Butanol", fr: "Butanol", pt: "Butanol",
  synonyms: ["n-Butanol", "1-Butanol", "Butyl alcohol"],
  classes: ["flammable"],
  ghs: ["GHS02", "GHS05", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Ventilated area" }, other: "" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers", "Strong acids"] },
  transport: { un: "1120", class: "3", packingGroup: "III", properShipping: "Butanols" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with soap.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Cyclohexane"] = {
  cas: "110-82-7", formula: "C₆H₁₂",
  de: "Cyclohexan", es: "Ciclohexano", fr: "Cyclohexane", pt: "Ciclohexano",
  synonyms: ["Hexamethylene"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H336", text: "May cause drowsiness" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Fume hood" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers"] },
  transport: { un: "1145", class: "3", packingGroup: "II", properShipping: "Cyclohexane" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with soap.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Petroleum Ether"] = {
  cas: "8032-32-4", formula: "Mix",
  de: "Petrolether", es: "Éter de petróleo", fr: "Éther de pétrole", pt: "Éter de petróleo",
  synonyms: ["Ligroin", "Benzine", "Pet ether"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H224", text: "Extremely flammable liquid and vapor" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H336", text: "May cause drowsiness" },
    { code: "H411", text: "Toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Fume hood" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Excellent", incompatible: ["Oxidizers"] },
  transport: { un: "1268", class: "3", packingGroup: "II", properShipping: "Petroleum distillates" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with soap.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Carbon Tetrachloride"] = {
  cas: "56-23-5", formula: "CCl₄",
  de: "Tetrachlorkohlenstoff", es: "Tetracloruro de carbono", fr: "Tétrachlorure de carbone", pt: "Tetracloreto de carbono",
  synonyms: ["Carbon tet", "Tetrachloromethane"],
  classes: ["toxic"],
  ghs: ["GHS06", "GHS08"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H351", text: "Suspected of causing cancer" },
    { code: "H372", text: "Causes damage to organs through prolonged exposure" },
    { code: "H412", text: "Harmful to aquatic life" },
    { code: "H420", text: "Harms public health and the environment by destroying ozone" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Viton or PVA gloves" }, respiratory: { required: true, type: "Organic vapor respirator or SCBA" }, other: "Fume hood required. Ozone depleting." },
  storage: { cabinet: "Toxic storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Alkali metals", "Aluminum", "Fluorine"] },
  transport: { un: "1846", class: "6.1", packingGroup: "II", properShipping: "Carbon tetrachloride" },
  firstAid: { inhalation: "Fresh air. Immediate medical attention.", skin: "Wash thoroughly. Medical attention.", eyes: "Flush 20 min.", ingestion: "Do NOT vomit. Immediate medical attention." }
};

chemicalHazardDB["Trichloroethylene"] = {
  cas: "79-01-6", formula: "C₂HCl₃",
  de: "Trichlorethylen", es: "Tricloroetileno", fr: "Trichloroéthylène", pt: "Tricloroetileno",
  synonyms: ["TCE", "Trike"],
  classes: ["toxic"],
  ghs: ["GHS07", "GHS08"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H336", text: "May cause drowsiness" },
    { code: "H341", text: "Suspected of causing genetic defects" },
    { code: "H350", text: "May cause cancer" },
    { code: "H412", text: "Harmful to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Viton or PVA gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Fume hood. Carcinogen." },
  storage: { cabinet: "Toxic storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Strong bases", "Strong oxidizers", "Alkali metals"] },
  transport: { un: "1710", class: "6.1", packingGroup: "III", properShipping: "Trichloroethylene" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash with soap.", eyes: "Flush 15 min.", ingestion: "Medical attention." }
};

chemicalHazardDB["N,N-Dimethylformamide"] = {
  cas: "68-12-2", formula: "C₃H₇NO",
  de: "Dimethylformamid", es: "Dimetilformamida", fr: "Diméthylformamide", pt: "Dimetilformamida",
  synonyms: ["DMF"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H360D", text: "May damage the unborn child" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl rubber gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Reproductive hazard. Absorbs through skin." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Good", incompatible: ["Strong oxidizers", "Halogenated compounds"] },
  transport: { un: "2265", class: "3", packingGroup: "III", properShipping: "N,N-Dimethylformamide" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash thoroughly.", eyes: "Flush 15 min.", ingestion: "Medical attention." }
};

chemicalHazardDB["Pyridine"] = {
  cas: "110-86-1", formula: "C₅H₅N",
  de: "Pyridin", es: "Piridina", fr: "Pyridine", pt: "Piridina",
  synonyms: ["Azabenzene"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Fume hood. Strong odor." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Good", incompatible: ["Strong oxidizers", "Strong acids"] },
  transport: { un: "1282", class: "3", packingGroup: "II", properShipping: "Pyridine" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with soap.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

// More industrial chemicals
chemicalHazardDB["Sodium Carbonate"] = {
  cas: "497-19-8", formula: "Na₂CO₃",
  de: "Natriumcarbonat", es: "Carbonato de sodio", fr: "Carbonate de sodium", pt: "Carbonato de sódio",
  synonyms: ["Soda ash", "Washing soda"],
  classes: ["base"],
  ghs: ["GHS07"],
  hazardStatements: [{ code: "H319", text: "Causes serious eye irritation" }],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves for prolonged contact" }, respiratory: { required: false, type: "Dust mask if powder" }, other: "" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids"] },
  transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Sodium Bicarbonate"] = {
  cas: "144-55-8", formula: "NaHCO₃",
  de: "Natriumhydrogencarbonat", es: "Bicarbonato de sodio", fr: "Bicarbonate de sodium", pt: "Bicarbonato de sódio",
  synonyms: ["Baking soda", "Sodium hydrogen carbonate"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses if dusty" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Not required" }, other: "Non-hazardous" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids"] },
  transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush with water.", ingestion: "Drink water." }
};

chemicalHazardDB["Calcium Chloride"] = {
  cas: "10043-52-4", formula: "CaCl₂",
  de: "Calciumchlorid", es: "Cloruro de calcio", fr: "Chlorure de calcium", pt: "Cloreto de cálcio",
  synonyms: [],
  classes: [],
  ghs: ["GHS07"],
  hazardStatements: [{ code: "H319", text: "Causes serious eye irritation" }],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves for prolonged contact" }, respiratory: { required: false, type: "Dust mask" }, other: "Exothermic when dissolving" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Zinc", "Water (heat generated)"] },
  transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Magnesium Sulfate"] = {
  cas: "7487-88-9", formula: "MgSO₄",
  de: "Magnesiumsulfat", es: "Sulfato de magnesio", fr: "Sulfate de magnésium", pt: "Sulfato de magnésio",
  synonyms: ["Epsom salt"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses if dusty" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Not required" }, other: "Non-hazardous" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: [] },
  transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush with water.", ingestion: "Drink water." }
};

chemicalHazardDB["Potassium Chloride"] = {
  cas: "7447-40-7", formula: "KCl",
  de: "Kaliumchlorid", es: "Cloruro de potasio", fr: "Chlorure de potassium", pt: "Cloreto de potássio",
  synonyms: ["Muriate of potash"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses if dusty" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Not required" }, other: "Non-hazardous" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush with water.", ingestion: "Drink water." }
};

chemicalHazardDB["Ferrous Sulfate"] = {
  cas: "7782-63-0", formula: "FeSO₄·7H₂O",
  de: "Eisen(II)-sulfat", es: "Sulfato ferroso", fr: "Sulfate ferreux", pt: "Sulfato ferroso",
  synonyms: ["Iron(II) sulfate", "Green vitriol"],
  classes: [],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases", "Oxidizers"] },
  transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Sodium Sulfate"] = {
  cas: "7757-82-6", formula: "Na₂SO₄",
  de: "Natriumsulfat", es: "Sulfato de sodio", fr: "Sulfate de sodium", pt: "Sulfato de sódio",
  synonyms: ["Glauber's salt"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses if dusty" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Not required" }, other: "Non-hazardous" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Aluminum"] },
  transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush with water.", ingestion: "Drink water." }
};

chemicalHazardDB["Potassium Carbonate"] = {
  cas: "584-08-7", formula: "K₂CO₃",
  de: "Kaliumcarbonat", es: "Carbonato de potasio", fr: "Carbonate de potassium", pt: "Carbonato de potássio",
  synonyms: ["Potash", "Pearl ash"],
  classes: ["base"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask if powder" }, other: "" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids"] },
  transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Aluminium Sulfate"] = {
  cas: "10043-01-3", formula: "Al₂(SO₄)₃",
  de: "Aluminiumsulfat", es: "Sulfato de aluminio", fr: "Sulfate d'aluminium", pt: "Sulfato de alumínio",
  synonyms: ["Alum"],
  classes: [],
  ghs: ["GHS07"],
  hazardStatements: [{ code: "H319", text: "Causes serious eye irritation" }],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves for prolonged contact" }, respiratory: { required: false, type: "Dust mask" }, other: "" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases"] },
  transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Sodium Sulfite"] = {
  cas: "7757-83-7", formula: "Na₂SO₃",
  de: "Natriumsulfit", es: "Sulfito de sodio", fr: "Sulfite de sodium", pt: "Sulfito de sódio",
  synonyms: [],
  classes: [],
  ghs: ["GHS07"],
  hazardStatements: [{ code: "H319", text: "Causes serious eye irritation" }],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves for prolonged contact" }, respiratory: { required: false, type: "Dust mask" }, other: "" },
  storage: { cabinet: "General storage", temp: "Room temperature, keep dry", ventilation: "Normal", incompatible: ["Acids (releases SO2)", "Oxidizers"] },
  transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Sodium Thiosulfate"] = {
  cas: "7772-98-7", formula: "Na₂S₂O₃",
  de: "Natriumthiosulfat", es: "Tiosulfato de sodio", fr: "Thiosulfate de sodium", pt: "Tiossulfato de sódio",
  synonyms: ["Hypo", "Sodium hyposulfite"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses if dusty" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Not required" }, other: "Non-hazardous" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids (releases SO2)", "Oxidizers"] },
  transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush with water.", ingestion: "Rinse mouth." }
};

// More hazardous chemicals
chemicalHazardDB["Sodium Cyanide"] = {
  cas: "143-33-9", formula: "NaCN",
  de: "Natriumcyanid", es: "Cianuro de sodio", fr: "Cyanure de sodium", pt: "Cianeto de sódio",
  synonyms: [],
  classes: ["toxic"],
  ghs: ["GHS06", "GHS09"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Full chemical suit, double gloves" }, respiratory: { required: true, type: "SCBA only" }, other: "EXTREMELY TOXIC - trained personnel only. Cyanide antidote kit required." },
  storage: { cabinet: "Locked toxic storage", temp: "Room temperature, keep dry", ventilation: "Good", incompatible: ["Acids (releases HCN gas!)", "Oxidizers", "Water"] },
  transport: { un: "1689", class: "6.1", packingGroup: "I", properShipping: "Sodium cyanide" },
  firstAid: { inhalation: "Fresh air. IMMEDIATE cyanide antidote. Call poison control.", skin: "Remove clothing. Wash thoroughly. Seek immediate medical attention.", eyes: "Flush 20 min.", ingestion: "IMMEDIATE medical attention. Cyanide antidote if available." }
};

chemicalHazardDB["Potassium Cyanide"] = {
  cas: "151-50-8", formula: "KCN",
  de: "Kaliumcyanid", es: "Cianuro de potasio", fr: "Cyanure de potassium", pt: "Cianeto de potássio",
  synonyms: [],
  classes: ["toxic"],
  ghs: ["GHS06", "GHS09"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Full chemical suit, double gloves" }, respiratory: { required: true, type: "SCBA only" }, other: "EXTREMELY TOXIC - trained personnel only" },
  storage: { cabinet: "Locked toxic storage", temp: "Room temperature, keep dry", ventilation: "Good", incompatible: ["Acids (releases HCN!)", "Oxidizers"] },
  transport: { un: "1680", class: "6.1", packingGroup: "I", properShipping: "Potassium cyanide" },
  firstAid: { inhalation: "Fresh air. IMMEDIATE cyanide antidote.", skin: "Remove clothing. Wash thoroughly. Immediate medical attention.", eyes: "Flush 20 min.", ingestion: "IMMEDIATE medical attention. Cyanide antidote." }
};

chemicalHazardDB["Mercury"] = {
  cas: "7439-97-6", formula: "Hg",
  de: "Quecksilber", es: "Mercurio", fr: "Mercure", pt: "Mercúrio",
  synonyms: ["Quicksilver"],
  classes: ["toxic"],
  ghs: ["GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H360D", text: "May damage the unborn child" },
    { code: "H372", text: "Causes damage to organs through prolonged exposure" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Mercury vapor respirator" }, other: "Mercury spill kit required" },
  storage: { cabinet: "Toxic storage, in sealed containers", temp: "Room temperature", ventilation: "Good", incompatible: ["Ammonia", "Chlorine", "Acids", "Oxidizers"] },
  transport: { un: "2809", class: "8", packingGroup: "III", properShipping: "Mercury" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash with soap.", eyes: "Flush 15 min.", ingestion: "Do NOT induce vomiting. Medical attention." }
};

chemicalHazardDB["Lead Acetate"] = {
  cas: "6080-56-4", formula: "Pb(CH₃COO)₂",
  de: "Bleiacetat", es: "Acetato de plomo", fr: "Acétate de plomb", pt: "Acetato de chumbo",
  synonyms: ["Sugar of lead"],
  classes: ["toxic"],
  ghs: ["GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H360Df", text: "May damage the unborn child. Suspected of damaging fertility." },
    { code: "H373", text: "May cause damage to organs through prolonged exposure" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "P100 respirator" }, other: "Lead compound - cumulative toxicity" },
  storage: { cabinet: "Toxic storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids", "Strong bases"] },
  transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not specifically regulated" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash with soap.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Arsenic Trioxide"] = {
  cas: "1327-53-3", formula: "As₂O₃",
  de: "Arsentrioxid", es: "Trióxido de arsénico", fr: "Trioxyde d'arsenic", pt: "Trióxido de arsênio",
  synonyms: ["White arsenic", "Arsenious oxide"],
  classes: ["toxic"],
  ghs: ["GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H350", text: "May cause cancer" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "SCBA or P100" }, other: "HIGHLY TOXIC & CARCINOGENIC" },
  storage: { cabinet: "Locked toxic storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Acids", "Strong oxidizers"] },
  transport: { un: "1561", class: "6.1", packingGroup: "II", properShipping: "Arsenic trioxide" },
  firstAid: { inhalation: "Fresh air. Immediate medical attention.", skin: "Remove clothing. Wash thoroughly. Immediate medical attention.", eyes: "Flush 20 min.", ingestion: "Do NOT vomit. Immediate medical attention." }
};

chemicalHazardDB["Sodium Azide"] = {
  cas: "26628-22-8", formula: "NaN₃",
  de: "Natriumazid", es: "Azida de sodio", fr: "Azoture de sodium", pt: "Azida de sódio",
  synonyms: [],
  classes: ["toxic"],
  ghs: ["GHS06", "GHS09"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "N95 or better" }, other: "Forms explosive metal azides with copper/lead plumbing" },
  storage: { cabinet: "Toxic storage, away from metals", temp: "Room temperature", ventilation: "Good", incompatible: ["Acids (releases toxic HN3)", "Heavy metals", "Copper", "Lead"] },
  transport: { un: "1687", class: "6.1", packingGroup: "II", properShipping: "Sodium azide" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash thoroughly. Medical attention.", eyes: "Flush 20 min.", ingestion: "Do NOT vomit. Immediate medical attention." }
};

// Additional common industrial chemicals
chemicalHazardDB["Propylene Glycol"] = {
  cas: "57-55-6", formula: "C₃H₈O₂",
  de: "Propylenglycol", es: "Propilenglicol", fr: "Propylène glycol", pt: "Propilenoglicol",
  synonyms: ["1,2-Propanediol", "PG"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Not required" }, other: "Generally recognized as safe (GRAS)" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush with water.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Ethylene Glycol"] = {
  cas: "107-21-1", formula: "C₂H₆O₂",
  de: "Ethylenglycol", es: "Etilenglicol", fr: "Éthylène glycol", pt: "Etilenoglicol",
  synonyms: ["Antifreeze", "1,2-Ethanediol", "EG"],
  classes: ["toxic"],
  ghs: ["GHS07"],
  hazardStatements: [{ code: "H302", text: "Harmful if swallowed" }],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Not required" }, other: "Toxic if ingested - keep away from children/pets" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong acids"] },
  transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with soap.", eyes: "Flush 15 min.", ingestion: "POISON if swallowed. Seek immediate medical attention." }
};

chemicalHazardDB["Urea"] = {
  cas: "57-13-6", formula: "CH₄N₂O",
  de: "Harnstoff", es: "Urea", fr: "Urée", pt: "Ureia",
  synonyms: ["Carbamide"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses if dusty" }, skin: { required: false, type: "Not required" }, respiratory: { required: false, type: "Not required" }, other: "Non-hazardous" },
  storage: { cabinet: "General storage", temp: "Room temperature, keep dry", ventilation: "Normal", incompatible: ["Strong oxidizers", "Nitrates"] },
  transport: { un: "-", class: "-", packingGroup: "-", properShipping: "Not regulated" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush with water.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Acrylic Acid"] = {
  cas: "79-10-7", formula: "C₃H₄O₂",
  de: "Acrylsäure", es: "Ácido acrílico", fr: "Acide acrylique", pt: "Ácido acrílico",
  synonyms: ["2-Propenoic acid"],
  classes: ["acid", "corrosive", "flammable", "toxic"],
  ghs: ["GHS02", "GHS05", "GHS06"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H314", text: "Causes severe skin burns" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber gloves" }, respiratory: { required: true, type: "Organic vapor/acid gas respirator" }, other: "May polymerize violently" },
  storage: { cabinet: "Flammable/acid storage, refrigerated", temp: "Store cool with inhibitor", ventilation: "Good", incompatible: ["Oxidizers", "Bases", "Heat (polymerizes)"] },
  transport: { un: "2218", class: "8 (3)", packingGroup: "II", properShipping: "Acrylic acid, stabilized" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Flush 20 min. Medical attention.", eyes: "Flush 30 min. Immediate medical attention.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Styrene"] = {
  cas: "100-42-5", formula: "C₈H₈",
  de: "Styrol", es: "Estireno", fr: "Styrène", pt: "Estireno",
  synonyms: ["Vinyl benzene", "Phenylethylene"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H361d", text: "Suspected of damaging the unborn child" },
    { code: "H372", text: "Causes damage to organs through prolonged exposure" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Fume hood. May polymerize." },
  storage: { cabinet: "Flammable cabinet, with inhibitor", temp: "Cool, below 25°C", ventilation: "Good", incompatible: ["Oxidizers", "Peroxides", "Heat"] },
  transport: { un: "2055", class: "3", packingGroup: "III", properShipping: "Styrene monomer, stabilized" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash with soap.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Glutaraldehyde"] = {
  cas: "111-30-8", formula: "C₅H₈O₂",
  de: "Glutaraldehyd", es: "Glutaraldehído", fr: "Glutaraldéhyde", pt: "Glutaraldeído",
  synonyms: ["Glutaral"],
  classes: ["toxic", "corrosive"],
  ghs: ["GHS05", "GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H314", text: "Causes severe skin burns" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H334", text: "May cause allergy or asthma symptoms if inhaled" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Nitrile gloves, protective clothing" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Strong sensitizer" },
  storage: { cabinet: "Corrosive/toxic storage", temp: "Cool", ventilation: "Good", incompatible: ["Strong oxidizers", "Strong bases", "Amines"] },
  transport: { un: "2810", class: "6.1", packingGroup: "III", properShipping: "Toxic liquid, organic" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Flush 15 min. Remove clothing.", eyes: "Flush 30 min. Immediate medical attention.", ingestion: "Do NOT vomit. Medical attention." }
};

// Count
console.log("Total chemicals in database:", Object.keys(chemicalHazardDB).length);

// ===== ADDITIONAL CHEMICALS (Batch 3) =====

chemicalHazardDB["Sodium Hydroxide Solution"] = {
  cas: "1310-73-2", formula: "NaOH (aq)",
  de: "Natronlauge", es: "Solución de hidróxido de sodio", fr: "Solution d'hydroxyde de sodium", pt: "Solução de hidróxido de sódio",
  synonyms: ["Caustic soda solution", "Lye solution"],
  classes: ["base", "corrosive"],
  ghs: ["GHS05"],
  hazardStatements: [{ code: "H314", text: "Causes severe skin burns and eye damage" }],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Nitrile or neoprene gloves" }, respiratory: { required: false, type: "Not typically required" }, other: "" },
  storage: { cabinet: "Base cabinet", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids", "Aluminum", "Zinc"] },
  transport: { un: "1824", class: "8", packingGroup: "II", properShipping: "Sodium hydroxide solution" },
  firstAid: { inhalation: "Fresh air.", skin: "Flush 15+ min.", eyes: "Flush 30+ min. Immediate medical attention.", ingestion: "Do NOT vomit. Drink water." }
};

chemicalHazardDB["Hydrazine"] = {
  cas: "302-01-2", formula: "N₂H₄",
  de: "Hydrazin", es: "Hidrazina", fr: "Hydrazine", pt: "Hidrazina",
  synonyms: ["Diamine"],
  classes: ["flammable", "toxic", "corrosive"],
  ghs: ["GHS02", "GHS05", "GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H314", text: "Causes severe skin burns" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H350", text: "May cause cancer" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber, full suit" }, respiratory: { required: true, type: "SCBA or supplied air" }, other: "Carcinogen. Highly toxic." },
  storage: { cabinet: "Toxic/flammable storage", temp: "Cool", ventilation: "Excellent", incompatible: ["Oxidizers", "Metals", "Metal oxides"] },
  transport: { un: "2029", class: "8 (3, 6.1)", packingGroup: "I", properShipping: "Hydrazine, anhydrous" },
  firstAid: { inhalation: "Fresh air. Immediate medical attention.", skin: "Flush 20+ min. Immediate medical attention.", eyes: "Flush 30+ min.", ingestion: "Do NOT vomit. Immediate medical attention." }
};

chemicalHazardDB["Phosgene"] = {
  cas: "75-44-5", formula: "COCl₂",
  de: "Phosgen", es: "Fosgeno", fr: "Phosgène", pt: "Fosgênio",
  synonyms: ["Carbonyl chloride"],
  classes: ["toxic"],
  ghs: ["GHS04", "GHS06"],
  hazardStatements: [
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H330", text: "Fatal if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "SCBA only" }, other: "EXTREMELY TOXIC WAR GAS - highly specialized handling only" },
  storage: { cabinet: "Toxic gas storage, outdoors or gas cabinet", temp: "Cool", ventilation: "Excellent, with gas detection", incompatible: ["Water", "Moisture", "Ammonia", "Amines"] },
  transport: { un: "1076", class: "2.3 (8)", packingGroup: "-", properShipping: "Phosgene" },
  firstAid: { inhalation: "Fresh air. IMMEDIATE medical attention. Symptoms may be delayed 24-48 hrs.", skin: "Remove clothing. Wash.", eyes: "Flush 20 min.", ingestion: "N/A (gas)" }
};

chemicalHazardDB["Hydrogen Sulfide"] = {
  cas: "7783-06-4", formula: "H₂S",
  de: "Schwefelwasserstoff", es: "Sulfuro de hidrógeno", fr: "Sulfure d'hydrogène", pt: "Sulfeto de hidrogênio",
  synonyms: ["Sewer gas", "Rotten egg gas"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS04", "GHS06", "GHS09"],
  hazardStatements: [
    { code: "H220", text: "Extremely flammable gas" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Chemical suit" }, respiratory: { required: true, type: "SCBA only - olfactory fatigue occurs quickly" }, other: "H2S detector required. Paralyzes sense of smell at high conc." },
  storage: { cabinet: "Toxic gas storage, outdoors", temp: "Cool", ventilation: "Excellent", incompatible: ["Oxidizers", "Metal oxides"] },
  transport: { un: "1053", class: "2.3 (2.1)", packingGroup: "-", properShipping: "Hydrogen sulfide" },
  firstAid: { inhalation: "Fresh air. CPR if needed. Immediate medical attention.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "N/A (gas)" }
};

chemicalHazardDB["Carbon Monoxide"] = {
  cas: "630-08-0", formula: "CO",
  de: "Kohlenmonoxid", es: "Monóxido de carbono", fr: "Monoxyde de carbone", pt: "Monóxido de carbono",
  synonyms: ["Carbonic oxide"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS04", "GHS06", "GHS08"],
  hazardStatements: [
    { code: "H220", text: "Extremely flammable gas" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H360D", text: "May damage the unborn child" },
    { code: "H372", text: "Causes damage to organs through prolonged exposure" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Not required" }, respiratory: { required: true, type: "SCBA - CO has no warning odor" }, other: "CO detector required" },
  storage: { cabinet: "Gas cylinder storage", temp: "Room temperature", ventilation: "Excellent", incompatible: ["Oxidizers"] },
  transport: { un: "1016", class: "2.3 (2.1)", packingGroup: "-", properShipping: "Carbon monoxide" },
  firstAid: { inhalation: "Fresh air. 100% oxygen if available. Immediate medical attention.", skin: "N/A", eyes: "N/A", ingestion: "N/A" }
};

chemicalHazardDB["Sulfur Dioxide"] = {
  cas: "7446-09-5", formula: "SO₂",
  de: "Schwefeldioxid", es: "Dióxido de azufre", fr: "Dioxyde de soufre", pt: "Dióxido de enxofre",
  synonyms: ["Sulfurous anhydride"],
  classes: ["toxic", "corrosive"],
  ghs: ["GHS04", "GHS05", "GHS06"],
  hazardStatements: [
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H314", text: "Causes severe skin burns" },
    { code: "H331", text: "Toxic if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Chemical suit" }, respiratory: { required: true, type: "SCBA or SO2-rated respirator" }, other: "" },
  storage: { cabinet: "Toxic gas storage", temp: "Cool", ventilation: "Good", incompatible: ["Water (forms acid)", "Metals", "Oxidizers"] },
  transport: { un: "1079", class: "2.3 (8)", packingGroup: "-", properShipping: "Sulfur dioxide" },
  firstAid: { inhalation: "Fresh air. Oxygen if available. Medical attention.", skin: "Flush with water.", eyes: "Flush 20 min.", ingestion: "N/A" }
};

chemicalHazardDB["Nitrous Oxide"] = {
  cas: "10024-97-2", formula: "N₂O",
  de: "Lachgas", es: "Óxido nitroso", fr: "Protoxyde d'azote", pt: "Óxido nitroso",
  synonyms: ["Laughing gas", "Dinitrogen monoxide"],
  classes: ["oxidizer"],
  ghs: ["GHS03", "GHS04"],
  hazardStatements: [
    { code: "H270", text: "May cause or intensify fire; oxidizer" },
    { code: "H280", text: "Contains gas under pressure" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Insulated gloves for cylinders" }, respiratory: { required: false, type: "Not required in ventilated area" }, other: "Keep away from combustibles" },
  storage: { cabinet: "Oxidizer gas storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Flammables", "Grease", "Oil"] },
  transport: { un: "1070", class: "2.2 (5.1)", packingGroup: "-", properShipping: "Nitrous oxide" },
  firstAid: { inhalation: "Fresh air. Oxygen if needed.", skin: "N/A", eyes: "N/A", ingestion: "N/A" }
};

chemicalHazardDB["Acetaldehyde"] = {
  cas: "75-07-0", formula: "C₂H₄O",
  de: "Acetaldehyd", es: "Acetaldehído", fr: "Acétaldéhyde", pt: "Acetaldeído",
  synonyms: ["Ethanal"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H224", text: "Extremely flammable liquid and vapor" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H351", text: "Suspected of causing cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl rubber gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Fume hood. Forms peroxides." },
  storage: { cabinet: "Flammable cabinet, refrigerated", temp: "Cold, <4°C", ventilation: "Excellent", incompatible: ["Oxidizers", "Acids", "Bases", "Forms peroxides"] },
  transport: { un: "1089", class: "3", packingGroup: "I", properShipping: "Acetaldehyde" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash with soap.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Acrolein"] = {
  cas: "107-02-8", formula: "C₃H₄O",
  de: "Acrolein", es: "Acroleína", fr: "Acroléine", pt: "Acroleína",
  synonyms: ["2-Propenal", "Acrylic aldehyde"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS05", "GHS06", "GHS09"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H314", text: "Causes severe skin burns" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "SCBA" }, other: "EXTREMELY TOXIC - tear gas-like effect" },
  storage: { cabinet: "Toxic/flammable, refrigerated", temp: "Cold, with inhibitor", ventilation: "Excellent", incompatible: ["Oxidizers", "Acids", "Bases", "Amines"] },
  transport: { un: "1092", class: "6.1 (3)", packingGroup: "I", properShipping: "Acrolein, stabilized" },
  firstAid: { inhalation: "Fresh air. Immediate medical attention.", skin: "Flush 20+ min. Immediate medical attention.", eyes: "Flush 30+ min.", ingestion: "Do NOT vomit. Immediate medical attention." }
};

chemicalHazardDB["Maleic Anhydride"] = {
  cas: "108-31-6", formula: "C₄H₂O₃",
  de: "Maleinsäureanhydrid", es: "Anhídrido maleico", fr: "Anhydride maléique", pt: "Anidrido maleico",
  synonyms: ["2,5-Furandione"],
  classes: ["corrosive", "toxic"],
  ghs: ["GHS05", "GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H314", text: "Causes severe skin burns" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H334", text: "May cause allergy or asthma if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "P100 or organic vapor" }, other: "Sensitizer" },
  storage: { cabinet: "Corrosive storage, keep dry", temp: "Room temperature", ventilation: "Good", incompatible: ["Water (reacts)", "Bases", "Oxidizers"] },
  transport: { un: "2215", class: "8", packingGroup: "III", properShipping: "Maleic anhydride" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Flush 20 min.", eyes: "Flush 30 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Phthalic Anhydride"] = {
  cas: "85-44-9", formula: "C₈H₄O₃",
  de: "Phthalsäureanhydrid", es: "Anhídrido ftálico", fr: "Anhydride phtalique", pt: "Anidrido ftálico",
  synonyms: [],
  classes: ["corrosive"],
  ghs: ["GHS05", "GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H334", text: "May cause allergy or asthma if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "P100" }, other: "Sensitizer" },
  storage: { cabinet: "Corrosive storage, keep dry", temp: "Room temperature", ventilation: "Good", incompatible: ["Water (reacts slowly)", "Oxidizers"] },
  transport: { un: "2214", class: "8", packingGroup: "III", properShipping: "Phthalic anhydride" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with soap.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Epichlorohydrin"] = {
  cas: "106-89-8", formula: "C₃H₅ClO",
  de: "Epichlorhydrin", es: "Epiclorhidrina", fr: "Épichlorhydrine", pt: "Epicloridrina",
  synonyms: [],
  classes: ["flammable", "toxic", "corrosive"],
  ghs: ["GHS02", "GHS05", "GHS06", "GHS08"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H314", text: "Causes severe skin burns" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H350", text: "May cause cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber, full suit" }, respiratory: { required: true, type: "Organic vapor respirator or SCBA" }, other: "Carcinogen" },
  storage: { cabinet: "Flammable/toxic storage", temp: "Cool", ventilation: "Excellent", incompatible: ["Strong acids", "Strong bases", "Oxidizers", "Amines"] },
  transport: { un: "2023", class: "6.1 (3)", packingGroup: "II", properShipping: "Epichlorohydrin" },
  firstAid: { inhalation: "Fresh air. Immediate medical attention.", skin: "Remove clothing. Flush 20+ min. Immediate medical attention.", eyes: "Flush 30 min.", ingestion: "Do NOT vomit. Immediate medical attention." }
};

chemicalHazardDB["Ethylene Oxide"] = {
  cas: "75-21-8", formula: "C₂H₄O",
  de: "Ethylenoxid", es: "Óxido de etileno", fr: "Oxyde d'éthylène", pt: "Óxido de etileno",
  synonyms: ["EtO", "Oxirane"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS04", "GHS06", "GHS08"],
  hazardStatements: [
    { code: "H220", text: "Extremely flammable gas" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H340", text: "May cause genetic defects" },
    { code: "H350", text: "May cause cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "SCBA" }, other: "Carcinogen/mutagen. Explosion risk." },
  storage: { cabinet: "Flammable gas storage, isolated", temp: "Cool", ventilation: "Excellent", incompatible: ["Air", "Acids", "Bases", "Oxidizers"] },
  transport: { un: "1040", class: "2.3 (2.1)", packingGroup: "-", properShipping: "Ethylene oxide" },
  firstAid: { inhalation: "Fresh air. Oxygen. Immediate medical attention.", skin: "Remove clothing. Wash.", eyes: "Flush 20 min.", ingestion: "Seek medical attention." }
};

chemicalHazardDB["Propylene Oxide"] = {
  cas: "75-56-9", formula: "C₃H₆O",
  de: "Propylenoxid", es: "Óxido de propileno", fr: "Oxyde de propylène", pt: "Óxido de propileno",
  synonyms: ["1,2-Propylene oxide", "Methyloxirane"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H224", text: "Extremely flammable liquid and vapor" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H340", text: "May cause genetic defects" },
    { code: "H350", text: "May cause cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl rubber gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Carcinogen" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Excellent", incompatible: ["Acids", "Bases", "Oxidizers"] },
  transport: { un: "1280", class: "3", packingGroup: "I", properShipping: "Propylene oxide" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash with soap.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Vinyl Chloride"] = {
  cas: "75-01-4", formula: "C₂H₃Cl",
  de: "Vinylchlorid", es: "Cloruro de vinilo", fr: "Chlorure de vinyle", pt: "Cloreto de vinila",
  synonyms: ["Chloroethene", "VCM"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS04", "GHS08"],
  hazardStatements: [
    { code: "H220", text: "Extremely flammable gas" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H350", text: "May cause cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Chemical suit" }, respiratory: { required: true, type: "SCBA" }, other: "Known human carcinogen" },
  storage: { cabinet: "Flammable gas storage, isolated", temp: "Cool", ventilation: "Excellent", incompatible: ["Air", "Oxidizers", "Copper"] },
  transport: { un: "1086", class: "2.1", packingGroup: "-", properShipping: "Vinyl chloride, stabilized" },
  firstAid: { inhalation: "Fresh air. Oxygen. Medical attention.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "N/A" }
};

chemicalHazardDB["Acrylonitrile"] = {
  cas: "107-13-1", formula: "C₃H₃N",
  de: "Acrylnitril", es: "Acrilonitrilo", fr: "Acrylonitrile", pt: "Acrilonitrila",
  synonyms: ["Vinyl cyanide", "Cyanoethylene"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H350", text: "May cause cancer" },
    { code: "H411", text: "Toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber, full suit" }, respiratory: { required: true, type: "SCBA or organic vapor with P100" }, other: "Carcinogen. Absorbs through skin." },
  storage: { cabinet: "Flammable/toxic storage", temp: "Cool, with inhibitor", ventilation: "Excellent", incompatible: ["Oxidizers", "Acids", "Bases", "Heat"] },
  transport: { un: "1093", class: "3 (6.1)", packingGroup: "I", properShipping: "Acrylonitrile, stabilized" },
  firstAid: { inhalation: "Fresh air. Oxygen. Cyanide antidote may be needed. Immediate medical attention.", skin: "Remove clothing. Wash thoroughly. Immediate medical attention.", eyes: "Flush 20 min.", ingestion: "Do NOT vomit. Immediate medical attention." }
};

chemicalHazardDB["Aniline"] = {
  cas: "62-53-3", formula: "C₆H₇N",
  de: "Anilin", es: "Anilina", fr: "Aniline", pt: "Anilina",
  synonyms: ["Aminobenzene", "Phenylamine"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H341", text: "Suspected of causing genetic defects" },
    { code: "H351", text: "Suspected of causing cancer" },
    { code: "H372", text: "Causes damage to organs through prolonged exposure" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl rubber, protective clothing" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Absorbs through skin. Causes methemoglobinemia." },
  storage: { cabinet: "Toxic storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Strong acids", "Oxidizers"] },
  transport: { un: "1547", class: "6.1", packingGroup: "II", properShipping: "Aniline" },
  firstAid: { inhalation: "Fresh air. Oxygen. Immediate medical attention.", skin: "Remove clothing. Wash thoroughly with soap. Immediate medical attention.", eyes: "Flush 20 min. Medical attention.", ingestion: "Do NOT vomit. Immediate medical attention." }
};

chemicalHazardDB["Picric Acid"] = {
  cas: "88-89-1", formula: "C₆H₃N₃O₇",
  de: "Pikrinsäure", es: "Ácido pícrico", fr: "Acide picrique", pt: "Ácido pícrico",
  synonyms: ["2,4,6-Trinitrophenol", "TNP"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS01", "GHS06"],
  hazardStatements: [
    { code: "H201", text: "Explosive; mass explosion hazard" },
    { code: "H301", text: "Toxic if swallowed" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "EXPLOSIVE WHEN DRY - keep wetted with 30% water" },
  storage: { cabinet: "Explosive storage, wetted", temp: "Cool", ventilation: "Good", incompatible: ["Metals (forms explosive salts)", "Heat", "Shock", "Friction"] },
  transport: { un: "1344", class: "4.1", packingGroup: "I", properShipping: "Picric acid, wetted" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

// === BATCH 3: More Industrial Chemicals (50 more) ===

chemicalHazardDB["Propylene Glycol"] = {
  cas: "57-55-6", formula: "C₃H₈O₂",
  de: "Propylenglykol", es: "Propilenglicol", fr: "Propylène glycol", pt: "Propilenoglicol",
  synonyms: ["1,2-Propanediol", "PG", "MPG"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional gloves" }, respiratory: { required: false, type: "None" }, other: "Generally regarded as safe (GRAS)" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Propylene glycol" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush with water.", ingestion: "Rinse mouth. Drink water." }
};

chemicalHazardDB["Glycerol"] = {
  cas: "56-81-5", formula: "C₃H₈O₃",
  de: "Glycerin", es: "Glicerol", fr: "Glycérol", pt: "Glicerol",
  synonyms: ["Glycerin", "Glycerine", "1,2,3-Propanetriol"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "None" }, other: "Food grade available" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Glycerol" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Drink water." }
};

chemicalHazardDB["Dimethyl Sulfoxide"] = {
  cas: "67-68-5", formula: "C₂H₆OS",
  de: "Dimethylsulfoxid", es: "Dimetilsulfóxido", fr: "Diméthylsulfoxyde", pt: "Dimetilsulfóxido",
  synonyms: ["DMSO"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "None" }, other: "Rapidly penetrates skin carrying dissolved substances" },
  storage: { cabinet: "Flammable liquids", temp: "Room temperature", ventilation: "Good", incompatible: ["Strong oxidizers", "Acids"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Dimethyl sulfoxide" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash thoroughly - can carry contaminants through skin.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Tetrahydrofuran"] = {
  cas: "109-99-9", formula: "C₄H₈O",
  de: "Tetrahydrofuran", es: "Tetrahidrofurano", fr: "Tétrahydrofurane", pt: "Tetra-hidrofurano",
  synonyms: ["THF", "Oxolane"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapour" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Forms explosive peroxides - check before distilling" },
  storage: { cabinet: "Flammable liquids", temp: "Cool, dark", ventilation: "Good", incompatible: ["Oxidizers", "Peroxide formation on standing"] },
  transport: { un: "2056", class: "3", packingGroup: "II", properShipping: "Tetrahydrofuran" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Cyclohexane"] = {
  cas: "110-82-7", formula: "C₆H₁₂",
  de: "Cyclohexan", es: "Ciclohexano", fr: "Cyclohexane", pt: "Ciclo-hexano",
  synonyms: ["Hexamethylene", "Hexanaphthene"],
  classes: ["flammable", "irritant", "environmental"],
  ghs: ["GHS02", "GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapour" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Extremely flammable" },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Excellent", incompatible: ["Oxidizers"] },
  transport: { un: "1145", class: "3", packingGroup: "II", properShipping: "Cyclohexane" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Hexane"] = {
  cas: "110-54-3", formula: "C₆H₁₄",
  de: "Hexan", es: "Hexano", fr: "Hexane", pt: "Hexano",
  synonyms: ["n-Hexane"],
  classes: ["flammable", "irritant", "health"],
  ghs: ["GHS02", "GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapour" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" },
    { code: "H361f", text: "Suspected of damaging fertility" },
    { code: "H373", text: "May cause damage to organs through prolonged exposure" },
    { code: "H411", text: "Toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Neurotoxic with chronic exposure" },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Excellent", incompatible: ["Oxidizers"] },
  transport: { un: "1208", class: "3", packingGroup: "II", properShipping: "Hexanes" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Heptane"] = {
  cas: "142-82-5", formula: "C₇H₁₆",
  de: "Heptan", es: "Heptano", fr: "Heptane", pt: "Heptano",
  synonyms: ["n-Heptane"],
  classes: ["flammable", "irritant", "environmental"],
  ghs: ["GHS02", "GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapour" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "" },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Excellent", incompatible: ["Oxidizers"] },
  transport: { un: "1206", class: "3", packingGroup: "II", properShipping: "Heptanes" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Diethyl Ether"] = {
  cas: "60-29-7", formula: "C₄H₁₀O",
  de: "Diethylether", es: "Éter dietílico", fr: "Éther diéthylique", pt: "Éter dietílico",
  synonyms: ["Ether", "Ethyl ether", "Ethoxyethane"],
  classes: ["flammable"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H224", text: "Extremely flammable liquid and vapour" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H336", text: "May cause drowsiness or dizziness" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "EXTREMELY FLAMMABLE - forms explosive peroxides" },
  storage: { cabinet: "Flammable liquids", temp: "Cool, dark", ventilation: "Excellent", incompatible: ["Oxidizers", "Heat", "Sparks", "Peroxide buildup"] },
  transport: { un: "1155", class: "3", packingGroup: "I", properShipping: "Diethyl ether" },
  firstAid: { inhalation: "Fresh air. Anesthetic effect.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Chloroform"] = {
  cas: "67-66-3", formula: "CHCl₃",
  de: "Chloroform", es: "Cloroformo", fr: "Chloroforme", pt: "Clorofórmio",
  synonyms: ["Trichloromethane", "Methyl trichloride"],
  classes: ["health", "irritant"],
  ghs: ["GHS06", "GHS08"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H351", text: "Suspected of causing cancer" },
    { code: "H361d", text: "Suspected of damaging the unborn child" },
    { code: "H372", text: "Causes damage to organs through prolonged exposure" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl rubber gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Carcinogen - minimize exposure" },
  storage: { cabinet: "Toxic/Carcinogen storage", temp: "Cool, dark", ventilation: "Good", incompatible: ["Strong bases", "Oxidizers", "Light"] },
  transport: { un: "1888", class: "6.1", packingGroup: "III", properShipping: "Chloroform" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash thoroughly.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Carbon Tetrachloride"] = {
  cas: "56-23-5", formula: "CCl₄",
  de: "Tetrachlorkohlenstoff", es: "Tetracloruro de carbono", fr: "Tétrachlorure de carbone", pt: "Tetracloreto de carbono",
  synonyms: ["Tetrachloromethane", "CTC"],
  classes: ["health", "environmental"],
  ghs: ["GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H351", text: "Suspected of causing cancer" },
    { code: "H372", text: "Causes damage to organs (liver, kidneys)" },
    { code: "H420", text: "Harms public health and the environment by destroying ozone" },
    { code: "H411", text: "Toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl rubber" }, respiratory: { required: true, type: "Supplied air" }, other: "Ozone depleter - restricted use. Liver toxin." },
  storage: { cabinet: "Toxic storage", temp: "Cool", ventilation: "Excellent", incompatible: ["Metals", "Flame"] },
  transport: { un: "1846", class: "6.1", packingGroup: "II", properShipping: "Carbon tetrachloride" },
  firstAid: { inhalation: "Fresh air. Oxygen. Medical attention.", skin: "Remove clothing. Wash.", eyes: "Flush 20 min.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Bromine"] = {
  cas: "7726-95-6", formula: "Br₂",
  de: "Brom", es: "Bromo", fr: "Brome", pt: "Bromo",
  synonyms: ["Dibromine"],
  classes: ["oxidizer", "toxic", "corrosive"],
  ghs: ["GHS03", "GHS05", "GHS06", "GHS09"],
  hazardStatements: [
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber, full coverage" }, respiratory: { required: true, type: "Supplied air or SCBA" }, other: "EXTREMELY CORROSIVE. Heavy vapor sinks." },
  storage: { cabinet: "Corrosive storage, separate", temp: "Cool", ventilation: "Excellent", incompatible: ["Metals", "Organics", "Ammonia", "Reducing agents"] },
  transport: { un: "1744", class: "8", packingGroup: "I", properShipping: "Bromine" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Flush with water 20 min. Medical attention.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Iodine"] = {
  cas: "7553-56-2", formula: "I₂",
  de: "Iod", es: "Yodo", fr: "Iode", pt: "Iodo",
  synonyms: ["Diiodine"],
  classes: ["irritant", "environmental"],
  ghs: ["GHS07", "GHS09"],
  hazardStatements: [
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Respirator for vapors" }, other: "Stains skin brown" },
  storage: { cabinet: "General chemical storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Ammonia", "Metals", "Reducing agents"] },
  transport: { un: "3495", class: "8", packingGroup: "III", properShipping: "Iodine" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Drink water." }
};

chemicalHazardDB["Potassium Iodide"] = {
  cas: "7681-11-0", formula: "KI",
  de: "Kaliumiodid", es: "Yoduro de potasio", fr: "Iodure de potassium", pt: "Iodeto de potássio",
  synonyms: ["KI"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "None" }, other: "Radiation protection medication" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Potassium iodide" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Potassium Permanganate"] = {
  cas: "7722-64-7", formula: "KMnO₄",
  de: "Kaliumpermanganat", es: "Permanganato de potasio", fr: "Permanganate de potassium", pt: "Permanganato de potássio",
  synonyms: ["Condy's crystals", "Chameleon mineral"],
  classes: ["oxidizer", "corrosive", "environmental"],
  ghs: ["GHS03", "GHS05", "GHS07", "GHS09"],
  hazardStatements: [
    { code: "H272", text: "May intensify fire; oxidizer" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Stains skin brown" },
  storage: { cabinet: "Oxidizer storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Reducing agents", "Organics", "Acids"] },
  transport: { un: "1490", class: "5.1", packingGroup: "II", properShipping: "Potassium permanganate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water. May stain.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Do NOT vomit." }
};

chemicalHazardDB["Boric Acid"] = {
  cas: "10043-35-3", formula: "H₃BO₃",
  de: "Borsäure", es: "Ácido bórico", fr: "Acide borique", pt: "Ácido bórico",
  synonyms: ["Boracic acid", "Orthoboric acid"],
  classes: ["health"],
  ghs: ["GHS08"],
  hazardStatements: [
    { code: "H360FD", text: "May damage fertility. May damage the unborn child." }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Reproductive toxin" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong reducing agents"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Boric acid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth. Medical attention if large amount." }
};

chemicalHazardDB["Sodium Bicarbonate"] = {
  cas: "144-55-8", formula: "NaHCO₃",
  de: "Natriumhydrogencarbonat", es: "Bicarbonato de sodio", fr: "Bicarbonate de sodium", pt: "Bicarbonato de sódio",
  synonyms: ["Baking soda", "Sodium hydrogen carbonate"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask for powder" }, other: "Food grade available" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids (evolves CO2)"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Sodium bicarbonate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Drink water." }
};

chemicalHazardDB["Sodium Carbonate"] = {
  cas: "497-19-8", formula: "Na₂CO₃",
  de: "Natriumcarbonat", es: "Carbonato de sodio", fr: "Carbonate de sodium", pt: "Carbonato de sódio",
  synonyms: ["Soda ash", "Washing soda"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Alkaline - pH ~11.5" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Sodium carbonate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Drink water." }
};

chemicalHazardDB["Calcium Carbonate"] = {
  cas: "471-34-1", formula: "CaCO₃",
  de: "Calciumcarbonat", es: "Carbonato de calcio", fr: "Carbonate de calcium", pt: "Carbonato de cálcio",
  synonyms: ["Limestone", "Chalk", "Calcite"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Generally safe" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids (evolves CO2)"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Calcium carbonate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Magnesium Sulfate"] = {
  cas: "7487-88-9", formula: "MgSO₄",
  de: "Magnesiumsulfat", es: "Sulfato de magnesio", fr: "Sulfate de magnésium", pt: "Sulfato de magnésio",
  synonyms: ["Epsom salt", "Bitter salt"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Generally safe - bath salts" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: [] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Magnesium sulfate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Drink water. Laxative effect." }
};

chemicalHazardDB["Zinc Sulfate"] = {
  cas: "7733-02-0", formula: "ZnSO₄",
  de: "Zinksulfat", es: "Sulfato de zinc", fr: "Sulfate de zinc", pt: "Sulfato de zinco",
  synonyms: ["White vitriol", "Zinc vitriol"],
  classes: ["irritant", "environmental"],
  ghs: ["GHS07", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Zinc sulfate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Copper Sulfate"] = {
  cas: "7758-99-8", formula: "CuSO₄·5H₂O",
  de: "Kupfersulfat", es: "Sulfato de cobre", fr: "Sulfate de cuivre", pt: "Sulfato de cobre",
  synonyms: ["Blue vitriol", "Bluestone", "Copper(II) sulfate pentahydrate"],
  classes: ["irritant", "environmental"],
  ghs: ["GHS07", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Fungicide, algicide" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Metals", "Hydroxylamine"] },
  transport: { un: "3077", class: "9", packingGroup: "III", properShipping: "Environmentally hazardous substance" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with soap.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Ferrous Sulfate"] = {
  cas: "7720-78-7", formula: "FeSO₄",
  de: "Eisen(II)-sulfat", es: "Sulfato ferroso", fr: "Sulfate ferreux", pt: "Sulfato ferroso",
  synonyms: ["Iron(II) sulfate", "Green vitriol", "Copperas"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Iron supplement, moss killer" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Ferrous sulfate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Sodium Thiosulfate"] = {
  cas: "7772-98-7", formula: "Na₂S₂O₃",
  de: "Natriumthiosulfat", es: "Tiosulfato de sodio", fr: "Thiosulfate de sodium", pt: "Tiossulfato de sódio",
  synonyms: ["Hypo", "Sodium hyposulfite"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Photography fixer, dechlorinator" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids (releases SO2)", "Oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Sodium thiosulfate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Sodium Metabisulfite"] = {
  cas: "7681-57-4", formula: "Na₂S₂O₅",
  de: "Natriumdisulfit", es: "Metabisulfito de sodio", fr: "Métabisulfite de sodium", pt: "Metabissulfito de sódio",
  synonyms: ["Sodium pyrosulfite", "Disodium disulfite"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H318", text: "Causes serious eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "Respirator" }, other: "Releases SO2 with acids. Food preservative." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Acids", "Oxidizers", "Moisture"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Sodium metabisulfite" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash.", eyes: "Flush 15 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Citric Acid Anhydrous"] = {
  cas: "77-92-9", formula: "C₆H₈O₇",
  de: "Citronensäure wasserfrei", es: "Ácido cítrico anhidro", fr: "Acide citrique anhydre", pt: "Ácido cítrico anidro",
  synonyms: ["2-Hydroxypropane-1,2,3-tricarboxylic acid"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Food grade available" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Metals"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Citric acid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Lactic Acid"] = {
  cas: "50-21-5", formula: "C₃H₆O₃",
  de: "Milchsäure", es: "Ácido láctico", fr: "Acide lactique", pt: "Ácido láctico",
  synonyms: ["2-Hydroxypropanoic acid"],
  classes: ["corrosive"],
  ghs: ["GHS05"],
  hazardStatements: [
    { code: "H314", text: "Causes severe skin burns and eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "None" }, other: "Concentrated form is corrosive" },
  storage: { cabinet: "Acid storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Strong oxidizers", "Bases"] },
  transport: { un: "Not regulated below 80%", class: "8", packingGroup: "III", properShipping: "Lactic acid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with water.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Drink water." }
};

chemicalHazardDB["Acetic Anhydride"] = {
  cas: "108-24-7", formula: "(CH₃CO)₂O",
  de: "Essigsäureanhydrid", es: "Anhídrido acético", fr: "Anhydride acétique", pt: "Anidrido acético",
  synonyms: ["Ethanoic anhydride"],
  classes: ["flammable", "corrosive"],
  ghs: ["GHS02", "GHS05"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapour" },
    { code: "H314", text: "Causes severe skin burns and eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Reacts violently with water" },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Good", incompatible: ["Water", "Alcohols", "Amines", "Strong oxidizers"] },
  transport: { un: "1715", class: "8", packingGroup: "II", properShipping: "Acetic anhydride" },
  firstAid: { inhalation: "Fresh air.", skin: "Flush with water 20 min. Do NOT use neutralizers.", eyes: "Flush 20 min.", ingestion: "Rinse mouth. Do NOT vomit." }
};

chemicalHazardDB["Benzoyl Peroxide"] = {
  cas: "94-36-0", formula: "(C₆H₅CO)₂O₂",
  de: "Benzoylperoxid", es: "Peróxido de benzoílo", fr: "Peroxyde de benzoyle", pt: "Peróxido de benzoíla",
  synonyms: ["BPO", "Dibenzoyl peroxide"],
  classes: ["oxidizer", "flammable", "irritant"],
  ghs: ["GHS01", "GHS02", "GHS07"],
  hazardStatements: [
    { code: "H242", text: "Heating may cause a fire" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Keep wet. Explosive when dry. Acne medication." },
  storage: { cabinet: "Organic peroxide storage", temp: "Cool", ventilation: "Good", incompatible: ["Heat", "Reducing agents", "Organics"] },
  transport: { un: "3102", class: "5.2", packingGroup: "N/A", properShipping: "Organic peroxide type B, solid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Cumene Hydroperoxide"] = {
  cas: "80-15-9", formula: "C₉H₁₂O₂",
  de: "Cumolhydroperoxid", es: "Hidroperóxido de cumeno", fr: "Hydroperoxyde de cumène", pt: "Hidroperóxido de cumeno",
  synonyms: ["CHP", "Cumyl hydroperoxide"],
  classes: ["oxidizer", "flammable", "corrosive", "health"],
  ghs: ["GHS02", "GHS05", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H242", text: "Heating may cause a fire" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H341", text: "Suspected of causing genetic defects" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Organic peroxide - fire/explosion hazard" },
  storage: { cabinet: "Organic peroxide storage", temp: "Cool", ventilation: "Good", incompatible: ["Heat", "Reducing agents", "Metals"] },
  transport: { un: "3107", class: "5.2", packingGroup: "N/A", properShipping: "Organic peroxide type E, liquid" },
  firstAid: { inhalation: "Fresh air.", skin: "Flush 20 min.", eyes: "Flush 20 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Styrene"] = {
  cas: "100-42-5", formula: "C₈H₈",
  de: "Styrol", es: "Estireno", fr: "Styrène", pt: "Estireno",
  synonyms: ["Vinylbenzene", "Ethenylbenzene", "Phenylethylene"],
  classes: ["flammable", "health", "irritant"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapour" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H361d", text: "Suspected of damaging the unborn child" },
    { code: "H372", text: "Causes damage to organs through prolonged exposure" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Polymerizes - inhibitor required" },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers", "Peroxides", "Heat"] },
  transport: { un: "2055", class: "3", packingGroup: "III", properShipping: "Styrene monomer, stabilized" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with soap.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Vinyl Acetate"] = {
  cas: "108-05-4", formula: "C₄H₆O₂",
  de: "Vinylacetat", es: "Acetato de vinilo", fr: "Acétate de vinyle", pt: "Acetato de vinila",
  synonyms: ["VAM", "Ethenyl acetate"],
  classes: ["flammable", "health"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapour" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H351", text: "Suspected of causing cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl rubber" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Polymerizes - inhibitor required" },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Excellent", incompatible: ["Oxidizers", "Peroxides", "Acids", "Bases"] },
  transport: { un: "1301", class: "3", packingGroup: "II", properShipping: "Vinyl acetate, stabilized" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Acrylonitrile"] = {
  cas: "107-13-1", formula: "C₃H₃N",
  de: "Acrylnitril", es: "Acrilonitrilo", fr: "Acrylonitrile", pt: "Acrilonitrila",
  synonyms: ["VCN", "Vinyl cyanide", "Propenenitrile"],
  classes: ["flammable", "toxic", "health"],
  ghs: ["GHS02", "GHS06", "GHS08"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapour" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H350", text: "May cause cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber, full coverage" }, respiratory: { required: true, type: "Supplied air" }, other: "CARCINOGEN. Releases HCN on burning." },
  storage: { cabinet: "Flammable/Toxic storage", temp: "Cool", ventilation: "Excellent", incompatible: ["Oxidizers", "Acids", "Bases", "Amines"] },
  transport: { un: "1093", class: "3", packingGroup: "I", properShipping: "Acrylonitrile, stabilized" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Remove clothing. Wash. Medical attention.", eyes: "Flush 20 min.", ingestion: "Do NOT vomit. IMMEDIATE medical attention." }
};

chemicalHazardDB["Epichlorohydrin"] = {
  cas: "106-89-8", formula: "C₃H₅ClO",
  de: "Epichlorhydrin", es: "Epiclorhidrina", fr: "Épichlorhydrine", pt: "Epicloridrina",
  synonyms: ["ECH", "Chloropropylene oxide"],
  classes: ["flammable", "toxic", "health"],
  ghs: ["GHS02", "GHS05", "GHS06", "GHS08"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapour" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H350", text: "May cause cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber, full coverage" }, respiratory: { required: true, type: "Supplied air" }, other: "CARCINOGEN. Epoxy resin precursor." },
  storage: { cabinet: "Flammable/Toxic storage", temp: "Cool", ventilation: "Excellent", incompatible: ["Water", "Acids", "Bases", "Oxidizers"] },
  transport: { un: "2023", class: "6.1", packingGroup: "II", properShipping: "Epichlorohydrin" },
  firstAid: { inhalation: "Fresh air. Oxygen. Medical attention.", skin: "Remove clothing. Flush 20 min. Medical attention.", eyes: "Flush 20 min. Medical attention.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Propylene Oxide"] = {
  cas: "75-56-9", formula: "C₃H₆O",
  de: "Propylenoxid", es: "Óxido de propileno", fr: "Oxyde de propylène", pt: "Óxido de propileno",
  synonyms: ["PO", "1,2-Propylene oxide", "Methyloxirane"],
  classes: ["flammable", "health"],
  ghs: ["GHS02", "GHS06", "GHS08"],
  hazardStatements: [
    { code: "H224", text: "Extremely flammable liquid and vapour" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H340", text: "May cause genetic defects" },
    { code: "H350", text: "May cause cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl rubber" }, respiratory: { required: true, type: "Supplied air" }, other: "CARCINOGEN. Used in polyurethane production." },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Excellent", incompatible: ["Acids", "Bases", "Oxidizers"] },
  transport: { un: "1280", class: "3", packingGroup: "I", properShipping: "Propylene oxide" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Ethylene Oxide"] = {
  cas: "75-21-8", formula: "C₂H₄O",
  de: "Ethylenoxid", es: "Óxido de etileno", fr: "Oxyde d'éthylène", pt: "Óxido de etileno",
  synonyms: ["EO", "EtO", "Oxirane"],
  classes: ["flammable", "toxic", "health"],
  ghs: ["GHS02", "GHS04", "GHS06", "GHS08"],
  hazardStatements: [
    { code: "H220", text: "Extremely flammable gas" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H340", text: "May cause genetic defects" },
    { code: "H350", text: "May cause cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl rubber" }, respiratory: { required: true, type: "SCBA" }, other: "CARCINOGEN. Sterilization gas. Explosive range 3-100%." },
  storage: { cabinet: "Flammable gas cylinder storage", temp: "Cool", ventilation: "Excellent", incompatible: ["Acids", "Bases", "Oxidizers", "Copper"] },
  transport: { un: "1040", class: "2.3", packingGroup: "N/A", properShipping: "Ethylene oxide" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Wash thoroughly.", eyes: "Flush 20 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Glutaraldehyde"] = {
  cas: "111-30-8", formula: "C₅H₈O₂",
  de: "Glutaraldehyd", es: "Glutaraldehído", fr: "Glutaraldéhyde", pt: "Glutaraldeído",
  synonyms: ["Glutaral", "1,5-Pentanedial"],
  classes: ["toxic", "corrosive", "environmental"],
  ghs: ["GHS05", "GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H334", text: "May cause allergy or asthma symptoms" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber" }, respiratory: { required: true, type: "Full face respirator" }, other: "Severe sensitizer. Hospital disinfectant." },
  storage: { cabinet: "Toxic/Corrosive storage", temp: "Cool", ventilation: "Good", incompatible: ["Strong acids", "Bases", "Amines"] },
  transport: { un: "2810", class: "6.1", packingGroup: "III", properShipping: "Toxic liquid, organic" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Flush 20 min. Medical attention.", eyes: "Flush 20 min. IMMEDIATE medical attention.", ingestion: "Rinse mouth. Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Ethylene Glycol Monobutyl Ether"] = {
  cas: "111-76-2", formula: "C₆H₁₄O₂",
  de: "Ethylenglykolmonobutylether", es: "Éter monobutílico de etilenglicol", fr: "Éther monobutylique de l'éthylène glycol", pt: "Éter monobutílico de etilenoglicol",
  synonyms: ["2-Butoxyethanol", "Butyl cellosolve", "EGBE"],
  classes: ["irritant", "health"],
  ghs: ["GHS07", "GHS08"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Common in cleaners. Absorbs through skin." },
  storage: { cabinet: "Flammable liquids", temp: "Room temperature", ventilation: "Good", incompatible: ["Strong oxidizers", "Strong bases"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "2-Butoxyethanol" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with soap.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["D-Limonene"] = {
  cas: "5989-27-5", formula: "C₁₀H₁₆",
  de: "D-Limonen", es: "D-Limoneno", fr: "D-Limonène", pt: "D-Limoneno",
  synonyms: ["Limonene", "Orange terpene", "Citrus terpene"],
  classes: ["flammable", "irritant", "environmental"],
  ghs: ["GHS02", "GHS07", "GHS09"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapour" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Organic vapor mask for mist" }, other: "Natural solvent from citrus. Skin sensitizer." },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers"] },
  transport: { un: "2052", class: "3", packingGroup: "III", properShipping: "Dipentene" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with soap.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Turpentine"] = {
  cas: "8006-64-2", formula: "C₁₀H₁₆ (mixture)",
  de: "Terpentinöl", es: "Trementina", fr: "Térébenthine", pt: "Terebintina",
  synonyms: ["Turpentine oil", "Spirit of turpentine", "Wood turpentine"],
  classes: ["flammable", "irritant", "environmental"],
  ghs: ["GHS02", "GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapour" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H411", text: "Toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Paint thinner. Skin sensitizer." },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers"] },
  transport: { un: "1299", class: "3", packingGroup: "III", properShipping: "Turpentine" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with soap.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["White Spirit"] = {
  cas: "64742-82-1", formula: "C₇-C₁₂ (mixture)",
  de: "Testbenzin", es: "White spirit", fr: "White-spirit", pt: "Aguarrás mineral",
  synonyms: ["Mineral spirits", "Stoddard solvent", "Mineral turpentine"],
  classes: ["flammable", "irritant", "environmental"],
  ghs: ["GHS02", "GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapour" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H336", text: "May cause drowsiness or dizziness" },
    { code: "H411", text: "Toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Paint thinner, degreaser" },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers"] },
  transport: { un: "1300", class: "3", packingGroup: "III", properShipping: "Turpentine substitute" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Naphtha"] = {
  cas: "8030-30-6", formula: "C₅-C₁₂ (mixture)",
  de: "Naphtha", es: "Nafta", fr: "Naphta", pt: "Nafta",
  synonyms: ["Petroleum naphtha", "VM&P naphtha", "Petroleum ether"],
  classes: ["flammable", "irritant", "health", "environmental"],
  ghs: ["GHS02", "GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapour" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" },
    { code: "H411", text: "Toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Petrochemical solvent" },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Excellent", incompatible: ["Oxidizers"] },
  transport: { un: "1256", class: "3", packingGroup: "II", properShipping: "Naphtha" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Kerosene"] = {
  cas: "8008-20-6", formula: "C₉-C₁₆ (mixture)",
  de: "Kerosin", es: "Queroseno", fr: "Kérosène", pt: "Querosene",
  synonyms: ["Paraffin oil", "Lamp oil", "Jet fuel"],
  classes: ["flammable", "irritant", "health"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapour" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "In confined spaces" }, other: "Fuel, solvent" },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers"] },
  transport: { un: "1223", class: "3", packingGroup: "III", properShipping: "Kerosene" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Diesel Fuel"] = {
  cas: "68476-34-6", formula: "C₁₀-C₂₅ (mixture)",
  de: "Dieselkraftstoff", es: "Combustible diésel", fr: "Gazole", pt: "Combustível diesel",
  synonyms: ["Diesel oil", "Gas oil", "DERV"],
  classes: ["flammable", "irritant", "health", "environmental"],
  ghs: ["GHS02", "GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapour" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H351", text: "Suspected of causing cancer" },
    { code: "H411", text: "Toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "In confined spaces" }, other: "Motor fuel" },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers"] },
  transport: { un: "1202", class: "3", packingGroup: "III", properShipping: "Diesel fuel" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with soap.", eyes: "Flush.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Gasoline"] = {
  cas: "8006-61-9", formula: "C₄-C₁₂ (mixture)",
  de: "Benzin", es: "Gasolina", fr: "Essence", pt: "Gasolina",
  synonyms: ["Petrol", "Motor gasoline", "Mogas"],
  classes: ["flammable", "health", "environmental"],
  ghs: ["GHS02", "GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H224", text: "Extremely flammable liquid and vapour" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" },
    { code: "H340", text: "May cause genetic defects" },
    { code: "H350", text: "May cause cancer" },
    { code: "H411", text: "Toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "EXTREMELY FLAMMABLE. Contains benzene - carcinogen." },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Excellent", incompatible: ["Oxidizers", "Sparks", "Heat"] },
  transport: { un: "1203", class: "3", packingGroup: "II", properShipping: "Gasoline" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with soap.", eyes: "Flush.", ingestion: "Do NOT vomit. IMMEDIATE medical attention." }
};

// === BATCH 4: Expanding to 300+ ===

chemicalHazardDB["Butanol"] = {
  cas: "71-36-3", formula: "C₄H₁₀O",
  de: "Butanol", es: "Butanol", fr: "Butanol", pt: "Butanol",
  synonyms: ["n-Butanol", "1-Butanol", "Butyl alcohol"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS05", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapour" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "" },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers", "Strong acids"] },
  transport: { un: "1120", class: "3", packingGroup: "III", properShipping: "Butanols" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min. Medical attention.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Isobutanol"] = {
  cas: "78-83-1", formula: "C₄H₁₀O",
  de: "Isobutanol", es: "Isobutanol", fr: "Isobutanol", pt: "Isobutanol",
  synonyms: ["2-Methyl-1-propanol", "Isobutyl alcohol"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS05", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapour" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "" },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers"] },
  transport: { un: "1212", class: "3", packingGroup: "III", properShipping: "Isobutanol" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min. Medical attention.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Pentanol"] = {
  cas: "71-41-0", formula: "C₅H₁₂O",
  de: "Pentanol", es: "Pentanol", fr: "Pentanol", pt: "Pentanol",
  synonyms: ["1-Pentanol", "n-Amyl alcohol", "Pentan-1-ol"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapour" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Organic vapor" }, other: "" },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers"] },
  transport: { un: "1105", class: "3", packingGroup: "III", properShipping: "Pentanols" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Benzyl Alcohol"] = {
  cas: "100-51-6", formula: "C₇H₈O",
  de: "Benzylalkohol", es: "Alcohol bencílico", fr: "Alcool benzylique", pt: "Álcool benzílico",
  synonyms: ["Phenylmethanol", "Benzenemethanol"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "None" }, other: "Preservative in pharmaceuticals" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Benzyl alcohol" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Furfural"] = {
  cas: "98-01-1", formula: "C₅H₄O₂",
  de: "Furfural", es: "Furfural", fr: "Furfural", pt: "Furfural",
  synonyms: ["2-Furaldehyde", "Fural"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS06", "GHS08"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapour" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H351", text: "Suspected of causing cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl rubber" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "From agricultural waste" },
  storage: { cabinet: "Flammable/Toxic", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers", "Acids", "Bases"] },
  transport: { un: "1199", class: "6.1", packingGroup: "II", properShipping: "Furfural" },
  firstAid: { inhalation: "Fresh air. Oxygen. Medical attention.", skin: "Wash thoroughly.", eyes: "Flush 15 min.", ingestion: "Medical attention." }
};

chemicalHazardDB["Morpholine"] = {
  cas: "110-91-8", formula: "C₄H₉NO",
  de: "Morpholin", es: "Morfolina", fr: "Morpholine", pt: "Morfolina",
  synonyms: ["Tetrahydro-1,4-oxazine", "Diethylene oximide"],
  classes: ["flammable", "corrosive"],
  ghs: ["GHS02", "GHS05", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapour" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Corrosion inhibitor" },
  storage: { cabinet: "Flammable/Corrosive", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers", "Acids"] },
  transport: { un: "2054", class: "8", packingGroup: "I", properShipping: "Morpholine" },
  firstAid: { inhalation: "Fresh air.", skin: "Flush 15 min.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Pyridine"] = {
  cas: "110-86-1", formula: "C₅H₅N",
  de: "Pyridin", es: "Piridina", fr: "Pyridine", pt: "Piridina",
  synonyms: ["Azabenzene", "Azine"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapour" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Strong unpleasant odor" },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers", "Strong acids"] },
  transport: { un: "1282", class: "3", packingGroup: "II", properShipping: "Pyridine" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Piperidine"] = {
  cas: "110-89-4", formula: "C₅H₁₁N",
  de: "Piperidin", es: "Piperidina", fr: "Pipéridine", pt: "Piperidina",
  synonyms: ["Hexahydropyridine", "Azacyclohexane"],
  classes: ["flammable", "toxic", "corrosive"],
  ghs: ["GHS02", "GHS05", "GHS06"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapour" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H331", text: "Toxic if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "DEA List I chemical" },
  storage: { cabinet: "Flammable/Corrosive", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers", "Acids"] },
  transport: { un: "2401", class: "3", packingGroup: "I", properShipping: "Piperidine" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Flush 15 min.", eyes: "Flush 15 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Triethylamine"] = {
  cas: "121-44-8", formula: "C₆H₁₅N",
  de: "Triethylamin", es: "Trietilamina", fr: "Triéthylamine", pt: "Trietilamina",
  synonyms: ["TEA", "N,N-Diethylethanamine"],
  classes: ["flammable", "corrosive"],
  ghs: ["GHS02", "GHS05", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapour" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber" }, respiratory: { required: true, type: "Organic vapor/amine respirator" }, other: "Strong fishy odor" },
  storage: { cabinet: "Flammable/Corrosive", temp: "Cool", ventilation: "Excellent", incompatible: ["Oxidizers", "Acids"] },
  transport: { un: "1296", class: "3", packingGroup: "II", properShipping: "Triethylamine" },
  firstAid: { inhalation: "Fresh air.", skin: "Flush 15 min.", eyes: "Flush 15 min. Medical attention.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Diisopropylamine"] = {
  cas: "108-18-9", formula: "C₆H₁₅N",
  de: "Diisopropylamin", es: "Diisopropilamina", fr: "Diisopropylamine", pt: "Diisopropilamina",
  synonyms: ["DIPA", "N-Isopropyl-2-propanamine"],
  classes: ["flammable", "corrosive"],
  ghs: ["GHS02", "GHS05", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapour" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "" },
  storage: { cabinet: "Flammable/Corrosive", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers", "Acids"] },
  transport: { un: "1158", class: "3", packingGroup: "II", properShipping: "Diisopropylamine" },
  firstAid: { inhalation: "Fresh air.", skin: "Flush 15 min.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Dimethylformamide"] = {
  cas: "68-12-2", formula: "C₃H₇NO",
  de: "Dimethylformamid", es: "Dimetilformamida", fr: "Diméthylformamide", pt: "Dimetilformamida",
  synonyms: ["DMF", "N,N-Dimethylformamide"],
  classes: ["irritant", "health"],
  ghs: ["GHS07", "GHS08"],
  hazardStatements: [
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H360D", text: "May damage the unborn child" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl rubber" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Reproductive toxin. Absorbs through skin." },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers", "Halogenated compounds"] },
  transport: { un: "2265", class: "3", packingGroup: "III", properShipping: "N,N-Dimethylformamide" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash thoroughly.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Dimethylacetamide"] = {
  cas: "127-19-5", formula: "C₄H₉NO",
  de: "Dimethylacetamid", es: "Dimetilacetamida", fr: "Diméthylacétamide", pt: "Dimetilacetamida",
  synonyms: ["DMAc", "N,N-Dimethylacetamide"],
  classes: ["irritant", "health"],
  ghs: ["GHS07", "GHS08"],
  hazardStatements: [
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H360D", text: "May damage the unborn child" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl rubber" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Reproductive toxin. Fiber solvent." },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers", "Halogenated compounds"] },
  transport: { un: "3405", class: "6.1", packingGroup: "III", properShipping: "Chloronitrobenzenes, liquid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash thoroughly.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Acetonitrile"] = {
  cas: "75-05-8", formula: "CH₃CN",
  de: "Acetonitril", es: "Acetonitrilo", fr: "Acétonitrile", pt: "Acetonitrila",
  synonyms: ["Methyl cyanide", "Cyanomethane", "ACN"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapour" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "HPLC solvent. Metabolizes to cyanide." },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers", "Acids", "Bases"] },
  transport: { un: "1648", class: "3", packingGroup: "II", properShipping: "Acetonitrile" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Propionitrile"] = {
  cas: "107-12-0", formula: "C₃H₅N",
  de: "Propionitril", es: "Propionitrilo", fr: "Propionitrile", pt: "Propionitrila",
  synonyms: ["Ethyl cyanide", "Propanenitrile"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS06"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapour" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H331", text: "Toxic if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl rubber" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Releases HCN on burning" },
  storage: { cabinet: "Flammable/Toxic", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers", "Acids"] },
  transport: { un: "2404", class: "3", packingGroup: "II", properShipping: "Propionitrile" },
  firstAid: { inhalation: "Fresh air. Oxygen. Medical attention.", skin: "Wash thoroughly.", eyes: "Flush 15 min.", ingestion: "Medical attention." }
};

chemicalHazardDB["Carbon Disulfide"] = {
  cas: "75-15-0", formula: "CS₂",
  de: "Schwefelkohlenstoff", es: "Disulfuro de carbono", fr: "Disulfure de carbone", pt: "Dissulfeto de carbono",
  synonyms: ["Carbon bisulfide"],
  classes: ["flammable", "irritant", "health"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapour" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H361fd", text: "Suspected of damaging fertility and the unborn child" },
    { code: "H372", text: "Causes damage to organs through prolonged exposure" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl rubber" }, respiratory: { required: true, type: "Supplied air" }, other: "EXTREMELY FLAMMABLE. Auto-ignition 90°C!" },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Excellent", incompatible: ["Oxidizers", "Heat sources"] },
  transport: { un: "1131", class: "3", packingGroup: "I", properShipping: "Carbon disulphide" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Medical attention." }
};

chemicalHazardDB["Nitrobenzene"] = {
  cas: "98-95-3", formula: "C₆H₅NO₂",
  de: "Nitrobenzol", es: "Nitrobenceno", fr: "Nitrobenzène", pt: "Nitrobenzeno",
  synonyms: ["Oil of mirbane", "Nitrobenzol"],
  classes: ["toxic", "health"],
  ghs: ["GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H351", text: "Suspected of causing cancer" },
    { code: "H360F", text: "May damage fertility" },
    { code: "H372", text: "Causes damage to organs" },
    { code: "H411", text: "Toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl rubber, full coverage" }, respiratory: { required: true, type: "Supplied air" }, other: "Absorbs through skin. Causes methemoglobinemia." },
  storage: { cabinet: "Toxic storage", temp: "Cool", ventilation: "Good", incompatible: ["Reducing agents", "Strong acids/bases"] },
  transport: { un: "1662", class: "6.1", packingGroup: "II", properShipping: "Nitrobenzene" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Remove clothing. Wash thoroughly. Medical attention.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Chlorobenzene"] = {
  cas: "108-90-7", formula: "C₆H₅Cl",
  de: "Chlorbenzol", es: "Clorobenceno", fr: "Chlorobenzène", pt: "Clorobenzeno",
  synonyms: ["Monochlorobenzene", "Phenyl chloride"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapour" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H411", text: "Toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Industrial solvent" },
  storage: { cabinet: "Flammable liquids", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers"] },
  transport: { un: "1134", class: "3", packingGroup: "III", properShipping: "Chlorobenzene" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Dichlorobenzene"] = {
  cas: "95-50-1", formula: "C₆H₄Cl₂",
  de: "Dichlorbenzol", es: "Diclorobenceno", fr: "Dichlorobenzène", pt: "Diclorobenzeno",
  synonyms: ["o-Dichlorobenzene", "1,2-Dichlorobenzene", "ODCB"],
  classes: ["irritant", "environmental"],
  ghs: ["GHS07", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H411", text: "Toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Degreaser, fumigant" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Oxidizers", "Aluminum"] },
  transport: { un: "1591", class: "6.1", packingGroup: "III", properShipping: "o-Dichlorobenzene" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Paradichlorobenzene"] = {
  cas: "106-46-7", formula: "C₆H₄Cl₂",
  de: "p-Dichlorbenzol", es: "p-Diclorobenceno", fr: "p-Dichlorobenzène", pt: "p-Diclorobenzeno",
  synonyms: ["1,4-Dichlorobenzene", "PDCB", "Moth balls"],
  classes: ["irritant", "health", "environmental"],
  ghs: ["GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H351", text: "Suspected of causing cancer" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H411", text: "Toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Moth repellent, deodorizer" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Oxidizers"] },
  transport: { un: "1592", class: "6.1", packingGroup: "III", properShipping: "p-Dichlorobenzene" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Naphthalene"] = {
  cas: "91-20-3", formula: "C₁₀H₈",
  de: "Naphthalin", es: "Naftaleno", fr: "Naphtalène", pt: "Naftaleno",
  synonyms: ["Mothballs", "White tar", "Tar camphor"],
  classes: ["flammable", "irritant", "health", "environmental"],
  ghs: ["GHS02", "GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H228", text: "Flammable solid" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H351", text: "Suspected of causing cancer" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Respirator for dust/vapor" }, other: "Mothballs, coal tar derivative" },
  storage: { cabinet: "Flammable solids", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers"] },
  transport: { un: "1334", class: "4.1", packingGroup: "III", properShipping: "Naphthalene, crude/refined" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Anthracene"] = {
  cas: "120-12-7", formula: "C₁₄H₁₀",
  de: "Anthracen", es: "Antraceno", fr: "Anthracène", pt: "Antraceno",
  synonyms: ["Paranaphthalene", "Green oil"],
  classes: ["irritant", "environmental"],
  ghs: ["GHS07", "GHS09"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "PAH, dye precursor" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Anthracene" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Phenanthrene"] = {
  cas: "85-01-8", formula: "C₁₄H₁₀",
  de: "Phenanthren", es: "Fenantreno", fr: "Phénanthrène", pt: "Fenantreno",
  synonyms: ["Phenanthrin"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "PAH, found in coal tar" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Phenanthrene" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Hydrofluoric Acid 48%"] = {
  cas: "7664-39-3", formula: "HF",
  de: "Flusssäure 48%", es: "Ácido fluorhídrico 48%", fr: "Acide fluorhydrique 48%", pt: "Ácido fluorídrico 48%",
  synonyms: ["HF", "Hydrogen fluoride solution"],
  classes: ["corrosive", "toxic"],
  ghs: ["GHS05", "GHS06"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H330", text: "Fatal if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield + goggles" }, skin: { required: true, type: "Neoprene, double gloves, full suit" }, respiratory: { required: true, type: "SCBA or supplied air" }, other: "EXTREMELY DANGEROUS. Have calcium gluconate gel ready. Burns may not be immediately painful." },
  storage: { cabinet: "Special acid storage (HDPE)", temp: "Cool", ventilation: "Excellent", incompatible: ["Glass", "Metals", "Bases", "Silica"] },
  transport: { un: "1790", class: "8", packingGroup: "II", properShipping: "Hydrofluoric acid" },
  firstAid: { inhalation: "Fresh air. IMMEDIATE medical attention.", skin: "Flush with water. Apply calcium gluconate gel. IMMEDIATE medical attention.", eyes: "Flush 15 min. IMMEDIATE medical attention.", ingestion: "Do NOT vomit. IMMEDIATE medical attention." }
};

chemicalHazardDB["Ammonium Bifluoride"] = {
  cas: "1341-49-7", formula: "NH₄HF₂",
  de: "Ammoniumbifluorid", es: "Bifluoruro de amonio", fr: "Bifluorure d'ammonium", pt: "Bifluoreto de amônio",
  synonyms: ["Ammonium hydrogen fluoride", "ABF"],
  classes: ["corrosive", "toxic"],
  ghs: ["GHS05", "GHS06"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H331", text: "Toxic if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield + goggles" }, skin: { required: true, type: "Neoprene gloves, full coverage" }, respiratory: { required: true, type: "Full face respirator" }, other: "Releases HF. Glass etching." },
  storage: { cabinet: "Corrosive/Toxic (HDPE)", temp: "Room temperature", ventilation: "Good", incompatible: ["Glass", "Metals", "Acids"] },
  transport: { un: "1727", class: "8", packingGroup: "II", properShipping: "Ammonium hydrogen fluoride, solid" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Flush with water. Calcium gluconate gel.", eyes: "Flush 15 min. Medical attention.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Sodium Fluoride"] = {
  cas: "7681-49-4", formula: "NaF",
  de: "Natriumfluorid", es: "Fluoruro de sodio", fr: "Fluorure de sodium", pt: "Fluoreto de sódio",
  synonyms: ["Floridine"],
  classes: ["toxic"],
  ghs: ["GHS06"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Toothpaste ingredient, rat poison" },
  storage: { cabinet: "Toxic storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids (releases HF)"] },
  transport: { un: "1690", class: "6.1", packingGroup: "III", properShipping: "Sodium fluoride" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Give calcium (milk). Medical attention." }
};

chemicalHazardDB["Potassium Fluoride"] = {
  cas: "7789-23-3", formula: "KF",
  de: "Kaliumfluorid", es: "Fluoruro de potasio", fr: "Fluorure de potassium", pt: "Fluoreto de potássio",
  synonyms: [],
  classes: ["toxic"],
  ghs: ["GHS06"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H331", text: "Toxic if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "" },
  storage: { cabinet: "Toxic storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids (releases HF)"] },
  transport: { un: "1812", class: "6.1", packingGroup: "III", properShipping: "Potassium fluoride" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Give calcium (milk). Medical attention." }
};

chemicalHazardDB["Selenium Dioxide"] = {
  cas: "7446-08-4", formula: "SeO₂",
  de: "Selendioxid", es: "Dióxido de selenio", fr: "Dioxyde de sélénium", pt: "Dióxido de selênio",
  synonyms: ["Selenious anhydride"],
  classes: ["toxic", "environmental"],
  ghs: ["GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H373", text: "May cause damage to organs" },
    { code: "H411", text: "Toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves, protective clothing" }, respiratory: { required: true, type: "Respirator" }, other: "Garlic odor indicates exposure" },
  storage: { cabinet: "Toxic storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Reducing agents"] },
  transport: { un: "2811", class: "6.1", packingGroup: "II", properShipping: "Toxic solid, organic" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash thoroughly.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Tellurium Dioxide"] = {
  cas: "7446-07-3", formula: "TeO₂",
  de: "Tellurdioxid", es: "Dióxido de telurio", fr: "Dioxyde de tellure", pt: "Dióxido de telúrio",
  synonyms: ["Tellurous acid anhydride"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Causes garlic breath" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Tellurium dioxide" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Antimony Trioxide"] = {
  cas: "1309-64-4", formula: "Sb₂O₃",
  de: "Antimontrioxid", es: "Trióxido de antimonio", fr: "Trioxyde d'antimoine", pt: "Trióxido de antimônio",
  synonyms: ["Antimony(III) oxide", "Antimonous oxide"],
  classes: ["health"],
  ghs: ["GHS08"],
  hazardStatements: [
    { code: "H351", text: "Suspected of causing cancer" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "Particulate respirator" }, other: "Flame retardant, glass" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Strong acids", "Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Antimony trioxide" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Bismuth Subnitrate"] = {
  cas: "1304-85-4", formula: "Bi₅O(OH)₉(NO₃)₄",
  de: "Bismutsubnitrat", es: "Subnitrato de bismuto", fr: "Sous-nitrate de bismuth", pt: "Subnitrato de bismuto",
  synonyms: ["Basic bismuth nitrate", "Bismuth white"],
  classes: ["oxidizer"],
  ghs: ["GHS03"],
  hazardStatements: [
    { code: "H272", text: "May intensify fire; oxidizer" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Pharmaceutical, cosmetic" },
  storage: { cabinet: "Oxidizer storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Reducing agents", "Combustibles"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Bismuth subnitrate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Lead Acetate"] = {
  cas: "301-04-2", formula: "Pb(CH₃COO)₂",
  de: "Bleiacetat", es: "Acetato de plomo", fr: "Acétate de plomb", pt: "Acetato de chumbo",
  synonyms: ["Lead(II) acetate", "Sugar of lead"],
  classes: ["toxic", "health", "environmental"],
  ghs: ["GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H360Df", text: "May damage the unborn child. Suspected of damaging fertility." },
    { code: "H373", text: "May cause damage to organs through prolonged exposure" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "Particulate respirator" }, other: "Lead compound - reproductive toxin" },
  storage: { cabinet: "Toxic storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids", "Strong bases"] },
  transport: { un: "1616", class: "6.1", packingGroup: "III", properShipping: "Lead acetate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Thallium Sulfate"] = {
  cas: "7446-18-6", formula: "Tl₂SO₄",
  de: "Thalliumsulfat", es: "Sulfato de talio", fr: "Sulfate de thallium", pt: "Sulfato de tálio",
  synonyms: ["Thallous sulfate"],
  classes: ["toxic", "environmental"],
  ghs: ["GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H373", text: "May cause damage to organs" },
    { code: "H411", text: "Toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Full protective clothing" }, respiratory: { required: true, type: "Supplied air" }, other: "EXTREMELY TOXIC. Former rodenticide (now banned)." },
  storage: { cabinet: "Highly toxic storage", temp: "Room temperature", ventilation: "Good", incompatible: [] },
  transport: { un: "1707", class: "6.1", packingGroup: "II", properShipping: "Thallium compound" },
  firstAid: { inhalation: "Fresh air. IMMEDIATE medical attention.", skin: "Remove clothing. Wash. IMMEDIATE medical attention.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. IMMEDIATE medical attention." }
};

chemicalHazardDB["Cadmium Chloride"] = {
  cas: "10108-64-2", formula: "CdCl₂",
  de: "Cadmiumchlorid", es: "Cloruro de cadmio", fr: "Chlorure de cadmium", pt: "Cloreto de cádmio",
  synonyms: ["Cadmium(II) chloride"],
  classes: ["toxic", "health", "environmental"],
  ghs: ["GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H340", text: "May cause genetic defects" },
    { code: "H350", text: "May cause cancer" },
    { code: "H360FD", text: "May damage fertility. May damage the unborn child." },
    { code: "H372", text: "Causes damage to organs" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Full protective clothing" }, respiratory: { required: true, type: "Particulate respirator P100" }, other: "CARCINOGEN. Reproductive toxin." },
  storage: { cabinet: "Toxic/Carcinogen storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Strong oxidizers"] },
  transport: { un: "2570", class: "6.1", packingGroup: "II", properShipping: "Cadmium compound" },
  firstAid: { inhalation: "Fresh air. Oxygen. Medical attention.", skin: "Wash thoroughly.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Beryllium Oxide"] = {
  cas: "1304-56-9", formula: "BeO",
  de: "Berylliumoxid", es: "Óxido de berilio", fr: "Oxyde de béryllium", pt: "Óxido de berílio",
  synonyms: ["Beryllia"],
  classes: ["toxic", "health"],
  ghs: ["GHS06", "GHS08"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H350i", text: "May cause cancer by inhalation" },
    { code: "H372", text: "Causes damage to organs" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Full protective clothing" }, respiratory: { required: true, type: "Supplied air or P100 HEPA" }, other: "CARCINOGEN. Causes chronic beryllium disease (CBD)." },
  storage: { cabinet: "Toxic/Carcinogen storage", temp: "Room temperature", ventilation: "Good", incompatible: [] },
  transport: { un: "1566", class: "6.1", packingGroup: "II", properShipping: "Beryllium compound" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Wash with soap.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Vanadium Pentoxide"] = {
  cas: "1314-62-1", formula: "V₂O₅",
  de: "Vanadiumpentoxid", es: "Pentóxido de vanadio", fr: "Pentoxyde de vanadium", pt: "Pentóxido de vanádio",
  synonyms: ["Vanadium(V) oxide", "Vanadic anhydride"],
  classes: ["toxic", "health"],
  ghs: ["GHS06", "GHS08"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H341", text: "Suspected of causing genetic defects" },
    { code: "H361d", text: "Suspected of damaging the unborn child" },
    { code: "H372", text: "Causes damage to organs" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves, protective clothing" }, respiratory: { required: true, type: "Particulate respirator" }, other: "Catalyst, ceramic colorant" },
  storage: { cabinet: "Toxic storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Reducing agents"] },
  transport: { un: "2862", class: "6.1", packingGroup: "III", properShipping: "Vanadium pentoxide" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Titanium Dioxide"] = {
  cas: "13463-67-7", formula: "TiO₂",
  de: "Titandioxid", es: "Dióxido de titanio", fr: "Dioxyde de titane", pt: "Dióxido de titânio",
  synonyms: ["Titanium(IV) oxide", "Titania", "CI Pigment White 6"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask for powder" }, other: "White pigment, sunscreen. Generally safe." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: [] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Titanium dioxide" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Zirconium Dioxide"] = {
  cas: "1314-23-4", formula: "ZrO₂",
  de: "Zirkoniumdioxid", es: "Dióxido de circonio", fr: "Dioxyde de zirconium", pt: "Dióxido de zircônio",
  synonyms: ["Zirconia", "Zirconium(IV) oxide"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Ceramic, dental, jewelry" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: [] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Zirconium dioxide" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Silica Gel"] = {
  cas: "112926-00-8", formula: "SiO₂·xH₂O",
  de: "Silikagel", es: "Gel de sílice", fr: "Gel de silice", pt: "Sílica gel",
  synonyms: ["Silica gel desiccant"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Desiccant. 'Do not eat' packets." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: [] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Silica gel" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth. Generally non-toxic." }
};

chemicalHazardDB["Activated Carbon"] = {
  cas: "7440-44-0", formula: "C",
  de: "Aktivkohle", es: "Carbón activado", fr: "Charbon actif", pt: "Carvão ativado",
  synonyms: ["Activated charcoal", "Active carbon"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Adsorbent, filters, poison treatment" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers (can ignite)"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Activated carbon" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Generally safe - used medically." }
};

chemicalHazardDB["Sodium Azide"] = {
  cas: "26628-22-8", formula: "NaN₃",
  de: "Natriumazid", es: "Azida de sodio", fr: "Azoture de sodium", pt: "Azida de sódio",
  synonyms: ["Sodium trinitride"],
  classes: ["toxic", "environmental"],
  ghs: ["GHS06", "GHS09"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H400", text: "Very toxic to aquatic life" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" },
    { code: "EUH032", text: "Contact with acids liberates very toxic gas" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves, protective clothing" }, respiratory: { required: true, type: "Respirator" }, other: "EXPLOSIVE with metals. Airbag propellant, preservative." },
  storage: { cabinet: "Toxic storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Acids (releases HN3)", "Metals (forms explosive azides)", "Water"] },
  transport: { un: "1687", class: "6.1", packingGroup: "II", properShipping: "Sodium azide" },
  firstAid: { inhalation: "Fresh air. IMMEDIATE medical attention.", skin: "Wash thoroughly. Medical attention.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. IMMEDIATE medical attention." }
};

chemicalHazardDB["Potassium Cyanide"] = {
  cas: "151-50-8", formula: "KCN",
  de: "Kaliumcyanid", es: "Cianuro de potasio", fr: "Cyanure de potassium", pt: "Cianeto de potássio",
  synonyms: ["KCN"],
  classes: ["toxic", "environmental"],
  ghs: ["GHS06", "GHS09"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" },
    { code: "EUH032", text: "Contact with acids liberates very toxic gas" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Full protective clothing" }, respiratory: { required: true, type: "SCBA or supplied air" }, other: "EXTREMELY TOXIC. Have cyanide antidote kit ready." },
  storage: { cabinet: "Highly toxic storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Acids (releases HCN)", "Oxidizers"] },
  transport: { un: "1680", class: "6.1", packingGroup: "I", properShipping: "Potassium cyanide" },
  firstAid: { inhalation: "Fresh air. Oxygen. Cyanide antidote. IMMEDIATE medical attention.", skin: "Remove clothing. Wash. Medical attention.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. IMMEDIATE medical attention." }
};

chemicalHazardDB["Silver Nitrate"] = {
  cas: "7761-88-8", formula: "AgNO₃",
  de: "Silbernitrat", es: "Nitrato de plata", fr: "Nitrate d'argent", pt: "Nitrato de prata",
  synonyms: ["Lunar caustic"],
  classes: ["oxidizer", "corrosive", "environmental"],
  ghs: ["GHS03", "GHS05", "GHS09"],
  hazardStatements: [
    { code: "H272", text: "May intensify fire; oxidizer" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Stains skin black permanently" },
  storage: { cabinet: "Oxidizer storage", temp: "Room temperature, dark", ventilation: "Normal", incompatible: ["Reducing agents", "Organics", "Ammonia"] },
  transport: { un: "1493", class: "5.1", packingGroup: "II", properShipping: "Silver nitrate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash (staining permanent).", eyes: "Flush 15 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Mercury(II) Chloride"] = {
  cas: "7487-94-7", formula: "HgCl₂",
  de: "Quecksilber(II)-chlorid", es: "Cloruro de mercurio(II)", fr: "Chlorure de mercure(II)", pt: "Cloreto de mercúrio(II)",
  synonyms: ["Mercuric chloride", "Corrosive sublimate"],
  classes: ["toxic", "corrosive", "environmental"],
  ghs: ["GHS05", "GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H372", text: "Causes damage to organs" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield + goggles" }, skin: { required: true, type: "Full protective suit" }, respiratory: { required: true, type: "Supplied air" }, other: "EXTREMELY TOXIC mercury compound. Historical poison." },
  storage: { cabinet: "Highly toxic storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Metals", "Ammonia"] },
  transport: { un: "1624", class: "6.1", packingGroup: "I", properShipping: "Mercuric chloride" },
  firstAid: { inhalation: "Fresh air. IMMEDIATE medical attention.", skin: "Remove clothing. Wash. IMMEDIATE medical attention.", eyes: "Flush 20 min.", ingestion: "Do NOT vomit. Give milk/egg whites. IMMEDIATE medical attention." }
};

chemicalHazardDB["Barium Chloride"] = {
  cas: "10361-37-2", formula: "BaCl₂",
  de: "Bariumchlorid", es: "Cloruro de bario", fr: "Chlorure de baryum", pt: "Cloreto de bário",
  synonyms: ["Barium(II) chloride"],
  classes: ["toxic"],
  ghs: ["GHS06"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Water treatment, fireworks" },
  storage: { cabinet: "Toxic storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Sulfates (precipitates BaSO4)"] },
  transport: { un: "1564", class: "6.1", packingGroup: "II", properShipping: "Barium compound" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Give sodium sulfate solution. Medical attention." }
};

chemicalHazardDB["Lithium Chloride"] = {
  cas: "7447-41-8", formula: "LiCl",
  de: "Lithiumchlorid", es: "Cloruro de litio", fr: "Chlorure de lithium", pt: "Cloreto de lítio",
  synonyms: [],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Desiccant, air conditioning" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: [] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Lithium chloride" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Drink water." }
};

chemicalHazardDB["Cesium Chloride"] = {
  cas: "7647-17-8", formula: "CsCl",
  de: "Cäsiumchlorid", es: "Cloruro de cesio", fr: "Chlorure de césium", pt: "Cloreto de césio",
  synonyms: ["Caesium chloride"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Density gradient centrifugation" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: [] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Cesium chloride" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Rubidium Chloride"] = {
  cas: "7791-11-9", formula: "RbCl",
  de: "Rubidiumchlorid", es: "Cloruro de rubidio", fr: "Chlorure de rubidium", pt: "Cloreto de rubídio",
  synonyms: [],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Research chemical" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: [] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Rubidium chloride" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Strontium Chloride"] = {
  cas: "10476-85-4", formula: "SrCl₂",
  de: "Strontiumchlorid", es: "Cloruro de estroncio", fr: "Chlorure de strontium", pt: "Cloreto de estrôncio",
  synonyms: [],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Fireworks (red), toothpaste" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: [] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Strontium chloride" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

// Print final count
console.log("Final chemical count:", Object.keys(chemicalHazardDB).length);
