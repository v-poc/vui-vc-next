import { createRouter, createWebHashHistory } from 'vue-router'
import { componentsVUI } from '../components/index'
import { getRoute } from './routerUtil'

import Home from '../views/IndexDemo.vue'

const routes = [
  {
    path: '/',
    name: 'index-demo',
    components: { default: Home }
  }
]

componentsVUI.forEach((name) => {
  const item = getRoute(name) || {}
  routes.push({
    path: item.routePath,
    name: item.routeName,
    component: item.routeComponent
  })
})

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
