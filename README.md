# Site Porto Máquinas

Este é o repositório do site da **Porto Máquinas**.

## Estrutura do Projeto

O código-fonte principal do site está contido na pasta `/SITE PORTO MAQUINAS`, que possui a seguinte estrutura de arquivos:

* `index.html` - Página principal do site.
* `produtos.html` - Catálogo de produtos.
* `servicos.html` - Descrição de serviços.
* `sobre.html` - Página institucional.
* `orcamento.html` - Formulário ou página de contato/orçamento.
* `/css` - Arquivos de estilos CSS.
* `/js` - Scripts Javascript.
* `/assets`, `/catalog`, `/products`, `/services` - Pastas com imagens e recursos do site.

## Como Contribuir (Fluxo de Trabalho Git)

### 1. Clonar o Repositório
No computador do colaborador:
```bash
git clone https://github.com/Linkadas/site-porto-maquinas.git
```

### 2. Criar uma Branch de Trabalho
Evite trabalhar direto na branch `main`. Crie uma branch própria para as suas alterações:
```bash
# Para criar e mudar para a sua branch:
git checkout -b <nome-da-sua-branch>
```

### 3. Enviar Alterações
Após fazer as alterações:
```bash
git add .
git commit -m "Descrição clara da sua alteração"
git push -u origin <nome-da-sua-branch>
```
