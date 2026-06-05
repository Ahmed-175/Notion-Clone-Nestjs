import useToast from "@/hooks/useToast";
import { nodeService } from "@/services/node.service";
import { useQuery } from "@tanstack/react-query";
import { INode } from "../types/node.type";

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
