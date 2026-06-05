"use client";
import Info from "./sidebar_components/Info";
import Links from "./sidebar_components/Links";
import RecentFiles from "./sidebar_components/RecentFiles";
import { useNodes } from "@/features/nodes/hooks/useNodes";
import NodesList from "@/features/nodes/components/NodesList";

const Sidebar = () => {
  const { isLoading } = useNodes();

  return (
    <div
      className="fixed z-20 top-0 w-[20%] bottom-0 
      h-screen text-left p-5   bg-gray-200 rounded-r-2xl "
    >
      <Info />
      <Links />
      <hr className=" text-gray-600" />
      <RecentFiles />

      <div className=" h-fit  scroll-auto">
        <div className="text-lg text-gray-600 my-1">folders & files </div>

        {!isLoading && <NodesList />}
      </div>
    </div>
  );
};

export default Sidebar;
