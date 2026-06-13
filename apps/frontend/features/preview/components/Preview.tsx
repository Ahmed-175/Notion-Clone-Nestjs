import useNote from '@/hooks/useNote';
import { parserMD } from '@/markdown/parser';
import { socket } from '@/shared/socket/note.socket';
import { useEffect, useRef, useState } from 'react';

const Preview = () => {
    const { note } = useNote();
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        socket.on("user-update-content", (data) => {
            const value = parserMD(data);
            if (divRef.current) {
                divRef.current.innerHTML = value
            }
        })
        const value = parserMD(note?.content || "")

        if (divRef.current) {
            divRef.current.innerHTML = value;
        }
    }, [note?._id]);

    return (
        <div
            ref={divRef}

            className="preview px-[10%] text-xl mt-4 outline-none mb-12"
        />
    );
};

export default Preview;