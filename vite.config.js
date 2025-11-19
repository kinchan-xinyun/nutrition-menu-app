import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/nutrition-menu-app/', // GitHubリポジトリ名を設定
  server: {
    port: 3000,
    open: true
  }
});

