<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Watermark - Basic</p>
    <v-watermark
      class="text-container"
      content="Hello VUI"
      spacing="10vw"
      opacity="0.6"
    >
      <p>
        Vue is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.
      </p>
      <p>
        If you’d like to learn more about Vue before diving in, we created a video walking through the core principles and a sample project.
      </p>
      <p>
        The easiest way to try out Vue.js is using the Hello World example. Feel free to open it in another tab and follow along as we go through some basic examples.
      </p>
      <p>
        The Installation page provides more options of installing Vue. Note: We do not recommend that beginners start with vue-cli, especially if you are not yet familiar with Node.js-based build tools.
      </p>
    </v-watermark>
  </div>
</template>

<script>
// import VWatermark from '/@components/watermark/index.vue'

export default {
  name: 'watermark-demo',

  inheritAttrs: false

  // components: {
  //   VWatermark
  // }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';
</style>
