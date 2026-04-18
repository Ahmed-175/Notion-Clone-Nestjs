import { workflowContext } from "@/context/workflowContext";
import { useContext } from "react";

const useTab = () => {
  const context = useContext(workflowContext);
  if (!context) {
    throw new Error("context of workflow is defind");
  }

  return context;
};

export default useTab;
