<template>
  <div
    class="v-skeleton"
    v-if="loading"
  >
    <div
      v-if="avatar"
      :class="avatarCls"
    ></div>
    <div class="v-skeleton-content">
      <h4
        class="v-skeleton-title"
        v-if="title"
        :style="titleWidthStyle"
      ></h4>
      <div
        class="v-skeleton-row"
        v-for="index in row"
        :key="`row${index}`"
        :style="rowWidthStyle(index)"
      ></div>
    </div>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script>
import { computed } from 'vue'
import { SKELETON_WIDTH } from '../../constants/index'

export default {
  name: 'v-skeleton',

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
    const avatarCls = computed(() => {
      return [
        'v-skeleton-avatar',
        {
          'v-skeleton-avatar-large': props.avatarSize === 'lg',
          'v-skeleton-avatar-small': props.avatarSize === 'sm'
        }
      ]
    })

    // title width style
    const titleWidthStyle = computed(() => {
      return {
        width: getTitleWidth()
      }
    })

    // get title width
    const getTitleWidth = () => {
      if (props.titleWidth) {
        return typeof props.titleWidth === 'number'
          ? `${props.titleWidth}%`
          : props.titleWidth
      }
      return DEFAULT_TITLE_WIDTH
    }

    // get row width
    const getRowWidth = (index) => {
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
    const rowWidthStyle = (index) => {
      return {
        width:
          index === props.row
            ? SKELETON_WIDTH.LAST_ROW
            : getRowWidth(index - 1)
      }
    }

    return {
      avatarCls,
      titleWidthStyle,
      getTitleWidth,
      getRowWidth,
      rowWidthStyle
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui.scss';

.v-skeleton {
  box-sizing: border-box;
  display: flex;
  .v-skeleton-avatar {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.32rem;
    border-radius: 50%;
    @include placeHolder();
    &.v-skeleton-avatar-large {
      width: 0.96rem;
      height: 0.96rem;
    }
    &.v-skeleton-avatar-small {
      width: 0.64rem;
      height: 0.64rem;
    }
  }
  .v-skeleton-content {
    flex: 1;
  }
  .v-skeleton-title,
  .v-skeleton-row {
    box-sizing: border-box;
    height: 0.32rem;
    margin-bottom: 0.24rem;
    border: 0;
    border-radius: 0;
    @include placeHolder();
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
