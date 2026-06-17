import { useQuery } from "@tanstack/react-query";
import { getNote } from "@/services/note.service";
import useToast from "@/hooks/useToast";
import { useParams } from "next/navigation";

export const useNoteQuery = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { showMgs } = useToast();

  return useQuery({
    queryKey: ["note", id],
    queryFn: async () => {
      if (!id) return null;
      try {
        return await getNote(id);
      } catch (error: any) {
        showMgs({
          type: "error",
          message: error.response?.data?.message || "Failed to get this note",
        });
        throw error;
      }
    },
    enabled: !!id,
  });
};
