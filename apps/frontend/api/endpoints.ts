export const endpoints = {
  user: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
    picture: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/users`,
    uplaodPicture: "/users/upload",
  },
  nodes: {
    create: "/nodes/create",
    get: "/nodes",
    trash: "/nodes/trash",
    favorites: "/nodes/favorites",
    update: (id: string) => `/nodes/${id}`,
    delete: (id: string) => `/nodes/${id}`,
    toggleFavorite: (id: string) => `/nodes/${id}/favorite`,
    restore: (id: string) => `/nodes/${id}/restore`,
  },

  notes: {
    get: (id: string) => `/notes/${id}`,
    banner: (url: string) =>
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/banners/${url}`,
  },
};
