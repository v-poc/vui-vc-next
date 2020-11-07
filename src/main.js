import { install } from './components/index'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'
import './assets/vui-fastclick.js' // import fastclick

// handle fastclick
if ('ontouchstart' in window) {
  const _attach = window.FastClick && window.FastClick.attach
  _attach && _attach(document.body)
}

// install vui app
const vui = createApp(App)
install(vui)
vui.use(router).mount('#app')
window.vuiInstance = vui
