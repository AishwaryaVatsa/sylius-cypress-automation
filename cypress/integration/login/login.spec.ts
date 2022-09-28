import { urls } from "../../config/urls"

describe('user login', () => {
  beforeEach(() => {
    cy.visit(urls.syliusUrls.HOMEPAGE)
  })

  it('sign in with email and password', () => {
    cy.login('shop@example.com', 'sylius')
  })

  it('resetting a password', () => {
    cy.findByText('Login').click()
    cy.location('pathname').should('include', urls.syliusUrls.LOGIN)

    cy.findByText('Forgot password?').click()
    cy.location('pathname').should('include', urls.syliusUrls.FORGOTTEN_PASSWORD)

    cy.get('#sylius_user_request_password_reset_email').type('TestUSer1dfhjgjfh22@mailinator.com')
    cy.findByText('Reset').click()

    cy.location('pathname').should('include', urls.syliusUrls.LOGIN)

    cy.findByText('Success').should('be.visible')
    cy.findByText(/If the email you have specified exists in our system, we have sent there an instruction on how to reset your password./i).should('be.visible')
  })
})

