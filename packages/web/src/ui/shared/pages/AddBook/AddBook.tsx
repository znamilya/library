import { useRQSaveBook } from "@/modules/books/repos/reactQuery";
import { AddBookUseCase } from "@/modules/books/useCases";
import { Typography } from "@mui/material";

export const AddBookPage = () => {
  return (
    <>
      <Typography variant="h1" flexGrow={1} mb={3}>
        Add Book
      </Typography>

      <AddBookUseCase useSaveBook={useRQSaveBook} />
    </>
  );
};
