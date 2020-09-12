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
        title="The center Title"
        describe="Some sub description."
        ok-text="ok"
        cancel-text="cancel"
        @confirm="hidePopupTitleBar"
        @cancel="hidePopupTitleBar"
      ></v-popup-title-bar>
      <div class="v-example-popup v-example-popup-bottom">popup from bottom</div>
    </v-popup>
  </div>
</template>

<script>
import { ref } from 'vue'
// import VPopup from '../components/popup/index.vue'
// import VButton from '../components/button/index.vue'
// import VPopupTitleBar from '../components/popup/title-bar.vue'

export default {
  name: 'popup-titlebar-demo',

  inheritAttrs: false,

  // components: {
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
      console.info('[PopupDemo]', content)
    }

    const hidePopupTitleBar = () => {
      showPopup('bottom', false)
      showInfo('hide popup-title-bar')
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
</style>
