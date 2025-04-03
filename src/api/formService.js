import api from './index';

export const getForm = (id) => api.get(`/admin/forms/${id}`);
export const saveForm = (formData) => api.post('/admin/forms', formData);
export const updateForm = (id, formData) => api.put(`/admin/forms/${id}`, formData);
export const deleteForm = (id) => api.delete(`/admin/forms/${id}`);
//lyay bzex tiea lols