describe("Login Page", () => {
    beforeEach(() => {
        cy.checkAccount();
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
        cy.loginBypass();
    });
});