import { render, waitFor } from "@testing-library/react";
import useTab from "@/features/workspace/hooks/useTab";
import useAuth from "@/hooks/useAuth";
import useNote from "@/hooks/useNote";
import NotePage from "./page";

jest.mock("@/components/Note/Banner", () => () => null);
jest.mock("@/components/Note/Properties", () => () => null);
jest.mock("@/components/Note/TitleNote", () => () => null);
jest.mock("@/features/editor/components/Editor", () => () => null);
jest.mock("@/features/preview/components/Preview", () => () => null);
jest.mock("@/features/editor/context/Editor.context", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}));
jest.mock("@/features/presence/context/presence.context", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}));
jest.mock("@/features/workspace/hooks/useTab");
jest.mock("@/hooks/useAuth");
jest.mock("@/hooks/useNote");

describe("Note page", () => {
  const setLabel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTab as jest.Mock).mockReturnValue({
      activeTabId: "note:active-note-id",
      setLabel,
    });
    (useAuth as jest.Mock).mockReturnValue({ user: { _id: "owner-id" } });
    (useNote as jest.Mock).mockReturnValue({
      note: {
        _id: "fetched-note-id",
        title: "Fetched note title",
        ownerId: "owner-id",
      },
    });
  });

  it("updates the fetched note's tab label when another tab is active", async () => {
    render(<NotePage />);

    await waitFor(() => {
      expect(setLabel).toHaveBeenCalledWith(
        "note:fetched-note-id",
        "Fetched note title",
      );
    });
    expect(setLabel).not.toHaveBeenCalledWith(
      "note:active-note-id",
      "Fetched note title",
    );
  });
});
