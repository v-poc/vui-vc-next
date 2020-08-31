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
  <div class="v-example">
    <p>Circular Progress - linearGradient</p>
    <v-progress-circular
      :value="0.85"
      :width="10"
      :size="100"
      color="url(#linear)"
      border-color="#EFEFEF"
      linecap="butt"
    >
      <span class="progress-value">85%</span>
      <template #circularDefs>
        <defs>
          <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stop-color="#FF5257"/>
            <stop offset="100%" stop-color="#FFC541"/>
          </linearGradient>
        </defs>
      </template>      
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
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';

.v-example span.progress-value {
  margin-left: 0;
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
