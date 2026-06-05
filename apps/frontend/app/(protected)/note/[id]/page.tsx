"use client"
import Banner from "@/components/Note/Banner";
import Properties from "@/components/Note/Properties";
import TitleNote from "@/components/Note/TitleNote";
import Preview from "@/components/Preview/Preview";
import useTab from "@/features/workspace/hooks/useTab";
import useNote from "@/hooks/useNote";
import { useEffect } from "react";

const page = () => {
    const { note } = useNote();
    const { setLabel } = useTab();

    useEffect(() => {
        if (!note?._id) return;

        if (!note?.title) {
            setLabel(note._id, "loading");
            return;
        }

        setLabel(note._id, note.title);

    }, [note?._id, note?.title, setLabel]);

    console.log(note);
    return (
        <div>
            <Banner />
            <TitleNote />
            <Properties />
            <Preview />
        </div>
    )
}

export default page