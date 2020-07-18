<template>
  <div class="m-skeleton" v-if="loading">
    <div v-if="avatar" :class="$_avatarCls"></div>
    <div class="m-skeleton-content">
      <h4 class="m-skeleton-title" v-if="title" :style="$_titleWidthStyle"></h4>
      <div
        class="m-skeleton-row"
        v-for="index in row"
        :key="`row${index}`"
        :style="$_rowWidthStyle(index)"
      ></div>
    </div>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { SKELETON_WIDTH } from '../../constants/index'

export default defineComponent({
  name: 'm-skeleton',

  props: {
    // Whether display the skeleton placeholders loading
    loading: {
      type: Boolean,
      default: true
    },
    // Whether display avatar placeholders
    avatar: {
      type: Boolean,
      default: false
    },
    // The size of avatar placeholders
    avatarSize: {
      type: String,
      default: 'md'
    },
    // Whether display the title placeholders
    title: {
      type: Boolean,
      default: false
    },
    // The width of title placeholders
    titleWidth: {
      type: [Number, String],
      default: SKELETON_WIDTH.DEFAULT_TITLE
    },
    // The number of rows
    row: {
      type: Number,
      default: 3
    },
    // The width of rows
    rowWidth: {
      type: [Number, String, Array],
      default: SKELETON_WIDTH.DEFAULT_ROW
    }
  },

  setup(props) {
    // avatar css class
    const $_avatarCls = computed(() => {
      return [
        'm-skeleton-avatar',
        {
          'm-skeleton-avatar-large': props.avatarSize === 'lg',
          'm-skeleton-avatar-small': props.avatarSize === 'sm'
        }
      ]
    })

    // title width style
    const $_titleWidthStyle = computed(() => {
      return {
        width: $_getTitleWidth()
      }
    })

    // get title width
    const $_getTitleWidth = () => {
      if (props.titleWidth) {
        return typeof props.titleWidth === 'number'
          ? `${props.titleWidth}%`
          : props.titleWidth
      }
      return DEFAULT_TITLE_WIDTH
    }

    // get row width
    const $_getRowWidth = index => {
      if (props.rowWidth) {
        if (Array.isArray(props.rowWidth)) {
          return typeof props.rowWidth[index] === 'number'
            ? `${props.rowWidth[index]}%`
            : props.rowWidth[index]
        } else {
          return typeof props.rowWidth === 'number'
            ? `${props.rowWidth}%`
            : props.rowWidth
        }
      }
      return DEFAULT_ROW_WIDTH
    }

    // row width style
    const $_rowWidthStyle = index => {
      return {
        width:
          index === props.row
            ? SKELETON_WIDTH.LAST_ROW
            : $_getRowWidth(index - 1)
      }
    }

    return {
      $_avatarCls,
      $_titleWidthStyle,
      $_getTitleWidth,
      $_getRowWidth,
      $_rowWidthStyle
    }
  }
})
</script>

<style scoped>
</style>
