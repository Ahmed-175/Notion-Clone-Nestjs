export type TabParams = {
  home: undefined;
  trash: undefined;
  favorites: undefined;
  search: { query: string };
  note: { noteId: string };
  user: { userId: string };
  community: { communityId: string; noteId?: string };
  settings: undefined;
};

export type TabType = keyof TabParams;

export type Tab<T extends TabType = TabType> = {
  /**
   * Unique tab identifier generated automatically by addTab.
   * Format:
   * - "home"
   * - "note:123"
   * - "community:123:455"
   *
   * If a tab with the same id already exists, it will be set as active instead of creating a duplicate.
   */
  id: string;

  type: T;

  label: string;

  params: TabParams[T];
};
