import { INode } from "@/types/node.type";
import  { Activity, useState } from "react";
import Node from "./Node";
import FileSystem from "./FileSystem";

const Recursion = ({ node }: { node: INode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div key={node._id} className="ml-2 ">
      <Node node={node} isOpen={isOpen} setIsOpen={setIsOpen} />
      {node.children?.length > 0 && (
        <Activity mode={isOpen ? "visible" : "hidden"}>
          <div className="ml-2 border-l border-gray-300 pl-1">
            <FileSystem nodes={node.children} />
          </div>
        </Activity>
      )}
    </div>
  );
};

export default Recursion;
