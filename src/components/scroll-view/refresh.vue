<template>
  <div
    ref="root"
    class="v-scroll-view-refresh"
  >
    <v-activity-indicator-roller
      :process="rollerProcess"
      :width="10"
      :color="rollerColor"
    ></v-activity-indicator-roller>
    <p class="refresh-tip">{{ refreshTip }}</p>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import VActivityIndicatorRoller from '../activity-indicator/roller.vue'

export default {
  name: 'v-scroll-view-refresh',

  components: {
    [VActivityIndicatorRoller.name]: VActivityIndicatorRoller
  },

  props: {
    scrollTop: {
      type: Number,
      default: 0
    },
    isRefreshing: {
      type: Boolean,
      default: false
    },
    isRefreshActive: {
      type: Boolean,
      default: false
    },
    refreshText: {
      type: String,
      default: 'Pull-to-refresh'
    },
    refreshActiveText: {
      type: String,
      default: 'Release-to-refresh'
    },
    refreshingText: {
      type: String,
      default: 'Refreshing...'
    },
    rollerColor: {
      type: String,
      default: '#2F86F6'
    }
  },

  setup(props) {
    const root = ref(null)

    const rollerProcess = computed(() => {
      if (props.isRefreshing) {
        return
      }

      if (!root.value || !props.scrollTop) {
        return +props.scrollTop
      }

      const refreshH = root.value.clientHeight
      if (Math.abs(props.scrollTop) < refreshH / 2) {
        return 0
      }
      // first 1/3 is not included in process
      return (Math.abs(props.scrollTop) - refreshH / 2) / (refreshH / 2)
    }),

    const refreshTip = computed(() => {
      return props.isRefreshing
        ? props.refreshingText
        : props.isRefreshActive
            ? props.refreshActiveText
            : props.refreshText
    })

    return {
      root,
      rollerProcess,
      refreshTip
    }
  }
}
</script>

<style lang="scss">
.v-scroll-view-refresh {
  display: flex;
  padding: 0.5rem 0;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .v-activity-indicator-rolling {
    .v-activity-indicator-svg {
      width: 0.32rem !important;
      height: 0.32rem !important;
      transform: rotateZ(-45deg);
    }
  }

  .refresh-tip {
    margin-left: 0.15rem;
    font-size: 0.24rem;
    color: #999;
  }
}
</style>
