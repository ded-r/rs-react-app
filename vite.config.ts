import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
    include: ['src/**/*.test.tsx', 'src/**/*.spec.tsx'],
    coverage: {
      include: ['src/**/*.tsx'],
      exclude: ['**/node_modules/**', 'src/__tests__/setup.ts', 'src/App.tsx'],
    },
  },
});
