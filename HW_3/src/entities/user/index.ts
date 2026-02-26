export type { User } from '../../shared/types';
export { default as userReducer, login, getCurrentUser, logout, clearError } from './model/userSlice';
export * from './model/selectors';
