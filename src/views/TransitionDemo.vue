<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <button @click="showPopup(0, true)">Fade</button>
    <v-popup
      :value="state.popupShow[0]"
      @input="val => showPopup(0, val)"
      transition="v-fade"
    >
      <div class="v-example-popup v-example-popup-center">
        <p>Fade</p>
        <img
          src="../assets/images/kongfu.gif"
          style="width: 4.5rem"
        />
      </div>
    </v-popup>
  </div>
  <div class="v-example">
    <button @click="showPopup(1, true)">Fade Up</button>
    <v-popup
      :value="state.popupShow[1]"
      @input="val => showPopup(1, val)"
      transition="v-fade-up"
    >
      <div class="v-example-popup v-example-popup-center">
        <p>Fade Up</p>
        <img
          src="../assets/images/kongfu.gif"
          style="width: 4.5rem"
        />
      </div>
    </v-popup>
  </div>
  <div class="v-example">
    <button @click="showPopup(2, true)">Fade Down</button>
    <v-popup
      :value="state.popupShow[2]"
      @input="val => showPopup(2, val)"
      transition="v-fade-down"
    >
      <div class="v-example-popup v-example-popup-center">
        <p>Fade Down</p>
        <img
          src="../assets/images/kongfu.gif"
          style="width: 4.5rem"
        />
      </div>
    </v-popup>
  </div>
  <div class="v-example">
    <button @click="showPopup(3, true)">Fade Left</button>
    <v-popup
      :value="state.popupShow[3]"
      @input="val => showPopup(3, val)"
      transition="v-fade-left"
    >
      <div class="v-example-popup v-example-popup-center">
        <p>Fade Left</p>
        <img
          src="../assets/images/kongfu.gif"
          style="width: 4.5rem"
        />
      </div>
    </v-popup>
  </div>
  <div class="v-example">
    <button @click="showPopup(4, true)">Fade Right</button>
    <v-popup
      :value="state.popupShow[4]"
      @input="val => showPopup(4, val)"
      transition="v-fade-right"
    >
      <div class="v-example-popup v-example-popup-center">
        <p>Fade Right</p>
        <img
          src="../assets/images/kongfu.gif"
          style="width: 4.5rem"
        />
      </div>
    </v-popup>
  </div>
  <div class="v-example">
    <button @click="showPopup(5, true)">Bounce</button>
    <v-popup
      :value="state.popupShow[5]"
      @input="val => showPopup(5, val)"
      transition="v-bounce"
    >
      <div class="v-example-popup v-example-popup-center">
        <p>Bounce</p>
        <img
          src="../assets/images/kongfu.gif"
          style="width: 4.5rem"
        />
      </div>
    </v-popup>
  </div>
  <div class="v-example">
    <button @click="showPopup(6, true)">Punch</button>
    <v-popup
      :value="state.popupShow[6]"
      @input="val => showPopup(6, val)"
      transition="v-punch"
    >
      <div class="v-example-popup v-example-popup-center">
        <p>Punch</p>
        <img
          src="../assets/images/kongfu.gif"
          style="width: 4.5rem"
        />
      </div>
    </v-popup>
  </div>
  <div class="v-example">
    <button @click="showPopup(7, true)">Zoom</button>
    <v-popup
      :value="state.popupShow[7]"
      @input="val => showPopup(7, val)"
      transition="v-zoom"
    >
      <div class="v-example-popup v-example-popup-center">
        <p>Zoom</p>
        <img
          src="../assets/images/kongfu.gif"
          style="width: 4.5rem"
        />
      </div>
    </v-popup>
  </div>
  <div class="v-example">
    <button @click="showPopup(8, true)">Slide Up</button>
    <v-popup
      :value="state.popupShow[8]"
      @input="val => showPopup(8, val)"
      transition="v-slide-up"
    >
      <div class="v-example-popup v-example-popup-center">
        <p>Slide Up</p>
        <img
          src="../assets/images/kongfu.gif"
          style="width: 4.5rem"
        />
      </div>
    </v-popup>
  </div>
  <div class="v-example">
    <button @click="showPopup(9, true)">Slide Down</button>
    <v-popup
      :value="state.popupShow[9]"
      @input="val => showPopup(9, val)"
      transition="v-slide-down"
    >
      <div class="v-example-popup v-example-popup-center">
        <p>Slide Down</p>
        <img
          src="../assets/images/kongfu.gif"
          style="width: 4.5rem"
        />
      </div>
    </v-popup>
  </div>
  <div class="v-example">
    <button @click="showPopup(10, true)">Slide Left</button>
    <v-popup
      :value="state.popupShow[10]"
      @input="val => showPopup(10, val)"
      transition="v-slide-left"
    >
      <div class="v-example-popup v-example-popup-center">
        <p>Slide Left</p>
        <img
          src="../assets/images/kongfu.gif"
          style="width: 4.5rem"
        />
      </div>
    </v-popup>
  </div>
  <div class="v-example">
    <button @click="showPopup(11, true)">Slide Right</button>
    <v-popup
      :value="state.popupShow[11]"
      @input="val => showPopup(11, val)"
      transition="v-slide-right"
    >
      <div class="v-example-popup v-example-popup-center">
        <p>Slide Right</p>
        <img
          src="../assets/images/kongfu.gif"
          style="width: 4.5rem"
        />
      </div>
    </v-popup>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import VPopup from '../components/popup/index.vue'

export default defineComponent({
  name: 'transition-demo',

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
