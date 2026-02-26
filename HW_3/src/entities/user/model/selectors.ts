import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/store';

export const selectAuthState = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;

export const selectUserName = createSelector(
  [selectUser],
  (user) => user ? `${user.firstName} ${user.lastName}` : ''
);

export const selectUserEmail = createSelector(
  [selectUser],
  (user) => user?.email || ''
);
