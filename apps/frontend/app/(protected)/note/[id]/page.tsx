"use client"
import Banner from "@/components/Note/Banner";
import Properties from "@/components/Note/Properties";
import TitleNote from "@/components/Note/TitleNote";
import useNote from "@/hooks/useNote";
import { useParams } from "next/navigation";

const page = () => {
    const { note } = useNote();
    const params = useParams<{ id: string }>();
    if (!params) {
        return null;
    }
    return (
        <div>
            <Banner />
            <TitleNote />
            <Properties />
        </div>
    )
}

export default page