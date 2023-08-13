import { Book } from "@/modules/books";
import { Member } from "@/modules/members";

type CheckoutBookFormProps = {
  books: Book[];
  members: Member[];
  onSubmit: (bookId: Book["id"], memberId: Member["id"]) => void;
};

export const CheckoutBookForm = ({ books, onSubmit }: CheckoutBookFormProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const bookId = event.currentTarget.elements["bookId"].value;
        const memberId = event.currentTarget.elements["memberId"].value;

        onSubmit(bookId, memberId);
      }}
    >
      <div>Member</div>
      <select name="memberId">
        <option value={1}>Member 1</option>
        <option value={2}>Member 2</option>
      </select>

      <div>Book</div>
      <select name="bookId">
        {books.map((book) => (
          <option key={book.id} value={book.id}>
            {book.title}
          </option>
        ))}
      </select>

      <button type="submit">Checkout</button>
    </form>
  );
};
