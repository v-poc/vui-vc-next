<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Agree - {{state.isChecked ? 'Checked' : 'Unchecked' }} {{state.isDisabled ? '- Disabled' : '' }}</p>
    <v-agree
      v-model:value="state.isChecked"
      :disabled="state.isDisabled"
      @change="showInfo"
    >Some agreement text</v-agree>
  </div>
  <div class="v-example">
    <p>Agree - Toggle Disabled state</p>
    <v-button
      :type="state.isDisabled ? 'default' : 'primary'"
      size="small"
      inline
      round
      @click="onToggle"
    >Toggle Disabled agree control</v-button>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { logInfo } from '/@utils/index'
// import VAgree from '/@components/agree/index.vue'

export default {
  name: 'agree-demo',

  inheritAttrs: false,

  // components: {
  //   VAgree
  // },

  setup() {
    const state = reactive({
      isChecked: true,
      isDisabled: false
    })

    // show info in console log
    const showInfo = (e) => {
      logInfo(
        `[AgreeDemo] Agree control status: ${state.isChecked ? 'Checked' : 'Unchecked'}`
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
