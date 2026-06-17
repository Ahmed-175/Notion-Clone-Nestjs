"use client";

import { useMemo, useState } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";

import NodeHomePage from "@/components/homePage/NodeHomePage";
import { INode } from "@/types/node.type";
import { useNodes } from "@/features/nodes/hooks/useNodes";
import useMenu from "@/features/menu/hooks/useMenu";

const home = {
  title: "main folder",
  _id: null,
  type: "folder",
  isFavorite: false,
  isTrash: false,
  parentId: null,
  children: [],
};

const Page = () => {
  const { data: nodes } = useNodes();
  const { showMenu } = useMenu();

  const [path, setPath] = useState<INode[]>([]);

  const currentFolder = path.length > 0 ? path[path.length - 1] : home;

  const currentNodes = useMemo(() => {
    if (!nodes) return [];

    return Object.values(nodes).filter(
      (node) => node.parentId === currentFolder._id
    );
  }, [nodes, currentFolder]);

  const handleOpenFolder = (node: INode) => {
    if (node.type === "folder") {
      setPath((prev) => [...prev, node]);
    }
  };

  const handleBack = () => {
    setPath((prev) => prev.slice(0, -1));
  };

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        showMenu(currentFolder as any, e.clientX, e.clientY);
      }}
      className="relative min-h-[80vh] p-3.5"
    >
      <h1 className="w-full text-4xl mb-9 font-bold text-center">
        Home Page
      </h1>

      {path.length > 0 && (
        <div
          onClick={handleBack}
          className="absolute right-10 top-0 flex h-fit w-fit cursor-pointer items-center justify-center rounded-lg bg-black p-2 text-2xl text-white duration-150 hover:scale-[1.1]"
        >
          <IoChevronBackCircleOutline />
        </div>
      )}

      <div className="flex h-fit w-full flex-wrap gap-3">
        {currentNodes.map((node) => (
          <NodeHomePage
            key={String(node._id)}
            node={node}
            onOpenFolder={handleOpenFolder}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;