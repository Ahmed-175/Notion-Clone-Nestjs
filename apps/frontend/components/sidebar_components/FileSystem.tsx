import { INode } from "@/types/node.type";
import Recursion from "./Recursion";
import useNodes from "@/hooks/useNodes";

const FileSystem = () => {
  const {nodes}= useNodes()
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      {Object.values(nodes).map(
        (node) =>
          node.parentId == null && (
            <Recursion node={node} key={node._id as any} />
          ),
      )}
    </div>
  );
};

export default FileSystem;
