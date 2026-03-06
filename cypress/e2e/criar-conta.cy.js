/// <reference types="cypress" />
// Testes funcionais — todos devem passar

describe('Criar Conta — Elementos da tela', () => {
  beforeEach(() => cy.visit('/criar-conta'))

  it('CT08 - Deve exibir logo, cinco campos, botão e link de voltar', () => {
    cy.get('img[alt="4blue"]').should('be.visible')
    cy.get('input[type="text"]').should('be.visible')
    cy.get('input[type="tel"]').should('be.visible')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]:eq(0)').should('be.visible')
    cy.get('input[type="password"]:eq(1)').should('be.visible')
    cy.get('button.btn-primary').contains('Criar conta').should('be.visible')
    cy.get('a[href="/"]').should('be.visible')
  })
})

describe('Criar Conta — Validação: email inválido', () => {
  beforeEach(() => cy.visit('/criar-conta'))

  it('CT10 - Email em formato inválido deve exibir erro', () => {
    cy.get('input[type="email"]').type('naoéumemail')
    cy.get('button.btn-primary').click()
    cy.get('input[type="email"]').then(($el) => {
      expect($el[0].validity.valid).to.be.false
    })
  })
})

describe('Criar Conta — Validação: senha fraca', () => {
  beforeEach(() => cy.visit('/criar-conta'))

  it('CT11 - Senha com menos de 8 caracteres deve exibir erro', () => {
    cy.get('input[type="text"]').type('Teste QA')
    cy.get('input[type="tel"]').type('11999999999')
    cy.get('input[type="email"]').type('teste@email.com')
    cy.get('input[type="password"]:eq(0)').type('Ab@1')
    cy.get('input[type="password"]:eq(1)').type('Ab@1')
    cy.get('button.btn-primary').click()
    cy.url().should('include', '/criar-conta')
  })

  it('CT12 - Senha sem caractere especial deve exibir erro', () => {
    cy.get('input[type="text"]').type('Teste QA')
    cy.get('input[type="tel"]').type('11999999999')
    cy.get('input[type="email"]').type('teste@email.com')
    cy.get('input[type="password"]:eq(0)').type('SemEspecial1')
    cy.get('input[type="password"]:eq(1)').type('SemEspecial1')
    cy.get('button.btn-primary').click()
    cy.url().should('include', '/criar-conta')
  })
})

describe('Criar Conta — Fluxo completo válido', () => {
  beforeEach(() => cy.visit('/criar-conta'))

  it('CT15 - Preenchimento válido completo deve redirecionar para tela de sucesso', () => {
    const timestamp = Date.now()
    cy.get('input[type="text"]').type('Teste QA')
    cy.get('input[type="tel"]').type('11999999999')
    cy.get('input[type="email"]').type(`teste.${timestamp}@email.com`)
    cy.get('input[type="password"]:eq(0)').type('Senha@123')
    cy.get('input[type="password"]:eq(1)').type('Senha@123')
    cy.get('button.btn-primary').click()
    cy.url().should('include', '/sucesso')
  })
})

describe('Criar Conta — Navegação', () => {
  beforeEach(() => cy.visit('/criar-conta'))

  it('CT16 - Link "Voltar para login" deve redirecionar para /', () => {
    cy.get('a[href="/"]').click()
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
  })
})
