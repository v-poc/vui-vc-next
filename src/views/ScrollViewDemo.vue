<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>ScrollView - lazyLoadImage</p>
    <div class="v-example-scroll-view-lazy">
      <v-scroll-view
        :scrolling-x="false"
        :auto-reflow="true"
        @scroll="onScroll"
      >
        <ul class="lazy-list">
          <li
            v-for="item in state.listPhotoData"
            class="item"
            :key="item.id"
            @click="onPreview(item.imgUrl)"
          >
            <div class="icon">
              <img v-lazy="item.imgUrl" />
            </div>
            <div class="text">
              <h2 class="name">{{ item.name }}</h2>
              <p class="desc">{{ item.desc }}</p>
            </div>
          </li>
        </ul>
      </v-scroll-view>
      <v-popup
        position="center"
        transition="v-punch"
        v-model:value="popupShow.center"
      >
        <div class="v-example-popup v-example-popup-center">
          <p>image preview</p>
          <img v-if="state.imgUrl" :src="state.imgUrl" />
        </div>
      </v-popup>      
    </div>
  </div>
  <div class="v-example">
    <p>ScrollView - Pull-up-load-more</p>
    <sup>(Total count: {{ state.total }})</sup>
    <div class="v-example-scroll-view-more">
      <v-scroll-view
        ref="scrollViewMoreRef"
        :scrolling-x="false"
        @scroll="onScroll"
        @end-reached="onEndReached"
      >
        <div
          v-for="item in state.listMore"
          :key="`scrollViewMore${item}`"
          @click="onItemClick(item)"
        >
          <p class="scroll-view-item">{{ item }}</p>
        </div>
        <template #more>
          <v-scroll-view-more :is-finished="state.isFinished"></v-scroll-view-more>
        </template>
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
  <div class="v-example">
    <p>ScrollView - Pull-down-refresh</p>
    <sup>(Total count: {{ state.total }})</sup>
    <div class="v-example-scroll-view-refresh">
      <v-scroll-view
        ref="scrollViewRefreshRef"
        :scrolling-x="false"
        @refreshing="onRefreshing"
        @refresh-active="onRefreshActive"
      >
        <template #refresh>
          <v-scroll-view-refresh
            :is-refreshing="state.isRefreshing"
            :is-refresh-active="state.isRefreshActive"
          ></v-scroll-view-refresh>
        </template>
        <div
          v-for="item in state.listRefresh"
          :key="`scrollViewRefresh${item}`"
          @click="onItemClick(item)"
        >
          <p class="scroll-view-item">{{ item }}</p>
        </div>
      </v-scroll-view>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { logInfo, debounce } from '../utils/index'
import { PHOTOS_DATA } from '../assets/mock/index'
import Toast from '../components/toast/index'
import useShowPopup from '../composables/useShowPopup'
// import VScrollViewMore from '../components/scroll-view/more.vue'
// import VScrollViewRefresh from '../components/scroll-view/refresh.vue'
// import VScrollView from '../components/scroll-view/index.vue'
// import VButton from '../components/button/index.vue'

export default {
  name: 'scroll-view-demo',

  inheritAttrs: false,

  // components: {
  //   VScrollViewMore,
  //   VScrollViewRefresh,
  //   VScrollView,
  //   VButton
  // },

  setup() {
    const scrollViewMoreRef = ref('scrollViewMoreRef')
    const scrollViewRefreshRef = ref('scrollViewRefreshRef')

    const state = reactive({
      listMore: 10,
      total: 30,
      isFinished: false,
      isRefreshing: false,
      isRefreshActive: false,
      listX: 12,
      listRefresh: 5,
      listPhotoData: PHOTOS_DATA,
      imgUrl: ''
    })

    const popup = useShowPopup()

    const onItemClick = (item) => {
      Toast.info(`Click item: ${item}`)
    }

    const onScroll = debounce(({ scrollLeft, scrollTop }) => {
      logInfo(
        `[ScrollViewDemo] onScroll - scrollLeft: ${scrollLeft}, scrollTop: ${scrollTop}`
      )
    }, 50)

    const onPreview = (imgUrl) => {
      state.imgUrl = imgUrl
      popup.showPopup('center', true)
    }    

    const onAddItems = () => {
      if (state.isFinished) {
        Toast.info('Already loaded!')
        return
      }
      state.listMore += 5
      if (state.listMore >= state.total) {
        state.isFinished = true
      }
      scrollViewMoreRef.value.finishLoadMore()
    }

    const onEndReached = () => {
      if (state.isFinished) {
        Toast.info('Already loaded!')
        return
      }
      setTimeout(() => {
        state.listMore += 5
        if (state.listMore >= state.total) {
          state.isFinished = true
        }
        scrollViewMoreRef.value.finishLoadMore()
      }, 300)
    }

    let isAllRefreshed = false
    const onRefreshing = () => {
      state.isRefreshActive = false
      state.isRefreshing = true
      if (isAllRefreshed) {
        Toast.info('Already loaded!')
        scrollViewRefreshRef.value.finishRefresh()
        return
      }
      setTimeout(() => {
        state.listRefresh += 5
        if (state.listRefresh >= state.total) {
          isAllRefreshed = true
        }
        scrollViewRefreshRef.value.finishRefresh()
      }, 600)
    }

    const onRefreshActive = () => {
      state.isRefreshActive = true
      state.isRefreshing = false
    }

    return {
      scrollViewMoreRef,
      scrollViewRefreshRef,
      state,
      popupShow: popup.mapping,
      onItemClick,
      onScroll,
      onPreview,
      onAddItems,
      onEndReached,
      onRefreshing,
      onRefreshActive
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';

.v-example-scroll-view-lazy {
  .v-example-popup {
    margin: 0 auto;
    width: 80vw;
  }    
}

.v-example-scroll-view-more {
  height: 500px;
  background: #fff;
  border-bottom: 0 none;

  .scroll-view-item {
    padding: 30px 0;
    text-align: center;
    font-size: 28px;
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
  height: 100px;
  background: #fff;

  .v-scroll-view {
    display: flex;
    align-items: center;
    background-color: #efefef;

    .scroll-view-list {
      display: flex;
      width: 1000px;

      .scroll-view-item {
        flex: 1;
        text-align: center;
        font-size: 28px;
        border-right: 1px solid #fff;
      }
    }
  }
}

.v-example-scroll-view-refresh {
  height: 800px;
  background-color: #fff;

  .scroll-view-item {
    padding: 30px 0;
    text-align: center;
    font-size: 28px;
    border-bottom: 1px solid #fff;
  }

  .v-scroll-view {
    background-color: #efefef;
  }
}

.v-example {
  .v-button {
    margin-top: 30px;
  }
}
</style>
