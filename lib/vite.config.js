import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'

const path = require('path')

export default defineConfig({
  plugins: [ vuePlugin() ], // for plugin
  build: {
    lib: {
      entry: path.resolve(__dirname, '../src/components/index.js'),
      name: 'VuiVcNext',
      formats: ['es']
    }
  }
})
