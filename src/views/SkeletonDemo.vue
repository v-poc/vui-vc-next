<template>
  <router-link to="/" class="m-back">Home</router-link>
  <div class="m-example">
    <p>Skeleton Content loading</p>
    <p>
      <button @click="startContentLoading" :disabled="state.contentLoading">Test Content loading (delay 3s)</button>
    </p>
    <m-skeleton v-if="state.showContent" title :row="6" :loading="state.contentLoading">
      <img src="../assets/images/kongfu.gif" />
    </m-skeleton>
  </div>
  <div class="m-example">
    <p>Skeleton Title placeholders</p>
    <m-skeleton title></m-skeleton>
  </div>
  <div class="m-example">
    <p>Skeleton Avatar placeholders</p>
    <m-skeleton title avatar></m-skeleton>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import MSkeleton from '../components/skeleton/index.vue'

export default defineComponent({
  name: 'skeleton-demo',

  inheritAttrs: false,

  components: {
    MSkeleton
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
