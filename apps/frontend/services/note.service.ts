import axiosInstance from "@/shared/lib/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { INote } from "@/types/note.type";

export const getNote = async (nodeId: string) : Promise<INote | null> => {
  const res : any = await axiosInstance.get(endpoints.notes.get(nodeId));
  return res.data;
};
