<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>ActionSheet - Basic</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="onShowDemo"
    >Test Basic usage</v-button>
    <v-action-sheet
      v-model:value="state.isShowDemo"
      :large-radius="state.isLargeRadius"
      :title="state.title"
      :default-index="state.defaultIndex"
      :invalid-index="state.invalidIndex"
      :options="state.options"
      @selected="onSelected"
      @cancel="onCancel"
    ></v-action-sheet>
  </div>
  <div class="v-example">
    <p>Switch largeRadius</p>
    <v-switch
      v-model:value="state.isLargeRadius"
      @change="onShowDemo"
    />
  </div>
</template>

<script>
import { reactive } from 'vue'
import Toast from '../components/toast/index'
// import VActionSheet from '../components/action-sheet/action-sheet.vue'
// import VButton from '../components/button/index.vue'
// import VSwitch from '../components/switch/index.vue'

export default {
  name: 'action-sheet-demo',

  inheritAttrs: false,

  // components: {
  //   VActionSheet,
  //   VButton,
  //   VSwitch
  // },

  setup() {
    const state = reactive({
      isShowDemo: false,
      isLargeRadius: true,
      title: 'VUI - ActionSheet',
      options: [
        {
          label: 'The item - 1',
          value: 0
        },
        {
          label: 'The item - 2',
          value: 1
        },
        {
          label: 'The item - 3',
          value: 2
        }
      ],
      defaultIndex: 1,
      invalidIndex: 2
    })

    const onShowDemo = () => {
      state.isShowDemo = true
    }

    const onSelected = (item) => {
      Toast.succeed(`Selected item label: ${item.label || ''}`)
    }

    const onCancel = () => {
      Toast.failed('Cancel ActionSheet')
    }

    return {
      state,
      onShowDemo,
      onSelected,
      onCancel
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';
</style>
