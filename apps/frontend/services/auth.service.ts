import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";

export const register = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  const res = await axiosInstance.post(endpoints.register, {
    username,
    email,
    password,
  });

  return res.data;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post(endpoints.login, {
    email,
    password,
  });

  return res.data;
};

export const me = async () => {
  const res = await axiosInstance.get("/auth/me");

  return res.data;
};
