import { menuContext } from "@/context/menuContext";
import { useContext } from "react";

const useMenu = () => {
  const context = useContext(menuContext);
  if (!context) {
    throw new Error("error from context of menu");
  }

  return context;
};

export default useMenu;
