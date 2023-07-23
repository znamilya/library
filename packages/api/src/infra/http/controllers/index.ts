import { checkoutBookUseCase, getAllBooksUseCase } from "../../../useCases";
import { CheckoutBookController } from "./CheckoutBook";
import { GetAllBooksController } from "./GetAllBooks";

export const getAllBooksController = new GetAllBooksController(getAllBooksUseCase);
export const checkoutBookController = new CheckoutBookController(checkoutBookUseCase);
