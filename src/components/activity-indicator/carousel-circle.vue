<template>
  <div class="v-activity-indicator-carousel">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="v-activity-indicator-svg carouseling"
      :viewBox="viewBox"
      :fill="color"
      :style="containerStyle"
    >
      <template
        v-for="(value, index) in state.circleAnimateValues"
        :key="`carousel-circle-${index}`"
      >
        <circle
          :cx="getCx(index)"
          :cy="size/2"
          :r="size/2"
        >
          <animate
            attributeName="fill-opacity"
            attributeType="XML"
            begin="0s"
            dur="1s"
            calcMode="linear"
            repeatCount="indefinite"
            :values="opacityValues(value)"
          />
          <animate
            attributeName="r"
            attributeType="XML"
            begin="0s"
            dur="1s"
            calcMode="linear"
            repeatCount="indefinite"
            :values="sizeValues(value)"
          />
        </circle>
      </template>
    </svg>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'

export default {
  name: 'v-activity-indicator-carousel-circle',

  props: {
    size: {
      type: Number,
      default: 30
    },
    color: {
      type: String,
      default: '#2F86F6'
    }
  },

  setup(props) {
    const state = reactive({
      circleAnimateValues: [
        [1, 0.8, 0.6, 0.6, 0.6, 0.8, 1],
        [0.6, 0.8, 1, 0.8, 0.6, 0.6, 0.6],
        [0.6, 0.6, 0.6, 0.8, 1, 0.8, 0.6]
      ]
    })

    const viewWidth = computed(() => {
      const size = props.size
      const len = state.circleAnimateValues.length
      return len * size + ((len - 1) * size) / 2
    })

    const viewBox = computed(() => `0 0 ${viewWidth.value} ${props.size}`)

    const containerStyle = computed(() => {
      return {
        width: `${viewWidth.value}px`,
        height: `${props.size}px`
      }
    })

    const getCx = (index) => index * props.size * 1.5 + props.size / 2

    const opacityValues = (animateValues) => animateValues.join(';')

    const sizeValues = (animateValues) =>
      animateValues.map((val) => (val * props.size) / 2).join(';')

    return {
      state,
      viewWidth,
      viewBox,
      containerStyle,
      getCx,
      opacityValues,
      sizeValues
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui-utils.scss';

.v-activity-indicator-carousel {
  @include clearfix();

  .carouseling {
    float: left;
    overflow: visible;
  }
}
</style>
