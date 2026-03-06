/// <reference types="cypress" />
// Testes de bugs documentados — falhas esperadas até correção

describe('Login — Bugs documentados [FALHA ESPERADA]', () => {
  beforeEach(() => cy.visit('/'))

  it('[BUG-001] CT02 - Campos vazios não bloqueiam envio do formulário', () => {
    cy.get('button.btn-primary').click()
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
  })

  it('[BUG-004] CT04 - Hint de senha sempre visível sem interação', () => {
    cy.get('p.text-xs.text-muted-foreground').invoke('is', ':visible').then((visivel) => {
      expect(visivel).to.be.false
    })
  })
})
