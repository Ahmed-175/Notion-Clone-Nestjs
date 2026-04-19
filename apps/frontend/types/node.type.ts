export interface INode {
  _id?: string | null;
  title: string;
  type: "folder" | "note";
  isFavorite: boolean;
  isTrash: boolean;
  parentId : string | null;
  children: string[];
}
