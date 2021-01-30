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
  <div class="v-example">
    <p>Tabs - Basic</p>
    <v-tabs :has-ink="false">
      <v-tab-pane
        class="tab-pane-content"
        name="c1"
        label="Chapter 1"
      >
        Chapter 1 - content culpa odio esse rerum omnis laboriosam voluptate repudiandae.
      </v-tab-pane>
      <v-tab-pane
        class="tab-pane-content"
        name="c2"
        label="Chapter 2"
      >
        Chapter 2 - content mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores.
      </v-tab-pane>
      <v-tab-pane
        class="tab-pane-content"
        name="c3"
        label="Chapter 3"
        disabled
      >
        Chapter 3 - content
      </v-tab-pane>
    </v-tabs>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { logInfo } from '../utils/index'
// import VTabs from '../components/tabs/index.vue'
// import VTabPane from '../components/tabs/tab-pane.vue'
// import VTabBar from '../components/tab-bar/index.vue'

export default {
  name: 'tab-bar-demo',

  inheritAttrs: false,

  // components: {
  //   VTabs,
  //   VTabPane,
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

    const onChangeItem = (item, index, prevIndex) => {
      logInfo(
        `Click item: ${JSON.stringify(
          item
        )}, currIndex: ${index}, prevIndex: ${prevIndex}`
      )
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

.v-example {
  .tab-pane-content {
    margin: 0.12rem 0;
    font-size: 0.28rem;
    background-color: #fff;
    padding: 0.2rem;
    line-height: 1.5;
    box-sizing: border-box;
  }

  .v-tabs-content {
    min-height: 2rem;
    background-color: #fff;
  }
}
</style>
