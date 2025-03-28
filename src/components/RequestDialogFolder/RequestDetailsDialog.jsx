import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import PendingRequest from '../PendingRequest/PendingRequest';
import ApprovedRequest from '../ApprovedRequest/ApprovedRequest';
import RejectedRequest from '../RejectedRequest/RejectedRequest';


const RequestDetailsDialog = ({ 
  open, 
  onClose, 
  request, 
  tabValue,
  onApprove,
  onReject 
}) => {
  if (!request) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="md"
      scroll="paper"
    >
      <DialogTitle>Request Details</DialogTitle>
      <DialogContent dividers>
        {tabValue === 0 && (
          <PendingRequest
            request={request}
            onApprove={onApprove}
            onReject={onReject}
          />
        )}
        {tabValue === 1 && (
          <ApprovedRequest request={request} />
        )}
        {tabValue === 2 && (
          <RejectedRequest request={request} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RequestDetailsDialog;