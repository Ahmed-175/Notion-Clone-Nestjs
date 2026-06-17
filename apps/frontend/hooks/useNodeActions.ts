import { nodeService } from "@/services/node.service";
import useToast from "@/hooks/useToast";
import { INode } from "@/types/node.type";
import useNodes from "./useNodes";

const useNodeActions = () => {
  const { setNodes } = useNodes();
  const { showMgs } = useToast();
  const addNode = async (
    title: string,
    type: "folder" | "note",
    parentId: string | null,
  ) => {
    try {
      const res = await nodeService.create({
        title,
        type,
        parentId,
      });

      const node: INode = (res.data as any).node;

      setNodes((prev) => {
        const newNodes = { ...prev };

        if (node.parentId == null) {
          newNodes[node._id as any] = node;
          return newNodes;
        }

        const parent = newNodes[node.parentId];

        if (parent) {
          newNodes[node._id as any] = node;

          newNodes[(parent as any)._id] = {
            ...parent,
            children: [...(parent.children || []), (node as any)._id],
          };
        }

        return newNodes;
      });

      showMgs({
        type: "success",
        message: `${type} created successfully`,
      });

      return node;
    } catch (error) {
      showMgs({
        type: "error",
        message: `failed to create ${type}`,
      });
    }
  };

  const renameNode = async (id: string, title: string) => {
    try {
      await nodeService.update(id, { title });
      setNodes((prev) => {
        const newNodes = { ...prev };
        if (newNodes[id]) {
          newNodes[id] = { ...newNodes[id], title };
        }
        return newNodes;
      });
      showMgs({ type: "success", message: "node renamed successfully" });
    } catch (error) {
      showMgs({ type: "error", message: "failed to rename node" });
    }
  };

  const deleteNode = async (id: string) => {
    try {
      await nodeService.softDelete(id);
      setNodes((prev) => {
        const newNodes = { ...prev };
        if (newNodes[id]) {
          newNodes[id] = { ...newNodes[id], isTrash: true };
        }
        return newNodes;
      });
      showMgs({ type: "success", message: "Node moved to trash" });
    } catch (error) {
      showMgs({ type: "error", message: "Failed to move node to trash" });
    }
  };

  const toggleFavoriteNode = async (id: string) => {
    try {
      const res = await nodeService.toggleFavorite(id);
      const updatedNode = (res.data as any).node;
      setNodes((prev) => {
        const newNodes = { ...prev };
        if (newNodes[id]) {
          newNodes[id] = { ...newNodes[id], isFavorite: updatedNode.isFavorite };
        }
        return newNodes;
      });
      showMgs({
        type: "success",
        message: updatedNode.isFavorite ? "Added to favorites" : "Removed from favorites",
      });
    } catch (error) {
      showMgs({ type: "error", message: "Failed to update favorites" });
    }
  };

  return { addNode, renameNode, deleteNode, toggleFavoriteNode };
};

export default useNodeActions;
