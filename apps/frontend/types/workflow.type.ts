export interface ITab {
  _id: string;
  name: string;
  href?: string;
  type:
    | "home"
    | "note"
    | "trash"
    | "favorites"
    | "search"
    | "community"
    | "settings";
}

export interface IWorkflowContext {
  openTabs: ITab[];
  activeTabId: string | null;
  addTab: (tab: ITab) => void;
  removeTab: (_id: string) => void;
  /**
   * Activate an already opened tab.
   *
   * Behavior:
   * - Updates activeTabId
   * - Navigates to the tab route
   * - Restores cached state
   *
   * The tab must already exist.
   */
  setActiveTab: (_id: string) => void;
  cache: Record<string, any>;
  setCache: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}
