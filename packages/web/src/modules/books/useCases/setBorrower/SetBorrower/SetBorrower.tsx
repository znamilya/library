import { BookId } from "@/modules/books/domain";
import { Button, TextField } from "@mui/material";
import { useSetBorrower } from "../useSetBorrower";
import { useState } from "react";

type SetBorrowerFragmentProps = {
  bookId: BookId;
};

export const SetBorrowerFragment = ({ bookId }: SetBorrowerFragmentProps) => {
  const { setBorrower, isBorrowing } = useSetBorrower();

  const [borrower, setLocalBorrower] = useState("");

  return (
    <div>
      <TextField value={borrower} onChange={(e) => setLocalBorrower(e.target.value)} />
      <Button variant="contained" size="small" onClick={() => setBorrower(bookId, borrower)}>
        {isBorrowing ? "..." : "Set borrower"}
      </Button>
    </div>
  );
};
