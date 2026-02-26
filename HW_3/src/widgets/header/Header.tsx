import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { selectUserName, logout } from '../../entities/user';
import { selectTheme, setTheme } from '../../features/settings';
import './Header.css';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userName = useAppSelector(selectUserName);
  const theme = useAppSelector(selectTheme);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-logo">E-Commerce Admin</h1>
      </div>
      <div className="header-right">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <span className="user-name">{userName}</span>
        <nav className="header-nav">
          <Link to="/profile">{t('nav.profile')}</Link>
          <Link to="/settings">{t('nav.settings')}</Link>
          <button onClick={handleLogout} className="logout-btn">
            {t('nav.logout')}
          </button>
        </nav>
      </div>
    </header>
  );
};
