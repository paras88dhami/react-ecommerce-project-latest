import { InMemoryCache, makeVar } from "@apollo/client";

export const searchVar = makeVar<string>("");

export const searchCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        searchText: {
           read(): string{
            return searchVar();
          },
        },
      },
    },
  },
});