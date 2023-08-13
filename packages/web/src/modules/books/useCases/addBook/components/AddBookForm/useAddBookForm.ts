import { useForm } from "react-hook-form";

export type AddBookFormValues = {
  title: string;
  author: string;
  isbn: string;
};

type UseAddBookFormParams = {
  onSubmit: (values: AddBookFormValues) => void;
};

export const useAddBookForm = ({ onSubmit }: UseAddBookFormParams) => {
  const form = useForm<AddBookFormValues>({
    defaultValues: {
      title: "Title",
      author: "Author",
      isbn: "9992158107",
    },
  });

  const handleSubmit = form.handleSubmit(onSubmit);

  // const values = form.watch();

  // console.log(values);

  return {
    fields: {
      title: form.register("title"),
      author: form.register("author"),
      isbn: form.register("isbn"),
    },
    handleSubmit,
  };
};
