import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [ vuePlugin() ], // for plugin
  base: '/vui-vc-next', // for production
  outDir: 'dist/vui-vc-next' // npm run serve-build => http://localhost:3000/vui-vc-next
  // port: 8080
})
