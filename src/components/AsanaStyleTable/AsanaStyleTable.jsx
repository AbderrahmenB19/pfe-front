import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
  IconButton,
  Tooltip,
  useTheme,
  styled,
  Chip
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  AccessTime,
  Person,
  CalendarToday,
  Flag,
  Close,
  Visibility,
  Delete,
  MoreVert
} from '@mui/icons-material';
import CustomizedTimeline from '../CustomizedTimeLine/customizedTimeLine';

const statusIcons = {
  APPROVED: <CheckCircle color="success" />,
  REJECTED: <Cancel color="error" />,
  PENDING: <AccessTime color="warning" />,
};

const statusColors = {
  APPROVED: 'success',
  REJECTED: 'error',
  PENDING: 'warning'
};

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '12px',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[1],
  overflow: 'hidden',
  '&:hover': {
    boxShadow: theme.shadows[4]
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    cursor: 'pointer'
  },
  '&:last-child td': { 
    borderBottom: 0 
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: '6px 16px',
  textTransform: 'none',
  fontWeight: 600,
  letterSpacing: '0.5px',
  fontSize: '0.8125rem',
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(0.5)
  }
}));

const AsanaStyleTable = ({ processes, onCancelRequest, loading }) => {
  const [selectedProcess, setSelectedProcess] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const theme = useTheme();

  const handleOpenDialog = (process) => {
    setSelectedProcess(process);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loading) {
    return (
      <LinearProgress sx={{ 
        height: 4,
        borderRadius: 2,
        backgroundColor: theme.palette.grey[200],
        '& .MuiLinearProgress-bar': {
          backgroundColor: theme.palette.primary.main,
          borderRadius: 2
        }
      }} />
    );
  }

  return (
    <Box sx={{ 
      width: '100%', 
      mt: 3,
      position: 'relative'
    }}>
      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-label="process table">
          <TableHead>
            <TableRow sx={{ 
              backgroundColor: theme.palette.mode === 'dark' 
                ? theme.palette.grey[800] 
                : theme.palette.grey[100]
            }}>
              <StyledTableCell sx={{ width: '40%', fontWeight: 600 }}>Request Name</StyledTableCell>
              <StyledTableCell sx={{ fontWeight: 600 }}>Assignee</StyledTableCell>
              <StyledTableCell sx={{ fontWeight: 600 }}>Due Date</StyledTableCell>
              <StyledTableCell sx={{ fontWeight: 600 }}>Status</StyledTableCell>
              <StyledTableCell align="right" sx={{ fontWeight: 600 }}>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {processes.map((process) => (
              <StyledTableRow
                key={process.processInstanceId}
                hover
              >
                <StyledTableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Flag sx={{ 
                      color: theme.palette.text.secondary, 
                      mr: 2,
                      fontSize: '1.1rem'
                    }} />
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {process.processName}
                    </Typography>
                  </Box>
                </StyledTableCell>
                <StyledTableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ 
                      width: 28, 
                      height: 28, 
                      mr: 1.5, 
                      bgcolor: theme.palette.grey[200]
                    }}>
                      <Person sx={{ 
                        fontSize: 16, 
                        color: theme.palette.text.secondary 
                      }} />
                    </Avatar>
                    <Typography variant="body2">You</Typography>
                  </Box>
                </StyledTableCell>
                <StyledTableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ 
                      fontSize: '1.1rem', 
                      color: theme.palette.text.secondary, 
                      mr: 1.5 
                    }} />
                    <Typography variant="body2">
                      {new Date(process.startTime).toLocaleDateString()}
                    </Typography>
                  </Box>
                </StyledTableCell>
                <StyledTableCell>
                  <Chip
                    icon={statusIcons[process.currentStatus]}
                    label={process.currentStatus}
                    color={statusColors[process.currentStatus]}
                    variant="outlined"
                    size="small"
                    sx={{
                      fontWeight: 500,
                      borderRadius: '6px'
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end',
                    gap: 1
                  }}>
                    {process.currentStatus === 'PENDING' && (
                      <Tooltip title="Cancel Request">
                        <IconButton
                          size="small"
                          onClick={() => onCancelRequest(process.processInstanceId)}
                          color="error"
                          sx={{
                            backgroundColor: theme.palette.error.light,
                            '&:hover': {
                              backgroundColor: theme.palette.error.main,
                              color: theme.palette.error.contrastText
                            }
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(process)}
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                          '&:hover': {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText
                          }
                        }}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* Timeline Dialog */}
      <Dialog
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: theme.palette.mode === 'dark' 
            ? theme.palette.grey[800] 
            : theme.palette.grey[100],
          borderBottom: `1px solid ${theme.palette.divider}`,
          py: 2,
          pr: 2
        }}>
          <Box display="flex" alignItems="center">
            <Flag sx={{ 
              color: theme.palette.primary.main, 
              mr: 2,
              fontSize: '1.5rem'
            }} />
            <Typography variant="h6" fontWeight={600}>
              {selectedProcess?.processName || 'Process Timeline'}
            </Typography>
          </Box>
          <IconButton onClick={handleCloseDialog}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ py: 3, px: 3 }}>
          {selectedProcess && (
            <CustomizedTimeline
              timelineData={selectedProcess.processHistoryDTOList} 
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AsanaStyleTable;