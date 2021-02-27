<template>
  <svg
    :class="cls"
    :style="style"
    @click="onIconClick"
  >
    <use :xlink:href="`#${name}`" />
  </svg>
</template>

<script>
import { computed, onMounted } from 'vue'
import { SVG_SPRITE_NODE_ID } from '../../constants/index'
import loadSvgSprite from '../../utils/loadSvgSprite'

export default {
  name: 'v-icon-svg',

  props: {
    // The icon name
    name: {
      type: String,
      default: ''
    },
    // The icon size
    size: {
      type: String,
      default: 'md'
    },
    // The icon color
    color: {
      type: String,
      default: ''
    }
  },

  setup(props, { emit }) {
    const cls = computed(() => {
      return ['v-icon icon-svg', `v-icon-${props.name}`, props.size]
    })

    const style = computed(() => {
      return {
        fill: props.color
      }
    })

    const onIconClick = (evt) => {
      emit('icon-click', evt)
    }

    onMounted(() => {
      const svgNode = document.getElementById(SVG_SPRITE_NODE_ID)
      !svgNode && loadSvgSprite()
    })

    return {
      cls,
      style,
      onIconClick
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui-utils.scss';

.v-icon.icon-svg.xss {
  width: 16px;
  @include vertical-height(16px);
}

.v-icon.icon-svg.xs {
  width: 20px;
  @include vertical-height(20px);
}

.v-icon.icon-svg.sm {
  width: 24px;
  @include vertical-height(24px);
}

.v-icon.icon-svg.md {
  width: 32px;
  @include vertical-height(32px);
}

.v-icon.icon-svg.lg {
  width: 42px;
  @include vertical-height(42px);
}
</style>
