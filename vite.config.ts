import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Importe o módulo 'path' para lidar com caminhos

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Define o alias '@' para a pasta 'src'
    },
  },
  build: {
    outDir: 'dist',
  },
});