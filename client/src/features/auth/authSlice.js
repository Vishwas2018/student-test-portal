import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducers will be implemented
  },
  extraReducers: (builder) => {
    // Extra reducers will be implemented
  },
});

export default authSlice.reducer;

