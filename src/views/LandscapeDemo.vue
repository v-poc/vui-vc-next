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
      v-model:value="popupShow.eventListenerMode"
      @show="showInfo('show landscape popup')"
      @hide="showInfo('hide landscape popup')"
    >
      <img v-lazy="'https://nikoni.top/images/others/mj.png'" />
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
      v-model:value="popupShow.maskClosableMode"
      @mask-click="showInfo('click mask to close landscape popup')"
      mask-closable
      :show-close="false"
      transition="v-bounce"
    >
      <div class="v-example-op">
        <v-one-piece :scale="1.8" />
      </div>
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
      v-model:value="popupShow.fullscreenMode"
      fullscreen
    >
      <img v-lazy="'https://nikoni.top/images/others/kongfu.png'" />
    </v-landscape>
  </div>
</template>

<script>
import { ref } from 'vue'
import { logInfo } from '../utils/index'
import Toast from '../components/toast/index'
import useShowPopup from '../composables/useShowPopup'
// import VOnePiece from '../components/misc/op.vue'
// import VLandscape from '../components/landscape/index.vue'
// import VButton from '../components/button/index.vue'

export default {
  name: 'landscape-demo',

  inheritAttrs: false,

  // components: {
  //   VOnePiece
  //   VLandscape,
  //   VButton
  // },

  setup() {
    const popup = useShowPopup()

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
      popupShow: popup.mapping,
      showPopup: popup.showPopup,
      showInfo
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';

::v-deep(.v-landscape-content) {
  width: 100vw;
  text-align: center;

  img {
    width: auto;
  }
}

.v-example-op {
  padding-top: 1.5rem;
  height: 5.5rem;
}
</style>
