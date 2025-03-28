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
  LinearProgress,
  Alert,
  Tooltip,
  useTheme,
  styled,
  Chip
} from '@mui/material';
import {
  TaskAlt as ApprovedIcon,
  Cancel as RejectedIcon,
  Schedule as PendingIcon,
  Person as PersonIcon,
  Event as CalendarIcon,
  Flag as FlagIcon,
  Visibility as ViewIcon,
  Description as RequestIcon
} from '@mui/icons-material';
import RequestDetailsDialog from '../RequestDialogFolder/RequestDetailsDialog';

// Enhanced status configuration with vibrant colors
const statusConfig = {
  PENDING: {
    icon: <PendingIcon />,
    color: 'warning',
    bgColor: '#FFF3E0',  // Soft orange background
    textColor: '#EF6C00', // Dark orange text
    borderColor: '#EF6C0020' // Semi-transparent orange border
  },
  APPROVED: {
    icon: <ApprovedIcon />,
    color: 'success',
    bgColor: '#E8F5E9',  // Soft green background
    textColor: '#2E7D32', // Dark green text
    borderColor: '#2E7D3220' // Semi-transparent green border
  },
  REJECTED: {
    icon: <RejectedIcon />,
    color: 'error',
    bgColor: '#FFEBEE',  // Soft red background
    textColor: '#D32F2F', // Dark red text
    borderColor: '#D32F2F20' // Semi-transparent red border
  }
};

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  flex: 1,
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${theme.palette.divider}`,
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.grey[400],
    borderRadius: theme.shape.borderRadius
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': { 
    border: 0 
  }
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor: statusConfig[status]?.bgColor,
  color: statusConfig[status]?.textColor,
  fontWeight: 600,
  borderRadius: '8px',
  padding: theme.spacing(0.5, 1.5),
  border: `2px solid ${statusConfig[status]?.borderColor}`,
  '& .MuiChip-icon': {
    color: statusConfig[status]?.textColor,
    marginLeft: '0!important'
  }
}));

const RequestTable = ({ requests, tabValue, loading, error }) => {
  const theme = useTheme();
  const [selectedRequest, setSelectedRequest] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const currentStatus = ['PENDING', 'APPROVED', 'REJECTED'][tabValue] || 'UNKNOWN';

  const handleShowDetails = (request) => {
    setSelectedRequest(request);
    setDialogOpen(true);
  };

  const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : '--';

  if (loading) return (
    <Box sx={{ width: '100%', py: 4 }}>
      <LinearProgress sx={{ 
        height: 6,
        backgroundColor: theme.palette.grey[200],
        '& .MuiLinearProgress-bar': {
          backgroundColor: theme.palette.grey[600]
        }
      }} />
    </Box>
  );
  
  if (error) return (
    <Alert severity="error" sx={{ 
      mx: 2,
      my: 3,
      borderRadius: theme.shape.borderRadius
    }}>
      {error}
    </Alert>
  );

  return (
    <Box sx={{ 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      overflow: 'hidden',
      gap: theme.spacing(2)
    }}>
      <Typography variant="h5" sx={{ 
        color: 'black',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        pl: 1,
        letterSpacing: '0.5px'
      }}>
        <RequestIcon fontSize="medium" sx={{ color: 'inherit' }} />
        {currentStatus} REQUESTS
      </Typography>

      <StyledTableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ 
              backgroundColor: 'white',
              '& th': {
                color: 'black',
                fontWeight: 600,
                borderBottom: `2px solid ${theme.palette.divider}`,
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }
            }}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FlagIcon fontSize="small" />
                  Request #
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon fontSize="small" />
                  Requester
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarIcon fontSize="small" />
                  Submitted
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarIcon fontSize="small" />
                  Decision Date
                </Box>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <StyledTableRow key={`${request.id}-${tabValue}`} hover>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    #{request.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ 
                      width: 32, 
                      height: 32, 
                      bgcolor: theme.palette.grey[200]
                    }}>
                      <PersonIcon fontSize="small" sx={{ color: theme.palette.grey[600] }} />
                    </Avatar>
                    <Typography variant="body2">
                      {request.formData?.name || 'N/A'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatDate(request.createdAt)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatDate(request.decisionDate)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <StatusChip
                    icon={statusConfig[currentStatus]?.icon}
                    label={currentStatus}
                    status={currentStatus}
                    size="small"
                    sx={{
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-1px)'
                      }
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="View request details">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ViewIcon />}
                      onClick={() => handleShowDetails(request)}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        borderRadius: 20,
                        px: 2,
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                          backgroundColor: theme.palette.action.hover
                        }
                      }}
                    >
                      Details
                    </Button>
                  </Tooltip>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <RequestDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        request={selectedRequest}
        tabValue={tabValue}
      />
    </Box>
  );
};

export default RequestTable;