import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Divider,
  Alert,
  IconButton,
  Tooltip,
  useTheme,
  styled
} from "@mui/material";
import Form from '@formio/react';
import 'formiojs/dist/formio.full.min.css';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import {
  Edit as EditIcon,
  Code as CodeIcon,
  Description as FormIcon,
  FileCopy as CopyIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[8]
  },
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px'
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column'
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 600,
  letterSpacing: '0.5px',
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1)
  }
}));

const FormAndJsonView = ({ 
  formSchema, 
  jsonData,
  formTitle = "User Form",
  jsonTitle = "JSON Data",
  onRefresh
}) => {
  const [formSubmission, setFormSubmission] = useState({});
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleFormSubmit = (submission) => {
    setFormSubmission(submission.data);
  };

  const handleEditForm = () => {
    navigate("/admin/form-builder");
  };

  const handleEditJson = () => {
    navigate("/admin/process-definition");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ 
      p: 3,
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)' 
        : 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
      minHeight: 'auto'
    }}>
      <Box sx={{ 
        maxWidth: '1600px', 
        margin: '0 auto',
        position: 'relative'
      }}>
        {/* Floating action buttons */}
        <Box sx={{ 
          position: 'absolute', 
          top: theme.spacing(2), 
          right: theme.spacing(2),
          display: 'flex',
          gap: 1
        }}>
          {onRefresh && (
            <Tooltip title="Refresh Data">
              <IconButton 
                onClick={onRefresh}
                color="primary"
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: theme.shadows[2],
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText
                  }
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            mb: 4, 
            color: 'text.primary',
            textAlign: 'center',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            position: 'relative',
            '&:after': {
              content: '""',
              display: 'block',
              width: '80px',
              height: '4px',
              background: theme.palette.primary.main,
              margin: '16px auto 0',
              borderRadius: '2px'
            }
          }}
        >
          Form and Process Definition Viewer
        </Typography>
        
        <Grid container spacing={4}>
          {/* Form Section */}
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <HeaderBox>
                <Box display="flex" alignItems="center">
                  <FormIcon sx={{ mr: 1.5 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {formTitle}
                  </Typography>
                </Box>
                <ActionButton 
                  onClick={handleEditForm}
                  variant="contained"
                  color={formSchema ? "primary" : "success"}
                  startIcon={<EditIcon />}
                  size="small"
                  hidden={!jsonData}
                >
                  {formSchema ? "Edit Form" : "Create Form"}
                </ActionButton>
              </HeaderBox>
              
              <ContentBox>
                {formSchema ? (
                  <>
                    <Box sx={{ 
                      flexGrow: 1,
                      '& .formio-component': {
                        padding: '8px 0'
                      },
                      '& .formio-component-textfield input': {
                        borderRadius: '8px !important'
                      }
                    }}>
                      <Form
                        form={formSchema}
                        onSubmit={handleFormSubmit}
                        readOnly={true}
                        options={{ 
                          readOnly: true,
                          theme: 'bootstrap4',
                          icon: 'fontawesome'
                        }}
                      />
                    </Box>
                    {Object.keys(formSubmission).length > 0 && (
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Last Submission:
                        </Typography>
                        <SyntaxHighlighter 
                          language="json" 
                          style={materialDark}
                          customStyle={{ 
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            margin: 0
                          }}
                        >
                          {JSON.stringify(formSubmission, null, 2)}
                        </SyntaxHighlighter>
                      </Box>
                    )}
                  </>
                ) : (
                  <Alert 
                    severity="info" 
                    sx={{ 
                      mt: 2,
                      borderRadius: '8px'
                    }}
                  >
                    No form schema available. Click "Create Form" to create one.
                  </Alert>
                )}
              </ContentBox>
            </StyledPaper>
          </Grid>

          {/* JSON Section */}
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <HeaderBox>
                <Box display="flex" alignItems="center">
                  <CodeIcon sx={{ mr: 1.5 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {jsonTitle}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  {jsonData && (
                    <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                      <IconButton 
                        onClick={copyToClipboard}
                        size="small"
                        sx={{ 
                          color: theme.palette.primary.contrastText,
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)'
                          }
                        }}
                      >
                        <CopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <ActionButton 
                    onClick={handleEditJson}
                    variant="contained"
                    color={jsonData ? "primary" : "success"}
                    startIcon={<EditIcon />}
                    size="small"
                  >
                    {jsonData ? "Edit JSON" : "Create JSON"}
                  </ActionButton>
                </Box>
              </HeaderBox>
              
              <ContentBox>
                {jsonData ? (
                  <SyntaxHighlighter 
                    language="json" 
                    style={materialDark}
                    customStyle={{ 
                      flexGrow: 1,
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      margin: 0
                    }}
                  >
                    {JSON.stringify(jsonData, null, 2)}
                  </SyntaxHighlighter>
                ) : (
                  <Alert 
                    severity="info" 
                    sx={{ 
                      mt: 2,
                      borderRadius: '8px'
                    }}
                  >
                    No JSON data available. Click "Create JSON" to add some.
                  </Alert>
                )}
              </ContentBox>
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

FormAndJsonView.propTypes = {
  formSchema: PropTypes.object,
  jsonData: PropTypes.object,
  formTitle: PropTypes.string,
  jsonTitle: PropTypes.string,
  onRefresh: PropTypes.func
};

export default FormAndJsonView;