import { createContext, useState } from "react";
import { IEditorContext } from "../types/editor.type";
import useTab from "@/features/workspace/hooks/useTab";






const EditorContext = createContext<IEditorContext | null>(null);



const EditorProvider = ({ children }: { children: React.ReactNode }) => {
    const [content, setContent] = useState("");
    const handleChangeContent = async (c: string) => {
    }
    return (
        <EditorContext.Provider value={{ handleChangeContent, content }}>
            {children}
        </EditorContext.Provider>
    )

}