<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>ActionBar - Basic</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="$_onShowDemo(1)"
    >Test Basic usage</v-button>
    <v-action-bar
      v-if="state.showDemo1"
      :actions="state.btnData1"
    ></v-action-bar>
  </div>
  <div class="v-example">
    <p>ActionBar - Multiple Buttons</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="$_onShowDemo(2)"
    >Test Multiple Buttons</v-button>
    <v-action-bar
      v-if="state.showDemo2"
      :actions="state.btnData2"
    ></v-action-bar>
  </div>
  <div class="v-example">
    <p>ActionBar - Disabled Buttons</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="$_onShowDemo(3)"
    >Test Disabled Buttons</v-button>
    <v-action-bar
      v-if="state.showDemo3"
      :actions="state.btnData3"
    ></v-action-bar>
  </div>
  <div class="v-example">
    <p>ActionBar - Slot usage</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="$_onShowDemo(4)"
    >Test Slot usage</v-button>
    <v-action-bar
      v-if="state.showDemo4"
      :actions="state.btnData4"
    >
      <span class="v-example-price">
        &pound;108.00<small>+</small>
      </span>
    </v-action-bar>
  </div>
</template>

<script>
import { reactive } from 'vue'
import Toast from '../components/toast/index'
// import VActionBar from '../components/action-bar/index.vue'
// import VButton from '../components/button/index.vue'

export default {
  name: 'action-bar-demo',

  inheritAttrs: false,

  // components: {
  //   VActionBar,
  //   VButton
  // },

  setup() {
    const $_onClick1 = () => {
      Toast.info('Click primary button')
    }

    const $_onClick2 = () => {
      Toast.info('Click secondary button')
    }

    const $_onClick3 = (item) => {
      Toast.info('Click primary button')
      item.inactive = true
      setTimeout(() => {
        item.inactive = false
      }, 2000)
    }

    const state = reactive({
      showDemo1: false,
      showDemo2: false,
      showDemo3: false,
      showDemo4: false,

      btnData1: [
        {
          text: 'Primary button',
          onClick: $_onClick1
        }
      ],
      btnData2: [
        {
          text: 'Secondary button',
          onClick: $_onClick2
        },
        {
          text: 'Primary button',
          onClick: $_onClick1
        }
      ],
      btnData3: [
        {
          text: 'Secondary button',
          disabled: true
        },
        {
          text: 'Primary button',
          disabled: true
        }
      ],
      btnData4: [
        {
          text: 'Primary button',
          round: true,
          onClick: $_onClick3
        }
      ]
    })

    const $_onShowDemo = (index) => {
      [1, 2, 3, 4].forEach((item) => (state[`showDemo${item}`] = false))
      state[`showDemo${index}`] = true
    }

    return {
      state,
      $_onShowDemo,
      $_onClick1,
      $_onClick2,
      $_onClick3
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';
</style>
