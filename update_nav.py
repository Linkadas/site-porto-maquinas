import json
import os
import re

base_dir = r'c:\Users\LincolnAsaga\.gemini\antigravity\scratch\site-porto-maquinas-main\SITE PORTO MAQUINAS'

# 1. Rename produtos.html to maquinas.html
old_file = os.path.join(base_dir, 'produtos.html')
new_file = os.path.join(base_dir, 'maquinas.html')
if os.path.exists(old_file):
    os.rename(old_file, new_file)

# 2. Update nav in all html files
for filename in os.listdir(base_dir):
    if filename.endswith('.html'):
        filepath = os.path.join(base_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # update href
        content = content.replace('href=\"produtos.html\"', 'href=\"maquinas.html\"')
        # update nav text
        content = re.sub(r'>Produtos</a>', '>Máquinas</a>', content)
        
        if filename == 'maquinas.html' or filename == 'produtos.html':
            content = content.replace('<title>Produtos Industriais', '<title>Máquinas Industriais')
            content = content.replace('<p class=\"eyebrow\">Produtos</p>', '<p class=\"eyebrow\">Máquinas</p>')
            # Update button texts in existing items
            content = content.replace('Adicionar ao carrinho 🛒', 'Adicionar ao orçamento')

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print('Updated HTML files.')
