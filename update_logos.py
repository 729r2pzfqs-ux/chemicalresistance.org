#!/usr/bin/env python3
"""Update logo on all HTML pages with correct relative paths."""

import os
import re
from pathlib import Path

ROOT = Path(__file__).parent

# Old patterns to replace (both icon div and old img references)
OLD_ICON_PATTERN = r'<div class="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">\s*<i data-lucide="flask-conical" class="w-5 h-5 text-white"></i>\s*</div>'
OLD_IMG_PATTERN = r'<img src="[^"]*logo-icon[^"]*\.png" alt="ChemicalResistance" class="w-10 h-10">'

def get_logo_path(html_file):
    """Get correct relative path to logo based on file location."""
    rel = html_file.relative_to(ROOT)
    depth = len(rel.parts) - 1  # -1 for the file itself
    
    if depth == 0:
        return 'logos/logo-icon-128x128.png'
    elif depth == 1:
        return '../logos/logo-icon-128x128.png'
    elif depth == 2:
        return '../../logos/logo-icon-128x128.png'
    else:
        return '../' * depth + 'logos/logo-icon-128x128.png'

def update_file(html_file):
    """Update logo in a single HTML file."""
    logo_path = get_logo_path(html_file)
    new_img = f'<img src="{logo_path}" alt="ChemicalResistance" class="w-10 h-10 rounded-xl">'
    
    content = html_file.read_text(encoding='utf-8')
    original = content
    
    # Replace old icon div pattern
    content = re.sub(OLD_ICON_PATTERN, new_img, content, flags=re.DOTALL)
    
    # Replace old img pattern (update path)
    content = re.sub(OLD_IMG_PATTERN, new_img, content)
    
    if content != original:
        html_file.write_text(content, encoding='utf-8')
        return True
    return False

def main():
    updated = 0
    skipped = 0
    
    # Skip data folder
    for html_file in ROOT.rglob('*.html'):
        if 'data/' in str(html_file) or 'ova-source' in str(html_file):
            continue
        
        if update_file(html_file):
            print(f"✓ {html_file.relative_to(ROOT)}")
            updated += 1
        else:
            skipped += 1
    
    print(f"\n✅ Updated: {updated} files")
    print(f"⏭️  Skipped: {skipped} files (no logo found or already updated)")

if __name__ == '__main__':
    main()
