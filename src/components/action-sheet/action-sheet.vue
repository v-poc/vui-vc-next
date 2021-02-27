<template>
  <div class="v-action-sheet">
    <v-popup
      class="inner-popup"
      position="bottom"
      prevent-scroll
      :large-radius="largeRadius"
      v-model:value="state.isShow"
      @show="onShow"
      @hide="onHide"
    >
      <div class="v-action-sheet-content">
        <header
          class="v-action-sheet-header"
          v-if="title"
        >{{ title }}</header>
        <ul class="v-action-sheet-list">
          <template
            v-for="(item, index) in options"
            :key="index"
          >
            <li
              :class="listItemCls(index)"
              @click="onSelect(item, index)"
            >
              <div class="v-action-sheet-item-wrapper">
                <div class="v-action-sheet-item-section">
                  {{ item.label }}
                </div>
              </div>
            </li>
          </template>
          <li
            class="v-action-sheet-cancel"
            @click="onCancel"
          >
            {{ cancelText }}
          </li>
        </ul>
      </div>
    </v-popup>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'
import VPopup from '../popup/index.vue'

export default {
  name: 'v-action-sheet',

  components: {
    VPopup
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    defaultIndex: {
      type: Number,
      default: -1
    },
    invalidIndex: {
      type: Number,
      default: -1
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    // Whether display large radius
    largeRadius: {
      type: Boolean,
      default: true
    }
  },

  setup(props, { emit }) {
    const state = reactive({
      isShow: props.value || false,
      clickIndex: props.defaultIndex || -1
    })

    watch(
      () => props.value,
      (val) => {
        state.isShow = val
      }
    )

    const listItemCls = (index) => {
      return [
        'v-action-sheet-item',
        {
          active: index === state.clickIndex,
          disabled: index === props.invalidIndex
        }
      ]
    }

    const onSelect = (item, index) => {
      if (index === props.invalidIndex) {
        return
      }
      state.clickIndex = index
      emit('selected', item)
      hideActionSheet()
    }

    const onShow = () => {
      emit('show')
    }

    const onHide = () => {
      emit('hide')
      hideActionSheet()
    }

    const onCancel = () => {
      emit('cancel')
      hideActionSheet()
    }

    const hideActionSheet = () => {
      state.isShow = false
      // emit('input', false)
      emit('update:value', false)
    }

    return {
      state,
      listItemCls,
      onSelect,
      onShow,
      onHide,
      onCancel
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui-variables.scss';
@import '../../assets/styles/vui-utils.scss';

.v-action-sheet {
  color: $action-sheet-color;
  -webkit-font-smoothing: antialiased;

  .v-popup {
    z-index: $action-sheet-zindex;
  }

  .v-popup-box {
    background-color: $color-bg-base;
  }
}

.v-action-sheet-content {
  position: relative;
  width: 100%;
  font-size: $action-sheet-font-size;
  background: $action-sheet-bg;
  text-align: center;
  overflow: auto;
}

.v-action-sheet-header {
  position: relative;
  @include vertical-height($action-sheet-height);
  @include hairline(bottom, $color-border-base);
  @include word-ellipsis();
  overflow: visible;
}

.v-action-sheet-item {
  position: relative;
  @include vertical-height($action-sheet-height);
  padding: 0 $action-sheet-padding-h;
  box-sizing: border-box;
  font-size: $action-sheet-font-size;
  transition: background-color 0.3s;
  -webkit-user-select: none;

  &.active {
    color: $action-sheet-color-highlight;
  }

  &.disabled .v-action-sheet-item-section {
    opacity: $action-sheet-disabled-opacity;
  }

  &:first-of-type {
    .v-action-sheet-item-wrapper:after {
      display: none;
    }
  }

  &:active {
    background-color: $color-bg-tap;

    &.disabled {
      background-color: transparent;
    }
  }
}

.v-action-sheet-item-wrapper {
  position: relative;
  @include hairline(top, $color-border-base);
}

.v-action-sheet-cancel {
  height: 112px;
  line-height: 100px;
  color: $action-sheet-color-cancel;
  font-weight: $font-weight-medium;

  &::before {
    display: block;
    content: '';
    height: 12px;
    background: $action-sheet-cancel-gap-bg;
  }
}
</style>
