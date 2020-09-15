<template>
  <div class="v-activity-indicator-rolling">
    <div class="rolling-container">
      <svg
        class="v-activity-indicator-svg rolling"
        preserveAspectRatio="xMidYMid"
        :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
        :style="style"
      >
        <circle
          fill="none"
          :stroke="borderColor"
          :stroke-width="strokeWidth"
          :cx="viewBoxSize/2"
          :cy="viewBoxSize/2"
          :r="radius"
        ></circle>
        <g
          v-if="!circle"
          class="circle"
        >
          <circle
            v-if="isAutoAnimation || process > 0"
            class="stroke"
            :cx="viewBoxSize/2"
            :cy="viewBoxSize/2"
            :fill="fill"
            :r="radius"
            :stroke="color"
            :stroke-width="strokeWidth"
            :stroke-dasharray="isAutoAnimation ? `${110 * circlePerimeter / 125}` : strokeDasharray"
            :stroke-linecap="linecap"
          >
            <animate
              v-if="isAutoAnimation"
              attributeName="stroke-dashoffset"
              dur="2.2s"
              keyTimes="0;1"
              calcMode="spline"
              fill="freeze"
              keySplines="0.41,0.314,0.8,0.54"
              repeatCount="indefinite"
              begin="0"
              :values="`${360 * circlePerimeter / 125};${140 * circlePerimeter / 125}`"
            ></animate>
            <animateTransform
              v-if="isAutoAnimation"
              attributeName="transform"
              type="rotate"
              calcMode="linear"
              keyTimes="0;1"
              begin="0"
              repeatCount="indefinite"
              :dur="`${duration}s`"
              :values="`0 ${viewBoxSize/2} ${viewBoxSize/2};360 ${viewBoxSize/2} ${viewBoxSize/2}`"
            ></animateTransform>
          </circle>
        </g>
        <slot
          v-else
          name="circle"
        ></slot>
        <slot name="rollerDefs"></slot>
      </svg>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'v-activity-indicator-roller',

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
    process: {
      type: Number,
      default: -1
    },
    duration: {
      type: Number,
      default: 2
    }
  },

  setup(props, { slots }) {
    const id = computed(
      () => `v-activity-indicator-roller-keyframes-${props.size}`
    )

    const strokeWidth = computed(() => props.width || props.size / 12)

    const strokeDasharray = computed(
      () =>
        `${props.process * circlePerimeter.value} ${
          (1 - props.process) * circlePerimeter.value
        }`
    )

    const radius = computed(() => props.size / 2)

    const viewBoxSize = computed(() => props.size + 2 * strokeWidth.value)

    const circlePerimeter = computed(() => props.size * 3.1415)

    const isAutoAnimation = computed(() => props.process === -1)

    const style = computed(() => {
      return {
        width: `${props.size}px`,
        height: `${props.size}px`,
        transform: `rotateZ(${props.rotate}deg)`
      }
    })

    const circle = computed(() => slots.circle)

    return {
      id,
      strokeWidth,
      strokeDasharray,
      radius,
      viewBoxSize,
      circlePerimeter,
      isAutoAnimation,
      style,
      circle
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui.scss';

.v-activity-indicator-rolling {
  @include clearfix();

  .rolling-container {
    position: relative;
    float: left;
  }

  .rolling {
    float: left;

    circle.stroke {
      will-change: auto;
    }
  }

  .content {
    position: absolute;
    @include absolute-pos();
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
