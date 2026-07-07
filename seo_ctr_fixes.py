#!/usr/bin/env python3
"""
SEO/CTR fixes for chemicalresistance.org
1. Add hreflang tags to utility pages missing them
2. Add x-default to sds-decoder and storage-compatibility pages
3. Enrich JSON-LD on /materials/ pages
"""

import os
import re

BASE = os.path.dirname(os.path.abspath(__file__))
BASE_URL = "https://chemicalresistance.org"

# ─── Hreflang block builders ────────────────────────────────────────────────

def hreflang_block(en_path, lang_paths):
    """
    en_path: "/compare/"
    lang_paths: dict of lang -> path, e.g. {"de": "/de/compare/", ...}
    Returns a string of <link rel="alternate" hreflang="..."> tags
    """
    lines = []
    lines.append(f'    <link rel="alternate" hreflang="x-default" href="{BASE_URL}{en_path}">')
    lines.append(f'    <link rel="alternate" hreflang="en" href="{BASE_URL}{en_path}">')
    for lang, path in lang_paths.items():
        lines.append(f'    <link rel="alternate" hreflang="{lang}" href="{BASE_URL}{path}">')
    return "\n".join(lines) + "\n"


def xdefault_line(en_path):
    return f'    <link rel="alternate" hreflang="x-default" href="{BASE_URL}{en_path}">\n'


def insert_hreflang(filepath, hreflang_str):
    """
    Insert hreflang lines after the <link rel="canonical"> tag.
    If no canonical found, insert before </head>.
    Only inserts if no hreflang already present.
    """
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    if 'hreflang="x-default"' in content:
        print(f"  SKIP (already has x-default): {filepath}")
        return False

    # Try after canonical
    canonical_pattern = r'(<link rel="canonical"[^>]*>)'
    match = re.search(canonical_pattern, content)
    if match:
        insert_pos = match.end()
        new_content = content[:insert_pos] + "\n" + hreflang_str + content[insert_pos:]
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"  FIXED (after canonical): {filepath}")
        return True

    # Fallback: before </head>
    if "</head>" in content:
        new_content = content.replace("</head>", hreflang_str + "</head>", 1)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"  FIXED (before </head>): {filepath}")
        return True

    print(f"  FAIL (no insertion point found): {filepath}")
    return False


def add_xdefault(filepath, en_path):
    """Add x-default hreflang before existing hreflang block."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    if 'hreflang="x-default"' in content:
        print(f"  SKIP (already has x-default): {filepath}")
        return False

    # Find the first hreflang line and insert x-default before it
    pattern = r'(<link rel="alternate" hreflang=")'
    match = re.search(pattern, content)
    if match:
        insert_pos = match.start()
        xdef = xdefault_line(en_path)
        new_content = content[:insert_pos] + xdef + content[insert_pos:]
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"  FIXED (added x-default): {filepath}")
        return True

    print(f"  FAIL (no hreflang found to prepend to): {filepath}")
    return False


# ─── Fix 1: Hreflang for utility pages ───────────────────────────────────────

def fix_utility_hreflang():
    print("\n=== Fix 1: Hreflang for utility pages ===")

    # compare pages
    compare_langs = {"de": "/de/compare/", "es": "/es/compare/", "fr": "/fr/compare/",
                     "pt": "/pt/compare/", "zh": "/zh/compare/"}
    compare_block = hreflang_block("/compare/", compare_langs)
    files_compare = [
        (BASE + "/compare/index.html", compare_block),
        (BASE + "/de/compare/index.html", compare_block),
        (BASE + "/es/compare/index.html", compare_block),
        (BASE + "/fr/compare/index.html", compare_block),
        (BASE + "/pt/compare/index.html", compare_block),
        (BASE + "/zh/compare/index.html", compare_block),
    ]

    # charts pages
    charts_langs = {"de": "/de/charts/", "es": "/es/charts/", "fr": "/fr/charts/",
                    "pt": "/pt/charts/", "zh": "/zh/charts/"}
    charts_block = hreflang_block("/charts/", charts_langs)
    files_charts = [
        (BASE + "/charts/index.html", charts_block),
        (BASE + "/de/charts/index.html", charts_block),
        (BASE + "/es/charts/index.html", charts_block),
        (BASE + "/fr/charts/index.html", charts_block),
        (BASE + "/pt/charts/index.html", charts_block),
        (BASE + "/zh/charts/index.html", charts_block),
    ]

    # viscosity pages
    visc_langs = {"de": "/de/viscosity/", "es": "/es/viscosity/", "fr": "/fr/viscosity/",
                  "pt": "/pt/viscosity/", "zh": "/zh/viscosity/"}
    visc_block = hreflang_block("/viscosity/", visc_langs)
    files_visc = [
        (BASE + "/viscosity/index.html", visc_block),
        (BASE + "/de/viscosity/index.html", visc_block),
        (BASE + "/es/viscosity/index.html", visc_block),
        (BASE + "/fr/viscosity/index.html", visc_block),
        (BASE + "/pt/viscosity/index.html", visc_block),
        (BASE + "/zh/viscosity/index.html", visc_block),
    ]

    # about pages — EN is at /about/, language versions at /de-about/ etc.
    about_langs = {"de": "/de-about/", "es": "/es-about/", "fr": "/fr-about/",
                   "pt": "/pt-about/", "zh": "/zh-about/"}
    about_block = hreflang_block("/about/", about_langs)
    files_about = [
        (BASE + "/about/index.html", about_block),
        (BASE + "/de-about/index.html", about_block),
        (BASE + "/es-about/index.html", about_block),
        (BASE + "/fr-about/index.html", about_block),
        (BASE + "/pt-about/index.html", about_block),
        (BASE + "/zh-about/index.html", about_block),
    ]

    # materials index — EN is /materials/, language versions at /materials/de/ etc.
    mats_langs = {"de": "/materials/de/", "es": "/materials/es/", "fr": "/materials/fr/",
                  "pt": "/materials/pt/", "zh": "/materials/zh/"}
    mats_block = hreflang_block("/materials/", mats_langs)
    files_mats = [
        (BASE + "/materials/index.html", mats_block),
        (BASE + "/materials/de/index.html", mats_block),
        (BASE + "/materials/es/index.html", mats_block),
        (BASE + "/materials/fr/index.html", mats_block),
        (BASE + "/materials/pt/index.html", mats_block),
        (BASE + "/materials/zh/index.html", mats_block),
    ]

    all_files = files_compare + files_charts + files_visc + files_about + files_mats
    count = 0
    for filepath, block in all_files:
        if os.path.exists(filepath):
            if insert_hreflang(filepath, block):
                count += 1
        else:
            print(f"  MISSING file: {filepath}")
    print(f"  Total hreflang fixes applied: {count}")


# ─── Fix 2: x-default for sds-decoder and storage-compatibility ──────────────

def fix_xdefault():
    print("\n=== Fix 2: Add x-default to sds-decoder / storage-compatibility ===")

    sds_en = "/sds-decoder/"
    storage_en = "/storage-compatibility/"

    sds_files = [
        BASE + "/sds-decoder/index.html",
        BASE + "/de/sds-decoder/index.html",
        BASE + "/es/sds-decoder/index.html",
        BASE + "/fr/sds-decoder/index.html",
        BASE + "/pt/sds-decoder/index.html",
        BASE + "/zh/sds-decoder/index.html",
    ]
    storage_files = [
        BASE + "/storage-compatibility/index.html",
        BASE + "/de/storage-compatibility/index.html",
        BASE + "/es/storage-compatibility/index.html",
        BASE + "/fr/storage-compatibility/index.html",
        BASE + "/pt/storage-compatibility/index.html",
        BASE + "/zh/storage-compatibility/index.html",
    ]

    count = 0
    for filepath in sds_files:
        if os.path.exists(filepath):
            if add_xdefault(filepath, sds_en):
                count += 1
        else:
            print(f"  MISSING: {filepath}")

    for filepath in storage_files:
        if os.path.exists(filepath):
            if add_xdefault(filepath, storage_en):
                count += 1
        else:
            print(f"  MISSING: {filepath}")

    print(f"  Total x-default fixes applied: {count}")


# ─── Fix 3: JSON-LD enrichment on /materials/ pages ─────────────────────────

MATERIAL_META = {
    "hdpe":             ("High-Density Polyethylene (HDPE)", "Thermoplastic"),
    "pp":               ("Polypropylene (PP)", "Thermoplastic"),
    "ptfe":             ("Polytetrafluoroethylene (PTFE / Teflon)", "Fluoropolymer"),
    "pvdf":             ("Polyvinylidene Fluoride (PVDF / Kynar)", "Fluoropolymer"),
    "fep":              ("Fluorinated Ethylene Propylene (FEP)", "Fluoropolymer"),
    "ectfe-etfe":       ("ECTFE/ETFE Fluoropolymers", "Fluoropolymer"),
    "ldpe":             ("Low-Density Polyethylene (LDPE)", "Thermoplastic"),
    "pvc-rigid":        ("Rigid PVC (Polyvinyl Chloride)", "Thermoplastic"),
    "pvc-flexible":     ("Flexible PVC (Polyvinyl Chloride)", "Thermoplastic"),
    "nylon-pa":         ("Nylon / Polyamide (PA)", "Thermoplastic"),
    "acetal-pom":       ("Acetal / Polyoxymethylene (POM)", "Thermoplastic"),
    "polycarbonate":    ("Polycarbonate (PC)", "Thermoplastic"),
    "polystyrene":      ("Polystyrene (PS)", "Thermoplastic"),
    "polysulfone":      ("Polysulfone (PSU)", "Thermoplastic"),
    "petg":             ("Polyethylene Terephthalate Glycol (PETG)", "Thermoplastic"),
    "pmp":              ("Polymethylpentene (PMP / TPX)", "Thermoplastic"),
    "san":              ("Styrene Acrylonitrile (SAN)", "Thermoplastic"),
    "epdm":             ("EPDM (Ethylene Propylene Diene Monomer)", "Elastomer"),
    "nbr":              ("NBR Nitrile Rubber (Buna-N)", "Elastomer"),
    "viton":            ("Viton / FKM Fluoroelastomer", "Elastomer"),
    "silicone":         ("Silicone Rubber (VMQ)", "Elastomer"),
    "ss316":            ("Stainless Steel 316 (1.4401)", "Metal"),
    "stainless-steel-304": ("Stainless Steel 304 (1.4301)", "Metal"),
    "aluminium":        ("Aluminium", "Metal"),
}


def fix_material_jsonld():
    print("\n=== Fix 3: Enrich JSON-LD on /materials/ pages ===")
    mats_dir = os.path.join(BASE, "materials")
    count = 0

    for slug, (full_name, mat_type) in MATERIAL_META.items():
        filepath = os.path.join(mats_dir, slug, "index.html")
        if not os.path.exists(filepath):
            print(f"  MISSING: {filepath}")
            continue

        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        # Check if TechArticle or Dataset already present
        if '"TechArticle"' in content or '"Dataset"' in content:
            print(f"  SKIP (already enriched): {slug}")
            continue

        url = f"{BASE_URL}/materials/{slug}/"
        # Build a TechArticle block to insert alongside existing WebPage
        tech_article = (
            f'\n<script type="application/ld+json">{{"@context":"https://schema.org",'
            f'"@type":"TechArticle","headline":"{full_name} Chemical Resistance Chart",'
            f'"description":"Chemical resistance data for {full_name} — rated A-D against 1,600+ chemicals at 20°C and 50°C. Material type: {mat_type}.",'
            f'"url":"{url}",'
            f'"author":{{"@type":"Organization","name":"ChemicalResistance.org",'
            f'"url":"{BASE_URL}"}},'
            f'"publisher":{{"@type":"Organization","name":"ChemicalResistance.org",'
            f'"url":"{BASE_URL}"}},'
            f'"about":[{{"@type":"Thing","name":"{full_name}","description":"A {mat_type.lower()} material used in chemical storage and handling"}}],'
            f'"keywords":"{full_name} chemical resistance, {slug} compatibility chart, {mat_type.lower()} chemical resistance"}}'
            f'</script>'
        )

        # Insert after existing ld+json block
        jsonld_pattern = r'(</script>)(\s*\n)'
        # Find the last ld+json closing tag in the head section
        # More targeted: insert after the first script[type=application/ld+json] closing tag
        pattern = r'(<script type="application/ld\+json">.*?</script>)'
        match = re.search(pattern, content, re.DOTALL)
        if match:
            insert_pos = match.end()
            new_content = content[:insert_pos] + tech_article + content[insert_pos:]
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"  FIXED JSON-LD: {slug}")
            count += 1
        else:
            print(f"  FAIL (no ld+json found): {slug}")

    print(f"  Total JSON-LD enrichments: {count}")


if __name__ == "__main__":
    fix_utility_hreflang()
    fix_xdefault()
    fix_material_jsonld()
    print("\nDone.")
