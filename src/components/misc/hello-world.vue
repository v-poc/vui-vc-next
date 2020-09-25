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
      is-animated
    ></v-amount>
    <span class="unit">%</span>
  </v-progress-circular>
  <v-landscape
    :value="state.isShowPopup"
    @input="val => showPopup(val)"
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
  name: 'v-hello-world',

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
      isShowPopup: false,
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

<style lang="scss" scoped>
::v-deep(.v-tag) {
  .size-large {
    font-size: 0.5rem;
  }
}

.v-progress {
  margin-top: 0.2rem;

  span.unit {
    font-size: 0.25rem;
  }  
}
</style>
