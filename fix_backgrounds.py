import re

with open('css/index.css', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Revert .content-section back to the slate grey #f1f5f9
content_section_pattern = r'\.content-section\s*\{[^}]*\}'
content_section_replacement = """.content-section {
  background: #f1f5f9; /* Slate 100 - Professional and clean */
  padding: 100px 0;
}"""
content = re.sub(content_section_pattern, content_section_replacement, content)

# Also remove the forced white text rule for content-section that I added earlier
white_text_pattern = r'\.content-section\s*h2,\s*\n?\.content-section\s*p\.eyebrow,\s*\n?\.content-section\s*\.section-head\s*p\s*\{\s*\n?\s*color:\s*var\(--white\);\s*\n?\}'
content = re.sub(white_text_pattern, '', content)


# 2. Update .contact-section to match .hero
contact_section_pattern = r'\.contact-section\s*\{\s*\n?\s*color:\s*var\(--white\);\s*\n?\s*background:\s*radial-gradient[^;]+;\s*\n?\s*padding:\s*100px\s*0;\s*\n?\}'
contact_section_replacement = """.contact-section {
  color: var(--white);
  background-image: linear-gradient(135deg, rgba(17,24,39,0.92) 0%, rgba(31,41,55,0.85) 50%, rgba(163,0,0,0.6) 100%), url(../products/forno-tunel.webp);
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  padding: 100px 0;
}"""
content = re.sub(contact_section_pattern, contact_section_replacement, content)

with open('css/index.css', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated CSS.")
