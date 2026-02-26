import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { User, AuthState } from '../../../shared/types';

interface LoginCredentials {
  username: string;
  password: string;
}

const loadAuthState = () => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
        isAuthenticated: true,
      };
    }
  } catch (e) {
    console.error('Failed to load auth state', e);
  }
  return { token: null, user: null, isAuthenticated: false };
};

const loadedState = loadAuthState();

const initialState: AuthState = {
  user: loadedState.user,
  token: loadedState.token,
  isAuthenticated: loadedState.isAuthenticated,
  isLoading: false,
  error: null,
};

interface LoginResponse extends User {
  accessToken: string;
}

export const login = createAsyncThunk<LoginResponse, LoginCredentials>(
  'auth/login',
  async ({ username, password }) => {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, expiresInMins: 60 }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Invalid credentials');
    }

    const data = await response.json();
    return data;
  }
);

export const getCurrentUser = createAsyncThunk<User, void>(
  'auth/me',
  async (_, { getState }) => {
    const state = getState() as { auth: AuthState };
    const response = await fetch('https://dummyjson.com/auth/me', {
      headers: {
        Authorization: `Bearer ${state.auth.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get user');
    }

    return response.json();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.accessToken;
        state.user = action.payload;
        localStorage.setItem('token', action.payload.accessToken);
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        // Don't reset auth state on getCurrentUser error - user might still be valid
        // Only log the error for debugging
        console.warn('getCurrentUser failed, but keeping existing auth state');
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
