<template>
  <div :class="containerCls">
    <div :class="innerCls">
      <div class="indicator-loading">
        <template v-if="type === 'roller'">
          <v-activity-indicator-roller
            :size="size"
            :color="color"
            :width="width"
          ></v-activity-indicator-roller>
        </template>
        <template v-else-if="type === 'spinner'">
          <v-activity-indicator-spinner
            :size="size"
            :color="color"
          ></v-activity-indicator-spinner>
        </template>
      </div>
      <div
        class="v-activity-indicator-text indicator-text"
        :style="style"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import VActivityIndicatorRoller from './roller.vue'
import VActivityIndicatorSpinner from './spinner.vue'

export default {
  name: 'v-activity-indicator',

  components: {
    VActivityIndicatorRoller,
    VActivityIndicatorSpinner
  },

  props: {
    type: {
      type: String,
      default: 'roller'
    },
    size: {
      type: Number,
      default: 70
    },
    width: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: ''
    },
    textColor: {
      type: String,
      default: '#999'
    },
    textSize: {
      type: Number,
      default: 12
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const containerCls = computed(() => {
      return ['v-activity-indicator', props.type]
    })

    const innerCls = computed(() => {
      return [
        'indicator-container',
        {
          vertical: props.vertical
        }
      ]
    })

    const color = computed(() => {
      return props.color
        ? props.color
        : props.type === 'spinner'
          ? 'dark'
          : '#2F86F6'
    })

    const style = computed(() => {
      return {
        fontSize: `${props.textSize}px`,
        color: props.textColor
      }
    })

    return {
      containerCls,
      innerCls,
      color,
      style
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui-variables.scss';

.v-activity-indicator {
  .indicator-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    .indicator-text {
      margin: 0 0 0 15px;
      color: $color-text-minor;
    }

    &.vertical {
      flex-direction: column;
      justify-content: center;

      .indicator-text {
        margin: 15px 0 0 0;
      }
    }
  }
}
</style>
