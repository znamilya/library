class BaseComponent {
  protected parent?: any;

  constructor(protected selector: string, private element?: any) {}

  get() {
    if (this.element) {
      return this.element;
    }

    if (this.parent) {
      return this.parent.get().find(this.selector);
    }

    return cy.get(this.selector);
  }

  bind(parent: any) {
    this.parent = parent;

    return this;
  }
}

export { BaseComponent };
