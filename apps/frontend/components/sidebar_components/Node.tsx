import { INode } from "@/types/node.type";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { FaRegFolder } from "react-icons/fa";
import Menu from "./Menu";
import useTab from "@/hooks/useTab";
import useMenu from "@/hooks/useMenu";

const Node = ({
  node,
  isOpen,
  setIsOpen,
}: {
  node: INode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { addTab } = useTab();
  const { showMenu } = useMenu();

  const handleClick = () => {
    if (node.type === "folder") {
      setIsOpen((prev) => !prev);
      return;
    }
    if (node.type == "note") {
      addTab({
        name: node.title,
        _id: node._id as any,
        type: "note",
      });
    }
  };

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        showMenu(node, e.clientX, e.clientY);
      }}
      onClick={handleClick}
      className={`flex items-center gap-2 my-1 cursor-pointer 
        ${isOpen ? "text-blue-700" : ""}`}
    >
      {node.type === "note" ? <CgNotes /> : <FaRegFolder />}
      {node.title}
    </div>
  );
};

export default Node;
