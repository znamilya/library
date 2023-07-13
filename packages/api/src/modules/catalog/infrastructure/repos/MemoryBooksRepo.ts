import { BooksRepo } from "./BooksRepo";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class MemoryBooksRepo implements BooksRepo {
  async findAll() {
    await wait(2000);

    return [];
  }
}

export { MemoryBooksRepo };
