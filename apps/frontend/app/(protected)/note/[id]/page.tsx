"use client"
import Banner from "@/components/Note/Banner";
import Properties from "@/components/Note/Properties";
import TitleNote from "@/components/Note/TitleNote";
import Preview from "@/components/Preview/Preview";

const page = () => {
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