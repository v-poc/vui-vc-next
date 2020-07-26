<template>
  <v-icon-svg
    v-if="svg || $_isDefaultSvg"
    :name="name"
    :size="size"
    :color="color"
    @icon-click="$_onIconClick"
  ></v-icon-svg>
  <v-icon-font v-else :name="name" :size="size" :color="color" @icon-click="$_onIconClick"></v-icon-font>
</template>

<script>
import { defineComponent, computed } from 'vue'
import VIconFont from './icon-font.vue'
import VIconSvg from './icon-svg.vue'
import useDefaultSvgList from '../../composables/useDefaultSvgList'

export default defineComponent({
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
    const $_isDefaultSvg = computed(() => {
      const defaultSvgList = useDefaultSvgList()
      return defaultSvgList[props.name]
    })

    const $_onIconClick = (evt) => {
      emit('click', evt)
    }

    return {
      $_isDefaultSvg,
      $_onIconClick
    }
  }
})
</script>

<style lang="scss">
.v-icon {
  background-size: contain;
  fill: currentColor;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0) scale(1, 1);
}
</style>
