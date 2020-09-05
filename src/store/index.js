import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../slices/notesSlice';

export default configureStore({
  reducer: {
    notes: notesReducer,
  },
});
