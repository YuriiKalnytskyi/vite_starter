import * as path from 'path';
import url from 'url';
import { defineConfig, loadEnv } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

import react from '@vitejs/plugin-react';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      }
    },
    plugins: [
      react(),
      eslintPlugin({
        cache: true,
        include: ['./src/**/*.js', './src/**/*.jsx'],
        exclude: []
      })
    ],
    server: {
      port: 3000
    },
    preview: {
      port: 3000
    },
    define: {
      'process.env': env
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/')
      }
    }
  });
};
