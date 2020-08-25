<template>
  <div class="nav-wrapper">
    <p><span class="title">vui</span><sup>v{{ state.version }}</sup></p>
    <p>[Examples]</p>
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
import packageData from '../../package.json'
import { VUI_COMPONENTS } from '../constants/index'
import { getRoute } from '../utils/index'

export default {
  name: 'index-demo',

  setup() {
    const state = reactive({
      version: packageData.version,
      list: VUI_COMPONENTS
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
