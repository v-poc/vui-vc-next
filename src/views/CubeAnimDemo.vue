<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Cube Animation - slots usage</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="showPopup('cube', true)"
    >Test Cube Animation</v-button>
    <v-popup
      position="bottom"
      v-model:value="popupShow.cube"
    >
      <v-popup-title-bar
        only-close
        large-radius
        title-align="center"
        title="Cube Animation Demo"
        describe="powered by vui.next"
        @cancel="hidePopupTitleBar('closeButton')"
      ></v-popup-title-bar>
      <div class="v-example-popup v-example-popup-bottom">
        <v-cube-anim
          :scale="1.2"
          front="Vue3"
          back="Vite"
          bottom="Sass"
          right="VUI"
          @click="showPopup('maskClosableMode', true)"
        >
          <template #top>
            <img v-lazy="'https://nikoni.top/images/others/mj.png'"/>
          </template>
          <template #left>
            <div class="v-example-op-cube">
              <v-one-piece :scale="0.8" />
            </div>
          </template>          
        </v-cube-anim>
      </div>
    </v-popup>
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
</template>

<script>
import { reactive, ref } from 'vue'
import { logInfo } from '../utils/index'
import Toast from '../components/toast/index'
import useShowPopup from '../composables/useShowPopup'
// import VCubeAnim from '../components/misc/cube-anim.vue'
// import VOnePiece from '../components/misc/op.vue'
// import VPopup from '../components/popup/index.vue'
// import VButton from '../components/button/index.vue'
// import VPopupTitleBar from '../components/popup/title-bar.vue'
// import VLandscape from '../components/landscape/index.vue'

export default {
  name: 'cube-anim-demo',

  inheritAttrs: false,

  // components: {
  //   VCubeAnim,
  //   VOnePiece
  //   VPopup,
  //   VButton,
  //   VPopupTitleBar,
  //   VLandscape
  // },

  setup() {
    const popup = useShowPopup()

    // show info in console log
    const showInfo = (content) => {
      logInfo(`[CubeAnimDemo] ${content}`)
      Toast.info(content)
    }

    const hidePopupTitleBar = (info) => {
      popup.showPopup('bottom', false)
      popup.showPopup('bottomView', false)
      popup.showPopup('cube', false)
      showInfo(`${info} hide popup-title-bar`)
    }

    return {
      popupShow: popup.mapping,
      showPopup: popup.showPopup,
      showInfo,
      hidePopupTitleBar
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';

::v-deep(.v-landscape-content) {
  width: 100vw;
}

.v-example-op {
  padding-top: 1.5rem;
  height: 5.5rem;
}

.v-example-op-cube {
  margin-top: -0.5rem;
}
</style>
