<template>
  <button
    :type="nativeType"
    :class="cls"
    :disabled="inactive || type === 'disabled'"
  >
    <div class="v-button-inner">
      <v-icon
        v-if="icon"
        :name="icon"
        :svg="iconSvg"
      ></v-icon>
      <v-activity-indicator-roller
        v-else-if="loading"
        class="v-button-loading"
      ></v-activity-indicator-roller>
      <div class="v-button-content">
        <slot></slot>
      </div>
    </div>
  </button>
</template>

<script>
import { computed } from 'vue'
import VIcon from '../icon/index.vue'
import VActivityIndicatorRoller from '../activity-indicator/roller.vue'

export default {
  name: 'v-button',

  components: {
    VIcon,
    VActivityIndicatorRoller
  },

  props: {
    // The theme type
    type: {
      type: String,
      default: 'default'
    },
    // The button type
    nativeType: {
      type: String,
      default: 'button'
    },
    // The icon of button
    icon: {
      type: String,
      default: ''
    },
    // Whether use svg icon
    iconSvg: {
      type: Boolean,
      default: false
    },
    // The size of button
    size: {
      type: String,
      default: 'large'
    },
    // The plain state
    plain: {
      type: Boolean,
      default: false
    },
    // The round radius state
    round: {
      type: Boolean,
      default: false
    },
    // The inline state
    inline: {
      type: Boolean,
      default: false
    },
    // The inactive state
    inactive: {
      type: Boolean,
      default: false
    },
    // The loading state // TODO - v-on="$listeners"
    loading: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const cls = computed(() => {
      return [
        'v-button',
        props.type,
        props.inactive ? 'inactive' : 'active',
        props.inline ? 'inline' : 'block',
        {
          round: props.round,
          plain: props.plain,
          small: props.size === 'small'
        }
      ]
    })

    return {
      cls
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui-variables.scss';
@import '../../assets/styles/vui-utils.scss';

.v-button {
  position: relative;
  display: block;
  height: $button-height;
  line-height: $button-height;
  font-size: $button-font-size;
  font-weight: $button-font-weight;
  font-family: $font-family-normal;
  text-align: center;
  border: none;
  border-radius: $button-radius;
  box-sizing: border-box;
  outline: none;
  transition: all 0.3s;
  -webkit-appearance: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  overflow: visible;
}
.v-button-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: nowrap;
}
.v-button-loading {
  .v-activity-indicator-svg {
    width: 0.35rem !important;
    height: 0.35rem !important;
    margin-right: 10px;
  }
}
.v-button-content {
  display: flex;
  align-items: center;
  padding: 0 0.06rem;
  .v-icon {
    padding: 0;
  }
}
.v-button {
  position: relative;
  .v-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.06rem;
  }
  &.default {
    background: $button-default-fill;
    color: $button-default-color;
    @include hairline(all, $color-border-element, $button-radius, 3px);
    &.active:active {
      background: $button-default-active-fill;
    }
    .v-button-loading .v-activity-indicator-svg .circle circle {
      stroke: $button-default-color !important;
    }
  }
  &.primary {
    background: $button-primary-fill;
    color: $button-primary-color;
    @include hairline(all, $button-primary-fill, $button-radius, 3px);
    &.active:active {
      background: $button-primary-active-fill;
    }
    .v-button-loading .v-activity-indicator-svg .circle circle {
      stroke: $button-primary-color !important;
    }
  }
  &.warning {
    background: $button-warning-fill;
    color: $button-warning-color;
    @include hairline(all, $button-warning-fill, $button-radius, 3px);
    &.active:active {
      background: $button-warning-active-fill;
    }
    .v-button-loading .v-activity-indicator-svg .circle circle {
      stroke: $button-warning-color !important;
    }
  }
  &.disabled {
    background: $button-disabled-fill;
    color: $button-disabled-color;
    @include hairline(all, $button-disabled-fill, $button-radius, 3px);
    .v-button-loading .v-activity-indicator-svg .circle circle {
      stroke: $button-disabled-color !important;
    }
  }
  &.plain {
    background: transparent;
    &.default {
      color: $button-default-plain-color;
      @include hairline(all, $color-border-element, $button-radius, 3px);
      &.active:active {
        background: $button-default-plain-active-fill;
      }
      .v-button-loading .v-activity-indicator-svg .circle circle {
        stroke: $button-default-plain-color !important;
      }
    }
    &.primary {
      color: $button-primary-plain-color;
      @include hairline(all, $button-primary-fill, $button-radius, 3px);
      &.active:active {
        background: $button-primary-plain-active-fill;
      }
      .v-button-loading .v-activity-indicator-svg .circle circle {
        stroke: $button-primary-plain-color !important;
      }
    }
    &.warning {
      color: $button-warning-plain-color;
      @include hairline(all, $button-warning-fill, $button-radius, 3px);
      &.active:active {
        background: $button-warning-plain-active-fill;
      }
      .v-button-loading .v-activity-indicator-svg .circle circle {
        stroke: $button-warning-plain-color !important;
      }
    }
    &.disabled {
      color: $button-disabled-plain-color;
      @include hairline(all, $color-border-element, $button-radius, 3px);
      .v-button-loading .v-activity-indicator-svg .circle circle {
        stroke: $button-disabled-plain-color !important;
      }
    }
  }
  &.round {
    border-radius: $button-height;
    &:after {
      border-radius: $button-height !important;
    }
  }
  &.inline {
    display: inline-block;
    padding: 0 $h-gap-md;
  }
  &.block {
    width: 100%;
  }
  &.small {
    height: $button-small-height;
    line-height: $button-small-height;
    font-size: $button-small-font-size;
    &.round {
      border-radius: $button-small-height;
      &:after {
        border-radius: $button-small-height;
      }
    }
  }
  &.link {
    display: inline;
    width: auto;
    height: auto;
    line-height: normal;
    font-size: $button-small-font-size;
    font-weight: $font-weight-normal;
    color: $button-primary-fill;
    background: transparent;
    &.inactive {
      color: $color-text-disabled;
      opacity: 1;
    }
  }
  &.inactive {
    opacity: $opacity-disabled;
    &.disabled {
      opacity: 1;
    }
  }
}
</style>
