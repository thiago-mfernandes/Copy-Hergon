import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  server: {
    port: 3000
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  }
});

/**
 * @/*   --> alias config
 * 
 * npm i path
 * npm i -D @types/node
 * 
 * https://dev.to/avxkim/setup-path-aliases-w-react-vite-ts-poa
 * 
 * 
 * emotion with vite config:
 * https://dev.to/glocore/configure-emotion-with-your-vite-react-project-7jl
 * 
 */
