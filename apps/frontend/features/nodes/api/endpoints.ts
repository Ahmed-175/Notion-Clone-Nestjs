export const nodesEndpoint = {
  create: "/nodes/create",
  get: "/nodes",
  update: (id: string) => `/nodes/${id}`,
  delete: (id: string) => `/nodes/${id}`,
  favorite: (id: string) => `/nodes/${id}/favorite`,
};
