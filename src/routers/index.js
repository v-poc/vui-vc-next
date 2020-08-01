import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Home from '../views/IndexDemo.vue'
const SkeletonDemo = () => import('../views/SkeletonDemo.vue')
const TagDemo = () => import('../views/TagDemo.vue')
const PopupDemo = () => import('../views/PopupDemo.vue')
const IconDemo = () => import('../views/IconDemo.vue')
const ButtonDemo = () => import('../views/ButtonDemo.vue')
const TransitionDemo = () => import('../views/TransitionDemo.vue')
const LandscapeDemo = () => import('../views/LandscapeDemo.vue')

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
    },
    {
      path: '/icon-demo',
      name: 'icon-demo',
      component: IconDemo
    },
    {
      path: '/button-demo',
      name: 'button-demo',
      component: ButtonDemo
    },
    {
      path: '/transition-demo',
      name: 'transition-demo',
      component: TransitionDemo
    },
    {
      path: '/landscape-demo',
      name: 'landscape-demo',
      component: LandscapeDemo
    }    
  ]
})

export default router
