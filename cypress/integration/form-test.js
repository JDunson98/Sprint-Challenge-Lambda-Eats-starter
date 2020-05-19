describe("Testing Form Inputs", () => {
    beforeEach(function() {
        cy.visit("http://localhost:3000");
    });
    it("Tests for Text Input", () => {
        cy.get('input[name="name"]').type("Test Name")
        .should("have.value", "Test Name");

    })
    it("Tests for Multiple Toppings", () => {
        cy.get('input[type="checkbox"]').check()
        .should("be.checked");
    })
    it("Tests for Form Submit", () => {
        cy.get('input[name="name"]').type("Test Name")
        cy.get('input[name="topping"]').check()
        cy.get('input[type="radio"]').check()
        cy.get('form').submit()
    })
})