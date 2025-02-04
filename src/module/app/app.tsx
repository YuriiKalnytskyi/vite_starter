import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';

import { MainRouter } from '@/module/navigation';

import * as Styled from './app.styled';
import { useThemeStore } from '@/store';
import { darkTheme, lightTheme } from '@/theme/colors.const.ts';
import { toast, ToastSetting } from '@/module/common/component';

import '@/styles/index.css';
import '@/module/common/i18n/config.ts';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      cacheTime: Infinity
    }
  },
  queryCache: new QueryCache({
    onError: (_, query) => {
      // 🎉 only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (query.state.data !== undefined) {
        toast.error({ title: 'error' });
      }
    }
  })
});

const env = process.env.VITE_APP_ENV;

function App() {
  const { theme } = useThemeStore();

  const selectedTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <Styled.GlobalStyles />
      <QueryClientProvider client={queryClient}>

        <MainRouter />
        {env === 'local' ? (
          <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
        ) : null}
        <ToastSetting stacked />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
