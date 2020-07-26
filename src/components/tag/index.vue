<template>
  <div ref="root" class="v-tag">
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
      // if (props.type === 'fill' && props.fillColor) {
      //   result.background = props.fillColor
      // }
      if (props.type === 'fill') {
        if (props.fillColor) {
          result.background = props.fillColor
        } else {
          result.background = 'rgba(0, 0, 0, 0)'
        }
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

<style lang="scss">
@import '../../assets/styles/vui.scss';

.v-tag {
  color: $color-text-base;
  font-size: 0.28rem;
  text-align: center;
  display: inline-block;
  -webkit-user-select: none;
  .default {
    background: rgba(0, 0, 0, 0);
    color: $tag-color;
    border-color: $tag-color;
  }
  .shape-square {
    padding: 0 0.12rem;
    border-radius: 0;
  }
  .shape-fillet {
    padding: 0.02rem 0.08rem;
    border-radius: $tag-fillet-radius;
  }
  .shape-quarter {
    position: relative;
    display: flex;
    width: 0.56rem;
    height: 0.56rem;
    background: transparent !important;
    overflow: hidden;
    .quarter-content {
      position: relative;
      left: 10%;
      bottom: 10%;
      display: flex;
      flex: 1;
      z-index: 2;
      justify-content: center;
      align-items: center;
    }
    .quarter-bg {
      position: absolute;
      top: -100%;
      left: 0;
      width: 200%;
      height: 200%;
      border-radius: $radius-circle;
    }
    .quarter-wrap {
      display: inline-block;
      padding: 0.16rem 0.12rem 0.1rem 0.26rem;
    }
    .quarter-wrap-hidden {
      visibility: hidden;
      display: inline-block;
      padding: 0.16rem 0.12rem 0.1rem 0.26rem;
    }
    &.size-small {
      width: 0.4rem;
      height: 0.4rem;
    }
    &.size-tiny {
      width: 0.24rem;
      height: 0.24rem;
    }
  }
  .shape-coupon {
    position: relative;
    padding: 0 0.1rem;
    background: transparent !important;
    .coupon-container {
      padding: 0.02rem 0;
    }
    .left-coupon,
    .right-coupon {
      position: absolute;
      top: 0;
      width: 0.1rem;
      height: 100%;
    }
    .left-coupon {
      left: 0;
    }
    .right-coupon {
      right: 0;
    }
    &.size-small {
      padding: 0 0.08rem;
      .left-coupon,
      .right-coupon {
        width: 0.08rem;
      }
    }
    &.size-tiny {
      padding: 0 0.05rem;
      .left-coupon,
      .right-coupon {
        width: 0.05rem;
      }
    }
  }
  .shape-bubble {
    width: 0.5rem;
    padding: 0.06rem 0;
    border-radius: $radius-circle;
    border-bottom-left-radius: 0;
    box-sizing: border-box;
    &.size-small {
      width: 0.38rem;
      padding: 0.03rem 0;
    }
    &.size-tiny {
      width: 0.24rem;
      padding: 0.02rem 0;
    }
  }
  .size-large {
    font-size: $tag-large-font-size;
  }
  .size-small {
    font-size: $tag-small-font-size;
  }
  .size-tiny {
    font-size: $tag-tiny-font-size;
  }
  .type-fill {
    color: $color-text-base-inverse;
    background: $tag-color;
  }
  .type-ghost {
    border: 1px solid $tag-color;
    background: rgba(0, 0, 0, 0);
  }
  .font-weight-normal {
    font-weight: 400;
  }
  .font-weight-bold {
    font-weight: 700;
  }
  .font-weight-bolder {
    font-weight: bolder;
  }
  .v-icon.icon-font {
    font-size: inherit;
    transform: scale(1.2);
  }
}
</style>
