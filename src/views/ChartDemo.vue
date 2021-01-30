<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Line and Area-fill Chart</p>
    <v-chart
      :size="['8rem', '5rem']"
      :max="60"
      :min="0"
      :step="10"
      :format="format"
      :labels="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
      :datasets="[
        {
          width: 1,
          values: [9, 16, 21, 24, 21, 31, 33, 39, 37, 41, 51, 56, 53]
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
  <div class="v-example">
    <p>Chart in popup</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="showPopup('center', true)"
    >Test popup display</v-button>
    <v-popup
      position="center"
      transition="v-bounce"
      v-model:value="popupShow.center"
    >
      <div class="v-example-popup v-example-popup-center">
        <p>Gradient-line Chart</p>
        <v-chart
          :size="['8rem', '5rem']"
          :max="60"
          :min="0"
          :step="10"
          :format="format"
          :labels="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
          :datasets="[
            {
              color: '#3366cc',
              width: 2,
              theme: 'heat',
              values: [3, 10, 15, 12, 15, 25, 21, 33, 31, 29, 45, 50, 54]
            }        
          ]"
        ></v-chart>
      </div>
    </v-popup>
  </div>
</template>

<script>
import useShowPopup from '../composables/useShowPopup'
// import VChart from '../components/chart/index.vue'
// import VButton from '../components/button/index.vue'
// import VPopup from '../components/popup/index.vue'

export default {
  name: 'chart-demo',

  inheritAttrs: false,

  // components: {
  //   VChart,
  //   VButton,
  //   VPopup
  // },

  setup() {
    const popup = useShowPopup()

    const format = (val) => `${val}%`

    return {
      popupShow: popup.mapping,
      showPopup: popup.showPopup,
      format
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';

.v-example-popup {
  width: 95vw;
}
</style>
