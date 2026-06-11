import useNote from "@/hooks/useNote";
import Tags from "./Tags";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { GoHash } from "react-icons/go";
import { GrResources } from "react-icons/gr";
import ActiveUsers from "@/features/presence/components/ActiveUsers";

const Properties = () => {
    const { note } = useNote();
    const date = new Date(note?.createdAt as any).toLocaleDateString();
    return (
        <div className="w-full pl-[10%] mt-1">
            <div className="text-2xl">Properties</div>
            <div className=" pl-[2%]">

                <div className=" w-full flex  items-center">
                    <div className="w-15 text-gray-500 text-lg flex justify-center
                     items-center gap-2"><GoHash />
                        tags</div>
                    <Tags tags={note?.tags} />
                </div>
                <div className=" w-full flex  gap-6 items-center">
                    <div className=" w-15 text-gray-500 text-lg flex justify-center
                     items-center gap-1">
                        <HiOutlineCalendarDateRange />
                        date</div>

                    <div >
                        {date}
                    </div>

                </div>
                <div className=" w-full flex  items-center">
                    <div className="w-30 text-gray-500 text-lg flex
                      items-center gap-2">
                        <GrResources />
                        resources</div>

                    <Tags tags={note?.tags} />
                </div>
                <div className=" w-full flex  items-center">
                    <ActiveUsers />
                </div>
            </div>
        </div>
    )
}

export default Properties;