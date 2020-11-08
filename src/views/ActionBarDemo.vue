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
      @click="onShowDemo(1)"
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
      @click="onShowDemo(2)"
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
      @click="onShowDemo(3)"
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
      @click="onShowDemo(4)"
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
  <div class="v-example">
    <p>ActionBar - Slot playground</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="onShowDemo(5)"
    >Test Slot playground</v-button>
    <v-action-bar
      v-if="state.showDemo5"
      :actions="state.btnData5"
    >
      <v-cool-button
        :scale="state.scale"
        @on-click="onClick5"
      />
    </v-action-bar>
  </div>  
</template>

<script>
import { computed, reactive } from 'vue'
import Toast from '/@components/toast/index'
import VCoolButton from '/@components/misc/cool-button.vue'
// import VActionBar from '/@components/action-bar/index.vue'
// import VButton from '/@components/button/index.vue'

export default {
  name: 'action-bar-demo',

  inheritAttrs: false,

  components: {
    VCoolButton
  //   VActionBar,
  //   VButton
  },

  setup() {
    const onClick1 = () => Toast.succeed('Click primary button')

    const onClick2 = () => Toast.succeed('Click secondary button')

    const onClick3 = (item) => {
      Toast.succeed('Click primary button')
      item.inactive = true
      setTimeout(() => {
        item.inactive = false
      }, 2000)
    }

    const onClick4 = () => {
      state.scale = (state.scale * 10 + 1) / 10
      if (state.scale > 0.5) {
        const btnNode = document.querySelector('.v-btn-op')
        btnNode && (btnNode.style.bottom = '0px')
      }
    }

    const onClick5 = () => Toast.succeed('So cool, nice feeling!')

    const state = reactive({
      scale: 0.3,
      showDemo1: false,
      showDemo2: false,
      showDemo3: false,
      showDemo4: false,
      showDemo5: false,

      btnData1: [
        {
          text: 'Primary button',
          onClick: onClick1
        }
      ],
      btnData2: [
        {
          text: 'Secondary button',
          onClick: onClick2
        },
        {
          text: 'Primary button',
          onClick: onClick1
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
          onClick: onClick3
        }
      ],
      btnData5: [
        {
          text: 'Increase size',
          round: true,
          disabled: computed(() => state.scale >= 1),
          onClick: onClick4
        }
      ]      
    })

    const onShowDemo = (index) => {
      const nodes = document.querySelectorAll('.v-example')
      const len = nodes ? nodes.length : 0
      new Array(len).fill('').forEach((item, i) => (state[`showDemo${i + 1}`] = false))
      state[`showDemo${index}`] = true
      index === 5 && (state.scale = 0.3) // reset scale for Slot playground
    }

    return {
      state,
      onShowDemo,
      onClick1,
      onClick2,
      onClick3,
      onClick4,
      onClick5
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';

.v-btn-op {
  position: absolute;
}
</style>
