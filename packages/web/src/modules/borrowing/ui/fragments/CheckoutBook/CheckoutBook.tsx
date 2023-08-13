import { BookId } from "@/modules/books";

import { useViewAllBooks } from "@/modules/books/useCases";
import { useViewAllMembers } from "@/modules/members/useCases/useViewAllMembers";
import { CheckoutBookForm } from "../../components/CheckoutBookForm";

type CheckoutBookProps = {
  bookId?: BookId;
};

const CheckoutBookFragment = ({ bookId }: CheckoutBookProps) => {
  const books = useViewAllBooks();
  const members = useViewAllMembers();
  // const checkoutBookUseCase = useCheckoutBook({ bookId });

  if (!members || !books) {
    return <div>Loading...</div>;
  }

  return <CheckoutBookForm books={books} members={members} onSubmit={console.log} />;
};

export { CheckoutBookFragment };
