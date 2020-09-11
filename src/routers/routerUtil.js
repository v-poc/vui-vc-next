import { componentsVUI } from '../components/vui-components'

const componentsMap = {}

componentsVUI.forEach((name) => {
  const routeName = `${name.toLowerCase()}-demo`
  componentsMap[name] = {
    routeName,
    routePath: `/${routeName}`,
    routeComponent: () => import(`../views/${name}Demo.vue`)
  }
})

export const getRoute = (name) => componentsMap[name]
