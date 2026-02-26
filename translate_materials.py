#!/usr/bin/env python3
"""Translate material guide pages to Spanish"""

import os
import re

# Common translations
TRANSLATIONS = {
    # HTML lang
    'lang="en"': 'lang="es"',
    
    # Navigation
    'Chemical compatibility database': 'Base de datos de compatibilidad química',
    '← Back to Search': '← Volver a la búsqueda',
    'Back to Search': 'Volver a la búsqueda',
    
    # Breadcrumbs
    '>Home<': '>Inicio<',
    '>Materials<': '>Materiales<',
    
    # Section headers
    'Chemical Resistance Chart': 'Tabla de Resistencia Química',
    'Quick Facts': 'Datos Rápidos',
    'Key Properties': 'Propiedades Clave',
    'Common Applications': 'Aplicaciones Comunes',
    'Compatible Chemicals': 'Químicos Compatibles',
    'Not Recommended': 'No Recomendado',
    'Temperature Range': 'Rango de Temperatura',
    'Chemical Resistance': 'Resistencia Química',
    'Mechanical Properties': 'Propiedades Mecánicas',
    
    # Rating labels
    '>Excellent<': '>Excelente<',
    '>Good<': '>Bueno<',
    '>Limited<': '>Limitado<',
    '>Not recommended<': '>No recomendado<',
    '>No Data<': '>Sin datos<',
    'A = Excellent': 'A = Excelente',
    'B = Good': 'B = Bueno',
    'C = Limited': 'C = Limitado',
    'D = Not Recommended': 'D = No Recomendado',
    'NR = No Data': 'NR = Sin Datos',
    
    # Temperature
    'at 20°C': 'a 20°C',
    'at 50°C': 'a 50°C',
    
    # Common phrases
    'chemicals tested': 'químicos probados',
    'Search chemicals...': 'Buscar químicos...',
    'Filter by rating:': 'Filtrar por clasificación:',
    'All ratings': 'Todas las clasificaciones',
    'Show all': 'Mostrar todos',
    'Loading...': 'Cargando...',
    'No results found': 'No se encontraron resultados',
    
    # Material types
    'Thermoplastic': 'Termoplástico',
    'Fluoropolymer': 'Fluoropolímero',
    'Elastomer': 'Elastómero',
    'Metal': 'Metal',
    
    # Properties
    'Density': 'Densidad',
    'Melting Point': 'Punto de Fusión',
    'Max Temperature': 'Temperatura Máxima',
    'UV Resistance': 'Resistencia UV',
    'FDA Approved': 'Aprobado FDA',
    'Food Contact': 'Contacto Alimentario',
    
    # Footer
    '© 2026 ChemicalResistance.org': '© 2026 ChemicalResistance.org',
    'Free Chemical Compatibility Tool': 'Herramienta Gratuita de Compatibilidad Química',
    
    # Canonical URLs - fix to point to es folder
    'href="https://chemicalresistance.org/materials/': 'href="https://chemicalresistance.org/materials/es/',
    'content="https://chemicalresistance.org/materials/': 'content="https://chemicalresistance.org/materials/es/',
    
    # Back links
    'href="../index.html"': 'href="../../es.html"',
}

# Material-specific translations
MATERIAL_TRANSLATIONS = {
    'hdpe': {
        'HDPE Chemical Resistance Chart': 'Tabla de Resistencia Química del HDPE',
        'Complete HDPE chemical resistance chart': 'Tabla completa de resistencia química del HDPE',
        'Find which chemicals are compatible with High-Density Polyethylene': 'Encuentra qué químicos son compatibles con el Polietileno de Alta Densidad',
        'High-Density Polyethylene (HDPE) is one of the most versatile plastics for chemical storage.': 'El Polietileno de Alta Densidad (HDPE) es uno de los plásticos más versátiles para el almacenamiento de químicos.',
        'It offers excellent resistance to acids, bases, and alcohols, making it ideal for drums, containers, and secondary containment.': 'Ofrece excelente resistencia a ácidos, bases y alcoholes, lo que lo hace ideal para tambores, contenedores y contención secundaria.',
        'High-Density Polyethylene': 'Polietileno de Alta Densidad',
    },
    'pp': {
        'PP Chemical Resistance Chart': 'Tabla de Resistencia Química del PP',
        'Complete PP chemical resistance chart': 'Tabla completa de resistencia química del PP',
        'Find which chemicals are compatible with Polypropylene': 'Encuentra qué químicos son compatibles con el Polipropileno',
        'Polypropylene (PP) offers excellent chemical resistance': 'El Polipropileno (PP) ofrece excelente resistencia química',
        'Polypropylene': 'Polipropileno',
    },
    'ptfe': {
        'PTFE Chemical Resistance Chart': 'Tabla de Resistencia Química del PTFE',
        'Complete PTFE chemical resistance chart': 'Tabla completa de resistencia química del PTFE',
        'Polytetrafluoroethylene': 'Politetrafluoroetileno',
        'Teflon': 'Teflón',
        'virtually all chemicals': 'prácticamente todos los químicos',
        'excellent non-stick properties': 'excelentes propiedades antiadherentes',
    },
    'ss316': {
        'SS 316 Chemical Resistance Chart': 'Tabla de Resistencia Química del Acero Inoxidable 316',
        'Stainless Steel 316': 'Acero Inoxidable 316',
        'Complete SS316 chemical resistance chart': 'Tabla completa de resistencia química del SS316',
        'corrosion resistance': 'resistencia a la corrosión',
    },
    'viton': {
        'Viton Chemical Resistance Chart': 'Tabla de Resistencia Química del Viton',
        'Viton (FPM/FKM)': 'Viton (FPM/FKM)',
        'Fluoroelastomer': 'Fluoroelastómero',
        'premium seal material': 'material de sellado premium',
        'excellent resistance to oils': 'excelente resistencia a los aceites',
    },
    'epdm': {
        'EPDM Chemical Resistance Chart': 'Tabla de Resistencia Química del EPDM',
        'Ethylene Propylene Diene Rubber': 'Caucho de Etileno Propileno Dieno',
        'excellent resistance to water and steam': 'excelente resistencia al agua y vapor',
        'NOT for oils': 'NO para aceites',
    },
    'nbr': {
        'NBR Chemical Resistance Chart': 'Tabla de Resistencia Química del NBR',
        'Nitrile Rubber': 'Caucho Nitrilo',
        'Buna-N': 'Buna-N',
        'excellent resistance to oils and fuels': 'excelente resistencia a aceites y combustibles',
    },
    'silicone': {
        'Silicone Chemical Resistance Chart': 'Tabla de Resistencia Química de la Silicona',
        'Silicone Rubber': 'Caucho de Silicona',
        'food contact applications': 'aplicaciones de contacto alimentario',
        'extreme temperature range': 'rango de temperatura extremo',
    },
}

def translate_file(filepath, material_name):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Apply common translations
    for en, es in TRANSLATIONS.items():
        content = content.replace(en, es)
    
    # Apply material-specific translations
    if material_name in MATERIAL_TRANSLATIONS:
        for en, es in MATERIAL_TRANSLATIONS[material_name].items():
            content = content.replace(en, es)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'Translated: {filepath}')

def main():
    materials_dir = 'materials/es'
    
    for filename in os.listdir(materials_dir):
        if filename.endswith('.html'):
            material_name = filename.replace('.html', '')
            filepath = os.path.join(materials_dir, filename)
            translate_file(filepath, material_name)
    
    print('Done!')

if __name__ == '__main__':
    main()
