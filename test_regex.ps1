$html = Get-Content 'c:\Users\LincolnAsaga\.gemini\antigravity\scratch\site-porto-maquinas-main\SITE PORTO MAQUINAS\maquinas.html' -Raw -Encoding UTF8

if ($html -match '(?s)(<div class="product-grid">.*?)</div>\s*</div>\s*</section>') {
    Write-Host "Found product-grid"
}
