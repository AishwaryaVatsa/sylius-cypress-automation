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
            getUserFromUserStore(
                userKey?: Partial<GenerateUserInfo>
            ): Chainable<GenerateUserInfo>

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


