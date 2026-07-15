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

## Próximos Passos (Pendências)
1. **Adicionar Colaborador:** O usuário deve adicionar o amigo como colaborador no repositório do GitHub (instruído na mensagem anterior).
2. **Aceitar Convite:** O amigo do usuário deve aceitar o convite para colaborar.
3. **Clonar Repositório:** O amigo deve clonar o repositório na máquina dele.
4. **Criar Branches:** 
   - Criar uma branch para o usuário principal (ex: `branch-linkadas`).
   - Criar uma branch para o amigo (ex: `branch-amigo`).
