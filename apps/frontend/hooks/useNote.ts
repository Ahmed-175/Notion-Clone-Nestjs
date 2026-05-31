import { INote } from "@/types/note.type";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getNote } from "@/services/note.service";
import useToast from "./useToast";

const useNote = () => {
  const params = useParams<{ id: string }>();
  const { showMgs } = useToast();

  const [note, setNote] = useState<INote | null>(null);

  const id = params?.id;

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const note = await getNote(id);
        setNote(note);
      } catch (error: any) {
        console.error(error);
        showMgs({
          type: "error",
          message: error.response?.data?.message || "failed to get this Note",
        });
      }
    };

    fetchData();
  }, [id]);

  return {
    note,
  };
};

export default useNote;
