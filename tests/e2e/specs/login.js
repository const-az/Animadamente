describe('Login', () => {
  it('Redirects to admin-only form when successfully logged in', () => {
      cy.visit('/login')
      cy.get('[data-testId="credentials-user"]').type('hola.animada@gmail.com')
      cy.get('[data-testId="credentials-password"]').type('123456')
      cy.get('[data-testId="send-login"]').click()

      cy.get('[data-testId="menu-activator"]').click()
      cy.get('[data-testId="menu"]').contains('Añadir productos')
    })

    it('Checks for successful log out', () => {
      cy.visit('/login')
      cy.get('[data-testId="credentials-user"]').type('hola.animada@gmail.com')
      cy.get('[data-testId="credentials-password"]').type('123456')
      cy.get('[data-testId="send-login"]').click()

      cy.get('[data-testId="menu-activator"]').click()
      cy.get('[data-testId="menu"]').contains('Cerrar sesión').click()
      cy.get('[data-testId="menu"]').contains('Iniciar sesión')
    })
})