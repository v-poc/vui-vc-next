<template>
  <section>
    <v-tag
      type="fill"
      shape="circle"
      fill-color="#36C"
      font-color="#FFF"
      @click="state.showPopup=true"
    >{{ msg }}</v-tag>
    <v-landscape
      :value="state.showPopup"
      @input="val => state.showPopup=val"
      mask-closable
      transition="v-bounce"
    >
      <img src="../../assets/images/op.png" />
    </v-landscape>    
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
  <v-action-bar :actions="state.actionData"></v-action-bar>
</template>

<script>
import { computed, reactive } from 'vue'
// import { VActionBar, VAmount, VProgress, VTag, VLandscape } from 'vui-vc-next'

export default {
  name: 'hello-world',

  // components: {
  //   [VActionBar.name]: VActionBar,
  //   [VAmount.name]: VAmount,
  //   [VProgress.name]: VProgress,
  //   [VTag.name]: VTag,
  //   [VLandscape.name]: VLandscape
  // },

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
