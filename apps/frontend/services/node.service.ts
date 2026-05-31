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
  update: (id: string, data: { title: string }) => {
    return axiosInstance.put(endpoints.nodes.update(id), data);
  },
  getNodes: async () => {
    const res = await axiosInstance.get(endpoints.nodes.get);
    return res.data;
  },
};
