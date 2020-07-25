<template>
  <router-link to="/" class="m-back">&lt; Home</router-link>
  <div class="m-example">
    <button @click="showPopup('center', true)">Test popup from center</button>
    <v-popup
      position="center"
      transition="m-punch"
      :value="state.popupShow.center"
      @input="val => showPopup('center', val)"
    >
      <div class="m-example-popup m-example-popup-center">popup from center</div>
    </v-popup>
  </div>
  <div class="m-example">
    <button @click="showPopup('bottom', true)">Test popup from bottom</button>
    <v-popup
      position="bottom"
      :value="state.popupShow.bottom"
      @input="val => showPopup('bottom', val)"
    >
      <div class="m-example-popup m-example-popup-bottom">popup from bottom</div>
    </v-popup>
  </div>
  <div class="m-example">
    <button @click="showPopup('top', true)">Test popup from top</button>
    <v-popup
      position="top"
      :value="state.popupShow.top"
      @input="val => showPopup('top', val)"
      :hasMask="false"
    >
      <div class="m-example-popup m-example-popup-top">
        popup from top
        <button @click="showPopup('top', false)">close</button>
      </div>
    </v-popup>
  </div>
  <div class="m-example">
    <button @click="showPopup('left', true)">Test popup from left</button>
    <v-popup position="left" :value="state.popupShow.left" @input="val => showPopup('left', val)">
      <div class="m-example-popup m-example-popup-left">popup from left</div>
    </v-popup>
  </div>
  <div class="m-example">
    <button @click="showPopup('right', true)">Test popup from right</button>
    <v-popup
      position="right"
      :value="state.popupShow.right"
      @input="val => showPopup('right', val)"
    >
      <div class="m-example-popup m-example-popup-right">popup from right</div>
    </v-popup>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import VPopup from '../components/popup/index.vue'

export default defineComponent({
  name: 'popup-demo',

  inheritAttrs: false,

  components: {
    VPopup
  },

  setup() {
    const state = reactive({
      popupShow: {}
    })

    const showPopup = (pos, isShow) => {
      state.popupShow[pos] = isShow
    }

    return {
      state,
      showPopup
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/styles/example.scss';
</style>
