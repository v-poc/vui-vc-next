<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Popup from center</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="showPopup('center', true)"
    >Test popup from center</v-button>
    <v-popup
      position="center"
      transition="v-punch"
      v-model:value="popupShow.center"
    >
      <div class="v-example-popup v-example-popup-center">
        <p>popup from center</p>
        <img v-lazy="'https://nikoni.top/images/others/mj.png'" />
      </div>
    </v-popup>
  </div>
  <div class="v-example">
    <p>Popup from left</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="showPopup('left', true)"
    >Test popup from left</v-button>
    <v-popup
      position="left"
      v-model:value="popupShow.left"
    >
      <div class="v-example-popup v-example-popup-left">
        <p>popup from left</p>
        <img v-lazy="'https://nikoni.top/images/others/mj.png'" />
      </div>
    </v-popup>
  </div>
  <div class="v-example">
    <p>Popup from right</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="showPopup('right', true)"
    >Test popup from right</v-button>
    <v-popup
      position="right"
      v-model:value="popupShow.right"
    >
      <div class="v-example-popup v-example-popup-right">
        <p>popup from right</p>
        <img v-lazy="'https://nikoni.top/images/others/mj.png'" />
      </div>
    </v-popup>
  </div>
  <div class="v-example">
    <p>Popup TitleBar (largeRadius)</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="showPopup('bottom', true)"
    >Test popup from bottom</v-button>
    <v-popup
      position="bottom"
      v-model:value="popupShow.bottom"
    >
      <v-popup-title-bar
        only-close
        large-radius
        title-align="left"
        title="The Like Button"
        describe="powered by vui.next"
        @cancel="hidePopupTitleBar('closeButton')"
      ></v-popup-title-bar>
      <div class="v-example-popup v-example-popup-bottom">
        <v-like-button @on-click="onClickButton" />
      </div>      
    </v-popup>
  </div>
  <div class="v-example">
    <p>Popup without mask</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="showPopup('top', true)"
    >Test popup from top</v-button>
    <v-popup
      position="top"
      v-model:value="popupShow.top"
      :hasMask="false"
    >
      <div class="v-example-popup v-example-popup-top">
        popup from top
        <v-button
          type="link"
          icon="clear"
          @click="showPopup('top', false)"
        >close</v-button>
      </div>
    </v-popup>
  </div>
</template>

<script>
import { ref } from 'vue'
import { logInfo } from '../utils/index'
import Toast from '../components/toast/index'
import VLikeButton from '../components/misc/like-button.vue'
import useShowPopup from '../composables/useShowPopup'
// import VPopup from '../components/popup/index.vue'
// import VButton from '../components/button/index.vue'
// import VPopupTitleBar from '../components/popup/title-bar.vue'

export default {
  name: 'popup-demo',

  inheritAttrs: false,

  components: {
    VLikeButton
  //   VPopup,
  //   VButton,
  //   VPopupTitleBar
  },

  setup() {
    const popup = useShowPopup()

    // show info in console log
    const showInfo = (content) => {
      logInfo(`[PopupTitleBarDemo] ${content}`)
      Toast.info(content)
    }

    const hidePopupTitleBar = (info) => {
      popup.showPopup('bottom', false)
      showInfo(`${info} hide popup-title-bar`)
    }

    const onClickButton = () => Toast.succeed('So cool, nice feeling!')   

    return {
      popupShow: popup.mapping,
      showPopup: popup.showPopup,
      showInfo,
      hidePopupTitleBar,
      onClickButton
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';
</style>
