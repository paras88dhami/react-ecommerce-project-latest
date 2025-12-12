
import { useQuery, type QueryKey } from "@tanstack/react-query";
import { ApiData, } from "../api/api";


interface UseGetHookProps<T> {
  queryKey: QueryKey;
  url: string;
  params?: T | any;
  enabled?: boolean;
}

const useGetHook = <T,>({
  queryKey,
  url,
  params,
  enabled = true,
}: UseGetHookProps<T>) => {
  const { isLoading, isFetching, error, data, refetch } = useQuery<T, Error, T>(
    queryKey,
    async () => {
      const response = await ApiData<T>(url, params);
   
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      enabled,
    }
  );

  return { isLoading, isFetching, error, data, refetch, enabled };
};
export default useGetHook;



