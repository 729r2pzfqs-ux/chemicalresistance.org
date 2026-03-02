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

// GHS pictogram info
const ghsInfo = {
  "GHS01": { emoji: "💥", name: "Explosive", desc: "Explosives, self-reactive substances" },
  "GHS02": { emoji: "🔥", name: "Flammable", desc: "Flammable materials" },
  "GHS03": { emoji: "⭕", name: "Oxidizer", desc: "May cause or intensify fire" },
  "GHS04": { emoji: "🫧", name: "Gas Cylinder", desc: "Gases under pressure" },
  "GHS05": { emoji: "⚗️", name: "Corrosive", desc: "Causes burns" },
  "GHS06": { emoji: "☠️", name: "Toxic", desc: "Acute toxicity (fatal or toxic)" },
  "GHS07": { emoji: "⚠️", name: "Irritant", desc: "Harmful/irritant" },
  "GHS08": { emoji: "🫁", name: "Health Hazard", desc: "Serious health hazard" },
  "GHS09": { emoji: "🌿", name: "Environment", desc: "Environmental hazard" }
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
