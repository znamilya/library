import { useQuery } from "@tanstack/react-query";
import { FindAllMembers } from "../../domain/MembersRepo";

const cacheKeys = {
  allMembers: () => ["members", "all"],
};

export const useFindAllMembers: FindAllMembers = () => {
  const allMembersQuery = useQuery(cacheKeys.allMembers(), {
    // queryFn: getAllMembers,
    queryFn: () => {
      return [];
    },
    suspense: true,
  });

  if (allMembersQuery.isSuccess) {
    return allMembersQuery.data;
  }

  return undefined;
};
