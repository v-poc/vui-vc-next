<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>TabBar - Scrollable</p>
    <v-tab-bar
      v-model:value="state.currentName"
      :items="state.items"
      @change="onChangeItem"
    ></v-tab-bar>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { logInfo } from '../utils/index'
// import VTabBar from '../components/tab-bar/index.vue'

export default {
  name: 'tab-bar-demo',

  inheritAttrs: false,

  // components: {
  //   VTabBar
  // },

  setup() {
    const state = reactive({
      currentName: 'tab2',
      items: []
    })

    new Array(8).fill('').forEach((item, i) => {
      state.items.push({
        name: `tab${i + 1}`,
        label: `label - ${i + 1}`
      })
    })

    const onChangeItem = (item) => {
      logInfo(`Click item: ${JSON.stringify(item)}`)
    }

    return {
      state,
      onChangeItem
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';
</style>
