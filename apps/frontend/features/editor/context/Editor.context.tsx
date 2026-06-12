import { createContext, useState } from "react";
import { IEditorContext } from "../types/editor.type";
import useTab from "@/features/workspace/hooks/useTab";






const EditorContext = createContext<IEditorContext | null>(null);



const EditorProvider = ({ children }: { children: React.ReactNode }) => {
    const [content, setContent] = useState("");

    return (
        <EditorContext.Provider value={{}}>

        </EditorContext.Provider>
    )

}