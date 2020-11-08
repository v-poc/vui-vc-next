<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Result type - Lost</p>
    <v-result-page type="lost"></v-result-page>
  </div>
  <div class="v-example">
    <p>Result page - Customized image</p>
    <v-result-page
      img-url="https://nikoni.top/images/vui-vc-qrcode.png"
      text="The result title"
      sub-text="refresh page to have a look"
      :buttons="state.buttons"
    ></v-result-page>
  </div>
  <div class="v-example">
    <p>Result type - Empty</p>
    <v-result-page type="empty"></v-result-page>
  </div>
</template>

<script>
import { reactive } from 'vue'
// import VResultPage from '/@components/result-page/index.vue'
import Toast from '/@components/toast/index'

export default {
  name: 'result-page-demo',

  inheritAttrs: false,

  // components: {
  //   VResultPage
  // },

  setup() {
    const state = reactive({
      buttons: [
        {
          text: 'Normal button',
          icon: 'success',
          handler() {
            Toast.succeed('Click normal button')
          }
        },
        {
          text: 'Primary button',
          icon: 'security',
          type: 'primary',
          handler() {
            Toast({
              icon: 'security',
              content: 'Click primary button'
            })
          }
        }
      ]
    })

    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';

::v-deep(.v-icon.icon-svg.v-icon-no-result.lg) {
  width: 1.3rem;
  height: 0.9rem;
}
</style>
