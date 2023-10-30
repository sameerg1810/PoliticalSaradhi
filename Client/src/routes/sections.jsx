import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

// eslint-disable-next-line import/no-unresolved
import DashboardLayout from 'src/layouts/dashboard';

// eslint-disable-next-line import/no-unresolved
import AdminSignUp from 'src/sections/signup/Admin_sign_Up';

// eslint-disable-next-line import/no-unresolved
export const IndexPage = lazy(() => import('src/pages/app'));

// eslint-disable-next-line import/no-unresolved
export const UserPage = lazy(() => import('src/pages/user'));

// eslint-disable-next-line import/no-unresolved
export const LoginPage = lazy(() => import('src/pages/login'));
// eslint-disable-next-line import/no-unresolved
export const SignPage = lazy(() => import('src/pages/signup'));

// eslint-disable-next-line import/no-unresolved
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// eslint-disable-next-line import/no-unresolved
export const Karyapage = lazy(() => import('src/pages/udashboard'));
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: '/ldashboard', element: <IndexPage /> },
        { path: 'user', element: <UserPage /> },
      ],
    },
    {
      path: 'signup',
      element: <SignPage />,
    },
    {
      path: 'udashboard',
      element: <Karyapage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path:'admin',
      element:<AdminSignUp/> 
    }
  ]);

  return routes;
}
