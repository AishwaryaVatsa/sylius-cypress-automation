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

            /** */
            saveUserToUserStore(user: GenerateUserInfo, userKey: string): Chainable<GenerateUserInfo>

            /** */
            getUserFromUserStore(userKey: string): Chainable<Partial<GenerateUserInfo>>


        }
    }
}

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

let userStore: { [key: string]: Partial<GenerateUserInfo> }

Cypress.Commands.add('saveUserToUserStore', (user: GenerateUserInfo, userKey: string) => {
    userStore[userKey] = user
    return cy.wrap<GenerateUserInfo>(user)
})

Cypress.Commands.add('getUserFromUserStore', (userKey: string) => {
    const user = userStore[userKey]
    cy.log(`User found: ${user.email}`)
    cy.wrap(user).should('include.keys', ['email', 'password'])

    return cy.wrap<GenerateUserInfo>(user)
})




