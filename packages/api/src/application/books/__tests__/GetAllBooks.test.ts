import { Book } from "../../../domain/entities/Book";
import { InMemoryBooksRepo } from "../../../infra/repos/InMemoryBooksRepo";
import { MockLogger } from "../../../shared/logger/MockLogger";
import { GetAllBooksUseCase } from "../GetAllBooks";

test("main success scenario", async () => {
  const booksRepo = new InMemoryBooksRepo({
    books: [
      {
        id: "1",
        title: "The Lord of the Rings",
        isbn: "9992158107",
        author: "J. R. R. Tolkien",
      },
      {
        id: "2",
        title: "The Hobbit",
        isbn: "9971502100",
        author: "J. R. R. Tolkien",
      },
    ],
    borrowings: [],
    members: [],
  });
  const getAllBooksUseCase = new GetAllBooksUseCase(booksRepo, new MockLogger());
  const result = await getAllBooksUseCase.execute();

  expect(result.isRight()).toBe(true);

  const books = result.value as Book[];

  expect(books[0]).toBeInstanceOf(Book);
  expect(books[0].id).toBe("1");
  expect(books[0].title).toBe("The Lord of the Rings");
  expect(books[0].isbn.value).toBe("9992158107");
  expect(books[0].author).toBe("J. R. R. Tolkien");

  expect(books[1]).toBeInstanceOf(Book);
  expect(books[1].id).toBe("2");
  expect(books[1].title).toBe("The Hobbit");
  expect(books[1].isbn.value).toBe("9971502100");
  expect(books[1].author).toBe("J. R. R. Tolkien");
});

test("when there is no books in repo", async () => {
  const booksRepo = new InMemoryBooksRepo({
    books: [],
    borrowings: [],
    members: [],
  });
  const getAllBooksUseCase = new GetAllBooksUseCase(booksRepo, new MockLogger());
  const result = await getAllBooksUseCase.execute();
  const books = result.value as Book[];

  expect(books).toStrictEqual([]);
});

describe("when title was provided", () => {
  test("when there are no books were found", async () => {
    const booksRepo = new InMemoryBooksRepo({
      books: [
        {
          id: "1",
          title: "The Lord of the Rings",
          isbn: "9992158107",
          author: "J. R. R. Tolkien",
        },
      ],
      borrowings: [],
      members: [],
    });

    const getAllBooksUseCase = new GetAllBooksUseCase(booksRepo, new MockLogger());
    const result = await getAllBooksUseCase.execute({ title: "hobbit" });
    const books = result.value as Book[];

    expect(books).toStrictEqual([]);
  });

  test("when there are some books were found", async () => {
    const booksRepo = new InMemoryBooksRepo({
      books: [
        {
          id: "1",
          title: "The Lord of the Rings",
          isbn: "9992158107",
          author: "J. R. R. Tolkien",
        },
        {
          id: "2",
          title: "The Hobbit",
          isbn: "9971502100",
          author: "J. R. R. Tolkien",
        },
      ],
      borrowings: [],
      members: [],
    });

    const getAllBooksUseCase = new GetAllBooksUseCase(booksRepo, new MockLogger());
    const result = await getAllBooksUseCase.execute({ title: "hobbit" });
    const books = result.value as Book[];

    expect(books[0].id).toBe("2");
  });
});
