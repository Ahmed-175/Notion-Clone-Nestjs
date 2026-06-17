"use client";

import { useFavorites } from "@/features/nodes/hooks/useNodes";
import React, { useEffect } from "react";

const FavoritesPage = () => {
  const { data: favoriteNodes } = useFavorites();

  useEffect(() => {
    if (favoriteNodes) {
      console.log("Favorite Nodes:", favoriteNodes);
    }
  }, [favoriteNodes]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      <p className="text-gray-600">Check the console for favorites data.</p>
    </div>
  );
};

export default FavoritesPage;
