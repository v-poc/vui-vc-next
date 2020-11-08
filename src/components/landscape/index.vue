<template>
  <div :class="cls">
    <v-popup
      v-model:value="popupShow.landscape"
      :has-mask="!fullscreen && hasMask"
      :mask-closable="maskClosable"
      :transition="effect"
      prevent-scroll
      prevent-scroll-exclude=".v-landscape-content"
      @update:value="onUpdate"
      @show="onShow"
      @hide="onHide"
      @mask-click="onMaskClick"
    >
      <div :class="bodyCls">
        <div class="v-landscape-content">
          <slot></slot>
        </div>
        <v-icon
          v-if="showClose"
          :class="btnCls"
          :name="iconName"
          @click="close"
        ></v-icon>
      </div>
    </v-popup>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import VPopup from '../popup/index.vue'
import VIcon from '../icon/index.vue'
import usePopupBase from '/@composables/usePopupBase'

export default {
  name: 'v-landscape',

  components: {
    VPopup,
    VIcon
  },

  props: {
    // Merge base props
    ...usePopupBase(),
    // Whether scroll enabled
    scroll: {
      type: Boolean,
      default: false
    },
    // Whether fullscreen
    fullscreen: {
      type: Boolean,
      default: false
    },
    // Whether show close button
    showClose: {
      type: Boolean,
      default: true
    },
    // Whether click upon mask to close popup
    maskClosable: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const popupShow = ref({})

    const effect = computed(() => {
      let effect = 'v-bounce'
      if (props.transition) {
        effect = props.transition
      } else {
        effect = props.fullscreen ? 'v-fade' : 'v-punch'
      }
      return effect
    })

    const iconName = computed(() => {
      return props.fullscreen ? 'clear' : 'close'
    })

    const cls = computed(() => {
      return [
        'v-landscape',
        {
          'is-full': props.fullscreen
        }
      ]
    })

    const bodyCls = computed(() => {
      return [
        'v-landscape-body',
        {
          scroll: props.scroll
        }
      ]
    })

    const btnCls = computed(() => {
      return [
        'v-landscape-close',
        {
          dark: !props.hasMask || props.fullscreen
        }
      ]
    })

    // show/hide popup
    const showPopup = (type, isShow) => {
      popupShow.value[type] = isShow
    }

    // update:value
    const onUpdate = () => {
      // showPopup('landscape', val)
      // emit('input', false)
      emit('update:value', false)
    }

    // show popup event
    const onShow = () => {
      emit('show')
    }

    // hide popup event
    const onHide = () => {
      emit('hide')
    }

    // click upon mask
    const onMaskClick = () => {
      emit('mask-click')
    }

    // close popup
    const close = () => {
      showPopup('landscape', false)
    }

    watchEffect(() => {
      showPopup('landscape', props.value)
    })

    return {
      popupShow: popupShow.value,
      effect,
      iconName,
      cls,
      bodyCls,
      btnCls,
      showPopup,
      onUpdate,
      onShow,
      onHide,
      onMaskClick,
      close
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui.scss';

.v-landscape {
  &.is-full {
    .v-popup-box {
      position: absolute;
      @include absolute-pos();
    }

    .v-landscape-body {
      width: 100%;
      height: 100%;
      background: $landscape-fullscreen-bg;
    }

    .v-landscape-content {
      width: 100%;
      height: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    .v-icon.v-landscape-close {
      position: absolute;
      right: 0.25rem;
      top: 0.25rem;
      margin: auto;
    }
  }

  .v-popup,
  .v-popup-box {
    z-index: $landscape-zindex;
  }

  .v-icon.v-landscape-close {
    position: relative;
    display: block;
    margin: 0.5rem auto 0.2rem auto;
    font-size: 0.5rem;
    width: 0.5rem;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    color: $color-text-base-inverse;

    &.dark {
      color: $color-text-base;
      opacity: 0.5;
    }
  }
}

.v-landscape-content {
  width: $landscape-width;
  font-size: $font-body-large;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;

  img {
    max-width: 100%;
    height: auto;
  }
}
</style>
