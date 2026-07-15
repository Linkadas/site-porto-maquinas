$baseDir = "c:\Users\LincolnAsaga\.gemini\antigravity\scratch\site-porto-maquinas-main\SITE PORTO MAQUINAS"
$jsonFile = Join-Path $baseDir "prompts\maquinas_porto_catalogo.json"
$htmlFile = Join-Path $baseDir "maquinas.html"

$json = Get-Content -Raw -Encoding UTF8 $jsonFile | ConvertFrom-Json
$maquinas = $json.maquinas

$htmlContent = Get-Content $htmlFile -Raw -Encoding UTF8

$newItemsHtml = ""
$idCounter = 13

foreach ($m in $maquinas) {
    $lis = ""
    $count = 0
    foreach ($car in $m.caracteristicas) {
        if ($count -lt 3) {
            $lis += "<li>$car</li>"
            $count++
        }
    }
    
    $imagePath = "./products/pagina_" + $m.pagina_pdf + ".webp"
    
    $itemHtml = @"
                    <article class="product-card" data-id="prod-$idCounter" data-name="$($m.nome)" data-price="0.00" data-image="$imagePath">
                        <div class="product-visual"><span>$idCounter</span><img src="$imagePath" alt="$($m.nome)"/><i>CATÁLOGO</i></div>
                        <div class="product-content">
                            <h3>$($m.nome)</h3>
                            <p>$($m.descricao)</p>
                            <ul>$lis</ul>
                            <button class="add-to-cart-btn">Adicionar ao orçamento</button>
                        </div>
                    </article>

"@
    $newItemsHtml += $itemHtml
    $idCounter++
}

$replacement = "${1}$newItemsHtml${2}"
$htmlContent = [regex]::Replace($htmlContent, "(?s)(</article>\s*)(</div>\s*</div>\s*</section>)", $replacement)

Set-Content -Path $htmlFile -Value $htmlContent -Encoding UTF8
Write-Host "Injected new items successfully."
