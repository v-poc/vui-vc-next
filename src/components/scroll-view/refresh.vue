<template>
  <div class="v-scroll-view-refresh">
    <v-activity-indicator-roller
      :process="rollerProcess"
      :width="10"
      :color="rollerColor"
    ></v-activity-indicator-roller>
    <p class="refresh-tip">{{ refreshTip }}</p>
  </div>
</template>

<script>
import { computed } from 'vue'
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
    rollerColor: {
      type: String,
      default: '#2F86F6'
    }
  },

  setup(props) {
    const rollerProcess = computed(() => {
      // WIP
    }),

    const refreshTip = computed(() => {
      // WIP
    })

    return {
      rollerProcess,
      refreshTip
    }
  }
}
</script>

<style lang="scss">
// WIP
</style>
