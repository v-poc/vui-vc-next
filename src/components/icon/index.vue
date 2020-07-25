<template>
  <v-icon-font
    :name="name"
    :size="size"
    :color="color"
    @icon-click="$_onIconClick"
  ></v-icon-font>
</template>

<script>
import { defineComponent } from 'vue'
import VIconFont from './icon-font.vue'

export default defineComponent({
  name: 'v-icon',

  components: {
    VIconFont
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
    const $_onIconClick = (evt) => {
      emit('click', evt)
    }

    return {
      $_onIconClick
    }
  }
})
</script>

<style lang="scss">
.m-icon {
  background-size: contain;
  fill: currentColor;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0) scale(1, 1);
}
</style>
