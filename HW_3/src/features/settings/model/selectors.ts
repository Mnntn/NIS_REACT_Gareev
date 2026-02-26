import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/store';

export const selectSettings = (state: RootState) => state.settings;
export const selectLanguage = (state: RootState) => state.settings.language;
export const selectTheme = (state: RootState) => state.settings.theme;
export const selectPageSize = (state: RootState) => state.settings.pageSize;

export const selectThemeClass = createSelector(
  [selectTheme],
  (theme) => theme === 'dark' ? 'dark-theme' : 'light-theme'
);
