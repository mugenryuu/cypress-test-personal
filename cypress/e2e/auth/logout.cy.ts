describe("Logout function", () => {
    beforeEach(() => {
        cy.checkAccount().then(() => {
            cy.readFile("cypress/fixtures/cookies.json").then((cookies) => {
                cookies.forEach((cookie: Cypress.Cookie) => {
                    cy.setCookie(cookie.name, cookie.value, {
                        domain: cookie.domain,
                    });
                });
            });
        });
    });

    it("should be able to log out of the account", () => {
        cy.visit("/account");
        cy.get('a[data-test="nav-menu"]').click();
        cy.get('a[data-test="nav-sign-out"]').click();
        cy.url().should("include", "/auth/login");
    })


});