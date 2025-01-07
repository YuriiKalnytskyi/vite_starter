import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Loader } from '@/module/common/component/loading';
import { APP_KEYS } from '@/module/common/constants';
import { PublicPage } from '@/module/common/hocs';

const Example = lazy(() =>
  import('../example/example').then((module) => ({
    default: module.Example
  }))
);

export const MainRouter = () => (
  <Suspense fallback={<Loader size='medium' height='auto' />}>
    <Routes>
      <Route
        path={APP_KEYS.ROUTER_KEYS.EXAMPLE}
        element={
          <PublicPage>
            <Example />
          </PublicPage>
        }
      />
    </Routes>
  </Suspense>
);
