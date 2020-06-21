describe('Home page', () => {
  it('Filters product list', () => {
    cy.visit('/')
    cy.get('[data-testId="product-card"]').should('have.length',18)
    
    cy.get('[data-testId="search-bar"]').type('Principito')
    cy.get('[data-testId="product-card"]').should('have.length',2)
    
    cy.get('[data-testId="search-bar"]').clear().type('Tortugas')
    cy.get('[data-testId="product-card"]').should('have.length',1)

    cy.get('[data-testId="search-bar"]').clear().type('Caramelos')
    cy.get('[data-testId="product-card"]').should('have.length',0)
  })

  it('Adds products to shopping cart', () => {
    cy.get('[data-testId="search-bar"]').clear()
    cy.get('[data-testId="add-to-cart"]').first().click()
    cy.get('[data-testId="cart"]').find('span.v-badge').contains('1')
  })

  it('Deletes products from shopping cart', () => {
    cy.get('[data-testId="cart"]').click()
    cy.get('[data-testId="shopping-cart-item"]').should('have.length',1)
    cy.get('[data-testId="clearcart"]').click()
    cy.get('.v-card__title').contains('Carrito vacío')
  })
})