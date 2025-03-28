import { createSlice } from '@reduxjs/toolkit';

// Mock API functions for testing
const mockApi = {
  getFormSchema: () => ({
    data: {
      display: "form",
      components: [
        {
          label: "Columns",
          columns: [
            {
              components: [
                {
                  label: "First Name",
                  key: "firstName",
                  type: "textfield",
                  input: true,
                  tableView: true,
                  placeholder: "Enter your first name",
                  validate: { required: true }
                }
              ],
              width: 6
            },
            {
              components: [
                {
                  label: "Last Name",
                  key: "lastName",
                  type: "textfield",
                  input: true,
                  tableView: true,
                  placeholder: "Enter your last name",
                  validate: { required: true }
                }
              ],
              width: 6
            }
          ],
          type: "columns",
          key: "columns"
        },
        {
          label: "Email",
          key: "email",
          type: "email",
          input: true,
          tableView: true,
          placeholder: "Enter your email",
          validate: {
            required: true,
            pattern: "^\\S+@\\S+\\.\\S+$"
          }
        },
        {
          label: "Birth Date",
          key: "birthDate",
          type: "day",
          input: true,
          fields: {
            day: { placeholder: "DD", required: true },
            month: { placeholder: "MM", required: true },
            year: { placeholder: "YYYY", required: true }
          }
        },
        {
          label: "Submit",
          key: "submit",
          type: "button",
          action: "submit",
          theme: "primary"
        }
      ]
    }
  }),
  submitForm: (formData) => {
    console.log("Form submitted:", formData);
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: { success: true } }), 1000);
    });
  }
};

const initialState = {
  formSchema: mockApi.getFormSchema().data, // Initialize with mock data
  loading: false,
  error: null,
  submittedData: null
};

const formUserSlice = createSlice({
  name: 'formUser',
  initialState,
  reducers: {
    setFormSchema: (state, action) => {
      state.formSchema = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSubmittedData: (state, action) => {
      state.submittedData = action.payload;
    },
    resetForm: (state) => {
      state.submittedData = null;
      state.error = null;
    }
  },
});

export const { 
  setFormSchema, 
  setLoading, 
  setError,
  setSubmittedData,
  resetForm
} = formUserSlice.actions;

// Thunk actions using mock API
export const fetchFormSchema = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    const response = await mockApi.getFormSchema();
    dispatch(setFormSchema(response.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const submitFormData = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      throw new Error('Please fill all required fields');
    }
    
    await mockApi.submitForm(formData);
    dispatch(setSubmittedData(formData));
    dispatch(setLoading(false));
    return { success: true };
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    return { success: false, error: error.message };
  }
};

export default formUserSlice.reducer;

// Selectors
export const selectFormSchema = (state) => state.formUser.formSchema;
export const selectFormLoading = (state) => state.formUser.loading;
export const selectFormError = (state) => state.formUser.error;
export const selectSubmittedData = (state) => state.formUser.submittedData;