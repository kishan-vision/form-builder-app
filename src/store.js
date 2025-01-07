import { configureStore } from '@reduxjs/toolkit';
import formReducer from './redux/formSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});