import { toastContext } from "@/context/toastContext";
import { useContext } from "react";

const useToast = () => {
  const context = useContext(toastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
};

export default useToast;