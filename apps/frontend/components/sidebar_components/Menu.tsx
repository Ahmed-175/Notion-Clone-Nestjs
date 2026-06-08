import { INode } from "@/types/node.type";
import { CgNotes } from "react-icons/cg";
import { FaRegFolder, FaRegStar, FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { GoLink } from "react-icons/go";
import MenuItem from "./MenuItem";
import useNodeActions from "@/hooks/useNodeActions";
import { useState } from "react";
import Modal from "../../shared/components/Modal";

const Menu = ({ node, x, y }: { node: INode; x: number; y: number }) => {
  const { addNode, renameNode } = useNodeActions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create-note" | "create-folder" | "rename">("rename");
  const [nodeTitle, setNodeTitle] = useState("");

  const handleOpenModal = (type: "create-note" | "create-folder" | "rename") => {
    setModalType(type);
    if (type === "rename") {
      setNodeTitle(node.title);
    } else {
      setNodeTitle("");
    }
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!nodeTitle.trim()) return;

    if (modalType === "create-note") {
      addNode(nodeTitle, "note", node._id ? node._id : null);
    } else if (modalType === "create-folder") {
      addNode(nodeTitle, "folder", node._id ? node._id : null);
    } else if (modalType === "rename" && node._id) {
      renameNode(node._id, nodeTitle);
    }
    setIsModalOpen(false);
  };

  return (
    <>
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
              onClick={() => handleOpenModal("create-note")}
            />

            <MenuItem
              icon={<FaRegFolder />}
              label="Create new folder"
              onClick={() => handleOpenModal("create-folder")}
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
              onClick={() => handleOpenModal("rename")}
            />

            <MenuItem icon={<GoLink />} label="Copy link" onClick={() => { }} />

            <MenuItem
              icon={<FaRegTrashAlt />}
              label="Move to bin"
              onClick={() => { }}
            />

            <MenuItem
              icon={<FaRegStar />}
              label="Add to favorites"
              onClick={() => { }}
            />
          </>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalType === "create-note"
            ? "New Note Title"
            : modalType === "create-folder"
              ? "New Folder Title"
              : "Rename"
        }
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="w-full border rounded-lg p-2 outline-none focus:border-blue-500"
            placeholder="Enter title..."
            value={nodeTitle}
            onChange={(e) => setNodeTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Menu;
