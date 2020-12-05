<template>
  <div
    ref="root"
    v-show="state.isPopupShow"
    :class="cls"
  >
    <transition name="v-mask-fade">
      <div
        v-show="hasMask && state.isPopupBoxShow"
        class="v-popup-mask"
        @click="onPopupMaskClick"
      ></div>
    </transition>
    <transition
      :name="state.transition"
      @before-enter="onPopupTransitionStart"
      @before-leave="onPopupTransitionStart"
      @after-enter="onPopupTransitionEnd"
      @after-leave="onPopupTransitionEnd"
    >
      <div
        v-show="state.isPopupBoxShow"
        :class="popupBoxCls"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed, reactive, ref, watch, onMounted } from 'vue'
import usePopupBase from '../../composables/usePopupBase'
import useTransition from '../../composables/useTransition'
import useEventListener from '../../composables/useEventListener'

export default {
  name: 'v-popup',

  props: {
    // Merge base props
    ...usePopupBase(),
    // The position of popup
    position: {
      type: String,
      default: 'center'
    },
    // Whether prevent scroll
    preventScroll: {
      type: Boolean,
      default: false
    },
    // The elements excluded when preventing scroll
    preventScrollExclude: {
      type: [String, Function],
      default() {
        return ''
      }
    }
  },

  setup(props, { emit }) {
    const root = ref()
    const state = reactive({
      // take effect on mask and popup box
      isPopupShow: false,
      // take effect on popup box only
      isPopupBoxShow: false,
      // whether display animation effect
      isAnimation: false,
      // The animation effect of popup
      transition: props.transition || useTransition(props.position)
    })

    const cls = computed(() => {
      return [
        'v-popup',
        {
          'with-mask': props.hasMask,
          'large-radius': props.largeRadius
        },
        props.position
      ]
    })

    const popupBoxCls = computed(() => {
      return ['v-popup-box', state.transition]
    })

    const showPopupBox = () => {
      state.isAnimation = true
      state.isPopupShow = true
      state.isPopupBoxShow = true

      props.preventScroll && preventScroll(true)
    }

    const hidePopupBox = () => {
      state.isAnimation = true
      state.isPopupBoxShow = false
      props.preventScroll && preventScroll(false)
      // emit('input', false)
      emit('update:value', false)
    }

    const preventScroll = (isBind) => {
      ;[
        root.value.querySelector('.v-popup-mask'),
        root.value.querySelector('.v-popup-box')
      ].forEach((node) => {
        useEventListener({
          isBind,
          node,
          name: 'touchmove',
          handler: preventDefault
        })()
      })

      preventScrollExclude(isBind)
    }

    const preventScrollExclude = (isBind, preventScrollExclude) => {
      preventScrollExclude = preventScrollExclude || props.preventScrollExclude
      const excluder =
        preventScrollExclude && typeof preventScrollExclude === 'string'
          ? root.value.querySelector(preventScrollExclude)
          : preventScrollExclude

      useEventListener({
        isBind,
        node: excluder,
        name: 'touchmove',
        handler: stopImmediatePropagation
      })()
    }

    const preventDefault = (event) => {
      event.preventDefault()
    }

    const stopImmediatePropagation = (event) => {
      event.stopImmediatePropagation()
    }

    const onPopupMaskClick = () => {
      if (props.maskClosable) {
        hidePopupBox()
        emit('mask-click')
      }
    }

    const onPopupTransitionStart = () => {
      emit(state.isPopupBoxShow ? 'before-show' : 'before-hide')
    }

    const onPopupTransitionEnd = () => {
      if (!state.isAnimation) {
        return
      }

      if (state.isPopupBoxShow) {
        emit('show')
      } else {
        state.isPopupShow = false
        emit('hide')
      }

      state.isAnimation = false
    }

    onMounted(() => {
      props.value && showPopupBox()
    })

    watch(
      () => props.value,
      (val) => {
        if (val) {
          if (state.isAnimation) {
            setTimeout(showPopupBox, 50)
          } else {
            showPopupBox()
          }
        } else {
          hidePopupBox()
        }
      }
    )

    watch(
      () => props.preventScrollExclude,
      (val, oldVal) => {
        preventScrollExclude(false, oldVal) // remove old listener first
        preventScrollExclude(true, val) // add new listener later
      }
    )

    return {
      root,
      state,
      cls,
      popupBoxCls,
      onPopupMaskClick,
      onPopupTransitionStart,
      onPopupTransitionEnd
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui.scss';

.v-popup {
  @include absolute-pos();
  position: fixed;
  display: flex;
  pointer-events: none;
  z-index: $popup-zindex;
  &.center {
    align-items: center;
    justify-content: center;
  }
  &.top {
    flex-direction: column;
    justify-content: flex-start;
    .v-popup-box {
      width: 100%;
    }
  }
  &.bottom {
    flex-direction: column;
    justify-content: flex-end;
    .v-popup-box {
      width: 100%;
    }
  }
  &.left {
    justify-content: flex-start;
    .v-popup-box {
      height: 100%;
    }
  }
  &.right {
    justify-content: flex-end;
    .v-popup-box {
      height: 100%;
    }
  }
  &.inner-popup .v-popup-box {
    background-color: $color-bg-inverse;
    border-radius: $popup-title-bar-radius $popup-title-bar-radius 0 0;
  }
  &.large-radius.inner-popup .v-popup-box {
    border-radius: $popup-title-bar-radius-large $popup-title-bar-radius-large 0
      0;
  }
}

.v-popup-mask {
  @include absolute-pos();
  position: absolute;
  pointer-events: auto;
  z-index: 1;
  background-color: $popup-mask-bg;
}

.v-popup-box {
  position: relative;
  pointer-events: auto;
  z-index: 2;
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
}

.v-mask-fade {
  &-enter,
  &-leave-to {
    opacity: 0.01;
  }
  &-enter-active,
  &-leave-active {
    transition: opacity 250ms;
  }
}
</style>
