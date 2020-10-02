<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Switch - {{state.isActive ? 'Active' : 'Inactive' }}</p>
    <v-switch
      v-model:value="state.isActive"
      @change="showInfo"
    />
  </div>
</template>

<script>
import { reactive } from 'vue'
import { logInfo } from '../utils/index'
// import VSwitch from '../components/switch/index.vue'

export default {
  name: 'switch-demo',

  inheritAttrs: false,

  // components: {
  //   VSwitch,
  // },

  setup() {
    const state = reactive({
      isActive: true
    })

    // show info in console log
    const showInfo = () => {
      logInfo(`[SwitchDemo] switch status: ${state.isActive ? 'Active' : 'Inactive' }`)
      // Toast.info(content)
    }

    return {
      state,
      showInfo
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';
</style>
