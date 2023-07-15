abstract class BasePage {
  url = "/";

  visit() {
    cy.visit(this.url);
  }
}

export { BasePage };
