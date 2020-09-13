import { install } from './components/index'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'
// handle fastclick
import './assets/vui-fastclick.js'
if ('ontouchstart' in window) {
  const _attach = window.FastClick && window.FastClick.attach
  _attach && _attach(document.body)
}

const vui = createApp(App)
install(vui)
// install.installed = true
vui.use(router).mount('#app')
