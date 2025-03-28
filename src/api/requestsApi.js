import axios from 'axios';

const api = axios.create({
  baseURL:  'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('validatorToken')}`
  }
});

export default {
  getRequestsByStatus(status) {
    return api.get(`/requests/${status}`);
  },
  approveRequest(id) {
    return api.post(`/requests/${id}/approve`);
  },
  rejectRequest(id, comment) {
    return api.post(`/requests/${id}/reject`, { comment });
  }
};