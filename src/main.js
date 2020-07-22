import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'

import './assets/styles/common.scss'

createApp(App)
  .use(router)
  .mount('#app')
