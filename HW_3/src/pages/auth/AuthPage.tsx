import React, { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { login, selectIsAuthenticated, selectAuthError } from '../../entities/user';
import { Input } from '../../shared/ui/Input';
import { Button } from '../../shared/ui/Button';
import './AuthPage.css';

const AuthPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const error = useAppSelector(selectAuthError);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login(formData));
    if (login.fulfilled.match(result)) {
      navigate('/');
    }
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
          <h1 className="auth-title">{t('auth.loginButton')}</h1>
          <p className="auth-subtitle">DummyJSON Test Credentials</p>
          <div className="credentials-hint">
            <p><strong>Username:</strong> emilys</p>
            <p><strong>Password:</strong> emilyspass</p>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              id="username"
              name="username"
              label={t('auth.login')}
              type="text"
              placeholder={t('auth.loginPlaceholder')}
              value={formData.username}
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
            
            {error && (
              <div className="auth-error">
                {t('errors.invalidCredentials')}
              </div>
            )}
            
            <Button type="submit" variant="primary" size="large" className="auth-submit">
              {t('auth.loginButton')}
            </Button>
          </form>
          
          <p className="auth-register-hint">
            {t('auth.noAccount')} <a href="/register">{t('auth.register')}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
