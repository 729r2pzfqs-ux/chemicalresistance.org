// Chemical Resistance App v2 - External data loading
// 1,600+ chemicals × 24 materials

// Common German → English translations
const translations = {
    'aceton': 'Acetone', 'schwefelsäure': 'Sulfuric Acid', 'salzsäure': 'Hydrochloric Acid',
    'natronlauge': 'Sodium Hydroxide', 'natriumhydroxid': 'Sodium Hydroxide',
    'salpetersäure': 'Nitric Acid', 'phosphorsäure': 'Phosphoric Acid',
    'essigsäure': 'Acetic Acid', 'ammoniak': 'Ammonia', 'benzin': 'Gasoline',
    'diesel': 'Diesel', 'methanol': 'Methanol', 'ethanol': 'Ethanol',
    'isopropanol': 'Isopropanol', 'toluol': 'Toluene', 'xylol': 'Xylene',
    'formaldehyd': 'Formaldehyde', 'wasserstoffperoxid': 'Hydrogen Peroxide',
    'natriumhypochlorit': 'Sodium Hypochlorite', 'chlor': 'Chlorine',
    'fluor': 'Fluorine', 'brom': 'Bromine', 'iod': 'Iodine',
    'kalilauge': 'Potassium Hydroxide', 'kaliumhydroxid': 'Potassium Hydroxide',
    'zitronensäure': 'Citric Acid', 'milchsäure': 'Lactic Acid',
    'ameisensäure': 'Formic Acid', 'oxalsäure': 'Oxalic Acid',
    'chromsäure': 'Chromic Acid', 'flusssäure': 'Hydrofluoric Acid',
    'wasser': 'Water', 'meerwasser': 'Seawater', 'sole': 'Brine',
    'glycerin': 'Glycerin', 'glykol': 'Glycol', 'öl': 'Oil',
    'hydrauliköl': 'Hydraulic Oil', 'motoröl': 'Motor Oil', 'heizöl': 'Fuel Oil',
    'benzol': 'Benzene', 'cyclohexan': 'Cyclohexane', 'heptan': 'Heptane',
    'hexan': 'Hexane', 'pentan': 'Pentane', 'oktan': 'Octane',
    'chloroform': 'Chloroform', 'dichlormethan': 'Dichloromethane',
    'tetrachlorkohlenstoff': 'Carbon Tetrachloride', 'perchlorethylen': 'Perchloroethylene',
    'trichlorethylen': 'Trichloroethylene', 'butanol': 'Butanol',
    'propanol': 'Propanol', 'phenol': 'Phenol', 'anilin': 'Aniline',
    'pyridin': 'Pyridine', 'acrolein': 'Acrolein', 'harnstoff': 'Urea',
    'natriumchlorid': 'Sodium Chloride', 'natriumcarbonat': 'Sodium Carbonate',
    'natriumsulfat': 'Sodium Sulfate', 'natriumnitrat': 'Sodium Nitrate',
    'kaliumchlorid': 'Potassium Chloride', 'calciumchlorid': 'Calcium Chloride',
    'magnesiumchlorid': 'Magnesium Chloride', 'eisenchlorid': 'Iron Chloride',
    'kupfersulfat': 'Copper Sulfate', 'zinksulfat': 'Zinc Sulfate',
    'aluminiuimchlorid': 'Aluminum Chloride', 'bariumchlorid': 'Barium Chloride',
    'bleiche': 'Bleach', 'seife': 'Soap', 'waschmittel': 'Detergent',
    'bier': 'Beer', 'wein': 'Wine', 'milch': 'Milk', 'fruchtsaft': 'Fruit Juice',
    'blut': 'Blood', 'urin': 'Urine', 'kot': 'Feces',
    'natrium': 'Sodium', 'kalium': 'Potassium', 'calcium': 'Calcium',
    'magnesium': 'Magnesium', 'aluminium': 'Aluminum', 'eisen': 'Iron',
    'kupfer': 'Copper', 'zink': 'Zinc', 'blei': 'Lead', 'quecksilber': 'Mercury',
    'silber': 'Silver', 'gold': 'Gold', 'platin': 'Platinum', 'nickel': 'Nickel',
};

const materialInfo = {
    // Thermoplastics
    "HDPE": { name: "HDPE", full: "High-Density Polyethylene", full_es: "Polietileno de Alta Densidad", type: "Thermoplastic", type_es: "Termoplástico" },
    "LDPE": { name: "LDPE", full: "Low-Density Polyethylene", full_es: "Polietileno de Baja Densidad", type: "Thermoplastic", type_es: "Termoplástico" },
    "PA": { name: "PA", full: "Polyamide (Nylon)", full_es: "Poliamida (Nylon)", type: "Thermoplastic", type_es: "Termoplástico" },
    "PC": { name: "PC", full: "Polycarbonate", full_es: "Policarbonato", type: "Thermoplastic", type_es: "Termoplástico" },
    "PETG": { name: "PETG", full: "Polyethylene Terephthalate Glycol", full_es: "Tereftalato de Polietileno Glicol", type: "Thermoplastic", type_es: "Termoplástico" },
    "PMP": { name: "PMP", full: "Polymethylpentene (TPX)", full_es: "Polimetilpenteno (TPX)", type: "Thermoplastic", type_es: "Termoplástico" },
    "POM": { name: "POM", full: "Polyoxymethylene (Acetal)", full_es: "Polioximetileno (Acetal)", type: "Thermoplastic", type_es: "Termoplástico" },
    "PP": { name: "PP", full: "Polypropylene", full_es: "Polipropileno", type: "Thermoplastic", type_es: "Termoplástico" },
    "PS": { name: "PS", full: "Polystyrene", full_es: "Poliestireno", type: "Thermoplastic", type_es: "Termoplástico" },
    "PSU": { name: "PSU", full: "Polysulfone", full_es: "Polisulfona", type: "Thermoplastic", type_es: "Termoplástico" },
    "PVC_HART": { name: "PVC-U", full: "Unplasticized PVC (Rigid)", full_es: "PVC Rígido (Sin Plastificante)", type: "Thermoplastic", type_es: "Termoplástico" },
    "PVC_WEICH": { name: "PVC-P", full: "Plasticized PVC (Flexible)", full_es: "PVC Flexible (Plastificado)", type: "Thermoplastic", type_es: "Termoplástico" },
    "SAN": { name: "SAN", full: "Styrene Acrylonitrile", full_es: "Estireno Acrilonitrilo", type: "Thermoplastic", type_es: "Termoplástico" },
    // Fluoropolymers
    "ECTFE_ETFE": { name: "ECTFE/ETFE", full: "Fluoropolymer (Halar/Tefzel)", full_es: "Fluoropolímero (Halar/Tefzel)", type: "Fluoropolymer", type_es: "Fluoropolímero" },
    "FEP": { name: "FEP", full: "Fluorinated Ethylene Propylene", full_es: "Etileno Propileno Fluorado", type: "Fluoropolymer", type_es: "Fluoropolímero" },
    "PTFE": { name: "PTFE", full: "Polytetrafluoroethylene (Teflon®)", full_es: "Politetrafluoroetileno (Teflón®)", type: "Fluoropolymer", type_es: "Fluoropolímero" },
    "PVDF": { name: "PVDF", full: "Polyvinylidene Fluoride (Kynar)", full_es: "Fluoruro de Polivinilideno (Kynar)", type: "Fluoropolymer", type_es: "Fluoropolímero" },
    // Elastomers
    "EPDM": { name: "EPDM", full: "Ethylene Propylene Diene Rubber", full_es: "Caucho de Etileno Propileno Dieno", type: "Elastomer", type_es: "Elastómero" },
    "FPM": { name: "FPM/FKM", full: "Fluoroelastomer (Viton®)", full_es: "Fluoroelastómero (Viton®)", type: "Elastomer", type_es: "Elastómero" },
    "NBR": { name: "NBR", full: "Nitrile Rubber (Buna-N)", full_es: "Caucho Nitrilo (Buna-N)", type: "Elastomer", type_es: "Elastómero" },
    "SI": { name: "Silicone", name_es: "Silicona", full: "Silicone Rubber (VMQ)", full_es: "Caucho de Silicona (VMQ)", type: "Elastomer", type_es: "Elastómero" },
    // Metals
    "AL": { name: "Aluminum", name_es: "Aluminio", full: "Aluminum", full_es: "Aluminio", type: "Metal", type_es: "Metal" },
    "V2A": { name: "SS 304", full: "Stainless Steel 1.4301 (304)", full_es: "Acero Inoxidable 1.4301 (304)", type: "Metal", type_es: "Metal" },
    "V4A": { name: "SS 316", full: "Stainless Steel 1.4401 (316)", full_es: "Acero Inoxidable 1.4401 (316)", type: "Metal", type_es: "Metal" },
};

// Rating display order (best to worst)
const ratingOrder = { '1': 0, '2': 1, '3': 2, '4': 3, '0': 4 };

// GHS pictogram emojis (fallback - always works)
const ghsEmoji = {
    'GHS01': '💥', // Explosive
    'GHS02': '🔥', // Flammable
    'GHS03': '⭕', // Oxidizing
    'GHS04': '🔵', // Gas cylinder
    'GHS05': '🧪', // Corrosive
    'GHS06': '☠️', // Toxic
    'GHS07': '⚠️', // Harmful
    'GHS08': '🫁', // Health hazard
    'GHS09': '🌿', // Environmental
};

// Map old EU hazard codes to GHS pictograms
const euToGhs = {
    'T+': { ghs: 'GHS06', label: 'Very Toxic' },
    'T': { ghs: 'GHS06', label: 'Toxic' },
    'C+': { ghs: 'GHS05', label: 'Very Corrosive' },
    'C': { ghs: 'GHS05', label: 'Corrosive' },
    'Xn': { ghs: 'GHS07', label: 'Harmful' },
    'Xi': { ghs: 'GHS07', label: 'Irritant' },
    'F+': { ghs: 'GHS02', label: 'Extremely Flammable' },
    'F': { ghs: 'GHS02', label: 'Flammable' },
    'O': { ghs: 'GHS03', label: 'Oxidizing' },
    'N': { ghs: 'GHS09', label: 'Environmental Hazard' },
};

function getHazardBadges(hazardStr) {
    if (!hazardStr || hazardStr === '—') return '';
    const codes = hazardStr.replace(/[()]/g, '').split(/[,\s]+/).filter(c => c && c !== '—');
    const seenGhs = new Set();
    
    return codes.map(code => {
        const info = euToGhs[code];
        if (info && !seenGhs.has(info.ghs)) {
            seenGhs.add(info.ghs);
            const emoji = ghsEmoji[info.ghs];
            return `<span title="${info.label} (${code})" class="text-base">${emoji}</span>`;
        }
        return '';
    }).filter(Boolean).join(' ');
}

// Convert numeric ratings to letter grades for display
function ratingToGrade(val) {
    const map = { '1': 'A', '2': 'B', '3': 'C', '4': 'D', '0': 'NR' };
    return map[val] || 'NR';
}

// Global state
let chemicals = [];
let chemicalGroups = {};
let currentGroupIndices = [];
let currentSelectedIdx = 0;
let currentLang = window.pageLang || document.documentElement.lang || 'en';

// Initialize app
async function init() {
    try {
        const response = await fetch('data/chemicals_burkle_full.json');
        chemicals = await response.json();
        buildIndex();
        setupEventListeners();
        showDefaultChemical();
        console.log(`Loaded ${chemicals.length} chemicals with ${Object.keys(materialInfo).length} materials`);
    } catch (err) {
        console.error('Failed to load chemical data:', err);
        document.getElementById('searchInput').placeholder = 'Error loading data...';
    }
}

// Build search index
function buildIndex() {
    chemicalGroups = {};
    chemicals.forEach((c, idx) => {
        const key = getChemicalKey(c);
        if (!chemicalGroups[key]) {
            chemicalGroups[key] = [];
        }
        chemicalGroups[key].push(idx);
    });
}

function getChemicalKey(c) {
    // Use German name as canonical key (all data is German)
    return c.name.toLowerCase();
}

function translateName(germanName) {
    const lower = germanName.toLowerCase();
    // Use comprehensive translations from chemical_translations_en.js
    if (typeof chemicalTranslations !== 'undefined' && chemicalTranslations[lower]) {
        return chemicalTranslations[lower];
    }
    return germanName;
}

function getDisplayName(c) {
    if (currentLang === 'de') return c.name;
    if (currentLang === 'es') return c.name_es || c.name;
    return translateName(c.name);
}

function getSecondaryName(c) {
    if (currentLang === 'de') {
        const en = translateName(c.name);
        return en !== c.name ? en : '';
    }
    if (currentLang === 'es') {
        // For Spanish, show German as secondary
        return c.name_es && c.name_es !== c.name ? c.name : '';
    }
    // For English, show German as secondary
    const en = translateName(c.name);
    return en !== c.name ? c.name : '';
}

// Translate concentration terms
function translateConc(conc) {
    if (!conc) return 'Pure / Undiluted';
    const translations = {
        'jede': 'Any', 'konz.': 'Concentrated', 'konz': 'Concentrated',
        'wässrig': 'Aqueous', 'rauchend': 'Fuming', 'gesättigt': 'Saturated',
        'verdünnt': 'Diluted', 'techn. rein': 'Technical Grade',
        'rein': 'Pure', 'flüssig': 'Liquid', 'gasförmig': 'Gaseous',
        'fest': 'Solid', 'Pulver': 'Powder', 'gemahlen': 'Ground',
        'geschmolzen': 'Molten', 'feucht': 'Moist', 'gering': 'Low'
    };
    if (translations[conc]) return translations[conc];
    for (const [de, en] of Object.entries(translations)) {
        if (conc.includes(de)) return conc.replace(de, en);
    }
    return conc;
}

// Helper functions for material filters
function getSelectedMaterials() {
    const checkboxes = document.querySelectorAll('#materialFilters input[type="checkbox"]:checked, #moreMaterials input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

window.clearMaterialFilters = function() {
    document.querySelectorAll('#materialFilters input[type="checkbox"], #moreMaterials input[type="checkbox"]').forEach(cb => cb.checked = false);
    const searchResults = document.getElementById('searchResults');
    const searchInput = document.getElementById('searchInput');
    if (searchInput.value.length < 2) {
        searchResults.classList.add('hidden');
    } else {
        showSearchResults(searchInput.value.toLowerCase().trim());
    }
    // Update table to show all materials again
    if (currentGroupIndices.length > 0) {
        updateRatingsTable();
    }
};

window.toggleMoreMaterials = function() {
    const more = document.getElementById('moreMaterials');
    const btn = document.getElementById('moreMatBtn');
    if (!more || !btn) return;
    if (more.classList.contains('hidden')) {
        more.classList.remove('hidden');
        btn.textContent = '−Less';
    } else {
        more.classList.add('hidden');
        btn.textContent = '+More';
    }
};

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const langSelect = document.getElementById('langSelect');
    const ratingFilter = document.getElementById('ratingFilter');

    // Search input - only trigger on text search, not material selection
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            searchResults.classList.add('hidden');
            return;
        }
        showSearchResults(query);
        searchResults.classList.remove('hidden');
    });

    // Material checkbox changes - only update the results TABLE, don't trigger search
    document.addEventListener('change', (e) => {
        if (e.target.matches('#materialFilters input[type="checkbox"], #moreMaterials input[type="checkbox"]')) {
            // Update the results table if a chemical is displayed
            if (currentGroupIndices.length > 0) {
                updateRatingsTable();
            }
        }
    });

    // Rating filter change - update the table
    ratingFilter?.addEventListener('change', () => {
        if (currentGroupIndices.length > 0) {
            updateRatingsTable();
        }
    });

    // Click on search result
    searchResults.addEventListener('click', (e) => {
        const item = e.target.closest('[data-key]');
        if (item) {
            const key = item.dataset.key;
            const indices = chemicalGroups[key];
            if (indices?.length > 0) {
                showResultsForGroup(indices);
                searchResults.classList.add('hidden');
            }
        }
    });

    // Language switch
    langSelect?.addEventListener('change', () => {
        if (langSelect.value === 'de') {
            window.location.href = 'de.html';
        } else if (langSelect.value === 'es') {
            window.location.href = 'es.html';
        } else if (langSelect.value === 'fr') {
            window.location.href = 'fr.html';
        } else if (langSelect.value === 'pt') {
            window.location.href = 'pt.html';
        } else if (langSelect.value === 'en') {
            window.location.href = 'index.html';
        }
    });

    // Close search on click outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.add('hidden');
        }
    });
}

function showSearchResults(query) {
    const searchResults = document.getElementById('searchResults');
    
    const seenDisplayNames = new Set();
    const matchInfo = {};
    const queryLower = query.toLowerCase();

    chemicals.forEach((c, idx) => {
        const displayName = getDisplayName(c);
        const displayNameLower = displayName.toLowerCase();
        
        // Search by displayed name, aliases, CAS, formula, or Spanish name
        const aliasMatch = c.aliases && c.aliases.some(a => a.toLowerCase().includes(queryLower));
        const spanishMatch = c.name_es && c.name_es.toLowerCase().includes(queryLower);
        const germanMatch = c.name.toLowerCase().includes(queryLower);
        const textMatches = 
            displayNameLower.includes(queryLower) ||
            aliasMatch ||
            spanishMatch ||
            germanMatch ||
            (c.cas && c.cas.includes(query)) ||
            (c.formula && c.formula.toLowerCase().includes(queryLower));
        
        if (textMatches) {
            const displayKey = displayNameLower;
            if (!seenDisplayNames.has(displayKey)) {
                seenDisplayNames.add(displayKey);
                const key = getChemicalKey(c);
                matchInfo[displayKey] = { chem: c, indices: chemicalGroups[key], key };
            }
        }
    });

    // Sort: exact matches first, then starts-with, then contains
    const sortedMatches = Array.from(seenDisplayNames).sort((a, b) => {
        const aExact = a === query;
        const bExact = b === query;
        if (aExact && !bExact) return -1;
        if (bExact && !aExact) return 1;
        
        const aStarts = a.startsWith(query);
        const bStarts = b.startsWith(query);
        if (aStarts && !bStarts) return -1;
        if (bStarts && !aStarts) return 1;
        
        return a.localeCompare(b);
    }).slice(0, 20);

    if (sortedMatches.length > 0) {
        searchResults.innerHTML = sortedMatches.map(displayKey => {
            const info = matchInfo[displayKey];
            const c = info.chem;
            const displayName = getDisplayName(c);
            const chemKey = info.key; // Use original chemical key for lookup
            
            return `
                <div class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0" data-key="${chemKey}">
                    <div class="font-medium text-gray-900">${highlightMatch(displayName, query)}</div>
                </div>
            `;
        }).join('');
        searchResults.classList.remove('hidden');
    } else {
        searchResults.innerHTML = `<div class="px-4 py-3 text-gray-500">No chemicals found</div>`;
        searchResults.classList.remove('hidden');
    }
}

function highlightMatch(text, query) {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query);
    if (idx >= 0) {
        return text.slice(0, idx) + '<mark class="search-highlight">' + text.slice(idx, idx + query.length) + '</mark>' + text.slice(idx + query.length);
    }
    return text;
}

function showDefaultChemical() {
    // Show Acetone as default (key is German 'aceton')
    const acetoneKey = 'aceton';
    const indices = chemicalGroups[acetoneKey];
    if (indices?.length > 0) {
        showResultsForGroup(indices);
    }
}

function showResultsForGroup(indices) {
    currentGroupIndices = indices;
    currentSelectedIdx = 0;
    
    const firstChem = chemicals[indices[0]];
    const displayName = getDisplayName(firstChem);
    const secondaryName = getSecondaryName(firstChem);
    
    document.getElementById('chemName').textContent = displayName;
    document.getElementById('chemNameDe').textContent = secondaryName ? `(${secondaryName})` : '';
    
    const formulaEl = document.getElementById('chemFormula');
    formulaEl.textContent = firstChem.formula || '';
    formulaEl.style.display = firstChem.formula ? 'inline' : 'none';
    
    const casEl = document.getElementById('chemCas');
    casEl.textContent = firstChem.cas ? `CAS: ${firstChem.cas}` : '';
    casEl.style.display = firstChem.cas ? 'inline' : 'none';

    // Hazard badges
    const hazardEl = document.getElementById('chemHazard');
    if (hazardEl) {
        const badges = getHazardBadges(firstChem.hazard);
        hazardEl.innerHTML = badges;
        hazardEl.style.display = badges ? 'inline-flex' : 'none';
        hazardEl.className = 'flex gap-1 items-center';
    }
    
    // Flammable indicator (if not already covered by hazard)
    const flammableEl = document.getElementById('chemFlammable');
    if (flammableEl) {
        const hasFlammableHazard = firstChem.hazard && (firstChem.hazard.includes('F') || firstChem.hazard.includes('F+'));
        flammableEl.style.display = (firstChem.flammable && !hasFlammableHazard) ? 'inline' : 'none';
    }
    
    document.getElementById('searchInput').value = displayName;

    // Concentration selector
    const concContainer = document.getElementById('chemConc');
    const concWrapper = document.getElementById('chemConcWrapper');
    
    if (indices.length > 1) {
        const sortedIndices = [...indices].sort((a, b) => {
            const concA = chemicals[a].concentration || '';
            const concB = chemicals[b].concentration || '';
            const numA = parseFloat(concA.match(/[\d.]+/)?.[0]) || 999;
            const numB = parseFloat(concB.match(/[\d.]+/)?.[0]) || 999;
            return numA - numB;
        });
        currentGroupIndices = sortedIndices;
        
        const options = sortedIndices.map((idx, i) => {
            const c = chemicals[idx];
            const label = translateConc(c.concentration);
            return `<option value="${i}" ${i === 0 ? 'selected' : ''}>${label}</option>`;
        }).join('');
        
        concContainer.innerHTML = `
            <span class="font-semibold text-amber-800">Concentration:</span>
            <select id="concSelect" class="ml-2 bg-white text-amber-900 font-bold px-3 py-1 rounded border-2 border-amber-400 cursor-pointer focus:border-amber-500 focus:outline-none">
                ${options}
            </select>
            <span class="text-xs text-amber-600 ml-2">← Select to update table</span>
        `;
        concWrapper.style.display = 'inline-flex';
        
        document.getElementById('concSelect').addEventListener('change', (e) => {
            currentSelectedIdx = parseInt(e.target.value);
            updateRatingsTable();
        });
    } else {
        const conc = translateConc(firstChem.concentration);
        if (conc && conc !== 'Pure / Undiluted') {
            concContainer.innerHTML = `<span class="font-semibold text-amber-800">Concentration:</span> <span class="font-bold text-amber-900">${conc}</span>`;
            concWrapper.style.display = 'inline-flex';
        } else {
            concWrapper.style.display = 'none';
        }
    }

    updateRatingsTable();
    document.getElementById('results').classList.remove('hidden');
    lucide?.createIcons();
}

function updateRatingsTable() {
    const chem = chemicals[currentGroupIndices[currentSelectedIdx]];
    if (!chem || !chem.ratings) return;
    
    const tbody = document.getElementById('ratingsTable');
    const recommended = [];
    const selectedMaterials = getSelectedMaterials();
    const ratingFilter = document.getElementById('ratingFilter');
    const minRating = ratingFilter?.value || '12'; // '1' = A only, '12' = A or B
    
    // Get materials to show - either selected ones or all
    let materialsToShow;
    if (selectedMaterials.length > 0) {
        // Only show selected materials
        materialsToShow = selectedMaterials
            .filter(mat => chem.ratings[mat])
            .map(mat => [mat, chem.ratings[mat]]);
    } else {
        // Show all materials, sorted by rating, filtered by rating preference
        materialsToShow = Object.entries(chem.ratings)
            .filter(([mat, rating]) => {
                if (minRating === '1') return rating.c20 === '1';
                if (minRating === '12') return ['1', '2'].includes(rating.c20);
                return true;
            })
            .sort((a, b) => {
                const orderA = ratingOrder[a[1].c20] ?? 4;
                const orderB = ratingOrder[b[1].c20] ?? 4;
                return orderA - orderB;
            });
    }

    if (materialsToShow.length === 0) {
        const noMaterialsMsg = currentLang === 'es' 
            ? `No hay materiales con clasificación ${minRating === '1' ? 'A' : 'A/B'} para este químico. Intenta cambiar el filtro.`
            : `No materials with ${minRating === '1' ? 'A' : 'A/B'} rating for this chemical. Try changing the filter.`;
        tbody.innerHTML = `<tr><td colspan="4" class="py-6 text-center text-gray-500">${noMaterialsMsg}</td></tr>`;
    } else {
        tbody.innerHTML = materialsToShow.map(([mat, rating]) => {
            const info = materialInfo[mat] || { name: mat, full: mat, type: '' };
            const grade20 = ratingToGrade(rating.c20);
            const grade50 = ratingToGrade(rating.c50);
            
            // Use Spanish translations if available and lang is es
            const displayName = (currentLang === 'es' && info.name_es) ? info.name_es : info.name;
            const displayFull = (currentLang === 'es' && info.full_es) ? info.full_es : info.full;
            const displayType = (currentLang === 'es' && info.type_es) ? info.type_es : info.type;
            
            if (grade20 === 'A') recommended.push(displayName);
            
            return `
                <tr class="border-b border-gray-100 hover:bg-gray-50">
                    <td class="py-3 px-4">
                        <div class="font-medium text-gray-900">${displayName}</div>
                        <div class="text-xs text-gray-500">${displayFull}</div>
                    </td>
                    <td class="py-3 px-4 text-center">
                        <span class="rating-${grade20} px-3 py-1 rounded text-sm font-bold">${grade20}</span>
                    </td>
                    <td class="py-3 px-4 text-center">
                        <span class="rating-${grade50} px-3 py-1 rounded text-sm font-bold">${grade50}</span>
                    </td>
                    <td class="py-3 px-4 text-gray-500 text-sm">${displayType}</td>
                </tr>
            `;
        }).join('');
    }

    // Update recommendations
    const recMaterials = document.getElementById('recMaterials');
    const recommendation = document.getElementById('recommendation');
    
    if (recMaterials) {
        recMaterials.textContent = recommended.length > 0 
            ? recommended.join(', ') 
            : 'Check ratings below - limited compatibility';
    }
    
    if (recommendation) {
        recommendation.className = recommended.length > 0
            ? 'p-4 bg-emerald-50 border-b border-emerald-100'
            : 'p-4 bg-amber-50 border-b border-amber-100';
    }
}

// Global search function
window.searchFor = function(term) {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = term;
    setTimeout(() => {
        searchInput.dispatchEvent(new Event('input'));
    }, 0);
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
