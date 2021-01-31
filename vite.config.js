import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    vue() // for vue plugin
  ],
  base: '/vui-vc-next/', // for base url
  build: {
    outDir: 'dist/vui-vc-next' // npm run serve-build => http://localhost:3000/vui-vc-next/
  },
  server: {
    port: 8080 // for dev mode
  }
}
