import { service } from ".";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll: () => service.get("api/students"),
  create: (data) => service.post("/users", data),
  update: (id, data) => service.put(`/users/${id}`, data),
  delete: (id) => service.delete(`/users/${id}`),
  getUsers: (size, page) => service.get(`users?size=${size}&page=${page}`),
};
