"use client";

import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import WorkspaceHeader from "@/components/WorkspaceHeader/WorkspaceHeader";
import WorkflowProvider from "@/context/workflowContext";
import NodeProvider from "@/context/nodeContext";
import MenuProvider from "@/context/menuContext";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <div className="w-screen  h-screen flex justify-center items-center text-5xl">
        Loading...
      </div>
    );

  if (!user) return null;

  return (
    <div className="w-full h-fit min-h-screen  ">
      <MenuProvider>

      <NodeProvider>
        <WorkflowProvider>
          <WorkspaceHeader />
          <Sidebar />
          <div className="w-[80%] mt-20  ml-[20%] p-3">{children}</div>
        </WorkflowProvider>
      </NodeProvider>
      </MenuProvider>
    </div>
  );
};

export default ProtectedLayout;
