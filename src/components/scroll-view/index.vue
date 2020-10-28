<template>
  <div
    ref="root"
    class="v-scroll-view"
    @touchstart="onScrollerTouchStart"
    @touchmove="onScrollerTouchMove"
    @touchend="onScrollerTouchEnd"
    @touchcancel="onScrollerTouchEnd"
    @mousedown="onScrollerMouseDown"
    @mousemove="onScrollerMouseMove"
    @mouseup="onScrollerMouseUp"
    @mouseleave="onScrollerMouseUp"
  >
    <div
      class="scroll-view-header"
      v-if="headerSlot"
    >
      <slot name="header"></slot>
    </div>
    <div :class="containerCls">
      <div
        v-if="hasRefresher"
        :class="refresherCls"
      >
        <slot
          name="refresh"
          :scroll-top="state.scrollY"
          :is-refreshing="state.isRefreshing"
          :is-refresh-active="state.isRefreshActive"
        ></slot>
      </div>
      <slot></slot>
      <div
        v-if="hasMore"
        :class="moreCls"
      >
        <slot
          name="more"
          :is-finished="state.isEndReachingStart || state.isEndReaching"
        ></slot>
      </div>
    </div>
    <div
      class="scroll-view-footer"
      v-if="footerSlot"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import {
  computed,
  reactive,
  ref,
  nextTick,
  watch,
  onMounted,
  onUnmounted
} from 'vue'
import { debounce, render } from '../../utils/index'
import Scroller from '../../utils/scroller'

export default {
  name: 'v-scroll-view',

  props: {
    scrollingX: {
      type: Boolean,
      default: true
    },
    scrollingY: {
      type: Boolean,
      default: true
    },
    bouncing: {
      type: Boolean,
      default: true
    },
    autoReflow: {
      type: Boolean,
      default: false
    },
    manualInit: {
      type: Boolean,
      default: false
    },
    endReachedThreshold: {
      type: Number,
      default: 0
    },
    immediateCheckEndReaching: {
      type: Boolean,
      default: false
    },
    touchAngle: {
      type: Number,
      default: 45
    },
    isPrevent: {
      type: Boolean,
      default: true
    }
  },

  setup(props, { emit, slots }) {
    const root = ref(null)

    const state = reactive({
      content: null,
      isRefreshing: false,
      isRefreshActive: false,
      isEndReachingStart: false,
      isEndReaching: false,
      scrollX: null,
      scrollY: null,
      containerW: 0,
      containerH: 0,
      contentW: 0,
      contentH: 0
    })

    let isInited = false
    let scroller = null
    let isMouseDown = false
    let startX = 0
    let startY = 0
    let currentX = 0
    let currentY = 0
    let reflowTimer = null
    let endReachedHandler = null
    let moreOffsetY = 0

    /**
     * computed properties
     */    
    const headerSlot = computed(() => slots.header)

    const footerSlot = computed(() => slots.footer)

    const hasRefresher = computed(() => slots.refresh) // todo - scopedSlots.refresh

    const hasMore = computed(() => slots.more) // todo - scopedSlots.more

    const containerCls = computed(() => {
      return [
        'scroll-view-container',
        {
          horizontal: props.scrollingX && !props.scrollingY
        }
      ]
    })

    const refresherCls = computed(() => {
      return [
        'scroll-view-refresh',
        {
          refreshing: state.isRefreshing,
          'refresh-active': state.isRefreshActive
        }
      ]
    })

    const moreCls = computed(() => {
      return [
        'scroll-view-more',
        {
          active: state.isEndReachingStart || state.isEndReaching
        }
      ]
    })

    /**
     * methods
     */
    const initScroller = () => {
      if (isInited) {
        return
      }
      const container = root.value
      const refresher = container.querySelector('.scroll-view-refresh')
      const more = container.querySelector('.scroll-view-more')
      state.content = container.querySelector('.scroll-view-container')
      const refreshOffsetY = refresher ? refresher.clientHeight : 0
      moreOffsetY = more ? more.clientHeight : 0
      const content = state.content
      const rect = container.getBoundingClientRect()

      scroller = new Scroller(
        (left, top) => {
          render(content, left, top)

          if (isInited) {
            onScroll(left, top)
          }
        },
        {
          scrollingX: props.scrollingX,
          scrollingY: props.scrollingY,
          bouncing: props.bouncing,
          zooming: false,
          animationDuration: 200,
          speedMultiplier: 1.2,
          inRequestAnimationFrame: true
        }
      )
      scroller.setPosition(
        rect.left + container.clientLeft,
        rect.top + container.clientTop
      )
      if (hasRefresher) {
        scroller.activatePullToRefresh(
          refreshOffsetY,
          () => {
            state.isRefreshActive = true
            state.isRefreshing = false
            // emit('refreshActive')
            emit('refresh-active')
          },
          () => {
            state.isRefreshActive = false
            state.isRefreshing = false
          },
          () => {
            state.isRefreshActive = false
            state.isRefreshing = true
            emit('refreshing')
          }
        )
      }
      reflowScroller(true)
      props.autoReflow && initAutoReflow()
      endReachedHandler = debounce(() => {
        state.isEndReaching = true
        // emit('endReached')
        emit('end-reached')
      }, 50)

      setTimeout(() => {
        isInited = true
      }, 50)

      if (props.immediateCheckEndReaching) {
        nextTick(checkScrollerEnd)
      }
    }

    const initAutoReflow = () => {
      destroyAutoReflow()
      reflowTimer = setInterval(() => {
        reflowScroller()
      }, 100)
    }

    const destroyAutoReflow = () => {
      reflowTimer && clearInterval(reflowTimer)
    }

    const checkScrollerEnd = () => {
      if (!scroller) {
        return
      }
      const containerHeight = scroller._clientHeight
      const contentHeight = scroller._contentHeight
      const top = scroller._scrollTop
      const moreThreshold = props.endReachedThreshold
      const endOffset =
        contentHeight - containerHeight - (top + moreOffsetY + moreThreshold)
      if (
        top >= 0 &&
        !state.isEndReaching &&
        endOffset <= 0 &&
        endReachedHandler
      ) {
        // First prepare for "load more" state
        state.isEndReachingStart = true
        // Second enter "load more" state
        // & trigger endReached event only once after the rebounding animation
        endReachedHandler()
      }
    }

    const getScrollerAngle = () => {
      const diffX = currentX - startX
      const diffY = currentY - startY
      const angle =
        (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI
      return props.scrollingX ? 90 - angle : angle
    }

    // events handler
    const onScrollerTouchStart = (event) => {
      if (!scroller || !event || !event.targetTouches[0]) {
        return
      }
      startX = event.targetTouches[0].pageX
      startY = event.targetTouches[0].pageY
      scroller.doTouchStart(event.touches, event.timeStamp)
    }

    const onScrollerTouchMove = (event) => {
      if (!scroller || !event || !event.targetTouches[0]) {
        return
      }
      let hadPrevent = false

      if (props.isPrevent) {
        event.preventDefault()
        hadPrevent = true
      }

      currentX = event.targetTouches[0].pageX
      currentY = event.targetTouches[0].pageY

      if (!props.scrollingX || !props.scrollingY) {
        const currentTouchAngle = getScrollerAngle()
        if (currentTouchAngle < props.touchAngle) {
          return
        }
      }

      if (!hadPrevent && event.cancelable) {
        event.preventDefault()
      }

      scroller.doTouchMove(event.touches, event.timeStamp, event.scale)

      const boundaryDistance = 15
      const scrollLeft =
        document.documentElement.scrollLeft ||
        window.pageXOffset ||
        document.body.scrollLeft
      const scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop

      const pX = currentX - scrollLeft
      const pY = currentY - scrollTop
      if (
        pX > document.documentElement.clientWidth - boundaryDistance ||
        pY > document.documentElement.clientHeight - boundaryDistance ||
        pX < boundaryDistance ||
        pY < boundaryDistance
      ) {
        scroller.doTouchEnd(event.timeStamp)
      }
    }

    const onScrollerTouchEnd = (event) => {
      if (!scroller) {
        return
      }
      scroller.doTouchEnd(event.timeStamp)
    }

    const onScrollerMouseDown = (event) => {
      if (!scroller) {
        return
      }
      startX = event.pageX
      startY = event.pageY
      scroller.doTouchStart(
        [
          {
            pageX: event.pageX,
            pageY: event.pageY
          }
        ],
        event.timeStamp
      )
      isMouseDown = true
    }

    const onScrollerMouseMove = (event) => {
      if (!scroller || !isMouseDown) {
        return
      }

      currentX = event.pageX
      currentY = event.pageY
      if (!props.scrollingX || !props.scrollingY) {
        const currentTouchAngle = getScrollerAngle()
        if (currentTouchAngle < props.touchAngle) {
          return
        }
      }
      scroller.doTouchMove(
        [
          {
            pageX: event.pageX,
            pageY: event.pageY
          }
        ],
        event.timeStamp
      )
      isMouseDown = true
    }

    const onScrollerMouseUp = (event) => {
      if (!scroller || !isMouseDown) {
        return
      }
      scroller.doTouchEnd(event.timeStamp)
      isMouseDown = false
    }

    const onScroll = (left, top) => {
      left = +left.toFixed(2)
      top = +top.toFixed(2)

      if (state.scrollX === left && state.scrollY === top) {
        return
      }

      state.scrollX = left
      state.scrollY = top
      checkScrollerEnd()

      emit('scroll', {
        scrollLeft: left,
        scrollTop: top
      })
    }

    const init = () => {
      nextTick(initScroller)
    }

    const scrollTo = (left, top, isAnimate = false) => {
      if (!scroller) {
        return
      }
      scroller.scrollTo(left, top, isAnimate)
    }

    const getOffsets = () => {
      let res
      if (!scroller) {
        res = { left: 0, top: 0 }
      }
      res = scroller.getValues()
      return res
    }

    const reflowScroller = (force = false) => {
      const container = root.value
      const content = state.content
      if (!scroller || !container || !content) {
        return
      }
      nextTick(() => {
        const containerW = container.clientWidth
        const containerH = container.clientHeight
        const contentW = content.offsetWidth
        const contentH = content.offsetHeight

        if (
          force ||
          state.containerW !== containerW ||
          state.containerH !== containerH ||
          state.contentW !== contentW ||
          state.contentH !== contentH
        ) {
          scroller.setDimensions(
            container.clientWidth,
            container.clientHeight,
            content.offsetWidth,
            content.offsetHeight
          )
          state.containerW = containerW
          state.containerH = containerH
          state.contentW = contentW
          state.contentH = contentH
        }
      })
    }

    const triggerRefresh = () => {
      if (!scroller) {
        return
      }
      scroller.triggerPullToRefresh()
    }

    const finishRefresh = () => {
      if (!scroller) {
        return
      }
      scroller.finishPullToRefresh()
      reflowScroller()
    }

    const finishLoadMore = () => {
      if (!scroller) {
        return
      }
      state.isEndReachingStart = false
      state.isEndReaching = false
      reflowScroller()
    }

    /**
     * lifecycle hook
     */
    onMounted(() => {
      if (!props.manualInit) {
        initScroller()
      }
    })

    onUnmounted(() => {
      destroyAutoReflow()
    })

    /**
     * watch property
     */
    watch(
      () => props.autoReflow,
      (val) => {
        val ? initAutoReflow() : destroyAutoReflow()
      }
    )

    return {
      root,
      state,
      headerSlot,
      footerSlot,
      hasRefresher,
      hasMore,
      containerCls,
      refresherCls,
      moreCls,
      onScrollerTouchStart,
      onScrollerTouchMove,
      onScrollerTouchEnd,
      onScrollerMouseDown,
      onScrollerMouseMove,
      onScrollerMouseUp,
      reflowScroller,
      triggerRefresh,
      finishRefresh,
      finishLoadMore,
      init,
      scrollTo,
      getOffsets
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui.scss';

.v-scroll-view {
  position: relative;
  display: block;
  height: 100%;
  overflow: hidden;
  user-select: none;

  .scroll-view-header,
  .scroll-view-footer {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 2;
  }

  .scroll-view-header {
    top: 0;
  }

  .scroll-view-footer {
    bottom: 0;
  }

  .scroll-view-container {
    @include clearfix();
    position: relative;
    z-index: 1;

    .scroll-view-refresh {
      @include clearfix();
      position: absolute;
      left: 0;
      right: 0;
      transform: translate3d(0, -100%, 0);
    }

    .scroll-view-more {
      visibility: hidden;

      &.active {
        visibility: visible;
      }
    }

    &.horizontal {
      display: inline-block;
    }
  }
}
</style>
