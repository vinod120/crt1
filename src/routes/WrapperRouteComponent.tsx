import type { FC, ReactElement } from 'react';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const ScrollToTop: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper: FC<PageWrapperProps> = ({ children }) => (
  <>
    <ScrollToTop />
    {children}
  </>
);

interface WrapperRouteProps {
  auth?: boolean;
  element: ReactElement;
}

export const WrapperRouteComponent: FC<WrapperRouteProps> = ({ auth = true, element }) => {
  if (!element) {
    return null;
  }

  const wrappedElement = <PageWrapper>{element}</PageWrapper>;

  return auth ? <PrivateRoute>{wrappedElement}</PrivateRoute> : wrappedElement;
};