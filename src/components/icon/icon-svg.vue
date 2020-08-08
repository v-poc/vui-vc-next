<template>
  <svg
    :class="$_cls"
    :style="$_style"
    @click="$_onIconClick"
  >
    <use :xlink:href="`#${name}`" />
  </svg>
</template>

<script>
import { computed, onMounted } from 'vue'
import useLoadSvgSprite from '../../composables/useLoadSvgSprite'

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
    const $_cls = computed(() => {
      return ['v-icon icon-svg', `v-icon-${props.name}`, props.size]
    })

    const $_style = computed(() => {
      return {
        fill: props.color
      }
    })

    const $_onIconClick = (evt) => {
      emit('icon-click', evt)
    }

    onMounted(() => {
      useLoadSvgSprite()
    })

    return {
      $_cls,
      $_style,
      $_onIconClick
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui.scss';

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
