import useTab from "@/hooks/useTab";
import { ITab } from "@/types/workflow.type";
import { FiHome } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import { usePathname } from "next/navigation";

const Tab = ({ tab }: { tab: ITab }) => {
  const { removeTab, setActiveTab } = useTab();
  const pathname = usePathname();

  const isActive = () => {
    if (tab.type === "note") {
      return pathname === `/note/${tab._id}`;
    }

    return pathname === `/${tab.href}`;
  };

  return (
    <div
      onClick={() => setActiveTab(tab._id)}
      className={`p-2 px-4 rounded-lg flex cursor-pointer duration-100 justify-between gap-7 items-center w-fit h-fit
        ${isActive() ? "bg-black text-white" : "bg-slate-200 hover:bg-slate-300"}
      `}
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
        <GiCancel className="text-xl hover:text-red-500 cursor-pointer duration-150" />
      </div>
    </div>
  );
};

export default Tab;