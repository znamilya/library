import { Button } from "@mui/material";

type BorrowersListProps = {
  // borrowings: Borrowing[];
  borrowings: string[];
  onCheckIn: (borrowings: string) => void;
};

export const BorrowersList = ({ borrowings, onCheckIn }: BorrowersListProps) => {
  return (
    <span>
      {borrowings.map((borrowings) => (
        <span key={borrowings}>
          <span>{borrowings}</span>
          <Button variant="outlined" size="small" onClick={() => onCheckIn(borrowings)}>
            Check-in
          </Button>
        </span>
      ))}
    </span>
  );
};
