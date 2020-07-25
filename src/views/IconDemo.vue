<template>
  <router-link to="/" class="m-back">&lt; Home</router-link>
  <div class="m-example">
    <p>Icon Font</p>
    <div
      v-for="item in iconList"
      :key="item"
    >
      <v-icon
        size="xs"
        color="green"
        :name="item.split('/')[0]"
      ></v-icon>
      {{ item }}
    </div>
  </div>
  <!--
  <div class="m-example">
    <p>SVG Icon</p>
    <div
      v-for="svgIcon in svgList"
      :key="svgIcon"
    >
      <v-icon
        :name="svgIcon"
        :class="{ 'm-example-invert': svgIcon === 'spinner' }"
        size="lg"
      ></v-icon>
      {{ svgIcon }}
    </div>      
  </div>
  -->
  <div class="m-example">
    <p>Icon Size</p>
    <div class="m-example-item">
      <v-icon name="location" size="xs"></v-icon>
      <p>xs</p>
    </div>
    <div class="m-example-item">
      <v-icon name="location" size="sm"></v-icon>
      <p>sm</p>
    </div>
    <div class="m-example-item">
      <v-icon name="location" size="md"></v-icon>
      <p>md</p>
    </div>
    <div class="m-example-item">
      <v-icon name="location" size="lg"></v-icon>
      <p>lg</p>
    </div>
  </div>
  <div class="m-example">
    <p>Icon Color</p>
    <div class="m-example-item">
      <v-icon name="rectangle" color="orange"></v-icon>
      <p>Orange</p>
    </div>
    <div class="m-example-item">
      <v-icon name="rectangle" color="blue"></v-icon>
      <p>Blue</p>
    </div>
    <div class="m-example-item">
      <v-icon name="rectangle" color="purple"></v-icon>
      <p>Purple</p>
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
    const iconList = ref([
      'checked/success',
      'check-disabled',
      'clear/fail'
    ])

    return {
      iconList: iconList.value
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/styles/example.scss';
</style>
