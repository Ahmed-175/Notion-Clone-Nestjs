"use client"
import Toast from "@/components/Toast";
import MenuProvider from "@/context/menuContext";
import NodeProvider from "@/context/nodeContext";
import { ToastProvider } from "@/context/toastContext";
import { UserProvider } from "@/context/userContext";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastProvider>
        <UserProvider>
          <Toast />
          <NodeProvider>
            <MenuProvider>
              {children}
            </MenuProvider>
          </NodeProvider>
        </UserProvider>
      </ToastProvider>
    </>
  );
};

export default Providers;
