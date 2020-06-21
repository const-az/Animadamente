describe('Login', () => {
  it('Checks for unsuccessfully logging in with incorrect credentials', () => {
    cy.visit('/login')
    cy.get('[data-testId="credentials-user"]').type('non-existing@gmail.com')
    cy.get('[data-testId="credentials-password"]').type('verysafepassword')
    cy.get('[data-testId="send-login"]').click()

    cy.get('[data-testId="menu-activator"]').click()
    cy.get('[data-testId="menu"]').contains('Iniciar sesión')
  })
  it('Checks for unsuccessfully entering to an admin-only form', () => {
    cy.visit('/agregarproductos')
    cy.url().should('contain', '/home');
  })
})