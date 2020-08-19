<template>
  <div :class="$_containerCls">
    <div :class="$_innerCls">
      <div class="indicator-loading">
        <template v-if="type === 'spinner'">
          <v-activity-indicator-spinner
            :size="size"
            :color="$_color"
          ></v-activity-indicator-spinner>
        </template>
      </div>
      <div
        class="v-activity-indicator-text indicator-text"
        :style="$_style"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import VActivityIndicatorSpinner from './spinner.vue'

export default {
  name: 'v-activity-indicator',

  components: {
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
    const $_containerCls = computed(() => {
      return ['v-activity-indicator', props.type]
    })

    const $_innerCls = computed(() => {
      return [
        'indicator-container',
        {
          vertical: props.vertical
        }
      ]
    })

    const $_color = computed(() => {
      return props.color
        ? props.color
        : props.type === 'spinner'
          ? 'dark'
          : '#2F86F6'
    })

    const $_style = computed(() => {
      return {
        fontSize: `${props.textSize}px`,
        color: props.textColor
      }
    })

    return {
      $_containerCls,
      $_innerCls,
      $_color,
      $_style
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui.scss';

.v-activity-indicator {
  .indicator-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    .indicator-text {
      margin: 0 0 0 0.15rem;
      color: $color-text-minor;
    }

    &.vertical {
      flex-direction: column;
      justify-content: center;

      .indicator-text {
        margin: 0.15rem 0 0 0;
      }
    }
  }
}
</style>
