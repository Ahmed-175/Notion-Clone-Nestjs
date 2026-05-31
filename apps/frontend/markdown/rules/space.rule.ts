import { MarkdownRule } from "@/types/markdown.type";

export const spaceRule: MarkdownRule = {
  pattern: /\n/g,
  replace: "<br/>",
};
