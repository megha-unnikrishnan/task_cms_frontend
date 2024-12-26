// src/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:8000/api/token/', userData);
        console.log("Login Response:", response.data);
        return response.data; // Return the token and user data
      } catch (error) {
        // Log the error to the console
        console.error("Login Error:", error.response ? error.response.data : error.message);
        return rejectWithValue(error.response ? error.response.data : error.message); // Handle errors
      }
    }
  );


  export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:8000/api/register/', userData);
        console.log("Registration Response:", response.data);
        return response.data; // Return the registration data
      } catch (error) {
        console.error("Registration Error:", error.response ? error.response.data : error.message);
        return rejectWithValue(error.response ? error.response.data : error.message); // Handle errors
      }
    }
  );

const initialState = {
  token: null,
  isAdmin: false,
  email: '',
  fullName: '',
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAdmin = false;
      state.email = '';
      state.fullName = '';
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.access;
        state.isAdmin = action.payload.is_admin;
        state.email = action.payload.email;
        state.fullName = action.payload.full_name; // Set fullName
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Handle successful registration (you can store user info or redirect here)
        state.email = action.payload.email;
        state.fullName = action.payload.full_name; // Store full name if necessary
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
