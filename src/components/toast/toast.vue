<template>
  <div
    :class="cls"
  >
    <v-popup
      :value="value || state.visible"
      :hasMask="hasMask"
      :maskClosable="false"
      @show="onShow"
      @hide="onHide"
    >
      <div class="v-toast-content" v-if="content || icon">
        <v-icon
          v-if="icon"
          :name="icon"
          :svg="iconSvg"
          size="lg"
        ></v-icon>
        <div
          class="v-toast-text"
          v-if="content"
        >{{ content }}</div>
      </div>
      <div class="v-toast-content" v-else>
        <slot></slot>
      </div>
    </v-popup>
  </div>
</template>

<script>
import { reactive, ref, computed, onUnmounted } from 'vue'
import VPopup from '../popup/index.vue'
import VIcon from '../icon/index.vue'

export default {
  name: 'v-toast',

  components: {
    VPopup,
    VIcon
  },

  props: {
    // Whether display toast
    value: {
      type: Boolean,
      default: false
    },
    // The icon name
    icon: {
      type: String,
      default: ''
    },
    // Whether use SVG icon
    iconSvg: {
      type: Boolean,
      default: false
    },
    // The content of message
    content: {
      type: String,
      default: ''
    },
    // The toast will be closed in milliseconds
    // if set duration as `0`, the toast will always be visible
    duration: {
      type: Number,
      default: 3000
    },
    // The display position
    position: {
      type: String,
      default: 'center'
    },
    // Whether display a transparent mask
    hasMask: {
      type: Boolean,
      default: false
    },
    // The parent node of toast
    parentNode: {
      type: HTMLElement,
      default() {
        return document.body
      }
    }
  },

  setup(props, { emit }) {
    let timer
    const state = reactive({
      visible: false // Whether display
    })

    const cls = computed(() => {
      return [
        'v-toast',
        props.position
      ]
    })

    const onShow = () => {
      emit('show')
    }

    const onHide = () => {
      emit('hide')
    }

    const show = () => {
      state.visible = true
      timer && clearTimeout(timer)
      if (props.duration) {
        timer = setTimeout(hide, props.duration)
      }
    }

    const hide = () => {
      state.visible = false
    }
    
    onUnmounted(() => {
      timer && clearTimeout(timer)
    })

    return {
      state,
      cls,
      onShow,
      onHide,
      show,
      hide
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui.scss';

.v-toast {
  .v-popup {
    z-index: $toast-zindex;
  }
  .v-icon {
    flex-shrink: 0;
    color: $toast-color;
  }
  .v-icon + .v-toast-text {
    margin-left: $h-gap-xs;
  }
  .v-popup {
    .v-popup-box {
      width: 5.4rem;
      display: flex;
      justify-content: center;
    }
    .v-popup-mask {
      background: transparent;
    }
  }
  &.bottom {
    .v-popup .v-popup-box {
      position: absolute;
      bottom: 0.5rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &.top {
    .v-popup .v-popup-box {
      position: absolute;
      top: 0.5rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}

.v-toast-content {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-width: 0.8rem;
  padding: $toast-padding;
  border-radius: $toast-radius;
  font-size: $toast-font-size;
  text-align: left;
  line-height: 1.4;
  color: $toast-color;
  background-color: $toast-fill;
  box-sizing: border-box;
  overflow: hidden;
}

.v-toast-text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
