import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../header';
import { Sidebar } from '../sidebar';
import './Layout.css';

export const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};
