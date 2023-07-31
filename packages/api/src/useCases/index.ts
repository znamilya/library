import { InMemoryBooksRepo } from "../infra/repos/InMemoryBooksRepo";
import { InMemoryBorrowingsRepo } from "../infra/repos/InMemoryBorrowingsRepo";
import { InMemoryMembersRepo } from "../infra/repos/InMemoryMembersRepo";
import { AddBookUseCase } from "./AddBook";
import { CheckInBookUseCase } from "./CheckInBook";
import { CheckoutBookUseCase } from "./CheckoutBook";
import { GetAllBooksUseCase } from "./GetAllBooks";
import { RemoveBookUseCase } from "./RemoveBook";
import { GetAllBorrowingsUseCase } from "./borrowings/GetAllBorrowingsUseCase";

const dbContext = {
  books: [
    {
      id: "1",
      title: "The Lord of the Rings",
      isbn: "9992158107",
      author: "J. R. R. Tolkien",
      borrowingIds: [],
    },
    {
      id: "2",
      title: "The Hobbit",
      isbn: "9971502100",
      author: "J. R. R. Tolkien",
      borrowingIds: [],
    },
    {
      id: "3",
      title: "Harry Potter and the Philosopher's Stone",
      isbn: "9604250590",
      author: "J. K. Rowling",
      borrowingIds: [],
    },
    {
      id: "4",
      title: "The Hitchhiker's Guide to the Galaxy",
      isbn: "8090273416",
      author: "Douglas Adams",
      borrowingIds: [],
    },
    {
      id: "5",
      title: "1984",
      isbn: "007462542X",
      author: "George Orwell",
      borrowingIds: [],
    },
  ],
  borrowings: [],
  members: [
    {
      id: "10",
      name: "John Doe",
      isBlocked: false,
      borrowingIds: [],
    },
  ],
};
const booksRepo = new InMemoryBooksRepo(dbContext);
const membersRepo = new InMemoryMembersRepo(dbContext);
const borrowingsRepo = new InMemoryBorrowingsRepo(dbContext);

export const getAllBooksUseCase = new GetAllBooksUseCase(booksRepo);
export const checkoutBookUseCase = new CheckoutBookUseCase(booksRepo, membersRepo, borrowingsRepo);
export const checkInBookUseCase = new CheckInBookUseCase(booksRepo, borrowingsRepo);
export const addBookUseCase = new AddBookUseCase(booksRepo);
export const removeBookUseCase = new RemoveBookUseCase(booksRepo);

export const getAllBorrowingsUseCase = new GetAllBorrowingsUseCase(borrowingsRepo);
