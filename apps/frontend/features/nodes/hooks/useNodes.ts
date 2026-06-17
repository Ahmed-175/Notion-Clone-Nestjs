import useToast from "@/hooks/useToast";
import { nodeService } from "@/services/node.service";
import { useQuery } from "@tanstack/react-query";
import { INode } from "@/types/node.type";

export const useNodes = () => {
  const { showMgs } = useToast();
  return useQuery<Record<string, INode>>({
    queryKey: ["nodes"],
    queryFn: async () => {
      try {
        const data: any = await nodeService.getNodes();
        return data.map;
      } catch (error) {
        showMgs({
          type: "error",
          message: "failed to load your notes and folders",
        });
        throw error;
      }
    },
  });
};

export const useTrash = () => {
  const { showMgs } = useToast();
  return useQuery<INode[]>({
    queryKey: ["trash"],
    queryFn: async () => {
      try {
        return await nodeService.getTrash();
      } catch (error) {
        showMgs({
          type: "error",
          message: "failed to load trash",
        });
        throw error;
      }
    },
  });
};

export const useFavorites = () => {
  const { showMgs } = useToast();
  return useQuery<INode[]>({
    queryKey: ["favorites"],
    queryFn: async () => {
      try {
        return await nodeService.getFavorites();
      } catch (error) {
        showMgs({
          type: "error",
          message: "failed to load favorites",
        });
        throw error;
      }
    },
  });
};
