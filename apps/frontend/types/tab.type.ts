export interface ITab {
  _id: string;
  name: string;
  href?: string;
  type: "home" | "note" | "trash" | "favorites" | "search" | "community" | "settings";
}
