"use client";
import NodeHomePage from "@/components/homePage/NodeHomePage";
import useMenu from "@/hooks/useMenu";
import useNodes from "@/hooks/useNodes";
import { INode } from "@/types/node.type";
import { useMemo, useState } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";

const HomePage = () => {
  const { nodes } = useNodes();
  const { showMenu } = useMenu();
  const [path, setPath] = useState<INode[]>([]);

  const currentFolder = path.length > 0 ? path[path.length - 1] : null;

  const currentNodes = useMemo(() => {
    return Object.values(nodes).filter((node) => {
      if (!currentFolder) {
        return node.parentId === null;
      }
      return node.parentId === currentFolder._id;
    });
  }, [nodes, currentFolder]);

  const handleOpenFolder = (node: INode) => {
    if (node.type === "folder") {
      setPath((prev) => [...prev, node]);
    }
  };

  const handleBack = () => {
    setPath((prev) => prev.slice(0, -1));
  };

  const home: INode = {
    title: "main folder",
    _id: null,
    type: "folder",
    isFavorite: false,
    isTrash: false,
    parentId: null,
    children: [],
  };

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        showMenu(home, e.clientX, e.clientY);
      }}
      className="relative min-h-[80vh]"
    >
      <h1 className="w-full text-4xl mb-9 font-bold text-center">Home Page</h1>

      {path.length > 0 && (
        <div
          onClick={handleBack}
          className="text-2xl cursor-pointer hover:scale-[1.1]
           duration-150 right-10 top-0 absolute rounded-lg p-2
            w-fit h-fit bg-black text-white flex justify-center
           items-center"
        >
          <IoChevronBackCircleOutline />
        </div>
      )}

      <div className="flex flex-wrap w-full gap-3 h-fit">
        {currentNodes.map((node) => (
          <NodeHomePage
            node={node}
            key={node._id as any}
            onOpenFolder={handleOpenFolder}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
