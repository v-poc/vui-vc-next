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
    <v-landscape
      v-model:value="popupShow.maskClosableMode"
      @mask-click="showInfo('click mask to close landscape popup')"
      mask-closable
      :show-close="false"
      transition="v-bounce"
    >
      <div class="v-example-op">
        <v-one-piece :scale="1.8" />
      </div>
    </v-landscape>    
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
import { logInfo } from '../utils/index'
import Toast from '../components/toast/index'
import useShowPopup from '../composables/useShowPopup'
// import VActionSheet from '../components/action-sheet/action-sheet.vue'
// import VButton from '../components/button/index.vue'
// import VSwitch from '../components/switch/index.vue'
// import VOnePiece from '../components/misc/op.vue'
// import VLandscape from '../components/landscape/index.vue'

export default {
  name: 'action-sheet-demo',

  inheritAttrs: false,

  // components: {
  //   VActionSheet,
  //   VButton,
  //   VSwitch,
  //   VOnePiece,
  //   VLandscape
  // },

  setup() {
    const state = reactive({
      isShowDemo: false,
      isLargeRadius: true,
      title: 'VUI - ActionSheet',
      options: [
        {
          label: 'Hello Vue 3.0',
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

    const popup = useShowPopup()

    // show info in console log
    const showInfo = (content) => {
      logInfo(`[PopupTitleBarDemo] ${content}`)
      Toast.info(content)
    }    

    const onShowDemo = () => {
      logInfo('Show ActionSheet')
      state.isShowDemo = true
    }

    const onSelected = (item) => {
      logInfo(`Selected item: ${JSON.stringify(item)}`)
      if (item && item.value === 0) {
        return popup.showPopup('maskClosableMode', true)
      }
      Toast.succeed(`Selected item label: ${item.label || ''}`)
    }

    const onCancel = () => {
      const res = 'Cancel ActionSheet'
      logInfo(res)
      Toast.failed(res)
    }

    return {
      state,
      popupShow: popup.mapping,
      showInfo,      
      onShowDemo,
      onSelected,
      onCancel
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';

::v-deep(.v-landscape-content) {
  width: 100vw;
}

.v-example-op {
  padding-top: 1.5rem;
  height: 5.5rem;
}
</style>
