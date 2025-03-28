import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// 1. First define your async thunks
export const getProcessDefinition = createAsyncThunk(
  'process/getProcessDefinition',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/processes/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const saveProcessDefinition = createAsyncThunk(
  'process/saveProcessDefinition',
  async (processData, { rejectWithValue }) => {
    try {
      const response = await api.post('/processes', processData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateProcessDefinition = createAsyncThunk(
  'process/updateProcessDefinition',
  async ({ id, processData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/processes/${id}`, processData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 2. Then create your slice
const processSlice = createSlice({
  name: 'process',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {
    resetProcessState: (state) => {
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // getProcessDefinition cases
      .addCase(getProcessDefinition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProcessDefinition.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getProcessDefinition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // saveProcessDefinition cases
      .addCase(saveProcessDefinition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProcessDefinition.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(saveProcessDefinition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // updateProcessDefinition cases
      .addCase(updateProcessDefinition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProcessDefinition.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateProcessDefinition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetProcessState } = processSlice.actions;
export default processSlice.reducer;