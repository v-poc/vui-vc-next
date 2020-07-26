<template>
  <div v-show="state.isPopupShow" ref="root" :class="$_cls">
    <div
      v-show="hasMask && state.isPopupBoxShow"
      ref="popupMask"
      class="v-popup-mask"
      @click="$_onPopupMaskClick"
    ></div>
    <transition
      :name="state.transition"
      @before-enter="$_onPopupTransitionStart"
      @before-leave="$_onPopupTransitionStart"
      @after-enter="$_onPopupTransitionEnd"
      @after-leave="$_onPopupTransitionEnd"
    >
      <div v-show="state.isPopupBoxShow" ref="popupBox" class="v-popup-box">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  reactive,
  ref,
  watchEffect,
  onMounted
} from 'vue'
import usePopupBase from '../../composables/usePopupBase'
import useTransition from '../../composables/useTransition'

export default defineComponent({
  name: 'v-popup',

  props: {
    // merge base props
    ...usePopupBase(),
    // The position of popup
    position: {
      type: String,
      default: 'center'
    },
    // The animation effect of popup
    transition: {
      type: String,
      default: ''
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
    const root = ref(null)
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

    const $_cls = computed(() => {
      return [
        'v-popup',
        { 'with-mask': props.hasMask },
        { 'large-radius': props.largeRadius },
        props.position
      ]
    })

    const $_showPopupBox = () => {
      state.isAnimation = true
      state.isPopupShow = true
      state.isPopupBoxShow = true

      props.preventScroll && $_preventScroll(true)
    }

    const $_hidePopupBox = () => {
      state.isAnimation = true
      state.isPopupBoxShow = false
      props.preventScroll && $_preventScroll(false)
      emit('input', false)
    }

    const $_preventScroll = (isBind) => {
      const handler = `${isBind ? 'add' : 'remove'}EventListener`
      const popupMask = ref('popupMask')
      const popupBox = ref('popupBox')

      popupMask && popupMask[handler]('touchmove', $_preventDefault, false)
      popupBox && popupBox[handler]('touchmove', $_preventDefault, false)
      $_preventScrollExclude(isBind)
    }

    const $_preventScrollExclude = (isBind, preventScrollExclude) => {
      const handler = `${isBind ? 'add' : 'remove'}EventListener`
      preventScrollExclude = preventScrollExclude || props.preventScrollExclude
      const excluder =
        preventScrollExclude && typeof preventScrollExclude === 'string'
          ? root.value.querySelector(preventScrollExclude)
          : preventScrollExclude
      excluder &&
        excluder[handler]('touchmove', $_stopImmediatePropagation, false)
    }

    const $_preventDefault = (event) => {
      event.preventDefault()
    }

    const $_stopImmediatePropagation = (event) => {
      event.stopImmediatePropagation()
    }

    const $_onPopupMaskClick = () => {
      if (props.maskClosable) {
        $_hidePopupBox()
        emit('maskClick')
      }
    }

    const $_onPopupTransitionStart = () => {
      emit(state.isPopupBoxShow ? 'before-show' : 'before-hide')
    }

    const $_onPopupTransitionEnd = () => {
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
      props.value && $_showPopupBox()
    })

    watchEffect(() => {
      if (props.value) {
        if (state.isAnimation) {
          setTimeout($_showPopupBox, 50)
        } else {
          $_showPopupBox()
        }
      } else {
        $_hidePopupBox()
      }

      const val = props.preventScrollExclude
      $_preventScrollExclude(false, val) // remove old listener first
      $_preventScrollExclude(true, val) // add new listener later
    })

    return {
      root,
      state,
      $_cls,
      $_onPopupMaskClick,
      $_onPopupTransitionStart,
      $_onPopupTransitionEnd
    }
  }
})
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
