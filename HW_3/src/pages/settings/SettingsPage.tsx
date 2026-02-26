import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { selectLanguage, selectTheme, selectPageSize, setLanguage, setTheme, setPageSize } from '../../features/settings';
import { Card } from '../../shared/ui/Card';
import './SettingsPage.css';

const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);
  const theme = useAppSelector(selectTheme);
  const pageSize = useAppSelector(selectPageSize);

  const handleLanguageChange = (lang: 'en' | 'ru') => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    dispatch(setTheme(newTheme));
  };

  const handlePageSizeChange = (size: number) => {
    dispatch(setPageSize(size));
  };

  return (
    <div className="settings-page">
      <h1 className="page-title">{t('settings.title')}</h1>
      
      <div className="settings-grid">
        <Card className="settings-card">
          <h2 className="settings-section-title">{t('settings.language')}</h2>
          <div className="setting-option">
            <label className="radio-label">
              <input
                type="radio"
                name="language"
                value="en"
                checked={language === 'en'}
                onChange={() => handleLanguageChange('en')}
              />
              English
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="language"
                value="ru"
                checked={language === 'ru'}
                onChange={() => handleLanguageChange('ru')}
              />
              Русский
            </label>
          </div>
        </Card>

        <Card className="settings-card">
          <h2 className="settings-section-title">{t('settings.theme')}</h2>
          <div className="setting-option">
            <label className="radio-label">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === 'light'}
                onChange={() => handleThemeChange('light')}
              />
              ☀️ {t('settings.light')}
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === 'dark'}
                onChange={() => handleThemeChange('dark')}
              />
              🌙 {t('settings.dark')}
            </label>
          </div>
        </Card>

        <Card className="settings-card">
          <h2 className="settings-section-title">{t('settings.pageSize')}</h2>
          <div className="setting-option">
            {[5, 10, 20, 50].map((size) => (
              <label key={size} className="radio-label">
                <input
                  type="radio"
                  name="pageSize"
                  value={size}
                  checked={pageSize === size}
                  onChange={() => handlePageSizeChange(size)}
                />
                {size}
              </label>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
