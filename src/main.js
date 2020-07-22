import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'

import './assets/styles/common.css'
// import './assets/styles/vui.css'

createApp(App)
  .use(router)
  .mount('#app')
