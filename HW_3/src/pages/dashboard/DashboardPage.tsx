import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../shared/lib/hooks';
import { selectUserName } from '../../entities/user';
import { useGetCategoriesQuery } from '../../entities/product';
import { Card } from '../../shared/ui/Card';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const userName = useAppSelector(selectUserName);
  const { data: categories, isLoading } = useGetCategoriesQuery();

  return (
    <div className="dashboard-page">
      <h1 className="page-title">{t('dashboard.title')}</h1>
      <p className="welcome-text">{t('dashboard.welcome')}, {userName}!</p>

      <div className="dashboard-stats">
        <Card className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3 className="stat-value">100+</h3>
            <p className="stat-label">{t('dashboard.totalProducts')}</p>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">📂</div>
          <div className="stat-content">
            <h3 className="stat-value">{isLoading ? '...' : categories?.length || 0}</h3>
            <p className="stat-label">{t('dashboard.categories')}</p>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-content">
            <h3 className="stat-value">24</h3>
            <p className="stat-label">{t('dashboard.recentOrders')}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
