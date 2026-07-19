import os
import re
import glob

html_files = glob.glob('*.html')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Append ?v=16 to any .css that does not already have a query parameter
    # Example: href="./css/index.css" -> href="./css/index.css?v=16"
    new_content = re.sub(r'\.css(["\'])', r'.css?v=16\1', content)
    
    # Also bump existing ?v=X to ?v=16
    new_content = re.sub(r'\.css\?v=\d+(["\'])', r'.css?v=16\1', new_content)

    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Forced full cache bust in {file}")
