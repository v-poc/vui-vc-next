<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Skeleton Content loading</p>
    <p>
      <button
        @click="startContentLoading"
        :disabled="state.contentLoading"
      >Test Content loading (delay 3s)</button>
    </p>
    <v-skeleton
      class="v-example-img"
      v-if="state.showContent"
      title
      title-width="80%"
      :row="7"
      :loading="state.contentLoading"
    >
      <img src="../assets/images/kongfu.png" />
    </v-skeleton>
  </div>
  <div class="v-example">
    <p>Skeleton Title placeholders</p>
    <v-skeleton title></v-skeleton>
  </div>
  <div class="v-example">
    <p>Skeleton Avatar placeholders</p>
    <v-skeleton
      title
      avatar
      avatar-size="lg"
    ></v-skeleton>
  </div>
</template>

<script>
import { reactive } from 'vue'
import VSkeleton from '../components/skeleton/index.vue'

export default {
  name: 'skeleton-demo',

  inheritAttrs: false,

  components: {
    VSkeleton
  },

  setup() {
    // reactive state
    const state = reactive({
      showContent: false,
      contentLoading: false
    })

    // demo content loading
    const startContentLoading = () => {
      state.showContent = true
      state.contentLoading = true

      setTimeout(() => {
        state.contentLoading = false
      }, 3000)
    }

    return {
      state,
      startContentLoading
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/example.scss';
</style>
