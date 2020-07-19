<template>
  <div ref="root" class="m-tag">
    <template v-if="shape === 'quarter'">
      <div :class="$_containerCls">
        <div class="quarter-content">
          <slot></slot>
        </div>
        <div class="quarter-bg" :style="$_colorStyle"></div>
      </div>
    </template>
    <template v-if="shape === 'coupon'">
      <div :class="$_containerCls">
        <div class="coupon-container" :style="$_colorStyle">
          <div class="left-coupon" :style="$_bgStyle(fillColor, 'left')"></div>
          <slot></slot>
          <div class="right-coupon" :style="$_bgStyle(fillColor, 'right')"></div>
        </div>
      </div>
    </template>
    <template v-else>
      <div :class="$_containerCls" :style="$_containerStyle">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from 'vue'
import { transformCamelCase } from '../../utils/index'

export default defineComponent({
  name: 'v-tag',

  props: {
    // The size of tag
    // (tiny, small, large)
    size: {
      type: String,
      default: 'large'
    },
    // The shape of tag
    // (square, circle, fillet, quarter, coupon)
    shape: {
      type: String,
      default: 'square'
    },
    // The style of tag
    // (fill, ghost)
    type: {
      type: String,
      default: 'ghost'
    },
    // The angle of tag
    // (top-left, top-right, bottom-left, bottom-right, empty value means without any angle)
    sharp: {
      type: String,
      default: ''
    },
    // The background color of tag
    // (empty value means without any background color)
    fillColor: {
      type: String,
      default: ''
    },
    // The font color of tag
    // (rgba or hex number)
    fontColor: {
      type: String,
      default: '#000'
    },
    // The font weight of tag
    // (normal, bold, bolder)
    fontWeight: {
      type: String,
      default: 'normal'
    }
  },

  setup(props) {
    const root = ref(null)
    const sizeStyle = ref({})

    // container css class
    const $_containerCls = computed(() => {
      return [
        'default',
        `size-${props.size}`,
        `shape-${props.shape}`,
        `type-${props.type}`,
        `font-weight-${props.fontWeight}`
      ]
    })

    // color style
    const $_colorStyle = computed(() => {
      const result = {}
      if (props.type === 'fill' && props.fillColor) {
        result.background = props.fillColor
      }

      if (props.fontColor) {
        if (props.type === 'ghost') {
          result.borderColor = props.fontColor
        }
        result.color = props.fontColor
      }

      return result
    })

    // container style
    const $_containerStyle = computed(() => {
      return [$_colorStyle.value, sizeStyle.value]
    })

    // set background style
    const $_bgStyle = (fillColor, flag = 'left') => {
      let val = ''
      if (fillColor) {
        val = `radial-gradient(circle at ${flag}, transparent 33%, ${fillColor} 33%)`
      }

      return {
        background: val
      }
    }

    // onMounted hook
    onMounted(() => {
      // nextTick(() => {
      // if the shape of tag is circle, needs to set sizeStyle
      if (props.shape === 'circle') {
        const radius = root.value.offsetHeight / 2
        sizeStyle.value.paddingLeft = `${radius}px`
        sizeStyle.value.paddingRight = `${radius}px`
        sizeStyle.value.borderRadius = `${radius}px`
        // handle the case if there is any angle of tag
        if (props.sharp) {
          sizeStyle.value[
            transformCamelCase(`border-${props.sharp}-radius`)
          ] = 0
        }
      }
      // })
    })

    return {
      root,
      $_containerCls,
      $_colorStyle,
      $_containerStyle,
      $_bgStyle
    }
  }
})
</script>

<style scoped>
</style>
