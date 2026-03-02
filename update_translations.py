#!/usr/bin/env python3
"""Update translated pages with new visual design."""

import re

# New rating styles with gradients
NEW_STYLES = '''    <style>
        * { font-family: 'Inter', sans-serif; }
        body { background: #f8fafc; }
        .rating-A { background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; box-shadow: 0 2px 4px rgba(34, 197, 94, 0.3); }
        .rating-B { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3); }
        .rating-C { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3); }
        .rating-D { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3); }
        .rating-NR { background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%); color: #374151; }
        
        /* Table row hover */
        #ratingsTable tr:hover { background-color: #f0fdf4; }
        .search-highlight { background: #fef08a; }
    </style>'''

# Stats banners for each language
STATS = {
    'de': '''            <!-- Stats Banner -->
            <div class="flex justify-center gap-6 md:gap-10 mb-6">
                <div class="text-center">
                    <div class="text-2xl md:text-3xl font-bold text-emerald-600">1.600+</div>
                    <div class="text-xs text-gray-500 uppercase tracking-wide">Chemikalien</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl md:text-3xl font-bold text-emerald-600">24</div>
                    <div class="text-xs text-gray-500 uppercase tracking-wide">Materialien</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl md:text-3xl font-bold text-emerald-600">738</div>
                    <div class="text-xs text-gray-500 uppercase tracking-wide">GHS-Codes</div>
                </div>
            </div>

''',
    'es': '''            <!-- Stats Banner -->
            <div class="flex justify-center gap-6 md:gap-10 mb-6">
                <div class="text-center">
                    <div class="text-2xl md:text-3xl font-bold text-emerald-600">1.600+</div>
                    <div class="text-xs text-gray-500 uppercase tracking-wide">Químicos</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl md:text-3xl font-bold text-emerald-600">24</div>
                    <div class="text-xs text-gray-500 uppercase tracking-wide">Materiales</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl md:text-3xl font-bold text-emerald-600">738</div>
                    <div class="text-xs text-gray-500 uppercase tracking-wide">Códigos GHS</div>
                </div>
            </div>

''',
    'fr': '''            <!-- Stats Banner -->
            <div class="flex justify-center gap-6 md:gap-10 mb-6">
                <div class="text-center">
                    <div class="text-2xl md:text-3xl font-bold text-emerald-600">1 600+</div>
                    <div class="text-xs text-gray-500 uppercase tracking-wide">Produits chimiques</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl md:text-3xl font-bold text-emerald-600">24</div>
                    <div class="text-xs text-gray-500 uppercase tracking-wide">Matériaux</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl md:text-3xl font-bold text-emerald-600">738</div>
                    <div class="text-xs text-gray-500 uppercase tracking-wide">Codes SGH</div>
                </div>
            </div>

''',
    'pt': '''            <!-- Stats Banner -->
            <div class="flex justify-center gap-6 md:gap-10 mb-6">
                <div class="text-center">
                    <div class="text-2xl md:text-3xl font-bold text-emerald-600">1.600+</div>
                    <div class="text-xs text-gray-500 uppercase tracking-wide">Químicos</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl md:text-3xl font-bold text-emerald-600">24</div>
                    <div class="text-xs text-gray-500 uppercase tracking-wide">Materiais</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl md:text-3xl font-bold text-emerald-600">738</div>
                    <div class="text-xs text-gray-500 uppercase tracking-wide">Códigos GHS</div>
                </div>
            </div>

''',
}

# New hero section backgrounds
NEW_HERO_BG = 'bg-gradient-to-br from-emerald-50 via-white to-blue-50'

def update_file(lang):
    filepath = f'{lang}.html'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update styles
    old_style_pattern = r'<style>.*?</style>'
    content = re.sub(old_style_pattern, NEW_STYLES, content, flags=re.DOTALL)
    
    # 2. Update hero background
    content = content.replace(
        'bg-gradient-to-b from-gray-50 to-white',
        NEW_HERO_BG
    )
    
    # 3. Add stats banner after hero section opens
    # Find the max-w-4xl div in hero and add stats after it opens
    if '<!-- Stats Banner -->' not in content:
        pattern = r'(<section class="[^"]*' + re.escape(NEW_HERO_BG) + r'[^"]*"[^>]*>.*?<div class="[^"]*max-w-4xl[^"]*"[^>]*>)'
        
        def add_stats(match):
            return match.group(1) + '\n' + STATS[lang]
        
        content = re.sub(pattern, add_stats, content, flags=re.DOTALL)
        
        # If that didn't work, try a simpler pattern
        if '<!-- Stats Banner -->' not in content:
            # Just add after first h1 opening
            pattern = r'(<div class="[^"]*max-w-4xl[^"]*text-center[^"]*"[^>]*>)'
            content = re.sub(pattern, r'\1\n' + STATS[lang], content, count=1)
    
    # 4. Update h1 to have emerald-600 highlight
    content = re.sub(
        r'(<h1[^>]*>)(.*?)(Chemikalienbeständigkeit|Resistencia Química|Résistance Chimique|Resistência Química)(</h1>)',
        lambda m: m.group(1) + m.group(2).rstrip() + '<span class="text-emerald-600">' + m.group(3) + '</span>' + m.group(4),
        content,
        flags=re.DOTALL
    )
    
    # 5. Add table row hover effect - update table to have hover
    content = content.replace(
        'id="ratingsTable"',
        'id="ratingsTable" class="w-full"'
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated {filepath}")

def main():
    for lang in ['de', 'es', 'fr', 'pt']:
        update_file(lang)
    print("\nDone!")

if __name__ == '__main__':
    main()
