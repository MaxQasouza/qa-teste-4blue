# Testes Automatizados — Cypress | 4blue QA

## Pré-requisitos
- Node.js 18+
- npm

## Instalação
```bash
npm install
```

## Configuração
Copiar `cypress.env.json.example` para `cypress.env.json` e preencher com credenciais válidas.

## Como rodar
```bash
npm run cy:open   # modo interativo
npm run cy:run    # modo headless (CI)
```

## Tabela de Casos de Teste x Bugs

| CT    | Descrição                                      | Bug relacionado | Resultado esperado do teste |
|-------|------------------------------------------------|-----------------|-----------------------------|
| CT02  | Formulário de login vazio                      | BUG-001         | FALHA ESPERADA              |
| CT04  | Hint de senha sempre visível                   | BUG-004         | FALHA ESPERADA              |
| CT05  | Login inexistente usa alert() nativo           | BUG-003/007     | FALHA ESPERADA              |
| CT09  | Formulário de cadastro vazio                   | BUG-001         | FALHA ESPERADA              |
| CT13  | Senhas divergentes aceitas                     | BUG-006         | FALHA ESPERADA              |
| CT14  | Telefone aceita caracteres inválidos           | BUG-009         | FALHA ESPERADA              |
| CT19  | Toast "Erro inesperado" na tela de sucesso     | BUG-002         | FALHA ESPERADA              |
| CT20  | Sem navegação após login                       | BUG-010         | FALHA ESPERADA              |
| CT06  | Login com credenciais válidas                  | —               | PASSA                       |
| CT15  | Cadastro completo válido                       | —               | PASSA                       |
| CT21  | Título correto após cadastro                   | —               | PASSA                       |
| CT22  | Sem erro após cadastro                         | —               | PASSA                       |

## Sobre testes marcados como [FALHA ESPERADA]
Testes com este rótulo documentam bugs conhecidos e confirmados.
Eles falham intencionalmente para registrar o comportamento incorreto atual do sistema.
Quando o bug for corrigido, o teste deve passar sem alteração de código.

