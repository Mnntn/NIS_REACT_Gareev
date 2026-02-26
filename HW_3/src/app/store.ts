import { configureStore } from '@reduxjs/toolkit';
import { api } from '../shared/api/api';
import { userReducer } from '../entities/user';
import { settingsReducer } from '../features/settings';

export const store = configureStore({
  reducer: {
    auth: userReducer,
    settings: settingsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
