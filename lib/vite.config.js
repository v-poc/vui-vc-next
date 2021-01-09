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
      formats: ['es']
    }
  }
}
