import { INode } from "@/types/node.type";
import Node from "./Node";
import useNodes from "@/hooks/useNodes";
import { useState } from "react";

const Recursion = ({ node }: { node: INode }) => {
  const { nodes } = useNodes();
  const [isOpen, setIsOpen] = useState(false);

  const children = Object.values(nodes).filter(
    (n) => n.parentId === node._id
  );

  return (
    <div className="ml-2">
      <Node node={node} isOpen={isOpen} setIsOpen={setIsOpen} />

      {children.length > 0 && isOpen && (
        <div className="ml-2 border-l border-gray-300 pl-1">
          {children.map((child) => (
            <Recursion key={child._id as any} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Recursion;