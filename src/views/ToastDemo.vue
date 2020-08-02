<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p><button
        disabled
        @click="showInfo"
      >Test pure text</button></p>
    <p><button
        disabled
        @click="showSucceed"
      >Test action succeed</button></p>
    <p><button
        disabled
        @click="showFailed"
      >Test action failed</button></p>
    <p><button
        disabled
        @click="showLoading"
      >Test loading</button></p>
    <p><button
        disabled
        @click="showPosition"
      >Test customized position</button></p>
  </div>
  <div class="v-example">
    <v-button
      type="primary"
      inline
      round
      @click="showToast"
    >Test to show toast</v-button>
    <v-toast
      ref="toastNode"
      :duration="1500"
      icon="security"
      content="Some message text"
    ></v-toast>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
// import Toast from '../components/toast/index'
import VToast from '../components/toast/toast.vue'
import VButton from '../components/button/index.vue'

export default defineComponent({
  name: 'toast-demo',

  inheritAttrs: false,

  components: {
    VToast,
    VButton
  },

  setup() {
    const showInfo = () => {
      // Toast.info('Some pure text')
      console.log('Some pure text')
    }

    const showSucceed = () => {
      // Toast.succeed('Action succeed')
      console.log('Action succeed')
    }

    const showFailed = () => {
      // Toast.failed('Action failed')
      console.log('Action failed')
    }

    const showLoading = () => {
      // Toast.loading('Loading data...')
      console.log('Loading data...')
    }

    const showPosition = () => {
      // Toast({
      //   content: 'Customized position',
      //   position: 'top'
      // })
      console.log('Customized position')
    }

    const toastNode = ref('toastNode')

    const showToast = () => {
      toastNode && toastNode.value.show()
    }

    return {
      showInfo,
      showSucceed,
      showFailed,
      showLoading,
      showPosition,
      toastNode,
      showToast
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/styles/example.scss';
</style>
