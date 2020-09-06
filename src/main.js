import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'
// import common reset css
import './assets/styles/vui-reset.scss'

// handle fastclick
if ('ontouchstart' in window) {
  const _attach = window.FastClick && window.FastClick.attach
  _attach && _attach(document.body)
}

createApp(App)
  .use(router)
  .mount('#app')
