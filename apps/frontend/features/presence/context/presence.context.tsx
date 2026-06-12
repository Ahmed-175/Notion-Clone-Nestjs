import { createContext, useEffect, useState } from "react";
import { IActiveUser, IPresenceContext } from "../types/presence.type";
import useTab from "@/features/workspace/hooks/useTab";
import { socket } from "@/shared/socket/note.socket";

export const PresenceContext = createContext<IPresenceContext | null>(null);

const PresenceProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeUsers, setActiveUsers] = useState<IActiveUser[]>([]);
  const { activeTabId } = useTab();

  useEffect(() => {
    if (!activeTabId) return;

    const noteId = activeTabId.split(":")[1];
    if (!noteId) return;

    socket.emit("join-note", noteId);

    const handleAllUsers = (users: IActiveUser[]) => {
      setActiveUsers(users);
    };

    const handleAddUser = (user: IActiveUser) => {
      setActiveUsers((prev) => {
        const exists = prev.some((u) => u._id === user._id);
        if (exists) return prev;
        return [...prev, user];
      });
    };

    const handleRemoveUser = (userId: string) => {
      setActiveUsers((prev) => prev.filter((u) => u._id !== userId));
    };

    socket.on("all-online-users", handleAllUsers);
    socket.on("add-active-user", handleAddUser);
    socket.on("remove-active-user", handleRemoveUser);

    return () => {
      socket.emit("leave-note", noteId);

      socket.off("all-online-users", handleAllUsers);
      socket.off("add-active-user", handleAddUser);
      socket.off("remove-active-user", handleRemoveUser);
    };
  }, [activeTabId]);

  return (
    <PresenceContext.Provider value={{ activeUsers }}>
      {children}
    </PresenceContext.Provider>
  );
};

export default PresenceProvider;