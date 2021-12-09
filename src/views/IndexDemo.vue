<template>
  <div class="nav-wrapper">
    <p>
      <span class="title">vui</span>
      <sub>.vc.next</sub>
      <sub>v{{ state.version }}</sub>      
    </p>
    <dl>
      <dd>
        <sub>
          <a href="https://nikoni.top/vui-vc-next/docs">[ docs ]</a>
        </sub>
      </dd>
    </dl>
    <ul>
      <li
        v-for="item in state.list"
        :key="item"
      >
        <router-link :to="getPath(item)">
          {{ item }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { componentsVUI, version } from '../components/index'
import { getRoute } from '../routers/routerUtil'

export default {
  name: 'index-demo',

  setup() {
    const state = reactive({
      version,
      list: componentsVUI
    })

    const getPath = (name) => {
      const routeItem = getRoute(name) || {}
      return routeItem.routePath
    }

    return {
      state,
      getPath
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';
</style>
