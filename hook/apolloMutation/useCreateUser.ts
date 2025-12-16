import { useMutation } from "@apollo/client";
import { CREATE_USER } from "@/graphql/mutation";

export const useCreateUser = () => {
  return useMutation(CREATE_USER, {
    update(cache, { data }) {
      const newUser = data?.createUser;
      if (!newUser) return;

      cache.modify({
        fields: {
          users(existing = {}) {
            return {
              ...existing,
              data: [newUser, ...(existing.data ?? [])],
            };
          },
        },
      });
    },
  });
};
