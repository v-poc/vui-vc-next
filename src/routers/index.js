import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Home from '../views/IndexDemo.vue'
const SkeletonDemo = () => import('../views/SkeletonDemo.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index-demo',
      components: { default: Home }
    },
    {
      path: '/skeleton-demo',
      name: 'skeleton-demo',
      component: SkeletonDemo
    }
  ]
})

export default router
