import { UseCase } from "@/modules/shared/application/types";

import { Member } from "../domain";
import { useFindAllMembers } from "../repos/reactQueryMembersRepo/useFindAllMembers";

export const useViewAllMembers: UseCase<[void], Member[] | undefined> = () => {
  const allBooks = useFindAllMembers();

  // TODO: send error to bug tracker

  return allBooks;
};
