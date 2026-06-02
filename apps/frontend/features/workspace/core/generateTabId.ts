import { TabParams, TabType } from "../types/tab.type";

export const generateTabId = <T extends TabType>(
  type: T,
  param: TabParams[T],
) => {
  if (!param) return type;

  const values = Object.values(param as Record<string, string>);

  return [type, ...values].join(":");
};
