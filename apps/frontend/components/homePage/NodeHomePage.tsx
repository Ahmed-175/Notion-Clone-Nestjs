"use client"
import useMenu from "@/hooks/useMenu";
import { INode } from "@/types/node.type";
import { IoFolderOutline } from "react-icons/io5";
import { LuNewspaper } from "react-icons/lu";
import React from "react";
import { useRouter } from "next/navigation";
import { useNodes } from "@/features/nodes/hooks/useNodes";

const NodeHomePage = ({
  node,
  onOpenFolder,
}: {
  node: INode;
  onOpenFolder: (node: INode) => void;
}) => {
  const { data: nodes } = useNodes();
  const router = useRouter();
  const { showMenu } = useMenu();

  const handleClick = (node: INode) => {
    if (node.type === "note") {
      router.push(`/note/${node._id}`)
    }

    if (node.type === "folder") {
      onOpenFolder(node);
    }


  };

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        showMenu(node, e.clientX, e.clientY);
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClick(node);
      }}
      className="border bg-white grow p-3 min-w-70 h-50 rounded-lg cursor-pointer"
    >
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="text-2xl">
            {node.type === "folder" ? <IoFolderOutline /> : <LuNewspaper />}
          </div>
          <h1 className="text-xl">{node.title}</h1>
        </div>

        <div className="rounded-full bg-black text-white w-5 flex justify-center items-center h-5">
          {node.children?.length || 0}
        </div>
      </div>

      <div>
        {node.children && node.children.length > 0 && (
          <div
            className="w-fit ml-3 border-l border-gray-800 
          pl-4 mt-1"
          >
            {node.children.map((childId: any, index) => {
              const child = nodes[childId];
              if (!child) return null;

              return (
                <div
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClick(child);
                  }}
                  className="text-blue-600 underline flex items-center gap-2"
                >
                  {child.type === "folder" ? (
                    <IoFolderOutline />
                  ) : (
                    <LuNewspaper />
                  )}
                  {child.title}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(NodeHomePage);
