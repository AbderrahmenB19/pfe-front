import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API call function (Replace with actual API in production)
const mockFetch = (status) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = {
        pending: [
          {
            "id": "REQ-1001",
            "status": "pending",
            "createdAt": "2023-05-15T09:30:00Z",
            "submittedBy": "user123",
            "formData": {
              "applicationType": "leave",
              "name": "John Doe",
              "employeeId": "EMP-2045",
              "department": "Engineering",
              "leaveType": "vacation",
              "startDate": "2023-06-01",
              "endDate": "2023-06-07",
              "reason": "Family vacation",
              "contactInfo": {
                "phone": "+1234567890",
                "email": "john.doe@company.com"
              }
            }
          },
          {
            "id": "REQ-1002",
            "status": "pending",
            "createdAt": "2020-05-16T11:45:00Z",
            "submittedBy": "user456",
            "formData": {
              "applicationType": "purchase",
              "name": "Jane Smith",
              "employeeId": "EMP-3092",
              "department": "Marketing",
              "item": "New laptop",
              "cost": 1299.99,
              "justification": "Current laptop is 5 years old and frequently crashes",
              "vendor": "Dell Technologies",
              "urgency": "high"
            }
          }
        ],
        approved: [
          {
            "id": "REQ-0901",
            "status": "approved",
            "createdAt": "2023-05-10T14:20:00Z",
            "approvedAt": "2023-05-11T10:15:00Z",
            "approvedBy": "validator001",
            "submittedBy": "user789",
            "formData": {
              "applicationType": "conference",
              "name": "Alex Johnson",
              "employeeId": "EMP-4021",
              "department": "Sales",
              "conferenceName": "Tech Summit 2023",
              "location": "San Francisco",
              "dates": "2023-07-15 to 2023-07-18",
              "estimatedCost": 2450.00,
              "expectedOutcome": "Networking and learning new sales techniques"
            }
          }
        ],
        rejected: [
          {
            "id": "REQ-0802",
            "status": "rejected",
            "createdAt": "2023-05-08T16:30:00Z",
            "rejectedAt": "2023-05-09T09:45:00Z",
            "rejectedBy": "validator002",
            "rejectionComment": "Budget constraints - please find a lower-cost alternative",
            "submittedBy": "user654",
            "formData": {
              "applicationType": "equipment",
              "name": "Michael Brown",
              "employeeId": "EMP-1056",
              "department": "Design",
              "equipmentType": "Wacom Cintiq 32",
              "cost": 3299.99,
              "justification": "Need for high-end design work",
              "alternativeOptionsConsidered": ["iPad Pro", "Huion Kamvas"]
            }
          }
        ]
      };
      resolve(mockData[status]);
    }, 1000); // Simulated network delay
  });
};

// Async thunks
export const fetchPendingRequests = createAsyncThunk(
  'requests/fetchPending',
  async () => {
    return await mockFetch("pending"); // Replace with real API call if needed
  }
);

export const fetchApprovedRequests = createAsyncThunk(
  'requests/fetchApproved',
  async () => {
    return await mockFetch("approved");
  }
);

export const fetchRejectedRequests = createAsyncThunk(
  'requests/fetchRejected',
  async () => {
    return await mockFetch("rejected");
  }
);

const initialState = {
  pending: [],
  approved: [],
  rejected: [],
  loading: false,
  error: null
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending requests
      .addCase(fetchPendingRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.pending = action.payload;
      })
      .addCase(fetchPendingRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Approved requests
      .addCase(fetchApprovedRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApprovedRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.approved = action.payload;
      })
      .addCase(fetchApprovedRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Rejected requests
      .addCase(fetchRejectedRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRejectedRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.rejected = action.payload;
      })
      .addCase(fetchRejectedRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default requestsSlice.reducer;
