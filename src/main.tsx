import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './module/app/app.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
