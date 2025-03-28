import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

// First create the async thunks
export const getForm = createAsyncThunk(
  'form/getForm',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/forms/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const saveForm = createAsyncThunk(
  'form/saveForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/forms', formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateForm = createAsyncThunk(
  'form/updateForm',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/forms/${id}`, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const formSlice = createSlice({
  name: 'form',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {
    resetFormState: (state) => {
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getForm.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveForm.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(saveForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateForm.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetFormState } = formSlice.actions;
export default formSlice.reducer;