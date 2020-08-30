<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Circular Progress - Basic</p>
    <v-progress-circular
      :size="80"
      :value="0.3"
      :width="5"
    >
      <span class="progress-value">30%</span>
    </v-progress-circular>
  </div>
  <div class="v-example">
    <p>Circular Progress - Customized color</p>
    <v-progress-circular
      :size="100"
      :value="0.7"
      :width="10"
      linecap="butt"
      color="#F60"
      border-color="#AAA"
    >
      <span class="progress-value">70%</span>
    </v-progress-circular>
  </div>
  <div class="v-example">
    <p>Circular Progress - Animated</p>
    <v-progress-circular
      :size="100"
      :value="0.9"
      :width="10"
      :rotate="-90"
      is-animated
    >
      <span class="progress-value">
        <v-amount
          :value="90"
          :precision="0"
          is-animated
        ></v-amount>%
      </span>
    </v-progress-circular>
  </div>
</template>

<script>
import VProgressCircular from '../components/progress/circular.vue'
import VAmount from '../components/amount/index.vue'

export default {
  name: 'progress-demo',

  inheritAttrs: false,

  components: {
    VProgressCircular,
    VAmount
  },

  setup() {}
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';

.v-example span.progress-value {
  margin-left: 0;
  // font-size: 0.24rem;
  font-family: VC-Amount, 'Helvetica Neue', Helvetica, 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;

  span.v-amount.numerical {
    margin-left: 0;
    font-size: 100%;
  }
}

@font-face {
  font-family: VC-Amount;
  font-style: normal;
  font-weight: normal;
  src: url('/assets/DINPro-Medium.ttf') format('truetype');
}
</style>
