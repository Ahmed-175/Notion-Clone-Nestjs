"use client"
import Toast from "@/components/Toast";
import WorkspaceHeader from "@/components/WorkspaceHeader/WorkspaceHeader";
import MenuProvider from "@/context/menuContext";
import NodeProvider from "@/context/nodeContext";
import { ToastProvider } from "@/context/toastContext";
import { UserProvider } from "@/context/userContext";
import WorkflowProvider from "@/context/workflowContext";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastProvider>
        <UserProvider>
          <Toast />
          <NodeProvider>
            <MenuProvider>
              <WorkflowProvider>
                <WorkspaceHeader />
                {children}
              </WorkflowProvider>
            </MenuProvider>
          </NodeProvider>
        </UserProvider>
      </ToastProvider>
    </>
  );
};

export default Providers;
