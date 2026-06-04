import { routeTab } from "../../core/routeTab";

describe("routeTab", () => {
  it("should return type as path when no params are provided", () => {
    expect(routeTab("home", undefined)).toBe("home");
  });

  it("should return joined path when params are provided", () => {
    expect(routeTab("note", { noteId: "123" })).toBe("note/123");
  });

  it("should handle multiple params in path", () => {
    expect(
      routeTab("community", { communityId: "c1", noteId: "n1" })
    ).toBe("community/c1/n1");
  });
});
