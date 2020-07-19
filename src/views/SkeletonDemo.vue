<template>
  <router-link to="/" class="m-back">&lt; Home</router-link>
  <div class="m-example">
    <p>Skeleton Content loading</p>
    <p>
      <button
        @click="startContentLoading"
        :disabled="state.contentLoading"
      >Test Content loading (delay 3s)</button>
    </p>
    <v-skeleton
      v-if="state.showContent"
      title
      title-width="80%"
      :row="7"
      :loading="state.contentLoading"
    >
      <img src="../assets/images/kongfu.gif" />
    </v-skeleton>
  </div>
  <div class="m-example">
    <p>Skeleton Title placeholders</p>
    <v-skeleton title></v-skeleton>
  </div>
  <div class="m-example">
    <p>Skeleton Avatar placeholders</p>
    <v-skeleton title avatar avatar-size="lg"></v-skeleton>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import VSkeleton from '../components/skeleton/index.vue'

export default defineComponent({
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
})
</script>

<style scoped>
.m-back {
  display: block;
  margin: 0.2rem;
  font-size: 0.3rem;
  text-decoration: none;
}

.m-example {
  margin: 0.2rem;
  padding-bottom: 0.4rem;
  font-size: 0.4rem;
  border-bottom: 1px solid #ccc;
}

.m-example p {
  padding-bottom: 0.2rem;
}

.m-example img {
  width: 100%;
  height: auto;
}
</style>
