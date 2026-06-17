import axiosInstance from "@/shared/lib/axiosInstance";
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
  softDelete: (id: string) => {
    return axiosInstance.delete(endpoints.nodes.delete(id));
  },
  toggleFavorite: (id: string) => {
    return axiosInstance.patch(endpoints.nodes.toggleFavorite(id));
  },
  restore: (id: string) => {
    return axiosInstance.patch(endpoints.nodes.restore(id));
  },
  getNodes: async () => {
    const res : any = await axiosInstance.get(endpoints.nodes.get);
    return res.data;
  },
  getTrash: async () => {
    const res: any = await axiosInstance.get(endpoints.nodes.trash);
    return res.data;
  },
  getFavorites: async () => {
    const res: any = await axiosInstance.get(endpoints.nodes.favorites);
    return res.data;
  },
};
