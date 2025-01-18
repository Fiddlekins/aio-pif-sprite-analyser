import {lingui} from "@lingui/vite-plugin";
import react from '@vitejs/plugin-react-swc';
import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [["@lingui/swc-plugin", {}]],
    }),
    lingui(),
  ],
  base: '/aio-pif-sprite-analyser/',
})
