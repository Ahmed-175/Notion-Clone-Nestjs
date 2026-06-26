"use client"
import Banner from "@/components/Note/Banner";
import Properties from "@/components/Note/Properties";
import TitleNote from "@/components/Note/TitleNote";
import Editor from "@/features/editor/components/Editor";
import EditorProvider from "@/features/editor/context/Editor.context";
import PresenceProvider from "@/features/presence/context/presence.context";
import Preview from "@/features/preview/components/Preview";
import useTab from "@/features/workspace/hooks/useTab";
import useAuth from "@/hooks/useAuth";
import useNote from "@/hooks/useNote";
import { useEffect, useState } from "react";

const page = () => {
    const { note } = useNote();
    const { user } = useAuth();
    const [editable, setEditable] = useState(false)
    const { setLabel } = useTab();
    useEffect(() => {
        if (note) {
            setLabel(`note:${note._id}`, note.title);
            if (note.ownerId == user._id) {
                setEditable(true)
            }
        }

    }, [note?._id, note?.title, setLabel, user?._id]);
    return (
        <div className=" relative">
            <EditorProvider>
                <PresenceProvider>
                    <Banner />
                    <TitleNote />
                    <Properties />
                    {editable ? (<Editor />) : (<Preview />)}



                </PresenceProvider>
            </EditorProvider>
        </div>
    )
}

export default page;
