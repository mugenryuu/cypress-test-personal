import { User, UsersFixture } from "../../../types";

describe("Login Page", () => {
    before(() => {
        cy.loginBypass();
    })

    beforeEach(() => {
        cy.readFile("cypress/fixtures/cookies.json").then((cookies) => {
            cookies.forEach((cookie: Cypress.Cookie) => {
                cy.setCookie(cookie.name, cookie.value, {
                    domain: cookie.domain,
                });
            });
        });
    });

    it("should be able to access account page after login", () => {
        cy.visit("/account");
    });

    it("should show error message on invalid login", () => {
        cy.visit("/auth/login");
        cy.fixture<UsersFixture>("users").then((users) => {
            cy.get('input[data-test="email"]').type(users.invalidUser.email);
            cy.get('input[data-test="password"]').type(users.invalidUser.password);
            cy.get('input[data-test="login-submit"]').click();
            cy.get('div[data-test="login-error"]').should("be.visible").and("contain", "Invalid email or password");
        })
    });
});