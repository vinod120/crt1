import { useAuth } from '@/hooks/useAuth';
import type { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: ReactElement;
  redirectTo?: string;
}

const PublicRoute: FC<PublicRouteProps> = ({ children, redirectTo = '/' }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to={redirectTo} replace /> : children;
};

export default PublicRoute;
