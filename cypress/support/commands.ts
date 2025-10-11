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
      checkAccount(): Chainable<void>;
      registerAccount(): Chainable<void>;
      addToCart(): Chainable<void>;
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>;
    }
  }
}

const productIndex = [0, 1, 2];

Cypress.Commands.add("loginBypass", () => {
  cy.visit("/auth/login");
  cy.fixture<UsersFixture>("users").then((users) => {
    cy.get('input[data-test="email"]').type(users.validUser.email);
    cy.get('input[data-test="password"]').type(users.validUser.password);
    cy.get('input[data-test="login-submit"]').click();
  })
});

Cypress.Commands.add("checkAccount", () => {
  cy.intercept('POST', '/users/login').as('loginRequest')
  cy.loginBypass();
  cy.wait('@loginRequest').then((intercept) => {
    const status = intercept.response?.statusCode;

    if (status && status >= 400) {
      cy.registerAccount().then(() => {
        cy.loginBypass();
      });
    }

    else {
      cy.getCookies().then((cookies) => {
        cy.writeFile("cypress/fixtures/cookies.json", cookies);
      });
      cy.wait(5000);
    }
  })
})

Cypress.Commands.add("registerAccount", () => {
  cy.get('a[data-test="register-link"]').click();
  cy.fixture<UsersFixture>("users").then((users) => {
    cy.get('input[data-test="first-name"]').type(users.registerUser.firstName);
    cy.get('input[data-test="last-name"]').type(users.registerUser.firstName);
    cy.get('input[data-test="dob"]').type(users.registerUser.dob);
    cy.get('input[data-test="street"]').type(users.registerUser.street);
    cy.get('input[data-test="postal_code"]').type(users.registerUser.postalcode);
    cy.get('input[data-test="city"]').type(users.registerUser.city);
    cy.get('input[data-test="state"]').type(users.registerUser.state);
    cy.get('select[data-test="country"]').select(users.registerUser.country);
    cy.get('input[data-test="phone"]').type(users.registerUser.phone);
    cy.get('input[data-test="email"]').type(users.registerUser.email);
    cy.get('input[data-test="password"]').type(users.registerUser.password);
    cy.get('button[data-test="register-submit"]').click();
  });
})
Cypress.Commands.add("addToCart", () => {
  productIndex.forEach(index => {
    cy.get('h5[data-test="product-name"]').eq(index).click();
    cy.get('button[data-test="add-to-cart"]').click();
    cy.go('back')
  });
});