<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Switch - {{state.isActive ? 'Active' : 'Inactive' }} {{state.isDisabled ? '- Disabled' : '' }}</p>
    <v-switch
      v-model:value="state.isActive"
      :disabled="state.isDisabled"
      @change="showInfo"
    />
  </div>
  <div class="v-example">
    <p>Switch - Toggle Disabled state</p>
    <v-button
      :type="state.isDisabled ? 'default' : 'primary'"
      size="small"
      inline
      round
      @click="onToggle"
    >Toggle Disabled switch</v-button>
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
  //   VSwitch
  // },

  setup() {
    const state = reactive({
      isActive: true,
      isDisabled: false
    })

    // show info in console log
    const showInfo = (e) => {
      logInfo(
        `[SwitchDemo] switch status: ${state.isActive ? 'Active' : 'Inactive'}`
      )
    }

    const onToggle = () => {
      state.isDisabled = !state.isDisabled
    }

    return {
      state,
      showInfo,
      onToggle
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';
</style>
