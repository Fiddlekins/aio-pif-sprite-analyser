import {lingui} from "@lingui/vite-plugin";
import react from "@vitejs/plugin-react";
import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["@lingui/babel-plugin-lingui-macro"],
      },
    }),
    lingui(),
  ],
  base: '/aio-pif-sprite-analyser/',
})
