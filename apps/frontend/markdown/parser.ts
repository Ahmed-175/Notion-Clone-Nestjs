import { boldRule } from "./rules/bold.rule";
import { headingRules } from "./rules/heading.rule";
import { lineRule } from "./rules/line.rule";
import { QuoteRule } from "./rules/qoute.rule";
import { spaceRule } from "./rules/space.rule";

const rules = [lineRule, ...headingRules, QuoteRule, boldRule, spaceRule];
export const parserMD = (content: string) => {
  const lines = content.split("\n");
  console.log(lines);

  const result = lines.map((line) => {
    if (line == "") {
      return "<br/>";
    }
    for (const rule of rules) {
      if (rule.pattern.test(line)) {
        rule.pattern.lastIndex = 0;
        return line.replace(rule.pattern, rule.replace);
      }
    }

    // fallback for plain text
    return `<p>${line}</p>`;
  });

  return result.join("\n");
};
