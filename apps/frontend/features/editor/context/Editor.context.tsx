import { createContext, useEffect, useRef, useState } from "react";
import { IEditorContext } from "../types/editor.type";
import useTab from "@/features/workspace/hooks/useTab";
import { socket } from "@/shared/socket/note.socket";

export const EditorContext = createContext<IEditorContext | null>(null);

const EditorProvider = ({ children }: { children: React.ReactNode }) => {
    const [content, setContent] = useState("");
    const { activeTabId } = useTab();

    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleChangeContent = (changes: string) => {
        setContent(changes);

        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            socket.emit("edit-content-note", {
                node_id: activeTabId.split(":")[1],
                content: changes,
            });
        }, 2000);
    };

    useEffect(() => {
        const handleRemoteUpdate = (incomingContent: string) => {
            setContent(incomingContent);
        };

        socket.on("user-update-content", handleRemoteUpdate);

        return () => {
            socket.off("user-update-content", handleRemoteUpdate);
        };
    }, []);

    useEffect(() => {
        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, []);

    return (
        <EditorContext.Provider value={{ handleChangeContent, content }}>
            {children}
        </EditorContext.Provider>
    );
};

export default EditorProvider;