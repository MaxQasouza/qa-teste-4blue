describe('Tela de Sucesso — Login', () => {

  beforeEach(() => {
    // Usa cy.session para cachear o cadastro e login entre testes
    cy.session('loginSession', () => {
      // Tenta criar a conta (ignora se já existir)
      cy.visit('/criar-conta')
      cy.on('window:alert', () => true)
      cy.get('input[type="text"]').type('QA Teste')
      cy.get('input[type="tel"]').type('11999999999')
      cy.get('input[type="email"]').type(Cypress.env('VALID_EMAIL'))
      cy.get('input[type="password"]:eq(0)').type(Cypress.env('VALID_PASSWORD'))
      cy.get('input[type="password"]:eq(1)').type(Cypress.env('VALID_PASSWORD'))
      cy.get('button.btn-primary').click()
      cy.wait(1500)

      // Faz login
      cy.visit('/')
      cy.on('window:alert', () => true)
      cy.get('input[type="email"]').type(Cypress.env('VALID_EMAIL'))
      cy.get('input[type="password"]').type(Cypress.env('VALID_PASSWORD'))
      cy.get('button.btn-primary').click()
      cy.url().should('include', '/sucesso')
    })

    cy.visit('/sucesso?op=login')
  })

  it('CT17 - Deve exibir título "Login realizado com sucesso"', () => {
    cy.get('h1').should('contain', 'Login realizado com sucesso')
  })

  it('CT18 - Deve exibir botão "Sair da conta"', () => {
    cy.get('button.btn-primary').should('contain', 'Sair da conta')
  })

  it('CT19 - [BUG-002] Não deve exibir toast de erro após login bem-sucedido', () => {
    // BUG-002 [FALHA ESPERADA]: div.bg-destructive "Erro inesperado"
    // está hardcoded no DOM mesmo após login bem-sucedido
    cy.get('div.bg-destructive').should('not.exist') // vai FALHAR — documenta o bug
  })

  it('CT20 - [BUG-010] Deve existir navegação para o sistema além de "Sair da conta"', () => {
    // BUG-010 [FALHA ESPERADA]: única ação disponível é "Sair da conta"
    cy.get('a').should('exist') // vai FALHAR — documenta o bug
  })
})

describe('Tela de Sucesso — Cadastro', () => {
  beforeEach(() => {
    cy.visit('/sucesso?op=cadastro')
  })

  it('CT21 - Deve exibir título "Conta criada com sucesso"', () => {
    cy.get('h1').should('contain', 'Conta criada com sucesso')
  })

  it('CT22 - Não deve exibir toast de erro após cadastro bem-sucedido', () => {
    // Este fluxo está correto — div.bg-destructive não existe neste HTML
    cy.get('div.bg-destructive').should('not.exist')
  })
})

