import useNote from "@/hooks/useNote";
import { useEffect, useRef } from "react";
import useEditor from "../hooks/useEditor";

const Editor = () => {
    const { note } = useNote();
    const { handleChangeContent, content } = useEditor();
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (divRef.current && note) {
            divRef.current.innerText = note.content;
        }
    }, [note?._id]);

    useEffect(() => {
        if (divRef.current && content !== divRef.current.innerText) {
            divRef.current.innerText = content;
        }
    }, [content]);

    return (
        <div
            ref={divRef}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => {
                handleChangeContent(e.currentTarget.innerText);
            }}
            className="px-[10%] text-xl mt-4 outline-none mb-12"
        />
    );
};

export default Editor;