<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Icon Font</p>
    <div
      class="v-example-row"
      v-for="item in state.iconList"
      :key="item"
    >
      <v-icon
        color="green"
        :name="item.split('/')[0]"
      ></v-icon>
      <span>{{ item }}</span>
    </div>
    <v-button
      v-if="state.iconList.length < 4"
      type="primary"
      size="small"
      inline
      round
      @click="showMoreIconList"
    >Show more</v-button>
  </div>
  <div class="v-example">
    <p>Icon Size</p>
    <div class="v-example-item">
      <v-icon
        name="location"
        size="xs"
      ></v-icon>
      <p>xs</p>
    </div>
    <div class="v-example-item">
      <v-icon
        name="location"
        size="sm"
      ></v-icon>
      <p>sm</p>
    </div>
    <div class="v-example-item">
      <v-icon
        name="location"
        size="md"
      ></v-icon>
      <p>md</p>
    </div>
    <div class="v-example-item">
      <v-icon
        name="location"
        size="lg"
      ></v-icon>
      <p>lg</p>
    </div>
  </div>
  <div class="v-example">
    <p>Icon Color</p>
    <div class="v-example-item">
      <v-icon
        name="triangle"
        color="orange"
      ></v-icon>
      <p>Orange</p>
    </div>
    <div class="v-example-item">
      <v-icon
        name="triangle"
        color="blue"
      ></v-icon>
      <p>Blue</p>
    </div>
    <div class="v-example-item">
      <v-icon
        name="triangle"
        color="purple"
      ></v-icon>
      <p>Purple</p>
    </div>
  </div>
  <div class="v-example">
    <p>SVG Icon</p>
    <div
      class="v-example-svg"
      v-for="svgIcon in state.svgList"
      :key="svgIcon"
    >
      <v-icon
        :name="svgIcon"
        :class="{ 'v-example-invert': svgIcon === 'spinner' }"
        size="lg"
        svg
      ></v-icon>
      <span>{{ svgIcon }}</span>
    </div>
    <v-button
      v-if="state.svgList.length > 1"
      type="primary"
      size="small"
      inline
      round
      @click="showMoreSvgList"
    >View more</v-button>
  </div>
</template>

<script>
import { reactive } from 'vue'
import VIcon from '../components/icon/index.vue'
import VButton from '../components/button/index.vue'
import useLoadSvgSprite from '../composables/useLoadSvgSprite'

export default {
  name: 'icon-demo',

  inheritAttrs: false,

  components: {
    VIcon,
    VButton
  },

  setup() {
    const state = reactive({
      iconList: ['checked/success', 'check-disabled', 'clear/fail'],
      svgList: ['spinner', 'warn-color', 'success-color']
    })

    const showMoreIconList = () => {
      state.iconList = [
        'rectangle',
        'right',
        'wrong',
        'arrow-left',
        'arrow-right',
        'arrow-up',
        'arrow-down',
        'invisible',
        'visible',
        'service',
        'setting',
        'close',
        'refresh',
        'edit',
        'sort',
        'info',
        'question',
        'security',
        'rmb',
        'wait',
        'check',
        'checked/success',
        'check-disabled',
        'clear/fail',
        'warn',
        'info-solid',
        'scan',
        'share',
        'back',
        'card-bag',
        'message',
        'order',
        'balance',
        'coupon',
        'address-book',
        'mobile-phone',
        'calendar',
        'home',
        'discovery',
        'switch',
        'time',
        'search',
        'user',
        'camera',
        'clock',
        'delete',
        'profession',
        'id-card',
        'authentication',
        'location',
        'filter',
        'motor-vehicle',
        'phone',
        'volumn'
      ]
    }

    const showMoreSvgList = () => {
      const res = {
        'recording':
          '<svg width="55" height="80" viewBox="0 0 55 80" fill="#2f86f6"><g transform="matrix(1 0 0 -1 0 80)"><rect width="10" height="20" rx="3"><animate attributeName="height" begin="0s" dur="4.3s" values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20" calcMode="linear" repeatCount="indefinite" /></rect><rect x="15" width="10" height="80" rx="3"><animate attributeName="height" begin="0s" dur="2s" values="80;55;33;5;75;23;73;33;12;14;60;80" calcMode="linear" repeatCount="indefinite" /></rect><rect x="30" width="10" height="50" rx="3"><animate attributeName="height" begin="0s" dur="1.4s" values="50;34;78;23;56;23;34;76;80;54;21;50" calcMode="linear" repeatCount="indefinite" /></rect><rect x="45" width="10" height="30" rx="3"><animate attributeName="height" begin="0s" dur="2s" values="30;45;13;80;56;72;45;76;34;23;67;30" calcMode="linear" repeatCount="indefinite" /></rect></g></svg>'
      }
      useLoadSvgSprite(res)
      state.svgList = Object.keys(res)
    }    

    return {
      state,
      showMoreIconList,
      showMoreSvgList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';

.v-icon.icon-svg.v-icon-recording.lg {
  width: 1rem;
  height: 1rem;
}
</style>
