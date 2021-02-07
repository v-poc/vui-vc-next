<template>
  <div :class="cls">
    <v-icon
      name="spinner"
      class="v-activity-indicator-svg"
      :style="style"
    ></v-icon>
  </div>
</template>

<script>
import { computed } from 'vue'
import VIcon from '../icon/index.vue'

export default {
  name: 'v-activity-indicator-spinner',

  components: {
    VIcon
  },

  props: {
    // The spinner size
    size: {
      type: Number,
      default: 70
    },
    // The spinner color
    color: {
      type: String,
      default: 'dark',
      validator: (val) => ['dark', 'light'].includes(val)
    }
  },

  setup(props) {
    const cls = computed(() => {
      return [
        'v-activity-indicator-spinning',
        {
          dark: props.color === 'dark'
        }
      ]
    })

    const style = computed(() => {
      const size = props.size || 0
      return {
        width: `${size}px`,
        height: `${size}px`
      }
    })

    return {
      cls,
      style
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/vui-utils.scss';

.v-activity-indicator-spinning {
  @include clearfix();

  .v-icon {
    float: left;
  }

  &.dark {
    .v-icon {
      filter: invert(1);
    }
  }
}
</style>
