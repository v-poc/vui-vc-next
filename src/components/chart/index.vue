<template>
  <svg
    class="v-chart"
    :viewBox="`0 0 ${$_width} ${$_height}`"
  >
    <defs>
      <linearGradient
        v-for="color in $_colors"
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
          :style="$_stopStyle(color)"
        ></stop>
        <stop
          offset="50%"
          stop-opacity="0.3"
          :style="$_stopStyle(color)"
        ></stop>
        <stop
          offset="100%"
          stop-opacity="0.1"
          :style="$_stopStyle(color)"
        ></stop>
      </linearGradient>
    </defs>
    <g
      class="v-chart-graph"
      :transform="`translate(${$_offset.left}, ${$_offset.top})`"
    >
      <g class="v-chart-axis-y">
        <g
          v-for="(item, index) in $_yAxis"
          :key="`y-axis-${index}`"
          :transform="`translate(0, ${item.offset})`"
        >
          <line
            x1="0"
            :x2="$_innerWidth"
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
        :transform="`translate(0, ${$_innerHeight})`"
      >
        <g
          v-for="(item, index) in $_xAxis"
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
          v-for="(path, index) in $_paths"
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
    labels: {
      type: Array,
      default: () => []
    },
    datasets: {
      type: Array,
      default: () => []
    },
    size: {
      type: Array,
      default: () => [480, 320]
    },
    max: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    lines: {
      type: Number,
      default: 5
    },
    step: {
      type: Number,
      default: 0
    },
    shift: {
      type: Number,
      default: 0.6
    },
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

    const $_stopStyle = (color) => `stop-color: ${color}`

    const $_offset = computed(() => {
      return {
        top: 0.2 * state.unit,
        bottom: 0.5 * state.unit,
        left: props.shift * state.unit,
        right: 0.2 * state.unit
      }
    })

    const $_width = computed(() => {
      if (
        typeof props.size[0] === 'string' &&
        props.size[0].indexOf('rem') !== -1
      ) {
        return parseFloat(props.size[0]) * state.unit
      } else {
        return parseFloat(props.size[0])
      }
    })

    const $_height = computed(() => {
      if (
        typeof props.size[1] === 'string' &&
        props.size[1].indexOf('rem') !== -1
      ) {
        return parseFloat(props.size[1]) * state.unit
      } else {
        return parseFloat(props.size[1])
      }
    })

    const $_innerWidth = computed(
      () => $_width.value - $_offset.value.left - $_offset.value.right
    )

    const $_innerHeight = computed(
      () => $_height.value - $_offset.value.top - $_offset.value.bottom
    )

    const $_xAxis = computed(() => {
      const deltaX = $_innerWidth.value / (props.labels.length - 1)
      const items = props.labels.map((label, index) => {
        return {
          offset: index * deltaX,
          label: label
        }
      })
      return items
    })

    const $_yAxis = computed(() => {
      const items = []
      const deltaY = $_innerHeight.value / props.lines

      for (let i = 0; i < props.lines; i++) {
        items.push({
          offset: i * deltaY,
          label: props.format(state.max - i * state.step)
        })
      }

      items.push({
        offset: $_innerHeight.value,
        label: props.format(state.min)
      })
      return items
    })

    const $_lower = computed(() => state.max - (props.lines - 1) * state.step)

    const $_paths = computed(() => {
      return props.datasets.map((data) => {
        const deltaX = $_innerWidth.value / (data.values.length - 1)
        const deltaY = $_innerHeight.value / props.lines
        const points = data.values.map((value, index) => {
          if (value < $_lower.value) {
            return {
              x: index * deltaX,
              y:
                $_innerHeight.value -
                (1 - ($_lower.value - value) / ($_lower.value - state.min)) * deltaY
            }
          } else {
            return {
              x: index * deltaX,
              y:
                (1 - (value - $_lower.value) / (state.max - $_lower.value)) *
                ($_innerHeight.value - deltaY)
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
              `M0,${$_innerHeight.value} ` +
              points.map((point) => `L${point.x},${point.y}`).join(' ') +
              ` L${points[points.length - 1].x},${$_innerHeight.value}`,
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

    const $_colors = computed(() => {
      const uniqueColors = []
      props.datasets.map((data) => {
        if (data.color && uniqueColors.indexOf(data.color) === -1) {
          uniqueColors.push(data.color)
        }
      })
      return uniqueColors
    })

    const $_resize = () => {
      state.unit = parseFloat(
        window
          .getComputedStyle(document.getElementsByTagName('html')[0])
          .getPropertyValue('font-size')
      )
    }

    onMounted(() => {
      if (document.readyState !== 'loading') {
        $_resize()
      }
      // document.addEventListener('DOMContentLoaded', $_resize)
      // window.addEventListener('resize', $_resize)
      useEventListener({
        isBind: true,
        node: document,
        name: 'DOMContentLoaded',
        handler: $_resize
      })()

      useEventListener({
        isBind: true,
        node: window,
        name: 'resize',
        handler: $_resize
      })()
    })

    onUnmounted(() => {
      // document.removeEventListener('DOMContentLoaded', $_resize)
      // window.removeEventListener('resize', $_resize)
      useEventListener({
        isBind: false,
        node: document,
        name: 'DOMContentLoaded',
        handler: $_resize
      })()

      useEventListener({
        isBind: false,
        node: window,
        name: 'resize',
        handler: $_resize
      })()
    })

    return {
      state,
      $_stopStyle,
      $_offset,
      $_width,
      $_height,
      $_innerWidth,
      $_innerHeight,
      $_xAxis,
      $_yAxis,
      $_paths,
      $_colors
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
