import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import 'swiper/css'; @import 'swiper/css/navigation'; @import 'swiper/css/pagination';`
      }
    }
  }
});
