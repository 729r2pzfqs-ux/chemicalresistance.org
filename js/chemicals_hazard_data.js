// Chemical Hazard Database for Storage Compatibility & SDS Decoder
// 400 chemicals with hazard classifications, GHS, PPE, and storage info

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

// ===== PETROLEUM & FUEL PRODUCTS =====

chemicalHazardDB["Diesel Fuel"] = {
  cas: "68476-34-6", formula: "C₁₀-C₂₂",
  de: "Dieselkraftstoff", es: "Combustible diésel", fr: "Gazole", pt: "Combustível diesel",
  synonyms: ["Diesel oil", "Gas oil", "DERV"],
  classes: ["flammable", "health"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H351", text: "Suspected of causing cancer" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Eliminate ignition sources" },
  storage: { cabinet: "Flammable liquid cabinet", temp: "Cool, away from heat", ventilation: "Well-ventilated", incompatible: ["Oxidizers", "Strong acids"] },
  transport: { un: "1202", class: "3", packingGroup: "III", properShipping: "Diesel fuel" },
  firstAid: { inhalation: "Fresh air. Medical attention if symptoms.", skin: "Wash with soap.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit (aspiration risk). Medical attention." }
};

chemicalHazardDB["Gasoline"] = {
  cas: "8006-61-9", formula: "C₄-C₁₂",
  de: "Benzin", es: "Gasolina", fr: "Essence", pt: "Gasolina",
  synonyms: ["Petrol", "Motor spirit", "Mogas"],
  classes: ["flammable", "health", "irritant"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H224", text: "Extremely flammable liquid and vapor" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" },
    { code: "H350", text: "May cause cancer (contains benzene)" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "NO sparks, flames, or hot surfaces" },
  storage: { cabinet: "Flammable liquid cabinet", temp: "Cool", ventilation: "Well-ventilated, away from ignition", incompatible: ["Oxidizers", "Acids"] },
  transport: { un: "1203", class: "3", packingGroup: "II", properShipping: "Gasoline" },
  firstAid: { inhalation: "Fresh air. Oxygen if needed.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. IMMEDIATE medical attention." }
};

chemicalHazardDB["Kerosene"] = {
  cas: "8008-20-6", formula: "C₉-C₁₆",
  de: "Kerosin", es: "Queroseno", fr: "Kérosène", pt: "Querosene",
  synonyms: ["Jet fuel", "Paraffin oil", "Lamp oil"],
  classes: ["flammable", "health"],
  ghs: ["GHS02", "GHS08"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Respirator in confined spaces" }, other: "Away from ignition sources" },
  storage: { cabinet: "Flammable liquid cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Oxidizers"] },
  transport: { un: "1223", class: "3", packingGroup: "III", properShipping: "Kerosene" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with soap.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Lubricating Oil"] = {
  cas: "Various", formula: "Hydrocarbons",
  de: "Schmieröl", es: "Aceite lubricante", fr: "Huile lubrifiante", pt: "Óleo lubrificante",
  synonyms: ["Motor oil", "Machine oil", "Mineral oil"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses if splash risk" }, skin: { required: false, type: "Gloves for prolonged contact" }, respiratory: { required: false, type: "Not required" }, other: "Clean spills to prevent slips" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Lubricating oil" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with soap.", eyes: "Flush.", ingestion: "Do not induce vomiting. Medical advice." }
};

chemicalHazardDB["Hydraulic Fluid"] = {
  cas: "Various", formula: "Various",
  de: "Hydraulikflüssigkeit", es: "Fluido hidráulico", fr: "Fluide hydraulique", pt: "Fluido hidráulico",
  synonyms: ["Hydraulic oil"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Not required" }, other: "Avoid high-pressure injection injuries" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Hydraulic fluid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Do not vomit. Medical attention." }
};

// ===== AGRICULTURAL CHEMICALS =====

chemicalHazardDB["Ammonium Nitrate"] = {
  cas: "6484-52-2", formula: "NH₄NO₃",
  de: "Ammoniumnitrat", es: "Nitrato de amonio", fr: "Nitrate d'ammonium", pt: "Nitrato de amônio",
  synonyms: ["AN", "Nitram"],
  classes: ["oxidizer"],
  ghs: ["GHS03"],
  hazardStatements: [
    { code: "H272", text: "May intensify fire; oxidizer" },
    { code: "EUH044", text: "Risk of explosion if heated under confinement" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "EXPLOSIVE potential when contaminated or heated. Fertilizer." },
  storage: { cabinet: "Oxidizer storage, separate building", temp: "Cool, dry", ventilation: "Good", incompatible: ["Fuels", "Organics", "Acids", "Metals", "Chlorides"] },
  transport: { un: "1942", class: "5.1", packingGroup: "III", properShipping: "Ammonium nitrate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Drink water." }
};

chemicalHazardDB["Urea"] = {
  cas: "57-13-6", formula: "CH₄N₂O",
  de: "Harnstoff", es: "Urea", fr: "Urée", pt: "Ureia",
  synonyms: ["Carbamide", "Carbonyl diamide"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Gloves for prolonged contact" }, respiratory: { required: false, type: "Dust mask" }, other: "Fertilizer, cosmetics, diesel exhaust fluid (DEF)" },
  storage: { cabinet: "General storage", temp: "Room temperature, dry", ventilation: "Normal", incompatible: ["Strong oxidizers", "Nitrates"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Urea" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth. Drink water." }
};

chemicalHazardDB["Potassium Chloride"] = {
  cas: "7447-40-7", formula: "KCl",
  de: "Kaliumchlorid", es: "Cloruro de potasio", fr: "Chlorure de potassium", pt: "Cloreto de potássio",
  synonyms: ["Muriate of potash", "Sylvite"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Fertilizer, salt substitute, medical uses" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids (releases HCl)"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Potassium chloride" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Glyphosate"] = {
  cas: "1071-83-6", formula: "C₃H₈NO₅P",
  de: "Glyphosat", es: "Glifosato", fr: "Glyphosate", pt: "Glifosato",
  synonyms: ["Roundup active ingredient", "N-(phosphonomethyl)glycine"],
  classes: ["irritant", "environmental"],
  ghs: ["GHS07", "GHS09"],
  hazardStatements: [
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H411", text: "Toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles or face shield" }, skin: { required: true, type: "Gloves, long sleeves" }, respiratory: { required: false, type: "Respirator if spraying" }, other: "Herbicide. Avoid spray drift." },
  storage: { cabinet: "Pesticide storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases", "Metals"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Glyphosate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash thoroughly.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["2,4-D"] = {
  cas: "94-75-7", formula: "C₈H₆Cl₂O₃",
  de: "2,4-D", es: "2,4-D", fr: "2,4-D", pt: "2,4-D",
  synonyms: ["2,4-Dichlorophenoxyacetic acid", "Hedonal"],
  classes: ["toxic", "irritant", "environmental"],
  ghs: ["GHS07", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H411", text: "Toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves, long sleeves" }, respiratory: { required: false, type: "Respirator if spraying" }, other: "Herbicide for broadleaf weeds" },
  storage: { cabinet: "Pesticide storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases"] },
  transport: { un: "3077", class: "9", packingGroup: "III", properShipping: "Environmentally hazardous substance" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

// ===== POOL & SPA CHEMICALS =====

chemicalHazardDB["Calcium Hypochlorite"] = {
  cas: "7778-54-3", formula: "Ca(ClO)₂",
  de: "Calciumhypochlorit", es: "Hipoclorito de calcio", fr: "Hypochlorite de calcium", pt: "Hipoclorito de cálcio",
  synonyms: ["Pool shock", "HTH", "Bleaching powder"],
  classes: ["oxidizer", "corrosive", "environmental"],
  ghs: ["GHS03", "GHS05", "GHS07", "GHS09"],
  hazardStatements: [
    { code: "H272", text: "May intensify fire; oxidizer" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Rubber gloves, protective clothing" }, respiratory: { required: true, type: "Chlorine-rated respirator" }, other: "NEVER mix with acids or ammonia. Releases toxic chlorine gas." },
  storage: { cabinet: "Oxidizer cabinet (separate from acids)", temp: "Cool, dry", ventilation: "Well-ventilated", incompatible: ["Acids", "Ammonia", "Organics", "Other pool chemicals"] },
  transport: { un: "2880", class: "5.1", packingGroup: "II", properShipping: "Calcium hypochlorite, hydrated" },
  firstAid: { inhalation: "Fresh air. Oxygen if breathing difficult.", skin: "Flush with water 20 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Cyanuric Acid"] = {
  cas: "108-80-5", formula: "C₃H₃N₃O₃",
  de: "Cyanursäure", es: "Ácido cianúrico", fr: "Acide cyanurique", pt: "Ácido cianúrico",
  synonyms: ["Pool stabilizer", "Conditioner", "Triazine-2,4,6-triol"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Protects chlorine from UV breakdown" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Cyanuric acid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Drink water." }
};

chemicalHazardDB["Muriatic Acid Pool Grade"] = {
  cas: "7647-01-0", formula: "HCl",
  de: "Salzsäure (Poolqualität)", es: "Ácido muriático", fr: "Acide muriatique", pt: "Ácido muriático",
  synonyms: ["Pool acid", "pH Down (acid)"],
  classes: ["acid", "corrosive"],
  ghs: ["GHS05", "GHS07"],
  hazardStatements: [
    { code: "H290", text: "May be corrosive to metals" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "PVC or rubber gloves" }, respiratory: { required: true, type: "Acid gas respirator" }, other: "Add acid to water, never reverse. NEVER mix with chlorine products." },
  storage: { cabinet: "Acid cabinet (FAR from chlorine)", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Bases", "Chlorine products", "Oxidizers"] },
  transport: { un: "1789", class: "8", packingGroup: "II", properShipping: "Hydrochloric acid" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Flush 20 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Do NOT vomit. Drink water. Medical attention." }
};

// ===== PHARMACEUTICAL & LABORATORY =====

chemicalHazardDB["Ethyl Alcohol"] = {
  cas: "64-17-5", formula: "C₂H₅OH",
  de: "Ethanol", es: "Alcohol etílico", fr: "Alcool éthylique", pt: "Álcool etílico",
  synonyms: ["Ethanol", "Grain alcohol", "EtOH"],
  classes: ["flammable"],
  ghs: ["GHS02"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves for prolonged contact" }, respiratory: { required: false, type: "Ventilation" }, other: "Common solvent, disinfectant. Keep away from flames." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Oxidizers", "Acids", "Alkalis"] },
  transport: { un: "1170", class: "3", packingGroup: "II", properShipping: "Ethanol" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Drink water." }
};

chemicalHazardDB["Chloroform"] = {
  cas: "67-66-3", formula: "CHCl₃",
  de: "Chloroform", es: "Cloroformo", fr: "Chloroforme", pt: "Clorofórmio",
  synonyms: ["Trichloromethane", "Methyl trichloride"],
  classes: ["toxic", "health"],
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
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Work in fume hood. Former anesthetic." },
  storage: { cabinet: "Toxic/carcinogen storage", temp: "Cool, dark", ventilation: "Fume hood", incompatible: ["Strong bases", "Oxidizers", "Metals", "Light"] },
  transport: { un: "1888", class: "6.1", packingGroup: "III", properShipping: "Chloroform" },
  firstAid: { inhalation: "Fresh air. Oxygen. Medical attention.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Dimethyl Sulfoxide"] = {
  cas: "67-68-5", formula: "(CH₃)₂SO",
  de: "Dimethylsulfoxid", es: "Dimetilsulfóxido", fr: "Diméthylsulfoxyde", pt: "Dimetilsulfóxido",
  synonyms: ["DMSO"],
  classes: ["flammable"],
  ghs: ["GHS02"],
  hazardStatements: [
    { code: "H227", text: "Combustible liquid" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Butyl rubber gloves" }, respiratory: { required: false, type: "Not required" }, other: "CAUTION: Penetrates skin rapidly, can carry dissolved substances into body" },
  storage: { cabinet: "Flammable cabinet", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Acid halides"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Dimethyl sulfoxide" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash immediately (penetrates skin).", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Diethyl Ether"] = {
  cas: "60-29-7", formula: "(C₂H₅)₂O",
  de: "Diethylether", es: "Éter dietílico", fr: "Éther diéthylique", pt: "Éter dietílico",
  synonyms: ["Ether", "Ethyl ether", "Ethoxyethane"],
  classes: ["flammable"],
  ghs: ["GHS02"],
  hazardStatements: [
    { code: "H224", text: "Extremely flammable liquid and vapor" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H336", text: "May cause drowsiness or dizziness" },
    { code: "EUH019", text: "May form explosive peroxides" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "EXTREMELY FLAMMABLE. Check for peroxides before use. Work in fume hood." },
  storage: { cabinet: "Flammable cabinet (peroxide-former)", temp: "Cool, dark", ventilation: "Explosion-proof", incompatible: ["Oxidizers", "Halogens", "Peroxides form over time"] },
  transport: { un: "1155", class: "3", packingGroup: "I", properShipping: "Diethyl ether" },
  firstAid: { inhalation: "Fresh air. Oxygen.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Glycerol"] = {
  cas: "56-81-5", formula: "C₃H₈O₃",
  de: "Glycerin", es: "Glicerol", fr: "Glycérol", pt: "Glicerol",
  synonyms: ["Glycerin", "Glycerine", "Propane-1,2,3-triol"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Not required" }, other: "Food grade available. Moisturizer, solvent, sweetener." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers (can ignite)"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Glycerol" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Generally safe." }
};

// ===== CONSTRUCTION & BUILDING =====

chemicalHazardDB["Portland Cement"] = {
  cas: "65997-15-1", formula: "Cite calcium silicates",
  de: "Portlandzite", es: "Cemento Portland", fr: "Ciment Portland", pt: "Cimento Portland",
  synonyms: ["Cement", "Hydraulic cement"],
  classes: ["corrosive", "irritant"],
  ghs: ["GHS05", "GHS07"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety goggles" }, skin: { required: true, type: "Waterproof gloves, long sleeves" }, respiratory: { required: true, type: "Dust mask/respirator" }, other: "Wet cement is caustic - burns develop slowly. Contains chromium (sensitizer)." },
  storage: { cabinet: "Dry storage", temp: "Dry, cool", ventilation: "Normal", incompatible: ["Acids", "Aluminum"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Portland cement" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash immediately. Burns may take hours to appear.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Drink water." }
};

chemicalHazardDB["Calcium Oxide"] = {
  cas: "1305-78-8", formula: "CaO",
  de: "Calciumoxid", es: "Óxido de calcio", fr: "Oxyde de calcium", pt: "Óxido de cálcio",
  synonyms: ["Quicklite", "Burnt lime", "Unslaked lime"],
  classes: ["corrosive", "irritant"],
  ghs: ["GHS05", "GHS07"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Gloves, protective clothing" }, respiratory: { required: true, type: "Dust respirator" }, other: "REACTS violently with water (generates heat). Construction, water treatment." },
  storage: { cabinet: "Dry storage (moisture-free)", temp: "Dry", ventilation: "Normal", incompatible: ["Water", "Acids"] },
  transport: { un: "1910", class: "8", packingGroup: "III", properShipping: "Calcium oxide" },
  firstAid: { inhalation: "Fresh air.", skin: "Brush off dry. Then wash.", eyes: "Flush 30 min. IMMEDIATE medical attention.", ingestion: "Rinse mouth. Drink water. Medical attention." }
};

chemicalHazardDB["Calcium Hydroxide"] = {
  cas: "1305-62-0", formula: "Ca(OH)₂",
  de: "Calciumhydroxid", es: "Hidróxido de calcio", fr: "Hydroxyde de calcium", pt: "Hidróxido de cálcio",
  synonyms: ["Slaked lime", "Hydrated lime", "Pickling lime"],
  classes: ["corrosive", "irritant"],
  ghs: ["GHS05", "GHS07"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "Dust mask" }, other: "Construction, water treatment, food (nixtamalization)" },
  storage: { cabinet: "Dry storage", temp: "Dry", ventilation: "Normal", incompatible: ["Acids", "Ammonium compounds"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Calcium hydroxide" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Drink water." }
};

// ===== METALS & METAL COMPOUNDS =====

chemicalHazardDB["Aluminum Powder"] = {
  cas: "7429-90-5", formula: "Al",
  de: "Aluminiumpulver", es: "Polvo de aluminio", fr: "Poudre d'aluminium", pt: "Pó de alumínio",
  synonyms: ["Aluminium powder"],
  classes: ["flammable"],
  ghs: ["GHS02"],
  hazardStatements: [
    { code: "H228", text: "Flammable solid" },
    { code: "H261", text: "In contact with water releases flammable gases" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "Dust respirator" }, other: "FIRE/EXPLOSION hazard. Keep dry. Ground containers." },
  storage: { cabinet: "Flammable solid storage", temp: "Dry", ventilation: "Good", incompatible: ["Water", "Acids", "Bases", "Oxidizers", "Halogens"] },
  transport: { un: "1396", class: "4.3", packingGroup: "II", properShipping: "Aluminium powder, coated" },
  firstAid: { inhalation: "Fresh air.", skin: "Brush off. Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Zinc Chloride"] = {
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
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Rubber gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Soldering flux, wood preservative" },
  storage: { cabinet: "Corrosive storage", temp: "Dry", ventilation: "Normal", incompatible: ["Bases", "Sulfides"] },
  transport: { un: "2331", class: "8", packingGroup: "III", properShipping: "Zinc chloride" },
  firstAid: { inhalation: "Fresh air.", skin: "Flush 15 min.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Drink water. Medical attention." }
};

chemicalHazardDB["Copper Sulfate"] = {
  cas: "7758-98-7", formula: "CuSO₄",
  de: "Kupfersulfat", es: "Sulfato de cobre", fr: "Sulfate de cuivre", pt: "Sulfato de cobre",
  synonyms: ["Blue vitriol", "Bluestone", "Copper(II) sulfate"],
  classes: ["toxic", "irritant", "environmental"],
  ghs: ["GHS07", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Fungicide, algaecide, pool treatment" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Metals", "Bases"] },
  transport: { un: "3077", class: "9", packingGroup: "III", properShipping: "Environmentally hazardous substance" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Iron(III) Chloride"] = {
  cas: "7705-08-0", formula: "FeCl₃",
  de: "Eisen(III)-chlorid", es: "Cloruro de hierro(III)", fr: "Chlorure de fer(III)", pt: "Cloreto de ferro(III)",
  synonyms: ["Ferric chloride", "Iron trichloride"],
  classes: ["corrosive"],
  ghs: ["GHS05", "GHS07"],
  hazardStatements: [
    { code: "H290", text: "May be corrosive to metals" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H318", text: "Causes serious eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Rubber gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "PCB etching, water treatment. Stains skin." },
  storage: { cabinet: "Corrosive storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Bases", "Metals"] },
  transport: { un: "1773", class: "8", packingGroup: "III", properShipping: "Ferric chloride" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

// ===== FOOD & BEVERAGE CHEMICALS =====

chemicalHazardDB["Citric Acid"] = {
  cas: "77-92-9", formula: "C₆H₈O₇",
  de: "Zitronensäure", es: "Ácido cítrico", fr: "Acide citrique", pt: "Ácido cítrico",
  synonyms: ["Sour salt", "E330"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Food additive, cleaning agent, descaler" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong bases"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Citric acid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Sodium Benzoate"] = {
  cas: "532-32-1", formula: "C₆H₅COONa",
  de: "Natriumbenzoat", es: "Benzoato de sodio", fr: "Benzoate de sodium", pt: "Benzoato de sódio",
  synonyms: ["E211", "Benzoic acid sodium salt"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Food preservative (antimicrobial)" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids (releases benzoic acid)"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Sodium benzoate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Potassium Sorbate"] = {
  cas: "24634-61-5", formula: "C₆H₇KO₂",
  de: "Kaliumsorbat", es: "Sorbato de potasio", fr: "Sorbate de potassium", pt: "Sorbato de potássio",
  synonyms: ["E202"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Food preservative (inhibits mold, yeast)" },
  storage: { cabinet: "General storage", temp: "Room temperature, dry", ventilation: "Normal", incompatible: [] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Potassium sorbate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Ascorbic Acid"] = {
  cas: "50-81-7", formula: "C₆H₈O₆",
  de: "Ascorbinsäure", es: "Ácido ascórbico", fr: "Acide ascorbique", pt: "Ácido ascórbico",
  synonyms: ["Vitamin C", "E300"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Vitamin, antioxidant, food additive" },
  storage: { cabinet: "General storage (light-sensitive)", temp: "Cool, dry, dark", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Ascorbic acid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Generally safe." }
};

// ===== MORE INDUSTRIAL SOLVENTS =====

chemicalHazardDB["N-Methyl-2-pyrrolidone"] = {
  cas: "872-50-4", formula: "C₅H₉NO",
  de: "N-Methyl-2-pyrrolidon", es: "N-Metil-2-pirrolidona", fr: "N-Méthyl-2-pyrrolidone", pt: "N-Metil-2-pirrolidona",
  synonyms: ["NMP", "1-Methyl-2-pyrrolidone"],
  classes: ["irritant", "health"],
  ghs: ["GHS07", "GHS08"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H360D", text: "May damage the unborn child" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl gloves (penetrates many gloves)" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Industrial solvent, paint stripper. Penetrates skin." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Strong acids"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "N-Methyl-2-pyrrolidone" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash immediately.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Tetrahydrofuran"] = {
  cas: "109-99-9", formula: "C₄H₈O",
  de: "Tetrahydrofuran", es: "Tetrahidrofurano", fr: "Tétrahydrofurane", pt: "Tetra-hidrofurano",
  synonyms: ["THF", "Oxolane"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" },
    { code: "EUH019", text: "May form explosive peroxides" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Butyl gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Peroxide former - check before use. PVC cement solvent." },
  storage: { cabinet: "Flammable cabinet (peroxide former)", temp: "Cool, dark", ventilation: "Good", incompatible: ["Oxidizers", "Air (peroxides)"] },
  transport: { un: "2056", class: "3", packingGroup: "II", properShipping: "Tetrahydrofuran" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Cyclohexane"] = {
  cas: "110-82-7", formula: "C₆H₁₂",
  de: "Cyclohexan", es: "Ciclohexano", fr: "Cyclohexane", pt: "Ciclo-hexano",
  synonyms: ["Hexanaphthene", "Hexamethylene"],
  classes: ["flammable", "irritant", "health", "environmental"],
  ghs: ["GHS02", "GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Nylon production, solvent" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers"] },
  transport: { un: "1145", class: "3", packingGroup: "II", properShipping: "Cyclohexane" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Propylene Glycol"] = {
  cas: "57-55-6", formula: "C₃H₈O₂",
  de: "Propylenglykol", es: "Propilenglicol", fr: "Propylène glycol", pt: "Propilenoglicol",
  synonyms: ["1,2-Propanediol", "PG", "MPG"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Not required" }, other: "Food grade available. Antifreeze (non-toxic), food additive, cosmetics." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Propylene glycol" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Generally safe." }
};

chemicalHazardDB["Ethylene Glycol"] = {
  cas: "107-21-1", formula: "C₂H₆O₂",
  de: "Ethylenglykol", es: "Etilenglicol", fr: "Éthylène glycol", pt: "Etilenoglicol",
  synonyms: ["1,2-Ethanediol", "MEG", "Antifreeze"],
  classes: ["toxic"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves" }, respiratory: { required: false, type: "Not required" }, other: "TOXIC if ingested (metabolizes to oxalic acid). Automotive antifreeze." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong acids"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Ethylene glycol" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "POISON. IMMEDIATE medical attention. Give ethanol as antidote." }
};

// ===== CLEANING & SANITIZING =====

chemicalHazardDB["Quaternary Ammonium Compounds"] = {
  cas: "Various", formula: "R₄N⁺X⁻",
  de: "Quartäre Ammoniumverbindungen", es: "Compuestos de amonio cuaternario", fr: "Composés d'ammonium quaternaire", pt: "Compostos de amônio quaternário",
  synonyms: ["Quats", "QACs", "Benzalkonium chloride"],
  classes: ["corrosive", "irritant", "environmental"],
  ghs: ["GHS05", "GHS07", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Rubber gloves" }, respiratory: { required: false, type: "Not required" }, other: "Disinfectants, sanitizers. NEVER mix with bleach." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Oxidizers", "Anionic surfactants", "Bleach"] },
  transport: { un: "1760", class: "8", packingGroup: "II", properShipping: "Corrosive liquid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min.", ingestion: "Rinse mouth. Drink water. Medical attention." }
};

chemicalHazardDB["Peracetic Acid"] = {
  cas: "79-21-0", formula: "CH₃CO₃H",
  de: "Peressigsäure", es: "Ácido peracético", fr: "Acide peracétique", pt: "Ácido peracético",
  synonyms: ["PAA", "Peroxyacetic acid"],
  classes: ["oxidizer", "corrosive", "flammable"],
  ghs: ["GHS02", "GHS03", "GHS05", "GHS07", "GHS09"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H242", text: "Heating may cause a fire" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber gloves, suit" }, respiratory: { required: true, type: "Organic vapor/acid gas respirator" }, other: "Powerful sanitizer/sterilant. Food safe at low concentrations." },
  storage: { cabinet: "Oxidizer cabinet (cool)", temp: "Refrigerated <8°C preferred", ventilation: "Well-ventilated", incompatible: ["Organics", "Metals", "Reducing agents", "Heat"] },
  transport: { un: "3105", class: "5.2", packingGroup: "N/A", properShipping: "Organic peroxide type D" },
  firstAid: { inhalation: "Fresh air. Oxygen. Medical attention.", skin: "Flush 20 min.", eyes: "Flush 30 min. IMMEDIATE medical attention.", ingestion: "Rinse mouth. Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Sodium Percarbonate"] = {
  cas: "15630-89-4", formula: "2Na₂CO₃·3H₂O₂",
  de: "Natriumpercarbonat", es: "Percarbonato de sodio", fr: "Percarbonate de sodium", pt: "Percarbonato de sódio",
  synonyms: ["Oxygen bleach", "Sodium carbonate peroxyhydrate"],
  classes: ["oxidizer", "irritant"],
  ghs: ["GHS03", "GHS07"],
  hazardStatements: [
    { code: "H272", text: "May intensify fire; oxidizer" },
    { code: "H318", text: "Causes serious eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Laundry booster, deck cleaner. Releases H₂O₂ in water." },
  storage: { cabinet: "Oxidizer storage (dry)", temp: "Cool, dry", ventilation: "Normal", incompatible: ["Reducing agents", "Acids", "Organics"] },
  transport: { un: "3378", class: "5.1", packingGroup: "II", properShipping: "Sodium percarbonate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Drink water." }
};

// ===== GASES & REFRIGERANTS =====

chemicalHazardDB["Carbon Dioxide"] = {
  cas: "124-38-9", formula: "CO₂",
  de: "Kohlendioxid", es: "Dióxido de carbono", fr: "Dioxyde de carbone", pt: "Dióxido de carbono",
  synonyms: ["CO2", "Carbonic acid gas", "Dry ice (solid)"],
  classes: ["gas"],
  ghs: ["GHS04"],
  hazardStatements: [
    { code: "H280", text: "Contains gas under pressure; may explode if heated" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Insulated gloves (dry ice)" }, respiratory: { required: true, type: "SCBA in confined spaces" }, other: "Asphyxiant in high concentrations. Dry ice causes frostbite." },
  storage: { cabinet: "Compressed gas storage", temp: "Below 52°C for cylinders", ventilation: "Well-ventilated (sinks to floor)", incompatible: [] },
  transport: { un: "1013", class: "2.2", packingGroup: "N/A", properShipping: "Carbon dioxide" },
  firstAid: { inhalation: "Fresh air. Oxygen. CPR if needed.", skin: "For dry ice: warm slowly. Do not rub.", eyes: "Flush with warm water.", ingestion: "N/A (gas)." }
};

chemicalHazardDB["Nitrogen Gas"] = {
  cas: "7727-37-9", formula: "N₂",
  de: "Stickstoff", es: "Nitrógeno", fr: "Azote", pt: "Nitrogênio",
  synonyms: ["N2", "Liquid nitrogen (LN2)"],
  classes: ["gas"],
  ghs: ["GHS04"],
  hazardStatements: [
    { code: "H280", text: "Contains gas under pressure; may explode if heated" },
    { code: "H281", text: "Contains refrigerated gas; may cause cryogenic burns or injury" }
  ],
  ppe: { eyes: { required: true, type: "Face shield (liquid)" }, skin: { required: true, type: "Cryogenic gloves (liquid)" }, respiratory: { required: true, type: "SCBA in confined spaces" }, other: "ASPHYXIANT. Liquid nitrogen: -196°C, extreme frostbite hazard." },
  storage: { cabinet: "Compressed gas/cryogenic storage", temp: "Per cylinder specs", ventilation: "Well-ventilated (critical)", incompatible: [] },
  transport: { un: "1066", class: "2.2", packingGroup: "N/A", properShipping: "Nitrogen, compressed" },
  firstAid: { inhalation: "Fresh air. Oxygen. CPR if needed.", skin: "For cryogenic: warm slowly with water.", eyes: "Flush with warm water.", ingestion: "N/A." }
};

chemicalHazardDB["Argon"] = {
  cas: "7440-37-1", formula: "Ar",
  de: "Argon", es: "Argón", fr: "Argon", pt: "Argônio",
  synonyms: [],
  classes: ["gas"],
  ghs: ["GHS04"],
  hazardStatements: [
    { code: "H280", text: "Contains gas under pressure; may explode if heated" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Cryogenic gloves if liquid" }, respiratory: { required: true, type: "SCBA in confined spaces" }, other: "Asphyxiant. Welding shielding gas." },
  storage: { cabinet: "Compressed gas storage", temp: "Below 52°C", ventilation: "Well-ventilated", incompatible: [] },
  transport: { un: "1006", class: "2.2", packingGroup: "N/A", properShipping: "Argon, compressed" },
  firstAid: { inhalation: "Fresh air. Oxygen.", skin: "Warm slowly (liquid).", eyes: "Flush.", ingestion: "N/A." }
};

chemicalHazardDB["Propane"] = {
  cas: "74-98-6", formula: "C₃H₈",
  de: "Propan", es: "Propano", fr: "Propane", pt: "Propano",
  synonyms: ["LPG", "LP gas", "R-290"],
  classes: ["flammable", "gas"],
  ghs: ["GHS02", "GHS04"],
  hazardStatements: [
    { code: "H220", text: "Extremely flammable gas" },
    { code: "H280", text: "Contains gas under pressure; may explode if heated" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Insulated gloves" }, respiratory: { required: true, type: "SCBA in confined spaces" }, other: "Heavier than air - collects in low areas. Fuel gas." },
  storage: { cabinet: "Flammable gas storage (outdoor preferred)", temp: "Below 52°C", ventilation: "Well-ventilated, no ignition sources", incompatible: ["Oxidizers"] },
  transport: { un: "1978", class: "2.1", packingGroup: "N/A", properShipping: "Propane" },
  firstAid: { inhalation: "Fresh air. Oxygen.", skin: "Warm slowly (frostbite from liquid).", eyes: "Flush.", ingestion: "N/A." }
};

chemicalHazardDB["Butane"] = {
  cas: "106-97-8", formula: "C₄H₁₀",
  de: "Butan", es: "Butano", fr: "Butane", pt: "Butano",
  synonyms: ["n-Butane", "R-600"],
  classes: ["flammable", "gas"],
  ghs: ["GHS02", "GHS04"],
  hazardStatements: [
    { code: "H220", text: "Extremely flammable gas" },
    { code: "H280", text: "Contains gas under pressure; may explode if heated" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Insulated gloves" }, respiratory: { required: true, type: "SCBA in confined spaces" }, other: "Lighter fuel, aerosol propellant. Heavier than air." },
  storage: { cabinet: "Flammable gas storage", temp: "Below 52°C", ventilation: "Well-ventilated", incompatible: ["Oxidizers"] },
  transport: { un: "1011", class: "2.1", packingGroup: "N/A", properShipping: "Butane" },
  firstAid: { inhalation: "Fresh air.", skin: "Warm slowly.", eyes: "Flush.", ingestion: "N/A." }
};

chemicalHazardDB["R-134a"] = {
  cas: "811-97-2", formula: "CF₃CH₂F",
  de: "R-134a", es: "R-134a", fr: "R-134a", pt: "R-134a",
  synonyms: ["HFC-134a", "Tetrafluoroethane", "1,1,1,2-Tetrafluoroethane"],
  classes: ["gas"],
  ghs: ["GHS04"],
  hazardStatements: [
    { code: "H280", text: "Contains gas under pressure; may explode if heated" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Insulated gloves" }, respiratory: { required: true, type: "SCBA in confined spaces" }, other: "Automotive A/C refrigerant. Asphyxiant. Frostbite hazard." },
  storage: { cabinet: "Compressed gas storage", temp: "Below 52°C", ventilation: "Well-ventilated", incompatible: ["Alkali metals", "Aluminum"] },
  transport: { un: "3159", class: "2.2", packingGroup: "N/A", properShipping: "1,1,1,2-Tetrafluoroethane" },
  firstAid: { inhalation: "Fresh air. Oxygen.", skin: "Warm slowly.", eyes: "Flush with warm water.", ingestion: "N/A." }
};

// ===== ADHESIVES & COATINGS =====

chemicalHazardDB["Epoxy Resin"] = {
  cas: "25068-38-6", formula: "Various",
  de: "Epoxidharz", es: "Resina epoxi", fr: "Résine époxy", pt: "Resina epóxi",
  synonyms: ["Bisphenol A diglycidyl ether", "BADGE"],
  classes: ["irritant", "health"],
  ghs: ["GHS07", "GHS08"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H411", text: "Toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves (double)" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Strong sensitizer - can develop allergy with repeated exposure." },
  storage: { cabinet: "General storage", temp: "Cool", ventilation: "Normal", incompatible: ["Strong acids", "Strong bases", "Amines (curing agents)"] },
  transport: { un: "3082", class: "9", packingGroup: "III", properShipping: "Environmentally hazardous substance" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with soap. Remove cured material with solvent.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Polyurethane"] = {
  cas: "Various", formula: "Various",
  de: "Polyurethan", es: "Poliuretano", fr: "Polyuréthane", pt: "Poliuretano",
  synonyms: ["PU", "PUR", "Isocyanate-based"],
  classes: ["irritant", "health"],
  ghs: ["GHS07", "GHS08"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H334", text: "May cause allergy or asthma symptoms or breathing difficulties if inhaled" },
    { code: "H351", text: "Suspected of causing cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves, long sleeves" }, respiratory: { required: true, type: "Supplied air or isocyanate-rated respirator" }, other: "Contains isocyanates - potent sensitizer. Spray foam, coatings." },
  storage: { cabinet: "Flammable cabinet (for solvents)", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Water", "Amines", "Alcohols"] },
  transport: { un: "Varies", class: "Varies", packingGroup: "Varies", properShipping: "Varies by formulation" },
  firstAid: { inhalation: "Fresh air. Medical attention for breathing difficulty.", skin: "Wash immediately.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Cyanoacrylate"] = {
  cas: "7085-85-0", formula: "C₆H₇NO₂",
  de: "Cyanacrylat", es: "Cianoacrilato", fr: "Cyanoacrylate", pt: "Cianoacrilato",
  synonyms: ["Super glue", "Instant adhesive", "Krazy Glue"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "EUH202", text: "Cyanoacrylate. Danger. Bonds skin and eyes in seconds." }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Ventilation" }, other: "Bonds skin instantly. Do not force apart - use acetone or warm soapy water." },
  storage: { cabinet: "General storage (cool)", temp: "Refrigerated extends life", ventilation: "Normal", incompatible: ["Water", "Bases", "Alcohols"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Cyanoacrylate adhesive" },
  firstAid: { inhalation: "Fresh air.", skin: "Do NOT pull apart. Soak in warm soapy water or acetone.", eyes: "Do NOT force open. Flush. IMMEDIATE medical attention.", ingestion: "Do NOT induce vomiting. Medical attention." }
};

// ===== ADDITIONAL COMMON INDUSTRIAL =====

chemicalHazardDB["Phenol"] = {
  cas: "108-95-2", formula: "C₆H₅OH",
  de: "Phenol", es: "Fenol", fr: "Phénol", pt: "Fenol",
  synonyms: ["Carbolic acid", "Hydroxybenzene", "Phenic acid"],
  classes: ["toxic", "corrosive"],
  ghs: ["GHS05", "GHS06", "GHS08"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H341", text: "Suspected of causing genetic defects" },
    { code: "H373", text: "May cause damage to organs" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber gloves, full suit" }, respiratory: { required: true, type: "Organic vapor/P100 respirator" }, other: "ABSORBS THROUGH SKIN. Can cause systemic poisoning. Local anesthetic effect masks injury." },
  storage: { cabinet: "Toxic storage", temp: "Above 43°C (melting point)", ventilation: "Well-ventilated", incompatible: ["Oxidizers", "Bases", "Calcium hypochlorite"] },
  transport: { un: "1671", class: "6.1", packingGroup: "II", properShipping: "Phenol, solid/molten" },
  firstAid: { inhalation: "Fresh air. Oxygen. Medical attention.", skin: "Wipe with PEG 300 or glycerol, then wash. Medical attention.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Do NOT vomit. IMMEDIATE medical attention." }
};

chemicalHazardDB["Aniline"] = {
  cas: "62-53-3", formula: "C₆H₅NH₂",
  de: "Anilin", es: "Anilina", fr: "Aniline", pt: "Anilina",
  synonyms: ["Aminobenzene", "Phenylamine"],
  classes: ["toxic", "health", "environmental"],
  ghs: ["GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H341", text: "Suspected of causing genetic defects" },
    { code: "H351", text: "Suspected of causing cancer" },
    { code: "H372", text: "Causes damage to organs" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber gloves, full suit" }, respiratory: { required: true, type: "Organic vapor/P100 respirator" }, other: "ABSORBS THROUGH SKIN. Causes methemoglobinemia (blue baby syndrome). Dye intermediate." },
  storage: { cabinet: "Toxic storage", temp: "Cool, dark", ventilation: "Well-ventilated", incompatible: ["Oxidizers", "Acids", "Halogens"] },
  transport: { un: "1547", class: "6.1", packingGroup: "II", properShipping: "Aniline" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Remove clothing. Wash 20 min. Medical attention.", eyes: "Flush 30 min.", ingestion: "Rinse mouth. IMMEDIATE medical attention." }
};

chemicalHazardDB["Hydrazine"] = {
  cas: "302-01-2", formula: "N₂H₄",
  de: "Hydrazin", es: "Hidrazina", fr: "Hydrazine", pt: "Hidrazina",
  synonyms: ["Diamine", "Diazane"],
  classes: ["toxic", "corrosive", "flammable", "health", "environmental"],
  ghs: ["GHS02", "GHS05", "GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H350", text: "May cause cancer" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield + goggles" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "Supplied air" }, other: "CARCINOGEN. Rocket fuel, boiler water treatment. Extremely hazardous." },
  storage: { cabinet: "Toxic/flammable storage", temp: "Cool", ventilation: "Explosion-proof", incompatible: ["Oxidizers", "Metals", "Acids", "Halogens"] },
  transport: { un: "2029", class: "8 (6.1)", packingGroup: "I", properShipping: "Hydrazine, anhydrous" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Remove clothing. Flush 30 min. Medical attention.", eyes: "Flush 30 min. IMMEDIATE medical attention.", ingestion: "Rinse mouth. IMMEDIATE medical attention." }
};

chemicalHazardDB["Acrolein"] = {
  cas: "107-02-8", formula: "C₃H₄O",
  de: "Acrolein", es: "Acroleína", fr: "Acroléine", pt: "Acroleína",
  synonyms: ["Acrylaldehyde", "Propenal", "2-Propenal"],
  classes: ["toxic", "flammable", "environmental"],
  ghs: ["GHS02", "GHS05", "GHS06", "GHS09"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield + goggles" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "Supplied air" }, other: "EXTREMELY TOXIC tear gas. Low odor threshold but causes rapid eye/lung damage." },
  storage: { cabinet: "Toxic/flammable storage (separate)", temp: "Cool", ventilation: "Explosion-proof", incompatible: ["Oxidizers", "Acids", "Bases", "Amines"] },
  transport: { un: "1092", class: "6.1 (3)", packingGroup: "I", properShipping: "Acrolein, stabilized" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Remove clothing. Flush 30 min.", eyes: "Flush 30 min. IMMEDIATE medical attention.", ingestion: "Rinse mouth. IMMEDIATE medical attention." }
};

chemicalHazardDB["Phosgene"] = {
  cas: "75-44-5", formula: "COCl₂",
  de: "Phosgen", es: "Fosgeno", fr: "Phosgène", pt: "Fosgênio",
  synonyms: ["Carbonyl chloride", "Carbon oxychloride"],
  classes: ["toxic"],
  ghs: ["GHS04", "GHS06"],
  hazardStatements: [
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H330", text: "Fatal if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield + goggles" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "SCBA" }, other: "WWI chemical weapon. Delayed pulmonary edema (hours after exposure). Pleasant hay-like odor is DANGEROUS." },
  storage: { cabinet: "Highly toxic gas storage", temp: "Cool", ventilation: "Special ventilation", incompatible: ["Water", "Bases", "Amines", "Alcohols"] },
  transport: { un: "1076", class: "2.3", packingGroup: "N/A", properShipping: "Phosgene" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE hospitalization (delayed symptoms). Rest for 48 hours minimum.", skin: "Remove clothing. Flush.", eyes: "Flush 30 min.", ingestion: "N/A (gas)." }
};

// ===== SURFACTANTS & DETERGENTS =====

chemicalHazardDB["Sodium Lauryl Sulfate"] = {
  cas: "151-21-3", formula: "C₁₂H₂₅NaO₄S",
  de: "Natriumlaurylsulfat", es: "Laurilsulfato de sodio", fr: "Laurylsulfate de sodium", pt: "Lauril sulfato de sódio",
  synonyms: ["SLS", "Sodium dodecyl sulfate", "SDS"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Common in shampoo, toothpaste, detergents. Foaming agent." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong acids"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Sodium lauryl sulfate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Drink water." }
};

chemicalHazardDB["Triton X-100"] = {
  cas: "9002-93-1", formula: "C₁₄H₂₂O(C₂H₄O)n",
  de: "Triton X-100", es: "Tritón X-100", fr: "Triton X-100", pt: "Triton X-100",
  synonyms: ["Octylphenol ethoxylate", "Polyethylene glycol octylphenyl ether"],
  classes: ["irritant", "environmental"],
  ghs: ["GHS07", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H411", text: "Toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Not required" }, other: "Laboratory detergent, cell lysis agent" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Triton X-100" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

// ===== ELECTROPLATING & METAL FINISHING =====

chemicalHazardDB["Chromic Acid"] = {
  cas: "7738-94-5", formula: "H₂CrO₄",
  de: "Chromsäure", es: "Ácido crómico", fr: "Acide chromique", pt: "Ácido crômico",
  synonyms: ["Chromium trioxide solution", "Chromium(VI) acid"],
  classes: ["oxidizer", "corrosive", "toxic", "health", "environmental"],
  ghs: ["GHS03", "GHS05", "GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H271", text: "May cause fire or explosion; strong oxidizer" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H334", text: "May cause allergy or asthma symptoms if inhaled" },
    { code: "H340", text: "May cause genetic defects" },
    { code: "H350", text: "May cause cancer" },
    { code: "H361f", text: "Suspected of damaging fertility" },
    { code: "H372", text: "Causes damage to organs" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield + goggles" }, skin: { required: true, type: "Full chemical suit, neoprene gloves" }, respiratory: { required: true, type: "Supplied air or P100 with acid gas" }, other: "CARCINOGEN. Chrome plating. Extremely hazardous." },
  storage: { cabinet: "Oxidizer/carcinogen storage", temp: "Cool", ventilation: "Local exhaust", incompatible: ["Organics", "Reducing agents", "Flammables", "Bases"] },
  transport: { un: "1463", class: "5.1", packingGroup: "I", properShipping: "Chromium trioxide, anhydrous" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Remove clothing. Flush 30 min. Ascorbic acid solution may help.", eyes: "Flush 30 min. IMMEDIATE medical attention.", ingestion: "Rinse mouth. Ascorbic acid as antidote. IMMEDIATE medical attention." }
};

chemicalHazardDB["Nickel Sulfate"] = {
  cas: "7786-81-4", formula: "NiSO₄",
  de: "Nickelsulfat", es: "Sulfato de níquel", fr: "Sulfate de nickel", pt: "Sulfato de níquel",
  synonyms: ["Nickelous sulfate"],
  classes: ["toxic", "health", "environmental"],
  ghs: ["GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H334", text: "May cause allergy or asthma if inhaled" },
    { code: "H341", text: "Suspected of causing genetic defects" },
    { code: "H350i", text: "May cause cancer by inhalation" },
    { code: "H360D", text: "May damage the unborn child" },
    { code: "H372", text: "Causes damage to organs" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "P100 respirator" }, other: "CARCINOGEN/sensitizer. Nickel plating solution." },
  storage: { cabinet: "Toxic storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Strong bases"] },
  transport: { un: "3077", class: "9", packingGroup: "III", properShipping: "Environmentally hazardous substance" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash. Watch for allergic reaction.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
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
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Galvanizing, dietary supplement, fertilizer" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases"] },
  transport: { un: "3077", class: "9", packingGroup: "III", properShipping: "Environmentally hazardous substance" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Cadmium Chloride"] = {
  cas: "10108-64-2", formula: "CdCl₂",
  de: "Cadmiumchlorid", es: "Cloruro de cadmio", fr: "Chlorure de cadmium", pt: "Cloreto de cádmio",
  synonyms: [],
  classes: ["toxic", "health", "environmental"],
  ghs: ["GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H340", text: "May cause genetic defects" },
    { code: "H350", text: "May cause cancer" },
    { code: "H360FD", text: "May damage fertility and unborn child" },
    { code: "H372", text: "Causes damage to organs" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves, suit" }, respiratory: { required: true, type: "P100 or supplied air" }, other: "CARCINOGEN. Cadmium plating. Extremely toxic cumulative poison." },
  storage: { cabinet: "Toxic/carcinogen storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Strong oxidizers", "Sulfur"] },
  transport: { un: "2570", class: "6.1", packingGroup: "II", properShipping: "Cadmium compound" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Wash thoroughly.", eyes: "Flush 20 min.", ingestion: "Rinse mouth. IMMEDIATE medical attention." }
};

chemicalHazardDB["Tin(II) Chloride"] = {
  cas: "7772-99-8", formula: "SnCl₂",
  de: "Zinn(II)-chlorid", es: "Cloruro de estaño(II)", fr: "Chlorure d'étain(II)", pt: "Cloreto de estanho(II)",
  synonyms: ["Stannous chloride", "Tin dichloride"],
  classes: ["corrosive", "irritant"],
  ghs: ["GHS05", "GHS07"],
  hazardStatements: [
    { code: "H290", text: "May be corrosive to metals" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H314", text: "Causes severe skin burns and eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Rubber gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Tin plating, reducing agent, mordant" },
  storage: { cabinet: "Corrosive storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Oxidizers", "Bases"] },
  transport: { un: "3260", class: "8", packingGroup: "II", properShipping: "Corrosive solid, acidic" },
  firstAid: { inhalation: "Fresh air.", skin: "Flush 15 min.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

// ===== BATTERY CHEMICALS =====

chemicalHazardDB["Lead Acid"] = {
  cas: "7439-92-1", formula: "Pb + H₂SO₄",
  de: "Bleisäure", es: "Ácido de plomo", fr: "Acide de plomb", pt: "Ácido de chumbo",
  synonyms: ["Battery acid", "Lead-acid electrolyte"],
  classes: ["corrosive", "toxic", "health", "environmental"],
  ghs: ["GHS05", "GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H360Df", text: "May damage unborn child, suspected fertility damage" },
    { code: "H373", text: "May cause damage to organs" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "PVC or rubber gloves, apron" }, respiratory: { required: true, type: "Acid gas respirator" }, other: "Contains lead (reproductive toxin) and sulfuric acid. Car batteries." },
  storage: { cabinet: "Acid cabinet", temp: "Room temperature", ventilation: "Good (hydrogen gas)", incompatible: ["Bases", "Metals", "Organics"] },
  transport: { un: "2794", class: "8", packingGroup: "N/A", properShipping: "Batteries, wet, filled with acid" },
  firstAid: { inhalation: "Fresh air.", skin: "Flush 20 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Lithium Hexafluorophosphate"] = {
  cas: "21324-40-3", formula: "LiPF₆",
  de: "Lithiumhexafluorophosphat", es: "Hexafluorofosfato de litio", fr: "Hexafluorophosphate de lithium", pt: "Hexafluorofosfato de lítio",
  synonyms: ["LiPF6", "Lithium-ion electrolyte salt"],
  classes: ["corrosive", "toxic"],
  ghs: ["GHS05", "GHS06"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "EUH014", text: "Reacts violently with water" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber gloves" }, respiratory: { required: true, type: "Acid gas respirator" }, other: "Li-ion battery electrolyte. Reacts with water to form HF (extremely toxic)." },
  storage: { cabinet: "Toxic/corrosive storage (dry)", temp: "Cool, dry", ventilation: "Dry atmosphere", incompatible: ["Water", "Alcohols", "Strong bases"] },
  transport: { un: "3090", class: "9", packingGroup: "N/A", properShipping: "Lithium metal batteries" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention (HF exposure).", skin: "Flush 20 min. Calcium gluconate gel.", eyes: "Flush 30 min. IMMEDIATE medical attention.", ingestion: "Rinse mouth. IMMEDIATE medical attention." }
};

// ===== DYES & PIGMENTS =====

chemicalHazardDB["Methylene Blue"] = {
  cas: "61-73-4", formula: "C₁₆H₁₈ClN₃S",
  de: "Methylenblau", es: "Azul de metileno", fr: "Bleu de méthylène", pt: "Azul de metileno",
  synonyms: ["Methylthioninium chloride", "Swiss blue"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Stains skin blue. Medical dye, aquarium treatment, antidote for cyanide/methemoglobin." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong reducing agents"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Methylene blue" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash (staining temporary).", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention if large amount." }
};

chemicalHazardDB["Crystal Violet"] = {
  cas: "548-62-9", formula: "C₂₅H₃₀ClN₃",
  de: "Kristallviolett", es: "Violeta de cristal", fr: "Violet cristallisé", pt: "Violeta cristal",
  synonyms: ["Gentian violet", "Methyl violet 10B"],
  classes: ["toxic", "health"],
  ghs: ["GHS07", "GHS08"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H351", text: "Suspected of causing cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Gram stain, antifungal. Stains intensely. Suspected carcinogen." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Crystal violet" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Iron Oxide Red"] = {
  cas: "1309-37-1", formula: "Fe₂O₃",
  de: "Eisenoxidrot", es: "Óxido de hierro rojo", fr: "Oxyde de fer rouge", pt: "Óxido de ferro vermelho",
  synonyms: ["Ferric oxide", "Hematite", "Rust", "CI Pigment Red 101"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Common red pigment, cosmetics, food colorant (E172)" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Aluminum powder", "Strong reducing agents"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Iron oxide" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Carbon Black"] = {
  cas: "1333-86-4", formula: "C",
  de: "Ruß", es: "Negro de carbón", fr: "Noir de carbone", pt: "Negro de fumo",
  synonyms: ["Lamp black", "Furnace black", "Channel black"],
  classes: ["health"],
  ghs: ["GHS08"],
  hazardStatements: [
    { code: "H351", text: "Suspected of causing cancer" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "P100 respirator" }, other: "Tire filler, pigment. IARC Group 2B carcinogen." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Carbon black" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

// ===== PLASTICIZERS & POLYMER ADDITIVES =====

chemicalHazardDB["Dioctyl Phthalate"] = {
  cas: "117-81-7", formula: "C₂₄H₃₈O₄",
  de: "Dioctylphthalat", es: "Ftalato de dioctilo", fr: "Phtalate de dioctyle", pt: "Ftalato de dioctila",
  synonyms: ["DOP", "DEHP", "Di(2-ethylhexyl) phthalate", "Bis(2-ethylhexyl) phthalate"],
  classes: ["health", "environmental"],
  ghs: ["GHS08", "GHS09"],
  hazardStatements: [
    { code: "H360FD", text: "May damage fertility and unborn child" },
    { code: "H411", text: "Toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Not required" }, other: "PVC plasticizer. Endocrine disruptor. Being phased out in many applications." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong acids"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Dioctyl phthalate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Tributyl Phosphate"] = {
  cas: "126-73-8", formula: "(C₄H₉O)₃PO",
  de: "Tributylphosphat", es: "Fosfato de tributilo", fr: "Phosphate de tributyle", pt: "Fosfato de tributila",
  synonyms: ["TBP"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Ventilation" }, other: "Plasticizer, solvent, nuclear fuel reprocessing" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Tributyl phosphate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

// ===== FLAME RETARDANTS =====

chemicalHazardDB["Antimony Trioxide"] = {
  cas: "1309-64-4", formula: "Sb₂O₃",
  de: "Antimontrioxid", es: "Trióxido de antimonio", fr: "Trioxyde d'antimoine", pt: "Trióxido de antimônio",
  synonyms: ["Antimony(III) oxide", "Antimonous oxide"],
  classes: ["health"],
  ghs: ["GHS08"],
  hazardStatements: [
    { code: "H351", text: "Suspected of causing cancer" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "P100 respirator" }, other: "Flame retardant synergist. IARC Group 2B carcinogen (inhalation)." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Strong acids", "Halogens"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Antimony trioxide" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Aluminum Hydroxide"] = {
  cas: "21645-51-2", formula: "Al(OH)₃",
  de: "Aluminiumhydroxid", es: "Hidróxido de aluminio", fr: "Hydroxyde d'aluminium", pt: "Hidróxido de alumínio",
  synonyms: ["Alumina trihydrate", "ATH", "Gibbsite"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Non-toxic flame retardant, antacid (Maalox)" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids", "Strong bases"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Aluminum hydroxide" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Generally safe." }
};

// ===== MORE ORGANIC ACIDS =====

chemicalHazardDB["Formic Acid"] = {
  cas: "64-18-6", formula: "HCOOH",
  de: "Ameisensäure", es: "Ácido fórmico", fr: "Acide formique", pt: "Ácido fórmico",
  synonyms: ["Methanoic acid", "Hydrogen carboxylic acid"],
  classes: ["flammable", "corrosive"],
  ghs: ["GHS02", "GHS05", "GHS06"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H331", text: "Toxic if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "PVC or nitrile gloves" }, respiratory: { required: true, type: "Acid gas respirator" }, other: "Strongest common organic acid. Leather tanning, rubber coagulant." },
  storage: { cabinet: "Acid cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Bases", "Metals"] },
  transport: { un: "1779", class: "8", packingGroup: "II", properShipping: "Formic acid" },
  firstAid: { inhalation: "Fresh air. Oxygen. Medical attention.", skin: "Flush 20 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Oxalic Acid"] = {
  cas: "144-62-7", formula: "C₂H₂O₄",
  de: "Oxalsäure", es: "Ácido oxálico", fr: "Acide oxalique", pt: "Ácido oxálico",
  synonyms: ["Ethanedioic acid", "Wood bleach"],
  classes: ["toxic", "corrosive"],
  ghs: ["GHS05", "GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H318", text: "Causes serious eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Rust remover, wood bleach. Toxic - binds calcium." },
  storage: { cabinet: "Acid cabinet", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Silver compounds"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Oxalic acid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min. Medical attention.", ingestion: "Give calcium (milk, calcium gluconate). Medical attention." }
};

chemicalHazardDB["Lactic Acid"] = {
  cas: "50-21-5", formula: "C₃H₆O₃",
  de: "Milchsäure", es: "Ácido láctico", fr: "Acide lactique", pt: "Ácido lático",
  synonyms: ["2-Hydroxypropanoic acid", "Milk acid"],
  classes: ["irritant"],
  ghs: ["GHS05", "GHS07"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H318", text: "Causes serious eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Not required" }, other: "Food additive, cosmetics, biodegradable plastics" },
  storage: { cabinet: "Acid cabinet", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Bases"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Lactic acid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Drink water." }
};

chemicalHazardDB["Tartaric Acid"] = {
  cas: "87-69-4", formula: "C₄H₆O₆",
  de: "Weinsäure", es: "Ácido tartárico", fr: "Acide tartrique", pt: "Ácido tartárico",
  synonyms: ["2,3-Dihydroxysuccinic acid", "Cream of tartar (potassium salt)"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Wine production, food additive, baking" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Tartaric acid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Malic Acid"] = {
  cas: "6915-15-7", formula: "C₄H₆O₅",
  de: "Apfelsäure", es: "Ácido málico", fr: "Acide malique", pt: "Ácido málico",
  synonyms: ["Hydroxybutanedioic acid", "Apple acid"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Food additive (sour candy), cosmetics" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong bases"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Malic acid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

// ===== TEXTILE & LEATHER CHEMICALS =====

chemicalHazardDB["Sodium Dithionite"] = {
  cas: "7775-14-6", formula: "Na₂S₂O₄",
  de: "Natriumdithionit", es: "Ditionito de sodio", fr: "Dithionite de sodium", pt: "Ditionito de sódio",
  synonyms: ["Sodium hydrosulfite", "Blankit"],
  classes: ["flammable"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H251", text: "Self-heating: may catch fire" },
    { code: "H302", text: "Harmful if swallowed" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Reducing agent, textile bleach. Self-heats when wet - fire hazard." },
  storage: { cabinet: "Flammable solid storage (dry)", temp: "Cool, dry", ventilation: "Good", incompatible: ["Water", "Oxidizers", "Acids"] },
  transport: { un: "1384", class: "4.2", packingGroup: "II", properShipping: "Sodium dithionite" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Sodium Sulfide"] = {
  cas: "1313-82-2", formula: "Na₂S",
  de: "Natriumsulfid", es: "Sulfuro de sodio", fr: "Sulfure de sodium", pt: "Sulfeto de sódio",
  synonyms: ["Sodium monosulfide"],
  classes: ["corrosive", "toxic", "environmental"],
  ghs: ["GHS05", "GHS06", "GHS09"],
  hazardStatements: [
    { code: "H290", text: "May be corrosive to metals" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H400", text: "Very toxic to aquatic life" },
    { code: "EUH031", text: "Contact with acids liberates toxic gas (H₂S)" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Rubber gloves" }, respiratory: { required: true, type: "H₂S-rated respirator" }, other: "DANGER: Releases toxic H₂S with acids. Leather dehairing, ore processing." },
  storage: { cabinet: "Corrosive storage (separate from acids)", temp: "Dry", ventilation: "Good", incompatible: ["Acids", "Oxidizers", "Water"] },
  transport: { un: "1849", class: "8", packingGroup: "II", properShipping: "Sodium sulfide, hydrated" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention (H₂S).", skin: "Flush 20 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

// ===== SEMICONDUCTOR & ELECTRONICS =====

chemicalHazardDB["Hydrofluoric Acid"] = {
  cas: "7664-39-3", formula: "HF",
  de: "Flusssäure", es: "Ácido fluorhídrico", fr: "Acide fluorhydrique", pt: "Ácido fluorídrico",
  synonyms: ["Hydrogen fluoride", "Fluoric acid"],
  classes: ["corrosive", "toxic"],
  ghs: ["GHS05", "GHS06"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H330", text: "Fatal if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield + goggles" }, skin: { required: true, type: "Neoprene or butyl gloves, full suit, apron" }, respiratory: { required: true, type: "Supplied air or HF-rated respirator" }, other: "EXTREMELY DANGEROUS. Burns feel painless initially. Systemic fluoride poisoning. Have calcium gluconate gel on hand." },
  storage: { cabinet: "Acid cabinet (special - corrodes glass)", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Bases", "Metals", "Glass", "Concrete", "Silica"] },
  transport: { un: "1790", class: "8", packingGroup: "I", properShipping: "Hydrofluoric acid" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Flush 15 min. Apply calcium gluconate gel. IMMEDIATE medical attention.", eyes: "Flush 30 min. IMMEDIATE medical attention.", ingestion: "Give calcium (milk). IMMEDIATE medical attention." }
};

chemicalHazardDB["Phosphine"] = {
  cas: "7803-51-2", formula: "PH₃",
  de: "Phosphin", es: "Fosfina", fr: "Phosphine", pt: "Fosfina",
  synonyms: ["Hydrogen phosphide", "Phosphorus trihydride"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS04", "GHS06"],
  hazardStatements: [
    { code: "H220", text: "Extremely flammable gas" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "SCBA" }, other: "EXTREMELY TOXIC (more than CO). Semiconductor dopant, fumigant. Garlic/fish odor." },
  storage: { cabinet: "Toxic gas storage", temp: "Cool", ventilation: "Special ventilation", incompatible: ["Oxidizers", "Halogens", "Acids", "Air (spontaneously flammable when impure)"] },
  transport: { un: "2199", class: "2.3", packingGroup: "N/A", properShipping: "Phosphine" },
  firstAid: { inhalation: "Fresh air. Oxygen. CPR if needed. IMMEDIATE medical attention.", skin: "Wash.", eyes: "Flush.", ingestion: "N/A (gas)." }
};

chemicalHazardDB["Arsine"] = {
  cas: "7784-42-1", formula: "AsH₃",
  de: "Arsin", es: "Arsina", fr: "Arsine", pt: "Arsina",
  synonyms: ["Arsenic trihydride", "Hydrogen arsenide"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS04", "GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H220", text: "Extremely flammable gas" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H350", text: "May cause cancer" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "SCBA" }, other: "EXTREMELY TOXIC. Odorless to mild garlic odor. Semiconductor dopant. Destroys red blood cells." },
  storage: { cabinet: "Toxic gas storage", temp: "Cool", ventilation: "Special ventilation with monitoring", incompatible: ["Oxidizers", "Halogens", "Acids"] },
  transport: { un: "2188", class: "2.3", packingGroup: "N/A", properShipping: "Arsine" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE hospitalization. Symptoms may be delayed.", skin: "Wash.", eyes: "Flush.", ingestion: "N/A (gas)." }
};

chemicalHazardDB["Silane"] = {
  cas: "7803-62-5", formula: "SiH₄",
  de: "Silan", es: "Silano", fr: "Silane", pt: "Silano",
  synonyms: ["Monosilane", "Silicon tetrahydride"],
  classes: ["flammable"],
  ghs: ["GHS02", "GHS04"],
  hazardStatements: [
    { code: "H220", text: "Extremely flammable gas" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "EUH014", text: "Reacts violently with water" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Protective clothing" }, respiratory: { required: true, type: "SCBA in case of release" }, other: "PYROPHORIC - ignites spontaneously in air. Semiconductor manufacturing." },
  storage: { cabinet: "Pyrophoric gas storage", temp: "Cool", ventilation: "Special ventilation", incompatible: ["Air", "Water", "Halogens", "Oxidizers"] },
  transport: { un: "2203", class: "2.1", packingGroup: "N/A", properShipping: "Silane" },
  firstAid: { inhalation: "Fresh air.", skin: "In case of burn, cool with water.", eyes: "Flush.", ingestion: "N/A (gas)." }
};

// ===== WATER TREATMENT (MORE) =====

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
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Water treatment coagulant, iron supplement, moss killer" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases", "Oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Ferrous sulfate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention if large amount." }
};

chemicalHazardDB["Poly(aluminum chloride)"] = {
  cas: "1327-41-9", formula: "Al₂Cl(OH)₅",
  de: "Polyaluminiumchlorid", es: "Policloruro de aluminio", fr: "Polychlorure d'aluminium", pt: "Policloreto de alumínio",
  synonyms: ["PAC", "Aluminum chlorohydrate", "Polyaluminium chloride"],
  classes: ["corrosive"],
  ghs: ["GHS05"],
  hazardStatements: [
    { code: "H290", text: "May be corrosive to metals" },
    { code: "H314", text: "Causes severe skin burns and eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Rubber gloves" }, respiratory: { required: false, type: "Not required" }, other: "Primary water treatment coagulant. More efficient than alum." },
  storage: { cabinet: "Corrosive storage", temp: "Above freezing", ventilation: "Normal", incompatible: ["Strong bases", "Metals"] },
  transport: { un: "1760", class: "8", packingGroup: "II", properShipping: "Corrosive liquid" },
  firstAid: { inhalation: "Fresh air.", skin: "Flush 15 min.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Drink water. Medical attention." }
};

// ===== REFRIGERATION & HVAC =====

chemicalHazardDB["Ammonia (Anhydrous)"] = {
  cas: "7664-41-7", formula: "NH₃",
  de: "Ammoniak (wasserfrei)", es: "Amoníaco (anhidro)", fr: "Ammoniac (anhydre)", pt: "Amônia (anidra)",
  synonyms: ["R-717", "Anhydrous ammonia"],
  classes: ["flammable", "corrosive", "toxic", "environmental"],
  ghs: ["GHS02", "GHS04", "GHS05", "GHS06", "GHS09"],
  hazardStatements: [
    { code: "H221", text: "Flammable gas" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield + goggles" }, skin: { required: true, type: "Full chemical suit, rubber gloves" }, respiratory: { required: true, type: "Ammonia-rated respirator or SCBA" }, other: "Industrial refrigerant (R-717). Sharp pungent odor. Severe eye/lung damage." },
  storage: { cabinet: "Toxic/corrosive gas storage", temp: "Below 52°C", ventilation: "Special ventilation with monitors", incompatible: ["Acids", "Oxidizers", "Halogens", "Calcium hypochlorite"] },
  transport: { un: "1005", class: "2.3", packingGroup: "N/A", properShipping: "Ammonia, anhydrous" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Flush 30 min.", eyes: "Flush 30 min. IMMEDIATE medical attention.", ingestion: "N/A (gas)." }
};

chemicalHazardDB["R-410A"] = {
  cas: "N/A (blend)", formula: "CH₂F₂ + CHF₂CF₃",
  de: "R-410A", es: "R-410A", fr: "R-410A", pt: "R-410A",
  synonyms: ["Puron", "AZ-20", "HFC-410A"],
  classes: ["gas"],
  ghs: ["GHS04"],
  hazardStatements: [
    { code: "H280", text: "Contains gas under pressure; may explode if heated" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Insulated gloves" }, respiratory: { required: true, type: "SCBA in confined spaces" }, other: "Modern AC refrigerant replacing R-22. Asphyxiant. Frostbite hazard." },
  storage: { cabinet: "Compressed gas storage", temp: "Below 52°C", ventilation: "Well-ventilated", incompatible: ["Alkali metals"] },
  transport: { un: "3163", class: "2.2", packingGroup: "N/A", properShipping: "Liquefied gas, n.o.s." },
  firstAid: { inhalation: "Fresh air. Oxygen.", skin: "Warm slowly (frostbite).", eyes: "Flush with warm water.", ingestion: "N/A." }
};

// ===== PHARMACEUTICAL INTERMEDIATES =====

chemicalHazardDB["Benzaldehyde"] = {
  cas: "100-52-7", formula: "C₆H₅CHO",
  de: "Benzaldehyd", es: "Benzaldehído", fr: "Benzaldéhyde", pt: "Benzaldeído",
  synonyms: ["Benzoic aldehyde", "Bitter almond oil"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Ventilation" }, other: "Almond/cherry flavor, pharmaceutical intermediate" },
  storage: { cabinet: "General storage", temp: "Cool, dark", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong acids", "Strong bases"] },
  transport: { un: "1990", class: "9", packingGroup: "III", properShipping: "Benzaldehyde" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Acetonitrile"] = {
  cas: "75-05-8", formula: "CH₃CN",
  de: "Acetonitril", es: "Acetonitrilo", fr: "Acétonitrile", pt: "Acetonitrila",
  synonyms: ["Methyl cyanide", "Cyanomethane", "ACN"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "HPLC solvent. Metabolizes to cyanide in body (delayed toxicity)." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Good", incompatible: ["Oxidizers", "Acids", "Bases"] },
  transport: { un: "1648", class: "3", packingGroup: "II", properShipping: "Acetonitrile" },
  firstAid: { inhalation: "Fresh air. Medical attention (delayed cyanide toxicity).", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "IMMEDIATE medical attention (cyanide antidote may be needed)." }
};

chemicalHazardDB["Dichloromethane"] = {
  cas: "75-09-2", formula: "CH₂Cl₂",
  de: "Dichlormethan", es: "Diclorometano", fr: "Dichlorométhane", pt: "Diclorometano",
  synonyms: ["Methylene chloride", "DCM", "Methylene dichloride"],
  classes: ["health"],
  ghs: ["GHS07", "GHS08"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" },
    { code: "H351", text: "Suspected of causing cancer" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "PVA or Viton gloves (penetrates most gloves)" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Paint stripper, degreaser. Metabolizes to CO in body." },
  storage: { cabinet: "Flammable cabinet (treated as such)", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Strong bases", "Alkali metals"] },
  transport: { un: "1593", class: "6.1", packingGroup: "III", properShipping: "Dichloromethane" },
  firstAid: { inhalation: "Fresh air. Oxygen. Medical attention.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

// ===== BIOCIDES & PRESERVATIVES =====

chemicalHazardDB["Formaldehyde Solution"] = {
  cas: "50-00-0", formula: "HCHO",
  de: "Formaldehydlösung", es: "Solución de formaldehído", fr: "Solution de formaldéhyde", pt: "Solução de formaldeído",
  synonyms: ["Formalin", "Methanal", "Formol"],
  classes: ["toxic", "corrosive", "health"],
  ghs: ["GHS05", "GHS06", "GHS08"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H341", text: "Suspected of causing genetic defects" },
    { code: "H350", text: "May cause cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl rubber gloves" }, respiratory: { required: true, type: "Formaldehyde-rated respirator" }, other: "CARCINOGEN. Preservative, disinfectant. Strong sensitizer." },
  storage: { cabinet: "Toxic storage", temp: "Above 15°C (polymerizes when cold)", ventilation: "Well-ventilated", incompatible: ["Oxidizers", "Acids", "Bases", "Phenol"] },
  transport: { un: "2209", class: "8", packingGroup: "III", properShipping: "Formaldehyde solution" },
  firstAid: { inhalation: "Fresh air. Oxygen. Medical attention.", skin: "Flush 20 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Drink water/milk. Medical attention." }
};

chemicalHazardDB["Glutaraldehyde"] = {
  cas: "111-30-8", formula: "C₅H₈O₂",
  de: "Glutaraldehyd", es: "Glutaraldehído", fr: "Glutaraldéhyde", pt: "Glutaraldeído",
  synonyms: ["Glutaric dialdehyde", "Cidex", "Pentanedial"],
  classes: ["toxic", "corrosive", "health", "environmental"],
  ghs: ["GHS05", "GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H334", text: "May cause allergy or asthma if inhaled" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Nitrile or butyl gloves, apron" }, respiratory: { required: true, type: "Aldehyde-rated respirator" }, other: "Medical sterilant. Strong sensitizer - many healthcare workers allergic." },
  storage: { cabinet: "Toxic storage", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Strong bases", "Amines"] },
  transport: { un: "2922", class: "8", packingGroup: "III", properShipping: "Corrosive liquid, toxic" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Flush 20 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Drink water. Medical attention." }
};

chemicalHazardDB["Isothiazolinone"] = {
  cas: "55965-84-9", formula: "C₄H₅NOS/C₄H₄ClNOS",
  de: "Isothiazolinon", es: "Isotiazolinona", fr: "Isothiazolinone", pt: "Isotiazolinona",
  synonyms: ["MIT/CIT", "Kathon", "Methylisothiazolinone + Chloromethylisothiazolinone"],
  classes: ["toxic", "corrosive", "environmental"],
  ghs: ["GHS05", "GHS06", "GHS09"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H400", text: "Very toxic to aquatic life" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Respirator" }, other: "Preservative in paints, cosmetics, industrial fluids. Strong sensitizer." },
  storage: { cabinet: "Toxic storage", temp: "Cool", ventilation: "Good", incompatible: ["Strong oxidizers", "Reducing agents", "Amines"] },
  transport: { un: "3265", class: "8", packingGroup: "II", properShipping: "Corrosive liquid, acidic" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Flush 20 min. Medical attention.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

// ===== AEROSOL PROPELLANTS =====

chemicalHazardDB["Dimethyl Ether"] = {
  cas: "115-10-6", formula: "(CH₃)₂O",
  de: "Dimethylether", es: "Éter dimetílico", fr: "Éther diméthylique", pt: "Éter dimetílico",
  synonyms: ["DME", "Methoxymethane", "Wood ether"],
  classes: ["flammable"],
  ghs: ["GHS02", "GHS04"],
  hazardStatements: [
    { code: "H220", text: "Extremely flammable gas" },
    { code: "H280", text: "Contains gas under pressure" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Insulated gloves" }, respiratory: { required: true, type: "SCBA if high concentration" }, other: "Aerosol propellant, refrigerant. Anesthetic at high concentrations." },
  storage: { cabinet: "Flammable gas storage", temp: "Below 52°C", ventilation: "Well-ventilated", incompatible: ["Oxidizers"] },
  transport: { un: "1033", class: "2.1", packingGroup: "N/A", properShipping: "Dimethyl ether" },
  firstAid: { inhalation: "Fresh air.", skin: "Warm slowly (frostbite).", eyes: "Flush.", ingestion: "N/A." }
};

chemicalHazardDB["Isobutane"] = {
  cas: "75-28-5", formula: "C₄H₁₀",
  de: "Isobutan", es: "Isobutano", fr: "Isobutane", pt: "Isobutano",
  synonyms: ["2-Methylpropane", "R-600a"],
  classes: ["flammable"],
  ghs: ["GHS02", "GHS04"],
  hazardStatements: [
    { code: "H220", text: "Extremely flammable gas" },
    { code: "H280", text: "Contains gas under pressure" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Insulated gloves" }, respiratory: { required: true, type: "SCBA in confined spaces" }, other: "Aerosol propellant, refrigerant (R-600a in fridges)." },
  storage: { cabinet: "Flammable gas storage", temp: "Below 52°C", ventilation: "Well-ventilated", incompatible: ["Oxidizers"] },
  transport: { un: "1969", class: "2.1", packingGroup: "N/A", properShipping: "Isobutane" },
  firstAid: { inhalation: "Fresh air.", skin: "Warm slowly.", eyes: "Flush.", ingestion: "N/A." }
};

// ===== PHOTOGRAPHY (LEGACY) =====

chemicalHazardDB["Silver Bromide"] = {
  cas: "7785-23-1", formula: "AgBr",
  de: "Silberbromid", es: "Bromuro de plata", fr: "Bromure d'argent", pt: "Brometo de prata",
  synonyms: [],
  classes: ["environmental"],
  ghs: ["GHS09"],
  hazardStatements: [
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Photo film emulsion. Light sensitive. Stains skin." },
  storage: { cabinet: "General storage (dark)", temp: "Room temperature", ventilation: "Normal", incompatible: ["Light", "Ammonia", "Reducing agents"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Silver bromide" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash (staining).", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Sodium Thiosulfate"] = {
  cas: "7772-98-7", formula: "Na₂S₂O₃",
  de: "Natriumthiosulfat", es: "Tiosulfato de sodio", fr: "Thiosulfate de sodium", pt: "Tiossulfato de sódio",
  synonyms: ["Hypo", "Sodium hyposulfite", "Fixer"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Photo fixer, dechlorinator, cyanide antidote. Generally safe." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids (releases SO2)", "Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Sodium thiosulfate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

// ===== PRINTING & INK CHEMICALS =====

chemicalHazardDB["Isopropyl Alcohol"] = {
  cas: "67-63-0", formula: "C₃H₇OH",
  de: "Isopropanol", es: "Alcohol isopropílico", fr: "Alcool isopropylique", pt: "Álcool isopropílico",
  synonyms: ["IPA", "2-Propanol", "Isopropanol", "Rubbing alcohol"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves for prolonged contact" }, respiratory: { required: true, type: "Ventilation or organic vapor respirator" }, other: "Common solvent, disinfectant, printing press cleaner" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Acids"] },
  transport: { un: "1219", class: "3", packingGroup: "II", properShipping: "Isopropanol" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention if large amount." }
};

chemicalHazardDB["n-Propyl Alcohol"] = {
  cas: "71-23-8", formula: "C₃H₇OH",
  de: "n-Propanol", es: "Alcohol n-propílico", fr: "Alcool n-propylique", pt: "Álcool n-propílico",
  synonyms: ["1-Propanol", "n-Propanol", "Propan-1-ol"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H336", text: "May cause drowsiness or dizziness" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "Ventilation" }, other: "Solvent, printing inks" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers"] },
  transport: { un: "1274", class: "3", packingGroup: "II", properShipping: "n-Propanol" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Ethyl Acetate"] = {
  cas: "141-78-6", formula: "C₄H₈O₂",
  de: "Ethylacetat", es: "Acetato de etilo", fr: "Acétate d'éthyle", pt: "Acetato de etila",
  synonyms: ["EtOAc", "Ethyl ethanoate", "Acetic ether"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Nail polish remover, adhesives, coatings solvent" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Bases", "Acids"] },
  transport: { un: "1173", class: "3", packingGroup: "II", properShipping: "Ethyl acetate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Butyl Acetate"] = {
  cas: "123-86-4", formula: "C₆H₁₂O₂",
  de: "Butylacetat", es: "Acetato de butilo", fr: "Acétate de butyle", pt: "Acetato de butila",
  synonyms: ["n-Butyl acetate", "Butyl ethanoate"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H336", text: "May cause drowsiness or dizziness" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Paint/lacquer solvent, fruity odor" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Acids", "Bases"] },
  transport: { un: "1123", class: "3", packingGroup: "III", properShipping: "Butyl acetates" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

// ===== WELDING & METALWORKING =====

chemicalHazardDB["Acetylene"] = {
  cas: "74-86-2", formula: "C₂H₂",
  de: "Acetylen", es: "Acetileno", fr: "Acétylène", pt: "Acetileno",
  synonyms: ["Ethyne"],
  classes: ["flammable"],
  ghs: ["GHS02", "GHS04"],
  hazardStatements: [
    { code: "H220", text: "Extremely flammable gas" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "EUH006", text: "Explosive with or without contact with air" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Standard work gloves" }, respiratory: { required: true, type: "SCBA in confined spaces" }, other: "Welding gas. UNSTABLE - stored dissolved in acetone. Never use copper fittings (explosive acetylides)." },
  storage: { cabinet: "Flammable gas storage (upright only)", temp: "Below 52°C", ventilation: "Well-ventilated", incompatible: ["Copper", "Silver", "Mercury", "Oxidizers", "Halogens"] },
  transport: { un: "1001", class: "2.1", packingGroup: "N/A", properShipping: "Acetylene, dissolved" },
  firstAid: { inhalation: "Fresh air.", skin: "N/A.", eyes: "N/A.", ingestion: "N/A." }
};

chemicalHazardDB["Oxygen (Industrial)"] = {
  cas: "7782-44-7", formula: "O₂",
  de: "Sauerstoff", es: "Oxígeno", fr: "Oxygène", pt: "Oxigênio",
  synonyms: ["LOX (liquid)", "GOX (gas)"],
  classes: ["oxidizer"],
  ghs: ["GHS03", "GHS04"],
  hazardStatements: [
    { code: "H270", text: "May cause or intensify fire; oxidizer" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H281", text: "Contains refrigerated gas; may cause cryogenic burns" }
  ],
  ppe: { eyes: { required: true, type: "Face shield (liquid)" }, skin: { required: true, type: "Cryogenic gloves (liquid)" }, respiratory: { required: false, type: "Not required" }, other: "FIRE HAZARD - enriches combustion. Keep away from oil, grease, organics. Clean all equipment for O2 service." },
  storage: { cabinet: "Oxidizer/compressed gas storage (separate from flammables)", temp: "Below 52°C", ventilation: "Well-ventilated", incompatible: ["Flammables", "Oils", "Grease", "Organics"] },
  transport: { un: "1072", class: "2.2", packingGroup: "N/A", properShipping: "Oxygen, compressed" },
  firstAid: { inhalation: "Fresh air (prolonged exposure at high levels can cause oxygen toxicity).", skin: "For cryogenic: warm slowly.", eyes: "Flush.", ingestion: "N/A." }
};

chemicalHazardDB["Welding Flux"] = {
  cas: "Various", formula: "Various",
  de: "Schweißflussmittel", es: "Fundente de soldadura", fr: "Flux de soudage", pt: "Fluxo de soldagem",
  synonyms: ["Borax flux", "Rosin flux"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "Fume extraction or respirator" }, other: "Fumes from heated flux are irritating. Various formulations." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids", "Strong bases"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Welding flux" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

// ===== MORE CLEANING CHEMICALS =====

chemicalHazardDB["Sodium Metasilicate"] = {
  cas: "6834-92-0", formula: "Na₂SiO₃",
  de: "Natriummetasilikat", es: "Metasilicato de sodio", fr: "Métasilicate de sodium", pt: "Metassilicato de sódio",
  synonyms: ["Waterglass", "Sodium silicate"],
  classes: ["corrosive", "irritant"],
  ghs: ["GHS05", "GHS07"],
  hazardStatements: [
    { code: "H290", text: "May be corrosive to metals" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H314", text: "Causes severe skin burns and eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Rubber gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Heavy duty cleaner, concrete sealer, egg preservation" },
  storage: { cabinet: "Corrosive storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids", "Aluminum"] },
  transport: { un: "3253", class: "8", packingGroup: "II", properShipping: "Disodium trioxosilicate" },
  firstAid: { inhalation: "Fresh air.", skin: "Flush 15 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Drink water. Medical attention." }
};

chemicalHazardDB["Trisodium Phosphate"] = {
  cas: "7601-54-9", formula: "Na₃PO₄",
  de: "Trinatriumphosphat", es: "Fosfato trisódico", fr: "Phosphate trisodique", pt: "Fosfato trissódico",
  synonyms: ["TSP", "Sodium phosphate tribasic"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Rubber gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Heavy duty cleaner, paint prep. Being phased out (phosphate pollution)." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Trisodium phosphate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Drink water." }
};

chemicalHazardDB["Sodium Carbonate"] = {
  cas: "497-19-8", formula: "Na₂CO₃",
  de: "Natriumcarbonat", es: "Carbonato de sodio", fr: "Carbonate de sodium", pt: "Carbonato de sódio",
  synonyms: ["Washing soda", "Soda ash", "Sal soda"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves for prolonged contact" }, respiratory: { required: false, type: "Dust mask" }, other: "Laundry booster, water softener, pH buffer, glass making" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Sodium carbonate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Drink water." }
};

chemicalHazardDB["Sodium Bicarbonate"] = {
  cas: "144-55-8", formula: "NaHCO₃",
  de: "Natriumhydrogencarbonat", es: "Bicarbonato de sodio", fr: "Bicarbonate de sodium", pt: "Bicarbonato de sódio",
  synonyms: ["Baking soda", "Sodium hydrogen carbonate", "Bicarb"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Food grade, antacid, fire extinguishing agent, cleaning" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids (fizzes)"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Sodium bicarbonate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Generally safe." }
};

// ===== MISC INDUSTRIAL =====

chemicalHazardDB["Boric Acid"] = {
  cas: "10043-35-3", formula: "H₃BO₃",
  de: "Borsäure", es: "Ácido bórico", fr: "Acide borique", pt: "Ácido bórico",
  synonyms: ["Orthoboric acid", "Boracic acid"],
  classes: ["health"],
  ghs: ["GHS08"],
  hazardStatements: [
    { code: "H360FD", text: "May damage fertility and the unborn child" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "REPRODUCTIVE TOXIN. Pesticide, antiseptic, flame retardant, nuclear industry." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong reducing agents"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Boric acid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Borax"] = {
  cas: "1303-96-4", formula: "Na₂B₄O₇·10H₂O",
  de: "Borax", es: "Bórax", fr: "Borax", pt: "Bórax",
  synonyms: ["Sodium tetraborate", "Sodium borate"],
  classes: ["health"],
  ghs: ["GHS08"],
  hazardStatements: [
    { code: "H360FD", text: "May damage fertility and the unborn child" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "REPRODUCTIVE TOXIN. Laundry booster, flux, slime ingredient." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Borax" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Sodium Nitrate"] = {
  cas: "7631-99-4", formula: "NaNO₃",
  de: "Natriumnitrat", es: "Nitrato de sodio", fr: "Nitrate de sodium", pt: "Nitrato de sódio",
  synonyms: ["Chile saltpeter", "Soda niter"],
  classes: ["oxidizer"],
  ghs: ["GHS03"],
  hazardStatements: [
    { code: "H272", text: "May intensify fire; oxidizer" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Fertilizer, food preservative (E251), heat storage medium" },
  storage: { cabinet: "Oxidizer storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Reducing agents", "Organics", "Metals", "Combustibles"] },
  transport: { un: "1498", class: "5.1", packingGroup: "III", properShipping: "Sodium nitrate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Potassium Nitrate"] = {
  cas: "7757-79-1", formula: "KNO₃",
  de: "Kaliumnitrat", es: "Nitrato de potasio", fr: "Nitrate de potassium", pt: "Nitrato de potássio",
  synonyms: ["Saltpeter", "Niter"],
  classes: ["oxidizer"],
  ghs: ["GHS03"],
  hazardStatements: [
    { code: "H272", text: "May intensify fire; oxidizer" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Gunpowder ingredient, fertilizer, food preservative (E252), fireworks" },
  storage: { cabinet: "Oxidizer storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Reducing agents", "Organics", "Sulfur", "Carbon", "Metals"] },
  transport: { un: "1486", class: "5.1", packingGroup: "III", properShipping: "Potassium nitrate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Calcium Nitrate"] = {
  cas: "10124-37-5", formula: "Ca(NO₃)₂",
  de: "Calciumnitrat", es: "Nitrato de calcio", fr: "Nitrate de calcium", pt: "Nitrato de cálcio",
  synonyms: ["Norwegian saltpeter", "Lime saltpeter"],
  classes: ["oxidizer"],
  ghs: ["GHS03"],
  hazardStatements: [
    { code: "H272", text: "May intensify fire; oxidizer" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Fertilizer, concrete additive (accelerator)" },
  storage: { cabinet: "Oxidizer storage", temp: "Room temperature (hygroscopic)", ventilation: "Normal", incompatible: ["Reducing agents", "Organics", "Metals"] },
  transport: { un: "1454", class: "5.1", packingGroup: "III", properShipping: "Calcium nitrate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Magnesium Sulfate"] = {
  cas: "7487-88-9", formula: "MgSO₄",
  de: "Magnesiumsulfat", es: "Sulfato de magnesio", fr: "Sulfate de magnésium", pt: "Sulfato de magnésio",
  synonyms: ["Epsom salt", "Epsom salts"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Bath salts, fertilizer, medical (laxative, IV)" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: [] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Magnesium sulfate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Laxative effect at high doses." }
};

chemicalHazardDB["Calcium Sulfate"] = {
  cas: "7778-18-9", formula: "CaSO₄",
  de: "Calciumsulfat", es: "Sulfato de calcio", fr: "Sulfate de calcium", pt: "Sulfato de cálcio",
  synonyms: ["Gypsum", "Plaster of Paris", "Drierite"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Drywall, plaster, desiccant, tofu coagulant (E516)" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Aluminum powder (thermite reaction)"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Calcium sulfate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Zinc Oxide"] = {
  cas: "1314-13-2", formula: "ZnO",
  de: "Zinkoxid", es: "Óxido de zinc", fr: "Oxyde de zinc", pt: "Óxido de zinco",
  synonyms: ["Zinc white", "Calamine", "Chinese white"],
  classes: ["environmental"],
  ghs: ["GHS09"],
  hazardStatements: [
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Sunscreen, diaper cream, rubber vulcanization, paint pigment" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids", "Aluminum"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Zinc oxide" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Magnesium Oxide"] = {
  cas: "1309-48-4", formula: "MgO",
  de: "Magnesiumoxid", es: "Óxido de magnesio", fr: "Oxyde de magnésium", pt: "Óxido de magnésio",
  synonyms: ["Magnesia", "Calcined magneite"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Refractory, antacid, animal feed, electrical insulator" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids", "Interhalogens"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Magnesium oxide" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth (antacid)." }
};

chemicalHazardDB["Tannic Acid"] = {
  cas: "1401-55-4", formula: "C₇₆H₅₂O₄₆",
  de: "Gerbsäure", es: "Ácido tánico", fr: "Acide tannique", pt: "Ácido tânico",
  synonyms: ["Tannin", "Gallotannic acid"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Leather tanning, wine/tea astringency, rust converter" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Iron salts", "Heavy metals"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Tannic acid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Silicone Oil"] = {
  cas: "63148-62-9", formula: "(SiO(CH₃)₂)n",
  de: "Silikonöl", es: "Aceite de silicona", fr: "Huile de silicone", pt: "Óleo de silicone",
  synonyms: ["Polydimethylsiloxane", "PDMS", "Dimethicone"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Not required" }, other: "Lubricant, cosmetics, mold release, medical devices" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Silicone oil" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Generally inert." }
};

chemicalHazardDB["Mineral Spirits"] = {
  cas: "64742-88-7", formula: "C₇-C₁₂ hydrocarbons",
  de: "Testbenzin", es: "Aguarrás mineral", fr: "White spirit", pt: "Aguarrás mineral",
  synonyms: ["White spirit", "Stoddard solvent", "Paint thinner"],
  classes: ["flammable", "irritant", "health"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H336", text: "May cause drowsiness or dizziness" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Paint thinner, parts cleaner, degreaser" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers"] },
  transport: { un: "1300", class: "3", packingGroup: "III", properShipping: "Turpentine substitute" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash with soap.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Turpentine"] = {
  cas: "8006-64-2", formula: "C₁₀H₁₆ (mainly)",
  de: "Terpentin", es: "Trementina", fr: "Térébenthine", pt: "Terebintina",
  synonyms: ["Gum turpentine", "Oil of turpentine", "Turps"],
  classes: ["flammable", "irritant", "health", "environmental"],
  ghs: ["GHS02", "GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H411", text: "Toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Natural pine solvent, paint thinner, varnishes" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers"] },
  transport: { un: "1299", class: "3", packingGroup: "III", properShipping: "Turpentine" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Linseed Oil"] = {
  cas: "8001-26-1", formula: "Triglycerides",
  de: "Leinöl", es: "Aceite de linaza", fr: "Huile de lin", pt: "Óleo de linhaça",
  synonyms: ["Flaxseed oil"],
  classes: [],
  ghs: [],
  hazardStatements: [
    { code: "EUH208", text: "May produce an allergic reaction" }
  ],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Not required" }, other: "WARNING: Rags with linseed oil can self-ignite! Dispose in water or spread flat to dry." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: [] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Linseed oil" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Generally safe (food grade available)." }
};

chemicalHazardDB["Naphtha"] = {
  cas: "8030-30-6", formula: "C₅-C₁₂",
  de: "Naphtha", es: "Nafta", fr: "Naphta", pt: "Nafta",
  synonyms: ["Petroleum naphtha", "Ligroin", "Petroleum ether"],
  classes: ["flammable", "irritant", "health"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Solvent, fuel, chemical feedstock" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers"] },
  transport: { un: "1256", class: "3", packingGroup: "II", properShipping: "Naphtha" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. Medical attention." }
};

// ===== FINAL BATCH TO 300 =====

chemicalHazardDB["Carbon Tetrachloride"] = {
  cas: "56-23-5", formula: "CCl₄",
  de: "Tetrachlorkohlenstoff", es: "Tetracloruro de carbono", fr: "Tétrachlorure de carbone", pt: "Tetracloreto de carbono",
  synonyms: ["Tetrachloromethane", "Freon-10", "Halon-104"],
  classes: ["toxic", "health", "environmental"],
  ghs: ["GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H351", text: "Suspected of causing cancer" },
    { code: "H372", text: "Causes damage to liver and kidneys" },
    { code: "H420", text: "Harms public health and environment by destroying ozone" },
    { code: "H412", text: "Harmful to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "PVA or Viton gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "BANNED in most applications. Ozone depleter. Historic solvent/fire extinguisher." },
  storage: { cabinet: "Toxic storage", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Alkali metals", "Aluminum", "Fluorine"] },
  transport: { un: "1846", class: "6.1", packingGroup: "II", properShipping: "Carbon tetrachloride" },
  firstAid: { inhalation: "Fresh air. Oxygen. Medical attention.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["1,1,1-Trichloroethane"] = {
  cas: "71-55-6", formula: "C₂H₃Cl₃",
  de: "1,1,1-Trichlorethan", es: "1,1,1-Tricloroetano", fr: "1,1,1-Trichloroéthane", pt: "1,1,1-Tricloroetano",
  synonyms: ["Methyl chloroform", "Chlorothene"],
  classes: ["irritant", "environmental"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H420", text: "Harms public health by destroying ozone" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "BANNED - ozone depleter. Former degreaser." },
  storage: { cabinet: "Regulated storage", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Alkali metals", "Strong bases"] },
  transport: { un: "2831", class: "6.1", packingGroup: "III", properShipping: "1,1,1-Trichloroethane" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Perchloroethylene"] = {
  cas: "127-18-4", formula: "C₂Cl₄",
  de: "Perchlorethylen", es: "Percloroetileno", fr: "Perchloréthylène", pt: "Percloroetileno",
  synonyms: ["Tetrachloroethylene", "Perc", "PCE", "Dry cleaning solvent"],
  classes: ["health"],
  ghs: ["GHS07", "GHS08"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" },
    { code: "H351", text: "Suspected of causing cancer" },
    { code: "H411", text: "Toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Butyl gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Dry cleaning solvent, degreaser. Being phased out." },
  storage: { cabinet: "Toxic storage", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong bases", "Alkali metals", "Oxidizers"] },
  transport: { un: "1897", class: "6.1", packingGroup: "III", properShipping: "Tetrachloroethylene" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Trichloroethylene"] = {
  cas: "79-01-6", formula: "C₂HCl₃",
  de: "Trichlorethylen", es: "Tricloroetileno", fr: "Trichloréthylène", pt: "Tricloroetileno",
  synonyms: ["TCE", "Trike", "Tri"],
  classes: ["irritant", "health"],
  ghs: ["GHS07", "GHS08"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" },
    { code: "H341", text: "Suspected of causing genetic defects" },
    { code: "H350", text: "May cause cancer" },
    { code: "H412", text: "Harmful to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Butyl gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "CARCINOGEN. Metal degreaser. Being phased out." },
  storage: { cabinet: "Carcinogen storage", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong bases", "Alkali metals"] },
  transport: { un: "1710", class: "6.1", packingGroup: "III", properShipping: "Trichloroethylene" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Hexane"] = {
  cas: "110-54-3", formula: "C₆H₁₄",
  de: "Hexan", es: "Hexano", fr: "Hexane", pt: "Hexano",
  synonyms: ["n-Hexane"],
  classes: ["flammable", "irritant", "health", "environmental"],
  ghs: ["GHS02", "GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" },
    { code: "H361f", text: "Suspected of damaging fertility" },
    { code: "H373", text: "May cause damage to nervous system" },
    { code: "H411", text: "Toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "NEUROTOXIN (peripheral neuropathy). Solvent, extraction." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers"] },
  transport: { un: "1208", class: "3", packingGroup: "II", properShipping: "Hexanes" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Heptane"] = {
  cas: "142-82-5", formula: "C₇H₁₆",
  de: "Heptan", es: "Heptano", fr: "Heptane", pt: "Heptano",
  synonyms: ["n-Heptane"],
  classes: ["flammable", "irritant", "health"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Octane rating reference fuel (0 rating)" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers"] },
  transport: { un: "1206", class: "3", packingGroup: "II", properShipping: "Heptanes" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Pentane"] = {
  cas: "109-66-0", formula: "C₅H₁₂",
  de: "Pentan", es: "Pentano", fr: "Pentane", pt: "Pentano",
  synonyms: ["n-Pentane"],
  classes: ["flammable", "irritant", "health", "environmental"],
  ghs: ["GHS02", "GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H336", text: "May cause drowsiness or dizziness" },
    { code: "H411", text: "Toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Foam blowing agent, solvent. Very volatile." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers"] },
  transport: { un: "1265", class: "3", packingGroup: "II", properShipping: "Pentanes" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Octane"] = {
  cas: "111-65-9", formula: "C₈H₁₈",
  de: "Octan", es: "Octano", fr: "Octane", pt: "Octano",
  synonyms: ["n-Octane"],
  classes: ["flammable", "irritant", "health"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Fuel component, solvent" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers"] },
  transport: { un: "1262", class: "3", packingGroup: "II", properShipping: "Octanes" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Benzene"] = {
  cas: "71-43-2", formula: "C₆H₆",
  de: "Benzol", es: "Benceno", fr: "Benzène", pt: "Benzeno",
  synonyms: ["Benzol", "Phenyl hydride"],
  classes: ["flammable", "health"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H340", text: "May cause genetic defects" },
    { code: "H350", text: "May cause cancer (leukemia)" },
    { code: "H372", text: "Causes damage to organs (blood)" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "KNOWN CARCINOGEN (leukemia). No safe exposure level. Avoid use." },
  storage: { cabinet: "Carcinogen storage", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Oxidizers", "Halogens"] },
  transport: { un: "1114", class: "3", packingGroup: "II", properShipping: "Benzene" },
  firstAid: { inhalation: "Fresh air. Oxygen.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Styrene"] = {
  cas: "100-42-5", formula: "C₈H₈",
  de: "Styrol", es: "Estireno", fr: "Styrène", pt: "Estireno",
  synonyms: ["Vinylbenzene", "Ethenylbenzene", "Phenylethylene"],
  classes: ["flammable", "irritant", "health"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H361d", text: "Suspected of damaging the unborn child" },
    { code: "H372", text: "Causes damage to organs (hearing)" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Fiberglass resin, polystyrene. Sweet smell. Ototoxic (hearing damage)." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Oxidizers", "Peroxides", "Acids", "Bases"] },
  transport: { un: "2055", class: "3", packingGroup: "III", properShipping: "Styrene monomer, stabilized" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Vinyl Acetate"] = {
  cas: "108-05-4", formula: "C₄H₆O₂",
  de: "Vinylacetat", es: "Acetato de vinilo", fr: "Acétate de vinyle", pt: "Acetato de vinila",
  synonyms: ["VAM", "Ethenyl acetate"],
  classes: ["flammable", "irritant", "health"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "PVA glue monomer, coatings. Sweet ester odor." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Oxidizers", "Acids", "Bases", "Peroxides"] },
  transport: { un: "1301", class: "3", packingGroup: "II", properShipping: "Vinyl acetate, stabilized" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Acrylonitrile"] = {
  cas: "107-13-1", formula: "C₃H₃N",
  de: "Acrylnitril", es: "Acrilonitrilo", fr: "Acrylonitrile", pt: "Acrilonitrila",
  synonyms: ["Vinyl cyanide", "Propenenitrile", "AN"],
  classes: ["flammable", "toxic", "health"],
  ghs: ["GHS02", "GHS06", "GHS08"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H350", text: "May cause cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber gloves, suit" }, respiratory: { required: true, type: "Supplied air or organic vapor/P100" }, other: "CARCINOGEN. ABS plastic, acrylic fiber. Cyanide-like toxicity." },
  storage: { cabinet: "Carcinogen/flammable storage", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Oxidizers", "Bases", "Acids", "Copper"] },
  transport: { un: "1093", class: "3 (6.1)", packingGroup: "I", properShipping: "Acrylonitrile, stabilized" },
  firstAid: { inhalation: "Fresh air. Oxygen. Cyanide antidote may be needed.", skin: "Remove clothing. Wash.", eyes: "Flush 30 min.", ingestion: "Rinse mouth. IMMEDIATE medical attention." }
};

chemicalHazardDB["Methyl Methacrylate"] = {
  cas: "80-62-6", formula: "C₅H₈O₂",
  de: "Methylmethacrylat", es: "Metacrilato de metilo", fr: "Méthacrylate de méthyle", pt: "Metacrilato de metila",
  synonyms: ["MMA", "Methyl 2-methylpropenoate"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Acrylic plastic (Plexiglas), dental fillings. Strong fruity odor." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Oxidizers", "Peroxides", "Acids", "Bases"] },
  transport: { un: "1247", class: "3", packingGroup: "II", properShipping: "Methyl methacrylate monomer, stabilized" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Methyl Isobutyl Ketone"] = {
  cas: "108-10-1", formula: "C₆H₁₂O",
  de: "Methylisobutylketon", es: "Metil isobutil cetona", fr: "Méthylisobutylcétone", pt: "Metil isobutil cetona",
  synonyms: ["MIBK", "4-Methylpentan-2-one", "Hexone"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Coating solvent, denaturing agent" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Strong acids", "Strong bases"] },
  transport: { un: "1245", class: "3", packingGroup: "II", properShipping: "Methyl isobutyl ketone" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Methyl Ethyl Ketone"] = {
  cas: "78-93-3", formula: "C₄H₈O",
  de: "Methylethylketon", es: "Metil etil cetona", fr: "Méthyléthylcétone", pt: "Metil etil cetona",
  synonyms: ["MEK", "2-Butanone", "Butanone"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" },
    { code: "EUH066", text: "Repeated exposure may cause skin dryness or cracking" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Common solvent, paint thinner, plastic cement" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Strong acids", "Strong bases"] },
  transport: { un: "1193", class: "3", packingGroup: "II", properShipping: "Methyl ethyl ketone" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Cyclohexanone"] = {
  cas: "108-94-1", formula: "C₆H₁₀O",
  de: "Cyclohexanon", es: "Ciclohexanona", fr: "Cyclohexanone", pt: "Ciclo-hexanona",
  synonyms: ["Ketohexamethylene", "Pimelic ketone"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Nylon intermediate, solvent" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Strong acids"] },
  transport: { un: "1915", class: "3", packingGroup: "III", properShipping: "Cyclohexanone" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["N,N-Dimethylformamide"] = {
  cas: "68-12-2", formula: "C₃H₇NO",
  de: "N,N-Dimethylformamid", es: "N,N-Dimetilformamida", fr: "N,N-Diméthylformamide", pt: "N,N-Dimetilformamida",
  synonyms: ["DMF", "Dimethylformamide"],
  classes: ["flammable", "irritant", "health"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H360D", text: "May damage the unborn child" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Butyl rubber gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "REPRODUCTIVE TOXIN. Penetrates skin rapidly. Universal solvent." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Halogens", "Reducing agents"] },
  transport: { un: "2265", class: "3", packingGroup: "III", properShipping: "N,N-Dimethylformamide" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash immediately.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Triethylamine"] = {
  cas: "121-44-8", formula: "(C₂H₅)₃N",
  de: "Triethylamin", es: "Trietilamina", fr: "Triéthylamine", pt: "Trietilamina",
  synonyms: ["TEA", "N,N-Diethylethanamine"],
  classes: ["flammable", "corrosive"],
  ghs: ["GHS02", "GHS05", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber gloves" }, respiratory: { required: true, type: "Organic vapor/ammonia respirator" }, other: "Strong fishy amine odor. Catalyst, curing agent." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Strong acids"] },
  transport: { un: "1296", class: "3", packingGroup: "II", properShipping: "Triethylamine" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Flush 20 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Morpholine"] = {
  cas: "110-91-8", formula: "C₄H₉NO",
  de: "Morpholin", es: "Morfolina", fr: "Morpholine", pt: "Morfolina",
  synonyms: ["Tetrahydro-1,4-oxazine", "Diethylene oximide"],
  classes: ["flammable", "corrosive"],
  ghs: ["GHS02", "GHS05", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Boiler water treatment, rubber accelerator, solvent" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Strong acids", "Copper"] },
  transport: { un: "2054", class: "8", packingGroup: "II", properShipping: "Morpholine" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Flush 20 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Pyridine"] = {
  cas: "110-86-1", formula: "C₅H₅N",
  de: "Pyridin", es: "Piridina", fr: "Pyridine", pt: "Piridina",
  synonyms: ["Azabenzene", "Azine"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Solvent, pharmaceutical intermediate. Strong unpleasant odor." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Strong acids"] },
  transport: { un: "1282", class: "3", packingGroup: "II", properShipping: "Pyridine" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Ethylenediamine"] = {
  cas: "107-15-3", formula: "C₂H₈N₂",
  de: "Ethylendiamin", es: "Etilendiamina", fr: "Éthylènediamine", pt: "Etilenodiamina",
  synonyms: ["EDA", "1,2-Diaminoethane", "1,2-Ethanediamine"],
  classes: ["flammable", "corrosive"],
  ghs: ["GHS02", "GHS05", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H334", text: "May cause allergy or asthma symptoms if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber gloves" }, respiratory: { required: true, type: "Ammonia/amine respirator" }, other: "Strong sensitizer. Epoxy curing agent, chelating agent precursor." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Strong acids", "Copper"] },
  transport: { un: "1604", class: "8", packingGroup: "II", properShipping: "Ethylenediamine" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Flush 20 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Diethylenetriamine"] = {
  cas: "111-40-0", formula: "C₄H₁₃N₃",
  de: "Diethylentriamin", es: "Dietilentriamina", fr: "Diéthylènetriamine", pt: "Dietilenotriamina",
  synonyms: ["DETA", "2,2'-Diaminodiethylamine"],
  classes: ["corrosive"],
  ghs: ["GHS05", "GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H334", text: "May cause allergy or asthma symptoms if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber gloves" }, respiratory: { required: true, type: "Ammonia/amine respirator" }, other: "Strong sensitizer. Epoxy curing agent, fuel additive." },
  storage: { cabinet: "Corrosive storage", temp: "Room temperature", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Strong acids", "Copper"] },
  transport: { un: "2079", class: "8", packingGroup: "II", properShipping: "Diethylenetriamine" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Flush 20 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

// ===== FINAL 18 TO HIT 300 =====

chemicalHazardDB["Monoethanolamine"] = {
  cas: "141-43-5", formula: "C₂H₇NO",
  de: "Monoethanolamin", es: "Monoetanolamina", fr: "Monoéthanolamine", pt: "Monoetanolamina",
  synonyms: ["MEA", "Ethanolamine", "2-Aminoethanol"],
  classes: ["corrosive"],
  ghs: ["GHS05", "GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl gloves" }, respiratory: { required: true, type: "Ammonia/amine respirator" }, other: "CO2 scrubbing, surfactant, metalworking fluid" },
  storage: { cabinet: "Corrosive storage", temp: "Room temperature", ventilation: "Well-ventilated", incompatible: ["Strong acids", "Strong oxidizers"] },
  transport: { un: "2491", class: "8", packingGroup: "III", properShipping: "Ethanolamine" },
  firstAid: { inhalation: "Fresh air.", skin: "Flush 20 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Diethanolamine"] = {
  cas: "111-42-2", formula: "C₄H₁₁NO₂",
  de: "Diethanolamin", es: "Dietanolamina", fr: "Diéthanolamine", pt: "Dietanolamina",
  synonyms: ["DEA", "2,2'-Iminodiethanol", "Diolamine"],
  classes: ["irritant", "health"],
  ghs: ["GHS07", "GHS08"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H373", text: "May cause damage to organs" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Not typically required" }, other: "Cosmetics, detergents, gas scrubbing. IARC possible carcinogen." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids", "Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Diethanolamine" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Triethanolamine"] = {
  cas: "102-71-6", formula: "C₆H₁₅NO₃",
  de: "Triethanolamin", es: "Trietanolamina", fr: "Triéthanolamine", pt: "Trietanolamina",
  synonyms: ["TEA", "Trolamine", "2,2',2''-Nitrilotriethanol"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Not required" }, other: "Cosmetics, metalworking fluids, cement grinding aid" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids", "Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Triethanolamine" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Sodium Hypophosphite"] = {
  cas: "7681-53-0", formula: "NaH₂PO₂",
  de: "Natriumhypophosphit", es: "Hipofosfito de sodio", fr: "Hypophosphite de sodium", pt: "Hipofosfito de sódio",
  synonyms: ["Sodium phosphinate"],
  classes: ["flammable"],
  ghs: ["GHS02"],
  hazardStatements: [
    { code: "H252", text: "Self-heating in large quantities; may catch fire" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Electroless nickel plating. Fire hazard when mixed with oxidizers." },
  storage: { cabinet: "General storage (away from oxidizers)", temp: "Room temperature", ventilation: "Normal", incompatible: ["Oxidizers (releases phosphine when heated)", "Acids"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Sodium hypophosphite" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Sodium Borohydride"] = {
  cas: "16940-66-2", formula: "NaBH₄",
  de: "Natriumborhydrid", es: "Borohidruro de sodio", fr: "Borohydrure de sodium", pt: "Boro-hidreto de sódio",
  synonyms: ["Sodium tetrahydroborate", "SBH"],
  classes: ["flammable", "corrosive", "toxic"],
  ghs: ["GHS02", "GHS05", "GHS06"],
  hazardStatements: [
    { code: "H260", text: "In contact with water releases flammable gases which may ignite spontaneously" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H314", text: "Causes severe skin burns and eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Rubber gloves" }, respiratory: { required: true, type: "Respirator" }, other: "Powerful reducing agent. REACTS WITH WATER (hydrogen gas). Keep dry!" },
  storage: { cabinet: "Flammable solid storage (dry)", temp: "Dry, cool", ventilation: "Dry atmosphere", incompatible: ["Water", "Acids", "Oxidizers", "Alcohols"] },
  transport: { un: "1426", class: "4.3", packingGroup: "I", properShipping: "Sodium borohydride" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Brush off dry. Flush 20 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Lithium Aluminum Hydride"] = {
  cas: "16853-85-3", formula: "LiAlH₄",
  de: "Lithiumaluminiumhydrid", es: "Hidruro de litio y aluminio", fr: "Hydrure de lithium aluminium", pt: "Hidreto de lítio e alumínio",
  synonyms: ["LAH", "Lithium tetrahydridoaluminate"],
  classes: ["flammable", "corrosive"],
  ghs: ["GHS02", "GHS05"],
  hazardStatements: [
    { code: "H260", text: "In contact with water releases flammable gases which may ignite spontaneously" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "EUH014", text: "Reacts violently with water" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Rubber gloves, suit" }, respiratory: { required: true, type: "Respirator" }, other: "EXTREMELY WATER-REACTIVE. Powerful reducing agent. Fires difficult to extinguish." },
  storage: { cabinet: "Flammable solid storage (dry, inert)", temp: "Cool, dry, under nitrogen", ventilation: "Dry atmosphere", incompatible: ["Water", "Air moisture", "Acids", "Alcohols", "Oxidizers"] },
  transport: { un: "1410", class: "4.3", packingGroup: "I", properShipping: "Lithium aluminium hydride" },
  firstAid: { inhalation: "Fresh air.", skin: "Brush off. Do NOT use water initially. Then flush.", eyes: "Flush 30 min.", ingestion: "Do NOT give water. Medical attention." }
};

chemicalHazardDB["Sodium Metal"] = {
  cas: "7440-23-5", formula: "Na",
  de: "Natriummetall", es: "Sodio metálico", fr: "Sodium métallique", pt: "Sódio metálico",
  synonyms: ["Metallic sodium"],
  classes: ["flammable", "corrosive"],
  ghs: ["GHS02", "GHS05"],
  hazardStatements: [
    { code: "H260", text: "In contact with water releases flammable gases which may ignite spontaneously" },
    { code: "H314", text: "Causes severe skin burns and eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Dry leather gloves, suit" }, respiratory: { required: false, type: "Not required if dry" }, other: "REACTS VIOLENTLY WITH WATER. Stored under oil. Do NOT use water on fires!" },
  storage: { cabinet: "Flammable solid storage (under mineral oil)", temp: "Room temperature", ventilation: "Normal", incompatible: ["Water", "Air moisture", "Halogens", "Acids", "Alcohols"] },
  transport: { un: "1428", class: "4.3", packingGroup: "I", properShipping: "Sodium" },
  firstAid: { inhalation: "Fresh air.", skin: "Brush off metal. Do NOT use water. Use dry cloth.", eyes: "Flush with water (after removing metal).", ingestion: "Do NOT induce vomiting. Medical attention." }
};

chemicalHazardDB["Potassium Metal"] = {
  cas: "7440-09-7", formula: "K",
  de: "Kaliummetall", es: "Potasio metálico", fr: "Potassium métallique", pt: "Potássio metálico",
  synonyms: ["Metallic potassium"],
  classes: ["flammable", "corrosive"],
  ghs: ["GHS02", "GHS05"],
  hazardStatements: [
    { code: "H260", text: "In contact with water releases flammable gases which may ignite spontaneously" },
    { code: "H314", text: "Causes severe skin burns and eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Face shield + goggles" }, skin: { required: true, type: "Dry leather gloves, suit" }, respiratory: { required: false, type: "Not required if dry" }, other: "MORE REACTIVE THAN SODIUM. Stored under oil. EXPLOSIVE with water!" },
  storage: { cabinet: "Flammable solid storage (under mineral oil)", temp: "Room temperature", ventilation: "Normal", incompatible: ["Water", "Air moisture", "Halogens", "Acids", "Alcohols", "Oxidizers"] },
  transport: { un: "2257", class: "4.3", packingGroup: "I", properShipping: "Potassium" },
  firstAid: { inhalation: "Fresh air.", skin: "Brush off. Do NOT use water.", eyes: "Flush after removing metal.", ingestion: "Medical attention." }
};

chemicalHazardDB["Magnesium Metal"] = {
  cas: "7439-95-4", formula: "Mg",
  de: "Magnesiummetall", es: "Magnesio metálico", fr: "Magnésium métallique", pt: "Magnésio metálico",
  synonyms: ["Metallic magnesium"],
  classes: ["flammable"],
  ghs: ["GHS02"],
  hazardStatements: [
    { code: "H228", text: "Flammable solid" },
    { code: "H251", text: "Self-heating; may catch fire" },
    { code: "H261", text: "In contact with water releases flammable gas" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses + face shield" }, skin: { required: true, type: "Leather gloves" }, respiratory: { required: true, type: "Dust respirator" }, other: "Burns with intense white light. Do NOT look at burning Mg. Powder is pyrophoric." },
  storage: { cabinet: "Flammable solid storage", temp: "Dry", ventilation: "Normal", incompatible: ["Water", "Acids", "Oxidizers", "Halogens"] },
  transport: { un: "1869", class: "4.1", packingGroup: "III", properShipping: "Magnesium" },
  firstAid: { inhalation: "Fresh air.", skin: "Brush off. Cool burns.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Calcium Metal"] = {
  cas: "7440-70-2", formula: "Ca",
  de: "Calciummetall", es: "Calcio metálico", fr: "Calcium métallique", pt: "Cálcio metálico",
  synonyms: ["Metallic calcium"],
  classes: ["flammable"],
  ghs: ["GHS02"],
  hazardStatements: [
    { code: "H261", text: "In contact with water releases flammable gases" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Dry gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Reacts with water (slower than Na/K). Steel production." },
  storage: { cabinet: "Flammable solid storage (dry)", temp: "Dry", ventilation: "Normal", incompatible: ["Water", "Acids", "Halogens"] },
  transport: { un: "1401", class: "4.3", packingGroup: "II", properShipping: "Calcium" },
  firstAid: { inhalation: "Fresh air.", skin: "Brush off.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Zinc Metal"] = {
  cas: "7440-66-6", formula: "Zn",
  de: "Zinkmetall", es: "Zinc metálico", fr: "Zinc métallique", pt: "Zinco metálico",
  synonyms: ["Metallic zinc", "Zinc dust/powder"],
  classes: ["flammable", "environmental"],
  ghs: ["GHS02", "GHS09"],
  hazardStatements: [
    { code: "H250", text: "Catches fire spontaneously if exposed to air" },
    { code: "H260", text: "In contact with water releases flammable gases" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "Dust respirator" }, other: "Powder/dust is pyrophoric. Galvanizing, batteries, alloys." },
  storage: { cabinet: "Flammable solid storage (powder)", temp: "Dry", ventilation: "Normal", incompatible: ["Acids", "Oxidizers", "Sulfur", "Water (powder)"] },
  transport: { un: "1436", class: "4.3", packingGroup: "I", properShipping: "Zinc powder" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Red Phosphorus"] = {
  cas: "7723-14-0", formula: "P",
  de: "Roter Phosphor", es: "Fósforo rojo", fr: "Phosphore rouge", pt: "Fósforo vermelho",
  synonyms: ["Amorphous phosphorus"],
  classes: ["flammable"],
  ghs: ["GHS02"],
  hazardStatements: [
    { code: "H228", text: "Flammable solid" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "Dust respirator" }, other: "Match heads, flame retardants. Can convert to white phosphorus if heated." },
  storage: { cabinet: "Flammable solid storage", temp: "Cool, dry", ventilation: "Normal", incompatible: ["Oxidizers", "Halogens", "Sulfur"] },
  transport: { un: "1338", class: "4.1", packingGroup: "III", properShipping: "Phosphorus, amorphous" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["White Phosphorus"] = {
  cas: "12185-10-3", formula: "P₄",
  de: "Weißer Phosphor", es: "Fósforo blanco", fr: "Phosphore blanc", pt: "Fósforo branco",
  synonyms: ["Yellow phosphorus", "Tetraphosphorus"],
  classes: ["flammable", "toxic", "environmental"],
  ghs: ["GHS02", "GHS06", "GHS09"],
  hazardStatements: [
    { code: "H250", text: "Catches fire spontaneously if exposed to air" },
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "Supplied air" }, other: "PYROPHORIC - ignites in air! EXTREMELY TOXIC. Stored under water. Military use." },
  storage: { cabinet: "Special pyrophoric storage (under water)", temp: "Cool", ventilation: "Special", incompatible: ["Air", "Oxidizers", "Halogens", "Sulfur", "Strong bases"] },
  transport: { un: "1381", class: "4.2", packingGroup: "I", properShipping: "Phosphorus, white" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Submerge in water immediately. Remove pieces. Keep wet.", eyes: "Flush continuously.", ingestion: "IMMEDIATE medical attention." }
};

chemicalHazardDB["Sulfur"] = {
  cas: "7704-34-9", formula: "S",
  de: "Schwefel", es: "Azufre", fr: "Soufre", pt: "Enxofre",
  synonyms: ["Brimstone", "Sulfur powder"],
  classes: ["flammable"],
  ghs: ["GHS02"],
  hazardStatements: [
    { code: "H228", text: "Flammable solid" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves" }, respiratory: { required: true, type: "Dust mask" }, other: "Matches, vulcanization, fungicide. Dust explosion hazard." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Phosphorus", "Metals"] },
  transport: { un: "1350", class: "4.1", packingGroup: "III", properShipping: "Sulfur" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Sulfur Dioxide"] = {
  cas: "7446-09-5", formula: "SO₂",
  de: "Schwefeldioxid", es: "Dióxido de azufre", fr: "Dioxyde de soufre", pt: "Dióxido de enxofre",
  synonyms: ["Sulfurous anhydride"],
  classes: ["toxic", "corrosive"],
  ghs: ["GHS04", "GHS05", "GHS06"],
  hazardStatements: [
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H331", text: "Toxic if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Rubber gloves" }, respiratory: { required: true, type: "SO2-rated respirator or SCBA" }, other: "Wine/food preservative (E220), bleaching, refrigerant. Strong choking odor." },
  storage: { cabinet: "Toxic gas storage", temp: "Below 52°C", ventilation: "Well-ventilated", incompatible: ["Water (forms acid)", "Bases", "Oxidizers"] },
  transport: { un: "1079", class: "2.3", packingGroup: "N/A", properShipping: "Sulfur dioxide" },
  firstAid: { inhalation: "Fresh air. Oxygen. Medical attention.", skin: "Flush 20 min.", eyes: "Flush 30 min.", ingestion: "N/A (gas)." }
};

chemicalHazardDB["Hydrogen Sulfide"] = {
  cas: "7783-06-4", formula: "H₂S",
  de: "Schwefelwasserstoff", es: "Sulfuro de hidrógeno", fr: "Sulfure d'hydrogène", pt: "Sulfeto de hidrogênio",
  synonyms: ["Hydrosulfuric acid", "Sewer gas", "Stink damp"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS04", "GHS06"],
  hazardStatements: [
    { code: "H220", text: "Extremely flammable gas" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield" }, skin: { required: true, type: "Chemical suit" }, respiratory: { required: true, type: "SCBA (respirators not effective at high concentrations)" }, other: "EXTREMELY TOXIC. Rotten egg smell at low levels but DEADENS SMELL at lethal levels! Sewer/oil/gas industry hazard." },
  storage: { cabinet: "Toxic gas storage", temp: "Cool", ventilation: "Continuous monitoring", incompatible: ["Oxidizers", "Metals", "Strong bases"] },
  transport: { un: "1053", class: "2.3", packingGroup: "N/A", properShipping: "Hydrogen sulfide" },
  firstAid: { inhalation: "Fresh air. Oxygen. CPR if needed. IMMEDIATE medical attention.", skin: "Wash.", eyes: "Flush.", ingestion: "N/A." }
};

chemicalHazardDB["Carbon Monoxide"] = {
  cas: "630-08-0", formula: "CO",
  de: "Kohlenmonoxid", es: "Monóxido de carbono", fr: "Monoxyde de carbone", pt: "Monóxido de carbono",
  synonyms: ["Carbonic oxide", "Flue gas"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS04", "GHS06", "GHS08"],
  hazardStatements: [
    { code: "H220", text: "Extremely flammable gas" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H360D", text: "May damage the unborn child" },
    { code: "H372", text: "Causes damage to organs" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Not required" }, respiratory: { required: true, type: "SCBA" }, other: "ODORLESS KILLER. Binds to hemoglobin 200x stronger than O2. Use CO detectors!" },
  storage: { cabinet: "Toxic/flammable gas storage", temp: "Below 52°C", ventilation: "Continuous monitoring", incompatible: ["Oxidizers"] },
  transport: { un: "1016", class: "2.3", packingGroup: "N/A", properShipping: "Carbon monoxide, compressed" },
  firstAid: { inhalation: "Fresh air. Oxygen. Hyperbaric O2 for severe cases. IMMEDIATE medical attention.", skin: "N/A.", eyes: "N/A.", ingestion: "N/A." }
};

chemicalHazardDB["Chlorine Gas"] = {
  cas: "7782-50-5", formula: "Cl₂",
  de: "Chlorgas", es: "Cloro gaseoso", fr: "Chlore gazeux", pt: "Cloro gasoso",
  synonyms: ["Dichlorine", "Molecular chlorine"],
  classes: ["oxidizer", "toxic", "corrosive", "environmental"],
  ghs: ["GHS03", "GHS04", "GHS05", "GHS06", "GHS09"],
  hazardStatements: [
    { code: "H270", text: "May cause or intensify fire; oxidizer" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield + goggles" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "Chlorine-rated respirator or SCBA" }, other: "WWI chemical weapon. Sharp choking odor. Water treatment, bleach manufacture." },
  storage: { cabinet: "Toxic/oxidizer gas storage", temp: "Below 52°C", ventilation: "Special ventilation with scrubbers", incompatible: ["Ammonia", "Hydrogen", "Acetylene", "Flammables", "Metals"] },
  transport: { un: "1017", class: "2.3", packingGroup: "N/A", properShipping: "Chlorine" },
  firstAid: { inhalation: "Fresh air. Oxygen. Rest. Medical attention (delayed pulmonary edema possible).", skin: "Flush 20 min.", eyes: "Flush 30 min.", ingestion: "N/A." }
};

// ===== FINAL 6 TO HIT 300 =====

chemicalHazardDB["Bromine"] = {
  cas: "7726-95-6", formula: "Br₂",
  de: "Brom", es: "Bromo", fr: "Brome", pt: "Bromo",
  synonyms: ["Dibromine", "Molecular bromine"],
  classes: ["toxic", "corrosive", "oxidizer", "environmental"],
  ghs: ["GHS03", "GHS05", "GHS06", "GHS09"],
  hazardStatements: [
    { code: "H271", text: "May cause fire or explosion; strong oxidizer" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield + goggles" }, skin: { required: true, type: "Full chemical suit, neoprene gloves" }, respiratory: { required: true, type: "Supplied air or halogen respirator" }, other: "Dark red fuming liquid. EXTREMELY CORROSIVE. Painful burns. Flame retardants, water treatment." },
  storage: { cabinet: "Corrosive/toxic storage", temp: "Cool, dark", ventilation: "Well-ventilated", incompatible: ["Ammonia", "Metals", "Organics", "Reducing agents"] },
  transport: { un: "1744", class: "8 (6.1)", packingGroup: "I", properShipping: "Bromine" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Flush 30 min. Sodium bicarbonate solution.", eyes: "Flush 30 min. IMMEDIATE medical attention.", ingestion: "Rinse mouth. Drink milk. IMMEDIATE medical attention." }
};

chemicalHazardDB["Iodine"] = {
  cas: "7553-56-2", formula: "I₂",
  de: "Iod", es: "Yodo", fr: "Iode", pt: "Iodo",
  synonyms: ["Diiodine", "Molecular iodine"],
  classes: ["irritant", "environmental"],
  ghs: ["GHS07", "GHS09"],
  hazardStatements: [
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Halogen respirator" }, other: "Purple/black solid, sublimes. Stains brown. Disinfectant, thyroid supplement." },
  storage: { cabinet: "General storage (dark)", temp: "Cool", ventilation: "Normal", incompatible: ["Ammonia", "Metals", "Reducing agents"] },
  transport: { un: "3495", class: "8", packingGroup: "III", properShipping: "Iodine" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash (staining).", eyes: "Flush 15 min.", ingestion: "Give starch solution. Medical attention." }
};

chemicalHazardDB["Fluorine Gas"] = {
  cas: "7782-41-4", formula: "F₂",
  de: "Fluorgas", es: "Flúor gaseoso", fr: "Fluor gazeux", pt: "Flúor gasoso",
  synonyms: ["Difluorine", "Molecular fluorine"],
  classes: ["oxidizer", "toxic", "corrosive"],
  ghs: ["GHS03", "GHS04", "GHS05", "GHS06"],
  hazardStatements: [
    { code: "H270", text: "May cause or intensify fire; oxidizer" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H330", text: "Fatal if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield" }, skin: { required: true, type: "Special fluorine-resistant suit" }, respiratory: { required: true, type: "SCBA" }, other: "MOST REACTIVE ELEMENT. Attacks almost everything including glass. Pale yellow gas. Uranium enrichment, Teflon." },
  storage: { cabinet: "Special fluorine storage (passivated metal)", temp: "Cool", ventilation: "Special", incompatible: ["Almost everything - water, organics, metals, glass"] },
  transport: { un: "1045", class: "2.3 (5.1)", packingGroup: "N/A", properShipping: "Fluorine, compressed" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Flush. Apply calcium gluconate. IMMEDIATE medical attention.", eyes: "Flush 30 min. IMMEDIATE medical attention.", ingestion: "N/A (gas)." }
};

chemicalHazardDB["Ozone"] = {
  cas: "10028-15-6", formula: "O₃",
  de: "Ozon", es: "Ozono", fr: "Ozone", pt: "Ozônio",
  synonyms: ["Triatomic oxygen", "Trioxygen"],
  classes: ["oxidizer", "toxic"],
  ghs: ["GHS03", "GHS04", "GHS06"],
  hazardStatements: [
    { code: "H270", text: "May cause or intensify fire; oxidizer" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H330", text: "Fatal if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Not required" }, respiratory: { required: true, type: "Supplied air" }, other: "Water/air treatment, bleaching. Sharp fresh smell. Respiratory irritant even at low levels." },
  storage: { cabinet: "Generated on-site (unstable)", temp: "N/A", ventilation: "Well-ventilated", incompatible: ["Organics", "Rubber", "Reducing agents"] },
  transport: { un: "Not transported (generated on-site)", class: "N/A", packingGroup: "N/A", properShipping: "Ozone" },
  firstAid: { inhalation: "Fresh air. Oxygen. Medical attention.", skin: "N/A.", eyes: "Flush if irritated.", ingestion: "N/A." }
};

chemicalHazardDB["Nitrogen Dioxide"] = {
  cas: "10102-44-0", formula: "NO₂",
  de: "Stickstoffdioxid", es: "Dióxido de nitrógeno", fr: "Dioxyde d'azote", pt: "Dióxido de nitrogênio",
  synonyms: ["Nitrogen peroxide"],
  classes: ["oxidizer", "toxic", "corrosive"],
  ghs: ["GHS03", "GHS04", "GHS05", "GHS06"],
  hazardStatements: [
    { code: "H270", text: "May cause or intensify fire; oxidizer" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H330", text: "Fatal if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "SCBA" }, other: "Reddish-brown gas. Air pollution component. Pulmonary edema may be DELAYED 24-48 hours." },
  storage: { cabinet: "Toxic/oxidizer gas storage", temp: "Cool", ventilation: "Special", incompatible: ["Organics", "Reducing agents", "Fuels", "Metals"] },
  transport: { un: "1067", class: "2.3 (5.1)", packingGroup: "N/A", properShipping: "Dinitrogen tetroxide" },
  firstAid: { inhalation: "Fresh air. Oxygen. Rest 48 hours minimum. IMMEDIATE medical attention.", skin: "Flush.", eyes: "Flush 30 min.", ingestion: "N/A." }
};

chemicalHazardDB["Nitric Oxide"] = {
  cas: "10102-43-9", formula: "NO",
  de: "Stickstoffmonoxid", es: "Óxido nítrico", fr: "Monoxyde d'azote", pt: "Óxido nítrico",
  synonyms: ["Nitrogen monoxide", "Nitrogen oxide"],
  classes: ["oxidizer", "toxic"],
  ghs: ["GHS03", "GHS04", "GHS06"],
  hazardStatements: [
    { code: "H270", text: "May cause or intensify fire; oxidizer" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H330", text: "Fatal if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Not typically required" }, respiratory: { required: true, type: "SCBA" }, other: "Colorless gas, converts to brown NO2 in air. Medical use (inhaled for pulmonary hypertension)." },
  storage: { cabinet: "Toxic/oxidizer gas storage", temp: "Cool", ventilation: "Special", incompatible: ["Air (forms NO2)", "Organics", "Fuels", "Halogens"] },
  transport: { un: "1660", class: "2.3 (5.1)", packingGroup: "N/A", properShipping: "Nitric oxide, compressed" },
  firstAid: { inhalation: "Fresh air. Oxygen. Monitor for delayed effects. Medical attention.", skin: "N/A.", eyes: "N/A.", ingestion: "N/A." }
};

// ===== THE FINAL 2 - NUMBER 299 AND 300! =====

chemicalHazardDB["Cyanogen"] = {
  cas: "460-19-5", formula: "(CN)₂",
  de: "Dicyan", es: "Cianógeno", fr: "Cyanogène", pt: "Cianogênio",
  synonyms: ["Dicyanogen", "Ethanedinitrile", "Carbon nitride"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS04", "GHS06"],
  hazardStatements: [
    { code: "H220", text: "Extremely flammable gas" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H330", text: "Fatal if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "SCBA" }, other: "Burns with purple flame. Almond odor. Organic synthesis intermediate." },
  storage: { cabinet: "Toxic/flammable gas storage", temp: "Cool", ventilation: "Special", incompatible: ["Oxidizers", "Water", "Acids"] },
  transport: { un: "1026", class: "2.3 (2.1)", packingGroup: "N/A", properShipping: "Cyanogen" },
  firstAid: { inhalation: "Fresh air. Oxygen. Cyanide antidote. IMMEDIATE medical attention.", skin: "Wash.", eyes: "Flush.", ingestion: "N/A." }
};

chemicalHazardDB["Hydrogen Cyanide"] = {
  cas: "74-90-8", formula: "HCN",
  de: "Cyanwasserstoff", es: "Cianuro de hidrógeno", fr: "Cyanure d'hydrogène", pt: "Cianeto de hidrogênio",
  synonyms: ["Prussic acid", "Hydrocyanic acid", "Formonitrile"],
  classes: ["flammable", "toxic", "environmental"],
  ghs: ["GHS02", "GHS06", "GHS09"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "SCBA" }, other: "ONE OF THE MOST DANGEROUS CHEMICALS. Bitter almond odor (40% can't smell it). Used in gas chambers historically. Fumigant, chemical synthesis." },
  storage: { cabinet: "Highly toxic storage with strict controls", temp: "Cool", ventilation: "Special monitoring", incompatible: ["Bases", "Oxidizers", "Acids", "Amines"] },
  transport: { un: "1051", class: "6.1 (3)", packingGroup: "I", properShipping: "Hydrogen cyanide, stabilized" },
  firstAid: { inhalation: "Fresh air. Oxygen. Amyl nitrite inhalant. Cyanide antidote kit. IMMEDIATE medical attention.", skin: "Remove clothing. Wash thoroughly.", eyes: "Flush 30 min.", ingestion: "Do NOT vomit. IMMEDIATE medical attention." }
};

// ===== PESTICIDES & INSECTICIDES =====

chemicalHazardDB["Malathion"] = {
  cas: "121-75-5", formula: "C₁₀H₁₉O₆PS₂",
  de: "Malathion", es: "Malatión", fr: "Malathion", pt: "Malatião",
  synonyms: ["Carbophos", "Maldison"],
  classes: ["toxic", "environmental"],
  ghs: ["GHS07", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves, long sleeves" }, respiratory: { required: true, type: "Organic vapor/P100 respirator" }, other: "Organophosphate insecticide. Cholinesterase inhibitor." },
  storage: { cabinet: "Pesticide storage", temp: "Cool", ventilation: "Good", incompatible: ["Strong oxidizers", "Strong bases"] },
  transport: { un: "3082", class: "9", packingGroup: "III", properShipping: "Environmentally hazardous substance" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash thoroughly.", eyes: "Flush 15 min.", ingestion: "Medical attention. Atropine is antidote." }
};

chemicalHazardDB["Permethrin"] = {
  cas: "52645-53-1", formula: "C₂₁H₂₀Cl₂O₃",
  de: "Permethrin", es: "Permetrina", fr: "Perméthrine", pt: "Permetrina",
  synonyms: ["Ambush", "Pounce"],
  classes: ["toxic", "environmental"],
  ghs: ["GHS07", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H400", text: "Very toxic to aquatic life" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "Respirator if spraying" }, other: "Pyrethroid insecticide. TOXIC TO CATS. Lice/scabies treatment." },
  storage: { cabinet: "Pesticide storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong bases"] },
  transport: { un: "3082", class: "9", packingGroup: "III", properShipping: "Environmentally hazardous substance" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Chlorpyrifos"] = {
  cas: "2921-88-2", formula: "C₉H₁₁Cl₃NO₃PS",
  de: "Chlorpyrifos", es: "Clorpirifós", fr: "Chlorpyrifos", pt: "Clorpirifós",
  synonyms: ["Dursban", "Lorsban"],
  classes: ["toxic", "environmental"],
  ghs: ["GHS06", "GHS09"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H400", text: "Very toxic to aquatic life" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Chemical-resistant suit" }, respiratory: { required: true, type: "Organic vapor/P100 respirator" }, other: "Organophosphate. RESTRICTED USE in many countries. Cholinesterase inhibitor." },
  storage: { cabinet: "Pesticide storage (locked)", temp: "Cool", ventilation: "Good", incompatible: ["Strong bases", "Strong oxidizers"] },
  transport: { un: "2783", class: "6.1", packingGroup: "III", properShipping: "Organophosphorus pesticide, solid, toxic" },
  firstAid: { inhalation: "Fresh air. IMMEDIATE medical attention.", skin: "Remove clothing. Wash 20 min.", eyes: "Flush 20 min.", ingestion: "IMMEDIATE medical attention. Atropine antidote." }
};

chemicalHazardDB["Carbaryl"] = {
  cas: "63-25-2", formula: "C₁₂H₁₁NO₂",
  de: "Carbaryl", es: "Carbaril", fr: "Carbaryl", pt: "Carbaril",
  synonyms: ["Sevin", "1-Naphthyl methylcarbamate"],
  classes: ["toxic", "environmental"],
  ghs: ["GHS07", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "Respirator if dusting" }, other: "Carbamate insecticide. Garden use. Reversible cholinesterase inhibitor." },
  storage: { cabinet: "Pesticide storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases", "Strong oxidizers"] },
  transport: { un: "2757", class: "6.1", packingGroup: "III", properShipping: "Carbamate pesticide, solid, toxic" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Imidacloprid"] = {
  cas: "138261-41-3", formula: "C₉H₁₀ClN₅O₂",
  de: "Imidacloprid", es: "Imidacloprid", fr: "Imidaclopride", pt: "Imidacloprido",
  synonyms: ["Confidor", "Admire", "Gaucho"],
  classes: ["toxic", "environmental"],
  ghs: ["GHS07", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H400", text: "Very toxic to aquatic life" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Neonicotinoid insecticide. TOXIC TO BEES. Restricted in EU." },
  storage: { cabinet: "Pesticide storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases"] },
  transport: { un: "3077", class: "9", packingGroup: "III", properShipping: "Environmentally hazardous substance" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

// ===== FUNGICIDES =====

chemicalHazardDB["Copper Sulfate Pentahydrate"] = {
  cas: "7758-99-8", formula: "CuSO₄·5H₂O",
  de: "Kupfersulfat-Pentahydrat", es: "Sulfato de cobre pentahidratado", fr: "Sulfate de cuivre pentahydraté", pt: "Sulfato de cobre pentahidratado",
  synonyms: ["Blue vitriol", "Bluestone", "Bordeaux mixture component"],
  classes: ["toxic", "irritant", "environmental"],
  ghs: ["GHS07", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Fungicide (Bordeaux mixture), algaecide, root killer" },
  storage: { cabinet: "Pesticide storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Metals (corrodes)", "Strong bases"] },
  transport: { un: "3077", class: "9", packingGroup: "III", properShipping: "Environmentally hazardous substance" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention (emetic)." }
};

chemicalHazardDB["Mancozeb"] = {
  cas: "8018-01-7", formula: "(C₄H₆MnN₂S₄)ₓ(Zn)ᵧ",
  de: "Mancozeb", es: "Mancozeb", fr: "Mancozèbe", pt: "Mancozebe",
  synonyms: ["Dithane", "Penncozeb"],
  classes: ["irritant", "health", "environmental"],
  ghs: ["GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H361d", text: "Suspected of damaging the unborn child" },
    { code: "H400", text: "Very toxic to aquatic life" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves, long sleeves" }, respiratory: { required: true, type: "Dust/mist respirator" }, other: "Dithiocarbamate fungicide. Broad spectrum." },
  storage: { cabinet: "Pesticide storage", temp: "Cool, dry", ventilation: "Normal", incompatible: ["Strong oxidizers", "Acids"] },
  transport: { un: "3077", class: "9", packingGroup: "III", properShipping: "Environmentally hazardous substance" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Captan"] = {
  cas: "133-06-2", formula: "C₉H₈Cl₃NO₂S",
  de: "Captan", es: "Captán", fr: "Captane", pt: "Captana",
  synonyms: ["Orthocide"],
  classes: ["irritant", "health", "environmental"],
  ghs: ["GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H351", text: "Suspected of causing cancer" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "Dust respirator" }, other: "Phthalimide fungicide. Fruit/vegetable treatment." },
  storage: { cabinet: "Pesticide storage", temp: "Cool, dry", ventilation: "Normal", incompatible: ["Strong bases", "Strong oxidizers"] },
  transport: { un: "2588", class: "6.1", packingGroup: "III", properShipping: "Pesticide, solid, toxic" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

// ===== FOOD ADDITIVES & PRESERVATIVES =====

chemicalHazardDB["Sodium Nitrite"] = {
  cas: "7632-00-0", formula: "NaNO₂",
  de: "Natriumnitrit", es: "Nitrito de sodio", fr: "Nitrite de sodium", pt: "Nitrito de sódio",
  synonyms: ["E250"],
  classes: ["oxidizer", "toxic"],
  ghs: ["GHS03", "GHS06"],
  hazardStatements: [
    { code: "H272", text: "May intensify fire; oxidizer" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Meat curing, preservative (E250). TOXIC - causes methemoglobinemia." },
  storage: { cabinet: "Oxidizer storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Reducing agents", "Organics", "Ammonium salts", "Acids"] },
  transport: { un: "1500", class: "5.1 (6.1)", packingGroup: "III", properShipping: "Sodium nitrite" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Methylene blue may be needed. IMMEDIATE medical attention." }
};

chemicalHazardDB["Sodium Sulfite"] = {
  cas: "7757-83-7", formula: "Na₂SO₃",
  de: "Natriumsulfit", es: "Sulfito de sodio", fr: "Sulfite de sodium", pt: "Sulfito de sódio",
  synonyms: ["E221"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "EUH031", text: "Contact with acids liberates toxic gas (SO₂)" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Food preservative, photo fixer, reducing agent" },
  storage: { cabinet: "General storage (away from acids)", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids (releases SO2)", "Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Sodium sulfite" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Sodium Metabisulfite"] = {
  cas: "7681-57-4", formula: "Na₂S₂O₅",
  de: "Natriummetabisulfit", es: "Metabisulfito de sodio", fr: "Métabisulfite de sodium", pt: "Metabissulfito de sódio",
  synonyms: ["Sodium pyrosulfite", "E223"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "EUH031", text: "Contact with acids liberates toxic gas (SO₂)" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Wine preservative, antioxidant, sanitizer" },
  storage: { cabinet: "General storage (away from acids)", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids (releases SO2)", "Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Sodium metabisulfite" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Calcium Propionate"] = {
  cas: "4075-81-4", formula: "Ca(C₂H₅COO)₂",
  de: "Calciumpropionat", es: "Propionato de calcio", fr: "Propionate de calcium", pt: "Propionato de cálcio",
  synonyms: ["E282", "Calcium propanoate"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Bread preservative (E282), mold inhibitor" },
  storage: { cabinet: "General storage", temp: "Room temperature, dry", ventilation: "Normal", incompatible: [] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Calcium propionate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Generally safe." }
};

// ===== ESSENTIAL OILS & FRAGRANCES =====

chemicalHazardDB["Limonene"] = {
  cas: "5989-27-5", formula: "C₁₀H₁₆",
  de: "Limonen", es: "Limoneno", fr: "Limonène", pt: "Limoneno",
  synonyms: ["d-Limonene", "Orange oil terpene"],
  classes: ["flammable", "irritant", "environmental"],
  ghs: ["GHS02", "GHS07", "GHS09"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H304", text: "May be fatal if swallowed and enters airways" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Ventilation" }, other: "Citrus solvent, fragrance, cleaner. Common allergen." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "2319", class: "3", packingGroup: "III", properShipping: "Terpene hydrocarbons" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Do NOT vomit. Medical attention." }
};

chemicalHazardDB["Eucalyptol"] = {
  cas: "470-82-6", formula: "C₁₀H₁₈O",
  de: "Eucalyptol", es: "Eucaliptol", fr: "Eucalyptol", pt: "Eucaliptol",
  synonyms: ["1,8-Cineole", "Cineole", "Eucalyptus oil component"],
  classes: ["flammable"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H302", text: "Harmful if swallowed" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves" }, respiratory: { required: false, type: "Ventilation" }, other: "Eucalyptus oil, medicinal, flavoring" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "1993", class: "3", packingGroup: "III", properShipping: "Flammable liquid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth. Medical attention if large amount." }
};

chemicalHazardDB["Menthol"] = {
  cas: "89-78-1", formula: "C₁₀H₂₀O",
  de: "Menthol", es: "Mentol", fr: "Menthol", pt: "Mentol",
  synonyms: ["Peppermint camphor", "L-Menthol"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves if handling crystals" }, respiratory: { required: false, type: "Dust mask" }, other: "Cooling sensation, medicine, candy, cigarettes" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Menthol" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Camphor"] = {
  cas: "76-22-2", formula: "C₁₀H₁₆O",
  de: "Campher", es: "Alcanfor", fr: "Camphre", pt: "Cânfora",
  synonyms: ["2-Bornanone", "Gum camphor"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H228", text: "Flammable solid" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Mothballs (synthetic), medicine, plasticizer. Toxic to children." },
  storage: { cabinet: "Flammable solid storage", temp: "Cool", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "2717", class: "4.1", packingGroup: "III", properShipping: "Camphor" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Do NOT vomit. Medical attention." }
};

// ===== COSMETIC INGREDIENTS =====

chemicalHazardDB["Salicylic Acid"] = {
  cas: "69-72-7", formula: "C₇H₆O₃",
  de: "Salicylsäure", es: "Ácido salicílico", fr: "Acide salicylique", pt: "Ácido salicílico",
  synonyms: ["2-Hydroxybenzoic acid", "BHA precursor"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H318", text: "Causes serious eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Acne treatment, aspirin precursor, keratolytic" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong bases"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Salicylic acid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Benzoyl Peroxide"] = {
  cas: "94-36-0", formula: "C₁₄H₁₀O₄",
  de: "Benzoylperoxid", es: "Peróxido de benzoilo", fr: "Peroxyde de benzoyle", pt: "Peróxido de benzoíla",
  synonyms: ["BPO", "Dibenzoyl peroxide"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS01", "GHS02", "GHS07"],
  hazardStatements: [
    { code: "H242", text: "Heating may cause a fire" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Acne treatment, flour bleaching, polymerization initiator. ORGANIC PEROXIDE - fire/explosion risk." },
  storage: { cabinet: "Organic peroxide storage (cool)", temp: "Below 25°C", ventilation: "Good", incompatible: ["Heat", "Friction", "Reducing agents", "Combustibles"] },
  transport: { un: "3102", class: "5.2", packingGroup: "N/A", properShipping: "Organic peroxide type B, solid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Titanium Dioxide (Cosmetic)"] = {
  cas: "13463-67-7", formula: "TiO₂",
  de: "Titandioxid", es: "Dióxido de titanio", fr: "Dioxyde de titane", pt: "Dióxido de titânio",
  synonyms: ["CI 77891", "E171", "Titanium white"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: true, type: "P100 for nanoparticles" }, other: "Sunscreen, white pigment. NANO form may have different hazards." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: [] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Titanium dioxide" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Zinc Pyrithione"] = {
  cas: "13463-41-7", formula: "C₁₀H₈N₂O₂S₂Zn",
  de: "Zinkpyrithion", es: "Piritiona de zinc", fr: "Pyrithione de zinc", pt: "Piritionato de zinco",
  synonyms: ["ZPT", "Head & Shoulders active"],
  classes: ["toxic", "environmental"],
  ghs: ["GHS07", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Anti-dandruff, antifungal, boat paint" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "3077", class: "9", packingGroup: "III", properShipping: "Environmentally hazardous substance" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

// ===== MORE SOLVENTS =====

chemicalHazardDB["2-Butoxyethanol"] = {
  cas: "111-76-2", formula: "C₆H₁₄O₂",
  de: "2-Butoxyethanol", es: "2-Butoxietanol", fr: "2-Butoxyéthanol", pt: "2-Butoxietanol",
  synonyms: ["Butyl cellosolve", "Ethylene glycol monobutyl ether", "EGBE"],
  classes: ["irritant", "toxic"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Glass cleaner, degreaser. Absorbs through skin." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Good", incompatible: ["Strong oxidizers", "Strong acids"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "2-Butoxyethanol" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Propylene Carbonate"] = {
  cas: "108-32-7", formula: "C₄H₆O₃",
  de: "Propylencarbonat", es: "Carbonato de propileno", fr: "Carbonate de propylène", pt: "Carbonato de propileno",
  synonyms: ["PC", "4-Methyl-1,3-dioxolan-2-one"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves" }, respiratory: { required: false, type: "Not required" }, other: "Li-ion battery electrolyte, cosmetics, paint stripper" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases", "Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Propylene carbonate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Gamma-Butyrolactone"] = {
  cas: "96-48-0", formula: "C₄H₆O₂",
  de: "Gamma-Butyrolacton", es: "Gamma-butirolactona", fr: "Gamma-butyrolactone", pt: "Gama-butirolactona",
  synonyms: ["GBL", "4-Butyrolactone"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H318", text: "Causes serious eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Not required" }, other: "Industrial solvent. CONTROLLED SUBSTANCE in many countries (GHB precursor)." },
  storage: { cabinet: "Controlled storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases", "Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Gamma-butyrolactone" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min. Medical attention.", ingestion: "IMMEDIATE medical attention (CNS depressant)." }
};

chemicalHazardDB["Diacetone Alcohol"] = {
  cas: "123-42-2", formula: "C₆H₁₂O₂",
  de: "Diacetonalkohol", es: "Alcohol diacetona", fr: "Alcool diacétonique", pt: "Álcool diacetona",
  synonyms: ["DAA", "4-Hydroxy-4-methyl-2-pentanone"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Coating solvent, hydraulic brake fluid, ink" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Good", incompatible: ["Strong oxidizers"] },
  transport: { un: "1148", class: "3", packingGroup: "III", properShipping: "Diacetone alcohol" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

// ===== SILICONES & SILANES =====

chemicalHazardDB["Tetraethyl Orthosilicate"] = {
  cas: "78-10-4", formula: "Si(OC₂H₅)₄",
  de: "Tetraethylorthosilikat", es: "Ortosilicato de tetraetilo", fr: "Orthosilicate de tétraéthyle", pt: "Ortossilicato de tetraetila",
  synonyms: ["TEOS", "Ethyl silicate"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Sol-gel precursor, refractory binder, investment casting" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Good", incompatible: ["Water (hydrolyzes)", "Strong acids", "Strong bases"] },
  transport: { un: "1292", class: "3", packingGroup: "III", properShipping: "Tetraethyl silicate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Hexamethyldisilazane"] = {
  cas: "999-97-3", formula: "(CH₃)₃SiNHSi(CH₃)₃",
  de: "Hexamethyldisilazan", es: "Hexametildisilazano", fr: "Hexaméthyldisilazane", pt: "Hexametildisilazano",
  synonyms: ["HMDS", "Bis(trimethylsilyl)amine"],
  classes: ["flammable", "corrosive"],
  ghs: ["GHS02", "GHS05"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H314", text: "Causes severe skin burns and eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor/ammonia respirator" }, other: "Semiconductor photoresist primer, silylating agent. Releases ammonia with water." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool, dry", ventilation: "Good", incompatible: ["Water", "Acids", "Oxidizers"] },
  transport: { un: "1992", class: "3", packingGroup: "II", properShipping: "Flammable liquid, toxic" },
  firstAid: { inhalation: "Fresh air.", skin: "Flush 20 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Methyltrimethoxysilane"] = {
  cas: "1185-55-3", formula: "CH₃Si(OCH₃)₃",
  de: "Methyltrimethoxysilan", es: "Metiltrimetoxisilano", fr: "Méthyltriméthoxysilane", pt: "Metiltrimetoxissilano",
  synonyms: ["MTMS"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Silicone crosslinker, waterproofing, adhesion promoter" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Good", incompatible: ["Water (hydrolyzes)", "Strong acids", "Strong bases"] },
  transport: { un: "1993", class: "3", packingGroup: "II", properShipping: "Flammable liquid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

// ===== POLYMER CHEMISTRY =====

chemicalHazardDB["Methyl Acrylate"] = {
  cas: "96-33-3", formula: "C₄H₆O₂",
  de: "Methylacrylat", es: "Acrilato de metilo", fr: "Acrylate de méthyle", pt: "Acrilato de metila",
  synonyms: ["MA", "Methyl propenoate"],
  classes: ["flammable", "toxic", "irritant"],
  ghs: ["GHS02", "GHS06", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Acrylic polymer monomer. Strong pungent odor. Sensitizer." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Good", incompatible: ["Strong oxidizers", "Peroxides", "Strong acids", "Strong bases"] },
  transport: { un: "1919", class: "3", packingGroup: "II", properShipping: "Methyl acrylate, stabilized" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Butyl Acrylate"] = {
  cas: "141-32-2", formula: "C₇H₁₂O₂",
  de: "Butylacrylat", es: "Acrilato de butilo", fr: "Acrylate de butyle", pt: "Acrilato de butila",
  synonyms: ["n-Butyl acrylate", "BA"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Acrylic polymer monomer for paints, adhesives" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Good", incompatible: ["Strong oxidizers", "Peroxides", "Strong acids"] },
  transport: { un: "2348", class: "3", packingGroup: "III", properShipping: "Butyl acrylates, stabilized" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["2-Hydroxyethyl Methacrylate"] = {
  cas: "868-77-9", formula: "C₆H₁₀O₃",
  de: "2-Hydroxyethylmethacrylat", es: "Metacrilato de 2-hidroxietilo", fr: "Méthacrylate de 2-hydroxyéthyle", pt: "Metacrilato de 2-hidroxietila",
  synonyms: ["HEMA", "Glycol methacrylate"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Ventilation" }, other: "Contact lens material, dental materials, nail products. COMMON SENSITIZER in nail technicians." },
  storage: { cabinet: "General storage", temp: "Cool, dark", ventilation: "Normal", incompatible: ["Strong oxidizers", "Peroxides"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "2-Hydroxyethyl methacrylate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

// ===== INORGANIC ACIDS (MORE) =====

chemicalHazardDB["Perchloric Acid"] = {
  cas: "7601-90-3", formula: "HClO₄",
  de: "Perchlorsäure", es: "Ácido perclórico", fr: "Acide perchlorique", pt: "Ácido perclórico",
  synonyms: ["Hyperchloric acid"],
  classes: ["oxidizer", "corrosive"],
  ghs: ["GHS03", "GHS05"],
  hazardStatements: [
    { code: "H271", text: "May cause fire or explosion; strong oxidizer" },
    { code: "H290", text: "May be corrosive to metals" },
    { code: "H314", text: "Causes severe skin burns and eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield + goggles" }, skin: { required: true, type: "Butyl rubber gloves, acid suit" }, respiratory: { required: true, type: "Acid gas respirator" }, other: "EXTREMELY HAZARDOUS. Can form explosive perchlorates. Use only in special perchloric acid fume hoods." },
  storage: { cabinet: "Oxidizer/acid cabinet (special)", temp: "Cool", ventilation: "Special perchloric acid hood", incompatible: ["Organics", "Metals", "Reducing agents", "Dehydrating agents", "Wood", "Paper"] },
  transport: { un: "1873", class: "5.1 (8)", packingGroup: "I", properShipping: "Perchloric acid" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Flush 30 min.", eyes: "Flush 30 min. IMMEDIATE medical attention.", ingestion: "Rinse mouth. Do NOT vomit. IMMEDIATE medical attention." }
};

chemicalHazardDB["Hydrobromic Acid"] = {
  cas: "10035-10-6", formula: "HBr",
  de: "Bromwasserstoffsäure", es: "Ácido bromhídrico", fr: "Acide bromhydrique", pt: "Ácido bromídrico",
  synonyms: ["Hydrogen bromide solution"],
  classes: ["corrosive"],
  ghs: ["GHS05", "GHS07"],
  hazardStatements: [
    { code: "H290", text: "May be corrosive to metals" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Rubber gloves" }, respiratory: { required: true, type: "Acid gas respirator" }, other: "Organic synthesis, oil well drilling" },
  storage: { cabinet: "Acid cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Bases", "Metals", "Oxidizers"] },
  transport: { un: "1788", class: "8", packingGroup: "II", properShipping: "Hydrobromic acid" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Flush 20 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Hydriodic Acid"] = {
  cas: "10034-85-2", formula: "HI",
  de: "Iodwasserstoffsäure", es: "Ácido yodhídrico", fr: "Acide iodhydrique", pt: "Ácido iodídrico",
  synonyms: ["Hydrogen iodide solution"],
  classes: ["corrosive"],
  ghs: ["GHS05"],
  hazardStatements: [
    { code: "H290", text: "May be corrosive to metals" },
    { code: "H314", text: "Causes severe skin burns and eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Rubber gloves" }, respiratory: { required: true, type: "Acid gas respirator" }, other: "Reducing agent, organic synthesis. CONTROLLED SUBSTANCE precursor (methamphetamine)." },
  storage: { cabinet: "Acid cabinet (dark)", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Bases", "Metals", "Oxidizers", "Light (decomposes)"] },
  transport: { un: "1787", class: "8", packingGroup: "II", properShipping: "Hydriodic acid" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Flush 20 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

// ===== FINAL BATCH =====

chemicalHazardDB["Sodium Cyanide"] = {
  cas: "143-33-9", formula: "NaCN",
  de: "Natriumcyanid", es: "Cianuro de sodio", fr: "Cyanure de sodium", pt: "Cianeto de sódio",
  synonyms: ["Sodium salt of hydrocyanic acid"],
  classes: ["toxic", "environmental"],
  ghs: ["GHS06", "GHS09"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H410", text: "Very toxic to aquatic life with long lasting effects" },
    { code: "EUH032", text: "Contact with acids liberates very toxic gas" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield + goggles" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "SCBA" }, other: "EXTREMELY TOXIC. Gold mining, electroplating. Have cyanide antidote kit available." },
  storage: { cabinet: "Highly toxic storage (locked)", temp: "Dry", ventilation: "Good", incompatible: ["Acids (releases HCN)", "Oxidizers", "Water (absorbs CO2 from air)"] },
  transport: { un: "1689", class: "6.1", packingGroup: "I", properShipping: "Sodium cyanide" },
  firstAid: { inhalation: "Fresh air. Oxygen. Cyanide antidote. IMMEDIATE medical attention.", skin: "Remove clothing. Wash. Medical attention.", eyes: "Flush 20 min.", ingestion: "Do NOT vomit. IMMEDIATE medical attention." }
};

chemicalHazardDB["Picric Acid"] = {
  cas: "88-89-1", formula: "C₆H₃N₃O₇",
  de: "Pikrinsäure", es: "Ácido pícrico", fr: "Acide picrique", pt: "Ácido pícrico",
  synonyms: ["2,4,6-Trinitrophenol", "TNP"],
  classes: ["flammable", "toxic", "environmental"],
  ghs: ["GHS01", "GHS06", "GHS09"],
  hazardStatements: [
    { code: "H201", text: "Explosive; mass explosion hazard" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H400", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Rubber gloves" }, respiratory: { required: true, type: "Dust respirator" }, other: "EXPLOSIVE when dry. Keep wet (>10% water). Forms shock-sensitive metal picrates. Stains yellow." },
  storage: { cabinet: "Explosive storage (wet)", temp: "Cool", ventilation: "Normal", incompatible: ["Metals (forms explosive picrates)", "Bases", "Heat", "Shock", "Drying"] },
  transport: { un: "1344", class: "4.1", packingGroup: "I", properShipping: "Picric acid, wetted" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Ammonium Perchlorate"] = {
  cas: "7790-98-9", formula: "NH₄ClO₄",
  de: "Ammoniumperchlorat", es: "Perclorato de amonio", fr: "Perchlorate d'ammonium", pt: "Perclorato de amônio",
  synonyms: ["AP"],
  classes: ["oxidizer"],
  ghs: ["GHS01", "GHS03", "GHS07"],
  hazardStatements: [
    { code: "H201", text: "Explosive; mass explosion hazard" },
    { code: "H272", text: "May intensify fire; oxidizer" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "Dust respirator" }, other: "ROCKET PROPELLANT oxidizer. Explosive mixed with fuels. Thyroid disruptor." },
  storage: { cabinet: "Explosive/oxidizer storage", temp: "Cool, dry", ventilation: "Good", incompatible: ["Fuels", "Organics", "Reducing agents", "Metals", "Sulfur"] },
  transport: { un: "0402", class: "1.1D", packingGroup: "N/A", properShipping: "Ammonium perchlorate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

// ===== FINAL 21 TO HIT 350 =====

chemicalHazardDB["Potassium Permanganate"] = {
  cas: "7722-64-7", formula: "KMnO₄",
  de: "Kaliumpermanganat", es: "Permanganato de potasio", fr: "Permanganate de potassium", pt: "Permanganato de potássio",
  synonyms: ["Condy's crystals", "Chameleon mineral"],
  classes: ["oxidizer", "irritant", "environmental"],
  ghs: ["GHS03", "GHS07", "GHS09"],
  hazardStatements: [
    { code: "H272", text: "May intensify fire; oxidizer" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Rubber gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Disinfectant, water treatment. STAINS skin brown. Fire hazard with organics." },
  storage: { cabinet: "Oxidizer storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids", "Organics", "Reducing agents", "Glycerol", "Ethylene glycol"] },
  transport: { un: "1490", class: "5.1", packingGroup: "II", properShipping: "Potassium permanganate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash (staining is superficial).", eyes: "Flush 20 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Sodium Dichromate"] = {
  cas: "10588-01-9", formula: "Na₂Cr₂O₇",
  de: "Natriumdichromat", es: "Dicromato de sodio", fr: "Dichromate de sodium", pt: "Dicromato de sódio",
  synonyms: ["Sodium bichromate"],
  classes: ["oxidizer", "toxic", "health", "environmental"],
  ghs: ["GHS03", "GHS05", "GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H272", text: "May intensify fire; oxidizer" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H334", text: "May cause allergy or asthma if inhaled" },
    { code: "H340", text: "May cause genetic defects" },
    { code: "H350", text: "May cause cancer" },
    { code: "H360FD", text: "May damage fertility and unborn child" },
    { code: "H372", text: "Causes damage to organs" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield + goggles" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "P100 with acid gas" }, other: "CARCINOGEN. Hexavalent chromium. Leather tanning, wood preservation." },
  storage: { cabinet: "Carcinogen/oxidizer storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Organics", "Reducing agents", "Acids"] },
  transport: { un: "1479", class: "5.1 (6.1)", packingGroup: "II", properShipping: "Oxidizing solid, toxic" },
  firstAid: { inhalation: "Fresh air. IMMEDIATE medical attention.", skin: "Ascorbic acid solution, then wash.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Ascorbic acid. Medical attention." }
};

chemicalHazardDB["Lead(II) Acetate"] = {
  cas: "301-04-2", formula: "Pb(CH₃COO)₂",
  de: "Blei(II)-acetat", es: "Acetato de plomo(II)", fr: "Acétate de plomb(II)", pt: "Acetato de chumbo(II)",
  synonyms: ["Lead acetate", "Sugar of lead", "Saturn's sugar"],
  classes: ["toxic", "health", "environmental"],
  ghs: ["GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H360Df", text: "May damage unborn child, suspected fertility damage" },
    { code: "H373", text: "May cause damage to organs" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "P100 respirator" }, other: "Sweet taste (historically used as sweetener - poisonous!). Hair dye, paint drier." },
  storage: { cabinet: "Toxic storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong acids"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Lead acetate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention (chelation may be needed)." }
};

chemicalHazardDB["Arsenic Trioxide"] = {
  cas: "1327-53-3", formula: "As₂O₃",
  de: "Arsen(III)-oxid", es: "Trióxido de arsénico", fr: "Trioxyde d'arsenic", pt: "Trióxido de arsênio",
  synonyms: ["White arsenic", "Arsenic(III) oxide", "Arsenious oxide"],
  classes: ["toxic", "health", "environmental"],
  ghs: ["GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H350", text: "May cause cancer" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "Supplied air" }, other: "EXTREMELY TOXIC. Historical poison. Used in leukemia treatment (highly controlled)." },
  storage: { cabinet: "Highly toxic/carcinogen storage (locked)", temp: "Room temperature", ventilation: "Good", incompatible: ["Acids (releases arsine)", "Strong oxidizers"] },
  transport: { un: "1561", class: "6.1", packingGroup: "I", properShipping: "Arsenic trioxide" },
  firstAid: { inhalation: "Fresh air. IMMEDIATE medical attention.", skin: "Remove clothing. Wash.", eyes: "Flush 30 min.", ingestion: "IMMEDIATE medical attention. Do NOT vomit." }
};

chemicalHazardDB["Thallium(I) Sulfate"] = {
  cas: "7446-18-6", formula: "Tl₂SO₄",
  de: "Thallium(I)-sulfat", es: "Sulfato de talio(I)", fr: "Sulfate de thallium(I)", pt: "Sulfato de tálio(I)",
  synonyms: ["Thallous sulfate"],
  classes: ["toxic", "environmental"],
  ghs: ["GHS06", "GHS09"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H373", text: "May cause damage to organs" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "Supplied air" }, other: "EXTREMELY TOXIC. Former rat poison (banned). Causes hair loss." },
  storage: { cabinet: "Highly toxic storage (locked)", temp: "Room temperature", ventilation: "Good", incompatible: ["Strong acids", "Strong oxidizers"] },
  transport: { un: "1707", class: "6.1", packingGroup: "II", properShipping: "Thallium compound" },
  firstAid: { inhalation: "Fresh air. IMMEDIATE medical attention.", skin: "Remove clothing. Wash.", eyes: "Flush 30 min.", ingestion: "IMMEDIATE medical attention. Prussian blue is antidote." }
};

chemicalHazardDB["Methyl Bromide"] = {
  cas: "74-83-9", formula: "CH₃Br",
  de: "Methylbromid", es: "Bromuro de metilo", fr: "Bromure de méthyle", pt: "Brometo de metila",
  synonyms: ["Bromomethane", "MeBr"],
  classes: ["toxic", "environmental"],
  ghs: ["GHS04", "GHS06", "GHS08"],
  hazardStatements: [
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H373", text: "May cause damage to organs" },
    { code: "H420", text: "Harms ozone layer" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "SCBA" }, other: "Fumigant. OZONE DEPLETER (phased out). Nearly odorless - very dangerous." },
  storage: { cabinet: "Toxic gas storage", temp: "Below 52°C", ventilation: "Special", incompatible: ["Aluminum", "Zinc", "Magnesium", "Strong oxidizers"] },
  transport: { un: "1062", class: "2.3", packingGroup: "N/A", properShipping: "Methyl bromide" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Remove clothing. Wash.", eyes: "Flush 30 min.", ingestion: "IMMEDIATE medical attention." }
};

chemicalHazardDB["Ethylene Oxide"] = {
  cas: "75-21-8", formula: "C₂H₄O",
  de: "Ethylenoxid", es: "Óxido de etileno", fr: "Oxyde d'éthylène", pt: "Óxido de etileno",
  synonyms: ["EO", "Oxirane", "1,2-Epoxyethane"],
  classes: ["flammable", "toxic", "health"],
  ghs: ["GHS02", "GHS04", "GHS06", "GHS08"],
  hazardStatements: [
    { code: "H220", text: "Extremely flammable gas" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H340", text: "May cause genetic defects" },
    { code: "H350", text: "May cause cancer" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "SCBA" }, other: "CARCINOGEN. Medical device sterilization. Sweet ether-like odor." },
  storage: { cabinet: "Carcinogen/flammable gas storage", temp: "Cool", ventilation: "Special", incompatible: ["Acids", "Bases", "Oxidizers", "Metals"] },
  transport: { un: "1040", class: "2.3", packingGroup: "N/A", properShipping: "Ethylene oxide" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Remove clothing. Wash.", eyes: "Flush 30 min.", ingestion: "IMMEDIATE medical attention." }
};

chemicalHazardDB["Propylene Oxide"] = {
  cas: "75-56-9", formula: "C₃H₆O",
  de: "Propylenoxid", es: "Óxido de propileno", fr: "Oxyde de propylène", pt: "Óxido de propileno",
  synonyms: ["PO", "1,2-Propylene oxide", "Methyloxirane"],
  classes: ["flammable", "irritant", "health"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H224", text: "Extremely flammable liquid and vapor" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H350", text: "May cause cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl rubber gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "CARCINOGEN. Polyurethane foam production, fumigant." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Acids", "Bases", "Oxidizers", "Copper"] },
  transport: { un: "1280", class: "3", packingGroup: "I", properShipping: "Propylene oxide" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Epichlorohydrin"] = {
  cas: "106-89-8", formula: "C₃H₅ClO",
  de: "Epichlorhydrin", es: "Epiclorhidrina", fr: "Épichlorhydrine", pt: "Epicloridrina",
  synonyms: ["ECH", "1-Chloro-2,3-epoxypropane"],
  classes: ["flammable", "toxic", "health"],
  ghs: ["GHS02", "GHS05", "GHS06", "GHS08"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H350", text: "May cause cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber gloves, suit" }, respiratory: { required: true, type: "Organic vapor/acid gas respirator" }, other: "CARCINOGEN. Epoxy resin production. Strong lacrimator." },
  storage: { cabinet: "Carcinogen/flammable storage", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong acids", "Strong bases", "Strong oxidizers", "Amines"] },
  transport: { un: "2023", class: "6.1 (3)", packingGroup: "II", properShipping: "Epichlorohydrin" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Remove clothing. Flush 30 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Vinyl Chloride"] = {
  cas: "75-01-4", formula: "C₂H₃Cl",
  de: "Vinylchlorid", es: "Cloruro de vinilo", fr: "Chlorure de vinyle", pt: "Cloreto de vinila",
  synonyms: ["VCM", "Chloroethylene", "Chloroethene"],
  classes: ["flammable", "health"],
  ghs: ["GHS02", "GHS04", "GHS08"],
  hazardStatements: [
    { code: "H220", text: "Extremely flammable gas" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H350", text: "May cause cancer (liver angiosarcoma)" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "SCBA" }, other: "KNOWN CARCINOGEN. PVC monomer. Sweet odor at dangerous levels." },
  storage: { cabinet: "Carcinogen/flammable gas storage", temp: "Cool", ventilation: "Special", incompatible: ["Oxidizers", "Copper", "Aluminum"] },
  transport: { un: "1086", class: "2.1", packingGroup: "N/A", properShipping: "Vinyl chloride, stabilized" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Warm slowly (frostbite from liquid).", eyes: "Flush.", ingestion: "N/A (gas)." }
};

chemicalHazardDB["Vinylidene Chloride"] = {
  cas: "75-35-4", formula: "C₂H₂Cl₂",
  de: "Vinylidenchlorid", es: "Cloruro de vinilideno", fr: "Chlorure de vinylidène", pt: "Cloreto de vinilideno",
  synonyms: ["VDC", "1,1-Dichloroethylene", "1,1-DCE"],
  classes: ["flammable", "irritant", "health"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H224", text: "Extremely flammable liquid and vapor" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H351", text: "Suspected of causing cancer" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Butyl gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Saran wrap monomer (PVDC). CNS depressant." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool, dark", ventilation: "Well-ventilated", incompatible: ["Oxidizers", "Copper", "Aluminum", "Light", "Air (peroxides)"] },
  transport: { un: "1303", class: "3", packingGroup: "I", properShipping: "Vinylidene chloride, stabilized" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Methyl Isocyanate"] = {
  cas: "624-83-9", formula: "CH₃NCO",
  de: "Methylisocyanat", es: "Isocianato de metilo", fr: "Isocyanate de méthyle", pt: "Isocianato de metila",
  synonyms: ["MIC"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS06"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H334", text: "May cause allergy or asthma symptoms if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "EUH014", text: "Reacts violently with water" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield" }, skin: { required: true, type: "Full chemical suit, butyl gloves" }, respiratory: { required: true, type: "SCBA" }, other: "EXTREMELY TOXIC. BHOPAL DISASTER chemical. Pesticide intermediate. Eye irritation at ppb levels." },
  storage: { cabinet: "Highly toxic storage (special)", temp: "Cool, dry", ventilation: "Special", incompatible: ["Water", "Acids", "Bases", "Oxidizers", "Alcohols", "Amines"] },
  transport: { un: "2480", class: "6.1 (3)", packingGroup: "I", properShipping: "Methyl isocyanate" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Remove clothing. Wash 20 min.", eyes: "Flush 30 min. IMMEDIATE medical attention.", ingestion: "IMMEDIATE medical attention." }
};

chemicalHazardDB["Toluene Diisocyanate"] = {
  cas: "26471-62-5", formula: "C₉H₆N₂O₂",
  de: "Toluylendiisocyanat", es: "Diisocianato de tolueno", fr: "Diisocyanate de toluène", pt: "Diisocianato de tolueno",
  synonyms: ["TDI", "Toluene-2,4-diisocyanate (main isomer)"],
  classes: ["toxic", "health"],
  ghs: ["GHS06", "GHS08"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H334", text: "May cause allergy or asthma symptoms if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H351", text: "Suspected of causing cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Full chemical suit, butyl gloves" }, respiratory: { required: true, type: "Supplied air or isocyanate-rated respirator" }, other: "POTENT SENSITIZER. Polyurethane foam production. Strict exposure limits (5 ppb ceiling)." },
  storage: { cabinet: "Toxic storage", temp: "Cool, dry", ventilation: "Well-ventilated", incompatible: ["Water", "Alcohols", "Amines", "Bases", "Acids"] },
  transport: { un: "2078", class: "6.1", packingGroup: "II", properShipping: "Toluene diisocyanate" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Remove clothing. Wash.", eyes: "Flush 20 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Hexamethylene Diisocyanate"] = {
  cas: "822-06-0", formula: "C₈H₁₂N₂O₂",
  de: "Hexamethylendiisocyanat", es: "Diisocianato de hexametileno", fr: "Diisocyanate d'hexaméthylène", pt: "Diisocianato de hexametileno",
  synonyms: ["HDI", "HMDI", "1,6-Diisocyanatohexane"],
  classes: ["toxic", "health"],
  ghs: ["GHS06", "GHS08"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H334", text: "May cause allergy or asthma symptoms if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Full chemical suit, butyl gloves" }, respiratory: { required: true, type: "Supplied air or isocyanate-rated respirator" }, other: "POTENT SENSITIZER. Automotive coatings, wood finishes. Aliphatic isocyanate." },
  storage: { cabinet: "Toxic storage", temp: "Cool, dry", ventilation: "Well-ventilated", incompatible: ["Water", "Alcohols", "Amines", "Bases"] },
  transport: { un: "2281", class: "6.1", packingGroup: "II", properShipping: "Hexamethylene diisocyanate" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Remove clothing. Wash.", eyes: "Flush 20 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Diphenylmethane Diisocyanate"] = {
  cas: "101-68-8", formula: "C₁₅H₁₀N₂O₂",
  de: "Diphenylmethandiisocyanat", es: "Diisocianato de difenilmetano", fr: "Diisocyanate de diphénylméthane", pt: "Diisocianato de difenilmetano",
  synonyms: ["MDI", "Methylene diphenyl diisocyanate"],
  classes: ["irritant", "health"],
  ghs: ["GHS07", "GHS08"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H334", text: "May cause allergy or asthma symptoms if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H351", text: "Suspected of causing cancer" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "Isocyanate-rated respirator" }, other: "SENSITIZER. Most used isocyanate. Spray foam insulation, adhesives." },
  storage: { cabinet: "General/toxic storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Water", "Alcohols", "Amines", "Bases"] },
  transport: { un: "2489", class: "9", packingGroup: "III", properShipping: "Diphenylmethane diisocyanate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Nicotine"] = {
  cas: "54-11-5", formula: "C₁₀H₁₄N₂",
  de: "Nikotin", es: "Nicotina", fr: "Nicotine", pt: "Nicotina",
  synonyms: ["3-(1-Methyl-2-pyrrolidinyl)pyridine"],
  classes: ["toxic", "environmental"],
  ghs: ["GHS06", "GHS09"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H411", text: "Toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves (double)" }, respiratory: { required: false, type: "Ventilation" }, other: "EXTREMELY TOXIC pure form. Readily absorbed through skin. Lethal dose ~40-60 mg for adults." },
  storage: { cabinet: "Toxic storage (locked)", temp: "Cool", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong acids"] },
  transport: { un: "1654", class: "6.1", packingGroup: "II", properShipping: "Nicotine" },
  firstAid: { inhalation: "Fresh air.", skin: "Remove clothing. Wash immediately with soap.", eyes: "Flush 15 min.", ingestion: "IMMEDIATE medical attention. Activated charcoal if conscious." }
};

chemicalHazardDB["Caffeine"] = {
  cas: "58-08-2", formula: "C₈H₁₀N₄O₂",
  de: "Koffein", es: "Cafeína", fr: "Caféine", pt: "Cafeína",
  synonyms: ["1,3,7-Trimethylxanthine", "Guaranine", "Theine"],
  classes: ["toxic"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" }
  ],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "TOXIC in pure form (lethal ~10g). Food/beverage additive at safe levels." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Caffeine" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Medical attention if large amount. Activated charcoal." }
};

chemicalHazardDB["Strychnine"] = {
  cas: "57-24-9", formula: "C₂₁H₂₂N₂O₂",
  de: "Strychnin", es: "Estricnina", fr: "Strychnine", pt: "Estricnina",
  synonyms: ["Strychnidin-10-one"],
  classes: ["toxic", "environmental"],
  ghs: ["GHS06", "GHS09"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "P100 respirator" }, other: "EXTREMELY TOXIC. Historical poison/rodenticide. Causes convulsions." },
  storage: { cabinet: "Highly toxic storage (locked)", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "1692", class: "6.1", packingGroup: "I", properShipping: "Strychnine" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "IMMEDIATE medical attention. Diazepam for convulsions." }
};

chemicalHazardDB["Ricin"] = {
  cas: "9009-86-3", formula: "Protein",
  de: "Rizin", es: "Ricina", fr: "Ricine", pt: "Ricina",
  synonyms: ["Castor bean toxin"],
  classes: ["toxic"],
  ghs: ["GHS06"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "SCBA" }, other: "BIOLOGICAL WEAPON (Schedule 1). No antidote. Extracted from castor beans. Restricted/controlled." },
  storage: { cabinet: "Controlled substance (CDC select agent)", temp: "As specified", ventilation: "Special", incompatible: [] },
  transport: { un: "3172", class: "6.1", packingGroup: "I", properShipping: "Toxins, extracted from living sources" },
  firstAid: { inhalation: "Fresh air. IMMEDIATE medical attention.", skin: "Remove clothing. Wash.", eyes: "Flush 30 min.", ingestion: "IMMEDIATE medical attention. No antidote - supportive care only." }
};

chemicalHazardDB["Tetrodotoxin"] = {
  cas: "4368-28-9", formula: "C₁₁H₁₇N₃O₈",
  de: "Tetrodotoxin", es: "Tetrodotoxina", fr: "Tétrodotoxine", pt: "Tetrodotoxina",
  synonyms: ["TTX", "Puffer fish poison", "Fugu toxin"],
  classes: ["toxic"],
  ghs: ["GHS06"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves (double)" }, respiratory: { required: true, type: "Respirator" }, other: "EXTREMELY TOXIC (1,200x cyanide). Sodium channel blocker. No antidote." },
  storage: { cabinet: "Highly toxic storage", temp: "Refrigerated", ventilation: "Normal", incompatible: ["Strong acids", "Strong bases"] },
  transport: { un: "3172", class: "6.1", packingGroup: "I", properShipping: "Toxins, extracted from living sources" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "IMMEDIATE medical attention. Life support may be needed." }
};

// ===== THE FINAL 7 TO HIT 350! =====

chemicalHazardDB["Dimethyl Mercury"] = {
  cas: "593-74-8", formula: "(CH₃)₂Hg",
  de: "Dimethylquecksilber", es: "Dimetilmercurio", fr: "Diméthylmercure", pt: "Dimetilmercúrio",
  synonyms: ["DMM"],
  classes: ["toxic", "environmental"],
  ghs: ["GHS06", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H372", text: "Causes damage to organs (nervous system)" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield" }, skin: { required: true, type: "Special laminate gloves (NOT latex/nitrile)" }, respiratory: { required: true, type: "SCBA" }, other: "ONE OF THE MOST DANGEROUS CHEMICALS. Penetrates latex/nitrile in seconds. Karen Wetterhahn fatality (1997). Avoid entirely if possible." },
  storage: { cabinet: "Special toxic storage", temp: "Cool", ventilation: "Special", incompatible: ["Oxidizers"] },
  transport: { un: "3011", class: "6.1", packingGroup: "I", properShipping: "Mercury compound, liquid, n.o.s." },
  firstAid: { inhalation: "Fresh air. IMMEDIATE medical attention.", skin: "Remove ALL clothing. Wash. IMMEDIATE medical attention. Chelation needed.", eyes: "Flush 30 min.", ingestion: "IMMEDIATE medical attention." }
};

chemicalHazardDB["Osmium Tetroxide"] = {
  cas: "20816-12-0", formula: "OsO₄",
  de: "Osmiumtetroxid", es: "Tetróxido de osmio", fr: "Tétroxyde d'osmium", pt: "Tetróxido de ósmio",
  synonyms: ["Osmic acid", "Osmium(VIII) oxide"],
  classes: ["toxic", "corrosive", "oxidizer"],
  ghs: ["GHS03", "GHS05", "GHS06"],
  hazardStatements: [
    { code: "H271", text: "May cause fire or explosion; strong oxidizer" },
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H330", text: "Fatal if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield + sealed goggles" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "SCBA" }, other: "EXTREMELY TOXIC. Volatile. Stains tissues black (electron microscopy). Causes blindness." },
  storage: { cabinet: "Highly toxic storage (sealed)", temp: "Cool", ventilation: "Fume hood only", incompatible: ["Reducing agents", "Organics", "HCl"] },
  transport: { un: "2471", class: "6.1", packingGroup: "I", properShipping: "Osmium tetroxide" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Remove clothing. Flush 30 min.", eyes: "Flush 30 min. IMMEDIATE ophthalmologist.", ingestion: "IMMEDIATE medical attention." }
};

chemicalHazardDB["Diborane"] = {
  cas: "19287-45-7", formula: "B₂H₆",
  de: "Diboran", es: "Diborano", fr: "Diborane", pt: "Diborano",
  synonyms: ["Boroethane", "Boron hydride"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS04", "GHS06"],
  hazardStatements: [
    { code: "H220", text: "Extremely flammable gas" },
    { code: "H280", text: "Contains gas under pressure" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "EUH014", text: "Reacts violently with water" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield" }, skin: { required: true, type: "Full chemical suit" }, respiratory: { required: true, type: "SCBA" }, other: "PYROPHORIC - ignites spontaneously in moist air. Rocket fuel, semiconductor dopant." },
  storage: { cabinet: "Pyrophoric/toxic gas storage", temp: "Cool", ventilation: "Special", incompatible: ["Air", "Water", "Oxidizers", "Halogens", "Alcohols"] },
  transport: { un: "1911", class: "2.3 (2.1)", packingGroup: "N/A", properShipping: "Diborane" },
  firstAid: { inhalation: "Fresh air. Oxygen. IMMEDIATE medical attention.", skin: "Brush off dry. Flush.", eyes: "Flush 30 min.", ingestion: "N/A (gas)." }
};

chemicalHazardDB["Sarin"] = {
  cas: "107-44-8", formula: "C₄H₁₀FO₂P",
  de: "Sarin", es: "Sarín", fr: "Sarin", pt: "Sarin",
  synonyms: ["GB", "Isopropyl methylphosphonofluoridate"],
  classes: ["toxic"],
  ghs: ["GHS06"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield" }, skin: { required: true, type: "Level A suit" }, respiratory: { required: true, type: "SCBA" }, other: "CHEMICAL WEAPON (CWC Schedule 1). Nerve agent. Cholinesterase inhibitor. Atropine/pralidoxime antidote." },
  storage: { cabinet: "PROHIBITED except military/research", temp: "N/A", ventilation: "N/A", incompatible: ["All"] },
  transport: { un: "2810", class: "6.1", packingGroup: "I", properShipping: "Toxic liquid, organic" },
  firstAid: { inhalation: "Fresh air. Atropine. IMMEDIATE decontamination and medical attention.", skin: "Remove ALL clothing. Decontaminate.", eyes: "Flush 30 min.", ingestion: "IMMEDIATE medical attention." }
};

chemicalHazardDB["Tabun"] = {
  cas: "77-81-6", formula: "C₅H₁₁N₂O₂P",
  de: "Tabun", es: "Tabún", fr: "Tabun", pt: "Tabun",
  synonyms: ["GA", "Ethyl dimethylamidocyanophosphate"],
  classes: ["toxic"],
  ghs: ["GHS06"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield" }, skin: { required: true, type: "Level A suit" }, respiratory: { required: true, type: "SCBA" }, other: "CHEMICAL WEAPON (CWC Schedule 1). First nerve agent developed. Fruity odor." },
  storage: { cabinet: "PROHIBITED except military/research", temp: "N/A", ventilation: "N/A", incompatible: ["All"] },
  transport: { un: "2810", class: "6.1", packingGroup: "I", properShipping: "Toxic liquid, organic" },
  firstAid: { inhalation: "Fresh air. Atropine. IMMEDIATE medical attention.", skin: "Remove clothing. Decontaminate.", eyes: "Flush 30 min.", ingestion: "IMMEDIATE medical attention." }
};

chemicalHazardDB["VX"] = {
  cas: "50782-69-9", formula: "C₁₁H₂₆NO₂PS",
  de: "VX", es: "VX", fr: "VX", pt: "VX",
  synonyms: ["O-Ethyl S-[2-(diisopropylamino)ethyl] methylphosphonothioate"],
  classes: ["toxic"],
  ghs: ["GHS06"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield" }, skin: { required: true, type: "Level A suit" }, respiratory: { required: true, type: "SCBA" }, other: "MOST TOXIC CHEMICAL WEAPON. 10x more toxic than sarin. Persistent. Used in Kim Jong-nam assassination (2017)." },
  storage: { cabinet: "PROHIBITED except military/research", temp: "N/A", ventilation: "N/A", incompatible: ["All"] },
  transport: { un: "2810", class: "6.1", packingGroup: "I", properShipping: "Toxic liquid, organic" },
  firstAid: { inhalation: "Fresh air. Atropine + pralidoxime. IMMEDIATE decontamination.", skin: "Remove ALL clothing. Decontaminate immediately.", eyes: "Flush 30 min.", ingestion: "IMMEDIATE medical attention." }
};

chemicalHazardDB["Mustard Gas"] = {
  cas: "505-60-2", formula: "C₄H₈Cl₂S",
  de: "Senfgas", es: "Gas mostaza", fr: "Gaz moutarde", pt: "Gás mostarda",
  synonyms: ["Sulfur mustard", "HD", "Bis(2-chloroethyl) sulfide", "Yperite"],
  classes: ["toxic", "health"],
  ghs: ["GHS06", "GHS08"],
  hazardStatements: [
    { code: "H300", text: "Fatal if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H350", text: "May cause cancer" }
  ],
  ppe: { eyes: { required: true, type: "Full face shield" }, skin: { required: true, type: "Level A suit" }, respiratory: { required: true, type: "SCBA" }, other: "CHEMICAL WEAPON (CWC Schedule 1). Vesicant/blister agent. WWI. Delayed symptoms (hours). No antidote - supportive care." },
  storage: { cabinet: "PROHIBITED except military/research", temp: "N/A", ventilation: "N/A", incompatible: ["All"] },
  transport: { un: "2810", class: "6.1", packingGroup: "I", properShipping: "Toxic liquid, organic" },
  firstAid: { inhalation: "Fresh air. IMMEDIATE decontamination. Supportive care.", skin: "Remove clothing. Decontaminate immediately. Do NOT rub.", eyes: "Flush 30 min.", ingestion: "IMMEDIATE medical attention." }
};

// ===== LABORATORY REAGENTS =====

chemicalHazardDB["Sodium Hydroxide Pellets"] = {
  cas: "1310-73-2", formula: "NaOH",
  de: "Natriumhydroxid-Plätzchen", es: "Perlas de hidróxido de sodio", fr: "Pastilles d'hydroxyde de sodium", pt: "Pérolas de hidróxido de sódio",
  synonyms: ["Caustic soda pellets", "Lye", "Sodium hydrate"],
  classes: ["corrosive"],
  ghs: ["GHS05"],
  hazardStatements: [
    { code: "H290", text: "May be corrosive to metals" },
    { code: "H314", text: "Causes severe skin burns and eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Rubber gloves" }, respiratory: { required: false, type: "Dust mask if handling powder" }, other: "Generates heat when dissolving. Add to water slowly." },
  storage: { cabinet: "Corrosive storage (dry)", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids", "Water (exothermic)", "Aluminum", "Zinc"] },
  transport: { un: "1823", class: "8", packingGroup: "II", properShipping: "Sodium hydroxide, solid" },
  firstAid: { inhalation: "Fresh air.", skin: "Flush 20 min.", eyes: "Flush 30 min. IMMEDIATE medical attention.", ingestion: "Rinse mouth. Do NOT vomit. Drink water/milk." }
};

chemicalHazardDB["Potassium Hydroxide Pellets"] = {
  cas: "1310-58-3", formula: "KOH",
  de: "Kaliumhydroxid-Plätzchen", es: "Perlas de hidróxido de potasio", fr: "Pastilles d'hydroxyde de potassium", pt: "Pérolas de hidróxido de potássio",
  synonyms: ["Caustic potash", "Potassium hydrate", "Lye"],
  classes: ["corrosive"],
  ghs: ["GHS05"],
  hazardStatements: [
    { code: "H290", text: "May be corrosive to metals" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H314", text: "Causes severe skin burns and eye damage" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Rubber gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "More soluble than NaOH. Battery electrolyte, soap making." },
  storage: { cabinet: "Corrosive storage (dry)", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids", "Water (exothermic)", "Aluminum", "Zinc"] },
  transport: { un: "1813", class: "8", packingGroup: "II", properShipping: "Potassium hydroxide, solid" },
  firstAid: { inhalation: "Fresh air.", skin: "Flush 20 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Do NOT vomit." }
};

chemicalHazardDB["Ammonium Chloride"] = {
  cas: "12125-02-9", formula: "NH₄Cl",
  de: "Ammoniumchlorid", es: "Cloruro de amonio", fr: "Chlorure d'ammonium", pt: "Cloreto de amônio",
  synonyms: ["Sal ammoniac", "Salmiac"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Flux, fertilizer, cough medicine, food additive (E510)" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases (releases ammonia)", "Strong acids"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Ammonium chloride" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Drink water." }
};

chemicalHazardDB["Ammonium Sulfate"] = {
  cas: "7783-20-2", formula: "(NH₄)₂SO₄",
  de: "Ammoniumsulfat", es: "Sulfato de amonio", fr: "Sulfate d'ammonium", pt: "Sulfato de amônio",
  synonyms: ["Diammonium sulfate", "Mascagnite"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Fertilizer, protein precipitation, flame retardant" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases (releases ammonia)", "Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Ammonium sulfate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Sodium Phosphate Monobasic"] = {
  cas: "7558-80-7", formula: "NaH₂PO₄",
  de: "Natriumdihydrogenphosphat", es: "Fosfato monosódico", fr: "Phosphate monosodique", pt: "Fosfato monossódico",
  synonyms: ["Monosodium phosphate", "MSP", "Sodium dihydrogen phosphate"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Buffer, food additive (E339i), laxative" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: [] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Sodium phosphate monobasic" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Sodium Phosphate Dibasic"] = {
  cas: "7558-79-4", formula: "Na₂HPO₄",
  de: "Dinatriumhydrogenphosphat", es: "Fosfato disódico", fr: "Phosphate disodique", pt: "Fosfato dissódico",
  synonyms: ["Disodium phosphate", "DSP", "Disodium hydrogen phosphate"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Buffer, food additive (E339ii), water treatment" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: [] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Sodium phosphate dibasic" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["EDTA Disodium Salt"] = {
  cas: "6381-92-6", formula: "C₁₀H₁₄N₂Na₂O₈",
  de: "EDTA-Dinatriumsalz", es: "Sal disódica de EDTA", fr: "Sel disodique d'EDTA", pt: "Sal dissódico de EDTA",
  synonyms: ["Disodium EDTA", "Ethylenediaminetetraacetic acid disodium salt", "Edetate disodium"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Chelating agent, preservative, blood anticoagulant" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "EDTA disodium salt" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Tris Buffer"] = {
  cas: "77-86-1", formula: "C₄H₁₁NO₃",
  de: "Tris-Puffer", es: "Tampón Tris", fr: "Tampon Tris", pt: "Tampão Tris",
  synonyms: ["Tris(hydroxymethyl)aminomethane", "THAM", "Trometamol"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Biological buffer (pH 7-9), medical use for acidosis" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: [] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Tris buffer" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["HEPES Buffer"] = {
  cas: "7365-45-9", formula: "C₈H₁₈N₂O₄S",
  de: "HEPES-Puffer", es: "Tampón HEPES", fr: "Tampon HEPES", pt: "Tampão HEPES",
  synonyms: ["4-(2-Hydroxyethyl)-1-piperazineethanesulfonic acid"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Cell culture buffer, non-toxic to cells" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: [] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "HEPES" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

// ===== RUBBER & PLASTICS ADDITIVES =====

chemicalHazardDB["Sulfur (Rubber Grade)"] = {
  cas: "7704-34-9", formula: "S₈",
  de: "Schwefel (Gummiqualität)", es: "Azufre (grado caucho)", fr: "Soufre (qualité caoutchouc)", pt: "Enxofre (grau borracha)",
  synonyms: ["Vulcanizing agent", "Rubber sulfur"],
  classes: ["flammable"],
  ghs: ["GHS02"],
  hazardStatements: [
    { code: "H228", text: "Flammable solid" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves" }, respiratory: { required: true, type: "Dust mask" }, other: "Tire vulcanization, matches. Dust explosion hazard." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "1350", class: "4.1", packingGroup: "III", properShipping: "Sulfur" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Zinc Stearate"] = {
  cas: "557-05-1", formula: "Zn(C₁₇H₃₅COO)₂",
  de: "Zinkstearat", es: "Estearato de zinc", fr: "Stéarate de zinc", pt: "Estearato de zinco",
  synonyms: ["Zinc distearate"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Mold release, lubricant, cosmetics, rubber activator" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids", "Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Zinc stearate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Calcium Stearate"] = {
  cas: "1592-23-0", formula: "Ca(C₁₇H₃₅COO)₂",
  de: "Calciumstearat", es: "Estearato de calcio", fr: "Stéarate de calcium", pt: "Estearato de cálcio",
  synonyms: ["Calcium distearate", "E470a"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "PVC stabilizer, lubricant, waterproofing, food additive" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong acids"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Calcium stearate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Generally safe." }
};

chemicalHazardDB["Dibutyltin Dilaurate"] = {
  cas: "77-58-7", formula: "C₃₂H₆₄O₄Sn",
  de: "Dibutylzinndilaurat", es: "Dilaurato de dibutilestaño", fr: "Dilaurate de dibutylétain", pt: "Dilaurato de dibutil-estanho",
  synonyms: ["DBTDL", "T-12 catalyst"],
  classes: ["toxic", "environmental"],
  ghs: ["GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H360FD", text: "May damage fertility and unborn child" },
    { code: "H411", text: "Toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Ventilation" }, other: "Silicone/polyurethane catalyst. REPRODUCTIVE TOXIN (organotin)." },
  storage: { cabinet: "Toxic storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong acids"] },
  transport: { un: "3146", class: "6.1", packingGroup: "III", properShipping: "Organotin compound, solid" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["2-Mercaptobenzothiazole"] = {
  cas: "149-30-4", formula: "C₇H₅NS₂",
  de: "2-Mercaptobenzothiazol", es: "2-Mercaptobenzotiazol", fr: "2-Mercaptobenzothiazole", pt: "2-Mercaptobenzotiazol",
  synonyms: ["MBT", "Captax"],
  classes: ["irritant", "environmental"],
  ghs: ["GHS07", "GHS09"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H411", text: "Toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Rubber accelerator, corrosion inhibitor. Common allergen." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong bases"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "2-Mercaptobenzothiazole" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

// ===== PAINT & COATING CHEMICALS =====

chemicalHazardDB["Cobalt Naphthenate"] = {
  cas: "61789-51-3", formula: "Co(C₁₁H₇O₂)₂",
  de: "Cobaltnaphthenat", es: "Naftenato de cobalto", fr: "Naphténate de cobalt", pt: "Naftenato de cobalto",
  synonyms: ["Cobalt drier"],
  classes: ["irritant", "health", "environmental"],
  ghs: ["GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H334", text: "May cause allergy or asthma if inhaled" },
    { code: "H341", text: "Suspected of causing genetic defects" },
    { code: "H350i", text: "May cause cancer by inhalation" },
    { code: "H360F", text: "May damage fertility" },
    { code: "H411", text: "Toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Paint drier/catalyst. Cobalt compounds are sensitizers and suspected carcinogens." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Good", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Cobalt naphthenate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Lead Chromate"] = {
  cas: "7758-97-6", formula: "PbCrO₄",
  de: "Bleichromat", es: "Cromato de plomo", fr: "Chromate de plomb", pt: "Cromato de chumbo",
  synonyms: ["Chrome yellow", "CI Pigment Yellow 34"],
  classes: ["toxic", "health", "environmental"],
  ghs: ["GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H350", text: "May cause cancer" },
    { code: "H360Df", text: "May damage unborn child, suspected fertility damage" },
    { code: "H373", text: "May cause damage to organs" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "P100 respirator" }, other: "CARCINOGEN. Historic yellow pigment. Being phased out." },
  storage: { cabinet: "Carcinogen storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Reducing agents"] },
  transport: { un: "3288", class: "6.1", packingGroup: "III", properShipping: "Toxic solid, inorganic" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Cadmium Sulfide"] = {
  cas: "1306-23-6", formula: "CdS",
  de: "Cadmiumsulfid", es: "Sulfuro de cadmio", fr: "Sulfure de cadmium", pt: "Sulfeto de cádmio",
  synonyms: ["Cadmium yellow", "CI Pigment Yellow 37"],
  classes: ["toxic", "health", "environmental"],
  ghs: ["GHS07", "GHS08", "GHS09"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H340", text: "May cause genetic defects" },
    { code: "H350", text: "May cause cancer" },
    { code: "H360FD", text: "May damage fertility and unborn child" },
    { code: "H372", text: "Causes damage to organs" },
    { code: "H410", text: "Very toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "P100 respirator" }, other: "CARCINOGEN. Artist pigment, photocells. Being restricted." },
  storage: { cabinet: "Carcinogen storage", temp: "Room temperature", ventilation: "Good", incompatible: ["Acids (releases H2S)", "Strong oxidizers"] },
  transport: { un: "2570", class: "6.1", packingGroup: "III", properShipping: "Cadmium compound" },
  firstAid: { inhalation: "Fresh air. IMMEDIATE medical attention.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Barium Sulfate"] = {
  cas: "7727-43-7", formula: "BaSO₄",
  de: "Bariumsulfat", es: "Sulfato de bario", fr: "Sulfate de baryum", pt: "Sulfato de bário",
  synonyms: ["Barite", "Blanc fixe", "E513"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "NON-TOXIC (insoluble). X-ray contrast, paint filler, drilling mud. NOT the same as barium chloride." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Aluminum powder (thermite)"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Barium sulfate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Generally safe (used medically)." }
};

// ===== PHARMACEUTICAL CHEMICALS =====

chemicalHazardDB["Paracetamol"] = {
  cas: "103-90-2", formula: "C₈H₉NO₂",
  de: "Paracetamol", es: "Paracetamol", fr: "Paracétamol", pt: "Paracetamol",
  synonyms: ["Acetaminophen", "APAP", "Tylenol"],
  classes: ["toxic"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" }
  ],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "TOXIC in overdose (liver failure). Therapeutic at proper dose. N-acetylcysteine is antidote." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Paracetamol" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "N-acetylcysteine if overdose. Medical attention." }
};

chemicalHazardDB["Aspirin"] = {
  cas: "50-78-2", formula: "C₉H₈O₄",
  de: "Aspirin", es: "Aspirina", fr: "Aspirine", pt: "Aspirina",
  synonyms: ["Acetylsalicylic acid", "ASA"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: false, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Analgesic, antiplatelet. GI bleeding risk. Not for children (Reye's syndrome)." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases", "Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Aspirin" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention if large dose." }
};

chemicalHazardDB["Ibuprofen"] = {
  cas: "15687-27-1", formula: "C₁₃H₁₈O₂",
  de: "Ibuprofen", es: "Ibuprofeno", fr: "Ibuprofène", pt: "Ibuprofeno",
  synonyms: ["Advil", "Motrin", "2-(4-Isobutylphenyl)propionic acid"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "NSAID. GI/cardiovascular risks with chronic use." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Ibuprofen" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Medical attention if large dose." }
};

chemicalHazardDB["Lidocaine Hydrochloride"] = {
  cas: "73-78-9", formula: "C₁₄H₂₂N₂O·HCl",
  de: "Lidocainhydrochlorid", es: "Clorhidrato de lidocaína", fr: "Chlorhydrate de lidocaïne", pt: "Cloridrato de lidocaína",
  synonyms: ["Lignocaine HCl", "Xylocaine"],
  classes: ["toxic"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Local anesthetic, cardiac antiarrhythmic. CNS toxicity in overdose." },
  storage: { cabinet: "Pharmaceutical storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Lidocaine hydrochloride" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Medical attention." }
};

// ===== MINING & METALLURGY =====

chemicalHazardDB["Sodium Thiocyanate"] = {
  cas: "540-72-7", formula: "NaSCN",
  de: "Natriumthiocyanat", es: "Tiocianato de sodio", fr: "Thiocyanate de sodium", pt: "Tiocianato de sódio",
  synonyms: ["Sodium rhodanide", "Sodium sulfocyanate"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Gold extraction, textile dyeing, photography. Releases HCN with strong acids." },
  storage: { cabinet: "General storage (away from acids)", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids (releases HCN)", "Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Sodium thiocyanate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Xanthate"] = {
  cas: "140-90-9", formula: "C₂H₅OCS₂Na",
  de: "Xanthat", es: "Xantato", fr: "Xanthate", pt: "Xantato",
  synonyms: ["Sodium ethyl xanthate", "SEX", "Potassium amyl xanthate"],
  classes: ["flammable", "toxic", "environmental"],
  ghs: ["GHS02", "GHS07", "GHS09"],
  hazardStatements: [
    { code: "H228", text: "Flammable solid" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H411", text: "Toxic to aquatic life" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "Dust mask" }, other: "Mineral flotation agent (ore processing). Releases CS2 when heated/acidified." },
  storage: { cabinet: "Flammable solid storage", temp: "Cool, dry", ventilation: "Good", incompatible: ["Acids", "Oxidizers", "Heat"] },
  transport: { un: "3342", class: "4.2", packingGroup: "II", properShipping: "Xanthates" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Cresylic Acid"] = {
  cas: "1319-77-3", formula: "CH₃C₆H₄OH",
  de: "Kresole", es: "Ácido cresílico", fr: "Acide crésylique", pt: "Ácido cresílico",
  synonyms: ["Cresols", "Methylphenol", "Hydroxytoluene"],
  classes: ["toxic", "corrosive"],
  ghs: ["GHS05", "GHS06"],
  hazardStatements: [
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H331", text: "Toxic if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber gloves, suit" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Coal tar derivative. Disinfectant (Lysol), ore flotation, resin production." },
  storage: { cabinet: "Toxic/corrosive storage", temp: "Room temperature", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Strong bases"] },
  transport: { un: "2076", class: "6.1", packingGroup: "II", properShipping: "Cresols" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wipe with PEG 300, then wash.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

// ===== MORE WATER TREATMENT =====

chemicalHazardDB["Sodium Bisulfite"] = {
  cas: "7631-90-5", formula: "NaHSO₃",
  de: "Natriumhydrogensulfit", es: "Bisulfito de sodio", fr: "Bisulfite de sodium", pt: "Bissulfito de sódio",
  synonyms: ["Sodium hydrogen sulfite", "E222"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "EUH031", text: "Contact with acids liberates toxic gas (SO₂)" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Dechlorination, food preservative, reducing agent" },
  storage: { cabinet: "General storage (away from acids)", temp: "Room temperature", ventilation: "Normal", incompatible: ["Acids (releases SO2)", "Strong oxidizers"] },
  transport: { un: "2693", class: "8", packingGroup: "III", properShipping: "Bisulfites, aqueous solution" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Ferric Sulfate"] = {
  cas: "10028-22-5", formula: "Fe₂(SO₄)₃",
  de: "Eisen(III)-sulfat", es: "Sulfato férrico", fr: "Sulfate ferrique", pt: "Sulfato férrico",
  synonyms: ["Iron(III) sulfate", "Ferric sulfate"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Water/wastewater treatment coagulant, etching" },
  storage: { cabinet: "Corrosive storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases", "Metals"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Ferric sulfate" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Alum"] = {
  cas: "7784-24-9", formula: "KAl(SO₄)₂·12H₂O",
  de: "Alaun", es: "Alumbre", fr: "Alun", pt: "Alúmen",
  synonyms: ["Potassium alum", "Potash alum", "Aluminum potassium sulfate"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Water treatment, pickling, deodorant, styptic" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong bases"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Alum" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

// ===== TEXTILE & PAPER CHEMICALS =====

chemicalHazardDB["Sodium Chlorite"] = {
  cas: "7758-19-2", formula: "NaClO₂",
  de: "Natriumchlorit", es: "Clorito de sodio", fr: "Chlorite de sodium", pt: "Clorito de sódio",
  synonyms: ["Chlorous acid sodium salt"],
  classes: ["oxidizer", "toxic", "corrosive"],
  ghs: ["GHS03", "GHS05", "GHS06"],
  hazardStatements: [
    { code: "H271", text: "May cause fire or explosion; strong oxidizer" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H310", text: "Fatal in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H373", text: "May cause damage to organs" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Rubber gloves, suit" }, respiratory: { required: true, type: "Chlorine-rated respirator" }, other: "Textile/paper bleaching, ClO2 generation. EXPLOSIVE when dry or with organics." },
  storage: { cabinet: "Oxidizer storage (separate)", temp: "Cool", ventilation: "Good", incompatible: ["Acids (generates ClO2)", "Organics", "Reducing agents", "Heat"] },
  transport: { un: "1496", class: "5.1", packingGroup: "II", properShipping: "Sodium chlorite" },
  firstAid: { inhalation: "Fresh air. Oxygen. Medical attention.", skin: "Flush 30 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Optical Brightener"] = {
  cas: "Various", formula: "Various",
  de: "Optischer Aufheller", es: "Blanqueador óptico", fr: "Azurant optique", pt: "Branqueador óptico",
  synonyms: ["Fluorescent whitening agent", "FWA", "OBA"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Dust mask" }, other: "Absorbs UV, emits blue. Laundry, paper, plastics, cosmetics." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Optical brightener" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Sizing Agent"] = {
  cas: "Various", formula: "Various",
  de: "Leimungsmittel", es: "Agente de encolado", fr: "Agent d'encollage", pt: "Agente de colagem",
  synonyms: ["Starch", "Rosin size", "AKD", "ASA"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Paper/textile treatment for water resistance, printability" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: [] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Sizing agent" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

// ===== MORE ORGANIC SOLVENTS =====

chemicalHazardDB["1-Butanol"] = {
  cas: "71-36-3", formula: "C₄H₉OH",
  de: "1-Butanol", es: "1-Butanol", fr: "1-Butanol", pt: "1-Butanol",
  synonyms: ["n-Butanol", "n-Butyl alcohol", "Butan-1-ol"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS05", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Coating solvent, biofuel. Fruity odor." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Strong acids"] },
  transport: { un: "1120", class: "3", packingGroup: "III", properShipping: "Butanols" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["2-Butanol"] = {
  cas: "78-92-2", formula: "C₄H₉OH",
  de: "2-Butanol", es: "2-Butanol", fr: "2-Butanol", pt: "2-Butanol",
  synonyms: ["sec-Butanol", "sec-Butyl alcohol", "Butan-2-ol"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "MEK solvent, industrial solvent" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers"] },
  transport: { un: "1120", class: "3", packingGroup: "III", properShipping: "Butanols" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Isobutanol"] = {
  cas: "78-83-1", formula: "C₄H₉OH",
  de: "Isobutanol", es: "Isobutanol", fr: "Isobutanol", pt: "Isobutanol",
  synonyms: ["Isobutyl alcohol", "2-Methyl-1-propanol", "IBA"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS05", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H318", text: "Causes serious eye damage" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H336", text: "May cause drowsiness or dizziness" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Coating solvent, fuel additive" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers"] },
  transport: { un: "1212", class: "3", packingGroup: "III", properShipping: "Isobutanol" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 20 min. Medical attention.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["tert-Butanol"] = {
  cas: "75-65-0", formula: "C₄H₉OH",
  de: "tert-Butanol", es: "tert-Butanol", fr: "tert-Butanol", pt: "tert-Butanol",
  synonyms: ["tert-Butyl alcohol", "2-Methyl-2-propanol", "TBA"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Solvent, denaturant, MTBE precursor. Low melting point (25°C)." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Strong acids"] },
  transport: { un: "1120", class: "3", packingGroup: "II", properShipping: "Butanols" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["1-Pentanol"] = {
  cas: "71-41-0", formula: "C₅H₁₁OH",
  de: "1-Pentanol", es: "1-Pentanol", fr: "1-Pentanol", pt: "1-Pentanol",
  synonyms: ["n-Pentanol", "n-Amyl alcohol", "Pentan-1-ol"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H332", text: "Harmful if inhaled" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Solvent, fusel oil component" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers"] },
  transport: { un: "1105", class: "3", packingGroup: "III", properShipping: "Pentanols" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["1-Hexanol"] = {
  cas: "111-27-3", formula: "C₆H₁₃OH",
  de: "1-Hexanol", es: "1-Hexanol", fr: "1-Hexanol", pt: "1-Hexanol",
  synonyms: ["n-Hexanol", "Hexyl alcohol", "Caproyl alcohol"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Fragrance, plasticizer intermediate" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers"] },
  transport: { un: "2282", class: "3", packingGroup: "III", properShipping: "Hexanols" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

// ===== FINAL STRETCH =====

chemicalHazardDB["Benzyl Alcohol"] = {
  cas: "100-51-6", formula: "C₆H₅CH₂OH",
  de: "Benzylalkohol", es: "Alcohol bencílico", fr: "Alcool benzylique", pt: "Álcool benzílico",
  synonyms: ["Phenylmethanol", "Benzenemethanol"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Ventilation" }, other: "Preservative, solvent, fragrance. Low toxicity." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Benzyl alcohol" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Furfuryl Alcohol"] = {
  cas: "98-00-0", formula: "C₅H₆O₂",
  de: "Furfurylalkohol", es: "Alcohol furfurílico", fr: "Alcool furfurylique", pt: "Álcool furfurílico",
  synonyms: ["2-Furanmethanol", "FA"],
  classes: ["flammable", "toxic", "health"],
  ghs: ["GHS02", "GHS06", "GHS08"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H331", text: "Toxic if inhaled" },
    { code: "H351", text: "Suspected of causing cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Foundry resin, rocket fuel. Polymerizes with acids (exothermic)." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Good", incompatible: ["Acids (polymerizes violently)", "Oxidizers"] },
  transport: { un: "2874", class: "6.1", packingGroup: "III", properShipping: "Furfuryl alcohol" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Tetrahydrofurfuryl Alcohol"] = {
  cas: "97-99-4", formula: "C₅H₁₀O₂",
  de: "Tetrahydrofurfurylalkohol", es: "Alcohol tetrahidrofurfurílico", fr: "Alcool tétrahydrofurfurylique", pt: "Álcool tetra-hidrofurfurílico",
  synonyms: ["THFA", "Tetrahydro-2-furanmethanol"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Ventilation" }, other: "High-boiling solvent, resin intermediate" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Tetrahydrofurfuryl alcohol" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Cyclohexanol"] = {
  cas: "108-93-0", formula: "C₆H₁₁OH",
  de: "Cyclohexanol", es: "Ciclohexanol", fr: "Cyclohexanol", pt: "Ciclo-hexanol",
  synonyms: ["Hexahydrophenol", "Cyclohexyl alcohol"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Nylon intermediate, solvent. Camphor-like odor." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Good", incompatible: ["Strong oxidizers", "Strong acids"] },
  transport: { un: "1987", class: "3", packingGroup: "III", properShipping: "Alcohols, n.o.s." },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

// ===== THE FINAL 15 TO HIT 400! =====

chemicalHazardDB["Allyl Alcohol"] = {
  cas: "107-18-6", formula: "C₃H₅OH",
  de: "Allylalkohol", es: "Alcohol alílico", fr: "Alcool allylique", pt: "Álcool alílico",
  synonyms: ["2-Propen-1-ol", "Propenyl alcohol"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS06"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H331", text: "Toxic if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Butyl rubber gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Glycerol/allyl esters production. Lacrimator." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Strong acids", "CCl4"] },
  transport: { un: "1098", class: "6.1 (3)", packingGroup: "I", properShipping: "Allyl alcohol" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash 20 min.", eyes: "Flush 20 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Propargyl Alcohol"] = {
  cas: "107-19-7", formula: "C₃H₄O",
  de: "Propargylalkohol", es: "Alcohol propargílico", fr: "Alcool propargylique", pt: "Álcool propargílico",
  synonyms: ["2-Propyn-1-ol", "Propynol"],
  classes: ["flammable", "toxic", "corrosive"],
  ghs: ["GHS02", "GHS05", "GHS06"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H331", text: "Toxic if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Corrosion inhibitor, pharmaceutical intermediate" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Strong acids", "Strong bases"] },
  transport: { un: "1986", class: "3", packingGroup: "II", properShipping: "Alcohols, flammable, toxic" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Flush 20 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Crotyl Alcohol"] = {
  cas: "6117-91-5", formula: "C₄H₇OH",
  de: "Crotylalkohol", es: "Alcohol crotílico", fr: "Alcool crotylique", pt: "Álcool crotílico",
  synonyms: ["2-Buten-1-ol", "Crotonic alcohol"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H312", text: "Harmful in contact with skin" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H332", text: "Harmful if inhaled" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Chemical intermediate" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Good", incompatible: ["Strong oxidizers"] },
  transport: { un: "2614", class: "3", packingGroup: "III", properShipping: "Methallyl alcohol" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Diacetyl"] = {
  cas: "431-03-8", formula: "C₄H₆O₂",
  de: "Diacetyl", es: "Diacetilo", fr: "Diacétyle", pt: "Diacetil",
  synonyms: ["2,3-Butanedione", "Biacetyl", "Butter flavoring"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "POPCORN LUNG (bronchiolitis obliterans) risk at occupational exposures. Butter flavor." },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers"] },
  transport: { un: "1993", class: "3", packingGroup: "II", properShipping: "Flammable liquid" },
  firstAid: { inhalation: "Fresh air. Medical attention for respiratory symptoms.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Acetaldehyde"] = {
  cas: "75-07-0", formula: "CH₃CHO",
  de: "Acetaldehyd", es: "Acetaldehído", fr: "Acétaldéhyde", pt: "Acetaldeído",
  synonyms: ["Ethanal", "Acetic aldehyde"],
  classes: ["flammable", "irritant", "health"],
  ghs: ["GHS02", "GHS07", "GHS08"],
  hazardStatements: [
    { code: "H224", text: "Extremely flammable liquid and vapor" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H351", text: "Suspected of causing cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Alcohol metabolism product, chemical intermediate. Fruity odor." },
  storage: { cabinet: "Flammable cabinet (cold)", temp: "Below 4°C", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Acids", "Bases", "Amines"] },
  transport: { un: "1089", class: "3", packingGroup: "I", properShipping: "Acetaldehyde" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Propionaldehyde"] = {
  cas: "123-38-6", formula: "C₂H₅CHO",
  de: "Propionaldehyd", es: "Propionaldehído", fr: "Propionaldéhyde", pt: "Propionaldeído",
  synonyms: ["Propanal", "Propionic aldehyde"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Chemical intermediate, plastic additive" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Acids", "Bases"] },
  transport: { un: "1275", class: "3", packingGroup: "II", properShipping: "Propionaldehyde" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Butyraldehyde"] = {
  cas: "123-72-8", formula: "C₃H₇CHO",
  de: "Butyraldehyd", es: "Butiraldehído", fr: "Butyraldéhyde", pt: "Butiraldeído",
  synonyms: ["Butanal", "n-Butyraldehyde"],
  classes: ["flammable", "irritant"],
  ghs: ["GHS02", "GHS07"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Plasticizer, resin intermediate" },
  storage: { cabinet: "Flammable cabinet", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Acids", "Bases"] },
  transport: { un: "1129", class: "3", packingGroup: "II", properShipping: "Butyraldehyde" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Crotonaldehyde"] = {
  cas: "4170-30-3", formula: "CH₃CH=CHCHO",
  de: "Crotonaldehyd", es: "Crotonaldehído", fr: "Crotonaldéhyde", pt: "Crotonaldeído",
  synonyms: ["2-Butenal", "Crotonic aldehyde"],
  classes: ["flammable", "toxic", "health"],
  ghs: ["GHS02", "GHS05", "GHS06", "GHS08"],
  hazardStatements: [
    { code: "H225", text: "Highly flammable liquid and vapor" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H314", text: "Causes severe skin burns and eye damage" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H341", text: "Suspected of causing genetic defects" },
    { code: "H351", text: "Suspected of causing cancer" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles + face shield" }, skin: { required: true, type: "Butyl rubber gloves, suit" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "Very toxic. Sorbic acid production, fuel additive." },
  storage: { cabinet: "Toxic/flammable storage", temp: "Cool", ventilation: "Well-ventilated", incompatible: ["Strong oxidizers", "Acids", "Bases", "Amines"] },
  transport: { un: "1143", class: "6.1 (3)", packingGroup: "I", properShipping: "Crotonaldehyde" },
  firstAid: { inhalation: "Fresh air. IMMEDIATE medical attention.", skin: "Flush 20 min.", eyes: "Flush 30 min. Medical attention.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Furfural"] = {
  cas: "98-01-1", formula: "C₅H₄O₂",
  de: "Furfural", es: "Furfural", fr: "Furfural", pt: "Furfural",
  synonyms: ["2-Furaldehyde", "Furan-2-carbaldehyde", "Fural"],
  classes: ["flammable", "toxic"],
  ghs: ["GHS02", "GHS06"],
  hazardStatements: [
    { code: "H226", text: "Flammable liquid and vapor" },
    { code: "H301", text: "Toxic if swallowed" },
    { code: "H311", text: "Toxic in contact with skin" },
    { code: "H330", text: "Fatal if inhaled" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Chemical goggles" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: true, type: "Organic vapor respirator" }, other: "From agricultural waste. Solvent, resin, furan production." },
  storage: { cabinet: "Toxic/flammable storage", temp: "Cool, dark", ventilation: "Good", incompatible: ["Strong oxidizers", "Strong acids", "Strong bases"] },
  transport: { un: "1199", class: "6.1", packingGroup: "II", properShipping: "Furfuraldehydes" },
  firstAid: { inhalation: "Fresh air. Medical attention.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth. Medical attention." }
};

chemicalHazardDB["Glyoxal"] = {
  cas: "107-22-2", formula: "OCHCHO",
  de: "Glyoxal", es: "Glioxal", fr: "Glyoxal", pt: "Glioxal",
  synonyms: ["Ethanedial", "Oxaldehyde"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Nitrile gloves" }, respiratory: { required: false, type: "Ventilation" }, other: "Crosslinking agent, textile finishing, paper treatment" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong bases"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Glyoxal" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Methylglyoxal"] = {
  cas: "78-98-8", formula: "CH₃COCHO",
  de: "Methylglyoxal", es: "Metilglioxal", fr: "Méthylglyoxal", pt: "Metilglioxal",
  synonyms: ["Pyruvaldehyde", "2-Oxopropanal"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Ventilation" }, other: "Manuka honey component (antibacterial), metabolic intermediate" },
  storage: { cabinet: "General storage (cold)", temp: "Refrigerated", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong bases"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Methylglyoxal" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Succinaldehyde"] = {
  cas: "638-37-9", formula: "OCHCH₂CH₂CHO",
  de: "Succindialdehyd", es: "Succinaldehído", fr: "Succinaldéhyde", pt: "Succinaldeído",
  synonyms: ["Butanedial", "1,4-Butanedial"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Ventilation" }, other: "Crosslinking agent, organic synthesis" },
  storage: { cabinet: "General storage", temp: "Cool", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Succinaldehyde" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Malonaldehyde"] = {
  cas: "542-78-9", formula: "OCHCH₂CHO",
  de: "Malondialdehyd", es: "Malonaldehído", fr: "Malonaldéhyde", pt: "Malonaldeído",
  synonyms: ["Malondialdehyde", "MDA", "Propanedial"],
  classes: ["irritant", "health"],
  ghs: ["GHS07", "GHS08"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H319", text: "Causes serious eye irritation" },
    { code: "H335", text: "May cause respiratory irritation" },
    { code: "H341", text: "Suspected of causing genetic defects" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Ventilation" }, other: "Lipid peroxidation marker, mutagen. Research chemical." },
  storage: { cabinet: "General storage (cold)", temp: "Refrigerated", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Malonaldehyde" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Cinnamaldehyde"] = {
  cas: "104-55-2", formula: "C₆H₅CH=CHCHO",
  de: "Zimtaldehyd", es: "Cinamaldehído", fr: "Cinnamaldéhyde", pt: "Cinamaldeído",
  synonyms: ["Cinnamic aldehyde", "3-Phenyl-2-propenal"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H315", text: "Causes skin irritation" },
    { code: "H317", text: "May cause allergic skin reaction" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Ventilation" }, other: "Cinnamon flavor/scent. Common allergen." },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong bases"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Cinnamaldehyde" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Vanillin"] = {
  cas: "121-33-5", formula: "C₈H₈O₃",
  de: "Vanillin", es: "Vainillina", fr: "Vanilline", pt: "Vanilina",
  synonyms: ["4-Hydroxy-3-methoxybenzaldehyde", "Vanilla flavor"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Synthetic vanilla flavor. Generally safe." },
  storage: { cabinet: "General storage", temp: "Room temperature, dry", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Vanillin" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Generally safe." }
};

// ===== THE FINAL 2! =====

chemicalHazardDB["Anisaldehyde"] = {
  cas: "123-11-5", formula: "CH₃OC₆H₄CHO",
  de: "Anisaldehyd", es: "Anisaldehído", fr: "Anisaldéhyde", pt: "Anisaldeído",
  synonyms: ["4-Methoxybenzaldehyde", "p-Anisaldehyde"],
  classes: ["irritant"],
  ghs: ["GHS07"],
  hazardStatements: [
    { code: "H302", text: "Harmful if swallowed" },
    { code: "H319", text: "Causes serious eye irritation" }
  ],
  ppe: { eyes: { required: true, type: "Safety glasses" }, skin: { required: true, type: "Gloves" }, respiratory: { required: false, type: "Ventilation" }, other: "Anise/licorice scent, perfumery, TLC stain" },
  storage: { cabinet: "General storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers", "Strong bases"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Anisaldehyde" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush 15 min.", ingestion: "Rinse mouth." }
};

chemicalHazardDB["Piperonal"] = {
  cas: "120-57-0", formula: "C₈H₆O₃",
  de: "Piperonal", es: "Piperonal", fr: "Pipéronal", pt: "Piperonal",
  synonyms: ["Heliotropin", "3,4-Methylenedioxybenzaldehyde"],
  classes: [],
  ghs: [],
  hazardStatements: [],
  ppe: { eyes: { required: false, type: "Safety glasses" }, skin: { required: false, type: "Optional" }, respiratory: { required: false, type: "Dust mask" }, other: "Cherry/almond/vanilla fragrance. CONTROLLED PRECURSOR (MDMA synthesis)." },
  storage: { cabinet: "Controlled storage", temp: "Room temperature", ventilation: "Normal", incompatible: ["Strong oxidizers"] },
  transport: { un: "Not regulated", class: "N/A", packingGroup: "N/A", properShipping: "Piperonal" },
  firstAid: { inhalation: "Fresh air.", skin: "Wash.", eyes: "Flush.", ingestion: "Rinse mouth." }
};

// ========================================
// 🎉 CHEMICAL DATABASE COMPLETE: 400 CHEMICALS!
// ========================================

// Print final count
console.log("Final chemical count:", Object.keys(chemicalHazardDB).length);
