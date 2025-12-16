import { useMutation } from "@apollo/client";
import { DELETE_USER } from "@/graphql/mutation";
import { GET_USERS } from "@/graphql/query";
import { UserItem } from "@/types/apolloTypes";

export const useDeleteUser = () => {
  return useMutation(DELETE_USER, {
    update(cache, { data }, { variables }) {
      if (!data?.deleteUser) return;

      const deletedId = variables?.id;

   
      const existingData: any = cache.readQuery({
        query: GET_USERS,
        variables: { limit: 15 }, 
      });

      if (!existingData) return;

    
      const updatedUsers = existingData.users.data.filter(
        (user: UserItem) => user.id !== deletedId
      );

     
      cache.writeQuery({
        query: GET_USERS,
        variables: { limit: 15 },
        data: {
          users: {
            ...existingData.users,
            data: updatedUsers,
          },
        },
      });
    },
  });
};
