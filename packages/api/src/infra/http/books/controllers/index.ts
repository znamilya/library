import {
  addBookUseCase,
  checkInBookUseCase,
  checkoutBookUseCase,
  getAllBooksUseCase,
  removeBookUseCase,
} from "../../../../useCases";
import { AddBookController } from "./AddBook";
import { CheckInBookController } from "./CheckInBook";
import { CheckoutBookController } from "./CheckoutBook";
import { GetAllBooksController } from "./GetAllBooks";
import { RemoveBookController } from "./RemoveBook";

export const addBookController = new AddBookController(addBookUseCase);
export const checkInBookController = new CheckInBookController(checkInBookUseCase);
export const checkoutBookController = new CheckoutBookController(checkoutBookUseCase);
export const getAllBooksController = new GetAllBooksController(getAllBooksUseCase);
export const removeBookController = new RemoveBookController(removeBookUseCase);
