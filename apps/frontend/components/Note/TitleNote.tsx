import useNote from "@/hooks/useNote"
import { FaRegNewspaper } from "react-icons/fa";

const TitleNote = () => {
    const { note } = useNote();
    return (
        <div className="w-full  mt-3 text-3xl mx-[15%]">
            {/* <div className="flex justify-center items-center gap-2 w-fit">
                <FaRegNewspaper />
                {note?.title}
            </div> */}
        </div>
    )
}

export default TitleNote