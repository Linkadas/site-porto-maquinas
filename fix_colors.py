import os
import re
import glob

html_files = glob.glob('*.html')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the line that contains href="./css/index.css"
    # and insert the colors.css link just before it.
    
    if 'colors.css' not in content:
        # Regex to find the index.css link
        pattern = r'(<link\s+rel="stylesheet"\s+href="\./css/index\.css[^>]*>)'
        replacement = r'<link rel="stylesheet" href="./css/cores/colors.css">\n    \1'
        
        new_content = re.sub(pattern, replacement, content)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {file}")
    else:
        print(f"Already fixed {file}")
