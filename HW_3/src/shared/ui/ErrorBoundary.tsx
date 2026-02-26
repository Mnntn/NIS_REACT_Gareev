import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryClass extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Something went wrong</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  
  const fallback = (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>{t('common.error')}</h1>
      <button onClick={() => window.location.reload()}>{t('common.retry')}</button>
    </div>
  );

  return <ErrorBoundaryClass {...props} fallback={fallback} />;
};

export default ErrorBoundaryClass;
