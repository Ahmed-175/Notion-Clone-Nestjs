import { useContext } from "react";
import { WorkSpaceContext } from "../contexts/workspace.context";

const useTab = () => {
  const context = useContext(WorkSpaceContext);

  if (!context) {
    throw new Error("context of workSpace is not defined");
  }

  return context;
};

export default useTab;
