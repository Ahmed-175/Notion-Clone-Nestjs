# Introduction

The Workspace module is a feature in the view page (all protected pages) that shows the user the currently open tabs and enables easy switching between them.

In this documentation , we will explain each of this module in detail.The general approach is to first provide a summary of the concept (such as `openTabs` or functions like `removeTab`) followed by a deeper explanation of each property or function

# Content

1. [Quick Start: How to use this module](#quick-start-how-to-use-this-module)
2. [`openTabs`](#opentabs)
3. [`activeTabId`](#activetabid)
4. [`removeTab`](#removetab)
5. [`setActiveTab`](#setactivetab)
6. [`isActiveTab`](#isactivetab)
7. [`setLabel`](#setlabel)
8. [`<WorkspaceHeader>`](#workspaceheader)

# Quick Start: How to use this module

To integrate the Workspace module , warp your application (or protected layout) with the `WorkSpaceProvider`. This enbles access to the workspace context , including state and helper functions for managing tabs.

```ts
import { WorkSpaceProvider } from "@/features/workspace/contexts/workspace.context";

const ProtectedLayout = () => {
    return (
        <WorkSpaceProvider>
            {children}
        </WorkSpaceProvider>
    );
};
```

Now you can use any state or helper funtion from the `WorkSpaceContext`. There are also UI components you can use to make integration easier, such as `<WorkspaceHeader>`. You should place all of this inside your protected layout file so it is only used there.

```ts
import { WorkSpaceProvider } from "@/features/workspace/contexts/workspace.context";
import WorkspaceHeader from "@/features/workspace/components/WorkSpaceHeader";

const ProtectedLayout = ({ children }) => {
    return (
        <WorkSpaceProvider>
            <WorkspaceHeader />
            {children}
        </WorkSpaceProvider>
    );
};
```

By doing this, you integrate the Workspace module into your app.

Now you can use this by simply changing the URL. For example, navigating from `/home` to `note/:noteId`. The `<WorkSpaceProvider>` will handle this automatically and add the new page as a tab.

```ts
<Link href="/note/123">Note</Link>
<Link href="/home">Home Page</Link>
```


To use this tab system, you navigate to another page with the required information, such as `:id`, depending on the page.

We also define specific pages, and each page type has its own parameters. All available pages are defined in `/workspace/types/tab.type.ts`.

```ts
// workspace/types/tab.type.ts
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
```

This `TabParams` type contains all pages currently supported by the website. If you need to add a new page in the future, simply add it here. For example, if you have a page such as `/blog/:blogId`, you can define it as follows:

```ts
export type TabParams = {
  // other pages
  blog: { blogId: string };
};
```

In pages like `note/:id`, you can use `useParams()` from `next/navigation` to retrieve the `noteId`.

## `openTabs`

`openTabs` is an array of all currently open tabs. Each tab contains information such as its unique `id`, `label`, `type`, and the route `params` associated with it.

```ts
const { openTabs } = useTab();

console.log(openTabs);
/*
[
  { id: 'home', label: 'Home', type: 'home', params: undefined },
  { id: 'note:123', label: 'My Note', type: 'note', params: { noteId: '123' } }
]
*/
```

This array is typically used to render the list of tabs in the UI, such as in the `<WorkspaceHeader>`.

## `activeTabId`

`activeTabId` is the ID of the tab that is currently being viewed. It helps in identifying which tab should be highlighted in the UI and ensures that the workspace state is synchronized with the current route.

```ts
const { activeTabId } = useTab();

if (activeTabId === 'home') {
    // Perform actions specific to the home tab
}
```

## `removeTab`

The `removeTab` function is used to close a tab by its ID. When a tab is removed:
1. It is filtered out of the `openTabs` list.
2. If the tab being removed was the active tab, the workspace automatically navigates to the next available tab.
3. If no tabs remain, it redirects the user to the `/home` page.

```ts
const { removeTab } = useTab();

const handleClose = (id: string) => {
    removeTab(id);
};
```

## `setActiveTab`

`setActiveTab` is used to switch the focus to a specific tab. When called, it updates the `activeTabId` and triggers a navigation to the URL associated with that tab using the `next/navigation` router.

```ts
const { setActiveTab } = useTab();

const handleSwitch = (id: string) => {
    setActiveTab(id);
};
```

## `isActiveTab`

`isActiveTab` is a helper function that returns a boolean indicating whether the provided ID matches the `activeTabId`. This is useful for conditional styling of tab components.

```ts
const { isActiveTab } = useTab();

const className = isActiveTab(tab.id) ? 'bg-active' : 'bg-inactive';
```

## `setLabel`

`setLabel` allows you to update the display label of a specific tab. This is particularly useful when the title of a note or resource changes, and you want the tab to reflect that change immediately.

```ts
const { setLabel } = useTab();

// Example: Update tab label when note title is fetched
useEffect(() => {
    if (noteData?.title) {
        setLabel(`note:${noteId}`, noteData.title);
    }
}, [noteData?.title]);
```

## `<WorkspaceHeader>`

`<WorkspaceHeader>` is a pre-built UI component that renders the tab bar. It automatically retrieves `openTabs` from the context and renders each tab using a sub-component. It should be included in your protected layout to provide the tab navigation interface.

```tsx
import WorkspaceHeader from "@/features/workspace/components/WorkSpaceHeader";

const ProtectedLayout = ({ children }) => {
    return (
        <WorkSpaceProvider>
            <WorkspaceHeader />
            {children}
        </WorkSpaceProvider>
    );
};
```

