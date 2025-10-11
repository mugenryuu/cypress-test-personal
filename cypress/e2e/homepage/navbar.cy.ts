import { navLinks } from "../../support/page_objects/NavBar";

describe("Nav Bar", () => {    
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

    it('should be able to load the page of every navigation bar links', () => {
        cy.visit('/')
        navLinks.forEach((link) => {
            if(link.parent) {
                cy.get(link.parent).click();
            }
            cy.contains(link.label).click();
            cy.url().should('include', link.url);
            cy.go('back');
        })
    })
});