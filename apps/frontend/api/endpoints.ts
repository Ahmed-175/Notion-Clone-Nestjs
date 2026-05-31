export const endpoints = {
  user: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
    picture: "http://localhost:8000/uploads/users",
    uplaodPicture: "/users/upload",
  },
  nodes: {
    create: "/nodes/create",
    get: "/nodes",
    update: (id: string) => `/nodes/${id}`,
  },

  notes: {
    get: (id: string) => `/notes/${id}`,
    banner: (url: string) => `http://localhost:8000/uploads/banners/${url}`,
  },
};
