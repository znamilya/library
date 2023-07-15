import { BookDto } from "../../dtos/Book";
import { BooksRepo } from "./BooksRepo";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class MemoryBooksRepo implements BooksRepo {
  async findAll(): Promise<BookDto[]> {
    await wait(200);

    return [
      {
        id: "1",
        title: "The Lord of the Rings",
        description:
          "The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.",
        isbn: "9780261103252",
        author: "J. R. R. Tolkien",
      },
      {
        id: "2",
        title: "The Hobbit",
        description:
          "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien.",
        isbn: "9780544003415",
        author: "J. R. R. Tolkien",
      },
      {
        id: "3",
        title: "Harry Potter and the Philosopher's Stone",
        description:
          "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling.",
        isbn: "9780747532743",
        author: "J. K. Rowling",
      },
      {
        id: "4",
        title: "The Hitchhiker's Guide to the Galaxy",
        description:
          "The Hitchhiker's Guide to the Galaxy is a comic science fiction series created by Douglas Adams.",
        isbn: "9780345391803",
        author: "Douglas Adams",
      },
      {
        id: "5",
        title: "1984",
        description:
          "Nineteen Eighty-Four: A Novel, often published as 1984, is a dystopian social science fiction novel by English novelist George Orwell.",
        isbn: "9780451524935",
        author: "George Orwell",
      },
    ];
  }
}

export { MemoryBooksRepo };
