import { useNoteQuery } from "@/features/notes/hooks/useNoteQuery";

const useNote = () => {
  const { data: note, isLoading, error } = useNoteQuery();

  return {
    note: note || null,
    isLoading,
    error,
  };
};

export default useNote;
