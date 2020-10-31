<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>ScrollViewMore (Total count: {{ state.total }})</p>
    <div class="v-example-scroll-view-more">
      <v-scroll-view
        ref="scrollViewRef"
        :scrolling-x="false"
        @scroll="onScroll"
        @end-reached="onEndReached"
      >
        <div
          v-for="item in state.list"
          :key="`scrollViewMore${item}`"
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
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="onAddItems"
    >Test Add items</v-button>
  </div>
  <div class="v-example">
    <p>ScrollView - Horizontal</p>
    <div class="v-example-scroll-view-x">
      <v-scroll-view
        :scrolling-y="false"
        :touch-angle="80"
        :is-prevent="false"
      >
        <div class="scroll-view-list">
          <p
            class="scroll-view-item"
            v-for="item in state.listX"
            :key="`scrollViewX${item}`"
          >{{ item }}</p>
        </div>
      </v-scroll-view>
    </div>
  </div>
</template>

<script>
import { nextTick, reactive, ref } from 'vue'
import { logInfo, debounce } from '../utils/index'
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
      list: 10,
      total: 30,
      isFinished: false,
      listX: 12
    })

    const onItemClick = (item) => {
      Toast.info(`Click item: ${item}`)
    }

    const onScroll = debounce(({ scrollLeft, scrollTop }) => {
      logInfo(
        `[ScrollViewDemo] onScroll - scrollLeft:${scrollLeft}, scrollTop:${scrollTop}`
      )      
    }, 50)

    const onAddItems = () => {
      if (state.isFinished) {
        Toast.info('Already loaded!')
        return
      }
      state.list += 5
      if (state.list >= state.total) {
        state.isFinished = true        
      }
      scrollViewRef.value.finishLoadMore()
    }

    const onEndReached = () => {
      if (state.isFinished) {
        Toast.info('Already loaded!')
        return
      }
      setTimeout(() => {
        state.list += 5
        if (state.list >= state.total) {
          state.isFinished = true          
        }
        scrollViewRef.value.finishLoadMore()
      }, 300)
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

.v-example-scroll-view-more {
  height: 5rem;
  background: #fff;
  border-bottom: 0 none;

  .scroll-view-item {
    padding: 0.1rem 0;
    text-align: center;
    border-bottom: 1px solid #fff;
  }

  .v-scroll-view {
    background-color: #efefef;

    .scroll-view-container:after {
      content: '';
      display: table;
      clear: both;
    }
  }
}

.v-example-scroll-view-x {
  height: 1rem;
  background: #FFF;

  .v-scroll-view {
    display: flex;
    align-items: center;
    background-color: #efefef;

    .scroll-view-list {
      display: flex;
      width: 10rem;

      .scroll-view-item {
        flex: 1;
        text-align: center;
        font-size: 0.28rem;
        border-right: 1px solid #fff;
      }
    }
  }
}

.v-example {
  .v-button {
    margin-top: 0.3rem;
  }
}
</style>
