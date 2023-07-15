class BaseFragment {
  selector: string;

  constructor(selector: string) {
    this.selector = selector;
  }

  get() {
    return cy.get(this.selector);
  }
}

export { BaseFragment };
