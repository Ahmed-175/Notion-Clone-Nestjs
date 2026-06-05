import axiosInstance from "@/shared/lib/axiosInstance";
import { endpoints } from "@/api/endpoints";

export const uploadPicture = async (file: FormData) => {
  const res: any = await axiosInstance.post(endpoints.user.uplaodPicture, file);
  return res.data;
};
