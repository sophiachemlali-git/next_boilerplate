describe('Dashboard Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should sign in, navigate to dashboard, and perform additional actions', () => {
    cy.get('input[name="Email Address"]').type('yourEmail@revstarconsulting.com')
    cy.get('input[name="Password"]').type('yourPassword')
    cy.get('button[type="submit"]').click()

    cy.location('pathname').should('eq', '/dashboard/')

    cy.get('[data-testid="drawer-list"]').should('be.visible')
    cy.get('[data-testid="logout-button"]').should('be.visible')

    cy.contains('Logout').click()
    cy.location('pathname').should('eq', '/')
  })
})
