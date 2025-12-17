import debounce from "lodash.debounce";
import { searchCache, searchVar } from "@/components/localState/search/Cache";
import { GET_SEARCH_TEXT } from "@/components/localState/search/localQuery";

export const debouncedWriteSearch = debounce(
  (text: string) => {
    searchCache.writeQuery({
      query: GET_SEARCH_TEXT,
      data: {
        searchText: searchVar(text),
      },
    });
  },
  500
);
