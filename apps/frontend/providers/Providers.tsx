"use client"
import Toast from "@/components/Toast";
import NodeProvider from "@/context/nodeContext";
import { ToastProvider } from "@/context/toastContext";
import { UserProvider } from "@/context/userContext";
import MenuProvider from "@/features/menu/context/menuContext";
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
