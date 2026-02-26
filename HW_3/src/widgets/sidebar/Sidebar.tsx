import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Sidebar.css';

export const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/" className="sidebar-link">
          <span className="link-icon">📊</span>
          {t('nav.dashboard')}
        </NavLink>
        <NavLink to="/products" className="sidebar-link">
          <span className="link-icon">📦</span>
          {t('nav.products')}
        </NavLink>
        <NavLink to="/profile" className="sidebar-link">
          <span className="link-icon">👤</span>
          {t('nav.profile')}
        </NavLink>
        <NavLink to="/settings" className="sidebar-link">
          <span className="link-icon">⚙️</span>
          {t('nav.settings')}
        </NavLink>
      </nav>
    </aside>
  );
};
