import api from './index';

export const getProcessDefinition = (id) => api.get(`/processes/processDefinition`);
export const saveProcessDefinition = (processData) => api.post('/processes/process-defintion', processData);
export const updateProcessDefinition = (id, processData) => api.put(`/processes/process-definition`, processData);
//export const deleteProcessDefinition = (id) => api.delete(`/admin/processes/${id}`);