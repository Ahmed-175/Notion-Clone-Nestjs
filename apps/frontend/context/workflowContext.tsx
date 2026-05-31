"use client";

import { ITab } from "@/types/tab.type";
import { useRouter, usePathname } from "next/navigation";
import React, { createContext, useState, useEffect, useRef } from "react";
import useNodes from "@/hooks/useNodes";

interface IWorkflowContext {
  openTabs: ITab[];
  activeTabId: string | null;
  addTab: (tab: ITab) => void;
  removeTab: (_id: string) => void;
  setActiveTab: (_id: string) => void;
  cache: Record<string, any>;
  setCache: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export const workflowContext = createContext<IWorkflowContext | null>(null);

const start: ITab = {
  _id: "home",
  type: "home",
  href: "home",
  name: "Home page",
};

const WorkflowProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { nodes } = useNodes();

  const [openTabs, setOpenTabs] = useState<ITab[]>([start]);
  const [activeTabId, setActiveTabId] = useState<string | null>("home");
  const [cache, setCache] = useState<Record<string, any>>({});

  // Guard against re-adding a tab during transitioning route when active tab is removed
  const transitioningTabIdRef = useRef<string | null>(null);

  // Synchronize tab list and active tab with the current URL pathname
  useEffect(() => {
    if (!pathname) return;

    let matchedId: string | null = null;
    let matchedTab: Omit<ITab, "_id"> | null = null;

    const noteMatch = pathname.match(/^\/note\/([^/]+)$/);
    if (noteMatch) {
      const id = noteMatch[1];
      matchedId = id;
      matchedTab = {
        type: "note",
        name: nodes[id]?.title || "Loading...",
      };
    } else {
      const staticPages = ["home", "search", "favorites", "trash", "community", "settings"];
      for (const page of staticPages) {
        if (pathname === `/${page}`) {
          matchedId = page;
          matchedTab = {
            type: page as any,
            href: page,
            name: page === "home" ? "Home page" : page.charAt(0).toUpperCase() + page.slice(1),
          };
          break;
        }
      }
    }

    if (matchedId && matchedTab) {
      // If we are currently transitioning away from this tab (from a delete), do not re-add it
      if (transitioningTabIdRef.current === matchedId) {
        return;
      }

      // We have successfully navigated to a non-transitioning tab, so we can clear any transition
      if (transitioningTabIdRef.current !== matchedId) {
        transitioningTabIdRef.current = null;
      }

      setActiveTabId(matchedId);
      setOpenTabs((prev) => {
        const exists = prev.find((t) => t._id === matchedId);
        if (exists) return prev;
        return [...prev, { ...matchedTab, _id: matchedId } as ITab];
      });
    }
  }, [pathname, nodes]);

  // Synchronize tab titles with nodes map (for note renames or loading resolution)
  useEffect(() => {
    setOpenTabs((prev) => {
      let updated = false;
      const nextTabs = prev.map((tab) => {
        if (tab.type === "note") {
          const node = nodes[tab._id];
          if (node && node.title !== tab.name) {
            updated = true;
            return { ...tab, name: node.title };
          }
        }
        return tab;
      });
      return updated ? nextTabs : prev;
    });
  }, [nodes]);

  const addTab = (tab: ITab) => {
    setOpenTabs((prev) => {
      const exists = prev.find((t) => t._id === tab._id);
      if (exists) return prev;
      return [...prev, tab];
    });

    setActiveTabId(tab._id);

    if (tab.type === "note") {
      router.push(`/note/${tab._id}`);
    } else {
      router.push(`/${tab.href}`);
    }
  };

  const setActiveTab = (_id: string) => {
    const tab = openTabs.find((t) => t._id === _id);

    if (!tab) return;

    setActiveTabId(_id);

    if (tab.type === "note") {
      router.push(`/note/${_id}`);
    } else {
      router.push(`/${tab.href}`);
    }
  };

  const removeTab = (_id: string) => {
    transitioningTabIdRef.current = _id;
    setOpenTabs((prev) => {
      const filtered = prev.filter((t) => t._id !== _id);

      if (activeTabId === _id) {
        const next = filtered[filtered.length - 1] ?? start;
        setActiveTabId(next._id);

        if (next.type === "note") {
          router.push(`/note/${next._id}`);
        } else {
          router.push(`/${next.href}`);
        }
      }

      return filtered.length ? filtered : [start];
    });

    setCache((prev) => {
      const copy = { ...prev };
      delete copy[_id];
      return copy;
    });
  };

  return (
    <workflowContext.Provider
      value={{
        openTabs,
        activeTabId,
        addTab,
        removeTab,
        setActiveTab,
        cache,
        setCache,
      }}
    >
      {children}
    </workflowContext.Provider>
  );
};

export default WorkflowProvider;