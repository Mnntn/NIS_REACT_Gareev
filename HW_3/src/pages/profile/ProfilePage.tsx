import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../shared/lib/hooks';
import { selectUser } from '../../entities/user';
import { Card } from '../../shared/ui/Card';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h1 className="page-title">{t('profile.title')}</h1>
      
      <Card className="profile-card">
        <div className="profile-header">
          <img src={user.image} alt={user.username} className="profile-avatar" />
          <div className="profile-info">
            <h2 className="profile-name">{user.firstName} {user.lastName}</h2>
            <p className="profile-username">@{user.username}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-row">
            <span className="detail-label">{t('profile.email')}</span>
            <span className="detail-value">{user.email}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">{t('profile.username')}</span>
            <span className="detail-value">{user.username}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">{t('profile.name')}</span>
            <span className="detail-value">{user.firstName} {user.lastName}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">{t('profile.gender')}</span>
            <span className="detail-value">{user.gender}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
