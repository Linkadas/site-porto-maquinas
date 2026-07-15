# Project Context / Memory

Este arquivo registra o andamento das tarefas, decisões técnicas e pendências do projeto **SITE PORTO MAQUINAS**.

## Histórico de Atividades

### [2026-07-14] Configuração Inicial do Repositório Git/GitHub
- **Problema Inicial:** O comando `git` não era reconhecido no terminal do Windows.
- **Solução/Decisão Técnica:** Identificamos que o usuário tinha instalado o **GitHub Desktop** na máquina. Mapeamos o executável do Git embutido em `C:\Users\linco\AppData\Local\GitHubDesktop\app-3.6.3\resources\app\git\cmd\git.exe`, adicionamos temporariamente e permanentemente ao PATH de usuário e prosseguimos com o terminal.
- **Ações Realizadas:**
  1. Inicializado repositório local (`git init`).
  2. Criada/renomeada branch padrão para `main`.
  3. Adicionados todos os arquivos do site ao rastreamento (`git add .`).
  4. Realizado o primeiro commit com a estrutura de pastas existente (`git commit`).
  5. Adicionado repositório remoto: `https://github.com/Linkadas/site-porto-maquinas.git`.
  6. Enviado o projeto local para o GitHub (`git push -u origin main`).
  7. Instruído o usuário a adicionar seu amigo como colaborador no GitHub.

### [2026-07-14] Implementação da Funcionalidade de Carrinho de Compras
- **Objetivo:** Criar um carrinho de compras interativo que funcione em todas as páginas, salvando dados localmente para auxiliar na solicitação de orçamentos.
- **Arquivos Alterados:**
  - [produtos.html](file:///c:/Users/linco/OneDrive/Área de Trabalho/SITE PORTO MAQUINAS/SITE PORTO MAQUINAS/produtos.html) - Adicionados atributos de dados, preços fictícios realistas e botões de adicionar.
  - [linha-acessorio-panificacao.html](file:///c:/Users/linco/OneDrive/Área de Trabalho/SITE PORTO MAQUINAS/SITE PORTO MAQUINAS/linha-acessorio-panificacao.html) - Adicionados atributos de dados nos 27 acessórios, preços e layout com botão de orçamento e carrinho lado a lado.
  - [css/index.css](file:///c:/Users/linco/OneDrive/Área de Trabalho/SITE PORTO MAQUINAS/SITE PORTO MAQUINAS/css/index.css) - Estilização completa do carrinho, incluindo badge de notificação com efeito bounce, gaveta lateral responsiva com backdrop-blur, itens da lista, seletores de quantidade e modal de finalização de pedido.
  - [js/main.js](file:///c:/Users/linco/OneDrive/Área de Trabalho/SITE PORTO MAQUINAS/SITE PORTO MAQUINAS/js/main.js) - Lógica de estado do carrinho carregando do `localStorage`, injeção de DOM dinâmica do carrinho, manipulação de quantidades (+ / -), esvaziamento e modal popup simulado de sucesso.
- **Decisões Técnicas:**
  - **Injeção Dinâmica via JS:** Decidimos injetar o ícone do carrinho e a gaveta lateral dinamicamente em todas as páginas por JavaScript para garantir escalabilidade caso novas páginas sejam adicionadas no futuro, evitando redundância de código nos arquivos HTML.
  - **Servidor Interno Python:** Iniciamos um servidor interno em Python na porta 8080 para rodar a aplicação localmente e permitir testes eficientes com persistência de dados.

### [2026-07-14] Remoção dos Preços Públicos da Vitrine
- **Objetivo:** Remover os preços visuais das vitrines públicas dos produtos e acessórios a pedido do usuário (mantendo o foco de vendas corporativas/sob orçamento).
- **Arquivos Alterados:**
  - [produtos.html](file:///c:/Users/linco/OneDrive/Área de Trabalho/SITE PORTO MAQUINAS/SITE PORTO MAQUINAS/produtos.html) - Removida a exibição visual de preços dos 12 cards.
  - [linha-acessorio-panificacao.html](file:///c:/Users/linco/OneDrive/Área de Trabalho/SITE PORTO MAQUINAS/SITE PORTO MAQUINAS/linha-acessorio-panificacao.html) - Removida a exibição visual de preços nos 27 cards de acessórios.
- **Decisões Técnicas:**
  - Mantivemos os atributos `data-price` no HTML de cada card de produto para permitir que a lógica do carrinho/orçamento calcule o subtotal e o total acumulado por baixo dos panos.



## Próximos Passos (Pendências)
1. **Adicionar Colaborador:** O usuário deve adicionar o amigo como colaborador no repositório do GitHub (instruído na mensagem anterior).
2. **Aceitar Convite:** O amigo do usuário deve aceitar o convite para colaborar.
3. **Clonar Repositório:** O amigo deve clonar o repositório na máquina dele.
4. **Criar Branches:** 
   - Criar uma branch para o usuário principal (ex: `branch-linkadas`).
   - Criar uma branch para o amigo (ex: `branch-amigo`).
