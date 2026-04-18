import useTab from "@/hooks/useTab";
import { ITab } from "@/types/tab.type";
import { FiHome } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";

const Tab = ({ tab }: { tab: ITab }) => {
  const { removeTab, currentTab, putcrnt } = useTab();
  return (
    <div
      onClick={() => {
        putcrnt(tab._id);
      }}
      className={` p-2  px-4 ${currentTab._id == tab._id ? "bg-black text-white" : " bg-slate-200 hover:bg-slate-300"} 
        rounded-lg  flex cursor-pointer  duration-100
    justify-between gap-7 items-center w-fit h-fit  `}
    >
      <div className="flex justify-center items-center gap-1 w-fit">
        <FiHome className="text-lg" />
        {tab.name}
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          removeTab(tab._id);
        }}
      >
        <GiCancel className="text-xl hover:text-red-500 
        cursor-pointer duration-150" />
      </div>
    </div>
  );
};

export default Tab;
