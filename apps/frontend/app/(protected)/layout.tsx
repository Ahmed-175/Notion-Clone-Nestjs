"use client";

import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import NodeProvider from "@/context/nodeContext";
import MenuProvider from "@/context/menuContext";
import { WorkSpaceProvider } from "@/features/workspace/contexts/workspace.context";
import WorkspaceHeader from "@/features/workspace/components/WorkSpaceHeader";
import ReactQueryProvider from "@/providers/react-query.provider";

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
    <div className="w-full h-fit min-h-screen overflow-x-hidden">
      <ReactQueryProvider>
        {/* <NodeProvider> */}
          <MenuProvider>
            <WorkSpaceProvider>
              <WorkspaceHeader />
              <Sidebar />
              <div className="w-[81%] mt-20  ml-[20%] p-0">{children}</div>
            </WorkSpaceProvider>
          </MenuProvider>
        {/* </NodeProvider> */}
      </ReactQueryProvider>

    </div>
  );
};

export default ProtectedLayout;
