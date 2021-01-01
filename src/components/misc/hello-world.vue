<template>
  <!-- START VTag -->
  <section>
    <v-tag
      type="fill"
      shape="circle"
      fill-color="#36C"
      font-color="#FFF"
      @click="showPopup(true)"
    >{{ msg }}</v-tag>    
  </section>
  <!-- END VTag -->
  <!-- START VProgress -->
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
  <!-- END VProgress -->
  <!-- START VPopup -->
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
    <div class="v-example-popup-bottom">
      <v-cube-anim
        :scale="1.2"
        front="Vue3"
        back="Vite"
        bottom="Sass"
        right="VUI"
        @click="showPopup(true)"
      >
        <template #top>
          <img v-lazy="'https://nikoni.top/images/others/mj.png'" />
        </template>
        <template #left>
          <div class="v-example-op-cube">
            <v-one-piece :scale="0.8" />
          </div>
        </template>
      </v-cube-anim>
    </div>
  </v-popup>
  <!-- END VPopup -->
  <!-- START VLandscape -->  
  <v-landscape
    v-model:value="state.isShowPopup"
    mask-closable
    :show-close="false"
    transition="v-bounce"
  >
    <div class="v-example-op">
      <v-one-piece :scale="1.8"/>
    </div>    
  </v-landscape>
  <!-- END VLandscape -->
  <!-- START VActionBar -->
  <v-action-bar :actions="state.actionData"></v-action-bar>
  <!-- END VActionBar -->
</template>

<script>
import { computed, reactive } from 'vue'
// import { VActionBar, VAmount, VProgress, VTag, VLandscape, VOnePiece, VPopup, VPopupTitleBar, VCubeAnim } from 'vui-vc-next'
// import VActionBar from '../action-bar/index.vue'
// import VAmount from '../amount/index.vue'
// import VProgressCircular from '../progress/circular.vue'
// import VTag from '../tag/index.vue'
// import VLandscape from '../landscape/index.vue'
// import VOnePiece from './op.vue'
// import VPopup from '../popup/index.vue'
// import VPopupTitleBar from '../popup/title-bar.vue'
// import VCubeAnim from './cube-anim.vue'

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
  //   VPopupTitleBar,
  //   VCubeAnim
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
          onClick: () => (state.count = 0)
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
