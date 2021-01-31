<template>
  <router-link
    to="/"
    class="v-back"
  >&lt; Home</router-link>
  <div class="v-example">
    <p>Basic Button</p>
    <v-button type="default">Default Button</v-button>
    <v-button
      type="default"
      inactive
    >Default Button (inactive)</v-button>
    <v-button
      type="primary"
      icon="security"
      round
    >Primary Button</v-button>
    <v-button
      type="primary"
      inactive
    >Primary Button (inactive)</v-button>
  </div>
  <div class="v-example">
    <p>Button Text link</p>
    <v-button
      type="link"
      inactive
    >
      Inactive text button with Icon
      <v-icon
        name="arrow-right"
        size="xs"
      ></v-icon>
    </v-button>
    <v-button
      type="link"
      icon="message"
    >Message text</v-button>
  </div>
  <div class="v-example">
    <p>Button w/ loading state</p>
    <v-button
      type="default"
      plain
      loading
    >Plain Loading Button</v-button>
    <v-button
      type="primary"
      round
      loading
    >Round Loading Button</v-button>
  </div>
  <div class="v-example v-example-cool">
    <p>Cool Button playground</p>
    <v-button
      type="warning"
      size="small"
      inline
      round
      @click="onTestCoolButton"
    >Test Cool Button</v-button>
    <v-popup
      position="center"
      transition="v-bounce"
      v-model:value="popupShow.center"
    >
      <div class="v-example-popup v-example-popup-center">
        <div class="v-example-panda">
          <img
            v-lazy="'https://nikoni.top/images/others/panda-normal.png'"
            v-show="state.isNormal"
          />
          <img
            v-lazy="'https://nikoni.top/images/others/panda-cover-eyes.png'"
            :style="coverStyle"
          />
        </div>
        <p>Touch center point</p>
        <div @click="state.isNormal=false">
          <v-cool-button
            :scale="1.1"
            @on-click="showPopup('fullscreenMode', true)"
          />
        </div>
      </div>
    </v-popup>
    <v-landscape
      v-model:value="popupShow.fullscreenMode"
      fullscreen
    >
      <img v-lazy="'https://nikoni.top/images/others/cg.jpg'" />
      <v-cool-button
        :scale="0.5"
        class="btn-lt"
        @on-click="onClickButton"
      />
      <v-cool-button
        :scale="0.5"
        class="btn-rt"
        @on-click="onClickButton"
      />
      <video
        v-if="popupShow.fullscreenMode"
        width="100%"
        src="https://nikoni.top/images/others/ppmm.mp4"
        poster="https://nikoni.top/images/others/video-poster.jpg"
        controls="controls"
        autoplay="autoplay"
        loop="loop"
      >
        video is not supported.
      </video>
    </v-landscape>
  </div>
  <div class="v-example">
    <p>Like Button playground</p>
    <v-button
      type="default"
      size="small"
      inline
      round
      @click="showPopup('like', true)"
    >Test Like Button</v-button>
    <v-popup
      position="center"
      transition="v-bounce"
      v-model:value="popupShow.like"
    >
      <div class="v-example-popup v-example-popup-center">
        <p>Touch heart point</p>
        <v-like-button @on-click="onTestLikeButton" />
      </div>
    </v-popup>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import Toast from '../components/toast/index'
// import VCoolButton from '../components/misc/cool-button.vue'
// import VLikeButton from '../components/misc/like-button.vue'
import useShowPopup from '../composables/useShowPopup'
// import VButton from '../components/button/index.vue'
// import VIcon from '../components/icon/index.vue'
// import VPopup from '../components/popup/index.vue'
// import VLandscape from '../components/landscape/index.vue'

export default {
  name: 'button-demo',

  inheritAttrs: false,

  // components: {
  //   VCoolButton,
  //   VLikeButton,
  //   VButton,
  //   VIcon,
  //   VPopup,
  //   VLandscape
  // },

  setup() {
    const state = reactive({
      isNormal: true
    })

    const popup = useShowPopup()

    const coverStyle = computed(() => {
      return {
        opacity: state.isNormal ? 0 : 1
      }
    })

    const onClickButton = () => {
      Toast({
        icon: 'success',
        content: 'So cool, nice feeling!',
        position: 'bottom'
      })
    }

    const onTestCoolButton = () => {
      state.isNormal = true
      popup.showPopup('center', true)
    }

    const onTestLikeButton = () => {
      popup.showPopup('like', false)
      onTestCoolButton()
    }

    return {
      state,
      popupShow: popup.mapping,
      showPopup: popup.showPopup,
      coverStyle,
      onClickButton,
      onTestCoolButton,
      onTestLikeButton
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/vui-example.scss';

.v-example-cool {
  ::v-deep(.v-popup-box) {
    overflow: visible;

    .v-example-panda {
      position: absolute;
      top: -1.5rem;
      width: 3rem;
      height: 2rem;
      overflow: hidden;

      img {
        position: absolute;
        top: 0;
        left: 0.4rem;
        width: 2.5rem;
        height: 2rem;
      }
    }
  }

  video {
    width: 100%;
  }
}

.btn-lt {
  position: absolute;
  top: 1.8rem;
  left: 1.4rem;
}

.btn-rt {
  position: absolute;
  top: 1.8rem;
  left: 2.9rem;
}

::v-deep(.v-landscape .v-icon.v-landscape-close.dark) {
  opacity: 1;
}

@media (min-width: 640px) {
  .v-landscape img {
    width: 6.2rem;
  }
}
</style>
