<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Popup TitleBar</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="showPopup('bottom', true)"
    >Test popup from bottom</v-button>
    <v-popup
      position="bottom"
      v-model:value="popupShow.bottom"
    >
      <v-popup-title-bar
        title="Hello Vue 3.0"
        describe="One Piece."
        ok-text="ok"
        cancel-text="cancel"
        @confirm="hidePopupTitleBar('confirmButton')"
        @cancel="hidePopupTitleBar('cancelButton')"
      ></v-popup-title-bar>
      <div class="v-example-op-default">
        <v-one-piece @click="showPopup('maskClosableMode', true)" />
      </div>
    </v-popup>
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
  <div class="v-example v-example-popup-scroll-view">
    <p>Popup TitleBar - ScrollView</p>
    <v-button
      type="primary"
      size="small"
      inline
      round
      @click="showPopup('bottomView', true)"
    >Test popup ScrollView</v-button>
    <v-popup
      position="bottom"
      v-model:value="popupShow.bottomView"
    >
      <v-popup-title-bar
        only-close
        large-radius
        title-align="left"
        title="The Popup ScrollView"
        describe="powered by vui.next"
        @cancel="hidePopupTitleBar('closeButton')"
      ></v-popup-title-bar>
      <div class="v-example-scroll-view-lazy">
        <v-scroll-view
          :scrolling-x="false"
          :auto-reflow="true"
          @scroll="onScroll"
        >
          <ul class="lazy-list">
            <li
              v-for="item in state.listPhotoData"
              class="item"
              :key="item.id"
            >
              <div class="icon">
                <img v-lazy="item.imgUrl" />
              </div>
              <div class="text">
                <h2 class="name">{{ item.name }}</h2>
                <p class="desc">{{ item.desc }}</p>
              </div>
            </li>
          </ul>
        </v-scroll-view>
      </div>
    </v-popup>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { logInfo, debounce } from '../utils/index'
import { PHOTOS_DATA } from '../assets/mock/index'
import Toast from '../components/toast/index'
// import VOnePiece from '../components/misc/op.vue'
// import VPopup from '../components/popup/index.vue'
// import VButton from '../components/button/index.vue'
// import VPopupTitleBar from '../components/popup/title-bar.vue'
// import VLandscape from '../components/landscape/index.vue'

export default {
  name: 'popup-titlebar-demo',

  inheritAttrs: false,

  // components: {
  //   VOnePiece
  //   VPopup,
  //   VButton,
  //   VPopupTitleBar,
  //   VLandscape
  // },

  setup() {
    const state = reactive({
      listPhotoData: PHOTOS_DATA
    })

    const popupShow = ref({})

    // show/hide popup
    const showPopup = (pos, isShow) => {
      popupShow.value[pos] = isShow
    }

    // show info in console log
    const showInfo = (content) => {
      logInfo(`[PopupTitleBarDemo] ${content}`)
      Toast.info(content)
    }

    const hidePopupTitleBar = (info) => {
      showPopup('bottom', false)
      showPopup('bottomView', false)
      showInfo(`${info} hide popup-title-bar`)
    }

    const onScroll = debounce(({ scrollLeft, scrollTop }) => {
      logInfo(
        `[PopupTitleBarDemo] onScroll - scrollLeft: ${scrollLeft}, scrollTop: ${scrollTop}`
      )
    }, 50)

    return {
      state,
      popupShow,
      showPopup,
      showInfo,
      hidePopupTitleBar,
      onScroll
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

.v-example-op-default {
  height: 3.5rem;
  background: #fff;
}

.v-example-popup-scroll-view {
  .v-popup-title-bar {
    background-color: rgb(51, 51, 51);

    ::v-deep(.title-bar-title p.title) {
      color: rgb(133, 139, 256);
    }
  }

  .v-example-scroll-view-lazy {
    border-radius: 0;
  }
}
</style>
