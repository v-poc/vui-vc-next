<template>
  <nav class="v-tab-bar">
    <div
      ref="innerRef"
      class="v-tab-bar-inner"
    >
      <template v-if="scrollable">
        <div
          v-show="state.isShowMaskStart"
          class="v-tab-bar-start"
        ></div>
        <div
          v-show="state.isShowMaskEnd"
          class="v-tab-bar-end"
        ></div>
      </template>
      <v-scroll-view
        ref="scrollerRef"
        :scrolling-x="scrollable"
        :scrolling-y="false"
        :key="state.tempKey"
        @scroll="onScroll"
      >
        <div
          class="v-tab-bar-list"
          :style="contentStyle"
        >
          <a
            v-for="(item, index) in items"
            :key="item.name"
            :class="itemCls(item)"
            @click="onClickItem(item, index)"
          >
            <slot
              name="item"
              :items="items"
              :item="item"
              :index="index"
              :currentName="state.currentName"
            >{{ item.label }}</slot>
          </a>
        </div>
        <span
          :class="inkCls"
          v-if="hasInk"
          :style="inkStyle"
        ></span>
      </v-scroll-view>
    </div>
  </nav>
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
import VScrollView from '../scroll-view/index.vue'

export default {
  name: 'v-tab-bar',

  components: {
    VScrollView
  },

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    },
    hasInk: {
      type: Boolean,
      default: true
    },
    inkWidth: {
      type: Number,
      default: 100
    },
    // Whether trigger change event immediately after initialization
    immediate: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const scrollerRef = ref('scrollerRef')
    const innerRef = ref('innerRef')

    const state = reactive({
      currentName: '',
      wrapperW: 0,
      contentW: 0,
      inkW: 0,
      inkPos: 0,
      isShowMaskStart: false,
      isShowMaskEnd: true,
      tempKey: Date.now()
    })

    /**
     * computed properties
     */
    const contentStyle = computed(() => {
      return {
        width: `${state.contentW}px`
      }
    })

    const inkCls = computed(() => {
      return [
        'v-tab-bar-ink',
        {
          'is-disabled': currentTab.value && currentTab.value.disabled
        }
      ]
    })

    const inkStyle = computed(() => {
      return {
        width: `${state.inkW}px`,
        transform: `translateX(${state.inkPos}px)`
      }
    })

    const scrollable = computed(() => state.contentW > state.wrapperW)

    const currentIndex = computed(() => {
      let res = 0
      for (let i = 0, len = props.items.length; i < len; i++) {
        const item = props.items[i]
        if (item && item.name === state.currentName) {
          res = i
          break
        }
      }
      return res
    })

    const currentTab = computed(() => {
      let res = null
      const index = currentIndex.value
      if (index >= 0) {
        res = props.items[index]
      }
      return res
    })

    /**
     * methods
     */
    const itemCls = (item) => {
      return [
        'v-tab-bar-item',
        {
          'is-active': state.currentName === item.name,
          'is-disabled': !!item.disabled
        }
      ]
    }

    const onScroll = ({ scrollLeft }) => {
      const scrollerComp = scrollerRef.value
      if (!scrollerComp) {
        state.isShowMaskStart = false
        state.isShowMaskEnd = false
        return
      }

      state.isShowMaskStart = scrollLeft > 0

      state.isShowMaskEnd =
        scrollLeft < scrollerComp.state.contentW - scrollerComp.state.containerW
    }

    const onClickItem = (item, index) => {
      if (item.disabled) {
        return
      }

      emit('change', item, index, currentIndex.value)
      state.currentName = item.name || ''
      // emit('input', state.currentName)
      emit('update:value', state.currentName)
    }

    const onResizeEnter = () => {
      window.addEventListener('resize', reflow)
      reflow()

      if (props.immediate) {
        nextTick(() => {
          emit('change', props.items[currentIndex.value], currentIndex.value)
        })
      }
    }

    const onResizeLeave = () => {
      window.removeEventListener('resize', reflow)
    }

    const reflow = () => {
      const arrItems = document.querySelectorAll('.v-tab-bar-item')
      if (!arrItems || arrItems.length === 0) {
        return
      }

      const wrapperRect = innerRef.value.getBoundingClientRect()
      state.wrapperW = wrapperRect.width

      let w = 0
      for (let i = 0, len = props.items.length; i < len; i++) {
        const { width } = arrItems[i].getBoundingClientRect()
        w += width
      }
      state.contentW = w

      scrollerRef.value.reflowScroller()

      nextTick(() => {
        if (!arrItems || !arrItems[currentIndex.value]) {
          return
        }

        const target = arrItems[currentIndex.value]
        const offsetW = target.offsetWidth || 1
        state.inkW = (offsetW * props.inkWidth) / 100
        state.inkPos = target.offsetLeft + (offsetW - state.inkW) / 2

        const prevTarget = arrItems[currentIndex.value - 1]
        const nextTarget = arrItems[currentIndex.value + 1]

        if (!prevTarget) {
          scrollerRef.value.scrollTo(0, 0, true)
          return
        }

        if (!nextTarget) {
          scrollerRef.value.scrollTo(state.contentW, 0, true)
          return
        }

        const wrapperRect = innerRef.value.getBoundingClientRect()
        const prevTargetRect = prevTarget.getBoundingClientRect()
        const nextTargetRect = nextTarget.getBoundingClientRect()

        if (prevTargetRect && prevTargetRect.left < wrapperRect.left) {
          scrollerRef.value.scrollTo(prevTarget.offsetLeft, 0, true)
        } else if (nextTargetRect && nextTargetRect.right > wrapperRect.right) {
          scrollerRef.value.scrollTo(
            nextTarget.offsetLeft + nextTarget.offsetWidth - state.wrapperW,
            0,
            true
          )
        }
      })
    }

    /**
     * lifecycle hook
     */
    if (state.currentName === '' && props.items.length) {
      state.currentName = props.items[0].name || ''
      emit('change', props.items[0], 0, 0)
    }
    
    onMounted(() => {
      onResizeEnter()
    })

    onUnmounted(() => {
      onResizeLeave()
    })

    /**
     * watch property
     */
    watch(
      () => props.value,
      (val) => {
        if (val !== state.currentName) {
          state.currentName = val          
        }
      },
      {
        immediate: true
      }
    )

    watch(
      () => state.inkW,
      () => {
        nextTick(() => {
          reflow()
        })
      }
    )

    watch(
      () => props.items,
      () => {
        nextTick(() => {
          reflow()
        })
      }
    )

    watch(currentIndex, () => {
      nextTick(() => {
        reflow()
      })
    })

    watch(scrollable, () => {
      state.tempKey = Date.now()
    })

    return {
      scrollerRef,
      innerRef,
      state,
      contentStyle,
      inkCls,
      inkStyle,
      scrollable,
      currentIndex,
      currentTab,
      itemCls,
      onScroll,
      onClickItem,
      reflow
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui.scss';

.v-tab-bar {
  position: relative;
  padding-left: $tab-offset;
  padding-right: $tab-offset;
  background-color: $tab-bg;
}

.v-tab-bar-inner {
  position: relative;
  width: 100%;
}

.v-tab-bar-list {
  display: flex;
  justify-content: space-between;
  min-width: 100%;
}

.v-tab-bar-item {
  flex: auto;
  flex-shrink: 0;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: $tab-text-color;
  font-size: $tab-font-size;
  font-weight: $tab-font-weight;
  min-height: $tab-height;
  padding: 0 $tab-item-gap;
  margin: 0 auto;
  box-sizing: border-box;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;

  &.is-active {
    color: $tab-active-color;
  }

  &.is-disabled {
    color: $tab-disabled-color;
  }
}

.v-tab-bar-ink {
  position: absolute;
  bottom: 0;
  left: 0;
  display: block;
  height: $tab-ink-height;
  background-color: $tab-active-color;
  transition: all 300ms;

  &.is-disabled {
    background-color: $tab-disabled-color;
  }
}

.v-tab-bar-start,
.v-tab-bar-end {
  position: absolute;
  top: 0;
  left: 0;
  width: 14px;
  height: $tab-height;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    position: absolute;
    left: -14px;
    top: 50%;
    width: 14px;

    @if unitless($tab-height) {
      margin-top: 1px * $tab-height * 0.4 * -1;
      height: 1px * $tab-height * 0.8;
    } @else {
      margin-top: $tab-height * 0.4 * -1;
      height: $tab-height * 0.8;
    }

    border-radius: 50%;
    box-shadow: -1px 0 12px 0 rgba(0, 0, 0, 0.2);
  }
}

.v-tab-bar-end {
  left: auto;
  right: 0;
  transform: rotate(180deg);
}

.v-tab-bar {
  .v-scroll-view {
    display: block;
  }

  .scroll-view-container {
    min-width: 100%;
  }
}
</style>
