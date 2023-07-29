import { getAllBorrowingsUseCase } from "../../../../useCases";
import { AllBorrowingsController } from "./AllBorrowingsController";

export const allBorrowingsController = new AllBorrowingsController(getAllBorrowingsUseCase);
