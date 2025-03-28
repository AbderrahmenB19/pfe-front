import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API call function
const mockFetch = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          processInstanceId: "1",
          processName: "Vacation Request",
          startTime: "2023-06-15T09:30:00",
          currentStatus: "PENDING",
          priority: "HIGH",
          processHistoryDTOList: [
            {
              action: "Submission",
              timestamp: "2023-06-15T09:30:00",
              actionStatus: "APPROVED",
              comments: ""
            },
            {
              action: "Manager Review",
              timestamp: "2023-06-16T10:15:00",
              actionStatus: "PENDING",
              comments: "Waiting for approval"
            },
            
          ]
        },
        {
          processInstanceId: "2",
          processName: "Equipment Purchase",
          startTime: "2023-06-10T14:20:00",
          currentStatus: "APPROVED",
          priority: "MEDIUM",
          processHistoryDTOList: [
            {
              action: "Submission",
              timestamp: "2023-06-10T14:20:00",
              actionStatus: "PENDING",
              comments: ""
            },
            {
              action: "Manager Approval",
              timestamp: "2023-06-11T11:05:00",
              actionStatus: "APPROVED",
              comments: "Budget approved"
            },
            {
              action: "Procurement",
              timestamp: "2023-06-12T16:30:00",
              actionStatus: "APPROVED",
              comments: "Order placed"
            }
          ]
        },
        {
          "processInstanceId": "3",
          "processName": "Business Trip Request",
          "startTime": "2023-06-18T08:45:00",
          "currentStatus": "REJECTED",
          "priority": "HIGH",
          "processHistoryDTOList": [
            {
              "action": "Submission",
              "timestamp": "2023-06-18T08:45:00",
              "actionStatus": "APPROVED",
              "comments": ""
            },
            {
              "action": "Manager Review",
              "timestamp": "2023-06-19T10:00:00",
              "actionStatus": "REJECTED",
              "comments": "Travel budget exceeded, request denied."
            }
          ]
        }
      ]);
    }, 1000); 
  });
};

// Async thunk to fetch processes
export const fetchProcesses = createAsyncThunk(
  'processUser/fetchProcesses',
  async () => {
    return await mockFetch();
  }
);

const initialState = {
  processes: [],
  loading: false,
  error: null,
};

const processUserSlice = createSlice({
  name: 'processUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProcesses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProcesses.fulfilled, (state, action) => {
        state.loading = false;
        state.processes = action.payload;
      })
      .addCase(fetchProcesses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default processUserSlice.reducer;
