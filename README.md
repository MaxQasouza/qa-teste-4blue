#  Teste Técnico – QA Tester | Processo Seletivo 4blue

> Análise manual exploratória + automação E2E com Cypress do microssistema [qa-play-sim.lovable.app](https://qa-play-sim.lovable.app/)

---

##  Sobre o Projeto

Este repositório contém a entrega completa do Teste Técnico para a vaga de **QA Tester** na 4blue, incluindo:

-  Bug report completo com 12 bugs identificados
-  Suíte de testes automatizados com Cypress E2E
-  Relatório QA em PDF
-  Pipeline CI/CD com GitHub Actions

---

##  Bugs Encontrados

---

### BUG-001 – Criação de conta permitida sem preenchimento de nenhum campo

**Descrição:**
O formulário de criação de conta aceita o envio sem que nenhum campo obrigatório seja preenchido. Não há validação de campos obrigatórios no front-end antes do envio.

**Passos para Reproduzir:**
1. Acessar `qa-play-sim.lovable.app/criar-conta`
2. Não preencher nenhum campo
3. Clicar no botão "Criar conta"

**Resultado Atual:** O sistema processa o envio sem exibir nenhuma mensagem de erro ou validação.

**Resultado Esperado:** O sistema deve bloquear o envio e exibir mensagens de erro indicando quais campos são obrigatórios.

**Severidade:** 🔴 Crítico | **Prioridade:** Alta

---

### BUG-002 – "Erro inesperado" exibido na tela de sucesso após login

**Descrição:**
Após login bem-sucedido, a tela de sucesso exibe um toast vermelho com "Erro inesperado" no canto inferior direito, contradizendo o estado de sucesso da operação.

**Passos para Reproduzir:**
1. Acessar `qa-play-sim.lovable.app/`
2. Inserir credenciais válidas
3. Clicar em "Entrar"
4. Observar a tela de sucesso

**Resultado Atual:** Tela exibe "Login realizado com sucesso" e simultaneamente mostra toast de "Erro inesperado".

**Resultado Esperado:** Tela de sucesso exibida sem nenhuma mensagem de erro.

**Severidade:** 🔴 Crítico | **Prioridade:** Alta

---

### BUG-003 – Mensagens de erro exibidas via `alert()` nativo do navegador

**Descrição:**
Ao tentar fazer login com conta inexistente, o sistema exibe a mensagem de erro via `alert()` nativo do navegador, fora do padrão visual da aplicação.

**Passos para Reproduzir:**
1. Acessar `qa-play-sim.lovable.app/`
2. Inserir email não cadastrado e qualquer senha válida
3. Clicar em "Entrar"

**Resultado Atual:** Caixa de diálogo nativa do browser é exibida com a mensagem de erro.

**Resultado Esperado:** Mensagem de erro inline ou toast estilizado dentro da interface da aplicação.

**Severidade:** 🟡 Médio | **Prioridade:** Média

---

### BUG-004 – Mensagem de validação de senha exibida permanentemente

**Descrição:**
O texto "A senha precisa ter no mínimo 8 caracteres e 1 caractere especial." é exibido permanentemente abaixo do campo de senha, mesmo antes de qualquer interação do usuário.

**Passos para Reproduzir:**
1. Acessar qualquer tela com campo de senha
2. Observar o campo "Senha" sem interagir com ele

**Resultado Atual:** Texto de requisito aparece imediatamente como texto estático, sugerindo erro mesmo sem interação.

**Resultado Esperado:** Texto exibido apenas após interação com o campo (focus/blur) ou com estilo visual diferente de erro.

**Severidade:** 🔵 Baixo | **Prioridade:** Baixa

---

### BUG-005 – Sem validação de formato de e-mail nos formulários

**Descrição:**
Os campos de e-mail não validam se o valor inserido é um endereço válido. É possível submeter os formulários com valores como "abc" ou "teste@" no campo de e-mail.

**Passos para Reproduzir:**
1. Acessar qualquer formulário
2. Inserir valor inválido no campo "Email" (ex: `naoéumemail`)
3. Preencher demais campos e tentar submeter

**Resultado Atual:** Sistema não valida o formato do e-mail antes do envio.

**Resultado Esperado:** Sistema deve validar formato do e-mail e exibir mensagem de erro inline se inválido.

**Severidade:** 🔴 Alto | **Prioridade:** Alta

---

### BUG-006 – Sem validação de confirmação de senha

**Descrição:**
Na tela de Criação de Conta, os campos "Senha" e "Confirmar Senha" não são comparados antes do envio. É possível preencher senhas diferentes e submeter o formulário sem erro.

**Passos para Reproduzir:**
1. Acessar `qa-play-sim.lovable.app/criar-conta`
2. Preencher "Senha" com `Senha@123`
3. Preencher "Confirmar Senha" com `Senha@456`
4. Clicar em "Criar conta"

**Resultado Atual:** Sistema não verifica se os campos coincidem e processa o cadastro.

**Resultado Esperado:** Sistema deve validar que os campos são idênticos e exibir erro "As senhas não coincidem".

**Severidade:** 🔴 Crítico | **Prioridade:** Alta

---

### BUG-007 – Mensagem de erro revela existência de e-mail cadastrado (User Enumeration)

**Descrição:**
Ao tentar login com e-mail não cadastrado, o sistema retorna "Conta não encontrada. Crie uma conta primeiro." confirmando explicitamente que o e-mail não existe — vulnerabilidade de user enumeration.

**Passos para Reproduzir:**
1. Acessar `qa-play-sim.lovable.app/`
2. Inserir um e-mail não cadastrado
3. Inserir qualquer senha
4. Clicar em "Entrar"

**Resultado Atual:** Sistema confirma que o e-mail não está cadastrado, permitindo que atacante descubra quais e-mails são válidos.

**Resultado Esperado:** Mensagem genérica: "E-mail ou senha inválidos."

**Severidade:** 🔴 Alto | **Prioridade:** Alta

---

### BUG-008 – Ausência de toggle para mostrar/ocultar senha

**Descrição:**
Os campos de senha não possuem ícone para alternar visibilidade da senha digitada, prejudicando a usabilidade.

**Passos para Reproduzir:**
1. Acessar qualquer tela com campo de senha
2. Digitar uma senha
3. Verificar que não há ícone para revelar a senha

**Resultado Atual:** Senha permanece oculta sem possibilidade de visualização.

**Resultado Esperado:** Ícone de olho (👁) ao final do campo que alterne entre oculto e visível.

**Severidade:** 🟡 Médio | **Prioridade:** Média

---

### BUG-009 – Sem validação de formato no campo Telefone

**Descrição:**
O campo "Telefone" exibe placeholder `(00) 00000-0000` mas não aplica máscara nem validação real. É possível inserir letras e caracteres especiais sem bloqueio.

**Passos para Reproduzir:**
1. Acessar `qa-play-sim.lovable.app/criar-conta`
2. Clicar no campo "Telefone"
3. Digitar letras ou caracteres inválidos (ex: `abcde`)

**Resultado Atual:** Campo aceita qualquer tipo de caractere sem validação.

**Resultado Esperado:** Campo deve aplicar máscara `(00) 00000-0000`, aceitando apenas números.

**Severidade:** 🟡 Médio | **Prioridade:** Média

---

### BUG-010 – Tela de sucesso sem navegação para o sistema

**Descrição:**
Após login bem-sucedido, a tela de sucesso exibe apenas o botão "Sair da conta", sem nenhuma opção de navegar para o sistema.

**Passos para Reproduzir:**
1. Fazer login com credenciais válidas
2. Observar as opções disponíveis na tela de sucesso

**Resultado Atual:** Apenas o botão "Sair da conta" é exibido.

**Resultado Esperado:** Botão ou redirecionamento automático para a área principal do sistema.

**Severidade:** 🟡 Médio | **Prioridade:** Média

---

### BUG-011 – Tela de criação de conta sem centralização vertical

**Descrição:**
Na tela de Criação de Conta o card do formulário está sem centralização vertical, diferente da tela de Login que está corretamente centralizada.

**Passos para Reproduzir:**
1. Acessar `qa-play-sim.lovable.app/criar-conta`
2. Comparar o posicionamento do card com a tela de Login

**Resultado Atual:** Card sem centralização vertical, colado no topo.

**Resultado Esperado:** Card centralizado verticalmente igual à tela de Login.

**Severidade:** 🔵 Baixo | **Prioridade:** Baixa

---

### BUG-012 – Placeholder do campo senha indistinguível do valor preenchido

**Descrição:**
O placeholder `••••••••` no campo senha é visualmente idêntico ao valor preenchido, impossibilitando que o usuário saiba se o campo está vazio ou preenchido.

**Passos para Reproduzir:**
1. Acessar qualquer tela com campo de senha
2. Observar o campo vazio — placeholder mostra `••••••••`
3. Comparar visualmente com o campo preenchido

**Resultado Atual:** Placeholder indistinguível do valor digitado.

**Resultado Esperado:** Placeholder com texto descritivo como "Mínimo 8 caracteres" ou estilo visual diferente.

**Severidade:** 🔵 Baixo | **Prioridade:** Baixa

---

##  Quais 2 bugs corrigiria primeiro e por quê?

### 1º – BUG-006: Sem validação de confirmação de senha
Este bug permite que um usuário crie uma conta com uma senha diferente da que acredita ter definido, tornando o acesso futuro impossível. O usuário ficaria preso em um loop onde não consegue logar pois a senha cadastrada não bate com o que digitou. **Quebra o fluxo principal do sistema** e compromete diretamente a experiência de cadastro — impacto imediato no usuário.

### 2º – BUG-001: Criação de conta sem validação de campos obrigatórios
Permitir o cadastro sem dados é uma falha fundamental de integridade. Além de criar registros inválidos no banco de dados, abre espaço para abusos como criação em massa de contas vazias. É a validação mais básica esperada em qualquer formulário de cadastro.

---

##  Sugestões de Melhoria

### Tela de Login
- Adicionar link **"Esqueci minha senha"** para recuperação de acesso
- Substituir `alert()` por mensagens de erro **inline** ou toast estilizado
- Implementar **rate limiting** após N tentativas falhas para prevenir força bruta
- Adicionar **toggle de visibilidade** no campo de senha
- Exibir hint de senha apenas após interação com o campo

### Tela de Criação de Conta
- Implementar **indicador visual de força da senha** em tempo real
- Aplicar **máscara automática** no campo de telefone
- Exibir validação de confirmação de senha **em tempo real** ao sair do campo
- Adicionar **validação de formato de e-mail** no blur do campo
- Considerar **checkbox de aceite dos Termos de Uso**

### Segurança
- Mensagem de erro genérica no login: "E-mail ou senha inválidos" (evitar user enumeration)
- Tratar erros de rede com mensagens amigáveis (timeout, servidor indisponível)

### Geral
- **Acessibilidade**: atributos `aria-label`, foco por teclado, contraste adequado
- **Redirecionamento automático** após login bem-sucedido
- Sistema de design consistente — sem uso de `alert()` nativo

---

##  Automação — Cypress E2E

> Além do bug report manual, foi desenvolvida uma suíte completa de testes automatizados.

### Pré-requisitos
- Node.js 18+
- npm

### Instalação
```bash
npm install
```

### Configuração
Copiar `cypress.env.json.example` para `cypress.env.json` e preencher com credenciais válidas:
```json
{
  "VALID_EMAIL": "seu@email.com",
  "VALID_PASSWORD": "Senha@123"
}
```

### Estrutura dos testes

| Tipo | Sufixo | Descrição |
|------|--------|-----------|
| **Testes que passam** | `*.cy.js` | Validam comportamento correto — devem passar em CI |
| **Testes de bugs** | `*.bugs.cy.js` | Documentam bugs conhecidos — falham intencionalmente |

### Como rodar

| Comando | Descrição |
|---------|-----------|
| `npm run cy:open` | Abre o Cypress em modo interativo (GUI) |
| `npm run cy:run` | Roda apenas os testes que **passam** |
| `npm run cy:run:bugs` | Roda apenas os testes de **bugs** |
| `npm run cy:run:all` | Roda **todos** os testes |

### Tabela de Casos de Teste

| CT | Descrição | Arquivo | Bug | Resultado |
|----|-----------|---------|-----|-----------|
| CT01 | Elementos da tela de login | login.cy.js | — | ✅ PASSA |
| CT02 | Campos vazios não bloqueiam envio | login.bugs.cy.js | BUG-001 | ❌ FALHA ESPERADA |
| CT03 | Email inválido exibe erro de formato | login.cy.js | — | ✅ PASSA |
| CT04 | Hint de senha sempre visível | login.bugs.cy.js | BUG-004 | ❌ FALHA ESPERADA |
| CT05 | Login conta inexistente exibe alert nativo | login.cy.js | — | ✅ PASSA |
| CT06 | Login válido redireciona para /sucesso | login.cy.js | — | ✅ PASSA |
| CT07 | Link "Criar conta" redireciona para /criar-conta | login.cy.js | — | ✅ PASSA |
| CT08 | Elementos da tela de criar conta | criar-conta.cy.js | — | ✅ PASSA |
| CT09 | Formulário vazio enviado sem validação | criar-conta.bugs.cy.js | BUG-001 | ❌ FALHA ESPERADA |
| CT10 | Email inválido exibe erro | criar-conta.cy.js | — | ✅ PASSA |
| CT11 | Senha fraca exibe erro | criar-conta.cy.js | — | ✅ PASSA |
| CT12 | Senha sem caractere especial exibe erro | criar-conta.cy.js | — | ✅ PASSA |
| CT13 | Senhas divergentes aceitas sem erro | criar-conta.bugs.cy.js | BUG-006 | ❌ FALHA ESPERADA |
| CT14 | Telefone aceita caracteres inválidos | criar-conta.bugs.cy.js | BUG-009 | ❌ FALHA ESPERADA |
| CT15 | Fluxo completo válido redireciona para sucesso | criar-conta.cy.js | — | ✅ PASSA |
| CT16 | Link "Voltar para login" redireciona para / | criar-conta.cy.js | — | ✅ PASSA |
| CT17 | Título "Login realizado com sucesso" | sucesso.cy.js | — | ✅ PASSA |
| CT18 | Botão "Sair da conta" presente | sucesso.cy.js | — | ✅ PASSA |
| CT19 | Toast "Erro inesperado" na tela de sucesso | sucesso.bugs.cy.js | BUG-002 | ❌ FALHA ESPERADA |
| CT20 | Sem navegação após login | sucesso.bugs.cy.js | BUG-010 | ❌ FALHA ESPERADA |
| CT21 | Título "Conta criada com sucesso" | sucesso.cy.js | — | ✅ PASSA |
| CT22 | Sem toast de erro após cadastro | sucesso.cy.js | — | ✅ PASSA |

### Sobre testes [FALHA ESPERADA]
Testes em `*.bugs.cy.js` documentam bugs conhecidos e confirmados.
Eles falham intencionalmente para registrar o comportamento incorreto atual.
Quando o bug for corrigido, o teste deve passar sem alteração de código.

---

##  Documentação

 [QA Report Completo (PDF)](./docs/QA_Report_4blue.pdf) — Relatório com bugs, métricas, Gherkin e sugestões de melhoria

---

##  CI/CD

Pipeline configurado com **GitHub Actions** rodando automaticamente a cada push na branch `main`.

-  Testes que passam (`*.cy.js`) — devem estar sempre verdes
-  Testes de bugs (`*.bugs.cy.js`) — falham intencionalmente com `continue-on-error: true`
-  Screenshots salvas como artefato em caso de falha

---

*Análise realizada como parte do Teste Técnico para Processo Seletivo QA Tester — 4blue*
