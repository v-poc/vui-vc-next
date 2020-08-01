<template>
  <div class="nav-wrapper">
    <p><span class="title">vui</span><sup>v{{ state.version }}</sup></p>
    <p>[Examples]</p>
    <ul>
      <li>
        <router-link to="/skeleton-demo">Skeleton</router-link>
      </li>
      <li>
        <router-link to="/tag-demo">Tag</router-link>
      </li>
      <li>
        <router-link to="/popup-demo">Popup</router-link>
      </li>
      <li>
        <router-link to="/icon-demo">Icon</router-link>
      </li>
      <li>
        <router-link to="/button-demo">Button</router-link>
      </li>
      <li>
        <router-link to="/transition-demo">Transition</router-link>
      </li>
      <li>
        <router-link to="/landscape-demo">Landscape</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import packageData from '../../package.json'

export default defineComponent({
  name: 'index-demo',
  setup() {
    const state = reactive({
      version: packageData.version
    })

    return {
      state
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/styles/example.scss';
</style>
