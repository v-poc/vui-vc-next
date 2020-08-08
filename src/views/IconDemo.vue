<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Icon Font</p>
    <div
      v-for="item in state.iconList"
      :key="item"
    >
      <v-icon
        color="green"
        :name="item.split('/')[0]"
      ></v-icon>
      {{ item }}
    </div>
    <button
      v-if="state.iconList.length < 4"
      @click="showMore"
    >Show more</button>
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
      ></v-icon>
      {{ svgIcon }}
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import VIcon from '../components/icon/index.vue'

export default {
  name: 'icon-demo',

  inheritAttrs: false,

  components: {
    VIcon
  },

  setup() {
    const state = reactive({
      iconList: ['checked/success', 'check-disabled', 'clear/fail'],
      svgList: ['spinner', 'warn-color', 'success-color']
    })

    const showMore = () => {
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

    return {
      state,
      showMore
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/example.scss';
</style>
