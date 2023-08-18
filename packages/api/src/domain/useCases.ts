import { NewBookDto } from "../dtos/Book";
import { BaseUseCase } from "../shared/BaseUseCase";
import { IUseCase } from "../shared/application/types";
import { Book } from "./entities/Book";
import { Borrowing } from "./entities/Borrowing";

export type GetAllBooksUseParamsParams = {
  title?: string;
};
export type IGetAllBooksUseCase = IUseCase<GetAllBooksUseParamsParams, Book[]>;

export type IAddBookUseCase = BaseUseCase<NewBookDto, Book>;

export type CheckInBookUseCaseParams = { bookId: string; memberId: string };
export type ICheckInBookUseCase = IUseCase<CheckInBookUseCaseParams, Borrowing>;

export type CheckOutBookUseCaseParams = { bookId: string; memberId: string };
export type ICheckOutBookUseCase = IUseCase<CheckOutBookUseCaseParams, Book>;

export type RemoveBookUseCaseParams = { bookId: string };
export type IRemoveBookUseCase = BaseUseCase<RemoveBookUseCaseParams, Book>;

export type GetAllBorrowingsUseCaseParams = { bookId?: string };
export type IGetAllBorrowingsUseCase = IUseCase<GetAllBorrowingsUseCaseParams | void, Borrowing[]>;
