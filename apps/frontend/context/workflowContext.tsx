import { ITab } from "@/types/tab.type";
import { createContext, SetStateAction, useState } from "react";

interface IWorkflowContext {
  openTabs: ITab[];
  currentTab: ITab;
  addTab: (tab: ITab) => void;
  removeTab: (_id: string) => void;
  putcrnt: (_id: string) => void;
  cache: Record<string, any>;
  setCache: React.Dispatch<SetStateAction<Record<string, any>>>;
}

export const workflowContext = createContext<IWorkflowContext | null>(null);
const start: ITab = {
  _id: "home",
  type: "home",
  name: "Home page",
};

const WorkflowProvider = ({ children }: { children: React.ReactNode }) => {
  const [openTabs, setOpenTabs] = useState<ITab[]>([start]);
  const [currentTab, setCurrentTab] = useState<ITab>(start);
  const [cache, setCache] = useState<Record<string, any>>({});

  const putcrnt = (_id: string) => {
    const tab = openTabs.find((a) => a._id == _id);
    if (!tab) {
      setCurrentTab(start);
      return;
    }

    setCurrentTab(tab);
  };

  const addTab = (tab: ITab) => {
    const isExist = openTabs.find((a) => a._id == tab._id);
    if (isExist) {
      setCurrentTab(isExist);
      return;
    }
    setOpenTabs((prevs) => [...prevs, tab]);
    setCurrentTab(tab);
  };
  const removeTab = (_id: string) => {
    setOpenTabs((prevTabs) => {
      const filteredTabs = prevTabs.filter((tab) => tab._id !== _id);

      setCache((prevCache) => {
        const newCache = { ...prevCache };
        delete newCache[_id];
        return newCache;
      });

      if (filteredTabs.length === 0) {
        setCurrentTab(start);
        return [start];
      }

      setCurrentTab((prevCurrent) => {
        if (prevCurrent._id === _id) {
          return filteredTabs[filteredTabs.length - 1];
        }
        return prevCurrent;
      });

      return filteredTabs;
    });
  };

  return (
    <workflowContext.Provider
      value={{
        openTabs,
        currentTab,
        putcrnt,
        addTab,
        removeTab,
        cache,
        setCache,
      }}
    >
      {children}
    </workflowContext.Provider>
  );
};

export default WorkflowProvider;
