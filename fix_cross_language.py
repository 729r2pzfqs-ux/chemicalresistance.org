#!/usr/bin/env python3
"""
Repair cross-language contamination in the generated site.

Several of the localized page sets were produced by copying another language's
HTML and running ordered string replacements over it (ZH is derived from PT by
generate_zh_pages.py, and FR/PT carry the same fingerprints from an earlier
DE/FR-derived pass). Every string the replacement table missed stayed in the
source language, so French sentences sit on Portuguese pages, German ones on
French pages, and Portuguese ones on Chinese pages.

This script rewrites those leftovers to the target language in place. It is
idempotent: running it twice changes nothing. `--check` reports without writing.

Fix groups
  FR   German leftovers from the DE -> FR pass ("Gut à 50°C", "Wie lese ich
       die ...", "24 Materialien", "X hat Pas de données ...").
  PT   French leftovers from the FR -> PT pass ("Pas de données", "Le
       polycarbonate", "PVC Rigide") plus the German "hat".
  ZH   Portuguese leftovers from the PT -> ZH pass (the article "O " before
       material names, "varia conforme a concentração", "Boa (B)",
       "无数据 disponíveis") and the rating strings the PT -> ZH table left
       half-converted, which is where the unbalanced "优秀（20°C," come from.
  ALL  German concentration qualifiers from the Bürkle source data that were
       never localized ("(gesättigt)", "(wässrig)", ...) and a handful of
       English UI strings left on the localized pages.
  MAT  The 24 material pages under materials/<lang>/, whose body copy was left
       largely in English with individual terms swapped in mid-sentence
       ("ist ein vielseitiges synthetic rubber"). Translations live in
       material_page_translations.py.
"""

import argparse
import json
import os
import re
import sys

import material_page_translations as mpt

ROOT = os.path.dirname(os.path.abspath(__file__))
LANGS = ("de", "es", "fr", "pt", "zh")


# --------------------------------------------------------------------------
# File selection
# --------------------------------------------------------------------------

def lang_dirs(lang):
    return [lang, f"{lang}-about", f"chemicals/{lang}", f"materials/{lang}"]


def iter_files(subdirs=None):
    """Yield every .html file under ROOT, or under the given subdirectories."""
    roots = [os.path.join(ROOT, d) for d in subdirs] if subdirs else [ROOT]
    for r in roots:
        if not os.path.isdir(r):
            continue
        for dirpath, dirnames, filenames in os.walk(r):
            dirnames[:] = [d for d in dirnames
                           if d not in (".git", ".venv", "__pycache__", "node_modules")]
            for fn in filenames:
                if fn.endswith(".html"):
                    yield os.path.join(dirpath, fn)


def files_for(lang):
    return iter_files(lang_dirs(lang))


def material_files(lang):
    return iter_files([f"materials/{lang}"])


def english_files():
    """Pages that are not under any localized tree."""
    localized = tuple(f"{os.sep}{l}{os.sep}" for l in LANGS)
    localized_top = tuple(os.path.join(ROOT, l) + os.sep for l in LANGS)
    for f in iter_files():
        rel = f[len(ROOT) + 1:]
        parts = rel.split(os.sep)
        if parts[0] in LANGS or parts[0] in (f"{l}-about" for l in LANGS):
            continue
        if len(parts) > 1 and parts[1] in LANGS:
            continue
        yield f


# --------------------------------------------------------------------------
# FR: German leftovers from the DE -> FR pass
# --------------------------------------------------------------------------

FR_LITERAL = [
    # storage-compatibility toast, still German.
    ("Maximal 10 Chemikalien können gleichzeitig verglichen werden",
     "Impossible de comparer plus de 10 produits chimiques à la fois"),

    # Rating word for "B" at the 50°C slot: the DE -> FR table only rewrote the
    # 20°C slot, so every "Bon à 20°C" is followed by an untranslated "Gut".
    ("Gut à 50°C", "Bon à 50°C"),

    # A-D scale explainer, half German.
    ("B = Gut (légère altération possible, geeignet pour die meisten applications).",
     "B = Bon (légère altération possible, convient à la plupart des applications)."),

    # FAQ question heading.
    ("Wie lese ich die Évaluation de résistance chimique?",
     "Comment lire l'Évaluation de résistance chimique ?"),

    # FAQ answer about temperature.
    ("Ja. Évaluation de résistance chimique peuvent sich zwischen 20°C et 50°C erheblich changer.",
     "Oui. Les évaluations de résistance chimique peuvent changer sensiblement entre 20°C et 50°C."),

    # storage-compatibility og:description tail.
    ("Kostenloses Tool.", "Outil gratuit."),
]

FR_REGEX = [
    # "24 Materialien" in the intro paragraph.
    (re.compile(r"(\d+) Materialien"), r"\1 matériaux"),
    # FAQ answer verb: "PVC Flexible hat Pas de données de résistance à X ..."
    # The rated pages read "X a une résistance <rating> à <chem> ...", so match that.
    (re.compile(r" hat Pas de données de résistance à "),
     " a une résistance Pas de données à "),
]


# --------------------------------------------------------------------------
# PT: French leftovers from the FR -> PT pass (+ one German verb)
# --------------------------------------------------------------------------

PT_LITERAL = [
    # storage-compatibility toast, still German.
    ("Maximal 10 Chemikalien können gleichzeitig verglichen werden",
     "Só é possível comparar 10 produtos químicos de cada vez"),
    # ...and its default compatibility reason, still French.
    ("Verificar les produits chimiques spécifiques",
     "Verificar os produtos químicos específicos"),

    # Rating badge in the ratings legend / summary card.
    ('<div class="font-bold">Pas de données</div>', '<div class="font-bold">Sem dados</div>'),

    # Material name: the FR article and the FR lowercase spelling both survived.
    ("Le polycarbonate", "O Polycarbonate"),

    # French spelling of the rigid-PVC name inside JSON-LD descriptions.
    ("PVC Rigide", "PVC Rigid"),

    # storage-compatibility og:description tail.
    ("Kostenloses Tool.", "Ferramenta gratuita."),
]

PT_REGEX = [
    # Body FAQ: "Silicone n'a <strong>pas de données (NR)</strong> de resistência à X a 20°C."
    # Rated pages read "X tem resistência <strong>Boa (B)</strong> à Y a 20°C."
    (re.compile(r" n'a <strong>pas de données \(NR\)</strong> de resistência à "),
     " tem resistência <strong>Sem dados (NR)</strong> à "),
    # JSON-LD FAQ: "Silicone hat Pas de données de resistência à X a 20°C e ..."
    (re.compile(r" hat Pas de données de resistência à "),
     " tem resistência Sem dados à "),
    # Remaining bare lowercase French material name in display text (never in URLs).
    (re.compile(r"(?<![/\w-])polycarbonate(?![/\w-])"), "Polycarbonate"),
    # Those same pages carried the French "resistente a"; every other PT pair
    # page reads "é resistente à <chemical>".
    (re.compile(r"(Polycarbonate é resistente) a "), r"\1 à "),
]


# --------------------------------------------------------------------------
# ZH: Portuguese leftovers from the PT -> ZH pass
# --------------------------------------------------------------------------

# Rating vocabulary, per the legend printed on every ZH page:
#   A=优秀 · B=良好 · C=尚可 · D=不推荐 · NR=无数据
ZH_RATINGS = {
    "优秀": "优秀", "良好": "良好", "尚可": "尚可", "一般": "尚可",
    "不推荐": "不推荐", "无数据": "无数据",
    # Portuguese labels the PT -> ZH table missed entirely.
    "Boa": "良好", "Excelente": "优秀", "Aceitável": "尚可",
    "Não recomendado": "不推荐", "Sem dados": "无数据",
}
_R = "|".join(sorted(ZH_RATINGS, key=len, reverse=True))

# The C rating had two Chinese labels in circulation: 尚可 in the compact
# "A=优秀 · B=良好 · C=尚可" legend printed on every page and in the body FAQ,
# and 一般 in the rating badge and the A-D explainer. Standardize on 尚可, which
# is the one the legend and the FAQ already use, and only in rating contexts —
# 一般 also occurs as ordinary prose ("一般性指南", "一般存储").
ZH_LITERAL = [
    ('class="font-bold">一般</div>', 'class="font-bold">尚可</div>'),
    ("C = 一般（有一定降解，仅限短期使用）。", "C = 尚可（有一定降解，仅限短期使用）。"),
    (">C</span> 一般</div>", ">C</span> 尚可</div>"),
    ("C = 一般</span>", "C = 尚可</span>"),
    ("C（一般）= 材料可能膨胀或降解。", "C（尚可）= 材料可能膨胀或降解。"),
    ("D（差）= 材料不适用。", "D（不推荐）= 材料不适用。"),
    ("Le polycarbonate", "Polycarbonate"),
    ("PVC Rigide", "PVC Rigid"),
    ("Andere Materialien", "其他材料"),
    ("无数据 disponíveis", "无数据"),
    ('<strong>Nota:</strong>', '<strong>注意：</strong>'),
    ('aria-label="Menu"', 'aria-label="菜单"'),
]

ZH_REGEX = [
    # JSON-LD headline prefix left in Portuguese/French: "评级 de 耐化学性 de X 对 Y: ..."
    (re.compile(r"评级[：:]?\s*de 耐化学性 de ([^\"]+?) 对 ([^\":]+?)[:：]\s*"),
     r"\1 对 \2 的化学品耐受性评级："),

    # Rating pair. The PT -> ZH table rewrote "Excelente a " to "优秀（" but had no
    # rule for the closing paren or for the second slot, which is where the
    # unbalanced "优秀（20°C, 优秀（50°C" comes from. Rebuild the whole pair.
    (re.compile(rf"评级[：:]\s*({_R})\s*(?:（|\s+a\s+)\s*(\d+)°C[）)]?\s*[,，]\s*({_R})\s*(?:（|\s+a\s+)\s*(\d+)°C[）)]?"),
     lambda m: f"评级：{ZH_RATINGS[m.group(1)]}（{m.group(2)}°C），{ZH_RATINGS[m.group(3)]}（{m.group(4)}°C）"),

    # Body/FAQ rating slots.
    (re.compile(rf"的耐受性为<strong>({_R})\s*\(([ABCD]|NR)\)</strong>"),
     lambda m: f"的耐受性为<strong>{ZH_RATINGS[m.group(1)]} ({m.group(2)})</strong>"),
    (re.compile(rf"的耐受性为({_R})，在50°C下为({_R})(?:（\d*°?C?）?)?"),
     lambda m: f"的耐受性为{ZH_RATINGS[m.group(1)]}，在50°C下为{ZH_RATINGS[m.group(2)]}"),

    # Portuguese article in front of the material name in the meta descriptions:
    # 'content="O PTFE 能耐受 丙酮? ...'. It never leaked into the page body.
    (re.compile(r'(?<=content=")O (?=[^"]{1,30}能耐受)'), ""),

    # Bare lowercase French material name in display text (never in URLs).
    (re.compile(r"(?<![/\w-])polycarbonate(?![/\w-])"), "Polycarbonate"),

    # Concentration note, still fully Portuguese (the source sentence is split
    # across two indented lines, hence the captured whitespace groups).
    (re.compile(r"A 的耐受性 - ([^<\n]+?) varia conforme a concentração\.(\s*)"
                r"Dados disponíveis para:\s*([^<]*?)\.(\s*)"),
     r"\1 的耐受性因浓度而异。\2可用浓度数据：\3。\4"),
]


# --------------------------------------------------------------------------
# ES / DE / EN one-offs
# --------------------------------------------------------------------------

ES_LITERAL = [
    ('>Materialien</a>', '>Materiales</a>'),
    ('aria-label="Filter by rating"', 'aria-label="Filtrar por calificación"'),
]

DE_LITERAL = []

EN_LITERAL = [
    # German source-data row name on the English materials tables; the English
    # name is already used for the same row on the localized pages.
    ("Öle und Fette, pflanzlich", "Vegetable Oils and Fats"),
]


# --------------------------------------------------------------------------
# All languages: German concentration qualifiers from the Bürkle source
# --------------------------------------------------------------------------

QUALIFIERS = {
    #  German             en             es                fr                   pt                zh
    "gesättigt":        ("saturated",   "saturado",       "saturé",            "saturado",       "饱和"),
    "wässrige Lösung":  ("aqueous solution", "solución acuosa", "solution aqueuse", "solução aquosa", "水溶液"),
    "wässrig":          ("aqueous",     "acuoso",         "aqueux",            "aquoso",         "水溶液"),
    "verdünnt":         ("dilute",      "diluido",        "dilué",             "diluído",        "稀"),
    # es/pt use the abbreviated form: the unabbreviated "puro técnico" pushes the
    # vinyl-acetate and crotonaldehyde hub descriptions past the 160-char limit
    # that fix_meta_descriptions.py enforces.
    "techn. rein":      ("tech. pure",  "téc. puro",      "pur technique",     "téc. puro",      "工业纯"),
    "techn. üblich":    ("tech. grade", "grado técnico",  "qualité technique", "grau técnico",   "工业级"),
    "rein":             ("pure",        "puro",           "pur",               "puro",           "纯"),
    "Kristalle":        ("crystals",    "cristales",      "cristaux",          "cristais",       "晶体"),
    "Pulver":           ("powder",      "polvo",          "poudre",            "pó",             "粉末"),
    "flüssig":          ("liquid",      "líquido",        "liquide",           "líquido",        "液态"),
    "fest":             ("solid",       "sólido",         "solide",            "sólido",         "固态"),
    "feucht":           ("moist",       "húmedo",         "humide",            "úmido",          "潮湿"),
    "10 % nass":        ("10 % wet",    "10 % húmedo",    "10 % mouillé",      "10 % molhado",   "10 % 湿"),
    "nass":             ("wet",         "húmedo",         "mouillé",           "molhado",        "湿"),
    "konz.":            ("conc.",       "conc.",          "conc.",             "conc.",          "浓"),
    "alkoholisch":      ("alcoholic",   "alcohólico",     "alcoolique",        "alcoólico",      "醇溶液"),
    "wasserfrei":       ("anhydrous",   "anhidro",        "anhydre",           "anidro",         "无水"),
}
QUAL_IDX = {"en": 0, "es": 1, "fr": 2, "pt": 3, "zh": 4}


# Wording this script itself emitted before, kept so a re-run converges on the
# current table instead of leaving the older phrasing in place.
LEGACY_QUALIFIERS = {
    "es": [("(puro técnico)", "(téc. puro)")],
    "pt": [("(puro técnico)", "(téc. puro)")],
}


def qualifier_rules(lang):
    """(from, to) pairs for the parenthesised German qualifiers, for one language."""
    if lang == "de":
        return []
    i = QUAL_IDX[lang]
    # Longest first so "wässrige Lösung" wins over "wässrig".
    return ([(f"({de})", f"({tr[i]})")
             for de, tr in sorted(QUALIFIERS.items(), key=lambda kv: -len(kv[0]))]
            + LEGACY_QUALIFIERS.get(lang, []))


# Some names carry a strength in front of the qualifier: "(1 % wässrig)".
_QUAL_ALT = "|".join(re.escape(k) for k in sorted(QUALIFIERS, key=len, reverse=True))
COMPOUND_QUALIFIER_RE = re.compile(rf"\((\d+(?:[-–]\d+)?\s*%)\s+({_QUAL_ALT})\)")


def compound_qualifier_rules(lang):
    if lang == "de":
        return []
    i = QUAL_IDX[lang]
    return [(COMPOUND_QUALIFIER_RE,
             lambda m, i=i: f"({m.group(1)} {QUALIFIERS[m.group(2)][i]})")]


# translateConc() on the material pages renders the German concentration terms
# from the source data at runtime; on the localized pages it was still emitting
# English. These are the map's values, per language.
CONC_TERMS = {
    #  German key       en                 de                es               fr                    pt               zh
    "wässrig":       ("Aqueous",         "Wässrig",        "Acuoso",        "Aqueux",             "Aquoso",        "水溶液"),
    "gesättigt":     ("Saturated",       "Gesättigt",      "Saturado",      "Saturé",             "Saturado",      "饱和"),
    "verdünnt":      ("Diluted",         "Verdünnt",       "Diluido",       "Dilué",              "Diluído",       "稀释"),
    "konz.":         ("Concentrated",    "Konzentriert",   "Concentrado",   "Concentré",          "Concentrado",   "浓"),
    "konzentriert":  ("Concentrated",    "Konzentriert",   "Concentrado",   "Concentré",          "Concentrado",   "浓"),
    "rein":          ("Pure",            "Rein",           "Puro",          "Pur",                "Puro",          "纯"),
    "techn. rein":   ("Technical Grade", "Technisch rein", "Grado técnico", "Qualité technique",  "Grau técnico",  "工业纯"),
    "jede":          ("Any",             "Jede",           "Cualquiera",    "Toute",              "Qualquer",      "任意"),
    "gering":        ("Low",             "Gering",         "Bajo",          "Faible",             "Baixo",         "低"),
    "flüssig":       ("Liquid",          "Flüssig",        "Líquido",       "Liquide",            "Líquido",       "液态"),
    "gasförmig":     ("Gaseous",         "Gasförmig",      "Gaseoso",       "Gazeux",             "Gasoso",        "气态"),
    "geschmolzen":   ("Molten",          "Geschmolzen",    "Fundido",       "Fondu",              "Fundido",       "熔融"),
    "trocken":       ("Dry",             "Trocken",        "Seco",          "Sec",                "Seco",          "干燥"),
    "feucht":        ("Wet/Moist",       "Feucht",         "Húmedo",        "Humide",             "Húmido",        "潮湿"),
    "fest":          ("Solid",           "Fest",           "Sólido",        "Solide",             "Sólido",        "固态"),
}
CONC_IDX = {"en": 0, "de": 1, "es": 2, "fr": 3, "pt": 4, "zh": 5}


def conc_map_rules(lang):
    i = CONC_IDX[lang]
    return [(f"'{de}': '{tr[0]}'", f"'{de}': '{tr[i]}'")
            for de, tr in CONC_TERMS.items() if tr[i] != tr[0]]


# --------------------------------------------------------------------------
# All languages: English UI strings left on the localized pages
# --------------------------------------------------------------------------

UI_STRINGS = {
    "Data sourced from manufacturer specifications. Always verify with your supplier.": {
        "de": "Daten aus Herstellerangaben. Bitte immer beim Lieferanten prüfen.",
        "es": "Datos procedentes de las especificaciones del fabricante. Verifique siempre con su proveedor.",
        "fr": "Données issues des spécifications des fabricants. Vérifiez toujours auprès de votre fournisseur.",
        "pt": "Dados provenientes das especificações do fabricante. Verifique sempre com o seu fornecedor.",
        "zh": "数据来源于制造商规格说明。请务必与供应商核实。",
    },
    "Free chemical compatibility database": {
        "de": "Kostenlose Datenbank für Chemikalienbeständigkeit",
        "es": "Base de datos gratuita de compatibilidad química",
        "fr": "Base de données gratuite de compatibilité chimique",
        "pt": "Base de dados gratuita de compatibilidade química",
        "zh": "免费化学品兼容性数据库",
    },
    "Rating filter": {
        "de": "Nach Bewertung filtern",
        "es": "Filtrar por calificación",
        "fr": "Filtrer par note",
        "pt": "Filtrar por classificação",
        "zh": "按评级筛选",
    },
    "Chemical resistance and compatibility guide": {
        "de": "Leitfaden für Chemikalienbeständigkeit und Kompatibilität",
        "es": "Guía de resistencia y compatibilidad química",
        "fr": "Guide de résistance et de compatibilité chimique",
        "pt": "Guia de resistência e compatibilidade química",
        "zh": "化学品耐受性与兼容性指南",
    },
    "Browse chemical resistance charts for 24 materials.": {
        "de": "Beständigkeitstabellen für 24 Werkstoffe durchsuchen.",
        "es": "Consulte las tablas de resistencia química de 24 materiales.",
        "fr": "Parcourez les tableaux de résistance chimique de 24 matériaux.",
        "pt": "Consulte as tabelas de resistência química de 24 materiais.",
        "zh": "浏览 24 种材料的化学品耐受性数据表。",
    },
    "Redirecting to ": {
        "de": "Weiterleitung zu ",
        "es": "Redirigiendo a ",
        "fr": "Redirection vers ",
        "pt": "A redirecionar para ",
        "zh": "正在跳转至 ",
    },
    "Redirecting...": {
        "de": "Weiterleitung …",
        "es": "Redirigiendo…",
        "fr": "Redirection…",
        "pt": "A redirecionar…",
        "zh": "正在跳转…",
    },
    "Load more chemicals": {
        "de": "Weitere Chemikalien laden",
        "es": "Cargar más productos químicos",
        "fr": "Charger plus de produits chimiques",
        "pt": "Carregar mais produtos químicos",
        "zh": "加载更多化学品",
    },
    "Free to use": {
        "de": "Kostenlos nutzbar",
        "es": "Uso gratuito",
        "fr": "Utilisation gratuite",
        "pt": "Utilização gratuita",
        "zh": "免费使用",
    },
    "Chemical resistance data based on": {
        "de": "Beständigkeitsdaten basieren auf",
        "es": "Datos de resistencia química basados en",
        "fr": "Données de résistance chimique basées sur",
        "pt": "Dados de resistência química baseados em",
        "zh": "化学品耐受性数据来源于",
    },
}


def ui_rules(lang):
    # "Redirecting..." must be tried before "Redirecting to " never matches it,
    # but "Redirecting to " is a prefix-free string, so plain longest-first works.
    return [(en, tr[lang]) for en, tr in
            sorted(UI_STRINGS.items(), key=lambda kv: -len(kv[0]))
            if lang in tr]


# --------------------------------------------------------------------------
# Driver
# --------------------------------------------------------------------------

def build_plan():
    """{lang: (literal_pairs, regex_pairs)} plus an 'en' entry."""
    plan = {}
    for lang in LANGS:
        lit = list({"fr": FR_LITERAL, "pt": PT_LITERAL, "zh": ZH_LITERAL,
                    "es": ES_LITERAL, "de": DE_LITERAL}[lang])
        rex = list({"fr": FR_REGEX, "pt": PT_REGEX, "zh": ZH_REGEX}.get(lang, []))
        lit += qualifier_rules(lang)
        lit += conc_map_rules(lang)
        lit += ui_rules(lang)
        rex += compound_qualifier_rules(lang)
        plan[lang] = (lit, rex)
    plan["en"] = (list(EN_LITERAL) + qualifier_rules("en"),
                  compound_qualifier_rules("en"))
    for lang in LANGS:
        plan[lang][1].extend(mpt.extra_rules(lang))
    return plan


# --------------------------------------------------------------------------
# ZH: JSON-LD WebPage "name" left in Portuguese on the material pages
# --------------------------------------------------------------------------

_CJK = re.compile(r"[\u4e00-\u9fff]")
_TITLE = re.compile(r"<title>([^<]*)</title>")
_LD_NAME = re.compile(r'(<script type="application/ld\+json">\{"@context": "https://schema\.org", '
                      r'"@type": "WebPage", "name": ")([^"]*)(")')


def fix_zh_jsonld_name(text):
    """Point the WebPage name at the page's own (Chinese) <title>."""
    m = _TITLE.search(text)
    if not m:
        return text
    title = m.group(1).strip()
    if not _CJK.search(title):
        return text

    def repl(mm):
        if _CJK.search(mm.group(2)):
            return mm.group(0)
        return mm.group(1) + json.dumps(title, ensure_ascii=True)[1:-1] + mm.group(3)

    return _LD_NAME.sub(repl, text)


def apply_rules(text, literals, regexes):
    for old, new in literals:
        if old in text:
            text = text.replace(old, new)
    for pat, rep in regexes:
        text = pat.sub(rep, text)
    return text


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true",
                    help="report what would change without writing")
    args = ap.parse_args()

    plan = build_plan()
    total_files = 0
    changed_files = 0
    per_lang = {}

    for lang, (literals, regexes) in plan.items():
        files = english_files() if lang == "en" else files_for(lang)
        mat_rules = [] if lang == "en" else mpt.rules_for(lang)
        mat_paths = set() if lang == "en" else set(material_files(lang))
        n_seen = n_changed = 0
        for path in files:
            n_seen += 1
            total_files += 1
            with open(path, encoding="utf-8") as fh:
                original = fh.read()
            updated = apply_rules(original, literals, regexes)
            if path in mat_paths:
                updated = apply_rules(updated, [], mat_rules)
                if lang == "zh":
                    updated = fix_zh_jsonld_name(updated)
            if updated != original:
                n_changed += 1
                changed_files += 1
                if not args.check:
                    with open(path, "w", encoding="utf-8") as fh:
                        fh.write(updated)
        per_lang[lang] = (n_seen, n_changed)

    verb = "would change" if args.check else "changed"
    for lang in sorted(per_lang):
        seen, ch = per_lang[lang]
        print(f"  {lang}: {ch:>6} / {seen:>6} files {verb}")
    print(f"total: {changed_files} / {total_files} files {verb}")
    return 1 if (args.check and changed_files) else 0


if __name__ == "__main__":
    sys.exit(main())
