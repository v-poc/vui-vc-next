<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Popup TitleBar</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="showPopup('bottom', true)"
    >Test popup from bottom</v-button>
    <v-popup
      position="bottom"
      :value="popupShow.bottom"
      @input="val => showPopup('bottom', val)"
    >
      <v-popup-title-bar
        title="Hello Vue 3.0"
        describe="One Piece."
        ok-text="ok"
        cancel-text="cancel"
        @confirm="hidePopupTitleBar('confirmButton')"
        @cancel="hidePopupTitleBar('cancelButton')"
      ></v-popup-title-bar>
      <div class="v-example-op">
        <v-one-piece/>
      </div>
    </v-popup>
  </div>
</template>

<script>
import { ref } from 'vue'
import { logInfo } from '../utils/index'
import Toast from '../components/toast/index'
// import VOnePiece from '../components/misc/op.vue'
// import VPopup from '../components/popup/index.vue'
// import VButton from '../components/button/index.vue'
// import VPopupTitleBar from '../components/popup/title-bar.vue'

export default {
  name: 'popup-titlebar-demo',

  inheritAttrs: false,

  // components: {
  //   VOnePiece
  //   VPopup,
  //   VButton,
  //   VPopupTitleBar
  // },

  setup() {
    const popupShow = ref({})

    // show/hide popup
    const showPopup = (pos, isShow) => {
      popupShow.value[pos] = isShow
    }

    // show info in console log
    const showInfo = (content) => {
      logInfo(`[PopupTitleBarDemo] ${content}`)
      Toast.info(content)
    }

    const hidePopupTitleBar = (info) => {
      showPopup('bottom', false)
      showInfo(`${info} hide popup-title-bar`)
    }

    return {
      popupShow: popupShow.value,
      showPopup,
      showInfo,
      hidePopupTitleBar
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';

.v-example-op {
  height: 3.5rem;
  background: #FFF;
}
</style>
