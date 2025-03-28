import axios from 'axios';

const API_BASE_URL = 'http://your-api-url.com/api';

export default {
  getFormSchema: () => axios.get(`${API_BASE_URL}/form-schema`),
  submitForm: (formData) => axios.post(`${API_BASE_URL}/submit-form`, formData),
};