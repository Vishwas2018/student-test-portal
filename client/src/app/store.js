import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import examsReducer from '../features/exams/examsSlice';
import progressReducer from '../features/progress/progressSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exams: examsReducer,
    progress: progressReducer,
    users: usersReducer,
  },
});

