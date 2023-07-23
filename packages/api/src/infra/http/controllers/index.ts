import { checkInBookUseCase, checkoutBookUseCase, getAllBooksUseCase } from "../../../useCases";
import { CheckInBookController } from "./CheckInBook";
import { CheckoutBookController } from "./CheckoutBook";
import { GetAllBooksController } from "./GetAllBooks";

export const getAllBooksController = new GetAllBooksController(getAllBooksUseCase);
export const checkoutBookController = new CheckoutBookController(checkoutBookUseCase);
export const checkInBookController = new CheckInBookController(checkInBookUseCase);
