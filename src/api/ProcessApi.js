import axios from 'axios';

const API_BASE_URL = 'http://your-api-url.com/api';

export default {
  getProcesses: () => axios.get(`${API_BASE_URL}/processes`),
  cancelProcess: (processInstanceId) => 
    axios.delete(`${API_BASE_URL}/processes/${processInstanceId}`),
};