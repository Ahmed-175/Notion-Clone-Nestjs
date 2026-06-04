import React from "react";
import { render } from "@testing-library/react";
import { WorkSpaceProvider, WorkSpaceContext } from "../../contexts/workspace.context";
import { useRouter, usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

const TestComponent = () => {
  const context = React.useContext(WorkSpaceContext);
  if (!context) return null;

  return (
    <div>
      <div data-testid="active-tab">{context.activeTabId}</div>
      <div data-testid="tabs-count">{context.openTabs.length}</div>
      <button onClick={() => context.removeTab("home")}>Remove Home</button>
    </div>
  );
};

describe("WorkSpaceProvider", () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue("/home");
  });

  it("should initialize with home tab when pathname is /home", async () => {
    const { getByTestId } = render(
      <WorkSpaceProvider>
        <TestComponent />
      </WorkSpaceProvider>
    );

    expect(getByTestId("active-tab").textContent).toBe("home");
    expect(getByTestId("tabs-count").textContent).toBe("1");
  });

  it("should add a tab when navigating to a new route", () => {
    const { getByTestId, rerender } = render(
      <WorkSpaceProvider>
        <TestComponent />
      </WorkSpaceProvider>
    );

    (usePathname as jest.Mock).mockReturnValue("/note/123");

    rerender(
      <WorkSpaceProvider>
        <TestComponent />
      </WorkSpaceProvider>
    );

    expect(getByTestId("active-tab").textContent).toBe("note:123");
    expect(getByTestId("tabs-count").textContent).toBe("2");
  });
});
