import { Borrowing } from "../../domain/entities/Borrowing";
import { InMemoryBorrowingsRepo } from "../../infra/repos/InMemoryBorrowingsRepo";
import { GetAllBorrowingsUseCase } from "./GetAllBorrowingsUseCase";

test("main success scenario", async () => {
  const borrowingsRepo = new InMemoryBorrowingsRepo({
    borrowings: [
      {
        id: "1",
        bookId: "123",
        memberId: "1",
        checkOutDate: new Date("2021-01-01"),
        dueDate: new Date("2021-01-08"),
        checkInDate: new Date("2021-01-07"),
      },
    ],
    books: [
      {
        id: "123",
        title: "The Lord of the Rings",
        isbn: "9992158107",
        author: "J. R. R. Tolkien",
      },
    ],
    members: [],
  });

  const getAllBorrowingsUseCase = new GetAllBorrowingsUseCase(borrowingsRepo);
  const result = await getAllBorrowingsUseCase.execute();

  expect(result.isRight()).toBe(true);
  const borrowings = result.value as Borrowing[];

  expect(borrowings).toHaveLength(1);
  expect(borrowings[0].id).toBe("1");
  expect(borrowings[0].bookId).toBe("123");
  expect(borrowings[0].memberId).toBe("1");
  expect(borrowings[0].checkOutDate).toStrictEqual(new Date("2021-01-01"));
  expect(borrowings[0].dueDate).toStrictEqual(new Date("2021-01-08"));
  expect(borrowings[0].checkInDate).toStrictEqual(new Date("2021-01-07"));
});

test("when there are no borrowings", async () => {
  const borrowingsRepo = new InMemoryBorrowingsRepo({
    books: [],
    borrowings: [],
    members: [],
  });
  const getAllBorrowingsUseCase = new GetAllBorrowingsUseCase(borrowingsRepo);

  const result = await getAllBorrowingsUseCase.execute();

  expect(result.isRight()).toBe(true);
  expect(result.value).toEqual([]);
});

test("when search by bookId", async () => {
  const borrowingsRepo = new InMemoryBorrowingsRepo({
    borrowings: [
      {
        id: "1",
        bookId: "12",
        memberId: "1",
        checkOutDate: new Date("2021-01-01"),
        dueDate: new Date("2021-01-08"),
        checkInDate: new Date("2021-01-07"),
      },
      {
        id: "2",
        bookId: "12",
        memberId: "1",
        checkOutDate: new Date("2021-01-01"),
        dueDate: new Date("2021-01-08"),
        checkInDate: new Date("2021-01-07"),
      },
      {
        id: "3",
        bookId: "13",
        memberId: "2",
        checkOutDate: new Date("2021-01-01"),
        dueDate: new Date("2021-01-08"),
        checkInDate: new Date("2021-01-07"),
      },
    ],
    books: [
      {
        id: "12",
        title: "The Lord of the Rings",
        isbn: "9992158107",
        author: "J. R. R. Tolkien",
      },
      {
        id: "12",
        title: "The Lord of the Rings",
        isbn: "9992158107",
        author: "J. R. R. Tolkien",
      },
      {
        id: "13",
        title: "Harry Potter and the Philosopher's Stone",
        isbn: "9604250590",
        author: "J. K. Rowling",
      },
    ],
    members: [],
  });

  const getAllBorrowingsUseCase = new GetAllBorrowingsUseCase(borrowingsRepo);
  const result = await getAllBorrowingsUseCase.execute({ bookId: "12" });
  const borrowings = result.value as Borrowing[];

  expect(borrowings).toHaveLength(2);
  expect(borrowings[0].id).toBe("1");
  expect(borrowings[1].id).toBe("2");
});
