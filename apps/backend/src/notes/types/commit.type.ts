import { BlockType } from "./blockData.type";

export enum CommitType {
  NEW = "new",
  DELETE = "delete",
  UPDATE = "update",
}

export interface INewLineData {
  type: BlockType;
  blockId: string;
  data: Record<string, any>;
  prev: string | null;
  next: string | null;
}
export interface IDeleteLineData {
  blockId: string;
}

export interface IUpdateLineData {
  blockId: string;
  oldData: Record<string, any>;
  newData: Record<string, any>;
}

export type ICommitLineDto =
  | { type: CommitType.NEW; data: INewLineData }
  | { type: CommitType.DELETE; data: IDeleteLineData }
  | { type: CommitType.UPDATE; data: IUpdateLineData };

// interface ILog {
//   type: "new" | "update" | "delete";
// }

// // if type == new

// const Log1 = {
//   type: "new",
//   prev: null,
//   next: "some ObjectId",
//   data: {
//     type: "p",
//     content: "hello world",
//   },
// };
