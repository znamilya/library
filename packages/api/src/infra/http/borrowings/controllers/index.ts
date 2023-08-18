import { getAllBorrowingsUseCase } from "../../../../application";
import { AllBorrowingsController } from "./AllBorrowingsController";

export const allBorrowingsController = new AllBorrowingsController(getAllBorrowingsUseCase);
