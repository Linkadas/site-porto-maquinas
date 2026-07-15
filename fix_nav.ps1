$baseDir = "c:\Users\LincolnAsaga\.gemini\antigravity\scratch\site-porto-maquinas-main\SITE PORTO MAQUINAS"
$oldFile = Join-Path $baseDir "produtos.html"
$newFile = Join-Path $baseDir "maquinas.html"

if (Test-Path $oldFile) {
    Rename-Item -Path $oldFile -NewName "maquinas.html"
}

Get-ChildItem -Path $baseDir -Filter *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    $content = $content -replace 'href="produtos.html"', 'href="maquinas.html"'
    $content = $content -replace '>Produtos</a>', '>Máquinas</a>'
    
    if ($_.Name -eq "maquinas.html" -or $_.Name -eq "produtos.html") {
        $content = $content -replace '<title>Produtos Industriais', '<title>Máquinas Industriais'
        $content = $content -replace '<p class="eyebrow">Produtos</p>', '<p class="eyebrow">Máquinas</p>'
        $content = $content -replace 'Adicionar ao carrinho 🛒', 'Adicionar ao orçamento'
    }
    
    Set-Content -Path $_.FullName -Value $content -Encoding UTF8
}
