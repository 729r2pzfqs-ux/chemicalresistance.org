#!/usr/bin/env python3
"""
Generate Chinese (ZH) versions of all material and chemical pages for chemicalresistance.org.
Copies PT pages to ZH equivalents, then performs comprehensive text replacements.
"""

import os
import re
import shutil
import time

BASE_DIR = "/tmp/cr-guide"

# ============================================================
# EXACT string replacements (safe — these strings are unique enough
# that they won't appear as substrings of English/CSS words)
# ORDER MATTERS: longer/more specific first
# ============================================================

EXACT_REPLACEMENTS = [
    # --- Language attribute (html tag only, not hreflang) ---
    ('<html lang="pt">', '<html lang="zh">'),

    # --- JSON-LD inLanguage ---
    ('"inLanguage": "pt"', '"inLanguage": "zh"'),

    # --- OG locale ---
    ('"pt_BR"', '"zh_CN"'),

    # --- Navigation links: /pt/ → /zh/ ---
    ('/materials/pt/', '/materials/zh/'),
    ('/chemicals/pt/', '/chemicals/zh/'),
    ('chemicalresistance.org/materials/pt/', 'chemicalresistance.org/materials/zh/'),
    ('chemicalresistance.org/chemicals/pt/', 'chemicalresistance.org/chemicals/zh/'),
    ('chemicalresistance.org/pt/', 'chemicalresistance.org/zh/'),

    # Navigation href patterns (careful — only replace /pt/ in href context)
    ('href="/pt/', 'href="/zh/'),
    ("href='/pt/", "href='/zh/"),

    # JS redirect
    ("'/' + lang + '/'", "'/' + lang + '/'"),  # No change needed, this is dynamic

    # --- Long Portuguese phrases first ---
    ('Banco de dados de resistência química', '化学品耐受性数据库'),
    ('Tabela de Resistência Química', '化学品耐受性数据表'),
    ('Tabela de resistência química', '化学品耐受性数据表'),
    ('Tabela de Compatibilidade Química', '化学品兼容性数据表'),
    ('Tabelas de Resistência de Materiais', '材料耐受性数据表'),
    ('Compatibilidade de armazenamento', '存储兼容性'),
    ('Compatibilidade de Armazenamento', '存储兼容性'),
    ('Comparar materiais', '材料对比'),
    ('Gráficos comparativos', '对比图表'),
    ('Todos os materiais', '所有材料'),
    ('Todos os Materiais', '所有材料'),
    ('Todos os produtos químicos', '所有化学品'),
    ('Todos os Produtos Químicos', '所有化学品'),
    ('Tabela de resistência', '耐受性数据表'),
    ('Tabela de Resistência', '耐受性数据表'),
    ('Produtos Químicos', '化学品'),
    ('produtos químicos', '化学品'),
    ('Decodificador SDS', 'SDS解读器'),
    ('Decodificador FDS', 'SDS解读器'),
    ('Escolher idioma', '选择语言'),
    ('Resistência Química', '化学品耐受性'),
    ('resistência química', '化学品耐受性'),
    ('Excelente resistência', '优秀的耐受性'),
    ('Boa resistência', '良好的耐受性'),
    ('Resistência limitada', '有限的耐受性'),
    ('Não recomendado', '不推荐'),
    ('Escala de Avaliação', '评级标准'),
    ('Escala de classificação', '评级标准'),
    ('Excellent resistance', '优秀的耐受性'),
    ('Good resistance', '良好的耐受性'),
    ('Limited resistance', '有限的耐受性'),
    ('Not recommended', '不推荐'),
    ('Not Recommended (D)', '不推荐 (D)'),
    ('Excellent (A)', '优秀 (A)'),
    ('Good (B)', '良好 (B)'),
    ('Limited (C)', '有限 (C)'),

    # Navigation items (unique context)
    ('Materiais</a>', '材料</a>'),
    ('Materiais</div>', '材料</div>'),
    ('>Materiais<', '>材料<'),
    ('Viscosidade</a>', '粘度</a>'),
    ('Viscosidade</div>', '粘度</div>'),
    ('>Viscosidade<', '>粘度<'),
    ('Comparar</a>', '对比</a>'),
    ('>Comparar<', '>对比<'),
    ('Gráficos</a>', '图表</a>'),
    ('>Gráficos<', '>图表<'),
    ('Armazenamento</a>', '存储</a>'),
    ('>Armazenamento<', '>存储<'),
    ('Sobre</a>', '关于</a>'),
    ('>Sobre<', '>关于<'),
    ('Início</a>', '首页</a>'),
    ('>Início<', '>首页<'),

    # Rating words in specific HTML contexts
    ('> Excelente<', '> 优秀<'),
    ('>Excelente<', '>优秀<'),
    ('> Aceitável<', '> 一般<'),
    ('>Aceitável<', '>一般<'),
    ('Sem dados', '无数据'),

    # Químicos Testados
    ('Químicos Testados', '种化学品已测试'),
    ('Químicos testados', '种化学品已测试'),

    # Table headers and search
    ('Pesquisar químicos...', '搜索化学品...'),
    ('Pesquisar materiais...', '搜索材料...'),
    ('placeholder="Pesquisar', 'placeholder="搜索'),
    ('placeholder="Buscar', 'placeholder="搜索'),
    ('Ver tabela completa', '查看完整表格'),
    ('Ver todos', '查看全部'),
    ('>Filtrar<', '>筛选<'),
    ('>Resultados<', '>结果<'),

    # Table header "Químico" (in th context)
    ('>Químico<', '>化学品<'),

    # FAQ section
    ('Perguntas Frequentes', '常见问题'),
    ('Quais materiais são resistentes a', '哪些材料能耐受'),
    ('Qual é o melhor material para o armazenamento de', '什么材料最适合储存'),
    ('Como ler a Classificação de resistência química?', '如何阅读化学品耐受性评级？'),
    ('A temperatura afeta a resistência a', '温度是否影响对'),
    ('De onde vêm os dados de compatibilidade para', '的兼容性数据来自哪里 -'),

    ('Nosso banco de dados inclui', '我们的数据库包含'),
    ('materiais testados com', '种材料经过测试'),
    ('incluindo', '包括'),
    ('e outros.', '及其他。'),
    ('As classificações vão de A (excelente resistência) a D (não recomendado).', '评级从A（优秀耐受性）到D（不推荐）。'),
    ('Clique em um material acima para ver a classificação específica a 20°C e 50°C.', '点击上方材料查看20°C和50°C下的具体评级。'),

    ('O melhor material depende da concentração, da temperatura e da duração da exposição.', '最佳材料取决于浓度、温度和暴露时间。'),
    ('O PTFE e os fluoropolímeros geralmente oferecem excelente resistência à maioria dos produtos químicos.', 'PTFE和氟聚合物通常对大多数化学品具有优秀的耐受性。'),
    ('Consulte as classificações individuais dos materiais acima para a compatibilidade de', '请参阅上方各材料的评级以了解'),
    ('nas suas condições específicas.', '在您特定条件下的兼容性。'),

    ('A = Excelente (totalmente resistente, recomendado para uso prolongado).', 'A = 优秀（完全耐受，推荐长期使用）。'),
    ('B = Bom (leve alteração possível, adequado para a maioria das aplicações).', 'B = 良好（可能有轻微变化，适用于大多数应用）。'),
    ('C = Aceitável (alguma degradação, uso apenas a curto prazo).', 'C = 一般（有一定降解，仅限短期使用）。'),
    ('D = Não recomendado (ataque significativo, não utilizar).', 'D = 不推荐（严重腐蚀，请勿使用）。'),
    ('Sempre verifique as classificações junto ao fabricante do seu equipamento.', '请务必与设备制造商核实评级。'),

    ('Sim. Classificação de resistência química podem entre 20°C e 50°C mudar significativamente.', '是的。化学品耐受性评级在20°C和50°C之间可能会有显著变化。'),
    ('Temperaturas mais elevadas geralmente reduzem a resistência dos materiais.', '较高的温度通常会降低材料的耐受性。'),
    ('Nossas tabelas mostram as classificações em ambas as temperaturas quando os dados estão disponíveis.', '我们的数据表会在数据可用时显示两个温度下的评级。'),

    ('Os dados de resistência química são baseados nas tabelas de compatibilidade completas da Bürkle GmbH (buerkle.de), um fabricante alemão com décadas de experiência em equipamentos para manuseio de produtos químicos.', '化学品耐受性数据基于Bürkle GmbH (buerkle.de) 的完整兼容性数据表，该公司是一家拥有数十年化学品处理设备经验的德国制造商。'),

    # Content section for chemical pages
    # NOTE: "Sobre a compatibilidade de {X}" is NOT handled here. A plain string
    # replacement cannot reorder the trailing chemical name, which produced the
    # dangling placeholder "关于…的兼容性 - {X}". It is handled by a reordering
    # regex in process_html() instead. Do not re-add an exact mapping for it.
    ('Pesquisar concentrações específicas', '查询特定浓度'),
    ('A escolha do material correto para o manuseio ou armazenamento de', '选择正确的材料来处理或储存'),
    ('é crucial para a segurança e durabilidade do equipamento.', '对于设备安全和耐久性至关重要。'),
    ('Um material inadequado pode causar falha do recipiente, vazamentos ou contaminação.', '不合适的材料可能导致容器故障、泄漏或污染。'),
    ('Nossa tabela de compatibilidade mostra as classificações de resistência para', '我们的兼容性数据表显示了'),
    ('frente a', '对'),
    ('testados a 20°C e 50°C.', '在20°C和50°C下测试。'),
    ('As classificações seguem a escala A-D:', '评级按A-D等级划分：'),
    ('A (excelente) significa que o material é totalmente resistente', 'A（优秀）意味着材料完全耐受'),
    ('e recomendado para uso prolongado, enquanto D significa que o material não deve ser utilizado.', '并推荐长期使用，而D意味着材料不应使用。'),
    ('Sempre considere suas condições específicas', '请务必考虑您的具体条件'),
    ('a concentração, a temperatura, a pressão e a duração da exposição podem afetar', '浓度、温度、压力和暴露时间都可能影响'),
    ('o desempenho do material.', '材料的性能。'),
    ('Em caso de dúvida, consulte o fabricante do seu equipamento ou realize testes.', '如有疑问，请咨询设备制造商或进行测试。'),

    # Chemical detail page translations
    ('Selecione um material para ver a classificação de resistência de', '选择材料查看'),
    ('Selecionar um material', '选择材料'),
    ('é resistente à', '能耐受'),
    ('é resistente a', '能耐受'),
    ('tem resistência', '的耐受性为'),
    ('Posso armazenar', '我可以将'),
    ('é classificado como', '被评为'),
    ('à temperatura ambiente.', '在室温下。'),

    # Title patterns
    ('Resistência de', '的耐受性 -'),
    ('resistência de', '的耐受性 -'),

    # Storage page specific
    ('Verificador de Compatibilidade de Armazenamento Químico', '化学品存储兼容性检查工具'),
    ('Verificador de Compatibilidade', '兼容性检查工具'),
    ('Podem ser armazenados juntos?', '能否一起存储？'),
    ('Verifique se os produtos químicos podem ser armazenados juntos com segurança', '检查化学品是否可以安全地存储在一起'),
    ('Ferramenta gratuita para verificar se os produtos químicos podem ser armazenados juntos com segurança', '免费工具，检查化学品是否可以安全地存储在一起'),
    ('Recomendações de armários conforme normas de segurança', '按安全标准的储存柜建议'),
    ('armazenamento químico', '化学品存储'),
    ('segregação química', '化学品隔离'),
    ('armazenamento de substâncias perigosas', '危险物质存储'),
    ('armário de segurança', '安全储存柜'),

    # SDS decoder page specific
    ('Ficha de Dados de Segurança Explicada', '安全数据表解读'),
    ('Ficha de Dados de Segurança', '安全数据表'),
    ('Ficha de Datos de Seguridad', '安全数据表'),
    ('EPI e Armazenamento', '个人防护装备与存储'),
    ('Ferramenta gratuita para decodificar', '免费工具用于解读'),
    ('Obtenha resumos claros dos perigos', '获取清晰的危险摘要'),
    ('requisitos de EPI', '个人防护装备要求'),
    ('diretrizes de armazenamento', '存储指南'),
    ('informações de transporte', '运输信息'),
    ('pictogramas GHS', 'GHS象形图'),
    ('perigos químicos', '化学品危险'),
    ('frases H', 'H短语'),
    ('Decodifique', '解读'),

    # Meta description patterns
    ('Encontre os melhores materiais para o armazenamento de', '找到最佳储存材料 -'),
    ('Classificação de resistência química para', '化学品耐受性评级：'),
    ('e mais de', '及超过'),
    ('outros materiais.', '种其他材料。'),
    ('outros materiais', '种其他材料'),

    # Classificação in specific contexts
    ('Classificação:', '评级：'),
    ('classificação de resistência', '耐受性评级'),
    ('classificação específica', '具体评级'),
    ('classificações de resistência', '耐受性评级'),
    ('classificações individuais', '各项评级'),
    ('classificações', '评级'),
    ('Classificação', '评级'),

    # Excelente / Bom in rating context (after longer phrases consumed)
    ('> Excelente ', '> 优秀 '),
    ('> Bom ', '> 良好 '),
    (') Excelente', ') 优秀'),
    (') Bom', ') 良好'),
    (') Aceitável', ') 一般'),
    ('Excelente a ', '优秀（'),
    ('Aceitável a ', '一般（'),

    # "chemicals tested" badge
    ('chemicals tested', '种化学品已测试'),
]

# ============================================================
# REGEX-based replacements for short words that could appear
# as substrings of English words. These use word boundaries.
# ============================================================

REGEX_REPLACEMENTS = [
    # Portuguese "Sobre" as standalone word (nav items already handled above)
    # "Classificação" standalone
    # "temperatura" standalone
    # "Resultados" standalone
    # "Buscar" standalone
    # "Pesquisar" standalone
    # "Filtrar" standalone
    # "Químico" standalone
]


def process_html(content):
    """Apply all text replacements to HTML content."""

    # 0. Reordering replacements. Chinese puts the possessor before 的, so
    #    "Sobre a compatibilidade de {X}" becomes "{X}的兼容性". This must run
    #    before the exact replacements below, which would otherwise translate
    #    the Portuguese fragments piecemeal and strand the chemical name.
    content = re.sub(
        r'Sobre a compatibilidade de\s+([^<]+)',
        lambda m: f'{m.group(1).strip()}的兼容性',
        content
    )

    # 1. Apply all exact string replacements
    for old, new in EXACT_REPLACEMENTS:
        content = content.replace(old, new)

    # 2. Apply regex replacements for short Portuguese words
    for pattern, replacement in REGEX_REPLACEMENTS:
        content = re.sub(pattern, replacement, content)

    # 3. Language selector: deselect PT, select ZH
    content = content.replace('<option value="pt" selected>', '<option value="pt">')
    content = content.replace('<option value="zh">', '<option value="zh" selected>')

    # 4. Fix hreflang="pt" URLs: the path replacements above changed /pt/ to /zh/
    #    in hreflang="pt" URLs too, so restore them back to /pt/
    # Handle paths like /chemicals/zh/... -> /chemicals/pt/...
    # and /materials/zh/... -> /materials/pt/...
    # and /zh/... -> /pt/...
    content = re.sub(
        r'(hreflang="pt" href="https://chemicalresistance\.org)/zh/',
        r'\1/pt/',
        content
    )
    content = re.sub(
        r'(hreflang="pt" href="https://chemicalresistance\.org/(?:chemicals|materials))/zh/',
        r'\1/pt/',
        content
    )

    # 5. Add zh hreflang tag after the pt hreflang line (if not already present)
    if 'hreflang="zh"' not in content:
        # Find the last hreflang="pt" line
        m = re.search(
            r'(<link rel="alternate" hreflang="pt" href="(https://chemicalresistance\.org/[^"]*)">\s*\n?)',
            content
        )
        if m:
            full_match = m.group(1)
            pt_url = m.group(2)
            # Create zh URL by replacing /pt/ with /zh/ in the path
            zh_url = pt_url.replace('/pt/', '/zh/')
            zh_line = f'<link rel="alternate" hreflang="zh" href="{zh_url}">\n'
            content = content.replace(full_match, full_match + zh_line, 1)

    return content


def copy_and_process_tree(src_dir, dst_dir):
    """Recursively copy a directory tree and process all HTML files."""
    file_count = 0
    total_start = time.time()

    if os.path.exists(dst_dir):
        shutil.rmtree(dst_dir)
    shutil.copytree(src_dir, dst_dir)

    for root, dirs, files in os.walk(dst_dir):
        for fname in files:
            if fname.endswith('.html'):
                fpath = os.path.join(root, fname)
                with open(fpath, 'r', encoding='utf-8') as f:
                    content = f.read()

                new_content = process_html(content)

                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(new_content)

                file_count += 1

                if file_count % 500 == 0:
                    elapsed = time.time() - total_start
                    print(f"  Processed {file_count} files... ({elapsed:.1f}s)")

    return file_count


def main():
    start_time = time.time()
    total_files = 0

    # Process materials
    src = os.path.join(BASE_DIR, "materials", "pt")
    dst = os.path.join(BASE_DIR, "materials", "zh")
    print(f"Processing materials: {src} -> {dst}")
    count = copy_and_process_tree(src, dst)
    total_files += count
    print(f"  Materials done: {count} files")

    # Process chemicals
    src = os.path.join(BASE_DIR, "chemicals", "pt")
    dst = os.path.join(BASE_DIR, "chemicals", "zh")
    print(f"\nProcessing chemicals: {src} -> {dst}")
    count = copy_and_process_tree(src, dst)
    total_files += count
    print(f"  Chemicals done: {count} files")

    # Process storage-compatibility
    src = os.path.join(BASE_DIR, "pt", "storage-compatibility")
    dst = os.path.join(BASE_DIR, "zh", "storage-compatibility")
    if os.path.exists(src):
        print(f"\nProcessing storage-compatibility: {src} -> {dst}")
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        count = copy_and_process_tree(src, dst)
        total_files += count
        print(f"  Storage-compatibility done: {count} files")
    else:
        print(f"\nWARNING: {src} not found, skipping storage-compatibility")

    # Process sds-decoder
    src = os.path.join(BASE_DIR, "pt", "sds-decoder")
    dst = os.path.join(BASE_DIR, "zh", "sds-decoder")
    if os.path.exists(src):
        print(f"\nProcessing sds-decoder: {src} -> {dst}")
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        count = copy_and_process_tree(src, dst)
        total_files += count
        print(f"  SDS-decoder done: {count} files")
    else:
        print(f"\nWARNING: {src} not found, skipping sds-decoder")

    elapsed = time.time() - start_time
    print(f"\n{'='*60}")
    print(f"COMPLETE: {total_files} total ZH files generated in {elapsed:.1f}s")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
