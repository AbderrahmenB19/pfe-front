import React, { useEffect } from "react";
import { Form } from '@formio/react';
import 'formiojs/dist/formio.full.min.css';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormSchema, submitFormData } from '/src/store/slices/formUserSlice';

const UserForm = () => {
  const dispatch = useDispatch();
  const { formSchema, loading, error } = useSelector((state) => state.formUser);

  useEffect(() => {
    dispatch(fetchFormSchema());
  }, [dispatch]);

  const handleSubmit = async (submission) => {
    const result = await dispatch(submitFormData(submission.data));
    if (result.success) {
      alert('Form submitted successfully!');
    } else {
      alert(`Error submitting form: ${result.error}`);
    }
  };

  // Custom theme styles for Form.io
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .formio-form {
        --primary-color: #16176F;
        --secondary-color: #6c757d;
        --text-color: #333333;
        --light-color: #ffffff;
        --border-color: #e0e0e0;
      }
      
      /* Form container */
      .formio-form, .formio-form-wrapper {
        color: var(--text-color) !important;
        background-color: var(--light-color) !important;
        font-family: 'Segoe UI', Roboto, sans-serif;
      }
      
      /* Labels and text */
      .formio-component label,
      .formio-component .form-text,
      .formio-component .text-muted {
        color: var(--text-color) !important;
        font-weight: 500;
      }
      
      /* Input fields */
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
      
      /* Buttons */
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
      
      /* Required field indicators */
      .formio-required:after {
        color: var(--primary-color) !important;
      }
      
      /* Error messages */
      .has-error .form-control {
        border-color: #dc3545 !important;
      }
      
      .help-block {
        color: #dc3545 !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Row>
        <Col>
          <Card className="shadow-lg p-4" style={{ 
            width: '600px',
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '8px'
          }}>
            <h2 className="text-center mb-4" style={{ 
              color: '#16176F',
              fontWeight: '600',
              fontSize: '1.75rem'
            }}>
              User Form
            </h2>
            
            {error && (
              <Alert variant="danger" style={{
                backgroundColor: '#f8d7da',
                color: '#721c24',
                borderColor: '#f5c6cb',
                borderRadius: '4px'
              }}>
                {error}
              </Alert>
            )}
            
            {loading && !formSchema ? (
              <div className="text-center">
                <Spinner animation="border" role="status" style={{ 
                  color: '#16176F',
                  width: '2rem',
                  height: '2rem'
                }}>
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p style={{ color: '#333', marginTop: '1rem' }}>Loading form...</p>
              </div>
            ) : formSchema ? (
              <Form
                form={formSchema}
                onSubmit={handleSubmit}
              />
            ) : (
              <p className="text-center" style={{ color: '#333' }}>No form schema available.</p>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserForm;