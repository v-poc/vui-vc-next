<template>
  <router-link to="/" class="m-back">&lt; Home</router-link>
  <div class="m-example">
    <p>Tag Shape - Circle</p>
    <v-tag type="fill" size="tiny" shape="circle" fill-color="#FC5353">100</v-tag>
    <v-tag type="fill" size="small" shape="circle" fill-color="#36C" font-color="#FFF">promotion</v-tag>
    <v-tag type="ghost" size="small" shape="circle">10%</v-tag>
    <v-tag
      type="fill"
      size="small"
      shape="circle"
      sharp="bottom-right"
      fill-color="#36C"
      font-color="#FFF"
    >half price</v-tag>
  </div>
  <div class="m-example">
    <p>Tag Shape - Special</p>
    <v-tag type="fill" shape="coupon" fill-color="#36C" font-color="#FFF">Coupon Ticket</v-tag>
    <v-tag type="fill" shape="quarter" fill-color="#FC9191" font-color="#FFF">&times;</v-tag>
    <v-tag type="fill" shape="bubble" font-color="#FFF">88</v-tag>
  </div>
  <div class="m-example">
    <p>Tag Shape - No fill color</p>
    <v-tag type="fill" shape="square" fill-color="">&pound;100</v-tag>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import VTag from '../components/tag/index.vue'

export default defineComponent({
  name: 'tag-demo',

  inheritAttrs: false,

  components: {
    VTag
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/styles/example.scss';
</style>
