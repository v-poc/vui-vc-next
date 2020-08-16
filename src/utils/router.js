import { VUI_COMPONENTS } from '../constants/index'

const componentsMap = {}

VUI_COMPONENTS.forEach((name) => {
  const routeName = `${name.toLowerCase()}-demo`
  componentsMap[name] = {
    routeName,
    routePath: `/${routeName}`,
    routeComponent: () => import(`../views/${name}Demo.vue`)
  }
})

export const getRoute = (name) => componentsMap[name]
