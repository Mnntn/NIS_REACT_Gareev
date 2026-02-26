import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../shared/ui/Button';
import './NotFoundPage.css';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">{t('errors.notFound')}</h2>
        <p className="error-message">
          {t('errors.notFoundMessage')}
        </p>
        <Button onClick={() => navigate('/')}>
          {t('errors.goToDashboard')}
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
