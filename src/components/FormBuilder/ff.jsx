import React, { useState, useEffect, useRef } from "react";
import { 
  Container, 
  Button, 
  Modal, 
  Box, 
  Typography, 
  Paper,
  IconButton 
} from "@mui/material";
import PropTypes from "prop-types";
import { FormBuilder, Form } from '@formio/react';
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
  Visibility as PreviewIcon,
  Close as CloseIcon,
  Build as BuilderIcon
} from '@mui/icons-material';

const FormHeader = ({ formJson, onSave, onPreview, onDiscard }) => {
  const [previewVisible, setPreviewVisible] = useState(false);

  const showPreview = () => {
    setPreviewVisible(true);
    onPreview();
  };

  const closePreview = () => setPreviewVisible(false);

  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={onDiscard}
      >
        Discard
      </Button>
      
      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        onClick={onSave}
      >
        Save Form
      </Button>
      
      <Button
        variant="contained"
        startIcon={<PreviewIcon />}
        onClick={showPreview}
        sx={{ backgroundColor: '#16176F', '&:hover': { backgroundColor: '#0e0e5a' } }}
      >
        Preview
      </Button>

      <Modal
        open={previewVisible}
        onClose={closePreview}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            backgroundColor: '#16176F',
            color: 'white',
            p: 2,
            borderRadius: '8px 8px 0 0'
          }}>
            <Typography variant="h6">Form Preview</Typography>
            <IconButton onClick={closePreview} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ p: 2 }}>
            <FormPreview formJson={formJson} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

// Separate component to force re-render with latest formJson
const FormPreview = React.memo(({ formJson }) => {
  return <Form form={formJson} />;
});

FormHeader.propTypes = {
  formJson: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired
};

const FormBuilderReact = () => {
  const [formJson, setFormJson] = useState({ components: [] });
  const [currentFormJson, setCurrentFormJson] = useState({ components: [] });
  const formRef = useRef();

  useEffect(() => {
    const defaultForm = {
      components: [
        {
          type: "textfield",
          key: "firstName",
          label: "First Name",
          input: true,
          placeholder: "Enter first name",
          validate: { required: true }
        },
        {
          type: "textfield",
          key: "lastName",
          label: "Last Name",
          input: true,
          placeholder: "Enter last name",
          validate: { required: true }
        }
      ]
    };
    setFormJson(defaultForm);
    setCurrentFormJson(defaultForm);
  }, []);

  const onChange = (schema) => {
    setFormJson(schema);
    setCurrentFormJson(schema); // Update the current form immediately
  };

  const handleSave = () => {
    console.log("Form JSON saved:", formJson);
    alert('Form saved successfully!');
  };

  const handlePreview = () => {
    // Get the latest form schema from the builder if available
    if (formRef.current) {
      const latestSchema = formRef.current.schema;
      setCurrentFormJson(latestSchema);
    }
  };

  const handleDiscard = () => {
    if (window.confirm("Are you sure you want to discard changes?")) {
      setFormJson({ components: [] });
      setCurrentFormJson({ components: [] });
    }
  };

  // Form.io Theme Customization
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .formio-form, .formio-form-builder {
        --primary-color: #16176F;
        --secondary-color: #6c757d;
        --text-color: #333333;
        --light-color: #ffffff;
        --border-color: #e0e0e0;
      }
      
      .formio-form, .formio-form-wrapper {
        color: var(--text-color) !important;
        background-color: var(--light-color) !important;
        font-family: 'Segoe UI', Roboto, sans-serif;
      }
      
      .formio-component label,
      .formio-component .form-text,
      .formio-component .text-muted {
        color: var(--text-color) !important;
        font-weight: 500;
      }
      
      .form-control, .form-select {
        background-color: var(--light-color) !important;
        color: var(--text-color) !important;
        border: 1px solid var(--border-color) !important;
        border-radius: 4px !important;
        padding: 10px 12px !important;
      }
      
      .form-control:focus, .form-select:focus {
        border-color: var(--primary-color) !important;
        box-shadow: 0 0 0 2px rgba(22, 23, 111, 0.2) !important;
      }
      
      .btn-primary {
        background-color: var(--primary-color) !important;
        border-color: var(--primary-color) !important;
        color: white !important;
        font-weight: 500 !important;
        padding: 8px 16px !important;
        border-radius: 4px !important;
        transition: all 0.2s ease;
      }
      
      .btn-primary:hover {
        background-color: #0e0e5a !important;
        border-color: #0e0e5a !important;
      }
      
      .formio-builder-component-list {
        background: white !important;
        border-right: 1px solid #e0e0e0 !important;
      }
      
      .formio-builder-group-header {
        color: white !important;
        background: #16176F !important;
        font-weight: 600 !important;
      }
      
      .formio-component-btn {
        color: #333 !important;
        border: 1px solid #e0e0e0 !important;
        margin: 5px !important;
        border-radius: 4px !important;
      }
      
      .formio-component-btn:hover {
        background: #f5f5f5 !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const builderOptions = {
    builder: {
      basic: {
        title: 'Basic',
        default: true,
        weight: 0,
        components: {
          textfield: true,
          textarea: true,
          number: true,
          password: true,
          checkbox: true,
          checkboxes: true,
          select: true,
          radio: true,
          button: true
        }
      },
      advanced: {
        title: 'Advanced',
        weight: 10,
        components: {
          // Add any advanced components you want
        }
      },
      layout: {
        title: 'Layout',
        weight: 20,
        components: {
          // Add layout components
        }
      },
      data: {
        title: 'Data',
        weight: 30,
        components: {
          // Add data components
        }
      },
      premium: {
        title: 'Premium',
        weight: 40,
        components: {
          // Add premium components
        }
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <BuilderIcon sx={{ fontSize: 32, color: '#16176F' }} />
        <Typography variant="h4" sx={{ color: '#16176F', fontWeight: '600' }}>
          Form Builder
        </Typography>
      </Box>
      
      <FormHeader
        formJson={currentFormJson}
        onSave={handleSave}
        onPreview={handlePreview}
        onDiscard={handleDiscard}
      />
      
      <Paper elevation={2} sx={{ mt: 2, borderRadius: 2, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
        <FormBuilder 
          form={formJson} 
          onChange={onChange} 
          options={builderOptions}
          ref={formRef}
        />
      </Paper>
    </Container>
  );
};

export default FormBuilderReact;