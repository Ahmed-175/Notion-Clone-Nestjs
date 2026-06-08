import { Tab, TabType } from "../types/tab.type";
import { createTab } from "./tabFactory";

type TabBuilder = (segments: string[]) => Tab;

export const tabRegistry: Record<TabType, TabBuilder> = {
  home: () => createTab("home", undefined, "Home"),

  note: (segments) => {
    return createTab("note", { noteId: segments[1] }, "Note");
  },

  user: (segments) => createTab("user", { userId: segments[1] }, "User"),

  trash: () => createTab("trash", undefined, "Trash"),

  favorites: () => createTab("favorites", undefined, "Favorites"),

  search: (segments) =>
    createTab("search", { query: segments[1] ?? "" }, "Search"),

  community: (segments) =>
    createTab(
      "community",
      {
        communityId: segments[1],
        noteId: segments[2],
      },
      "Community",
    ),

  settings: () => createTab("settings", undefined, "Settings"),
};
