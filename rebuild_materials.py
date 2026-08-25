#!/usr/bin/env python3
"""
Rebuild all material pages to use the dynamic JSON-fetching template.
Fixes: truncated static pages, missing filterTable(), broken rating filter.
"""
import os
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Material definitions
MATERIALS = {
    'aluminium': {
        'key': 'AL', 'display': 'Aluminium', 'color': 'blue',
        'full_name': 'Aluminium (Aluminum)',
        'desc': 'Aluminium is a lightweight, corrosion-resistant metal widely used in chemical processing equipment, tanks, and piping systems.',
        'properties': [
            ('Full Name', 'Aluminium (Al)'),
            ('Density', '2.70 g/cm³'),
            ('Melting Point', '660°C (1220°F)'),
            ('Max Service Temp', '200°C (392°F)'),
        ],
        'applications': [
            ('Chemical Storage', 'flask', 'amber', 'Storage tanks for many organic chemicals and some acids'),
            ('Heat Exchangers', 'thermometer', 'blue', 'Heat transfer equipment in chemical processes'),
            ('Piping', 'pipette', 'emerald', 'Lightweight piping for non-aggressive chemicals'),
        ],
        'avoid': ['Strong alkalis (NaOH, KOH)', 'Hydrochloric acid', 'Mercury and mercury compounds', 'Chlorinated solvents'],
        'avoid_tip': 'For aggressive acids and alkalis, consider stainless steel 316 or PTFE-lined equipment.',
        'compare': [('ss316', 'SS 316', 'Corrosion resistant'), ('stainless-steel-304', 'SS 304', 'Budget metal'), ('ptfe', 'PTFE', 'Universal'), ('hdpe', 'HDPE', 'Plastic option')],
    },
    'ectfe-etfe': {
        'key': 'ECTFE_ETFE', 'display': 'ECTFE/ETFE', 'color': 'emerald',
        'full_name': 'Ethylene Chlorotrifluoroethylene / Ethylene Tetrafluoroethylene',
        'desc': 'ECTFE and ETFE are high-performance fluoropolymers with excellent chemical resistance, transparency, and mechanical strength.',
        'properties': [
            ('Full Name', 'ECTFE / ETFE'),
            ('Max Temperature', '150°C (302°F)'),
            ('Min Temperature', '-76°C (-105°F)'),
            ('Density', '1.68 g/cm³'),
        ],
        'applications': [
            ('Tank Linings', 'box', 'amber', 'Chemical tank and vessel linings for corrosive environments'),
            ('Architecture', 'building', 'blue', 'ETFE roofing and cladding panels'),
            ('Wire Insulation', 'cable', 'emerald', 'High-performance electrical insulation'),
        ],
        'avoid': ['Molten alkali metals', 'Fluorine gas at high temperature', 'Some amine-based solvents at elevated temperatures'],
        'avoid_tip': 'For the most extreme chemical environments, consider PTFE which has broader resistance.',
        'compare': [('ptfe', 'PTFE', 'Universal'), ('fep', 'FEP', 'Melt-processable'), ('pvdf', 'PVDF', 'Fluoropolymer'), ('pp', 'PP', 'Budget plastic')],
    },
    'epdm': {
        'key': 'EPDM', 'display': 'EPDM', 'color': 'blue',
        'full_name': 'Ethylene Propylene Diene Monomer',
        'desc': 'EPDM is the go-to rubber for water, steam, and outdoor applications. Outstanding ozone and UV resistance makes it ideal for weathering applications.',
        'properties': [
            ('Full Name', 'Ethylene Propylene Diene Monomer'),
            ('Also Known As', 'EPDM rubber'),
            ('Max Temperature', '150°C (302°F) continuous'),
            ('Min Temperature', '-50°C (-58°F)'),
        ],
        'applications': [
            ('Water Systems', 'droplets', 'blue', 'Seals, gaskets, and hoses for potable water systems'),
            ('Outdoor Seals', 'sun', 'amber', 'Window seals, roofing membranes, automotive weatherstrips'),
            ('Steam Systems', 'cloud', 'emerald', 'Steam hoses, autoclave seals, food processing'),
        ],
        'avoid': ['Petroleum oils and fuels', 'Hydrocarbon solvents', 'Mineral oils and greases', 'Turpentine and naphtha'],
        'avoid_tip': 'For oil and fuel resistance, use NBR instead. For extreme chemicals, consider Viton (FKM).',
        'compare': [('nbr', 'NBR', 'For oil/fuel'), ('silicone', 'Silicone', 'High temp'), ('viton', 'Viton', 'Universal rubber'), ('ptfe', 'PTFE', 'Universal')],
    },
    'fep': {
        'key': 'FEP', 'display': 'FEP', 'color': 'emerald',
        'full_name': 'Fluorinated Ethylene Propylene',
        'desc': 'FEP shares most of PTFE\'s outstanding chemical resistance but can be melt-processed, making it ideal for tubing, linings, and coatings.',
        'properties': [
            ('Full Name', 'Fluorinated Ethylene Propylene'),
            ('Max Temperature', '200°C (392°F)'),
            ('Min Temperature', '-200°C (-328°F)'),
            ('Transparency', 'Optically clear'),
        ],
        'applications': [
            ('Tubing', 'pipette', 'amber', 'Chemical transfer tubing, laboratory tubing'),
            ('Linings', 'shield', 'blue', 'Tank and vessel linings for corrosive chemicals'),
            ('Wire Insulation', 'cable', 'emerald', 'Plenum-rated wire and cable insulation'),
        ],
        'avoid': ['Molten alkali metals', 'Elemental fluorine at high pressure', 'Some perfluorinated compounds at extreme temperatures'],
        'avoid_tip': 'FEP has a lower max temperature than PTFE (200°C vs 260°C). For higher temperatures, use PTFE.',
        'compare': [('ptfe', 'PTFE', 'Higher temp'), ('ectfe-etfe', 'ECTFE/ETFE', 'Similar'), ('pvdf', 'PVDF', 'Budget fluoro'), ('pp', 'PP', 'Budget plastic')],
    },
    'viton': {
        'key': 'FPM', 'display': 'Viton (FKM)', 'color': 'purple',
        'full_name': 'Viton® Fluoroelastomer (FKM/FPM)',
        'desc': 'Viton is a premium fluoroelastomer offering the broadest chemical resistance of any elastomer. Excellent for aggressive chemicals, fuels, and high temperatures.',
        'properties': [
            ('Full Name', 'Fluoroelastomer (FKM/FPM)'),
            ('Brand Name', 'Viton® (Chemours)'),
            ('Max Temperature', '200°C (392°F) continuous'),
            ('Min Temperature', '-20°C (-4°F)'),
        ],
        'applications': [
            ('Chemical Processing', 'flask', 'purple', 'Seals and gaskets for aggressive chemical environments'),
            ('Aerospace', 'plane', 'blue', 'Fuel system seals, hydraulic seals'),
            ('Automotive', 'car', 'amber', 'Fuel injector O-rings, emission system seals'),
        ],
        'avoid': ['Ketones (acetone, MEK)', 'Low molecular weight esters', 'Amines', 'Hot water and steam above 150°C'],
        'avoid_tip': 'For ketone resistance, consider EPDM. For steam service, EPDM is better suited.',
        'compare': [('nbr', 'NBR', 'Budget oil seal'), ('epdm', 'EPDM', 'Water/steam'), ('silicone', 'Silicone', 'High temp'), ('ptfe', 'PTFE', 'Universal')],
    },
    'hdpe': {
        'key': 'HDPE', 'display': 'HDPE', 'color': 'amber',
        'full_name': 'High-Density Polyethylene',
        'desc': 'HDPE is a widely used thermoplastic for chemical storage tanks, containers, and piping. Excellent resistance to many acids, bases, and solvents at an economical price.',
        'properties': [
            ('Full Name', 'High-Density Polyethylene'),
            ('Max Temperature', '80°C (176°F) continuous'),
            ('Min Temperature', '-50°C (-58°F)'),
            ('Density', '0.94–0.97 g/cm³'),
        ],
        'applications': [
            ('Chemical Tanks', 'box', 'amber', 'Storage tanks for acids, bases, and many solvents'),
            ('Piping Systems', 'pipette', 'blue', 'Chemical transfer piping and fittings'),
            ('Containers', 'package', 'emerald', 'Bottles, drums, and containers for chemical storage'),
        ],
        'avoid': ['Strong oxidizers (nitric acid >50%)', 'Chlorinated solvents', 'Aromatic hydrocarbons (benzene, toluene)', 'Temperatures above 80°C'],
        'avoid_tip': 'For higher temperatures or more aggressive solvents, consider PVDF or PTFE.',
        'compare': [('ldpe', 'LDPE', 'Flexible PE'), ('pp', 'PP', 'Higher temp'), ('pvdf', 'PVDF', 'Premium'), ('ptfe', 'PTFE', 'Universal')],
    },
    'ldpe': {
        'key': 'LDPE', 'display': 'LDPE', 'color': 'amber',
        'full_name': 'Low-Density Polyethylene',
        'desc': 'LDPE is a flexible, translucent thermoplastic with good chemical resistance. Widely used for squeeze bottles, tubing, and flexible containers.',
        'properties': [
            ('Full Name', 'Low-Density Polyethylene'),
            ('Max Temperature', '80°C (176°F)'),
            ('Min Temperature', '-50°C (-58°F)'),
            ('Density', '0.91–0.93 g/cm³'),
        ],
        'applications': [
            ('Squeeze Bottles', 'droplets', 'amber', 'Laboratory wash bottles and dispensing containers'),
            ('Flexible Tubing', 'pipette', 'blue', 'Chemical transfer tubing'),
            ('Film & Packaging', 'package', 'emerald', 'Chemical-resistant bags and liners'),
        ],
        'avoid': ['Strong oxidizing acids', 'Chlorinated solvents', 'Aromatic hydrocarbons', 'Temperatures above 80°C'],
        'avoid_tip': 'LDPE is less rigid than HDPE. For structural applications, use HDPE or PP.',
        'compare': [('hdpe', 'HDPE', 'Rigid PE'), ('pp', 'PP', 'Stiffer plastic'), ('ptfe', 'PTFE', 'Universal'), ('pvdf', 'PVDF', 'Premium')],
    },
    'nbr': {
        'key': 'NBR', 'display': 'NBR', 'color': 'amber',
        'full_name': 'Nitrile Butadiene Rubber (Buna-N)',
        'desc': 'NBR is the industry standard for oil and fuel resistance. Also known as Buna-N, it\'s the most widely used elastomer for hydraulic seals, O-rings, and fuel system components.',
        'properties': [
            ('Full Name', 'Nitrile Butadiene Rubber'),
            ('Also Known As', 'Buna-N, Nitrile'),
            ('Max Temperature', '120°C (248°F) continuous'),
            ('Min Temperature', '-30°C (-22°F)'),
        ],
        'applications': [
            ('Fuel Systems', 'fuel', 'amber', 'Fuel hoses, tank seals, gasoline pumps, diesel systems'),
            ('Hydraulics', 'settings', 'blue', 'Hydraulic seals, O-rings, cylinder seals, pumps'),
            ('Automotive', 'car', 'emerald', 'Engine seals, transmission seals, oil pan gaskets'),
        ],
        'avoid': ['Ozone and UV exposure (outdoor use)', 'Ketones (acetone, MEK)', 'Esters and ethers', 'Strong acids', 'Chlorinated hydrocarbons', 'Brake fluid (glycol-based)'],
        'avoid_tip': 'For outdoor applications or ozone exposure, use EPDM instead. For extreme chemicals, consider Viton (FKM).',
        'compare': [('epdm', 'EPDM', 'For water/outdoor'), ('ptfe', 'PTFE', 'Universal'), ('hdpe', 'HDPE', 'Rigid plastic'), ('ss316', 'SS 316', 'Metal option')],
    },
    'nylon-pa': {
        'key': 'PA', 'display': 'Nylon (PA)', 'color': 'blue',
        'full_name': 'Polyamide (Nylon)',
        'desc': 'Nylon (PA) is a versatile engineering thermoplastic with good chemical resistance to hydrocarbons, and excellent mechanical properties including wear resistance.',
        'properties': [
            ('Full Name', 'Polyamide (Nylon 6, Nylon 66)'),
            ('Max Temperature', '120°C (248°F)'),
            ('Min Temperature', '-40°C (-40°F)'),
            ('Key Property', 'Excellent wear resistance'),
        ],
        'applications': [
            ('Gears & Bearings', 'settings', 'blue', 'Self-lubricating gears, bearings, and bushings'),
            ('Fittings', 'pipette', 'amber', 'Chemical-resistant pipe fittings and connectors'),
            ('Containers', 'package', 'emerald', 'Chemical storage containers and housings'),
        ],
        'avoid': ['Strong mineral acids', 'Oxidizing agents', 'Phenol and formic acid', 'Zinc chloride solutions'],
        'avoid_tip': 'Nylon absorbs moisture which affects dimensions and properties. For wet environments, consider acetal (POM) or HDPE.',
        'compare': [('acetal-pom', 'Acetal (POM)', 'Low moisture'), ('hdpe', 'HDPE', 'Chemical tank'), ('pp', 'PP', 'Budget'), ('ptfe', 'PTFE', 'Universal')],
    },
    'polycarbonate': {
        'key': 'PC', 'display': 'Polycarbonate', 'color': 'blue',
        'full_name': 'Polycarbonate (PC)',
        'desc': 'Polycarbonate is a transparent, impact-resistant thermoplastic. While not suited for aggressive chemicals, it excels in applications requiring clarity and toughness.',
        'properties': [
            ('Full Name', 'Polycarbonate (PC)'),
            ('Max Temperature', '120°C (248°F)'),
            ('Transparency', 'Optically clear'),
            ('Key Property', 'Outstanding impact resistance'),
        ],
        'applications': [
            ('Safety Guards', 'shield', 'blue', 'Machine guards, safety shields, face shields'),
            ('Lab Equipment', 'flask', 'amber', 'Desiccators, centrifuge tubes, safety glasses'),
            ('Sight Glasses', 'eye', 'emerald', 'Flow indicators and level gauges'),
        ],
        'avoid': ['Alkalis (NaOH, KOH, ammonia)', 'Acetone and MEK', 'Chlorinated solvents', 'Aromatic hydrocarbons', 'Strong acids'],
        'avoid_tip': 'For chemical-resistant transparent applications, consider PETG or PMP.',
        'compare': [('petg', 'PETG', 'Chemical resistant'), ('pmp', 'PMP', 'Autoclavable'), ('san', 'SAN', 'Transparent'), ('polystyrene', 'PS', 'Budget')],
    },
    'petg': {
        'key': 'PETG', 'display': 'PETG', 'color': 'blue',
        'full_name': 'Polyethylene Terephthalate Glycol (PETG)',
        'desc': 'PETG combines clarity with better chemical resistance than polycarbonate. Widely used for lab equipment and chemical-resistant transparent containers.',
        'properties': [
            ('Full Name', 'Polyethylene Terephthalate Glycol'),
            ('Max Temperature', '70°C (158°F)'),
            ('Transparency', 'Clear'),
            ('Key Property', 'Good chemical resistance + clarity'),
        ],
        'applications': [
            ('Lab Containers', 'flask', 'blue', 'Bottles, jars, and storage containers'),
            ('Displays', 'monitor', 'amber', 'Point-of-purchase displays, sign holders'),
            ('3D Printing', 'printer', 'emerald', 'Chemical-resistant 3D printed parts'),
        ],
        'avoid': ['Acetone and ketones', 'Chloroform', 'Strong acids at elevated temperatures', 'Prolonged UV exposure'],
        'avoid_tip': 'For higher temperature applications, consider PMP or polysulfone.',
        'compare': [('polycarbonate', 'PC', 'Impact resistant'), ('pmp', 'PMP', 'Higher temp'), ('pp', 'PP', 'Budget'), ('ptfe', 'PTFE', 'Universal')],
    },
    'pmp': {
        'key': 'PMP', 'display': 'PMP', 'color': 'emerald',
        'full_name': 'Polymethylpentene (TPX)',
        'desc': 'PMP (TPX) is a transparent, lightweight thermoplastic with excellent chemical resistance. It can be autoclaved and offers the lowest density of any commercial plastic.',
        'properties': [
            ('Full Name', 'Polymethylpentene (TPX®)'),
            ('Max Temperature', '170°C (338°F)'),
            ('Density', '0.83 g/cm³ (lightest plastic)'),
            ('Autoclavable', 'Yes (121°C)'),
        ],
        'applications': [
            ('Lab Equipment', 'flask', 'emerald', 'Beakers, graduated cylinders, funnels'),
            ('Microwave', 'zap', 'amber', 'Microwave-transparent containers'),
            ('Medical', 'heart-pulse', 'blue', 'Sterilizable medical components'),
        ],
        'avoid': ['Chlorinated solvents', 'Strong oxidizing acids (>60% nitric)', 'Aromatic hydrocarbons at high temperature'],
        'avoid_tip': 'PMP is brittle compared to PC or PETG. For impact resistance, choose polycarbonate.',
        'compare': [('petg', 'PETG', 'Similar clarity'), ('polycarbonate', 'PC', 'Impact tough'), ('pp', 'PP', 'Budget'), ('ptfe', 'PTFE', 'Universal')],
    },
    'acetal-pom': {
        'key': 'POM', 'display': 'Acetal (POM)', 'color': 'blue',
        'full_name': 'Polyoxymethylene (Acetal, Delrin)',
        'desc': 'Acetal (POM/Delrin) is an engineering thermoplastic with excellent dimensional stability, low friction, and good chemical resistance to solvents and fuels.',
        'properties': [
            ('Full Name', 'Polyoxymethylene (POM)'),
            ('Brand Names', 'Delrin®, Celcon®'),
            ('Max Temperature', '100°C (212°F)'),
            ('Key Property', 'Low friction, high stiffness'),
        ],
        'applications': [
            ('Precision Parts', 'settings', 'blue', 'Gears, bearings, valve bodies, pump components'),
            ('Fuel Components', 'fuel', 'amber', 'Fuel system parts, carburetor components'),
            ('Fittings', 'pipette', 'emerald', 'Plumbing fittings, connectors, fasteners'),
        ],
        'avoid': ['Strong acids (sulfuric, nitric, HCl)', 'Strong oxidizers', 'Phenol', 'Chlorinated solvents at elevated temperatures'],
        'avoid_tip': 'POM is attacked by strong acids. For acid resistance, use HDPE, PP, or PTFE.',
        'compare': [('nylon-pa', 'Nylon (PA)', 'Similar'), ('hdpe', 'HDPE', 'Chemical tank'), ('pp', 'PP', 'Budget'), ('ptfe', 'PTFE', 'Universal')],
    },
    'pp': {
        'key': 'PP', 'display': 'PP', 'color': 'emerald',
        'full_name': 'Polypropylene',
        'desc': 'Polypropylene is a versatile, lightweight thermoplastic with excellent chemical resistance to acids and bases. Widely used for chemical tanks, piping, and lab equipment.',
        'properties': [
            ('Full Name', 'Polypropylene'),
            ('Max Temperature', '100°C (212°F)'),
            ('Min Temperature', '0°C (32°F)'),
            ('Density', '0.90 g/cm³'),
        ],
        'applications': [
            ('Chemical Tanks', 'box', 'emerald', 'Acid and alkali storage tanks and vessels'),
            ('Lab Equipment', 'flask', 'amber', 'Bottles, funnels, trays, autoclaving containers'),
            ('Piping', 'pipette', 'blue', 'Chemical-resistant piping and fittings'),
        ],
        'avoid': ['Strong oxidizers', 'Chlorinated solvents', 'Aromatic hydrocarbons', 'Concentrated nitric acid'],
        'avoid_tip': 'PP becomes brittle below 0°C. For cold environments, use HDPE or LDPE.',
        'compare': [('hdpe', 'HDPE', 'Cold-tough PE'), ('pvdf', 'PVDF', 'Premium'), ('ptfe', 'PTFE', 'Universal'), ('ss316', 'SS 316', 'Metal option')],
    },
    'polystyrene': {
        'key': 'PS', 'display': 'Polystyrene', 'color': 'amber',
        'full_name': 'Polystyrene (PS)',
        'desc': 'Polystyrene is a low-cost, rigid thermoplastic with limited chemical resistance. Primarily used for disposable lab items and low-demand chemical applications.',
        'properties': [
            ('Full Name', 'Polystyrene (PS)'),
            ('Max Temperature', '70°C (158°F)'),
            ('Transparency', 'Clear (GPPS)'),
            ('Key Property', 'Very low cost'),
        ],
        'applications': [
            ('Disposable Lab', 'flask', 'amber', 'Petri dishes, cuvettes, pipette tips'),
            ('Packaging', 'package', 'blue', 'Chemical sample containers'),
            ('Insulation', 'thermometer', 'emerald', 'EPS foam insulation for cold chain'),
        ],
        'avoid': ['Most organic solvents', 'Acetone, MEK, toluene', 'Essential oils', 'Concentrated acids'],
        'avoid_tip': 'PS has poor solvent resistance. For reusable chemical equipment, use PP, HDPE, or PETG.',
        'compare': [('san', 'SAN', 'Better resistance'), ('pp', 'PP', 'Much better'), ('petg', 'PETG', 'Better + clear'), ('hdpe', 'HDPE', 'Chemical tank')],
    },
    'polysulfone': {
        'key': 'PSU', 'display': 'Polysulfone', 'color': 'blue',
        'full_name': 'Polysulfone (PSU)',
        'desc': 'Polysulfone is a high-performance, transparent thermoplastic with excellent thermal stability, steam sterilizability, and resistance to aqueous acids and bases.',
        'properties': [
            ('Full Name', 'Polysulfone (PSU)'),
            ('Max Temperature', '160°C (320°F)'),
            ('Min Temperature', '-100°C (-148°F)'),
            ('Key Property', 'Steam sterilizable, transparent'),
        ],
        'applications': [
            ('Medical Devices', 'heart-pulse', 'blue', 'Dialysis membranes, surgical instruments'),
            ('Water Filtration', 'droplets', 'amber', 'Ultrafiltration and nanofiltration membranes'),
            ('Hot Water', 'thermometer', 'emerald', 'Hot water fittings, coffee machine components'),
        ],
        'avoid': ['Ketones (acetone, MEK)', 'Chlorinated solvents', 'Aromatic hydrocarbons', 'Strong alkalis at high concentration'],
        'avoid_tip': 'For solvent resistance, consider PVDF. For universal chemical resistance, use PTFE.',
        'compare': [('pvdf', 'PVDF', 'Solvent resistant'), ('ptfe', 'PTFE', 'Universal'), ('pmp', 'PMP', 'Light + clear'), ('polycarbonate', 'PC', 'Impact tough')],
    },
    'ptfe': {
        'key': 'PTFE', 'display': 'PTFE', 'color': 'emerald',
        'full_name': 'Polytetrafluoroethylene (Teflon)',
        'desc': 'PTFE (Teflon) is the gold standard for chemical resistance — virtually inert to all chemicals. Used in gaskets, seals, bearings, and linings for the most demanding applications.',
        'properties': [
            ('Full Name', 'Polytetrafluoroethylene'),
            ('Brand Name', 'Teflon® (Chemours)'),
            ('Max Temperature', '260°C (500°F)'),
            ('Min Temperature', '-200°C (-328°F)'),
        ],
        'applications': [
            ('Gaskets & Seals', 'shield', 'emerald', 'Universal chemical gaskets, valve seats, pump seals'),
            ('Linings', 'box', 'blue', 'Tank and pipe linings for aggressive chemicals'),
            ('Bearings', 'settings', 'amber', 'Self-lubricating bearings and slides'),
        ],
        'avoid': ['Molten alkali metals (sodium, potassium)', 'Elemental fluorine at high pressure', 'Certain fluorinated compounds at extreme conditions'],
        'avoid_tip': 'PTFE cannot be melt-processed. For tubing and complex shapes, consider FEP which offers similar resistance.',
        'compare': [('fep', 'FEP', 'Melt-processable'), ('pvdf', 'PVDF', 'Budget fluoro'), ('ectfe-etfe', 'ECTFE/ETFE', 'Mechanical'), ('ss316', 'SS 316', 'Metal option')],
    },
    'pvc-rigid': {
        'key': 'PVC_HART', 'display': 'PVC Rigid', 'color': 'blue',
        'full_name': 'Polyvinyl Chloride (Rigid/Unplasticized)',
        'desc': 'Rigid PVC (uPVC) is a cost-effective thermoplastic with good resistance to acids, alkalis, and many chemicals. Widely used in piping and chemical processing.',
        'properties': [
            ('Full Name', 'Unplasticized PVC (uPVC)'),
            ('Max Temperature', '60°C (140°F)'),
            ('Density', '1.30–1.45 g/cm³'),
            ('Key Property', 'Very cost-effective'),
        ],
        'applications': [
            ('Piping', 'pipette', 'blue', 'Chemical waste piping, drainage systems'),
            ('Tanks', 'box', 'amber', 'Chemical storage tanks for mild chemicals'),
            ('Fume Hoods', 'wind', 'emerald', 'Laboratory fume extraction ductwork'),
        ],
        'avoid': ['Ketones and esters', 'Chlorinated solvents', 'Aromatic hydrocarbons', 'Temperatures above 60°C'],
        'avoid_tip': 'PVC has a low temperature limit. For higher temperatures, use PP, HDPE, or PVDF.',
        'compare': [('pvc-flexible', 'PVC Flexible', 'Flexible version'), ('pp', 'PP', 'Higher temp'), ('hdpe', 'HDPE', 'Tougher'), ('pvdf', 'PVDF', 'Premium')],
    },
    'pvc-flexible': {
        'key': 'PVC_WEICH', 'display': 'PVC Flexible', 'color': 'purple',
        'full_name': 'Polyvinyl Chloride (Flexible/Plasticized)',
        'desc': 'Flexible PVC is a plasticized version of PVC offering flexibility and chemical resistance. Used for tubing, hoses, and flexible liners.',
        'properties': [
            ('Full Name', 'Plasticized PVC (pPVC)'),
            ('Max Temperature', '60°C (140°F)'),
            ('Key Property', 'Flexible, economical'),
            ('Plasticizer', 'DOP/DEHP or phthalate-free'),
        ],
        'applications': [
            ('Tubing', 'pipette', 'purple', 'Laboratory and chemical transfer tubing'),
            ('Hoses', 'cable', 'blue', 'Air and water hoses, suction hoses'),
            ('Liners', 'layers', 'amber', 'Tank liners and pond liners'),
        ],
        'avoid': ['Ketones and esters', 'Chlorinated solvents', 'Most organic solvents', 'Concentrated acids'],
        'avoid_tip': 'Plasticizer can leach into solvents. For pure chemical contact, use rigid materials like PP or PTFE.',
        'compare': [('pvc-rigid', 'PVC Rigid', 'Rigid version'), ('silicone', 'Silicone', 'Flexible'), ('nbr', 'NBR', 'Oil resistant'), ('epdm', 'EPDM', 'Water/outdoor')],
    },
    'pvdf': {
        'key': 'PVDF', 'display': 'PVDF', 'color': 'emerald',
        'full_name': 'Polyvinylidene Fluoride',
        'desc': 'PVDF is a premium fluoropolymer with excellent chemical resistance, particularly to solvents and halogens. Combines high purity with good mechanical strength.',
        'properties': [
            ('Full Name', 'Polyvinylidene Fluoride'),
            ('Max Temperature', '150°C (302°F)'),
            ('Min Temperature', '-30°C (-22°F)'),
            ('Density', '1.78 g/cm³'),
        ],
        'applications': [
            ('Semiconductor', 'cpu', 'emerald', 'Ultra-pure chemical handling in chip fabrication'),
            ('Chemical Piping', 'pipette', 'blue', 'High-purity piping for aggressive chemicals'),
            ('Pharma', 'heart-pulse', 'amber', 'Pharmaceutical process equipment and filters'),
        ],
        'avoid': ['Strong bases (NaOH, KOH) at high concentration', 'Fuming sulfuric acid', 'Dimethylformamide (DMF)', 'Hot amines'],
        'avoid_tip': 'PVDF is attacked by strong bases. For alkali resistance, use PP or HDPE.',
        'compare': [('ptfe', 'PTFE', 'Better resistance'), ('fep', 'FEP', 'Similar cost'), ('pp', 'PP', 'Budget'), ('hdpe', 'HDPE', 'Budget')],
    },
    'san': {
        'key': 'SAN', 'display': 'SAN', 'color': 'amber',
        'full_name': 'Styrene Acrylonitrile',
        'desc': 'SAN is a transparent thermoplastic with better chemical resistance than polystyrene. Used in laboratory and food processing applications.',
        'properties': [
            ('Full Name', 'Styrene Acrylonitrile (SAN)'),
            ('Max Temperature', '85°C (185°F)'),
            ('Transparency', 'Clear'),
            ('Key Property', 'Better resistance than PS'),
        ],
        'applications': [
            ('Lab Equipment', 'flask', 'amber', 'Graduated cylinders, beakers, cuvettes'),
            ('Food Processing', 'utensils', 'blue', 'Clear containers for food contact'),
            ('Housings', 'box', 'emerald', 'Instrument housings and covers'),
        ],
        'avoid': ['Most organic solvents', 'Acetone and MEK', 'Strong acids at elevated temperatures', 'Chlorinated solvents'],
        'avoid_tip': 'For better chemical resistance with clarity, consider PETG or PMP.',
        'compare': [('polystyrene', 'PS', 'Budget'), ('petg', 'PETG', 'Better chem'), ('polycarbonate', 'PC', 'Impact tough'), ('pp', 'PP', 'Much better')],
    },
    'silicone': {
        'key': 'SI', 'display': 'Silicone', 'color': 'red',
        'full_name': 'Silicone Rubber',
        'desc': 'Silicone rubber offers the widest temperature range of any elastomer (-60°C to 230°C) with good chemical resistance to many fluids and excellent biocompatibility.',
        'properties': [
            ('Full Name', 'Silicone Rubber (VMQ/FVMQ)'),
            ('Max Temperature', '230°C (446°F)'),
            ('Min Temperature', '-60°C (-76°F)'),
            ('Key Property', 'Widest temp range, biocompatible'),
        ],
        'applications': [
            ('Medical', 'heart-pulse', 'red', 'Medical tubing, implants, pharmaceutical closures'),
            ('Food & Beverage', 'utensils', 'amber', 'FDA-grade seals, bakeware, food processing'),
            ('High Temp Seals', 'thermometer', 'blue', 'Oven seals, exhaust gaskets, lighting seals'),
        ],
        'avoid': ['Steam above 150°C (long-term)', 'Concentrated acids and alkalis', 'Hydrocarbon solvents and fuels', 'Ketones and esters'],
        'avoid_tip': 'For fuel and oil resistance, use NBR or Viton. For aggressive chemicals, PTFE is preferred.',
        'compare': [('epdm', 'EPDM', 'Water/outdoor'), ('viton', 'Viton', 'Chemical seal'), ('nbr', 'NBR', 'Oil seal'), ('ptfe', 'PTFE', 'Universal')],
    },
    'stainless-steel-304': {
        'key': 'V2A', 'display': 'SS 304', 'color': 'blue',
        'full_name': '304 Stainless Steel (V2A / 1.4301)',
        'desc': '304 Stainless Steel (V2A) is the most commonly used stainless steel grade, offering good corrosion resistance for general-purpose applications.',
        'properties': [
            ('Full Name', '304 Stainless Steel (V2A)'),
            ('Standard', 'AISI 304 / 1.4301'),
            ('Max Temperature', '870°C (1600°F)'),
            ('Composition', '18% Cr, 8% Ni'),
        ],
        'applications': [
            ('Food Industry', 'utensils', 'blue', 'Food processing equipment, kitchen equipment'),
            ('General Chemical', 'flask', 'amber', 'Tanks and vessels for mild chemicals'),
            ('Architecture', 'building', 'emerald', 'Handrails, cladding, structural elements'),
        ],
        'avoid': ['Chloride-rich environments (pitting)', 'Hydrochloric acid', 'Sulfuric acid (hot)', 'Salt spray / marine environments'],
        'avoid_tip': 'For chloride and marine environments, upgrade to 316 Stainless Steel (V4A) which contains molybdenum.',
        'compare': [('ss316', 'SS 316', 'Better corrosion'), ('aluminium', 'Aluminium', 'Lightweight'), ('ptfe', 'PTFE', 'Universal'), ('hdpe', 'HDPE', 'Plastic option')],
    },
    'ss316': {
        'key': 'V4A', 'display': 'SS 316', 'color': 'blue',
        'full_name': '316 Stainless Steel (V4A / 1.4401)',
        'desc': '316 Stainless Steel (V4A) is the premium stainless steel for corrosive environments. The addition of molybdenum provides superior resistance to chlorides and acids.',
        'properties': [
            ('Full Name', '316 Stainless Steel (V4A)'),
            ('Standard', 'AISI 316 / 1.4401'),
            ('Max Temperature', '870°C (1600°F)'),
            ('Composition', '16% Cr, 10% Ni, 2% Mo'),
        ],
        'applications': [
            ('Pharma', 'heart-pulse', 'blue', 'Pharmaceutical process vessels, cleanroom equipment'),
            ('Marine', 'anchor', 'amber', 'Marine hardware, offshore equipment'),
            ('Chemical Processing', 'flask', 'emerald', 'Acid tanks, heat exchangers, reactor vessels'),
        ],
        'avoid': ['Hydrochloric acid (concentrated)', 'Hot concentrated sulfuric acid', 'Ferric chloride', 'Reducing conditions in strong chloride solutions'],
        'avoid_tip': 'For the most aggressive acids, consider PTFE or PVDF linings over stainless steel.',
        'compare': [('stainless-steel-304', 'SS 304', 'Budget steel'), ('aluminium', 'Aluminium', 'Lightweight'), ('ptfe', 'PTFE', 'Universal'), ('pvdf', 'PVDF', 'Plastic lining')],
    },
}


def generate_page(mat_dir, mat_info):
    """Generate a dynamic material page."""
    key = mat_info['key']
    display = mat_info['display']
    color = mat_info['color']
    full_name = mat_info['full_name']
    desc = mat_info['desc']

    # Properties table
    props_html = ''
    for i, (label, value) in enumerate(mat_info['properties']):
        col = 0 if i < len(mat_info['properties'])//2 + len(mat_info['properties'])%2 else 1
        props_html += f'''                    <div class="flex justify-between py-2 border-b border-gray-100">
                        <span class="text-gray-600">{label}</span>
                        <span class="font-medium text-gray-900">{value}</span>
                    </div>
'''

    # Split properties into two columns
    half = len(mat_info['properties'])//2 + len(mat_info['properties'])%2
    props_col1 = mat_info['properties'][:half]
    props_col2 = mat_info['properties'][half:]

    col1_html = '\n'.join(f'''                    <div class="flex justify-between py-2 border-b border-gray-100">
                        <span class="text-gray-600">{label}</span>
                        <span class="font-medium text-gray-900">{value}</span>
                    </div>''' for label, value in props_col1)

    col2_html = '\n'.join(f'''                    <div class="flex justify-between py-2 border-b border-gray-100">
                        <span class="text-gray-600">{label}</span>
                        <span class="font-medium text-gray-900">{value}</span>
                    </div>''' for label, value in props_col2)

    # Applications
    apps_html = ''
    for app_name, icon, app_color, app_desc in mat_info['applications']:
        apps_html += f'''                <div class="bg-white p-5 rounded-xl border border-gray-200">
                    <div class="w-10 h-10 bg-{app_color}-100 rounded-lg flex items-center justify-center mb-3">
                        <i data-lucide="{icon}" class="w-5 h-5 text-{app_color}-600"></i>
                    </div>
                    <h3 class="font-bold text-gray-900 mb-1">{app_name}</h3>
                    <p class="text-sm text-gray-600">{app_desc}</p>
                </div>
'''

    # Avoid list
    avoid_items = mat_info['avoid']
    avoid_half = len(avoid_items)//2 + len(avoid_items)%2
    avoid_col1 = avoid_items[:avoid_half]
    avoid_col2 = avoid_items[avoid_half:]

    avoid1_html = '\n'.join(f'''                    <li class="flex items-center gap-2 text-gray-700">
                        <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                        {item}
                    </li>''' for item in avoid_col1)

    avoid2_html = '\n'.join(f'''                    <li class="flex items-center gap-2 text-gray-700">
                        <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                        {item}
                    </li>''' for item in avoid_col2)

    # Compare links
    compare_html = ''
    for cmp_dir, cmp_name, cmp_label in mat_info['compare']:
        compare_html += f'''                <a href="../{cmp_dir}" class="p-4 rounded-xl border border-gray-200 hover:border-{color}-300 hover:bg-{color}-50 transition-colors text-center">
                    <div class="font-bold text-gray-900">{cmp_name}</div>
                    <div class="text-xs text-gray-500">{cmp_label}</div>
                </a>
'''

    # Escape for JSON-LD
    desc_escaped = desc.replace('"', '&quot;').replace("'", "&#39;")

    page = f'''<!DOCTYPE html>
<html lang="en">
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LTK6VVHYDW"></script>
<script src="https://analytics.ahrefs.com/analytics.js" data-key="xrS32xSgQE4Xp1oL20j7uQ" async></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag("js",new Date());gtag("config","G-LTK6VVHYDW");</script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{display} Chemical Resistance Chart — 950+ Chemicals Rated | {full_name}</title>
    <meta name="description" content="{display} ({full_name}) chemical resistance chart — 950+ chemicals rated A-D at 20°C and 50°C. Free searchable database.">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="canonical" href="https://chemicalresistance.org/materials/{mat_dir}/">
    <meta property="og:title" content="{display} Chemical Resistance Chart">
    <meta property="og:description" content="{desc_escaped}">
    <meta property="og:type" content="article">
    <link rel="stylesheet" href="/css/tailwind.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        * {{ font-family: 'Inter', sans-serif; }}
        body {{ background: #f8fafc; }}
        .rating-A {{ background: #22c55e; color: white; }}
        .rating-B {{ background: #3b82f6; color: white; }}
        .rating-C {{ background: #f59e0b; color: white; }}
        .rating-D {{ background: #ef4444; color: white; }}
        .rating-NR {{ background: #e5e7eb; color: #9ca3af; }}
    </style>
<script type="application/ld+json">{{"@context":"https://schema.org","@type":"WebPage","name":"{display} Chemical Resistance Chart","description":"{desc_escaped}","url":"https://chemicalresistance.org/materials/{mat_dir}/"}}</script>
<link rel="alternate" hreflang="x-default" href="https://chemicalresistance.org/materials/{mat_dir}/">
<link rel="alternate" hreflang="en" href="https://chemicalresistance.org/materials/{mat_dir}/">
<link rel="alternate" hreflang="de" href="https://chemicalresistance.org/materials/de/{mat_dir}/">
<link rel="alternate" hreflang="es" href="https://chemicalresistance.org/materials/es/{mat_dir}/">
<link rel="alternate" hreflang="fr" href="https://chemicalresistance.org/materials/fr/{mat_dir}/">
<link rel="alternate" hreflang="pt" href="https://chemicalresistance.org/materials/pt/{mat_dir}/">
</head>
<body class="text-gray-700 min-h-screen">
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2">
                <img src="/logos/logo-icon-128x128.png" alt="ChemicalResistance" class="w-10 h-10 rounded-xl">
                <div>
                    <div class="font-bold text-gray-900">ChemicalResistance.org</div>
                    <div class="text-xs text-gray-500">Chemical compatibility database</div>
                </div>
            </a>
            <div class="flex items-center gap-4 text-sm">
                <a href="/compare/" class="text-gray-600 hover:text-gray-900 hidden sm:inline">Compare</a>
                <a href="/charts/" class="text-gray-600 hover:text-gray-900 hidden sm:inline">Charts</a>
                <a href="/" class="text-gray-600 hover:text-gray-900">&larr; Search</a>
            </div>
        </div>
    </header>

    <section class="bg-gradient-to-b from-{color}-50 to-white px-4 py-8 md:py-12">
        <div class="max-w-4xl mx-auto">
            <div class="flex items-center gap-2 text-sm text-{color}-600 mb-3">
                <a href="/" class="hover:underline">Home</a>
                <span>&rsaquo;</span>
                <a href="/materials/" class="hover:underline">Materials</a>
                <span>&rsaquo;</span>
                <span class="text-gray-600">{display}</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{display} Chemical Resistance Chart</h1>
            <p class="text-lg text-gray-600 mb-4">{desc}</p>
            <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-{color}-100 text-{color}-800 rounded-full text-sm font-medium">950+ chemicals tested</span>
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">20°C &amp; 50°C data</span>
            </div>
        </div>
    </section>

    <section class="px-4 py-6">
        <div class="max-w-4xl mx-auto grid grid-cols-4 gap-4 text-center">
            <div>
                <div class="text-2xl font-bold text-emerald-600" id="statA">&mdash;</div>
                <div class="text-sm text-gray-500">Excellent (A)</div>
            </div>
            <div>
                <div class="text-2xl font-bold text-blue-600" id="statB">&mdash;</div>
                <div class="text-sm text-gray-500">Good (B)</div>
            </div>
            <div>
                <div class="text-2xl font-bold text-amber-600" id="statC">&mdash;</div>
                <div class="text-sm text-gray-500">Limited (C)</div>
            </div>
            <div>
                <div class="text-2xl font-bold text-red-600" id="statD">&mdash;</div>
                <div class="text-sm text-gray-500">Not Recommended (D)</div>
            </div>
        </div>
    </section>

    <section class="px-4 py-8">
        <div class="max-w-6xl mx-auto">
            <div class="bg-white rounded-xl border border-gray-200 p-4 mb-6">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Search chemicals</label>
                        <input type="text" id="searchInput" placeholder="e.g. Acetone, Sulfuric acid..."
                            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-{color}-500 focus:ring-2 focus:ring-{color}-100 outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Rating filter</label>
                        <select id="ratingFilter" class="px-4 py-2 border border-gray-200 rounded-lg focus:border-{color}-500 outline-none">
                            <option value="all">All ratings</option>
                            <option value="A">A - Excellent</option>
                            <option value="B">B - Good</option>
                            <option value="AB">A &amp; B (Compatible)</option>
                            <option value="C">C - Limited</option>
                            <option value="D">D - Not recommended</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Temperature</label>
                        <select id="tempFilter" class="px-4 py-2 border border-gray-200 rounded-lg focus:border-{color}-500 outline-none">
                            <option value="c20">20°C</option>
                            <option value="c50">50°C</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="mb-4 text-sm text-gray-500">
                Showing <span id="resultCount" class="font-semibold text-gray-700">0</span> chemicals
            </div>
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full min-w-[600px]">
                        <thead>
                            <tr class="bg-gray-50 text-left text-sm">
                                <th class="py-3 px-4 font-semibold text-gray-600">Chemical</th>
                                <th class="py-3 px-4 font-semibold text-gray-600">Concentration</th>
                                <th class="py-3 px-4 font-semibold text-gray-600 text-center">20°C</th>
                                <th class="py-3 px-4 font-semibold text-gray-600 text-center">50°C</th>
                                <th class="py-3 px-4 font-semibold text-gray-600">CAS</th>
                            </tr>
                        </thead>
                        <tbody id="chemTable" class="divide-y divide-gray-100"></tbody>
                    </table>
                </div>
            </div>
            <div id="loadMore" class="mt-4 text-center hidden">
                <button onclick="loadMore()" class="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">Load more chemicals</button>
            </div>
        </div>
    </section>

    <section class="px-4 py-12 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">{display} Properties</h2>
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-4">
{col1_html}
                </div>
                <div class="space-y-4">
{col2_html}
                </div>
            </div>
        </div>
    </section>

    <section class="px-4 py-12">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Common Applications</h2>
            <div class="grid md:grid-cols-3 gap-4">
{apps_html}            </div>
        </div>
    </section>

    <section class="px-4 py-12 bg-red-50 border-t border-red-100">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Not Recommended For</h2>
            <p class="text-gray-600 mb-4">{display} may degrade when exposed to:</p>
            <div class="grid md:grid-cols-2 gap-4">
                <ul class="space-y-2">
{avoid1_html}
                </ul>
                <ul class="space-y-2">
{avoid2_html}
                </ul>
            </div>
            <div class="mt-4 p-3 bg-white rounded-lg border border-red-200">
                <p class="text-sm text-gray-600"><strong>Tip:</strong> {mat_info['avoid_tip']}</p>
            </div>
        </div>
    </section>

    <section class="px-4 py-12 bg-white border-t border-gray-200">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Compare Materials</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
{compare_html}            </div>
        </div>
    </section>

    <footer class="bg-gray-900 text-gray-400 py-8 px-4">
        <div class="max-w-5xl mx-auto text-center text-sm">
            <p>&copy; 2026 ChemicalResistance.org &mdash; Free chemical compatibility tool</p>
            <p class="mt-2">Data sources: B&uuml;rkle, INEOS, industry standards</p>
        </div>
    </footer>

    <script src="/js/chemical_translations_en.js"></script>
    <script>
    const MATERIAL = '{key}';
    let chemicals = [];
    let filteredChemicals = [];
    let displayCount = 50;

    fetch('/data/chemicals_burkle_full.json')
        .then(r => r.json())
        .then(data => {{
            chemicals = data.filter(c => c.ratings[MATERIAL] && (c.ratings[MATERIAL].c20 || c.ratings[MATERIAL].c50));
            updateStats();
            applyFilters();
        }});

    function ratingToGrade(val) {{
        const map = {{ '1': 'A', '2': 'B', '3': 'C', '4': 'D', '0': 'NR' }};
        return map[val] || 'NR';
    }}

    function translateName(germanName) {{
        const lower = germanName.toLowerCase();
        if (typeof chemicalTranslations !== 'undefined' && chemicalTranslations[lower]) {{
            return chemicalTranslations[lower];
        }}
        return germanName;
    }}

    function updateStats() {{
        const stats = {{ A: 0, B: 0, C: 0, D: 0 }};
        chemicals.forEach(c => {{
            const r = ratingToGrade(c.ratings[MATERIAL]?.c20);
            if (stats[r] !== undefined) stats[r]++;
        }});
        document.getElementById('statA').textContent = stats.A;
        document.getElementById('statB').textContent = stats.B;
        document.getElementById('statC').textContent = stats.C;
        document.getElementById('statD').textContent = stats.D;
    }}

    function applyFilters() {{
        const query = document.getElementById('searchInput').value.toLowerCase();
        const rating = document.getElementById('ratingFilter').value;
        const temp = document.getElementById('tempFilter').value;

        filteredChemicals = chemicals.filter(c => {{
            const matchesSearch = !query ||
                c.name.toLowerCase().includes(query) ||
                (c.name_en && c.name_en.toLowerCase().includes(query)) ||
                (c.cas && c.cas.includes(query));

            const r = ratingToGrade(c.ratings[MATERIAL]?.[temp]);
            let matchesRating = true;
            if (rating === 'A') matchesRating = r === 'A';
            else if (rating === 'B') matchesRating = r === 'B';
            else if (rating === 'AB') matchesRating = r === 'A' || r === 'B';
            else if (rating === 'C') matchesRating = r === 'C';
            else if (rating === 'D') matchesRating = r === 'D';

            return matchesSearch && matchesRating;
        }});

        const order = {{ A: 0, B: 1, C: 2, D: 3, NR: 4 }};
        filteredChemicals.sort((a, b) => {{
            const ra = ratingToGrade(a.ratings[MATERIAL]?.[temp]);
            const rb = ratingToGrade(b.ratings[MATERIAL]?.[temp]);
            return (order[ra] ?? 5) - (order[rb] ?? 5);
        }});

        displayCount = 50;
        renderTable();
    }}

    function translateConc(conc) {{
        if (!conc) return '&mdash;';
        const map = {{
            'w\\u00e4ssrig': 'Aqueous', 'ges\\u00e4ttigt': 'Saturated', 'verd\\u00fcnnt': 'Diluted',
            'konz.': 'Concentrated', 'konzentriert': 'Concentrated', 'rein': 'Pure',
            'techn. rein': 'Technical Grade', 'jede': 'Any', 'gering': 'Low',
            'fl\\u00fcssig': 'Liquid', 'gasf\\u00f6rmig': 'Gaseous', 'geschmolzen': 'Molten',
            'trocken': 'Dry', 'feucht': 'Wet/Moist', 'fest': 'Solid'
        }};
        for (const [de, en] of Object.entries(map)) {{
            if (conc.toLowerCase().includes(de.toLowerCase())) {{
                return conc.replace(new RegExp(de, 'gi'), en);
            }}
        }}
        return conc;
    }}

    function renderTable() {{
        const tbody = document.getElementById('chemTable');
        const temp = document.getElementById('tempFilter').value;
        const toShow = filteredChemicals.slice(0, displayCount);

        document.getElementById('resultCount').textContent = filteredChemicals.length;
        document.getElementById('loadMore').classList.toggle('hidden', displayCount >= filteredChemicals.length);

        tbody.innerHTML = toShow.map(c => {{
            const name = translateName(c.name);
            const r20 = ratingToGrade(c.ratings[MATERIAL]?.c20);
            const r50 = ratingToGrade(c.ratings[MATERIAL]?.c50);
            const conc = translateConc(c.concentration);
            const cas = c.cas || '&mdash;';
            return `<tr class="hover:bg-gray-50">
                <td class="py-3 px-4">
                    <div class="font-medium text-gray-900">${{name}}</div>
                    ${{name !== c.name ? `<div class="text-xs text-gray-500">${{c.name}}</div>` : ''}}
                </td>
                <td class="py-3 px-4 text-sm text-gray-600">${{conc}}</td>
                <td class="py-3 px-4 text-center"><span class="rating-${{r20}} px-2 py-1 rounded text-xs font-bold">${{r20}}</span></td>
                <td class="py-3 px-4 text-center"><span class="rating-${{r50}} px-2 py-1 rounded text-xs font-bold">${{r50}}</span></td>
                <td class="py-3 px-4 text-sm text-gray-500 font-mono">${{cas}}</td>
            </tr>`;
        }}).join('');
    }}

    function loadMore() {{ displayCount += 50; renderTable(); }}

    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('ratingFilter').addEventListener('change', applyFilters);
    document.getElementById('tempFilter').addEventListener('change', applyFilters);
    lucide.createIcons();
    </script>
<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{{"token": "cba547e85ee54e0f9cdc27e68405eead"}}'></script>
</body>
</html>'''
    return page


if __name__ == '__main__':
    print("Rebuilding material pages...")

    for mat_dir, mat_info in MATERIALS.items():
        outdir = os.path.join(BASE_DIR, 'materials', mat_dir)
        os.makedirs(outdir, exist_ok=True)
        outpath = os.path.join(outdir, 'index.html')

        html = generate_page(mat_dir, mat_info)
        with open(outpath, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"  Built: materials/{mat_dir}/index.html")

    print(f"\nRebuilt {len(MATERIALS)} material pages")
    print("All pages now use dynamic JSON loading with working search, filter, and sort")
