export interface ITab {
  _id: string;
  name: string;
  type: "home" | "note" | "trash" | "favorites" | "search" | "community";
}
