describe('App Bar', () =>{
  it('Checks for shopping cart not visible on small devices', () => {
    cy.viewport('iphone-6')
    cy.visit('/')
    cy.get('[data-testId="app-bar"]').find('[data-testId="cart"]').should('not.be.visible')
  })
  it('Checks for shopping cart being inside menu on small devices', () => {
    cy.viewport('iphone-6')
    cy.visit('/')
    cy.get('[data-testId="menu-activator"]').click()
    cy.get('[data-testId="menu"]').find('[data-testId="cart-small-devices"]').should('be.visible')
  })
})