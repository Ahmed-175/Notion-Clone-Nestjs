import useToast from "@/hooks/useToast";
import { nodeService } from "@/services/node.service";
import { INode } from "@/types/node.type";
import {
  createContext,
  SetStateAction,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface INodeContext {
  nodes: Record<string, INode>;
  setNodes: React.Dispatch<SetStateAction<Record<string, INode>>>;
  loading: boolean;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  getTrash: () => Promise<INode[]>;
  getFavorites: () => Promise<INode[]>;
}

export const NodeContext = createContext<INodeContext | null>(null);
const NodeProvider = ({ children }: { children: ReactNode }) => {
  const [nodes, setNodes] = useState<Record<string, INode>>({});
  const [loading, setLoading] = useState(false);

  const { showMgs } = useToast();

  const getTrash = async () => {
    try {
      const data = await nodeService.getTrash();
      return data;
    } catch (error) {
      showMgs({ type: "error", message: "Failed to load trash" });
      return [];
    }
  };

  const getFavorites = async () => {
    try {
      const data = await nodeService.getFavorites();
      return data;
    } catch (error) {
      showMgs({ type: "error", message: "Failed to load favorites" });
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data: any = await nodeService.getNodes();
        setNodes(data.map);
      } catch (error) {
        showMgs({
          type: "error",
          message: "failed to load your notes and folders",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <NodeContext.Provider
      value={{ nodes, setNodes, loading, setLoading, getTrash, getFavorites }}
    >
      {children}
    </NodeContext.Provider>
  );
};

export default NodeProvider;
