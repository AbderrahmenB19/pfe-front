import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Tooltip,
  useTheme,
  styled,
  Alert,
  Collapse
} from "@mui/material";
import PropTypes from 'prop-types';
import {
  Code as CodeIcon,
  Save as SaveIcon,
  FormatIndentIncrease as FormatIcon,
  Close as CloseIcon,
  ContentCopy as CopyIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
  padding: theme.spacing(4),
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)' 
    : 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)'
}));

const EditorCard = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '900px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  boxShadow: theme.shadows[4],
  padding: theme.spacing(4),
  border: `1px solid ${theme.palette.divider}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[8]
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: '8px 20px',
  textTransform: 'none',
  fontWeight: 600,
  letterSpacing: '0.5px',
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1)
  }
}));

const JSONTextArea = ({ initialJson, onSave, isSaving }) => {
  const [jsonInput, setJsonInput] = useState(initialJson || "");
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setJsonInput(initialJson || "");
  }, [initialJson]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setJsonInput(inputValue);
    validateJSON(inputValue);
  };

  const validateJSON = (input) => {
    try {
      if (input.trim()) {
        JSON.parse(input);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const formatJSON = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const formattedJson = JSON.stringify(parsedJson, null, 2);
      setJsonInput(formattedJson);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSaveClick = () => {
    if (!error) {
      setOpenDialog(true);
    }
  };

  const handleDialogClose = (shouldSubmit) => {
    setOpenDialog(false);
    if (shouldSubmit) {
      onSave(jsonInput);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const togglePreviewMode = () => {
    if (!error && jsonInput.trim()) {
      setPreviewMode(!previewMode);
    }
  };

  return (
    <StyledContainer>
      <EditorCard>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center">
            <CodeIcon sx={{ mr: 1.5, color: theme.palette.primary.main }} />
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                color: theme.palette.text.primary
              }}
            >
              JSON Process Definition
            </Typography>
          </Box>
          
          <Box display="flex" gap={1}>
            <Tooltip title={previewMode ? "Edit Mode" : "Preview Mode"}>
              <IconButton
                onClick={togglePreviewMode}
                color={previewMode ? "primary" : "default"}
                disabled={!!error || !jsonInput.trim()}
              >
                <CodeIcon />
              </IconButton>
            </Tooltip>
            
            {!previewMode && (
              <Tooltip title="Copy to Clipboard">
                <IconButton
                  onClick={copyToClipboard}
                  disabled={!!error || !jsonInput.trim()}
                >
                  {copied ? <CheckIcon color="success" /> : <CopyIcon />}
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>

        <Collapse in={!previewMode}>
          <TextField
            value={jsonInput}
            onChange={handleInputChange}
            placeholder="Enter JSON here..."
            multiline
            minRows={10}
            maxRows={15}
            fullWidth
            variant="outlined"
            error={!!error}
            helperText={error || " "}
            sx={{
              fontFamily: "'Roboto Mono', monospace",
              marginBottom: 2,
              '& .MuiInputBase-input': {
                color: theme.palette.text.primary,
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: theme.palette.divider,
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                  borderWidth: '1px',
                },
              },
              '& .MuiFormHelperText-root': {
                color: error ? theme.palette.error.main : theme.palette.text.secondary,
              }
            }}
          />
        </Collapse>

        <Collapse in={previewMode}>
          <Box sx={{ 
            borderRadius: '8px',
            overflow: 'hidden',
            border: `1px solid ${theme.palette.divider}`,
            mb: 2
          }}>
            <SyntaxHighlighter 
              language="json" 
              style={atomDark}
              customStyle={{ 
                margin: 0,
                fontSize: '0.85rem',
                backgroundColor: theme.palette.mode === 'dark' ? '#1E1E1E' : '#f5f5f5'
              }}
              showLineNumbers
            >
              {jsonInput}
            </SyntaxHighlighter>
          </Box>
        </Collapse>

        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 2, borderRadius: '8px' }}
            action={
              <IconButton
                size="small"
                onClick={() => setError(null)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Invalid JSON: {error}
          </Alert>
        )}

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <ActionButton
            variant="outlined"
            onClick={formatJSON}
            disabled={previewMode}
            startIcon={<FormatIcon />}
          >
            Format JSON
          </ActionButton>
          
          <Box display="flex" gap={2}>
            <ActionButton
              variant="contained"
              onClick={handleSaveClick}
              disabled={!!error || isSaving || previewMode}
              startIcon={<SaveIcon />}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </ActionButton>
          </Box>
        </Box>
      </EditorCard>

      <Dialog 
        open={openDialog} 
        onClose={() => handleDialogClose(false)}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            border: `1px solid ${theme.palette.divider}`,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <SaveIcon />
          Confirm Submission
        </DialogTitle>
        <DialogContent sx={{ padding: 3 }}>
          <Typography variant="body1" color="text.primary">
            Are you sure you want to save this JSON configuration?
          </Typography>
          <Alert severity="info" sx={{ mt: 2, borderRadius: '8px' }}>
            This action will update the process definition.
          </Alert>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <ActionButton
            variant="outlined"
            onClick={() => handleDialogClose(false)} 
            color="inherit"
          >
            Cancel
          </ActionButton>
          <ActionButton
            variant="contained"
            onClick={() => handleDialogClose(true)} 
            startIcon={<SaveIcon />}
            autoFocus
          >
            Confirm Save
          </ActionButton>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

JSONTextArea.propTypes = {
  initialJson: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
};

export default JSONTextArea;