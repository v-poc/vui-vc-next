<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Spinner</p>
    <v-activity-indicator-spinner
      :size="30"
    ></v-activity-indicator-spinner>
    <v-activity-indicator-spinner
      :size="60"
      color="light"
    ></v-activity-indicator-spinner>    
  </div>
</template>

<script>
import VActivityIndicatorSpinner from '../components/activity-indicator/spinner.vue'

export default {
  name: 'activity-indicator-demo',

  inheritAttrs: false,

  components: {
    VActivityIndicatorSpinner
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/example.scss';
</style>
