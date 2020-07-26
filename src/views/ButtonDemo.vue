<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Basic Button</p>
    <v-button type="default">Default Button</v-button>
    <v-button
      type="default"
      inactive
    >Default Button(inactive)</v-button>
    <v-button type="primary">Primary Button</v-button>
    <v-button
      type="primary"
      inactive
    >Primary Button(inactive)</v-button>
  </div>
  <div class="v-example">
    <p>Button Text link</p>
    <v-button
      type="link"
      inactive
    >
      Inactive text button with Icon
      <v-icon
        name="arrow-right"
        size="xs"
      ></v-icon>
    </v-button>
    <v-button
      type="link"
      icon="message"
    >Message text</v-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import VButton from '../components/button/index.vue'
import VIcon from '../components/icon/index.vue'

export default defineComponent({
  name: 'button-demo',

  inheritAttrs: false,

  components: {
    VButton,
    VIcon
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/styles/example.scss';
</style>
