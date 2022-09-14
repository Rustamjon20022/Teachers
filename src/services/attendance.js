import { service } from ".";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getGroups: () => service.get('/groups'),
  getStudents: (id) => service.get(`/students/groups/${id}`),
  postAttendance: (data) => service.post('/attendance', data),
};