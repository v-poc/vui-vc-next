<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example v-example-scroll-view">
    <p>ScrollView - basic</p>
    <v-scroll-view
      ref="scrollViewRef"
      @scroll="onScroll"
    >
      <div
        class="scroll-view-item"
        v-for="item in state.list"
        :key="item"
        @click="onItemClick(item)"
      >{{ item }}</div>
    </v-scroll-view>
  </div>
  <div class="v-example">
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="onAddItems"
    >Test Add items</v-button>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import Toast from '../components/toast/index'
// import VScrollView from '../components/scroll-view/index.vue'  
// import VButton from '../components/button/index.vue'

export default {
  name: 'scroll-view-demo',

  inheritAttrs: false,

  // components: {
  //   VScrollView,
  //   VButton
  // },

  setup() {
    const scrollViewRef = ref('scrollViewRef')

    const state = reactive({
      list: 5
    })

    const onItemClick = (item) => {
      Toast.info(`Click item: ${item}`)
    }

    const onScroll = ({ scrollLeft, scrollTop }) => {
      console.log(`onScroll - scrollLeft:${scrollLeft}, scrollTop:${scrollTop}`)
    }

    const onAddItems = () => {
      state.list += 5
      scrollViewRef.value.reflowScroller()
    }

    return {
      scrollViewRef,
      state,
      onItemClick,
      onScroll,
      onAddItems
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';

.v-example-scroll-view {
  height: 4rem;
  background: #FFF;
  border-bottom: 0 none;

  .scroll-view-item {
    padding: 0.2rem 0;
    text-align: center;
    border-bottom: 1px solid #EFEFEF;
  }
}
</style>
