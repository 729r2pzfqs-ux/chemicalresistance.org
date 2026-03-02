// Chemical Resistance App v2 - French Version
// 1,600+ chemicals × 24 materials
// Uses chemicalTranslations from chemical_translations_fr.js (1,228 translations)

const materialInfo = {
    // Thermoplastes
    "HDPE": { name: "HDPE", full: "Polyéthylène haute densité", type: "Thermoplaste" },
    "LDPE": { name: "LDPE", full: "Polyéthylène basse densité", type: "Thermoplaste" },
    "PA": { name: "PA", full: "Polyamide (Nylon)", type: "Thermoplaste" },
    "PC": { name: "PC", full: "Polycarbonate", type: "Thermoplaste" },
    "PETG": { name: "PETG", full: "Polyéthylène téréphtalate glycol", type: "Thermoplaste" },
    "PMP": { name: "PMP", full: "Polyméthylpentène (TPX)", type: "Thermoplaste" },
    "POM": { name: "POM", full: "Polyoxyméthylène (Acétal)", type: "Thermoplaste" },
    "PP": { name: "PP", full: "Polypropylène", type: "Thermoplaste" },
    "PS": { name: "PS", full: "Polystyrène", type: "Thermoplaste" },
    "PSU": { name: "PSU", full: "Polysulfone", type: "Thermoplaste" },
    "PVC_HART": { name: "PVC rigide", full: "PVC rigide (non plastifié)", type: "Thermoplaste" },
    "PVC_WEICH": { name: "PVC souple", full: "PVC souple (plastifié)", type: "Thermoplaste" },
    "SAN": { name: "SAN", full: "Styrène-Acrylonitrile", type: "Thermoplaste" },
    // Fluoropolymères
    "ECTFE_ETFE": { name: "ECTFE/ETFE", full: "Fluoropolymère (Halar/Tefzel)", type: "Fluoropolymère" },
    "FEP": { name: "FEP", full: "Éthylène propylène fluoré", type: "Fluoropolymère" },
    "PTFE": { name: "PTFE", full: "Polytétrafluoroéthylène (Téflon®)", type: "Fluoropolymère" },
    "PVDF": { name: "PVDF", full: "Polyfluorure de vinylidène (Kynar)", type: "Fluoropolymère" },
    // Élastomères
    "EPDM": { name: "EPDM", full: "Éthylène-Propylène-Diène Monomère", type: "Élastomère" },
    "FPM": { name: "FPM/FKM", full: "Fluoroélastomère (Viton®)", type: "Élastomère" },
    "NBR": { name: "NBR", full: "Caoutchouc nitrile (Buna-N)", type: "Élastomère" },
    "SI": { name: "Silicone", full: "Caoutchouc silicone (VMQ)", type: "Élastomère" },
    // Métaux
    "AL": { name: "Aluminium", full: "Aluminium", type: "Métal" },
    "V2A": { name: "Inox 304", full: "Acier Inoxydable 1.4301 (304)", type: "Métal" },
    "V4A": { name: "Inox 316", full: "Acier Inoxydable 1.4401 (316)", type: "Métal" },
};

// Rating display order (best to worst)
const ratingOrder = { '1': 0, '2': 1, '3': 2, '4': 3, '0': 4 };

// GHS pictogram emojis
const ghsImages = {
    'GHS01': 'img/ghs/ghs01.svg', // Explosif
    'GHS02': 'img/ghs/ghs02.svg', // Inflammable
    'GHS03': 'img/ghs/ghs03.svg', // Comburant
    'GHS04': 'img/ghs/ghs04.svg', // Gaz sous pression
    'GHS05': 'img/ghs/ghs05.svg', // Corrosif
    'GHS06': 'img/ghs/ghs06.svg', // Toxique
    'GHS07': 'img/ghs/ghs07.svg', // Nocif
    'GHS08': 'img/ghs/ghs08.svg', // Danger pour la santé
    'GHS09': 'img/ghs/ghs09.svg', // Dangereux pour l'environnement
};

// Map old EU hazard codes to GHS pictograms (French labels)
const euToGhs = {
    'T+': { ghs: 'GHS06', label: 'Très toxique' },
    'T': { ghs: 'GHS06', label: 'Toxique' },
    'C+': { ghs: 'GHS05', label: 'Très corrosif' },
    'C': { ghs: 'GHS05', label: 'Corrosif' },
    'Xn': { ghs: 'GHS07', label: 'Nocif' },
    'Xi': { ghs: 'GHS07', label: 'Irritant' },
    'F+': { ghs: 'GHS02', label: 'Extrêmement inflammable' },
    'F': { ghs: 'GHS02', label: 'Facilement inflammable' },
    'O': { ghs: 'GHS03', label: 'Comburant' },
    'N': { ghs: 'GHS09', label: 'Dangereux pour l\'environnement' },
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
            return `<img src="${imgSrc}" alt="${info.label}" title="${info.label} (${code})" class="w-10 h-10 inline-block">`;
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
let currentLang = 'fr';

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
        btn.textContent = '−moins';
    } else {
        more.classList.add('hidden');
        btn.textContent = '+plus';
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
        document.getElementById('searchInput').placeholder = 'Erreur de chargement...';
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
    return c.name.toLowerCase();
}

function translateName(germanName) {
    const lower = germanName.toLowerCase();
    // Use comprehensive translations from chemical_translations_fr.js
    if (typeof chemicalTranslations !== 'undefined' && chemicalTranslations[lower]) {
        return chemicalTranslations[lower];
    }
    return germanName;
}

function getDisplayName(c) {
    // French version - try to show French name
    return translateName(c.name);
}

function getSecondaryName(c) {
    const fr = translateName(c.name);
    // Show original German name as secondary if translated
    return fr !== c.name ? c.name : '';
}

// French concentration terms
function translateConc(conc) {
    if (!conc) return 'Pur / Non dilué';
    // Translate common German concentration terms to French
    return conc
        .replace(/rein/gi, 'pur')
        .replace(/unverdünnt/gi, 'non dilué')
        .replace(/konzentriert/gi, 'concentré')
        .replace(/verdünnt/gi, 'dilué')
        .replace(/gesättigt/gi, 'saturé')
        .replace(/wässrig/gi, 'aqueux')
        .replace(/technisch/gi, 'technique');
}

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const langSelect = document.getElementById('langSelect');
    const ratingFilter = document.getElementById('ratingFilter');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            searchResults.classList.add('hidden');
            return;
        }
        showSearchResults(query);
        searchResults.classList.remove('hidden');
    });

    document.addEventListener('change', (e) => {
        if (e.target.matches('#materialFilters input[type="checkbox"], #moreMaterials input[type="checkbox"]')) {
            if (currentGroupIndices.length > 0) {
                updateRatingsTable();
            }
        }
    });

    ratingFilter?.addEventListener('change', () => {
        if (currentGroupIndices.length > 0) {
            updateRatingsTable();
        }
    });

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

    langSelect?.addEventListener('change', () => {
        const lang = langSelect.value;
        if (lang === 'en') {
            window.location.href = 'index.html';
        } else if (lang === 'es') {
            window.location.href = 'es.html';
        } else if (lang === 'de') {
            window.location.href = 'de.html';
        }
    });

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
        const originalNameLower = c.name.toLowerCase();
        
        const aliasMatch = c.aliases && c.aliases.some(a => a.toLowerCase().includes(queryLower));
        const matches = 
            displayNameLower.includes(queryLower) ||
            originalNameLower.includes(queryLower) ||
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
        searchResults.innerHTML = '<div class="px-4 py-3 text-gray-500">Aucun produit chimique trouvé</div>';
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

    const hazardEl = document.getElementById('chemHazard');
    if (hazardEl) {
        const badges = getHazardBadges(firstChem.hazard);
        hazardEl.innerHTML = badges;
        hazardEl.style.display = badges ? 'inline-flex' : 'none';
        hazardEl.className = 'flex gap-1 items-center';
    }
    
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
            <span class="font-semibold text-amber-800">Concentration :</span>
            <select id="concSelect" class="ml-2 bg-white text-amber-900 font-bold px-3 py-1 rounded border-2 border-amber-400 cursor-pointer focus:border-amber-500 focus:outline-none">
                ${options}
            </select>
            <span class="text-xs text-amber-600 ml-2">← Sélectionner pour le tableau</span>
        `;
        concWrapper.style.display = 'inline-flex';
        
        document.getElementById('concSelect').addEventListener('change', (e) => {
            currentSelectedIdx = parseInt(e.target.value);
            updateRatingsTable();
        });
    } else {
        const conc = translateConc(firstChem.concentration);
        if (conc && conc !== 'Pur / Non dilué') {
            concContainer.innerHTML = `<span class="font-semibold text-amber-800">Concentration :</span> <span class="font-bold text-amber-900">${conc}</span>`;
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
    const minRating = ratingFilter?.value || '12';
    
    let materialsToShow;
    if (selectedMaterials.length > 0) {
        materialsToShow = selectedMaterials
            .filter(mat => chem.ratings[mat])
            .map(mat => [mat, chem.ratings[mat]]);
    } else {
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
        tbody.innerHTML = `<tr><td colspan="4" class="py-6 text-center text-gray-500">Aucun matériau avec note ${minRating === '1' ? 'A' : 'A/B'} pour ce produit chimique. Essayez de modifier le filtre.</td></tr>`;
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

    const recMaterials = document.getElementById('recMaterials');
    const recommendation = document.getElementById('recommendation');
    
    if (recMaterials) {
        recMaterials.textContent = recommended.length > 0 
            ? recommended.join(', ') 
            : 'Voir les notes ci-dessous - compatibilité limitée';
    }
    
    if (recommendation) {
        recommendation.className = recommended.length > 0
            ? 'p-4 bg-emerald-50 border-b border-emerald-100'
            : 'p-4 bg-amber-50 border-b border-amber-100';
    }
}

window.searchFor = function(term) {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = term;
    setTimeout(() => {
        searchInput.dispatchEvent(new Event('input'));
    }, 0);
};

document.addEventListener('DOMContentLoaded', init);
