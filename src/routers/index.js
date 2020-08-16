import {
  createRouter,
  createWebHistory
} from 'vue-router'

import { VUI_COMPONENTS } from '../constants/index'
import { getRoute } from '../utils/index'

import Home from '../views/IndexDemo.vue'

const routes = [
  {
    path: '/',
    name: 'index-demo',
    components: { default: Home }
  }
]

VUI_COMPONENTS.forEach((name) => {
  routes.push({
    path: getRoute(name).routePath,
    name: getRoute(name).routeName,
    component: getRoute(name).routeComponent
  })
})

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
