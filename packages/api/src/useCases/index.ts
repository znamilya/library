import { InMemoryBooksRepo } from "../infra/repos/InMemoryBooksRepo";
import { InMemoryBorrowingsRepo } from "../infra/repos/InMemoryBorrowingsRepo";
import { InMemoryMembersRepo } from "../infra/repos/InMemoryMembersRepo";
import { AddBookUseCase } from "./AddBook";
import { CheckInBookUseCase } from "./CheckinBook";
import { CheckoutBookUseCase } from "./CheckoutBook";
import { GetAllBooksUseCase } from "./GetAllBooks";

const booksRepo = new InMemoryBooksRepo();
const membersRepo = new InMemoryMembersRepo();
const borrowingsRepo = new InMemoryBorrowingsRepo();

export const getAllBooksUseCase = new GetAllBooksUseCase(booksRepo);
export const checkoutBookUseCase = new CheckoutBookUseCase(booksRepo, membersRepo, borrowingsRepo);
export const checkInBookUseCase = new CheckInBookUseCase(booksRepo, borrowingsRepo);
export const addBookUseCase = new AddBookUseCase(booksRepo);
