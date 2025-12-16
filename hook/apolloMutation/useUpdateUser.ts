import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/graphql/mutation";
import { UserItem } from "@/types/apolloTypes";

export const useUpdateUser = () => {
  return useMutation(UPDATE_USER, {
    update(cache, { data }) {
      const updated = data?.updateUser;
      if (!updated) return;

      cache.modify({
        fields: {
          users(existing = {}) {
            return {
              ...existing,
              data: existing.data.map((u: UserItem) =>
                u.id === updated.id ? updated : u
              ),
            };
          },
        },
      });
    },
  });
};
