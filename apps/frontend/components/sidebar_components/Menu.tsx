import { INode } from "@/types/node.type";
import { CgNotes } from "react-icons/cg";
import { FaRegFolder, FaRegStar, FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { GoLink } from "react-icons/go";
import MenuItem from "./MenuItem";

const Menu = ({ node, x, y }: { node: INode; x: number; y: number }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
      style={{
        position: "fixed",
        top: y + 10,
        left: x + 10,
      }}
      className="z-50 w-fit bg-white shadow-2xl rounded-lg p-2 px-5"
    >
      <div className="mb-2 font-light text-gray-500">{node.title}</div>

      {node.type === "folder" && (
        <>
          <MenuItem
            icon={<CgNotes />}
            label="Create new note"
            onClick={() => {}}
          />

          <MenuItem
            icon={<FaRegFolder />}
            label="Create new folder"
            onClick={() => {}}
          />
        </>
      )}

      {node._id && node.type == "folder" && (
        <hr className="mb-1 text-slate-500" />
      )}

      {node._id && (
        <>
          <MenuItem
            icon={<FiEdit />}
            label={`Rename the ${node.type}`}
            onClick={() => {
              console.log("rename");
            }}
          />

          <MenuItem icon={<GoLink />} label="Copy link" onClick={() => {}} />

          <MenuItem
            icon={<FaRegTrashAlt />}
            label="Move to bin"
            onClick={() => {}}
          />

          <MenuItem
            icon={<FaRegStar />}
            label="Add to favorites"
            onClick={() => {}}
          />
        </>
      )}
    </div>
  );
};

export default Menu;
