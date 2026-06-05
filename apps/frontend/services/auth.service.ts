import axiosInstance from "@/shared/lib/axiosInstance";
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
  const res: any = await axiosInstance.post(endpoints.user.register, {
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
  const res: any = await axiosInstance.post(endpoints.user.login, {
    email,
    password,
  });

  return res.data;
};

export const me = async () => {
  const res : any = await axiosInstance.get("/auth/me");

  return res.data;
};
