import useNote from '@/hooks/useNote';
import { parserMD } from '@/markdown/parser';
import { useEffect, useRef, useState } from 'react';

const Preview = () => {
    const { note } = useNote();
    const [content, setContent] = useState("");
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const value = parserMD(note?.content || "")

        if (divRef.current) {
            divRef.current.innerHTML = value;
        }
    }, [note?._id]);

    return (
        <div
            ref={divRef}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => {
                setContent(e.currentTarget.innerHTML);
            }}
            className="preview px-[10%] text-xl mt-4 outline-none mb-12"
        />
    );
};

export default Preview;