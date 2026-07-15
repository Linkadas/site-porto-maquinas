$baseDir = "c:\Users\LincolnAsaga\.gemini\antigravity\scratch\site-porto-maquinas-main\SITE PORTO MAQUINAS"
$jsonFile = Join-Path $baseDir "prompts\maquinas_porto_catalogo.json"
$htmlFile = Join-Path $baseDir "maquinas.html"

$json = Get-Content -Raw -Encoding UTF8 $jsonFile | ConvertFrom-Json
$maquinas = $json.maquinas

$imagesDir = Join-Path $baseDir "products"
$images = Get-ChildItem -Path $imagesDir -Filter "*.jpg"

Function Get-ImagePath ($pdfPage) {
    foreach ($img in $images) {
        if ($img.Name -match "^0?$pdfPage-") {
            return "./products/" + $img.Name
        }
    }
    return "./products/pagina_$pdfPage.webp"
}

$categorias = [ordered]@{
    "Amassadeiras" = @()
    "Formadoras de PÃ£o de Queijo" = @()
    "Linhas de ProduÃ§Ã£o" = @()
    "MÃ¡quinas para Pizza" = @()
    "MÃ¡quinas para PastÃ©is e Assados" = @()
    "Equipamentos para Queijo" = @()
    "Dosadoras" = @()
    "Envasadoras" = @()
    "Batedeiras" = @()
    "AcessÃ³rios" = @()
    "Fornos" = @()
    "Equipamentos Gerais" = @()
}

$oldMachines = @(
    @{ id="prod-01"; name="Forno TÃºnel"; cat="Fornos"; price="85000.00"; image="./products/forno-tunel.webp"; desc="Ideal para produÃ§Ãµes contÃ­nuas, com excelente aproveitamento tÃ©rmico, durabilidade e baixo consumo."; lis="<li>GÃ¡s</li><li>ElÃ©trico</li><li>Lenha</li>" },
    @{ id="prod-02"; name="Fornos Rotativos"; cat="Fornos"; price="42000.00"; image="./products/fornos-rotativos.webp"; desc="Modelos THOR e de 1 a 6 carros, com aquecimento rÃ¡pido e padrÃ£o uniforme de assamento."; lis="<li>Inox</li><li>1 a 6 carros</li><li>EletrogÃ¡s</li>" },
    @{ id="prod-03"; name="Fornos Lastro"; cat="Fornos"; price="28500.00"; image="./products/fornos-lastro.webp"; desc="CÃ¢maras independentes com controle de lastro e teto para assar produtos diferentes simultaneamente."; lis="<li>1 a 4 cÃ¢maras</li><li>CiclotÃ©rmico</li><li>Pellets</li>" },
    @{ id="prod-04"; name="Amassadeiras"; cat="Amassadeiras"; price="12800.00"; image="./products/amassadeiras.webp"; desc="Misturam e cilindram a massa com homogeneidade, controle digital, duas velocidades e temporizador."; lis="<li>25 a 240 kg</li><li>Linha branca</li><li>Premium</li>" },
    @{ id="prod-05"; name="Cilindros"; cat="Equipamentos Gerais"; price="9400.00"; image="./products/cilindros.webp"; desc="Indicados para sovar e homogeneizar massas, com modelos manuais ou semiautomÃ¡ticos."; lis="<li>Manual</li><li>Semiauto</li><li>Inox</li>" },
    @{ id="prod-06"; name="Modeladoras"; cat="Equipamentos Gerais"; price="7200.00"; image="./products/modeladoras.webp"; desc="Recomendadas para modelar vÃ¡rios tipos e tamanhos de pÃ£es, com estrutura total em aÃ§o inox."; lis="<li>10 a 600 g</li><li>Alongador</li><li>Inox</li>" },
    @{ id="prod-07"; name="Divisora VolumÃ©trica"; cat="Equipamentos Gerais"; price="14500.00"; image="./products/divisora-volumetrica.webp"; desc="Divide e corta massas para vÃ¡rios tamanhos de pÃ£es por meio de trÃªs canais."; lis="<li>Manual</li><li>ElÃ©trica</li><li>3 canais</li>" },
    @{ id="prod-08"; name="Boleadeira"; cat="Equipamentos Gerais"; price="11200.00"; image="./products/boleadeira.webp"; desc="Permite dividir e bolear massas em partes iguais, com ajuste para porÃ§Ãµes de 25 g atÃ© 90 g."; lis="<li>AtÃ© 30 un.</li><li>25 a 90 g</li><li>PadrÃ£o</li>" },
    @{ id="prod-09"; name="Laminadora"; cat="Equipamentos Gerais"; price="18900.00"; image="./products/laminadora.webp"; desc="Indicada para laminar massas, massas folhadas e croissants, com largura Ãºtil de 500 mm."; lis="<li>500 mm</li><li>Croissant</li><li>Folhadas</li>" },
    @{ id="prod-10"; name="Batedeiras"; cat="Batedeiras"; price="6800.00"; image="./products/batedeiras.webp"; desc="Para confeitaria, massas leves e lÃ­quidas, com controle digital de 10 velocidades."; lis="<li>10 velocidades</li><li>Globo</li><li>Gancho</li>" },
    @{ id="prod-11"; name="Fatiadeiras"; cat="Equipamentos Gerais"; price="5400.00"; image="./products/fatiadeiras.webp"; desc="Fatiam pÃ£es de massa macia em espessuras de 12 mm e 14 mm."; lis="<li>12 mm</li><li>14 mm</li><li>PÃ£es</li>" },
    @{ id="prod-12"; name="Moinho"; cat="Equipamentos Gerais"; price="3900.00"; image="./products/moinho.webp"; desc="Utilizado na produÃ§Ã£o de farinha de rosca, ralando e triturando pÃ£es torrados."; lis="<li>Farinha</li><li>Rosca</li><li>TrituraÃ§Ã£o</li>" }
)

foreach ($o in $oldMachines) {
    $html = @"
                    <article class="product-card" data-id="$($o.id)" data-name="$($o.name)" data-category="$($o.cat)" data-price="$($o.price)" data-image="$($o.image)">
                        <div class="product-visual"><span>$($o.id.Replace('prod-',''))</span><img src="$($o.image)" alt="$($o.name)"/><i>SUPREMAX</i></div>
                        <div class="product-content">
                            <h3>$($o.name)</h3>
                            <p>$($o.desc)</p>
                            <ul>$($o.lis)</ul>
                            <button class="add-to-cart-btn">Adicionar ao orÃ§amento</button>
                        </div>
                    </article>
"@
    $categorias[$o.cat] += $html
}

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
    
    $imagePath = Get-ImagePath $m.pagina_pdf
    
    $modelsHtml = ""
    $searchModels = ""
    if ($m.modelos.Count -gt 0) {
        $modelNames = @()
        foreach ($mod in $m.modelos) {
            if ($mod.modelo) {
                $modelNames += $mod.modelo
            }
        }
        if ($modelNames.Count -gt 0) {
            $modelsString = $modelNames -join ", "
            $modelsHtml = "<p><strong>Modelos:</strong> $modelsString</p>"
            $searchModels = $modelsString
        }
    }
    
    $cat = $m.categoria
    if (-not $categorias.Contains($cat)) {
        if ($cat -eq "Cilindros e Laminadores") { $cat = "Equipamentos Gerais" }
        elseif ($cat -eq "Boleadoras") { $cat = "Equipamentos Gerais" }
        elseif ($cat -eq "Recheadoras") { $cat = "MÃ¡quinas para PastÃ©is e Assados" }
        elseif ($cat -eq "Dosadoras e Envasadoras") { $cat = "Dosadoras" }
        elseif ($cat -eq "Aplicadores de Calda" -or $cat -eq "Aplicadores de Antimofo") { $cat = "AcessÃ³rios" }
        elseif ($cat -eq "AcessÃ³rios e MovimentaÃ§Ã£o" -or $cat -eq "AcessÃ³rios e Carrinhos") { $cat = "AcessÃ³rios" }
        else { $categorias[$cat] = @() }
    }
    
    $itemHtml = @"
                    <article class="product-card" data-id="prod-$idCounter" data-name="$($m.nome)" data-category="$cat" data-models="$searchModels" data-price="0.00" data-image="$imagePath">
                        <div class="product-visual"><span>$idCounter</span><img src="$imagePath" alt="$($m.nome)"/><i>CATÃLOGO</i></div>
                        <div class="product-content">
                            <h3>$($m.nome)</h3>
                            $modelsHtml
                            <p>$($m.descricao)</p>
                            <ul>$lis</ul>
                            <button class="add-to-cart-btn">Adicionar ao orÃ§amento</button>
                        </div>
                    </article>
"@
    
    if (-not $categorias.Contains($cat)) {
        $categorias[$cat] = @()
    }
    $categorias[$cat] += $itemHtml
    $idCounter++
}

$newGridHtml = ""
foreach ($cat in $categorias.Keys) {
    if ($categorias[$cat].Count -gt 0) {
        $newGridHtml += "`n                    <div class=`"category-section`" data-category=`"$cat`">`n"
        $newGridHtml += "                        <h3 class=`"category-title`">$cat</h3>`n"
        $newGridHtml += "                        <div class=`"product-grid`" style=`"display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem;`">`n"
        foreach ($art in $categorias[$cat]) {
            $newGridHtml += $art
        }
        $newGridHtml += "                        </div>`n"
        $newGridHtml += "                    </div>`n"
    }
}

$htmlContent = Get-Content $htmlFile -Raw -Encoding UTF8

$htmlContent = [regex]::Replace($htmlContent, '(?s)<div class="product-grid">.*?(</div>\s*</div>\s*</section>)', $newGridHtml + '$1')

$style = @"
    <style>
        .category-title {
            width: 100%;
            margin-top: 40px;
            margin-bottom: 20px;
            border-bottom: 2px solid #eaeaea;
            padding-bottom: 10px;
            font-size: 1.5rem;
            color: #333;
        }
    </style>
</head>
"@
$htmlContent = $htmlContent -replace "</head>", $style

Set-Content -Path $htmlFile -Value $htmlContent -Encoding UTF8
Write-Host "Grouped HTML generated successfully."

