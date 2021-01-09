import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    vue() // for vue plugin
  ],
  build: {
    base: '/vui-vc-next/', // for production
    outDir: 'dist/vui-vc-next' // npm run serve-build => http://localhost:3000/vui-vc-next/
  },
  server: {
    port: 8080
  }
}
