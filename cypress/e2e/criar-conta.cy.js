/// <reference types="cypress" />

describe('Criar Conta — Elementos da tela', () => {
  beforeEach(() => cy.visit('/criar-conta'));

  it('CT08 - Deve exibir logo, cinco campos, botão e link de voltar', () => {
    cy.get('img[alt="4blue"]').should('be.visible');
    cy.get('input[type="text"]').should('be.visible');
    cy.get('input[type="tel"]').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]:eq(0)').should('be.visible');
    cy.get('input[type="password"]:eq(1)').should('be.visible');
    cy.get('button.btn-primary').contains('Criar conta').should('be.visible');
    cy.get('a[href="/"]').should('be.visible');
  });
});

describe('Criar Conta — Validação: formulário vazio', () => {
  beforeEach(() => cy.visit('/criar-conta'));

  it('CT09 - [BUG-001] Formulário vazio não deve ser enviado', () => {
    // BUG-001 [FALHA ESPERADA]: sistema envia o formulário sem nenhuma validação
    // Resultado esperado: campos obrigatórios bloqueiam envio com mensagens de erro
    cy.get('button.btn-primary').click();
    cy.url().should('eq', Cypress.config('baseUrl') + '/criar-conta');
  });
});

describe('Criar Conta — Validação: email inválido', () => {
  beforeEach(() => cy.visit('/criar-conta'));

  it('CT10 - Email em formato inválido deve exibir erro', () => {
    cy.get('input[type="email"]').type('naoéumemail');
    cy.get('button.btn-primary').click();
    cy.get('input[type="email"]').then(($el) => {
      expect($el[0].validity.valid).to.be.false;
    });
  });
});

describe('Criar Conta — Validação: senha fraca', () => {
  beforeEach(() => cy.visit('/criar-conta'));

  it('CT11 - Senha com menos de 8 caracteres deve exibir erro', () => {
    cy.get('input[type="text"]').type('Teste QA');
    cy.get('input[type="tel"]').type('11999999999');
    cy.get('input[type="email"]').type('teste@email.com');
    cy.get('input[type="password"]:eq(0)').type('Ab@1');
    cy.get('input[type="password"]:eq(1)').type('Ab@1');
    cy.get('button.btn-primary').click();
    cy.url().should('include', '/criar-conta');
  });

  it('CT12 - Senha sem caractere especial deve exibir erro', () => {
    cy.get('input[type="text"]').type('Teste QA');
    cy.get('input[type="tel"]').type('11999999999');
    cy.get('input[type="email"]').type('teste@email.com');
    cy.get('input[type="password"]:eq(0)').type('SemEspecial1');
    cy.get('input[type="password"]:eq(1)').type('SemEspecial1');
    cy.get('button.btn-primary').click();
    cy.url().should('include', '/criar-conta');
  });
});

describe('Criar Conta — Validação: senhas divergentes', () => {
  beforeEach(() => cy.visit('/criar-conta'));

  it('CT13 - [BUG-006] Senhas diferentes devem exibir erro de confirmação', () => {
    // BUG-006 [FALHA ESPERADA]: sistema não valida se os campos senha e confirmar senha coincidem
    // Resultado esperado: mensagem "As senhas não coincidem" antes do envio
    cy.get('input[type="text"]').type('Teste QA');
    cy.get('input[type="tel"]').type('11999999999');
    cy.get('input[type="email"]').type('teste@email.com');
    cy.get('input[type="password"]:eq(0)').type('Senha@123');
    cy.get('input[type="password"]:eq(1)').type('Senha@456');
    cy.get('button.btn-primary').click();
    cy.url().should('include', '/criar-conta'); // vai FALHAR — documenta o bug
  });
});

describe('Criar Conta — Validação: campo telefone', () => {
  beforeEach(() => cy.visit('/criar-conta'));

  it('CT14 - [BUG-009] Campo telefone não deve aceitar letras ou caracteres inválidos', () => {
    // BUG-009 [FALHA ESPERADA]: campo aceita qualquer caractere, sem máscara ou validação
    // Resultado esperado: apenas números, formatados como (00) 00000-0000
    cy.get('input[type="tel"]').type('abcde!!');
    cy.get('input[type="tel"]').invoke('val').should('eq', ''); // vai FALHAR — documenta o bug
  });
});

describe('Criar Conta — Fluxo completo válido', () => {
  beforeEach(() => cy.visit('/criar-conta'));

  it('CT15 - Preenchimento válido completo deve redirecionar para tela de sucesso', () => {
    const timestamp = Date.now();
    cy.get('input[type="text"]').type('Teste QA');
    cy.get('input[type="tel"]').type('11999999999');
    cy.get('input[type="email"]').type(`teste.${timestamp}@email.com`);
    cy.get('input[type="password"]:eq(0)').type('Senha@123');
    cy.get('input[type="password"]:eq(1)').type('Senha@123');
    cy.get('button.btn-primary').click();
    cy.url().should('include', '/sucesso');
  });
});

describe('Criar Conta — Navegação', () => {
  beforeEach(() => cy.visit('/criar-conta'));

  it('CT16 - Link "Voltar para login" deve redirecionar para /', () => {
    cy.get('a[href="/"]').click();
    cy.url().should('eq', Cypress.config('baseUrl') + '/');
  });
});

