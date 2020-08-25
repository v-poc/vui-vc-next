<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Spinner</p>
    <v-activity-indicator
      type="spinner"
      :size="30"
    >Loading Data...</v-activity-indicator>
    <v-activity-indicator
      type="spinner"
      :size="60"
      :text-size="30"
      color="light"
    >Loading...</v-activity-indicator>
  </div>
</template>

<script>
import VActivityIndicator from '../components/activity-indicator/index.vue'

export default {
  name: 'activity-indicator-demo',

  inheritAttrs: false,

  components: {
    VActivityIndicator
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';
</style>
