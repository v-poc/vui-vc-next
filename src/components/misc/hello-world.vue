<template>
  <section>
    <v-tag
      type="fill"
      shape="circle"
      fill-color="#36C"
      font-color="#FFF"
      @click="showPopup(true)"
    >{{ msg }}</v-tag>    
  </section>
  <v-progress-circular
    :size="80"
    :color="state.strokeColor"
    :value="state.count / 10"
    :width="5"
    :duration="500"
    is-animated
    @click="showPopup(true)"
  >
    <v-amount
      :value="state.count * 10"
      :precision="0"
      :duration="state.animDuration"
      is-animated
    ></v-amount>
    <span class="unit">%</span>
  </v-progress-circular>
  <v-popup
    position="bottom"
    v-model:value="state.isShowPopupTitleBar"
  >
    <v-popup-title-bar
      title="Hello Vue 3.0"
      describe="One Piece."
      ok-text="ok"
      cancel-text="cancel"
      @confirm="state.isShowPopupTitleBar=false"
      @cancel="state.isShowPopupTitleBar=false"
    ></v-popup-title-bar>
    <div class="v-example-op-default">
      <v-one-piece @click="showPopup(true)" />
    </div>
  </v-popup>  
  <v-landscape
    v-model:value="state.isShowPopup"
    mask-closable
    transition="v-bounce"
  >
    <div class="v-example-op">
      <v-one-piece :scale="1.8"/>
    </div>    
  </v-landscape>
  <v-action-bar :actions="state.actionData"></v-action-bar>
</template>

<script>
import { computed, reactive } from 'vue'
// import { VActionBar, VAmount, VProgress, VTag, VLandscape, VOnePiece, VPopup, VPopupTitleBar } from 'vui-vc-next'
// import VActionBar from '../action-bar/index.vue'
// import VAmount from '../amount/index.vue'
// import VProgressCircular from '../progress/circular.vue'
// import VTag from '../tag/index.vue'
// import VLandscape from '../landscape/index.vue'
// import VOnePiece from './op.vue'
// import VPopup from '../popup/index.vue'
// import VPopupTitleBar from '../popup/title-bar.vue'

export default {
  name: 'v-hello-world',

  // components: {
  //   VActionBar,
  //   VAmount,
  //   VProgressCircular,
  //   VTag,
  //   VLandscape,
  //   VOnePiece,
  //   VPopup,
  //   VPopupTitleBar
  // },

  props: {
    msg: String
  },

  setup() {
    const state = reactive({
      isShowPopupTitleBar: false,
      isShowPopup: false,
      count: 0,
      animDuration: 1000,
      strokeColor: computed(() => (state.count < 10 ? '#36C' : '#FC9153')),
      actionData: [
        {
          text: 'Reset',
          type: computed(() => (state.count > 0 ? 'default' : 'disabled')),
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
            state.count === 10 && setTimeout(() => (state.isShowPopupTitleBar = true), state.animDuration)
          }
        }
      ]
    })
    
    const showPopup = (val) => {
      state.isShowPopup = val
    }    

    return {
      state,
      showPopup
    }
  }
}
</script>

<style lang="scss">
</style>
