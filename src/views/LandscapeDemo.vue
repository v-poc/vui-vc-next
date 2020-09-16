<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Event handler</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="showPopup('eventListenerMode', true)"
    >Test event handler</v-button>
    <v-landscape
      :value="popupShow.eventListenerMode"
      @input="val => showPopup('eventListenerMode', val)"
      @show="showInfo('show landscape popup')"
      @hide="showInfo('hide landscape popup')"
    >
      <img src="../assets/images/mj.png" />
    </v-landscape>
  </div>
  <div class="v-example">
    <p>Mask closable</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="showPopup('maskClosableMode', true)"
    >Test mask closable</v-button>
    <v-landscape
      :value="popupShow.maskClosableMode"
      @input="val => showPopup('maskClosableMode', val)"
      @mask-click="showInfo('click mask to close landscape popup')"
      :mask-closable="true"
      transition="v-bounce"
    >
      <img src="../assets/images/cg.png" />
    </v-landscape>
  </div>
  <div class="v-example">
    <p>Fullscreen</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="showPopup('fullscreenMode', true)"
    >Test fullscreen mode</v-button>
    <v-landscape
      :value="popupShow.fullscreenMode"
      @input="val => showPopup('fullscreenMode', val)"
      fullscreen
    >
      <img src="../assets/images/kongfu.png" />
    </v-landscape>
  </div>
</template>

<script>
import { ref } from 'vue'
import { logInfo } from '../utils/index'
import Toast from '../components/toast/index'
// import VLandscape from '../components/landscape/index.vue'
// import VButton from '../components/button/index.vue'

export default {
  name: 'landscape-demo',

  inheritAttrs: false,

  // components: {
  //   VLandscape,
  //   VButton
  // },

  setup() {
    const popupShow = ref({})

    // show/hide popup
    const showPopup = (pos, isShow) => {
      popupShow.value[pos] = isShow
    }

    // show info in console log
    const showInfo = (content) => {
      logInfo(`[LandscapeDemo] ${content}`)
      Toast({
        content,
        duration: 650,
        position: 'top'
      })      
    }    

    return {
      popupShow: popupShow.value,
      showPopup,
      showInfo
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';
</style>
