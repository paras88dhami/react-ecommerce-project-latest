import axios, { AxiosError, AxiosResponse } from "axios";

const BASE_URL = "https://fakestoreapi.com";

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export default instance;

export const ApiData = async <T>(
  url: string,
  params?: Record<string, any>
): Promise<AxiosResponse<T>> => {
  try {
    const response = await instance({
      method: "GET",
      url,
      params,
      transformResponse: [
        function (responseData) {
          return JSON.parse(responseData);
        },
      ],
    });

    return response;
  } catch (error) {
    const err = error as AxiosError;
    throw err;
  }
};
