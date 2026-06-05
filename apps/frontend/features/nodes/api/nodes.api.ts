import { nodeService } from "../services/node.service";

export const nodesApi = {
  getNodes: async () => {
    const res: any = await nodeService.getNodes();
    return res.map;
  },
};
