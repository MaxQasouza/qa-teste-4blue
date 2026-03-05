/// <reference types="cypress" />

describe('Login — Elementos da tela', () => {
  beforeEach(() => cy.visit('/'));

  it('CT01 - Deve exibir logo, campos, botão e link de criação de conta', () => {
    cy.get('img[alt="4blue"]').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button.btn-primary').contains('Entrar').should('be.visible');
    cy.get('a[href="/criar-conta"]').should('be.visible');
  });
});

describe('Login — Validações de campo', () => {
  beforeEach(() => cy.visit('/'));

  it('CT02 - [BUG-001] Campos vazios não devem permitir envio do formulário', () => {
    // BUG-001 [FALHA ESPERADA]: sistema envia sem validar campos obrigatórios
    cy.get('button.btn-primary').click();
    cy.url().should('eq', Cypress.config('baseUrl') + '/');
  });

  it('CT03 - Email inválido deve exibir erro de formato', () => {
    cy.get('input[type="email"]').type('naoéumemail');
    cy.get('input[type="password"]').type('Senha@123');
    cy.get('button.btn-primary').click();
    cy.get('input[type="email"]').then(($el) => {
      expect($el[0].validity.valid).to.be.false;
    });
  });

  it('CT04 - [BUG-004] Hint de senha deve aparecer APENAS após interação, não permanentemente', () => {
    // BUG-004 [FALHA ESPERADA]: mensagem de requisito de senha está sempre visível
    // sem qualquer interação do usuário — comportamento incorreto de UX
    cy.get('p.text-xs.text-muted-foreground')
      .should('not.be.visible'); // vai FALHAR — documenta o bug
  });
});

describe('Login — Fluxo de erro (conta inexistente)', () => {
  beforeEach(() => cy.visit('/'));

  it('CT05 - [BUG-003] [BUG-007] Login com email não cadastrado exibe alert() nativo', () => {
    // BUG-003 [FALHA ESPERADA]: erro exibido via alert() nativo do navegador
    // BUG-007: mensagem revela existência do email — risco de user enumeration
    // Resultado esperado: mensagem inline genérica "E-mail ou senha inválidos"
    cy.on('window:alert', (texto) => {
      expect(texto).to.include('Conta não encontrada');
    });
    cy.get('input[type="email"]').type('nao.existe@email.com');
    cy.get('input[type="password"]').type('Senha@123');
    cy.get('button.btn-primary').click();
  });
});

describe('Login — Fluxo de sucesso', () => {
  it('CT06 - Login com credenciais válidas deve redirecionar para tela de sucesso', () => {
    cy.criarContaELogar();
    cy.url().should('include', '/sucesso');
  });
});

describe('Login — Navegação', () => {
  beforeEach(() => cy.visit('/'));

  it('CT07 - Link "Criar conta" deve redirecionar para /criar-conta', () => {
    cy.get('a[href="/criar-conta"]').click();
    cy.url().should('include', '/criar-conta');
  });
});

