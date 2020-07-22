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

<style lang="scss">
@mixin placeHolder() {
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: linear-gradient(to right, #f3f3f6 8%, #f8faff 18%, #f3f3f6 33%);
  background-size: 10rem 1.04rem;
}
.m-skeleton {
  box-sizing: border-box;
  display: flex;
  .m-skeleton-avatar {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.32rem;
    border-radius: 50%;
    @include placeHolder();
    &.m-skeleton-avatar-large {
      width: 0.96rem;
      height: 0.96rem;
    }
    &.m-skeleton-avatar-small {
      width: 0.64rem;
      height: 0.64rem;
    }
  }
  .m-skeleton-content {
    flex: 1;
  }
  .m-skeleton-title,
  .m-skeleton-row {
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

@keyframes placeHolderShimmer {
  0% {
    background-position: -4.68rem 0;
  }
  100% {
    background-position: 4.68rem 0;
  }
}
</style>
