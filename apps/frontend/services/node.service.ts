import axiosInstance from "@/api/axiosInstance";

export const addNode = async (
  title: string,
  type: "folder" | "note",
  parentId: string | null,
) => {
  const data = await axiosInstance.post("/nodes/create", {
    title,
    type,
    parentId,
  });
  return data.data;
};
