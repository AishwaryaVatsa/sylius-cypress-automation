import '@testing-library/cypress/add-commands'

type GenerateUserInfo = {
    email: string
    firstName: string
    lastName: string
    password: string
    phoneNumber: string
}

type UserStore = {
    email: string
    password: string
}

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Generates mock user info
             * @example cy.generateUserInfo().then((user)=>console.log(user.firstName))
             * @param user 
             */
            generateUserInfo(
                user?: Partial<GenerateUserInfo>
            ): Chainable<GenerateUserInfo>

            /** Saves user data*/
            saveUserToUserStore(data: Partial<UserStore>): Chainable<UserStore>

            /** Get saved user data*/
            getUserFromUserStore(): Chainable<UserStore>

            /** Login user with given email and password*/
            login(email: string, password: string): void
        }
    }
}

Cypress.Commands.add('login', (email, password) => {
    cy.findByText('Login').should('exist').click()

    cy.get('#_username').type(email)
    cy.get('#_password').type(password)

    cy.findAllByText('Login').last().click()

    cy.findByText('My account').should('be.visible')
    cy.findByText('Login').should('not.exist')
})

Cypress.Commands.add('generateUserInfo', ({
    email = Math.random().toString(36).substring(2, 11) + '@sylius.com',
    firstName = 'Test',
    lastName = 'Test',
    password = '!test123456',
    phoneNumber = '999777999'
} = {}) => {
    const userInfo = { email, firstName, lastName, password, phoneNumber }

    return cy.wrap(userInfo)
})

let userStore: UserStore = { email: null, password: null }

Cypress.Commands.add('saveUserToUserStore', (data) => {
    userStore = { ...userStore, ...data }
    return cy.wrap<UserStore>(userStore)
})

Cypress.Commands.add('getUserFromUserStore', () =>
    cy.wrap<UserStore>(userStore)
)




