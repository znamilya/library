import { ISaveBookRepo } from "../../repos/BooksRepo";

import { AddBookForm } from "./components/AddBookForm";
import { AddBookFormValues } from "./components/AddBookForm/useAddBookForm";

type AddBookUseCaseProps = {
  useSaveBook: ISaveBookRepo;
};

export const AddBookUseCase = ({ useSaveBook }: AddBookUseCaseProps) => {
  const saveBook = useSaveBook();

  const handleAddBookFormSubmit = (values: AddBookFormValues) => {
    saveBook.execute(values);
  };

  return <AddBookForm onSubmit={handleAddBookFormSubmit} isAdding={saveBook.isExecuting} />;
};
