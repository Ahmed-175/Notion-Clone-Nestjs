import { nodeService } from "@/services/node.service";
import useNodes from "@/hooks/useNodes";
import useToast from "@/hooks/useToast";
import { INode } from "@/types/node.type";

const useNodeActions = () => {
  const { setNodes, nodes } = useNodes();
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

  return { addNode, renameNode };
};

export default useNodeActions;
