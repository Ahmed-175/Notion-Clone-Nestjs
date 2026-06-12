import { createContext, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tab } from "../types/tab.type";
import { useWorkspaceSync } from "../hooks/useWorkspaceSync";
import { routeTab } from "../core/routeTab";
import { tabRegistry } from "../core/tabRegistry";
import { IWorkSpaceContext } from "../types/workspace.type";

export const WorkSpaceContext = createContext<IWorkSpaceContext | null>(null);

export const WorkSpaceProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [openTabs, setOpenTabs] = useState<Tab[]>([]);
    const [activeTabId, setActiveTabId] = useState<string | null>(null);
    const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

    useWorkspaceSync((type, segments) => {
        let tab: Tab | null = tabRegistry[type]?.(segments);

        if (!tab) return;

        setOpenTabs((prev) => {
            const exists = prev.some((t) => t.id === tab.id);
            if (exists) return prev;
            return [...prev, tab];
        });

        setActiveTabId(tab.id);
    });
    const setActiveTab = (id: string) => {
        const tab = openTabs.find((t) => t.id === id);
        if (!tab) return;

        setActiveTabId(id);
        router.push(routeTab(tab.type, tab.params));
    }
    const removeTab = (id: string) => {
        let nextTab: any = null;

        setOpenTabs((prev) => {
            const updated = prev.filter((t) => t.id !== id);

            if (id === activeTabId) {
                nextTab = updated.at(-1) ?? null;
            }

            return updated;
        });

        if (id === activeTabId) {
            if (nextTab) {
                router.push(`/${routeTab(nextTab.type, nextTab.params)}`);
            } else {
                router.push("/home");
            }
        }
    };

    const isActiveTab = (id: string): boolean => {
        return id === activeTabId
    }
    const setLabel = useCallback((id: string, label: string) => {
        setOpenTabs((prev) => {
            const tab = prev.find((t) => {
                return t.id === id;
            });

            if (!tab) return prev;

            if (tab.label === label) return prev;

            return prev.map((t) =>
                t.id === id
                    ? { ...t, label }
                    : t
            );
        });
    }, []);

    useEffect(() => {
        setActiveNoteId(activeTabId.split(":")[1])
    }, [activeTabId])

    return (
        <WorkSpaceContext.Provider
            value={{
                openTabs,
                activeTabId,
                activeNoteId,
                setActiveTab,
                removeTab,
                isActiveTab,
                setLabel,

            }}
        >
            {children}
        </WorkSpaceContext.Provider>
    );
};