import vue from '@vitejs/plugin-vue'

const path = require('path')

export default {
  plugins: [
    vue() // for vue plugin
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, '../src/components/index.js'),
      name: 'VuiVcNext',
      fileName: (format) => `vui-vc-next.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
}
