import { boldRule } from "./rules/bold.rule";
import { headingRules } from "./rules/heading.rule";
import { lineRule } from "./rules/line.rule";
import { QuoteRule } from "./rules/qoute.rule";
import { spaceRule } from "./rules/space.rule";

const rules = [ lineRule, ...headingRules,QuoteRule ,  boldRule, spaceRule , ];

export const parserMD = (content: string) => {
  let result = content;

  for (const rule of rules) {
    result = result.replace(rule.pattern, rule.replace);
  }
  return result;
};
