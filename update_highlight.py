import os
import re

with open('css/index.css', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update .content-section background
# From:
# .content-section {
#   background: var(--paper);
#   padding: 100px 0;
# }
# To:
# .content-section {
#   background: #f3f4f6;
#   padding: 100px 0;
# }

content = re.sub(
    r'\.content-section\s*\{\s*background:\s*var\(--paper\);\s*padding:\s*100px\s*0;\s*\}',
    '.content-section {\n  background: #f3f4f6;\n  padding: 100px 0;\n}',
    content
)

# 2. Update .product-card shadow
# From:
# .product-card, .catalog-choice {
#   background: var(--white);
#   border-radius: var(--radius-md);
#   border: 1px solid var(--line);
#   box-shadow: var(--shadow-sm);
content = re.sub(
    r'border:\s*1px\s*solid\s*var\(--line\);\s*box-shadow:\s*var\(--shadow-sm\);',
    'border: none;\n  box-shadow: var(--shadow-md);',
    content
)

with open('css/index.css', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated card highlights and background.")
