import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { APP_KEYS } from '@/module/common/constants';

export const PublicPage = ({ children }: { children?: ReactNode }) => {
  const token = localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN);

  if (token) {
    return <Navigate to={APP_KEYS.ROUTER_KEYS.HOME} replace />;
  }

  if (children) {
    return children;
  }

  return <Outlet />;
};
