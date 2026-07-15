$baseDir = "c:\Users\LincolnAsaga\.gemini\antigravity\scratch\site-porto-maquinas-main\SITE PORTO MAQUINAS"
$content = Get-Content (Join-Path $baseDir "maquinas.html") -Raw -Encoding UTF8
$content = $content -replace 'href="produtos.html"', 'href="maquinas.html"'
$content = $content -replace '>Produtos</a>', '>Máquinas</a>'
$content = $content -replace '<title>Produtos Industriais', '<title>Máquinas Industriais'
$content = $content -replace '<p class="eyebrow">Produtos</p>', '<p class="eyebrow">Máquinas</p>'
$content = $content -replace 'Adicionar ao carrinho 🛒', 'Adicionar ao orçamento'
Set-Content -Path (Join-Path $baseDir "maquinas.html") -Value $content -Encoding UTF8
