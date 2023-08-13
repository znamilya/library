import { InMemoryBooksRepo } from "../infra/repos/InMemoryBooksRepo";
import { InMemoryBorrowingsRepo } from "../infra/repos/InMemoryBorrowingsRepo";
import { InMemoryMembersRepo } from "../infra/repos/InMemoryMembersRepo";
import { PrismaBookRepo } from "../infra/repos/PrismaRepo/PrismaBooksRepo";
import { WinstonLogger } from "../shared/logger";
import { AddBookUseCase } from "./books/AddBook";
import { CheckInBookUseCase } from "./books/CheckInBook";
import { CheckoutBookUseCase } from "./books/CheckoutBook";
import { GetAllBooksUseCase } from "./books/GetAllBooks";
import { RemoveBookUseCase } from "./books/RemoveBook";
import { GetAllBorrowingsUseCase } from "./borrowings/GetAllBorrowingsUseCase";

const dbContext = {
  books: [
    {
      id: "1",
      title: "The Lord of the Rings",
      isbn: "9992158107",
      author: "J. R. R. Tolkien",
      isRemoved: false,
    },
    {
      id: "2",
      title: "The Hobbit",
      isbn: "9971502100",
      author: "J. R. R. Tolkien",
      isRemoved: false,
    },
    {
      id: "3",
      title: "Harry Potter and the Philosopher's Stone",
      isbn: "9604250590",
      author: "J. K. Rowling",
      isRemoved: false,
    },
  ],
  borrowings: [],
  members: [
    {
      id: "10",
      name: "John Doe",
      isBlocked: false,
    },
    {
      id: "11",
      name: "John Doe",
      isBlocked: false,
    },
  ],
};

const logger = new WinstonLogger();
const prismaBooksRepo = new PrismaBookRepo();
const booksRepo = new InMemoryBooksRepo(dbContext);
const membersRepo = new InMemoryMembersRepo(dbContext);
const borrowingsRepo = new InMemoryBorrowingsRepo(dbContext);

export const getAllBooksUseCase = new GetAllBooksUseCase(prismaBooksRepo, logger);
export const checkoutBookUseCase = new CheckoutBookUseCase(
  booksRepo,
  membersRepo,
  borrowingsRepo,
  logger,
);
export const checkInBookUseCase = new CheckInBookUseCase(booksRepo, borrowingsRepo, logger);
export const addBookUseCase = new AddBookUseCase(prismaBooksRepo, logger);
export const removeBookUseCase = new RemoveBookUseCase(prismaBooksRepo, logger);

export const getAllBorrowingsUseCase = new GetAllBorrowingsUseCase(borrowingsRepo);
