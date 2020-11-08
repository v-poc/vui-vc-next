<template>
  <v-activity-indicator-roller
    class="v-progress"
    :process="state.formatValue"
    :size="size"
    :width="width"
    :color="color"
    :border-color="borderColor"
    :fill="fill"
    :linecap="linecap"
    :rotate="rotate"
  >
    <slot></slot>
    <template #rollerDefs>
      <slot name="circularDefs"></slot>
    </template>
  </v-activity-indicator-roller>
</template>

<script>
import { reactive, onMounted, watch } from 'vue'
import VActivityIndicatorRoller from '../activity-indicator/roller.vue'
import useAnimate from '/@composables/useAnimate'
import { noop, isInBrowser } from '/@utils/index'

export default {
  name: 'v-progress-circular',

  components: {
    VActivityIndicatorRoller
  },

  props: {
    size: {
      type: Number,
      default: 70
    },
    width: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: '#2F86F6'
    },
    borderColor: {
      type: String,
      default: 'rgba(0, 0, 0, .1)'
    },
    fill: {
      type: String,
      default: 'transparent'
    },
    linecap: {
      type: String,
      default: 'round'
    },
    rotate: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    },
    // Whether show animation when value changes
    isAnimated: {
      type: Boolean,
      default: false
    },
    // deprecated
    /* transition: {
      type: Boolean,
      default: false
    }, */
    duration: {
      type: Number,
      default: 1000
    }
  },

  setup(props) {
    const state = reactive({
      formatValue: 0,
      isMounted: false
    })

    onMounted(() => {
      state.isMounted = true
    })

    const doAnimate = (fromValue = 0, toValue = 0) => {
      const step = (percent) => {
        state.formatValue = fromValue + (toValue - fromValue) * percent
      }

      const verify = (id) => id
      const animate = useAnimate()
      animate.start(step, verify, noop, props.duration, null, null)
    }

    watch(
      () => props.value,
      (val, oldVal) => {
        if ((!isInBrowser && !state.isMounted) || !props.isAnimated) {
          state.formatValue = val
          return
        }
        doAnimate(oldVal, val)
      },
      {
        immediate: true
      }
    )

    return {
      state
    }
  }
}
</script>

<style lang="scss">
</style>
