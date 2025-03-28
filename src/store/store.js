import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/formSlice';
import processReducer from './slices/processSlice';
import requestsReducer from './slices/requestsSlice';
import formUserReducer from './slices/formUserSlice';
import processUserReducer from './slices/processUserSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    process: processReducer,
    requests: requestsReducer,
    formUser: formUserReducer,
    processUser: processUserReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;