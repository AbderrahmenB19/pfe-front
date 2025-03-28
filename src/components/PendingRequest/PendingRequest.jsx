import React, { useState } from 'react';
import {
  Button,
  Modal,
  Header,
  Segment,
  Icon,
  Accordion,
  Card,
  Form,
  TextArea
} from 'semantic-ui-react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';

const PendingRequest = ({ request, onApprove, onReject }) => {
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectComment, setRejectComment] = useState('');
  const [activeAccordions, setActiveAccordions] = useState([]);

  const handleAccordionClick = (index) => {
    const newActiveAccordions = [...activeAccordions];
    const currentIndex = activeAccordions.indexOf(index);

    if (currentIndex > -1) {
      newActiveAccordions.splice(currentIndex, 1);
    } else {
      newActiveAccordions.push(index);
    }

    setActiveAccordions(newActiveAccordions);
  };

  const handleRejectClick = () => {
    setRejectDialogOpen(true);
  };

  const handleRejectConfirm = () => {
    onReject(request.id, rejectComment);
    setRejectDialogOpen(false);
    setRejectComment('');
  };

  const handleRejectCancel = () => {
    setRejectDialogOpen(false);
    setRejectComment('');
  };

  const handleApprove = () => {
    onApprove(request.id);
  };

  const renderField = (key, value, index) => {
    if (Array.isArray(value)) {
      return (
        <Accordion key={`${key}-${index}`} styled>
          <Accordion.Title
            active={activeAccordions.includes(index)}
            index={index}
            onClick={() => handleAccordionClick(index)}
          >
            <Icon name="dropdown" />
            {key}
          </Accordion.Title>
          <Accordion.Content active={activeAccordions.includes(index)}>
            {value.map((item, itemIndex) =>
              typeof item === 'object' ? (
                renderField(`${key} - ${itemIndex + 1}`, item, itemIndex)
              ) : (
                <p key={itemIndex}>{item}</p>
              )
            )}
          </Accordion.Content>
        </Accordion>
      );
    }
    
    if (typeof value === 'object' && value !== null) {
      return (
        <Accordion key={`${key}-${index}`} styled>
          <Accordion.Title
            active={activeAccordions.includes(index)}
            index={index}
            onClick={() => handleAccordionClick(index)}
          >
            <Icon name="dropdown" />
            {key}
          </Accordion.Title>
          <Accordion.Content active={activeAccordions.includes(index)}>
            {Object.entries(value).map(([nestedKey, nestedValue], nestedIndex) => (
              <div key={nestedKey}>
                {renderField(nestedKey, nestedValue, nestedIndex)}
              </div>
            ))}
          </Accordion.Content>
        </Accordion>
      );
    }

    return (
      <Segment key={`${key}-${index}`}>
        <strong>{key}:</strong> {value}
      </Segment>
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Header as="h2" icon textAlign="center">
        <Icon name="clipboard list" circular />
        Form Submission Review
      </Header>

      <Card fluid>
        <Card.Content>
          {Object.entries(request.formData).map(([key, value], index) => (
            <div key={key}>
              {renderField(key, value, index)}
              <div style={{ margin: '10px 0' }} />
            </div>
          ))}
        </Card.Content>
      </Card>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button color="green" onClick={handleApprove}>
          <Icon name="check circle" />
          Approve
        </Button>
        <Button color="red" onClick={handleRejectClick}>
          <Icon name="cancel" />
          Reject
        </Button>
      </div>

      {/* Material UI Dialog for Rejection */}
      <Dialog
        open={rejectDialogOpen}
        onClose={handleRejectCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Reject Form Submission</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a reason for rejecting this form submission.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Rejection Reason"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={rejectComment}
            onChange={(e) => setRejectComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRejectCancel}>Cancel</Button>
          <Button 
            onClick={handleRejectConfirm} 
            color="error"
            variant="contained"
          >
            Confirm Reject
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PendingRequest;