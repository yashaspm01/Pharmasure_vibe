import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        hmr: {
          host: '0.0.0.0',
          port: 3000
        },
        allowedHosts: [
          'c78aab60-85c5-41f7-94c0-a6bbf24d1887-00-2gcr3obhn8knx.sisko.replit.dev',
          '.replit.dev',
          'localhost',
        ]
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
