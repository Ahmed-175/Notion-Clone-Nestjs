import { useNodeMutations } from "@/features/nodes/hooks/useNodeMutations";

const useNodeActions = () => {
  const { createNode, renameNode, deleteNode, toggleFavorite } = useNodeMutations();

  const addNode = async (
    title: string,
    type: "folder" | "note",
    parentId: string | null,
  ) => {
    return createNode.mutateAsync({ title, type, parentId });
  };

  const renameNodeAction = async (id: string, title: string) => {
    return renameNode.mutateAsync({ id, title });
  };

  const deleteNodeAction = async (id: string) => {
    return deleteNode.mutateAsync(id);
  };

  const toggleFavoriteNode = async (id: string) => {
    return toggleFavorite.mutateAsync(id);
  };

  return {
    addNode,
    renameNode: renameNodeAction,
    deleteNode: deleteNodeAction,
    toggleFavoriteNode,
  };
};

export default useNodeActions;
