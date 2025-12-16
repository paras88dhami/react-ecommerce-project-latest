import { useQuery } from "@apollo/client";
import { GET_USERS } from "@/graphql/query";
import { GetUsersData, GetUsersVars } from "@/types/apolloTypes";

export const useUsers = (limit = 15) => {
  return useQuery<GetUsersData, GetUsersVars>(GET_USERS, {
    variables: { limit },
  });
};
