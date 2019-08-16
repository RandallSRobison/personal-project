describe("this is the landing page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("logo loads", () => {
    cy.get(".main-logo").should("exist");
  });

  it("sign in inputs load", () => {
    cy.get(".inputs").should("exist");
  });
});
