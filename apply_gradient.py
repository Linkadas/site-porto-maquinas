import re

with open('css/index.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace .content-section background and add color: white
pattern = r'\.content-section\s*\{\s*background:\s*#[0-9a-fA-F]+;\s*/\*[^*]*\*/\s*padding:\s*100px\s*0;\s*\}'

replacement = """\.content-section {
  background: linear-gradient(135deg, #111827 0%, #1f2937 50%, rgba(163,0,0,0.8) 100%);
  padding: 100px 0;
  color: var(--white);
}

.content-section h2, 
.content-section p.eyebrow, 
.content-section .section-head p {
  color: var(--white);
}"""

# Actually, the regex needs to match the exact current block:
# .content-section {
#   background: #f1f5f9; /* Slate 100 - Professional and clean */
#   padding: 100px 0;
# }
new_content = re.sub(
    r'\.content-section\s*\{\s*background:\s*#[a-f0-9]+;\s*/\*.*?\*/\s*padding:\s*100px\s*0;\s*\}',
    replacement.replace('\\.', '.'),
    content
)

if new_content != content:
    with open('css/index.css', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Updated content-section to hero gradient.")
else:
    print("Regex failed. Let's do it manually.")
    
