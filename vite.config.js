const path = require('path')

module.exports = {
  base: '/vui-vc-next',
  port: 8080,
  alias: {
    '/@/': path.resolve(__dirname, 'src'), // @ is an alias to /src
    '/@assets/': path.resolve(__dirname, 'src/assets'),
    '/@components/': path.resolve(__dirname, 'src/components'),
    '/@composables/': path.resolve(__dirname, 'src/composables'),
    '/@constants/': path.resolve(__dirname, 'src/constants'),
    '/@routers/': path.resolve(__dirname, 'src/routers'),
    '/@utils/': path.resolve(__dirname, 'src/utils'),
    '/@views/': path.resolve(__dirname, 'src/views')
  }
}
