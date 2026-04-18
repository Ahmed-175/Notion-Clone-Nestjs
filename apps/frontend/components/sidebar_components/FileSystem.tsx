import { INode } from "@/types/node.type";
import Recursion from "./Recursion";

const FileSystem = ({ nodes }: { nodes: INode[] }) => {
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      {nodes.map((node, index) => (
        <Recursion node={node} key={index} />
      ))}
    </div>
  );
};
export default FileSystem;
