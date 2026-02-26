import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SettingsState } from '../../../shared/types';

const loadSettings = () => {
  try {
    const saved = localStorage.getItem('settings');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load settings', e);
  }
  return {
    language: 'en' as const,
    theme: 'light' as const,
    pageSize: 10,
  };
};

const initialState: SettingsState = loadSettings();

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'en' | 'ru'>) => {
      state.language = action.payload;
      localStorage.setItem('settings', JSON.stringify(state));
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      localStorage.setItem('settings', JSON.stringify(state));
      document.documentElement.setAttribute('data-theme', action.payload);
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      localStorage.setItem('settings', JSON.stringify(state));
    },
  },
});

export const { setLanguage, setTheme, setPageSize } = settingsSlice.actions;
export default settingsSlice.reducer;
