import { INode } from "@/types/node.type";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { FaRegFolder } from "react-icons/fa";
import useMenu from "@/hooks/useMenu";
import Link from "next/link";

const Node = ({
  node,
  isOpen,
}: {
  node: INode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { showMenu } = useMenu();

  return (
    <Link href={`/note/${node._id}`}
      onContextMenu={(e) => {
        e.preventDefault();
        showMenu(node, e.clientX, e.clientY);
      }}

      className={`flex items-center gap-2 my-1 cursor-pointer 
        ${isOpen ? "text-blue-700" : ""}`}
    >
      {node.type === "note" ? <CgNotes /> : <FaRegFolder />}
      {node.title}
    </Link>
  );
};

export default Node;
