<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Show separator</p>
    <v-amount
      :value="1234.126"
      has-separator
    ></v-amount>
  </div>
  <div class="v-example">
    <p>Amount animation</p>
    <v-amount
      :value="state.val"
      :duration="800"
      is-animated
    ></v-amount>
  </div>
  <div class="v-example">
    <p>Show special amount (zh-CN)</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="showPopup('center', true)"
    >Convert to Chinese capital</v-button>
    <v-popup
      position="center"
      transition="v-bounce"
      :value="popupShow.center"
      @input="val => showPopup('center', val)"
    >
      <div class="v-example-popup v-example-popup-center">
        <p>
          <span class="amount-title">Amount:</span>
          <v-amount
            :value="1234.1816"
            :precision="4"
          ></v-amount>
        </p>
        <v-amount
          :value="1234.1816"
          is-capital
        ></v-amount>
      </div>
    </v-popup>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import VAmount from '../components/amount/index.vue'
import VButton from '../components/button/index.vue'
import VPopup from '../components/popup/index.vue'

export default {
  name: 'amount-demo',

  inheritAttrs: false,

  components: {
    VAmount,
    VButton,
    VPopup
  },

  setup() {
    const state = reactive({
      val: 1000
    })

    const popupShow = ref({})

    // show/hide popup
    const showPopup = (pos, isShow) => {
      popupShow.value[pos] = isShow
    }

    onMounted(() => {
      setTimeout(() => {
        state.val = 1500

        setTimeout(() => {
          state.val = 500
        }, 2000)
      }, 2000)
    })

    return {
      state,
      popupShow: popupShow.value,
      showPopup
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';
</style>
