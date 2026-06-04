import { generateTabId } from "../../core/generateTabId";

describe("generateTabId", () => {
  it("should return type as ID when no params are provided", () => {
    expect(generateTabId("home", undefined)).toBe("home");
  });

  it("should return joined string when params are provided", () => {
    expect(generateTabId("note", { noteId: "123" })).toBe("note:123");
  });

  it("should handle multiple params", () => {
    expect(
      generateTabId("community", { communityId: "c1", noteId: "n1" }),
    ).toBe("community:c1:n1");
  });
});
