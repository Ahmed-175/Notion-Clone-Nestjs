import { NodeContext } from "@/context/nodeContext";
import { useContext } from "react";

const useNodes = () => {
  const context = useContext(NodeContext);

  if (!context) {
    throw new Error("faild to get context of nodes");
  }

  return context;
};

export default useNodes;
