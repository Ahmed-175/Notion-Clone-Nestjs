"use client";
import React, { createContext, useState } from "react";

interface IToast {
  type: "success" | "error";
  message: string;
}

interface IToastCotext {
  toast: IToast | null;
  showMgs: (toast: IToast) => void;
}

export const toastContext = createContext<IToastCotext | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<IToast | null>(null);
  const showMgs = (toast: IToast) => {
    setToast(toast);

    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  return (
    <toastContext.Provider value={{ toast, showMgs }}>
      {children}
    </toastContext.Provider>
  );
};
