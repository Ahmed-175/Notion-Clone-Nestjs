import useTab from "@/hooks/useTab";
import Tab from "./Tab";

const WorkspaceHeader = () => {
  const { openTabs } = useTab();
  return (
    <div
      className="w-[80%] z-20 flex flex-wrap items-center fixed h-20  gap-3 top-0 
    right-0 p-2"
    >
      {openTabs.map((tab, index) => (
        <Tab tab={tab} key={index} />
      ))}
    </div>
  );
};

export default WorkspaceHeader;
