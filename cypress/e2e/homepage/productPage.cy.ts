import { productDetails } from "../../support/page_objects/ProductDetails";

describe("Product page", () => {
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

    it('should be able to search for a specific product', () => {
        cy.visit('/');
        cy.get('input[data-test="search-query"]').type('Pliers');
        cy.get('button[data-test="search-submit"]').click();
        cy.get('a[data-test^=product-]').should((item) => {
            expect(item).to.have.length(4);
        })
    })

    it('should be able to filter products by category', () => {
        cy.visit('/');
        cy.contains('label', 'Chisels').click();
        cy.get('a[data-test^=product-]').should((item) => {
            expect(item).to.have.length(3);
        })
    })

    it('should be able to view product details', () => {
        cy.visit('/');
        cy.get('a[data-test^=product-]').eq(0).click();
        cy.get('h1[data-test="product-name"]').should('contain', productDetails.CombinationPliers.title)
        cy.get('span[aria-label="category"]').should('contain', productDetails.CombinationPliers.category)
        cy.get('span[aria-label="brand"]').should('contain', productDetails.CombinationPliers.brand)
        cy.get('span[data-test="unit-price"]').should('contain', productDetails.CombinationPliers.price)
        cy.get('p[data-test="product-description"]').should('contain', productDetails.CombinationPliers.description)
        cy.get('img').should('have.attr', 'alt', productDetails.CombinationPliers.imageAlt)
    })

    it('should be able to add products to cart', () => {
        cy.visit('/');
        cy.addToCart();
        cy.wait(5000);
        cy.get('a[data-test="nav-cart"]').click();
        cy.get('span[data-test="product-title"]').should((item) => {
            expect(item).to.have.length(3);
        })
    });

    it('should be able to update product count in cart', () => {
        cy.visit('/');
        cy.addToCart();
        cy.wait(5000);
        cy.get('a[data-test="nav-cart"]').click();
        cy.get('input[data-test="product-quantity"]').eq(0).type('2');
    });
});
