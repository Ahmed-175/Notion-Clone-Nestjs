import useNote from "@/hooks/useNote"
import { useEffect, useState } from "react";
import { FaRegNewspaper } from "react-icons/fa";

const TitleNote = () => {
    const { note } = useNote();
    const [title, setTitle] = useState<string>("");
    useEffect(() => {
        if (!note?.title) {
            setTitle("Untitled Note");
            return;
        }
        setTitle(note.title);
    }, [note?.title]);
    return (
        <div className="w-full  mt-3 text-3xl mx-[15%]">
            <div className="flex justify-center items-center gap-2 w-fit">
                <FaRegNewspaper />
                {title}
            </div>
        </div>
    )
}

export default TitleNote