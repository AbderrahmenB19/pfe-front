import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchPendingRequests,
  fetchApprovedRequests,
  fetchRejectedRequests,
} from "../../store/slices/requestsSlice";
import RequestTable from "../../components/RequestTable/RequestTable";
import { Box, Paper, CircularProgress, Alert } from "@mui/material";

const ValidatorDashboard = () => {
  const dispatch = useDispatch();
  const { pending, approved, rejected, loading, error } = useSelector(
    (state) => state.requests
  );

  // Read the status from URL
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "pending";

  // Map status to tabValue
  const tabValue = status === "pending" ? 0 : status === "approved" ? 1 : 2;

  useEffect(() => {
    switch (status) {
      case "pending":
        dispatch(fetchPendingRequests());
        break;
      case "approved":
        dispatch(fetchApprovedRequests());
        break;
      case "rejected":
        dispatch(fetchRejectedRequests());
        break;
      default:
        dispatch(fetchPendingRequests());
    }
  }, [status, dispatch]);

  const getCurrentRequests = () => {
    switch (status) {
      case "pending":
        return pending;
      case "approved":
        return approved;
      case "rejected":
        return rejected;
      default:
        return [];
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "auto" }}>
      
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <RequestTable requests={getCurrentRequests()} tabValue={tabValue} />
        )}
      </Box>
    </Box>
  );
};

export default ValidatorDashboard;
