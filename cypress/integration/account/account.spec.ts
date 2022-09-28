import { urls } from "../../config/urls"

describe('my account', () => {
  beforeEach(() => {
    cy.visit(urls.syliusUrls.HOMEPAGE)
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

      cy.saveUserToUserStore({ email: user.email, password: user.password })
    })
  })

  it('subscribing to the newsletter', () => {
    cy.getUserFromUserStore().then((user) => {
      cy.login(user.email, user.password)
    })
    cy.findByText('My account').click()

    cy.location('pathname').should('include', urls.syliusUrls.ACCOUNT)

    cy.findByText('Edit').click()
    cy.location('pathname').should('include', urls.syliusUrls.ACCOUNT_EDIT)


    cy.get('#sylius_customer_profile_subscribedToNewsletter').should('not.be.checked')
    cy.get('#sylius_customer_profile_subscribedToNewsletter').click({ force: true })
    cy.get('#sylius_customer_profile_subscribedToNewsletter').should('be.checked')
  })
})

