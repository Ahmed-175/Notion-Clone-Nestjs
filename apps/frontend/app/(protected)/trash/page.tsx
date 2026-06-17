"use client";

import { useTrash } from "@/features/nodes/hooks/useNodes";
import React, { useEffect } from "react";

const TrashPage = () => {
  const { data: trashNodes } = useTrash();

  useEffect(() => {
    if (trashNodes) {
      console.log("Trash Nodes:", trashNodes);
    }
  }, [trashNodes]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Trash</h1>
      <p className="text-gray-600">Check the console for trash data.</p>
    </div>
  );
};

export default TrashPage;
