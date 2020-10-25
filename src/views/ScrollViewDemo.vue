<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>ScrollView (total count: 20)</p>
    <div class="v-example-scroll-view">
      <v-scroll-view
        ref="scrollViewRef"
        :scrolling-x="false"
        @scroll="onScroll"
        @end-reached="onEndReached"
      >      
        <div
          class="scroll-view-list"
          v-for="item in state.list"
          :key="item"
          @click="onItemClick(item)"
        >
          <p class="scroll-view-item">{{ item }}</p>
        </div>
        <v-scroll-view-more
          slot="more"
          :is-finished="state.isFinished"
        ></v-scroll-view-more>
      </v-scroll-view>
    </div>
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
// import { debounce } from '../utils/index'
import Toast from '../components/toast/index'
import VScrollViewMore from '../components/scroll-view/more.vue'
// import VScrollView from '../components/scroll-view/index.vue'
// import VButton from '../components/button/index.vue'

export default {
  name: 'scroll-view-demo',

  inheritAttrs: false,

  components: {
    VScrollViewMore
  //   VScrollView,
  //   VButton
  },

  setup() {
    const scrollViewRef = ref('scrollViewRef')

    const state = reactive({
      list: 5,
      isFinished: false
    })

    const onItemClick = (item) => {
      Toast.info(`Click item: ${item}`)
    }

    const onScroll = ({ scrollLeft, scrollTop }) => {
      console.log(`onScroll - scrollLeft:${scrollLeft}, scrollTop:${scrollTop}`)
    }

    const onAddItems = () => {
      if (state.isFinished) {
        Toast.info('Already loaded!')
        return
      }
      state.list += 5
      scrollViewRef.value.reflowScroller()
      if (state.list >= 20) {
        state.isFinished = true
        scrollViewRef.value.finishLoadMore()
      }      
    }

    const onEndReached = () => {
      if (state.isFinished) {
        Toast.info('Already loaded!')
        return
      }
      setTimeout(() => {
        state.list += 5
        if (state.list >= 20) {
          state.isFinished = true
          scrollViewRef.value.finishLoadMore()
        }
      }, 1000)
    }

    return {
      scrollViewRef,
      state,
      onItemClick,
      onScroll,
      onAddItems,
      onEndReached
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';

.v-example-scroll-view {
  height: 4rem;
  background: #fff;
  border-bottom: 0 none;

  .scroll-view-item {
    padding: 0.2rem 0;
    text-align: center;
    border-bottom: 1px solid #fff;
  }

  .v-scroll-view {
    background-color: #efefef;
  }
}

.v-example {
  .v-button {
    margin-top: 0.5rem;
  }
}
</style>
