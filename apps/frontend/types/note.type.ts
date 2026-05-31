enum Fonts {
  DEFAULT = "default",
  POPPINS = "poppins",
  ALEGREYA = "alegreya",
  CAIRO = "cairo",
}

export interface INote {
  _id: string;
  title: string;
  parentId: string | null;
  type: "note" | "folder";
  ownerId: string;
  contributors: any[];
  isFavorite: boolean;
  isTrash: boolean;
  banner: string;
  nodeId: string;
  content: string | "";
  tags: string[];
  font_family: Fonts;
  public: boolean;
  font_size: number;
  lang: "en" | "ar";
  createdAt: Date;
  updatedAt: Date;
}
