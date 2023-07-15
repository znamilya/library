import { faker } from "@faker-js/faker";

import { Book } from "./book";

export const makeBook = (book: Partial<Book> = {}): Book => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence(3),
  author: faker.person.fullName(),
  description: faker.lorem.sentences(3),
  isbn: String(faker.number.int(10)),
  ...book,
});
