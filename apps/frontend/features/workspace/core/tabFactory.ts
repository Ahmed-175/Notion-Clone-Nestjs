import { Tab, TabParams, TabType } from "../types/tab.type";
import { generateTabId } from "./generateTabId";

export const createTab = <T extends keyof TabParams>(
  type: T,
  params: TabParams[T],
  label: string,
): Tab => {
  return {
    id: generateTabId(type, params),
    type,
    label,
    params,
  };
};
