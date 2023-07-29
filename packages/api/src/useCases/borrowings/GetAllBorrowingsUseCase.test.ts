import { Borrowing } from "../../domain/entities/Borrowing";
import { InMemoryBorrowingsRepo } from "../../infra/repos/InMemoryBorrowingsRepo";
import { GetAllBorrowingsUseCase } from "./GetAllBorrowingsUseCase";

test("main success scenario", async () => {
  const borrowingsRepo = new InMemoryBorrowingsRepo([
    {
      id: "1",
      bookId: "1",
      memberId: "1",
      checkOutDate: new Date("2021-01-01"),
      dueDate: new Date("2021-01-08"),
      checkInDate: new Date("2021-01-07"),
    },
  ]);

  const getAllBorrowingsUseCase = new GetAllBorrowingsUseCase(borrowingsRepo);
  const result = await getAllBorrowingsUseCase.execute();

  expect(result.isRight()).toBe(true);
  const borrowings = result.value as Borrowing[];

  expect(borrowings).toHaveLength(1);
  expect(borrowings[0].id).toBe("1");
  expect(borrowings[0].bookId).toBe("1");
  expect(borrowings[0].memberId).toBe("1");
  expect(borrowings[0].checkOutDate).toStrictEqual(new Date("2021-01-01"));
  expect(borrowings[0].dueDate).toStrictEqual(new Date("2021-01-08"));
  expect(borrowings[0].checkInDate).toStrictEqual(new Date("2021-01-07"));
});

test("when there are no borrowings", async () => {
  const borrowingsRepo = new InMemoryBorrowingsRepo([]);
  const getAllBorrowingsUseCase = new GetAllBorrowingsUseCase(borrowingsRepo);

  const result = await getAllBorrowingsUseCase.execute();

  expect(result.isRight()).toBe(true);
  expect(result.value).toEqual([]);
});

test("when search by bookId", async () => {
  const borrowingsRepo = new InMemoryBorrowingsRepo([
    {
      id: "1",
      bookId: "1",
      memberId: "1",
      checkOutDate: new Date("2021-01-01"),
      dueDate: new Date("2021-01-08"),
      checkInDate: new Date("2021-01-07"),
    },
    {
      id: "2",
      bookId: "2",
      memberId: "1",
      checkOutDate: new Date("2021-01-01"),
      dueDate: new Date("2021-01-08"),
      checkInDate: new Date("2021-01-07"),
    },
    {
      id: "3",
      bookId: "2",
      memberId: "2",
      checkOutDate: new Date("2021-01-01"),
      dueDate: new Date("2021-01-08"),
      checkInDate: new Date("2021-01-07"),
    },
  ]);

  const getAllBorrowingsUseCase = new GetAllBorrowingsUseCase(borrowingsRepo);
  const result = await getAllBorrowingsUseCase.execute({ bookId: "2" });
  const borrowings = result.value as Borrowing[];

  expect(borrowings).toHaveLength(2);
  expect(borrowings[0].id).toBe("2");
  expect(borrowings[1].id).toBe("3");
});
