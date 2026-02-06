describe('Forgot Password Flow', () => {
  it('should send code successfully', () => {
    cy.visit('/forgot-password/')

    cy.get('input[name="Email Address"]').type('yourEmail@revstarconsulting.com')

    cy.get('button[type="submit"]').click()

    // Input verification code and new password
    cy.get('input[name="Verification Code"]').should('exist')
    cy.get('input[name="New Password"]').should('exist')
    cy.get('input[name="Confirm Password"]').should('exist')
  })

  it('should display error message with invalid credentials', () => {
    cy.visit('/forgot-password/')

    cy.get('input[name="Email Address"]').type('invalid@example.com')

    cy.get('button[type="submit"]').click()

    cy.contains('Please check your email and try again.').should('be.visible')
  })
})
