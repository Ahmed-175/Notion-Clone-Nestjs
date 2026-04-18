import Toast from "@/components/Toast";
import { ToastProvider } from "@/context/toastContext";
import { UserProvider } from "@/context/userContext";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastProvider>
        <UserProvider>
          <Toast />
          {children}
        </UserProvider>
      </ToastProvider>
    </>
  );
};

export default Providers;
