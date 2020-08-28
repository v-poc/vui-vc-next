<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Multiple lines with area fill charts</p>
    <v-chart
      :size="['7rem', '4rem']"
      :max="60"
      :min="0"
      :step="10"
      :format="$_format"
      :labels="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
      :datasets="[
        {
          width: 1,
          values: [9, 16, 21, 24, 21, 31, 33, 39, 37, 41, 51, 56, 53]
        },
        {
          color: '#3366cc',
          width: 2,
          theme: 'heat',
          values: [12, 22, 27, 32, 30, 37, 40, 44, 42, 42, 47, 44, 47]
        },
        {
          color: '#5e64ff',
          width: 1,
          theme: 'region',
          values: [4, 11, 16, 13, 16, 26, 22, 34, 32, 30, 46, 51, 55]
        }        
      ]"
    ></v-chart>
  </div>
</template>

<script>
import VChart from '../components/chart/index.vue'

export default {
  name: 'chart-demo',

  inheritAttrs: false,

  components: {
    VChart
  },

  setup() {
    const $_format = (val) => `${val}%`

    return {
      $_format
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';
</style>
