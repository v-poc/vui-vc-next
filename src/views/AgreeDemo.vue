<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example v-example-agree">
    <p>Agree - {{state.isChecked ? 'Checked' : 'Unchecked' }} {{state.isDisabled ? '- Disabled' : '' }}</p>
    <fieldset>
      <legend>Email preferences</legend>
      <v-agree
        v-model:value="state.isChecked"
        :disabled="state.isDisabled"
        @change="showInfo"
      >Send me occasional product updates and offers.</v-agree>
    </fieldset>
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
import { logInfo } from '../utils/index'
// import VAgree from '../components/agree/index.vue'

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

.v-example-agree {
  fieldset {
    padding: 0.1rem 0.15rem 0.15rem 0.15rem;

    legend {
      font-size: 0.3rem;
      font-weight: bold;
      padding: 0 0.1rem;
    }
  }
}
</style>
