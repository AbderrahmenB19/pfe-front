import api from './index';

export const getProcessDefinition = (id) => api.get(`/admin/processes/${id}`);
export const saveProcessDefinition = (processData) => api.post('/admin/processes', processData);
export const updateProcessDefinition = (id, processData) => api.put(`/admin/processes/${id}`, processData);
export const deleteProcessDefinition = (id) => api.delete(`/admin/processes/${id}`);