import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";

export const getNodes = async () => {
  const res = await axiosInstance.get(endpoints.nodes);

  return res.data;
};

export const uploadPicture = async (file: FormData) => {
  const res = await axiosInstance.post(endpoints.uplaodPicture, file);
  return res.data;
};
