import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";
import { INote } from "@/types/note.type";

export const getNote = async (nodeId: string) : Promise<INote | null> => {
  const res = await axiosInstance.get(endpoints.notes.get(nodeId));
  return res.data;
};
