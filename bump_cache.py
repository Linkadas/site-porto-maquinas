import os
import re
import glob

html_files = glob.glob('*.html')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Bump CSS version: e.g., index.css?v=3 to index.css?v=4, maquinas-premium.css?v=2 to ?v=4
    # We will just replace any ?v=\d+ with ?v=5 for all CSS files
    new_content = re.sub(r'\.css\?v=\d+', '.css?v=5', content)
    
    # Also add ?v=5 to files that don't have it (but only the ones we just touched, like colors.css)
    new_content = re.sub(r'colors\.css"', 'colors.css?v=5"', new_content)

    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated cache buster in {file}")
