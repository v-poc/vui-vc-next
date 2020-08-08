<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p><button
        @click="showInfo"
      >Test pure text</button></p>
    <p><button
        @click="showSucceed"
      >Test action succeed</button></p>
    <p><button
        @click="showFailed"
      >Test action failed</button></p>
    <p><button
        @click="showLoading"
      >Test loading</button></p>
    <p><button
        @click="showPosition"
      >Test customized position</button></p>
  </div>
  <div class="v-example">
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="showToast"
    >Test to show toast</v-button>
    <v-toast
      ref="toastRef"
      :duration="1500"
      icon="security"
      content="Some msg by local component"
    ></v-toast>
  </div>
</template>

<script>
import { ref } from 'vue'
import Toast from '../components/toast/index'
import VToast from '../components/toast/toast.vue'
import VButton from '../components/button/index.vue'

export default {
  name: 'toast-demo',

  inheritAttrs: false,

  components: {
    VToast,
    VButton
  },

  setup() {
    const showInfo = () => {
      Toast.info('Some pure text by js-api')
    }

    const showSucceed = () => {
      Toast.succeed('Action succeed by js-api')
    }

    const showFailed = () => {
      Toast.failed('Action failed by js-api')
    }

    const showLoading = () => {
      Toast.loading('Loading data by js-api')
    }

    const showPosition = () => {
      Toast({
        content: 'Customized position with mask by js-api',
        position: 'top',
        hasMask: true
      })
    }

    const toastRef = ref('toastRef')

    const showToast = () => {
      toastRef && toastRef.value.show()
    }

    return {
      showInfo,
      showSucceed,
      showFailed,
      showLoading,
      showPosition,
      toastRef,
      showToast
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/example.scss';
</style>
