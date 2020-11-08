<template>
  <div class="v-watermark">
    <div class="v-watermark-container">
      <slot></slot>
    </div>
    <div
      ref="markRef"
      class="v-watermark-list"
      v-if="watermarkList"
    >
      <div
        class="v-watermark-list-wrapper"
        :style="wrapperStyle"
      >
        <template v-if="content">
          <canvas
            ref="canvasRef"
            class="v-watermark-canvas"
          ></canvas>
        </template>
        <template v-else-if="watermarkSlot">
          <ul
            class="v-watermark-line"
            v-for="lineItem in watermarkLine"
            :key="`line-${lineItem}`"
            :style="lineStyle"
          >
            <li
              class="v-watermark-item"
              v-for="item in watermarkItem"
              :key="`item-${item}`"
              :style="itemStyle(lineItem)"
            >
              <slot
                name="watermark"
                :coord="watermarkCoord(lineItem, item)"
              ></slot>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, onMounted } from 'vue'
import { getDpr } from '/@utils/index'
import { WATERMARK } from '/@constants/index'

export default {
  name: 'v-watermark',

  props: {
    content: {
      type: String,
      default: ''
    },
    spacing: {
      type: [String, Number],
      default: '20vw'
    },
    repeatX: {
      type: Boolean,
      default: true
    },
    repeatY: {
      type: Boolean,
      default: true
    },
    rotate: {
      type: [String, Number],
      default: -30
    },
    opacity: {
      type: [String, Number],
      default: 0.1
    }
  },

  setup(props, { emit, slots }) { 
    let ctx = null
    let ratio = 2
    let realSpacing = 0
    
    const canvasRef = ref('canvasRef')
    const markRef = ref('markRef')

    const state = reactive({
      repetition: 50
    })

    const watermarkList = computed(() => slots.watermark || props.content)

    const watermarkSlot = computed(() => slots.watermark)

    const watermarkLine = computed(() => (props.repeatY ? state.repetition : 1))

    const watermarkItem = computed(() => (props.repeatX ? state.repetition : 1))

    const wrapperStyle = computed(() => {
      return {
        opacity: props.opacity,
        transform: `rotate(${props.rotate}deg)`
      }
    })

    const lineStyle = computed(() => {
      return {
        marginBottom: props.spacing
      }
    })

    const itemStyle = (line) => {
      const res = {}
      res[`${line % 2 === 0 ? 'marginLeft' : 'marginRight'}`] = props.repeatX
        ? props.spacing
        : 0
      return res
    }

    const watermarkCoord = (line, item) => {
      return {
        row: line,
        col: item
      }
    }

    const initCanvas = () => {
      const { clientWidth, clientHeight } = markRef.value
      canvasRef.value.width = clientWidth * ratio
      canvasRef.value.height = clientHeight * ratio

      ctx.scale(1 / ratio, 1 / ratio)
    }

    const calcSpacing = () => {
      if (typeof props.spacing === 'number') {
        realSpacing = props.spacing
        return
      }

      const [, amount = 20, unit = 'vw'] = /([0-9]+)([A-Za-z]+)/.exec(props.spacing)
      if (unit === 'px') {
        realSpacing = amount
      } else if (unit === 'vh') {
        realSpacing = amount * window.screen.height / 100
      } else if (unit === 'vw') {
        realSpacing = amount * window.screen.width / 100
      }

      realSpacing *= ratio
    }

    const doDraw = () => {
      const ctxFontSize = WATERMARK.FONT_SIZE * ratio
      const contentLen = props.content.length * ctxFontSize
      const ctxW = markRef.value.clientWidth * ratio
      const ctxH = markRef.value.clientHeight * ratio
      const countX = Math.ceil(ctxW * ratio / (contentLen + realSpacing))
      const countY = Math.ceil(ctxH * ratio / (ctxFontSize + realSpacing))

      ctx.font = `${ctxFontSize}px ${WATERMARK.FONT}`
      ctx.fillStyle = WATERMARK.COLOR

      let ctxX = 0
      let ctxY = 0
      for (let y = 0; y < countY; y++) {
        ctxX = 0
        for (let x = 0; x < countX; x++) {
          ctx.fillText(props.content, ctxX, ctxY)
          ctxX += contentLen
        }
        ctxY += ctxFontSize + realSpacing
      }
    }

    onMounted(() => {
      if (props.content) {
        ctx = canvasRef.value.getContext('2d')
        ratio = Math.max(getDpr(), 2) // min ratio is 2

        initCanvas()
        calcSpacing()
        doDraw()
      }
    })

    return {
      state,
      canvasRef,
      markRef,      
      watermarkList,
      watermarkSlot,
      watermarkLine,
      watermarkItem,
      watermarkCoord,
      wrapperStyle,
      lineStyle,
      itemStyle
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui.scss';

.v-watermark {
  position: relative;
  overflow: hidden;

  &-container {
    position: relative;
    z-index: 2;
  }

  &-list {
    @include clearfix();
    @include absolute-pos();
    position: absolute;
    filter: grayscale(100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;

    .v-watermark-canvas {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate3d(-50%, -50%, 0);
    }
  }

  &-line {
    position: relative;
    left: 50%;
    float: left;
    width: 100%;
    display: flex;
    justify-content: center;
    transform: translateX(-50%);
  }

  &-item {
    float: left;
    font-size: $font-body-large;
    color: $color-text-caption;
  }
}
</style>
