import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookId } from "../../domain";
import { checkInBook } from "../../infrastructure/api";
import { allBooksCacheKey } from "./useFindAllBooks";

export const useCheckInBook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(checkInBook, {
    onSuccess: (_data, { bookId }) => {
      console.log("checkInBook onSuccess", bookId);

      return queryClient.refetchQueries(allBooksCacheKey());
    },
  });

  const execute = (bookId: BookId) => {
    mutation.mutateAsync({
      bookId,
      memberId: "10",
    });
  };

  return {
    execute,
    isExecuting: mutation.isLoading,
  };
};
