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
    // Thermoplaste
    "HDPE": { name: "HDPE", full: "Polyethylen hoher Dichte", type: "Thermoplast" },
    "LDPE": { name: "LDPE", full: "Polyethylen niedriger Dichte", type: "Thermoplast" },
    "PA": { name: "PA", full: "Polyamid (Nylon)", type: "Thermoplast" },
    "PC": { name: "PC", full: "Polycarbonat", type: "Thermoplast" },
    "PETG": { name: "PETG", full: "Polyethylenterephthalat-Glykol", type: "Thermoplast" },
    "PMP": { name: "PMP", full: "Polymethylpenten (TPX)", type: "Thermoplast" },
    "POM": { name: "POM", full: "Polyoxymethylen (Acetal)", type: "Thermoplast" },
    "PP": { name: "PP", full: "Polypropylen", type: "Thermoplast" },
    "PS": { name: "PS", full: "Polystyrol", type: "Thermoplast" },
    "PSU": { name: "PSU", full: "Polysulfon", type: "Thermoplast" },
    "PVC_HART": { name: "PVC hart", full: "Hart-PVC (unweichmacht)", type: "Thermoplast" },
    "PVC_WEICH": { name: "PVC weich", full: "Weich-PVC (weichmacht)", type: "Thermoplast" },
    "SAN": { name: "SAN", full: "Styrol-Acrylnitril", type: "Thermoplast" },
    // Fluorpolymere
    "ECTFE_ETFE": { name: "ECTFE/ETFE", full: "Fluorpolymer (Halar/Tefzel)", type: "Fluorpolymer" },
    "FEP": { name: "FEP", full: "Fluorethylenpropylen", type: "Fluorpolymer" },
    "PTFE": { name: "PTFE", full: "Polytetrafluorethylen (Teflon®)", type: "Fluorpolymer" },
    "PVDF": { name: "PVDF", full: "Polyvinylidenfluorid (Kynar)", type: "Fluorpolymer" },
    // Elastomere
    "EPDM": { name: "EPDM", full: "Ethylen-Propylen-Dien-Kautschuk", type: "Elastomer" },
    "FPM": { name: "FPM/FKM", full: "Fluorelastomer (Viton®)", type: "Elastomer" },
    "NBR": { name: "NBR", full: "Nitrilkautschuk (Buna-N)", type: "Elastomer" },
    "SI": { name: "Silikon", full: "Silikonkautschuk (VMQ)", type: "Elastomer" },
    // Metals
    "AL": { name: "Aluminium", full: "Aluminium", type: "Metall" },
    "V2A": { name: "V2A / SS 304", full: "Edelstahl 1.4301 (304)", type: "Metall" },
    "V4A": { name: "V4A / SS 316", full: "Edelstahl 1.4401 (316)", type: "Metall" },
};

// Rating display order (best to worst)
const ratingOrder = { '1': 0, '2': 1, '3': 2, '4': 3, '0': 4 };

// GHS pictogram emojis (fallback - always works)
const ghsImages = {
    'GHS01': 'img/ghs/ghs01.svg', // Explosiv
    'GHS02': 'img/ghs/ghs02.svg', // Brennbar
    'GHS03': 'img/ghs/ghs03.svg', // Oxidierend
    'GHS04': 'img/ghs/ghs04.svg', // Gasflasche
    'GHS05': 'img/ghs/ghs05.svg', // Ätzend
    'GHS06': 'img/ghs/ghs06.svg', // Giftig
    'GHS07': 'img/ghs/ghs07.svg', // Gesundheitsschädlich
    'GHS08': 'img/ghs/ghs08.svg', // Gesundheitsgefahr
    'GHS09': 'img/ghs/ghs09.svg', // Umweltgefährlich
};

// Map old EU hazard codes to GHS pictograms (German labels)
const euToGhs = {
    'T+': { ghs: 'GHS06', label: 'Sehr giftig' },
    'T': { ghs: 'GHS06', label: 'Giftig' },
    'C+': { ghs: 'GHS05', label: 'Stark ätzend' },
    'C': { ghs: 'GHS05', label: 'Ätzend' },
    'Xn': { ghs: 'GHS07', label: 'Gesundheitsschädlich' },
    'Xi': { ghs: 'GHS07', label: 'Reizend' },
    'F+': { ghs: 'GHS02', label: 'Hochentzündlich' },
    'F': { ghs: 'GHS02', label: 'Leichtentzündlich' },
    'O': { ghs: 'GHS03', label: 'Brandfördernd' },
    'N': { ghs: 'GHS09', label: 'Umweltgefährlich' },
};

function getHazardBadges(hazardStr) {
    if (!hazardStr || hazardStr === '—') return '';
    const codes = hazardStr.replace(/[()]/g, '').split(/[,\s]+/).filter(c => c && c !== '—');
    const seenGhs = new Set();
    
    return codes.map(code => {
        const info = euToGhs[code];
        if (info && !seenGhs.has(info.ghs)) {
            seenGhs.add(info.ghs);
            const imgSrc = ghsImages[info.ghs];
            return `<img src="${imgSrc}" alt="${info.label}" title="${info.label} (${code})" class="w-8 h-8 inline-block">`;
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
let currentLang = 'de';

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
        btn.textContent = '−Weniger';
    } else {
        more.classList.add('hidden');
        btn.textContent = '+Mehr';
    }
};

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
    // Try to find an English translation
    const lower = germanName.toLowerCase();
    for (const [de, en] of Object.entries(translations)) {
        if (lower === de || lower.startsWith(de + ' ') || lower.startsWith(de + ',')) {
            return germanName.replace(new RegExp(de, 'i'), en);
        }
        if (lower.includes(de)) {
            return germanName.replace(new RegExp(de, 'i'), en);
        }
    }
    return germanName; // Return German if no translation
}

function getDisplayName(c) {
    // German version - always show German name
    return c.name;
}

function getSecondaryName(c) {
    // Show English translation as secondary if available
    const en = translateName(c.name);
    return en !== c.name ? en : '';
}

// German version - keep German concentration terms
function translateConc(conc) {
    if (!conc) return 'Rein / Unverdünnt';
    return conc;
}

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const langSelect = document.getElementById('langSelect');
    const ratingFilter = document.getElementById('ratingFilter');

    // Search input - only trigger on text search
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            searchResults.classList.add('hidden');
            return;
        }
        showSearchResults(query);
        searchResults.classList.remove('hidden');
    });

    // Material checkbox changes - only update the results TABLE
    document.addEventListener('change', (e) => {
        if (e.target.matches('#materialFilters input[type="checkbox"], #moreMaterials input[type="checkbox"]')) {
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
        if (langSelect.value === 'en') {
            window.location.href = 'index.html';
        } else if (langSelect.value === 'es') {
            window.location.href = 'es.html';
        } else if (langSelect.value === 'fr') {
            window.location.href = 'fr.html';
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
        const displayName = getDisplayName(c); // German name
        const displayNameLower = displayName.toLowerCase();
        
        // Search by displayed name (German), aliases, CAS, or formula
        const aliasMatch = c.aliases && c.aliases.some(a => a.toLowerCase().includes(queryLower));
        const matches = 
            displayNameLower.includes(queryLower) ||
            aliasMatch ||
            (c.cas && c.cas.includes(query)) ||
            (c.formula && c.formula.toLowerCase().includes(queryLower));
        
        if (matches) {
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
        const aExact = a === queryLower;
        const bExact = b === queryLower;
        if (aExact && !bExact) return -1;
        if (bExact && !aExact) return 1;
        
        const aStarts = a.startsWith(queryLower);
        const bStarts = b.startsWith(queryLower);
        if (aStarts && !bStarts) return -1;
        if (bStarts && !aStarts) return 1;
        
        return a.localeCompare(b);
    }).slice(0, 20);

    if (sortedMatches.length > 0) {
        searchResults.innerHTML = sortedMatches.map(displayKey => {
            const info = matchInfo[displayKey];
            const c = info.chem;
            const displayName = getDisplayName(c);
            const chemKey = info.key;
            return `
                <div class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0" data-key="${chemKey}">
                    <div class="font-medium text-gray-900">${highlightMatch(displayName, query)}</div>
                </div>
            `;
        }).join('');
        searchResults.classList.remove('hidden');
    } else {
        searchResults.innerHTML = '<div class="px-4 py-3 text-gray-500">Keine Chemikalien gefunden</div>';
        searchResults.classList.remove('hidden');
    }
}

function highlightMatch(text, query) {
    const idx = text.toLowerCase().indexOf(query);
    if (idx >= 0) {
        return text.slice(0, idx) + '<mark class="search-highlight">' + text.slice(idx, idx + query.length) + '</mark>' + text.slice(idx + query.length);
    }
    return text;
}

function showDefaultChemical() {
    // Show Aceton as default (German name)
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
    
    // SDS Link
    const sdsLink = document.getElementById('sdsLink');
    if (sdsLink) {
        const searchTerm = encodeURIComponent(displayName);
        sdsLink.href = `sds-decoder.html?search=${searchTerm}`;
        sdsLink.style.display = 'inline-flex';

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
            <span class="font-semibold text-amber-800">Konzentration:</span>
            <select id="concSelect" class="ml-2 bg-white text-amber-900 font-bold px-3 py-1 rounded border-2 border-amber-400 cursor-pointer focus:border-amber-500 focus:outline-none">
                ${options}
            </select>
            <span class="text-xs text-amber-600 ml-2">← Auswählen für Tabelle</span>
        `;
        concWrapper.style.display = 'inline-flex';
        
        document.getElementById('concSelect').addEventListener('change', (e) => {
            currentSelectedIdx = parseInt(e.target.value);
            updateRatingsTable();
        });
    } else {
        const conc = translateConc(firstChem.concentration);
        if (conc && conc !== 'Rein / Unverdünnt') {
            concContainer.innerHTML = `<span class="font-semibold text-amber-800">Konzentration:</span> <span class="font-bold text-amber-900">${conc}</span>`;
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
    const minRating = ratingFilter?.value || '12'; // '1' = nur A, '12' = A oder B
    
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
        tbody.innerHTML = `<tr><td colspan="4" class="py-6 text-center text-gray-500">Keine Materialien mit ${minRating === '1' ? 'A' : 'A/B'}-Bewertung für diese Chemikalie. Versuchen Sie, den Filter zu ändern.</td></tr>`;
    } else {
        tbody.innerHTML = materialsToShow.map(([mat, rating]) => {
            const info = materialInfo[mat] || { name: mat, full: mat, type: '' };
            const grade20 = ratingToGrade(rating.c20);
            const grade50 = ratingToGrade(rating.c50);
            
            if (grade20 === 'A') recommended.push(info.name);
            
            return `
                <tr class="border-b border-gray-100 hover:bg-gray-50">
                    <td class="py-3 px-4">
                        <div class="font-medium text-gray-900">${info.name}</div>
                        <div class="text-xs text-gray-500">${info.full}</div>
                    </td>
                    <td class="py-3 px-4 text-center">
                        <span class="rating-${grade20} px-3 py-1 rounded text-sm font-bold">${grade20}</span>
                    </td>
                    <td class="py-3 px-4 text-center">
                        <span class="rating-${grade50} px-3 py-1 rounded text-sm font-bold">${grade50}</span>
                    </td>
                    <td class="py-3 px-4 text-gray-500 text-sm">${info.type}</td>
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
            : 'Bewertungen unten prüfen - eingeschränkte Kompatibilität';
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
