import { MarkdownRule } from "@/types/markdown.type";

export const headingRules: MarkdownRule[] = [
  {
    pattern: /^#### (.*)$/gm,
    replace: "<h4>$1</h4>",
  },
  {
    pattern: /^### (.*)$/gm,
    replace: "<h3>$1</h3>",
  },
  {
    pattern: /^## (.*)$/gm,
    replace: "<h2>$1</h2>",
  },
  {
    pattern: /^# (.*)$/gm,
    replace: "<h1>$1</h1>",
  },
];
