<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Roller</p>
    <div class="v-example-center">
      <v-activity-indicator
        :size="40"
        :text-size="20"
      >Loading...</v-activity-indicator>
      <br />
      <v-activity-indicator
        :size="20"
        :text-size="16"
        vertical
      >Vertical Loading...</v-activity-indicator>
    </div>
  </div>
  <div class="v-example">
    <p>Spinner</p>
    <div class="v-example-center">
      <v-activity-indicator
        type="spinner"
        :size="30"
      >Loading Data...</v-activity-indicator>
      <br />
      <v-activity-indicator
        type="spinner"
        :size="30"
        vertical
      >Vertical Loading...</v-activity-indicator>
      <br />
      <v-activity-indicator
        type="spinner"
        class="activity-indicator-container"
        :size="40"
        :text-size="20"
        color="light"
      >Light color...</v-activity-indicator>
    </div>
  </div>
  <div class="v-example">
    <p>Carousel</p>
    <div class="v-example-center">
      <v-activity-indicator
        type="carousel"
        :size="20"
      />
      <br />
      <v-button
        type="default"
        round
        inline
        @click="onTest"
      >
        <v-activity-indicator
          v-if="state.loading"
          type="carousel"
          :size="15"
          color="#ccc"
        />
        <span v-else>Click to view Carousel</span>
      </v-button>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
// import VActivityIndicator from '../components/activity-indicator/index.vue'

export default {
  name: 'activity-indicator-demo',

  inheritAttrs: false,

  // components: {
  //   VActivityIndicator
  // }

  setup() {
    const state = reactive({
      loading: false
    })

    const onTest = () => {
      state.loading = true
      setTimeout(() => {
        state.loading = false
      }, 3000)
    }

    return {
      state,
      onTest
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';

.activity-indicator-container {
  padding: 15px 20px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
}
</style>
