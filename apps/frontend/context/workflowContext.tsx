// "use client";

// import { ITab, IWorkflowContext } from "@/types/workflow.type";
// import { useRouter, usePathname } from "next/navigation";
// import React, { createContext, useState, useEffect, useRef } from "react";
// import useNodes from "@/hooks/useNodes";


// export const workflowContext = createContext<IWorkflowContext | null>(null);

// const start: ITab = {
//   _id: "home",
//   type: "home",
//   href: "home",
//   name: "Home page",
// };

// const WorkflowProvider = ({ children }: { children: React.ReactNode }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { nodes } = useNodes();

//   const [openTabs, setOpenTabs] = useState<ITab[]>([start]);
//   const [activeTabId, setActiveTabId] = useState<string | null>("home");
//   const [cache, setCache] = useState<Record<string, any>>({});

//   const transitioningTabIdRef = useRef<string | null>(null);

//   useEffect(() => {
//     if (!pathname) return;

//     let matchedId: string | null = null;
//     let matchedTab: Omit<ITab, "_id"> | null = null;

//     const noteMatch = pathname.match(/^\/note\/([^/]+)$/);
//     if (noteMatch) {
//       const id = noteMatch[1];
//       matchedId = id;
//       matchedTab = {
//         type: "note",
//         name: nodes[id]?.title || "Loading...",
//       };
//     } else {
//       const staticPages = ["home", "search", "favorites", "trash", "community", "settings"];
//       for (const page of staticPages) {
//         if (pathname === `/${page}`) {
//           matchedId = page;
//           matchedTab = {
//             type: page as any,
//             href: page,
//             name: page
//           };
//           break;
//         }
//       }
//     }

//     if (matchedId && matchedTab) {
//       if (transitioningTabIdRef.current === matchedId) {
//         return;
//       }

//       if (transitioningTabIdRef.current !== matchedId) {
//         transitioningTabIdRef.current = null;
//       }

//       setActiveTabId(matchedId);
//       setOpenTabs((prev) => {
//         const exists = prev.find((t) => t._id === matchedId);
//         if (exists) return prev;
//         return [...prev, { ...matchedTab, _id: matchedId } as ITab];
//       });
//     }
//   }, [pathname, nodes]);

//   useEffect(() => {
//     setOpenTabs((prev) => {
//       let updated = false;
//       const nextTabs = prev.map((tab) => {
//         if (tab.type === "note") {
//           const node = nodes[tab._id];
//           if (node && node.title !== tab.name) {
//             updated = true;
//             return { ...tab, name: node.title };
//           }
//         }
//         return tab;
//       });
//       return updated ? nextTabs : prev;
//     });
//   }, [nodes]);

//   const addTab = (tab: ITab) => {
//     setOpenTabs((prev) => {
//       const exists = prev.find((t) => t._id === tab._id);
//       if (exists) return prev;
//       return [...prev, tab];
//     });

//     setActiveTabId(tab._id);

//     if (tab.type === "note") {
//       router.push(`/note/${tab._id}`);
//     } else {
//       router.push(`/${tab.href}`);
//     }
//   };

//   const setActiveTab = (_id: string) => {
//     const tab = openTabs.find((t) => t._id === _id);

//     if (!tab) return;

//     setActiveTabId(_id);

//     if (tab.type === "note") {
//       router.push(`/note/${_id}`);
//     } else {
//       router.push(`/${tab.href}`);
//     }
//   };

//   const removeTab = (_id: string) => {
//     transitioningTabIdRef.current = _id;
//     setOpenTabs((prev) => {
//       const filtered = prev.filter((t) => t._id !== _id);

//       if (activeTabId === _id) {
//         const next = filtered[filtered.length - 1] ?? start;
//         setActiveTabId(next._id);

//         if (next.type === "note") {
//           router.push(`/note/${next._id}`);
//         } else {
//           router.push(`/${next.href}`);
//         }
//       }

//       return filtered.length ? filtered : [start];
//     });

//     setCache((prev) => {
//       const copy = { ...prev };
//       delete copy[_id];
//       return copy;
//     });
//   };

//   return (
//     <workflowContext.Provider
//       value={{
//         openTabs,
//         activeTabId,
//         addTab,
//         removeTab,
//         setActiveTab,
//         cache,
//         setCache,
//       }}
//     >
//       {children}
//     </workflowContext.Provider>
//   );
// };

// export default WorkflowProvider;