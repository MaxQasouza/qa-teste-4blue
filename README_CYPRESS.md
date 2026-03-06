# Testes Automatizados — Cypress | 4blue QA

## Pré-requisitos
- Node.js 18+
- npm

## Instalação
```bash
npm install
```

## Configuração
Copiar `cypress.env.json.example` para `cypress.env.json` e preencher com credenciais válidas (`VALID_EMAIL` e `VALID_PASSWORD`).

## Estrutura dos testes: \*.cy.js vs \*.bugs.cy.js

Os testes estão separados em dois tipos de arquivo:

| Tipo | Sufixo | Descrição |
|------|--------|-----------|
| **Testes que passam** | `*.cy.js` | Validam o comportamento correto do sistema; devem passar em CI. |
| **Testes de bugs** | `*.bugs.cy.js` | Documentam bugs conhecidos; falham intencionalmente até a correção. |

- **login.cy.js** / **login.bugs.cy.js** — tela de login  
- **criar-conta.cy.js** / **criar-conta.bugs.cy.js** — tela de criação de conta  
- **sucesso.cy.js** / **sucesso.bugs.cy.js** — tela de sucesso (login e cadastro)

## Como rodar

| Comando | Descrição |
|---------|-----------|
| `npm run cy:open` | Abre o Cypress em modo interativo (GUI). |
| `npm run cy:run` | Roda apenas os testes que **passam** (`*.cy.js`). |
| `npm run cy:run:bugs` | Roda apenas os testes de **bugs** (`*.bugs.cy.js`). |
| `npm run cy:run:all` | Roda **todos** os testes (passam + bugs). |

Linha de comando direta:
```bash
# Apenas testes que passam (equivalente a npm run cy:run)
npx cypress run --spec "cypress/e2e/login.cy.js,cypress/e2e/criar-conta.cy.js,cypress/e2e/sucesso.cy.js"

# Apenas testes de bugs
npx cypress run --spec "cypress/e2e/*.bugs.cy.js"

# Tudo
npx cypress run --spec "cypress/e2e/**/*"
```

## Tabela de Casos de Teste x Bugs

| CT   | Descrição                         | Arquivo            | Bug        | Resultado        |
|------|-----------------------------------|--------------------|------------|------------------|
| CT01 | Elementos da tela (login)         | login.cy.js        | —          | PASSA            |
| CT02 | Campos vazios não bloqueiam envio | login.bugs.cy.js   | BUG-001    | FALHA ESPERADA   |
| CT03 | Email inválido exibe erro         | login.cy.js        | —          | PASSA            |
| CT04 | Hint de senha sempre visível      | login.bugs.cy.js   | BUG-004    | FALHA ESPERADA   |
| CT05 | Login conta inexistente exibe alert| login.cy.js        | —          | PASSA            |
| CT06 | Login válido redireciona /sucesso | login.cy.js        | —          | PASSA            |
| CT07 | Link "Criar conta" → /criar-conta | login.cy.js        | —          | PASSA            |
| CT08 | Elementos da tela (criar conta)   | criar-conta.cy.js  | —          | PASSA            |
| CT09 | Formulário vazio enviado          | criar-conta.bugs.cy.js | BUG-001 | FALHA ESPERADA   |
| CT10 | Email inválido exibe erro         | criar-conta.cy.js  | —          | PASSA            |
| CT11 | Senha fraca exibe erro            | criar-conta.cy.js  | —          | PASSA            |
| CT12 | Senha sem especial exibe erro     | criar-conta.cy.js  | —          | PASSA            |
| CT13 | Senhas divergentes aceitas        | criar-conta.bugs.cy.js | BUG-006 | FALHA ESPERADA   |
| CT14 | Telefone aceita caracteres inválidos | criar-conta.bugs.cy.js | BUG-009 | FALHA ESPERADA   |
| CT15 | Fluxo completo válido → sucesso   | criar-conta.cy.js  | —          | PASSA            |
| CT16 | Link "Voltar para login" → /      | criar-conta.cy.js  | —          | PASSA            |
| CT17 | Título "Login realizado com sucesso" | sucesso.cy.js   | —          | PASSA            |
| CT18 | Botão "Sair da conta" presente    | sucesso.cy.js      | —          | PASSA            |
| CT19 | Toast "Erro inesperado" na tela   | sucesso.bugs.cy.js | BUG-002    | FALHA ESPERADA   |
| CT20 | Sem navegação após login          | sucesso.bugs.cy.js | BUG-010    | FALHA ESPERADA   |
| CT21 | Título "Conta criada com sucesso" | sucesso.cy.js      | —          | PASSA            |
| CT22 | Sem toast de erro após cadastro   | sucesso.cy.js      | —          | PASSA            |

## Sobre testes marcados como [FALHA ESPERADA]
Testes em `*.bugs.cy.js` documentam bugs conhecidos e confirmados.  
Eles falham intencionalmente para registrar o comportamento incorreto atual do sistema.  
Quando o bug for corrigido, o teste deve passar sem alteração de código.
