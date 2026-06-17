import { useContext } from "react";
import { menuContext } from "../context/menuContext";

const useMenu = () => {
  const context = useContext(menuContext);
  if (!context) {
    throw new Error("error from context of menu");
  }

  return context;
};

export default useMenu;
