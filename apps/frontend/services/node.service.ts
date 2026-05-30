import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";

export const nodeService = {
  create: (data: {
    title: string;
    type: "folder" | "note";
    parentId: string | null;
  }) => {
    return axiosInstance.post(endpoints.nodes.create, data);
  },
};
