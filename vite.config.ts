import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import jsconfigPaths from 'vite-jsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const API_URL = `${env.VITE_APP_BASE_NAME}`;
  const PORT = 3003;

   return {
    server: {
      open: true,
      port: PORT,
      host: '::',
    },
    define: {
      global: 'window',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
        },
        less: {
          charset: false,
        },
      },
      charset: false,
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },
    base: API_URL,
    plugins: [
      react(),
      jsconfigPaths(),
      svgrPlugin({
        svgrOptions: {
          icon: true,
        },
      }),
    ],
  };
});
