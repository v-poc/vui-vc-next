import { defineAsyncComponent } from 'vue'
import { componentsVUI } from '../components/index'

const componentsMap = {}

componentsVUI.forEach((name) => {
  const routeName = `${name.toLowerCase()}-demo`
  componentsMap[name] = {
    routeName,
    routePath: `/${routeName}`,
    routeComponent: defineAsyncComponent(() => import(/* @vite-ignore */ `/src/views/${name}Demo.vue`))
  }
})

export const getRoute = (name) => componentsMap[name]
