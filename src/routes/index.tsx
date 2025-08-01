import ErrorPage from "@/errors/Error";
import Error400Page from "@/errors/Error400";
import AppLayout from "@/layout/appLayout";
import Dashboard from "@/pages/dashboard";
import { createBrowserRouter } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import { PageWrapper, WrapperRouteComponent } from './WrapperRouteComponent';
const LoginPage = () => {
  return (
    <div></div>
  )
}
const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicRoute redirectTo="/">
        <PageWrapper>
          <LoginPage />
        </PageWrapper>
      </PublicRoute>
    ),
    errorElement: (
      <PageWrapper>
        <ErrorPage />
      </PageWrapper>
    ),
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<AppLayout />} auth />,
    errorElement: <WrapperRouteComponent element={<ErrorPage />} auth />,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: '/asset/:assetId',
        element: <Dashboard />,
      },
      {
        path: 'studies/vrt/:assetId/:studyId',
        element: <Dashboard />,
      },
      {
        path: '/reports/:assetId/:studyId',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/errors',
    element: (
      <PageWrapper>
        <ErrorPage />
      </PageWrapper>
    ),
    errorElement: <WrapperRouteComponent element={<ErrorPage />} auth />,
    children: [
      {
        path: '400',
        element: <Error400Page />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
