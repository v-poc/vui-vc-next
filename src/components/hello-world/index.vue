<template>
  <img
    style="width: 50%"
    alt="Vue logo"
    src="https://vuejs.org/images/logo.png"
    @click="state.showPopup=true"
  />
  <section>
    <v-tag
      type="fill"
      shape="circle"
      fill-color="#36C"
      font-color="#FFF"
      @click="state.showPopup=true"
    >{{ msg }}</v-tag>    
  </section>
  <v-progress-circular
    :size="80"
    :color="state.strokeColor"
    :value="state.count / 10"
    :width="5"
    :duration="500"
    is-animated
    @click="state.showPopup=true"
  >
    <v-amount
      :value="state.count * 10"
      :precision="0"
      is-animated
    ></v-amount>%
  </v-progress-circular>
  <v-landscape
    :value="state.showPopup"
    @input="val => state.showPopup=val"
    mask-closable
    transition="v-bounce"
  >
    <img src="../../assets/images/op.png" />
  </v-landscape>
  <v-action-bar :actions="state.actionData"></v-action-bar>
</template>

<script>
import { computed, reactive } from 'vue'
// import { VActionBar, VAmount, VProgress, VTag, VLandscape } from 'vui-vc-next'
import VActionBar from '../action-bar/index.vue'
import VAmount from '../amount/index.vue'
import VProgressCircular from '../progress/circular.vue'
import VTag from '../tag/index.vue'
import VLandscape from '../landscape/index.vue'

export default {
  name: 'hello-world',

  components: {
    VActionBar,
    VAmount,
    VProgressCircular,
    VTag,
    VLandscape
  },

  props: {
    msg: String
  },

  setup() {
    const state = reactive({
      showPopup: false,
      count: 0,
      strokeColor: computed(() => (state.count < 10 ? '#36C' : '#FC9153')),
      actionData: [
        {
          text: 'Reset',
          icon: 'clear',
          onClick: () => {
            state.count = 0
          }
        },
        {
          text: computed(() => `Count is: ${state.count}`),
          type: computed(() => (state.count < 10 ? 'primary' : 'disabled')),
          icon: 'edit',
          onClick: () => {
            state.count++
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
section {
  ::v-deep(.v-tag) {
    .size-large {
      font-size: 0.5rem;
    }
  }
}

.v-progress {
  margin-top: 0.2rem;
}
</style>
