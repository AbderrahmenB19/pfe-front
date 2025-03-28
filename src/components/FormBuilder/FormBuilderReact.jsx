import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { FormBuilder, Form } from '@formio/react';
import 'formiojs/dist/formio.full.min.css'; // Import Form.io default styles
import { FaTrash, FaSave, FaEye, FaTimes } from 'react-icons/fa';

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "0.5rem",
    boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)",
    marginTop: "1rem",
    marginBottom: "2rem",
    height: "auto"
  },
  title: {
    color: "#212529",
    fontSize: "1.75rem",
    fontWeight: "600",
    marginBottom: "1.5rem",
    fontFamily: "'Segoe UI', Roboto, sans-serif"
  },
  buttonGroup: {
    display: "flex",
    gap: "0.75rem",
    marginBottom: "1.5rem",
    flexWrap: "wrap"
  },
  button: {
    borderRadius: "0.375rem",
    padding: "0.5rem 1rem",
    fontWeight: "500",
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "all 0.2s ease"
  },
  discardBtn: {
    backgroundColor: "transparent",
    border: "1px solid #dc3545",
    color: "#dc3545"
  },
  saveBtn: {
    backgroundColor: "#0d6efd",
    border: "none",
    color: "white"
  },
  previewBtn: {
    backgroundColor: "#212529",
    border: "none",
    color: "white"
  },
  modalContent: {
    borderRadius: "0.5rem",
    border: "none"
  },
  modalHeader: {
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #dee2e6",
    padding: "1rem 1.25rem"
  },
  modalTitle: {
    fontSize: "1.25rem",
    fontWeight: "500"
  },
  modalBody: {
    padding: "1.5rem"
  },
  modalFooter: {
    backgroundColor: "#f8f9fa",
    borderTop: "1px solid #dee2e6",
    padding: "0.75rem 1.25rem"
  }
};

const FormHeader = ({ formJson, onSave, onPreview }) => {
  const [data, setData] = useState({});
  const [previewVisible, setPreviewVisible] = useState(false);

  const showPreview = () => {
    setPreviewVisible(true);
    onPreview();
  };

  const closePreview = () => {
    setPreviewVisible(false);
  };

  const onSubmit = (submission) => {
    console.log("Form submission:", submission.data);
    setData(submission.data);
  };

  return (
    <div style={styles.buttonGroup}>
            <Button 
              variant="outline-danger" 
              style={{...styles.button, ...styles.discardBtn}}
              onClick={() => window.confirm("Are you sure you want to discard changes?") && setFormJson({components: []})}
            >
              <FaTrash /> Discard
            </Button>
            
            <Button 
              variant="primary" 
              style={{...styles.button, ...styles.saveBtn}}
              onClick={onSave}
            >
              <FaSave /> Save
            </Button>
            
            <Button 
              variant="dark" 
              style={{...styles.button, ...styles.previewBtn}}
              onClick={showPreview}
            >
              <FaEye /> Preview Form
            </Button>
    

      <Modal show={previewVisible} onHide={closePreview} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Form Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          {formJson && <Form form={formJson} onSubmit={onSubmit} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closePreview}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

FormHeader.propTypes = {
  formJson: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
};

const FormBuilderReact = () => {
  const [formJson, setFormJson] = useState({
    components: [],
  });

  useEffect(() => {
    const defaultForm = {
      components: [
        {
          type: "textfield",
          key: "firstName",
          label: "First Name",
          input: true,
        },
        {
          type: "textfield",
          key: "lastName",
          label: "Last Name",
          input: true,
        },
      ],
    };
    setFormJson(defaultForm);
  }, []);

  const onChange = (schema) => {
    setFormJson(schema);
    console.log("Form schema changed:", schema);
  };

  const handleSave = () => {
    console.log("Form JSON to save:", formJson);
  };

  const handlePreview = () => {
    console.log("Previewing form:", formJson);
  };

  return (
    <>
     <Container style={styles.container}>
           <h2 style={styles.title}>Form Builder</h2>
           <FormHeader
             formJson={formJson}
             onSave={handleSave}
             onPreview={handlePreview}
           />
           <Row>
             <Col>
               <FormBuilder form={formJson} onChange={onChange} />
             </Col>
           </Row>
         </Container>
    </>
  );
};

export default FormBuilderReact;
