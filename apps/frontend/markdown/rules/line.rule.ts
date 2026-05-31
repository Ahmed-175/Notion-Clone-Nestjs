import { MarkdownRule } from "@/types/markdown.type";


export const lineRule: MarkdownRule = {
    pattern: /^\s*---\s*$/gm,
    replace: "<hr/>"
}