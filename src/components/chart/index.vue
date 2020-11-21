<template>
  <svg
    class="v-chart"
    :viewBox="`0 0 ${width} ${height}`"
  >
    <defs>
      <linearGradient
        v-for="color in colors"
        :key="color"
        :id="`path-fill-gradient-${color}`"
        x1="0"
        x2="0"
        y1="0"
        y2="1"
      >
        <stop
          offset="0%"
          stop-opacity="0.4"
          :style="stopStyle(color)"
        ></stop>
        <stop
          offset="50%"
          stop-opacity="0.3"
          :style="stopStyle(color)"
        ></stop>
        <stop
          offset="100%"
          stop-opacity="0.1"
          :style="stopStyle(color)"
        ></stop>
      </linearGradient>
    </defs>
    <g
      class="v-chart-graph"
      :transform="`translate(${offset.left}, ${offset.top})`"
    >
      <g class="v-chart-axis-y">
        <g
          v-for="(item, index) in yAxis"
          :key="`y-axis-${index}`"
          :transform="`translate(0, ${item.offset})`"
        >
          <line
            x1="0"
            :x2="innerWidth"
            y1="0"
            y2="0"
          ></line>
          <text
            x="0"
            y="0"
            dx="-0.5em"
            dy="-0.32em"
          >{{ item.label }}</text>
        </g>
      </g>
      <g
        class="v-chart-axis-x"
        :transform="`translate(0, ${innerHeight})`"
      >
        <g
          v-for="(item, index) in xAxis"
          :key="`x-axis-${index}`"
          :transform="`translate(${item.offset}, 0)`"
        >
          <line
            x1="0"
            x2="0"
            y1="0"
            y2="6"
          ></line>
          <text
            x="0"
            y="0"
            dy="2em"
          >{{ item.label }}</text>
        </g>
      </g>
      <g class="v-chart-paths">
        <template
          v-for="(path, index) in paths"
          :key="`${path.area ? 'area' : 'line'}-${index}`"
        >
          <path
            class="v-chart-path"
            :style="path.style"
            :d="path.value"
          ></path>
          <path
            v-if="path.area"
            class="v-chart-path-area"
            :style="path.area.style"
            :d="path.area.value"
          ></path>
        </template>
      </g>
    </g>
  </svg>
</template>

<script>
import { computed, reactive, onMounted, onUnmounted } from 'vue'
import useEventListener from '../../composables/useEventListener'

export default {
  name: 'v-chart',

  props: {
    // The labels of X-Axis
    labels: {
      type: Array,
      default: () => []
    },
    // The chart data
    datasets: {
      type: Array,
      default: () => []
    },
    // The size of chart
    size: {
      type: Array,
      default: () => [480, 320]
    },
    // The maximum in Y-Axis
    max: {
      type: Number,
      default: 0
    },
    // The minimum in Y-Axis
    min: {
      type: Number,
      default: 0
    },
    // The number of lines in Y-Axis
    lines: {
      type: Number,
      default: 5
    },
    // The decreasing step in Y-Axis
    step: {
      type: Number,
      default: 0
    },
    // The shift in Y-Axis
    shift: {
      type: Number,
      default: 0.6
    },
    // The labels formatting function in Y-Axis
    format: {
      type: Function,
      default: (val) => val
    }
  },

  setup(props) {
    const useMax = () => {
      let max = Math.max.apply(
        Math,
        props.datasets.map((data) => Math.max.apply(Math, data.values))
      )
      let multiply = 1
      while (max > 10) {
        multiply *= 10
        max /= 10
      }
      max = Math.ceil(max) * multiply
      return max
    }

    const useMin = () => {
      let min = Math.min.apply(
        Math,
        props.datasets.map((data) => Math.min.apply(Math, data.values))
      )
      let multiply = 1
      while (min > 10) {
        multiply *= 10
        min /= 10
      }
      min = Math.floor(min) * multiply
      return min
    }

    const useStep = () => (useMax() - useMin()) / props.lines

    const state = reactive({
      unit: 16,
      max: props.max || useMax(),
      min: props.min || useMin(),
      step: props.step || useStep()
    })

    const stopStyle = (color) => `stop-color: ${color}`

    const offset = computed(() => {
      return {
        top: 0.2 * state.unit,
        bottom: 0.5 * state.unit,
        left: props.shift * state.unit,
        right: 0.2 * state.unit
      }
    })

    const width = computed(() => {
      if (
        typeof props.size[0] === 'string' &&
        props.size[0].indexOf('rem') !== -1
      ) {
        return parseFloat(props.size[0]) * state.unit
      } else {
        return parseFloat(props.size[0])
      }
    })

    const height = computed(() => {
      if (
        typeof props.size[1] === 'string' &&
        props.size[1].indexOf('rem') !== -1
      ) {
        return parseFloat(props.size[1]) * state.unit
      } else {
        return parseFloat(props.size[1])
      }
    })

    const innerWidth = computed(
      () => width.value - offset.value.left - offset.value.right
    )

    const innerHeight = computed(
      () => height.value - offset.value.top - offset.value.bottom
    )

    const xAxis = computed(() => {
      const deltaX = innerWidth.value / (props.labels.length - 1)
      const items = props.labels.map((label, index) => {
        return {
          offset: index * deltaX,
          label: label
        }
      })
      return items
    })

    const yAxis = computed(() => {
      const items = []
      const deltaY = innerHeight.value / props.lines

      for (let i = 0; i < props.lines; i++) {
        items.push({
          offset: i * deltaY,
          label: props.format(state.max - i * state.step)
        })
      }

      items.push({
        offset: innerHeight.value,
        label: props.format(state.min)
      })
      return items
    })

    const lower = computed(() => state.max - (props.lines - 1) * state.step)

    const paths = computed(() => {
      return props.datasets.map((data) => {
        const deltaX = innerWidth.value / (data.values.length - 1)
        const deltaY = innerHeight.value / props.lines
        const points = data.values.map((value, index) => {
          if (value < lower.value) {
            return {
              x: index * deltaX,
              y:
                innerHeight.value -
                (1 - (lower.value - value) / (lower.value - state.min)) * deltaY
            }
          } else {
            return {
              x: index * deltaX,
              y:
                (1 - (value - lower.value) / (state.max - lower.value)) *
                (innerHeight.value - deltaY)
            }
          }
        })

        const ret = {
          style: {
            fill: 'none',
            stroke: data.color || '#fa8919',
            strokeWidth: data.width || 1
          }
        }

        if (data.theme === 'heat') {
          ret.style.stroke = `url(#path-fill-gradient-${data.color})`
        } else if (data.theme === 'region') {
          ret.area = {
            value:
              `M0,${innerHeight.value} ` +
              points.map((point) => `L${point.x},${point.y}`).join(' ') +
              ` L${points[points.length - 1].x},${innerHeight.value}`,
            style: {
              fill: `url(#path-fill-gradient-${data.color})`,
              stroke: 'none'
            }
          }
        }

        ret.value =
          `M0,${points.shift().y} ` +
          points.map((point) => `L${point.x},${point.y}`).join(' ')
        return ret
      })
    })

    const colors = computed(() => {
      const uniqueColors = []
      props.datasets.map((data) => {
        if (data.color && uniqueColors.indexOf(data.color) === -1) {
          uniqueColors.push(data.color)
        }
      })
      return uniqueColors
    })

    const resize = () => {
      state.unit = parseFloat(
        window
          .getComputedStyle(document.getElementsByTagName('html')[0])
          .getPropertyValue('font-size')
      )
    }

    onMounted(() => {
      if (document.readyState !== 'loading') {
        resize()
      }

      useEventListener({
        isBind: true,
        node: document,
        name: 'DOMContentLoaded',
        handler: resize
      })()

      useEventListener({
        isBind: true,
        node: window,
        name: 'resize',
        handler: resize
      })()
    })

    onUnmounted(() => {
      useEventListener({
        isBind: false,
        node: document,
        name: 'DOMContentLoaded',
        handler: resize
      })()

      useEventListener({
        isBind: false,
        node: window,
        name: 'resize',
        handler: resize
      })()
    })

    return {
      state,
      stopStyle,
      offset,
      width,
      height,
      innerWidth,
      innerHeight,
      xAxis,
      yAxis,
      paths,
      colors
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui.scss';

.v-chart {
  line {
    stroke: $chart-line-color;
    stroke-width: 0.5;
    stroke-linecap: square;
  }

  path {
    stroke: $chart-path-color;
    stroke-width: 1;
    stroke-linecap: butt;
  }
}

.v-chart-axis-y {
  text {
    fill: $chart-text-color;
    font-size: $chart-value-size;
    text-anchor: end;
  }
}

.v-chart-axis-x {
  text {
    fill: $chart-text-color;
    font-size: $chart-label-size;
    text-anchor: middle;
  }
}
</style>
