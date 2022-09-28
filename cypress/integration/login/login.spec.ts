import { urls } from "../../config/urls"

describe('user login scenarios', () => {
  beforeEach(() => {
    cy.visit('https://demo.sylius.com/en_US/') //TODO: move it to url file
  })

  it('sign in with email and password', () => {
    cy.findByText('Login').click()
    cy.get('#_username').type('shop@example.com')
    cy.get('#_password').type('sylius')
    cy.findAllByText('Login').last().click()
    cy.findByDisplayValue('My account').should('be.visible')
  })

  it('account registration', () => {
    cy.findByText('Register').click()
    cy.location('pathname').should('include', 'register')

    cy.generateUserInfo().then((user) => {
      cy.get('#sylius_customer_registration_firstName').type(user.firstName)
      cy.get('#sylius_customer_registration_lastName').type(user.lastName)
      cy.get('#sylius_customer_registration_email').type(user.email)
      cy.get('#sylius_customer_registration_phoneNumber').type(user.phoneNumber)
      cy.get('#sylius_customer_registration_user_plainPassword_first').type(user.password)
      cy.get('#sylius_customer_registration_user_plainPassword_second').type(user.password)

      cy.findByText('Create an account').click()

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

      it('subscribing to the newsletter', () => {
        cy.findByText('Register').click()
        cy.location('pathname').should('include', 'register')
    
        cy.generateUserInfo().then((user) => {
          cy.get('#sylius_customer_registration_firstName').type(user.firstName)
          cy.get('#sylius_customer_registration_lastName').type(user.lastName)
          cy.get('#sylius_customer_registration_email').type(user.email)
          cy.get('#sylius_customer_registration_phoneNumber').type(user.phoneNumber)
          cy.get('#sylius_customer_registration_user_plainPassword_first').type(user.password)
          cy.get('#sylius_customer_registration_user_plainPassword_second').type(user.password)
    
          cy.findByText('Create an account').click()
        })
    
        })
  })
})
