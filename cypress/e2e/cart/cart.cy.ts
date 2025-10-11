describe("Cart", () => {
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
        cy.get('input[data-test="product-quantity"]').eq(0)
            .invoke('val', '2')
            .trigger('change');
    });

    it.only('should be able to remove product from cart', () => {
        cy.visit('/');
        cy.addToCart();
        cy.wait(5000);
        cy.get('a[data-test="nav-cart"]').click();
        cy.get('svg[data-icon="xmark"]').eq(0).click();
    });
});
