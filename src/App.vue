<template>
  <div class="main-wrapper">
    <router-view />
  </div>
</template>

<script>
import './assets/styles/responsive'

export default {
  name: 'App'
}
</script>

<style scoped>
.main-wrapper {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 0.4rem;
}
</style>
