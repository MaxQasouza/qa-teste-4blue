/// <reference types="cypress" />
// Testes de bugs documentados — falhas esperadas até correção

describe('Tela de Sucesso — Bugs documentados [FALHA ESPERADA]', () => {
  beforeEach(() => {
    cy.session('loginSession', () => {
      cy.visit('/criar-conta')
      cy.on('window:alert', () => true)
      cy.get('input[type="text"]').type('QA Teste')
      cy.get('input[type="tel"]').type('11999999999')
      cy.get('input[type="email"]').type(Cypress.env('VALID_EMAIL'))
      cy.get('input[type="password"]:eq(0)').type(Cypress.env('VALID_PASSWORD'))
      cy.get('input[type="password"]:eq(1)').type(Cypress.env('VALID_PASSWORD'))
      cy.get('button.btn-primary').click()
      cy.wait(1500)
      cy.visit('/')
      cy.on('window:alert', () => true)
      cy.get('input[type="email"]').type(Cypress.env('VALID_EMAIL'))
      cy.get('input[type="password"]').type(Cypress.env('VALID_PASSWORD'))
      cy.get('button.btn-primary').click()
      cy.url().should('include', '/sucesso')
    })
    cy.visit('/sucesso?op=login')
  })

  it('[BUG-002] CT19 - Toast "Erro inesperado" na tela de sucesso', () => {
    cy.get('div.bg-destructive').should('not.exist')
  })

  it('[BUG-010] CT20 - Sem navegação após login', () => {
    cy.get('a').should('exist')
  })
})
