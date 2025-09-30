/// <reference types="cypress" />
import { User, UsersFixture } from "../../types";
// ***********************************************
// This example commands.ts shows you how to
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
//
declare global {
  namespace Cypress {
    interface Chainable {
      loginBypass(): Chainable<void>;
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>;
    }
  }
}

Cypress.Commands.add("loginBypass", () => {
  cy.visit("/auth/login");
  cy.fixture<UsersFixture>("users").then((users) => {
    cy.get('input[data-test="email"]').type(users.validUser.email);
    cy.get('input[data-test="password"]').type(users.validUser.password);
    cy.get('input[data-test="login-submit"]').click();
  })
  cy.url().should("include", "/account");
  cy.getCookies().then((cookies) => {
    cy.writeFile("cypress/fixtures/cookies.json", cookies);
  });
});