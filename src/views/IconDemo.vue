<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Icon Font</p>
    <div
      v-for="item in iconList"
      :key="item"
    >
      <v-icon
        color="green"
        :name="item.split('/')[0]"
      ></v-icon>
      {{ item }}
    </div>
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
      v-for="svgIcon in svgList"
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
import { defineComponent, ref } from 'vue'
import VIcon from '../components/icon/index.vue'

export default defineComponent({
  name: 'icon-demo',

  inheritAttrs: false,

  components: {
    VIcon
  },

  setup() {
    const iconList = ref(['checked/success', 'check-disabled', 'clear/fail'])

    const svgList = ref(['spinner', 'warn-color', 'success-color'])

    return {
      iconList: iconList.value,
      svgList: svgList.value
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/styles/example.scss';
</style>
