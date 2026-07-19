import os

with open('maquinas.html', 'r', encoding='utf-8') as f:
    content = f.read()

start_tag = '<div id="raw-products-source" style="display: none;">'
start_idx = content.find(start_tag)

if start_idx != -1:
    div_count = 0
    end_idx = -1
    curr_idx = start_idx + len(start_tag)
    
    while curr_idx < len(content):
        next_open = content.find('<div', curr_idx)
        next_close = content.find('</div>', curr_idx)
        
        if next_close == -1:
            break
            
        if next_open != -1 and next_open < next_close:
            div_count += 1
            curr_idx = next_open + 4
        else:
            if div_count == 0:
                end_idx = next_close + 6
                break
            div_count -= 1
            curr_idx = next_close + 6

machines = [
    {"id": "prod-01", "name": "Forno Túnel", "category": "Fornos", "price": 85000.00, "file": "forno-tunel.png", "desc": "Ideais para produções contínuas de pães, bolos, tortas, salgados, biscoitos e pizzas."},
    {"id": "prod-02", "name": "Forno Rotativo Thor", "category": "Fornos", "price": 42000.00, "file": "forno-rotativo-thor.png", "desc": "Produzido totalmente em aço inox. Econômico, versátil e de rápido aquecimento."},
    {"id": "prod-03", "name": "Forno Rotativo de 1 a 6 Carros", "category": "Fornos", "price": 42000.00, "file": "forno-rotativo-multi.png", "desc": "Sistema com carros giratórios, ideal para grandes produções."},
    {"id": "prod-04", "name": "Forno Lastro Elétrico Multi", "category": "Fornos", "price": 28500.00, "file": "forno-lastro-eletrico.png", "desc": "Câmaras independentes, com controle de lastro e teto."},
    {"id": "prod-05", "name": "Forno Lastro Ciclotérmico", "category": "Fornos", "price": 28500.00, "file": "forno-lastro-ciclo.png", "desc": "Excelente padrão de assamento unificado em todas as câmaras."},
    {"id": "prod-06", "name": "Amassadeira Linha Branca", "category": "Amassadeiras", "price": 12800.00, "file": "amassadeira-branca.png", "desc": "Mistura e cilindra a massa com excelente homogeneidade (25 a 240kg)."},
    {"id": "prod-07", "name": "Cilindro Premium", "category": "Cilindros", "price": 9400.00, "file": "cilindro-premium.png", "desc": "Ideal para sovar e homogeneizar a massa. Estrutura em aço inox."},
    {"id": "prod-08", "name": "Cilindro Linha Branca", "category": "Cilindros", "price": 9400.00, "file": "cilindro-branco.png", "desc": "Ideal para sovar e homogeneizar a massa. Versão em epóxi."},
    {"id": "prod-09", "name": "Modeladora Inox", "category": "Modeladoras", "price": 7200.00, "file": "modeladora-inox.png", "desc": "Recomendada para modelar vários tipos e tamanhos de pães (10 a 600g)."},
    {"id": "prod-10", "name": "Divisora Volumétrica", "category": "Equipamentos Gerais", "price": 14500.00, "file": "divisora-volumetrica.png", "desc": "Divide e corta massa para vários tamanhos de pães através de 3 canais."},
    {"id": "prod-11", "name": "Boleadeira", "category": "Equipamentos Gerais", "price": 11200.00, "file": "boleadeira.png", "desc": "Permite dividir e bolear a massa em partes iguais (25g a 90g)."},
    {"id": "prod-12", "name": "Boleadeira Premium", "category": "Equipamentos Gerais", "price": 11200.00, "file": "boleadeira-premium.png", "desc": "Boleia até 30 unidades simultaneamente, com alta precisão."},
    {"id": "prod-13", "name": "Laminadora de Massas", "category": "Equipamentos Gerais", "price": 18900.00, "file": "laminadora.png", "desc": "Ideal para laminar massa, massas folhadas e croissant (largura útil 500mm)."},
    {"id": "prod-14", "name": "Batedeira Inox", "category": "Batedeiras", "price": 6800.00, "file": "batedeira-inox.png", "desc": "Controle digital com 10 velocidades. Estrutura total em aço inox."},
    {"id": "prod-15", "name": "Batedeira Linha Branca", "category": "Batedeiras", "price": 6800.00, "file": "batedeira-branca.png", "desc": "Ideal para produtos de confeitaria, massas leves e líquidas."},
    {"id": "prod-16", "name": "Fatiadeira", "category": "Equipamentos Gerais", "price": 5400.00, "file": "fatiadeira.png", "desc": "Fatia pães de massa macia em 2 espessuras diferentes (12mm e 14mm)."},
    {"id": "prod-17", "name": "Moinho", "category": "Equipamentos Gerais", "price": 3900.00, "file": "moinho.png", "desc": "Utilizado na produção de farinha de rosca. Rala e tritura pães torrados."}
]

html_cards = []
for m in machines:
    card = f"""                    <article class="product-card" data-id="{m['id']}" data-name="{m['name']}" data-category="{m['category']}" data-price="{m['price']:.2f}" data-image="./products/{m['file']}">
                        <div class="product-visual">
                            <img src="./products/{m['file']}" alt="{m['name']}" loading="lazy">
                            <i>SUPREMAX</i>
                        </div>
                        <div class="product-content">
                            <h3>{m['name']}</h3>
                            <p>{m['desc']}</p>
                            <button class="add-to-cart-btn" data-id="{m['id']}">
                                Adicionar ao orçamento
                            </button>
                        </div>
                    </article>"""
    html_cards.append(card)

new_grid = start_tag + "\n" + "\n".join(html_cards) + "\n                    </div>"

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + new_grid + content[end_idx:]
    with open('maquinas.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("maquinas.html updated successfully!")
else:
    print("Could not find closing div.")
