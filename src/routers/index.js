import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Home from '../views/IndexDemo.vue'
const SkeletonDemo = () => import('../views/SkeletonDemo.vue')
const TagDemo = () => import('../views/TagDemo.vue')
const PopupDemo = () => import('../views/PopupDemo.vue')

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
    },
    {
      path: '/tag-demo',
      name: 'tag-demo',
      component: TagDemo
    },
    {
      path: '/popup-demo',
      name: 'popup-demo',
      component: PopupDemo
    }   
  ]
})

export default router
