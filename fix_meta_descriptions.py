#!/usr/bin/env python3
"""Trim meta descriptions to the 120-160 character SEO window.

Ahrefs flagged 2,771 pages with meta descriptions over ~160 characters. Google
truncates those in the SERP, so the trailing boilerplate ("Vergleichstabelle,
Temperaturgrenzwerte und Alternativen." and friends) never gets shown anyway.

Two kinds of page are handled:

* chemical x material pair pages (chemicals/[lang/]<chem>/<mat>/index.html) --
  the description is "<question>? <rating> at 20C, <rating> at 50C." plus a
  fixed boilerplate tail. The question and the ratings are the part that
  matters, so they are kept verbatim and the longest tail that still fits in
  160 characters is appended. Tails are listed longest-first per language.

* everything else (hub, material, chart, compare and static pages) -- these
  have hand-written descriptions, so each over-long one gets a hand-written
  shorter replacement in REWRITES below.

Descriptions are mirrored into og:description and twitter:description, so all
three are rewritten together. Replacements are also applied to the generator
scripts in this directory so a regeneration does not reintroduce the long text.
"""

import html
import os
import re
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
LANGS = ('de', 'es', 'fr', 'pt', 'zh')
MAX_LEN = 160
MIN_LEN = 120

SKIP_DIRS = {'.git', '.venv', '__pycache__', 'data', 'node_modules', 'logos', 'img', 'css', 'js'}

DESC_TAGS = (
    re.compile(r'(<meta name="description" content=")([^"]*)(")'),
    re.compile(r'(<meta property="og:description" content=")([^"]*)(")'),
    re.compile(r'(<meta name="twitter:description" content=")([^"]*)(")'),
)

# Boilerplate tails per language, longest first. The first one that keeps the
# whole description at or under MAX_LEN wins; '.' is the always-fits fallback.
PAIR_TAILS = {
    'en': ['. Full comparison table, temperature limits and alternatives.',
           '. Comparison table and alternatives.',
           '. Ratings and alternatives.',
           '.'],
    'de': ['. Vergleichstabelle, Temperaturgrenzwerte und Alternativen.',
           '. Vergleichstabelle und Alternativen.',
           '. Alternativen im Vergleich.',
           '.'],
    'es': ['. Tabla comparativa, límites de temperatura y alternativas.',
           '. Tabla comparativa y alternativas.',
           '. Alternativas comparadas.',
           '.'],
    'fr': ['. Tableau comparatif, limites de température et alternatives.',
           '. Tableau comparatif et alternatives.',
           '. Alternatives comparées.',
           '.'],
    'pt': ['. Tabela comparativa, limites de temperatura e alternativas.',
           '. Tabela comparativa e alternativas.',
           '. Alternativas comparadas.',
           '.'],
    'zh': ['。对比表、温度限制和替代材料。',
           '。对比表和替代材料。',
           '。'],
}

# Hand-written replacements for non-pair pages, keyed by the exact current text.
# Applied globally to every HTML file and generator script, so a description
# shared by several pages is fixed everywhere in one pass.
REWRITES = {
    # --- English hubs and static pages ---
    "Browse chemical resistance charts for 24 materials: fluoropolymers (PTFE, FEP, PVDF), plastics (HDPE, PP), elastomers (Viton, EPDM, NBR), metals (SS 316). Free A-D ratings.":
    "Chemical resistance charts for 24 materials: fluoropolymers (PTFE, FEP, PVDF), plastics (HDPE, PP), elastomers (Viton, EPDM, NBR), metals. Free A-D ratings.",

    "Build custom side-by-side comparison of any 2-3 materials vs 1,650+ chemicals. Highlight differences instantly. A-D ratings at 20°C & 50°C for HDPE, PTFE, PP, Viton & more.":
    "Compare any 2-3 materials side-by-side against 1,650+ chemicals. A-D ratings at 20°C & 50°C for HDPE, PTFE, PP, Viton and 20 more materials.",

    "Check if chemicals can be safely co-stored. Get OSHA/NFPA cabinet recommendations, incompatibility warnings & separation rules. Free tool — enter any chemical combination.":
    "Check if chemicals can be safely co-stored. OSHA/NFPA cabinet recommendations, incompatibility warnings & separation rules. Free tool, any combination.",

    "Viscosity values for 100+ common liquids: water, oils, acids, solvents & industrial fluids. Data in mPa·s (cP) for pump selection & fluid dynamics. Free lookup table.":
    "Viscosity values for 100+ common liquids: water, oils, acids, solvents & industrial fluids. Data in mPa·s (cP) for pump selection. Free lookup table.",

    "ChemicalResistance.org provides free chemical resistance data for engineers and safety professionals. Data sourced from Bürkle GmbH. 1,650+ chemicals, 24 materials.":
    "Free chemical resistance data for engineers and safety professionals. Data sourced from Bürkle GmbH. 1,650+ chemicals and 24 materials rated A-D.",

    "Compare PTFE, FEP, PVDF, and ECTFE/ETFE chemical resistance side by side. See which fluoropolymer is best for your application — 1,650+ chemicals at 20°C and 50°C.":
    "Compare PTFE, FEP, PVDF and ECTFE/ETFE chemical resistance side by side. Find the best fluoropolymer — 1,650+ chemicals rated at 20°C and 50°C.",

    "Compare 316 Stainless Steel, 304 Stainless Steel, and Aluminium chemical resistance. See which metal handles your chemicals — acids, alkalis, solvents rated A-D.":
    "Compare 316 Stainless Steel, 304 Stainless Steel and Aluminium chemical resistance. See which metal handles acids, alkalis and solvents, rated A-D.",

    # --- English material pages ---
    "PP rates A for most acids, alkalis & aqueous salt solutions. Not recommended for aromatic or chlorinated solvents. Free A-D chart for 1,650+ chemicals at 20°C & 50°C.":
    "PP rates A for most acids, alkalis & salt solutions. Not for aromatic or chlorinated solvents. Free A-D chart for 1,650+ chemicals at 20°C & 50°C.",

    "PVDF (Kynar) resists concentrated acids, halogens & oxidizers. Excellent at 50°C. A-D ratings for 1,650+ chemicals. Commonly used for aggressive chemical service.":
    "PVDF (Kynar) resists concentrated acids, halogens & oxidizers. Excellent at 50°C. A-D ratings for 1,650+ chemicals in aggressive chemical service.",

    "HDPE resists strong acids, alkalis & salt solutions (rated A). Weaker against aromatics & chlorinated solvents. Search 1,650+ chemicals rated A-D at 20°C & 50°C.":
    "HDPE resists strong acids, alkalis & salt solutions (rated A). Weaker against aromatics & chlorinated solvents. 1,650+ chemicals rated A-D at 20°C & 50°C.",

    "PTFE offers exceptional chemical resistance — rated A for almost all acids, bases & solvents. Chemically inert up to 200°C+. Free A-D chart for 1,650+ chemicals.":
    "PTFE offers exceptional chemical resistance — rated A for almost all acids, bases & solvents. Inert up to 200°C+. Free A-D chart for 1,650+ chemicals.",

    "EPDM rubber excels with steam, hot water, dilute acids & alkalis. Poor against oils, fuels & aromatic solvents. Free A-D chart for 1,650+ chemicals at 20°C & 50°C.":
    "EPDM excels with steam, hot water, dilute acids & alkalis. Poor against oils, fuels & aromatic solvents. Free A-D chart for 1,650+ chemicals at 20°C & 50°C.",

    # --- German ---
    "Kostenlose Beständigkeitstabelle für 1.600+ Chemikalien und 24 Materialien. Prüfen Sie die Verträglichkeit von HDPE, PP, PTFE, Viton, Edelstahl für sichere Chemikalienlagerung.":
    "Kostenlose Beständigkeitstabelle: 1.600+ Chemikalien, 24 Materialien. Prüfen Sie HDPE, PP, PTFE, Viton und Edelstahl für sichere Chemikalienlagerung.",

    "Kostenloses Tool zum Entschlüsseln von Sicherheitsdatenblättern (SDB). Erhalten Sie verständliche Zusammenfassungen von Gefahren, PSA-Anforderungen, Lagerhinweisen und Transportinformationen.":
    "Kostenloses Tool zum Entschlüsseln von Sicherheitsdatenblättern (SDB): verständliche Zusammenfassungen zu Gefahren, PSA, Lagerung und Transport.",

    "ChemicalResistance.org bietet kostenlose Chemikalienbeständigkeitsdaten für Ingenieure und Sicherheitsfachleute. Daten von Bürkle GmbH. 1.650+ Chemikalien, 24 Werkstoffe.":
    "Kostenlose Chemikalienbeständigkeitsdaten für Ingenieure und Sicherheitsfachleute. Daten von Bürkle GmbH. 1.650+ Chemikalien und 24 Werkstoffe.",

    "Chemikalienbeständigkeit für 24 Werkstoffe: Fluorpolymere (PTFE, FEP, PVDF), Kunststoffe (HDPE, PP), Elastomere (Viton, EPDM, NBR), Metalle (V4A). Kostenlose A-D-Bewertungen.":
    "Chemikalienbeständigkeit für 24 Werkstoffe: Fluorpolymere (PTFE, FEP, PVDF), Kunststoffe (HDPE, PP), Elastomere (Viton, EPDM, NBR), Metalle. Kostenlos.",

    "PP A-bewertet für die meisten Säuren, Laugen & wässrige Salzlösungen. Nicht für Aromaten oder chlorierte Lösungsmittel geeignet. 1.650+ Chemikalien A-D bei 20°C & 50°C.":
    "PP A-bewertet für die meisten Säuren, Laugen & Salzlösungen. Nicht für Aromaten oder chlorierte Lösungsmittel. 1.650+ Chemikalien A-D bei 20°C & 50°C.",

    "Silikonkautschuk ausgezeichnet gegen heiße Luft, Ozon, Dampf & verdünnte Säuren bei hohen Temperaturen. Schlecht gegen Kraftstoffe & aromatische Lösungsmittel. 1.650+.":
    "Silikonkautschuk ausgezeichnet gegen heiße Luft, Ozon, Dampf & verdünnte Säuren. Schlecht gegen Kraftstoffe & aromatische Lösungsmittel. 1.650+ Chemikalien.",

    "FEP bietet nahezu PTFE-ähnliche Beständigkeit in flexiblen Schläuchen & Folien. A-bewertet für die meisten Säuren, Laugen & Lösungsmittel. 1.650+ Chemikalien A-D.":
    "FEP bietet nahezu PTFE-ähnliche Beständigkeit in flexiblen Schläuchen & Folien. A-bewertet für die meisten Säuren, Laugen & Lösungsmittel. 1.650+ Chemikalien.",

    "PETG beständig gegen verdünnte Säuren, Alkohole & wässrige Lösungen. Bessere Lösungsmittelbeständigkeit als PS. Transparent & leicht druckbar. 1.650+ Chemikalien A-D.":
    "PETG beständig gegen verdünnte Säuren, Alkohole & wässrige Lösungen. Bessere Lösungsmittelbeständigkeit als PS. Transparent. 1.650+ Chemikalien A-D.",

    "LDPE beständig gegen verdünnte Säuren, Laugen & Salzlösungen. Schwächer als HDPE gegen konzentrierte Säuren & Lösungsmittel. 1.650+ Chemikalien A-D bei 20°C & 50°C.":
    "LDPE beständig gegen verdünnte Säuren, Laugen & Salzlösungen. Schwächer als HDPE gegen konzentrierte Säuren. 1.650+ Chemikalien A-D bei 20°C & 50°C.",

    "PVDF (Kynar) beständig gegen konzentrierte Säuren, Halogene & Oxidationsmittel. Ausgezeichnet bei 50°C. 1.650+ Chemikalien A-D für anspruchsvollen Chemiebetrieb.":
    "PVDF (Kynar) beständig gegen konzentrierte Säuren, Halogene & Oxidationsmittel. Ausgezeichnet bei 50°C. 1.650+ Chemikalien A-D bewertet.",

    "HDPE beständig gegen starke Säuren, Laugen & Salzlösungen (A-bewertet). Schwächer gegen Aromaten & chlorierte Lösungsmittel. 1.650+ Chemikalien A-D bei 20°C & 50°C.":
    "HDPE beständig gegen starke Säuren, Laugen & Salzlösungen (A-bewertet). Schwächer gegen Aromaten & chlorierte Lösungsmittel. 1.650+ Chemikalien A-D.",

    "ECTFE/ETFE Fluorpolymere beständig gegen starke Säuren, Laugen & Halogene. Eingesetzt als chemikalienbeständige Auskleidungen. 1.650+ Chemikalien A-D bei 20°C & 50°C.":
    "ECTFE/ETFE beständig gegen starke Säuren, Laugen & Halogene. Eingesetzt als chemikalienbeständige Auskleidungen. 1.650+ Chemikalien A-D bei 20°C & 50°C.",

    "Polystyrol mit begrenzter Chemikalienbeständigkeit — gut für Wasser, Alkohole & verdünnte Säuren. Angegriffen von den meisten organischen Lösungsmitteln. 1.650+ Chemikalien.":
    "Polystyrol mit begrenzter Beständigkeit — gut für Wasser, Alkohole & verdünnte Säuren. Angegriffen von organischen Lösungsmitteln. 1.650+ Chemikalien.",

    "PTFE bietet nahezu universelle Chemikalienbeständigkeit — A-bewertet für fast alle Säuren, Laugen & Lösungsmittel. Chemisch inert bis 200°C+. 1.650+ Chemikalien kostenlos.":
    "PTFE bietet nahezu universelle Beständigkeit — A-bewertet für fast alle Säuren, Laugen & Lösungsmittel. Inert bis 200°C+. 1.650+ Chemikalien kostenlos.",

    "Nylon/PA beständig gegen aliphatische Kohlenwasserstoffe, Kraftstoffe & milde Laugen. Angegriffen von starken Säuren & heißem Wasser. 1.650+ Chemikalien A-D bei 20°C & 50°C.":
    "Nylon/PA beständig gegen aliphatische Kohlenwasserstoffe, Kraftstoffe & milde Laugen. Angegriffen von starken Säuren & heißem Wasser. 1.650+ Chemikalien.",

    "EPDM-Gummi ausgezeichnet gegen Dampf, Heißwasser, verdünnte Säuren & Laugen. Schlecht gegen Öle, Kraftstoffe & aromatische Lösungsmittel. 1.650+ Chemikalien A-D.":
    "EPDM ausgezeichnet gegen Dampf, Heißwasser, verdünnte Säuren & Laugen. Schlecht gegen Öle, Kraftstoffe & aromatische Lösungsmittel. 1.650+ Chemikalien A-D.",

    # --- Spanish ---
    "Tabla de resistencia química gratuita con 1.600+ químicos y 24 materiales. Consulta la compatibilidad para HDPE, PP, PTFE, Viton, Acero Inoxidable. Esencial para el almacenamiento seguro de químicos.":
    "Tabla de resistencia química gratuita: 1.600+ químicos y 24 materiales. Consulta la compatibilidad de HDPE, PP, PTFE, Viton y Acero Inoxidable.",

    "Herramienta gratuita para decodificar Fichas de Datos de Seguridad (FDS). Obtenga resúmenes claros de peligros, requisitos de EPP, directrices de almacenamiento e información de transporte.":
    "Herramienta gratuita para decodificar Fichas de Datos de Seguridad (FDS): resúmenes claros de peligros, requisitos de EPP, almacenamiento y transporte.",

    "Herramienta gratuita para verificar si los químicos se pueden almacenar juntos de forma segura. Recomendaciones de armarios según normativas de seguridad laboral.":
    "Herramienta gratuita para verificar si los químicos se pueden almacenar juntos. Recomendaciones de armarios según normativas de seguridad laboral.",

    "Consulta gratuita de viscosidad para más de 100 líquidos y sustancias. Encuentra valores de viscosidad en mPa·s (cP) para selección de bombas y manejo de fluidos.":
    "Consulta gratuita de viscosidad para 100+ líquidos y sustancias. Valores en mPa·s (cP) para selección de bombas y manejo de fluidos.",

    "ChemicalResistance.org ofrece datos gratuitos de resistencia química para ingenieros y profesionales de seguridad. Datos de Bürkle GmbH. 1.650+ químicos, 24 materiales.":
    "Datos gratuitos de resistencia química para ingenieros y profesionales de seguridad. Fuente: Bürkle GmbH. 1.650+ químicos y 24 materiales.",

    # og:description only (es landing page); Ahrefs counts it as an over-long description.
    "Herramienta gratuita para verificar compatibilidad de materiales para almacenamiento químico. 1.600+ químicos, 24 materiales incluyendo HDPE, PTFE, Viton, SS316.":
    "Herramienta gratuita para verificar compatibilidad de materiales. 1.600+ químicos y 24 materiales, incluyendo HDPE, PTFE, Viton y SS316.",

    "Resistencia química para cualquier compuesto. 1.650+ productos químicos clasificados A-D frente a HDPE, PTFE, PP, Viton, SS 316 y 20 materiales más a 20°C y 50°C.":
    "Resistencia química para cualquier compuesto. 1.650+ productos clasificados A-D frente a HDPE, PTFE, PP, Viton, SS 316 y 20 materiales más.",

    "Tablas de resistencia química para 24 materiales: fluoropolímeros (PTFE, FEP, PVDF), plásticos (HDPE, PP), elastómeros (Viton, EPDM, NBR), metales (SS 316). Clasificaciones A-D gratuitas.":
    "Tablas de resistencia química para 24 materiales: fluoropolímeros (PTFE, FEP, PVDF), plásticos (HDPE, PP), elastómeros (Viton, EPDM, NBR), metales. Gratis.",

    "PP clasificado A para la mayoría de ácidos, álcalis y soluciones salinas acuosas. No recomendado para aromáticos o solventes clorados. 1.650+ químicos A-D a 20°C y 50°C.":
    "PP clasificado A para la mayoría de ácidos, álcalis y sales. No recomendado para aromáticos o solventes clorados. 1.650+ químicos A-D a 20°C y 50°C.",

    "Caucho de silicona excelente frente a aire caliente, ozono, vapor y ácidos diluidos a altas temperaturas. Malo frente a combustibles y solventes aromáticos. 1.650+.":
    "Caucho de silicona excelente frente a aire caliente, ozono, vapor y ácidos diluidos. Malo frente a combustibles y solventes aromáticos. 1.650+ químicos.",

    "HDPE resiste ácidos fuertes, álcalis y soluciones salinas (A). Más débil frente a aromáticos y solventes clorados. 1.650+ químicos clasificados A-D a 20°C y 50°C.":
    "HDPE resiste ácidos fuertes, álcalis y soluciones salinas (A). Más débil frente a aromáticos y solventes clorados. 1.650+ químicos A-D a 20°C y 50°C.",

    "PTFE ofrece resistencia química casi universal — clasificado A para casi todos los ácidos, bases y solventes. Químicamente inerte hasta 200°C+. 1.650+ químicos gratis.":
    "PTFE ofrece resistencia casi universal — clasificado A para casi todos los ácidos, bases y solventes. Inerte hasta 200°C+. 1.650+ químicos gratis.",

    # --- French ---
    "Tableau de résistance chimique gratuit avec plus de 1 600 produits chimiques et 24 matériaux. Vérifiez la compatibilité HDPE, PP, PTFE, Viton, Acier Inox pour un stockage sécurisé.":
    "Tableau de résistance chimique gratuit : 1 600+ produits et 24 matériaux. Vérifiez la compatibilité HDPE, PP, PTFE, Viton et Acier Inox.",

    "Outil gratuit pour décoder Fichas de Datos de Seguridad (FDS). Obtenez des résumés clairs des dangers, exigences EPI, consignes de stockage e informations de transport.":
    "Outil gratuit pour décoder les fiches de données de sécurité (FDS) : résumés clairs des dangers, exigences EPI, stockage et transport.",

    "Créez votre propre comparaison de matériaux. Sélectionnez 2 à 3 matériaux parmi 24 options et consultez les évaluations de résistance pour plus de 1 600 produits chimiques.":
    "Créez votre comparaison de matériaux. Sélectionnez 2 à 3 matériaux parmi 24 et consultez les évaluations de résistance pour 1 600+ produits.",

    "Table de viscosité des liquides : trouvez instantanément la viscosité en mPa·s (cP) de plus de 100 substances — eau, huile, glycérine, acides et solvants. Données à 20°C et 50°C pour la sélection de pompes.":
    "Table de viscosité des liquides : viscosité en mPa·s (cP) de 100+ substances — eau, huile, glycérine, acides, solvants. Données à 20°C et 50°C.",

    "ChemicalResistance.org fournit des données de résistance chimique gratuites pour ingénieurs et professionnels de sécurité. Données de Bürkle GmbH. 1 650+ produits, 24 matériaux.":
    "Données de résistance chimique gratuites pour ingénieurs et professionnels de sécurité. Source : Bürkle GmbH. 1 650+ produits et 24 matériaux.",

    "Tableaux de résistance chimique pour 24 matériaux : fluoropolymères (PTFE, FEP, PVDF), plastiques (HDPE, PP), élastomères (Viton, EPDM, NBR), métaux (Inox 316). Gratuit.":
    "Tableaux de résistance chimique pour 24 matériaux : fluoropolymères (PTFE, FEP, PVDF), plastiques (HDPE, PP), élastomères (Viton, EPDM, NBR), métaux.",

    "PP noté A pour la plupart des acides, bases et solutions salines. Déconseillé pour les aromatiques ou solvants chlorés. 1 650+ produits chimiques A-D à 20°C & 50°C.":
    "PP noté A pour la plupart des acides, bases et solutions salines. Déconseillé pour les aromatiques ou solvants chlorés. 1 650+ produits A-D à 20°C & 50°C.",

    "LDPE résiste aux acides dilués, bases et solutions salines. Plus faible que HDPE contre acides concentrés et solvants. 1 650+ produits chimiques A-D à 20°C & 50°C.":
    "LDPE résiste aux acides dilués, bases et solutions salines. Plus faible que HDPE contre acides concentrés et solvants. 1 650+ produits A-D à 20°C & 50°C.",

    "HDPE résiste aux acides forts, bases et solutions salines (A). Plus faible contre les aromatiques et solvants chlorés. 1 650+ produits classés A-D à 20°C & 50°C.":
    "HDPE résiste aux acides forts, bases et solutions salines (A). Plus faible contre les aromatiques et solvants chlorés. 1 650+ produits A-D à 20°C & 50°C.",

    "Le PTFE offre une résistance chimique quasi universelle — noté A pour presque tous les acides, bases et solvants. Inerte jusqu'à 200°C+. 1 650+ produits gratuits.":
    "Le PTFE offre une résistance quasi universelle — noté A pour presque tous les acides, bases et solvants. Inerte jusqu'à 200°C+. 1 650+ produits gratuits.",

    # --- Portuguese ---
    "Tabela de resistência química gratuita com mais de 1.600 produtos químicos e 24 materiais. Verifique compatibilidade HDPE, PP, PTFE, Viton, Aço Inox para armazenamento seguro.":
    "Tabela de resistência química gratuita: 1.600+ produtos e 24 materiais. Verifique a compatibilidade de HDPE, PP, PTFE, Viton e Aço Inox.",

    "Ferramenta gratuita para decodificar Fichas de Datos de Seguridad (FDS). Obtenha resumos claros dos perigos, requisitos de EPI, diretrizes de armazenamento e informações de transporte.":
    "Ferramenta gratuita para decodificar fichas de dados de segurança (FDS): resumos claros dos perigos, requisitos de EPI, armazenamento e transporte.",

    "Crie sua própria comparação de materiais. Selecione 2 a 3 materiais entre 24 opções e consulte as classificações de resistência para mais de 1.600 produtos químicos.":
    "Crie sua própria comparação. Selecione 2 a 3 materiais entre 24 opções e veja as classificações de resistência para 1.600+ produtos químicos.",

    "Consulta gratuita de viscosidade para mais de 100 líquidos e substâncias. Encontre valores de viscosidade em mPa·s (cP) para seleção de bombas e manuseio de fluidos.":
    "Consulta gratuita de viscosidade para 100+ líquidos e substâncias. Valores em mPa·s (cP) para seleção de bombas e manuseio de fluidos.",

    "ChemicalResistance.org fornece dados gratuitos de resistência química para engenheiros e profissionais de segurança. Dados da Bürkle GmbH. 1.650+ químicos, 24 materiais.":
    "Dados gratuitos de resistência química para engenheiros e profissionais de segurança. Fonte: Bürkle GmbH. 1.650+ químicos e 24 materiais.",

    "Tabelas de resistência química para 24 materiais: fluoropolímeros (PTFE, FEP, PVDF), plásticos (HDPE, PP), elastômeros (Viton, EPDM, NBR), metais (SS 316). Grátis.":
    "Tabelas de resistência química para 24 materiais: fluoropolímeros (PTFE, FEP, PVDF), plásticos (HDPE, PP), elastômeros (Viton, EPDM, NBR), metais. Grátis.",

    "Borracha de silicone excelente contra ar quente, ozônio, vapor e ácidos diluídos em altas temperaturas. Ruim frente a combustíveis e solventes aromáticos. 1.650+.":
    "Borracha de silicone excelente contra ar quente, ozônio, vapor e ácidos diluídos. Ruim frente a combustíveis e solventes aromáticos. 1.650+ químicos.",

    "PTFE oferece resistência química quase universal — classificado A para quase todos ácidos, bases e solventes. Quimicamente inerte até 200°C+. 1.650+ químicos grátis.":
    "PTFE oferece resistência quase universal — classificado A para quase todos ácidos, bases e solventes. Inerte até 200°C+. 1.650+ químicos grátis.",
}

# Chemical hub pages (chemicals/[lang/]<chem>/index.html) share one template per
# language; only the ones with a long chemical name blow past MAX_LEN, so the
# name is kept and the material list is shortened until the whole thing fits.
CHEM_HUB = {
    'en': (re.compile(r'^Find the best materials for storing (.+?)\. Chemical resistance ratings for .*$'),
           'Best materials for storing {name}.',
           [' Resistance ratings for HDPE, PTFE, Viton, Stainless Steel and 20+ materials.',
            ' Resistance ratings for HDPE, PTFE, Viton and 20+ materials.',
            ' A-D resistance ratings for 24 materials.',
            '']),
    'de': (re.compile(r'^Finden Sie die besten Materialien für die Lagerung von (.+?)\. Chemikalienbeständigkeitsbewertungen für .*$'),
           'Beste Materialien zur Lagerung von {name}.',
           [' Beständigkeitsbewertungen für HDPE, PTFE, Viton, Edelstahl und 20+ Werkstoffe.',
            ' Beständigkeitsbewertungen für HDPE, PTFE, Viton und 20+ Werkstoffe.',
            ' A-D-Bewertungen für 24 Werkstoffe.',
            '']),
    'es': (re.compile(r'^Encuentre los mejores materiales para almacenar (.+?)\. [Cc]lasificaciones de [Rr]esistencia [Qq]uímica para .*$'),
           'Mejores materiales para almacenar {name}.',
           [' Clasificaciones de resistencia química para HDPE, PTFE, Viton, acero inoxidable y 20+ materiales.',
            ' Clasificaciones de resistencia para HDPE, PTFE, Viton y 20+ materiales.',
            ' Clasificaciones A-D para 24 materiales.',
            '']),
    'fr': (re.compile(r'^Trouvez les meilleurs matériaux pour le stockage de (.+?)\. Évaluation de résistance chimique pour .*$'),
           'Meilleurs matériaux pour stocker {name}.',
           [' Évaluations de résistance chimique pour HDPE, PTFE, Viton, acier inoxydable et 20+ matériaux.',
            ' Évaluations de résistance pour HDPE, PTFE, Viton et 20+ matériaux.',
            ' Évaluations A-D pour 24 matériaux.',
            '']),
    'pt': (re.compile(r'^Encontre os melhores materiais para o armazenamento de (.+?)\. Classificação de resistência química para .*$'),
           'Melhores materiais para armazenar {name}.',
           [' Classificações de resistência química para HDPE, PTFE, Viton, aço inoxidável e 20+ materiais.',
            ' Classificações de resistência para HDPE, PTFE, Viton e 20+ materiais.',
            ' Classificações A-D para 24 materiais.',
            '']),
}


def shorten_chem_hub(desc, lang):
    rule = CHEM_HUB.get(lang)
    if rule is None:
        return None
    pattern, head_tpl, tails = rule
    m = pattern.match(desc)
    if not m:
        return None
    head = head_tpl.format(name=m.group(1))
    for tail in tails:
        if len(head) + len(tail) <= MAX_LEN:
            return head + tail
    return head


# The "X vs Y" comparison pages share one template; the material names make the
# rendered length vary, so this is handled as a pattern rather than per page.
COMPARE_RE = re.compile(
    r'Compare (.+?) and (.+?) chemical resistance side-by-side\. '
    r'See which material is better for your application — temperature range, '
    r'compatibility ratings, and recommendations\.')
COMPARE_SUB = (r'Compare \1 and \2 chemical resistance side-by-side — temperature '
               r'range, compatibility ratings and recommendations.')


def lang_of(rel_path):
    """Language code for a repo-relative path; 'en' for the default locale."""
    parts = rel_path.split(os.sep)
    if parts[0] == 'chemicals' and len(parts) > 1 and parts[1] in LANGS:
        return parts[1]
    if parts[0] in LANGS:
        return parts[0]
    if parts[0] == 'materials' and len(parts) > 1 and parts[1] in LANGS:
        return parts[1]
    return 'en'


def is_pair_page(rel_path):
    """chemicals/<chem>/<mat>/ and chemicals/<lang>/<chem>/<mat>/.

    The 4-segment form is ambiguous: chemicals/es/dmso/index.html is a localized
    hub page, not an English pair page, so the language check has to exclude it.
    """
    parts = rel_path.split(os.sep)
    if parts[0] != 'chemicals' or parts[-1] != 'index.html':
        return False
    if len(parts) == 4:
        return parts[1] not in LANGS
    return len(parts) == 5 and parts[1] in LANGS


def is_chem_hub_page(rel_path):
    """chemicals/<chem>/ and chemicals/<lang>/<chem>/.

    chemicals/<lang>/index.html is the localized listing page, not a hub, so it
    is excluded and handled by REWRITES instead.
    """
    parts = rel_path.split(os.sep)
    if parts[0] != 'chemicals' or parts[-1] != 'index.html':
        return False
    if len(parts) == 3:
        return parts[1] not in LANGS
    return len(parts) == 4 and parts[1] in LANGS


def split_pair_desc(desc, lang):
    """Split a pair description into the part worth keeping and its tail.

    The keeper ends at the 50°C rating; everything after is boilerplate.
    Returns None when the description does not look like a pair description.
    """
    idx = desc.find('50°C')
    if idx < 0:
        return None
    head = desc[:idx + len('50°C')]
    rest = desc[idx + len('50°C'):]
    # zh pages close the rating with a full-width paren that belongs to the head.
    if lang == 'zh' and rest.startswith('）'):
        head += '）'
    return head


def shorten_pair(desc, lang):
    head = split_pair_desc(desc, lang)
    if head is None:
        return None
    for tail in PAIR_TAILS[lang]:
        if len(head) + len(tail) <= MAX_LEN:
            return head + tail
    return head + PAIR_TAILS[lang][-1]


def rewrite_descriptions(content, transform):
    """Apply transform() to every description meta tag in content."""
    changed = False
    for pattern in DESC_TAGS:
        def sub(m):
            nonlocal changed
            raw = m.group(2)
            new_plain = transform(html.unescape(raw))
            if new_plain is None:
                return m.group(0)
            # Preserve the file's escaping style: only re-escape if it used entities.
            new_raw = html.escape(new_plain, quote=True) if '&' in raw and ';' in raw else new_plain
            if new_raw == raw:
                return m.group(0)
            changed = True
            return m.group(1) + new_raw + m.group(3)
        content = pattern.sub(sub, content)
    return content, changed


def apply_static_rewrites(text):
    """Apply REWRITES and the compare-page pattern to arbitrary text."""
    for old, new in REWRITES.items():
        if old in text:
            text = text.replace(old, new)
    text = COMPARE_RE.sub(COMPARE_SUB, text)
    return text


def walk_html():
    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for name in files:
            if name.endswith('.html'):
                yield os.path.join(root, name)


def main():
    check_only = '--check' in sys.argv
    pair_fixed = hub_fixed = static_fixed = 0
    still_long = []

    for path in walk_html():
        rel = os.path.relpath(path, BASE_DIR)
        with open(path, encoding='utf-8') as fh:
            original = fh.read()
        content = original

        if is_pair_page(rel):
            lang = lang_of(rel)
            content, changed = rewrite_descriptions(
                content,
                lambda d, l=lang: shorten_pair(d, l) if len(d) > MAX_LEN else None)
            if changed:
                pair_fixed += 1
        elif is_chem_hub_page(rel):
            lang = lang_of(rel)
            content, changed = rewrite_descriptions(
                content,
                lambda d, l=lang: shorten_chem_hub(d, l) if len(d) > MAX_LEN else None)
            if changed:
                hub_fixed += 1
        else:
            new_content = apply_static_rewrites(content)
            if new_content != content:
                content = new_content
                static_fixed += 1

        if content != original and not check_only:
            with open(path, 'w', encoding='utf-8') as fh:
                fh.write(content)

        m = DESC_TAGS[0].search(content)
        if m:
            plain = html.unescape(m.group(2))
            if len(plain) > MAX_LEN:
                still_long.append((len(plain), rel, plain))

    # Keep the generator scripts in sync so a rebuild does not undo this.
    templates_fixed = 0
    for name in sorted(os.listdir(BASE_DIR)):
        if not name.endswith('.py') or name == os.path.basename(__file__):
            continue
        path = os.path.join(BASE_DIR, name)
        with open(path, encoding='utf-8') as fh:
            original = fh.read()
        updated = apply_static_rewrites(original)
        if updated != original:
            templates_fixed += 1
            if not check_only:
                with open(path, 'w', encoding='utf-8') as fh:
                    fh.write(updated)

    print(f'pair pages rewritten:      {pair_fixed}')
    print(f'chemical hub pages fixed:  {hub_fixed}')
    print(f'other pages rewritten:     {static_fixed}')
    print(f'generator scripts updated: {templates_fixed}')
    print(f'still over {MAX_LEN} chars:     {len(still_long)}')
    for length, rel, plain in sorted(still_long, reverse=True)[:20]:
        print(f'  {length:4} {rel}\n       {plain}')
    return 1 if still_long else 0


if __name__ == '__main__':
    sys.exit(main())
