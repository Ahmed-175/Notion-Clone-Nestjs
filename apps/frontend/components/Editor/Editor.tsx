import useNote from '@/hooks/useNote';
import React, { useEffect, useRef, useState } from 'react'

const Editor = () => {
    const { note } = useNote();
    const [content, setContent] = useState("");
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const value = note?.content || "";
        setContent(value);

        if (divRef.current) {
            divRef.current.innerText = value;
        }
    }, [note?._id]);

    console.log(content);

    return (
        <div
            ref={divRef}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => {
                setContent(e.currentTarget.innerText);
            }}
            className="px-[10%] text-xl mt-4 outline-none mb-12"
        />
    );
}

export default Editor