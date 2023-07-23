import { v4 as uuid } from "uuid";

export class Guid {
  value: string;

  constructor(id?: string) {
    this.value = id || uuid();
  }

  toValue(): string {
    return this.value;
  }
}
