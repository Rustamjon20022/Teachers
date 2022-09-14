import { service } from ".";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getStaff: () => service.get('/staffs'),  
  getOneById: (id) => service.get(`/staffs/${id}`),  
  addStaff: (data) => service.post(`/staffs`, data),
  editStaff: (id, data) => service.put(`/staffs/${id}`, data),
  deleteStaff: (id) => service.delete(`/staffs/${id}`),
};