import React, { useEffect } from 'react';
import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProcesses } from '/src/store/slices/processUserSlice';
import AsanaStyleTable from '../../../components/AsanaStyleTable/AsanaStyleTable';


const ProcessTable = () => {
  const dispatch = useDispatch();
  const { processes, loading, error } = useSelector((state) => state.processUser);

  useEffect(() => {
    dispatch(fetchProcesses());
  }, [dispatch]);

  const handleCancelRequest = async (processInstanceId) => {
    const result = await dispatch(cancelProcessRequest(processInstanceId));
    if (result.success) {
      alert('Process cancelled successfully!');
    } else {
      alert(`Error cancelling process: ${result.error}`);
    }
  };

  if (loading && !processes.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 ,color:'#16176F' }}>My Requests</Typography>
      <AsanaStyleTable
        processes={processes} 
        onCancelRequest={handleCancelRequest}
        loading={loading}
      />
    </Box>
  );
};

export default ProcessTable;