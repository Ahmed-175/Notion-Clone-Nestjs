import { SetStateAction } from "react";

export interface INode {
  _id: string;
  title: string;
  type: "folder" | "note";
  isFavorite: boolean;
  isTrash: boolean;
  parentId: string | null;
  children: string[];
}

export interface INodeContext {
  nodes: Record<string, INode>;
//   setNodes: React.Dispatch<SetStateAction<Record<string, INode>>>;
  loading: boolean;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
}
