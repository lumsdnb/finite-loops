import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: ['localhost', 'finiteloops.net']
  },
  build: {
    target: 'esnext'
  }
});