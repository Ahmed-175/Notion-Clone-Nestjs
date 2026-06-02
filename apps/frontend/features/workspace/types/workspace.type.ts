import { Tab, TabParams } from "./tab.type";

export interface IWorkSpaceContext {
  /**
   * Array of all currently opened tabs in the workspace.
   * Used to render the tab bar and manage tab lifecycle.
   */
  openTabs: Tab[];

  /**
   * ID of the currently active tab.
   * Used to determine which tab content is currently displayed.
   */
  activeTabId: string | null;

  /**
   * Adds a new tab to the workspace.
   *
   * @param tab - The tab data (without id).
   * @param tab.type - The type of tab (e.g. "home", "note", "search").
   * @param tab.label - Display name of the tab.
   * @param tab.params - Route parameters required by the tab type.
   *
   * @returns void
   * - Creates a new tab and assigns a unique id internally.
   * - Prevents duplicates if the same tab already exists (depending on implementation).
   */
  // addTab: <T extends keyof TabParams>(tab: Omit<Tab<T>, "id">) => void;

  /**
   * Removes a tab from the workspace.
   *
   * @param id - Unique identifier of the tab (e.g. "note:123")
   *
   * @returns void
   * - Removes the tab from openTabs
   * - If the removed tab is active, activeTabId will be updated
   */
  removeTab: (id: string) => void;

  /**
   * Sets the currently active tab.
   *
   * @param id - Unique identifier of the tab to activate
   *
   * @returns void
   * - Updates activeTabId to the provided tab id
   * - Does not modify openTabs
   */
  setActiveTab: (id: string) => void;

  isActiveTab: (id: string) => boolean;

  setLabel: (id: string  , label : string) => void;
}
