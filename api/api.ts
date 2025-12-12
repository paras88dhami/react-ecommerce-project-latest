import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError, AxiosResponse } from "axios";
import { PostApiParams } from "../store/store";

const BASE_URL = "https://dummyjson.com";

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export default instance;

instance.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token && config.headers) {
      
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } catch (err) {
   
  }
  return config;
});

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



export const PostApiData = async <T>({ url, formData }: PostApiParams<T>) => {
  try {
    const response = await instance({
      method: "POST",
      url: `${url}`,
      data: formData,
      transformResponse: [
        function (responseData) {
          return JSON.parse(responseData);
        },
      ],
    });
    return response; 
  } catch (error) {
    const err = error as AxiosError;
    const status = err.response?.status;
    const serverData = err.response?.data;
    const serverMessage = serverData && typeof serverData === "object" ? JSON.stringify(serverData) : serverData;
    const message = `[${status ?? "?"}] ${serverMessage ?? err.message}`;
    throw new Error(message);
  }
};