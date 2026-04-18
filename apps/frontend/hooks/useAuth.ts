import { userContext } from "@/context/userContext";
import { useContext } from "react";

const useAuth = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("context is not exist");
  }
  return context;
};

export default useAuth ;
