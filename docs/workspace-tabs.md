# Workspace & Tabs System

This system manages how users navigate between different notes and pages (Home, Search, etc.) using a tabbed interface, similar to a web browser or VS Code.

## Core Concepts

### 1. The "Open Tabs" List

The application keeps track of all tabs a user has opened in the current session.

- **Stored in:** `openTabs` state in `workflowContext.tsx`.
- **Default:** Always starts with the "Home" tab.

### 2. The "Active Tab"

This is the tab currently being viewed by the user.

- **Stored in:** `activeTabId`.
- **Sync:** Whenever the active tab changes, the URL in the browser also updates (e.g., `/note/123` or `/home`).

## How it Works

### Adding a Tab

When you click on a note in the sidebar:

1. We check if it's already open.
2. If **not open**, we add it to the list.
3. We set it as the **Active Tab** and navigate the browser to that note's URL.

### Removing a Tab

When you click the "X" on a tab:

1. We remove it from the `openTabs` list.
2. If you closed the **active** tab:
   - The system automatically moves you to the tab on the **left**.
   - If there is no tab on the left, it moves you to the first available tab or back to Home.
3. **Safety Feature:** We use a "Transition Set" (`transitioningTabIdsRef`) to remember which tabs are being closed. This prevents the system from accidentally "re-opening" a tab while the browser is still busy navigating away from it.

### URL Synchronization

The system is "URL-first." This means if you type a URL manually or press the Back button:

- The system looks at the URL.
- It finds the corresponding note or page.
- It automatically adds that tab to your list and makes it active.

## Code Examples & File Map

### 1. Where the Logic Lives

- **Context Provider:** `apps/frontend/context/workflowContext.tsx` (The "Brain")
- **Custom Hook:** `apps/frontend/hooks/useTab.ts` (The "Remote Control")
- **UI Component:** `apps/frontend/components/WorkspaceHeader/Tab.tsx` (The "Visuals")

---

### 2. Common Operations

#### Adding a Tab

Used in the sidebar when clicking a note.

```typescript
// File: apps/frontend/components/sidebar_components/Node.tsx
const { addTab } = useTab();

const handleClick = () => {
  addTab({
    _id: node._id,
    type: "note",
    name: node.title,
  });
};
```

#### Switching Tabs

Used when clicking an existing tab header.

```typescript
// File: apps/frontend/components/WorkspaceHeader/Tab.tsx
const { setActiveTab } = useTab();

return (
  <div onClick={() => setActiveTab(tab._id)}>
    {tab.name}
  </div>
);
```

#### Removing a Tab

Used when clicking the "X" button.

```typescript
// File: apps/frontend/components/WorkspaceHeader/Tab.tsx
const { removeTab } = useTab();

const handleClose = (e) => {
  e.stopPropagation(); // Prevent switching to the tab while closing it
  removeTab(tab._id);
};
```

---

### 3. Under the Hood: URL Sync

The system automatically detects URL changes and opens the correct tab.

```typescript
// File: apps/frontend/context/workflowContext.tsx
useEffect(() => {
  if (pathname.includes("/note/")) {
    const id = pathname.split("/").pop();
    // Logic to add tab if it doesn't exist...
  }
}, [pathname]);
```

## Developer Tips

- **Context:** Use the `useTab` hook to interact with tabs (add, remove, or switch).
- **Persistence:** Tabs are kept in memory. Refreshing the page will reset the list to only show the tab corresponding to the current URL.
- **Notes:** Note titles in tabs are automatically synced with the database. If a note is renamed, the tab title updates instantly.
