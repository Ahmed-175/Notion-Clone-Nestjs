"use client";

import { useTrash } from "@/features/nodes/hooks/useNodes";
import { useNodeMutations } from "@/features/nodes/hooks/useNodeMutations";
import { CgNotes } from "react-icons/cg";
import { FaRegFolder } from "react-icons/fa";
import { MdOutlineRestore } from "react-icons/md";

const TrashPage = () => {
  const { data: trashNodes, isLoading } = useTrash();
  const { restoreNode } = useNodeMutations();

  if (isLoading) {
    return <div className="p-8 text-center">Loading trash...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Trash</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600">Title</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Created At</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {trashNodes?.map((node) => (
              <tr key={node._id} className="hover:bg-gray-50 transition-colors">

                <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                  {node.type === "folder" ? (
                    <FaRegFolder className=" text-xl" />
                  ) : (
                    <CgNotes className=" text-xl" />
                  )}
                  {node.title}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(node.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => restoreNode.mutate(node._id)}
                    className="p-2 rounded-lg cursor-pointer bg-black text-white hover:bg-slate-700 transition-colors flex items-center gap-2"
                    title="Restore item"
                  >
                    <MdOutlineRestore className="text-xl" />
            
                  </button>
                </td>
              </tr>
            ))}
            {trashNodes?.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                  Trash is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrashPage;
