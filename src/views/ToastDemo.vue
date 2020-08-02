<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <button @click="showInfo">Test pure text</button>
    <button @click="showSucceed">Test action succeed</button>
    <button @click="showFailed">Test action failed</button>
    <button @click="showLoading">Test loading</button>
    <button @click="showPosition">Test customized position</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Toast from '../components/toast/index'

export default defineComponent({
  name: 'toast-demo',

  inheritAttrs: false,
  
  setup() {
    const showInfo = () => {
      Toast.info('Some pure text')
    }

    const showSucceed = () => {
      Toast.succeed('Action succeed')
    }

    const showFailed = () => {
      Toast.failed('Action failed')
    }

    const showLoading = () => {
      Toast.loading('Loading data...')
      // setTimeout(Toast.hide, 3000)
    }

    const showPosition = () => {
      Toast({
        content: 'Customized position',
        position: 'top'
      })
    }

    return {
      showInfo,
      showSucceed,
      showFailed,
      showLoading,
      showPosition
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/styles/example.scss';
</style>
