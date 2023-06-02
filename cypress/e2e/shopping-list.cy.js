describe("This is my first cypress test", () => {
  it("should create an items list successfully", () => {
    cy.visit("http://localhost:8091");
    cy.get("[data-test='add-list-button']").click()
    cy.get("[data-test='name-shopping-list']").type("prueba")
    cy.get("[data-test='add-shopping-list-btn']").click()
  });
});
