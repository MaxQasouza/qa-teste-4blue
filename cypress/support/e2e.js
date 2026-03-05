import './commands'

// Ignora erros de script de terceiros que bloqueiam os testes
Cypress.on('uncaught:exception', () => {
  return false
})
