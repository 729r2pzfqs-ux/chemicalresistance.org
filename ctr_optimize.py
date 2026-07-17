#!/usr/bin/env python3
"""
CTR Optimization Script — ChemicalResistance.org
Rewrites title tags, meta descriptions, FAQ schema, and adds structured data
to maximize click-through rate from Google search impressions.
"""

import json
import os
import re

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ─── Material display names ───────────────────────────────────────────────────
MAT_NAMES = {
    'HDPE': 'HDPE', 'LDPE': 'LDPE', 'PA': 'Nylon', 'PC': 'Polycarbonate',
    'PETG': 'PETG', 'PMP': 'PMP', 'POM': 'Acetal', 'PP': 'PP',
    'PS': 'Polystyrene', 'PSU': 'Polysulfone', 'PTFE': 'PTFE',
    'PVC': 'PVC', 'PVC_HART': 'PVC Rigid', 'PVC_WEICH': 'PVC Flex',
    'PVDF': 'PVDF', 'SAN': 'SAN', 'SI': 'Silicone',
    'AL': 'Aluminium', 'V2A': 'SS 304', 'V4A': 'SS 316',
    'EPDM': 'EPDM', 'FPM': 'Viton', 'NBR': 'NBR', 'SI': 'Silicone',
    'FEP': 'FEP', 'ECTFE_ETFE': 'ECTFE/ETFE',
    'SS304': 'SS 304', 'SS316': 'SS 316',
}

# Priority order for mentioning in descriptions (most recognizable first)
MAT_PRIORITY = ['PTFE', 'HDPE', 'PP', 'PVDF', 'FEP', 'EPDM', 'Viton', 'NBR',
                'SS 316', 'SS 304', 'Nylon', 'Polycarbonate', 'PVC', 'PVC Rigid',
                'PVC Flex', 'LDPE', 'Silicone', 'PETG', 'Acetal', 'Polystyrene',
                'Polysulfone', 'SAN', 'Aluminium', 'PMP', 'ECTFE/ETFE']


def slugify(name):
    s = name.lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return s.strip('-')


def load_chemical_data():
    """Load chemical data and build slug → ratings lookup."""
    path = os.path.join(BASE_DIR, 'data', 'chemicals_burkle.json')
    with open(path) as f:
        data = json.load(f)

    lookup = {}
    for chem in data:
        name_en = chem.get('name_en', '')
        if not name_en:
            continue
        slug = slugify(name_en)
        if slug not in lookup:
            lookup[slug] = {
                'name': name_en,
                'ratings': chem.get('ratings', {}),
                'cas': chem.get('cas', ''),
                'formula': chem.get('formula', ''),
                'concentration': chem.get('concentration', ''),
            }
    return lookup


def sort_by_priority(mat_list):
    """Sort materials list by recognizability priority."""
    def priority(m):
        try:
            return MAT_PRIORITY.index(m)
        except ValueError:
            return 99
    return sorted(mat_list, key=priority)


def get_ratings_summary(ratings):
    """Return lists of A, B, C, D rated materials at 20°C."""
    a_mats, b_mats, c_mats, d_mats = [], [], [], []
    for code, r in ratings.items():
        display = MAT_NAMES.get(code, code)
        grade = r.get('c20', 'NR')
        if grade == 'A':
            a_mats.append(display)
        elif grade == 'B':
            b_mats.append(display)
        elif grade == 'C':
            c_mats.append(display)
        elif grade == 'D':
            d_mats.append(display)
    return (sort_by_priority(a_mats), sort_by_priority(b_mats),
            sort_by_priority(c_mats), sort_by_priority(d_mats))


def build_chemical_title(name, a_mats, total):
    """Build a compelling, query-first title under 65 chars."""
    top = ', '.join(a_mats[:3]) if a_mats else ''
    if top:
        candidate = f"{name} Resistance — {top} Rated A | {total} Materials"
        if len(candidate) <= 65:
            return candidate
        # Try fewer top materials
        candidate = f"{name} Resistance — {a_mats[0]} Rated A | {total} Materials"
        if len(candidate) <= 65:
            return candidate
    # Fallback: quantity-forward
    candidate = f"{name} Chemical Resistance | {total} Materials Rated A-D"
    if len(candidate) <= 65:
        return candidate
    return f"{name} Chemical Resistance | Rated A-D, 20°C & 50°C"


def build_chemical_desc(name, a_mats, b_mats, d_mats, total, concentration=''):
    """Build a specific, data-forward meta description (120-160 chars)."""
    conc_note = f" ({concentration})" if concentration and concentration not in ['jede', ''] else ''

    if a_mats:
        top_a = ', '.join(a_mats[:3])
        rest_a = f" +{len(a_mats)-3} more" if len(a_mats) > 3 else ''
        if d_mats:
            top_d = d_mats[0] if len(d_mats) == 1 else ', '.join(d_mats[:2])
            desc = (f"{top_a}{rest_a} rated A (excellent) for {name}{conc_note}. "
                    f"{top_d} not recommended. A-D chart for {total} materials at 20°C & 50°C.")
        else:
            desc = (f"{top_a}{rest_a} rated A (excellent) for {name}{conc_note}. "
                    f"Full A-D compatibility for {total} materials at 20°C & 50°C.")
    else:
        desc = (f"Chemical resistance ratings for {name}{conc_note}. "
                f"A-D compatibility chart for {total} materials at 20°C and 50°C. "
                f"Free database from Bürkle GmbH.")
    # Trim to 160
    if len(desc) > 160:
        desc = desc[:157] + '...'
    return desc


def build_chemical_faq(name, a_mats, b_mats, d_mats, total):
    """Build specific, data-rich FAQ schema for a chemical page."""
    top_a_str = ', '.join(a_mats[:5]) if a_mats else 'PTFE'
    avoid_str = ', '.join(d_mats[:3]) if d_mats else 'none in our test set'
    a_count = len(a_mats)

    faq = [
        {
            "@type": "Question",
            "name": f"What materials are resistant to {name}?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": (f"Our database covers {total} materials tested against {name}. "
                         f"Materials rated A (excellent) at 20°C include: {top_a_str}"
                         + (f" — {a_count} materials total with full resistance." if a_count > 5 else ".")
                         + " Click any material card above to see its specific A-D rating at 20°C and 50°C.")
            }
        },
        {
            "@type": "Question",
            "name": f"What is the best material for storing {name}?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": (
                    (f"For {name}, the top-rated materials (A = excellent) at 20°C are: {', '.join(a_mats[:5])}. "
                     if a_mats else f"Check the table above for {name} ratings. ")
                    + (f"Avoid {', '.join(d_mats[:3])} (rated D, not recommended). " if d_mats else "")
                    + "Final selection depends on concentration, temperature, and exposure duration. "
                    "Always verify with your equipment manufacturer."
                )
            }
        },
        {
            "@type": "Question",
            "name": "How do I read the chemical resistance ratings?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": ("A = Excellent (fully resistant, recommended for continuous use). "
                         "B = Good (minor effect possible, suitable for most applications). "
                         "C = Limited (some degradation, short-term use only). "
                         "D = Not Recommended (significant attack, do not use). "
                         "Always verify ratings with your equipment manufacturer.")
            }
        },
        {
            "@type": "Question",
            "name": f"Does temperature affect {name} resistance?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": (f"Yes. Resistance to {name} can change significantly between 20°C and 50°C. "
                         "Higher temperatures generally reduce material resistance — some materials drop "
                         "from A to C or D at elevated temperatures. Our chart shows ratings at both "
                         "temperatures where data is available.")
            }
        },
        {
            "@type": "Question",
            "name": f"Where does the {name} compatibility data come from?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": ("Chemical resistance data is sourced from compatibility charts published by "
                         "Bürkle GmbH (buerkle.de), a German manufacturer with decades of expertise "
                         "in chemical handling equipment.")
            }
        }
    ]
    return {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faq}


def update_chemical_page(filepath, name, ratings_data, total=24):
    """Update a single chemical page's SEO metadata."""
    with open(filepath) as f:
        content = f.read()

    ratings = ratings_data.get('ratings', {})
    concentration = ratings_data.get('concentration', '')
    a_mats, b_mats, c_mats, d_mats = get_ratings_summary(ratings)

    new_title = build_chemical_title(name, a_mats, total)
    new_desc = build_chemical_desc(name, a_mats, b_mats, d_mats, total, concentration)
    new_faq = json.dumps(build_chemical_faq(name, a_mats, b_mats, d_mats, total),
                         ensure_ascii=False)

    # Replace title
    content = re.sub(
        r'<title>[^<]+</title>',
        f'<title>{new_title}</title>',
        content, count=1
    )

    # Replace meta description
    content = re.sub(
        r'<meta name="description" content="[^"]*">',
        f'<meta name="description" content="{new_desc}">',
        content, count=1
    )

    # Replace OG title
    content = re.sub(
        r'<meta property="og:title" content="[^"]*">',
        f'<meta property="og:title" content="{new_title}">',
        content, count=1
    )

    # Replace OG description
    content = re.sub(
        r'<meta property="og:description" content="[^"]*">',
        f'<meta property="og:description" content="{new_desc}">',
        content, count=1
    )

    # Replace Twitter title
    content = re.sub(
        r'<meta name="twitter:title" content="[^"]*">',
        f'<meta name="twitter:title" content="{new_title}">',
        content, count=1
    )

    # Replace Twitter description
    content = re.sub(
        r'<meta name="twitter:description" content="[^"]*">',
        f'<meta name="twitter:description" content="{new_desc}">',
        content, count=1
    )

    # Replace the FAQPage JSON-LD block (keep WebPage block intact)
    faq_pattern = r'\{"@context":\s*"https://schema\.org",\s*"@type":\s*"FAQPage"[^}]*(?:\{[^}]*\}[^}]*)*\}'
    # More robust: match from FAQPage opening to matching closing
    faq_script_pattern = (
        r'(<script type="application/ld\+json">)'
        r'\s*\{"@context":\s*"https://schema\.org",\s*"@type":\s*"FAQPage".*?\}'
        r'\s*(</script>)'
    )
    content = re.sub(
        faq_script_pattern,
        r'\g<1>' + new_faq + r'\g<2>',
        content, count=1, flags=re.DOTALL
    )

    with open(filepath, 'w') as f:
        f.write(content)

    return new_title, new_desc


# ─── Material page data ───────────────────────────────────────────────────────

MATERIAL_META = {
    'hdpe': {
        'title': 'HDPE Chemical Resistance | Acids, Alkalis & Salts | 1,650+ Chemicals',
        'desc': ('HDPE resists strong acids, alkalis & salt solutions (rated A). Weaker against '
                 'aromatics & chlorinated solvents. Search 1,650+ chemicals rated A-D at 20°C & 50°C.'),
        'faq': [
            {
                'q': 'What chemicals is HDPE resistant to?',
                'a': ('HDPE (High-Density Polyethylene) shows excellent (A) resistance to most '
                      'inorganic acids (hydrochloric, phosphoric, sulfuric at moderate concentrations), '
                      'alkalis, alcohols, and aqueous salt solutions. It rates A for over 900 of the '
                      '1,650+ chemicals in our database.')
            },
            {
                'q': 'What chemicals attack HDPE?',
                'a': ('HDPE is not recommended (D) for aromatic hydrocarbons (toluene, xylene, benzene), '
                      'chlorinated solvents (chloroform, DCM), ketones at high concentrations, '
                      'and strong oxidizing acids like fuming nitric or chromic acid. '
                      'Always verify for your specific conditions.')
            },
            {
                'q': 'Does temperature affect HDPE chemical resistance?',
                'a': ('Yes. At 50°C, several chemicals that rate A at 20°C drop to B or C for HDPE. '
                      'HDPE is generally used up to 60°C service temperature. Our chart shows ratings '
                      'at both 20°C and 50°C.')
            },
        ]
    },
    'ptfe': {
        'title': 'PTFE (Teflon) Resistance Chart | Near-Universal Compatibility | 1,650+ Chemicals',
        'desc': ('PTFE offers exceptional chemical resistance — rated A for almost all acids, bases & '
                 'solvents. Chemically inert up to 200°C+. Free A-D chart for 1,650+ chemicals.'),
        'faq': [
            {
                'q': 'What chemicals is PTFE resistant to?',
                'a': ('PTFE (Polytetrafluoroethylene, Teflon) has near-universal chemical resistance. '
                      'It rates A (excellent) for virtually all acids (including concentrated sulfuric, '
                      'hydrofluoric, nitric), bases, solvents, oxidizers, and most aggressive chemicals. '
                      'Very few substances attack PTFE.')
            },
            {
                'q': 'What chemicals attack PTFE?',
                'a': ('PTFE is attacked by molten alkali metals (sodium, lithium), elemental fluorine, '
                      'and some chlorine trifluoride compounds. These are rare in industrial settings. '
                      'For nearly all practical chemical handling applications, PTFE is the safest choice.')
            },
            {
                'q': 'Is PTFE the best material for chemical resistance?',
                'a': ('PTFE offers the broadest chemical resistance of any common engineering material. '
                      'However, PVDF, FEP, and ECTFE/ETFE fluoropolymers also provide excellent '
                      'resistance for many chemicals at a lower cost. PTFE\'s limitation is mechanical '
                      'strength and wear resistance compared to other plastics.')
            },
        ]
    },
    'pp': {
        'title': 'PP (Polypropylene) Resistance Chart | Acid, Alkali & Salt Solutions — 1,650+ Chemicals',
        'desc': ('PP rates A for most acids, alkalis & aqueous salt solutions. Not recommended for '
                 'aromatic or chlorinated solvents. Free A-D chart for 1,650+ chemicals at 20°C & 50°C.'),
        'faq': [
            {
                'q': 'What chemicals is PP (Polypropylene) resistant to?',
                'a': ('Polypropylene (PP) shows excellent resistance to most inorganic acids, alkalis, '
                      'alcohols, and aqueous solutions. It is widely used in tanks, fittings, and '
                      'laboratory equipment for acids like sulfuric, hydrochloric, and phosphoric acid.')
            },
            {
                'q': 'What chemicals attack Polypropylene (PP)?',
                'a': ('PP is not recommended for aromatic hydrocarbons (toluene, xylene), chlorinated '
                      'solvents, strong oxidizing agents (fuming nitric acid, chromic acid), and '
                      'many organic solvents at elevated temperatures.')
            },
            {
                'q': 'How does PP compare to HDPE for chemical resistance?',
                'a': ('PP and HDPE have similar chemical resistance profiles. PP has slightly better '
                      'resistance to concentrated acids at elevated temperatures and a higher service '
                      'temperature (~80°C vs ~60°C for HDPE). HDPE is typically tougher and '
                      'more impact-resistant.')
            },
        ]
    },
    'pvdf': {
        'title': 'PVDF Chemical Resistance Chart | Fluoropolymer | 1,650+ Chemicals Rated A-D',
        'desc': ('PVDF (Kynar) resists concentrated acids, halogens & oxidizers. Excellent at 50°C. '
                 'A-D ratings for 1,650+ chemicals. Commonly used for aggressive chemical service.'),
        'faq': [
            {
                'q': 'What is PVDF used for?',
                'a': ('PVDF (Polyvinylidene Fluoride, Kynar) is a fluoropolymer used in tubing, '
                      'pipe fittings, pumps, and containers for aggressive chemicals. It offers '
                      'excellent resistance to halogens, chlorinated solvents, strong acids, and '
                      'oxidizers, with good mechanical strength up to 135°C.')
            },
            {
                'q': 'How does PVDF compare to PTFE?',
                'a': ('PVDF has narrower chemical resistance than PTFE but significantly better '
                      'mechanical properties — it can be machined, injection-molded, and welded. '
                      'PVDF is preferred when mechanical strength matters alongside chemical resistance. '
                      'PTFE is chosen when near-universal chemical compatibility is required.')
            },
            {
                'q': 'What chemicals attack PVDF?',
                'a': ('PVDF is not recommended for strong amines (pyridine, aniline), ketones at high '
                      'concentrations (acetone, MEK), and esters. It also has limited resistance to '
                      'fuming sulfuric acid and some polar organic solvents.')
            },
        ]
    },
    'epdm': {
        'title': 'EPDM Chemical Resistance Chart | Steam, Acids & Alkalis | 1,650+ Chemicals',
        'desc': ('EPDM rubber excels with steam, hot water, dilute acids & alkalis. Poor against '
                 'oils, fuels & aromatic solvents. Free A-D chart for 1,650+ chemicals at 20°C & 50°C.'),
        'faq': [
            {
                'q': 'What chemicals is EPDM resistant to?',
                'a': ('EPDM (Ethylene Propylene Diene Monomer) rubber shows excellent resistance to '
                      'hot water and steam, dilute acids and alkalis, ketones, alcohols, and many '
                      'polar organic chemicals. Widely used in seals, gaskets, and hoses for '
                      'aqueous media and outdoor environments.')
            },
            {
                'q': 'What chemicals attack EPDM?',
                'a': ('EPDM is not recommended for mineral oils, fuels (gasoline, diesel), aromatic '
                      'hydrocarbons (toluene, xylene), and chlorinated solvents. For oil and fuel '
                      'service, NBR or Viton (FKM) are better choices.')
            },
            {
                'q': 'How does EPDM compare to Viton (FKM) for chemical resistance?',
                'a': ('EPDM outperforms Viton with hot water/steam, ketones, and alkalis. Viton '
                      'outperforms EPDM with fuels, oils, and aromatic hydrocarbons. Neither is '
                      'universally superior — choice depends on the specific media.')
            },
        ]
    },
    'viton': {
        'title': 'Viton (FKM) Chemical Resistance Chart | Fuels, Oils & Acids | 1,650+ Chemicals',
        'desc': ('Viton/FKM excels with fuels, oils, aromatic hydrocarbons & concentrated acids. '
                 'Rated A for 700+ chemicals. A-D chart for 1,650+ chemicals at 20°C & 50°C.'),
        'faq': [
            {
                'q': 'What chemicals is Viton (FKM) resistant to?',
                'a': ('Viton (Fluoroelastomer FKM/FPM) shows excellent resistance to petroleum fuels, '
                      'mineral oils, aromatic hydrocarbons (toluene, xylene), and most concentrated '
                      'acids. It is the top elastomer choice for fuel and oil handling at elevated '
                      'temperatures (up to ~200°C).')
            },
            {
                'q': 'What chemicals attack Viton (FKM)?',
                'a': ('Viton is not recommended for ketones (acetone, MEK), esters, ethers, '
                      'amines, and anhydrous acids. It also has limited resistance to steam and '
                      'hot water compared to EPDM.')
            },
            {
                'q': 'Is Viton better than NBR for fuel resistance?',
                'a': ('Yes. Viton (FKM) generally offers better fuel resistance than NBR (Nitrile), '
                      'especially at elevated temperatures and with aromatic fuel blends. NBR '
                      'is typically more economical for standard fuel and oil applications at '
                      'ambient temperature.')
            },
        ]
    },
    'nbr': {
        'title': 'NBR (Nitrile) Resistance Chart | Oils, Fuels & Hydraulic Fluids | 1,650+ Chemicals',
        'desc': ('NBR (Buna-N) resists mineral oils, fuels & hydraulic fluids. Poor against '
                 'aromatics, ozone & ketones. A-D chart for 1,650+ chemicals at 20°C & 50°C.'),
        'faq': [
            {
                'q': 'What chemicals is NBR (Nitrile) resistant to?',
                'a': ('NBR (Nitrile Butadiene Rubber, Buna-N) provides good to excellent resistance '
                      'to mineral oils, hydraulic fluids, diesel, many fuels, and aliphatic '
                      'hydrocarbons. It is the most common elastomer for oil and fuel sealing applications.')
            },
            {
                'q': 'What chemicals attack NBR?',
                'a': ('NBR is attacked by aromatic hydrocarbons (toluene, benzene), ketones (acetone, '
                      'MEK), chlorinated solvents, ozone, and strong acids. For aromatic fuel '
                      'blends, Viton (FKM) is typically preferred.')
            },
            {
                'q': 'How does NBR compare to EPDM?',
                'a': ('NBR handles oils, fuels, and petroleum products far better than EPDM. '
                      'EPDM handles steam, hot water, ketones, and outdoor weathering far better '
                      'than NBR. These two elastomers have nearly opposite resistance profiles.')
            },
        ]
    },
    'ss316': {
        'title': 'SS 316 Chemical Resistance Chart | 316 Stainless Steel | 1,650+ Chemicals',
        'desc': ('316 stainless steel resists dilute acids, alkalis & chloride environments. '
                 'Not recommended for HCl or oxidizing acids. A-D chart for 1,650+ chemicals.'),
        'faq': [
            {
                'q': 'What chemicals is 316 Stainless Steel resistant to?',
                'a': ('SS 316 (V4A, 1.4401) shows good to excellent resistance to dilute organic '
                      'acids, alkalis, alcohol, and many aqueous solutions. Its molybdenum content '
                      'gives it better pitting corrosion resistance than SS 304 in chloride environments.')
            },
            {
                'q': 'What chemicals attack 316 Stainless Steel?',
                'a': ('SS 316 is attacked by hydrochloric acid (even dilute), hydrofluoric acid, '
                      'concentrated sulfuric acid, and chlorine solutions. Bleach and sodium '
                      'hypochlorite can cause pitting corrosion. For aggressive acids, PTFE or '
                      'PVDF are better alternatives.')
            },
            {
                'q': 'Is SS 316 better than SS 304 for chemical resistance?',
                'a': ('SS 316 outperforms SS 304 in chloride and mild acid environments due to '
                      'its 2-3% molybdenum content. For most industrial chemicals, SS 316 is the '
                      'preferred stainless option. SS 304 is adequate for food-grade and mild '
                      'aqueous applications at lower cost.')
            },
        ]
    },
    'stainless-steel-304': {
        'title': 'SS 304 Chemical Resistance Chart | 304 Stainless Steel | 1,650+ Chemicals',
        'desc': ('304 stainless steel for mild aqueous media, food & beverages. Avoid chlorides '
                 '& strong acids. Compare with SS 316. A-D chart for 1,650+ chemicals.'),
        'faq': [
            {
                'q': 'What chemicals is 304 Stainless Steel resistant to?',
                'a': ('SS 304 (V2A, 1.4301) shows good resistance to dilute organic acids, '
                      'food-grade media, beverages, mild alkalis, and many aqueous solutions. '
                      'Widely used in food processing and pharmaceutical equipment.')
            },
            {
                'q': 'When should I choose SS 316 over SS 304?',
                'a': ('Choose SS 316 when the environment contains chlorides (saltwater, chlorinated '
                      'cleaning agents, marine environments) or when handling mild acids like '
                      'acetic or lactic acid. SS 316\'s molybdenum content provides significantly '
                      'better pitting corrosion resistance.')
            },
            {
                'q': 'What chemicals attack SS 304?',
                'a': ('SS 304 is attacked by hydrochloric acid, hydrofluoric acid, chloride solutions '
                      'at elevated temperature, concentrated sulfuric and phosphoric acids, and '
                      'strong reducing agents. It is more susceptible to chloride pitting than SS 316.')
            },
        ]
    },
    'pvc-rigid': {
        'title': 'PVC Rigid Chemical Resistance Chart | Acids & Alkalis | 1,650+ Chemicals',
        'desc': ('Rigid PVC resists dilute acids, alkalis & aqueous solutions at ambient temperature. '
                 'Not for ketones, aromatics or above 60°C. A-D chart for 1,650+ chemicals.'),
        'faq': [
            {
                'q': 'What chemicals is Rigid PVC resistant to?',
                'a': ('Rigid PVC (uPVC, CPVC) shows good resistance to dilute inorganic acids, '
                      'alkalis, salt solutions, and many aqueous media at ambient temperature. '
                      'Widely used in industrial piping systems for acid drainage and chemical '
                      'distribution.')
            },
            {
                'q': 'What are PVC Rigid\'s chemical resistance limitations?',
                'a': ('Rigid PVC is not recommended for ketones (acetone), esters, aromatic '
                      'hydrocarbons (toluene), chlorinated solvents, and concentrated oxidizing '
                      'acids. Service temperature is typically limited to 60°C, above which '
                      'resistance drops significantly.')
            },
            {
                'q': 'How does Rigid PVC compare to PP for chemical resistance?',
                'a': ('Both have similar resistance to dilute acids and alkalis. PP outperforms '
                      'PVC at higher temperatures and against some organic solvents. Rigid PVC '
                      'offers better dimensional stability and is easier to cement (solvent weld). '
                      'PP is preferred above 60°C.')
            },
        ]
    },
    'pvc-flexible': {
        'title': 'PVC Flexible Chemical Resistance Chart | Plasticized PVC | 1,650+ Chemicals',
        'desc': ('Flexible PVC for aqueous acids, alkalis & mild solvents at ambient temp. '
                 'Plasticizers can leach. A-D chart for 1,650+ chemicals at 20°C & 50°C.'),
        'faq': [
            {
                'q': 'What chemicals is Flexible PVC resistant to?',
                'a': ('Flexible PVC (plasticized PVC) shows similar resistance to Rigid PVC for '
                      'dilute acids, alkalis, and aqueous media. The plasticizers (used to make '
                      'it flexible) can leach into solvents and strong chemicals, making it less '
                      'suitable than rigid PVC for aggressive media.')
            },
            {
                'q': 'When should I use Flexible PVC vs Rigid PVC tubing?',
                'a': ('Use Flexible PVC for tubing that needs to bend — pumping hoses, drainage '
                      'tubing, and flexible connectors. Use Rigid PVC for pipework requiring '
                      'structural integrity or when plasticizer migration is a concern. '
                      'For aggressive chemicals, PP, PTFE, or FEP tubing is safer.')
            },
            {
                'q': 'What limits Flexible PVC chemical resistance?',
                'a': ('Flexible PVC is limited by plasticizer leaching in organic solvents, '
                      'poor resistance above 50°C, and susceptibility to swelling with aromatic '
                      'hydrocarbons and chlorinated solvents. Concentrated acids also attack it '
                      'more aggressively than they attack Rigid PVC.')
            },
        ]
    },
    'fep': {
        'title': 'FEP Chemical Resistance Chart | Fluoropolymer Tubing & Hose | 1,650+ Chemicals',
        'desc': ('FEP offers near-PTFE chemical resistance in flexible tubing and films. Rated A '
                 'for most acids, bases & solvents. A-D chart for 1,650+ chemicals at 20°C & 50°C.'),
        'faq': [
            {
                'q': 'What is FEP used for?',
                'a': ('FEP (Fluorinated Ethylene Propylene) is a fluoropolymer widely used for '
                      'tubing, hose linings, and films where PTFE\'s non-melt-processability '
                      'is a limitation. It offers similar chemical resistance to PTFE but can '
                      'be extruded and molded, making it ideal for flexible tubing in chemical '
                      'labs and industrial applications.')
            },
            {
                'q': 'How does FEP compare to PTFE chemically?',
                'a': ('FEP and PTFE have nearly identical chemical resistance — both resist '
                      'virtually all acids, bases, solvents, and oxidizers. FEP has a slightly '
                      'lower max service temperature (~200°C vs ~260°C for PTFE). The main '
                      'difference is processability: FEP can be melt-processed, PTFE cannot.')
            },
            {
                'q': 'Is FEP better than PVDF for chemical tubing?',
                'a': ('FEP generally has broader chemical resistance than PVDF, especially for '
                      'amines and polar solvents. PVDF has better mechanical strength and '
                      'abrasion resistance. For pure chemical compatibility, FEP is the safer '
                      'choice; for mechanical demands alongside chemical resistance, consider PVDF.')
            },
        ]
    },
    'ldpe': {
        'title': 'LDPE Chemical Resistance Chart | Low-Density Polyethylene | 1,650+ Chemicals',
        'desc': ('LDPE resists dilute acids, alkalis & salt solutions. Weaker than HDPE against '
                 'concentrated acids and solvents. A-D chart for 1,650+ chemicals at 20°C & 50°C.'),
        'faq': [
            {
                'q': 'How does LDPE compare to HDPE for chemical resistance?',
                'a': ('LDPE and HDPE have similar chemical resistance profiles, but HDPE is generally '
                      'stronger and more resistant at elevated temperatures. LDPE is more flexible '
                      'and used for squeeze bottles, films, and flexible containers. For demanding '
                      'chemical service, HDPE is typically preferred.')
            },
            {
                'q': 'What chemicals is LDPE resistant to?',
                'a': ('LDPE shows good resistance to dilute inorganic acids, alkalis, alcohols, and '
                      'aqueous salt solutions. It rates A for many common aqueous chemicals but '
                      'has lower temperature resistance than HDPE (typically limited to ~60°C).')
            },
            {
                'q': 'What chemicals attack LDPE?',
                'a': ('LDPE is not recommended for aromatic hydrocarbons, chlorinated solvents, '
                      'concentrated oxidizing acids, and organic solvents at elevated temperatures. '
                      'At 50°C, more chemicals cause degradation compared to ambient conditions.')
            },
        ]
    },
    'nylon-pa': {
        'title': 'Nylon (PA) Chemical Resistance | Polyamide | Weak Acids OK | 1,650+ Chemicals',
        'desc': ('Nylon/PA resists aliphatic hydrocarbons, fuels & mild alkalis. Attacked by '
                 'strong acids & hot water. A-D chart for 1,650+ chemicals at 20°C & 50°C.'),
        'faq': [
            {
                'q': 'What chemicals is Nylon (PA/Polyamide) resistant to?',
                'a': ('Nylon (Polyamide PA) shows good resistance to aliphatic hydrocarbons, '
                      'fuels, oils, ketones, and mild alkalis. It is used in fuel system components, '
                      'mechanical parts, and fittings. PA 12 variants offer better hydrolysis '
                      'resistance than PA 6 or PA 66.')
            },
            {
                'q': 'What chemicals attack Nylon (PA)?',
                'a': ('Nylon is attacked by strong acids (especially hydrochloric, sulfuric, and '
                      'acetic acid), phenols, and hot water. Hydrolysis — degradation by water — '
                      'is a key limitation, especially above 60°C. It rates D for many common '
                      'acids in this database.')
            },
            {
                'q': 'Is Nylon good for chemical storage applications?',
                'a': ('Nylon is generally not recommended for storage of aqueous chemicals or acids. '
                      'Its resistance profile suits mechanical applications in contact with oils '
                      'and fuels rather than chemical storage. For aqueous chemical handling, '
                      'HDPE, PP, or PTFE are safer choices.')
            },
        ]
    },
    'acetal-pom': {
        'title': 'Acetal (POM) Chemical Resistance | Polyoxymethylene | 1,650+ Chemicals',
        'desc': ('Acetal/POM resists weak acids, alkalis & oils at ambient temp. Attacked by '
                 'strong acids. Good dimensional stability. A-D chart for 1,650+ chemicals.'),
        'faq': [
            {
                'q': 'What chemicals is Acetal (POM) resistant to?',
                'a': ('Acetal (Polyoxymethylene, POM, Delrin) shows good resistance to weak acids, '
                      'weak alkalis, aliphatic hydrocarbons, oils, and alcohols at ambient temperature. '
                      'It is widely used for precision parts, fittings, and valves in mild chemical '
                      'environments due to its excellent dimensional stability and low friction.')
            },
            {
                'q': 'What chemicals attack Acetal (POM)?',
                'a': ('Acetal is attacked by strong acids (HCl, H2SO4, HNO3), strong alkalis, '
                      'oxidizing agents, and aromatic hydrocarbons. It is also susceptible to '
                      'degradation by chlorinated solvents and phenols. Above 60°C, resistance '
                      'to many chemicals decreases significantly.')
            },
            {
                'q': 'How does Acetal compare to Nylon for chemical resistance?',
                'a': ('Both are engineering plastics with similar limitations. Acetal has better '
                      'moisture resistance than Nylon and maintains tighter tolerances. Nylon '
                      'has better impact strength. For chemical applications, both are limited '
                      'to mild media — neither is suitable for strong acids or bases.')
            },
        ]
    },
    'polycarbonate': {
        'title': 'Polycarbonate (PC) Chemical Resistance Chart | Transparent | 1,650+ Chemicals',
        'desc': ('Polycarbonate resists dilute acids, aliphatic hydrocarbons & oils. Attacked '
                 'by alkalis, ketones & aromatics. A-D chart for 1,650+ chemicals at 20°C & 50°C.'),
        'faq': [
            {
                'q': 'What chemicals is Polycarbonate resistant to?',
                'a': ('Polycarbonate (PC) shows good resistance to dilute inorganic acids, aliphatic '
                      'hydrocarbons, and mineral oils. It is widely used for transparent sight glasses, '
                      'safety equipment, and containers where visibility is needed in mild chemical environments.')
            },
            {
                'q': 'What chemicals attack Polycarbonate?',
                'a': ('Polycarbonate is attacked by alkalis (even dilute NaOH), ketones (acetone), '
                      'aromatic hydrocarbons, chlorinated solvents, and many esters. It is also '
                      'susceptible to stress cracking when in contact with certain chemicals under '
                      'mechanical stress (environmental stress cracking).')
            },
            {
                'q': 'Is Polycarbonate suitable for chemical storage?',
                'a': ('Polycarbonate is generally limited to mild chemical environments at ambient '
                      'temperature. Its main advantage over other plastics is optical clarity. '
                      'For aggressive chemical service, PP, HDPE, or PTFE are far more suitable. '
                      'Never use PC with solvents, ketones, or alkalis.')
            },
        ]
    },
    'polystyrene': {
        'title': 'Polystyrene (PS) Chemical Resistance Chart | Limited Resistance | 1,650+ Chemicals',
        'desc': ('Polystyrene has limited chemical resistance — good for water, alcohols & dilute '
                 'acids only. Attacked by most organic solvents. A-D chart for 1,650+ chemicals.'),
        'faq': [
            {
                'q': 'What chemicals is Polystyrene resistant to?',
                'a': ('Polystyrene (PS) shows adequate resistance to water, dilute inorganic acids, '
                      'alkalis, and some alcohols. It is mainly used for disposable labware and '
                      'packaging where contact with aggressive chemicals is not expected.')
            },
            {
                'q': 'What chemicals attack Polystyrene?',
                'a': ('Polystyrene is attacked by most organic solvents — aromatic hydrocarbons '
                      '(toluene, xylene dissolve PS), ketones, esters, chlorinated solvents, and '
                      'many fuels. This severely limits its chemical handling applications.')
            },
            {
                'q': 'Should I use Polystyrene for chemical storage?',
                'a': ('Polystyrene is not recommended for chemical storage of any organic solvents '
                      'or aggressive media. It is only appropriate for aqueous solutions and very '
                      'mild chemicals. For chemical resistance, PP, HDPE, or PTFE are far superior choices.')
            },
        ]
    },
    'polysulfone': {
        'title': 'Polysulfone (PSU) Chemical Resistance Chart | High-Temp Plastic | 1,650+ Chemicals',
        'desc': ('Polysulfone resists hot water, steam & dilute acids at high temperatures. '
                 'Attacked by ketones, aromatics & halogenated solvents. A-D chart, 1,650+ chemicals.'),
        'faq': [
            {
                'q': 'What is Polysulfone used for?',
                'a': ('Polysulfone (PSU) is a high-performance engineering thermoplastic used '
                      'where elevated temperatures and chemical resistance are required simultaneously. '
                      'Applications include medical/pharmaceutical equipment, hot water fittings, '
                      'membrane supports, and laboratory equipment.')
            },
            {
                'q': 'What chemicals is Polysulfone resistant to?',
                'a': ('PSU shows good resistance to hot water, steam, dilute acids, and alkalis. '
                      'It maintains strength and stability at temperatures up to ~170°C, outperforming '
                      'commodity plastics like PP and PVC in high-temperature aqueous environments.')
            },
            {
                'q': 'What chemicals attack Polysulfone?',
                'a': ('Polysulfone is attacked by ketones (acetone, MEK), esters, aromatic '
                      'hydrocarbons, and polar halogenated solvents. It has limited resistance '
                      'to strong acids and concentrated alkalis. Avoid ketone-based cleaning '
                      'agents on PSU components.')
            },
        ]
    },
    'petg': {
        'title': 'PETG Chemical Resistance Chart | Transparent Plastic | 1,650+ Chemicals',
        'desc': ('PETG resists dilute acids, alcohols & aqueous solutions. Better solvent '
                 'resistance than PS. Transparent & easy to print. A-D chart for 1,650+ chemicals.'),
        'faq': [
            {
                'q': 'What chemicals is PETG resistant to?',
                'a': ('PETG (Polyethylene Terephthalate Glycol) shows good resistance to dilute '
                      'inorganic acids, dilute alkalis, alcohols, and aqueous solutions. It is used '
                      'for transparent containers, 3D-printed parts, and displays where mild chemical '
                      'exposure is possible.')
            },
            {
                'q': 'What chemicals attack PETG?',
                'a': ('PETG is attacked by acetone and other ketones, chlorinated solvents, '
                      'aromatic hydrocarbons, and concentrated acids or bases. It is more chemical '
                      'resistant than PLA or ABS but significantly less resistant than PP or HDPE.')
            },
            {
                'q': 'Is PETG suitable for chemical containers?',
                'a': ('PETG can be used for mild chemical applications — dilute acids, saline solutions, '
                      'and aqueous media at ambient temperature. For industrial chemical service, '
                      'HDPE or PP are preferred due to broader chemical resistance and better heat stability.')
            },
        ]
    },
    'pmp': {
        'title': 'PMP (TPX) Chemical Resistance Chart | Transparent & Autoclavable | 1,650+ Chemicals',
        'desc': ('PMP (Polymethylpentene, TPX) combines HDPE-like resistance with optical clarity. '
                 'Autoclavable. A-D chart for 1,650+ chemicals at 20°C & 50°C.'),
        'faq': [
            {
                'q': 'What is PMP (TPX) used for?',
                'a': ('PMP (Polymethylpentene, TPX) is used in laboratory equipment — graduated '
                      'cylinders, beakers, funnels, and filtration apparatus — where transparency '
                      'and chemical resistance are both needed. It is autoclavable (up to 121°C) '
                      'and has a chemical resistance profile similar to HDPE.')
            },
            {
                'q': 'What chemicals is PMP resistant to?',
                'a': ('PMP shows good resistance to most dilute inorganic acids, alkalis, alcohols, '
                      'and aqueous solutions. Its chemical resistance is broadly similar to HDPE, '
                      'making it suitable for common laboratory chemicals and physiological fluids.')
            },
            {
                'q': 'What chemicals attack PMP?',
                'a': ('PMP is not recommended for aromatic hydrocarbons, chlorinated solvents, '
                      'strong oxidizing agents, and concentrated acids at elevated temperatures. '
                      'Like HDPE, organic solvents can cause swelling and degradation.')
            },
        ]
    },
    'san': {
        'title': 'SAN Chemical Resistance Chart | Styrene Acrylonitrile | 1,650+ Chemicals',
        'desc': ('SAN resists dilute acids, oils & aliphatic hydrocarbons. Better than PS but '
                 'attacked by ketones & aromatics. A-D chart for 1,650+ chemicals at 20°C & 50°C.'),
        'faq': [
            {
                'q': 'What chemicals is SAN resistant to?',
                'a': ('SAN (Styrene Acrylonitrile) shows better chemical resistance than polystyrene. '
                      'It resists dilute inorganic acids, aliphatic hydrocarbons, alcohols, and oils. '
                      'Used in transparent containers, instrument housings, and refrigerator parts '
                      'where mild chemical exposure may occur.')
            },
            {
                'q': 'What chemicals attack SAN?',
                'a': ('SAN is attacked by ketones (acetone, MEK), aromatic hydrocarbons (toluene, '
                      'xylene), esters, and chlorinated solvents. Alkalis cause degradation. It '
                      'is significantly less resistant than PP or HDPE to most chemicals.')
            },
        ]
    },
    'silicone': {
        'title': 'Silicone Chemical Resistance Chart | High-Temp Elastomer | 1,650+ Chemicals',
        'desc': ('Silicone rubber resists hot air, ozone, steam & dilute acids at high temperatures. '
                 'Poor against fuels & aromatic solvents. A-D chart for 1,650+ chemicals.'),
        'faq': [
            {
                'q': 'What chemicals is Silicone rubber resistant to?',
                'a': ('Silicone rubber (polysiloxane) shows excellent resistance to hot air, ozone, '
                      'UV radiation, steam, and many dilute acids and alkalis. Its temperature '
                      'range (-60°C to +200°C) makes it unique among elastomers for extreme temperature applications.')
            },
            {
                'q': 'What chemicals attack Silicone rubber?',
                'a': ('Silicone is not recommended for fuels, mineral oils, concentrated acids, '
                      'aromatic hydrocarbons, and steam at very high pressures. For fuel resistance, '
                      'NBR or Viton are more appropriate choices.')
            },
            {
                'q': 'Is Silicone suitable for food and pharmaceutical contact?',
                'a': ('Yes. Silicone is widely used for FDA-compliant seals, tubing, and gaskets '
                      'in food processing and pharmaceutical applications. Its chemical inertness '
                      'and temperature stability make it preferred for these regulated applications. '
                      'Always verify specific grades for regulatory compliance.')
            },
        ]
    },
    'aluminium': {
        'title': 'Aluminium Chemical Resistance Chart | Metal | Avoid Acids & Alkalis | 1,650+ Chemicals',
        'desc': ('Aluminium resists solvents, fuels & mild organics but is attacked by most acids '
                 'and alkalis. A-D chart for 1,650+ chemicals at 20°C & 50°C.'),
        'faq': [
            {
                'q': 'What chemicals is Aluminium resistant to?',
                'a': ('Aluminium shows good resistance to aliphatic and aromatic hydrocarbons, fuels, '
                      'many solvents, and dry gases. It forms a protective oxide layer that provides '
                      'some resistance to atmospheric corrosion. Aluminium is used in fuel and '
                      'solvent storage tanks.')
            },
            {
                'q': 'What chemicals attack Aluminium?',
                'a': ('Aluminium is attacked by most inorganic and organic acids, strong alkalis '
                      '(especially sodium and potassium hydroxide), seawater, mercury, and aqueous '
                      'chloride solutions. Even dilute acids can cause significant corrosion.')
            },
            {
                'q': 'How does Aluminium compare to Stainless Steel for chemical resistance?',
                'a': ('Stainless Steel (SS 316) has much broader chemical resistance than Aluminium, '
                      'particularly for acids and aqueous solutions. Aluminium is mainly chosen when '
                      'weight, cost, or thermal conductivity matters and the chemical environment is '
                      'dry solvents or hydrocarbon-based.')
            },
        ]
    },
    'ectfe-etfe': {
        'title': 'ECTFE/ETFE Chemical Resistance Chart | Fluoropolymer Lining | 1,650+ Chemicals',
        'desc': ('ECTFE and ETFE fluoropolymers resist strong acids, alkalis & halogens. '
                 'Used as chemical-resistant linings. A-D chart for 1,650+ chemicals at 20°C & 50°C.'),
        'faq': [
            {
                'q': 'What is ECTFE/ETFE used for?',
                'a': ('ECTFE (Ethylene Chlorotrifluoroethylene, Halar) and ETFE (Ethylene '
                      'Tetrafluoroethylene, Tefzel) are fluoropolymers used as chemical-resistant '
                      'linings for tanks, vessels, and piping. They combine excellent chemical '
                      'resistance with better mechanical properties than PTFE.')
            },
            {
                'q': 'How does ECTFE/ETFE chemical resistance compare to PTFE?',
                'a': ('ECTFE and ETFE have excellent chemical resistance — nearly comparable to PTFE '
                      'for most common chemicals. They resist strong acids (including HF and HCl), '
                      'alkalis, and halogens. They have slightly narrower resistance than PTFE for '
                      'some aggressive chemicals but offer better mechanical strength.')
            },
            {
                'q': 'What chemicals attack ECTFE/ETFE?',
                'a': ('ECTFE/ETFE have limited resistance to hot amines, some organic nitrogen '
                      'compounds, and fuming sulfuric acid at elevated temperatures. Ketones '
                      'and esters may cause swelling at elevated temperatures, unlike PTFE.')
            },
        ]
    },
}


def build_material_faq_schema(mat_data):
    """Build FAQPage schema for material page."""
    faq_items = []
    for item in mat_data.get('faq', []):
        faq_items.append({
            "@type": "Question",
            "name": item['q'],
            "acceptedAnswer": {"@type": "Answer", "text": item['a']}
        })
    return {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faq_items}


def update_material_page(filepath, mat_slug):
    """Update a material page's title, description and add FAQ schema."""
    if mat_slug not in MATERIAL_META:
        return False

    with open(filepath) as f:
        content = f.read()

    meta = MATERIAL_META[mat_slug]
    new_title = meta['title']
    new_desc = meta['desc']

    # Replace title
    content = re.sub(r'<title>[^<]+</title>', f'<title>{new_title}</title>', content, count=1)

    # Replace meta description
    content = re.sub(
        r'<meta name="description" content="[^"]*">',
        f'<meta name="description" content="{new_desc}">',
        content, count=1
    )

    # Update OG/Twitter tags
    content = re.sub(
        r'<meta property="og:title" content="[^"]*">',
        f'<meta property="og:title" content="{new_title}">',
        content, count=1
    )
    content = re.sub(
        r'<meta property="og:description" content="[^"]*">',
        f'<meta property="og:description" content="{new_desc}">',
        content, count=1
    )
    content = re.sub(
        r'<meta name="twitter:title" content="[^"]*">',
        f'<meta name="twitter:title" content="{new_title}">',
        content, count=1
    )
    content = re.sub(
        r'<meta name="twitter:description" content="[^"]*">',
        f'<meta name="twitter:description" content="{new_desc}">',
        content, count=1
    )

    # Add or replace FAQPage schema
    faq_schema = json.dumps(build_material_faq_schema(meta), ensure_ascii=False)
    faq_script_pattern = (
        r'(<script type="application/ld\+json">)'
        r'\s*\{"@context":\s*"https://schema\.org",\s*"@type":\s*"FAQPage".*?\}'
        r'\s*(</script>)'
    )
    if re.search(faq_script_pattern, content, flags=re.DOTALL):
        content = re.sub(
            faq_script_pattern,
            r'\g<1>' + faq_schema + r'\g<2>',
            content, count=1, flags=re.DOTALL
        )
    else:
        # Insert before the first existing ld+json block
        first_schema = re.search(r'<script type="application/ld\+json">', content)
        if first_schema:
            insert_pos = first_schema.start()
            content = (content[:insert_pos]
                       + f'<script type="application/ld+json">{faq_schema}</script>\n'
                       + content[insert_pos:])

    with open(filepath, 'w') as f:
        f.write(content)

    return True


# ─── Static page updates ──────────────────────────────────────────────────────

STATIC_PAGES = {
    'index.html': {
        'title': 'Chemical Resistance Chart — 1,650+ Chemicals, 24 Materials | Free Lookup',
        'desc': ('Instant chemical resistance lookup: 1,650+ chemicals × 24 materials (HDPE, PTFE, PP, '
                 'Viton, SS 316). A-D ratings at 20°C & 50°C. Free — no signup required.'),
    },
    'chemicals/index.html': {
        'title': '1,650+ Chemical Resistance Charts — Browse by Chemical | Free Database',
        'desc': ('Find chemical resistance data for any compound. 1,650+ chemicals rated A-D against '
                 'HDPE, PTFE, PP, Viton, SS 316 and 20 more materials at 20°C & 50°C.'),
    },
    'materials/index.html': {
        'title': '24 Material Resistance Charts — HDPE, PTFE, PP, Viton & More | Free',
        'desc': ('Browse chemical resistance charts for 24 materials: fluoropolymers (PTFE, FEP, PVDF), '
                 'plastics (HDPE, PP), elastomers (Viton, EPDM, NBR), metals (SS 316). Free A-D ratings.'),
    },
    'compare/index.html': {
        'title': 'Compare Chemical Resistance Side-by-Side — Pick Any 2-3 Materials | Free',
        'desc': ('Build custom side-by-side comparison of any 2-3 materials vs 1,650+ chemicals. '
                 'Highlight differences instantly. A-D ratings at 20°C & 50°C for HDPE, PTFE, PP, Viton & more.'),
    },
    'charts/index.html': {
        'title': 'Chemical Resistance Comparison Charts — Fluoropolymers vs Plastics vs Metals',
        'desc': ('Pre-built chemical resistance charts comparing PTFE, PVDF, FEP, HDPE, PP, Viton, SS 316 '
                 'side-by-side. See which materials handle acids, bases, solvents & fuels.'),
    },
    'storage-compatibility/index.html': {
        'title': 'Chemical Storage Compatibility Checker — Can You Store These Together?',
        'desc': ('Check if chemicals can be safely co-stored. Get OSHA/NFPA cabinet recommendations, '
                 'incompatibility warnings & separation rules. Free tool — enter any chemical combination.'),
    },
    'sds-decoder/index.html': {
        'title': 'SDS Decoder — Safety Data Sheets in Plain English | Free Tool',
        'desc': ('Paste SDS section text and get plain-English hazard summaries, PPE requirements, '
                 'storage rules & GHS pictogram explanations. Free — no account needed.'),
    },
    'viscosity/index.html': {
        'title': 'Viscosity Chart — 100+ Liquids in mPa·s (cP) | Free Lookup Table',
        'desc': ('Viscosity values for 100+ common liquids: water, oils, acids, solvents & industrial '
                 'fluids. Data in mPa·s (cP) for pump selection & fluid dynamics. Free lookup table.'),
    },
    'about/index.html': {
        'title': 'About ChemicalResistance.org | Free Chemical Compatibility Database',
        'desc': ('ChemicalResistance.org provides free chemical resistance data for engineers and '
                 'safety professionals. Data sourced from Bürkle GmbH. 1,650+ chemicals, 24 materials.'),
    },
}


def update_static_page(filepath_rel):
    """Update a static page's title and description."""
    filepath = os.path.join(BASE_DIR, filepath_rel)
    if not os.path.exists(filepath):
        return False

    if filepath_rel not in STATIC_PAGES:
        return False

    with open(filepath) as f:
        content = f.read()

    meta = STATIC_PAGES[filepath_rel]
    new_title = meta['title']
    new_desc = meta['desc']

    content = re.sub(r'<title>[^<]+</title>', f'<title>{new_title}</title>', content, count=1)
    content = re.sub(
        r'<meta name="description" content="[^"]*">',
        f'<meta name="description" content="{new_desc}">',
        content, count=1
    )

    # OG/Twitter if present
    if '<meta property="og:title"' in content:
        content = re.sub(
            r'<meta property="og:title" content="[^"]*">',
            f'<meta property="og:title" content="{new_title}">',
            content, count=1
        )
    if '<meta property="og:description"' in content:
        content = re.sub(
            r'<meta property="og:description" content="[^"]*">',
            f'<meta property="og:description" content="{new_desc}">',
            content, count=1
        )
    if '<meta name="twitter:title"' in content:
        content = re.sub(
            r'<meta name="twitter:title" content="[^"]*">',
            f'<meta name="twitter:title" content="{new_title}">',
            content, count=1
        )
    if '<meta name="twitter:description"' in content:
        content = re.sub(
            r'<meta name="twitter:description" content="[^"]*">',
            f'<meta name="twitter:description" content="{new_desc}">',
            content, count=1
        )

    with open(filepath, 'w') as f:
        f.write(content)
    return True


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    print("Loading chemical data...")
    chemical_data = load_chemical_data()

    chemicals_dir = os.path.join(BASE_DIR, 'chemicals')
    materials_dir = os.path.join(BASE_DIR, 'materials')

    # --- Update English chemical pages ---
    print("\n--- Updating chemical pages ---")
    chem_updated = 0
    chem_skipped = []

    for slug in sorted(os.listdir(chemicals_dir)):
        filepath = os.path.join(chemicals_dir, slug, 'index.html')
        if not os.path.exists(filepath):
            continue

        with open(filepath) as f:
            content = f.read()
        if 'lang="en"' not in content:
            continue  # skip non-English

        if slug in chemical_data:
            data = chemical_data[slug]
            title, desc = update_chemical_page(filepath, data['name'], data)
            print(f"  ✓ {slug}: {title[:60]}...")
            chem_updated += 1
        else:
            # Try to extract the chemical name from the page title
            m = re.search(r'<title>([^<|]+?)(?:\s*(?:Chemical Resistance|Resistance)[^<]*)?</title>', content)
            if m:
                name_in_title = m.group(1).strip()
                alt_slug = slugify(name_in_title)
                if alt_slug in chemical_data:
                    data = chemical_data[alt_slug]
                    title, desc = update_chemical_page(filepath, data['name'], data)
                    print(f"  ✓ {slug} (via title match): {title[:60]}...")
                    chem_updated += 1
                    continue
            chem_skipped.append(slug)
            print(f"  - {slug}: no data match, skipping")

    print(f"\nChemical pages updated: {chem_updated}, skipped: {len(chem_skipped)}")

    # --- Update material pages ---
    print("\n--- Updating material pages ---")
    mat_updated = 0

    for mat_slug in sorted(os.listdir(materials_dir)):
        filepath = os.path.join(materials_dir, mat_slug, 'index.html')
        if not os.path.exists(filepath):
            continue
        if mat_slug in ('de', 'es', 'fr', 'pt', 'zh', 'ss304', 'ldpe.html', 'ptfe.html', 'pvdf.html'):
            continue

        if update_material_page(filepath, mat_slug):
            print(f"  ✓ {mat_slug}")
            mat_updated += 1
        else:
            print(f"  - {mat_slug}: no config, skipping")

    print(f"\nMaterial pages updated: {mat_updated}")

    # --- Update static pages ---
    print("\n--- Updating static pages ---")
    static_updated = 0

    for page_rel in STATIC_PAGES:
        if update_static_page(page_rel):
            print(f"  ✓ {page_rel}")
            static_updated += 1
        else:
            print(f"  - {page_rel}: file not found")

    print(f"\nStatic pages updated: {static_updated}")
    print("\n✅ CTR optimization complete!")

    # Print summary stats
    print(f"\nSummary:")
    print(f"  Chemical pages: {chem_updated} updated")
    print(f"  Material pages: {mat_updated} updated")
    print(f"  Static pages:   {static_updated} updated")
    print(f"  Total:          {chem_updated + mat_updated + static_updated} pages")


if __name__ == '__main__':
    main()
