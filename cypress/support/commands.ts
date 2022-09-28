// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

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
    cy.findByText('Login').click()
    cy.get('#_username').type(email)
    cy.get('#_password').type(password)
    cy.findAllByText('Login').last().click()
    cy.findByDisplayValue('My account').should('be.visible')
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




