import api from './index';

const API_BASE_URL = 'http://your-api-url.com/api';

export default {
  getProcesses: () => api.get(`${API_BASE_URL}/client/processes`),
  cancelProcess: (processInstanceId) => 
    api.patch(`${API_BASE_URL}/client/processes/cancel-request/${processInstanceId}`),
};
