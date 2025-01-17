import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Loader } from '@/module/common/component/loading';
import { APP_KEYS } from '@/module/common/constants';
import { PublicPage } from '@/module/common/hocs';
import { generateComponent } from '@/utils';

const Example = lazy(() =>
  import('../example/example').then((module) => ({
    default: module.Example
  }))
);

export const MainRouter = () => (
  <Suspense fallback={<Loader size='medium' height='auto' />}>
    <Routes>
      {
        process.env.VITE_APP_ENV === 'local' && <Route
          path={APP_KEYS.ROUTER_KEYS.EXAMPLE}
          element={<Example/>}
        />
      }

      <Route element={<PublicPage/>}>
        {[
          {name: 'Example', path: APP_KEYS.ROUTER_KEYS.EXAMPLE, isLazy: true},
        ].map((value, index) => generateComponent(value, index))}
      </Route>

    </Routes>
  </Suspense>
);
