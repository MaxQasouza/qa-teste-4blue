/// <reference types="cypress" />
// Testes de bugs documentados — falhas esperadas até correção

describe('Criar Conta — Bugs documentados [FALHA ESPERADA]', () => {
  beforeEach(() => cy.visit('/criar-conta'))

  it('[BUG-001] CT09 - Formulário vazio enviado sem validação', () => {
    cy.get('button.btn-primary').click()
    cy.url().should('eq', Cypress.config('baseUrl') + '/criar-conta')
  })

  it('[BUG-006] CT13 - Senhas divergentes aceitas sem erro', () => {
    cy.get('input[type="text"]').type('Teste QA')
    cy.get('input[type="tel"]').type('11999999999')
    cy.get('input[type="email"]').type('teste@email.com')
    cy.get('input[type="password"]:eq(0)').type('Senha@123')
    cy.get('input[type="password"]:eq(1)').type('Senha@456')
    cy.get('button.btn-primary').click()
    cy.url().should('include', '/criar-conta')
  })

  it('[BUG-009] Telefone aceita caracteres inválidos', () => {
    cy.get('input[type="tel"]').type('abcde!!')
    cy.get('input[type="tel"]').invoke('val').then((val) => {
      expect(val).to.equal('abcde!!')
    })
  })
})
