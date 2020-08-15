<template>
  <span :class="$_cls">
    <template v-if="!isCapital">
      {{ doFormat(doPrecision(state.formatValue, $_legalPrecision, isRoundUp), hasSeparator, separator) }}
    </template>
    <template v-else>
      {{ doCapital(doPrecision(state.formatValue, 4, isRoundUp)) }}
    </template>
  </span>
</template>

<script>
import { reactive, onMounted, computed, watchEffect } from 'vue'
import useAnimate from '../../composables/useAnimate'
import useNumberCapital from '../../composables/useNumberCapital'
import { noop, isInBrowser, formatValueByGapStep } from '../../utils/index'

export default {
  name: 'v-amount',

  props: {
    // The number value
    value: {
      type: Number,
      default: 0
    },
    // The number precision
    precision: {
      type: Number,
      default: 2
    },
    // Whether the number should be round up
    isRoundUp: {
      type: Boolean,
      default: true
    },
    // Whether the thousand separator is existing
    hasSeparator: {
      type: Boolean,
      default: false
    },
    // The thousand separator
    separator: {
      type: String,
      default: ','
    },
    // Whether the number should be converted to Chinese capital
    isCapital: {
      type: Boolean,
      default: false
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
    // The animation duration (ms)
    duration: {
      type: Number,
      default: 1000
    }
  },

  setup(props) {
    const state = reactive({
      formatValue: 0, // The format value
      isMounted: false // Whether already mounted
    })

    onMounted(() => {
      state.isMounted = true
    })

    const $_cls = computed(() => {
      return ['v-amount', { 'numerical': !props.isCapital }]
    })

    // Calculate legal precision
    const $_legalPrecision = computed(() => {
      return props.precision > 0 ? props.precision : 0
    })

    const doPrecision = (value, precision, isRoundUp) => {
      const result = Number(`${value}e${precision}`)
      const rounded = isRoundUp ? Math.round(result) : Math.floor(result)
      return Number(`${rounded}e-${precision}`).toFixed(precision)
    }

    const doFormat = (value, hasSeparator, seperator) => {
      if (!hasSeparator) {
        return value
      }
      const arrNumber = value.split('.') || []
      const integerValue = arrNumber[0] || 0 // The integer part
      const decimalValue = arrNumber[1] || 0 // The decimal part
      const formatResult = formatValueByGapStep({
        step: 3,
        value: integerValue,
        gap: seperator,
        direction: 'right',
        range: 0,
        isAdd: 1,
        oldValue: ''
      })
      return decimalValue
        ? `${formatResult.value}.${decimalValue}`
        : `${formatResult.value}`
    }

    const doCapital = (value) => {
      return useNumberCapital(value)
    }

    const $_doAnimate = (fromValue = 0, toValue = 0) => {
      const step = (percent) => {
        if (percent === 1) {
          state.formatValue = toValue
          return
        }
        state.formatValue = fromValue + (toValue - fromValue) * percent
      }
      const verify = (id) => id
      const animate = useAnimate()
      animate.start(step, verify, noop, props.duration, null, null)
    }

    watchEffect(() => {
      if (!isInBrowser && !state.isMounted) {
        state.formatValue = props.value
        return
      }
      if (props.isAnimated) {
        $_doAnimate(0, props.value)
      } else {
        state.formatValue = props.value
      }
    })

    return {
      state,
      $_cls,
      $_legalPrecision,
      doPrecision,
      doFormat,
      doCapital
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui.scss';

.v-amount {
  &.numerical {
    font-family: $font-family-number;
  }
}
</style>
