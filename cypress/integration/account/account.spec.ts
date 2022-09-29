import { pageIds } from "@config/testids"
import urls from "@config/urls"

const { register, account } = pageIds

describe('my account', () => {
  beforeEach(() => {
    cy.visit(urls.syliusUrls.HOMEPAGE)
  })

  it('account registration', () => {
    cy.findByText('Register').click()

    cy.location('pathname').should('include', urls.syliusUrls.REGISTER)

    cy.generateUserInfo().then((user) => {
      cy.get(register.FIRST_NAME_INPUT).type(user.firstName)
      cy.get(register.LAST_NAME_INPUT).type(user.lastName)
      cy.get(register.EMAIL_INPUT).type(user.email)
      cy.get(register.PH_NO_INPUT).type(user.phoneNumber)
      cy.get(register.PASSWORD_FIRST_INPUT).type(user.password)
      cy.get(register.PASSWORD_SECOND_INPUT).type(user.password)

      cy.findByText('Create an account').click()

      cy.saveUserToUserStore({ email: user.email, password: user.password })
    })

    cy.findAllByText(/Success/i).first().should('be.visible')
    cy.findByText(/Thank you for registering/i).should('be.visible')

    cy.log('Verify - user is not logged in')
    cy.findByText('Register').should('exist')
    cy.findByText('My account').should('not.exist')

  })

  it('subscribing to the newsletter', () => {
    cy.getUserFromUserStore().then((user) => {
      cy.login(user.email, user.password)
    })

    cy.findByText('My account').click()
    cy.location('pathname').should('include', urls.syliusUrls.ACCOUNT)

    cy.findByText('Edit').click()
    cy.location('pathname').should('include', urls.syliusUrls.ACCOUNT_EDIT)

    cy.get(account.SUBSCRIBE_TO_NEWSLETTER).should('not.be.checked').click({ force: true })
    cy.get(account.SUBSCRIBE_TO_NEWSLETTER).should('be.checked')
  })
})

