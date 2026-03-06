/// <reference types="cypress" />
// Testes funcionais — todos devem passar

describe('Login — Elementos da tela', () => {
  beforeEach(() => cy.visit('/'))

  it('CT01 - Deve exibir logo, campos, botão e link de criação de conta', () => {
    cy.get('img[alt="4blue"]').should('be.visible')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.get('button.btn-primary').contains('Entrar').should('be.visible')
    cy.get('a[href="/criar-conta"]').should('be.visible')
  })
})

describe('Login — Validações de campo', () => {
  beforeEach(() => cy.visit('/'))

  it('CT03 - Email inválido deve exibir erro de formato', () => {
    cy.get('input[type="email"]').type('naoéumemail')
    cy.get('input[type="password"]').type('Senha@123')
    cy.get('button.btn-primary').click()
    cy.get('input[type="email"]').then(($el) => {
      expect($el[0].validity.valid).to.be.false
    })
  })
})

describe('Login — Fluxo de erro (conta inexistente)', () => {
  beforeEach(() => cy.visit('/'))

  it('CT05 - Login com email não cadastrado exibe alert nativo', () => {
    cy.on('window:alert', (texto) => {
      expect(texto).to.include('Conta não encontrada')
    })
    cy.get('input[type="email"]').type('nao.existe@email.com')
    cy.get('input[type="password"]').type('Senha@123')
    cy.get('button.btn-primary').click()
  })
})

describe('Login — Fluxo de sucesso', () => {
  it('CT06 - Login com credenciais válidas deve redirecionar para tela de sucesso', () => {
    cy.criarContaELogar()
    cy.url().should('include', '/sucesso')
  })
})

describe('Login — Navegação', () => {
  beforeEach(() => cy.visit('/'))

  it('CT07 - Link "Criar conta" deve redirecionar para /criar-conta', () => {
    cy.get('a[href="/criar-conta"]').click()
    cy.url().should('include', '/criar-conta')
  })
})
