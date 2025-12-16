import { type QueryKey } from "@tanstack/react-query";

export type PostApiParams<T> = {
  url: string;
  formData: T;
};


export type Product = {
  id: number;
  title: string;
  price: number;
  image?: string; 
  thumbnail?: string;
  images?: string[];
  description: string;
  uid?: string;
};


export interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  rounded?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export interface UseGetHooksProps<T> {
  queryKey: QueryKey;
  url: string;
  params?: any;
  enabled?: boolean;
}

export interface PostHookProps<T> {
  url: string;
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  image?: string;
};

export type UsersResponse = {
  users: User[];
};


