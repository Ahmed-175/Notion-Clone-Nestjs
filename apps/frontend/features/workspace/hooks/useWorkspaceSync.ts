import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { TabType } from "../types/tab.type";

export const useWorkspaceSync = (
  onTab: (type: TabType, segments: string[]) => void,
) => {
  const pathname = usePathname();
  if (!pathname) return;
  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const type = segments[0] as TabType;

    if (!type) return;

    onTab(type, segments);
  }, [pathname]);
};
