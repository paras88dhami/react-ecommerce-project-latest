
import { PostHookProps } from "@/types/type";
import { useMutation, } from "@tanstack/react-query";
import { PostApiData } from "../api/api";

const usePostHook = <T,>({ url }: PostHookProps<T>) => {
  return useMutation({
    mutationFn: async (payload: any) => {
      const response = await PostApiData<T>({
        url: url,
        formData: payload,
      });
      if (!response) throw new Error("No response from server");
      return response.data;
    },
  });
};

export default usePostHook;

