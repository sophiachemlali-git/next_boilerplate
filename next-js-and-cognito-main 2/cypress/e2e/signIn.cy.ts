describe('Sign In Flow', () => {
  it('should sign in with valid credentials', () => {
    cy.visit('/')

    cy.get('input[name="Email Address"]').type('yourEmail@revstarconsulting.com')
    cy.get('input[name="Password"]').type('yourPassword')

    cy.get('button[type="submit"]').click()

    cy.location('pathname').should('eq', '/dashboard/')
  })

  it('should display error message with invalid credentials', () => {
    cy.visit('/')

    cy.get('input[name="Email Address"]').type('invalid@example.com')
    cy.get('input[name="Password"]').type('invalid@Password')

    cy.get('button[type="submit"]').click()

    cy.contains('Invalid email or password. Please try again.').should('be.visible')
  })
})
