<template>
  <div class="nav-wrapper">
    <p><span class="title">vui</span><sup>v{{ state.version }}</sup></p>
    <p>[Examples]</p>
    <ul>
      <li
        v-for="item in state.list"
        :key="item"
      >
        <router-link :to="getRoute(item).routePath">
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

    return {
      state,
      getRoute
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/example.scss';
</style>
