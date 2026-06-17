import { useNodes as useNodesQuery, useTrash as useTrashQuery, useFavorites as useFavoritesQuery } from "@/features/nodes/hooks/useNodes";

const useNodes = () => {
  const { data: nodes, isLoading: loading } = useNodesQuery();
  const { getTrash } = useTrashQueryHook(); // Wait, I need to adapt the interface if I want to keep it compatible
  const { getFavorites } = useFavoritesQueryHook();

  return {
    nodes: nodes || {},
    loading,
    getTrash,
    getFavorites,
  };
};

// Helper hooks to maintain compatibility with the previous getTrash/getFavorites methods
const useTrashQueryHook = () => {
  const { refetch } = useTrashQuery();
  return {
    getTrash: async () => {
      const { data } = await refetch();
      return data || [];
    }
  };
};

const useFavoritesQueryHook = () => {
  const { refetch } = useFavoritesQuery();
  return {
    getFavorites: async () => {
      const { data } = await refetch();
      return data || [];
    }
  };
};

export default useNodes;
