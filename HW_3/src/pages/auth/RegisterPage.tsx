import React, { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Input } from '../../shared/ui/Input';
import { Button } from '../../shared/ui/Button';
import './AuthPage.css';

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Stub - DummyJSON doesn't support registration
    alert('Registration is not available in demo mode. Please use login page.');
    navigate('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">{t('auth.register')}</h1>
          <p className="auth-subtitle">{t('auth.demoModeTitle')}</p>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              id="username"
              name="username"
              label={t('auth.username')}
              type="text"
              placeholder={t('auth.loginPlaceholder')}
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Input
              id="email"
              name="email"
              label={t('auth.email')}
              type="email"
              placeholder={t('auth.emailPlaceholder')}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              id="firstName"
              name="firstName"
              label={t('auth.firstName')}
              type="text"
              placeholder={t('auth.firstNamePlaceholder')}
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Input
              id="lastName"
              name="lastName"
              label={t('auth.lastName')}
              type="text"
              placeholder={t('auth.lastNamePlaceholder')}
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <Input
              id="password"
              name="password"
              label={t('auth.password')}
              type="password"
              placeholder={t('auth.passwordPlaceholder')}
              value={formData.password}
              onChange={handleChange}
              required
            />
            
            <div className="auth-notice">
              <p>⚠️ {t('auth.demoNotice')}</p>
              <p>{t('auth.demoNoticeInfo')}</p>
              <p><strong>Username:</strong> emilys</p>
              <p><strong>Password:</strong> emilyspass</p>
            </div>
            
            <Button type="submit" variant="primary" size="large" className="auth-submit">
              {t('auth.registerButton')}
            </Button>
          </form>
          
          <p className="auth-register-hint">
            {t('auth.haveAccount')} <a href="/login">{t('auth.login')}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
