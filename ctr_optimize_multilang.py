#!/usr/bin/env python3
"""
Multilingual CTR Optimization — ChemicalResistance.org
Applies the same data-specific title/description/FAQ improvements as the English
version, translated into German (de), Spanish (es), French (fr), Portuguese (pt),
and Chinese Simplified (zh).
"""

import json
import os
import re

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ─── Priority order for mentioning materials ──────────────────────────────────
MAT_PRIORITY = [
    'PTFE', 'HDPE', 'PP', 'PVDF', 'FEP', 'EPDM', 'Viton', 'NBR',
    'SS 316', 'SS 304', 'Nylon', 'Polycarbonate', 'PVC', 'PVC Rigid',
    'PVC Flex', 'LDPE', 'Silicone', 'PETG', 'Acetal', 'Polystyrene',
    'Polysulfone', 'SAN', 'Aluminium', 'PMP', 'ECTFE/ETFE',
]

MAT_NAMES = {
    'HDPE': 'HDPE', 'LDPE': 'LDPE', 'PA': 'Nylon', 'PC': 'Polycarbonate',
    'PETG': 'PETG', 'PMP': 'PMP', 'POM': 'Acetal', 'PP': 'PP',
    'PS': 'Polystyrene', 'PSU': 'Polysulfone', 'PTFE': 'PTFE',
    'PVC': 'PVC', 'PVC_HART': 'PVC Rigid', 'PVC_WEICH': 'PVC Flex',
    'PVDF': 'PVDF', 'SAN': 'SAN', 'SI': 'Silicone',
    'AL': 'Aluminium', 'V2A': 'SS 304', 'V4A': 'SS 316',
    'EPDM': 'EPDM', 'FPM': 'Viton', 'NBR': 'NBR',
    'FEP': 'FEP', 'ECTFE_ETFE': 'ECTFE/ETFE',
    'SS304': 'SS 304', 'SS316': 'SS 316',
}


# ─── Language configuration templates ────────────────────────────────────────

LANG = {
    'de': {
        'title_strip_suffixes': [
            'Chemikalienbeständigkeitstabelle | ChemicalResistance.org',
            'Beständigkeitstabelle | ChemicalResistance.org',
            'Chemikalienbeständigkeitstabelle',
            'Beständigkeitstabelle',
            '| ChemicalResistance.org',
        ],
        'title_strip_prefixes': [],
        'name_regexes': [
            r'^(.*?)\s+(?:Beständigkeit|Chemikalienbeständigkeit)(?:\s|$|—|–)',
        ],
        # {chem} = localised chemical name, {top} = top A materials, {total} = num materials
        'chem_title': '{chem} Beständigkeit — {top} A-Bewertung | {total} Werkstoffe',
        'chem_title_fallback': '{chem} Chemikalienbeständigkeit | {total} Werkstoffe A-D',
        # {top_a} = top 3 A-mats, {rest} = "+N weitere", {chem}, {conc}, {d_mats}
        'chem_desc_avoid': '{top_a}{rest} A-bewertet (ausgezeichnet) für {chem}{conc}. {d_mats} nicht empfohlen. A-D-Tabelle für {total} Werkstoffe bei 20°C & 50°C.',
        'chem_desc_no_avoid': '{top_a}{rest} A-bewertet (ausgezeichnet) für {chem}{conc}. Vollständige A-D-Tabelle für {total} Werkstoffe bei 20°C & 50°C.',
        'chem_desc_fallback': 'Chemikalienbeständigkeit von {chem}{conc}. A-D-Tabelle für {total} Werkstoffe bei 20°C und 50°C. Kostenlose Datenbank.',
        'faq_q1_ans': (
            'Unsere Datenbank umfasst {total} Werkstoffe, die gegen {chem} getestet wurden. '
            'Mit A (ausgezeichnet) bei 20°C bewertet: {top_a_long}'
            '{a_count_note}. Klicken Sie oben auf eine Materialkarte für die vollständige A-D-Bewertung.'
        ),
        'faq_q2_ans': (
            'Für {chem} sind folgende Werkstoffe mit A (ausgezeichnet) bei 20°C bewertet: {top_a_long}. '
            '{avoid_note}'
            'Die Auswahl hängt von Konzentration, Temperatur und Einwirkdauer ab. Bitte beim Gerätehersteller überprüfen.'
        ),
        'faq_q2_ans_no_a': (
            'Die Beständigkeitswerte für {chem} variieren je nach Werkstoff. '
            'Prüfen Sie die vollständige Tabelle oben für 20°C und 50°C. '
            'Die Auswahl hängt von Konzentration, Temperatur und Einwirkdauer ab.'
        ),
        'faq_avoid_note': 'Vermeiden Sie {d_list} (D-bewertet, nicht empfohlen). ',
        'faq_q4_ans': (
            'Ja. Die Beständigkeit gegen {chem} kann sich zwischen 20°C und 50°C erheblich ändern. '
            'Höhere Temperaturen verringern im Allgemeinen die Materialbeständigkeit — '
            'einige Werkstoffe fallen von A auf C oder D ab. '
            'Unsere Tabelle zeigt Bewertungen bei beiden Temperaturen.'
        ),
        'faq_q5_ans': (
            'Die Chemikalienbeständigkeitsdaten stammen aus Verträglichkeitstabellen der Bürkle GmbH (buerkle.de), '
            'einem deutschen Hersteller mit jahrzehntelanger Expertise in der Chemikalienhandhabung.'
        ),
        'a_count_note': ' — {n} Werkstoffe mit voller Beständigkeit',
        # material titles (short + use-case differentiated) - ~60 chars max
        'mat_titles': {
            'hdpe': 'HDPE Chemikalienbeständigkeit | Säuren, Laugen & Salze | 1.650+',
            'ptfe': 'PTFE (Teflon) Beständigkeit | Nahezu universell | 1.650+ Chemikalien',
            'pp': 'PP (Polypropylen) Beständigkeit | Säuren & Laugen | 1.650+ Chemikalien',
            'pvdf': 'PVDF Chemikalienbeständigkeit | Fluorpolymer | 1.650+ Chemikalien',
            'epdm': 'EPDM Chemikalienbeständigkeit | Dampf, Säuren & Laugen | 1.650+',
            'viton': 'Viton (FKM) Beständigkeit | Kraftstoffe & Öle | 1.650+ Chemikalien',
            'nbr': 'NBR (Nitril) Beständigkeit | Öle, Kraftstoffe & Hydraulik | 1.650+',
            'ss316': 'V4A (SS 316) Chemikalienbeständigkeit | Edelstahl | 1.650+',
            'stainless-steel-304': 'V2A (SS 304) Chemikalienbeständigkeit | Edelstahl | 1.650+',
            'pvc-rigid': 'PVC Hart Chemikalienbeständigkeit | 1.650+ Chemikalien A-D',
            'pvc-flexible': 'PVC Weich Chemikalienbeständigkeit | 1.650+ Chemikalien A-D',
            'fep': 'FEP Chemikalienbeständigkeit | Fluorpolymer | 1.650+ Chemikalien',
            'ldpe': 'LDPE Chemikalienbeständigkeit | 1.650+ Chemikalien A-D bewertet',
            'nylon-pa': 'Nylon (PA) Chemikalienbeständigkeit | Polyamid | 1.650+ Chemikalien',
            'acetal-pom': 'Acetal (POM) Chemikalienbeständigkeit | 1.650+ Chemikalien A-D',
            'polycarbonate': 'Polycarbonat (PC) Chemikalienbeständigkeit | 1.650+ Chemikalien',
            'polystyrene': 'Polystyrol (PS) Chemikalienbeständigkeit | 1.650+ Chemikalien',
            'polysulfone': 'Polysulfon (PSU) Chemikalienbeständigkeit | 1.650+ Chemikalien',
            'petg': 'PETG Chemikalienbeständigkeit | 1.650+ Chemikalien A-D bewertet',
            'pmp': 'PMP (TPX) Chemikalienbeständigkeit | 1.650+ Chemikalien A-D',
            'san': 'SAN Chemikalienbeständigkeit | 1.650+ Chemikalien A-D bewertet',
            'silicone': 'Silikon Chemikalienbeständigkeit | 1.650+ Chemikalien A-D',
            'aluminium': 'Aluminium Chemikalienbeständigkeit | 1.650+ Chemikalien A-D',
            'ectfe-etfe': 'ECTFE/ETFE Chemikalienbeständigkeit | Fluorpolymer | 1.650+',
        },
        'mat_descs': {
            'hdpe': 'HDPE beständig gegen starke Säuren, Laugen & Salzlösungen (A-bewertet). Schwächer gegen Aromaten & chlorierte Lösungsmittel. 1.650+ Chemikalien A-D bei 20°C & 50°C.',
            'ptfe': 'PTFE bietet nahezu universelle Chemikalienbeständigkeit — A-bewertet für fast alle Säuren, Laugen & Lösungsmittel. Chemisch inert bis 200°C+. 1.650+ Chemikalien kostenlos.',
            'pp': 'PP A-bewertet für die meisten Säuren, Laugen & wässrige Salzlösungen. Nicht für Aromaten oder chlorierte Lösungsmittel geeignet. 1.650+ Chemikalien A-D bei 20°C & 50°C.',
            'pvdf': 'PVDF (Kynar) beständig gegen konzentrierte Säuren, Halogene & Oxidationsmittel. Ausgezeichnet bei 50°C. 1.650+ Chemikalien A-D für anspruchsvollen Chemiebetrieb.',
            'epdm': 'EPDM-Gummi ausgezeichnet gegen Dampf, Heißwasser, verdünnte Säuren & Laugen. Schlecht gegen Öle, Kraftstoffe & aromatische Lösungsmittel. 1.650+ Chemikalien A-D.',
            'viton': 'Viton/FKM ausgezeichnet gegen Kraftstoffe, Öle, aromatische Kohlenwasserstoffe & konzentrierte Säuren. A-bewertet für 700+ Chemikalien. 1.650+ Chemikalien A-D.',
            'nbr': 'NBR (Buna-N) beständig gegen Mineralöle, Kraftstoffe & Hydraulikflüssigkeiten. Schlecht gegen Aromaten, Ozon & Ketone. 1.650+ Chemikalien A-D bei 20°C & 50°C.',
            'ss316': 'V4A beständig gegen verdünnte Säuren, Laugen & Chloridumgebungen. Nicht empfohlen für HCl oder oxidierende Säuren. 1.650+ Chemikalien A-D.',
            'stainless-steel-304': 'V2A für milde wässrige Medien, Lebensmittel & Getränke. Chloride & starke Säuren vermeiden. Vergleich mit V4A. 1.650+ Chemikalien A-D.',
            'pvc-rigid': 'PVC Hart beständig gegen verdünnte Säuren, Laugen & wässrige Lösungen bei Umgebungstemperatur. Nicht für Ketone, Aromaten oder über 60°C. 1.650+ Chemikalien.',
            'pvc-flexible': 'PVC Weich für wässrige Säuren, Laugen & milde Lösungsmittel bei Umgebungstemperatur. Weichmacher können auswaschen. 1.650+ Chemikalien A-D bei 20°C & 50°C.',
            'fep': 'FEP bietet nahezu PTFE-ähnliche Beständigkeit in flexiblen Schläuchen & Folien. A-bewertet für die meisten Säuren, Laugen & Lösungsmittel. 1.650+ Chemikalien A-D.',
            'ldpe': 'LDPE beständig gegen verdünnte Säuren, Laugen & Salzlösungen. Schwächer als HDPE gegen konzentrierte Säuren & Lösungsmittel. 1.650+ Chemikalien A-D bei 20°C & 50°C.',
            'nylon-pa': 'Nylon/PA beständig gegen aliphatische Kohlenwasserstoffe, Kraftstoffe & milde Laugen. Angegriffen von starken Säuren & heißem Wasser. 1.650+ Chemikalien A-D bei 20°C & 50°C.',
            'acetal-pom': 'Acetal (POM, Delrin) beständig gegen schwache Säuren, Laugen & Öle bei Umgebungstemperatur. Angegriffen von starken Säuren. 1.650+ Chemikalien A-D.',
            'polycarbonate': 'Polycarbonat beständig gegen verdünnte Säuren, aliphatische KW & Öle. Angegriffen von Laugen, Ketonen & Aromaten. 1.650+ Chemikalien A-D bei 20°C & 50°C.',
            'polystyrene': 'Polystyrol mit begrenzter Chemikalienbeständigkeit — gut für Wasser, Alkohole & verdünnte Säuren. Angegriffen von den meisten organischen Lösungsmitteln. 1.650+ Chemikalien.',
            'polysulfone': 'Polysulfon (PSU) beständig gegen Heißwasser, Dampf & verdünnte Säuren bei hohen Temperaturen. Angegriffen von Ketonen, Aromaten & Halogenverbindungen. 1.650+.',
            'petg': 'PETG beständig gegen verdünnte Säuren, Alkohole & wässrige Lösungen. Bessere Lösungsmittelbeständigkeit als PS. Transparent & leicht druckbar. 1.650+ Chemikalien A-D.',
            'pmp': 'PMP (TPX) kombiniert HDPE-ähnliche Beständigkeit mit optischer Klarheit. Autoklavierbar. A-D-Tabelle für 1.650+ Chemikalien bei 20°C & 50°C.',
            'san': 'SAN beständig gegen verdünnte Säuren, Öle & aliphatische KW. Besser als PS, aber angegriffen von Ketonen & Aromaten. 1.650+ Chemikalien A-D bei 20°C & 50°C.',
            'silicone': 'Silikonkautschuk ausgezeichnet gegen heiße Luft, Ozon, Dampf & verdünnte Säuren bei hohen Temperaturen. Schlecht gegen Kraftstoffe & aromatische Lösungsmittel. 1.650+.',
            'aluminium': 'Aluminium beständig gegen Lösungsmittel, Kraftstoffe & milde organische Medien, jedoch angegriffen von Säuren & Laugen. 1.650+ Chemikalien A-D bei 20°C & 50°C.',
            'ectfe-etfe': 'ECTFE/ETFE Fluorpolymere beständig gegen starke Säuren, Laugen & Halogene. Eingesetzt als chemikalienbeständige Auskleidungen. 1.650+ Chemikalien A-D bei 20°C & 50°C.',
        },
        'mat_faq': {
            'hdpe': [
                ('Welche Chemikalien ist HDPE beständig gegen?', 'HDPE (Polyethylen hoher Dichte) zeigt ausgezeichnete (A) Beständigkeit gegen die meisten anorganischen Säuren (Salzsäure, Phosphorsäure, Schwefelsäure in moderaten Konzentrationen), Laugen, Alkohole und wässrige Salzlösungen. Es bewertet A für über 900 der 1.650+ Chemikalien in unserer Datenbank.'),
                ('Welche Chemikalien greifen HDPE an?', 'HDPE wird nicht empfohlen (D) für aromatische Kohlenwasserstoffe (Toluol, Xylol, Benzol), chlorierte Lösungsmittel (Chloroform, DCM), Ketone in hohen Konzentrationen und stark oxidierende Säuren wie rauchende Salpeter- oder Chromsäure.'),
                ('Beeinflusst die Temperatur die HDPE-Beständigkeit?', 'Ja. Bei 50°C fallen einige Chemikalien, die bei 20°C mit A bewertet sind, für HDPE auf B oder C. HDPE wird im Allgemeinen bis zu einer Gebrauchstemperatur von 60°C eingesetzt. Unsere Tabelle zeigt Bewertungen bei 20°C und 50°C.'),
            ],
            'ptfe': [
                ('Welche Chemikalien ist PTFE beständig gegen?', 'PTFE (Polytetrafluorethylen, Teflon) verfügt über eine nahezu universelle Chemikalienbeständigkeit. Es bewertet A (ausgezeichnet) für praktisch alle Säuren (einschließlich konzentrierter Schwefel-, Fluss- und Salpetersäure), Laugen, Lösungsmittel, Oxidationsmittel und die meisten aggressiven Chemikalien.'),
                ('Welche Chemikalien greifen PTFE an?', 'PTFE wird von geschmolzenen Alkalimetallen (Natrium, Lithium), elementarem Fluor und einigen Chlortrifluorid-Verbindungen angegriffen. Diese sind in industriellen Umgebungen selten. Für fast alle praktischen Chemikalienhandhabungsanwendungen ist PTFE die sicherste Wahl.'),
                ('Ist PTFE das beste Material für die Chemikalienbeständigkeit?', 'PTFE bietet die breiteste Chemikalienbeständigkeit aller gängigen technischen Werkstoffe. PVDF, FEP und ECTFE/ETFE-Fluorpolymere bieten ebenfalls hervorragende Beständigkeit für viele Chemikalien zu geringeren Kosten. Die Einschränkung von PTFE liegt in der mechanischen Festigkeit und Verschleißbeständigkeit.'),
            ],
            'pp': [
                ('Welche Chemikalien ist PP (Polypropylen) beständig gegen?', 'Polypropylen (PP) zeigt ausgezeichnete Beständigkeit gegen die meisten anorganischen Säuren, Laugen, Alkohole und wässrige Lösungen. Es wird weithin in Tanks, Fittings und Laborgeräten für Säuren wie Schwefel-, Salz- und Phosphorsäure eingesetzt.'),
                ('Welche Chemikalien greifen Polypropylen (PP) an?', 'PP wird nicht empfohlen für aromatische Kohlenwasserstoffe (Toluol, Xylol), chlorierte Lösungsmittel, stark oxidierende Mittel (rauchende Salpetersäure, Chromsäure) und viele organische Lösungsmittel bei erhöhten Temperaturen.'),
                ('Wie vergleicht sich PP mit HDPE in Bezug auf Chemikalienbeständigkeit?', 'PP und HDPE haben ähnliche Beständigkeitsprofile. PP hat eine leicht bessere Beständigkeit gegen konzentrierte Säuren bei erhöhten Temperaturen und eine höhere Gebrauchstemperatur (~80°C vs. ~60°C für HDPE). HDPE ist typischerweise zäher und schlagfester.'),
            ],
        },
        # Translations for "avoided" note in FAQ Q2
        'avoid_tmpl': 'Vermeiden Sie {d_list} (D-bewertet, nicht empfohlen). ',
        # Static pages
        'static': {
            'chemicals/de/index.html': {
                'title': '1.650+ Chemikalienbeständigkeitstabellen — Nach Chemikalie suchen | Kostenlos',
                'desc': 'Chemikalienbeständigkeit für jede Verbindung. 1.650+ Chemikalien A-D bewertet gegen HDPE, PTFE, PP, Viton, V4A und 20 weitere Werkstoffe bei 20°C & 50°C.',
            },
            'materials/de/index.html': {
                'title': '24 Werkstoff-Beständigkeitstabellen — HDPE, PTFE, PP, Viton & mehr',
                'desc': 'Chemikalienbeständigkeit für 24 Werkstoffe: Fluorpolymere (PTFE, FEP, PVDF), Kunststoffe (HDPE, PP), Elastomere (Viton, EPDM, NBR), Metalle (V4A). Kostenlose A-D-Bewertungen.',
            },
            'de-about/index.html': {
                'title': 'Über ChemicalResistance.org | Kostenlose Chemikalienbeständigkeitsdatenbank',
                'desc': 'ChemicalResistance.org bietet kostenlose Chemikalienbeständigkeitsdaten für Ingenieure und Sicherheitsfachleute. Daten von Bürkle GmbH. 1.650+ Chemikalien, 24 Werkstoffe.',
            },
        },
    },

    'es': {
        'title_strip_suffixes': [
            'Tabla de Resistencia Química | ChemicalResistance.org',
            'Resistencia Química | ChemicalResistance.org',
            'Tabla de Resistencia Química',
            '| ChemicalResistance.org',
        ],
        'title_strip_prefixes': ['Resistencia '],
        'name_regexes': [
            r'^(.*?)\s+(?:Resistencia\s+Química|Resistencia)(?:\s|$|—|–|\|)',
        ],
        'chem_title': 'Resistencia {chem} — {top} clasificación A | {total} materiales',
        'chem_title_fallback': '{chem} Resistencia Química | {total} materiales A-D',
        'chem_desc_avoid': '{top_a}{rest} clasificación A (excelente) para {chem}{conc}. {d_mats} no recomendado. Tabla A-D para {total} materiales a 20°C y 50°C.',
        'chem_desc_no_avoid': '{top_a}{rest} clasificación A (excelente) para {chem}{conc}. Tabla A-D completa para {total} materiales a 20°C y 50°C.',
        'chem_desc_fallback': 'Resistencia química de {chem}{conc}. Tabla A-D para {total} materiales a 20°C y 50°C. Base de datos gratuita.',
        'faq_q1_ans': (
            'Nuestra base de datos incluye {total} materiales probados con {chem}. '
            'Materiales clasificados A (excelente) a 20°C: {top_a_long}'
            '{a_count_note}. Haga clic en cualquier material para ver su clasificación A-D a 20°C y 50°C.'
        ),
        'faq_q2_ans': (
            'Para {chem}, los materiales mejor clasificados (A = excelente) a 20°C son: {top_a_long}. '
            '{avoid_note}'
            'La selección final depende de la concentración, temperatura y duración de exposición. Verifique con el fabricante.'
        ),
        'faq_q2_ans_no_a': (
            'Las clasificaciones de resistencia para {chem} varían según el material. '
            'Consulte la tabla completa arriba para 20°C y 50°C. '
            'La selección depende de la concentración, temperatura y duración de exposición.'
        ),
        'faq_avoid_note': 'Evite {d_list} (clasificación D, no recomendado). ',
        'faq_q4_ans': (
            'Sí. La resistencia a {chem} puede cambiar significativamente entre 20°C y 50°C. '
            'Las temperaturas más altas generalmente reducen la resistencia del material — '
            'algunos materiales caen de A a C o D a temperaturas elevadas. '
            'Nuestra tabla muestra clasificaciones a ambas temperaturas.'
        ),
        'faq_q5_ans': (
            'Los datos de resistencia química se basan en tablas de compatibilidad de Bürkle GmbH (buerkle.de), '
            'fabricante alemán con décadas de experiencia en equipos de manejo de productos químicos.'
        ),
        'a_count_note': ' — {n} materiales con resistencia total',
        'avoid_tmpl': 'Evite {d_list} (clasificación D, no recomendado). ',
        'mat_titles': {
            'hdpe': 'HDPE Resistencia Química | Ácidos, Álcalis & Sal | 1.650+ Químicos',
            'ptfe': 'PTFE (Teflón) Resistencia | Compatibilidad universal | 1.650+ Químicos',
            'pp': 'PP (Polipropileno) Resistencia | Ácidos & Álcalis | 1.650+ Químicos',
            'pvdf': 'PVDF Resistencia Química | Fluoropolímero | 1.650+ Químicos',
            'epdm': 'EPDM Resistencia Química | Vapor, Ácidos & Álcalis | 1.650+',
            'viton': 'Viton (FKM) Resistencia | Combustibles & Aceites | 1.650+ Químicos',
            'nbr': 'NBR (Nitrilo) Resistencia | Aceites & Combustibles | 1.650+ Químicos',
            'ss316': 'Acero Inox 316 Resistencia Química | SS 316 | 1.650+ Químicos',
            'stainless-steel-304': 'Acero Inox 304 Resistencia Química | SS 304 | 1.650+ Químicos',
            'pvc-rigid': 'PVC Rígido Resistencia Química | 1.650+ Químicos A-D',
            'pvc-flexible': 'PVC Flexible Resistencia Química | 1.650+ Químicos A-D',
            'fep': 'FEP Resistencia Química | Fluoropolímero | 1.650+ Químicos',
            'ldpe': 'LDPE Resistencia Química | 1.650+ Químicos clasificados A-D',
            'nylon-pa': 'Nylon (PA) Resistencia Química | Poliamida | 1.650+ Químicos',
            'acetal-pom': 'Acetal (POM) Resistencia Química | 1.650+ Químicos A-D',
            'polycarbonate': 'Policarbonato (PC) Resistencia Química | 1.650+ Químicos',
            'polystyrene': 'Poliestireno (PS) Resistencia Química | 1.650+ Químicos',
            'polysulfone': 'Polisulfona (PSU) Resistencia Química | 1.650+ Químicos',
            'petg': 'PETG Resistencia Química | 1.650+ Químicos clasificados A-D',
            'pmp': 'PMP (TPX) Resistencia Química | 1.650+ Químicos A-D',
            'san': 'SAN Resistencia Química | 1.650+ Químicos clasificados A-D',
            'silicone': 'Silicona Resistencia Química | 1.650+ Químicos A-D',
            'aluminium': 'Aluminio Resistencia Química | 1.650+ Químicos A-D',
            'ectfe-etfe': 'ECTFE/ETFE Resistencia Química | Fluoropolímero | 1.650+',
        },
        'mat_descs': {
            'hdpe': 'HDPE resiste ácidos fuertes, álcalis y soluciones salinas (A). Más débil frente a aromáticos y solventes clorados. 1.650+ químicos clasificados A-D a 20°C y 50°C.',
            'ptfe': 'PTFE ofrece resistencia química casi universal — clasificado A para casi todos los ácidos, bases y solventes. Químicamente inerte hasta 200°C+. 1.650+ químicos gratis.',
            'pp': 'PP clasificado A para la mayoría de ácidos, álcalis y soluciones salinas acuosas. No recomendado para aromáticos o solventes clorados. 1.650+ químicos A-D a 20°C y 50°C.',
            'pvdf': 'PVDF (Kynar) resiste ácidos concentrados, halógenos y oxidantes. Excelente a 50°C. 1.650+ químicos A-D. Usado en servicio químico agresivo.',
            'epdm': 'EPDM excelente con vapor, agua caliente, ácidos diluidos y álcalis. Malo frente a aceites, combustibles y solventes aromáticos. 1.650+ químicos A-D.',
            'viton': 'Viton/FKM excelente con combustibles, aceites, hidrocarburos aromáticos y ácidos concentrados. Clasificado A para 700+ químicos. 1.650+ químicos A-D.',
            'nbr': 'NBR (Buna-N) resiste aceites minerales, combustibles y fluidos hidráulicos. Malo frente a aromáticos, ozono y cetonas. 1.650+ químicos A-D a 20°C y 50°C.',
            'ss316': 'Acero inoxidable 316 resiste ácidos diluidos, álcalis y entornos con cloruros. No recomendado para HCl o ácidos oxidantes. 1.650+ químicos A-D.',
            'stainless-steel-304': 'Acero inox 304 para medios acuosos suaves, alimentos y bebidas. Evitar cloruros y ácidos fuertes. Compare con SS 316. 1.650+ químicos A-D.',
            'pvc-rigid': 'PVC rígido resiste ácidos diluidos, álcalis y soluciones acuosas a temperatura ambiente. No para cetonas, aromáticos ni sobre 60°C. 1.650+ químicos.',
            'pvc-flexible': 'PVC flexible para ácidos acuosos, álcalis y solventes suaves a temperatura ambiente. Los plastificantes pueden lixiviarse. 1.650+ químicos A-D a 20°C y 50°C.',
            'fep': 'FEP ofrece resistencia casi igual a PTFE en tuberías flexibles. Clasificado A para la mayoría de ácidos, bases y solventes. 1.650+ químicos A-D.',
            'ldpe': 'LDPE resiste ácidos diluidos, álcalis y soluciones salinas. Más débil que HDPE frente a ácidos concentrados y solventes. 1.650+ químicos A-D a 20°C y 50°C.',
            'nylon-pa': 'Nylon/PA resiste hidrocarburos alifáticos, combustibles y álcalis suaves. Atacado por ácidos fuertes y agua caliente. 1.650+ químicos A-D a 20°C y 50°C.',
            'acetal-pom': 'Acetal (POM, Delrin) resiste ácidos débiles, álcalis y aceites a temperatura ambiente. Atacado por ácidos fuertes. 1.650+ químicos A-D.',
            'polycarbonate': 'Policarbonato resiste ácidos diluidos, HC alifáticos y aceites. Atacado por álcalis, cetonas y aromáticos. 1.650+ químicos A-D a 20°C y 50°C.',
            'polystyrene': 'Poliestireno tiene resistencia química limitada — bueno para agua, alcoholes y ácidos diluidos. Atacado por la mayoría de solventes orgánicos. 1.650+ químicos.',
            'polysulfone': 'Polisulfona (PSU) resiste agua caliente, vapor y ácidos diluidos a altas temperaturas. Atacado por cetonas, aromáticos y solventes halogenados. 1.650+.',
            'petg': 'PETG resiste ácidos diluidos, alcoholes y soluciones acuosas. Mejor resistencia a solventes que PS. Transparente y fácil de imprimir. 1.650+ químicos A-D.',
            'pmp': 'PMP (TPX) combina resistencia similar a HDPE con claridad óptica. Autoclavable. Tabla A-D para 1.650+ químicos a 20°C y 50°C.',
            'san': 'SAN resiste ácidos diluidos, aceites e HC alifáticos. Mejor que PS pero atacado por cetonas y aromáticos. 1.650+ químicos A-D a 20°C y 50°C.',
            'silicone': 'Caucho de silicona excelente frente a aire caliente, ozono, vapor y ácidos diluidos a altas temperaturas. Malo frente a combustibles y solventes aromáticos. 1.650+.',
            'aluminium': 'Aluminio resiste solventes, combustibles y orgánicos suaves, pero es atacado por la mayoría de ácidos y álcalis. 1.650+ químicos A-D a 20°C y 50°C.',
            'ectfe-etfe': 'Fluoropolímeros ECTFE/ETFE resisten ácidos fuertes, álcalis y halógenos. Usados como revestimientos resistentes a químicos. 1.650+ químicos A-D a 20°C y 50°C.',
        },
        'mat_faq': {},
        'static': {
            'chemicals/es/index.html': {
                'title': '1.650+ Tablas de Resistencia Química — Buscar por Producto Químico',
                'desc': 'Resistencia química para cualquier compuesto. 1.650+ productos químicos clasificados A-D frente a HDPE, PTFE, PP, Viton, SS 316 y 20 materiales más a 20°C y 50°C.',
            },
            'materials/es/index.html': {
                'title': '24 Tablas de Resistencia de Materiales — HDPE, PTFE, PP, Viton y más',
                'desc': 'Tablas de resistencia química para 24 materiales: fluoropolímeros (PTFE, FEP, PVDF), plásticos (HDPE, PP), elastómeros (Viton, EPDM, NBR), metales (SS 316). Clasificaciones A-D gratuitas.',
            },
            'es-about/index.html': {
                'title': 'Sobre ChemicalResistance.org | Base de Datos de Compatibilidad Química',
                'desc': 'ChemicalResistance.org ofrece datos gratuitos de resistencia química para ingenieros y profesionales de seguridad. Datos de Bürkle GmbH. 1.650+ químicos, 24 materiales.',
            },
        },
    },

    'fr': {
        'title_strip_suffixes': [
            'Tableau de Résistance Chimique | ChemicalResistance.org',
            'Résistance Chimique | ChemicalResistance.org',
            'Tableau de Résistance Chimique',
            '| ChemicalResistance.org',
        ],
        'title_strip_prefixes': ['Résistance '],
        'name_regexes': [
            r'^(.*?)\s+(?:Résistance\s+Chimique|Résistance)(?:\s|$|—|–|\|)',
        ],
        'chem_title': 'Résistance {chem} — {top} noté A | {total} matériaux',
        'chem_title_fallback': '{chem} Résistance Chimique | {total} matériaux A-D',
        'chem_desc_avoid': '{top_a}{rest} noté A (excellent) pour {chem}{conc}. {d_mats} non recommandé. Tableau A-D pour {total} matériaux à 20°C & 50°C.',
        'chem_desc_no_avoid': '{top_a}{rest} noté A (excellent) pour {chem}{conc}. Tableau A-D complet pour {total} matériaux à 20°C & 50°C.',
        'chem_desc_fallback': 'Résistance chimique de {chem}{conc}. Tableau A-D pour {total} matériaux à 20°C et 50°C. Base de données gratuite.',
        'faq_q1_ans': (
            'Notre base de données couvre {total} matériaux testés avec {chem}. '
            'Matériaux notés A (excellent) à 20°C : {top_a_long}'
            '{a_count_note}. Cliquez sur une carte de matériau pour sa note A-D à 20°C et 50°C.'
        ),
        'faq_q2_ans': (
            'Pour {chem}, les matériaux les mieux notés (A = excellent) à 20°C sont : {top_a_long}. '
            '{avoid_note}'
            'Le choix dépend de la concentration, de la température et de la durée d\'exposition. Vérifiez avec le fabricant.'
        ),
        'faq_q2_ans_no_a': (
            'Les notes de résistance pour {chem} varient selon le matériau. '
            'Consultez le tableau complet ci-dessus pour 20°C et 50°C. '
            'Le choix dépend de la concentration, de la température et de la durée d\'exposition.'
        ),
        'faq_avoid_note': 'Évitez {d_list} (noté D, non recommandé). ',
        'faq_q4_ans': (
            'Oui. La résistance à {chem} peut changer significativement entre 20°C et 50°C. '
            'Les températures plus élevées réduisent généralement la résistance — '
            'certains matériaux passent de A à C ou D à haute température. '
            'Notre tableau montre les notes aux deux températures.'
        ),
        'faq_q5_ans': (
            'Les données de résistance chimique proviennent des tableaux de compatibilité de Bürkle GmbH (buerkle.de), '
            'fabricant allemand avec des décennies d\'expertise dans la manipulation de produits chimiques.'
        ),
        'a_count_note': ' — {n} matériaux avec résistance totale',
        'avoid_tmpl': 'Évitez {d_list} (noté D, non recommandé). ',
        'mat_titles': {
            'hdpe': 'HDPE Résistance Chimique | Acides, Bases & Sels | 1 650+ Produits',
            'ptfe': 'PTFE (Téflon) Résistance | Compatibilité universelle | 1 650+ Produits',
            'pp': 'PP (Polypropylène) Résistance | Acides & Bases | 1 650+ Produits',
            'pvdf': 'PVDF Résistance Chimique | Fluoropolymère | 1 650+ Produits',
            'epdm': 'EPDM Résistance Chimique | Vapeur, Acides & Bases | 1 650+',
            'viton': 'Viton (FKM) Résistance | Carburants & Huiles | 1 650+ Produits',
            'nbr': 'NBR (Nitrile) Résistance | Huiles & Carburants | 1 650+ Produits',
            'ss316': 'Inox 316 Résistance Chimique | Acier Inoxydable | 1 650+ Produits',
            'stainless-steel-304': 'Inox 304 Résistance Chimique | Acier Inoxydable | 1 650+ Produits',
            'pvc-rigid': 'PVC Rigide Résistance Chimique | 1 650+ Produits Chimiques A-D',
            'pvc-flexible': 'PVC Souple Résistance Chimique | 1 650+ Produits Chimiques A-D',
            'fep': 'FEP Résistance Chimique | Fluoropolymère | 1 650+ Produits',
            'ldpe': 'LDPE Résistance Chimique | 1 650+ Produits Chimiques A-D',
            'nylon-pa': 'Nylon (PA) Résistance Chimique | Polyamide | 1 650+ Produits',
            'acetal-pom': 'Acétal (POM) Résistance Chimique | 1 650+ Produits A-D',
            'polycarbonate': 'Polycarbonate (PC) Résistance Chimique | 1 650+ Produits',
            'polystyrene': 'Polystyrène (PS) Résistance Chimique | 1 650+ Produits',
            'polysulfone': 'Polysulfone (PSU) Résistance Chimique | 1 650+ Produits',
            'petg': 'PETG Résistance Chimique | 1 650+ Produits Chimiques A-D',
            'pmp': 'PMP (TPX) Résistance Chimique | 1 650+ Produits A-D',
            'san': 'SAN Résistance Chimique | 1 650+ Produits Chimiques A-D',
            'silicone': 'Silicone Résistance Chimique | 1 650+ Produits Chimiques A-D',
            'aluminium': 'Aluminium Résistance Chimique | 1 650+ Produits Chimiques A-D',
            'ectfe-etfe': 'ECTFE/ETFE Résistance Chimique | Fluoropolymère | 1 650+',
        },
        'mat_descs': {
            'hdpe': 'HDPE résiste aux acides forts, bases et solutions salines (A). Plus faible contre les aromatiques et solvants chlorés. 1 650+ produits classés A-D à 20°C & 50°C.',
            'ptfe': 'Le PTFE offre une résistance chimique quasi universelle — noté A pour presque tous les acides, bases et solvants. Inerte jusqu\'à 200°C+. 1 650+ produits gratuits.',
            'pp': 'PP noté A pour la plupart des acides, bases et solutions salines. Déconseillé pour les aromatiques ou solvants chlorés. 1 650+ produits chimiques A-D à 20°C & 50°C.',
            'pvdf': 'PVDF (Kynar) résiste aux acides concentrés, halogènes et oxydants. Excellent à 50°C. 1 650+ produits A-D. Utilisé pour les services chimiques agressifs.',
            'epdm': 'EPDM excellent avec vapeur, eau chaude, acides dilués et bases. Mauvais contre huiles, carburants et solvants aromatiques. 1 650+ produits A-D.',
            'viton': 'Viton/FKM excellent avec carburants, huiles, hydrocarbures aromatiques et acides concentrés. Noté A pour 700+ produits. 1 650+ produits chimiques A-D.',
            'nbr': 'NBR résiste aux huiles minérales, carburants et fluides hydrauliques. Mauvais contre aromatiques, ozone et cétones. 1 650+ produits chimiques A-D à 20°C & 50°C.',
            'ss316': 'Inox 316 résiste aux acides dilués, bases et environnements chlorurés. Déconseillé pour HCl ou acides oxydants. 1 650+ produits chimiques A-D.',
            'stainless-steel-304': 'Inox 304 pour milieux aqueux doux, alimentaires et boissons. Éviter les chlorures et acides forts. Comparer avec 316. 1 650+ produits A-D.',
            'pvc-rigid': 'PVC rigide résiste aux acides dilués, bases et solutions aqueuses à température ambiante. Non pour cétones, aromatiques ou au-dessus de 60°C. 1 650+ produits.',
            'pvc-flexible': 'PVC souple pour acides aqueux, bases et solvants doux à température ambiante. Les plastifiants peuvent migrer. 1 650+ produits chimiques A-D à 20°C & 50°C.',
            'fep': 'FEP offre une résistance proche du PTFE dans des tubes flexibles. Noté A pour la plupart des acides, bases et solvants. 1 650+ produits chimiques A-D.',
            'ldpe': 'LDPE résiste aux acides dilués, bases et solutions salines. Plus faible que HDPE contre acides concentrés et solvants. 1 650+ produits chimiques A-D à 20°C & 50°C.',
            'nylon-pa': 'Nylon/PA résiste aux hydrocarbures aliphatiques, carburants et bases douces. Attaqué par les acides forts et l\'eau chaude. 1 650+ produits A-D à 20°C & 50°C.',
            'acetal-pom': 'Acétal (POM, Delrin) résiste aux acides faibles, bases et huiles à température ambiante. Attaqué par les acides forts. 1 650+ produits chimiques A-D.',
            'polycarbonate': 'Polycarbonate résiste aux acides dilués, HC aliphatiques et huiles. Attaqué par les bases, cétones et aromatiques. 1 650+ produits chimiques A-D à 20°C & 50°C.',
            'polystyrene': 'Polystyrène a une résistance chimique limitée — bon pour l\'eau, alcools et acides dilués. Attaqué par la plupart des solvants organiques. 1 650+ produits.',
            'polysulfone': 'Polysulfone (PSU) résiste à l\'eau chaude, vapeur et acides dilués à haute température. Attaqué par cétones, aromatiques et solvants halogénés. 1 650+.',
            'petg': 'PETG résiste aux acides dilués, alcools et solutions aqueuses. Meilleure résistance aux solvants que PS. Transparent et facile à imprimer. 1 650+ produits A-D.',
            'pmp': 'PMP (TPX) combine résistance similaire au HDPE et clarté optique. Autoclavable. Tableau A-D pour 1 650+ produits à 20°C & 50°C.',
            'san': 'SAN résiste aux acides dilués, huiles et HC aliphatiques. Mieux que PS mais attaqué par cétones et aromatiques. 1 650+ produits chimiques A-D à 20°C & 50°C.',
            'silicone': 'Caoutchouc silicone excellent contre air chaud, ozone, vapeur et acides dilués à haute température. Mauvais contre carburants et solvants aromatiques. 1 650+.',
            'aluminium': 'Aluminium résiste aux solvants, carburants et organiques doux, mais attaqué par la plupart des acides et bases. 1 650+ produits chimiques A-D à 20°C & 50°C.',
            'ectfe-etfe': 'Fluoropolymères ECTFE/ETFE résistent aux acides forts, bases et halogènes. Utilisés comme revêtements résistants aux produits chimiques. 1 650+ produits A-D.',
        },
        'mat_faq': {},
        'static': {
            'chemicals/fr/index.html': {
                'title': '1 650+ Tableaux de Résistance Chimique — Recherche par Produit',
                'desc': 'Résistance chimique pour tout composé. 1 650+ produits chimiques classés A-D contre HDPE, PTFE, PP, Viton, Inox 316 et 20 autres matériaux à 20°C & 50°C.',
            },
            'materials/fr/index.html': {
                'title': '24 Tableaux de Résistance Matériaux — HDPE, PTFE, PP, Viton & plus',
                'desc': 'Tableaux de résistance chimique pour 24 matériaux : fluoropolymères (PTFE, FEP, PVDF), plastiques (HDPE, PP), élastomères (Viton, EPDM, NBR), métaux (Inox 316). Gratuit.',
            },
            'fr-about/index.html': {
                'title': 'À propos de ChemicalResistance.org | Base de Données Chimique Gratuite',
                'desc': 'ChemicalResistance.org fournit des données de résistance chimique gratuites pour ingénieurs et professionnels de sécurité. Données de Bürkle GmbH. 1 650+ produits, 24 matériaux.',
            },
        },
    },

    'pt': {
        'title_strip_suffixes': [
            'Tabela de Resistência Química | ChemicalResistance.org',
            'Resistência Química | ChemicalResistance.org',
            'Tabela de Resistência Química',
            '| ChemicalResistance.org',
        ],
        'title_strip_prefixes': ['Resistência '],
        'name_regexes': [
            r'^(.*?)\s+(?:Resistência\s+Química|Resistência)(?:\s|$|—|–|\|)',
        ],
        'chem_title': 'Resistência {chem} — {top} classificação A | {total} materiais',
        'chem_title_fallback': '{chem} Resistência Química | {total} materiais A-D',
        'chem_desc_avoid': '{top_a}{rest} classificação A (excelente) para {chem}{conc}. {d_mats} não recomendado. Tabela A-D para {total} materiais a 20°C e 50°C.',
        'chem_desc_no_avoid': '{top_a}{rest} classificação A (excelente) para {chem}{conc}. Tabela A-D completa para {total} materiais a 20°C e 50°C.',
        'chem_desc_fallback': 'Resistência química de {chem}{conc}. Tabela A-D para {total} materiais a 20°C e 50°C. Base de dados gratuita.',
        'faq_q1_ans': (
            'Nossa base de dados cobre {total} materiais testados com {chem}. '
            'Materiais classificados A (excelente) a 20°C: {top_a_long}'
            '{a_count_note}. Clique em qualquer material para ver sua classificação A-D a 20°C e 50°C.'
        ),
        'faq_q2_ans': (
            'Para {chem}, os melhores materiais (A = excelente) a 20°C são: {top_a_long}. '
            '{avoid_note}'
            'A seleção depende da concentração, temperatura e duração de exposição. Verifique com o fabricante.'
        ),
        'faq_q2_ans_no_a': (
            'As classificações de resistência para {chem} variam por material. '
            'Consulte a tabela completa acima para 20°C e 50°C. '
            'A seleção depende da concentração, temperatura e duração de exposição.'
        ),
        'faq_avoid_note': 'Evite {d_list} (classificação D, não recomendado). ',
        'faq_q4_ans': (
            'Sim. A resistência a {chem} pode mudar significativamente entre 20°C e 50°C. '
            'Temperaturas mais altas geralmente reduzem a resistência — '
            'alguns materiais caem de A para C ou D em temperaturas elevadas. '
            'Nossa tabela mostra classificações em ambas as temperaturas.'
        ),
        'faq_q5_ans': (
            'Os dados de resistência química são baseados em tabelas de compatibilidade da Bürkle GmbH (buerkle.de), '
            'fabricante alemão com décadas de experiência em equipamentos para manuseio de produtos químicos.'
        ),
        'a_count_note': ' — {n} materiais com resistência total',
        'avoid_tmpl': 'Evite {d_list} (classificação D, não recomendado). ',
        'mat_titles': {
            'hdpe': 'HDPE Resistência Química | Ácidos, Bases & Sais | 1.650+ Químicos',
            'ptfe': 'PTFE (Teflon) Resistência | Compatibilidade universal | 1.650+ Químicos',
            'pp': 'PP (Polipropileno) Resistência | Ácidos & Bases | 1.650+ Químicos',
            'pvdf': 'PVDF Resistência Química | Fluoropolímero | 1.650+ Químicos',
            'epdm': 'EPDM Resistência Química | Vapor, Ácidos & Bases | 1.650+',
            'viton': 'Viton (FKM) Resistência | Combustíveis & Óleos | 1.650+ Químicos',
            'nbr': 'NBR (Nitrila) Resistência | Óleos & Combustíveis | 1.650+ Químicos',
            'ss316': 'Aço Inox 316 Resistência Química | SS 316 | 1.650+ Químicos',
            'stainless-steel-304': 'Aço Inox 304 Resistência Química | SS 304 | 1.650+ Químicos',
            'pvc-rigid': 'PVC Rígido Resistência Química | 1.650+ Químicos A-D',
            'pvc-flexible': 'PVC Flexível Resistência Química | 1.650+ Químicos A-D',
            'fep': 'FEP Resistência Química | Fluoropolímero | 1.650+ Químicos',
            'ldpe': 'LDPE Resistência Química | 1.650+ Químicos classificados A-D',
            'nylon-pa': 'Nylon (PA) Resistência Química | Poliamida | 1.650+ Químicos',
            'acetal-pom': 'Acetal (POM) Resistência Química | 1.650+ Químicos A-D',
            'polycarbonate': 'Policarbonato (PC) Resistência Química | 1.650+ Químicos',
            'polystyrene': 'Poliestireno (PS) Resistência Química | 1.650+ Químicos',
            'polysulfone': 'Polissulfona (PSU) Resistência Química | 1.650+ Químicos',
            'petg': 'PETG Resistência Química | 1.650+ Químicos classificados A-D',
            'pmp': 'PMP (TPX) Resistência Química | 1.650+ Químicos A-D',
            'san': 'SAN Resistência Química | 1.650+ Químicos classificados A-D',
            'silicone': 'Silicone Resistência Química | 1.650+ Químicos A-D',
            'aluminium': 'Alumínio Resistência Química | 1.650+ Químicos A-D',
            'ectfe-etfe': 'ECTFE/ETFE Resistência Química | Fluoropolímero | 1.650+',
        },
        'mat_descs': {
            'hdpe': 'HDPE resiste a ácidos fortes, bases e soluções salinas (A). Mais fraco contra aromáticos e solventes clorados. 1.650+ químicos classificados A-D a 20°C e 50°C.',
            'ptfe': 'PTFE oferece resistência química quase universal — classificado A para quase todos ácidos, bases e solventes. Quimicamente inerte até 200°C+. 1.650+ químicos grátis.',
            'pp': 'PP classificado A para a maioria dos ácidos, bases e soluções salinas. Não recomendado para aromáticos ou solventes clorados. 1.650+ químicos A-D a 20°C e 50°C.',
            'pvdf': 'PVDF (Kynar) resiste a ácidos concentrados, halogênios e oxidantes. Excelente a 50°C. 1.650+ químicos A-D. Usado em serviço químico agressivo.',
            'epdm': 'EPDM excelente com vapor, água quente, ácidos diluídos e bases. Ruim frente a óleos, combustíveis e solventes aromáticos. 1.650+ químicos A-D.',
            'viton': 'Viton/FKM excelente com combustíveis, óleos, hidrocarbonetos aromáticos e ácidos concentrados. Classificado A para 700+ químicos. 1.650+ químicos A-D.',
            'nbr': 'NBR resiste a óleos minerais, combustíveis e fluidos hidráulicos. Ruim frente a aromáticos, ozônio e cetonas. 1.650+ químicos A-D a 20°C e 50°C.',
            'ss316': 'Aço inox 316 resiste a ácidos diluídos, bases e ambientes com cloretos. Não recomendado para HCl ou ácidos oxidantes. 1.650+ químicos A-D.',
            'stainless-steel-304': 'Aço inox 304 para meios aquosos suaves, alimentos e bebidas. Evitar cloretos e ácidos fortes. Comparar com SS 316. 1.650+ químicos A-D.',
            'pvc-rigid': 'PVC rígido resiste a ácidos diluídos, bases e soluções aquosas à temperatura ambiente. Não para cetonas, aromáticos ou acima de 60°C. 1.650+ químicos.',
            'pvc-flexible': 'PVC flexível para ácidos aquosos, bases e solventes suaves à temperatura ambiente. Plastificantes podem migrar. 1.650+ químicos A-D a 20°C e 50°C.',
            'fep': 'FEP oferece resistência próxima ao PTFE em tubos flexíveis. Classificado A para a maioria dos ácidos, bases e solventes. 1.650+ químicos A-D.',
            'ldpe': 'LDPE resiste a ácidos diluídos, bases e soluções salinas. Mais fraco que HDPE contra ácidos concentrados e solventes. 1.650+ químicos A-D a 20°C e 50°C.',
            'nylon-pa': 'Nylon/PA resiste a hidrocarbonetos alifáticos, combustíveis e bases suaves. Atacado por ácidos fortes e água quente. 1.650+ químicos A-D a 20°C e 50°C.',
            'acetal-pom': 'Acetal (POM, Delrin) resiste a ácidos fracos, bases e óleos à temperatura ambiente. Atacado por ácidos fortes. 1.650+ químicos A-D.',
            'polycarbonate': 'Policarbonato resiste a ácidos diluídos, HC alifáticos e óleos. Atacado por bases, cetonas e aromáticos. 1.650+ químicos A-D a 20°C e 50°C.',
            'polystyrene': 'Poliestireno tem resistência química limitada — bom para água, álcoois e ácidos diluídos. Atacado pela maioria dos solventes orgânicos. 1.650+ químicos.',
            'polysulfone': 'Polissulfona (PSU) resiste a água quente, vapor e ácidos diluídos em altas temperaturas. Atacado por cetonas, aromáticos e solventes halogenados. 1.650+.',
            'petg': 'PETG resiste a ácidos diluídos, álcoois e soluções aquosas. Melhor resistência a solventes que PS. Transparente e fácil de imprimir. 1.650+ químicos A-D.',
            'pmp': 'PMP (TPX) combina resistência similar ao HDPE com clareza óptica. Autoclavável. Tabela A-D para 1.650+ químicos a 20°C e 50°C.',
            'san': 'SAN resiste a ácidos diluídos, óleos e HC alifáticos. Melhor que PS mas atacado por cetonas e aromáticos. 1.650+ químicos A-D a 20°C e 50°C.',
            'silicone': 'Borracha de silicone excelente contra ar quente, ozônio, vapor e ácidos diluídos em altas temperaturas. Ruim frente a combustíveis e solventes aromáticos. 1.650+.',
            'aluminium': 'Alumínio resiste a solventes, combustíveis e orgânicos suaves, mas atacado pela maioria dos ácidos e bases. 1.650+ químicos A-D a 20°C e 50°C.',
            'ectfe-etfe': 'Fluoropolímeros ECTFE/ETFE resistem a ácidos fortes, bases e halogênios. Usados como revestimentos resistentes a químicos. 1.650+ químicos A-D a 20°C e 50°C.',
        },
        'mat_faq': {},
        'static': {
            'chemicals/pt/index.html': {
                'title': '1.650+ Tabelas de Resistência Química — Pesquisar por Produto Químico',
                'desc': 'Resistência química para qualquer composto. 1.650+ produtos químicos classificados A-D contra HDPE, PTFE, PP, Viton, Aço Inox 316 e 20 materiais a 20°C e 50°C.',
            },
            'materials/pt/index.html': {
                'title': '24 Tabelas de Resistência de Materiais — HDPE, PTFE, PP, Viton & mais',
                'desc': 'Tabelas de resistência química para 24 materiais: fluoropolímeros (PTFE, FEP, PVDF), plásticos (HDPE, PP), elastômeros (Viton, EPDM, NBR), metais (SS 316). Grátis.',
            },
            'pt-about/index.html': {
                'title': 'Sobre ChemicalResistance.org | Base de Dados Química Gratuita',
                'desc': 'ChemicalResistance.org fornece dados gratuitos de resistência química para engenheiros e profissionais de segurança. Dados da Bürkle GmbH. 1.650+ químicos, 24 materiais.',
            },
        },
    },

    'zh': {
        'title_strip_suffixes': [
            '化学品耐受性数据表 | ChemicalResistance.org',
            '耐化学性 | ChemicalResistance.org',
            '化学品耐受性数据表',
            '| ChemicalResistance.org',
        ],
        'title_strip_prefixes': [],
        'name_regexes': [
            r'^(.*?)耐化学性',
        ],
        'chem_title': '{chem}耐化学性 — {top} A级 | {total}种材料',
        'chem_title_fallback': '{chem}耐化学性 | {total}种材料 A-D评级',
        'chem_desc_avoid': '{top_a}{rest}对{chem}{conc}评为A级（优秀）。{d_mats}不推荐。{total}种材料在20°C和50°C下的A-D评级表。',
        'chem_desc_no_avoid': '{top_a}{rest}对{chem}{conc}评为A级（优秀）。{total}种材料在20°C和50°C下的完整A-D评级表。',
        'chem_desc_fallback': '{chem}{conc}的耐化学性数据。{total}种材料在20°C和50°C下的A-D评级表。免费数据库。',
        'faq_q1_ans': (
            '我们的数据库涵盖针对{chem}测试的{total}种材料。'
            '在20°C下评为A级（优秀）的材料：{top_a_long}'
            '{a_count_note}。点击上方任意材料卡片查看A-D评级。'
        ),
        'faq_q2_ans': (
            '对于{chem}，在20°C下评级最高（A级=优秀）的材料有：{top_a_long}。'
            '{avoid_note}'
            '最终选择取决于浓度、温度和接触时间。请向设备制造商确认。'
        ),
        'faq_q2_ans_no_a': (
            '{chem}的耐受性评级因材料而异。'
            '请查看上方20°C和50°C下的完整表格。'
            '选择取决于浓度、温度和接触时间。'
        ),
        'faq_avoid_note': '避免使用{d_list}（D级，不推荐）。',
        'faq_q4_ans': (
            '是的。{chem}的耐受性在20°C和50°C之间可能有显著变化。'
            '较高温度通常会降低材料的耐受性——'
            '部分材料在高温下从A级降至C级或D级。'
            '我们的表格显示两个温度下的评级。'
        ),
        'faq_q5_ans': (
            '化学品耐受性数据来源于Bürkle GmbH（buerkle.de）发布的兼容性表格，'
            '该公司是一家拥有数十年化学品处理设备经验的德国制造商。'
        ),
        'a_count_note': '——共{n}种材料具有完全耐受性',
        'avoid_tmpl': '避免使用{d_list}（D级，不推荐）。',
        'mat_titles': {
            'hdpe': 'HDPE耐化学性 | 酸、碱与盐溶液 | 1,650+种化学品',
            'ptfe': 'PTFE（特氟龙）耐化学性 | 近乎通用兼容 | 1,650+种化学品',
            'pp': 'PP（聚丙烯）耐化学性 | 酸碱耐受 | 1,650+种化学品',
            'pvdf': 'PVDF耐化学性 | 氟聚合物 | 1,650+种化学品',
            'epdm': 'EPDM耐化学性 | 蒸汽、酸与碱 | 1,650+种化学品',
            'viton': 'Viton（FKM）耐化学性 | 燃料与油类 | 1,650+种化学品',
            'nbr': 'NBR（丁腈）耐化学性 | 油类与燃料 | 1,650+种化学品',
            'ss316': 'SS 316不锈钢耐化学性 | 1,650+种化学品',
            'stainless-steel-304': 'SS 304不锈钢耐化学性 | 1,650+种化学品',
            'pvc-rigid': 'PVC硬质耐化学性 | 1,650+种化学品 A-D评级',
            'pvc-flexible': 'PVC软质耐化学性 | 1,650+种化学品 A-D评级',
            'fep': 'FEP耐化学性 | 氟聚合物 | 1,650+种化学品',
            'ldpe': 'LDPE耐化学性 | 1,650+种化学品 A-D评级',
            'nylon-pa': '尼龙（PA）耐化学性 | 聚酰胺 | 1,650+种化学品',
            'acetal-pom': 'Acetal（POM）耐化学性 | 1,650+种化学品 A-D评级',
            'polycarbonate': '聚碳酸酯（PC）耐化学性 | 1,650+种化学品',
            'polystyrene': '聚苯乙烯（PS）耐化学性 | 1,650+种化学品',
            'polysulfone': '聚砜（PSU）耐化学性 | 1,650+种化学品',
            'petg': 'PETG耐化学性 | 1,650+种化学品 A-D评级',
            'pmp': 'PMP（TPX）耐化学性 | 1,650+种化学品 A-D评级',
            'san': 'SAN耐化学性 | 1,650+种化学品 A-D评级',
            'silicone': '硅橡胶耐化学性 | 1,650+种化学品 A-D评级',
            'aluminium': '铝耐化学性 | 1,650+种化学品 A-D评级',
            'ectfe-etfe': 'ECTFE/ETFE耐化学性 | 氟聚合物 | 1,650+种化学品',
        },
        'mat_descs': {
            'hdpe': 'HDPE耐强酸、碱和盐溶液（A级）。抗芳烃和氯代溶剂能力较弱。1,650+种化学品在20°C和50°C下的A-D评级表。',
            'ptfe': 'PTFE具有近乎通用的耐化学性——几乎所有酸、碱和溶剂均评为A级。化学惰性可达200°C以上。1,650+种化学品免费查询。',
            'pp': 'PP对大多数酸、碱和盐水溶液评为A级。不适用于芳烃或氯代溶剂。1,650+种化学品在20°C和50°C下的A-D评级表。',
            'pvdf': 'PVDF（凯纳）耐浓酸、卤素和氧化剂。50°C下表现优异。1,650+种化学品A-D评级。适用于苛刻化学环境。',
            'epdm': 'EPDM对蒸汽、热水、稀酸和碱表现优异。不耐油、燃料和芳烃溶剂。1,650+种化学品A-D评级表。',
            'viton': 'Viton/FKM对燃料、油类、芳烃和浓酸表现优异。700+种化学品评为A级。1,650+种化学品A-D评级。',
            'nbr': 'NBR耐矿物油、燃料和液压油。不耐芳烃、臭氧和酮类。1,650+种化学品在20°C和50°C下的A-D评级表。',
            'ss316': '316不锈钢耐稀酸、碱和含氯环境。不推荐用于HCl或氧化酸。1,650+种化学品A-D评级。',
            'stainless-steel-304': '304不锈钢适用于温和水性介质、食品和饮料。避免氯化物和强酸。与SS 316比较。1,650+种化学品A-D评级。',
            'pvc-rigid': '硬质PVC在室温下耐稀酸、碱和水溶液。不适用于酮类、芳烃或60°C以上。1,650+种化学品A-D评级。',
            'pvc-flexible': '软质PVC适用于室温下的水性酸、碱和温和溶剂。增塑剂可能析出。1,650+种化学品在20°C和50°C下的A-D评级。',
            'fep': 'FEP在柔性管中提供接近PTFE的耐化学性。大多数酸、碱和溶剂评为A级。1,650+种化学品A-D评级。',
            'ldpe': 'LDPE耐稀酸、碱和盐溶液。抗浓酸和溶剂能力弱于HDPE。1,650+种化学品在20°C和50°C下的A-D评级。',
            'nylon-pa': '尼龙/PA耐脂肪烃、燃料和温和碱。受强酸和热水侵蚀。1,650+种化学品在20°C和50°C下的A-D评级。',
            'acetal-pom': 'Acetal（POM，赛钢）在室温下耐弱酸、碱和油类。受强酸侵蚀。1,650+种化学品A-D评级。',
            'polycarbonate': '聚碳酸酯耐稀酸、脂肪烃和油类。受碱、酮和芳烃侵蚀。1,650+种化学品在20°C和50°C下的A-D评级。',
            'polystyrene': '聚苯乙烯耐化学性有限——适合水、醇类和稀酸。受大多数有机溶剂侵蚀。1,650+种化学品A-D评级。',
            'polysulfone': '聚砜（PSU）在高温下耐热水、蒸汽和稀酸。受酮、芳烃和卤代溶剂侵蚀。1,650+种化学品A-D评级。',
            'petg': 'PETG耐稀酸、醇类和水溶液。比PS有更好的溶剂耐受性。透明，易于打印。1,650+种化学品A-D评级。',
            'pmp': 'PMP（TPX）兼具类似HDPE的耐受性和光学透明度。可高压灭菌。1,650+种化学品在20°C和50°C下的A-D评级。',
            'san': 'SAN耐稀酸、油类和脂肪烃。优于PS，但受酮类和芳烃侵蚀。1,650+种化学品在20°C和50°C下的A-D评级。',
            'silicone': '硅橡胶对热空气、臭氧、蒸汽和稀酸在高温下表现优异。不耐燃料和芳烃溶剂。1,650+种化学品A-D评级。',
            'aluminium': '铝耐溶剂、燃料和温和有机介质，但受大多数酸和碱侵蚀。1,650+种化学品在20°C和50°C下的A-D评级。',
            'ectfe-etfe': 'ECTFE/ETFE氟聚合物耐强酸、碱和卤素。用作耐化学腐蚀衬里。1,650+种化学品在20°C和50°C下的A-D评级。',
        },
        'mat_faq': {},
        'static': {
            'chemicals/zh/index.html': {
                'title': '1,650+种化学品耐受性数据表 — 按化学品查询 | 免费数据库',
                'desc': '查询任意化合物的耐化学性数据。1,650+种化学品对HDPE、PTFE、PP、Viton、SS 316等24种材料的A-D评级，涵盖20°C和50°C。',
            },
            'materials/zh/index.html': {
                'title': '24种材料耐受性数据表 — HDPE、PTFE、PP、Viton等 | 免费',
                'desc': '24种材料的耐化学性数据表：氟聚合物（PTFE、FEP、PVDF）、塑料（HDPE、PP）、弹性体（Viton、EPDM、NBR）、金属（SS 316）。免费A-D评级。',
            },
            'zh-about/index.html': {
                'title': '关于 ChemicalResistance.org | 免费化学兼容性数据库',
                'desc': 'ChemicalResistance.org为工程师和安全专业人员提供免费耐化学性数据，数据来源于Bürkle GmbH。1,650+种化学品，24种材料。',
            },
        },
    },
}


# ─── Helper functions ─────────────────────────────────────────────────────────

def load_chemical_data():
    path = os.path.join(BASE_DIR, 'data', 'chemicals_burkle.json')
    with open(path) as f:
        data = json.load(f)
    import re as _re
    def slugify(name):
        s = name.lower()
        s = _re.sub(r'[^a-z0-9]+', '-', s)
        return s.strip('-')
    lookup = {}
    for chem in data:
        name_en = chem.get('name_en', '')
        if name_en:
            slug = slugify(name_en)
            if slug not in lookup:
                lookup[slug] = {
                    'name_en': name_en,
                    'ratings': chem.get('ratings', {}),
                    'concentration': chem.get('concentration', ''),
                }
    return lookup


def sort_by_priority(mat_list):
    def priority(m):
        try:
            return MAT_PRIORITY.index(m)
        except ValueError:
            return 99
    return sorted(mat_list, key=priority)


def get_ratings_summary(ratings):
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


def extract_chem_name_from_title(title, lc):
    """Extract the localised chemical name from either old- or new-format titles."""
    name = title.strip()

    # 1. Strip known legacy suffixes (old titles)
    for suffix in lc['title_strip_suffixes']:
        idx = name.find(suffix)
        if idx > 0:
            return name[:idx].strip().strip('|—').strip()

    # 2. Strip known keyword prefixes (new titles like "Resistencia X — …")
    for prefix in lc.get('title_strip_prefixes', []):
        if name.startswith(prefix):
            rest = name[len(prefix):]
            for sep in (' — ', ' | '):
                if sep in rest:
                    rest = rest[:rest.index(sep)]
            return rest.strip()

    # 3. Regex-based extraction for new-format titles
    for pattern in lc.get('name_regexes', []):
        m = re.match(pattern, name)
        if m:
            return m.group(1).strip()

    return name


def build_chem_title(chem_name, a_mats, total, lc, max_len=65):
    top_a = ', '.join(a_mats[:3]) if a_mats else ''
    if top_a:
        candidate = lc['chem_title'].format(chem=chem_name, top=top_a, total=total)
        if len(candidate) <= max_len:
            return candidate
        top_a2 = a_mats[0] if a_mats else ''
        candidate = lc['chem_title'].format(chem=chem_name, top=top_a2, total=total)
        if len(candidate) <= max_len:
            return candidate
    return lc['chem_title_fallback'].format(chem=chem_name, total=total)[:max_len]


def build_chem_desc(chem_name, a_mats, d_mats, total, concentration, lc, max_len=160):
    conc_note = f' ({concentration})' if concentration and concentration not in ('jede', '') else ''
    top_a = ', '.join(a_mats[:3]) if a_mats else ''
    rest = f' +{len(a_mats)-3}' if len(a_mats) > 3 else ''

    if a_mats:
        d_top = ', '.join(d_mats[:2]) if d_mats else ''
        if d_top:
            desc = lc['chem_desc_avoid'].format(
                top_a=top_a, rest=rest, chem=chem_name, conc=conc_note,
                d_mats=d_top, total=total
            )
        else:
            desc = lc['chem_desc_no_avoid'].format(
                top_a=top_a, rest=rest, chem=chem_name, conc=conc_note, total=total
            )
    else:
        desc = lc['chem_desc_fallback'].format(chem=chem_name, conc=conc_note, total=total)

    if len(desc) > max_len:
        desc = desc[:max_len - 1] + '…'
    return desc


def build_chem_faq(chem_name, a_mats, d_mats, total, lc):
    """Build 5-question FAQPage schema with data-specific answers."""
    top_a_long = ', '.join(a_mats[:5]) if a_mats else ''
    a_count = len(a_mats)
    a_count_note = lc['a_count_note'].format(n=a_count) if a_count > 5 else ''
    d_list = ', '.join(d_mats[:3]) if d_mats else ''
    avoid_note = lc['avoid_tmpl'].format(d_list=d_list) if d_list else ''

    if a_mats:
        q1_ans = lc['faq_q1_ans'].format(
            total=total, chem=chem_name, top_a_long=top_a_long, a_count_note=a_count_note
        )
        q2_ans = lc['faq_q2_ans'].format(
            chem=chem_name, top_a_long=', '.join(a_mats[:5]),
            avoid_note=avoid_note
        )
    else:
        q1_ans = lc['faq_q1_ans'].format(
            total=total, chem=chem_name, top_a_long='—', a_count_note=''
        )
        q2_ans = lc['faq_q2_ans_no_a'].format(chem=chem_name)

    q4_ans = lc['faq_q4_ans'].format(chem=chem_name)
    q5_ans = lc['faq_q5_ans']

    # We keep the existing question texts (already translated) but replace the answers
    return {
        'q1_ans': q1_ans, 'q2_ans': q2_ans,
        'q4_ans': q4_ans, 'q5_ans': q5_ans,
    }


def patch_faq_answers(faq_json_str, new_answers):
    """Replace FAQ answer texts while keeping existing question texts."""
    try:
        faq = json.loads(faq_json_str)
    except json.JSONDecodeError:
        return faq_json_str

    items = faq.get('mainEntity', [])
    # Map by index: Q0→q1_ans, Q1→q2_ans, Q3→q4_ans, Q4→q5_ans
    answer_map = {0: 'q1_ans', 1: 'q2_ans', 3: 'q4_ans', 4: 'q5_ans'}
    for i, item in enumerate(items):
        key = answer_map.get(i)
        if key and key in new_answers:
            item['acceptedAnswer']['text'] = new_answers[key]

    return json.dumps(faq, ensure_ascii=False)


def apply_meta(content, title, desc):
    content = re.sub(r'<title>[^<]+</title>', f'<title>{title}</title>', content, count=1)
    content = re.sub(
        r'<meta name="description" content="[^"]*">',
        f'<meta name="description" content="{desc}">',
        content, count=1
    )
    if '<meta property="og:title"' in content:
        content = re.sub(
            r'<meta property="og:title" content="[^"]*">',
            f'<meta property="og:title" content="{title}">',
            content, count=1
        )
    if '<meta property="og:description"' in content:
        content = re.sub(
            r'<meta property="og:description" content="[^"]*">',
            f'<meta property="og:description" content="{desc}">',
            content, count=1
        )
    if '<meta name="twitter:title"' in content:
        content = re.sub(
            r'<meta name="twitter:title" content="[^"]*">',
            f'<meta name="twitter:title" content="{title}">',
            content, count=1
        )
    if '<meta name="twitter:description"' in content:
        content = re.sub(
            r'<meta name="twitter:description" content="[^"]*">',
            f'<meta name="twitter:description" content="{desc}">',
            content, count=1
        )
    return content


def apply_faq_schema(content, new_answers):
    """Find FAQPage script block and patch its answers."""
    faq_pattern = (
        r'(<script type="application/ld\+json">)'
        r'\s*(\{"@context":\s*"https://schema\.org",\s*"@type":\s*"FAQPage".*?\})'
        r'\s*(</script>)'
    )
    def replacer(m):
        patched = patch_faq_answers(m.group(2), new_answers)
        return m.group(1) + patched + m.group(3)
    return re.sub(faq_pattern, replacer, content, count=1, flags=re.DOTALL)


# ─── Main update functions ────────────────────────────────────────────────────

def update_lang_chemical_pages(lang, lc, chem_data, base_dir):
    """Update all chemical pages for a given language."""
    chem_dir = os.path.join(base_dir, 'chemicals', lang)
    if not os.path.isdir(chem_dir):
        return 0, []

    updated = 0
    skipped = []

    for slug in sorted(os.listdir(chem_dir)):
        fp = os.path.join(chem_dir, slug, 'index.html')
        if not os.path.exists(fp):
            continue

        with open(fp) as f:
            content = f.read()

        # Get English ratings via slug
        ratings_info = chem_data.get(slug)
        if not ratings_info:
            skipped.append(slug)
            continue

        ratings = ratings_info.get('ratings', {})
        concentration = ratings_info.get('concentration', '')
        a_mats, b_mats, c_mats, d_mats = get_ratings_summary(ratings)
        total = 24

        # Extract localised chemical name from existing title
        m = re.search(r'<title>([^<]+)</title>', content)
        if not m:
            skipped.append(slug)
            continue
        raw_title = m.group(1)
        chem_name = extract_chem_name_from_title(raw_title, lc)
        if not chem_name:
            chem_name = ratings_info['name_en']

        new_title = build_chem_title(chem_name, a_mats, total, lc)
        new_desc = build_chem_desc(chem_name, a_mats, d_mats, total, concentration, lc)
        new_answers = build_chem_faq(chem_name, a_mats, d_mats, total, lc)

        new_content = apply_meta(content, new_title, new_desc)
        new_content = apply_faq_schema(new_content, new_answers)

        if new_content != content:
            with open(fp, 'w') as f:
                f.write(new_content)
            updated += 1

    return updated, skipped


def update_lang_material_pages(lang, lc, base_dir):
    """Update all material pages for a given language."""
    mat_dir = os.path.join(base_dir, 'materials', lang)
    if not os.path.isdir(mat_dir):
        return 0

    updated = 0
    mat_titles = lc.get('mat_titles', {})
    mat_descs = lc.get('mat_descs', {})
    mat_faqs = lc.get('mat_faq', {})

    for mat_slug in sorted(os.listdir(mat_dir)):
        fp = os.path.join(mat_dir, mat_slug, 'index.html')
        if not os.path.exists(fp):
            continue

        if mat_slug not in mat_titles and mat_slug not in mat_descs:
            continue

        with open(fp) as f:
            content = f.read()

        new_title = mat_titles.get(mat_slug, '')
        new_desc = mat_descs.get(mat_slug, '')

        if not new_title and not new_desc:
            continue

        if new_title and new_desc:
            new_content = apply_meta(content, new_title, new_desc)
        elif new_title:
            new_content = re.sub(r'<title>[^<]+</title>', f'<title>{new_title}</title>', content, count=1)
        else:
            new_content = content

        # Add FAQ schema for material page if defined
        if mat_slug in mat_faqs and 'FAQPage' not in content:
            faq_items = []
            for q_text, a_text in mat_faqs[mat_slug]:
                faq_items.append({
                    '@type': 'Question',
                    'name': q_text,
                    'acceptedAnswer': {'@type': 'Answer', 'text': a_text}
                })
            faq_schema = json.dumps({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                'mainEntity': faq_items
            }, ensure_ascii=False)
            first_ld = re.search(r'<script type="application/ld\+json">', new_content)
            if first_ld:
                pos = first_ld.start()
                new_content = (new_content[:pos]
                               + f'<script type="application/ld+json">{faq_schema}</script>\n'
                               + new_content[pos:])

        if new_content != content:
            with open(fp, 'w') as f:
                f.write(new_content)
            updated += 1

    return updated


def update_static_pages(lang, lc, base_dir):
    """Update static language index and about pages."""
    updated = 0
    for page_rel, meta in lc.get('static', {}).items():
        fp = os.path.join(base_dir, page_rel)
        if not os.path.exists(fp):
            continue
        with open(fp) as f:
            content = f.read()
        new_content = apply_meta(content, meta['title'], meta['desc'])
        if new_content != content:
            with open(fp, 'w') as f:
                f.write(new_content)
            updated += 1
    return updated


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    print('Loading chemical data...')
    chem_data = load_chemical_data()

    total_updated = 0
    total_skipped = []

    for lang_code, lc in LANG.items():
        print(f'\n{"="*50}')
        print(f'Language: {lang_code.upper()}')
        print(f'{"="*50}')

        # Chemical pages
        n, skipped = update_lang_chemical_pages(lang_code, lc, chem_data, BASE_DIR)
        print(f'  Chemical pages updated: {n} (skipped: {len(skipped)})')
        if skipped:
            print(f'  Skipped: {skipped[:10]}')
        total_updated += n

        # Material pages
        n = update_lang_material_pages(lang_code, lc, BASE_DIR)
        print(f'  Material pages updated: {n}')
        total_updated += n

        # Static pages
        n = update_static_pages(lang_code, lc, BASE_DIR)
        print(f'  Static pages updated: {n}')
        total_updated += n

    print(f'\n{"="*50}')
    print(f'TOTAL pages updated: {total_updated}')
    print('✅ Multilingual CTR optimization complete!')


if __name__ == '__main__':
    main()
