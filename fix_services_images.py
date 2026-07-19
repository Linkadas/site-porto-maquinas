import os
import glob

files = glob.glob('*.html') + glob.glob('js/*.js')

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    original_content = content
    # The naive script replaced .webp with .png
    # Let's fix specific service images
    services_images = [
        "consultoria-comercial",
        "linha-completa",
        "orcamento-sob-medida",
        "suporte-na-escolha"
    ]
    
    for img in services_images:
        content = content.replace(f'{img}.png', f'{img}.webp')
    
    if content != original_content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed services images in {filepath}")

print("Done fixing services images")
