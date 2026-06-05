import axiosInstance from "@/shared/lib/axiosInstance";
import { nodesEndpoint } from "../api/endpoints";

export const nodeService = {
  create: (
    data:{
          title: string;
          type: "folder" | "note";
          parentId: string | null;
        }
      ,
  ) => {
    return axiosInstance.post(nodesEndpoint.create, data);
  },



  
  update: (id: string, data: { title: string }) => {
    return axiosInstance.put(nodesEndpoint.update(id), data);
  },
  getNodes: async () => {
    const res = await axiosInstance.get(nodesEndpoint.get);
    return res.data;
  },
};
