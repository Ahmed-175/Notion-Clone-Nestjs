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
    const { setLabel, activeTabId } = useTab();
    useEffect(() => {
        if (note && activeTabId) {
            setLabel(activeTabId, note.title);
        }
    }, [note?._id, note?.title, setLabel]);
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