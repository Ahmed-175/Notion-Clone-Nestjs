import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";

export const uploadPicture = async (file: FormData) => {
  const res = await axiosInstance.post(endpoints.user.uplaodPicture, file);
  return res.data;
};
