export enum BlockType {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",

  P = "p",

  QUOTE = "quote",

  TODO = "todo",

  LIST = "list",

  LINK = "link",

  IMAGE = "image",
  VIDEO = "video",
  FILE = "file",

  TABLE = "table",

  MCQ = "mcq",

  DIVIDER = "divider",
}

export interface ParagraphData {
  content: string;
}

export interface ImageData {
  url: string;
}

export interface LinkData {
  content: string;
  href: string;
}

export interface TodoData {
  content: string;
  checked: boolean;
  checkedAt?: Date;
}

export interface McqData {
  question: string;
  choices: string[];
  correctIndex: number;
}

export type BlockData =
  | ParagraphData
  | ImageData
  | LinkData
  | TodoData
  | McqData;
