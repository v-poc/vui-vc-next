<template>
  <div
    :class="cls"
    @touchmove="preventScroll"
  >
    <!-- Cancel section -->
    <template v-if="!onlyClose">
      <div
        class="title-bar-left v-popup-cancel"
        @click="onEmit('cancel')"
      >
        <template v-if="cancelText">
          {{ cancelText }}
        </template>
        <slot
          v-else
          name="cancel"
        ></slot>
      </div>
    </template>
    <!-- Title section -->
    <div
      class="title-bar-title"
      v-if="title"
    >
      <p class="title">{{ title }}</p>
      <p
        class="describe"
        v-if="describe"
      >{{ describe }}</p>
    </div>
    <div
      class="title-bar-title"
      v-else
    >
      <slot name="title"></slot>
    </div>
    <!-- Ok section -->
    <template v-if="onlyClose">
      <div
        class="title-bar-right v-popup-close"
        @click="onEmit('cancel')"
      >
        <v-icon
          name="close"
          size="lg"
        ></v-icon>
      </div>
    </template>
    <template v-else>
      <div
        class="title-bar-right v-popup-confirm"
        @click="onEmit('confirm')"
      >
        <template v-if="okText">
          {{ okText }}
        </template>
        <slot
          v-else
          name="confirm"
        ></slot>
      </div>
    </template>
  </div>
</template>

<script>
import { computed } from 'vue'
import VIcon from '../icon/index.vue'
import usePopupTitleBarBase from '/@composables/usePopupTitleBarBase'

export default {
  name: 'v-popup-title-bar',

  components: {
    VIcon
  },

  props: {
    // Merge base props
    ...usePopupTitleBarBase()
  },

  setup(props, { emit }) {
    const cls = computed(() => {
      return [
        'v-popup-title-bar',
        `title-align-${props.titleAlign}`,
        {
          large: props.describe,
          'large-radius': props.largeRadius
        }
      ]
    })

    const onEmit = (name) => {
      emit(name)
    }

    const preventScroll = (e) => {
      e.preventDefault()
    }

    return {
      cls,
      onEmit,
      preventScroll
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui.scss';

.v-popup-title-bar {
  position: relative;
  width: 100%;
  height: $popup-title-bar-height;
  background-color: $popup-title-bar-bg;
  border-radius: $popup-title-bar-radius $popup-title-bar-radius 0 0;
  @include clearfix();
  overflow: hidden;

  &.large {
    height: $popup-title-bar-height-large;
  }

  &.large-radius {
    border-radius: $popup-title-bar-radius-large $popup-title-bar-radius-large 0 0;
  }

  &.title-align-left {
    .title-bar-title {
      padding-left: $h-gap-sl;
      align-items: flex-start;
    }

    .title-bar-left {
      display: none;
    }
  }

  &.title-align-right {
    .title-bar-title {
      padding-right: $h-gap-sl;
      align-items: flex-end;
    }

    .title-bar-right {
      display: none;
    }
  }

  &>div {
    display: flex;
    float: left;
    height: 100%;
    padding-top: 0.6rem;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    white-space: nowrap;
  }

  .title-bar-left,
  .title-bar-right {
    position: absolute;
    width: 20%;
    max-height: $popup-title-bar-height;
    font-size: $popup-title-bar-font-size-button;
    font-weight: $popup-title-bar-font-weight-button;
    box-sizing: border-box;
    line-height: 1;
  }

  .title-bar-title {
    width: 100%;
    padding-left: 20%;
    padding-right: 20%;
    box-sizing: border-box;
    line-height: 1;

    p.title {
      font-size: $popup-title-bar-font-size-title;
      color: $popup-title-bar-color-title;
    }

    p.describe {
      margin-top: 0.15rem;
      font-size: $popup-title-bar-font-size-describe;
      color: $popup-title-bar-color-describe;
    }
  }

  .title-bar-left {
    left: 0;
    padding-left: $h-gap-sl;
    align-items: flex-start;
  }

  .title-bar-right {
    right: 0;
    padding-right: $h-gap-sl;
    align-items: flex-end;
  }

  .v-popup-cancel {
    color: $popup-title-bar-color-button-left;
  }

  .v-popup-confirm {
    color: $popup-title-bar-color-button-right;
  }

  .v-popup-close {
    padding-top: $h-gap-sl;
    color: $popup-title-bar-color-button-left;
    justify-content: flex-start;
  }
}
</style>
