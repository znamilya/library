import { PrismaBooksRepo, PrismaBorrowingsRepo, PrismaMembersRepo } from "../infra";
import { WinstonLogger } from "../shared/logger";
import { AddBookUseCase } from "./books/AddBook";
import { CheckInBookUseCase } from "./books/CheckInBook";
import { CheckoutBookUseCase } from "./books/CheckoutBook";
import { GetAllBooksUseCase } from "./books/GetAllBooks";
import { RemoveBookUseCase } from "./books/RemoveBook";
import { GetAllBorrowingsUseCase } from "./borrowings/GetAllBorrowingsUseCase";

const logger = new WinstonLogger();
const prismaBooksRepo = new PrismaBooksRepo();
const prismaMembersRepo = new PrismaMembersRepo();
const borrowingsRepo = new PrismaBorrowingsRepo();

export const getAllBooksUseCase = new GetAllBooksUseCase(prismaBooksRepo, logger);
export const checkoutBookUseCase = new CheckoutBookUseCase(
  prismaBooksRepo,
  prismaMembersRepo,
  borrowingsRepo,
  logger,
);
export const checkInBookUseCase = new CheckInBookUseCase(borrowingsRepo, logger);
export const addBookUseCase = new AddBookUseCase(prismaBooksRepo, logger);
export const removeBookUseCase = new RemoveBookUseCase(prismaBooksRepo, logger);

export const getAllBorrowingsUseCase = new GetAllBorrowingsUseCase(borrowingsRepo);
