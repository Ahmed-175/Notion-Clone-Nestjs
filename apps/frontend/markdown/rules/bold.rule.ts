import { MarkdownRule } from "@/types/markdown.type";

export const boldRule: MarkdownRule = {
  pattern: /\*\*(.*?)\*\*/g,
  replace: "<strong>$1</strong>",
};
