import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import jsconfigPaths from 'vite-jsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const PORT = 3003;
  return {
    server: {
      open: true,
      port: PORT,
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
          javascriptEnabled: true,
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
    build: {
      sourcemap: false,
    },
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