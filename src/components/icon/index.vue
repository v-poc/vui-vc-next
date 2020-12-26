<template>
  <v-icon-svg
    v-if="svg || isDefaultSvg"
    :name="name"
    :size="size"
    :color="color"
    @icon-click="onIconClick"
  ></v-icon-svg>
  <v-icon-font
    v-else
    :name="name"
    :size="size"
    :color="color"
    @icon-click="onIconClick"
  ></v-icon-font>
</template>

<script>
import { computed } from 'vue'
import { getDefaultSvgList } from '../../utils/index'
import VIconFont from './icon-font.vue'
import VIconSvg from './icon-svg.vue'

export default {
  name: 'v-icon',

  components: {
    VIconFont,
    VIconSvg
  },

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
    },
    // Whether use SVG icon
    svg: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const isDefaultSvg = computed(() => {
      const defaultSvgList = getDefaultSvgList()
      return defaultSvgList[props.name]
    })

    const onIconClick = (evt) => {
      emit('click', evt)
    }

    return {
      isDefaultSvg,
      onIconClick
    }
  }
}
</script>

<style lang="scss">
.v-icon {
  background-size: contain;
  fill: currentColor;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0) scale(1, 1);
}
</style>
