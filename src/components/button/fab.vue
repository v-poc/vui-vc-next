<template>
  <div
    :class="containerCls"
    :style="containerStyle"
    @click="onBtnClick"
  >
    <slot>
      <v-button
        class="v-fab-btn"
        type="primary"
        icon="arrow-up"
        size="small"
        inline
        round
      ></v-button>      
    </slot>
  </div>
</template>

<script>
import { computed, reactive, ref, onMounted, onUnmounted } from 'vue'
import VButton from './index.vue'
import useEventListener from '../../composables/useEventListener'

export default {
  name: 'v-fab',

  components: {
    // VIcon,
    VButton
  },

  props: {
    right: {
      type: Number,
      default: 10
    },

    bottom: {
      type: Number,
      default: 20
    },
    
    zIndex: {
      type: Number,
      default: 1000
    },

    distance: {
      type: Number,
      default: 200
    },
    
    elId: {
      type: String,
      default: ''
    }
  },

  setup(props, { emit }) {
    let scrollEl = window

    const elId = ref(props.elId)

    const state = reactive({
      isShow: false
    })

    const containerCls = computed(() => {
      return [
        'v-fab',
        {
          'show-fab': state.isShow
        }
      ]
    })

    const containerStyle = computed(() => {
      return {
        'right': `${props.right}px`,
        'bottom': `${props.bottom}px`,
        'z-index': `${props.zIndex}px`
      }
    })

    const onBtnClick = () => {
      if (scrollEl === window) {
        window.scrollTo(0, 0)
      } else if (scrollEl instanceof HTMLElement) {
        scrollEl.scrollTop = 0
      }
      emit('on-click')
    }

    const checkScrollPos = () => {
      let scrollTop
      if (scrollEl === window) {
        scrollTop = scrollEl.pageYOffset || 0      
      } else if (scrollEl instanceof HTMLElement) {
        scrollTop = scrollEl.scrollTop || 0
      }
      state.isShow = scrollTop >= props.distance
    }

    const init = () => {      
      if (elId.value && el) {
        const el = document.querySelector(`#${elId.value}`)
        scrollEl = el
        el.style.scrollBehavior = 'smooth'
      }

      checkScrollPos()

      useEventListener({
        isBind: true,
        node: scrollEl,
        name: 'scroll',
        handler: checkScrollPos
      })()
    }

    onMounted(() => {
      init()
    })

    onUnmounted(() => {
      useEventListener({
        isBind: false,
        node: scrollEl,
        name: 'scroll',
        handler: checkScrollPos
      })()
    })

    return {
      containerCls,
      containerStyle,
      onBtnClick
    }
  }
}
</script>

<style lang="scss">
.v-fab {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 101;

  &.show-fab {
    display: block;
    min-width: 80px;
    min-height: 80px;
    display: flex;
    flex-direction: column;   
    justify-content: center;
    align-items: center;
  }

  &.show-fab :active {
    background: rgba(0, 0, 0, 0.1);
  }

  &-icon {
    transition: all 300ms ease-in-out;
  }

  &-btn.v-button.inline.small {
    padding: 0 10px;

    .v-button-content {
      padding: 0;
    }    
  }  
}
</style>
