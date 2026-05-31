import { MarkdownRule } from "@/types/markdown.type";

export const QuoteRule: MarkdownRule = {
  pattern: /^> (.*)$/gm,
  replace: "<blockquote>$1</blockquote>",
};
