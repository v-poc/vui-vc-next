<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <button @click="showPopup('eventListenerMode', true)">Test event handler</button>
    <v-landscape
      :value="popupShow.eventListenerMode"
      @input="val => showPopup('eventListenerMode', val)"
      @show="showInfo('show landscape popup')"
      @hide="showInfo('hide landscape popup')"
    >
      <img src="../assets/images/kongfu.gif" />
    </v-landscape>
  </div>
  <div class="v-example">
    <button @click="showPopup('maskClosableMode', true)">Test mask closable</button>
    <v-landscape
      :value="popupShow.maskClosableMode"
      @input="val => showPopup('maskClosableMode', val)"
      :mask-closable="true"
      transition="v-bounce"
    >
      <img src="../assets/images/kongfu.gif" />
    </v-landscape>
  </div>
  <div class="v-example">
    <button @click="showPopup('fullscreenMode', true)">Test fullscreen mode</button>
    <v-landscape
      :value="popupShow.fullscreenMode"
      @input="val => showPopup('fullscreenMode', val)"
      fullscreen
    >
      <img src="../assets/images/kongfu.gif" />
    </v-landscape>
  </div>
</template>

<script>
import { defineComponent, ref, nextTick } from 'vue'
import VLandscape from '../components/landscape/index.vue'

export default defineComponent({
  name: 'landscape-demo',

  inheritAttrs: false,

  components: {
    VLandscape
  },

  setup() {
    const popupShow = ref({})

    // show/hide popup
    const showPopup = (pos, isShow) => {
      popupShow.value[pos] = isShow
    }

    // show info in console log
    const showInfo = (content) => {
      console.info('[LandscapeDemo]', content)
    }

    return {
      popupShow: popupShow.value,
      showPopup,
      showInfo
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/styles/example.scss';
</style>
