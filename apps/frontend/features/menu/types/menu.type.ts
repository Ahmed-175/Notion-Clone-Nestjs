import { INode } from "@/types/node.type";
import { SetStateAction } from "react";

export interface IMenuContext {
  showMenu: (node: INode, x: number, y: number) => void;
  openMenu: boolean;
  setNode: React.Dispatch<SetStateAction<INode>>;
  node: INode;
  position: { x: number; y: number };
  toggleFavorite: (nodeId) => void;
  softDelete: () => void;
}
