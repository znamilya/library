import { MemberId } from "@/modules/members";
import { useState } from "react";
import { BookId } from "../../domain";

export const useSetBorrower = () => {
  const [isBorrowing, setIsBorrowing] = useState(false);

  return {
    setBorrower: (bookId: BookId, memberId: MemberId) => {
      console.log(`Borrowing book ${bookId} to member ${memberId}`);
      setIsBorrowing(true);
    },
    isBorrowing,
  };
};
