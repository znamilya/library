import { ISaveBookRepo } from "@/modules/books/repos/BooksRepo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addBook } from "../../infrastructure/api";
import { allBooksCacheKey } from "./useFindAllBooks";

type UseAddBookExecuteParams = {
  title: string;
  author: string;
  isbn: string;
};

export const useRQSaveBook: ISaveBookRepo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(addBook, {
    onSuccess: () => {
      console.log("onSuccess");
      queryClient.invalidateQueries(allBooksCacheKey());
    },
  });

  const execute = (params: UseAddBookExecuteParams) => {
    mutation.mutateAsync(params);
  };

  return {
    execute,
    isExecuting: mutation.isLoading,
  };
};
