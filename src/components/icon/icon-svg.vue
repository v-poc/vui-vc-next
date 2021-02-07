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
  width: 0.16rem;
  @include vertical-height(0.16rem);
}

.v-icon.icon-svg.xs {
  width: 0.2rem;
  @include vertical-height(0.2rem);
}

.v-icon.icon-svg.sm {
  width: 0.24rem;
  @include vertical-height(0.24rem);
}

.v-icon.icon-svg.md {
  width: 0.32rem;
  @include vertical-height(0.32rem);
}

.v-icon.icon-svg.lg {
  width: 0.42rem;
  @include vertical-height(0.42rem);
}
</style>
