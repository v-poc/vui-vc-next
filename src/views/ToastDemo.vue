<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Toast by js-api</p>
    <p>
      <v-button
        type="primary"
        size="small"
        inline
        round
        @click="showInfo"
      >Test pure text</v-button>
    </p>
    <p>
      <v-button
        type="primary"
        size="small"
        inline
        round
        @click="showSucceed"
      >Test action succeed</v-button>
    </p>
    <p>
      <v-button
        type="primary"
        size="small"
        inline
        round
        @click="showFailed"
      >Test action failed</v-button>
    </p>
    <p>
      <v-button
        type="primary"
        size="small"
        inline
        round
        @click="showLoading"
      >Test loading</v-button>
    </p>
  </div>
  <div class="v-example">
    <p>Customized position with transparent mask</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="showPosition"
    >Test customized position</v-button>
  </div>
  <div class="v-example">
    <p>Toast by local component</p>
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
// import VToast from '../components/toast/toast.vue'
// import VButton from '../components/button/index.vue'

export default {
  name: 'toast-demo',

  // inheritAttrs: false,

  // components: {
  //   VToast,
  //   VButton
  // },

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
@import '../assets/styles/vui-example.scss';
</style>
