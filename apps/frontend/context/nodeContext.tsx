import useToast from "@/hooks/useToast";
import { getNodes } from "@/services/user.service";
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
}

export const NodeContext = createContext<INodeContext | null>(null);
const NodeProvider = ({ children }: { children: ReactNode }) => {
  const [nodes, setNodes] = useState<Record<string, INode>>({});
  const [loading, setLoading] = useState(false);

  const { showMgs } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await getNodes();
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
    <NodeContext.Provider value={{ nodes, setNodes, loading }}>
      {children}
    </NodeContext.Provider>
  );
};

export default NodeProvider;
