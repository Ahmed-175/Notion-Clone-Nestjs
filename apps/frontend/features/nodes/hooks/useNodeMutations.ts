import { useMutation, useQueryClient } from "@tanstack/react-query";
import { nodeService } from "@/services/node.service";
import useToast from "@/hooks/useToast";

export const useNodeMutations = () => {
  const queryClient = useQueryClient();
  const { showMgs } = useToast();

  const createNode = useMutation({
    mutationFn: (data: {
      title: string;
      type: "folder" | "note";
      parentId: string | null;
    }) => nodeService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nodes"] });
      showMgs({ type: "success", message: "Item created successfully" });
    },
    onError: (error: any) => {
      showMgs({
        type: "error",
        message: error.response?.data?.message || "Failed to create item",
      });
    },
  });

  const renameNode = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      nodeService.update(id, { title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nodes"] });
      showMgs({ type: "success", message: "Renamed successfully" });
    },
    onError: (error: any) => {
      showMgs({
        type: "error",
        message: error.response?.data?.message || "Failed to rename",
      });
    },
  });

  const deleteNode = useMutation({
    mutationFn: (id: string) => nodeService.softDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nodes"] });
      queryClient.invalidateQueries({ queryKey: ["trash"] });
      showMgs({ type: "success", message: "Moved to trash" });
    },
    onError: (error: any) => {
      showMgs({
        type: "error",
        message: error.response?.data?.message || "Failed to delete",
      });
    },
  });

  const toggleFavorite = useMutation({
    mutationFn: (id: string) => nodeService.toggleFavorite(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["nodes"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      showMgs({
        type: "success",
        message: res.data.message,
      });
    },
    onError: (error: any) => {
      showMgs({
        type: "error",
        message: error.response?.data?.message || "Failed to update favorite",
      });
    },
  });

  return {
    createNode,
    renameNode,
    deleteNode,
    toggleFavorite,
  };
};
