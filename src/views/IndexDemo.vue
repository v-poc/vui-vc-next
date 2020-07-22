<template>
  <div class="nav-wrapper">
    <p class="title">vui</p>
    <p>[Examples]</p>
    <ul>
      <li>
        <router-link to="/skeleton-demo">Skeleton</router-link>
      </li>
      <li>
        <router-link to="/tag-demo">Tag</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'index-demo'
})
</script>

<style lang="scss" scoped>
@import '../assets/styles/example.scss';
</style>
