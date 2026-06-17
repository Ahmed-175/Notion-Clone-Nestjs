import React, { SetStateAction } from "react";
import { CgNotes } from "react-icons/cg";
import { FaRegFolder } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { INode } from "../types/node.type";
import useMenu from "@/features/menu/hooks/useMenu";

const Node = ({
    node,
    isOpen,
    setIsOpen,
}: {
    node: INode;
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
    const { showMenu } = useMenu();
    const router = useRouter();

    const handleClickOnNode = () => {
        if (node.type == "folder") {
            setIsOpen((prev) => !prev)
        } else {
            router.push(`/note/${node._id}`)
        }

    }

    return (
        <div
            onClick={handleClickOnNode}
            onContextMenu={(e) => {
                e.preventDefault();
                showMenu(node, e.clientX, e.clientY);
            }}

            className={`flex items-center gap-2 my-1 cursor-pointer 
        ${isOpen ? "text-blue-700" : ""}`}
        >
            {node.type === "note" ? <CgNotes /> : <FaRegFolder />}
            {node.title}
        </div>
    );
};

export default Node;
