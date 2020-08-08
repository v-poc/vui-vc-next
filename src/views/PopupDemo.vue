<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <button @click="showPopup('center', true)">Test popup from center</button>
    <v-popup
      position="center"
      transition="v-punch"
      :value="popupShow.center"
      @input="val => showPopup('center', val)"
    >
      <div class="v-example-popup v-example-popup-center">
        <p>popup from center</p>
        <img
          src="../assets/images/kongfu.gif"
          style="width: 4.5rem"
        />
      </div>
    </v-popup>
  </div>
  <div class="v-example">
    <button @click="showPopup('bottom', true)">Test popup from bottom</button>
    <v-popup
      position="bottom"
      :value="popupShow.bottom"
      @input="val => showPopup('bottom', val)"
    >
      <div class="v-example-popup v-example-popup-bottom">popup from bottom</div>
    </v-popup>
  </div>
  <div class="v-example">
    <button @click="showPopup('top', true)">Test popup from top</button>
    <v-popup
      position="top"
      :value="popupShow.top"
      @input="val => showPopup('top', val)"
      :hasMask="false"
    >
      <div class="v-example-popup v-example-popup-top">
        popup from top
        <button @click="showPopup('top', false)">close</button>
      </div>
    </v-popup>
  </div>
  <div class="v-example">
    <button @click="showPopup('left', true)">Test popup from left</button>
    <v-popup
      position="left"
      :value="popupShow.left"
      @input="val => showPopup('left', val)"
    >
      <div class="v-example-popup v-example-popup-left">popup from left</div>
    </v-popup>
  </div>
  <div class="v-example">
    <button @click="showPopup('right', true)">Test popup from right</button>
    <v-popup
      position="right"
      :value="popupShow.right"
      @input="val => showPopup('right', val)"
    >
      <div class="v-example-popup v-example-popup-right">popup from right</div>
    </v-popup>
  </div>
</template>

<script>
import { ref } from 'vue'
import VPopup from '../components/popup/index.vue'

export default {
  name: 'popup-demo',

  inheritAttrs: false,

  components: {
    VPopup
  },

  setup() {
    const popupShow = ref({})

    // show/hide popup
    const showPopup = (pos, isShow) => {
      popupShow.value[pos] = isShow
    }

    return {
      popupShow: popupShow.value,
      showPopup
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/example.scss';
</style>
